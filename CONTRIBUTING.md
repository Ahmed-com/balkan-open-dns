# Contributing to Balkan Open DNS

Thank you for your interest in contributing to **Balkan Open DNS**, a non-commercial, community-oriented open-source DNS infrastructure initiative maintained by **GuardNovaX**.

## Project Principles

1. **Accuracy over hype:** The `.balkan` TLD is **proposed only** and has **not** been approved or delegated by OpenNIC. Never write documentation, UI copy, or code claiming `.balkan` is active, delegated, or endorsed by OpenNIC.
2. **Zero-cost and lightweight:** All Phase 0–6 designs must run within a `$0` initial infrastructure budget and remain compatible with a minimal `1 vCPU / 1 GB RAM / 15–20 GB storage` VPS target.
3. **Security and privacy first:** Never commit secrets, credentials, personal data, or unpinned unverified scripts.
4. **Phase-gated development:** Work follows the phased roadmap in [`docs/roadmap.md`](docs/roadmap.md). Do not implement later phases prematurely.

## Local Development Setup

### Prerequisites

- Git (`main` is the default branch)
- Configure Git identity **locally for this repository only** using a verified GitHub noreply email:

```bash
git config --local user.name "Your Name"
git config --local user.email "<id>+<username>@users.noreply.github.com"
```

### Workflow

1. Fork or branch from `main` (use descriptive branch names such as `docs/threat-model-update` or `ci/markdown-lint`).
2. Keep changes focused and well-documented.
3. Verify all links and repository checks pass locally and in GitHub Actions CI.
4. Do **not** use force push (`git push --force`) on shared branches or `main`.
5. Submit a Pull Request describing:
   - What changed and why
   - How it was verified (actual command/test outputs only — never fabricate results)
   - Any architectural decisions or trade-offs

## Operational Boundaries for Contributors

- Work strictly inside the `balkan-open-dns` repository.
- Bind any future local test services to `127.0.0.1` or isolated container networks only.
- Do not add paid SaaS dependencies, payment processors, or commercial domain sales logic.

## Code of Conduct

All contributors are expected to follow [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).
