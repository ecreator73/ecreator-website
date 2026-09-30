import type { Crumb } from "@/lib/schema";

/**
 * /webdesign · Seitentexte (Vertrag C9, docs/PAGES.md).
 *
 * Quellen:
 *  - Leistungsumfang, Ablauf, FAQ-Antworten: FACTS 8.3 (W01–W04, Live-Site /webseite-erstellen-lassen/, VERIFIZIERT)
 *  - Webprojekte: src/content/work.ts (webProjects, Credit im Footer der jeweiligen Website)
 *  - Projektansatz (Punkte je Projekt): src/content/cases.ts (approach), keine Resultate
 *  - Paketinhalte: src/content/offers.ts (Pro: kampagnenspezifische Landingpages, Advanced: Website bzw. Redesign)
 *  - Server-Side Tracking: offers.ts (Advanced)
 *  - Drittkosten: AGB Ziff. 7 (FACTS A07)
 * Bewusst NICHT genannt: Preise für Website-Projekte und Projektdauer (beides nicht belegt),
 * Resultate der Webprojekte (keine belegten Zahlen), Partnerschaften (keine nachgewiesen).
 */

export type Fact = { k: string; v: string };
export type TextItem = { title: string; text: string };
export type AnatomyBlock = {
  id: "kopf" | "beweis" | "angebot" | "fragen" | "anfrage" | "messung";
  label: string;
  title: string;
  text: string;
};
export type ProjectCopy = {
  id: "trapletti" | "naechstenpflege";
  /** kurze Punkte aus dem Projektansatz (cases.ts), keine Resultate */
  points: string[];
  caseHref: string;
};

export const webdesignPage = {
  meta: {
    title: "Webdesign Schweiz: Website erstellen lassen",
    description:
      "Website erstellen lassen im Kanton Zürich: Webdesign mit WordPress, Elementor oder Shopify, mit Formularen, CRM-Anbindung und Tracking. Zwei echte Projekte.",
    path: "/webdesign",
  },

  crumbs: [
    { name: "Leistungen", path: "/leistungen" },
    { name: "Webdesign", path: "/webdesign" },
  ] satisfies Crumb[],

  schema: {
    name: "Webdesign & Development",
    serviceType: "Webdesign",
    description:
      "Websites, Landingpages und Online-Shops für KMU: Nutzerführung, Gestaltung, technische Umsetzung mit WordPress, Elementor, Shopify oder individuell, Anbindung von Formularen, Kalender, WhatsApp und CRM, Tracking.",
  },

  header: {
    meta: ["Leistung", "Infrastruktur"],
    title: ["Websites, die", "Anfragen bringen."],
    /** Akzentwort im Titel (violett), muss wörtlich in einer Titelzeile stehen */
    accent: "Anfragen",
    lead: "Wir planen, gestalten und bauen Websites und Landingpages, die sofort verständlich sind und Besucher zur Anfrage führen. Formular, Kalender, CRM und Tracking denken wir von Anfang an mit.",
    factsCaption: "Datenblatt",
    facts: [
      { k: "Wir bauen", v: "Websites, Landingpages, Online-Shops, Buchungsstrecken" },
      { k: "Systeme", v: "WordPress, Elementor, Shopify oder individuell" },
      { k: "Angebunden", v: "Formulare, Kalender, WhatsApp, CRM" },
      { k: "Gemessen", v: "Tracking ab dem Launch" },
      { k: "Kosten", v: "Nach Umfang, im Gespräch" },
    ] satisfies Fact[],
    secondaryLink: { label: "Zwei Projekte ansehen", href: "#projekte" },
  },

  projects: {
    meta: "Arbeiten",
    title: "Zwei Websites. Live, mit unserem Namen im Footer.",
    accent: "Live",
    intro:
      "Keine Mockups und keine Beispielseiten. Kennzahlen zeigen wir nur mit Beleg. Darum zeigen wir hier, was du selbst prüfen kannst: die Websites.",
    hint: "Maus darauf oder antippen: die ganze Seite läuft durch.",
    labels: { desktop: "Desktop, ganze Seite", mobile: "Handy", evidence: "Beleg", visit: "Website öffnen", case: "Projekt im Detail" },
    items: [
      {
        id: "trapletti",
        points: ["Klare Leistungen", "Offerte auf jeder Seite", "Mobil zuerst"],
        caseHref: "/cases/trapletti",
      },
      {
        id: "naechstenpflege",
        points: ["Gleiche Botschaft wie die Ads", "Ohne Umwege zur Anmeldung"],
        caseHref: "/cases/spitex-naechstenpflege",
      },
    ] satisfies ProjectCopy[],
  },

  cro: {
    /** Label-Pille über dem Satz (reines UI-Label) */
    meta: "Haltung",
    statement: ["Eine Website ist kein Prospekt.", "Sie ist der Ort, an dem aus Interesse eine Anfrage wird."],
    term: "CRO (Conversion-Rate-Optimierung)",
    definition:
      "CRO heisst, eine Seite so zu verbessern, dass mehr Besucher anfragen, buchen oder kaufen. Das geschieht über Klarheit, nicht über Tricks: verständliche Botschaft, sichtbarer Beweis, einfacher nächster Schritt. Danach messen wir, wo Besucher abspringen, und ändern gezielt diese Stelle.",
    uxTitle: "UX/UI, zuerst für das Handy",
    ux: "UX ist die Nutzerführung, also wie leicht jemand findet, was er sucht. UI ist die Gestaltung, also wie die Seite aussieht und sich anfühlt. Beides planen wir zuerst für das Handy: Wer über eine Anzeige auf Instagram oder TikTok kommt, öffnet die Seite dort.",
  },

  anatomy: {
    meta: "Bauplan einer Seite",
    title: "So ist eine Seite aufgebaut, die Anfragen bringen soll.",
    intro: "Von oben nach unten, in dieser Reihenfolge. Links siehst du die Seite als Schema.",
    blocks: [
      {
        id: "kopf",
        label: "Kopf",
        title: "Was, für wen, wie weiter",
        text: "Was du anbietest, für wen, und was als Nächstes passiert. Verständlich, bevor jemand scrollt.",
      },
      {
        id: "beweis",
        label: "Beweis",
        title: "Echte Arbeit statt Behauptung",
        text: "Echte Projekte, echte Stimmen, Zahlen nur mit Quelle.",
      },
      {
        id: "angebot",
        label: "Angebot",
        title: "In der Sprache deiner Kunden",
        text: "Leistungen so erklärt, wie deine Kunden danach fragen. Ablauf und Preis, wo es möglich ist.",
      },
      {
        id: "fragen",
        label: "Fragen",
        title: "Einwände direkt beantwortet",
        text: "Die Fragen, die sonst den Anruf verhindern, stehen mit Antwort auf der Seite.",
      },
      {
        id: "anfrage",
        label: "Anfrage",
        title: "Ein klarer nächster Schritt",
        text: "Formular, Kalender oder WhatsApp. Auf jeder Seite erreichbar, auf dem Handy mit dem Daumen.",
      },
      {
        id: "messung",
        label: "Messung",
        title: "Unsichtbar, aber immer dabei",
        text: "Jede Anfrage wird mit Quelle erfasst. So sieht man, welche Seite und welche Anzeige Anfragen bringt.",
      },
    ] satisfies AnatomyBlock[],
  },

  stack: {
    meta: "Technische Umsetzung",
    title: ["WordPress, Elementor, Shopify.", "Oder eigener Code."],
    intro:
      "Das System richtet sich danach, was die Website können muss und wer sie später pflegt. Nicht nach Gewohnheit.",
    items: [
      {
        title: "WordPress",
        text: "Für Websites, die du selbst pflegen willst: Seiten, Texte, Bilder und Beiträge. Formulare, Buchung oder mehrere Sprachen lassen sich ergänzen.",
      },
      {
        title: "Elementor",
        text: "Der visuelle Seiteneditor für WordPress. Du änderst Texte und Bilder direkt auf der Seite, so wie sie später aussieht.",
      },
      {
        title: "Shopify",
        text: "Für Online-Shops: Produkte, Warenkorb, Bezahlung und Versand in einem System.",
      },
      {
        title: "Individuell",
        text: "Eigene Entwicklung, wenn ein Baukasten nicht reicht: Rechner, Kundenportale oder Schnittstellen zu deinen Systemen.",
      },
    ] satisfies TextItem[],
  },

  integrations: {
    meta: "Integrationen",
    title: "Was an der Website hängt.",
    intro:
      "Eine Anfrage ist erst etwas wert, wenn sie beim richtigen Menschen ankommt. Darum verbinden wir die Website mit den Systemen dahinter.",
    crmLink: { label: "Mehr zu CRM und Automation", href: "/crm-automation" },
    rows: [
      {
        k: "Formulare",
        v: "Anfragen kommen vollständig an, mit Anliegen und Quelle, im Postfach oder direkt im CRM.",
      },
      { k: "Kalender", v: "Besucher buchen einen Termin selbst, ohne Hin und Her per E-Mail." },
      { k: "WhatsApp", v: "Ein Tipp öffnet den Chat mit deinem Team, für alle, die lieber schreiben als anrufen." },
      { k: "CRM", v: "Kontakte und Anfragen an einem Ort, zum Beispiel in HubSpot oder einem eigenen System." },
      {
        k: "Tracking",
        v: "Google Analytics, Meta Pixel und Conversion-Events: gemessen wird, welche Seite und welche Anzeige Anfragen bringt.",
      },
      {
        k: "Server-Side",
        v: "Auf Wunsch serverseitig. Server-Side Tracking heisst: Messdaten laufen über einen eigenen Server statt nur über den Browser und gehen dadurch weniger leicht verloren.",
      },
      { k: "SEO-Basis", v: "Struktur, Ladezeit, Titel, Texte und lokale Suchbegriffe von Anfang an." },
    ] satisfies Fact[],
  },

  steps: {
    meta: "Ablauf",
    title: "Vier Schritte bis zum Launch.",
    items: [
      { title: "Analyse", text: "Wir schauen uns deine Branche, dein Angebot und deine heutige Website an." },
      { title: "Struktur", text: "Wir planen Seiten, Texte, Buttons, Formulare und den Weg zur Anfrage." },
      { title: "Design", text: "Wir gestalten und bauen die Website: schnell, klar und zuerst für das Handy gedacht." },
      { title: "Launch", text: "Wir verbinden SEO-Grundlagen, Tracking und Formulare und schalten die Seite live." },
    ] satisfies TextItem[],
    packages: {
      text: "Einzeln oder im Paket: Im Pro sind kampagnenspezifische Landingpages enthalten, im Advanced eine Website bzw. ein Redesign, je nach Projekt.",
      link: { label: "Pakete ansehen", href: "/pakete" },
    },
  },

  faq: {
    meta: "Fragen",
    title: "Fragen zu Website-Projekten.",
    intro: "Kurz beantwortet. Was hier fehlt, klären wir im Strategie-Call.",
    items: [
      {
        q: "Was kostet eine Website bei eCreator?",
        a: "Das hängt vom Umfang ab, deshalb nennen wir den Preis erst, wenn klar ist, was die Website können muss. Eine einzelne Landingpage ist ein anderes Projekt als eine Website mit Shop oder Buchung. Das klären wir im Gespräch.",
      },
      {
        q: "Wie lange dauert ein Website-Projekt?",
        a: "Eine feste Dauer nennen wir erst, wenn der Umfang steht. Sie hängt davon ab, wie viele Seiten und Funktionen es braucht und wie schnell Texte und Bilder bereit sind.",
      },
      {
        q: "Kann ich später selbst Inhalte ändern?",
        a: "Ja, je nach System kannst du Texte, Bilder, Seiten und Angebote selbst anpassen. Mit WordPress und Elementor geht das direkt im visuellen Editor.",
      },
      {
        q: "Ist die Website für Google vorbereitet?",
        a: "Ja. Wir achten auf Struktur, schnelle Ladezeit, Titel, Texte, lokale Suchbegriffe und technische SEO-Grundlagen. Für laufende Suchmaschinenoptimierung gibt es SEO als eigene Leistung.",
      },
      {
        q: "Könnt ihr Formulare und CRM verbinden?",
        a: "Ja. Wir verbinden Formulare, Kalender und WhatsApp mit HubSpot oder anderen CRM-Systemen, damit jede Anfrage mit Quelle ankommt.",
      },
      {
        q: "Sind Hosting, Domain und Lizenzen im Preis enthalten?",
        a: "Nein, nicht automatisch. Kosten von Drittanbietern wie Hosting, Domain oder Softwarelizenzen werden separat verrechnet oder direkt von dir bezahlt. So steht es in unseren AGB.",
      },
    ],
  },

  related: [
    { label: "CRM & Automation", href: "/crm-automation", text: "Damit Anfragen von der Website nicht liegen bleiben." },
    { label: "SEO", href: "/seo", text: "Gefunden werden, wenn jemand nach deiner Leistung sucht." },
    {
      label: "Google Ads",
      href: "/performance-marketing/google-ads",
      text: "Suchanzeigen, die auf die passende Landingpage führen.",
    },
    { label: "Pakete", href: "/pakete", text: "Landingpages im Pro, Website bzw. Redesign im Advanced." },
  ],

  finalCta: {
    title: ["Lass uns über deine", "neue Website reden."] as [string, string],
  },
} as const;
