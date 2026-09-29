import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/page/PageHeader";
import { FactsTable, IndexList, RelatedLinks, Section, SectionIntro } from "@/components/page/Blocks";
import { Faq } from "@/components/page/Faq";
import { FinalCta } from "@/components/blocks/FinalCta";
import { ArrowLink, ButtonLink } from "@/components/ui/ButtonLink";
import { Meta } from "@/components/ui/Meta";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta } from "@/lib/metadata";
import { serviceSchema } from "@/lib/schema";
import { cta } from "@/content/site";
import { workById } from "@/content/work";
import { metaAdsPage as page } from "@/content/pages/meta-ads";

export const metadata = pageMeta(page.meta);

export default function MetaAdsPage() {
  const { anatomy, formats, destination, testing, proof, more } = page;
  const hero = workById(anatomy.videoId);
  const creative = workById(proof.videoId);

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
            <ButtonLink href={cta.primary.href} track="meta-header">
              {cta.primary.label}
            </ButtonLink>
            <ArrowLink href={page.header.secondaryLink.href}>{page.header.secondaryLink.label}</ArrowLink>
          </>
        }
      />

      {/* Aufbau eines Ads: das Video links, die fünf Teile als schlichte Liste daneben */}
      <Section space="m" rule="ink" labelledBy="aufbau-title">
        <SectionIntro meta={[anatomy.meta]} title={anatomy.title} id="aufbau-title" />
        <div className="grid-12 gap-y-10">
          <figure className="col-span-4 mx-auto w-[78%] md:col-span-5 md:mx-0 md:w-full lg:col-span-4 lg:col-start-2 xl:col-span-3 xl:col-start-3">
            <VideoFrame
              mode="player"
              src={hero.src}
              poster={hero.poster}
              label={`${hero.title}, Social Ad für ${anatomy.caption[1]}`}
            />
            <figcaption className="mt-3">
              <span className="t-meta block text-grey-700">
                {anatomy.caption[0]} <span className="text-grey-500">/</span> {anatomy.caption[1]}
              </span>
              <span className="t-small mt-2 block text-grey-600">{anatomy.exampleNote}</span>
            </figcaption>
          </figure>

          <div className="col-span-4 md:col-span-7 md:self-center lg:col-span-6 lg:col-start-7">
            <IndexList items={anatomy.parts} />
            <p className="t-body mt-6 text-grey-700">{anatomy.variants}</p>
          </div>
        </div>
      </Section>

      {/* Formate: drei Orte, drei Arten zu schauen */}
      <Section mode="band" space="m" rule="none" labelledBy="formate-title">
        <SectionIntro meta={[formats.meta]} title={formats.title} id="formate-title" />
        <ul className="grid gap-y-10 md:grid-cols-3 md:gap-x-[var(--gutter)]">
          {formats.items.map((f) => (
            <li key={f.name} className="border-t border-ink pt-5">
              <h3 className="t-h4">{f.name}</h3>
              <p className="t-small mt-2 max-w-[40ch] text-grey-700">{f.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Gegenüberstellung: Lead-Formular oder Landingpage, mit echtem Beispiel und Erfahrungswert */}
      <Section space="m" rule="ink" labelledBy="ziel-title">
        <SectionIntro meta={[destination.meta]} title={destination.title} id="ziel-title" />
        <div className="grid-12 gap-y-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-8">
            <div className="grid gap-y-10 lg:grid-cols-2 lg:gap-x-[var(--gutter)]">
              {destination.options.map((o) => (
                <div key={o.name} className="border-t border-ink pt-5">
                  <p className="t-meta text-grey-600">{o.sub}</p>
                  <h3 className="t-h3 mt-3">{o.name}</h3>
                  <p className="t-body mt-3 max-w-[44ch] text-grey-700">{o.text}</p>
                  <p className="t-small mt-5 max-w-[44ch] border-t border-line pt-4">{o.fit}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 border-t border-ink pt-5">
              <p className="t-meta text-grey-600">{destination.learning.label}</p>
              <p className="t-lead mt-3 max-w-[60ch]">{destination.learning.text}</p>
              <p className="t-meta mt-4 text-grey-600">{destination.learning.source}</p>
            </div>
          </div>

          <figure className="col-span-4 md:col-span-4 lg:col-span-3 lg:col-start-10">
            <div className="relative mx-auto aspect-[9/16] w-[62%] overflow-hidden bg-paper-2 md:w-full">
              <Image
                src={destination.example.src}
                alt={destination.example.alt}
                fill
                sizes="(min-width: 1024px) 22vw, (min-width: 768px) 38vw, 60vw"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="mx-auto mt-3 w-[62%] md:w-full">
              <span className="t-meta block text-grey-700">
                {destination.example.caption[0]} <span className="text-grey-500">/</span> {destination.example.caption[1]}
              </span>
              <span className="t-small mt-2 block text-grey-700">{destination.example.text}</span>
              <span className="t-meta mt-2 block text-grey-600">{destination.example.evidence}</span>
              <ArrowLink href={destination.example.link.href} className="mt-2 text-[0.9375rem]">
                {destination.example.link.label}
              </ArrowLink>
            </figcaption>
          </figure>
        </div>
      </Section>

      {/* Testing-Rhythmus im Studio: Titel mittig, darunter die vier Schritte als schlichte Reihe */}
      <Section mode="studio" space="m" rule="none" labelledBy="testing-title">
        <SectionIntro title={testing.title} id="testing-title">
          {testing.text}
        </SectionIntro>
        <ol className="grid grid-cols-2 border-t border-line md:grid-cols-4">
          {testing.words.map((w, i) => (
            <li
              key={w}
              className={`border-b border-line py-5 ${i % 2 === 1 ? "border-l pl-4" : "pr-4"} md:border-l md:px-5 md:first:border-l-0 md:first:pl-0`}
            >
              <p className="t-meta text-grey-400">{String(i + 1).padStart(2, "0")}</p>
              <p className="t-h4 mt-2">{w}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          <p className="t-h4 text-grey-400">{testing.again.join(" ")}</p>
          <p className="t-small text-grey-400">{testing.note}</p>
          <ArrowLink href={testing.link.href} className="mt-2 text-paper">
            {testing.link.label}
          </ArrowLink>
        </div>
      </Section>

      {/* Proof: Finanz-Case als Datenblatt neben dem Ad */}
      <Section space="m" rule="none" labelledBy="case-title">
        <div className="grid-12 gap-y-10">
          <figure className="order-last col-span-4 mx-auto w-[62%] md:order-none md:col-span-4 md:mx-0 md:w-full">
            <VideoFrame src={creative.short} poster={creative.poster} label={`${creative.title}, Social Ad, Thema ${creative.theme}`} />
            <figcaption className="t-meta mt-3 text-grey-700">
              {proof.caption[0]} <span className="text-grey-500">/</span> {proof.caption[1]}
            </figcaption>
          </figure>
          <div className="col-span-4 md:col-span-8 md:self-center lg:col-span-7 lg:col-start-6">
            <Meta items={proof.meta} className="text-grey-600" />
            <h2 id="case-title" className="t-h2 mt-4" data-reveal>
              {proof.title}
            </h2>
            <p className="t-lead mt-5 max-w-[48ch] text-grey-700">{proof.text}</p>
            <div className="mt-8">
              <FactsTable rows={proof.facts} />
            </div>
            <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <ArrowLink href={proof.link.href}>{proof.link.label}</ArrowLink>
              <p className="t-meta text-grey-600">{proof.source}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Was sonst dazugehört: Titel mittig, vier Punkte darunter */}
      <Section mode="band" space="m" rule="none" labelledBy="mehr-title">
        <SectionIntro meta={[more.meta]} title={more.title} id="mehr-title" />
        <ul className="grid gap-x-[var(--gutter)] md:grid-cols-2 lg:grid-cols-4">
          {more.items.map((m) => (
            <li key={m.title} className="border-t border-ink py-6 md:pb-8">
              <h3 className="t-h4">{m.title}</h3>
              <p className="t-small mt-2 max-w-[44ch] text-grey-700">{m.text}</p>
              {"link" in m && m.link && (
                <Link href={m.link.href} className="link mt-2 inline-flex min-h-11 items-center font-semibold">
                  {m.link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
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
