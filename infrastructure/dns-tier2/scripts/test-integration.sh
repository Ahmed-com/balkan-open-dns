#!/usr/bin/env bash
set -euo pipefail

# Balkan Open DNS — Phase 1 Automated Integration Test Suite
# Runs against the local sandbox container bound strictly to 127.0.0.1:53.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
STACK_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
CONTAINER="balkan-dns-tier2"
TARGET_IP="${DNS_BIND_IP:-127.0.0.1}"
TARGET_PORT="${DNS_PORT:-53}"

pass() { echo "[PASS] $*"; }
fail() { echo "[FAIL] $*" >&2; exit 1; }

echo "=== 1. Starting local sandbox BIND9 container ==="
docker compose -f "${STACK_DIR}/docker-compose.yml" up -d --build

echo "Waiting for container healthcheck..."
for _ in $(seq 1 30); do
  status="$(docker inspect --format='{{.State.Health.Status}}' "${CONTAINER}" 2>/dev/null || echo "starting")"
  if [[ "${status}" == "healthy" ]]; then
    pass "Container reached healthy state"
    break
  fi
  sleep 2
done
[[ "${status}" == "healthy" ]] || fail "Container failed to reach healthy state (status=${status})"

echo "=== 2. Configuration validation (named-checkconf) ==="
docker exec "${CONTAINER}" named-checkconf /etc/bind/named.conf && pass "named-checkconf syntax valid"

echo "=== 3. Secondary zone synchronization check ==="
for zf in /var/cache/bind/db.root /var/cache/bind/db.dns.opennic.glue /var/cache/bind/db.opennic.glue; do
  docker exec "${CONTAINER}" test -s "${zf}" && pass "Zone file synced: ${zf}" || fail "Missing synced zone file: ${zf}"
done

echo "=== 4. Normal ICANN domain resolution (UDP + TCP) ==="
icann_udp="$(docker exec "${CONTAINER}" dig @"${TARGET_IP}" -p "${TARGET_PORT}" +short +time=5 example.org A)"
[[ -n "${icann_udp}" ]] && pass "ICANN UDP resolution succeeded (example.org -> ${icann_udp//$'\n'/, })" || fail "ICANN UDP resolution failed"

icann_tcp="$(docker exec "${CONTAINER}" dig @"${TARGET_IP}" -p "${TARGET_PORT}" +tcp +short +time=5 example.org A)"
[[ -n "${icann_tcp}" ]] && pass "ICANN TCP fallback resolution succeeded" || fail "ICANN TCP resolution failed"

echo "=== 5. OpenNIC domain resolution ==="
for domain in "opennic.glue" "dns.opennic.glue" "be.libre" "grep.geek"; do
  ans="$(docker exec "${CONTAINER}" dig @"${TARGET_IP}" -p "${TARGET_PORT}" +short +time=5 "${domain}" A || true)"
  [[ -n "${ans}" ]] && pass "OpenNIC resolution succeeded (${domain} -> ${ans//$'\n'/, })" || echo "[WARN] Empty A answer for ${domain} (check upstream reachability)"
done

echo "=== 6. DNSSEC behavior check ==="
ad_check="$(docker exec "${CONTAINER}" dig @"${TARGET_IP}" -p "${TARGET_PORT}" +dnssec +time=5 isc.org A | grep -E "flags:.*ad" || true)"
[[ -n "${ad_check}" ]] && pass "DNSSEC AD bit present for signed ICANN domain (isc.org)" || fail "Missing DNSSEC AD bit for isc.org"

bogus_rc="$(docker exec "${CONTAINER}" dig @"${TARGET_IP}" -p "${TARGET_PORT}" +time=5 dnssec-failed.org A | awk '/status:/ {print $6}' | tr -d ',')"
[[ "${bogus_rc}" == "SERVFAIL" ]] && pass "DNSSEC rejects bogus signature (dnssec-failed.org -> SERVFAIL)" || fail "Expected SERVFAIL for dnssec-failed.org, got ${bogus_rc}"

echo "=== 7. Privacy & abuse mitigation checks ==="
ver_out="$(docker exec "${CONTAINER}" dig @"${TARGET_IP}" -p "${TARGET_PORT}" +short chaos txt version.bind || true)"
[[ "${ver_out}" == '"not disclosed"' ]] && pass "BIND version hidden (${ver_out})" || fail "Unexpected version.bind: ${ver_out}"

axfr_rc="$(docker exec "${CONTAINER}" dig @"${TARGET_IP}" -p "${TARGET_PORT}" +time=3 opennic.glue AXFR | awk '/status:/ {print $6}' | tr -d ',')"
[[ "${axfr_rc}" == "REFUSED" ]] && pass "External AXFR refused by Tier 2 resolver" || fail "Expected AXFR REFUSED, got ${axfr_rc}"

echo "=== 8. Failure recovery check ==="
docker restart "${CONTAINER}" >/dev/null
sleep 4
docker exec "${CONTAINER}" /usr/local/bin/healthcheck.sh && pass "Container recovered cleanly after restart"

echo "=== 9. Resource consumption snapshot ==="
docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.MemPerc}}\t{{.PIDs}}" "${CONTAINER}"

echo "All Phase 1 integration tests passed."
