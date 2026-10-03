/**
 * Startseite: Case Studies (drei Zeilen, Video gross und abwechselnd links und rechts).
 * Quellen:
 *  - Asset Management: Kennzahlen und Leistungen aus cases.ts (Case Study auf ecreator.ch: 600 Leads in 3 Monaten,
 *    CHF 10 statt 45 bis 80 pro Lead), «komplett individuelles CRM» laut eCreator (30.09.2026), Zitat wörtlich aus dem
 *    Video-Interview mit Costantino Pinelli (testimonials.ts).
 *  - Spitex Nächstenpflege: Belege in cases.ts (Credit im Website-Footer, Logo im Abspann der Ads), keine Kennzahlen.
 *  - Baba's Döner: vorbereitet. Belegt ist nur das Video selbst (Marke im Bild, ohne Sprache); Resultat offen.
 * Nicht übernommen aus der Gestaltungsvorlage vom 30.09.2026: «+80'000 Mehrumsatz», «5.0 Kundenbewertung» und das
 * dortige Zitat (nicht belegt, Google-Bewertung wird bewusst nicht gezeigt).
 */

export type HomeCase = {
  id: string;
  /** Branche, erscheint als Kicker «Branche · Case Study» */
  sector: string;
  client: string;
  summary: string;
  /** Leistungen als Häkchen in einer Zeile */
  services: string[];
  /** Kennzahlen, nur belegte */
  kpis?: { value: string; label: string }[];
  /** Für Cases ohne Kennzahlen: kurze Punkte zum Vorgehen */
  highlights?: { title: string; text: string }[];
  /** Platzhalter für fehlende Angaben */
  todo?: string;
  quote?: { text: string; by: string; role: string };
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
    sector: "Finanzdienstleistung",
    client: "Asset Management Switzerland AG",
    summary: "Lead-Generierung für Vorsorge, Krankenkasse und Steuern, mit eigener Kampagne pro Thema.",
    services: ["Performance Marketing", "Content-Produktion", "Landingpages", "Tracking", "CRM"],
    kpis: [
      { value: "600", label: "Qualifizierte Leads" },
      { value: "CHF 10", label: "pro Lead, vorher 45 bis 80" },
      { value: "3", label: "Monate Laufzeit" },
      { value: "3", label: "Themen parallel" },
    ],
    quote: {
      text: "Die Agenda ist voll.",
      by: "Costantino Pinelli",
      role: "CEO, Asset Management Switzerland AG",
    },
    media: { kind: "interview" },
    link: { label: "Ganze Case Study ansehen", href: "/cases/finanzdienstleister-lead-generierung" },
    source: "Zahlen laut Case Study auf ecreator.ch.",
  },
  {
    id: "spitex-naechstenpflege",
    sector: "Pflege",
    client: "Spitex Nächstenpflege",
    summary: "Eine Botschaft, drei Spuren: Video, Kampagne und Website für pflegende Angehörige.",
    services: ["Content-Produktion", "Performance Marketing", "Webdesign"],
    highlights: [
      { title: "Hook mit der konkreten Zahl", text: "Die Ads steigen direkt mit der wichtigsten Information ein." },
      { title: "Gleiche Botschaft auf der Website", text: "Die Website führt ohne Umwege zur Anmeldung." },
    ],
    media: { kind: "ad", workId: "naechstenpflege" },
    link: { label: "Case ansehen", href: "/cases/spitex-naechstenpflege" },
  },
  {
    id: "babas-doener",
    sector: "Gastronomie",
    client: "Baba's Döner",
    summary: "Ein Social Ad, das ohne Worte funktioniert: nur Bild, Musik und Marke.",
    services: ["Dreh", "Schnitt", "Social Ad"],
    highlights: [{ title: "Marke im Bild", text: "Shirt, Flasche und Verpackung zeigen die Marke im ganzen Video." }],
    todo: "Resultat der Kampagne (z.B. Reichweite, Bestellungen) von eCreator nachliefern",
    media: { kind: "ad", workId: "babas-doener" },
    link: { label: "Content Day ansehen", href: "/content-day" },
  },
];

/* ==========================================================================
   Social Recruiting auf der Startseite (Briefing eCreator 30.09.2026): kompakt, die animierte Grafik trägt die
   Section. Details, Preise und Pakete stehen auf /social-recruiting. Gedankenstrich im Text durch Doppelpunkt ersetzt.
   ========================================================================== */

export const homeRecruiting = {
  label: "Social Recruiting",
  title: "Dein nächster Mitarbeiter scrollt gerade.",
  accent: "scrollt gerade",
  text: "Von der Social Ad bis zum qualifizierten Bewerber: Wir bauen den gesamten Recruiting-Prozess als ein System.",
  cta: { label: "Social Recruiting", href: "/social-recruiting" },
  /** Stationen der Grafik, in dieser Reihenfolge */
  steps: ["Gesehen", "Beworben", "Im CRM", "Qualifiziert", "Eingestellt"],
};

/* ==========================================================================
   Team auf der Startseite: ein gemeinsames Teamfoto statt Einzelporträts (Kundenwunsch 30.09.2026).
   Es gibt noch kein echtes Gruppenfoto (Empfehlung: Team-Shooting am Set). Bis dahin erscheint ein Bildplatz.
   Sobald das Foto da ist: Datei nach public/team/ legen und bei photo.src eintragen, z.B. "/team/team.jpg".
   ========================================================================== */

export const homeTeam = {
  label: "Team",
  title: "Das Team hinter eCreator.",
  accent: "Team",
  text: "Du sprichst mit den Leuten, die deine Kampagnen, Videos und Websites bauen. Am Telefon, im Video-Call oder beim Dreh.",
  photo: {
    src: null as string | null,
    alt: "Das Team von eCreator",
    placeholder: {
      label: "Teamfoto",
      spec: "Ein gemeinsames Foto des ganzen Teams, Querformat, echt und nicht gestellt (Team-Shooting am Set)",
    },
  },
  link: { label: "Mehr über eCreator", href: "/ueber-uns" },
};

/* ==========================================================================
   Probleme der Kunden (Muster: «Wo dein Wachstum heute hängenbleibt»).
   Typische Ausgangslagen aus den Leistungsseiten und der Case Study (keine Kennzahlen, keine Kundenbehauptungen).
   ========================================================================== */

export type HomeProblem = {
  id: string;
  /** Art der kleinen Grafik oben in der Karte */
  visual: "funnel" | "cost" | "quality" | "content";
  title: string;
  points: string[];
  link: { label: string; href: string };
};

/**
 * Durchschnittliche Kosten pro Lead über alle Kunden: eCreator-Angabe vom 01.10.2026.
 * Vor Livegang mit Ads-Daten (Export über alle Konten) belegen, siehe README offene Punkte.
 */
export const homeCplAverage = { value: "CHF 12", label: "Ø CHF 12 bei unseren Kunden" };

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
    id: "kosten",
    visual: "cost",
    title: "Lead-Kosten zu hoch",
    points: [
      "Eine Kampagne für alle Themen und Zielgruppen",
      "Landingpages, die niemanden direkt ansprechen",
      "Keine Tests, keine Varianten",
      "Kosten pro Lead steigen, die Marge sinkt",
    ],
    link: { label: "Case: CHF 10 pro Lead", href: "/cases/finanzdienstleister-lead-generierung" },
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
   Warum Kunden kommen und bleiben. Texte von eCreator (30.09.2026), Gedankenstriche durch Komma bzw.
   Doppelpunkt ersetzt. Die CRM-Ansicht daneben ist eine Beispielansicht mit Demo-Daten und als solche beschriftet.
   ========================================================================== */

export type HomeReason = { kicker: string; title: string; text: string };

export const homeWhy = {
  label: "Warum eCreator",
  title: "Warum Kunden kommen. Und bleiben.",
  accent: "bleiben",
  reasons: [
    {
      kicker: "Mehr Umsatz als Ziel",
      title: "Marketing muss sich im Umsatz zeigen.",
      text: "Wir legen den Fokus nicht auf schöne Zahlen im Reporting, sondern darauf, mehr qualifizierte Anfragen, Kunden und letztlich Umsatz zu generieren.",
    },
    {
      kicker: "Alles aus einer Hand",
      title: "Ein Partner. Ein System.",
      text: "Content, Ads, Websites, Tracking und CRM greifen bei uns ineinander, statt fünf verschiedene Dienstleister koordinieren zu müssen.",
    },
    {
      kicker: "Direkter Kontakt",
      title: "Kurze Wege. Schnelle Umsetzung.",
      text: "Direkte Ansprechpartner, schnelle Entscheidungen und ein Team, das dein Unternehmen und deine Ziele wirklich kennt.",
    },
  ] satisfies HomeReason[],
  growth: {
    kicker: "Langfristiger Wachstumspartner",
    title: "Von 0 aufbauen. Bestehendes skalieren. Weiter wachsen.",
    text: "Wir begleiten Unternehmen langfristig: egal ob wir das Marketing von Grund auf aufbauen, bestehende Strukturen weiterentwickeln oder ein funktionierendes System auf die nächste Wachstumsphase vorbereiten.",
    /**
     * Umsatz-Grafik über die Phasen 0 → Build → Grow → Scale → Keep growing.
     * h = Höhe der Kurve in Prozent; schematisch, ohne Zahlen (so auch auf der Seite beschriftet).
     */
    stages: [
      { label: "0", h: 6 },
      { label: "Build", h: 16 },
      { label: "Grow", h: 32 },
      { label: "Scale", h: 56 },
      { label: "Keep growing", h: 84 },
    ],
  },
};
