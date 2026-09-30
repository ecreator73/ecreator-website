/**
 * Zentrale Unternehmensdaten. Einzige Quelle für Kontakt, Adresse, Socials, Navigation.
 * Quellen: _research/FACTS.md (Live-Site ecreator.ch, Impressum, Kontakt).
 * Alles mit TODO ist vor Livegang von eCreator zu bestätigen.
 */

export const site = {
  name: "eCreator",
  legalName: "eCreator GmbH",
  url: "https://www.ecreator.ch",
  locale: "de-CH",
  claim: "Systems over campaigns.",
  claimDe: "Systeme statt Kampagnen.",
  tagline: "We create customers, not clicks.",
  description:
    "eCreator ist eine Marketingagentur aus dem Kanton Zürich. Wir verbinden Content-Produktion, Performance Marketing, Websites und CRM zu einem System, das aus Aufmerksamkeit Kunden macht.",
  email: "info@ecreator.ch",
  phone: "+41 44 974 27 60",
  phoneHref: "tel:+41449742760",
  address: {
    street: "Zürcherstrasse 17",
    zip: "8173",
    city: "Neerach",
    region: "Kanton Zürich",
    regionCode: "ZH",
    country: "CH",
    countryName: "Schweiz",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Z%C3%BCrcherstrasse+17%2C+8173+Neerach",
  },
  hours: "Mo bis Fr, 08:00 bis 18:00 Uhr",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/ecreator.ch" },
    // Live-Site verlinkt /company/ecreator (404). Korrekt laut Recherche 29.09.2026:
    { label: "LinkedIn", href: "https://www.linkedin.com/company/ecreator-gmbh" },
    // TODO: TikTok @ecreator.gmbh bestätigen, dann ergänzen.
  ],
  /**
   * Google-Unternehmensprofil, abgerufen 29.09.2026: 4.7 von 5, 12 Rezensionen.
   * Die Live-Site zeigt «5.0», das ist veraltet. Wert vor Livegang aktualisieren.
   * Nicht als AggregateRating ins Schema (keine eigenen Review-Daten auf der Seite).
   */
  google: {
    url: "https://share.google/xcBQCpWbyWIwegBX5",
    rating: "4.7",
    count: 12,
    asOf: "29.09.2026",
  },
} as const;

export type NavLink = { label: string; href: string; note?: string };
export type NavGroup = { title: string; links: NavLink[] };

export const nav = {
  leistungen: [
    {
      title: "Nachfrage erzeugen",
      links: [
        { label: "Performance Marketing", href: "/performance-marketing" },
        { label: "Meta Ads", href: "/performance-marketing/meta-ads", note: "Facebook, Instagram" },
        { label: "Google Ads", href: "/performance-marketing/google-ads" },
        { label: "Social Media", href: "/social-media" },
      ],
    },
    {
      title: "Gefunden werden",
      links: [
        { label: "SEO", href: "/seo" },
        { label: "AEO / AI Search", href: "/ai-search" },
      ],
    },
    {
      title: "Infrastruktur",
      links: [
        { label: "Webdesign & Development", href: "/webdesign" },
        { label: "CRM & Automation", href: "/crm-automation" },
      ],
    },
    {
      title: "Produkt",
      links: [{ label: "Social Recruiting", href: "/social-recruiting", note: "CHF 5'900" }],
    },
  ] satisfies NavGroup[],
  studio: [
    { label: "Content-Produktion", href: "/content-produktion" },
    { label: "Content Day", href: "/content-day", note: "ab CHF 1'990" },
    { label: "Podcast-Studio", href: "/podcast-studio", note: "ab CHF 690" },
  ] satisfies NavLink[],
  main: [
    { label: "Cases", href: "/cases" },
    { label: "Pakete", href: "/pakete" },
    { label: "Über uns", href: "/ueber-uns" },
    { label: "Insights", href: "/insights" },
  ] satisfies NavLink[],
  legal: [
    { label: "Impressum", href: "/impressum" },
    { label: "Datenschutz", href: "/datenschutz" },
    { label: "AGB", href: "/agb" },
  ] satisfies NavLink[],
};

export const cta = {
  primary: { label: "Strategie-Call buchen", short: "Call buchen", href: "/strategie-call" },
  contentDay: { label: "Content Day anfragen", href: "/kontakt?anliegen=content-day" },
  recruiting: { label: "Recruiting besprechen", href: "/kontakt?anliegen=recruiting" },
  podcast: { label: "Studio anfragen", href: "/kontakt?anliegen=podcast-studio" },
  website: { label: "Website-Projekt besprechen", href: "/kontakt?anliegen=website" },
  crm: { label: "CRM-Projekt besprechen", href: "/kontakt?anliegen=crm" },
  contact: { label: "Kontakt aufnehmen", href: "/kontakt" },
} as const;

/**
 * Strategie-Call: Angaben laut /termin-buchen/ der Live-Site (29.09.2026).
 * Buchung über Google Calendar Appointment Schedules (iframe erst nach Klick laden, Datenschutz).
 */
export const strategyCall = {
  duration: "30 Minuten",
  price: "kostenlos",
  medium: "Video-Call (Google Meet)",
  bookingUrl:
    "https://calendar.google.com/calendar/appointments/schedules/AcZssZ32tUKMTdxO9ivjGGoFX2LbyKJPiGJdMpKQTysmhzlkOTmybnZiKPQ-yrKsDf_EsHhig-iYPfOZ?gv=true",
  agenda: [
    { title: "Ziel und Angebot klären", text: "Was willst du erreichen, wen willst du ansprechen?" },
    { title: "Tracking und Funnel prüfen", text: "Wo gehen gerade Anfragen verloren, und warum?" },
    { title: "Nächste Schritte festlegen", text: "Du bekommst eine klare Prioritätenliste für die nächsten vier Wochen." },
  ],
  promises: ["Kostenlos, keine versteckten Kosten", "Keine Vertragspflicht nach dem Gespräch", "Bestätigung und Erinnerung per E-Mail"],
  // TODO: AGB §9 (CHF 150 bei Absage < 24 h) widerspricht «jederzeit kostenfrei verschieben» der Live-Site. Klären.
};

/**
 * Partner-Badges (Originaldateien der bisherigen Website, unverändert, aufbereitet mit scripts/logos.py).
 * Die Badges sagen einen aktiven Partnerstatus aus: nur zeigen, solange eCreator diesen Status bei
 * Google, Meta und TikTok tatsächlich hat (siehe README, offene Punkte).
 */
export const partners = [
  { name: "Google Partner", src: "/partners/google-partner.png", w: 236, h: 120 },
  { name: "Meta Business Partner", src: "/partners/meta-business-partner.png", w: 355, h: 120 },
  { name: "TikTok Marketing Partner", src: "/partners/tiktok-marketing-partner.png", w: 528, h: 120 },
];
