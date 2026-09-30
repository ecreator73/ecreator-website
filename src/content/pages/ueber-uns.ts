import type { Crumb } from "@/lib/schema";

/**
 * /ueber-uns · Seitentexte (Vertrag C17, docs/PAGES.md).
 *
 * Quellen:
 *  - Haltung: FACTS M05 («Systems over campaigns»), M06 («Systeme statt Kampagnen»), M01/M02 (Claim), M08 (Outcomes statt Vanity Metrics)
 *  - Arbeitsweise: FACTS M10 (Mission, Kette Message → Creative → Page → Tracking → Iteration, Qualitätssignale), M11 (Prinzipien)
 *  - Ablauf: FACTS 8.5 (drei Schritte mit Output). «Jeden Tag qualifizierte Leads» (N42) bewusst NICHT übernommen.
 *  - Was wir nicht tun: FACTS M12 (keine Gewinnspiele), M11 (Tracking vor Skalierung, Reporting mit Handlung), AGB Ziff. 11 (keine Garantie)
 *  - Team: src/content/team.ts (Briefing + Live-Bios)
 *  - Firmendaten: src/content/company.ts, FACTS U01–U10 (Zefix, Impressum)
 *  - Belege: site.google (Stand 29.09.2026), work.ts webProjects (Footer-Credits), testimonials.ts (Video-Interview LinkedIn 17.06.2026)
 * Bewusst NICHT genannt: Gründungsjahr 2023 (N04), Teamgrösse (U18), Büro- oder Studiobeschreibung (Mehrfirmenadresse, U04),
 * weitere Personen der Live-Site (N30), Gesamtzahlen zu Leads (N22).
 */

export type Row = { k: string; v: string };
export type ChainStep = { word: string; text: string };
export type Refusal = { no: string; why: string };
export type Proof = { k: string; v: string; note: string; href: string; linkLabel: string; external: boolean };

export const ueberUnsPage = {
  meta: {
    title: "Über uns: Team und Haltung",
    description:
      "eCreator ist eine Marketingagentur aus Neerach im Kanton Zürich. Lerne Claudio, Fabian und Ricardo kennen und sieh, warum wir Systeme statt Kampagnen bauen.",
    path: "/ueber-uns",
  },

  crumbs: [{ name: "Über uns", path: "/ueber-uns" }] satisfies Crumb[],

  header: {
    meta: ["Über uns", "eCreator GmbH"],
    title: ["Wir sind", "eCreator."],
    /** Akzentwort in der H1 */
    accent: "eCreator",
    lead: "Wir bauen Marketing, das Kunden bringt: Content, Kampagnen, Websites und CRM aus einem Team im Kanton Zürich. Wer dich berät, arbeitet auch an deinem Projekt.",
    teamLink: { label: "Das Team kennenlernen", href: "#team" },
    glanceCaption: "Auf einen Blick",
    glance: [
      { k: "Team", v: "Claudio, Fabian, Ricardo" },
      { k: "Sitz", v: "Neerach, Kanton Zürich" },
      { k: "Wir bauen", v: "Content, Kampagnen, Websites, CRM" },
      { k: "Für", v: "Schweizer KMU und Dienstleister" },
    ] satisfies Row[],
  },

  stance: {
    meta: "Haltung",
    mega: "Systems over campaigns.",
    /** Akzentwort im Titel (violett) */
    accent: "Systems",
    megaDe: "Systeme statt Kampagnen.",
    text: "Eine Kampagne startet, läuft und endet. Ein System lernt aus jeder Runde: welche Botschaft zieht, welche Seite überzeugt, welche Anfrage zum Kunden wird. Darum bauen wir zuerst die Basis und optimieren dann entlang echter Zahlen.",
    claim: ["We create customers,", "not clicks."],
    claimDe: "Kunden statt Klicks.",
    claimText:
      "Klicks, Reichweite und Likes sind Zwischenwerte. Wir schauen auf das, was bei dir ankommt: Anfragen, Termine, neue Kundinnen und Kunden.",
  },

  team: {
    meta: "Team",
    title: "Du sprichst mit den Leuten, die es bauen.",
    lead: "Claudio und Fabian führen eCreator, Ricardo kümmert sich um Social Media, Content und Videografie. Kein Weiterreichen zwischen Beratung und Umsetzung.",
    placeholder: {
      label: "Team-Shooting am Set",
      spec: "Claudio, Fabian und Ricardo bei einem echten Dreh, Querformat, nicht gestellt",
    },
    contactLabel: "Direkt",
  },

  ownAd: {
    meta: ["Studio", "Eigene Produktion"],
    title: "So klingt es, wenn wir für uns selbst werben.",
    text: "Mit diesem Video bewerben wir unser Recruiting-System für Personalvermittlungen. Gedreht vor der eCreator-Logowand, ausgespielt auf Meta und Instagram. Dieselbe Arbeit machen wir für dich.",
    caption: ["Eigenes Ad", "Recruiting-System für Personalvermittlungen"],
    videoLabel: "Eigenes Ad von eCreator: Recruiting-System für Personalvermittlungen",
    link: { label: "So produzieren wir Content", href: "/content-produktion" },
  },

  method: {
    meta: "Arbeitsweise",
    title: "Lieber passende Anfragen als viele.",
    accent: "passende",
    lead: "Wir bauen Systeme, die vorqualifizieren. Das Video erklärt Angebot und Nutzen, die Seite liefert den Beweis, und das Tracking zeigt, was wirklich funktioniert. Optimiert wird auf Qualität, also auf Termine und Abschlüsse, nicht bloss auf Formulareinträge.",
    chainLabel: "Die Kette",
    chain: [
      { word: "Botschaft", text: "Was du anbietest, für wen, und warum es sich jetzt lohnt." },
      { word: "Creative", text: "Video oder Bild, das erklärt und vorqualifiziert." },
      { word: "Seite", text: "Landingpage mit Beweis und einer klaren Handlung." },
      { word: "Tracking", text: "Messung bis zur Anfrage und, wo möglich, bis zum Termin." },
      { word: "Nächste Runde", text: "Was funktioniert, bekommt mehr Budget. Was nicht funktioniert, wird ersetzt." },
    ] satisfies ChainStep[],
    loopNote: "Danach wieder von vorn",
    principlesLabel: "Unsere Prinzipien",
    principles: [
      "Tracking vor Skalierung",
      "Viele Creatives statt ein Ad",
      "Wöchentliche Tests",
      "Ein klarer Weg zur Anfrage",
      "Reporting mit nächstem Schritt",
    ],
    stepsTitle: "In drei Schritten zum System.",
    steps: [
      {
        title: "Analyse und Ziele",
        text: "Wir schauen uns Angebot, Zielgruppe, Website und Tracking an und legen fest, woran wir Erfolg messen.",
        meta: "Ergebnis: System-Plan und Zielwerte",
      },
      {
        title: "Aufbau",
        text: "Kampagnen, Creatives, Landingpage und Lead-Erfassung werden aufgesetzt und miteinander verbunden.",
        meta: "Ergebnis: das System geht live",
      },
      {
        title: "Testen und optimieren",
        text: "Wir testen Botschaften, Creatives und Zielgruppen in einem festen Rhythmus und verschieben Budget zu dem, was Kunden bringt.",
        meta: "Ziel: ein stabiler Kanal für neue Anfragen",
      },
    ],
  },

  refusals: {
    meta: "Grenzen",
    title: "Was wir nicht tun.",
    intro: "Manches bringt schnelle Zahlen und schlechte Kunden. Darauf verzichten wir bewusst.",
    items: [
      {
        no: "Gewinnspiel-Leads",
        why: "Ein verlostes iPhone bringt viele Einträge und fast nie Kunden. Darum setzen wir keine Gewinnspiele und keine Gratis-Köder ein.",
      },
      {
        no: "Versprechen ohne Messung",
        why: "Zuerst steht das Tracking, dann wird skaliert. Was wir nicht messen können, versprechen wir nicht.",
      },
      {
        no: "Klicks als Erfolg verkaufen",
        why: "Wir berichten, was aus den Klicks wird: Anfragen, Termine, Kunden. Jede Auswertung endet mit dem nächsten Schritt.",
      },
      {
        no: "Garantien auf Leads oder Umsatz",
        why: "Ergebnisse hängen auch von Markt, Angebot und Verkauf ab. Statt einer Garantie bekommst du einen klaren Testplan und ehrliche Zahlen.",
      },
    ] satisfies Refusal[],
  },

  facts: {
    meta: "Firmendaten",
    title: "Alles nachprüfbar.",
    accent: "nachprüfbar",
    intro:
      "Wir zeigen nur, was du selbst prüfen kannst: den Registereintrag, unsere Google-Bewertungen und Websites, in deren Footer unser Name steht.",
    companyCaption: "Handelsregister",
    company: [
      { k: "Firma", v: "eCreator GmbH" },
      { k: "Rechtsform", v: "Gesellschaft mit beschränkter Haftung" },
      { k: "Register", v: "Handelsregister des Kantons Zürich" },
      { k: "Eingetragen", v: "26.02.2026" },
      { k: "UID", v: "CHE-462.387.483" },
      { k: "Sitz", v: "Zürcherstrasse 17, 8173 Neerach" },
      { k: "Geschäftsführung", v: "Claudio Peres, Fabian Mbah" },
    ] satisfies Row[],
    proofCaption: "Belege",
    proofs: [
      {
        k: "Google",
        v: "4.7 von 5 bei 12 Rezensionen",
        note: "Stand 29.09.2026",
        href: "https://share.google/xcBQCpWbyWIwegBX5",
        linkLabel: "Rezensionen lesen",
        external: true,
      },
      {
        k: "Website",
        v: "nt-gipsermaler.ch",
        note: "Footer: «Webseite bei eCreator»",
        href: "https://nt-gipsermaler.ch/",
        linkLabel: "Website öffnen",
        external: true,
      },
      {
        k: "Website",
        v: "naechstenpflege.ch",
        note: "Footer: «made by eCreator.ch»",
        href: "https://naechstenpflege.ch/",
        linkLabel: "Website öffnen",
        external: true,
      },
    ] satisfies Proof[],
    quoteLabel: "Kundenstimme",
    casesLink: { label: "Alle Cases ansehen", href: "/cases" },
  },

  related: [
    { label: "Cases", href: "/cases", text: "Arbeit, die man zeigen kann: Kampagnen, Videos, Websites." },
    { label: "Leistungen", href: "/leistungen", text: "Content, Performance Marketing, Web, SEO und CRM im Überblick." },
    { label: "Standort", href: "/marketingagentur-zuerich", text: "Marketingagentur im Kanton Zürich, Sitz in Neerach." },
    { label: "Pakete", href: "/pakete", text: "Pro und Advanced mit festen Monatspreisen." },
  ],

  finalCta: {
    title: ["Lern uns kennen,", "bevor du entscheidest."] as [string, string],
  },
};
