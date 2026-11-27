export default {
  ui: {
    siteName: 'Balkan Open DNS',
    maintainerLine: 'Infrastrukturë me burim të hapur · GuardNovaX',
    skipToContent: 'Kalo te përmbajtja kryesore',
    noticeBadge: 'Propozim · Vetëm sandbox',
    noticeText:
      'TLD-ja .balkan është vetëm propozim dhe NUK është miratuar apo deleguar nga OpenNIC. Zgjidhësit publikë DNS nuk janë ende aktivë; Faza 1 është validuar vetëm në një mjedis të izoluar CI.',
    menuButton: 'Menuja',
    navLabel: 'Navigimi kryesor',
    langLabel: 'Gjuha',
    nav: {
      home: 'Kryefaqja',
      about: 'Rreth nesh',
      infrastructure: 'Infrastruktura DNS',
      balkanTld: 'TLD i propozuar .balkan',
      documentation: 'Dokumentacioni',
      status: 'Statusi i rrjetit',
      securityPrivacy: 'Siguria dhe privatësia',
      community: 'Burimi i hapur',
      faq: 'Pyetje të shpeshta',
      contact: 'Kontakti',
    },
    pills: {
      verified: 'E verifikuar në CI (Sandbox)',
      proposed: 'E propozuar · E padeleguar',
      planned: 'E planifikuar',
      blocked: 'E bllokuar · Jo në prodhim',
    },
    map: {
      ariaLabel: 'Hartë gjeografikisht e saktë e Gadishullit Ballkanik që tregon shtrirjen gjuhësore dhe komunitare',
      caption:
        'Shtrirja rajonale: komunitetet e Gadishullit Ballkanik në gjashtë gjuhë (EN, BS, SQ, SR, HR, MK). Shënuesit tregojnë vetëm qendra gjuhësore — asnjë nyjë publike DNS nuk është aktive.',
      legendScope: 'Fokusi kryesor gjuhësor dhe komunitar',
      legendContext: 'Konteksti rajonal i Evropës Juglindore',
      legendMarker: 'Qendër rajonale gjuhësore (pa server aktiv)',
    },
    footer: {
      aboutTitle: 'Balkan Open DNS',
      aboutBody:
        'Një nismë jofitimprurëse e infrastrukturës DNS me burim të hapur për komunitetin, e mirëmbajtur nga GuardNovaX nën licencën MIT. Pa shërbime me pagesë, pa gjurmim dhe pa delegim publik të .balkan.',
      linksTitle: 'Arkitektura dhe qeverisja',
      policiesTitle: 'Transparenca dhe operimi',
      copyright: '© 2026 GuardNovaX · Balkan Open DNS · Licenca MIT',
      noTracking: 'Pa cookie · Pa analitikë · Arkitekturë statike',
    },
  },
  pages: {
    home: {
      title: 'Balkan Open DNS — Infrastrukturë DNS e hapur dhe TLD i propozuar .balkan',
      description:
        'Infrastrukturë DNS me burim të hapur dhe fokus te privatësia për Ballkanin, mirëmbajtur nga GuardNovaX. Faza 1 e verifikuar në CI të izoluar; .balkan mbetet vetëm propozim.',
      eyebrow: 'Infrastrukturë interneti jofitimprurëse · GuardNovaX',
      h1: 'Infrastrukturë DNS e hapur dhe private për Ballkanin',
      lead:
        'Balkan Open DNS është një nismë e pavarur me burim të hapur që ndërton infrastrukturë DNS Tier 2 të riprodhueshme dhe të përputhshme me OpenNIC, si dhe përgatit një kornizë falas e transparente për hapësirën e propozuar .balkan.',
      ctaPrimary: 'Shiko infrastrukturën DNS',
      ctaSecondary: 'Statusi i propozimit .balkan',
      metrics: [
        { label: 'Përdorimi i RAM-it (Tier 2)', value: '15.56 MiB / 512 MiB' },
        { label: 'Testet Linux CI', value: '16 / 16 të suksesshme (Sandbox)' },
        { label: 'Dobësi të kontejnerit (Trivy)', value: '0 CVE të raportuara' },
        { label: 'Profili i synuar VPS', value: '1 vCPU · 1 GB RAM' },
      ],
      pillarsTitle: 'Parimet bazë inxhinierike',
      pillarsIntro:
        'Çdo komponent është projektuar për verifikueshmëri, konsum minimal të memories, privatësi të rreptë dhe raportim të sinqertë të statusit.',
      pillars: [
        {
          pill: 'verified',
          title: 'DNS Tier 2 i riprodhueshëm (Faza 1)',
          body: 'Bazuar në ISC BIND 9.20 të fiksuar me SHA256 të pandryshueshëm, ekzekutim jo-root, kufizim RRL dhe sinkronizim dytësor të zonave i testuar në Linux CI.',
        },
        {
          pill: 'proposed',
          title: 'Hapësira e propozuar .balkan',
          body: 'Projektuar si propozim falas dhe jofitimprurës për OpenNIC. Aktualisht nuk është miratuar, nuk është deleguar dhe nuk pranon regjistrime.',
        },
        {
          pill: 'planned',
          title: 'Kosto zero dhe privatësi e plotë',
          body: 'Zero regjistrim i pyetjeve DNS në BIND9, zero skripte gjurmimi ose cookie në faqe, hostim statik falas dhe buxhet strikt $0.',
        },
      ],
      roadmapTitle: 'Statusi real i zbatimit',
      roadmapIntro:
        'Vendosja publike e Tier 2 është ndarë nga aktivizimi i TLD-së .balkan që historia e kërkuar operative të grumbullohet paralelisht pas miratimit.',
      roadmapRows: [
        ['Faza 0', 'Bazat e depos, modeli i kërcënimeve dhe matrica OpenNIC', 'verified', 'E përfunduar në main'],
        ['Faza 1', 'Zgjidhës BIND 9.20 Tier 2 në kontejner (Sandbox)', 'verified', '16/16 kontrolle CI kaluan'],
        ['Pista Tier 2', 'Vendosja publike e zgjidhësit Tier 2', 'blocked', 'Pret VPS, leje të ofruesit për portin 53 dhe miratimin e pronarit'],
        ['Faza 2', 'Faqe publike statike shumëgjuhëshe (6 gjuhë)', 'planned', 'Në shqyrtim në degën phase-2-website'],
        ['Fazat 3–5', 'Regjistri sandbox, RBAC admin dhe auditim i plotë sigurie', 'planned', 'Pret miratim të shprehur'],
        ['Fazat 6–7', 'Propozimi OpenNIC .balkan, votimi dhe delegimi publik', 'blocked', 'Kërkon >=3 muaj Tier 2, Tier 1 dhe votim të komunitetit OpenNIC'],
      ],
    },
    about: {
      title: 'Rreth nesh — Balkan Open DNS',
      description: 'Misioni, qeverisja, parimet jofitimprurëse dhe kufijtë e qartë të Balkan Open DNS mirëmbajtur nga GuardNovaX.',
      h1: 'Rreth Balkan Open DNS',
      subtitle: 'Inxhinieri DNS e pavarur dhe jofitimprurëse e mirëmbajtur nga GuardNovaX.',
      cards: [
        {
          title: 'Misioni dhe fokusi rajonal',
          body: 'Balkan Open DNS synon të forcojë infrastrukturën DNS të hapur, të qëndrueshme dhe private për komunitetet e Evropës Juglindore në gjashtë gjuhë pa varësi komerciale.',
        },
        {
          title: 'Qeverisja dhe ndarja e sistemeve',
          body: 'Mirëmbahet nga GuardNovaX nën licencën MIT. Të gjitha depot dhe mjediset testuese mbeten të izoluara plotësisht nga serverët komercialë dhe sistemet ekzistuese të prodhimit.',
        },
        {
          title: 'Angazhimi jofitimprurës',
          body: 'Zhvillimi fillestar dhe hostimi funksionojnë me buxhet $0. Nuk ka sisteme pagesash apo shitje domenesh, në përputhje me rekomandimet e OpenNIC.',
        },
        {
          title: 'Çfarë nuk pretendojmë',
          body: 'Nuk pretendojmë njohje nga ICANN, përputhshmëri globale në shfletues, partneritet zyrtar me OpenNIC, serverë publikë aktivë ose domene ekzistuese .balkan.',
        },
      ],
    },
    infrastructure: {
      title: 'Infrastruktura DNS — Balkan Open DNS',
      description: 'Arkitektura teknike e zgjidhësit BIND 9.20 Tier 2 për një VPS me 1 vCPU dhe 1 GB RAM.',
      h1: 'Arkitektura e infrastrukturës DNS',
      subtitle: 'Zgjidhës BIND 9.20 Tier 2 i lehtë dhe i forcuar, i validuar në Linux CI të izoluar.',
      callout:
        'Zgjidhësi publik aktualisht NUK është aktiv. Kontejneri lidhet vetëm me 127.0.0.1:53 në testime derisa të plotësohen VPS-i, leja e portit 53 dhe miratimi i pronarit.',
      specs: [
        ['Imazhi bazë', 'internetsystemsconsortium/bind9:9.20 (fiksuar me SHA256 + apk upgrade)'],
        ['Izolimi i procesit', 'USER bind jo-root, read_only: true, no-new-privileges, cap_drop: ALL'],
        ['Kufijtë e memories', 'Kufiri i kontejnerit 512 MiB · max-cache-size 256m (15.56–18.41 MiB në CI)'],
        ['Sinkronizimi i zonave', 'AXFR/IXFR dytësor për ., dns.opennic.glue dhe opennic.glue (pa skripte HTTP)'],
        ['Mbrojtja nga abuzimi', 'BIND9 RRL (10 përgj/s, slip 2), minimal-responses yes, minimal-any yes, EDNS 1232, AXFR i refuzuar'],
        ['Privatësia e pyetjeve', 'category queries { null; }; · qname-minimization relaxed · version.bind i fshehur'],
      ],
      budgetTitle: 'Modeli i burimeve për VPS 1 vCPU / 1 GB RAM',
      budgetRows: [
        ['Linux minimal dhe muri mbrojtës nftables', '~180 MB RAM', '~3.5 GB SSD'],
        ['Shtresa e kontejnerëve (Docker / containerd)', '~70 MB RAM', '~2.0 GB SSD'],
        ['Kontejneri BIND 9.20 Tier 2 (kufiri 512M)', '16–300 MB RAM', '< 1.0 GB SSD'],
        ['Swap / ZRAM dhe hapësira rezervë', '~470 MB e lirë', '~12+ GB e lirë'],
      ],
    },
    balkanTld: {
      title: 'TLD i propozuar .balkan — Balkan Open DNS',
      description: 'Statusi transparent, kushtet e OpenNIC dhe parimet e kartës jofitimprurëse të propozuar për .balkan.',
      h1: 'Domeni i propozuar i nivelit të lartë .balkan',
      subtitle: 'Statusi: VETËM PROPOZIM — Nuk është miratuar, nuk është deleguar dhe nuk pranon regjistrime.',
      callout:
        'Njoftim i rëndësishëm: .balkan NUK është miratuar apo deleguar nga OpenNIC dhe nuk është pjesë e rrënjës së ICANN. Asnjë domen nuk është i regjistruar publikisht.',
      prereqTitle: 'Kushtet e verifikuara të OpenNIC për TLD të re',
      prereqRows: [
        ['3+ muaj Tier 2 i pandërprerë', 'E planifikuar (pistë e pavarur)', 'Zgjidhësi publik Tier 2 duhet të punojë >= 3 muaj para dhe gjatë propozimit.'],
        ['Server Tier 1 i palistuar', 'Jo aktiv (Faza 6–7)', 'Duhet të pasqyrojë . dhe të gjitha TLD-të OpenNIC dhe të kalojë testin Tier 1.'],
        ['www.opennic.balkan dhe emailet', 'Jo aktive', 'Kërkon faqe me kartën dhe adresat hostmaster@, abuse@, webmaster@.'],
        ['Karta dhe procesi i regjistrimit', 'E planifikuar (Faza 3 dhe 6)', 'Rregulla falas jofitimprurëse, ndalim abuzimi dhe regjistër i automatizuar.'],
        ['[DISCUSSION] dhe [VOTE] në listë', 'E bllokuar deri në plotësim', 'Minimum 7 ditë diskutim formal dhe >= 7 ditë votim në komunitetin OpenNIC.'],
      ],
      charterPrinciples: [
        'Hapësirë strikt jofitimprurëse për projekte me burim të hapur, arsimore, kulturore dhe komunitare në Ballkan.',
        'Ndalim i qartë i malware, phishing, spam, botnet C2 dhe zënies keqdashëse të markave.',
        'Mbrojtja e emrave infrastrukturorë (nic.balkan, opennic.balkan, www.opennic.balkan, localhost).',
        'Raportim transparent i abuzimit, politika të qarta skadimi dhe procedura ndryshimi të kartës.',
      ],
    },
    documentation: {
      title: 'Dokumentacioni — Balkan Open DNS',
      description: 'Dokumentacioni teknik për testimin lokal në sandbox, kopjet rezervë, shënimet DNSSEC dhe udhëzuesit.',
      h1: 'Dokumentacioni teknik',
      subtitle: 'Specifikimet e arkitekturës, komandat e verifikimit dhe udhëzuesit operacionalë.',
      sections: [
        {
          title: 'Verifikimi lokal në sandbox (Linux / Docker)',
          body: 'Të gjitha konfigurimet e Fazës 1 gjenden në infrastructure/dns-tier2/ dhe lidhen vetëm me 127.0.0.1:53:',
          code: 'cd infrastructure/dns-tier2\n./scripts/validate-config.sh\n./scripts/test-integration.sh',
        },
        {
          title: 'Kopja rezervë dhe rikthimi me verifikim SHA256',
          body: 'Konfigurimet dhe cache-i i zonave dytësore ruhen në arkiva të verifikuara me SHA256:',
          code: './scripts/backup-restore.sh backup\n./scripts/backup-restore.sh restore backups/balkan-dns-tier2-<TIMESTAMP>.tar.gz',
        },
      ],
      docLinksTitle: 'Specifikimet në depo',
      docLinks: [
        ['Arkitektura e sistemit', 'docs/architecture.md'],
        ['Matrica e kërkesave OpenNIC', 'docs/opennic-requirements.md'],
        ['Shqyrtimi i sigurisë (Faza 1)', 'docs/phase-1-security-review.md'],
        ['Vlerësimi i përputhshmërisë DNSSEC', 'docs/phase-1-dnssec-assessment.md'],
        ['Udhëzuesi i VPS dhe rikthimit', 'docs/vps-deployment-runbook.md'],
        ['Udhëzuesi i publikimit të faqes', 'docs/website-deployment.md'],
      ],
    },
    status: {
      title: 'Statusi i rrjetit — Balkan Open DNS',
      description: 'Statusi real dhe i paverifikuar në mënyrë artificiale i komponentëve të Balkan Open DNS.',
      h1: 'Statusi i rrjetit dhe projektit',
      subtitle: 'Status faktik inxhinierik pa statistika të fabrikuara.',
      callout:
        'Zgjidhësit publikë DNS dhe shërbimet e regjistrimit NUK janë aktive. Aktualisht funksionon vetëm validimi i izoluar në CI.',
      rows: [
        ['Zgjidhësit publikë Tier 2', 'blocked', 'Jo aktiv', 'Pa VPS; pret lejen e ofruesit për portin 53 dhe miratimin e pronarit.'],
        ['CI Sandbox i Fazës 1 (GitHub Actions)', 'verified', 'Kaloi (16 / 16)', 'Verifikuar në ubuntu-latest në ekzekutimin 45924051847 (vetëm 127.0.0.1:53).'],
        ['Delegimi rrënjësor .balkan', 'proposed', 'I padeleguar', 'Vetëm propozim; kërkon >=3 muaj Tier 2, Tier 1 dhe votim OpenNIC.'],
        ['Regjistri dhe paneli admin', 'planned', 'E pazbatuar', 'Planifikuar për Fazat 3–4 (vetëm sandbox) pas shqyrtimit të Fazës 2.'],
        ['Faqja publike statike', 'planned', 'Gati për shqyrtim', 'Në degën phase-2-website; ende e papublikuar.'],
      ],
      observationsTitle: 'Vëzhgimet e fundit direkte nga OpenNIC (2026-11-27)',
      observations: [
        'Serverët aktivë Tier 1 që kalojnë testet në servers.opennic.org: ns2, ns4, ns6, ns7.',
        'Nyjet Tier 1 të shënuara Offline dhe të përjashtuara: ns8, ns10.',
        'Validimi strikt DNSSEC i ruajtur: .free, .ing, .geek, .libre, isc.org, cloudflare.com, debian.org validohen; .o dhe .chan kthejnë SERVFAIL.',
      ],
    },
    securityPrivacy: {
      title: 'Siguria dhe privatësia — Balkan Open DNS',
      description: 'Politika zero-regjistrim e pyetjeve DNS, DNSSEC strikt, izolimi i kontejnerit dhe raportimi i dobësive.',
      h1: 'Siguria dhe privatësia',
      subtitle: 'Projektuar për të mbrojtur privatësinë e shfletimit dhe integritetin e DNS-së.',
      cards: [
        {
          title: 'Zero regjistrim i pyetjeve DNS',
          body: 'BIND9 hedh poshtë kategoritë queries dhe query-errors (null;). Ruhen vetëm njoftimet operative të kufizuara dhe ngjarjet RRL.',
        },
        {
          title: 'Zero gjurmim në faqe',
          body: 'Kjo faqe statike nuk përdor cookie, analitikë apo font-e të jashtme dhe zbaton Content-Security-Policy dhe Referrer-Policy: no-referrer.',
        },
        {
          title: 'DNSSEC strikt pa përjashtime',
          body: 'dnssec-validation yes; është aktiv me çelësin rrënjësor OpenNIC 60820. Anomalitë e jashtme (.o, .chan) dokumentohen pa u fshehur.',
        },
        {
          title: 'Raportimi i dobësive',
          body: 'Raportoni dobësitë privatisht përmes GitHub Security Advisories. Mos testoni sulme ndaj serverëve aktivë të OpenNIC apo palëve të treta.',
        },
      ],
    },
    community: {
      title: 'Burimi i hapur — Balkan Open DNS',
      description: 'Licenca MIT, lokalizimi në gjashtë gjuhë, kodi i sjelljes dhe udhëzimet për kontribut.',
      h1: 'Burimi i hapur dhe komuniteti',
      subtitle: 'Infrastrukturë nën licencën MIT e hapur për shqyrtim publik.',
      cards: [
        {
          title: 'Kod nën licencën MIT',
          body: 'E gjithë infrastruktura, dokumentacioni dhe kodi i faqes janë të publikuara nën licencën MIT te github.com/Ahmed-com/balkan-open-dns.',
        },
        {
          title: 'Lokalizim në gjashtë gjuhë',
          body: 'Kontribuuesit vendas mund të përmirësojnë terminologjinë për shqip, boshnjakisht, serbisht, kroatisht, maqedonisht dhe anglisht.',
        },
        {
          title: 'Standardet inxhinierike',
          body: 'Kontributet duhet të ruajnë arkitekturën $0, të kalojnë kontrollet automatike të sigurisë/aksesueshmërisë dhe ta cilësojnë .balkan si propozim.',
        },
      ],
    },
    faq: {
      title: 'Pyetje të shpeshta — Balkan Open DNS',
      description: 'Pyetje të shpeshta rreth statusit të .balkan, OpenNIC, privatësisë dhe kontributit.',
      h1: 'Pyetje të shpeshta',
      subtitle: 'Përgjigje të qarta dhe të sinqerta mbi aftësitë dhe kufijtë aktualë.',
      items: [
        {
          q: 'A është .balkan aktiv apo i miratuar nga OpenNIC?',
          a: 'Jo. .balkan është vetëm një propozim. Nuk është dorëzuar, miratuar apo deleguar nga OpenNIC dhe nuk njihet nga ICANN.',
        },
        {
          q: 'A mund të regjistroj një domen .balkan sot?',
          a: 'Jo. Asnjë regjistër nuk është aktiv dhe asnjë domen .balkan nuk është i regjistruar.',
        },
        {
          q: 'A mund ta drejtoj pajisjen time te serverët publikë Balkan Open DNS tani?',
          a: 'Jo. Zgjidhësit publikë nuk janë vendosur ende. Faza 1 është validuar vetëm në CI të izoluar (127.0.0.1:53).',
        },
        {
          q: 'A i ruan Balkan Open DNS pyetjet e mia apo i shet të dhënat?',
          a: 'Jo. Regjistrimi i pyetjeve është çaktivizuar, faqja nuk ka cookie apo gjurmues dhe projekti është strikt jofitimprurës.',
        },
        {
          q: 'Pse synohet një VPS me 1 vCPU / 1 GB RAM?',
          a: 'Konsumi i ulët (~15.6–18.4 MiB në CI me kufi cache 256 MiB) mundëson funksionim të besueshëm në burime me kosto të ulët ose të dhuruara.',
        },
      ],
    },
    contact: {
      title: 'Kontakti — Balkan Open DNS',
      description: 'Depo zyrtare, kanali privat i sigurisë dhe kontaktet e mirëmbajtësit GuardNovaX.',
      h1: 'Kontakti dhe kanalet e projektit',
      subtitle: 'Mirëmbahet nga GuardNovaX përmes kanaleve të hapura në GitHub.',
      cards: [
        {
          title: 'Depoja dhe diskutimet',
          body: 'Hapni çështje teknike ose dërgoni pull request në https://github.com/Ahmed-com/balkan-open-dns.',
        },
        {
          title: 'Këshillime private sigurie',
          body: 'Raportoni dobësitë privatisht përmes GitHub Private Vulnerability Reporting në https://github.com/Ahmed-com/balkan-open-dns/security.',
        },
        {
          title: 'Adresat e ardhshme OpenNIC (jo aktive)',
          body: 'Rregullat e OpenNIC kërkojnë hostmaster@opennic.balkan, abuse@opennic.balkan dhe webmaster@opennic.balkan para votimit. Këto adresa NUK janë ende aktive.',
        },
      ],
    },
  },
};
