import { PageHeader } from "@/components/page/PageHeader";
import { Section, SectionIntro, FactsTable, RelatedLinks } from "@/components/page/Blocks";
import { Faq } from "@/components/page/Faq";
import { FinalCta } from "@/components/blocks/FinalCta";
import { ArrowLink } from "@/components/ui/ButtonLink";
import { Rechner } from "@/components/pages/Rechner";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta } from "@/lib/metadata";
import { withAccent } from "@/lib/accent";
import { rechnerPage as p } from "@/content/pages/rechner";

export const metadata = pageMeta(p.meta);

/** Datenblatt in einer Karte: ohne kräftige Linie oben und ohne Linie unter der letzten Zeile */
const factsInCard = "[&>dl]:border-t-0 [&>dl>div:last-child]:border-b-0";

export default function RechnerPage() {
  return (
    <>
      <JsonLd data={p.schema} />

      <PageHeader
        crumbs={p.crumbs}
        meta={p.header.meta}
        title={p.header.title}
        lead={p.header.lead}
        aside={
          <div className={factsInCard}>
            <FactsTable caption={p.header.formulaCaption} rows={p.header.formula} />
          </div>
        }
      />

      {/* Der Rechner: zwei Karten auf grauem Band, Annahmen links, Rechnung rechts */}
      <Section id={p.calc.id} mode="band" space="m" rule="none" labelledBy="rechnen-title">
        <h2 id="rechnen-title" className="sr-only">
          {p.calc.title}
        </h2>
        <Rechner copy={p.calc} />
      </Section>

      {/* Grenzen: was in keiner Formel steht, als Karten, dazu die AGB-Leitplanke wörtlich */}
      <Section space="l" rule="none" labelledBy="grenzen-title">
        <SectionIntro id="grenzen-title" meta={p.limits.meta} title={withAccent(p.limits.title, "nicht weiss")}>
          {p.limits.text}
        </SectionIntro>
        <ul className="mx-auto grid max-w-[64rem] gap-4 md:grid-cols-2 md:gap-5">
          {p.limits.items.map((it) => (
            <li key={it.title} className="card p-6 md:p-8">
              <h3 className="t-h4">{it.title}</h3>
              <p className="t-small mt-2 max-w-[52ch] text-grey-700">{it.text}</p>
            </li>
          ))}
        </ul>
        <figure className="mx-auto mt-12 max-w-[46rem] text-center md:mt-16">
          <blockquote className="t-h4 text-grey-700">«{p.limits.agb.quote}»</blockquote>
          <figcaption className="t-small mt-3 text-grey-600">{p.limits.agb.source}</figcaption>
        </figure>
      </Section>

      {/* Proof: ein belegter Fall als Zahlen-Karte, ausdrücklich kein Richtwert */}
      <Section space="l" mode="band" rule="none" labelledBy="vergleich-title">
        <SectionIntro id="vergleich-title" meta={p.proof.meta} title={p.proof.title}>
          {p.proof.client}
        </SectionIntro>
        <div className="mx-auto max-w-[46rem] text-center">
          <dl className="card grid grid-cols-3">
            {p.proof.figures.map((f, i) => (
              <div
                key={f.label}
                className={`flex min-w-0 flex-col-reverse items-center justify-end gap-1 px-2 py-6 md:py-7 ${i > 0 ? "border-l border-line" : ""}`}
              >
                <dt className="t-small text-grey-600">{f.label}</dt>
                <dd className="flex items-baseline justify-center gap-2">
                  {f.unit && <span className="t-meta text-grey-600">{f.unit}</span>}
                  <span className="t-num">{f.value}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="t-body mx-auto mt-8 max-w-[58ch] text-grey-700">{p.proof.text}</p>
          <ArrowLink href={p.proof.link.href} className="mt-6">
            {p.proof.link.label}
          </ArrowLink>
          <p className="t-small mx-auto mt-6 max-w-[60ch] text-grey-600">{p.proof.source}</p>
        </div>
      </Section>

      {/* Fragen: Liste in einer Karte */}
      <Section space="l" rule="none" labelledBy="faq-title">
        <SectionIntro meta={p.faq.meta} title={p.faq.title} id="faq-title" />
        <div className="mx-auto max-w-[52rem]">
          <Faq items={p.faq.items} />
        </div>
      </Section>

      {/* Passt dazu: verwandte Seiten als Karte (geteilter Baustein) */}
      <Section space="m" rule="none" className="-mt-6 md:-mt-10">
        <div className="mx-auto max-w-[52rem]">
          <RelatedLinks links={p.related.links} />
        </div>
      </Section>

      <FinalCta secondary={p.finalCta.secondary} />
    </>
  );
}
