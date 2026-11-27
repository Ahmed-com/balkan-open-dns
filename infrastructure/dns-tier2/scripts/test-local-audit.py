#!/usr/bin/env python3
"""
Phase 1 static configuration, security hardening, and live OpenNIC upstream verification suite.
Runs locally without requiring Linux container execution, and NEVER fabricates container runtime results.
"""

from __future__ import annotations

import base64
import pathlib
import re
import socket
import struct
import sys

import yaml

STACK_DIR = pathlib.Path(__file__).resolve().parent.parent
CONFIG_DIR = STACK_DIR / "config"


def assert_true(cond: bool, msg: str) -> None:
    if not cond:
        raise AssertionError(msg)


def verify_compose_and_dockerfile() -> None:
    compose = yaml.safe_load((STACK_DIR / "docker-compose.yml").read_text(encoding="utf-8"))
    svc = compose["services"]["bind9-tier2"]

    ports = svc.get("ports", [])
    assert_true(len(ports) == 2, f"Expected 2 port mappings (UDP/TCP 53), got {ports}")
    for p in ports:
        assert_true("127.0.0.1" in str(p), f"Port binding must default to 127.0.0.1, got: {p}")

    assert_true(svc.get("mem_limit") == "512m", "mem_limit must be 512m for 1 GB RAM VPS")
    assert_true(float(svc.get("cpus", 99)) <= 1.0, "cpus limit must fit 1 vCPU target")
    assert_true(svc.get("read_only") is True, "Container root filesystem must be read_only")
    assert_true("no-new-privileges:true" in svc.get("security_opt", []), "no-new-privileges required")
    assert_true("ALL" in svc.get("cap_drop", []), "cap_drop ALL required")

    dockerfile = (STACK_DIR / "Dockerfile").read_text(encoding="utf-8")
    assert_true(
        "FROM internetsystemsconsortium/bind9:9.20@sha256:" in dockerfile,
        "Dockerfile must pin supported ISC BIND 9.20 image by immutable SHA256 digest",
    )
    assert_true("named-checkconf /etc/bind/named.conf" in dockerfile, "Build-time named-checkconf required")
    entrypoint_txt = (STACK_DIR / "scripts" / "entrypoint.sh").read_text(encoding="utf-8")
    assert_true("exec /usr/sbin/named -u bind" in entrypoint_txt, "named must drop privileges to bind user")
    for sh_path in sorted((STACK_DIR / "scripts").glob("*.sh")):
        raw = sh_path.read_bytes()
        assert_true(b"\r\n" not in raw, f"Shell script must use LF line endings, found CRLF in {sh_path.name}")
    print("[PASS] Dockerfile, docker-compose.yml, and LF line-ending hardening checks")


def verify_bind_configs() -> None:
    master = (CONFIG_DIR / "named.conf").read_text(encoding="utf-8")
    options = (CONFIG_DIR / "named.conf.options").read_text(encoding="utf-8")
    keys = (CONFIG_DIR / "named.conf.keys").read_text(encoding="utf-8")
    zones = (CONFIG_DIR / "named.conf.opennic-zones").read_text(encoding="utf-8")
    logging_cfg = (CONFIG_DIR / "named.conf.logging").read_text(encoding="utf-8")

    # Brace balance check across all BIND configs
    for name, txt in [
        ("named.conf", master),
        ("named.conf.options", options),
        ("named.conf.keys", keys),
        ("named.conf.opennic-zones", zones),
        ("named.conf.logging", logging_cfg),
    ]:
        assert_true(txt.count("{") == txt.count("}"), f"Unbalanced braces in {name}")

    for inc in [
        'include "/etc/bind/named.conf.keys";',
        'include "/etc/bind/named.conf.options";',
        'include "/etc/bind/named.conf.logging";',
        'include "/etc/bind/named.conf.opennic-zones";',
    ]:
        assert_true(inc in master, f"Missing include in named.conf: {inc}")

    for directive in [
        "recursion yes;",
        "allow-transfer { none; };",
        "max-cache-size 256m;",
        "dnssec-validation yes;",
        'version "not disclosed";',
        "minimal-responses yes;",
        "minimal-any yes;",
        "edns-udp-size 1232;",
        "rate-limit {",
        "inet 127.0.0.1 port 953 allow { 127.0.0.1; };",
    ]:
        assert_true(directive in options, f"Missing hardened option: {directive}")

    assert_true("category queries { null; };" in logging_cfg, "Query logging must be discarded")
    assert_true('zone "." IN' in zones and 'type secondary;' in zones, "Root secondary zone required")
    assert_true('zone "dns.opennic.glue" IN' in zones, "dns.opennic.glue secondary zone required")
    assert_true('trust-anchors {' in keys and '. initial-key 257 3 8 "' in keys, "OpenNIC root trust-anchor required")
    print("[PASS] BIND9 configuration directives, RRL, memory cap, and privacy logging checks")


def dns_query_raw(server: str, qname: str, qtype: int, tcp: bool = False) -> tuple[int, int, bytes]:
    header = struct.pack("!HHHHHH", 0x4242, 0x0100, 1, 0, 0, 1)
    qb = b"".join(bytes([len(p)]) + p.encode("ascii") for p in qname.strip(".").split(".") if p) + b"\x00"
    opt = b"\x00" + struct.pack("!HHIH", 41, 1232, 0x8000, 0)
    pkt = header + qb + struct.pack("!HH", qtype, 1) + opt
    if tcp:
        with socket.create_connection((server, 53), timeout=5) as s:
            s.sendall(struct.pack("!H", len(pkt)) + pkt)
            ln_raw = s.recv(2)
            assert_true(len(ln_raw) == 2, f"Truncated TCP length from {server}")
            ln = struct.unpack("!H", ln_raw)[0]
            resp = b""
            while len(resp) < ln:
                chunk = s.recv(ln - len(resp))
                if not chunk:
                    break
                resp += chunk
    else:
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.settimeout(5)
            s.sendto(pkt, (server, 53))
            resp, _ = s.recvfrom(4096)
    _, rflags, _, an, _, _ = struct.unpack("!HHHHHH", resp[:12])
    return (rflags & 0x0F), an, resp


def verify_live_opennic_upstreams() -> None:
    keys_txt = (CONFIG_DIR / "named.conf.keys").read_text(encoding="utf-8")
    m = re.search(r'257 3 8 "([^"]+)"', keys_txt)
    assert_true(m is not None, "Could not parse KSK from named.conf.keys")
    configured_ksk_b64 = m.group(1).strip()

    zones_txt = (CONFIG_DIR / "named.conf.opennic-zones").read_text(encoding="utf-8")
    primaries_block = re.search(r"primaries opennic_t1 \{(.*?)\};", zones_txt, re.S)
    assert_true(primaries_block is not None, "Missing primaries opennic_t1 block")
    # Strip commented lines before matching IPs
    active_lines = "\n".join(
        line for line in primaries_block.group(1).splitlines() if not line.strip().startswith("//")
    )
    t1_ips = re.findall(r"\b(?:\d{1,3}\.){3}\d{1,3}\b", active_lines)
    assert_true(len(t1_ips) >= 3, f"Expected >=3 active Tier 1 IPv4 primaries, got {t1_ips}")

    for ip in t1_ips:
        rc_ns, an_ns, _ = dns_query_raw(ip, ".", 2, tcp=False)
        assert_true(rc_ns == 0 and an_ns >= 4, f"Root NS UDP failed on {ip}: rc={rc_ns}, an={an_ns}")
        rc_gl, an_gl, _ = dns_query_raw(ip, "dns.opennic.glue", 6, tcp=True)
        assert_true(rc_gl == 0 and an_gl >= 1, f"dns.opennic.glue SOA TCP failed on {ip}: rc={rc_gl}, an={an_gl}")
        rc_dk, an_dk, resp_dk = dns_query_raw(ip, ".", 48, tcp=True)
        assert_true(rc_dk == 0 and an_dk >= 2, f"Root DNSKEY TCP failed on {ip}: rc={rc_dk}, an={an_dk}")
        assert_true(
            base64.b64decode(configured_ksk_b64) in resp_dk,
            f"Configured KSK missing from live DNSKEY response on {ip}",
        )
        print(f"[PASS] Live OpenNIC Tier 1 {ip}: UDP root NS, TCP glue SOA, and KSK parity verified")


def main() -> int:
    verify_compose_and_dockerfile()
    verify_bind_configs()
    verify_live_opennic_upstreams()
    print("LOCAL_PHASE1_AUDIT=PASSED")
    return 0


if __name__ == "__main__":
    sys.exit(main())
