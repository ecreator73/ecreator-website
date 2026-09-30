import { PageHeader } from "@/components/page/PageHeader";
import { FactsTable, NumberChip, RelatedLinks, Section, SectionIntro, Steps, Todo } from "@/components/page/Blocks";
import { Faq } from "@/components/page/Faq";
import { FinalCta } from "@/components/blocks/FinalCta";
import { VideoTestimonial } from "@/components/blocks/VideoTestimonial";
import { ArrowLink, ButtonLink } from "@/components/ui/ButtonLink";
import { Placeholder } from "@/components/ui/Placeholder";
import { JsonLd } from "@/components/seo/JsonLd";
import { withAccent as accent } from "@/lib/accent";
import { pageMeta } from "@/lib/metadata";
import { serviceSchema } from "@/lib/schema";
import { cta } from "@/content/site";
import { pinelli } from "@/content/testimonials";
import { podcastStudioPage as page } from "@/content/pages/podcast-studio";

export const metadata = pageMeta(page.meta);

/**
 * Studio / Media / Culture, Version 4: helle, ruhige Seite mit Karten.
 * Sendungs-Titel in der H1, danach Preise, Studio, Formate.
 * Nur das Interview steht im dunklen Panel (wie auf /content-produktion).
 */
export default function PodcastStudioPage() {
  const { header, prices, studio, formats, proof, process, extras, faq } = page;

  return (
    <>
      <JsonLd data={serviceSchema({ ...page.schema, path: page.meta.path })} />

      <PageHeader
        crumbs={page.crumbs}
        meta={header.meta}
        title={[
          <span key="t" className="t-h1 block">
            {header.title[0]}
          </span>,
          <span key="s" className="t-h2 mt-3 block text-grey-500 md:mt-4">
            {header.title[1]}
          </span>,
        ]}
        lead={header.lead}
        actions={
          <>
            <ButtonLink href={cta.podcast.href} variant="line" track="podcast-header">
              {cta.podcast.label}
            </ButtonLink>
            <ArrowLink href={header.pricesLink.href}>{header.pricesLink.label}</ArrowLink>
          </>
        }
      />

      {/* Preise: eine Preiskarte, oben die zwei Optionen, unten was im Preis ist und was auf Anfrage */}
      <section id="preise" aria-labelledby="preise-title" className="bg-paper-2">
        <div className="wrap sec-l">
          <SectionIntro meta={[prices.meta]} title={prices.title} id="preise-title">
            {prices.lead}
          </SectionIntro>

          <div className="card mx-auto max-w-[48rem] overflow-hidden">
            {/* Beide Optionen auch auf dem Handy nebeneinander, wie eine kompakte Preisübersicht */}
            <dl className="grid grid-cols-2">
              {prices.options.map((o) => (
                <div key={o.duration} className="border-l border-line px-4 py-6 text-center first:border-l-0 sm:p-6 md:p-8">
                  <dt className="t-h4">{o.duration}</dt>
                  <dd className="mt-3 flex items-baseline justify-center gap-2">
                    <span className="t-meta text-grey-500">CHF</span>
                    <span className="t-num">{o.amount}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <div className="grid gap-8 border-t border-line bg-paper-2/70 p-6 sm:grid-cols-2 md:p-8">
              <div>
                <p className="t-meta text-grey-600">{prices.includedLabel}</p>
                <ul className="check-list mt-4 space-y-3">
                  {prices.included.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="t-meta text-grey-600">{prices.onRequestLabel}</p>
                <ul className="mt-4 space-y-3 text-grey-600">
                  {prices.onRequest.map((x) => (
                    <li key={x} className="flex items-center gap-3">
                      <span aria-hidden className="inline-block h-5 w-5 flex-none rounded-md border border-dashed border-grey-400" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 text-center">
            <ButtonLink href={cta.podcast.href} variant="line" track="podcast-prices">
              {cta.podcast.label}
            </ButtonLink>
            <p className="t-meta text-grey-600">{prices.note}</p>
          </div>
        </div>
      </section>

      {/* Das Studio: Bildplätze + Datenblatt in einer Karte, offene Angaben sichtbar markiert */}
      <Section space="l" rule="none" labelledBy="studio-title">
        <div className="grid-12 gap-y-12">
          <div className="col-span-4 md:col-span-7">
            <Placeholder
              label={studio.photos.wide.label}
              spec={studio.photos.wide.spec}
              ratio="3 / 2"
              className="rounded-[var(--radius-media)]"
            />
            <div className="mt-[var(--gutter)] grid grid-cols-2 gap-[var(--gutter)]">
              <Placeholder
                label={studio.photos.mics.label}
                spec={studio.photos.mics.spec}
                ratio="4 / 5"
                className="rounded-[var(--radius-media)]"
              />
              <Placeholder
                label={studio.photos.cams.label}
                spec={studio.photos.cams.spec}
                ratio="4 / 5"
                className="rounded-[var(--radius-media)]"
              />
            </div>
          </div>
          <div className="order-first col-span-4 md:order-none md:col-span-5">
            <div className="md:sticky md:top-[calc(var(--header-h)+2rem)]">
              <p className="label-pill">{studio.meta}</p>
              <h2 id="studio-title" className="t-h2 mt-5">
                {accent(studio.title, studio.accent)}
              </h2>
              <p className="t-body mt-4 text-grey-600">{studio.text}</p>
              <div className="card mt-8 px-5 py-2 md:px-6 [&_dl]:border-t-0 [&_dl>div:last-child]:border-b-0">
                <FactsTable
                  rows={studio.facts.map((r) => ({
                    k: r.k,
                    v: r.todo ? <Todo>{r.todo}</Todo> : r.v,
                  }))}
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Formate: vier Karten, Name und Aufgabe */}
      <Section mode="band" space="l" rule="none" labelledBy="formate-title">
        <SectionIntro meta={[formats.meta]} title={accent(formats.title, formats.accent)} id="formate-title">
          {formats.lead}
        </SectionIntro>
        <ul className="mx-auto grid max-w-[60rem] gap-[var(--gutter)] md:grid-cols-2">
          {formats.items.map((f, i) => (
            <li key={f.name} className="card flex flex-col items-start p-6 md:p-8">
              <div className="flex items-center gap-3">
                {/* Nummer rein dekorativ, die Liste trägt die Reihenfolge */}
                <span aria-hidden className="flex flex-none">
                  <NumberChip n={i + 1} />
                </span>
                <h3 className="t-h3">{f.name}</h3>
              </div>
              <p className="t-body mt-3 text-grey-600">{f.text}</p>
              {f.link && (
                <div className="mt-auto pt-4">
                  <ArrowLink href={f.link.href}>{f.link.label}</ArrowLink>
                </div>
              )}
            </li>
          ))}
        </ul>
      </Section>

      {/* Beleg für das Format: das Interview, ohne zu behaupten, es sei im Studio entstanden */}
      <section aria-labelledby="proof-title" className="studio sec-l">
        <div className="wrap">
          <SectionIntro meta={proof.meta} title={proof.title} id="proof-title">
            <p>{proof.text}</p>
            <p className="t-small mt-4 text-grey-400">{proof.note}</p>
          </SectionIntro>
          <VideoTestimonial t={pinelli} headingLevel="h3" />
        </div>
      </section>

      {/* Ablauf einer Buchung in vier Karten (geteilter Baustein), ohne erfundene Vorlaufzeiten */}
      <Section space="l" rule="none" labelledBy="ablauf-title">
        <SectionIntro meta={[process.meta]} title={process.title} id="ablauf-title">
          {process.lead}
        </SectionIntro>
        <Steps steps={process.steps} />
      </Section>

      {/* Auf Anfrage: Schnitt, Planung und Strategie als mittige Karte */}
      <Section mode="band" space="l" rule="none" labelledBy="extras-title">
        <div className="card mx-auto max-w-[46rem] px-6 py-10 text-center md:px-12 md:py-14">
          <p className="label-pill mb-5">{extras.meta}</p>
          <h2 id="extras-title" className="t-h2 hyphens-manual" data-reveal>
            {extras.title}
          </h2>
          <p className="t-lead mx-auto mt-5 max-w-[52ch] text-grey-700">{extras.text}</p>
          <p className="t-small mx-auto mt-4 max-w-[52ch] text-grey-600">{extras.note}</p>
          <div className="mt-6">
            <ArrowLink href={extras.link.href}>{extras.link.label}</ArrowLink>
          </div>
        </div>
      </Section>

      {/* FAQ in einer ruhigen Karte, darunter Weiterlesen als zweite Karte gleicher Breite (geteilte Bausteine) */}
      <Section space="l" rule="none" labelledBy="faq-title">
        <SectionIntro meta={[faq.meta]} title={faq.title} id="faq-title" />
        <div className="mx-auto max-w-[56rem]">
          <Faq items={faq.items} />
          <div className="mt-8 md:mt-10">
            <RelatedLinks links={page.related} />
          </div>
        </div>
      </Section>

      <FinalCta title={page.finalCta.title} text={page.finalCta.text} secondary={cta.podcast} />
    </>
  );
}
