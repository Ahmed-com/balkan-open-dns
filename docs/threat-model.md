# Threat Model — Balkan Open DNS

> **Scope:** Phase 0 architectural threat assessment covering Phase 1 (DNS Tier 2), Phase 2 (Static Website), Phases 3–4 (Sandbox Registry & Admin), CI/Supply Chain, and OpenNIC Operational Governance.
> **Methodology:** STRIDE-informed asset, actor, vector, and control analysis tailored to a `$0` budget and `1 vCPU / 1 GB RAM` VPS target.

## 1. Critical Assets

| Asset | Sensitivity | Availability Target |
| --- | --- | --- |
| User DNS query privacy | **High** (browsing metadata is PII) | Must never be logged/archived un-anonymized |
| DNS resolution integrity | **High** (cache poisoning/spoofing redirects users) | Accurate OpenNIC + ICANN answers |
| Host bandwidth & RAM (`1 GB`) | **High** (resource exhaustion causes outage) | Bounded cache, RRL, firewall protection |
| Registry user/admin credentials & audit logs | **High** (account takeover compromises zone data) | Sandbox-only in Phases 3–4; RBAC + MFA |
| `.balkan` zone integrity (sandbox -> future) | **High** (unauthorized edits hijack domains) | `named-checkzone` + signed/audited writes |
| Repository & CI secrets | **Critical** (repo takeover / supply-chain poisoning) | Zero committed secrets, pinned actions |

---

## 2. Threat Scenarios & Mitigations

### 2.1 DNS Infrastructure Threats (Phase 1 & Independent Tier 2 Deployment Track)

| ID | Threat | Vector / Impact | Likelihood | Severity | Planned Controls |
| --- | --- | --- | --- | --- | --- |
| TH-DNS-01 | **DNS Amplification / Reflection DDoS** | Attackers spoof victim source IPs with `ANY`, `TXT`, or DNSSEC queries to amplify UDP traffic, exhausting VPS bandwidth/provider limits (OpenNIC notes up to 20 Mb/s+ attacks). | High (when public) | **Critical** | BIND9 Response Rate Limiting (`rate-limit`), `minimal-responses yes;`, disable/restrict `ANY` via firewall/RRL, drop spoofed/excessive bursts at `nftables`/`iptables`, BCP38-compliant hosting provider, keep Phase 1 strictly bound to `127.0.0.1`/isolated network. |
| TH-DNS-02 | **Query Log PII Exposure** | Enabling raw BIND query logs exposes user IP addresses and visited domains, violating OpenNIC privacy norms and creating breach liability. | Medium | **High** | Default `querylog` disabled (`log-queries: no` / no query channel); if temporary debugging is ever needed in sandbox, enforce IP scrubbing and zero archival. |
| TH-DNS-03 | **Refusal Packet Amplification (`REFUSED`)** | Misconfigured ACLs or flood queries returning `REFUSED` packets still consume outbound bandwidth. | Medium | **Medium** | Public Tier 2 serves `allow-recursion { any; }` with RRL (`slip`/`errors-per-second` caps); drop abusive sources at kernel firewall before BIND9 processes them. |
| TH-DNS-04 | **Cache Poisoning / Upstream Spoofing** | Forged responses or tampered slave zone transfers redirect OpenNIC or ICANN lookups. | Medium | **High** | Source-port randomization (verified via DNS-OARC port test), EDNS buffer sizing (`1232` bytes), DNSSEC validation with verified OpenNIC root key, restrict `masters` strictly to verified Tier 1 IPs, and validate TSIG where supported. |
| TH-DNS-05 | **DNSSEC Misconfiguration Causing Outage** | Stale OpenNIC root `trust-anchors` or strict validation on unsigned/broken alt-TLDs causes widespread `SERVFAIL` and fails OpenNIC automated tests. | Medium | **High** | Verify live root `DNSKEY` prior to activation, document key rotation monitoring via OpenNIC mailing list, and include Phase 1 DNSSEC compatibility test matrix. |
| TH-DNS-06 | **OOM Crash on `1 GB RAM` VPS** | Unbounded BIND9 cache + attacker NXDOMAIN/random-subdomain water-torture attack exhausts 1 GB RAM, triggering Linux OOM killer. | High | **High** | Enforce `max-cache-size 256m;`, container `--memory=512m` limit, `recursive-clients` cap, and 1 GB swap/zram cushion. |
| TH-DNS-07 | **Insecure Upstream Sync Script (`srvzone`)** | OpenNIC's documented `srvzone` fetch uses unauthenticated plaintext HTTP (`http://161.97.219.84/...`), enabling MITM injection of malicious zone masters/configs. | Medium | **Critical** | **Do not execute remote HTTP scripts directly.** Maintain verified, Git-reviewed zone configuration templates with integrity checks and explicit Tier 1 master validation. |

### 2.2 Public Website Threats (Phase 2)

| ID | Threat | Vector / Impact | Likelihood | Severity | Planned Controls |
| --- | --- | --- | --- | --- | --- |
| TH-WEB-01 | **Misrepresentation of `.balkan` Status** | Website or localization copy falsely implies `.balkan` is active/approved, causing user confusion or OpenNIC rejection. | Medium | **Medium** | Mandatory prominent "Proposed / Not Operational" banner across all 6 locales; CI string check against unauthorized claims. |
| TH-WEB-02 | **Third-Party Script / XSS / Tracker Injection** | Compromised CDN script or unsafe template rendering leaks visitor data or defaces site. | Low | **Medium** | 100% static build, self-hosted fonts/assets, strict CSP (`default-src 'self'`), no external analytics/cookies. |

### 2.3 Registry & Admin Threats (Phases 3–4, Sandbox-Only)

| ID | Threat | Vector / Impact | Likelihood | Severity | Planned Controls |
| --- | --- | --- | --- | --- | --- |
| TH-REG-01 | **Domain Squatting / Reserved Name Abuse** | Automated bots register trademarked, infrastructure (`opennic.balkan`, `nic.balkan`, `admin.balkan`), or offensive names. | High | **Medium** | Reserved names blocklist, per-account domain quotas, rate-limited registration API, CAPTCHA/proof-of-work or verification gate (future), and renewal/expiration cleanup. |
| TH-REG-02 | **Zone Injection via Malicious DNS Records** | Crafted `TXT`, `CNAME`, or hostname inputs break RFC 1035 zone file syntax or inject extra records. | Medium | **Critical** | Strict RFC 1035/1123 hostname & record-type allowlist validation, parameterized SQLite queries, serialized zone generation, and mandatory `named-checkzone` pass before reload. |
| TH-REG-03 | **Admin Privilege Escalation / Session Hijack** | Weak admin auth or missing RBAC checks allow regular users to modify/delete others' domains or abuse logs. | Medium | **Critical** | Deny-by-default RBAC middleware, Argon2id hashing, `HttpOnly`/`SameSite=Lax` cookies, CSRF protection, mandatory TOTP 2FA for `admin`/`moderator` roles, immutable audit log. |
| TH-REG-04 | **SQLite Locking / Corruption** | Concurrent registry API writes corrupt or lock database. | Low | **Medium** | Single-writer connection pool, SQLite `WAL` mode + `busy_timeout`, atomic `.backup` snapshots, verified restore tests in Phase 5. |

### 2.4 Supply Chain, CI & Operational Threats (All Phases)

| ID | Threat | Vector / Impact | Likelihood | Severity | Planned Controls |
| --- | --- | --- | --- | --- | --- |
| TH-OPS-01 | **Secret / PII Leakage in Git History** | Accidental commit of `.env`, SSH/TLS keys, or personal email addresses. | Medium | **Critical** | `.gitignore` rules, local Git noreply email requirement, CI secret-pattern scanning, and GitHub push protection. |
| TH-OPS-02 | **VPS Provider ToS Suspension** | Running an open recursive DNS resolver without explicit provider approval triggers automated abuse suspension during DDoS. | High | **High** | Hard deployment blocker requiring written/explicit provider permission for public DNS port 53 UDP/TCP before Tier 2 activation. |
| TH-OPS-03 | **48-Hour OpenNIC Delisting** | Silent resolver crash or TCP/53 block causes automated OpenNIC tests to fail for >48h, moving server to `pending deletion`. | Medium | **Medium** | Local health checks + external monitoring alerts + documented `servers.opennic.org` maintenance-disable SOP prior to planned work. |
| TH-OPS-04 | **Unpinned Container / Action Supply Chain** | Compromised `latest` Docker tag or third-party GitHub Action executes malicious code. | Medium | **High** | Pin GitHub Actions to major/SHA tags as policy tightens; pin container image versions/digests in Phase 1+. |
