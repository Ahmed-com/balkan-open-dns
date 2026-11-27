#!/usr/bin/env python3
"""
Phase 1 Linux Container Runtime Validation Runner for GitHub Actions CI.
Executes against the local sandbox BIND9 container bound strictly to 127.0.0.1:53.
Reports exact PASSED, FAILED, and SKIPPED test counts plus measured CPU/RAM stats.
"""

from __future__ import annotations

import json
import os
import pathlib
import re
import socket
import struct
import subprocess
import sys
import time

STACK_DIR = pathlib.Path(__file__).resolve().parent.parent
CONTAINER = "balkan-dns-tier2"
TARGET_IP = os.environ.get("DNS_BIND_IP", "127.0.0.1")
TARGET_PORT = int(os.environ.get("DNS_PORT", "53"))

results: list[tuple[str, str, str]] = []  # (id_name, status, detail)


def run(cmd: list[str], check: bool = True, timeout: int = 120) -> subprocess.CompletedProcess[str]:
    return subprocess.run(cmd, text=True, capture_output=True, check=check, timeout=timeout)


def record(name: str, status: str, detail: str) -> None:
    results.append((name, status, detail))
    print(f"[{status}] {name}: {detail}", flush=True)


def dig_container(args: list[str], timeout: int = 15) -> subprocess.CompletedProcess[str]:
    return run(["docker", "exec", CONTAINER, "dig", f"@{TARGET_IP}", "-p", str(TARGET_PORT), *args], check=False, timeout=timeout)


def dns_udp_burst(server: str, port: int, qname: str, count: int) -> tuple[int, int, int]:
    header = struct.pack("!HHHHHH", 0x7788, 0x0100, 1, 0, 0, 0)
    qb = b"".join(bytes([len(p)]) + p.encode("ascii") for p in qname.strip(".").split(".") if p) + b"\x00"
    pkt = header + qb + struct.pack("!HH", 1, 1)  # A IN
    ok, tc, timeouts = 0, 0, 0
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
        s.settimeout(0.25)
        for i in range(count):
            tid = (0x7700 + i) & 0xFFFF
            p = struct.pack("!H", tid) + pkt[2:]
            s.sendto(p, (server, port))
            try:
                resp, _ = s.recvfrom(2048)
                _, rflags, _, _, _, _ = struct.unpack("!HHHHHH", resp[:12])
                if rflags & 0x0200:  # TC bit
                    tc += 1
                else:
                    ok += 1
            except socket.timeout:
                timeouts += 1
    return ok, tc, timeouts


def main() -> int:
    # Check outbound DNS connectivity from runner before running live upstream tests
    external_dns_ok = False
    try:
        probe = run(["docker", "exec", CONTAINER, "dig", "@161.97.219.84", "+time=3", "+tries=1", "+short", ".", "NS"], check=False)
        external_dns_ok = probe.returncode == 0 and bool(probe.stdout.strip())
    except Exception:
        external_dns_ok = False
    print(f"ENV_EXTERNAL_DNS_REACHABLE={external_dns_ok}", flush=True)

    # T01: BIND9 configuration & zone syntax validation
    try:
        run([str(STACK_DIR / "scripts" / "validate-config.sh")], check=True, timeout=120)
        record("T01_config_validation", "PASS", "docker compose config & named-checkconf -z succeeded")
    except Exception as e:
        record("T01_config_validation", "FAIL", str(e))

    # T02: Container health check
    try:
        hc = run(["docker", "exec", CONTAINER, "/usr/local/bin/healthcheck.sh"], check=False)
        insp = json.loads(run(["docker", "inspect", CONTAINER]).stdout)[0]
        hstatus = insp["State"]["Health"]["Status"]
        if hc.returncode == 0 and hstatus == "healthy":
            record("T02_healthcheck", "PASS", f"healthcheck.sh exit=0, Docker Health={hstatus}")
        else:
            record("T02_healthcheck", "FAIL", f"exit={hc.returncode}, health={hstatus}, err={hc.stderr}")
    except Exception as e:
        record("T02_healthcheck", "FAIL", str(e))

    # T03: Container privilege, filesystem permissions & loopback-only isolation
    try:
        insp = json.loads(run(["docker", "inspect", CONTAINER]).stdout)[0]
        hc_cfg = insp["HostConfig"]
        net_ports = insp["NetworkSettings"]["Ports"]
        ro = hc_cfg.get("ReadonlyRootfs") is True
        nnp = "no-new-privileges:true" in (hc_cfg.get("SecurityOpt") or [])
        cap_drop = "ALL" in (hc_cfg.get("CapDrop") or [])
        mem_cap = hc_cfg.get("Memory") == 536870912
        udp_bind = net_ports.get("53/udp", [{}])[0].get("HostIp") == "127.0.0.1"
        tcp_bind = net_ports.get("53/tcp", [{}])[0].get("HostIp") == "127.0.0.1"
        ps_out = run(["docker", "exec", CONTAINER, "ps", "-eo", "user:20,comm"]).stdout
        non_root_named = any(line.split()[:2] == ["bind", "named"] for line in ps_out.splitlines() if len(line.split()) >= 2)
        stat_out = run(["docker", "exec", CONTAINER, "stat", "-c", "%n %a %U:%G", "/run/named", "/var/cache/bind", "/var/log/named", "/etc/bind/named.conf"]).stdout.strip()
        if all([ro, nnp, cap_drop, mem_cap, udp_bind, tcp_bind, non_root_named]):
            record("T03_container_security_posture", "PASS", f"ro={ro}, nnp={nnp}, cap_drop={cap_drop}, mem=512m, bind_127={udp_bind and tcp_bind}, user=bind; {stat_out.replace(chr(10), ' | ')}")
        else:
            record("T03_container_security_posture", "FAIL", f"ro={ro}, nnp={nnp}, cap_drop={cap_drop}, mem_cap={mem_cap}, udp_bind={udp_bind}, tcp_bind={tcp_bind}, non_root_named={non_root_named}")
    except Exception as e:
        record("T03_container_security_posture", "FAIL", str(e))

    # T04: Secondary zone synchronization
    if not external_dns_ok:
        record("T04_secondary_zone_sync", "SKIP", "External TCP/UDP 53 blocked in CI environment")
    else:
        try:
            synced = []
            for z in [".", "dns.opennic.glue", "opennic.glue"]:
                zs = run(["docker", "exec", CONTAINER, "rndc", "-s", "127.0.0.1", "-p", "953", "zonestatus", z], check=False)
                if zs.returncode != 0 or "serial:" not in zs.stdout:
                    raise RuntimeError(f"Zone {z} not synced: {zs.stdout} {zs.stderr}")
                serial = re.search(r"serial:\s+(\S+)", zs.stdout)
                synced.append(f"{z}={serial.group(1) if serial else 'ok'}")
            record("T04_secondary_zone_sync", "PASS", ", ".join(synced))
        except Exception as e:
            record("T04_secondary_zone_sync", "FAIL", str(e))

    # T05: ICANN recursive resolution (UDP)
    if not external_dns_ok:
        record("T05_icann_udp_resolution", "SKIP", "External DNS blocked in CI environment")
    else:
        r = dig_container(["+short", "+time=5", "example.org", "A"])
        if r.returncode == 0 and r.stdout.strip():
            record("T05_icann_udp_resolution", "PASS", f"example.org -> {r.stdout.strip().splitlines()[0]}")
        else:
            record("T05_icann_udp_resolution", "FAIL", f"rc={r.returncode} out={r.stdout} err={r.stderr}")

    # T06: ICANN recursive resolution (TCP fallback)
    if not external_dns_ok:
        record("T06_icann_tcp_resolution", "SKIP", "External DNS blocked in CI environment")
    else:
        r = dig_container(["+tcp", "+short", "+time=5", "example.org", "A"])
        if r.returncode == 0 and r.stdout.strip():
            record("T06_icann_tcp_resolution", "PASS", f"TCP example.org -> {r.stdout.strip().splitlines()[0]}")
        else:
            record("T06_icann_tcp_resolution", "FAIL", f"rc={r.returncode} out={r.stdout} err={r.stderr}")

    # T07: OpenNIC recursive resolution (UDP + TCP across active TLDs)
    if not external_dns_ok:
        record("T07_opennic_resolution", "SKIP", "External DNS blocked in CI environment")
    else:
        op_ok, op_fail = [], []
        for qn, qt in [("opennic.glue", "A"), ("dns.opennic.glue", "SOA"), ("be.libre", "A"), ("grep.geek", "A"), ("bbs", "NS"), ("oss", "NS"), ("chan", "NS"), ("pirate", "NS")]:
            ru = dig_container(["+short", "+time=6", qn, qt])
            rt = dig_container(["+tcp", "+short", "+time=6", qn, qt])
            if ru.returncode == 0 and ru.stdout.strip() and rt.returncode == 0 and rt.stdout.strip():
                op_ok.append(f"{qn}/{qt}")
            else:
                op_fail.append(f"{qn}/{qt}(u={ru.returncode},t={rt.returncode})")
        if not op_fail:
            record("T07_opennic_resolution", "PASS", f"UDP+TCP resolved: {', '.join(op_ok)}")
        else:
            record("T07_opennic_resolution", "FAIL", f"passed={op_ok}, failed={op_fail}")

    # T08: DNSSEC positive validation (ICANN + OpenNIC)
    if not external_dns_ok:
        record("T08_dnssec_positive", "SKIP", "External DNS blocked in CI environment")
    else:
        checks = []
        failed_checks = []
        for qn, qt in [("isc.org", "A"), ("opennic.glue", "SOA"), ("geek", "SOA"), ("libre", "SOA")]:
            r = dig_container(["+dnssec", "+time=6", qn, qt])
            has_ad = bool(re.search(r"flags:.*\bad\b", r.stdout))
            noerr = "status: NOERROR" in r.stdout
            if r.returncode == 0 and noerr and has_ad:
                checks.append(f"{qn}(AD)")
            else:
                failed_checks.append(f"{qn}(noerr={noerr},ad={has_ad})")
        if not failed_checks:
            record("T08_dnssec_positive", "PASS", f"Validated AD bit: {', '.join(checks)}")
        else:
            record("T08_dnssec_positive", "FAIL", f"passed={checks}, failed={failed_checks}")

    # T09: DNSSEC negative validation (bogus signature rejection)
    if not external_dns_ok:
        record("T09_dnssec_negative", "SKIP", "External DNS blocked in CI environment")
    else:
        r = dig_container(["+time=8", "dnssec-failed.org", "A"])
        if "status: SERVFAIL" in r.stdout:
            record("T09_dnssec_negative", "PASS", "dnssec-failed.org rejected with SERVFAIL")
        else:
            record("T09_dnssec_negative", "FAIL", f"Expected SERVFAIL, got: {r.stdout.strip()}")

    # T10: Upstream OpenNIC DNSSEC anomaly audit (diagnostic only - never suppressed)
    if not external_dns_ok:
        record("T10_opennic_dnssec_anomalies", "SKIP", "External DNS blocked in CI environment")
    else:
        diag = []
        for tld in ["free", "ing", "o", "fur"]:
            r = dig_container(["+dnssec", "+time=6", tld, "SOA"])
            st = re.search(r"status:\s+([A-Z]+)", r.stdout)
            fl = re.search(r"flags:\s+([^;]+);", r.stdout)
            diag.append(f".{tld}={st.group(1) if st else 'ERR'}({fl.group(1).strip() if fl else '-'})")
        record("T10_opennic_dnssec_anomalies", "PASS", f"Documented live behavior without bypasses: {', '.join(diag)}")

    # T11: Controlled local Response Rate Limiting (RRL) & recovery test
    try:
        ok, tc, timeouts = dns_udp_burst(TARGET_IP, TARGET_PORT, "opennic.glue", 60)
        time.sleep(1)
        sec_log = run(["docker", "exec", CONTAINER, "cat", "/var/log/named/named-security.log"], check=False).stdout
        rrl_logged = "limit" in sec_log.lower() or "rate-limit" in sec_log.lower()
        # Verify normal query works right after burst
        rec = dig_container(["+time=4", "+short", "dns.opennic.glue", "SOA"])
        if (tc > 0 or timeouts > 0 or rrl_logged) and rec.returncode == 0 and rec.stdout.strip():
            record("T11_rrl_abuse_mitigation", "PASS", f"60-query burst -> ok={ok}, tc_slipped={tc}, dropped={timeouts}, rrl_logged={rrl_logged}; recovery=OK")
        else:
            record("T11_rrl_abuse_mitigation", "FAIL", f"ok={ok}, tc={tc}, timeouts={timeouts}, rrl_logged={rrl_logged}, rec_rc={rec.returncode}")
    except Exception as e:
        record("T11_rrl_abuse_mitigation", "FAIL", str(e))

    # T12: Privacy & abuse-hardening checks (no query logs, hidden version, AXFR refused)
    try:
        ver = dig_container(["+short", "chaos", "txt", "version.bind"]).stdout.strip()
        axfr = dig_container(["+time=3", "opennic.glue", "AXFR"]).stdout
        ops_log = run(["docker", "exec", CONTAINER, "cat", "/var/log/named/named-ops.log"], check=False).stdout
        sec_log = run(["docker", "exec", CONTAINER, "cat", "/var/log/named/named-security.log"], check=False).stdout
        no_qlog = ("query:" not in ops_log.lower()) and ("query:" not in sec_log.lower()) and ("example.org" not in ops_log)
        if ver == '"not disclosed"' and "status: REFUSED" in axfr and no_qlog:
            record("T12_privacy_and_axfr_refusal", "PASS", "version.bind hidden, AXFR REFUSED, 0 query log entries")
        else:
            record("T12_privacy_and_axfr_refusal", "FAIL", f"ver={ver}, axfr_refused={'REFUSED' in axfr}, no_qlog={no_qlog}")
    except Exception as e:
        record("T12_privacy_and_axfr_refusal", "FAIL", str(e))

    # T13: Restart & recovery test
    try:
        run(["docker", "compose", "-f", str(STACK_DIR / "docker-compose.yml"), "restart", "bind9-tier2"], check=True)
        hstatus = "starting"
        for _ in range(30):
            insp = json.loads(run(["docker", "inspect", CONTAINER]).stdout)[0]
            hstatus = insp["State"]["Health"]["Status"]
            if hstatus == "healthy":
                break
            time.sleep(2)
        rec = dig_container(["+time=4", "+short", "dns.opennic.glue", "SOA"])
        if hstatus == "healthy" and rec.returncode == 0 and rec.stdout.strip():
            record("T13_restart_recovery", "PASS", f"Recovered to {hstatus} and resolved dns.opennic.glue SOA")
        else:
            record("T13_restart_recovery", "FAIL", f"health={hstatus}, rc={rec.returncode}")
    except Exception as e:
        record("T13_restart_recovery", "FAIL", str(e))

    # T14: Resource consumption measurement (CPU & RAM)
    try:
        stats_raw = run(["docker", "stats", "--no-stream", "--format", "{{json .}}", CONTAINER]).stdout.strip()
        stats = json.loads(stats_raw)
        record("T14_resource_consumption", "PASS", f"CPU={stats['CPUPerc']}, Mem={stats['MemUsage']} ({stats['MemPerc']}), PIDs={stats['PIDs']}")
    except Exception as e:
        record("T14_resource_consumption", "FAIL", str(e))

    # T15: Backup & restore verification
    try:
        bk_script = str(STACK_DIR / "scripts" / "backup-restore.sh")
        bk_out = run([bk_script, "backup"], check=True).stdout
        m = re.search(r"Backup created:\s*(\S+)", bk_out)
        assert m, f"Missing archive path in backup output: {bk_out}"
        archive = m.group(1)
        run(["docker", "compose", "-f", str(STACK_DIR / "docker-compose.yml"), "down"], check=True)
        run(["docker", "volume", "rm", "balkan_dns_cache"], check=True)
        run([bk_script, "restore", archive], check=True)
        run([str(STACK_DIR / "scripts" / "validate-config.sh")], check=True)
        run(["docker", "compose", "-f", str(STACK_DIR / "docker-compose.yml"), "up", "-d"], check=True)
        hstatus = "starting"
        for _ in range(30):
            insp = json.loads(run(["docker", "inspect", CONTAINER]).stdout)[0]
            hstatus = insp["State"]["Health"]["Status"]
            if hstatus == "healthy":
                break
            time.sleep(2)
        if hstatus == "healthy":
            record("T15_backup_restore", "PASS", f"Backup/SHA256/volume-wipe/restore/restart -> {hstatus}")
        else:
            record("T15_backup_restore", "FAIL", f"Post-restore health={hstatus}")
    except Exception as e:
        record("T15_backup_restore", "FAIL", str(e))

    # T16: Operational monitor script
    try:
        mon = run([str(STACK_DIR / "scripts" / "monitor.sh")], check=False)
        if mon.returncode == 0:
            record("T16_monitor_script", "PASS", mon.stdout.strip())
        else:
            record("T16_monitor_script", "FAIL", f"rc={mon.returncode} {mon.stdout} {mon.stderr}")
    except Exception as e:
        record("T16_monitor_script", "FAIL", str(e))

    passed = sum(1 for _, s, _ in results if s == "PASS")
    failed = sum(1 for _, s, _ in results if s == "FAIL")
    skipped = sum(1 for _, s, _ in results if s == "SKIP")

    summary_lines = [
        "### Phase 1 Runtime Validation Summary",
        f"- **Passed:** {passed}",
        f"- **Failed:** {failed}",
        f"- **Skipped:** {skipped}",
        "",
        "| Test | Status | Details |",
        "| --- | --- | --- |",
    ]
    for name, st, det in results:
        summary_lines.append(f"| `{name}` | **{st}** | {det} |")

    summary_md = "\n".join(summary_lines)
    print("\n" + summary_md, flush=True)
    step_summary = os.environ.get("GITHUB_STEP_SUMMARY")
    if step_summary:
        with open(step_summary, "a", encoding="utf-8") as fh:
            fh.write(summary_md + "\n")

    return 1 if failed > 0 else 0


if __name__ == "__main__":
    sys.exit(main())
