import Image from "next/image";
import { PageHeader } from "@/components/page/PageHeader";
import { FactsTable, NumberChip, RelatedLinks, Section, SectionIntro, Steps, Todo } from "@/components/page/Blocks";
import { Faq } from "@/components/page/Faq";
import { FinalCta } from "@/components/blocks/FinalCta";
import { VideoTestimonial } from "@/components/blocks/VideoTestimonial";
import { ArrowLink, ButtonLink } from "@/components/ui/ButtonLink";
import { Placeholder } from "@/components/ui/Placeholder";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { JsonLd } from "@/components/seo/JsonLd";
import { withAccent as accent } from "@/lib/accent";
import { pageMeta } from "@/lib/metadata";
import { serviceSchema } from "@/lib/schema";
import { cta } from "@/content/site";
import { team } from "@/content/team";
import { pinelli } from "@/content/testimonials";
import { workById } from "@/content/work";
import { contentProduktionPage as page } from "@/content/pages/content-produktion";

export const metadata = pageMeta(page.meta);

export default function ContentProduktionPage() {
  const lead = workById(page.wall.lead.id);
  const person = team.find((p) => p.id === page.set.personId);

  return (
    <>
      <JsonLd data={serviceSchema({ ...page.schema, path: page.meta.path })} />

      <PageHeader
        crumbs={page.crumbs}
        meta={page.header.meta}
        title={[accent(page.header.title[0], page.header.accent), page.header.title[1]]}
        lead={page.header.lead}
        actions={
          <>
            <ButtonLink href={cta.primary.href} track="content-produktion-header">
              {cta.primary.label}
            </ButtonLink>
            <ArrowLink href={page.header.priceLink.href}>{page.header.priceLink.label}</ArrowLink>
          </>
        }
      />

      {/* Die Wand: jedes echte Werk genau einmal, ruhig im Raster, im dunklen Panel */}
      <section aria-labelledby="wand-title" className="studio">
        <div className="wrap sec-l">
          <SectionIntro meta={page.wall.platforms} title={page.wall.title} id="wand-title" />

          <div className="grid-12 gap-y-10">
            <figure className="col-span-4 mx-auto w-full max-w-[18rem] md:col-span-5 md:max-w-none">
              <VideoFrame src={lead.short} poster={lead.poster} label={`${lead.title}, eigenes Ad von eCreator`} />
              <figcaption className="t-meta mt-3 text-grey-400">
                {page.wall.lead.caption[0]} <span className="text-grey-500">/</span> {page.wall.lead.caption[1]}
              </figcaption>
            </figure>

            <div
              role="region"
              aria-label="Weitere Ads, auf dem Handy seitlich wischbar"
              tabIndex={0}
              className="col-span-4 -mx-[var(--margin)] snap-x snap-mandatory overflow-x-auto [scroll-padding-inline:var(--margin)] [scrollbar-width:none] md:col-span-7 md:mx-0 md:overflow-visible [&::-webkit-scrollbar]:hidden"
            >
              <ul className="flex w-max gap-[var(--gutter)] px-[var(--margin)] pb-2 md:grid md:w-full md:grid-cols-3 md:gap-y-8 md:px-0 md:pb-0 lg:grid-cols-4">
                {page.wall.items.map((it) => {
                  const w = workById(it.id);
                  return (
                    <li key={it.id} className="w-[42vw] max-w-[230px] snap-start md:w-auto md:max-w-none">
                      <VideoFrame src={w.short} poster={w.poster} label={`${w.title}, Social Ad, Thema ${w.theme}`} />
                      <p className="t-meta mt-3 text-grey-400">
                        {it.caption[0]} <span className="text-grey-500">/</span> {it.caption[1]}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Formate als Kartenraster: Name und Aufgabe */}
      <Section space="l" rule="none" labelledBy="formate-title">
        <SectionIntro meta={[page.formats.meta]} title={accent(page.formats.title, page.formats.accent)} id="formate-title">
          {page.formats.lead}
        </SectionIntro>
        <ul className="grid gap-[var(--gutter)] sm:grid-cols-2 lg:grid-cols-4">
          {page.formats.items.map((f, i) => (
            <li key={f.name} className="card flex flex-col items-start p-6 md:p-7">
              <div className="flex items-center gap-3">
                {/* Nummer rein dekorativ, die Liste trägt die Reihenfolge */}
                <span aria-hidden className="flex flex-none">
                  <NumberChip n={i + 1} />
                </span>
                <h3 className="t-h4">{f.name}</h3>
              </div>
              <p className="t-small mt-3 text-grey-600">{f.text}</p>
              {f.link && (
                <div className="mt-auto pt-4">
                  <ArrowLink href={f.link.href} className="text-[0.9375rem]">
                    {f.link.label}
                  </ArrowLink>
                </div>
              )}
            </li>
          ))}
        </ul>
      </Section>

      {/* Ablauf als Schrittfolge in Karten (geteilter Baustein) */}
      <Section mode="band" space="l" rule="none" labelledBy="ablauf-title">
        <SectionIntro meta={[page.process.meta]} title={page.process.title} id="ablauf-title">
          {page.process.lead}
        </SectionIntro>
        <Steps steps={page.process.steps} />
        <div className="mt-10 text-center">
          <ArrowLink href={page.process.link.href}>{page.process.link.label}</ArrowLink>
        </div>
      </Section>

      {/* Am Set: echte Person, fehlende Set-Fotos als markierte Bildplätze */}
      <Section space="l" rule="none" labelledBy="set-title">
        <div className="grid-12 items-center gap-y-10">
          <div className="col-span-4 md:col-span-7">
            <Placeholder
              label={page.set.placeholders[0].label}
              spec={page.set.placeholders[0].spec}
              ratio="3 / 2"
              tone="paper"
              className="rounded-[var(--radius-media)]"
            />
          </div>
          <div className="col-span-4 md:col-span-5">
            <p className="label-pill">{page.set.meta}</p>
            <h2 id="set-title" className="t-h2 mt-5">
              {page.set.title}
            </h2>
            <p className="t-body mt-4 text-grey-600">{page.set.text}</p>
            <div className="mt-8 grid grid-cols-2 gap-[var(--gutter)]">
              {person?.portrait && (
                <figure>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-media)] bg-paper-2">
                    <Image
                      src={person.portrait}
                      alt={`Porträt ${person.name}`}
                      fill
                      sizes="(min-width: 1024px) 14vw, (min-width: 768px) 20vw, 44vw"
                      className="object-cover grayscale"
                      style={person.objectPosition ? { objectPosition: person.objectPosition } : undefined}
                    />
                  </div>
                  <figcaption className="mt-3">
                    <span className="block text-[0.95rem] font-semibold leading-tight">{person.name}</span>
                    <span className="t-meta mt-1 block text-grey-600">{page.set.personLabel}</span>
                  </figcaption>
                </figure>
              )}
              <Placeholder
                label={page.set.placeholders[1].label}
                spec={page.set.placeholders[1].spec}
                ratio="4 / 5"
                tone="paper"
                className="rounded-[var(--radius-media)]"
              />
            </div>
            <p className="mt-5">
              <Todo>{page.set.todo}</Todo>
            </p>
          </div>
        </div>
      </Section>

      {/* Testimonial als Format: das Interview als Beispiel, ohne Behauptung, wer es gedreht hat */}
      <section aria-labelledby="stimme-title" className="studio sec-l">
        <div className="wrap">
          <SectionIntro meta={page.testimonial.meta} title={page.testimonial.title} id="stimme-title">
            <p>{page.testimonial.text}</p>
            <p className="t-small mt-4 text-grey-400">{page.testimonial.note}</p>
          </SectionIntro>
          <VideoTestimonial t={pinelli} headingLevel="h3" />
        </div>
      </section>

      {/* Einstieg: Content Day als Preiskarte, Datenblatt als zweite Hälfte derselben Karte */}
      <Section space="l" rule="none" labelledBy="einstieg-title">
        <SectionIntro meta={page.entry.meta} title={accent(page.entry.title, page.entry.accent)} id="einstieg-title">
          {page.entry.text}
        </SectionIntro>

        <div className="card mx-auto grid max-w-[60rem] overflow-hidden md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <div className="flex flex-col items-start p-6 md:p-8">
            <p className="t-meta text-grey-600">{page.entry.priceLabel}</p>
            <p className="mt-3 flex items-baseline gap-2">
              <span className="t-meta text-grey-600">ab CHF</span>
              <span className="t-num">{page.entry.price}</span>
            </p>
            <p className="t-meta mt-7 text-grey-600">{page.entry.includedLabel}</p>
            <ul className="check-list mt-4 space-y-3">
              {page.entry.included.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col items-start gap-4">
              <ButtonLink href={page.entry.primary.href} variant="line" track="content-produktion-entry">
                {page.entry.primary.label}
              </ButtonLink>
              <ArrowLink href={page.entry.podcast.href}>{page.entry.podcast.label}</ArrowLink>
            </div>
          </div>
          <div className="flex flex-col border-t border-line bg-paper-2/70 p-6 md:border-l md:border-t-0 md:p-8 [&_dl]:border-t-0">
            <FactsTable rows={page.entry.facts} />
            <div className="mt-6 md:mt-auto md:pt-8">
              <p className="t-small text-grey-700">{page.entry.packagesNote}</p>
              <ArrowLink href="/pakete" className="mt-1">
                Pakete ansehen
              </ArrowLink>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ in einer ruhigen Karte */}
      <Section mode="band" space="l" rule="none" labelledBy="faq-title">
        <SectionIntro meta={[page.faq.meta]} title={page.faq.title} id="faq-title" />
        <div className="mx-auto max-w-[56rem]">
          <Faq items={page.faq.items} />
        </div>
      </Section>

      {/* Weiterlesen als Karte (geteilter Baustein), gleich breit wie die FAQ-Karte */}
      <Section space="m" rule="none">
        <div className="mx-auto max-w-[56rem]">
          <RelatedLinks links={page.related} />
        </div>
      </Section>

      <FinalCta title={page.finalCta.title} text={page.finalCta.text} secondary={cta.contentDay} />
    </>
  );
}
