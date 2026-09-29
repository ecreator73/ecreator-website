import { pageMeta } from "@/lib/metadata";
import { impressumPage as p } from "@/content/pages/legal";
import { LegalDoc } from "./_legal/LegalDoc";

export const metadata = pageMeta(p.meta);

export default function ImpressumPage() {
  return <LegalDoc page={p} />;
}
