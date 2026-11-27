#!/usr/bin/env bash
set -euo pipefail

# Balkan Open DNS — Phase 1 Backup and Restore Utility
# Creates checksummed backups of BIND9 configuration and synced secondary zone cache.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
STACK_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
BACKUP_DIR="${BACKUP_DIR:-${STACK_DIR}/backups}"
VOLUME_NAME="${VOLUME_NAME:-balkan_dns_cache}"

usage() {
  echo "Usage: $0 {backup|restore <archive.tar.gz>}" >&2
  exit 2
}

cmd="${1:-}"
case "${cmd}" in
  backup)
    mkdir -p "${BACKUP_DIR}"
    ts="$(date -u +%Y%m%dT%H%M%SZ)"
    archive="${BACKUP_DIR}/balkan-dns-tier2-${ts}.tar.gz"
    tmp_dir="$(mktemp -d)"
    trap 'rm -rf "${tmp_dir}"' EXIT

    cp -a "${STACK_DIR}/config" "${tmp_dir}/config"
    if docker volume inspect "${VOLUME_NAME}" >/dev/null 2>&1; then
      docker run --rm -v "${VOLUME_NAME}:/data:ro" -v "${tmp_dir}:/out" \
        alpine:3.20@sha256:d9e853e87e55526f6b2917df91a2115c36dd7c696a35be12163d44e6e2a4b6bc \
        tar -czf /out/bind-cache.tar.gz -C /data .
    fi
    tar -czf "${archive}" -C "${tmp_dir}" .
    sha256sum "${archive}" > "${archive}.sha256"
    echo "Backup created: ${archive}"
    ;;

  restore)
    archive="${2:-}"
    [[ -n "${archive}" && -f "${archive}" ]] || usage
    if [[ -f "${archive}.sha256" ]]; then
      sha256sum -c "${archive}.sha256"
    fi
    tmp_dir="$(mktemp -d)"
    trap 'rm -rf "${tmp_dir}"' EXIT
    tar -xzf "${archive}" -C "${tmp_dir}"

    if [[ -d "${tmp_dir}/config" ]]; then
      cp -a "${tmp_dir}/config/." "${STACK_DIR}/config/"
    fi
    if [[ -f "${tmp_dir}/bind-cache.tar.gz" ]]; then
      docker volume create "${VOLUME_NAME}" >/dev/null
      docker run --rm -v "${VOLUME_NAME}:/data" -v "${tmp_dir}:/in:ro" \
        alpine:3.20@sha256:d9e853e87e55526f6b2917df91a2115c36dd7c696a35be12163d44e6e2a4b6bc \
        sh -c "rm -rf /data/* && tar -xzf /in/bind-cache.tar.gz -C /data"
    fi
    echo "Restore completed. Run ./scripts/validate-config.sh before restarting container."
    ;;

  *)
    usage
    ;;
esac
