import type { Metadata } from "next";
import { site } from "@/content/site";

type PageMetaInput = {
  /** Seitentitel ohne Marke (Template ergänzt « · eCreator») */
  title: string;
  description: string;
  path: string;
  /** Titel exakt so verwenden (ohne Template) */
  absoluteTitle?: boolean;
  noindex?: boolean;
  ogType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

/** Einheitliche Metadaten: Title, Description, Canonical, Open Graph, Twitter. */
export function pageMeta({
  title,
  description,
  path,
  absoluteTitle,
  noindex,
  ogType = "website",
  publishedTime,
  modifiedTime,
}: PageMetaInput): Metadata {
  const url = `${site.url}${path === "/" ? "" : path}`;
  const fullTitle = absoluteTitle ? title : `${title} · eCreator`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: ogType,
      url,
      title: fullTitle,
      description,
      siteName: site.name,
      locale: "de_CH",
      ...(ogType === "article" && publishedTime ? { publishedTime, modifiedTime: modifiedTime ?? publishedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
