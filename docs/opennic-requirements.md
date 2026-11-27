# OpenNIC Verified Requirements Matrix

> **Verification Date:** 2026-11-27
> **Scope:** Official OpenNIC documentation reviewed directly from `wiki.opennic.org`, `opennic.org`, and `servers.opennic.org`.
> **Status Notice:** `.balkan` has **not** been proposed, approved, or delegated by OpenNIC.

## Epistemic Legend

- **CONFIRMED:** Directly stated in official OpenNIC documentation at the cited URL.
- **ASSUMED / NEEDS VERIFICATION:** Operational inference, legacy wiki detail flagged with `FIXME`/warnings, or live network parameter requiring verification against active OpenNIC infrastructure before Phase 1/6/7 execution.

---

## 1. Tier 2 Server Requirements (Public Resolvers)

| ID | Requirement | Status | Details & Project Impact | Official Source URL |
| --- | --- | --- | --- | --- |
| T2-01 | Recursive resolution for OpenNIC + ICANN | CONFIRMED | Tier 2 servers act as DNS resolvers for client configurations, resolving both OpenNIC and ICANN namespaces (`allow-recursion { any; };` for public servers). | https://wiki.opennic.org/opennic/tier2, https://wiki.opennic.org/opennic/tier2setup, https://wiki.opennic.org/automated_dns_server_testing |
| T2-02 | Minimum hardware baseline | CONFIRMED | Official wiki minimum: Linux, 1 CPU Core, 512 MB RAM, 4 GB SSD. Our target `1 vCPU / 1 GB RAM / 15–20 GB storage` VPS satisfies this baseline for Tier 2 DNS alone. | https://wiki.opennic.org/opennic/tier2setup |
| T2-03 | Datacenter hosting & bandwidth | CONFIRMED | Home connections are strongly discouraged due to WAN latency and data caps; public Tier 2 servers face amplification/DDoS risk (examples noted up to 20 Mb/s sustained queries and hundreds of GB if unmitigated). | https://wiki.opennic.org/opennic/tier2, https://wiki.opennic.org/opennic/tier2setup |
| T2-04 | Public listing requires Slave Zone method | CONFIRMED | Root-hints method is strongly discouraged for public servers; publicly listed Tier 2 servers **must** use the Slave Zone method (slaving `.` and `dns.opennic.glue`, and optionally all OpenNIC TLDs). | https://wiki.opennic.org/opennic/tier2setup, https://wiki.opennic.org/opennic/t2slaved |
| T2-05 | UDP and TCP port 53 required | CONFIRMED | Both UDP/53 and TCP/53 must be reachable; blocked TCP/53 is cited as the most common cause of `dns.opennic.glue` test failures. | https://wiki.opennic.org/opennic/t2slaved |
| T2-06 | Automated compliance tests | CONFIRMED | Every 15 minutes (and 12-hour status reports), servers are tested for connectivity, DNS-OARC reply size, DNS-OARC port randomness, OpenNIC root zone, `dns.opennic.glue`, all OpenNIC TLDs, and ICANN recursion. | https://wiki.opennic.org/automated_dns_server_testing |
| T2-07 | Long-term commitment & no censorship | CONFIRMED | Public Tier 2 operators must keep servers compliant, receive private email alerts, attempt `1+ year` operation, not block valid DNS requests (unless `Blacklisting` flag is set), and should not operate from a country that censors web content. | https://wiki.opennic.org/opennic/operatorpolicies |
| T2-08 | Amplification / abuse protection | CONFIRMED | Operators are responsible for mitigating DDoS/amplification vectors (rate limiting, limiting `ANY` queries, avoiding refusal amplification). | https://wiki.opennic.org/opennic/tier2, https://wiki.opennic.org/opennic/tier2security |
| T2-09 | Anycast discouragement | CONFIRMED | OpenNIC advises against relying on anycast Tier 2 concentration due to BGP latency jitter and centralization concerns. | https://wiki.opennic.org/opennic/dont_anycast |
| T2-10 | DNSSEC trust anchor handling | CONFIRMED | BIND9 DNSSEC requires manual OpenNIC root `trust-anchors` (`named.conf.keys`) and `dnssec-validation yes;`, verified live via `dig DNSKEY .` rather than blindly copying wiki keys; Unbound uses `auto-trust-anchor-file`. | https://wiki.opennic.org/opennic/dnssec, https://wiki.opennic.org/tier_2_unbound |
| T2-11 | Current active Tier 1 master IPs | ASSUMED / NEEDS VERIFICATION | Wiki pages list Tier 1 IPs (e.g., `168.119.153.26`, `195.201.99.61`, `161.97.219.84`, etc.) with explicit warnings to verify they are still current. Must be verified live against `servers.opennic.org/?tier=1` and `dns.opennic.glue` before Phase 1/7 deployment. | https://wiki.opennic.org/opennic/t2slaved, https://servers.opennic.org/?tier=1 |

---

## 2. Tier 1 Server Requirements (Authoritative Core & TLD Hosting)

| ID | Requirement | Status | Details & Project Impact | Official Source URL |
| --- | --- | --- | --- | --- |
| T1-01 | Authoritative-only role | CONFIRMED | Tier 1 servers host authoritative zones for `.` (root) and all OpenNIC TLDs and provide authoritative answers/referrals to non-recursive queries; they must **not** be used as general public recursive resolvers for ICANN domains. | https://wiki.opennic.org/opennic/tier1, https://wiki.opennic.org/opennic/t2slaved |
| T1-02 | Mirror root `.` and all OpenNIC TLDs | CONFIRMED | Prior to proposing a new TLD, the applicant must operate an unlisted Tier 1 server mirroring `.` and all existing OpenNIC TLD zones and passing the Tier 1 server test. | https://wiki.opennic.org/opennic/creating_new_tlds, https://wiki.opennic.org/opennic/tier1setup |
| T1-03 | Indefinite operation & TLD tie | CONFIRMED | Tier 1 operators must keep software compliant, remain reachable via public/private profile email, maintain reasonable uptime, operate indefinitely, and should actively operate a TLD. | https://wiki.opennic.org/opennic/operatorpolicies |
| T1-04 | Legacy Tier 1 setup wiki notice | CONFIRMED (Caveat) | The `opennic/tier1setup` page carries an explicit `FIXME` warning that it was copied from a 2016 archive and should not be blindly copy-pasted. Current zone master lists must be obtained via live OpenNIC coordination/`srvzone`/mailing list before Phase 6/7. | https://wiki.opennic.org/opennic/tier1setup |
| T1-05 | Separate Tier 1 vs Tier 2 host | ASSUMED / NEEDS VERIFICATION | Because Tier 1 must not act as a public ICANN recursive resolver and Tier 2 must resolve ICANN recursively, running both publicly on a single IP conflicts at port 53; either separate hosts/IPs or strict architectural separation is required before Phase 6/7. | https://wiki.opennic.org/opennic/tier1, https://wiki.opennic.org/opennic/t2slaved |

---

## 3. New TLD Proposal and Voting Procedures

| ID | Requirement | Status | Details & Project Impact | Official Source URL |
| --- | --- | --- | --- | --- |
| TLD-01 | 3-month continuous Tier 2 prerequisite | CONFIRMED | Applicant **MUST** have operated a Tier 2 DNS server continuously for **at least 3 months** prior to proposal, keep it active during consideration, and should keep it running after approval. | https://wiki.opennic.org/opennic/creating_new_tlds, https://wiki.opennic.org/votingrules |
| TLD-02 | Administration team & role coverage | CONFIRMED | Must have an individual or team capable of effectively handling DNS administration, webmaster tasks, and abuse reports. | https://wiki.opennic.org/opennic/creating_new_tlds |
| TLD-03 | Unlisted Tier 1 passing T1 test | CONFIRMED | Applicant **MUST** operate an unlisted Tier 1 server mirroring `.` and all OpenNIC TLDs and passing the official Tier 1 test (`report.opennicproject.org/t2log/t1.php` per wiki; current test tooling must be verified live). | https://wiki.opennic.org/opennic/creating_new_tlds, https://wiki.opennic.org/votingrules |
| TLD-04 | Dedicated `www.opennic.[TLD]` site | CONFIRMED | Must host `www.opennic.balkan` containing: (a) copy of charter, (b) domain registration instructions, and (c) administrative contacts. | https://wiki.opennic.org/opennic/creating_new_tlds |
| TLD-05 | Mandatory role email addresses | CONFIRMED | Must accept and process `hostmaster@opennic.[TLD]`, `abuse@opennic.[TLD]`, and `webmaster@opennic.[TLD]`, listed on the website. | https://wiki.opennic.org/opennic/creating_new_tlds |
| TLD-06 | Charter requirements | CONFIRMED | Charter **MUST** explain TLD purpose/examples, describe prohibited content (e.g., trademarked names, malware hosts), **SHOULD NOT** conflict with OpenNIC policies, and **SHOULD** define amendment rules (else defaults to OpenNIC voting policy). | https://wiki.opennic.org/opennic/creating_new_tlds |
| TLD-07 | Registration process & free domains | CONFIRMED | Must have a working registration process; domain registrations **SHOULD** be free of charge and automated registration is **RECOMMENDED**. | https://wiki.opennic.org/opennic/creating_new_tlds, https://wiki.opennic.org/votingrules |
| TLD-08 | Formal `[DISCUSSION]` thread | CONFIRMED | Send new email (not a reply) to `discuss@lists.opennicproject.org` with subject `[DISCUSSION] ‘.balkan’ Proposal`, including charter (accessible outside `www.opennic.balkan` before approval), Tier 1 IP(s), and OpenNIC member username. | https://wiki.opennic.org/opennic/creating_new_tlds, https://wiki.opennic.org/opennic/mailinglistpolicies |
| TLD-09 | Formal `[VOTE]` thread & timeline | CONFIRMED | Wait minimum **7 days** after `[DISCUSSION]`; open `[VOTE] ‘.balkan’` as a new mailing list thread with a clear UTC deadline at least **7 days** out, archive link to discussion, vote options, and final charter. Author must summarize final tally after deadline closes. | https://wiki.opennic.org/opennic/creating_new_tlds, https://wiki.opennic.org/opennic/mailinglistpolicies |
| TLD-10 | Active IRC / community channels | ASSUMED / NEEDS VERIFICATION | Wiki references `#opennic` on Freenode; since Freenode's ecosystem shifted historically, the current active OpenNIC IRC/Matrix/community channel must be confirmed on `opennic.org/contact/` before Phase 6 outreach. | https://wiki.opennic.org/opennic/creating_new_tlds, https://opennic.org/contact/ |

---

## 4. DNS Root Synchronization

| ID | Requirement | Status | Details & Project Impact | Official Source URL |
| --- | --- | --- | --- | --- |
| SYNC-01 | AXFR/IXFR slave zone transfer | CONFIRMED | BIND9 Tier 2/Tier 1 servers synchronize `.`, `opennic.glue`, `dns.opennic.glue`, and OpenNIC TLD zones from Tier 1 `masters` via zone transfers over TCP/53. | https://wiki.opennic.org/opennic/t2slaved, https://wiki.opennic.org/opennic/t2slaved/zonefile |
| SYNC-02 | `srvzone` automation | CONFIRMED | `srvzone` + `srvzone.conf` generates BIND9 slave zone configurations automatically; Tier 1 operators pass `-d nsXX`, whereas Tier 2 operators omit Tier 1 flags. | https://wiki.opennic.org/opennic/srvzone |
| SYNC-03 | `srvzone` download transport risk | CONFIRMED (Security Note) | Official wiki downloads `srvzone` via plaintext HTTP (`http://161.97.219.84/opennic.oss/files/scripts/srvzone`). In our architecture, any zone sync script must be inspected, checksum-pinned, or replaced by a verified internal zone-list builder—never blindly `curl`/`wget | sh` over HTTP. | https://wiki.opennic.org/opennic/srvzone |
| SYNC-04 | Unbound root-hints limitation | CONFIRMED | Official Unbound wiki guide uses `dig . NS @<tier1> > opennic.cache` (`root-hints`), which is not the Slave Zone method required for public Tier 2 listings in `tier2setup`. | https://wiki.opennic.org/tier_2_unbound, https://wiki.opennic.org/opennic/tier2setup |

---

## 5. Logging and Privacy Requirements

| ID | Requirement | Status | Details & Project Impact | Official Source URL |
| --- | --- | --- | --- | --- |
| PRIV-01 | No personally identifiable query logging | CONFIRMED | Public Tier 2 operators **SHOULD NOT** log any personally identifiable data for users of their servers. | https://wiki.opennic.org/opennic/operatorpolicies |
| PRIV-02 | BIND9 log rules & obfuscation | CONFIRMED | Query logs should not be archived; if diagnostic logging is temporarily enabled, operators are strongly encouraged to scrub all client IP addresses (e.g., replacing with `XXX.XXX.XXX.XXX`). | https://wiki.opennic.org/bindlogconfig |
| PRIV-03 | Unbound no-query-logging | CONFIRMED | Official Unbound Tier 2 template explicitly sets `log-queries: no`, `hide-identity: yes`, `hide-trustanchor: yes`, `hide-version: yes`, and `minimal-responses: yes`. | https://wiki.opennic.org/tier_2_unbound |
| PRIV-04 | Public transparency on logging & encryption | CONFIRMED | `servers.opennic.org` server registration requires declaring logging policy and supported encrypted transports (`DoT`, `DoH`, `DNSCrypt`). | https://wiki.opennic.org/opennic/setup/listserver, https://wiki.opennic.org/opennic/report_compromised_servers |

---

## 6. Server Registration and Migration Policies

| ID | Requirement | Status | Details & Project Impact | Official Source URL |
| --- | --- | --- | --- | --- |
| REG-01 | Account & manual approval | CONFIRMED | Register at `members.opennicproject.org`, log into `servers.opennic.org`, submit IPv4/IPv6, location, features (`DoT`, `DoH`, `DNSCrypt`), and log policy; manual admin approval is required and announcement on IRC/mailing list is advised. | https://wiki.opennic.org/opennic/setup/listserver |
| REG-02 | Automated outage & 48-hour deletion rule | CONFIRMED | Automated warnings fire after >2 hours of unavailability; servers offline or failing tests for **>48 hours** move to `pending deletion`, requiring a Tier-0 operator to re-list. | https://wiki.opennic.org/opennic/tier2setup, https://wiki.opennic.org/opennic/setup/listserver |
| REG-03 | Maintenance disabling & edit caveats | CONFIRMED | Operators should manually disable their server on `servers.opennic.org` before planned maintenance; wiki warns the edit UI can be buggy so initial details should be accurate. | https://wiki.opennic.org/opennic/setup/listserver |
| REG-04 | Migration / IP changes | ASSUMED / NEEDS VERIFICATION | Wiki does not specify a formal automated IP-migration API; based on `listserver` caveats, planned IP migrations require disabling the old entry and updating/re-registering in coordination with Tier-0 operators/mailing list. | https://wiki.opennic.org/opennic/setup/listserver |

---

## 7. Domain Registration Policies (OpenNIC TLD Precedents)

| ID | Requirement | Status | Details & Project Impact | Official Source URL |
| --- | --- | --- | --- | --- |
| DOM-01 | Free & automated registration norm | CONFIRMED | OpenNIC TLD rules state domain registrations **SHOULD** be provided free of charge and recommend an automated registration system. | https://wiki.opennic.org/opennic/creating_new_tlds, https://wiki.opennic.org/votingrules |
| DOM-02 | TLD-specific charters govern policy | CONFIRMED | Each TLD defines its own charter, eligibility, prohibited uses, and abuse contacts (e.g., `.libre` non-commercial AUP; `.bbs`, `.geek`, `.oss`, `.null`, `.o`). | https://wiki.opennic.org/opennic/dot, https://wiki.opennic.org/opennic:dot:libre |
| DOM-03 | Renewal, expiration & reserved names | ASSUMED / NEEDS VERIFICATION | Specific renewal intervals, grace periods, and reserved-name lists vary by individual OpenNIC TLD registrar rather than a single global OpenNIC mandate. Balkan Open DNS must define explicit, fair `.balkan` charter rules (free registration, anti-squatting expiration, reserved infrastructure names such as `opennic.balkan`, `nic.balkan`, `www.opennic.balkan`) in Phase 3 & Phase 6. | https://wiki.opennic.org/opennic/dot, https://wiki.opennic.org/opennic/creating_new_tlds |
