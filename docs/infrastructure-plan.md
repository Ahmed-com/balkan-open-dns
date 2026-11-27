# Zero-Cost Infrastructure Plan

> **Initial Budget:** `$0.00 / month`
> **Target Future Initial VPS Profile:** `1 vCPU, 1 GB RAM, 15–20 GB SSD` (not yet provisioned; public deployment gated on security review, provider permission, VPS availability, and explicit owner authorization).

## 1. Phase-by-Phase `$0` Cost Strategy

| Phase | Workload | `$0` Hosting / Execution Strategy | Paid Services Used |
| --- | --- | --- | --- |
| **Phase 0** | Docs, planning, CI hygiene | GitHub Free public repository + GitHub Actions (standard free Linux runner minutes) | None |
| **Phase 1** | Tier 2 DNS Resolver dev/test | Local developer workstation Docker/Podman (`127.0.0.1` / isolated bridge only) + GitHub Actions integration tests | None |
| **Tier 2 Track** | Public Tier 2 DNS (Independent of `.balkan`) | Independently eligible post-Phase 1 once dedicated security review, VPS (`1 vCPU / 1 GB RAM`), provider permission, and owner authorization are satisfied | **None during dev (gated)** |
| **Phase 2** | Multilingual static website | GitHub Pages or Cloudflare Pages Free Tier (static HTML/CSS/JS, custom domain optional later) | None |
| **Phase 3–4** | Sandbox Registry & Admin | Local Docker + embedded SQLite (WAL) — zero external database, cache, or auth SaaS | None |
| **Phase 5** | Security & reliability tests | GitHub Actions (`gitleaks`/secret checks, dependency audit, unit/integration tests, container memory cap tests) | None |
| **Phase 6** | `.balkan` OpenNIC proposal | Repository Markdown/PDF artifacts + existing OpenNIC mailing list (`discuss@lists.opennicproject.org`) | None |
| **Phase 7** | `.balkan` TLD Activation (Future) | **BLOCKED** until Phase 5/6 complete, Tier 1 + Registry infrastructure approved, and OpenNIC community vote passes | **Blocked ($0 until authorized)** |

---

## 2. Target VPS Capacity Model (`1 vCPU / 1 GB RAM / 15–20 GB Storage`)

When the independent **Tier 2 Deployment Track** is explicitly authorized post-Phase 1, the initial VPS is sized specifically to run the **OpenNIC Public Tier 2 Resolver** reliably so the project can accumulate OpenNIC's mandatory **3-month continuous Tier 2 operational history** in parallel with Phases 2–4 without exceeding 1 GB RAM.

### Memory Allocation Budget (`1024 MB` Total)

- **Kernel & Base OS (minimal Debian/Alpine LTS):** `~180 MB`
- **Container Engine (`dockerd`/`containerd` or `podman`):** `~70 MB`
- **BIND9 Container (`--memory=512m`, `max-cache-size 256m`):** `~200–320 MB` typical (`512 MB` hard cap)
- **Swap / ZRAM Safety Buffer:** `1024 MB` swapfile or compressed `zram` (`vm.swappiness=10`) to prevent abrupt OOM kills during transient traffic bursts
- **Operational Headroom:** `~380–450 MB` free for OS security updates and socket/conntrack buffers

### Storage Allocation Budget (`15–20 GB` SSD)

- **OS + Packages + Container Images:** `~5.5 GB`
- **BIND9 Slave Zones (`.`, `dns.opennic.glue`, OpenNIC TLDs):** `< 200 MB`
- **System Logs (journald capped at `200 MB`; DNS query logging OFF):** `< 300 MB`
- **Swapfile (if disk-backed):** `1.0 GB`
- **Free Disk Headroom:** `~8–13 GB`

### Bandwidth & DDoS Reality Check

- Official OpenNIC documentation notes normal Tier 2 traffic may be a few hundred MB/month, **but amplification attacks can reach 20 Mb/s+ and consume hundreds of GB in days** if unmitigated.
- Therefore, any future VPS selection **must** satisfy four hard gates before public Tier 2 deployment unblocks:
  1. Dedicated Phase 1 Tier 2 security review completed.
  2. Written/ToS confirmation that public DNS (UDP/TCP 53) is permitted.
  3. Unmetered bandwidth or hard traffic-cap protection / automatic DDoS scrubbing that does not incur surprise overage billing, plus explicit owner authorization.
  4. Kernel firewall (`nftables`) + BIND9 RRL deployed and tested before exposing port 53.

---

## 3. Infrastructure Separation Roadmap

Because OpenNIC prohibits Tier 1 servers from acting as public ICANN recursive resolvers and requires `www.opennic.balkan` + `hostmaster@`/`abuse@`/`webmaster@` mail handling prior to a TLD vote:

1. **Stage A (Independent Tier 2 Track — Post-Phase 1, When Authorized):** Public Tier 2 Resolver on initial VPS (`1 vCPU / 1 GB RAM`), listed on `servers.opennic.org` to begin accumulating the 3+ months continuous Tier 2 history while Phases 2–4 proceed.
2. **Stage B (Pre-Proposal / Phase 6–7):** Static website on `$0` static hosting; separate low-footprint host/IP for unlisted Tier 1 authoritative DNS + Registry + inbound role email (`hostmaster@`, `abuse@`, `webmaster@`) once budget/infrastructure is explicitly authorized.
