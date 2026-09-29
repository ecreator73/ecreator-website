import Link from "next/link";
import { PageHeader } from "@/components/page/PageHeader";
import { FactsTable, IndexList, RelatedLinks, Section, SectionIntro } from "@/components/page/Blocks";
import { Faq } from "@/components/page/Faq";
import { FinalCta } from "@/components/blocks/FinalCta";
import { Arrow, ArrowLink, ButtonLink } from "@/components/ui/ButtonLink";
import { Meta } from "@/components/ui/Meta";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta } from "@/lib/metadata";
import { serviceSchema } from "@/lib/schema";
import { cta } from "@/content/site";
import { workById } from "@/content/work";
import { performanceMarketingPage as page } from "@/content/pages/performance-marketing";

export const metadata = pageMeta(page.meta);

export default function PerformanceMarketingPage() {
  const { channels, proof, loop, film, tracking, scope, calculator } = page;

  return (
    <>
      <JsonLd data={serviceSchema({ ...page.schema, path: page.meta.path })} />

      <PageHeader
        crumbs={page.crumbs}
        meta={page.header.meta}
        title={page.header.title}
        lead={page.header.lead}
        actions={
          <>
            <ButtonLink href={cta.primary.href} track="performance-header">
              {cta.primary.label}
            </ButtonLink>
            <ArrowLink href={page.header.calc.href}>{page.header.calc.label}</ArrowLink>
          </>
        }
        aside={<FactsTable rows={page.header.facts} />}
      />

      {/* Kanal-Fahrplan: Tabelle statt Kacheln */}
      <Section space="m" rule="ink" labelledBy="kanaele-title">
        <SectionIntro meta={[channels.meta]} title={channels.title} id="kanaele-title">
          {channels.lead}
        </SectionIntro>
        <div role="table" aria-label="Kanal-Fahrplan: Kanal, wofür, typische Formate">
          <div role="rowgroup">
            <div
              role="row"
              className="hidden border-b border-ink pb-3 md:grid md:grid-cols-[minmax(0,4fr)_minmax(0,5fr)_minmax(0,3fr)] md:gap-x-[var(--gutter)]"
            >
              {channels.columns.map((c) => (
                <span key={c} role="columnheader" className="t-meta text-grey-600">
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div role="rowgroup" className="border-t border-ink md:border-t-0">
            {channels.rows.map((r) => (
              <div
                key={r.name}
                role="row"
                className="grid gap-y-4 border-b border-line py-7 md:grid-cols-[minmax(0,4fr)_minmax(0,5fr)_minmax(0,3fr)] md:gap-x-[var(--gutter)] md:py-9"
              >
                <div role="rowheader">
                  <p className="t-h3">
                    {r.name}
                  </p>
                  <p className="t-meta mt-3 text-grey-600">{r.sub}</p>
                </div>
                <div role="cell" className="md:pt-2">
                  <p className="t-h4">{r.task}</p>
                  <p className="t-body mt-1.5 max-w-[40ch] text-grey-700">{r.text}</p>
                </div>
                <div role="cell" className="md:pt-2">
                  <p className="t-meta text-grey-600 md:hidden">{channels.columns[2]}</p>
                  <p className="t-small mt-1 text-grey-700 md:mt-0">{r.formats}</p>
                  {"link" in r && r.link && (
                    <ArrowLink href={r.link.href} className="mt-2 text-[0.9375rem]">
                      {r.link.label}
                    </ArrowLink>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Case: Titel und Text links, rechts die Kosten pro Lead als schlichte Reihe und das Datenblatt */}
      <Section space="m" rule="ink" labelledBy="case-title">
        <div className="grid-12 gap-y-10">
          <div className="col-span-4 md:col-span-6 lg:col-span-5">
            <Meta items={proof.meta} className="text-grey-600" />
            <p className="t-h4 mt-5 text-grey-600">{proof.client}</p>
            <h2 id="case-title" className="t-h2 mt-2" data-reveal>
              {proof.title}
            </h2>
            <p className="t-body mt-5 max-w-[48ch] text-grey-700">{proof.text}</p>
            <div className="mt-6">
              <ArrowLink href={proof.link.href}>{proof.link.label}</ArrowLink>
            </div>
          </div>
          <div className="col-span-4 md:col-span-6 lg:col-span-6 lg:col-start-7">
            <p className="sr-only">{proof.srText}</p>
            <div aria-hidden className="grid grid-cols-2 border-t border-ink">
              <div className="border-r border-line py-5 pr-4">
                <p className="t-meta text-grey-600">{proof.beforeLabel}</p>
                <p className="t-num mt-2 text-grey-500 line-through decoration-2">{proof.before}</p>
                <p className="t-small mt-1 text-grey-600">{proof.unit}</p>
              </div>
              <div className="py-5 pl-5 md:pl-6">
                <p className="t-meta text-grey-600">{proof.afterLabel}</p>
                <p className="t-num mt-2">{proof.after}</p>
                <p className="t-small mt-1 text-grey-600">{proof.unit}</p>
              </div>
            </div>
            <FactsTable rows={proof.facts} />
            <p className="t-meta mt-4 text-grey-600">{proof.source}</p>
          </div>
        </div>
      </Section>

      {/* Arbeitsweise als Kreislauf: fünf Stationen, danach zurück zur Botschaft */}
      <Section mode="band" space="m" rule="none" labelledBy="kreislauf-title">
        <SectionIntro meta={[loop.meta]} title={loop.title} id="kreislauf-title">
          {loop.lead}
        </SectionIntro>
        <ol className="grid border-t border-ink lg:grid-cols-5">
          {loop.stations.map((s, i) => (
            <li
              key={s.name}
              className="border-b border-line py-6 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-x-[var(--gutter)] lg:block lg:border-l lg:px-5 lg:py-7 lg:first:border-l-0 lg:first:pl-0"
            >
              <div>
                <p className="t-meta text-grey-600">{s.label}</p>
                <h3 className="t-h4 mt-3 flex items-center gap-3">
                  {s.name}
                  {i < loop.stations.length - 1 && <Arrow className="hidden h-3 w-5 text-grey-500 lg:block" />}
                </h3>
              </div>
              <p className="t-small mt-3 max-w-[46ch] text-grey-700 md:mt-0 lg:mt-3">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-col items-center gap-2 text-center">
          <p className="t-meta text-ink">
            <Arrow className="mr-2 inline-block h-3 w-5 rotate-180 align-middle text-grey-500" />
            {loop.back}
          </p>
          <p className="t-small text-grey-600">{loop.note}</p>
        </div>
      </Section>

      {/* Filmstreifen: echte Creatives, jedes einmal */}
      <section aria-labelledby="film-title" className="studio">
        <div className="wrap pt-[clamp(3.5rem,6.5vw,5.5rem)]">
          <SectionIntro meta={[film.note]} title={film.title} id="film-title">
            {film.text}
          </SectionIntro>
        </div>
        <div
          role="region"
          aria-label="Creatives, seitlich wischbar"
          tabIndex={0}
          className="wrap snap-x snap-mandatory overflow-x-auto [scroll-padding-inline:var(--margin)] [scrollbar-width:none] lg:snap-none lg:overflow-visible [&::-webkit-scrollbar]:hidden"
        >
          <ul className="grid w-max grid-flow-col gap-[var(--gutter)] pb-2 lg:w-full lg:grid-flow-row lg:grid-cols-6">
            {film.items.map((it) => {
              const w = workById(it.id);
              return (
                <li key={it.id} className="w-[40vw] max-w-[220px] snap-start lg:w-auto lg:max-w-none">
                  <VideoFrame src={w.short} poster={w.poster} label={`${w.title}, Social Ad, Thema ${w.theme}`} />
                  <p className="t-meta mt-3 text-grey-400">
                    {it.caption[0]} <span className="text-grey-500">/</span> {it.caption[1]}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="wrap pb-[clamp(3.5rem,6.5vw,5.5rem)] pt-8 text-center">
          <ArrowLink href={film.link.href} className="text-paper">
            {film.link.label}
          </ArrowLink>
        </div>
      </section>

      {/* Tracking: Titel links, die Begriffe rechts, darunter die Messkette in einfachen Worten */}
      <section id="tracking" aria-labelledby="tracking-title" className="sec-m">
        <div className="wrap">
          <div className="grid-12 gap-y-10">
            <div className="col-span-4 md:col-span-5">
              <div className="md:sticky md:top-[calc(var(--header-h)+2rem)]">
                <p className="t-meta text-grey-600">{tracking.meta}</p>
                <h2 id="tracking-title" className="t-h2 mt-4" data-reveal>
                  {tracking.title}
                </h2>
                <p className="t-lead mt-5 max-w-[40ch] text-grey-700">{tracking.lead}</p>
                <div className="mt-8 border-t border-ink pt-4">
                  <p className="t-meta text-grey-600">{tracking.caseNote.label}</p>
                  <p className="t-small mt-2 max-w-[44ch] text-grey-700">{tracking.caseNote.text}</p>
                  <p className="t-small mt-3 text-grey-700">{tracking.packageNote}</p>
                </div>
                <div className="mt-6">
                  <ArrowLink href={tracking.link.href}>{tracking.link.label}</ArrowLink>
                </div>
              </div>
            </div>

            <dl className="col-span-4 border-t border-ink md:col-span-7 lg:col-span-6 lg:col-start-7">
              {tracking.layers.map((l) => (
                <div key={l.term} className="border-b border-line py-6">
                  <dt className="t-h4">
                    {l.term}
                    {"short" in l && l.short && <span className="text-grey-500"> ({l.short})</span>}
                  </dt>
                  <dd className="t-body mt-2 max-w-[52ch] text-grey-700">{l.text}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Messkette: das hervorgehobene Glied ist das Qualitätssignal */}
          <div className="mt-14 md:mt-20">
            <div className="mb-6 text-center">
              <p className="t-meta text-grey-600">{tracking.chain.label}</p>
              <p className="t-h3 mt-3">{tracking.brand}</p>
            </div>
            <ol className="grid grid-cols-2 border-t border-ink md:grid-cols-4">
              {tracking.chain.steps.map((s, i) => (
                <li
                  key={s.name}
                  aria-current={s.active ? "step" : undefined}
                  className={`border-b border-line p-4 md:py-6 ${
                    i % 2 === 1 ? "border-l" : ""
                  } md:border-l md:first:border-l-0 ${s.active ? "bg-ink text-paper" : ""}`}
                >
                  <p className="t-h4 flex items-center gap-2">
                    {s.name}
                    {i < tracking.chain.steps.length - 1 && (
                      <Arrow className={`hidden h-3 w-5 md:block ${s.active ? "text-paper" : "text-grey-500"}`} />
                    )}
                  </p>
                  <p className={`t-meta mt-2 ${s.active ? "text-grey-300" : "text-grey-600"}`}>{s.note}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Leistungsumfang als Index in zwei Spalten */}
      <Section space="m" rule="ink" labelledBy="umfang-title">
        <SectionIntro meta={[scope.meta]} title={scope.title} id="umfang-title" />
        <IndexList
          columns={2}
          numbered={false}
          items={scope.items.map((it) => ({
            title: it.title,
            text:
              "link" in it && it.link ? (
                <>
                  {it.text}{" "}
                  <Link href={it.link.href} className="link whitespace-nowrap">
                    {it.link.label}
                  </Link>
                </>
              ) : (
                it.text
              ),
          }))}
        />
      </Section>

      {/* Rechner-Teaser: Text und Handlung links, die Formel schlicht in zwei Zeilen rechts */}
      <Section mode="band" space="m" rule="none" labelledBy="rechner-title">
        <div className="grid-12 gap-y-10 md:items-center">
          <div className="col-span-4 md:col-span-6">
            <p className="t-meta text-grey-600">{calculator.meta}</p>
            <h2 id="rechner-title" className="t-h2 mt-4" data-reveal>
              {calculator.title}
            </h2>
            <p className="t-body mt-5 max-w-[48ch] text-grey-700">{calculator.text}</p>
            <p className="t-body mt-4 max-w-[48ch] text-grey-700">{calculator.budget}</p>
            <div className="mt-8">
              <ButtonLink href={calculator.cta.href} variant="ink" track="performance-rechner">
                {calculator.cta.label}
              </ButtonLink>
            </div>
          </div>
          <ul className="col-span-4 border-t border-ink md:col-span-6 lg:col-span-5 lg:col-start-8">
            {calculator.formula.map((f) => (
              <li key={f.result} className="t-h4 flex flex-wrap items-baseline gap-x-2 border-b border-line py-5">
                <span>{f.left}</span>
                <span className="text-grey-500">{f.op}</span>
                <span className="whitespace-nowrap">{f.right}</span>
                <span className="text-grey-500">=</span>
                <span className="underline underline-offset-4">{f.result}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section space="m" rule="ink" labelledBy="faq-title">
        <SectionIntro meta={[page.faq.meta]} title={page.faq.title} id="faq-title" />
        <Faq items={page.faq.items} />
      </Section>

      <Section space="s" rule="line">
        <RelatedLinks links={page.related} />
      </Section>

      <FinalCta title={page.finalCta.title} text={page.finalCta.text} secondary={page.finalCta.secondary} />
    </>
  );
}
