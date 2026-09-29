import { pageMeta } from "@/lib/metadata";
import { agbPage as p } from "@/content/pages/legal";
import { LegalDoc } from "../impressum/_legal/LegalDoc";

export const metadata = pageMeta(p.meta);

export default function AgbPage() {
  return <LegalDoc page={p} />;
}
