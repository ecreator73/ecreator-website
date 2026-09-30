import Link from "next/link";
import { PageHeader } from "@/components/page/PageHeader";
import { FactsTable, NumberChip, RelatedLinks, Section, SectionIntro } from "@/components/page/Blocks";
import { Faq } from "@/components/page/Faq";
import { FinalCta } from "@/components/blocks/FinalCta";
import { Arrow, ArrowLink, ButtonLink } from "@/components/ui/ButtonLink";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { JsonLd } from "@/components/seo/JsonLd";
import { withAccent } from "@/lib/accent";
import { pageMeta } from "@/lib/metadata";
import { serviceSchema } from "@/lib/schema";
import { cta } from "@/content/site";
import { workById } from "@/content/work";
import { performanceMarketingPage as page } from "@/content/pages/performance-marketing";

export const metadata = pageMeta(page.meta);

/** Datenblatt in einer Karte: erste und letzte Zeile ohne zusätzlichen Innenabstand */
const factsInCard = "[&_dl>div:first-child]:pt-0 [&_dl>div:last-child]:pb-0";

export default function PerformanceMarketingPage() {
  const { channels, proof, loop, film, tracking, scope, calculator } = page;

  return (
    <>
      <JsonLd data={serviceSchema({ ...page.schema, path: page.meta.path })} />

      <PageHeader
        crumbs={page.crumbs}
        meta={page.header.meta}
        title={page.header.title.map((l) => withAccent(l, page.header.accent))}
        lead={page.header.lead}
        actions={
          <>
            <ButtonLink href={cta.primary.href} track="performance-header">
              {cta.primary.label}
            </ButtonLink>
            <ArrowLink href={page.header.calc.href}>{page.header.calc.label}</ArrowLink>
          </>
        }
        aside={
          <div className={factsInCard}>
            <FactsTable rows={page.header.facts} />
          </div>
        }
      />

      {/* Kanal-Fahrplan: vier Karten, je Kanal Aufgabe und typische Formate */}
      <Section mode="band" space="m" rule="none" labelledBy="kanaele-title">
        <SectionIntro
          meta={[channels.meta]}
          title={withAccent(channels.title, channels.accent)}
          id="kanaele-title"
        >
          {channels.lead}
        </SectionIntro>
        <ul aria-label="Kanal-Fahrplan: Kanal, wofür, typische Formate" className="grid gap-4 md:grid-cols-2 md:gap-5">
          {channels.rows.map((r) => (
            <li key={r.name} className="card flex flex-col p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <h3 className="t-h3">{r.name}</h3>
                <span className="t-small rounded-full bg-paper-2 px-3 py-1 text-grey-600">{r.sub}</span>
              </div>
              <p className="t-h4 mt-5">{r.task}</p>
              <p className="t-body mt-1.5 max-w-[46ch] text-grey-700">{r.text}</p>
              <div className="mt-auto pt-6">
                <div className="border-t border-line pt-5">
                  <p className="t-meta text-grey-600">{channels.columns[2]}</p>
                  <p className="t-small mt-1.5 text-grey-700">{r.formats}</p>
                  {"link" in r && r.link && (
                    <ArrowLink href={r.link.href} className="mt-3 text-[0.9375rem]">
                      {r.link.label}
                    </ArrowLink>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* Case: Text links, rechts eine Karte mit den Kosten pro Lead und dem Datenblatt */}
      <Section space="m" rule="none" labelledBy="case-title">
        <div className="grid-12 gap-y-10 lg:items-center">
          <div className="col-span-4 md:col-span-12 lg:col-span-5">
            <p className="label-pill">{proof.meta.join(" · ")}</p>
            <p className="t-h4 mt-6 text-grey-600">{proof.client}</p>
            <h2 id="case-title" className="t-h2 mt-2" data-reveal>
              {proof.title}
            </h2>
            <p className="t-body mt-5 max-w-[48ch] text-grey-700">{proof.text}</p>
            <div className="mt-6">
              <ArrowLink href={proof.link.href}>{proof.link.label}</ArrowLink>
            </div>
          </div>
          <div className="col-span-4 md:col-span-12 lg:col-span-6 lg:col-start-7">
            <div className="card p-5 md:p-8">
              <p className="sr-only">{proof.srText}</p>
              <div aria-hidden className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-paper-2 p-4 md:p-5">
                  <p className="t-meta text-grey-600">{proof.beforeLabel}</p>
                  <p className="t-num mt-2 text-grey-500 line-through decoration-2">{proof.before}</p>
                  <p className="t-small mt-1 text-grey-600">{proof.unit}</p>
                </div>
                <div className="rounded-2xl bg-[rgb(120_102_244/0.09)] p-4 md:p-5">
                  <p className="t-meta text-violet-deep">{proof.afterLabel}</p>
                  <p className="t-num mt-2">{proof.after}</p>
                  <p className="t-small mt-1 text-grey-600">{proof.unit}</p>
                </div>
              </div>
              <div className={`mt-6 ${factsInCard}`}>
                <FactsTable rows={proof.facts} />
              </div>
            </div>
            <p className="t-meta mt-4 text-grey-600">{proof.source}</p>
          </div>
        </div>
      </Section>

      {/* Arbeitsweise als Kreislauf: fünf Stationen als Karten, danach zurück zur Botschaft */}
      <Section mode="band" space="m" rule="none" labelledBy="kreislauf-title">
        <SectionIntro meta={[loop.meta]} title={loop.title} id="kreislauf-title">
          {loop.lead}
        </SectionIntro>
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {loop.stations.map((s, i) => (
            <li key={s.name} className="card flex flex-col p-5 md:p-6 md:last:col-span-2 lg:last:col-span-1">
              {/* Mobil und Tablet: Nummer und Label in einer Zeile. Desktop: Nummer mit Pfeil, Label darunter */}
              <div className="flex items-center gap-3">
                <span aria-hidden className="flex flex-none">
                  <NumberChip n={i + 1} />
                </span>
                <p className="t-meta text-grey-600 lg:hidden">{s.label}</p>
                {i < loop.stations.length - 1 && <Arrow className="ml-auto hidden h-3 w-5 text-grey-400 lg:block" />}
              </div>
              <p className="t-meta mt-5 hidden text-grey-600 lg:block">{s.label}</p>
              <h3 className="t-h4 mt-3 lg:mt-2">{s.name}</h3>
              <p className="t-small mt-2 max-w-[46ch] text-grey-700">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          <p className="t-small inline-flex items-center gap-2.5 rounded-2xl bg-paper px-4 py-2.5 text-left font-semibold text-ink shadow-[var(--shadow-card)] sm:rounded-full sm:py-2">
            <Arrow className="h-3 w-5 rotate-180 text-violet" />
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

      {/* Tracking: Titel links, die Begriffe rechts in einer Karte, darunter die Messkette */}
      <section id="tracking" aria-labelledby="tracking-title" className="sec-l">
        <div className="wrap">
          <div className="grid-12 gap-y-10">
            <div className="col-span-4 md:col-span-5">
              <div className="md:sticky md:top-[calc(var(--header-h)+2rem)]">
                <p className="label-pill">{tracking.meta}</p>
                <h2 id="tracking-title" className="t-h2 mt-5" data-reveal>
                  {withAccent(tracking.title, tracking.accent)}
                </h2>
                <p className="t-lead mt-5 max-w-[40ch] text-grey-700">{tracking.lead}</p>
                <div className="mt-8 rounded-[var(--radius-card)] bg-paper-2 p-6">
                  <p className="t-meta text-grey-600">{tracking.caseNote.label}</p>
                  <p className="t-small mt-2 max-w-[44ch] text-grey-700">{tracking.caseNote.text}</p>
                  <p className="t-small mt-3 font-semibold text-ink">{tracking.packageNote}</p>
                </div>
                <div className="mt-6">
                  <ArrowLink href={tracking.link.href}>{tracking.link.label}</ArrowLink>
                </div>
              </div>
            </div>

            <dl className="card col-span-4 divide-y divide-line p-6 md:col-span-7 md:p-8 lg:col-span-6 lg:col-start-7 [&>div]:py-6 [&>div:first-child]:pt-0 [&>div:last-child]:pb-0">
              {tracking.layers.map((l) => (
                <div key={l.term}>
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
          <div className="mt-16 md:mt-24">
            <div className="mb-8 text-center">
              <p className="label-pill">{tracking.chain.label}</p>
              <p className="t-h3 mt-4">{tracking.brand}</p>
            </div>
            <ol className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {tracking.chain.steps.map((s, i) => (
                <li
                  key={s.name}
                  aria-current={s.active ? "step" : undefined}
                  className={
                    s.active
                      ? "rounded-[var(--radius-card)] bg-ink p-5 text-paper shadow-[var(--shadow-cta)] md:p-6"
                      : "card p-5 md:p-6"
                  }
                >
                  <p className="t-h4 flex items-center justify-between gap-2">
                    {s.name}
                    {i < tracking.chain.steps.length - 1 && (
                      <Arrow className={`hidden h-3 w-5 md:block ${s.active ? "text-paper" : "text-grey-400"}`} />
                    )}
                  </p>
                  <p className={`t-meta mt-2 ${s.active ? "text-grey-300" : "text-grey-600"}`}>{s.note}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Leistungsumfang: Häkchen-Liste in zwei Spalten, in einer Karte */}
      <Section mode="band" space="m" rule="none" labelledBy="umfang-title">
        <SectionIntro meta={[scope.meta]} title={scope.title} id="umfang-title" />
        <ul className="card check-list mx-auto grid max-w-[64rem] gap-x-12 gap-y-7 p-6 md:grid-cols-2 md:p-10">
          {scope.items.map((it) => (
            <li key={it.title}>
              <h3 className="t-h4">{it.title}</h3>
              <p className="t-small mt-1.5 max-w-[52ch] text-grey-700">
                {it.text}
                {"link" in it && it.link && (
                  <>
                    {" "}
                    <Link href={it.link.href} className="link whitespace-nowrap font-semibold text-ink">
                      {it.link.label}
                    </Link>
                  </>
                )}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Rechner-Teaser: Text und Handlung links, die Formel rechts in einer Karte */}
      <Section space="m" rule="none" labelledBy="rechner-title">
        <div className="grid-12 gap-y-10 md:items-center">
          <div className="col-span-4 md:col-span-6">
            <p className="label-pill">{calculator.meta}</p>
            <h2 id="rechner-title" className="t-h2 mt-5" data-reveal>
              {calculator.title}
            </h2>
            <p className="t-body mt-5 max-w-[48ch] text-grey-700">{calculator.text}</p>
            <p className="t-body mt-4 max-w-[48ch] text-grey-700">{calculator.budget}</p>
            <div className="mt-8">
              <ButtonLink href={calculator.cta.href} variant="line" track="performance-rechner">
                {calculator.cta.label}
              </ButtonLink>
            </div>
          </div>
          <ul className="card col-span-4 divide-y divide-line p-6 md:col-span-6 md:p-8 lg:col-span-5 lg:col-start-8">
            {calculator.formula.map((f) => (
              <li
                key={f.result}
                className="t-h4 flex flex-wrap items-baseline gap-x-2 gap-y-2 py-5 first:pt-0 last:pb-0"
              >
                <span>{f.left}</span>
                <span className="text-grey-500">{f.op}</span>
                <span className="whitespace-nowrap">{f.right}</span>
                <span className="text-grey-500">=</span>
                <span className="rounded-full bg-[rgb(120_102_244/0.09)] px-3 py-0.5 text-violet-deep">{f.result}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section mode="band" space="m" rule="none" labelledBy="faq-title">
        <SectionIntro meta={[page.faq.meta]} title={page.faq.title} id="faq-title" />
        <div className="mx-auto max-w-[56rem]">
          <Faq items={page.faq.items} />
        </div>
      </Section>

      {/* Verwandte Seiten als Karten (geteilter Baustein) */}
      <Section space="m" rule="none">
        <RelatedLinks layout="grid" links={page.related} />
      </Section>

      <FinalCta title={page.finalCta.title} text={page.finalCta.text} secondary={page.finalCta.secondary} />
    </>
  );
}
