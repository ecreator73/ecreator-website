import Image from "next/image";
import { PageHeader } from "@/components/page/PageHeader";
import { FactsTable, RelatedLinks, Section, SectionIntro, Steps } from "@/components/page/Blocks";
import { Faq } from "@/components/page/Faq";
import { FinalCta } from "@/components/blocks/FinalCta";
import { ArrowLink, ButtonLink } from "@/components/ui/ButtonLink";
import { Meta } from "@/components/ui/Meta";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta } from "@/lib/metadata";
import { serviceSchema } from "@/lib/schema";
import { cta } from "@/content/site";
import { seoPage as page } from "@/content/pages/seo";

export const metadata = pageMeta(page.meta);

/* --------------------------------------------------------------------------
   JSON-LD als gesetzter Code: Schlüssel, die rechts erklärt werden, hell;
   alles andere zurückgenommen. Nur Tokens aus globals.css, keine Syntax-Farben.
   -------------------------------------------------------------------------- */
function CodeValue({ text }: { text: string }) {
  const parts = text.split(/("(?:[^"\\]|\\.)*")/);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('"') ? (
          <span key={i} className="text-grey-300">
            {p.split(/(?<=\/)/).map((seg, j) => (
              <span key={j}>
                {j > 0 && <wbr />}
                {seg}
              </span>
            ))}
          </span>
        ) : (
          <span key={i} className="text-grey-500">
            {p}
          </span>
        ),
      )}
    </>
  );
}

function JsonCode({ code, hot }: { code: string; hot: string[] }) {
  const lines = code.split("\n");
  return (
    <pre className="overflow-hidden px-4 py-5 font-mono text-[0.75rem] leading-[1.75] sm:text-[0.8125rem] md:px-6 md:py-7">
      <code className="block">
        {lines.map((line, n) => {
          const m = line.match(/^(\s*)"([^"]+)"(:\s)(.*)$/);
          const indent = (m ? m[1] : (line.match(/^\s*/)?.[0] ?? "")).length;
          return (
            <span key={n} className="grid grid-cols-[1.75rem_minmax(0,1fr)] md:grid-cols-[2.25rem_minmax(0,1fr)]">
              <span aria-hidden className="select-none text-grey-500/70">
                {String(n + 1).padStart(2, "0")}
              </span>
              <span
                className="whitespace-pre-wrap [overflow-wrap:anywhere]"
                style={{ paddingLeft: `${indent}ch` }}
              >
                {m ? (
                  <>
                    <span className={hot.includes(m[2]) ? "text-paper" : "text-grey-400"}>&quot;{m[2]}&quot;</span>
                    <span className="text-grey-500">{m[3]}</span>
                    <CodeValue text={m[4]} />
                  </>
                ) : (
                  <CodeValue text={line.trimStart()} />
                )}
              </span>
            </span>
          );
        })}
      </code>
    </pre>
  );
}

export default function SeoPage() {
  const { header, audit, structured, guarantee, proof, process, faq } = page;
  const hotKeys = structured.annotations.map((a) => a.k);

  return (
    <>
      <JsonLd data={serviceSchema({ ...page.service, path: page.meta.path })} />

      <PageHeader
        crumbs={header.crumbs}
        meta={header.meta}
        title={header.title}
        lead={header.lead}
        actions={
          <>
            <ButtonLink href={cta.primary.href} track="seo-header">
              {cta.primary.label}
            </ButtonLink>
            <ArrowLink href={header.auditLink.href}>{header.auditLink.label}</ArrowLink>
          </>
        }
        aside={<FactsTable rows={header.facts} />}
      />

      {/* Audit-Protokoll: die Checkliste als Datenblatt */}
      <Section id={audit.id} space="l" rule="ink" labelledBy="audit-title">
        <SectionIntro meta={audit.meta} title={audit.title} id="audit-title">
          {audit.intro}
        </SectionIntro>

        <Meta className="mb-4 text-grey-600" items={audit.protocol} />
        <div aria-hidden className="grid-12 hidden border-t border-ink py-3 md:grid">
          <p className="t-meta col-span-3 text-grey-600">{audit.columns[0]}</p>
          <p className="t-meta col-span-5 text-grey-600">{audit.columns[1]}</p>
          <p className="t-meta col-span-4 text-grey-600">{audit.columns[2]}</p>
        </div>
        <ol className="border-t border-ink md:border-line">
          {audit.areas.map((a, i) => (
            <li key={a.area} className="grid-12 gap-y-5 border-b border-line py-7 md:py-9">
              <div className="col-span-4 grid grid-cols-[2.25rem_minmax(0,1fr)] md:col-span-3 md:pr-4">
                <span className="t-meta pt-[0.45em] text-grey-600">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="t-h3">{a.area}</h3>
                  <p className="t-meta mt-2 text-grey-600">{a.alias}</p>
                </div>
              </div>
              <div className="col-span-4 pl-[2.25rem] md:col-span-5 md:pl-0 md:pr-6">
                <ul>
                  {a.checks.map((c) => (
                    <li key={c} className="t-small grid grid-cols-[1.1rem_minmax(0,1fr)] py-[0.2rem] text-grey-700">
                      <span aria-hidden className="font-mono text-grey-400">
                        /
                      </span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-4 pl-[2.25rem] md:col-span-4 md:pl-0">
                <p className="t-meta mb-2 text-grey-600 md:hidden">{audit.columns[2]}</p>
                <p className="t-body font-medium leading-snug">{a.why}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Strukturierte Daten: der echte JSON-LD-Block dieser Website */}
      <section aria-labelledby="sd-title" className="studio">
        <div className="wrap sec-l">
          <SectionIntro meta={structured.meta} title={structured.title} id="sd-title">
            {structured.lead}
          </SectionIntro>

          <div className="grid-12 gap-y-12">
            <figure className="col-span-4 md:col-span-12 lg:col-span-7">
              <div className="border-t border-paper bg-ink-2">
                <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 md:px-6">
                  <p className="t-meta text-grey-400">{structured.label}</p>
                  <p className="t-meta hidden text-grey-500 sm:block">application/ld+json</p>
                </div>
                <JsonCode code={structured.code} hot={hotKeys} />
              </div>
              <figcaption className="t-small mt-4 max-w-[60ch] text-grey-400">{structured.caption}</figcaption>
            </figure>

            <div className="col-span-4 md:col-span-12 lg:col-span-5">
              <dl className="border-t border-paper">
                {structured.annotations.map((a) => (
                  <div key={a.k} className="grid grid-cols-[minmax(6.5rem,34%)_1fr] gap-4 border-b border-line py-4">
                    <dt className="font-mono text-[0.8125rem] leading-[1.6] text-paper">&quot;{a.k}&quot;</dt>
                    <dd className="t-small text-grey-300">{a.v}</dd>
                  </div>
                ))}
              </dl>
              <ArrowLink href={structured.link.href} className="mt-8 text-paper">
                {structured.link.label}
              </ArrowLink>
            </div>
          </div>
        </div>
      </section>

      {/* Ehrlich: keine Ranking-Garantie, ruhig und mittig gesetzt */}
      <Section space="l" rule="none" labelledBy="garantie-title">
        <div className="mx-auto max-w-[46rem] text-center">
          <p aria-hidden className="flex items-baseline justify-center gap-3">
            <span className="t-num">{guarantee.number}</span>
            <span className="t-meta text-grey-600">{guarantee.label}</span>
          </p>
          <h2 id="garantie-title" className="t-h2 mt-5" data-reveal>
            <span className="sr-only">
              {guarantee.number} {guarantee.label}.{" "}
            </span>
            {guarantee.title}
          </h2>
          <p className="t-lead mx-auto mt-5 max-w-[52ch] text-grey-700">{guarantee.text}</p>
          <ArrowLink href={guarantee.source.href} className="mt-7">
            {guarantee.source.label}
          </ArrowLink>
        </div>
      </Section>

      {/* Ablauf */}
      <Section mode="band" space="m" rule="none" labelledBy="ablauf-title">
        <SectionIntro meta={process.meta} title={process.title} id="ablauf-title">
          {process.lead}
        </SectionIntro>
        <Steps steps={process.steps} />
      </Section>

      {/* Beleg: echtes Webprojekt, ohne Resultate zu behaupten */}
      <Section space="l" rule="none" labelledBy="beispiel-title">
        <div className="grid-12 items-start gap-y-10">
          <figure className="col-span-4 md:col-span-12 lg:col-span-8">
            <div className="relative aspect-[16/10] overflow-hidden border border-line bg-paper-2">
              <Image
                src={proof.image.src}
                alt={proof.image.alt}
                fill
                sizes="(min-width: 1024px) 64vw, 100vw"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="t-meta mt-3 text-grey-700">{proof.caption}</figcaption>
          </figure>
          <div className="col-span-4 md:col-span-9 lg:col-span-4">
            <Meta className="text-grey-600" items={proof.meta} />
            <h2 id="beispiel-title" className="t-h2 mt-5">
              {proof.title}
            </h2>
            <p className="t-body mt-5 text-grey-700">{proof.summary}</p>
            <p className="t-body mt-4 font-medium">{proof.angle}</p>
            <div className="mt-8">
              <FactsTable rows={proof.facts} />
            </div>
            <div className="mt-8 flex flex-col items-start gap-3">
              <ArrowLink href={proof.caseLink.href}>{proof.caseLink.label}</ArrowLink>
              <a
                href={proof.siteLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="t-small inline-flex min-h-11 items-center text-grey-700"
              >
                <span className="link">{proof.siteLink.label}</span>
                <span className="sr-only"> (öffnet in neuem Tab)</span>
              </a>
            </div>
          </div>
        </div>
      </Section>

      <Section space="m" rule="ink" labelledBy="faq-title">
        <SectionIntro meta={faq.meta} title={faq.title} id="faq-title" />
        <Faq items={faq.items} />
      </Section>

      <Section space="s" rule="line">
        <RelatedLinks links={page.related} />
      </Section>

      <FinalCta title={page.finalCta.title} text={page.finalCta.text} secondary={page.finalCta.secondary} />
    </>
  );
}
