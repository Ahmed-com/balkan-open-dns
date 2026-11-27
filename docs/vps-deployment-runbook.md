# VPS Deployment, Backup, Migration, and Rollback Runbook (Debian 12 / Ubuntu 24.04 LTS)

> **Authorization Notice:** Public VPS deployment of the Tier 2 resolver is **GATED** and must **NOT** be executed until:
> 1. Phase 1 container integration tests pass on a Linux host.
> 2. Dedicated Tier 2 security review is completed.
> 3. A `1 vCPU, 1 GB RAM, 15–20 GB SSD` VPS is available.
> 4. The hosting provider **explicitly permits** public DNS service on UDP/TCP port 53.
> 5. The project owner provides explicit authorization.

---

## 1. Host Prerequisites & Sizing (`1 vCPU / 1 GB RAM / 15–20 GB Storage`)

1. **OS:** Fresh minimal **Debian 12 (Bookworm)** or **Ubuntu 24.04 LTS** server with no desktop environment.
2. **Swap safety cushion (`1 GB`):**
   ```bash
   sudo fallocate -l 1G /swapfile
   sudo chmod 600 /swapfile
   sudo mkswap /swapfile
   sudo swapon /swapfile
   echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
   echo 'vm.swappiness=10' | sudo tee /etc/sysctl.d/99-balkan-dns.conf
   sudo sysctl --system
   ```
3. **Log size cap (`journald`):** Cap `/etc/systemd/journald.conf` (`SystemMaxUse=200M`) so logs cannot fill the 15–20 GB disk.
4. **Docker Engine:** Install official Docker Engine + Compose plugin from Debian/Ubuntu official Docker repository (verify GPG signatures; never run unverified `curl | sh` scripts).

---

## 2. Host Firewall Hardening (`nftables`)

OpenNIC requires both **UDP and TCP port 53** reachable publicly for a listed Tier 2 resolver, while also warning of DNS amplification attacks. Apply host-level rate limits before opening port 53:

```nft
#!/usr/sbin/nft -f
flush ruleset

table inet filter {
    chain input {
        type filter hook input priority 0; policy drop;

        iif "lo" accept
        ct state established,related accept
        ct state invalid drop

        # SSH management (restrict to admin IP/VPN where possible)
        tcp dport 22 ct state new limit rate 10/minute accept

        # ICMP / ICMPv6 essentials
        ip protocol icmp icmp type { echo-request, destination-unreachable, time-exceeded } limit rate 5/second accept
        ip6 nexthdr ipv6-icmp icmpv6 type { echo-request, destination-unreachable, packet-too-big, time-exceeded, nd-neighbor-solicit, nd-neighbor-advert, nd-router-advert } accept

        # DNS TCP/UDP port 53 with per-source-IP flood protection
        udp dport 53 meter dns_udp_limit { ip saddr limit rate over 30/second burst 60 packets } drop
        udp dport 53 accept
        tcp dport 53 ct state new meter dns_tcp_limit { ip saddr limit rate over 15/second burst 30 packets } drop
        tcp dport 53 accept
    }

    chain forward {
        type filter hook forward priority 0; policy drop;
    }

    chain output {
        type filter hook output priority 0; policy accept;
    }
}
```

> **Note:** On Ubuntu, ensure `systemd-resolved` stub listener (`127.0.0.53:53`) does not conflict with port 53 binding if binding `0.0.0.0:53` (`DNSStubListener=no` in `/etc/systemd/resolved.conf`).

---

## 3. Deployment Steps (When Explicitly Authorized)

1. Clone repository at the approved release tag/commit (do **not** run unpinned main without review).
2. Review [`infrastructure/dns-tier2/config/named.conf.options`](../infrastructure/dns-tier2/config/named.conf.options):
   - Change `allow-query`, `allow-recursion`, `allow-query-cache` from `{ sandbox_clients; };` to `{ any; };` (required for public OpenNIC Tier 2 testing).
   - Verify live OpenNIC Tier 1 primaries (`dig . NS @161.97.219.84`) and root KSK (`dig DNSKEY . @161.97.219.84 +short`).
3. Create `.env` (gitignored) setting `DNS_BIND_IP=<VPS_PUBLIC_IPV4>` and `DNS_PORT=53`.
4. Validate and start:
   ```bash
   cd infrastructure/dns-tier2
   ./scripts/validate-config.sh
   docker compose up -d --build
   ./scripts/monitor.sh
   ```
5. Register/test server on `https://servers.opennicproject.org/srvtest3/` and list on `https://servers.opennic.org/` with accurate no-logging policy.

---

## 4. Backup, Restore, Migration, and Rollback Procedures

### Backup
```bash
cd infrastructure/dns-tier2
./scripts/backup-restore.sh backup
```
Creates a timestamped `.tar.gz` + `.sha256` archive of `config/` and the `balkan_dns_cache` zone volume.

### Restore
```bash
cd infrastructure/dns-tier2
docker compose down
./scripts/backup-restore.sh restore backups/balkan-dns-tier2-<TIMESTAMP>.tar.gz
./scripts/validate-config.sh
docker compose up -d
```

### Server Migration (IP Change)
Per OpenNIC's [`listserver`](https://wiki.opennic.org/opennic/setup/listserver) policy:
1. Log into `https://servers.opennic.org/` and disable the existing server entry before taking it offline (prevents >48h failure deletion).
2. Provision and test the new VPS using this runbook (`./scripts/monitor.sh` + OpenNIC `srvtest3` check).
3. Update or re-register the new IP on `servers.opennic.org` and notify OpenNIC maintainers if manual approval is needed.
4. Decommission the old VPS only after the new resolver passes automated tests.

### Rollback
1. If a config change breaks resolution:
   ```bash
   git checkout <previous-good-commit> -- infrastructure/dns-tier2/config/
   ./scripts/validate-config.sh
   docker compose up -d --force-recreate
   ```
2. If an image upgrade regresses: pin `Dockerfile` back to the prior verified digest/version and re-run `docker compose up -d --build`.
3. If an ongoing DDoS threatens VPS stability or provider limits: immediately disable public listing on `servers.opennic.org`, set `DNS_BIND_IP=127.0.0.1` or stop container (`docker compose down`), and notify OpenNIC operators.

---

## 5. VPS Deployment Readiness Checklist

- [ ] Container integration suite (`./scripts/test-integration.sh`) passes on Linux Docker host.
- [ ] Measured idle and load RAM stays well under `512m` container cap (`<= 1 GB` host budget).
- [ ] Dedicated Tier 2 security review completed with zero unresolved critical/high findings.
- [ ] VPS (`1 vCPU, 1 GB RAM, 15–20 GB SSD`) acquired with unmetered or DDoS-safe bandwidth policy.
- [ ] Hosting provider explicitly permits public UDP/TCP port 53 DNS resolver.
- [ ] `nftables` rate-limiting firewall active and SSH hardened (key-only auth).
- [ ] Live OpenNIC Tier 1 primaries and root `DNSKEY` re-verified immediately before launch.
- [ ] Explicit owner deployment authorization recorded.
