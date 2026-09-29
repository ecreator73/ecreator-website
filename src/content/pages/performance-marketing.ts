import { caseBySlug, displayClient } from "@/content/cases";
import { contentDay, packages } from "@/content/offers";

/**
 * Seite /performance-marketing (Vertrag C2, docs/PAGES.md).
 * Quellen: FACTS M04 bis M12 (Methodik, VERIFIZIERT), Case A (Zahlen LIVE-ANGABE, nur 600 / CHF 10 / 45–80,
 * Methodik CA17/CA18 VERIFIZIERT), KZ12 (Budget-Richtwert, VERIFIZIERT), AGB Ziff. 7 und 11.
 * Preise nur aus offers.ts. Keine Resultat-Versprechen, keine Partner-Badges (N06).
 */

export type LinkRef = { label: string; href: string };
export type FaqEntry = { q: string; a: string };

const financeCase = caseBySlug("finanzdienstleister-lead-generierung");
if (!financeCase) throw new Error("Case «finanzdienstleister-lead-generierung» fehlt in cases.ts");

const [pro, advanced] = packages;
const dayFrom = contentDay.options.find((o) => o.id === "4h");
if (!dayFrom) throw new Error("Content-Day-Option «4h» fehlt in offers.ts");

/** Budget-Richtwert laut Rechner-Tipp der Live-Site (FACTS KZ12). Kein Honorar. */
export const budgetHint = {
  range: "3'000 bis 6'000 CHF pro Monat",
  source: "Richtwert von eCreator für saubere Tests",
};

/** Einheitliche Quellenzeile für den Finanz-Case (FACTS 4.1). */
export const financeCaseSource = "Quelle: Case Study ecreator.ch, 21.02.2026, Kunde anonymisiert";

export const performanceMarketingPage = {
  meta: {
    title: "Performance Marketing Agentur Schweiz",
    description:
      "Performance Marketing aus dem Kanton Zürich: Meta, Google, TikTok und LinkedIn Ads mit eigenen Videos und Tracking bis zur Anfrage. Optimiert auf Kunden.",
    path: "/performance-marketing",
  },

  crumbs: [{ name: "Performance Marketing", path: "/performance-marketing" }],

  header: {
    meta: ["Leistung", "Performance Marketing"],
    title: ["Performance Marketing,", "das auf Kunden", "optimiert."],
    lead: "Wir schalten Kampagnen auf Meta, Google, TikTok und LinkedIn und messen, was nach dem Klick passiert: Anfrage, Termin, Kunde. Mit Videos aus eigener Produktion und Tracking, das bis zur Anfrage reicht.",
    calc: { label: "Potenzial berechnen", href: "/rechner" } satisfies LinkRef,
    facts: [
      { k: "Kanäle", v: "Meta, Google, TikTok, LinkedIn" },
      { k: "Ziel", v: "Anfragen, Termine, Kunden" },
      { k: "In Paketen", v: `${pro.name} und ${advanced.name}, ab CHF ${pro.price.amount} pro Monat` },
      { k: "Werbebudget", v: `separat, Richtwert ${budgetHint.range}` },
    ],
  },

  /** Kanal-Fahrplan statt Kanal-Kacheln. Formate = Werbeformate der Plattformen, keine Resultate. */
  channels: {
    meta: "Kanal-Fahrplan",
    title: "Jeder Kanal hat eine Aufgabe.",
    lead: "Nicht jedes Angebot gehört auf jeden Kanal. Wir wählen nach einer Frage: Sucht deine Kundschaft schon, oder muss sie erst auf dich aufmerksam werden?",
    columns: ["Kanal", "Wofür", "Typische Formate"],
    rows: [
      {
        name: "Meta",
        sub: "Facebook, Instagram",
        task: "Nachfrage erzeugen.",
        text: "Menschen erreichen, die noch nicht nach dir suchen, aber zu deinem Angebot passen.",
        formats: "Reels, Stories, Feed-Videos, Lead-Formulare oder Landingpage",
        link: { label: "Meta Ads", href: "/performance-marketing/meta-ads" } satisfies LinkRef,
      },
      {
        name: "Google",
        sub: "Suche",
        task: "Nachfrage abholen.",
        text: "Da sein, wenn jemand aktiv nach deiner Leistung sucht.",
        formats: "Suchanzeigen, lokale Anzeigen, Performance Max",
        link: { label: "Google Ads", href: "/performance-marketing/google-ads" } satisfies LinkRef,
      },
      {
        name: "TikTok",
        sub: "Kurzvideo",
        task: "Jüngere Zielgruppen und Recruiting.",
        text: "Videos, die im Feed wie normale Beiträge wirken.",
        formats: "Kurzvideos im Hochformat, Videos im Stil von Nutzerbeiträgen (UGC)",
        link: { label: "Social Recruiting", href: "/social-recruiting" } satisfies LinkRef,
      },
      {
        name: "LinkedIn",
        sub: "wo es passt",
        task: "B2B-Angebote.",
        text: "Wenn Funktion, Branche und Firmengrösse deiner Kundschaft zählen.",
        formats: "Beiträge, Videos und Lead-Formulare im Feed",
      },
    ],
  },

  /** Case-Zahlen als schlichte Kennzahlen-Reihe. Nur 600 / CHF 10 / 45–80 (FACTS CA01, CA02, CA04). */
  proof: {
    meta: ["Case", financeCase.sector, "Kosten pro Lead"],
    before: "45–80",
    after: "10",
    unit: "CHF pro Lead",
    beforeLabel: "vorher",
    afterLabel: "danach",
    srText: "Kosten pro Lead: vorher 45 bis 80 Franken, danach rund 10 Franken.",
    client: displayClient(financeCase),
    title: "600 qualifizierte Leads in drei Monaten.",
    text: "Vorsorge, Krankenkasse und Steuern liefen vorher in einer einzigen Kampagne. Wir haben sie getrennt, pro Thema Videos gedreht, die vorqualifizieren, und das Tracking bis zum Lead aufgebaut.",
    facts: [
      { k: "Themen", v: "Vorsorge, Krankenkasse, Steuern, je eigene Kampagne" },
      { k: "Laufzeit", v: "3 Monate" },
      { k: "Ergebnis", v: "600 qualifizierte Leads, rund CHF 10 pro Lead" },
    ],
    source: financeCaseSource,
    link: { label: "Ganzen Case lesen", href: `/cases/${financeCase.slug}` } satisfies LinkRef,
  },

  /** Arbeitsweise als Kreislauf (FACTS M10 «Message → Creative → Page → Tracking → Iteration», M11). */
  loop: {
    meta: "Arbeitsweise",
    title: "Fünf Stationen. Dann die nächste Runde.",
    lead: "Viele optimieren nur die Anzeige. Wir arbeiten an der ganzen Kette, weil eine Anfrage an jeder Stelle verloren gehen kann.",
    stations: [
      {
        name: "Botschaft",
        label: "Themen trennen",
        text: "Ein Thema, eine Zielgruppe, ein konkreter Nutzen. Mehrere Angebote in einer Kampagne verwässern die Ansprache.",
      },
      {
        name: "Creative",
        label: "Video qualifiziert vor",
        text: "Kurze Videos erklären Problem, Lösung und nächsten Schritt. Wer klickt, weiss schon, worum es geht.",
      },
      {
        name: "Landingpage",
        label: "Eine Seite pro Kampagne",
        text: "Dieselbe Botschaft wie in der Anzeige, dazu Belege und eine klare Handlung. Kein Umweg über die Startseite.",
      },
      {
        name: "Tracking",
        label: "Messen vor Skalieren",
        text: "Gemessen wird bis zur Anfrage und, wo möglich, bis zum Termin. Erst dann lohnt sich mehr Budget.",
      },
      {
        name: "Auswertung",
        label: "Wöchentliche Tests",
        text: "Jede Woche Varianten vergleichen und das Budget dorthin verschieben, wo Anfragen entstehen.",
      },
    ],
    back: "Zurück zur Botschaft, mit dem, was die Zahlen gezeigt haben",
    note: "Der Wochenrhythmus ist unsere Arbeitsweise, kein Versprechen für ein bestimmtes Ergebnis.",
  },

  /** Filmstreifen: jedes Werk einmal, Kunde nur, wenn im Material belegt (work.ts). */
  film: {
    title: "Creatives aus eigener Produktion.",
    note: "Echte Ads, keine Mockups",
    text: "Die Videos drehen und schneiden wir selbst. Aus einem Dreh entstehen mehrere Einstiege, die wir in der Kampagne gegeneinander testen.",
    items: [
      { id: "steuern", caption: ["Social Ad", "Steuern"] },
      { id: "naechstenpflege", caption: ["Social Ad", "Spitex Nächstenpflege"] },
      { id: "vorsorge", caption: ["Social Ad", "Vorsorge"] },
      { id: "pflegezukunft", caption: ["Social Ad", "Pflege"] },
      { id: "krankenkasse", caption: ["Social Ad", "Krankenkasse"] },
      { id: "fitness", caption: ["Social Ad", "Fitness"] },
    ] as { id: string; caption: [string, string] }[],
    link: { label: `Content Day ab CHF ${dayFrom.price.amount}`, href: "/content-day" } satisfies LinkRef,
  },

  /** Anker #tracking. Begriffe beim ersten Auftreten erklärt. Keine Statistiken (N34). */
  tracking: {
    brand: "Kunden statt Klicks.",
    meta: "Tracking",
    title: "Messen, was nach dem Klick passiert.",
    lead: "Wenn eine Werbeplattform nicht erfährt, wer angefragt hat, sucht sie nach Leuten, die klicken. Deshalb richten wir die Messung ein, bevor wir das Budget erhöhen.",
    layers: [
      {
        term: "Pixel",
        text: "Ein kleines Stück Code auf deiner Website meldet der Werbeplattform, was Besucher tun: Seite angesehen, Formular abgeschickt, Termin gebucht.",
      },
      {
        term: "Conversions API",
        short: "CAPI",
        text: "Eine Schnittstelle, über die deine Website oder dein CRM dieselben Ereignisse direkt von Server zu Server meldet. Das hilft, wenn Browser oder Werbeblocker den Pixel ausbremsen.",
      },
      {
        term: "Server-Side Tracking",
        text: "Die Messdaten laufen zuerst über einen eigenen Server, etwa Google Tag Manager Server-Side, und werden erst von dort an Meta, Google oder GA4 weitergegeben. So bestimmst du, welche Daten wohin gehen.",
      },
      {
        term: "Qualitätssignale",
        text: "Nicht jeder Lead ist gleich viel wert. Wir melden zurück, was nach der Anfrage passiert, zum Beispiel «Termin gebucht». Dann optimiert die Plattform auf Menschen, die wirklich ein Gespräch wollen.",
      },
    ],
    chain: {
      label: "Worauf optimiert wird",
      steps: [
        { name: "Klick", note: "sagt wenig" },
        { name: "Anfrage", note: "erster Schritt" },
        { name: "Termin gebucht", note: "Qualitätssignal", active: true },
        { name: "Kunde", note: "das Ziel" },
      ],
    },
    caseNote: {
      label: "Im Finanz-Case",
      text: "Meta Pixel und Conversions API über Google Tag Manager Server-Side. GA4 mit Ereignissen für Lead-Formular, Kalender-Buchung und Danke-Seite. Die ersten zwei Wochen gehörten dem Tracking-Fundament.",
    },
    packageNote: `Server-Side Tracking ist im Paket ${advanced.name} enthalten.`,
    link: { label: "Ratgeber: Tracking sauber aufsetzen", href: "/insights/tracking-werbebudget" } satisfies LinkRef,
  },

  /** Leistungsumfang (FACTS L01, L05, L06, M11, M12). */
  scope: {
    meta: "Leistungsumfang",
    title: "Was dazugehört.",
    items: [
      {
        title: "Kampagnenstrategie",
        text: "Ziel, Angebot, Zielgruppe, Kanal und Budget-Aufteilung, bevor die erste Anzeige läuft. Die Kampagnenstruktur ist so gebaut, dass sie wachsen kann.",
      },
      {
        title: "Lead Generation",
        text: "Kampagnen, die zu einer Anfrage führen: über ein Formular, einen Kalender oder eine eigene Landingpage.",
      },
      {
        title: "Creative Testing",
        text: "Mehrere Einstiege, Blickwinkel und Angebote pro Botschaft. Entschieden wird nach Zahlen, nicht nach Geschmack.",
      },
      {
        title: "Conversion-Optimierung",
        text: "Auch CRO genannt: die Seite hinter der Anzeige so verbessern, dass mehr Besucher anfragen. Mit klarer Botschaft, Belegen und kurzem Formular.",
      },
      {
        title: "Tracking",
        text: "Pixel, Conversions API, Server-Side Tracking und Ereignisse in GA4, geprüft, bevor Budget fliesst.",
      },
      {
        title: "Reporting mit Handlung",
        text: "Welches Creative, welches Thema und welche Zielgruppe Anfragen bringen, und was wir als Nächstes testen.",
      },
      {
        title: "Keine Gewinnspiel-Leads",
        text: "Wir arbeiten bewusst nicht mit Gewinnspielen oder Gratis-Ködern. Die bringen viele Einträge, aber selten Kunden.",
      },
      {
        title: "Anbindung ans CRM",
        text: "Anfragen landen dort, wo dein Verkauf arbeitet, damit niemand liegen bleibt und die Qualität messbar wird.",
        link: { label: "CRM & Automation", href: "/crm-automation" } satisfies LinkRef,
      },
    ],
  },

  /** Rechner-Teaser mit der korrekten Formel (FACTS N24). Werte monatlich, Schätzung. */
  calculator: {
    meta: "Potenzialrechner",
    formula: [
      { left: "Budget", op: "÷", right: "Kosten pro Lead", result: "Anfragen" },
      { left: "Anfragen", op: "×", right: "Abschlussquote", result: "Kunden" },
    ],
    title: "Rechne mit deinen eigenen Zahlen.",
    text: "Im Potenzialrechner setzt du Budget, Kosten pro Lead, Abschlussquote und Umsatz pro Kunde ein. Das Ergebnis ist eine Schätzung, keine Zusage.",
    budget: `Als Richtwert für saubere Tests empfehlen wir ein Werbebudget von ${budgetHint.range}. Das Budget kommt zum Honorar dazu.`,
    cta: { label: "Potenzial berechnen", href: "/rechner" } satisfies LinkRef,
  },

  faq: {
    meta: "Fragen",
    title: "Was oft gefragt wird.",
    items: [
      {
        q: "Wie schnell sehe ich erste Resultate?",
        a: "Eine seriöse Zusage dazu gibt es nicht, weil Markt, Angebot und Budget mitentscheiden. Zuerst stehen Tracking, Creatives und Landingpage; im Finanz-Case waren die ersten zwei Wochen allein für das Tracking-Fundament reserviert. Danach zeigen die wöchentlichen Tests, welche Botschaft Anfragen bringt.",
      },
      {
        q: "Welches Werbebudget ist sinnvoll?",
        a: `Als Richtwert für saubere Tests empfehlen wir ${budgetHint.range}. Mit weniger Budget dauern Tests länger und die Aussagen bleiben unsicherer. Im Potenzialrechner auf ecreator.ch kannst du mit deinen eigenen Werten durchrechnen, was möglich sein könnte.`,
      },
      {
        q: "Meta Ads oder Google Ads?",
        a: "Das hängt davon ab, ob deine Kundschaft schon nach dir sucht. Google Ads holt bestehende Nachfrage ab, Meta Ads erzeugt Nachfrage bei Menschen, die noch nicht suchen. Oft ergänzen sich beide; im Strategie-Call klären wir, womit du startest.",
      },
      {
        q: "Ist das Werbebudget im Preis inbegriffen?",
        a: `Nein, das Werbebudget kommt zum Honorar dazu, so steht es auch in unseren AGB. Die Pakete ${pro.name} (CHF ${pro.price.amount}) und ${advanced.name} (CHF ${advanced.price.amount}) pro Monat decken unsere Arbeit ab, die Ausgaben bei Meta, Google oder TikTok sind separat.`,
      },
      {
        q: "Wie messt ihr, ob die Kampagnen funktionieren?",
        a: "Wir messen Anfragen und, wo möglich, Termine und Abschlüsse, nicht nur Klicks. Dafür richten wir Pixel, Conversions API und bei Bedarf Server-Side Tracking ein und verbinden die Daten mit deinem CRM.",
      },
    ] satisfies FaqEntry[],
  },

  related: [
    { label: "Meta Ads", href: "/performance-marketing/meta-ads", text: "Facebook und Instagram: Nachfrage erzeugen mit Video." },
    { label: "Google Ads", href: "/performance-marketing/google-ads", text: "Suchkampagnen: da sein, wenn jemand sucht." },
    { label: "Content Day", href: "/content-day", text: `Neue Creatives in vier Stunden Dreh. Ab CHF ${dayFrom.price.amount}.` },
    { label: "Pakete", href: "/pakete", text: `${pro.name} und ${advanced.name}, ab CHF ${pro.price.amount} pro Monat.` },
  ] satisfies (LinkRef & { text: string })[],

  finalCta: {
    title: ["Wo gehen deine", "Anfragen verloren?"] as [string, string],
    text: "Im Strategie-Call schauen wir uns Kampagnen, Tracking und Landingpage an und zeigen dir, was sich zuerst lohnt. Du gehst mit einer Prioritätenliste für die nächsten vier Wochen raus.",
    secondary: { label: "Kampagnen besprechen", href: "/kontakt?anliegen=performance" } satisfies LinkRef,
  },

  schema: {
    name: "Performance Marketing",
    serviceType: "Performance Marketing",
    description:
      "Kampagnen auf Meta, Google, TikTok und LinkedIn mit Video-Creatives, Landingpages, Tracking (Pixel, Conversions API, Server-Side) und wöchentlichem Testing. Werbebudget nicht inbegriffen.",
    offers: [
      {
        name: `Paket ${pro.name}`,
        price: pro.price.amount.replace(/'/g, ""),
        unitText: "MON",
        description: `${pro.includes.join(", ")}. ${pro.minTerm}. Werbebudget separat.`,
      },
      {
        name: `Paket ${advanced.name}`,
        price: advanced.price.amount.replace(/'/g, ""),
        unitText: "MON",
        description: `${advanced.includes.join(", ")}. ${advanced.minTerm}. Werbebudget separat.`,
      },
    ],
  },
};
