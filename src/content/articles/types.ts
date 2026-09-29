import type { Block } from "@/components/page/ArticleBody";

/** Inhalt eines Insights-Artikels. Metadaten (Titel, Datum, Kategorie) stehen in src/content/insights.ts. */
export type ArticleContent = {
  /** Kurzantwort, 2 bis 3 Sätze, beantwortet die Titelfrage direkt (AEO) */
  summary: string;
  /** «Das Wichtigste in Kürze», 3 bis 5 Punkte */
  takeaways: string[];
  blocks: Block[];
  /** Nur echte, verlinkbare Quellen. Keine erfundenen Studien. */
  sources?: { label: string; url: string }[];
  /** Autor:in nur mit Freigabe, sonst Redaktion */
  author?: string;
};
