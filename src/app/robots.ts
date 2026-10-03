import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { isVercelPreview } from "@/lib/preview";

/**
 * Rechtsseiten bleiben crawlbar (die alte Site sperrte sie und listete sie gleichzeitig in der Sitemap).
 * KI-Crawler sind ausdrücklich erlaubt (AEO-Ziel).
 * Vorschau auf Vercel: alles gesperrt, damit keine Kopie neben ecreator.ch im Index landet (siehe lib/preview.ts).
 */
export default function robots(): MetadataRoute.Robots {
  if (isVercelPreview) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "Google-Extended"], allow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
