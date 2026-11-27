# Phase 1 — OpenNIC Tier 2 BIND9 Resolver

Containerized, resource-bounded BIND9 Tier 2 DNS resolver tailored for a `1 vCPU / 1 GB RAM / 15–20 GB storage` VPS target.

## Security & Isolation Defaults

- **Loopback-only binding:** `docker-compose.yml` binds ports to `${DNS_BIND_IP:-127.0.0.1}:53` (UDP and TCP). Do **not** override `DNS_BIND_IP` to a public interface until security review, provider permission, and explicit owner authorization are completed.
- **No query logging:** `named.conf.logging` explicitly discards `queries` and `query-errors` (`null;`).
- **Amplification protection:** `rate-limit` (RRL), `minimal-responses yes`, `minimal-any yes`, `edns-udp-size 1232`, `allow-transfer { none; }`.
- **Memory & container caps:** `max-cache-size 256m`, `mem_limit: 512m`, `cpus: 0.85`, `read_only: true`, `no-new-privileges:true`, `cap_drop: [ALL]`.

## Quick Verification (Linux / Docker Host)

```bash
cd infrastructure/dns-tier2
./scripts/validate-config.sh
./scripts/test-integration.sh
```

## Documentation

- [DNSSEC Compatibility Assessment](../../docs/phase-1-dnssec-assessment.md)
- [VPS Deployment, Backup & Rollback Runbook](../../docs/vps-deployment-runbook.md)
