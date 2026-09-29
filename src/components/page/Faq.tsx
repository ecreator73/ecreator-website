import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/schema";

export type FaqItem = { q: string; a: string };

/**
 * FAQ als Liste mit details/summary (ohne JS bedienbar). Antworten sind kurz und
 * beantworten die Frage im ersten Satz (AEO). FAQPage-Schema nur, wenn schema=true.
 */
export function Faq({ items, schema = true, id = "faq" }: { items: FaqItem[]; schema?: boolean; id?: string }) {
  return (
    <>
      {schema && <JsonLd data={faqSchema(items)} />}
      <ul className="border-t border-ink" id={id}>
        {items.map((it, i) => (
          <li key={it.q} className="border-b border-line">
            <details className="group" open={i === 0}>
              <summary className="grid cursor-pointer grid-cols-[2.5rem_1fr_1.5rem] items-baseline gap-3 py-5 md:grid-cols-[3.5rem_1fr_2rem]">
                <span className="t-meta text-grey-600">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-h4">{it.q}</h3>
                <span aria-hidden className="t-meta justify-self-end text-grey-600 transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="grid grid-cols-[2.5rem_1fr_1.5rem] gap-3 pb-6 md:grid-cols-[3.5rem_1fr_2rem]">
                <p className="t-body col-start-2 max-w-[62ch] text-grey-700 [.studio_&]:text-grey-300">{it.a}</p>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </>
  );
}
