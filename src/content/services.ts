import type { TrackId } from "./system";

/**
 * Leistungen (Übersicht). Detailinhalte je Seite liegen in src/content/pages/*.
 * Leistungsumfang laut Briefing, keine zusätzlichen Leistungen erfinden.
 */

export type ServiceSummary = {
  slug: string;
  href: string;
  n: string;
  name: string;
  /** ein Satz, konkret */
  short: string;
  tags: string[];
  track: TrackId;
  group: "nachfrage" | "gefunden" | "infrastruktur" | "produktion" | "produkt";
  /** Vorschau-Medium für den Leistungs-Index (nur echtes Material) */
  preview?: { type: "video"; src: string; poster: string } | { type: "image"; src: string };
};

export const services: ServiceSummary[] = [
  {
    slug: "performance-marketing",
    href: "/performance-marketing",
    n: "01",
    name: "Performance Marketing",
    short: "Kampagnen auf Meta, Google, TikTok und LinkedIn, die auf Anfragen und Kunden optimiert sind, nicht auf Klicks.",
    tags: ["Meta", "Google", "TikTok", "LinkedIn", "Tracking"],
    track: "ads",
    group: "nachfrage",
    preview: { type: "video", src: "/work/steuern-short.mp4", poster: "/work/steuern-poster.jpg" },
  },
  {
    slug: "content-produktion",
    href: "/content-produktion",
    n: "02",
    name: "Content-Produktion",
    short: "Wir planen, drehen und schneiden: Social-Videos, Ads, Kundenvideos (UGC), Testimonials, Recruiting- und Unternehmensvideos.",
    tags: ["Content Day", "Videograf", "Models", "Schnitt", "Skripte"],
    track: "content",
    group: "produktion",
    preview: { type: "video", src: "/work/ecreator-ad-short.mp4", poster: "/work/ecreator-ad-poster.jpg" },
  },
  {
    slug: "webdesign",
    href: "/webdesign",
    n: "03",
    name: "Webdesign & Development",
    short: "Websites und Landingpages, die schnell laden, verständlich sind und Anfragen bringen. WordPress, Elementor, Shopify oder individuell.",
    tags: ["Websites", "Landingpages", "Nutzerführung", "Conversion-Optimierung", "Schnittstellen"],
    track: "web",
    group: "infrastruktur",
    preview: { type: "image", src: "/work/trapletti-desktop.webp" },
  },
  {
    slug: "seo",
    href: "/seo",
    n: "04",
    name: "SEO",
    short: "Technisches SEO, Onpage, Content und Local SEO, damit du bei Google gefunden wirst, wenn jemand sucht.",
    tags: ["Technik", "Onpage", "Inhalte", "Lokal", "Strukturierte Daten"],
    track: "web",
    group: "gefunden",
  },
  {
    slug: "ai-search",
    href: "/ai-search",
    n: "05",
    name: "AEO / AI Search",
    short: "Damit ChatGPT, Perplexity und Google AI Overviews dein Unternehmen verstehen und als Quelle nennen können.",
    tags: ["Antwortmaschinen", "Entitäten", "Strukturierte Daten", "Inhalte"],
    track: "web",
    group: "gefunden",
  },
  {
    slug: "crm-automation",
    href: "/crm-automation",
    n: "06",
    name: "CRM & Automation",
    short: "Individuelle CRM-Systeme, Pipelines, Nachfassen per E‑Mail und WhatsApp, Terminprozesse und Dashboards.",
    tags: ["Lead-Management", "Pipelines", "Automationen", "Dashboards", "Kundenportale"],
    track: "crm",
    group: "infrastruktur",
  },
  {
    slug: "social-media",
    href: "/social-media",
    n: "07",
    name: "Social Media",
    short: "Strategie, Content-Planung, Produktion und Social Ads für Instagram, Facebook, TikTok und LinkedIn.",
    tags: ["Strategie", "Planung", "Produktion", "Social Ads"],
    track: "content",
    group: "nachfrage",
    preview: { type: "video", src: "/work/pflegezukunft-short.mp4", poster: "/work/pflegezukunft-poster.jpg" },
  },
  {
    slug: "social-recruiting",
    href: "/social-recruiting",
    n: "08",
    name: "Social Recruiting",
    short: "Neue Mitarbeitende über Instagram, Facebook und TikTok: Content Day, Kampagnen und ein Bewerber-System. CHF 5'900.",
    tags: ["Content Day", "Meta", "TikTok", "Bewerber-CRM"],
    track: "crm",
    group: "produkt",
    preview: { type: "video", src: "/work/naechstenpflege-short.mp4", poster: "/work/naechstenpflege-poster.jpg" },
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
