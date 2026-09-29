/**
 * Cases. Nur echte Kunden, nur belegte oder von eCreator selbst veröffentlichte Angaben.
 * Jede Zahl hat eine Quelle (source). status:
 *  - "belegt": extern nachprüfbar (z.B. Footer-Credit, Logo im Material)
 *  - "eCreator-Angabe": von eCreator veröffentlicht (Live-Site, LinkedIn), vor Livegang bestätigen
 */

export type CaseMetric = { value: string; label: string; source: string };

export type CaseStudy = {
  slug: string;
  client: string;
  /** Anzeige, solange keine Freigabe für den Namen vorliegt */
  clientAnonymous?: string;
  nameApproved: boolean;
  sector: string;
  headline: string;
  teaser: string;
  services: string[];
  status: "belegt" | "eCreator-Angabe";
  evidence: string[];
  metrics?: CaseMetric[];
  challenge: string[];
  approach: { title: string; text: string }[];
  outcome: string[];
  media: {
    hero: { type: "video"; src: string; poster: string; ratio: string } | { type: "image"; src: string; ratio: string };
    videos?: string[];
    web?: string;
  };
  interview?: string;
  todo?: string[];
  /** Alte URL auf ecreator.ch (für Redirects) */
  legacyUrl?: string;
};

export const cases: CaseStudy[] = [
  {
    slug: "finanzdienstleister-lead-generierung",
    client: "Asset Management Switzerland AG",
    clientAnonymous: "Schweizer Asset-Management-Unternehmen",
    nameApproved: false,
    sector: "Finanzdienstleistung",
    headline: "600 qualifizierte Leads in drei Monaten, zu 10 Franken pro Lead.",
    teaser:
      "Lead-Generierung für Vorsorge, Krankenkasse und Steuern: getrennte Kampagnen pro Thema, Video-Creatives, die vorqualifizieren, und Tracking bis zum Lead.",
    services: ["Performance Marketing", "Content-Produktion", "Landingpages", "Tracking"],
    status: "eCreator-Angabe",
    evidence: [
      "Case Study auf ecreator.ch (Februar 2026, anonymisiert als «Schweizer Asset-Management-Unternehmen»)",
      "Video-Interview mit Costantino Pinelli, CEO, veröffentlicht von eCreator auf LinkedIn am 17.06.2026",
      "Kundenlogo auf der Startseite von ecreator.ch",
    ],
    metrics: [
      { value: "600", label: "qualifizierte Leads", source: "Case Study ecreator.ch" },
      { value: "CHF 10", label: "Kosten pro Lead", source: "Case Study ecreator.ch" },
      { value: "3", label: "Monate Laufzeit", source: "Case Study ecreator.ch" },
      { value: "3", label: "Themen parallel", source: "Case Study ecreator.ch" },
    ],
    challenge: [
      "Vor der Zusammenarbeit liefen vereinzelt Meta Ads. Die Kosten pro Lead lagen laut Case Study bei 45 bis 80 Franken, zu hoch für eine profitable Skalierung.",
      "Vorsorge, Krankenkasse und Steuern liefen in einer einzigen Kampagne, ohne zielgruppenspezifische Ansprache.",
      "Die Landingpages sprachen alle Themen gleichzeitig an. Es gab kein sauberes Tracking, optimiert wurde auf Klicks statt auf Lead-Qualität.",
    ],
    approach: [
      { title: "Drei Themen, drei Kampagnen", text: "Vorsorge, Krankenkasse und Steuern bekamen je eine eigene Kampagne, eigene Zielgruppen und eine eigene Landingpage." },
      { title: "Video, das vorqualifiziert", text: "Kurze Videos erklären Problem, Lösung und nächsten Schritt. Wer klickt, weiss, worum es geht." },
      { title: "Tracking bis zum Lead", text: "Conversion-Tracking so aufgesetzt, dass auf echte Anfragen optimiert wird, nicht auf Klicks." },
    ],
    outcome: [
      "Laut veröffentlichter Case Study: 600 qualifizierte Leads in drei Monaten mit einem Kosten-pro-Lead-Wert von rund 10 Franken.",
    ],
    media: {
      hero: { type: "video", src: "/work/interview-asset-management.mp4", poster: "/work/interview-asset-management-poster.jpg", ratio: "16 / 9" },
      videos: ["vorsorge", "krankenkasse", "steuern"],
    },
    interview: "/work/interview-asset-management.mp4",
    todo: [
      "Freigabe für namentliche Nennung und Zahlen einholen (Case Study war anonymisiert).",
      "Zuordnung der Creatives Vorsorge / Krankenkasse / Steuern zu diesem Kunden bestätigen.",
      "Freigabe für das Video-Interview auf der Website bestätigen.",
    ],
    legacyUrl: "/600-leads-in-3-monaten-a-10-chf-case-study-asset-management/",
  },
  {
    slug: "spitex-naechstenpflege",
    client: "Spitex Nächstenpflege",
    nameApproved: true,
    sector: "Pflege",
    headline: "Eine Botschaft, drei Spuren: Video, Kampagne, Website.",
    teaser:
      "Für pflegende Angehörige: Video-Ads, die in Sekunden erklären, worum es geht, und eine Website, die dieselbe Botschaft bis zur Anmeldung weiterführt.",
    services: ["Content-Produktion", "Performance Marketing", "Webdesign"],
    status: "belegt",
    evidence: [
      "Footer von naechstenpflege.ch: «made by eCreator.ch»",
      "Kundenlogo im Abspann der Video-Ads",
    ],
    challenge: [
      "Angehörigenpflege mit Entlöhnung ist ein erklärungsbedürftiges Angebot. Die Botschaft muss in wenigen Sekunden verstanden werden, im Feed und auf der Website.",
    ],
    approach: [
      { title: "Hook mit der konkreten Zahl", text: "Die Ads steigen direkt mit der wichtigsten Information ein und sprechen Angehörige persönlich an." },
      { title: "Gleiche Botschaft auf der Website", text: "Die Website übernimmt das Versprechen aus der Ad und führt ohne Umwege zur Anmeldung." },
    ],
    outcome: [
      "Website und Kampagnen aus einer Hand, mit durchgehender Botschaft vom ersten Kontakt bis zur Anmeldung.",
    ],
    media: {
      hero: { type: "video", src: "/work/naechstenpflege.mp4", poster: "/work/naechstenpflege-poster.jpg", ratio: "9 / 16" },
      videos: ["naechstenpflege"],
      web: "naechstenpflege",
    },
    todo: [
      "Kennzahlen bestätigen: Live-Site nennt «4M Reach, 90 Days, 2× Neukunden» ohne Quelle. Bis dahin ohne Zahlen.",
    ],
  },
  {
    slug: "trapletti",
    client: "Trapletti Gipser Maler GmbH",
    nameApproved: true,
    sector: "Handwerk",
    headline: "Eine Handwerker-Website, die Offerten bringt statt nur gut auszusehen.",
    teaser:
      "Gipser- und Malerbetrieb in Thalwil: klare Leistungsstruktur, Referenzen, Offertanfrage auf jeder Seite, mobil zuerst gedacht.",
    services: ["Webdesign", "SEO-Struktur"],
    status: "belegt",
    evidence: ["Footer von nt-gipsermaler.ch: «Webseite bei eCreator»"],
    challenge: ["Ziel war eine Website, die Leistungen klar zeigt und Besucher direkt zur Offertanfrage führt."],
    approach: [
      { title: "Klare Leistungen", text: "Gipserarbeiten, Trockenbau und Malerarbeiten mit eigener Struktur und verständlicher Sprache." },
      { title: "Offerte statt Kontaktformular", text: "Die wichtigste Handlung ist auf jeder Seite sichtbar." },
      { title: "Mobil zuerst", text: "Layout, Buttons und Formular funktionieren auf dem Handy genauso gut wie am Desktop." },
    ],
    outcome: ["Neue Website live unter nt-gipsermaler.ch."],
    media: {
      hero: { type: "image", src: "/work/trapletti-desktop.webp", ratio: "16 / 10" },
      web: "trapletti",
    },
    todo: ["Resultate (Anfragen vorher/nachher) von eCreator nachliefern, falls vorhanden."],
  },
];

export const caseBySlug = (slug: string) => cases.find((c) => c.slug === slug);

/** Angezeigter Kundenname: echter Name nur mit Freigabe (siehe FACTS N43, AGB Ziff. 16). */
export const displayClient = (c: CaseStudy) => (c.nameApproved ? c.client : (c.clientAnonymous ?? c.sector));
