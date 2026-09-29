/**
 * Seiten /insights und /insights/[slug] (Vertrag C16 in docs/PAGES.md).
 * Metadaten der Artikel (Titel, Datum, Kategorie) stehen in src/content/insights.ts,
 * die Artikeltexte in src/content/articles/*. Hier: Seitentexte, SEO-Titel, Zuordnungen.
 * Regeln: keine erfundenen Zahlen, Autor = eCreator Redaktion (FACTS N36), Proof nur aus cases.ts / work.ts.
 */
import type { Crumb } from "@/lib/schema";
import type { InsightCategory, InsightMeta } from "@/content/insights";
import { insights } from "@/content/insights";
import { articles } from "@/content/articles";
import type { Block } from "@/components/page/ArticleBody";
import { cta } from "@/content/site";
import { services } from "@/content/services";
import { contentDay } from "@/content/offers";

export type Link = { label: string; href: string; text?: string };

/* --------------------------------------------------------------------------
   Kategorien
   -------------------------------------------------------------------------- */

export type CategoryInfo = { id: string; title: string; text: string };

export const categoryInfo: Record<InsightCategory, CategoryInfo> = {
  Performance: {
    id: "performance",
    title: "Performance",
    text: "Meta Ads, Google Ads, Tracking und Budget: wie aus Werbegeld Anfragen werden.",
  },
  Content: {
    id: "content",
    title: "Content",
    text: "Drehtage, Formate und Vorbereitung: wie Material entsteht, das in Anzeigen und Feeds funktioniert.",
  },
  "Web & SEO": {
    id: "web-seo",
    title: "Web & SEO",
    text: "Websites, Landingpages und Suchmaschinen.",
  },
  "AI Search": {
    id: "ai-search",
    title: "AI Search",
    text: "Wie KI-Suchsysteme Quellen auswählen und was du dafür tun kannst.",
  },
  CRM: {
    id: "crm",
    title: "CRM",
    text: "Pipelines, Nachfassen und Automationen, damit keine Anfrage liegen bleibt.",
  },
  Recruiting: {
    id: "recruiting",
    title: "Recruiting",
    text: "Wie Bewerbungen über Instagram, Facebook und TikTok zustande kommen.",
  },
  Case: {
    id: "cases",
    title: "Cases",
    text: "Echte Projekte, mit Beleg und Quelle.",
  },
};

/** Reihenfolge im Hub. Leere Kategorien werden ausgeblendet. */
export const categoryOrder: InsightCategory[] = ["Performance", "Content", "AI Search", "Web & SEO", "CRM", "Recruiting"];

/* --------------------------------------------------------------------------
   Lesezeit aus dem tatsächlichen Text (200 Wörter pro Minute).
   Fällt auf insights.ts zurück, solange ein Artikel noch leer ist.
   -------------------------------------------------------------------------- */

const blockText = (b: Block): string[] => {
  switch (b.type) {
    case "ul":
    case "ol":
    case "checklist":
      return b.items;
    case "table":
      return [...b.head, ...b.rows.flat()];
    case "callout":
      return [b.title ?? "", b.text];
    case "quote":
      return [b.text];
    default:
      return [b.text];
  }
};

export function readingMinutes(meta: InsightMeta): number {
  const a = articles[meta.slug];
  if (!a || a.blocks.length === 0) return meta.readingMinutes;
  const text = [a.summary, ...a.takeaways, ...a.blocks.flatMap(blockText)]
    .join(" ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*/g, "");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export const hasContent = (slug: string) => (articles[slug]?.blocks.length ?? 0) > 0;

/** Artikel-Titel als gesetzte Zeilen: an Satzgrenzen trennen (max. 3). */
export function titleLines(title: string): string[] {
  const parts = title.split(/(?<=[.?!:])\s+/).filter(Boolean);
  if (parts.length <= 3) return parts;
  return [parts[0], parts[1], parts.slice(2).join(" ")];
}

/* --------------------------------------------------------------------------
   Verwandte Leistungen: Label und Kurztext pro Pfad
   -------------------------------------------------------------------------- */

const contentDay4h = contentDay.options.find((o) => o.id === "4h");

const extraLinks: Record<string, Omit<Link, "href">> = {
  "/performance-marketing/meta-ads": {
    label: "Meta Ads",
    text: "Kampagnen auf Facebook und Instagram, mit Video-Creatives, Conversions API und wöchentlichen Tests.",
  },
  "/performance-marketing/google-ads": {
    label: "Google Ads",
    text: "Suchkampagnen, die da sind, wenn jemand nach deinem Angebot sucht.",
  },
  "/content-day": {
    label: "Content Day",
    text: `Drehtag mit Videograf, Equipment und Schnitt${contentDay4h ? `, ab CHF ${contentDay4h.price.amount}` : ""}.`,
  },
  "/rechner": {
    label: "Potenzialrechner",
    text: "Budget, Kosten pro Anfrage und Abschlussquote eingeben, Ergebnis sofort sehen. Ohne Anmeldung.",
  },
  "/pakete": { label: "Pakete", text: "Pro und Advanced mit klaren Preisen pro Monat." },
  "/leistungen": { label: "Alle Leistungen", text: "Content, Ads, Web, SEO und CRM im Überblick." },
  "/cases": { label: "Cases", text: "Projekte, die man zeigen kann, mit Beleg." },
};

export function linkFor(href: string): Link {
  const s = services.find((x) => x.href === href);
  if (s) return { label: s.name, href, text: s.short };
  const e = extraLinks[href];
  return e ? { ...e, href } : { label: href, href };
}

/* --------------------------------------------------------------------------
   Hub /insights
   -------------------------------------------------------------------------- */

export const insightsHub = {
  meta: {
    title: "Insights: Ads, Tracking, Content und KI-Suche",
    description:
      "Ratgeber von eCreator zu Meta Ads, Google Ads, Tracking, Content Days, Social Recruiting und AEO. Konkret erklärt, mit Quellen und ohne erfundene Zahlen.",
    path: "/insights",
  },
  crumbs: [{ name: "Insights", path: "/insights" }] satisfies Crumb[],
  header: {
    meta: ["Insights", "Ratgeber", "Cases"],
    title: ["Was wir wissen."],
    lead: "Anleitungen und Einordnungen aus unserer Arbeit mit Werbung, Tracking, Content, Recruiting und KI-Suche. Kurz, konkret und so geschrieben, dass du danach etwas tun kannst.",
    principlesTitle: "So schreiben wir",
    principles: [
      { title: "Antwort zuerst.", text: "Jeder Artikel beginnt mit einer Kurzantwort auf die Titelfrage." },
      {
        title: "Keine erfundenen Zahlen.",
        text: "Fakten von Dritten sind mit Quelle verlinkt, Rechenbeispiele als solche gekennzeichnet.",
      },
      { title: "Datiert.", text: "Du siehst, wann ein Artikel erschienen ist und wann wir ihn zuletzt überarbeitet haben." },
    ],
  },
  filter: { label: "Kategorien" },
  featured: {
    slug: "tracking-werbebudget",
    label: "Leitartikel",
    summaryLabel: "Kurzantwort",
    takeawaysLabel: "Das Wichtigste",
    cta: "Artikel lesen",
  },
  index: { title: "Alle Artikel nach Thema", countLabel: (n: number) => (n === 1 ? "1 Artikel" : `${n} Artikel`) },
  cases: {
    lead: "Ratgeber erklären, wie es geht. Cases zeigen, wie es bei echten Kundinnen und Kunden umgesetzt wurde.",
    sourceNoteAnonymous: "Zahlen laut eCreator, Kunde dort anonymisiert.",
    more: { label: "Alle Cases", href: "/cases" },
    cta: "Case lesen",
  },
  glossary: {
    id: "begriffe",
    meta: ["Glossar"],
    title: "Begriffe, kurz erklärt.",
    lead: "Die Fachwörter, die in unseren Artikeln am häufigsten vorkommen, in einem Satz.",
    /** Linktext pro Ziel eindeutig (nicht 7× «Zum Artikel») */
    linkLabel: (href: string) => {
      const slug = href.replace("/insights/", "");
      const s = seoFor(slug);
      return s ? `Artikel: ${s.crumb}` : "Zum Artikel";
    },
    terms: [
      {
        k: "Conversions API",
        v: "Schnittstelle von Meta, über die dein Server Anfragen und Käufe direkt an Meta meldet, zusätzlich zum Pixel im Browser. Kurz CAPI.",
        href: "/insights/tracking-werbebudget",
      },
      {
        k: "Server-Side Tracking",
        v: "Messdaten laufen zuerst über einen Server, den du kontrollierst, bevor sie an Werbeplattformen weitergehen.",
        href: "/insights/tracking-werbebudget",
      },
      {
        k: "Deduplizierung",
        v: "Pixel und Server melden dieselbe Anfrage mit derselben Event-ID, damit sie nur einmal gezählt wird.",
        href: "/insights/tracking-werbebudget",
      },
      {
        k: "Schlüsselereignis",
        v: "In Google Analytics 4 eine Aktion, die für dein Geschäft zählt, etwa eine Anfrage. Früher hiess das dort Conversion.",
        href: "/insights/tracking-werbebudget",
      },
      {
        k: "Kosten pro Anfrage",
        v: "Werbebudget geteilt durch die Zahl der Anfragen. Englisch Cost per Lead, kurz CPL.",
        href: "/insights/performance-ads-kleines-budget",
      },
      {
        k: "Nachfrage erzeugen",
        v: "Menschen erreichen, bevor sie suchen, etwa mit Video im Feed. Das Gegenstück ist Nachfrage abholen, zum Beispiel mit Google Ads in der Suche.",
        href: "/insights/meta-ads-oder-google-ads",
      },
      {
        k: "AEO",
        v: "Answer Engine Optimization: Inhalte so aufbereiten, dass KI-Suchsysteme wie ChatGPT oder Perplexity sie verstehen und als Quelle nennen können.",
        href: "/insights/was-ist-aeo",
      },
    ],
  },
  related: {
    title: "Weiter zu",
    links: ["/leistungen", "/performance-marketing", "/rechner", "/pakete"],
  },
  finalSecondary: cta.contact,
};

/* --------------------------------------------------------------------------
   Artikel-Vorlage /insights/[slug]
   -------------------------------------------------------------------------- */

export type ArticleSeo = { crumb: string; title: string; description: string };

export type ArticleProof =
  | { kind: "case"; slug: string }
  | { kind: "video"; videoId: string; meta: string[]; title: string; text: string; link: Link };

export const articlePage = {
  root: { name: "Insights", path: "/insights" } satisfies Crumb,
  author: "eCreator Redaktion",
  labels: {
    category: "Kategorie",
    reading: "Lesezeit",
    minutes: (n: number) => `${n} Min`,
    published: "Veröffentlicht",
    updated: "Aktualisiert",
    author: "Autor",
    summary: "Kurzantwort",
    toc: "Inhalt",
    takeaways: "Das Wichtigste in Kürze.",
    sources: "Quellen",
    sourcesNote: "Abgerufen am 29.09.2026",
    proof: "Aus der Praxis",
    services: "Verwandte Leistungen",
    more: "Weiterlesen",
    caseLink: "Ganzen Case lesen",
  },
  pending: {
    meta: "In Überarbeitung",
    title: "Dieser Artikel wird gerade geschrieben.",
    todo: "Artikeltext folgt",
    back: { label: "Alle Insights", href: "/insights" },
  },
  seo: {
    "tracking-werbebudget": {
      crumb: "Tracking",
      title: "Tracking für Ads: So verbrennst du kein Budget",
      description:
        "Warum der Meta Pixel allein nicht reicht, wie Conversions API, Deduplizierung und GA4 zusammenspielen und was das revDSG in der Schweiz beim Tracking verlangt.",
    },
    "was-ist-aeo": {
      crumb: "Was ist AEO?",
      title: "Was ist AEO? Sichtbar in ChatGPT und AI Overviews",
      description:
        "Answer Engine Optimization erklärt: wie ChatGPT, Perplexity und Google AI Overviews Quellen auswählen und was du an Inhalten, Struktur und Daten ändern kannst.",
    },
    "meta-ads-oder-google-ads": {
      crumb: "Meta oder Google",
      title: "Meta Ads oder Google Ads: Was passt zu dir?",
      description:
        "Nachfrage erzeugen oder abholen: wann Meta Ads, wann Google Ads und wann beides zusammen sinnvoll ist. Mit Entscheidungsfragen und typischen Angeboten erklärt.",
    },
    "performance-ads-kleines-budget": {
      crumb: "Kleines Budget",
      title: "Performance Ads mit kleinem Budget: Ratgeber",
      description:
        "Was 3'000 Franken Werbebudget im Monat leisten können, wo kleine Budgets versickern und welches Fundament vor dem Start stehen muss. Ehrlich, ohne Versprechen.",
    },
    "content-day-vorbereiten": {
      crumb: "Content Day vorbereiten",
      title: "Content Day vorbereiten: Checkliste für den Dreh",
      description:
        "Was vor, während und nach einem Content Day passiert, was du vorbereiten solltest und wie du aus vier Stunden Dreh möglichst viel verwertbares Material holst.",
    },
    "social-recruiting-ablauf": {
      crumb: "Social Recruiting",
      title: "Social Recruiting: Bewerbungen über Social Media",
      description:
        "Wie Social Recruiting funktioniert, vom Recruiting-Video über die Kampagne bis zum Bewerber-System, und worin es sich von Stelleninseraten unterscheidet.",
    },
  } satisfies Record<string, ArticleSeo>,
  /** Zweit-CTA im FinalCta (Tabelle B: passendes Anliegen) */
  secondaryByCategory: {
    Performance: { label: "Performance besprechen", href: "/kontakt?anliegen=performance" },
    Content: cta.contentDay,
    "Web & SEO": { label: "SEO-Anfrage stellen", href: "/kontakt?anliegen=seo" },
    "AI Search": { label: "SEO-Anfrage stellen", href: "/kontakt?anliegen=seo" },
    CRM: cta.crm,
    Recruiting: cta.recruiting,
    Case: cta.contact,
  } satisfies Record<InsightCategory, { label: string; href: string }>,
  /** Proof pro Kategorie: nur belegtes Material aus cases.ts / work.ts */
  proofByCategory: {
    Performance: { kind: "case", slug: "finanzdienstleister-lead-generierung" },
    Content: { kind: "case", slug: "spitex-naechstenpflege" },
    "Web & SEO": { kind: "case", slug: "trapletti" },
    "AI Search": { kind: "case", slug: "trapletti" },
    CRM: { kind: "case", slug: "finanzdienstleister-lead-generierung" },
    Recruiting: {
      kind: "video",
      videoId: "ecreator",
      meta: ["Eigenes Ad", "Recruiting"],
      title: "Unser eigenes Ad zum Thema Recruiting.",
      text: "Mit diesem Video bewerben wir unser Recruiting-System bei Personalvermittlungen. Gedreht im eCreator-Büro vor der Logowand.",
      link: { label: "Social Recruiting ansehen", href: "/social-recruiting" },
    },
    Case: { kind: "case", slug: "finanzdienstleister-lead-generierung" },
  } satisfies Record<InsightCategory, ArticleProof>,
};

export const seoFor = (slug: string): ArticleSeo | undefined =>
  (articlePage.seo as Record<string, ArticleSeo>)[slug];

/** Weitere Artikel: zuerst dieselbe Kategorie, dann die neuesten. */
export function moreInsights(meta: InsightMeta, n = 2): InsightMeta[] {
  const others = insights.filter((i) => i.slug !== meta.slug);
  const same = others.filter((i) => i.category === meta.category);
  const rest = others
    .filter((i) => i.category !== meta.category)
    .sort((a, b) => (b.updated ?? b.published).localeCompare(a.updated ?? a.published));
  return [...same, ...rest].slice(0, n);
}
