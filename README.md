# Balkan Open DNS

> **Project Status: Phase 0 — Foundation & Architecture**
>
> **Important Notice:** The proposed `.balkan` Top-Level Domain (TLD) is **not approved or delegated by OpenNIC** and is **not yet operational**. No public DNS or registry services are deployed.

**Balkan Open DNS** is a non-commercial, community-oriented open-source DNS infrastructure project maintained by **GuardNovaX**. Its mission is to operate reliable, privacy-respecting OpenNIC DNS infrastructure and prepare a transparent, free alternative domain registration framework for a proposed `.balkan` community namespace.

## Identity & Parameters

| Attribute | Value |
| --- | --- |
| Project Name | Balkan Open DNS |
| Maintainer | GuardNovaX |
| Repository | `https://github.com/Ahmed-com/balkan-open-dns` |
| Proposed TLD | `.balkan` (Proposed — **NOT** approved or delegated by OpenNIC) |
| License | MIT ([`LICENSE`](LICENSE)) |
| Initial Infrastructure Budget | `$0` |
| Target Initial VPS Profile | 1 vCPU, 1 GB RAM, 15–20 GB storage |

## Documentation & Foundation

- [`docs/architecture.md`](docs/architecture.md) — System architecture for a 1 vCPU / 1 GB RAM VPS, component boundaries, and technology choices.
- [`docs/opennic-requirements.md`](docs/opennic-requirements.md) — Verified OpenNIC requirements matrix with official source URLs, distinguishing confirmed rules from assumptions.
- [`docs/threat-model.md`](docs/threat-model.md) — Threat model covering DNS abuse, privacy, registry/admin security, supply chain, and operational risks.
- [`docs/roadmap.md`](docs/roadmap.md) — Phased development roadmap (Phase 0 through Phase 7) with entry/exit gates and blockers.
- [`docs/infrastructure-plan.md`](docs/infrastructure-plan.md) — Zero-cost infrastructure plan (`$0` development/static hosting + target VPS resource budget).
- [`.github/workflows/ci.yml`](.github/workflows/ci.yml) — GitHub Actions CI foundation for repository hygiene and validation.

## Governance & Policies

- [`LICENSE`](LICENSE) — MIT License
- [`SECURITY.md`](SECURITY.md) — Vulnerability reporting and security testing rules
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — Contribution workflow and operational boundaries
- [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) — Community standards

## Development Phases

| Phase | Scope | Status |
| --- | --- | --- |
| **Phase 0** | Foundation, OpenNIC research, architecture, threat model, roadmap, CI | **Complete** |
| **Phase 1** | Containerized OpenNIC Tier 2 DNS resolver (localhost/isolated sandbox) | Ready / Authorized (Sandbox) |
| **Phase 1B (Gate)** | Independent Tier 2 VPS deployment readiness (separated from `.balkan` activation) | Eligible after Phase 1 + Tier 2 security review + provider permission + VPS + owner authorization |
| **Phase 2** | Multilingual public website (EN, BS, SQ, SR, HR, MK) on free static hosting | Planned |
| **Phase 3** | Lightweight sandbox-only domain registry (free, non-commercial) | Planned |
| **Phase 4** | Administrative console, RBAC, moderation, audit history | Planned |
| **Phase 5** | Security auditing, abuse-prevention & backup/restore validation | Planned |
| **Phase 6** | Draft OpenNIC `.balkan` TLD community proposal & charter (no auto-submit) | Planned |
| **Phase 7** | `.balkan` TLD production activation & public delegation | **BLOCKED** (Requires Phase 5/6 completion, 3+ months Tier 2 history, Tier 1 validation, and OpenNIC community vote) |
