/**
 * Startseite: Case Studies (drei Zeilen, Video abwechselnd links und rechts).
 * Quellen:
 *  - Asset Management: Case Study auf ecreator.ch (600 Leads in 3 Monaten, CHF 10 statt 45 bis 80 pro Lead),
 *    Video-Interview mit Costantino Pinelli (testimonials.ts), «komplett individuelles CRM» laut eCreator (30.09.2026).
 *  - Spitex Nächstenpflege: Belege in cases.ts (Credit im Website-Footer, Logo im Abspann der Ads), keine Kennzahlen.
 *  - Baba's Döner: vorbereitet. Belegt ist nur das Video selbst (Marke im Bild, ohne Sprache); Resultat offen.
 */

export type HomeCasePoint = { text: string } | { todo: string };

export type HomeCase = {
  id: string;
  /** Label-Pille über dem Titel */
  label: string;
  client: string;
  summary: string;
  /** Häkchen-Liste */
  points: HomeCasePoint[];
  quote?: { text: string; by: string };
  media: { kind: "interview" } | { kind: "ad"; workId: string };
  link?: { label: string; href: string };
  source?: string;
};

export const homeCasesIntro = {
  label: "Case Studies",
  title: "Was wir für Kunden erreicht haben.",
  accent: "Kunden",
};

export const homeCases: HomeCase[] = [
  {
    id: "asset-management",
    label: "Case Study · Finanzdienstleistung",
    client: "Asset Management Switzerland AG",
    summary: "Lead-Generierung für Vorsorge, Krankenkasse und Steuern, mit eigenen Kampagnen pro Thema.",
    points: [
      { text: "600+ qualifizierte Leads in 3 Monaten" },
      { text: "Komplett individuelles CRM erstellt" },
      { text: "CHF 10 pro Lead statt 45 bis 80" },
    ],
    quote: {
      text: "Die Zusammenarbeit mit eCreator hat mir ermöglicht, dass ich kontinuierlich neue Leads bekommen habe.",
      by: "Costantino Pinelli, CEO",
    },
    media: { kind: "interview" },
    link: { label: "Ganzen Case lesen", href: "/cases/finanzdienstleister-lead-generierung" },
    source: "Zahlen laut Case Study auf ecreator.ch.",
  },
  {
    id: "spitex-naechstenpflege",
    label: "Case Study · Pflege",
    client: "Spitex Nächstenpflege",
    summary: "Eine Botschaft, drei Spuren: Video, Kampagne und Website für pflegende Angehörige.",
    points: [
      { text: "Video-Ads, die mit der wichtigsten Zahl einsteigen" },
      { text: "Kampagnen für pflegende Angehörige" },
      { text: "Website mit derselben Botschaft bis zur Anmeldung" },
    ],
    media: { kind: "ad", workId: "naechstenpflege" },
    link: { label: "Case ansehen", href: "/cases/spitex-naechstenpflege" },
  },
  {
    id: "babas-doener",
    label: "Case Study · Gastronomie",
    client: "Baba's Döner",
    summary: "Ein Social Ad, das ohne Worte funktioniert: nur Bild, Musik und Marke.",
    points: [
      { text: "Dreh und Schnitt durch eCreator" },
      { text: "Marke im ganzen Video präsent: Shirt, Flasche, Verpackung" },
      { todo: "Resultat der Kampagne (z.B. Reichweite, Bestellungen) von eCreator nachliefern" },
    ],
    media: { kind: "ad", workId: "babas-doener" },
    link: { label: "Content Day ansehen", href: "/content-day" },
  },
];

/* ==========================================================================
   Probleme der Kunden (Muster: «Wo dein Wachstum heute hängenbleibt»).
   Typische Ausgangslagen aus den Leistungsseiten und der Case Study (keine Kennzahlen, keine Kundenbehauptungen).
   ========================================================================== */

export type HomeProblem = {
  id: string;
  /** Art der kleinen Grafik oben in der Karte */
  visual: "funnel" | "inbox" | "quality" | "content";
  title: string;
  points: string[];
  link: { label: string; href: string };
};

export const homeProblemsIntro = {
  label: "Kennst du das?",
  title: "Wo heute Kunden verloren gehen.",
  accent: "Kunden",
  text: "Die meisten KMU haben kein Werbeproblem. Sie haben ein Systemproblem: Irgendwo zwischen Anzeige und Abschluss geht die Anfrage verloren.",
};

export const homeProblems: HomeProblem[] = [
  {
    id: "keine-anfragen",
    visual: "funnel",
    title: "Videos und Webseite generieren keine Anfragen",
    points: [
      "Schöne Webseite, aber kein klarer nächster Schritt",
      "Videos mit Aufrufen, aber ohne Angebot",
      "Kein Tracking bis zur echten Anfrage",
      "Niemand weiss, was wirklich Kunden bringt",
    ],
    link: { label: "Webdesign & Development", href: "/webdesign" },
  },
  {
    id: "liegen",
    visual: "inbox",
    title: "Anfragen bleiben liegen",
    points: [
      "Anfragen landen verstreut in Postfächern",
      "Kein automatisches Nachfassen",
      "Keine Übersicht, wer wen zurückruft",
      "Leads kühlen ab, bevor jemand reagiert",
    ],
    link: { label: "CRM & Automation", href: "/crm-automation" },
  },
  {
    id: "qualitaet",
    visual: "quality",
    title: "Schlechte Lead-Qualität",
    points: [
      "Anfragen ohne Budget oder echtes Interesse",
      "Falsche Zielgruppe, falsche Region",
      "Keine Vorqualifizierung vor dem Erstgespräch",
      "Dein Team verliert Zeit mit unpassenden Kontakten",
    ],
    link: { label: "Performance Marketing", href: "/performance-marketing" },
  },
  {
    id: "content",
    visual: "content",
    title: "Content ohne Wirkung",
    points: [
      "Einzelne Posts statt langfristiger Strategie",
      "Keine Wiedererkennung: jeder Post sieht anders aus",
      "Unregelmässig, deine Marke bleibt nicht im Kopf",
      "Kein Material für Werbung und Recruiting",
    ],
    link: { label: "Content Day", href: "/content-day" },
  },
];

/* ==========================================================================
   System / CRM (Muster: «Warum unsere Partner …»). Punkte aus services.ts und /crm-automation.
   Die CRM-Ansicht daneben ist eine Beispielansicht mit Demo-Daten und als solche beschriftet.
   ========================================================================== */

export const homeSystem = {
  label: "Unser System",
  title: "Warum unsere Partner glücklich sind.",
  accent: "glücklich",
  heading: "Jede Anfrage an einem Ort.",
  text: "Wir bauen dir ein CRM, das zu deinem Verkauf passt. Anfragen aus Werbung, Website und Telefon landen automatisch dort, mit Quelle, Zuständigkeit und nächstem Schritt.",
  points: [
    "Alle Anfragen mit Quelle: Meta, Google, Website, Telefon",
    "Automatisches Nachfassen per E-Mail und WhatsApp",
    "Du siehst, welche Anzeige welchen Kunden bringt",
    "Komplett individuell auf deinen Prozess gebaut",
  ],
  link: { label: "CRM & Automation ansehen", href: "/crm-automation" },
};
