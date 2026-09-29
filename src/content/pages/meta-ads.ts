import { caseBySlug, displayClient } from "@/content/cases";
import { contentDay, packages } from "@/content/offers";
import { webProjects } from "@/content/work";
import { budgetHint, financeCaseSource, type FaqEntry, type LinkRef } from "@/content/pages/performance-marketing";

/**
 * Seite /performance-marketing/meta-ads (Vertrag C3, docs/PAGES.md).
 * Quellen: Case A (Zahlen 600 / CHF 10 / 45–80, Learning «Landingpage schlägt Lead-Ad» nur als Erfahrungswert),
 * Case Spitex (Hook mit konkreter Zahl, gleiche Botschaft auf der Website, belegt durch Footer-Credit),
 * FACTS M10–M12, KZ12. Meta Ads ist laut Briefing im Paket Pro enthalten («Meta/Social Ads»);
 * ob Advanced alle Pro-Leistungen enthält, ist UNKLAR (FACTS 9.1 Punkt 1) → hier nur Pro nennen.
 */

const financeCase = caseBySlug("finanzdienstleister-lead-generierung");
const spitexCase = caseBySlug("spitex-naechstenpflege");
if (!financeCase || !spitexCase) throw new Error("Cases fehlen in cases.ts");

const spitexSite = webProjects.find((w) => w.id === "naechstenpflege");
if (!spitexSite) throw new Error("Webprojekt «naechstenpflege» fehlt in work.ts");

const pro = packages.find((p) => p.id === "pro");
if (!pro) throw new Error("Paket «pro» fehlt in offers.ts");

const dayFrom = contentDay.options.find((o) => o.id === "4h");
if (!dayFrom) throw new Error("Content-Day-Option «4h» fehlt in offers.ts");

export const metaAdsPage = {
  meta: {
    title: "Meta Ads Agentur Schweiz: Facebook & Instagram",
    description:
      "Meta Ads für Facebook und Instagram: Video-Ads aus eigener Produktion, Landingpage oder Lead-Formular, Pixel und Conversions API, wöchentliches Testing.",
    path: "/performance-marketing/meta-ads",
  },

  crumbs: [
    { name: "Performance Marketing", path: "/performance-marketing" },
    { name: "Meta Ads", path: "/performance-marketing/meta-ads" },
  ],

  header: {
    meta: ["Performance Marketing", "Meta Ads"],
    title: ["Meta Ads für", "Facebook und", "Instagram."],
    lead: "Auf Facebook und Instagram erreichst du Menschen, die noch nicht nach dir suchen. Damit sie stehen bleiben, braucht es ein Video, das in Sekunden sagt, worum es geht. Das drehen wir selbst.",
    secondaryLink: { label: `Content Day ab CHF ${dayFrom.price.amount}`, href: "/content-day" } satisfies LinkRef,
  },

  /** Video im Hochformat, daneben der Aufbau eines Ads als Liste (ohne Timecodes). Beispiel: Spitex-Ad (Kunde belegt). */
  anatomy: {
    meta: "Aufbau eines Ads",
    title: "Fünf Teile in einem kurzen Video.",
    videoId: "naechstenpflege",
    caption: ["Social Ad", spitexCase.client] as [string, string],
    exampleNote: "Beispiel aus unserer Produktion: Das Ad steigt mit einer Frage und der konkreten Zahl ein.",
    parts: [
      {
        title: "Einstieg",
        text: "Die ersten Sekunden entscheiden, ob jemand weiterscrollt. Wir starten mit der wichtigsten Information oder einer direkten Frage, auf Englisch Hook genannt.",
      },
      {
        title: "Problem",
        text: "Das Video benennt die Situation deiner Zielgruppe in ihren eigenen Worten, damit sie sich erkennt.",
      },
      {
        title: "Lösung",
        text: "Dann dein Angebot: was du konkret machst und was es bringt. Lieber ein Frankenbetrag als ein abstraktes Versprechen.",
      },
      {
        title: "Beweis",
        text: "Etwas, das Vertrauen schafft: eine Kundenstimme, ein belegtes Ergebnis, das Gesicht hinter dem Angebot.",
      },
      {
        title: "Handlung",
        text: "Zum Schluss ein klarer nächster Schritt mit niedriger Schwelle, zum Beispiel eine kostenlose Analyse statt eines Verkaufsgesprächs.",
      },
    ],
    variants: "Pro Botschaft drehen wir mehrere Einstiege. So testen wir, welcher Anfang die richtigen Leute hält.",
  },

  /** Platzierungen auf Meta (Plattform-Fakten, keine Resultate). */
  formats: {
    meta: "Formate",
    title: "Drei Orte, drei Arten zu schauen.",
    items: [
      {
        name: "Reels",
        text: "Hochformat-Videos im Vollbild, zwischen anderen Reels. Hier zählt der Einstieg, und Untertitel sind Pflicht, weil nicht alle mit Ton schauen.",
      },
      {
        name: "Stories",
        text: "Vollbild zwischen den Stories von Freunden und Marken. Kurz, direkt, mit einer Handlung am Ende.",
      },
      {
        name: "Feed",
        text: "Beiträge im Facebook- und Instagram-Feed, als Video oder Bild. Hier ist Platz für etwas mehr Erklärung.",
      },
    ],
  },

  /** Gegenüberstellung. Learning aus Case A ausdrücklich als Erfahrungswert, nicht als Regel. */
  destination: {
    meta: "Nach dem Klick",
    title: "Lead-Formular oder Landingpage?",
    options: [
      {
        name: "Lead-Formular",
        sub: "direkt in Facebook oder Instagram",
        text: "Das Formular öffnet sich in der App, Name und Kontaktdaten sind vorausgefüllt. Schnell ausgefüllt, aber es bleibt wenig Raum, um Vertrauen aufzubauen.",
        fit: "Passt zu einfachen Angeboten, die man nicht lange erklären muss.",
      },
      {
        name: "Landingpage",
        sub: "eigene Seite zur Kampagne",
        text: "Eine Seite mit derselben Botschaft wie das Ad, dazu Belege, Datenschutz-Hinweis und ein kurzes Formular. Ein Schritt mehr, dafür weiss die Person, worauf sie sich einlässt.",
        fit: "Passt zu Angeboten, die Vertrauen brauchen: Finanzen, Gesundheit, grössere Aufträge.",
      },
    ],
    learning: {
      label: "Erfahrungswert aus dem Finanz-Case",
      text: "Eine eigene Landingpage mit Vertrauenselementen (Kundenstimmen, Datenschutz-Hinweis, Beratung statt Verkauf) hat besser konvertiert als das Lead-Formular von Meta. Das gilt für diesen Fall, nicht automatisch für jeden. Deshalb testen wir beides, wo es Sinn ergibt.",
      source: financeCaseSource,
    },
    example: {
      src: spitexSite.mobile,
      alt: `Website ${spitexSite.client}, mobile Ansicht: Startseite mit derselben Botschaft wie im Ad`,
      caption: ["Website", spitexSite.url.replace(/^https?:\/\//, "").replace(/\/$/, "")] as [string, string],
      text: "Dieselbe Zahl wie im Ad oben, jetzt als Titel der Website. Das Versprechen reisst nach dem Klick nicht ab.",
      evidence: spitexSite.evidence,
      link: { label: "Case Spitex Nächstenpflege", href: `/cases/${spitexCase.slug}` } satisfies LinkRef,
    },
  },

  /** Testing-Rhythmus als vier Schritte (FACTS M11 «Wöchentliche Tests», «Creative-Pipeline statt 1 Ad»). */
  testing: {
    words: ["Drehen.", "Ausspielen.", "Auswerten.", "Umschichten."],
    again: ["Und wieder", "von vorn."],
    title: "Creative-Testing im Wochenrhythmus",
    text: "Auch gute Videos nutzen sich ab, wenn dieselben Leute sie immer wieder sehen. Deshalb planen wir von Anfang an mehrere Varianten pro Botschaft und testen jede Woche, statt ein Video monatelang laufen zu lassen.",
    note: "Das ist unsere Arbeitsweise, keine Garantie für ein Ergebnis.",
    link: { label: "Content-Produktion ansehen", href: "/content-produktion" } satisfies LinkRef,
  },

  /** Finanz-Case als Datenblatt neben dem Steuern-Ad (Kundenlogo im Abspann, work.ts). */
  proof: {
    meta: ["Case", financeCase.sector],
    videoId: "steuern",
    caption: ["Social Ad", "Thema Steuern"] as [string, string],
    title: "Drei Themen, drei Kampagnen, 600 Leads.",
    text: financeCase.teaser,
    facts: [
      { k: "Kunde", v: displayClient(financeCase) },
      { k: "Themen", v: "Vorsorge, Krankenkasse, Steuern" },
      { k: "Laufzeit", v: "3 Monate" },
      { k: "Leads", v: "600 qualifizierte Leads" },
      { k: "Kosten pro Lead", v: "vorher 45–80 CHF, danach rund 10 CHF" },
      { k: "Messung", v: "Meta Pixel und Conversions API über Google Tag Manager Server-Side" },
    ],
    source: financeCaseSource,
    link: { label: "Ganzen Case lesen", href: `/cases/${financeCase.slug}` } satisfies LinkRef,
  },

  /** Was sonst dazugehört. */
  more: {
    meta: "Ausserdem",
    title: "Was sonst dazugehört.",
    items: [
      {
        title: "Zielgruppen",
        text: "Wir starten mit klaren Zielgruppen nach Region, Alter und Interessen. Das Video sortiert zusätzlich vor: Wer weiterschaut, fühlt sich angesprochen.",
      },
      {
        title: "Pixel und Conversions API",
        text: "Meta erfährt, wer angefragt oder einen Termin gebucht hat, auch wenn der Browser den Pixel blockiert. Ohne diese Rückmeldung optimiert die Plattform auf Klicks.",
        link: { label: "Wie wir messen", href: "/performance-marketing#tracking" } satisfies LinkRef,
      },
      {
        title: "Reporting",
        text: "Welches Video, welches Thema und welche Zielgruppe Anfragen bringen, und was wir als Nächstes testen. Zahlen mit einem nächsten Schritt.",
      },
      {
        title: "Werbebudget",
        text: `Kommt separat zum Honorar dazu. Als Richtwert für saubere Tests empfehlen wir ${budgetHint.range}.`,
        link: { label: "Potenzial berechnen", href: "/rechner" } satisfies LinkRef,
      },
    ],
  },

  faq: {
    meta: "Fragen",
    title: "Fragen zu Meta Ads.",
    items: [
      {
        q: "Was kosten Meta Ads mit eCreator?",
        a: `Meta Ads sind Teil des Pakets ${pro.name}: CHF ${pro.price.amount} pro Monat, ${pro.minTerm}. Darin sind auch ein monatlicher Content Shoot, Landingpages und CRM-Infrastruktur enthalten. Das Werbebudget kommt separat dazu, als Richtwert empfehlen wir ${budgetHint.range}.`,
      },
      {
        q: "Brauche ich professionelle Videos?",
        a: `Du brauchst Videos, die in den ersten Sekunden verständlich sind; Hochglanz ist nicht das Ziel. Wir drehen die Creatives selbst: im Paket ${pro.name} monatlich, einzeln über einen Content Day ab CHF ${dayFrom.price.amount}.`,
      },
      {
        q: "Lead-Formular oder Landingpage?",
        a: "Beides kann funktionieren, es hängt vom Angebot ab. Im Finanz-Case hat eine eigene Landingpage mit Vertrauenselementen besser konvertiert als das Lead-Formular von Meta; das ist ein Erfahrungswert aus einem Fall, keine Regel. Deshalb testen wir, wo es Sinn ergibt, beide Wege.",
      },
      {
        q: "Wie lange dauert es, bis Meta Ads Anfragen bringen?",
        a: "Dazu gibt es keine seriöse Zusage, weil Angebot, Zielgruppe und Budget mitentscheiden. Zuerst stehen Tracking, Videos und Landingpage, danach zeigen die wöchentlichen Tests, welche Botschaft funktioniert.",
      },
      {
        q: "Was ist die Conversions API?",
        a: "Die Conversions API (CAPI) ist eine Schnittstelle von Meta, über die deine Website oder dein CRM Ereignisse wie eine Anfrage direkt an Meta meldet, ohne Umweg über den Browser. So bekommt Meta auch dann Rückmeldung, wenn ein Werbeblocker den Pixel ausbremst.",
      },
    ] satisfies FaqEntry[],
  },

  related: [
    { label: "Performance Marketing", href: "/performance-marketing", text: "Alle Kanäle, der Kreislauf und wie wir messen." },
    { label: "Content Day", href: "/content-day", text: `Neue Videos für deine Ads. Ab CHF ${dayFrom.price.amount}.` },
    { label: "Google Ads", href: "/performance-marketing/google-ads", text: "Für Kundschaft, die schon aktiv sucht." },
  ] satisfies (LinkRef & { text: string })[],

  finalCta: {
    title: ["Welches Video", "bringt dir Kunden?"] as [string, string],
    text: "Im Strategie-Call schauen wir uns dein Angebot, deine bisherigen Ads und dein Tracking an. Du gehst mit einer Prioritätenliste für die nächsten vier Wochen raus.",
    secondary: { label: "Meta-Kampagne besprechen", href: "/kontakt?anliegen=performance" } satisfies LinkRef,
  },

  schema: {
    name: "Meta Ads (Facebook und Instagram)",
    serviceType: "Social-Media-Werbung",
    description:
      "Kampagnen auf Facebook und Instagram mit Video-Creatives aus eigener Produktion, Landingpages oder Lead-Formularen, Meta Pixel und Conversions API sowie wöchentlichem Creative-Testing. Werbebudget nicht inbegriffen.",
    offers: [
      {
        name: `Paket ${pro.name} (inkl. Meta / Social Ads)`,
        price: pro.price.amount.replace(/'/g, ""),
        unitText: "MON",
        description: `${pro.includes.join(", ")}. ${pro.minTerm}. Werbebudget separat.`,
      },
    ],
  },
};
