import { PageHeader } from "@/components/page/PageHeader";
import { FactsTable, RelatedLinks, Section, SectionIntro, Steps, Todo } from "@/components/page/Blocks";
import { Faq } from "@/components/page/Faq";
import { FinalCta } from "@/components/blocks/FinalCta";
import { VideoTestimonial } from "@/components/blocks/VideoTestimonial";
import { ArrowLink, ButtonLink } from "@/components/ui/ButtonLink";
import { Placeholder } from "@/components/ui/Placeholder";
import { Meta, Slashed } from "@/components/ui/Meta";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta } from "@/lib/metadata";
import { serviceSchema } from "@/lib/schema";
import { cta } from "@/content/site";
import { pinelli } from "@/content/testimonials";
import { podcastStudioPage as page } from "@/content/pages/podcast-studio";

export const metadata = pageMeta(page.meta);

/**
 * Studio / Media / Culture: die ganze Seite im Studio-Modus.
 * Sendungs-Titel in der H1, danach Preise, Studio, Formate.
 * Die Haarlinien der Bausteine (border-ink) werden auf der dunklen Fläche lokal sichtbar gemacht.
 */
export default function PodcastStudioPage() {
  const { header, prices, studio, formats, proof, process, extras, faq } = page;

  return (
    <>
      <JsonLd data={serviceSchema({ ...page.schema, path: page.meta.path })} />

      <div className="studio [&_.border-ink]:border-line-strong [&_summary_.text-grey-600]:text-grey-400">
        <PageHeader
          mode="studio"
          crumbs={page.crumbs}
          meta={header.meta}
          title={[
            <span key="t" className="t-h1 block">
              {header.title[0]}
            </span>,
            <span key="s" className="t-h2 mt-4 block text-grey-300 md:mt-6">
              {header.title[1]}
            </span>,
          ]}
          lead={header.lead}
          actions={
            <>
              <ButtonLink href={cta.podcast.href} variant="paper" track="podcast-header">
                {cta.podcast.label}
              </ButtonLink>
              <ArrowLink href={header.pricesLink.href} className="text-paper">
                {header.pricesLink.label}
              </ArrowLink>
            </>
          }
        />

        {/* Preise: zwei einfache Karten, darunter was im Preis ist und was auf Anfrage */}
        <section id="preise" aria-labelledby="preise-title" className="border-t border-line">
          <div className="wrap sec-l">
            <SectionIntro meta={[prices.meta]} title={prices.title} id="preise-title">
              {prices.lead}
            </SectionIntro>

            <dl className="mx-auto grid max-w-[48rem] gap-[var(--gutter)] sm:grid-cols-2">
              {prices.options.map((o) => (
                <div key={o.duration} className="border border-line-strong p-6 md:p-8">
                  <dt className="t-h4">{o.duration}</dt>
                  <dd className="mt-4 flex items-baseline gap-2">
                    <span className="t-meta text-grey-400">CHF</span>
                    <span className="t-num">{o.amount}</span>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mx-auto mt-8 grid max-w-[48rem] gap-x-[var(--gutter)] gap-y-5 sm:grid-cols-2">
              <p>
                <span className="t-meta block text-grey-400">{prices.includedLabel}</span>
                <Slashed items={prices.included} className="t-h4 mt-2 block" />
              </p>
              <p>
                <span className="t-meta block text-grey-400">{prices.onRequestLabel}</span>
                <Slashed items={prices.onRequest} className="t-h4 mt-2 block text-grey-300" />
              </p>
            </div>

            <div className="mt-10 flex flex-col items-center gap-4 text-center">
              <ButtonLink href={cta.podcast.href} variant="paper" track="podcast-prices">
                {cta.podcast.label}
              </ButtonLink>
              <p className="t-meta text-grey-400">{prices.note}</p>
            </div>
          </div>
        </section>

        {/* Das Studio: Bildplätze + Datenblatt, offene Angaben sichtbar markiert */}
        <Section space="m" rule="line" labelledBy="studio-title">
          <div className="grid-12 gap-y-12">
            <div className="col-span-4 md:col-span-7">
              <Placeholder label={studio.photos.wide.label} spec={studio.photos.wide.spec} ratio="3 / 2" />
              <div className="mt-[var(--gutter)] grid grid-cols-2 gap-[var(--gutter)]">
                <Placeholder label={studio.photos.mics.label} spec={studio.photos.mics.spec} ratio="4 / 5" />
                <Placeholder label={studio.photos.cams.label} spec={studio.photos.cams.spec} ratio="4 / 5" />
              </div>
            </div>
            <div className="order-first col-span-4 md:order-none md:col-span-5">
              <div className="md:sticky md:top-[calc(var(--header-h)+2rem)]">
                <p className="t-meta text-grey-400">{studio.meta}</p>
                <h2 id="studio-title" className="t-h2 mt-4">
                  {studio.title}
                </h2>
                <p className="t-body mt-4 text-grey-300">{studio.text}</p>
                <div className="mt-10">
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

        {/* Formate: vier einfache Karten, Name und Aufgabe */}
        <Section space="l" rule="ink" labelledBy="formate-title">
          <SectionIntro meta={[formats.meta]} title={formats.title} id="formate-title">
            {formats.lead}
          </SectionIntro>
          <ul className="mx-auto grid max-w-[60rem] gap-[var(--gutter)] md:grid-cols-2">
            {formats.items.map((f) => (
              <li key={f.name} className="border border-line-strong p-6 md:p-8">
                <h3 className="t-h3">{f.name}</h3>
                <p className="t-body mt-3 text-grey-300">{f.text}</p>
                {f.link && (
                  <ArrowLink href={f.link.href} className="mt-3 text-paper">
                    {f.link.label}
                  </ArrowLink>
                )}
              </li>
            ))}
          </ul>
        </Section>

        {/* Beleg für das Format: das Interview, ohne zu behaupten, es sei im Studio entstanden */}
        <Section space="l" rule="line" labelledBy="proof-title">
          <SectionIntro meta={proof.meta} title={proof.title} id="proof-title">
            <p>{proof.text}</p>
            <p className="t-small mt-4 text-grey-400">{proof.note}</p>
          </SectionIntro>
          <VideoTestimonial t={pinelli} headingLevel="h3" />
        </Section>

        {/* Ablauf einer Buchung, ohne erfundene Vorlaufzeiten */}
        <Section space="m" rule="ink" labelledBy="ablauf-title">
          <SectionIntro meta={[process.meta]} title={process.title} id="ablauf-title">
            {process.lead}
          </SectionIntro>
          <Steps steps={process.steps} />
        </Section>

        {/* Auf Anfrage: Schnitt, Planung und Strategie als kurzer, mittiger Abschnitt */}
        <Section space="l" rule="line" labelledBy="extras-title">
          <div className="mx-auto max-w-[46rem] text-center">
            <Meta className="mb-4 justify-center text-grey-400" items={[extras.meta]} />
            <h2 id="extras-title" className="t-h2 hyphens-manual" data-reveal>
              {extras.title}
            </h2>
            <p className="t-lead mx-auto mt-5 max-w-[52ch] text-grey-300">{extras.text}</p>
            <p className="t-small mx-auto mt-4 max-w-[52ch] text-grey-400">{extras.note}</p>
            <div className="mt-6">
              <ArrowLink href={extras.link.href} className="text-paper">
                {extras.link.label}
              </ArrowLink>
            </div>
          </div>
        </Section>

        <Section space="m" rule="ink" labelledBy="faq-title">
          <SectionIntro meta={[faq.meta]} title={faq.title} id="faq-title" />
          <Faq items={faq.items} />
        </Section>

        <Section space="s" rule="line">
          <RelatedLinks links={page.related} />
        </Section>
      </div>

      <FinalCta title={page.finalCta.title} text={page.finalCta.text} secondary={cta.podcast} />
    </>
  );
}
