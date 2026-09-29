import type { NextConfig } from "next";

/**
 * Weiterleitungen alte ecreator.ch-URLs → neue Informationsarchitektur.
 * Vollständige Begründung: migration-map.md
 * URL-Schema ohne Schrägstrich am Ende. Alte URLs mit Slash werden in EINEM Sprung weitergeleitet:
 * Legacy-Regeln akzeptieren beide Formen ({/}?), danach entfernt eine Auffangregel den Slash
 * (automatische Next-Weiterleitung ist deaktiviert, sonst entstünden zwei Sprünge).
 */
const legacyRedirects: { source: string; destination: string }[] = [
  // Leistungen
  { source: "/unsere-leistungen", destination: "/leistungen" },
  { source: "/webseite-erstellen-lassen", destination: "/webdesign" },
  // Conversion
  { source: "/termin-buchen", destination: "/strategie-call" },
  // Cases (vorher Blogbeiträge)
  {
    source: "/600-leads-in-3-monaten-a-10-chf-case-study-asset-management",
    destination: "/cases/finanzdienstleister-lead-generierung",
  },
  { source: "/von-0-auf-50-anfragen-monat", destination: "/insights/performance-ads-kleines-budget" },
  // Artikel
  {
    source: "/ohne-sauberes-tracking-verbrennst-du-werbebudget-so-fixst-du-es",
    destination: "/insights/tracking-werbebudget",
  },
  // Blog-Archive
  { source: "/blogs", destination: "/insights" },
  { source: "/blogs/page/:n", destination: "/insights" },
  { source: "/blog", destination: "/insights" },
  { source: "/category/blog", destination: "/insights" },
  { source: "/author/:name", destination: "/ueber-uns" },
  { source: "/2026", destination: "/insights" },
  { source: "/2026/:month", destination: "/insights" },
  { source: "/page/:n", destination: "/" },
  { source: "/feed", destination: "/insights" },
  { source: "/comments/feed", destination: "/insights" },
  // Von der alten Site referenzierte 404-URLs (Canonicals, JSON-LD, interne Links)
  { source: "/about", destination: "/ueber-uns" },
  { source: "/blog/case-study-asset-management-600-leads", destination: "/cases/finanzdienstleister-lead-generierung" },
  { source: "/blog/asset-management-600-leads", destination: "/cases/finanzdienstleister-lead-generierung" },
  { source: "/blog/schweizer-kmu-50-anfragen-3000-chf", destination: "/insights/performance-ads-kleines-budget" },
  { source: "/blog/tracking-werbebudget", destination: "/insights/tracking-werbebudget" },
];

const nextConfig: NextConfig = {
  trailingSlash: false,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      ...legacyRedirects.map((r) => ({ source: `${r.source}{/}?`, destination: r.destination, permanent: true })),
      // Auffangregel: /pfad/ → /pfad (ohne Dateien mit Punkt und ohne API)
      { source: "/:path((?!api/)[^.]*[^/.])/", destination: "/:path", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
      {
        source: "/work/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
