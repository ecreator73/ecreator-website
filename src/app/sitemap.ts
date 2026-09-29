import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { allRoutes } from "@/content/routes";
import { insights } from "@/content/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const updated = new Map(insights.map((i) => [`/insights/${i.slug}`, new Date(i.updated ?? i.published)]));
  return allRoutes().map((r) => ({
    url: `${site.url}${r.path === "/" ? "" : r.path}`,
    lastModified: updated.get(r.path) ?? now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
