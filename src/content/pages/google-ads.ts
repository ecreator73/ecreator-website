import { caseBySlug } from "@/content/cases";
import { packages } from "@/content/offers";
import { webProjects } from "@/content/work";
import { budgetHint, type FaqEntry, type LinkRef } from "@/content/pages/performance-marketing";

/**
 * Seite /performance-marketing/google-ads (Vertrag C4, docs/PAGES.md).
 * Schlicht, fast ohne Bild. Die Suchanfrage ist ein gekennzeichnetes Beispiel.
 * Trapletti dient nur als Beispiel für eine Zielseite (Website von eCreator, Credit im Footer);
 * es wird keine Google-Ads-Kampagne und kein Resultat für Trapletti behauptet.
 * Paket-Hinweis laut Briefing: Google Ads im Pro nicht regulär enthalten, im Advanced enthalten.
 * Performance Max nur erwähnen, keine Versprechen.
 */

const pro = packages.find((p) => p.id === "pro");
const advanced = packages.find((p) => p.id === "advanced");
if (!pro || !advanced) throw new Error("Pakete fehlen in offers.ts");

const trapletti = webProjects.find((w) => w.id === "trapletti");
const traplettiCase = caseBySlug("trapletti");
if (!trapletti || !traplettiCase) throw new Error("Trapletti fehlt in work.ts oder cases.ts");

const domain = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

export const googleAdsPage = {
  meta: {
    title: "Google Ads Agentur Schweiz: Suchkampagnen",
    description:
      "Google Ads aus dem Kanton Zürich: Suchkampagnen mit Keyword-Strategie, passenden Anzeigentexten, Landingpages und Conversion-Tracking. Im Paket Advanced.",
    path: "/performance-marketing/google-ads",
  },

  crumbs: [
    { name: "Performance Marketing", path: "/performance-marketing" },
    { name: "Google Ads", path: "/performance-marketing/google-ads" },
  ],

  header: {
    meta: ["Performance Marketing", "Google Ads"],
    title: ["Google Ads:", "da sein, wenn", "jemand sucht."],
    lead: "Wer bei Google sucht, hat ein Problem und will es lösen. Wir sorgen dafür, dass du in diesem Moment erscheinst: mit einer Anzeige, die zur Suche passt, und einer Seite, die zur Anfrage führt.",
    secondaryLink: { label: `Im Paket ${advanced.name} enthalten`, href: "#paket" } satisfies LinkRef,
  },

  /** Die Kette: Suchanfrage → Anzeige → Landingpage → Anfrage. */
  chain: {
    meta: "Ablauf",
    label: "Beispiel einer Suchanfrage",
    query: "Gipser Thalwil Offerte",
    title: "Vier Glieder, eine Kette.",
    lead: "Eine Anfrage entsteht nicht in der Anzeige, sondern am Ende einer Kette. Reisst ein Glied, war der Klick bezahlt und umsonst.",
    steps: [
      {
        title: "Suchanfrage",
        text: "Drei Wörter, klare Absicht: Leistung, Ort und der Wunsch nach einem Preis. Solche Suchen buchen wir gezielt ein.",
        meta: "Keyword-Strategie",
      },
      {
        title: "Anzeige",
        text: "Die Anzeige nimmt die Wörter der Suche auf. Wer sie liest, sieht sofort, dass er hier richtig ist.",
        meta: "Anzeigentexte",
      },
      {
        title: "Landingpage",
        text: "Die Seite hält, was die Anzeige verspricht: Leistung, Region, Referenzen und das Offertformular ohne Umweg.",
        meta: "Seite zur Suche",
      },
      {
        title: "Anfrage",
        text: "Die Anfrage wird gemessen und an Google zurückgemeldet. So lernt die Kampagne, welche Suchen zu Anfragen führen.",
        meta: "Conversion-Tracking",
      },
    ],
  },

  /** Trapletti als Beispiel für die Zielseite (ohne Resultate). */
  landing: {
    meta: "Beispiel Zielseite",
    title: "So kann die Seite am Ende der Kette aussehen.",
    text: trapletti.summary,
    note: "Die Suchanfrage oben ist ein Beispiel. Die Website ist echt, gebaut von eCreator.",
    image: {
      desktop: trapletti.desktop,
      mobile: trapletti.mobile,
      alt: `Website ${trapletti.client}, Startseite mit Offertanfrage`,
      altMobile: `Website ${trapletti.client}, mobile Ansicht`,
    },
    caption: ["Website", domain(trapletti.url)] as [string, string],
    evidence: trapletti.evidence,
    links: [
      { label: "Case Trapletti", href: `/cases/${traplettiCase.slug}` },
      { label: "Landingpages und Websites", href: "/webdesign" },
    ] satisfies LinkRef[],
  },

  /** Suchbegriffe nach Absicht: gekennzeichnete Beispiele, keine Kundendaten. */
  keywords: {
    meta: "Keyword-Strategie",
    title: "Nicht jede Suche ist eine Anfrage.",
    /** Akzentwort im Titel (violett) */
    accent: "Anfrage",
    lead: "Die wichtigste Arbeit passiert vor der ersten Anzeige: entscheiden, bei welchen Suchen du erscheinst und bei welchen bewusst nicht. Begriffe, bei denen deine Anzeige nie erscheinen soll, heissen bei Google auszuschliessende Keywords.",
    columns: ["Suchbegriff", "Absicht", "Was wir tun"],
    caption: "Beispiele für einen Gipserbetrieb am Zürichsee",
    rows: [
      { query: "gipser thalwil offerte", intent: "Will einen Preis für einen konkreten Auftrag.", action: "Einbuchen, eigene Anzeige" },
      { query: "gipser in der nähe", intent: "Sucht einen Betrieb in der Region.", action: "Einbuchen, mit Standort" },
      { query: "gipser kosten pro m2", intent: "Vergleicht Preise, entscheidet noch nicht.", action: "Testen, je nach Angebot" },
      { query: "wand selber verputzen", intent: "Will es selbst machen.", action: "Meist ausschliessen", excluded: true },
      { query: "gipser lehrstelle", intent: "Sucht eine Ausbildung, keinen Auftrag.", action: "Ausschliessen", excluded: true },
    ],
  },

  /** Leistungsumfang als Datenblatt. */
  setup: {
    meta: "Was wir aufsetzen",
    title: "Vom Suchbegriff bis zur gemessenen Anfrage.",
    rows: [
      {
        k: "Suchkampagnen",
        v: "Textanzeigen über und unter den Suchergebnissen, nach Leistungen gegliedert, mit eigenem Budget pro Thema.",
      },
      {
        k: "Keyword-Strategie",
        v: "Suchbegriffe mit Kaufabsicht, auszuschliessende Keywords und die regelmässige Prüfung, welche Suchen tatsächlich zu Klicks geführt haben.",
      },
      {
        k: "Anzeigentexte",
        v: "Titel und Beschreibungen, die die Wörter der Suche aufnehmen und einen klaren nächsten Schritt nennen.",
      },
      {
        k: "Landingpages",
        v: "Eine Seite pro Leistung oder Kampagne: schnell geladen, mit Formular, Telefonnummer und Belegen.",
      },
      {
        k: "Conversion-Tracking",
        v: "Anfragen, Anrufe und Termine werden als Conversion gemessen, also als die Handlung, die für dich zählt. Eingerichtet über Google Tag Manager und GA4.",
      },
      {
        k: "Lokal",
        v: "Ausrichtung auf deine Region und Standortangaben aus deinem Google-Unternehmensprofil in der Anzeige.",
      },
      {
        k: "Performance Max",
        v: "Eine Kampagnenart von Google, die Anzeigen automatisch über Suche, YouTube, Display und Maps verteilt. Wir setzen sie nur ein, wenn Tracking und Datenbasis stimmen, und versprechen nichts, was die Automatik entscheidet.",
      },
    ],
  },

  /** Paket-Hinweis: Preis schlicht in einer Zeile, darunter das Datenblatt. */
  pricing: {
    meta: `Paket ${advanced.name}`,
    amount: advanced.price.amount,
    unit: advanced.price.unit ?? "pro Monat",
    title: `Google Ads gehört zum Paket ${advanced.name}.`,
    accent: advanced.name,
    text: `Im Paket ${pro.name} ist Google Ads nicht regulär enthalten. ${advanced.name} verbindet Social und Search mit Website, SEO und Server-Side Tracking. ${advanced.minTerm}.`,
    facts: [
      { k: advanced.name, v: `Google Ads enthalten, CHF ${advanced.price.amount} ${advanced.price.unit ?? "pro Monat"}` },
      { k: pro.name, v: `Google Ads nicht regulär enthalten, CHF ${pro.price.amount} ${pro.price.unit ?? "pro Monat"}` },
      { k: "Werbebudget", v: `separat, Richtwert ${budgetHint.range}` },
    ],
    packages: { label: "Pakete vergleichen", href: "/pakete" } satisfies LinkRef,
    calc: { label: "Potenzial berechnen", href: "/rechner" } satisfies LinkRef,
  },

  faq: {
    meta: "Fragen",
    title: "Fragen zu Google Ads.",
    items: [
      {
        q: "Ist Google Ads im Paket Pro enthalten?",
        a: `Nein, im Paket ${pro.name} ist Google Ads nicht regulär enthalten. Im Paket ${advanced.name} für CHF ${advanced.price.amount} pro Monat gehört Google Ads dazu, zusammen mit SEO, Website und Server-Side Tracking. ${advanced.minTerm}.`,
      },
      {
        q: "Was kostet ein Klick bei Google?",
        a: "Das entscheidet Google in einer Auktion, der Preis hängt von Suchbegriff, Region und Konkurrenz ab. Deshalb nennen wir keine Pauschalwerte, sondern schauen uns im Strategie-Call deine Suchbegriffe an.",
      },
      {
        q: "Welches Werbebudget brauche ich für Google Ads?",
        a: `Als Richtwert für saubere Tests empfehlen wir ${budgetHint.range}; das Budget kommt zum Honorar dazu. Wie viel sinnvoll ist, hängt auch davon ab, wie oft in deiner Region nach deiner Leistung gesucht wird.`,
      },
      {
        q: "Brauche ich eine eigene Landingpage?",
        a: "Meistens ja, denn eine Seite, die genau zur Suche passt, macht den nächsten Schritt leichter als die Startseite. Wenn deine Website die Leistung schon klar zeigt und ein Formular hat, kann auch eine bestehende Unterseite reichen.",
      },
      {
        q: "Was ist Performance Max?",
        a: "Performance Max ist eine Kampagnenart von Google, die Anzeigen automatisch über Suche, YouTube, Display, Gmail und Maps ausspielt. Sie kann sinnvoll sein, wenn Tracking und Conversions sauber eingerichtet sind; wir prüfen das im Einzelfall und versprechen keine Ergebnisse.",
      },
    ] satisfies FaqEntry[],
  },

  related: [
    { label: "Performance Marketing", href: "/performance-marketing", text: "Alle Kanäle, der Kreislauf und wie wir messen." },
    { label: "Meta Ads", href: "/performance-marketing/meta-ads", text: "Für Kundschaft, die noch nicht nach dir sucht." },
    { label: "Webdesign", href: "/webdesign", text: "Landingpages und Websites, die zur Anfrage führen." },
    { label: "SEO", href: "/seo", text: "Gefunden werden, ohne pro Klick zu bezahlen." },
  ] satisfies (LinkRef & { text: string })[],

  finalCta: {
    title: ["Wonach sucht", "deine Kundschaft?"] as [string, string],
    text: "Im Strategie-Call schauen wir uns deine Suchbegriffe, deine Anzeigen und die Seite dahinter an. Du gehst mit einer Prioritätenliste für die nächsten vier Wochen raus.",
    secondary: { label: "Google Ads besprechen", href: "/kontakt?anliegen=performance" } satisfies LinkRef,
  },

  schema: {
    name: "Google Ads",
    serviceType: "Suchmaschinenwerbung (SEA)",
    description:
      "Suchkampagnen auf Google mit Keyword-Strategie, Anzeigentexten, Landingpages, Conversion-Tracking und lokaler Ausrichtung. Enthalten im Paket Advanced. Werbebudget nicht inbegriffen.",
    offers: [
      {
        name: `Paket ${advanced.name} (inkl. Google Ads)`,
        price: advanced.price.amount.replace(/'/g, ""),
        unitText: "MON",
        description: `${advanced.includes.join(", ")}. ${advanced.minTerm}. Werbebudget separat.`,
      },
    ],
  },
};
