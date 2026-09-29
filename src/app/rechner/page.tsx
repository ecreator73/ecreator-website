import { PageHeader } from "@/components/page/PageHeader";
import { Section, SectionIntro, FactsTable, IndexList, RelatedLinks } from "@/components/page/Blocks";
import { Faq } from "@/components/page/Faq";
import { FinalCta } from "@/components/blocks/FinalCta";
import { ArrowLink } from "@/components/ui/ButtonLink";
import { Rechner } from "@/components/pages/Rechner";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta } from "@/lib/metadata";
import { rechnerPage as p } from "@/content/pages/rechner";

export const metadata = pageMeta(p.meta);

export default function RechnerPage() {
  return (
    <>
      <JsonLd data={p.schema} />

      <PageHeader
        crumbs={p.crumbs}
        meta={p.header.meta}
        title={p.header.title}
        lead={p.header.lead}
        aside={<FactsTable caption={p.header.formulaCaption} rows={p.header.formula} />}
      />

      {/* Der Rechner als Datenblatt: Annahmen links, Rechnung rechts */}
      <Section id={p.calc.id} space="s" rule="ink" labelledBy="rechnen-title">
        <h2 id="rechnen-title" className="sr-only">
          {p.calc.title}
        </h2>
        <Rechner copy={p.calc} />
      </Section>

      {/* Grenzen: was in keiner Formel steht, dazu die AGB-Leitplanke wörtlich */}
      <Section space="l" rule="line" labelledBy="grenzen-title">
        <SectionIntro id="grenzen-title" meta={p.limits.meta} title={p.limits.title}>
          {p.limits.text}
        </SectionIntro>
        <div className="mx-auto max-w-[64rem]">
          <IndexList columns={2} numbered={false} items={p.limits.items} />
        </div>
        <figure className="mx-auto mt-12 max-w-[46rem] text-center md:mt-16">
          <blockquote className="t-h4 text-grey-700">«{p.limits.agb.quote}»</blockquote>
          <figcaption className="t-meta mt-3 text-grey-600">{p.limits.agb.source}</figcaption>
        </figure>
      </Section>

      {/* Proof: ein belegter Fall als schlichte Zahlenzeile, ausdrücklich kein Richtwert */}
      <Section space="m" mode="band" rule="none" labelledBy="vergleich-title">
        <SectionIntro id="vergleich-title" meta={p.proof.meta} title={p.proof.title}>
          {p.proof.client}
        </SectionIntro>
        <div className="mx-auto max-w-[46rem] text-center">
          <dl className="grid grid-cols-3 border-y border-ink">
            {p.proof.figures.map((f, i) => (
              <div key={f.label} className={`min-w-0 px-2 py-5 md:py-6 ${i > 0 ? "border-l border-line" : ""}`}>
                <dt className="t-meta text-grey-600">{f.label}</dt>
                <dd className="mt-3 flex items-baseline justify-center gap-2">
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
          <p className="t-meta mx-auto mt-6 max-w-[60ch] text-grey-600">{p.proof.source}</p>
        </div>
      </Section>

      <Section space="m" rule="ink" labelledBy="faq-title">
        <SectionIntro meta={p.faq.meta} title={p.faq.title} id="faq-title" />
        <Faq items={p.faq.items} />
      </Section>

      <Section space="s" rule="line">
        <RelatedLinks links={p.related.links} />
      </Section>

      <FinalCta secondary={p.finalCta.secondary} />
    </>
  );
}
