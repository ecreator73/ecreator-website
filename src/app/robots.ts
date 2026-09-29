import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * Rechtsseiten bleiben crawlbar (die alte Site sperrte sie und listete sie gleichzeitig in der Sitemap).
 * KI-Crawler sind ausdrücklich erlaubt (AEO-Ziel).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "Google-Extended"], allow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
