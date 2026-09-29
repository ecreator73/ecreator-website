import { pageMeta } from "@/lib/metadata";
import { datenschutzPage as p } from "@/content/pages/legal";
import { LegalDoc } from "../impressum/_legal/LegalDoc";

export const metadata = pageMeta(p.meta);

export default function DatenschutzPage() {
  return <LegalDoc page={p} />;
}
