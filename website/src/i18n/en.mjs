export default {
  ui: {
    siteName: 'Balkan Open DNS',
    maintainerLine: 'Open-Source Infrastructure · GuardNovaX',
    skipToContent: 'Skip to main content',
    noticeBadge: 'Proposed · Sandbox Only',
    noticeText:
      'The .balkan TLD is proposed only and has NOT been approved or delegated by OpenNIC. Public DNS resolvers are not yet deployed; Phase 1 has been validated exclusively in an isolated CI sandbox.',
    menuButton: 'Menu',
    navLabel: 'Primary navigation',
    langLabel: 'Language',
    nav: {
      home: 'Home',
      about: 'About',
      infrastructure: 'DNS Infrastructure',
      balkanTld: 'Proposed .balkan TLD',
      documentation: 'Documentation',
      status: 'Network Status',
      securityPrivacy: 'Security & Privacy',
      community: 'Open Source',
      faq: 'FAQ',
      contact: 'Contact',
    },
    pills: {
      verified: 'CI Verified (Sandbox)',
      proposed: 'Proposed · Not Delegated',
      planned: 'Planned',
      blocked: 'Blocked · Not Deployed',
    },
    map: {
      ariaLabel: 'Geographically accurate map of the Balkan Peninsula showing localization and community scope',
      caption:
        'Regional scope: Balkan Peninsula communities served across six languages (EN, BS, SQ, SR, HR, MK). Markers denote linguistic hubs only — no public DNS PoPs are deployed.',
      legendScope: 'Core localization & community focus',
      legendContext: 'Surrounding Southeast European context',
      legendMarker: 'Regional linguistic hub (no active server)',
    },
    footer: {
      aboutTitle: 'Balkan Open DNS',
      aboutBody:
        'A non-commercial, community-oriented open-source DNS infrastructure initiative maintained by GuardNovaX under the MIT License. Zero paid infrastructure, zero tracking, zero public .balkan delegation yet.',
      linksTitle: 'Architecture & Governance',
      policiesTitle: 'Transparency & Operations',
      copyright: '© 2026 GuardNovaX · Balkan Open DNS · MIT License',
      noTracking: 'Zero cookies · Zero analytics · Static-first build',
    },
  },
  pages: {
    home: {
      title: 'Balkan Open DNS — Open-Source DNS Infrastructure & Proposed .balkan TLD',
      description:
        'Non-commercial, privacy-first open-source DNS infrastructure for the Balkans, maintained by GuardNovaX. Phase 1 Tier 2 resolver validated in isolated CI; .balkan TLD remains proposed only.',
      eyebrow: 'Non-Commercial Internet Infrastructure · GuardNovaX',
      h1: 'Open, Privacy-First DNS Infrastructure for the Balkans',
      lead:
        'Balkan Open DNS is an independent open-source initiative building reproducible OpenNIC-compatible Tier 2 DNS infrastructure and preparing a transparent, free community framework for a proposed .balkan alternative namespace.',
      ctaPrimary: 'Explore DNS Infrastructure',
      ctaSecondary: 'Proposed .balkan Status',
      metrics: [
        { label: 'Tier 2 Container Footprint', value: '15.56 MiB / 512 MiB' },
        { label: 'Linux CI Runtime Suite', value: '16 / 16 Passing (Sandbox)' },
        { label: 'Container Image CVEs', value: '0 (Trivy Verified)' },
        { label: 'Target VPS Profile', value: '1 vCPU · 1 GB RAM' },
      ],
      pillarsTitle: 'Core Engineering Principles',
      pillarsIntro:
        'Every component is engineered for verifiability, minimal memory consumption, strict privacy, and transparent status reporting.',
      pillars: [
        {
          pill: 'verified',
          title: 'Reproducible Tier 2 DNS (Phase 1)',
          body: 'Built on pinned ISC BIND 9.20 with immutable SHA256 digest verification, non-root execution, Response Rate Limiting, and secondary zone sync tested in Linux CI.',
        },
        {
          pill: 'proposed',
          title: 'Proposed .balkan Namespace',
          body: 'Designed as a free, non-commercial alternative TLD proposal for OpenNIC. Not approved, not delegated, and not open for domain registration today.',
        },
        {
          pill: 'planned',
          title: 'Zero-Cost & Privacy-First',
          body: 'Zero client query logging in BIND9, zero website tracking scripts or cookies, static-first hosting on free tiers, and strict $0 development architecture.',
        },
      ],
      roadmapTitle: 'Honest Implementation Status',
      roadmapIntro:
        'Public Tier 2 deployment is decoupled from .balkan TLD activation so required operational uptime can accumulate independently once authorized.',
      roadmapRows: [
        ['Phase 0', 'Repository Foundation, Threat Model & OpenNIC Matrix', 'verified', 'Complete on main'],
        ['Phase 1', 'Containerized BIND 9.20 Tier 2 Resolver (Sandbox)', 'verified', '16/16 CI checks passing'],
        ['Tier 2 Track', 'Public Tier 2 Resolver Deployment', 'blocked', 'Awaiting VPS, provider port-53 permission & owner authorization'],
        ['Phase 2', 'Multilingual Static Public Website (6 Locales)', 'planned', 'Under review on phase-2-website'],
        ['Phase 3–5', 'Sandbox Registry, Admin RBAC & Full Security Audit', 'planned', 'Pending explicit authorization'],
        ['Phase 6–7', 'OpenNIC .balkan Proposal, Vote & Public Delegation', 'blocked', 'Requires 3+ mo Tier 2 history, Tier 1, & OpenNIC community vote'],
      ],
    },
    about: {
      title: 'About — Balkan Open DNS',
      description: 'Mission, governance, non-commercial principles, and explicit scope boundaries of Balkan Open DNS and maintainer GuardNovaX.',
      h1: 'About Balkan Open DNS',
      subtitle: 'Independent, non-commercial DNS engineering maintained by GuardNovaX.',
      cards: [
        {
          title: 'Mission & Regional Focus',
          body: 'Balkan Open DNS exists to strengthen open, resilient, privacy-respecting DNS infrastructure accessible to communities across Southeast Europe in six regional and international languages without commercial lock-in.',
        },
        {
          title: 'Governance & Maintainer Separation',
          body: 'Maintained by GuardNovaX under the MIT License. All Balkan Open DNS repositories, sandbox builds, and future infrastructure remain strictly isolated from commercial client environments and existing production servers.',
        },
        {
          title: 'Non-Commercial Commitment',
          body: 'Initial development and hosting operate on a $0 budget. No payment gateways, domain reselling, or commercial upsells exist anywhere in the architecture, aligning with OpenNIC recommendations for free community TLDs.',
        },
        {
          title: 'What We Do Not Claim',
          body: 'We do not claim ICANN recognition, global default browser resolution, official OpenNIC endorsement, active public resolver endpoints, or any existing live .balkan domain registrations.',
        },
      ],
    },
    infrastructure: {
      title: 'DNS Infrastructure — Balkan Open DNS',
      description: 'Technical architecture of the Phase 1 OpenNIC-compatible BIND 9.20 Tier 2 resolver engineered for a 1 vCPU / 1 GB RAM VPS.',
      h1: 'DNS Infrastructure Architecture',
      subtitle: 'Lightweight, hardened BIND 9.20 Tier 2 resolver validated in isolated Linux CI.',
      callout:
        'Public resolver deployment is currently NOT active. The Tier 2 container binds exclusively to 127.0.0.1:53 in sandbox validation until VPS availability, provider port-53 permission, and owner authorization are satisfied.',
      specs: [
        ['Base Image', 'internetsystemsconsortium/bind9:9.20 (pinned by SHA256 digest + apk upgrade)'],
        ['Process Isolation', 'Non-root USER bind, read_only: true rootfs, no-new-privileges, cap_drop: ALL'],
        ['Memory Limits', '512 MiB container cap · max-cache-size 256m (measured 15.56–18.41 MiB in CI)'],
        ['Zone Synchronization', 'Secondary AXFR/IXFR for ., dns.opennic.glue, and opennic.glue (no HTTP scripts)'],
        ['Abuse Mitigation', 'BIND9 RRL (10 resp/s, slip 2), minimal-responses yes, minimal-any yes, EDNS 1232, AXFR refused'],
        ['Query Privacy', 'category queries { null; }; · qname-minimization relaxed · hidden version.bind'],
      ],
      budgetTitle: 'Target 1 vCPU / 1 GB RAM VPS Resource Model',
      budgetRows: [
        ['Minimal Linux OS & nftables firewall', '~180 MB RAM', '~3.5 GB SSD'],
        ['Container runtime (Docker / containerd)', '~70 MB RAM', '~2.0 GB SSD'],
        ['BIND 9.20 Tier 2 container (512M hard cap)', '16–300 MB RAM', '< 1.0 GB SSD'],
        ['Swap / ZRAM safety buffer + headroom', '~470 MB free', '~12+ GB free'],
      ],
    },
    balkanTld: {
      title: 'Proposed .balkan TLD — Balkan Open DNS',
      description: 'Transparent status, OpenNIC eligibility prerequisites, and proposed non-commercial charter framework for the .balkan TLD.',
      h1: 'Proposed .balkan Top-Level Domain',
      subtitle: 'Status: PROPOSED ONLY — Not approved, not delegated, and not accepting registrations.',
      callout:
        'Important Notice: .balkan is NOT approved or delegated by OpenNIC, and is NOT part of the ICANN root. No domains are registered or resolving publicly.',
      prereqTitle: 'Verified OpenNIC New-TLD Prerequisites',
      prereqRows: [
        ['3+ Months Continuous Tier 2', 'Planned (Independent Track)', 'Public Tier 2 resolver must run continuously >= 3 months before and during proposal.'],
        ['Unlisted Tier 1 Server', 'Not Deployed (Phase 6–7)', 'Must mirror . and all OpenNIC TLDs and pass OpenNIC Tier 1 compliance testing.'],
        ['www.opennic.balkan & Role Mail', 'Not Active', 'Requires live charter/registration website plus hostmaster@, abuse@, and webmaster@.'],
        ['Charter & Registration Process', 'Planned (Phase 3 & 6)', 'Free non-commercial policy, prohibited abuse rules, amendment clauses, automated registry.'],
        ['Mailing List [DISCUSSION] & [VOTE]', 'Blocked until prerequisites met', 'Minimum 7-day formal discussion followed by >= 7-day community vote on OpenNIC lists.'],
      ],
      charterPrinciples: [
        'Strictly non-commercial, community-oriented namespace for Balkan open-source, educational, civic, and cultural projects.',
        'Explicit prohibition on malware distribution, phishing, spam relays, botnet C2, and bad-faith trademark squatting.',
        'Infrastructure-reserved names (nic.balkan, opennic.balkan, www.opennic.balkan, localhost) protected from general registration.',
        'Transparent abuse reporting, deterministic expiration/renewal rules, and community charter amendment procedures.',
      ],
    },
    documentation: {
      title: 'Documentation — Balkan Open DNS',
      description: 'Technical documentation covering local sandbox BIND9 validation, backup/restore procedures, DNSSEC notes, and repository links.',
      h1: 'Technical Documentation',
      subtitle: 'Architecture specifications, sandbox validation commands, and operational runbooks.',
      sections: [
        {
          title: 'Local Sandbox Verification (Linux / Docker)',
          body: 'All Phase 1 configs live under infrastructure/dns-tier2/ and bind strictly to 127.0.0.1:53 by default. Run config checks and integration tests inside an isolated Linux Docker environment:',
          code: 'cd infrastructure/dns-tier2\n./scripts/validate-config.sh\n./scripts/test-integration.sh',
        },
        {
          title: 'Checksummed Backup & Restore',
          body: 'Configuration files and secondary zone caches are backed up into SHA256-verified archives using pinned Alpine containers:',
          code: './scripts/backup-restore.sh backup\n./scripts/backup-restore.sh restore backups/balkan-dns-tier2-<TIMESTAMP>.tar.gz',
        },
      ],
      docLinksTitle: 'Repository Specifications',
      docLinks: [
        ['System Architecture', 'docs/architecture.md'],
        ['OpenNIC Requirements Matrix', 'docs/opennic-requirements.md'],
        ['Phase 1 Security Review', 'docs/phase-1-security-review.md'],
        ['DNSSEC Compatibility Assessment', 'docs/phase-1-dnssec-assessment.md'],
        ['VPS Deployment & Rollback Runbook', 'docs/vps-deployment-runbook.md'],
        ['Website Deployment Guide', 'docs/website-deployment.md'],
      ],
    },
    status: {
      title: 'Network Status — Balkan Open DNS',
      description: 'Real, non-fabricated operational status of Balkan Open DNS components across sandbox CI and gated public infrastructure.',
      h1: 'Network & Project Status',
      subtitle: 'Factual engineering status with zero synthetic metrics or simulated uptime figures.',
      callout:
        'Public DNS resolvers and domain registration services are NOT live. Only isolated sandbox CI validation is operational today.',
      rows: [
        ['Public Tier 2 Resolvers', 'blocked', 'Not Deployed', 'No VPS provisioned; gated on provider port-53 permission & owner authorization.'],
        ['Phase 1 Sandbox CI (GitHub Actions)', 'verified', 'Passing (16 / 16)', 'Verified on ubuntu-latest in CI run 45924051847 (loopback 127.0.0.1:53 only).'],
        ['.balkan Root Delegation', 'proposed', 'Not Delegated', 'Proposed only; requires 3+ months Tier 2 history, Tier 1 validation & OpenNIC vote.'],
        ['Domain Registry & Admin Portal', 'planned', 'Not Implemented', 'Scheduled for Phases 3–4 (sandbox-only) after Phase 2 review.'],
        ['Public Static Website', 'planned', 'Stage Ready (Branch)', 'Under review on branch phase-2-website; not yet published.'],
      ],
      observationsTitle: 'Latest Live OpenNIC Upstream Observations (2026-11-27)',
      observations: [
        'Active Tier 1 primaries passing on servers.opennic.org: ns2 (161.97.219.84), ns4 (116.203.104.203), ns6 (45.79.189.158), ns7 (153.56.130.67).',
        'Tier 1 nodes marked Offline on servers.opennic.org and excluded from config: ns8, ns10.',
        'Strict DNSSEC validation preserved: .free, .ing, .geek, .libre, isc.org, cloudflare.com, debian.org validate; upstream anomalies .o (incomplete signatures) and .chan (expired RRSIG) return SERVFAIL as expected.',
      ],
    },
    securityPrivacy: {
      title: 'Security & Privacy — Balkan Open DNS',
      description: 'Privacy guarantees, zero query logging policy, strict DNSSEC stance, container hardening, and vulnerability reporting.',
      h1: 'Security & Privacy Policy',
      subtitle: 'Designed to protect user browsing privacy and DNS integrity by default.',
      cards: [
        {
          title: 'Zero Client Query Logging',
          body: 'BIND9 explicitly discards query and query-error categories (null;). Only bounded operational notices, zone transfer state, and security/RRL events are kept.',
        },
        {
          title: 'Zero Website Tracking',
          body: 'This static website sets zero cookies, loads zero third-party analytics, beacons, or external font CDNs, and enforces strict Content-Security-Policy and Referrer-Policy: no-referrer.',
        },
        {
          title: 'Strict DNSSEC Without Bypasses',
          body: 'dnssec-validation yes; is enforced with OpenNIC root KSK 60820. Broken upstream delegations (.o, .chan) are documented transparently rather than suppressed with validation exceptions.',
        },
        {
          title: 'Vulnerability Reporting',
          body: 'Report security issues privately via GitHub Security Advisories rather than public issues. Never test attacks against live OpenNIC or third-party servers.',
        },
      ],
    },
    community: {
      title: 'Open Source & Contributions — Balkan Open DNS',
      description: 'MIT open-source licensing, localization stewardship, code of conduct, and contribution workflow.',
      h1: 'Open Source & Community',
      subtitle: 'MIT-licensed infrastructure built openly for community review.',
      cards: [
        {
          title: 'MIT Licensed Codebase',
          body: 'All infrastructure definitions, documentation, and website source code are published under the MIT License at github.com/Ahmed-com/balkan-open-dns.',
        },
        {
          title: 'Six-Language Localization',
          body: 'Native contributors help refine technical accuracy across English, Bosnian, Albanian, Serbian, Croatian, and Macedonian translations via structured i18n dictionaries.',
        },
        {
          title: 'Engineering Standards',
          body: 'Contributions must preserve zero-cost compatibility, pass automated CI security/accessibility checks, and accurately represent .balkan as proposed until approved.',
        },
      ],
    },
    faq: {
      title: 'FAQ — Balkan Open DNS',
      description: 'Frequently asked questions about .balkan status, OpenNIC, DNSSEC, privacy, and how to contribute.',
      h1: 'Frequently Asked Questions',
      subtitle: 'Clear, direct answers regarding current capabilities and project boundaries.',
      items: [
        {
          q: 'Is the .balkan TLD active or approved by OpenNIC?',
          a: 'No. .balkan is currently a proposal only. It has not been submitted to, approved by, or delegated by OpenNIC, and it is not recognized by ICANN.',
        },
        {
          q: 'Can I register a .balkan domain name today?',
          a: 'No. No domain registry is live and no .balkan domains are registered. A sandbox-only registry is planned for Phase 3, and public registration remains blocked until OpenNIC community approval.',
        },
        {
          q: 'Can I point my device to Balkan Open DNS public resolvers right now?',
          a: 'No. Public DNS resolvers are not deployed yet. Phase 1 validated our BIND 9.20 container inside isolated Linux CI on 127.0.0.1:53. Public deployment awaits a suitable VPS, explicit provider permission, and owner authorization.',
        },
        {
          q: 'Does Balkan Open DNS log my DNS queries or sell user data?',
          a: 'No. Query logging is disabled (category queries { null; };) and the website sets zero cookies or trackers. The project is strictly non-commercial.',
        },
        {
          q: 'Why does the architecture target a 1 vCPU / 1 GB RAM VPS?',
          a: 'Keeping memory usage tiny (measured ~15.6–18.4 MiB in CI with a 256 MiB cache cap) ensures the Tier 2 resolver can run reliably on low-cost or community-donated hardware.',
        },
      ],
    },
    contact: {
      title: 'Contact — Balkan Open DNS',
      description: 'Official repository, security advisory channel, and maintainer contact details for Balkan Open DNS.',
      h1: 'Contact & Project Channels',
      subtitle: 'Maintained by GuardNovaX via open-source GitHub channels.',
      cards: [
        {
          title: 'Source Repository & Discussions',
          body: 'Open technical issues, review architecture docs, or submit pull requests at https://github.com/Ahmed-com/balkan-open-dns.',
        },
        {
          title: 'Private Security Advisories',
          body: 'For security vulnerabilities, use GitHub Private Vulnerability Reporting at https://github.com/Ahmed-com/balkan-open-dns/security.',
        },
        {
          title: 'Future OpenNIC TLD Role Mailboxes (Not Active)',
          body: 'OpenNIC rules require hostmaster@opennic.balkan, abuse@opennic.balkan, and webmaster@opennic.balkan prior to a formal TLD vote. These addresses are NOT active yet.',
        },
      ],
    },
  },
};
