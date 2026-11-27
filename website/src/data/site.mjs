export const LOCALES = [
  { code: 'en', htmlLang: 'en', hreflang: 'en', nativeName: 'English', shortLabel: 'EN' },
  { code: 'bs', htmlLang: 'bs', hreflang: 'bs', nativeName: 'Bosanski', shortLabel: 'BS' },
  { code: 'sq', htmlLang: 'sq', hreflang: 'sq', nativeName: 'Shqip', shortLabel: 'SQ' },
  { code: 'sr', htmlLang: 'sr-Latn', hreflang: 'sr', nativeName: 'Srpski', shortLabel: 'SR' },
  { code: 'hr', htmlLang: 'hr', hreflang: 'hr', nativeName: 'Hrvatski', shortLabel: 'HR' },
  { code: 'mk', htmlLang: 'mk', hreflang: 'mk', nativeName: 'Македонски', shortLabel: 'MK' },
];

export const PAGES = [
  { id: 'home', slug: '', navGroup: 'primary' },
  { id: 'about', slug: 'about', navGroup: 'primary' },
  { id: 'infrastructure', slug: 'infrastructure', navGroup: 'primary' },
  { id: 'balkanTld', slug: 'balkan-tld', navGroup: 'primary' },
  { id: 'documentation', slug: 'documentation', navGroup: 'primary' },
  { id: 'status', slug: 'status', navGroup: 'primary' },
  { id: 'securityPrivacy', slug: 'security-privacy', navGroup: 'secondary' },
  { id: 'community', slug: 'community', navGroup: 'secondary' },
  { id: 'faq', slug: 'faq', navGroup: 'secondary' },
  { id: 'contact', slug: 'contact', navGroup: 'secondary' },
];

export const FACTS = {
  repoUrl: 'https://github.com/Ahmed-com/balkan-open-dns',
  licenseUrl: 'https://github.com/Ahmed-com/balkan-open-dns/blob/main/LICENSE',
  securityUrl: 'https://github.com/Ahmed-com/balkan-open-dns/security',
  ciPhase1RunUrl: 'https://github.com/Ahmed-com/balkan-open-dns/actions/runs/45924051847',
  opennicWikiUrl: 'https://wiki.opennic.org/',
  opennicNewTldUrl: 'https://wiki.opennic.org/opennic/creating_new_tlds',
  opennicTier2Url: 'https://wiki.opennic.org/opennic/tier2setup',
  bindImage: 'internetsystemsconsortium/bind9:9.20@sha256:978201d91548ec63c3b1c1befd5e6a3c9fa127f79f9058fd82d8e3493fe90ce1',
  measuredRamStartup: '18.41 MiB / 512 MiB',
  measuredRamPostLoad: '15.56 MiB / 512 MiB',
  trivyImageCves: '0',
  ciPassedTests: '16 / 16',
  targetVpsSpec: '1 vCPU · 1 GB RAM · 15–20 GB SSD',
};
