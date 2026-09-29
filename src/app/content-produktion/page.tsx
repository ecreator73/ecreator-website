import Image from "next/image";
import { PageHeader } from "@/components/page/PageHeader";
import { FactsTable, RelatedLinks, Section, SectionIntro, Steps, Todo } from "@/components/page/Blocks";
import { Faq } from "@/components/page/Faq";
import { FinalCta } from "@/components/blocks/FinalCta";
import { VideoTestimonial } from "@/components/blocks/VideoTestimonial";
import { ArrowLink, ButtonLink } from "@/components/ui/ButtonLink";
import { Placeholder } from "@/components/ui/Placeholder";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { JsonLd } from "@/components/seo/JsonLd";
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
        mode="studio"
        crumbs={page.crumbs}
        meta={page.header.meta}
        title={page.header.title}
        lead={page.header.lead}
        actions={
          <>
            <ButtonLink href={cta.primary.href} track="content-produktion-header">
              {cta.primary.label}
            </ButtonLink>
            <ArrowLink href={page.header.priceLink.href} className="text-paper">
              {page.header.priceLink.label}
            </ArrowLink>
          </>
        }
      />

      {/* Die Wand: jedes echte Werk genau einmal, ruhig im Raster */}
      <section aria-labelledby="wand-title" className="studio">
        <div className="wrap">
          <div className="sec-m border-t border-line">
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
                <ul className="flex w-max gap-[var(--gutter)] px-[var(--margin)] pb-2 md:grid md:w-full md:grid-cols-3 md:gap-y-10 md:px-0 md:pb-0">
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
        </div>
      </section>

      {/* Formate als Register: Name gross, Aufgabe daneben */}
      <Section space="l" rule="none" labelledBy="formate-title">
        <div className="grid-12 gap-y-12">
          <div className="col-span-4 md:col-span-4">
            <div className="md:sticky md:top-[calc(var(--header-h)+2rem)]">
              <p className="t-meta text-grey-600">{page.formats.meta}</p>
              <h2 id="formate-title" className="t-h2 mt-6" data-reveal>
                {page.formats.title}
              </h2>
              <p className="t-lead mt-6 max-w-[34ch] text-grey-700">{page.formats.lead}</p>
            </div>
          </div>
          <ul className="col-span-4 border-t border-ink md:col-span-8 lg:col-span-7 lg:col-start-6">
            {page.formats.items.map((f) => (
              <li key={f.name} className="grid gap-x-[var(--gutter)] gap-y-2 border-b border-line py-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:py-7">
                <h3 className="t-h3">
                  {f.name}
                </h3>
                <div className="sm:pt-1.5">
                  <p className="t-small text-grey-700">{f.text}</p>
                  {f.link && (
                    <ArrowLink href={f.link.href} className="mt-1 text-[0.9375rem]">
                      {f.link.label}
                    </ArrowLink>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Ablauf als Schrittfolge */}
      <Section mode="band" space="m" rule="none" labelledBy="ablauf-title">
        <SectionIntro meta={[page.process.meta]} title={page.process.title} id="ablauf-title">
          {page.process.lead}
        </SectionIntro>
        <Steps steps={page.process.steps} />
        <div className="mt-10 text-center">
          <ArrowLink href={page.process.link.href}>{page.process.link.label}</ArrowLink>
        </div>
      </Section>

      {/* Am Set: echte Person, fehlende Set-Fotos als markierte Bildplätze */}
      <Section space="m" rule="none" labelledBy="set-title">
        <div className="grid-12 items-center gap-y-10">
          <div className="col-span-4 md:col-span-7">
            <Placeholder label={page.set.placeholders[0].label} spec={page.set.placeholders[0].spec} ratio="3 / 2" tone="paper" />
          </div>
          <div className="col-span-4 md:col-span-5">
            <p className="t-meta text-grey-600">{page.set.meta}</p>
            <h2 id="set-title" className="t-h2 mt-4">
              {page.set.title}
            </h2>
            <p className="t-body mt-4 text-grey-700">{page.set.text}</p>
            <div className="mt-8 grid grid-cols-2 gap-[var(--gutter)]">
              {person?.portrait && (
                <figure>
                  <div className="relative aspect-[4/5] overflow-hidden bg-paper-2">
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
              <Placeholder label={page.set.placeholders[1].label} spec={page.set.placeholders[1].spec} ratio="4 / 5" tone="paper" />
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

      {/* Einstieg: Content Day als einfache Preiskarte neben dem Datenblatt */}
      <Section space="l" rule="none" labelledBy="einstieg-title">
        <SectionIntro meta={page.entry.meta} title={page.entry.title} id="einstieg-title">
          {page.entry.text}
        </SectionIntro>

        <div className="mx-auto grid max-w-[60rem] items-start gap-x-[calc(var(--gutter)*2)] gap-y-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <div className="flex flex-col items-start border-t border-ink pt-5">
            <p className="t-meta text-grey-600">{page.entry.priceLabel}</p>
            <p className="mt-3 flex items-baseline gap-2">
              <span className="t-meta text-grey-600">ab CHF</span>
              <span className="t-num">{page.entry.price}</span>
            </p>
            <div className="mt-7 flex flex-col items-start gap-4">
              <ButtonLink href={page.entry.primary.href} variant="ink" track="content-produktion-entry">
                {page.entry.primary.label}
              </ButtonLink>
              <ArrowLink href={page.entry.podcast.href}>{page.entry.podcast.label}</ArrowLink>
            </div>
          </div>
          <div>
            <FactsTable rows={page.entry.facts} />
            <p className="t-small mt-6 text-grey-700">{page.entry.packagesNote}</p>
            <ArrowLink href="/pakete" className="mt-1">
              Pakete ansehen
            </ArrowLink>
          </div>
        </div>
      </Section>

      <Section space="m" rule="ink" labelledBy="faq-title">
        <SectionIntro meta={[page.faq.meta]} title={page.faq.title} id="faq-title" />
        <Faq items={page.faq.items} />
      </Section>

      <Section space="s" rule="line">
        <RelatedLinks links={page.related} />
      </Section>

      <FinalCta title={page.finalCta.title} text={page.finalCta.text} secondary={cta.contentDay} />
    </>
  );
}
