import type { ReactNode } from "react";
import Image from "next/image";
import { PageHeader } from "@/components/page/PageHeader";
import { FactsTable, NumberChip, RelatedLinks, Section, SectionIntro, Steps } from "@/components/page/Blocks";
import { Faq } from "@/components/page/Faq";
import { FinalCta } from "@/components/blocks/FinalCta";
import { ArrowLink, ButtonLink } from "@/components/ui/ButtonLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta } from "@/lib/metadata";
import { serviceSchema } from "@/lib/schema";
import { withAccent } from "@/lib/accent";
import { cta } from "@/content/site";
import { seoPage as page } from "@/content/pages/seo";

export const metadata = pageMeta(page.meta);

/** Datenblatt in einer Karte: ohne kräftige Linie oben und ohne Linie unter der letzten Zeile */
const factsInCard = "[&>dl]:border-t-0 [&>dl>div:last-child]:border-b-0";

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

/** Fensterleiste über Screenshots und Code: drei ruhige Punkte, rechts ein Label */
function WindowBar({ children, dark = false }: { children?: ReactNode; dark?: boolean }) {
  return (
    <div
      className={`flex items-center gap-4 border-b border-line px-4 py-3 md:px-5 ${dark ? "" : "bg-paper-2"}`}
    >
      <span aria-hidden className="flex flex-none gap-1.5">
        {[0, 1, 2].map((d) => (
          <span key={d} className={`h-2.5 w-2.5 rounded-full ${dark ? "bg-grey-600" : "bg-grey-300"}`} />
        ))}
      </span>
      {children}
    </div>
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
        aside={
          <div className={factsInCard}>
            <FactsTable rows={header.facts} />
          </div>
        }
      />

      {/* Audit-Protokoll: acht Bereiche als Karten, je mit Prüfliste und dem Warum */}
      <Section id={audit.id} mode="band" space="l" rule="none" labelledBy="audit-title">
        <SectionIntro meta={audit.meta} title={withAccent(audit.title, "prüfen")} id="audit-title">
          {audit.intro}
        </SectionIntro>

        <ul className="-mt-4 mb-10 flex flex-wrap justify-center gap-2 md:-mt-6 md:mb-12">
          {audit.protocol.map((p) => (
            <li key={p} className="t-small rounded-full border border-line bg-white px-3.5 py-1.5 text-grey-700">
              {p}
            </li>
          ))}
        </ul>

        <ol className="grid gap-4 md:grid-cols-2 md:gap-5">
          {audit.areas.map((a, i) => (
            <li key={a.area} className="card flex flex-col p-6 md:p-8">
              <div className="flex items-start gap-4">
                <span className="flex flex-none">
                  <span className="sr-only">{audit.columns[0]} </span>
                  <NumberChip n={i + 1} />
                </span>
                <div className="min-w-0">
                  <h3 className="t-h3">{a.area}</h3>
                  <p className="t-small mt-1 text-grey-600">{a.alias}</p>
                </div>
              </div>
              <ul aria-label={audit.columns[1]} className="check-list t-small mt-6 space-y-2.5 text-grey-700">
                {a.checks.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                <div className="border-t border-line pt-5">
                  <p className="t-meta text-grey-600">{audit.columns[2]}</p>
                  <p className="t-body mt-2 font-medium leading-snug">{a.why}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Strukturierte Daten: der echte JSON-LD-Block dieser Website, als Code-Fenster */}
      <section aria-labelledby="sd-title" className="studio mt-3">
        <div className="wrap sec-l">
          <SectionIntro meta={structured.meta} title={structured.title} id="sd-title">
            {structured.lead}
          </SectionIntro>

          <div className="grid-12 gap-y-10">
            <figure className="col-span-4 md:col-span-12 lg:col-span-7">
              <div className="overflow-hidden rounded-[var(--radius-media)] border border-line bg-ink-2">
                <WindowBar dark>
                  <p className="t-small min-w-0 truncate text-grey-400">{structured.label}</p>
                  <p className="t-small ml-auto hidden flex-none text-grey-500 sm:block">application/ld+json</p>
                </WindowBar>
                <JsonCode code={structured.code} hot={hotKeys} />
              </div>
              <figcaption className="t-small mt-4 max-w-[60ch] text-grey-400">{structured.caption}</figcaption>
            </figure>

            <div className="col-span-4 md:col-span-12 lg:col-span-5">
              <dl className="card px-5 py-2 md:px-6">
                {structured.annotations.map((a) => (
                  <div
                    key={a.k}
                    className="grid grid-cols-[minmax(6.5rem,34%)_1fr] gap-4 border-b border-line py-4 last:border-b-0"
                  >
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
          <p className="mb-6">
            <span className="label-pill">{guarantee.meta.join(" · ")}</span>
          </p>
          <p aria-hidden className="card inline-flex items-baseline gap-3 px-6 py-3">
            <span className="t-num">{guarantee.number}</span>
            <span className="t-small font-medium text-grey-600">{guarantee.label}</span>
          </p>
          <h2 id="garantie-title" className="t-h2 mt-7" data-reveal>
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
      <Section mode="band" space="l" rule="none" labelledBy="ablauf-title">
        <SectionIntro meta={process.meta} title={process.title} id="ablauf-title">
          {process.lead}
        </SectionIntro>
        <Steps steps={process.steps} />
      </Section>

      {/* Beleg: echtes Webprojekt im Browserfenster, ohne Resultate zu behaupten */}
      <Section space="l" rule="none" labelledBy="beispiel-title">
        <div className="grid-12 items-center gap-y-10">
          <figure className="col-span-4 md:col-span-12 lg:col-span-7">
            <div className="overflow-hidden rounded-[var(--radius-media)] border border-line bg-white shadow-[var(--shadow-card)]">
              <WindowBar>
                <span
                  aria-hidden
                  className="t-small mx-auto min-w-0 truncate rounded-full bg-white px-4 py-1 text-grey-600"
                >
                  {proof.siteLink.label}
                </span>
                <span aria-hidden className="w-[2.625rem] flex-none" />
              </WindowBar>
              <div className="relative aspect-[16/10] bg-paper-2">
                <Image
                  src={proof.image.src}
                  alt={proof.image.alt}
                  fill
                  sizes="(min-width: 1024px) 56vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
            <figcaption className="t-meta mt-3 text-grey-600">{proof.caption}</figcaption>
          </figure>
          <div className="col-span-4 md:col-span-9 lg:col-span-5 lg:pl-6">
            <p className="label-pill">{proof.meta.join(" · ")}</p>
            <h2 id="beispiel-title" className="t-h2 mt-5">
              {proof.title}
            </h2>
            <p className="t-body mt-5 text-grey-700">{proof.summary}</p>
            <p className="t-body mt-4 font-medium">{proof.angle}</p>
            <div className={`card mt-8 px-5 py-1.5 md:px-6 ${factsInCard}`}>
              <FactsTable rows={proof.facts} />
            </div>
            <div className="mt-7 flex flex-col items-start gap-x-8 gap-y-3 sm:flex-row sm:items-center">
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

      {/* Fragen: Liste in einer Karte */}
      <Section mode="band" space="l" rule="none" labelledBy="faq-title">
        <SectionIntro meta={faq.meta} title={faq.title} id="faq-title" />
        <div className="mx-auto max-w-[52rem]">
          <Faq items={faq.items} />
        </div>
      </Section>

      {/* Weiterlesen als Karte (geteilter Baustein) */}
      <Section space="m" rule="none">
        <div className="mx-auto max-w-[52rem]">
          <RelatedLinks links={page.related} />
        </div>
      </Section>

      <FinalCta title={page.finalCta.title} text={page.finalCta.text} secondary={page.finalCta.secondary} />
    </>
  );
}
