# Security Policy

## Project Status Notice

Balkan Open DNS is currently in **Phase 0 (Foundation and Architecture)**. No public DNS resolvers, domain registries, or production endpoints are deployed, and the proposed `.balkan` TLD is **not** approved or delegated by OpenNIC.

## Supported Scope

| Component / Phase | Status | Security Support |
| --- | --- | --- |
| Phase 0: Repository documentation & CI | Active | Supported |
| Phase 1+: DNS resolver, website, registry, admin | Not yet implemented | Future scope (sandbox-only during development) |

## Reporting a Vulnerability

If you discover a security vulnerability, misconfiguration, or sensitive data exposure in this repository:

1. **Do not** open a public GitHub issue for unpatched security vulnerabilities or exposed credentials.
2. Report privately via **GitHub Private Vulnerability Reporting** (Security Advisories) on `https://github.com/Ahmed-com/balkan-open-dns/security`.
3. Include:
   - Affected file(s) or component(s)
   - Steps to reproduce or proof of concept
   - Potential impact assessment
   - Suggested remediation (if known)

## Rules for Security Testing

- **Local/isolated scope only:** Never run vulnerability scans, stress tests, or DNS amplification tests against live OpenNIC Tier 1/Tier 2 servers, GuardNovaX production systems, or third-party networks.
- **No secret commits:** Never commit API keys, private keys, TLS certificates with private material, passwords, or personal email addresses/PII.
- **Privacy by design:** Future DNS resolver configurations must align with OpenNIC privacy expectations (no archival of un-anonymized client query logs; prefer `log-queries: no` or automated IP scrubbing where diagnostics are strictly required).

## Response Expectations

Maintainers (**GuardNovaX**) will acknowledge valid reports, triage severity based on exploitability and impact, and coordinate fixes prior to public disclosure.
