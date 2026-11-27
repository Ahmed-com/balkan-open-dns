# Phase 1 — Tier 2 DNS Security Review

> **Review Scope:** `infrastructure/dns-tier2/` container image, BIND9 configuration, runtime isolation, DNSSEC policy, abuse mitigation, and OpenNIC upstream dependencies.
> **Branch:** `phase-1-validation` (isolated CI / sandbox validation only; no production deployment).

## 1. Security Control Verification Matrix

| Control Area | Implementation | Status | Notes |
| --- | --- | --- | --- |
| **Immutable Image Digest Pinning** | `internetsystemsconsortium/bind9:9.20@sha256:978201d91548ec63c3b1c1befd5e6a3c9fa127f79f9058fd82d8e3493fe90ce1` (`Dockerfile`, `validate-config.sh`) and `alpine:3.20@sha256:d9e853e87e55526f6b2917df91a2115c36dd7c696a35be12163d44e6e2a4b6bc` (`backup-restore.sh`) | Hardened | Prevents silent upstream tag mutation. |
| **Container Isolation & Least Privilege** | `USER bind`, `read_only: true`, `no-new-privileges:true`, `cap_drop: [ALL]` (zero added capabilities), internal unprivileged port `5353`, `rndc` bound to `127.0.0.1:953` | Hardened | Resolves Trivy `DS-0002` and eliminates all Linux capabilities (`NET_BIND_SERVICE`, `CHOWN`, `FOWNER`, `SETUID`, `SETGID` dropped). |
| **Loopback / Sandbox Network Isolation** | `docker-compose.yml` binds `${DNS_BIND_IP:-127.0.0.1}:${DNS_PORT:-53}` (UDP + TCP) | Hardened | Never exposes a public recursive resolver in dev/CI. |
| **Recursion ACLs** | `allow-query`, `allow-recursion`, `allow-query-cache` set to `sandbox_clients` (`localhost`, RFC1918, `::1`); `allow-transfer { none; };` | Hardened (Sandbox) | Must be explicitly switched to `{ any; }` only after VPS + provider + owner authorization for public Tier 2 operation. |
| **DNS Amplification & Abuse Mitigation** | `rate-limit` (10 resp/s, 5 err/nxdomain/nodata/ref/s, 50 all/s, `slip 2`, `window 15`), `minimal-responses yes;`, `minimal-any yes;`, `edns-udp-size 1232;`, `max-udp-size 1232;` | Hardened | Removed `exempt-clients { localhost; }` so RRL protects uniformly and can be validated locally. |
| **Resource Exhaustion Protection** | `max-cache-size 256m;`, `max-cache-ttl 86400;`, `max-ncache-ttl 3600;`, `recursive-clients 1000;`, `tcp-clients 100;`, `mem_limit: 512m`, `cpus: 0.85`, `pids_limit: 128` | Hardened | Designed to leave ~400 MB RAM headroom on a `1 vCPU / 1 GB RAM` VPS. |
| **Query Privacy** | `category queries { null; };`, `category query-errors { null; };`, `qname-minimization relaxed;`, `version "not disclosed";`, `hostname none;`, `server-id none;` | Hardened | Zero client query IPs or domain lookups written to disk. |
| **Zone Sync & Trust-Anchor Integrity** | Declarative `primaries opennic_t1` over TCP/53 AXFR from verified passing Tier 1 servers (`ns2`, `ns4`, `ns6`, `ns7`) + explicit `trust-anchors` (`keytag=60820`) | Hardened | Eliminated plaintext HTTP `srvzone` execution risk. |

---

## 2. Unresolved Upstream OpenNIC DNSSEC Anomalies (Documented — Not Suppressed)

Per project security policy, **`dnssec-validation yes;` remains strictly enforced without adding `validate-except` bypasses to manufacture passing tests.**

Live TCP/53 upstream probes (`2026-11-27`) and Linux BIND 9.20 recursive container validation (`2026-11-27`) recorded the following upstream behaviors:

1. **`.o` (`SERVFAIL` in recursive BIND9 validation):** OpenNIC root carries 5 `DS` records for `.o`, while authoritative queries failed DNSSEC validation (`named-security.log`: `validating o/SOA: got insecure response; parent indicates it should be secure`).
2. **`.chan` (`SERVFAIL` in recursive BIND9 validation):** Upstream `.chan` zone signatures are expired (`named-security.log`: `validating chan/DNSKEY: verify failed due to bad signature (keyid=27151): RRSIG has expired`).
3. **`.fur` (`NOERROR` without `AD` in recursive BIND9; `SERVFAIL` when querying `ns2` directly):** Resolves as unsigned/insecure delegation recursively (`DS=0`), while direct `ns2` (`161.97.219.84`) probe returned `SERVFAIL`.
4. **`.free` and `.ing` (`NOERROR + AD` in recursive BIND9):** Despite returning 0 `DNSKEY` answers on `ns2` (`161.97.219.84`), recursive resolution to their authoritative masters validated cleanly with `AD=1`.
5. **Offline Tier 1 servers on `servers.opennic.org/?tier=1`:** `ns8.opennic.glue` (`178.63.116.152`) and `ns10.opennic.glue` (`188.226.146.136`) are marked `Offline` and excluded from active `primaries opennic_t1`.
6. **IPv4-only container bridge behavior:** Inside an IPv4-only Docker bridge (`enable_ipv6: false`), omitting `-4` caused cold recursive queries (`isc.org`) to suffer transient `SERVFAIL` on unreachable IPv6 upstream NS attempts; `docker-compose.yml` sets `-4` to match the IPv4-only sandbox bridge.

---

### 3. Open Risks Requiring Ongoing Control

- **Static Trust-Anchor Drift:** Because OpenNIC requires `dnssec-validation yes;` with manual `trust-anchors`, KSK rotation (`60820`) without updating `named.conf.keys` will break DNSSEC validation. Automated monitoring + OpenNIC mailing list tracking are mandatory prior to public Tier 2 operation.
- **Public VPS Firewall Prerequisite:** Container RRL alone does not stop volumetric UDP floods from saturating a 1 GB VPS NIC/bandwidth quota; host-level `nftables` rate limits (documented in [docs/vps-deployment-runbook.md](vps-deployment-runbook.md)) and provider DDoS/ToS approval remain hard pre-deployment gates.
