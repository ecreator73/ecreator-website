import Link from "next/link";
import { formatDate, insights, type InsightMeta } from "@/content/insights";
import { Arrow } from "@/components/ui/ButtonLink";

/** Insights als redaktioneller Index: Kategorie, Titel, Lesezeit. Keine Bild-Cards. */
export function InsightsList({ items = insights.slice(0, 4), headingLevel = "h3" }: { items?: InsightMeta[]; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <ul className="border-t border-ink">
      {items.map((it) => (
        <li key={it.slug} className="border-b border-line">
          <Link
            href={`/insights/${it.slug}`}
            className="group grid grid-cols-4 items-baseline gap-x-[var(--gutter)] gap-y-2 py-6 md:grid-cols-12"
          >
            <span className="t-meta col-span-2 text-grey-600 md:col-span-2">{it.category}</span>
            <span className="t-meta col-span-2 text-right text-grey-600 md:order-last md:col-span-2">
              {it.readingMinutes} Min / {formatDate(it.published)}
            </span>
            <H className="t-h3 col-span-4 transition-colors group-hover:text-grey-600 md:col-span-7">{it.title}</H>
            <Arrow className="col-span-4 hidden h-3 w-5 justify-self-end text-grey-500 transition-transform group-hover:translate-x-1 group-hover:text-ink md:col-span-1 md:block" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
