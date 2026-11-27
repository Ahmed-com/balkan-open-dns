export default {
  ui: {
    siteName: 'Balkan Open DNS',
    maintainerLine: 'Infrastruktura otvorenog koda · GuardNovaX',
    skipToContent: 'Preskoči na glavni sadržaj',
    noticeBadge: 'Prijedlog · Samo sandbox',
    noticeText:
      'TLD .balkan je samo prijedlog i NIJE odobren niti delegiran od strane OpenNIC-a. Javni DNS poslužitelji još nisu pokrenuti; Faza 1 je potvrđena isključivo u izoliranom CI okruženju.',
    menuButton: 'Izbornik',
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
      ariaLabel: 'Zemljopisno točna karta Balkanskog poluotoka koja prikazuje jezični i zajednički obuhvat',
      caption:
        'Regionalni obuhvat: zajednice Balkanskog poluotoka na šest jezika (EN, BS, SQ, SR, HR, MK). Oznake predstavljaju jezična središta — nijedan javni DNS čvor još nije aktivan.',
      legendScope: 'Primarni jezični i zajednički fokus',
      legendContext: 'Okolno područje jugoistočne Europe',
      legendMarker: 'Regionalno jezično središte (nema aktivnog poslužitelja)',
    },
    footer: {
      aboutTitle: 'Balkan Open DNS',
      aboutBody:
        'Nekomercijalna inicijativa otvorene DNS infrastrukture usmjerena zajednici, koju održava GuardNovaX pod MIT licencom. Bez plaćenih usluga, bez praćenja i bez javne delegacije .balkan domene.',
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
        'Nekomercijalna DNS infrastruktura otvorenog koda za Balkan usmjerena na privatnost, koju održava GuardNovaX. Faza 1 potvrđena u izoliranom CI-u; .balkan je samo prijedlog.',
      eyebrow: 'Nekomercijalna internetska infrastruktura · GuardNovaX',
      h1: 'Otvorena DNS infrastruktura za Balkan s naglaskom na privatnost',
      lead:
        'Balkan Open DNS je neovisna inicijativa otvorenog koda koja razvija ponovljivu OpenNIC-kompatibilnu Tier 2 DNS infrastrukturu te priprema transparentan, besplatan okvir zajednice za predloženi alternativni .balkan prostor.',
      ctaPrimary: 'Istraži DNS infrastrukturu',
      ctaSecondary: 'Status prijedloga .balkan',
      metrics: [
        { label: 'Potrošnja memorije Tier 2 spremnika', value: '15.56 MiB / 512 MiB' },
        { label: 'Linux CI provjera rada', value: '16 / 16 uspješno (Sandbox)' },
        { label: 'Ranjivosti spremnika (Trivy)', value: '0 potvrđenih CVE' },
        { label: 'Ciljani VPS profil', value: '1 vCPU · 1 GB RAM' },
      ],
      pillarsTitle: 'Temeljna inženjerska načela',
      pillarsIntro:
        'Svaka je komponenta oblikovana za provjerljivost, minimalno zauzeće memorije, strogu zaštitu privatnosti i pošteno izvještavanje o statusu.',
      pillars: [
        {
          pill: 'verified',
          title: 'Ponovljivi Tier 2 DNS (Faza 1)',
          body: 'Temeljen na fiksiranom ISC BIND 9.20 s nepromjenjivim SHA256 sažetkom, neprivilegiranim izvođenjem, RRL zaštitom i sekundarnom sinkronizacijom zona.',
        },
        {
          pill: 'proposed',
          title: 'Predloženi .balkan prostor',
          body: 'Osmišljen kao besplatan, nekomercijalan prijedlog alternativnog TLD-a za OpenNIC. Trenutačno nije odobren, nije delegiran i registracija domena nije otvorena.',
        },
        {
          pill: 'planned',
          title: 'Nulti trošak i privatnost',
          body: 'Bez bilježenja korisničkih upita u BIND9, bez analitičkih skripti ili kolačića na mrežnom sjedištu, uz besplatni statički smještaj i strogi proračun od $0.',
        },
      ],
      roadmapTitle: 'Stvarni status provedbe',
      roadmapIntro:
        'Pokretanje javnog Tier 2 razrješivača odvojeno je od aktivacije .balkan TLD-a kako bi se nužna operativna povijest mogla prikupljati usporedno nakon odobrenja.',
      roadmapRows: [
        ['Faza 0', 'Temelji repozitorija, model prijetnji i OpenNIC matrica', 'verified', 'Dovršeno na grani main'],
        ['Faza 1', 'Kontejnerizirani BIND 9.20 Tier 2 poslužitelj (Sandbox)', 'verified', '16/16 CI provjera uspješno'],
        ['Tier 2 staza', 'Javno pokretanje Tier 2 poslužitelja', 'blocked', 'Čeka VPS, dopuštenje pružatelja za port 53 i odobrenje vlasnika'],
        ['Faza 2', 'Višejezično statičko javno mrežno sjedište (6 jezika)', 'planned', 'Na pregledu na grani phase-2-website'],
        ['Faze 3–5', 'Sandbox registar, admin RBAC i potpuna sigurnosna revizija', 'planned', 'Čeka izričito odobrenje'],
        ['Faze 6–7', 'OpenNIC .balkan prijedlog, glasovanje i javna delegacija', 'blocked', 'Zahtijeva >=3 mj. Tier 2 rada, Tier 1 i OpenNIC glasovanje'],
      ],
    },
    about: {
      title: 'O projektu — Balkan Open DNS',
      description: 'Misija, upravljanje, nekomercijalna načela i jasne granice projekta Balkan Open DNS koji održava GuardNovaX.',
      h1: 'O projektu Balkan Open DNS',
      subtitle: 'Neovisno, nekomercijalno DNS inženjerstvo koje održava GuardNovaX.',
      cards: [
        {
          title: 'Misija i regionalni fokus',
          body: 'Balkan Open DNS nastoji ojačati otvorenu, otpornu i privatnu DNS infrastrukturu dostupnu zajednicama jugoistočne Europe na šest jezika, bez komercijalnog zaključavanja.',
        },
        {
          title: 'Upravljanje i odvojenost sustava',
          body: 'Projekt održava GuardNovaX pod MIT licencom. Svi repozitoriji, testna okruženja i buduća infrastruktura strogo su odvojeni od komercijalnih klijentskih i produkcijskih poslužitelja.',
        },
        {
          title: 'Nekomercijalna predanost',
          body: 'Početni razvoj i smještaj odvijaju se uz proračun od $0. Nema sustava naplate niti prodaje domena, u skladu s OpenNIC preporukama za besplatne TLD-ove zajednice.',
        },
        {
          title: 'Što ne tvrdimo',
          body: 'Ne tvrdimo da imamo ICANN priznanje, globalnu zadanu podršku u preglednicima, službeno partnerstvo s OpenNIC-om, aktivne javne poslužitelje ili postojeće .balkan domene.',
        },
      ],
    },
    infrastructure: {
      title: 'DNS infrastruktura — Balkan Open DNS',
      description: 'Tehnička arhitektura Faze 1 BIND 9.20 Tier 2 poslužitelja projektiranog za VPS s 1 vCPU i 1 GB RAM-a.',
      h1: 'Arhitektura DNS infrastrukture',
      subtitle: 'Lagani, sigurnosno ojačani BIND 9.20 Tier 2 poslužitelj provjeren u izoliranom Linux CI okruženju.',
      callout:
        'Javni poslužitelj trenutačno NIJE aktivan. Spremnik je u testnom okruženju vezan isključivo za 127.0.0.1:53 sve dok se ne osiguraju VPS, dopuštenje pružatelja za port 53 i odobrenje vlasnika.',
      specs: [
        ['Osnovna slika', 'internetsystemsconsortium/bind9:9.20 (fiksirana SHA256 sažetkom + apk upgrade)'],
        ['Izolacija procesa', 'Neprivilegirani USER bind, read_only: true datotečni sustav, no-new-privileges, cap_drop: ALL'],
        ['Ograničenje memorije', 'Granica spremnika 512 MiB · max-cache-size 256m (izmjereno 15.56–18.41 MiB u CI-u)'],
        ['Sinkronizacija zona', 'Sekundarni AXFR/IXFR za ., dns.opennic.glue i opennic.glue (bez neprovjerenih HTTP skripti)'],
        ['Zaštita od zloporabe', 'BIND9 RRL (10 odg/s, slip 2), minimal-responses yes, minimal-any yes, EDNS 1232, AXFR odbijen'],
        ['Privatnost upita', 'category queries { null; }; · qname-minimization relaxed · skriven version.bind'],
      ],
      budgetTitle: 'Model resursa za ciljani VPS (1 vCPU / 1 GB RAM)',
      budgetRows: [
        ['Minimalni Linux OS i nftables vatrozid', '~180 MB RAM', '~3.5 GB SSD'],
        ['Kontejnerski sloj (Docker / containerd)', '~70 MB RAM', '~2.0 GB SSD'],
        ['BIND 9.20 Tier 2 spremnik (512M granica)', '16–300 MB RAM', '< 1.0 GB SSD'],
        ['Swap / ZRAM zaštita i slobodna pričuva', '~470 MB slobodno', '~12+ GB slobodno'],
      ],
    },
    balkanTld: {
      title: 'Predloženi .balkan TLD — Balkan Open DNS',
      description: 'Transparentan status, OpenNIC preduvjeti i predloženi nekomercijalni okvir povelje za .balkan TLD.',
      h1: 'Predložena .balkan vršna domena',
      subtitle: 'Status: SAMO PRIJEDLOG — Nije odobreno, nije delegirano i registracije nisu otvorene.',
      callout:
        'Važna napomena: .balkan NIJE odobren niti delegiran od OpenNIC-a i nije dio ICANN korijena. Nijedna domena nije registrirana niti javno dostupna.',
      prereqTitle: 'Potvrđeni OpenNIC uvjeti za novi TLD',
      prereqRows: [
        ['3+ mjeseca neprekidnog Tier 2 rada', 'Planirano (neovisna staza)', 'Javni Tier 2 poslužitelj mora raditi neprekidno >= 3 mjeseca prije i tijekom prijedloga.'],
        ['Nelistan Tier 1 poslužitelj', 'Nije pokrenuto (Faza 6–7)', 'Mora preslikavati . i sve OpenNIC TLD-ove te proći Tier 1 provjere.'],
        ['www.opennic.balkan i službena e-pošta', 'Nije aktivno', 'Zahtijeva aktivno sjedište s poveljom te adrese hostmaster@, abuse@ i webmaster@.'],
        ['Povelja i postupak registracije', 'Planirano (Faza 3 i 6)', 'Besplatna nekomercijalna pravila, zabrana zloporabe i automatizirani registar.'],
        ['Lista [DISCUSSION] i [VOTE]', 'Blokirano do ispunjenja uvjeta', 'Najmanje 7 dana formalne rasprave i >= 7 dana glasovanja zajednice na OpenNIC listi.'],
      ],
      charterPrinciples: [
        'Isključivo nekomercijalni prostor zajednice za balkanske projekte otvorenog koda, obrazovanja, kulture i civilnog društva.',
        'Izričita zabrana zlonamjernog softvera, krađe identiteta (phishinga), neželjene pošte i zloporabe zaštićenih imena.',
        'Zaštita infrastrukturnih naziva (nic.balkan, opennic.balkan, www.opennic.balkan, localhost) od opće registracije.',
        'Transparentno rješavanje prijava zloporabe, jasna pravila isteka i postupak izmjene povelje.',
      ],
    },
    documentation: {
      title: 'Dokumentacija — Balkan Open DNS',
      description: 'Tehnička dokumentacija za lokalnu provjeru BIND9 spremnika, izradu sigurnosnih kopija, DNSSEC bilješke i poveznice.',
      h1: 'Tehnička dokumentacija',
      subtitle: 'Arhitektonske specifikacije, naredbe za provjeru i operativni priručnici.',
      sections: [
        {
          title: 'Lokalna provjera u sandboxu (Linux / Docker)',
          body: 'Sve postavke Faze 1 nalaze se u infrastructure/dns-tier2/ i zadano su vezane za 127.0.0.1:53:',
          code: 'cd infrastructure/dns-tier2\n./scripts/validate-config.sh\n./scripts/test-integration.sh',
        },
        {
          title: 'Sigurnosna kopija i oporavak sa SHA256 provjerom',
          body: 'Konfiguracija i predmemorija sekundarnih zona arhiviraju se pomoću fiksirane Alpine slike uz SHA256 provjeru:',
          code: './scripts/backup-restore.sh backup\n./scripts/backup-restore.sh restore backups/balkan-dns-tier2-<TIMESTAMP>.tar.gz',
        },
      ],
      docLinksTitle: 'Specifikacije u repozitoriju',
      docLinks: [
        ['Arhitektura sustava', 'docs/architecture.md'],
        ['Matrica OpenNIC zahtjeva', 'docs/opennic-requirements.md'],
        ['Sigurnosni pregled Faze 1', 'docs/phase-1-security-review.md'],
        ['Procjena DNSSEC kompatibilnosti', 'docs/phase-1-dnssec-assessment.md'],
        ['Priručnik za VPS i oporavak', 'docs/vps-deployment-runbook.md'],
        ['Vodič za objavu sjedišta', 'docs/website-deployment.md'],
      ],
    },
    status: {
      title: 'Status mreže — Balkan Open DNS',
      description: 'Stvarni, neuljepšani status komponenti projekta Balkan Open DNS.',
      h1: 'Status mreže i projekta',
      subtitle: 'Činjenični inženjerski status bez izmišljenih mjerenja dostupnosti.',
      callout:
        'Javni DNS poslužitelji i sustav za registraciju domena NISU aktivni. Trenutačno je operativna samo izolirana CI provjera.',
      rows: [
        ['Javni Tier 2 poslužitelji', 'blocked', 'Nije pokrenuto', 'Nema VPS-a; čeka dopuštenje pružatelja za port 53 i odobrenje vlasnika.'],
        ['Faza 1 Sandbox CI (GitHub Actions)', 'verified', 'Uspješno (16 / 16)', 'Potvrđeno na ubuntu-latest u CI izvođenju 45924051847 (samo 127.0.0.1:53).'],
        ['.balkan korijenska delegacija', 'proposed', 'Nije delegirano', 'Samo prijedlog; zahtijeva >=3 mj. Tier 2 rada, Tier 1 i glasovanje OpenNIC-a.'],
        ['Registar domena i admin sučelje', 'planned', 'Nije provedeno', 'Planirano za Faze 3–4 (samo sandbox) nakon pregleda Faze 2.'],
        ['Javno statičko sjedište', 'planned', 'Spremno za pregled', 'Na grani phase-2-website; još nije javno objavljeno.'],
      ],
      observationsTitle: 'Posljednja opažanja OpenNIC mreže uživo (2026-11-27)',
      observations: [
        'Aktivni Tier 1 primarni poslužitelji koji prolaze provjeru na servers.opennic.org: ns2, ns4, ns6, ns7.',
        'Tier 1 čvorovi označeni kao Offline i isključeni iz konfiguracije: ns8, ns10.',
        'Stroga DNSSEC provjera zadržana: .free, .ing, .geek, .libre, isc.org, cloudflare.com i debian.org prolaze; .o i .chan vraćaju SERVFAIL.',
      ],
    },
    securityPrivacy: {
      title: 'Sigurnost i privatnost — Balkan Open DNS',
      description: 'Politika bez bilježenja upita, stroga DNSSEC provjera, izolacija spremnika i prijava ranjivosti.',
      h1: 'Sigurnost i privatnost',
      subtitle: 'Oblikovano za zaštitu privatnosti korisnika i cjelovitosti DNS odgovora.',
      cards: [
        {
          title: 'Bez bilježenja DNS upita',
          body: 'BIND9 odbacuje kategorije queries i query-errors (null;). Bilježe se samo ograničena operativna upozorenja, sinkronizacija zona i RRL događaji.',
        },
        {
          title: 'Bez praćenja na mrežnom sjedištu',
          body: 'Ovo statičko sjedište ne rabi kolačiće, vanjsku analitiku niti vanjske fontove te primjenjuje strogi Content-Security-Policy i Referrer-Policy: no-referrer.',
        },
        {
          title: 'Stroga DNSSEC provjera bez iznimaka',
          body: 'dnssec-validation yes; je uključen s OpenNIC korijenskim ključem 60820. Neispravne uzvodne zone (.o, .chan) dokumentiraju se bez zaobilaženja provjere.',
        },
        {
          title: 'Prijava ranjivosti',
          body: 'Sigurnosne propuste prijavite privatno putem GitHub Security Advisories. Zabranjeno je ispitivanje napada na aktivne OpenNIC ili tuđe poslužitelje.',
        },
      ],
    },
    community: {
      title: 'Otvoreni kod — Balkan Open DNS',
      description: 'MIT licenca, prevođenje na šest jezika, kodeks ponašanja i smjernice za doprinos.',
      h1: 'Otvoreni kod i zajednica',
      subtitle: 'Infrastruktura pod MIT licencom otvorena za javni pregled i suradnju.',
      cards: [
        {
          title: 'Kod pod MIT licencom',
          body: 'Sva dokumentacija, kontejnerske postavke i izvorni kod sjedišta dostupni su pod MIT licencom na github.com/Ahmed-com/balkan-open-dns.',
        },
        {
          title: 'Lokalizacija na šest jezika',
          body: 'Članovi zajednice mogu unaprjeđivati nazivlje za hrvatski, bosanski, albanski, srpski, makedonski i engleski jezik putem strukturiranih prijevoda.',
        },
        {
          title: 'Inženjerski standardi',
          body: 'Svaki doprinos mora poštovati proračun od $0, proći automatizirane sigurnosne i provjere pristupačnosti te točno navoditi da je .balkan samo prijedlog.',
        },
      ],
    },
    faq: {
      title: 'Česta pitanja — Balkan Open DNS',
      description: 'Odgovori na najčešća pitanja o statusu .balkan TLD-a, privatnosti i uključivanju u projekt.',
      h1: 'Česta pitanja',
      subtitle: 'Jasni i iskreni odgovori o trenutačnim mogućnostima i granicama projekta.',
      items: [
        {
          q: 'Je li .balkan TLD aktivan ili odobren od OpenNIC-a?',
          a: 'Ne. .balkan je trenutačno isključivo prijedlog. Nije predan, odobren niti delegiran od OpenNIC-a i nije priznat od ICANN-a.',
        },
        {
          q: 'Mogu li danas registrirati .balkan domenu?',
          a: 'Ne. Javni registar ne postoji i nijedna .balkan domena nije registrirana. Sandbox registar je planiran za Fazu 3, a javna registracija čeka odobrenje OpenNIC zajednice.',
        },
        {
          q: 'Mogu li odmah podesiti uređaj na javne Balkan Open DNS poslužitelje?',
          a: 'Ne. Javni DNS poslužitelji još nisu pokrenuti. Faza 1 je potvrđena isključivo u izoliranom Linux CI sandboxu (127.0.0.1:53).',
        },
        {
          q: 'Bilježi li Balkan Open DNS moje upite ili prodaje podatke?',
          a: 'Ne. Bilježenje DNS upita je ugašeno u postavkama, sjedište nema kolačiće ni analitiku, a projekt je strogo nekomercijalan.',
        },
        {
          q: 'Zašto je arhitektura prilagođena VPS-u od 1 vCPU i 1 GB RAM-a?',
          a: 'Niska potrošnja memorije (izmjereno ~15.6–18.4 MiB u CI-u uz granicu predmemorije od 256 MiB) omogućuje pouzdan rad na pristupačnim ili darovanim resursima.',
        },
      ],
    },
    contact: {
      title: 'Kontakt — Balkan Open DNS',
      description: 'Službeni repozitorij, kanal za sigurnosne prijave i kontakt podaci održavatelja GuardNovaX.',
      h1: 'Kontakt i kanali projekta',
      subtitle: 'Projekt održava GuardNovaX putem otvorenih GitHub kanala.',
      cards: [
        {
          title: 'Izvorni repozitorij i rasprave',
          body: 'Prijavite tehničke poteškoće, pregledajte dokumentaciju ili pošaljite izmjene na https://github.com/Ahmed-com/balkan-open-dns.',
        },
        {
          title: 'Privatne sigurnosne prijave',
          body: 'Ranjivosti prijavljujte privatno putem GitHub Private Vulnerability Reporting na https://github.com/Ahmed-com/balkan-open-dns/security.',
        },
        {
          title: 'Buduće OpenNIC adrese (nisu aktivne)',
          body: 'OpenNIC pravila zahtijevaju hostmaster@opennic.balkan, abuse@opennic.balkan i webmaster@opennic.balkan prije glasovanja. Ove adrese još NISU aktivne.',
        },
      ],
    },
  },
};
