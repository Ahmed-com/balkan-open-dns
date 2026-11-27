export default {
  ui: {
    siteName: 'Balkan Open DNS',
    maintainerLine: 'Infrastruktura otvorenog koda · GuardNovaX',
    skipToContent: 'Preskoči na glavni sadržaj',
    noticeBadge: 'Prijedlog · Samo sandbox',
    noticeText:
      'TLD .balkan je samo prijedlog i NIJE odobren niti delegiran od strane OpenNIC-a. Javni DNS resolveri još nisu pokrenuti; Faza 1 je potvrđena isključivo u izolovanom CI okruženju.',
    menuButton: 'Meni',
    navLabel: 'Glavna navigacija',
    langLabel: 'Jezik',
    nav: {
      home: 'Početna',
      about: 'O projektu',
      infrastructure: 'DNS infrastruktura',
      balkanTld: 'Predloženi .balkan TLD',
      documentation: 'Dokumentacija',
      status: 'Status mreže',
      securityPrivacy: 'Sigurnost i privatnost',
      community: 'Otvoreni kod',
      faq: 'Česta pitanja',
      contact: 'Kontakt',
    },
    pills: {
      verified: 'CI potvrđeno (Sandbox)',
      proposed: 'Predloženo · Nije delegirano',
      planned: 'Planirano',
      blocked: 'Blokirano · Nije u produkciji',
    },
    map: {
      ariaLabel: 'Geografski tačna karta Balkanskog poluostrva koja prikazuje jezički i zajednički obuhvat',
      caption:
        'Regionalni obuhvat: zajednice Balkanskog poluostrva na šest jezika (EN, BS, SQ, SR, HR, MK). Oznake predstavljaju jezička središta — nijedan javni DNS čvor još nije aktivan.',
      legendScope: 'Primarni jezički i zajednički fokus',
      legendContext: 'Okolno područje jugoistočne Evrope',
      legendMarker: 'Regionalno jezičko središte (nema aktivnog servera)',
    },
    footer: {
      aboutTitle: 'Balkan Open DNS',
      aboutBody:
        'Nekomercijalna inicijativa otvorene DNS infrastrukture usmjerena zajednici, koju održava GuardNovaX pod MIT licencom. Bez plaćenih servisa, bez praćenja i bez javne delegacije .balkan domene.',
      linksTitle: 'Arhitektura i upravljanje',
      policiesTitle: 'Transparentnost i rad',
      copyright: '© 2026 GuardNovaX · Balkan Open DNS · MIT licenca',
      noTracking: 'Bez kolačića · Bez analitike · Statička arhitektura',
    },
  },
  pages: {
    home: {
      title: 'Balkan Open DNS — Otvorena DNS infrastruktura i predloženi .balkan TLD',
      description:
        'Nekomercijalna, privatnosti posvećena DNS infrastruktura otvorenog koda za Balkan, koju održava GuardNovaX. Faza 1 potvrđena u izolovanom CI; .balkan je samo prijedlog.',
      eyebrow: 'Nekomercijalna internet infrastruktura · GuardNovaX',
      h1: 'Otvorena DNS infrastruktura za Balkan s fokusom na privatnost',
      lead:
        'Balkan Open DNS je nezavisna inicijativa otvorenog koda koja razvija ponovljivu OpenNIC-kompatibilnu Tier 2 DNS infrastrukturu i priprema transparentan, besplatan okvir zajednice za predloženi alternativni .balkan imenski prostor.',
      ctaPrimary: 'Istraži DNS infrastrukturu',
      ctaSecondary: 'Status prijedloga .balkan',
      metrics: [
        { label: 'Potrošnja memorije Tier 2 kontejnera', value: '15.56 MiB / 512 MiB' },
        { label: 'Linux CI provjera rada', value: '16 / 16 uspješno (Sandbox)' },
        { label: 'Ranjivosti kontejnera (Trivy)', value: '0 potvrđenih CVE' },
        { label: 'Ciljani VPS profil', value: '1 vCPU · 1 GB RAM' },
      ],
      pillarsTitle: 'Osnovni inženjerski principi',
      pillarsIntro:
        'Svaka komponenta je dizajnirana za provjerljivost, minimalno zauzeće memorije, strogu zaštitu privatnosti i pošteno izvještavanje o statusu.',
      pillars: [
        {
          pill: 'verified',
          title: 'Ponovljiv Tier 2 DNS (Faza 1)',
          body: 'Zasnovan na fiksiranom ISC BIND 9.20 sa nepromjenjivim SHA256 sažetkom, neprivilegovanim pokretanjem, ograničenjem odgovora (RRL) i sekundarnom sinhronizacijom zona.',
        },
        {
          pill: 'proposed',
          title: 'Predloženi .balkan prostor',
          body: 'Osmišljen kao besplatan, nekomercijalan prijedlog alternativnog TLD-a za OpenNIC. Trenutno nije odobren, nije delegiran i registracija domena nije otvorena.',
        },
        {
          pill: 'planned',
          title: 'Nulti trošak i privatnost',
          body: 'Bez bilježenja korisničkih upita u BIND9, bez analitičkih skripti ili kolačića na web stranici, uz besplatan statički hosting i strogi budžet od $0.',
        },
      ],
      roadmapTitle: 'Stvarni status implementacije',
      roadmapIntro:
        'Pokretanje javnog Tier 2 resolvera odvojeno je od aktivacije .balkan TLD-a kako bi se neophodna operativna historija mogla prikupljati paralelno nakon odobrenja.',
      roadmapRows: [
        ['Faza 0', 'Temelj repozitorija, model prijetnji i OpenNIC matrica', 'verified', 'Završeno na main grani'],
        ['Faza 1', 'Kontejnerizirani BIND 9.20 Tier 2 resolver (Sandbox)', 'verified', '16/16 CI testova uspješno'],
        ['Tier 2 staza', 'Javno pokretanje Tier 2 resolvera', 'blocked', 'Čeka VPS, dozvolu provajdera za port 53 i odobrenje vlasnika'],
        ['Faza 2', 'Višejezična statička javna web stranica (6 jezika)', 'planned', 'Na pregledu na grani phase-2-website'],
        ['Faze 3–5', 'Sandbox registar, admin RBAC i potpuna sigurnosna revizija', 'planned', 'Čeka izričito odobrenje'],
        ['Faze 6–7', 'OpenNIC .balkan prijedlog, glasanje i javna delegacija', 'blocked', 'Zahtijeva >=3 mj. Tier 2 rada, Tier 1 i OpenNIC glasanje'],
      ],
    },
    about: {
      title: 'O projektu — Balkan Open DNS',
      description: 'Misija, upravljanje, nekomercijalni principi i jasne granice projekta Balkan Open DNS koji održava GuardNovaX.',
      h1: 'O projektu Balkan Open DNS',
      subtitle: 'Nezavisan, nekomercijalan DNS inženjering koji održava GuardNovaX.',
      cards: [
        {
          title: 'Misija i regionalni fokus',
          body: 'Balkan Open DNS nastoji ojačati otvorenu, otpornu i privatnu DNS infrastrukturu dostupnu zajednicama jugoistočne Evrope na šest jezika, bez komercijalnog zaključavanja.',
        },
        {
          title: 'Upravljanje i odvojenost sistema',
          body: 'Projekat održava GuardNovaX pod MIT licencom. Svi repozitoriji, testna okruženja i buduća infrastruktura strogo su odvojeni od komercijalnih klijentskih i produkcijskih servera.',
        },
        {
          title: 'Nekomercijalna posvećenost',
          body: 'Početni razvoj i hosting odvijaju se uz budžet od $0. Nema sistema plaćanja niti prodaje domena, u skladu s OpenNIC preporukama za besplatne TLD-ove zajednice.',
        },
        {
          title: 'Šta ne tvrdimo',
          body: 'Ne tvrdimo da imamo ICANN priznanje, globalnu podrazumijevanu podršku u preglednicima, zvanično partnerstvo s OpenNIC-om, aktivne javne servere ili postojeće .balkan domene.',
        },
      ],
    },
    infrastructure: {
      title: 'DNS infrastruktura — Balkan Open DNS',
      description: 'Tehnička arhitektura Faze 1 BIND 9.20 Tier 2 resolvera projektovanog za VPS sa 1 vCPU i 1 GB RAM-a.',
      h1: 'Arhitektura DNS infrastrukture',
      subtitle: 'Lagani, sigurnosno ojačani BIND 9.20 Tier 2 resolver provjeren u izolovanom Linux CI okruženju.',
      callout:
        'Javni resolver trenutno NIJE aktivan. Kontejner je u testnom okruženju vezan isključivo za 127.0.0.1:53 sve dok se ne obezbijede VPS, dozvola provajdera za port 53 i odobrenje vlasnika.',
      specs: [
        ['Osnovna slika', 'internetsystemsconsortium/bind9:9.20 (fiksirana SHA256 sažetkom + apk upgrade)'],
        ['Izolacija procesa', 'Neprivilegovani USER bind, read_only: true sistem fajlova, no-new-privileges, cap_drop: ALL'],
        ['Ograničenje memorije', 'Limit kontejnera 512 MiB · max-cache-size 256m (izmjereno 15.56–18.41 MiB u CI)'],
        ['Sinhronizacija zona', 'Sekundarni AXFR/IXFR za ., dns.opennic.glue i opennic.glue (bez neprovjerenih HTTP skripti)'],
        ['Zaštita od zloupotrebe', 'BIND9 RRL (10 odg/s, slip 2), minimal-responses yes, minimal-any yes, EDNS 1232, AXFR odbijen'],
        ['Privatnost upita', 'category queries { null; }; · qname-minimization relaxed · skriven version.bind'],
      ],
      budgetTitle: 'Model resursa za ciljani VPS (1 vCPU / 1 GB RAM)',
      budgetRows: [
        ['Minimalni Linux OS i nftables firewall', '~180 MB RAM', '~3.5 GB SSD'],
        ['Kontejnerski sloj (Docker / containerd)', '~70 MB RAM', '~2.0 GB SSD'],
        ['BIND 9.20 Tier 2 kontejner (512M limit)', '16–300 MB RAM', '< 1.0 GB SSD'],
        ['Swap / ZRAM zaštita i slobodna rezerva', '~470 MB slobodno', '~12+ GB slobodno'],
      ],
    },
    balkanTld: {
      title: 'Predloženi .balkan TLD — Balkan Open DNS',
      description: 'Transparentan status, OpenNIC preduslovi i predloženi nekomercijalni okvir povelje za .balkan TLD.',
      h1: 'Predložena .balkan vršna domena',
      subtitle: 'Status: SAMO PRIJEDLOG — Nije odobreno, nije delegirano i registracije nisu otvorene.',
      callout:
        'Važna napomena: .balkan NIJE odobren niti delegiran od OpenNIC-a i nije dio ICANN korijena. Nijedna domena nije registrovana niti javno dostupna.',
      prereqTitle: 'Potvrđeni OpenNIC uslovi za novi TLD',
      prereqRows: [
        ['3+ mjeseca neprekidnog Tier 2 rada', 'Planirano (nezavisna staza)', 'Javni Tier 2 resolver mora raditi neprekidno >= 3 mjeseca prije i tokom prijedloga.'],
        ['Nelistan Tier 1 server', 'Nije pokrenuto (Faza 6–7)', 'Mora preslikavati . i sve OpenNIC TLD-ove te proći Tier 1 testove.'],
        ['www.opennic.balkan i službeni email', 'Nije aktivno', 'Zahtijeva aktivnu stranicu s poveljom te adrese hostmaster@, abuse@ i webmaster@.'],
        ['Povelja i proces registracije', 'Planirano (Faza 3 i 6)', 'Besplatna nekomercijalna pravila, zabrana zloupotrebe i automatizovan registar.'],
        ['Lista [DISCUSSION] i [VOTE]', 'Blokirano do ispunjenja uslova', 'Najmanje 7 dana formalne rasprave i >= 7 dana glasanja zajednice na OpenNIC listi.'],
      ],
      charterPrinciples: [
        'Isključivo nekomercijalni prostor zajednice za balkanske projekte otvorenog koda, obrazovanja, kulture i civilnog društva.',
        'Izričita zabrana zlonamjernog softvera, phishinga, neželjene pošte i zloupotrebe zaštićenih imena.',
        'Zaštita infrastrukturnih naziva (nic.balkan, opennic.balkan, www.opennic.balkan, localhost) od opšte registracije.',
        'Transparentno rješavanje prijava zloupotrebe, jasna pravila isteka i procedura izmjene povelje.',
      ],
    },
    documentation: {
      title: 'Dokumentacija — Balkan Open DNS',
      description: 'Tehnička dokumentacija za lokalnu provjeru BIND9 kontejnera, izradu sigurnosnih kopija, DNSSEC napomene i poveznice.',
      h1: 'Tehnička dokumentacija',
      subtitle: 'Arhitektonske specifikacije, naredbe za provjeru i operativni priručnici.',
      sections: [
        {
          title: 'Lokalna provjera u sandboxu (Linux / Docker)',
          body: 'Sve postavke Faze 1 nalaze se u infrastructure/dns-tier2/ i podrazumijevano su vezane za 127.0.0.1:53:',
          code: 'cd infrastructure/dns-tier2\n./scripts/validate-config.sh\n./scripts/test-integration.sh',
        },
        {
          title: 'Sigurnosna kopija i oporavak sa SHA256 provjerom',
          body: 'Konfiguracija i keš sekundarnih zona arhiviraju se pomoću fiksirane Alpine slike uz SHA256 verifikaciju:',
          code: './scripts/backup-restore.sh backup\n./scripts/backup-restore.sh restore backups/balkan-dns-tier2-<TIMESTAMP>.tar.gz',
        },
      ],
      docLinksTitle: 'Specifikacije u repozitoriju',
      docLinks: [
        ['Arhitektura sistema', 'docs/architecture.md'],
        ['Matrica OpenNIC zahtjeva', 'docs/opennic-requirements.md'],
        ['Sigurnosni pregled Faze 1', 'docs/phase-1-security-review.md'],
        ['Procjena DNSSEC kompatibilnosti', 'docs/phase-1-dnssec-assessment.md'],
        ['Priručnik za VPS i oporavak', 'docs/vps-deployment-runbook.md'],
        ['Vodič za objavu web stranice', 'docs/website-deployment.md'],
      ],
    },
    status: {
      title: 'Status mreže — Balkan Open DNS',
      description: 'Stvarni, neuljepšani status komponenti projekta Balkan Open DNS.',
      h1: 'Status mreže i projekta',
      subtitle: 'Činjenični inženjerski status bez izmišljenih metrika dostupnosti.',
      callout:
        'Javni DNS resolveri i sistem za registraciju domena NISU aktivni. Trenutno je operativna samo izolovana CI provjera.',
      rows: [
        ['Javni Tier 2 resolveri', 'blocked', 'Nije pokrenuto', 'Nema VPS-a; čeka dozvolu provajdera za port 53 i odobrenje vlasnika.'],
        ['Faza 1 Sandbox CI (GitHub Actions)', 'verified', 'Uspješno (16 / 16)', 'Potvrđeno na ubuntu-latest u CI pokretanju 45924051847 (samo 127.0.0.1:53).'],
        ['.balkan korijenska delegacija', 'proposed', 'Nije delegirano', 'Samo prijedlog; zahtijeva >=3 mj. Tier 2 rada, Tier 1 i glasanje OpenNIC-a.'],
        ['Registar domena i admin panel', 'planned', 'Nije implementirano', 'Planirano za Faze 3–4 (samo sandbox) nakon pregleda Faze 2.'],
        ['Javna statička web stranica', 'planned', 'Spremna za pregled', 'Na grani phase-2-website; još nije objavljena javno.'],
      ],
      observationsTitle: 'Posljednja opažanja OpenNIC mreže uživo (2026-11-27)',
      observations: [
        'Aktivni Tier 1 primarni serveri koji prolaze provjeru na servers.opennic.org: ns2, ns4, ns6, ns7.',
        'Tier 1 čvorovi označeni kao Offline i isključeni iz konfiguracije: ns8, ns10.',
        'Stroga DNSSEC validacija zadržana: .free, .ing, .geek, .libre, isc.org, cloudflare.com i debian.org prolaze; .o (nepotpuni potpisi) i .chan (istekao RRSIG) vraćaju SERVFAIL.',
      ],
    },
    securityPrivacy: {
      title: 'Sigurnost i privatnost — Balkan Open DNS',
      description: 'Politika bez bilježenja upita, stroga DNSSEC validacija, izolacija kontejnera i prijava ranjivosti.',
      h1: 'Sigurnost i privatnost',
      subtitle: 'Projektovano za zaštitu privatnosti korisnika i integriteta DNS odgovora.',
      cards: [
        {
          title: 'Bez bilježenja DNS upita',
          body: 'BIND9 odbacuje kategorije queries i query-errors (null;). Bilježe se samo ograničena operativna upozorenja, sinhronizacija zona i RRL događaji.',
        },
        {
          title: 'Bez praćenja na web stranici',
          body: 'Ova statička stranica ne koristi kolačiće, eksternu analitiku niti eksterne fontove te primjenjuje strogi Content-Security-Policy i Referrer-Policy: no-referrer.',
        },
        {
          title: 'Stroga DNSSEC provjera bez izuzetaka',
          body: 'dnssec-validation yes; je uključen s OpenNIC korijenskim ključem 60820. Neispravne uzvodne zone (.o, .chan) dokumentuju se bez zaobilaženja provjere.',
        },
        {
          title: 'Prijava ranjivosti',
          body: 'Sigurnosne propuste prijavite privatno putem GitHub Security Advisories. Zabranjeno je testiranje napada na aktivne OpenNIC ili tuđe servere.',
        },
      ],
    },
    community: {
      title: 'Otvoreni kod — Balkan Open DNS',
      description: 'MIT licenca, prevođenje na šest jezika, kodeks ponašanja i smjernice za doprinos.',
      h1: 'Otvoreni kod i zajednica',
      subtitle: 'Infrastruktura pod MIT licencom otvorena za javni pregled i saradnju.',
      cards: [
        {
          title: 'Kod pod MIT licencom',
          body: 'Sva dokumentacija, kontejnerske konfiguracije i izvorni kod web stranice dostupni su pod MIT licencom na github.com/Ahmed-com/balkan-open-dns.',
        },
        {
          title: 'Lokalizacija na šest jezika',
          body: 'Članovi zajednice mogu unapređivati terminologiju za bosanski, albanski, srpski, hrvatski, makedonski i engleski jezik putem strukturiranih prevoda.',
        },
        {
          title: 'Inženjerski standardi',
          body: 'Svaki doprinos mora poštovati budžet od $0, proći automatizovane sigurnosne i provjere pristupačnosti te tačno navoditi da je .balkan samo prijedlog.',
        },
      ],
    },
    faq: {
      title: 'Česta pitanja — Balkan Open DNS',
      description: 'Odgovori na najčešća pitanja o statusu .balkan TLD-a, privatnosti i uključivanju u projekat.',
      h1: 'Česta pitanja',
      subtitle: 'Jasni i iskreni odgovori o trenutnim mogućnostima i granicama projekta.',
      items: [
        {
          q: 'Da li je .balkan TLD aktivan ili odobren od OpenNIC-a?',
          a: 'Ne. .balkan je trenutno isključivo prijedlog. Nije predat, odobren niti delegiran od OpenNIC-a i nije priznat od ICANN-a.',
        },
        {
          q: 'Mogu li danas registrovati .balkan domenu?',
          a: 'Ne. Javni registar ne postoji i nijedna .balkan domena nije registrovana. Sandbox registar je planiran za Fazu 3, a javna registracija čeka odobrenje OpenNIC zajednice.',
        },
        {
          q: 'Mogu li odmah podesiti svoj uređaj na javne Balkan Open DNS servere?',
          a: 'Ne. Javni DNS resolveri još nisu pokrenuti. Faza 1 je potvrđena isključivo u izolovanom Linux CI sandboxu (127.0.0.1:53).',
        },
        {
          q: 'Da li Balkan Open DNS bilježi moje upite ili prodaje podatke?',
          a: 'Ne. Bilježenje DNS upita je ugašeno u konfiguraciji, web stranica nema kolačiće ni analitiku, a projekat je strogo nekomercijalan.',
        },
        {
          q: 'Zašto je arhitektura prilagođena VPS-u od 1 vCPU i 1 GB RAM-a?',
          a: 'Niska potrošnja memorije (izmjereno ~15.6–18.4 MiB u CI uz limit keša od 256 MiB) omogućava pouzdan rad na pristupačnim ili doniranim resursima.',
        },
      ],
    },
    contact: {
      title: 'Kontakt — Balkan Open DNS',
      description: 'Zvanični repozitorij, kanal za sigurnosne prijave i kontakt informacije održavaoca GuardNovaX.',
      h1: 'Kontakt i kanali projekta',
      subtitle: 'Projekat održava GuardNovaX putem otvorenih GitHub kanala.',
      cards: [
        {
          title: 'Izvorni repozitorij i diskusije',
          body: 'Prijavite tehničke probleme, pregledajte dokumentaciju ili pošaljite izmjene na https://github.com/Ahmed-com/balkan-open-dns.',
        },
        {
          title: 'Privatne sigurnosne prijave',
          body: 'Ranjivosti prijavljujte privatno putem GitHub Private Vulnerability Reporting na https://github.com/Ahmed-com/balkan-open-dns/security.',
        },
        {
          title: 'Buduće OpenNIC adrese (nisu aktivne)',
          body: 'OpenNIC pravila zahtijevaju hostmaster@opennic.balkan, abuse@opennic.balkan i webmaster@opennic.balkan prije glasanja. Ove adrese još NISU aktivne.',
        },
      ],
    },
  },
};
