/**
 * Seite /ai-search (Vertrag C11 in docs/PAGES.md).
 * Aussagen zu Google, OpenAI und Perplexity nur aus deren eigener Dokumentation
 * (Quellen im Insight «Was ist AEO?», abgerufen 29.09.2026). Keine Statistiken,
 * keine Versprechen zu Nennungen in KI-Antworten (AGB Ziff. 11), keine erfundenen Resultate.
 * Die Beispiel-Frage ist ausdrücklich ein Beispiel, kein Kunde und keine echte Suchanfrage.
 */
import type { FaqItem } from "@/components/page/Faq";
import type { Crumb } from "@/lib/schema";
import { packages } from "@/content/offers";
import { caseBySlug } from "@/content/cases";
import { insightBySlug } from "@/content/insights";
import { serviceBySlug } from "@/content/services";
import { webProjects } from "@/content/work";

const advanced = packages.find((p) => p.id === "advanced")!;
const spitex = webProjects.find((w) => w.id === "naechstenpflege")!;
const spitexCase = caseBySlug("spitex-naechstenpflege")!;
const aeoInsight = insightBySlug("was-ist-aeo")!;

const host = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

export type Link = { label: string; href: string; text?: string };

/** Teil der Beispiel-Frage. ref = Nummer des Bausteins, der diesen Teil abdeckt. */
export type QuestionPart = { t: string; ref?: number };

export type AiSearchPage = {
  meta: { title: string; description: string; path: string };
  service: { name: string; serviceType: string; description: string };
  header: {
    crumbs: Crumb[];
    meta: string[];
    title: string[];
    lead: string;
    anchor: Link;
    facts: { k: string; v: string }[];
  };
  definition: { term: string; text: string; also: string; link: Link };
  question: {
    id: string;
    label: string;
    parts: QuestionPart[];
    title: string;
    lead: string;
    blocks: { title: string; text: string; alias: string }[];
  };
  difference: {
    meta: string[];
    title: string;
    lead: string;
    source: Link;
    head: [string, string, string];
    rows: [string, string, string][];
    link: Link;
  };
  approach: { meta: string[]; title: string; lead: string; steps: { title: string; text: string }[] };
  refusals: { intro: string; items: string[]; text: string };
  proof: {
    meta: string[];
    title: [string, string];
    text: string;
    facts: { k: string; v: string }[];
    note: string;
    image: { src: string; alt: string };
    caption: string;
    caseLink: Link;
    siteLink: Link;
  };
  faq: { meta: string[]; title: string; items: FaqItem[] };
  related: Link[];
  finalCta: { title: [string, string]; text: string; secondary: { label: string; href: string } };
};

export const aiSearchPage: AiSearchPage = {
  meta: {
    title: "AEO Agentur Schweiz: sichtbar in ChatGPT & Co.",
    description:
      "AEO aus dem Kanton Zürich: Inhalte, Firmenangaben und strukturierte Daten, damit ChatGPT, Perplexity und Google AI Overviews dich finden und verstehen können.",
    path: "/ai-search",
  },

  service: {
    name: "AEO / AI Search",
    serviceType: "Answer Engine Optimization (AEO)",
    description:
      "Answer Engine Optimization für Schweizer KMU: Zugang für KI-Crawler, Inhalte als direkte Antworten, eindeutige Firmenangaben, strukturierte Daten und Messung. Ohne Garantie für Nennungen.",
  },

  header: {
    crumbs: [
      { name: "Leistungen", path: "/leistungen" },
      { name: "AEO / AI Search", path: "/ai-search" },
    ],
    meta: ["Leistung", "Answer Engine Optimization"],
    title: ["Gefunden werden,", "auch wenn eine", "KI antwortet."],
    lead:
      "Wer ChatGPT oder Perplexity eine Frage stellt, bekommt eine formulierte Antwort mit wenigen Quellen, keine Liste mit zehn Links. Auch Google blendet bei manchen Suchen eine KI-Übersicht ein. Wir sorgen dafür, dass solche Systeme dein Unternehmen lesen, verstehen und als Quelle heranziehen können.",
    anchor: { label: "Was eine KI braucht", href: "#bausteine" },
    facts: [
      { k: "Für", v: "ChatGPT, Perplexity, Google AI Overviews" },
      { k: "Grundlage", v: "SEO, darauf baut AEO auf" },
      { k: "Als Projekt", v: "Preis nach Umfang, wir klären ihn im Gespräch" },
      { k: "Garantie", v: "Keine Garantie für Nennungen" },
    ],
  },

  definition: {
    term: "Answer Engine Optimization (AEO)",
    text: "AEO heisst, deine Website so aufzubereiten, dass KI-Suchsysteme wie ChatGPT, Perplexity und Google AI Overviews dein Unternehmen finden, verstehen und als Quelle nennen können. Eine Antwortmaschine (englisch Answer Engine) ist ein Suchsystem, das selbst eine Antwort formuliert und dafür Quellen aus dem Web heranzieht. Die Grundlage bleibt SEO, die Suchmaschinenoptimierung.",
    also: "Auch genannt: AI Search Optimierung, GEO",
    link: { label: "Insight: Was ist AEO?", href: `/insights/${aeoInsight.slug}` },
  },

  question: {
    id: "bausteine",
    label: "Beispiel einer Frage an ChatGPT, Perplexity oder Google",
    parts: [
      { t: "Welche " },
      { t: "Treuhandfirma", ref: 2 },
      { t: " " },
      { t: "im Zürcher Unterland", ref: 3 },
      { t: " hilft " },
      { t: "Selbstständigen", ref: 4 },
      { t: " bei der " },
      { t: "Steuererklärung", ref: 2 },
      { t: "?" },
    ],
    title: "Was eine KI braucht, um dich zu nennen.",
    lead: "Eine Antwort hat Platz für wenige Namen. Welche Seiten am Ende genannt werden, entscheidet ein Sprachmodell, und kein Anbieter legt seine Auswahl ganz offen. Diese Bausteine machen es wahrscheinlicher, dass deine Seite überhaupt in Frage kommt.",
    blocks: [
      {
        title: "Zugang",
        alias: "Crawling, Indexierung",
        text: "Eine Maschine kann nur nennen, was sie lesen darf. Bei Google heisst das: Die Seite ist indexiert und darf mit Textauszug erscheinen. Bei ChatGPT und Perplexity regelt die Datei robots.txt, ob deren Crawler hinein dürfen, also die Programme, die Websites automatisch abrufen.",
      },
      {
        title: "Leistung, klar benannt",
        alias: "Content-Architektur",
        text: "Eine eigene Seite pro Leistung, mit den Worten, die deine Kundschaft verwendet. Nicht «Finanzlösungen», sondern «Steuererklärung für Selbstständige».",
      },
      {
        title: "Ort, eindeutig",
        alias: "Local",
        text: "Wo du arbeitest, steht als Text auf der Website und ist überall gleich geschrieben: Website, Google-Unternehmensprofil, Verzeichnisse.",
      },
      {
        title: "Für wen, direkt beantwortet",
        alias: "Antwort zuerst",
        text: "Für wen ist das Angebot, was kostet es, wie läuft es ab? Die Frage als Zwischentitel, die Antwort im ersten Satz darunter. So findet die Maschine den Abschnitt, den sie übernehmen kann.",
      },
      {
        title: "Dein Unternehmen als Entität",
        alias: "Entity Signals, Structured Data",
        text: "Eine Entität ist etwas eindeutig Bestimmbares, zum Beispiel deine Firma. Name, Adresse, Leistungen und Personen stimmen auf allen Kanälen überein. Dazu strukturierte Daten, also maschinenlesbare Angaben im Quelltext, die zum sichtbaren Text passen.",
      },
      {
        title: "Erwähnungen",
        alias: "Brand Authority",
        text: "Eine Antwortmaschine liest nicht nur, was du über dich selbst sagst. Einträge in Verzeichnissen, Bewertungen und Fachbeiträge stützen das Bild, das deine Website zeichnet.",
      },
    ],
  },

  difference: {
    meta: ["AEO und SEO"],
    title: "Ohne SEO kein AEO.",
    lead: "AEO ersetzt SEO nicht, es baut darauf auf. Google schreibt in seiner Dokumentation, dass für AI Overviews dieselben Grundlagen gelten wie für die normale Suche. Neu ist der Blickwinkel: weg vom einzelnen Suchbegriff, hin zu Frage, Antwort und dem Unternehmen dahinter.",
    source: {
      label: "Google Search Central: KI-Funktionen und deine Website",
      href: "https://developers.google.com/search/docs/appearance/ai-features?hl=de",
    },
    head: ["Aspekt", "SEO", "AEO"],
    rows: [
      ["Ziel", "Ein guter Platz in der Trefferliste", "Als Quelle in einer KI-Antwort genannt werden"],
      ["Was man sieht", "Eine Liste von Links, du wählst selbst", "Eine formulierte Antwort mit wenigen Quellen"],
      ["Worum es geht", "Seite und Suchbegriff", "Frage, Antwort und das Unternehmen dahinter"],
      ["Grundlage", "Crawling, Indexierung, Inhalte, Verlinkung", "Dasselbe, plus direkte Antworten und eindeutige Firmenangaben"],
      ["Messung", "Rankings, Klicks, Search Console", "Crawler-Zugriffe, Besuche aus KI-Tools, Stichproben"],
    ],
    link: { label: "Zur Seite SEO", href: "/seo" },
  },

  approach: {
    meta: ["Vorgehen"],
    title: "Was wir konkret machen.",
    lead: "Vier Schritte. Das meiste ist solides SEO-Handwerk, mit einem klaren Fokus auf Antworten.",
    steps: [
      {
        title: "Zugang prüfen",
        text: "Indexierung in der Google Search Console, dazu robots.txt und Firewall: Dürfen Googlebot, OAI-SearchBot von OpenAI und PerplexityBot deine Seiten abrufen?",
      },
      {
        title: "Fragen sammeln",
        text: "Die Fragen, die im Verkauf und im Kundendienst kommen. Und eine erste Stichprobe: Welche Quellen nennen ChatGPT, Perplexity und Google heute dazu?",
      },
      {
        title: "Antworten und Daten bauen",
        text: "Antworten auf den passenden Seiten, direkt im ersten Satz. Firmenangaben überall gleich. Strukturierte Daten, die zum Text passen.",
      },
      {
        title: "Messen",
        text: "Crawler-Zugriffe in den Server-Logs, Besuche aus KI-Tools in der Webanalyse und dieselbe Stichprobe in Abständen, damit Veränderungen sichtbar werden.",
      },
    ],
  },

  refusals: {
    intro: "Was du von uns nicht bekommst:",
    items: ["Garantierte Nennungen.", "Versteckte Anweisungen an KI.", "Texte für Maschinen."],
    text: "Ob und wie eine Antwortmaschine dein Unternehmen nennt, entscheidet der Anbieter, und Antworten können sich von Anfrage zu Anfrage unterscheiden. Das gilt für uns wie für jede andere Agentur. Wir verbessern die Voraussetzungen und zeigen dir, was sich messbar verändert.",
  },

  proof: {
    meta: ["Beispiel", "Webprojekt"],
    title: ["Was, für wen, wo.", "Ohne zu scrollen."],
    text: `Die Website von ${spitex.client} beantwortet im ersten Bildschirm die drei Fragen, die auch eine Antwortmaschine zuerst klären muss.`,
    facts: [
      { k: "Was", v: "Angehörigenpflege mit Entlöhnung" },
      { k: "Für wen", v: "Menschen, die Angehörige zuhause pflegen" },
      { k: "Wo", v: "Zürich, Aargau und Schaffhausen" },
      { k: "Beleg", v: spitex.evidence },
    ],
    note: "Das Beispiel zeigt, wie wir Seiten aufbauen. Es behauptet keine Nennung in KI-Antworten.",
    image: {
      src: spitex.mobile,
      alt: `Website ${spitex.client} auf dem Handy: Titel «Angehörigenpflege mit Entlöhnung», darunter die Regionen Zürich, Aargau und Schaffhausen und der Button «Jetzt anmelden»`,
    },
    caption: `Website / ${host(spitex.url)} / Mobile`,
    caseLink: { label: "Case ansehen", href: `/cases/${spitexCase.slug}` },
    siteLink: { label: host(spitex.url), href: spitex.url },
  },

  faq: {
    meta: ["Fragen"],
    title: "Fragen zu AEO.",
    items: [
      {
        q: "Was ist AEO?",
        a: "AEO (Answer Engine Optimization) heisst, deine Website so aufzubereiten, dass KI-Suchsysteme wie ChatGPT, Perplexity und Google AI Overviews dein Unternehmen finden, verstehen und als Quelle nennen können. Dazu gehören direkte Antworten im Text, eindeutige Firmenangaben und strukturierte Daten, aufgebaut auf solider SEO.",
      },
      {
        q: "Könnt ihr garantieren, dass ChatGPT mein Unternehmen nennt?",
        a: "Nein. Ob und wie eine Antwortmaschine dein Unternehmen nennt, entscheidet der Anbieter, und Antworten können sich von Anfrage zu Anfrage unterscheiden. Wir verbessern die Voraussetzungen und zeigen dir, was sich messbar verändert.",
      },
      {
        q: "Ersetzt AEO die klassische SEO?",
        a: "Nein, AEO baut auf SEO auf. Laut Google gelten für AI Overviews dieselben technischen Grundlagen wie für die normale Suche. AEO ergänzt sie um Inhalte, die Fragen direkt beantworten, und um eindeutige Angaben zu deinem Unternehmen.",
      },
      {
        q: "Brauche ich eine llms.txt-Datei?",
        a: "Nein, dafür gibt es keinen Grund. Die Datei llms.txt ist ein Vorschlag aus der Entwickler-Community, kein anerkannter Standard, und Google schreibt, dass für die KI-Funktionen der Suche keine neuen maschinenlesbaren Dateien nötig sind.",
      },
      {
        q: "Wie misst man, ob AEO wirkt?",
        a: "Nur teilweise, denn ein Konto mit allen Nennungen gibt es nicht. Messbar sind Crawler-Zugriffe in den Server-Logs, Besuche aus ChatGPT oder Perplexity in der Webanalyse und Klicks aus Google AI Overviews, die die Search Console zum normalen Suchtraffic zählt. Dazu kommen regelmässige Stichproben mit den wichtigsten Fragen deiner Kundschaft.",
      },
      {
        q: "Was kostet AEO bei eCreator?",
        a: `Als Projekt richtet sich der Preis nach Umfang und Zustand deiner Website, den klären wir im Gespräch. SEO, die Grundlage für AEO, ist im Paket ${advanced.name} enthalten (CHF ${advanced.price.amount} ${advanced.price.unit}, ${advanced.minTerm}).`,
      },
    ],
  },

  related: [
    {
      label: "Was ist AEO?",
      href: `/insights/${aeoInsight.slug}`,
      text: "Der ausführliche Artikel: Antwortmaschinen, Bausteine, Messung und der Einstieg in fünf Schritten.",
    },
    { label: "SEO", href: "/seo", text: serviceBySlug("seo")?.short },
    { label: "Webdesign & Development", href: "/webdesign", text: serviceBySlug("webdesign")?.short },
    { label: "Pakete", href: "/pakete", text: `SEO ist im Paket ${advanced.name} enthalten.` },
  ],

  finalCta: {
    title: ["Was liest eine KI", "über dich?"],
    text: "Kostenlos, per Video-Call. Wir schauen uns an, wie deine Website heute gelesen wird, was fehlt und was sich zuerst lohnt. Du gehst mit einer Prioritätenliste raus.",
    secondary: { label: "SEO / AEO besprechen", href: "/kontakt?anliegen=seo" },
  },
};
