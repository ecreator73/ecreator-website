/**
 * Seitentexte für /cases (Hub) und /cases/[slug] (Detail).
 *
 * Kunden, Zahlen, Belege und Medien kommen aus src/content/cases.ts und src/content/work.ts.
 * Hier stehen nur Überschriften, Texte und Zusatzangaben, jeweils mit Quelle aus _research/FACTS.md:
 *  - Funnel-Split Finanz-Case: FACTS CA05 (LIVE-ANGABE, Case Study ecreator.ch 21.02.2026)
 *  - Kosten pro Lead vorher/danach: FACTS CA04 / CA02 (LIVE-ANGABE)
 *  - Phasen und Tracking-Setup: FACTS CA17 / CA18 (VERIFIZIERT als Methodik)
 *  - «Formel» der Creatives: FACTS CA19 (Methodik, ohne Ergebnis-Teil)
 *  - Spitex: Ad und Website beginnen mit demselben Betrag (sichtbar im Ad-Video und im Screenshot der Website)
 * Bewusst NICHT verwendet: CA07, CA09, CA11, CA16 (widersprüchlich oder falsch, siehe FACTS Kap. 11).
 */

import { cta } from "@/content/site";

export type LinkItem = { label: string; href: string; text?: string };
export type Fact = { k: string; v: string; href?: string };

const WORDS = ["Null", "Ein", "Zwei", "Drei", "Vier", "Fünf", "Sechs", "Sieben", "Acht", "Neun", "Zehn", "Elf", "Zwölf"];
/** Zahl als Wort (Satzanfang), ab 13 als Ziffer. */
export const countWord = (n: number) => WORDS[n] ?? String(n);

/* ==========================================================================
   Hub /cases
   ========================================================================== */

export type CasesHubCopy = {
  meta: { title: string; description: string; path: string };
  crumb: string;
  headerMeta: string[];
  titleLines: string[];
  lead: (n: { cases: number; ads: number; sites: number }) => string;
  jumpTitle: string;
  readCase: string;
  anchors: Record<string, string>;
  finance: {
    title: string;
    leadsValue: string;
    leadsLabel: string;
    cplBefore: string;
    cplAfter: string;
    cplLabel: string;
    cplNote: string;
    published: string;
    source: string;
  };
  spitex: { title: string; adCaption: [string, string]; siteCaption: [string, string] };
  trapletti: { title: string; caption: [string, string] };
  wall: { jump: string; title: (n: number) => string; lead: string; ownAd: [string, string]; ad: string };
  websites: { jump: string; title: (n: number) => string; lead: string; visit: string };
  related: LinkItem[];
  secondary: { label: string; href: string };
};

export const casesHub: CasesHubCopy = {
  meta: {
    title: "Cases: Ads und Websites für Schweizer KMU",
    description:
      "Echte Arbeit von eCreator: Lead-Generierung für einen Finanzdienstleister, Ads und Website für eine Spitex und eine Website für einen Gipser in Thalwil.",
    path: "/cases",
  },
  crumb: "Cases",
  headerMeta: ["Cases", "Ads", "Websites"],
  titleLines: ["Arbeit, die man", "zeigen kann."],
  lead: (n) =>
    `${countWord(n.cases)} Cases, ${countWord(n.ads).toLowerCase()} Ads, ${countWord(n.sites).toLowerCase()} Websites. Zahlen zeigen wir nur mit Quelle, Kundennamen nur mit Beleg.`,
  jumpTitle: "Auf dieser Seite",
  readCase: "Case lesen",
  anchors: {
    "finanzdienstleister-lead-generierung": "finanz",
    "spitex-naechstenpflege": "spitex",
    trapletti: "trapletti",
    ads: "ads",
    websites: "websites",
  },
  finance: {
    title: "Lead-Generierung für Vorsorge, Krankenkasse und Steuern.",
    leadsValue: "600",
    leadsLabel: "qualifizierte Leads in drei Monaten",
    cplBefore: "45–80",
    cplAfter: "10",
    cplLabel: "Franken pro Lead",
    cplNote: "vorher / danach",
    published: "publiziert 02.2026",
    source: "Quelle: Case Study auf ecreator.ch, 21.02.2026. Zahlen laut eCreator, Kunde dort anonymisiert.",
  },
  spitex: {
    title: "Eine Botschaft, drei Spuren: Video, Kampagne, Website.",
    adCaption: ["Social Ad", "Pflegende Angehörige"],
    siteCaption: ["Website mobil", "naechstenpflege.ch"],
  },
  trapletti: {
    title: "Eine Handwerker-Website, gebaut für Offertanfragen.",
    caption: ["Website", "nt-gipsermaler.ch / Startseite Desktop"],
  },
  wall: {
    jump: "Weitere Ads",
    title: (n) => `${countWord(n)} weitere Ads aus unserer Produktion.`,
    lead: "Produziert von eCreator für Meta, Instagram und TikTok. Den Kunden nennen wir nur, wenn er im Video selbst erscheint, zum Beispiel im Abspann.",
    ownAd: ["Eigenes Ad", "eCreator"],
    ad: "Social Ad",
  },
  websites: {
    jump: "Websites",
    title: (n) => `${countWord(n)} Websites, beide live.`,
    lead: "Beide tragen einen Credit von eCreator im Footer. Schau sie dir direkt an.",
    visit: "Website ansehen",
  },
  related: [
    { label: "Performance Marketing", href: "/performance-marketing", text: "Kampagnen, die auf Anfragen optimiert sind, nicht auf Klicks." },
    { label: "Content-Produktion", href: "/content-produktion", text: "Skript, Dreh und Schnitt für Ads, Social Media und Recruiting." },
    { label: "Webdesign", href: "/webdesign", text: "Websites und Landingpages, die zur Anfrage führen." },
    { label: "Insights", href: "/insights", text: "Was wir aus Kampagnen, Websites und Tracking gelernt haben." },
  ],
  secondary: { label: cta.contact.label, href: cta.contact.href },
};

/* ==========================================================================
   Detail /cases/[slug]
   ========================================================================== */

/** Gemeinsame Beschriftungen des Detail-Templates */
export const caseLabels = {
  hubCrumb: "Cases",
  client: "Kunde",
  sector: "Branche",
  services: "Leistungen",
  evidence: "Beleg",
  challenge: "Ausgangslage",
  approach: "Ansatz",
  outcome: "Resultat",
  next: "Nächster Case",
  allCases: "Alle Cases",
};

type DetailBase = {
  metaTitle: string;
  metaDescription: string;
  /** Kurzname für Brotkrumen */
  crumb: string;
  /** H1 als gesetzte Zeilen, kurz halten */
  titleLines: string[];
  /** Überschrift für «Nächster Case» */
  hubTitle: string;
  /** ISO-Datum für Article-Schema */
  published: string;
  modified: string;
  /** Bild für Article-Schema (Finanz-Case bewusst ohne: das Interview-Standbild würde den Kunden zuordnen) */
  image?: string;
  /**
   * Belege für die Anzeige. Überschreibt cases.ts, wenn ein Beleg den anonymisierten Kunden
   * zuordnen würde (Finanz-Case: nameApproved false).
   */
  evidence?: string[];
  /** fehlender Beleg als sichtbarer Platzhalter */
  evidenceTodo?: string;
  /** zusätzliche Zeilen im Datenblatt des Kopfs */
  facts: Fact[];
  challenge: { statement: string };
  approach: { title: string };
  outcome: { title: string; source: string; todo?: string };
  related: LinkItem[];
  secondary: { label: string; href: string };
};

export type FinanceDetail = DetailBase & {
  kind: "finance";
  phases: { title: string; note: string; rows: { k: string; title: string; text: string }[] };
  formula: { meta: string; lines: string[]; text: string; todo: string };
  result: {
    cpl: { label: string; before: string; after: string; note: string };
    funnel: {
      caption: string;
      head: [string, string, string];
      rows: { theme: string; leads: number; cpl: string }[];
      total: { label: string; leads: string; cpl: string };
    };
    leadNote: string;
  };
  voice: { meta: string; title: string; note: string };
};

export type SpitexDetail = DetailBase & {
  kind: "pair";
  headerCaption: [string, string];
  pair: { meta: string; title: string; text: string[]; adCaption: [string, string]; siteCaption: [string, string] };
};

export type TraplettiDetail = DetailBase & {
  kind: "website";
  headerCaption: [string, string];
  fullPage: { meta: string; title: string; lead: string; hint: string; desktopCaption: [string, string]; mobileCaption: [string, string] };
};

export type CaseDetailCopy = FinanceDetail | SpitexDetail | TraplettiDetail;

export const caseDetails: Record<string, CaseDetailCopy> = {
  "finanzdienstleister-lead-generierung": {
    kind: "finance",
    metaTitle: "Case: 600 Leads für einen Finanzdienstleister",
    metaDescription:
      "Lead-Generierung für Vorsorge, Krankenkasse und Steuern: 600 qualifizierte Leads in drei Monaten, rund 10 Franken pro Lead. So war der Case aufgebaut.",
    crumb: "Finanzdienstleister",
    titleLines: ["600 qualifizierte", "Leads in drei", "Monaten."],
    hubTitle: "Lead-Generierung für Vorsorge, Krankenkasse und Steuern.",
    published: "2026-02-21",
    modified: "2026-09-29",
    evidence: [
      "Case Study auf ecreator.ch, veröffentlicht am 21.02.2026.",
      "Der Kunde ist dort anonymisiert. Darum nennen wir ihn auch hier nicht.",
    ],
    evidenceTodo: "Ads-Manager-Export mit Leads, Ausgaben und Zeitraum als Beleg",
    facts: [
      { k: "Laufzeit", v: "3 Monate" },
      { k: "Themen", v: "Vorsorge, Krankenkasse, Steuern" },
    ],
    challenge: { statement: "Drei Themen in einer Kampagne, optimiert auf Klicks statt auf Anfragen." },
    approach: { title: "Getrennt ansprechen, bis zur Anfrage messen." },
    phases: {
      title: "Umsetzung in drei Phasen.",
      note: "Phasen und Tracking-Setup laut Case Study.",
      rows: [
        {
          k: "Woche 1–2",
          title: "Tracking-Fundament und Audit",
          text: "Bestehendes Setup geprüft, dann Meta Pixel und Conversions API eingerichtet. Die Conversions API (CAPI) meldet Anfragen direkt vom Server an Meta, nicht nur aus dem Browser. Umgesetzt mit Server-Side Tracking im Google Tag Manager, also über einen eigenen Server. Google Analytics 4 zählt Lead-Formular, Kalender-Buchung und Danke-Seite.",
        },
        {
          k: "Woche 3–5",
          title: "Creative-Produktion und Funnel-Aufbau",
          text: "Videos und Landingpages pro Thema. Jedes Thema bekommt einen eigenen Funnel, also den Weg vom Video über die Landingpage bis zur Anfrage. Als Einstieg gibt es eine kostenlose Analyse, kein Verkaufsgespräch.",
        },
        {
          k: "Woche 6–12",
          title: "Skalierung und wöchentliches Testing",
          text: "Jede Woche treten neue Varianten gegen die bisher besten an. Was mehr Anfragen bringt, bekommt mehr Budget.",
        },
      ],
    },
    formula: {
      meta: "Die Formel hinter den Creatives",
      lines: ["Das richtige Problem.", "Ein Nutzen in Franken.", "Ein niedriger Einstieg.", "Sauberes Tracking."],
      text: "So fasst die Case Study die Creatives zusammen: das Problem der Zielgruppe benennen, den Nutzen in Franken zeigen, einen kostenlosen ersten Schritt anbieten und jede Anfrage messen.",
      todo: "Creatives dieses Case zeigen, sobald die Zuordnung bestätigt ist",
    },
    result: {
      cpl: { label: "Kosten pro Lead, in CHF", before: "45–80", after: "10", note: "vorher / danach, gerundet" },
      funnel: {
        caption: "Leads nach Thema, drei Monate",
        head: ["Thema", "Leads", "Ø CHF pro Lead"],
        rows: [
          { theme: "Vorsorge", leads: 288, cpl: "8.90" },
          { theme: "Krankenkasse", leads: 198, cpl: "10.40" },
          { theme: "Steuern", leads: 114, cpl: "11.80" },
        ],
        total: { label: "Total", leads: "600", cpl: "rund 10" },
      },
      leadNote: "Ein Lead ist eine Anfrage mit Kontaktdaten, hier über die Landingpage oder die Kalender-Buchung.",
    },
    voice: {
      meta: "Kundenstimme",
      title: "Kundenstimme aus der Finanzbranche.",
      note: "Ein Kunde aus der Finanzbranche erzählt im Video-Interview, wie er die Zusammenarbeit mit eCreator erlebt.",
    },
    outcome: {
      title: "Das Resultat laut Case Study.",
      source: "Quelle: Case Study auf ecreator.ch, 21.02.2026 (Funnel-Split). Zahlen laut eCreator, Kunde dort anonymisiert.",
    },
    related: [
      { label: "Performance Marketing", href: "/performance-marketing", text: "Kampagnen, die auf Anfragen optimiert sind, nicht auf Klicks." },
      { label: "Meta Ads", href: "/performance-marketing/meta-ads", text: "Facebook und Instagram: Formate, Creative-Testing, Tracking." },
      { label: "Tracking, das Budget spart", href: "/insights/tracking-werbebudget", text: "Pixel, Conversions API und Server-Side Tracking erklärt." },
    ],
    secondary: { label: "Kampagne besprechen", href: "/kontakt?anliegen=performance" },
  },

  "spitex-naechstenpflege": {
    kind: "pair",
    metaTitle: "Case Spitex Nächstenpflege: Ads und Website",
    metaDescription:
      "Video-Ads und Website für die Spitex Nächstenpflege: eine Botschaft für pflegende Angehörige, vom ersten Video im Feed bis zur Anmeldung auf der Website.",
    crumb: "Spitex Nächstenpflege",
    titleLines: ["Eine Botschaft,", "drei Spuren."],
    hubTitle: "Eine Botschaft, drei Spuren: Video, Kampagne, Website.",
    published: "2026-09-29",
    modified: "2026-09-29",
    image: "/work/naechstenpflege-site-desktop.webp",
    facts: [
      { k: "Website", v: "naechstenpflege.ch", href: "https://naechstenpflege.ch/" },
      { k: "Regionen", v: "Zürich, Aargau, Schaffhausen" },
    ],
    headerCaption: ["Website Desktop", "naechstenpflege.ch"],
    challenge: { statement: "Ein Angebot, das man in wenigen Sekunden verstehen muss." },
    approach: { title: "Im Feed und auf der Website dieselben Worte." },
    pair: {
      meta: "Ad und Website",
      title: "Beide beginnen mit demselben Betrag.",
      text: [
        "Das Ad steigt mit dem Betrag ein, den pflegende Angehörige pro Monat erhalten können. Die Website beginnt mit demselben Betrag.",
        "Wer vom Video kommt, erkennt die Botschaft sofort wieder und muss nichts neu suchen. Der nächste Schritt ist die Anmeldung.",
      ],
      adCaption: ["Social Ad", "Pflegende Angehörige"],
      siteCaption: ["Website mobil", "Startseite"],
    },
    outcome: {
      title: "Was entstanden ist.",
      source: "Beleg: Footer von naechstenpflege.ch «made by eCreator.ch», Kundenlogo im Abspann der Ads.",
      todo: "Kennzahlen zur Kampagne, sobald von eCreator mit Quelle bestätigt",
    },
    related: [
      { label: "Content-Produktion", href: "/content-produktion", text: "Skript, Dreh und Schnitt für Ads, Social Media und Recruiting." },
      { label: "Meta Ads", href: "/performance-marketing/meta-ads", text: "Facebook und Instagram: Formate, Creative-Testing, Tracking." },
      { label: "Webdesign", href: "/webdesign", text: "Websites und Landingpages, die zur Anfrage führen." },
    ],
    secondary: { label: cta.contentDay.label, href: cta.contentDay.href },
  },

  trapletti: {
    kind: "website",
    metaTitle: "Case Trapletti: Website für Gipser und Maler",
    metaDescription:
      "Neue Website für die Trapletti Gipser Maler GmbH in Thalwil: klare Leistungen, Referenzen und eine Offertanfrage, die auf jeder Seite sichtbar ist.",
    crumb: "Trapletti",
    titleLines: ["Eine Website,", "gebaut für", "Offertanfragen."],
    hubTitle: "Eine Handwerker-Website, gebaut für Offertanfragen.",
    published: "2026-09-29",
    modified: "2026-09-29",
    image: "/work/trapletti-desktop.webp",
    facts: [
      { k: "Ort", v: "Thalwil" },
      { k: "Website", v: "nt-gipsermaler.ch", href: "https://nt-gipsermaler.ch/" },
    ],
    headerCaption: ["Website Desktop", "nt-gipsermaler.ch / Startseite"],
    challenge: { statement: "Zeigen, was der Betrieb kann. Und dann direkt zur Offerte." },
    approach: { title: "Drei Entscheidungen, die man der Website ansieht." },
    fullPage: {
      meta: "Unter dem ersten Bildschirm",
      title: "Was nach dem ersten Blick kommt.",
      lead: "Leistungen, Referenzen und die Anfrage stehen dort, wo man sie sucht. Auf dem Handy genauso wie am Bildschirm.",
      hint: "Im Rahmen scrollen",
      desktopCaption: ["Startseite Desktop", "ab dem zweiten Bildschirm"],
      mobileCaption: ["Startseite mobil", "erster Bildschirm"],
    },
    outcome: {
      title: "Was entstanden ist.",
      source: "Beleg: Footer von nt-gipsermaler.ch «Webseite bei eCreator».",
      todo: "Anfragen vorher und nachher, sobald von eCreator mit Quelle belegt",
    },
    related: [
      { label: "Webdesign", href: "/webdesign", text: "Websites und Landingpages, die zur Anfrage führen." },
      { label: "SEO", href: "/seo", text: "Technik, Inhalte und Local SEO, damit dich Leute in der Region finden." },
      { label: "Google Ads", href: "/performance-marketing/google-ads", text: "Da sein, wenn jemand nach deiner Leistung sucht." },
    ],
    secondary: { label: cta.website.label, href: cta.website.href },
  },
};

/** Reihenfolge für «Nächster Case» (zyklisch) */
export const caseOrder = Object.keys(caseDetails);
