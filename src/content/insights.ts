/**
 * Insights: Wissen, Anleitungen, Cases. Artikel-Inhalte liegen in src/content/articles/*.
 * Regeln: keine erfundenen Zahlen, keine anonymen «Praxisbeispiele» als Beleg,
 * Autor:innen nur mit Freigabe. Bis dahin Autor = eCreator Redaktion.
 */

export type InsightCategory = "Performance" | "Content" | "Web & SEO" | "AI Search" | "CRM" | "Recruiting" | "Case";

export type InsightMeta = {
  slug: string;
  title: string;
  description: string;
  category: InsightCategory;
  readingMinutes: number;
  published: string;
  updated?: string;
  related: string[];
  legacyUrl?: string;
};

export const insights: InsightMeta[] = [
  {
    slug: "tracking-werbebudget",
    title: "Ohne sauberes Tracking verbrennst du Werbebudget. So fixst du es.",
    description:
      "Welche Tracking-Fehler Werbebudget kosten, warum Pixel allein nicht mehr reicht und wie ein sauberes Setup mit Conversion API und Server-Side Tracking aussieht.",
    category: "Performance",
    readingMinutes: 8,
    published: "2026-02-22",
    updated: "2026-09-29",
    related: ["/performance-marketing", "/performance-marketing/meta-ads"],
    legacyUrl: "/ohne-sauberes-tracking-verbrennst-du-werbebudget-so-fixst-du-es/",
  },
  {
    slug: "was-ist-aeo",
    title: "Was ist AEO? Sichtbar werden in ChatGPT, Perplexity und Google AI Overviews.",
    description:
      "Answer Engine Optimization erklärt: wie KI-Suchsysteme Quellen auswählen und was Schweizer Unternehmen an Inhalten, Struktur und Daten jetzt anpassen sollten.",
    category: "AI Search",
    readingMinutes: 7,
    published: "2026-09-29",
    related: ["/ai-search", "/seo"],
  },
  {
    slug: "meta-ads-oder-google-ads",
    title: "Meta Ads oder Google Ads: Was passt zu deinem Angebot?",
    description:
      "Nachfrage erzeugen oder Nachfrage abholen: wann Meta Ads, wann Google Ads und wann beides zusammen sinnvoll ist, erklärt an typischen Angeboten.",
    category: "Performance",
    readingMinutes: 6,
    published: "2026-09-29",
    related: ["/performance-marketing/meta-ads", "/performance-marketing/google-ads"],
  },
  {
    slug: "performance-ads-kleines-budget",
    title: "Performance Ads mit kleinem Budget: Worauf es bei 3'000 Franken im Monat ankommt.",
    description:
      "Warum ein kleines Werbebudget funktionieren kann, wenn Angebot, Creative, Landingpage und Tracking stimmen, und wo es typischerweise versickert.",
    category: "Performance",
    readingMinutes: 7,
    published: "2026-02-22",
    updated: "2026-09-29",
    related: ["/performance-marketing", "/rechner"],
    legacyUrl: "/von-0-auf-50-anfragen-monat/",
  },
  {
    slug: "content-day-vorbereiten",
    title: "Content Day vorbereiten: Die Checkliste für einen Drehtag, der sich lohnt.",
    description:
      "Was vor, während und nach einem Content Day passiert, was du vorbereiten solltest und wie aus vier Stunden Dreh Material für Wochen wird.",
    category: "Content",
    readingMinutes: 6,
    published: "2026-09-29",
    related: ["/content-day", "/content-produktion"],
  },
  {
    slug: "social-recruiting-ablauf",
    title: "Social Recruiting: So kommen Bewerbungen über Instagram und TikTok.",
    description:
      "Wie Social Recruiting funktioniert, vom Recruiting-Video über die Kampagne bis zum Bewerber-System, und was es von Stelleninseraten unterscheidet.",
    category: "Recruiting",
    readingMinutes: 6,
    published: "2026-09-29",
    related: ["/social-recruiting", "/content-day"],
  },
];

export const insightBySlug = (slug: string) => insights.find((i) => i.slug === slug);

export const formatDate = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("de-CH", { day: "2-digit", month: "2-digit", year: "numeric" });
