import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/schema";

export type FaqItem = { q: string; a: string };

/**
 * FAQ als Karte mit details/summary (ohne JS bedienbar). Antworten sind kurz und
 * beantworten die Frage im ersten Satz (AEO). FAQPage-Schema nur, wenn schema=true.
 */
export function Faq({ items, schema = true, id = "faq" }: { items: FaqItem[]; schema?: boolean; id?: string }) {
  return (
    <>
      {schema && <JsonLd data={faqSchema(items)} />}
      <ul className="card px-5 md:px-8" id={id}>
        {items.map((it, i) => (
          <li key={it.q} className="border-b border-line last:border-b-0">
            <details className="group" open={i === 0}>
              <summary className="flex cursor-pointer items-center justify-between gap-4 py-5">
                <h3 className="t-h4">{it.q}</h3>
                <span
                  aria-hidden
                  className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-line-strong text-lg leading-none transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="t-body max-w-[62ch] pb-6 pr-10 text-grey-700 [.studio_&]:text-grey-300">{it.a}</p>
            </details>
          </li>
        ))}
      </ul>
    </>
  );
}
