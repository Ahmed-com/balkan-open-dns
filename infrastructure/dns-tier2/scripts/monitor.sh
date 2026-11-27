#!/usr/bin/env bash
set -euo pipefail

# Lightweight operational monitor for 1 vCPU / 1 GB RAM Tier 2 host.
CONTAINER="${CONTAINER:-balkan-dns-tier2}"
TARGET_IP="${DNS_BIND_IP:-127.0.0.1}"
MAX_MEM_PCT="${MAX_MEM_PCT:-85}"

if ! docker inspect --format='{{.State.Running}}' "${CONTAINER}" 2>/dev/null | grep -q true; then
  echo "ALERT: Container ${CONTAINER} is not running" >&2
  exit 1
fi

health="$(docker inspect --format='{{.State.Health.Status}}' "${CONTAINER}" 2>/dev/null || echo unknown)"
if [[ "${health}" != "healthy" ]]; then
  echo "ALERT: Container ${CONTAINER} health=${health}" >&2
  exit 1
fi

mem_pct="$(docker stats --no-stream --format '{{.MemPerc}}' "${CONTAINER}" | tr -d '%' | cut -d. -f1)"
if [[ -n "${mem_pct}" && "${mem_pct}" -ge "${MAX_MEM_PCT}" ]]; then
  echo "ALERT: Container memory usage ${mem_pct}% >= ${MAX_MEM_PCT}%" >&2
  exit 1
fi

docker exec "${CONTAINER}" dig "@${TARGET_IP}" +time=3 +tries=1 +short dns.opennic.glue SOA >/dev/null
docker exec "${CONTAINER}" dig "@${TARGET_IP}" +tcp +time=3 +tries=1 +short opennic.glue NS >/dev/null

echo "OK: ${CONTAINER} healthy (mem=${mem_pct}%, UDP+TCP responsive)"
