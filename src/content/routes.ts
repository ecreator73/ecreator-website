import { cases } from "./cases";
import { insights } from "./insights";

/** Zentrales Routen-Register: Basis für sitemap.xml, llms.txt und QA-Skripte. */
export type RouteEntry = { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" };

export const staticRoutes: RouteEntry[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/leistungen", priority: 0.9, changeFrequency: "monthly" },
  { path: "/performance-marketing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/performance-marketing/meta-ads", priority: 0.8, changeFrequency: "monthly" },
  { path: "/performance-marketing/google-ads", priority: 0.8, changeFrequency: "monthly" },
  { path: "/content-produktion", priority: 0.9, changeFrequency: "monthly" },
  { path: "/content-day", priority: 0.9, changeFrequency: "monthly" },
  { path: "/podcast-studio", priority: 0.8, changeFrequency: "monthly" },
  { path: "/social-media", priority: 0.8, changeFrequency: "monthly" },
  { path: "/webdesign", priority: 0.9, changeFrequency: "monthly" },
  { path: "/seo", priority: 0.8, changeFrequency: "monthly" },
  { path: "/ai-search", priority: 0.8, changeFrequency: "monthly" },
  { path: "/crm-automation", priority: 0.8, changeFrequency: "monthly" },
  { path: "/social-recruiting", priority: 0.9, changeFrequency: "monthly" },
  { path: "/pakete", priority: 0.9, changeFrequency: "monthly" },
  { path: "/cases", priority: 0.8, changeFrequency: "monthly" },
  { path: "/insights", priority: 0.7, changeFrequency: "weekly" },
  { path: "/ueber-uns", priority: 0.7, changeFrequency: "monthly" },
  { path: "/marketingagentur-zuerich", priority: 0.7, changeFrequency: "monthly" },
  { path: "/rechner", priority: 0.5, changeFrequency: "yearly" },
  { path: "/strategie-call", priority: 0.8, changeFrequency: "monthly" },
  { path: "/kontakt", priority: 0.7, changeFrequency: "yearly" },
  { path: "/impressum", priority: 0.2, changeFrequency: "yearly" },
  { path: "/datenschutz", priority: 0.2, changeFrequency: "yearly" },
  { path: "/agb", priority: 0.2, changeFrequency: "yearly" },
];

export const dynamicRoutes = (): RouteEntry[] => [
  ...cases.map((c) => ({ path: `/cases/${c.slug}`, priority: 0.7, changeFrequency: "monthly" as const })),
  ...insights.map((i) => ({ path: `/insights/${i.slug}`, priority: 0.6, changeFrequency: "monthly" as const })),
];

export const allRoutes = () => [...staticRoutes, ...dynamicRoutes()];
