import type { ArticleContent } from "./types";
import { article as trackingWerbebudget } from "./tracking-werbebudget";
import { article as wasIstAeo } from "./was-ist-aeo";
import { article as metaOderGoogle } from "./meta-ads-oder-google-ads";
import { article as kleinesBudget } from "./performance-ads-kleines-budget";
import { article as contentDayVorbereiten } from "./content-day-vorbereiten";
import { article as socialRecruitingAblauf } from "./social-recruiting-ablauf";

export const articles: Record<string, ArticleContent> = {
  "tracking-werbebudget": trackingWerbebudget,
  "was-ist-aeo": wasIstAeo,
  "meta-ads-oder-google-ads": metaOderGoogle,
  "performance-ads-kleines-budget": kleinesBudget,
  "content-day-vorbereiten": contentDayVorbereiten,
  "social-recruiting-ablauf": socialRecruitingAblauf,
};

export type { ArticleContent };
