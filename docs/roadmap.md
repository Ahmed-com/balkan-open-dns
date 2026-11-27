# Development Roadmap

> **Governance Rule:** Each phase requires explicit authorization before implementation begins. Tier 2 public resolver deployment readiness is **decoupled** from final `.balkan` TLD activation so the mandatory 3+ months of continuous OpenNIC Tier 2 operational history can accumulate in parallel with website, registry, and admin development.

## Phase Overview

| Phase | Title | Status | Gate / Blocker |
| --- | --- | --- | --- |
| **Phase 0** | Foundation and Architecture | **Complete** | Committed and validated in CI |
| **Phase 1** | OpenNIC Tier 2 DNS (Sandbox) | **Authorized (Next)** | Local/isolated sandbox only (`127.0.0.1` / Docker bridge) |
| **Tier 2 Deployment Track** | Independent Tier 2 Production Readiness | **Independently Eligible Post-Phase 1** | Requires Phase 1 completion, dedicated Tier 2 security review, VPS availability, explicit provider port-53 permission, and explicit owner authorization |
| **Phase 2** | Public Website (Static, 6 Locales) | Pending Approval | Requires explicit authorization |
| **Phase 3** | Domain Registry (Sandbox-Only) | Pending Approval | Requires Phase 1–2 alignment & explicit authorization |
| **Phase 4** | Administration & Moderation | Pending Approval | Requires Phase 3 core registry models |
| **Phase 5** | Security, Reliability & CI Hardening | Pending Approval | Requires Phases 1–4 implemented in sandbox |
| **Phase 6** | OpenNIC `.balkan` Proposal Package | Pending Approval | Requires 3+ months Tier 2 runtime (for actual submission) & Phase 5 readiness |
| **Phase 7** | `.balkan` TLD Deployment & Public Activation | **BLOCKED** | Hard external, legal/ToS, security, Tier 1, and OpenNIC community vote blockers |

---

## Detailed Phase Plan

### Phase 0 — Foundation and Architecture *(Complete)*
- **Deliverables:** `README.md`, `LICENSE` (MIT), `SECURITY.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `.gitignore`, `docs/architecture.md`, `docs/opennic-requirements.md`, `docs/threat-model.md`, `docs/roadmap.md`, `docs/infrastructure-plan.md`, `.github/workflows/ci.yml`.
- **Exit Criteria:** All foundation documents complete, OpenNIC requirements verified with official URLs, local CI hygiene checks passing, and owner approval received to publish to `origin/main`.

### Phase 1 — OpenNIC Tier 2 DNS *(Authorized Sandbox Scope)*
- **Scope:** Reproducible containerized BIND9 Tier 2 resolver bound strictly to `127.0.0.1` / isolated Docker bridge network.
- **Deliverables:**
  - Hardened `named.conf` (Slave Zone Method for `.` and `dns.opennic.glue` + OpenNIC TLDs, RRL rate limiting, `minimal-responses`, bounded `max-cache-size` for 1 GB RAM, privacy-compliant no-query-log default).
  - Verified zone synchronization configuration (avoiding unauthenticated HTTP `srvzone` script execution).
  - DNSSEC compatibility assessment and test script (`dig` + `delv`).
  - UDP & TCP port 53 integration tests, container healthcheck, resource limits (`--memory`, `--cpus`), backup/restore & rollback runbooks, and VPS deployment documentation.
- **Exit Criteria:** Container passes local UDP/TCP resolution, RRL, DNSSEC assessment, and OOM-limit checks without exposing public ports.

### Independent Tier 2 Deployment Track *(Separated from `.balkan` Activation)*
- **Rationale:** OpenNIC requires **at least 3 months of continuous Tier 2 operation** before proposing a new TLD. Decoupling Tier 2 deployment from Phases 2–6 avoids blocking that operational history on full registry/admin development.
- **Eligibility Gates (all mandatory prior to any public Tier 2 deployment):**
  1. Phase 1 implementation and integration tests completed.
  2. Dedicated Tier 2 security review completed with zero critical/high open findings.
  3. Suitable VPS (`1 vCPU, 1 GB RAM, 15–20 GB storage`) available.
  4. Hosting provider explicitly permits operating a public DNS resolver on UDP/TCP port 53.
  5. Explicit owner authorization to deploy Tier 2 publicly.

### Phase 2 — Public Website
- **Scope:** Responsive, accessible static website targeting `$0` static hosting (GitHub Pages / Cloudflare Pages free tier).
- **Design & Localization:** Dark navy, white, restrained blue accents; mobile-first WCAG 2.1 AA; localization architecture for English (`en`), Bosnian (`bs`), Albanian (`sq`), Serbian (`sr`), Croatian (`hr`), and Macedonian (`mk`).
- **Required Pages:** Home, About, Documentation, DNS Servers, Network Status (no fake metrics), Proposed `.balkan` TLD (explicitly labeled proposed/not operational), Privacy Policy, Acceptable Use Policy, Community & Contribution.

### Phase 3 — Domain Registry *(Sandbox-Only)*
- **Scope:** Lightweight single-service API + SQLite (WAL) supporting free, non-commercial `.balkan` sandbox registrations.
- **Features:** Domain availability search, user registration/auth, free registration, ownership records, nameserver & DNS record management (`A`, `AAAA`, `CNAME`, `MX`, `TXT`, `NS`), renewal/expiration policies, reserved-names list, abuse reporting, append-only audit logs, REST API, and RFC 1035 zone export verified with `named-checkzone`.
- **Prohibitions:** Zero payment processing, zero commercial sales.

### Phase 4 — Administration
- **Scope:** RBAC (`admin`, `moderator`, `user`), domain & user management, abuse moderation queue, sandbox DNS health monitoring, real-data-only registry statistics, audit log viewer, and MFA-protected admin login.

### Phase 5 — Security and Reliability
- **Scope:** Dependency vulnerability auditing, secret scanning, authentication/authorization tests, DNS RRL & amplification-prevention tests, memory/CPU stress verification (`<= 1 GB RAM` simulation), SQLite & zone backup/restore drills, CI enforcement, and deployment readiness report.

### Phase 6 — OpenNIC `.balkan` Proposal
- **Scope:** Draft complete OpenNIC proposal package: governance model, `.balkan` charter (purpose, non-commercial rules, prohibited content, amendment rules), technical architecture, registration policies, `hostmaster@`/`abuse@`/`webmaster@` readiness plan, and verified eligibility checklist (including the 3-month continuous Tier 2 prerequisite and unlisted Tier 1 test prerequisite).
- **Prohibition:** Do **not** submit the proposal automatically to OpenNIC mailing lists.

### Phase 7 — `.balkan` TLD Deployment and Activation *(BLOCKED)*
- **Hard Blockers (all must be satisfied before unblocking):**
  1. Suitable infrastructure for Tier 1 authoritative DNS + Registry + role mail (`hostmaster@`, `abuse@`, `webmaster@`) is available and approved.
  2. Hosting provider **explicitly permits** the intended DNS/registry services.
  3. Phase 5 full-stack security review is completed with zero critical/high unresolved findings.
  4. Project owner explicitly authorizes `.balkan` production deployment.
  5. OpenNIC Tier 2 (3+ continuous months) and unlisted Tier 1 technical compliance checks pass (`servers.opennic.org` / automated test suite).
  6. **Public `.balkan` delegation remains strictly blocked** until formal `[DISCUSSION]`, `[VOTE]`, and OpenNIC community approval succeed.
