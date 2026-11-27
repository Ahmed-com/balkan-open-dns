#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
STACK_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

echo "[1/2] Validating Docker Compose manifest..."
docker compose -f "${STACK_DIR}/docker-compose.yml" config >/dev/null

echo "[2/2] Validating BIND9 configuration syntax inside container..."
docker run --rm \
  -v "${STACK_DIR}/config/named.conf:/etc/bind/named.conf:ro" \
  -v "${STACK_DIR}/config/named.conf.options:/etc/bind/named.conf.options:ro" \
  -v "${STACK_DIR}/config/named.conf.keys:/etc/bind/named.conf.keys:ro" \
  -v "${STACK_DIR}/config/named.conf.opennic-zones:/etc/bind/named.conf.opennic-zones:ro" \
  -v "${STACK_DIR}/config/named.conf.logging:/etc/bind/named.conf.logging:ro" \
  --entrypoint named-checkconf \
  internetsystemsconsortium/bind9:9.20@sha256:978201d91548ec63c3b1c1befd5e6a3c9fa127f79f9058fd82d8e3493fe90ce1 \
  -z /etc/bind/named.conf

echo "Configuration validation passed."
