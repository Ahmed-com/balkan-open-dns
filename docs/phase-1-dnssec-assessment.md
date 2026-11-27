# Phase 1 — OpenNIC DNSSEC Compatibility Assessment

> **Assessment Date:** 2026-11-27
> **Method:** Direct live TCP/UDP DNS probes against passing OpenNIC Tier 1 servers (`161.97.219.84`, `116.203.104.203`, `45.79.189.158`, `153.56.130.67`) and full AXFR inspection of OpenNIC `.` root (`25,258` RRs) and `dns.opennic.glue` (`10` RRs).

## 1. Root Zone Trust Anchor Verification

| Parameter | Observed Live Value (`2026-11-27`) | Wiki Comparison |
| --- | --- | --- |
| Root KSK (`flags=257`, `proto=3`, `alg=8`) | Key Tag `60820` (`AwEAAbtbsu+wl3fb...`) | **Matches** [`wiki.opennic.org/opennic/dnssec`](https://wiki.opennic.org/opennic/dnssec) |
| Root ZSK (`flags=256`, `proto=3`, `alg=8`) | Key Tag `29046` (`AwEAAbGaQ9X4odL8...`) | Rotated cleanly from historical wiki example (expected operational rotation) |
| BIND9 Directive Required | `dnssec-validation yes;` + explicit `trust-anchors` in `named.conf.keys` | Do **not** use `dnssec-validation auto;` (injects ICANN root key) |

---

## 2. Empirical Per-TLD DNSSEC Observations (`161.97.219.84`)

Live non-recursive TCP/53 probes (`SOA`, `DS`, `DNSKEY`) revealed three distinct DNSSEC states across OpenNIC-listed TLDs:

| DNSSEC State | Observed OpenNIC Zones | Expected Resolver Behavior (`dnssec-validation yes;`) |
| --- | --- | --- |
| **Signed & Consistent (`DS` + `DNSKEY` + `SOA` present)** | `.chan`, `.dyn`, `.epic`, `.geek`, `.gopher`, `.indy`, `.libre`, `.oss`, `.parody`, `.pirate`, `opennic.glue` | Validates cleanly with OpenNIC root KSK (`60820`), provided child zone signatures (`RRSIG`) are current. |
| **Unsigned / Insecure Delegation (No `DS`, No `DNSKEY`)** | `.bbs`, `.cyb`, `.neo`, `.null`, `.oz`, `dns.opennic.glue` | Resolves as provably insecure (via root `NSEC`/`NSEC3`), returning `NOERROR` without `AD` bit. |
| **Broken / Incomplete Chain (`DS` in root, `DNSKEY=0` or `SERVFAIL`)** | `.free` (`DS=3, DNSKEY=0`), `.ing` (`DS=2, DNSKEY=0`), `.o` (`DS=5, DNSKEY=0` on `ns2`), `.fur` (`SOA RCODE=2 SERVFAIL`) | Strict `dnssec-validation yes;` returns **`SERVFAIL`** when a root `DS` exists without matching valid `DNSKEY`/`RRSIG` from authoritative TLD servers. |

> **Important Note on Live Recursive Verification (`2026-11-27`, BIND 9.20 Linux Sandbox):**
> Live recursive resolution through the containerized BIND 9.20 Tier 2 resolver (`dnssec-validation yes;`) confirmed:
> - **`.free` and `.ing`:** Validated cleanly (`NOERROR` with `AD` bit set) when resolved recursively from their authoritative masters, despite `ns2` (`161.97.219.84`) returning 0 `DNSKEY` answers in direct non-recursive probes.
> - **`.o`:** Failed DNSSEC validation (`SERVFAIL`; `named-security.log`: `validating o/SOA: got insecure response; parent indicates it should be secure`) because OpenNIC root carries 5 `DS` records while the authoritative response lacks valid signatures.
> - **`.chan`:** Failed DNSSEC validation (`SERVFAIL`; `named-security.log`: `validating chan/DNSKEY: verify failed due to bad signature (keyid=27151): RRSIG has expired`).
> - **`.fur`:** Resolved as unsigned/insecure (`NOERROR` without `AD` bit) recursively, whereas direct `ns2` (`161.97.219.84`) SOA probe returned `SERVFAIL`.
> - **`icann.org` / `.org`:** OpenNIC root (`2026111315`) carries `.org` DS `725` alongside legacy DS `26974`. While `isc.org` and `debian.org` validated cleanly (`AD=1`), `icann.org` returned `NOERROR` with `+cd` during cold IPv4/recursive testing and requires ongoing verification against live OpenNIC root refreshes.

---

## 3. Architectural Recommendation

1. **Keep `dnssec-validation yes;` enabled by default** in [`named.conf.options`](../infrastructure/dns-tier2/config/named.conf.options) using the verified OpenNIC root trust anchor (`60820`) in [`named.conf.keys`](../infrastructure/dns-tier2/config/named.conf.keys).
2. **Run live recursive verification in Phase 1 container tests (`test-integration.sh`)** on a Linux host against every OpenNIC TLD (`chan`, `dyn`, `epic`, `free`, `fur`, `geek`, `gopher`, `indy`, `ing`, `libre`, `neo`, `null`, `o`, `oss`, `oz`, `parody`, `pirate`, `bbs`, `cyb`).
3. **If OpenNIC's automated Tier 2 test (`servers.opennic.org`) flags `SERVFAIL` on an upstream-broken TLD**, apply targeted `validate-except { "<tld>"; };` **only** for confirmed broken alt-TLDs (never globally disabling DNSSEC for ICANN or healthy OpenNIC TLDs), and document each exception with a re-verification date.
4. **Root Key Rotation Monitoring:** Subscribe to OpenNIC's announcements/mailing list (`https://wiki.opennic.org/opennic/mailinglist`) because `named.conf.keys` uses a static `initial-key` anchor and must be updated if OpenNIC rotates KSK `60820`.
