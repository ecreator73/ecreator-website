/**
 * Angebote, Pakete und Preise.
 * Quelle: Briefing eCreator (verbindlich). Keine Leistungen ergänzen, keine Mengen erfinden.
 * Preise in CHF, exkl. MWST sofern nicht anders vereinbart (TODO: MWST-Hinweis von eCreator bestätigen).
 */

export type Price = { amount: string; unit?: string; note?: string };

export type Package = {
  id: "pro" | "advanced";
  name: string;
  price: Price;
  minTerm: string;
  focus: string[];
  summary: string;
  includes: string[];
  notIncluded?: string[];
};

export const packages: Package[] = [
  {
    id: "pro",
    name: "Pro",
    price: { amount: "3'500", unit: "pro Monat" },
    minTerm: "Mindestlaufzeit 6 Monate",
    focus: ["Social Media", "Performance", "Lead Generation", "Bekanntheit"],
    summary:
      "Für Unternehmen, die über Social Media planbar Anfragen gewinnen und bekannter werden wollen. Mit monatlicher Produktion.",
    includes: [
      "Meta / Social Ads",
      "Kampagnenspezifische Landingpages",
      "CRM & Sales-Infrastruktur",
      "Monatlicher Content Shoot",
      "4 Videos pro Shoot",
      "Videograf, Schnitt und Model",
    ],
    notIncluded: ["Google Ads ist im Pro-Paket nicht regulär enthalten."],
  },
  {
    id: "advanced",
    name: "Advanced",
    price: { amount: "4'900", unit: "pro Monat" },
    minTerm: "Mindestlaufzeit 6 Monate",
    focus: ["Social", "Search", "Website", "Tracking", "Infrastruktur"],
    summary:
      "Der umfassendere Full-Funnel-Ansatz: Social und Search, Website, Tracking und Infrastruktur als ein System.",
    includes: [
      "6 Videos pro Content Shoot",
      "Google Ads",
      "Website bzw. Redesign / Branding, je nach Projekt",
      "SEO",
      "Technische Optimierung",
      "Server-Side Tracking",
      "Performance Marketing",
      "Content- und Social-Strategie",
    ],
  },
];

/**
 * Bewusst KEINE Kreuz-Matrix: Das Briefing listet pro Paket «unter anderem»-Leistungen.
 * Eine Matrix würde Aussagen erzwingen (enthalten / nicht enthalten), die nicht definiert sind.
 * Einzige explizite Abgrenzung: Google Ads ist im Pro nicht regulär enthalten.
 */
export const packageDifference =
  "Pro verbindet Social, Performance und Lead Generation. Advanced verbindet zusätzlich Search, Website, Tracking und Infrastruktur.";

export type ContentDayOption = {
  id: string;
  name: string;
  duration: string;
  price: Price;
  audience?: string;
  delivery: string;
  includes: string[];
  note?: string;
};

export const contentDay = {
  includes: ["Produktion", "Videograf", "Equipment", "Schnitt"],
  options: [
    {
      id: "4h-model",
      name: "Content Day",
      duration: "4 Stunden",
      price: { amount: "2'490", note: "inkl. Model von eCreator" },
      delivery: "Fertigstellung in 7 Arbeitstagen",
      includes: ["Produktion", "Videograf", "Equipment", "Schnitt", "Model von eCreator"],
    },
    {
      id: "4h",
      name: "Content Day",
      duration: "4 Stunden",
      price: { amount: "1'990", note: "ohne Model von eCreator" },
      delivery: "Fertigstellung in 7 Arbeitstagen",
      includes: ["Produktion", "Videograf", "Equipment", "Schnitt"],
    },
    {
      id: "3h-bestand",
      name: "Content Day für bestehende Kunden",
      duration: "3 Stunden",
      price: { amount: "1'500" },
      audience: "Für bestehende Kundinnen und Kunden",
      delivery: "Fertigstellung nach Absprache",
      includes: ["Produktion", "Videograf", "Equipment", "Schnitt"],
      note: "TODO: Fertigstellungsfrist für den 3h-Tag von eCreator bestätigen.",
    },
    {
      id: "8h",
      name: "Full Content Day",
      duration: "8 Stunden",
      price: { amount: "Auf Anfrage" },
      delivery: "Fertigstellung in 14 Arbeitstagen",
      includes: ["Produktion", "Videograf", "Equipment", "Schnitt"],
      note: "Für Events, Testimonials, umfangreiche Produktionen, Social Media, Ads und Unternehmenscontent.",
    },
  ] satisfies ContentDayOption[],
  express: "Express-Fertigstellung gegen Aufpreis möglich.",
  useCases: [
    "Social Media",
    "Ads",
    "Events",
    "Testimonials",
    "Recruiting",
    "Unternehmenscontent",
    "Produktvideos",
  ],
};

export const socialRecruiting = {
  price: { amount: "5'900", note: "Paketpreis" } satisfies Price,
  includes: [
    "1 ganzer Content Day",
    "Recruiting-Ad-Videos",
    "Team-Videos",
    "Image-Videos",
    "Fotos",
    "Bis zu 2 Kampagnen",
    "Meta (Facebook, Instagram)",
    "TikTok",
    "1 Monat Kampagnenverwaltung",
    "Recruiting-CRM / Bewerber-System",
  ],
  notes: [
    "Werbebudget ist nicht im Paketpreis enthalten.",
    "Wir versprechen keine Einstellungen. Wir bauen den Kanal, über den passende Bewerbungen hereinkommen, und machen ihn messbar.",
  ],
};

export const podcastStudio = {
  options: [
    { id: "2h", duration: "2 Stunden", price: { amount: "690" } satisfies Price },
    { id: "4h", duration: "4 Stunden", price: { amount: "990" } satisfies Price },
  ],
  includes: ["Studio", "Equipment", "Aufnahme-Infrastruktur"],
  onRequest: ["Schnitt", "Planung", "Strategie"],
};
