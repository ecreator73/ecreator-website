import Image from "next/image";
import { PageHeader } from "@/components/page/PageHeader";
import { FactsTable, IndexList, RelatedLinks, Section, SectionIntro, Todo } from "@/components/page/Blocks";
import { Faq } from "@/components/page/Faq";
import { FinalCta } from "@/components/blocks/FinalCta";
import { ArrowLink, ButtonLink } from "@/components/ui/ButtonLink";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta } from "@/lib/metadata";
import { serviceSchema } from "@/lib/schema";
import { cta } from "@/content/site";
import { team } from "@/content/team";
import { workById } from "@/content/work";
import { socialMediaPage as page } from "@/content/pages/social-media";

export const metadata = pageMeta(page.meta);

export default function SocialMediaPage() {
  const person = team.find((p) => p.id === page.parts.personId);
  const frames = page.plan.frames.map((f) => ({ ...f, work: workById(f.id) }));

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
            <ButtonLink href={cta.primary.href} track="social-media-header">
              {cta.primary.label}
            </ButtonLink>
            <ArrowLink href="#redaktionsplan">Redaktionsplan ansehen</ArrowLink>
          </>
        }
        aside={<FactsTable rows={page.header.facts} />}
      />

      {/* Abgrenzung: mittiger Kopf, darunter eine schlichte Gegenüberstellung in zwei Spalten */}
      <Section space="l" rule="ink" labelledBy="abgrenzung-title">
        <SectionIntro meta={[page.contrast.meta]} title={page.contrast.title} id="abgrenzung-title">
          {page.contrast.lead}
        </SectionIntro>

        <ul className="border-t border-ink">
          {page.contrast.rows.map((r, i) => (
            <li key={r.not} className="grid gap-x-[var(--gutter)] gap-y-2 border-b border-line py-5 md:grid-cols-2 md:py-6">
              <p>
                <span className="sr-only">Nicht: </span>
                <span className="strike t-h4" style={{ ["--d" as string]: `${i * 140}ms` }}>
                  {r.not}
                </span>
              </p>
              <p className="t-body text-grey-700">
                <span className="sr-only">Sondern: </span>
                {r.but}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Vier Teile + Person: Kopf links neben der Liste */}
      <Section space="m" rule="none" labelledBy="teile-title">
        <div className="grid-12 gap-y-12">
          <div className="col-span-4 md:col-span-5 lg:col-span-4">
            <div className="md:sticky md:top-[calc(var(--header-h)+2rem)]">
              <SectionIntro variant="left" meta={[page.parts.meta]} title={page.parts.title} id="teile-title">
                {page.parts.lead}
              </SectionIntro>
              {person?.portrait && (
                <figure className="grid grid-cols-[minmax(0,8.5rem)_1fr] items-end gap-[var(--gutter)] md:grid-cols-[minmax(0,10rem)_1fr]">
                  <div className="relative aspect-[4/5] overflow-hidden bg-paper-2">
                    <Image
                      src={person.portrait}
                      alt={`Porträt ${person.name}`}
                      fill
                      sizes="(min-width: 768px) 160px, 136px"
                      className="object-cover grayscale"
                      style={person.objectPosition ? { objectPosition: person.objectPosition } : undefined}
                    />
                  </div>
                  <figcaption>
                    <span className="t-h4 block">{person.name}</span>
                    <span className="t-meta mt-1.5 block text-grey-600">{page.parts.personLabel}</span>
                  </figcaption>
                </figure>
              )}
            </div>
          </div>

          <div className="col-span-4 md:col-span-7 lg:col-span-7 lg:col-start-6">
            <IndexList
              items={page.parts.items.map((it) => ({
                title: it.title,
                text: (
                  <>
                    {it.text}
                    {it.link && (
                      <span className="mt-1 block">
                        <ArrowLink href={it.link.href} className="t-small text-ink">
                          {it.link.label}
                        </ArrowLink>
                      </span>
                    )}
                  </>
                ),
              }))}
            />
            <p className="mt-6">
              <Todo>{page.parts.todo}</Todo>
            </p>
          </div>
        </div>
      </Section>

      {/* Redaktionsplan: mittiger Kopf, darunter der Monat als Tabelle und zwei echte 9:16-Formate */}
      <Section id="redaktionsplan" mode="band" space="l" rule="none" labelledBy="plan-title">
        <SectionIntro meta={page.plan.meta} title={page.plan.title} id="plan-title">
          {page.plan.lead}
        </SectionIntro>

        <div className="grid-12 gap-y-12">
          <div className="col-span-4 md:col-span-12 lg:col-span-8">
            {/* Spaltenköpfe (Desktop). Auf Mobile trägt jede Zelle ihre Rolle selbst. */}
            <div aria-hidden className="hidden grid-cols-[6.5rem_repeat(3,minmax(0,1fr))] gap-x-[var(--gutter)] border-b border-ink pb-4 md:grid">
              <span />
              {page.plan.roles.map((r) => (
                <span key={r.name}>
                  <span className="t-meta block">{r.name}</span>
                  <span className="t-small mt-1 block text-grey-600">{r.text}</span>
                </span>
              ))}
            </div>

            <ol aria-label="Redaktionsplan, Beispiel für einen Monat" className="border-t border-ink md:border-t-0">
              {page.plan.weeks.map((w) => (
                <li
                  key={w.label}
                  className="grid gap-x-[var(--gutter)] border-b border-line py-6 md:grid-cols-[6.5rem_repeat(3,minmax(0,1fr))] md:py-7"
                >
                  <h3 className="t-meta-lg pb-3 pt-1 md:pb-0">{w.label}</h3>
                  {w.cells.map((c, i) => (
                    <div
                      key={c.format}
                      className="grid grid-cols-[8.5rem_1fr] gap-x-3 border-t border-line py-3 first-of-type:border-t-0 xs:grid-cols-[9rem_1fr] md:block md:border-t-0 md:py-0"
                    >
                      <p className="t-meta pt-1 text-grey-600 md:sr-only">{page.plan.roles[i].name}</p>
                      <div>
                        <p className="t-h4">{c.format}</p>
                        <p className="t-small mt-1.5 text-grey-700">{c.text}</p>
                      </div>
                    </div>
                  ))}
                </li>
              ))}
            </ol>

            <div className="mt-6 grid gap-x-[var(--gutter)] gap-y-2 md:grid-cols-[6.5rem_1fr]">
              <p className="t-meta-lg">{page.plan.loop.label}</p>
              <p className="t-body max-w-[58ch]">{page.plan.loop.text}</p>
            </div>
          </div>

          <div className="col-span-4 md:col-span-12 lg:col-span-4">
            <ul className="grid grid-cols-2 gap-[var(--gutter)] md:mx-auto md:max-w-[34rem] lg:max-w-none">
              {frames.map((f) => (
                <li key={f.id}>
                  <VideoFrame src={f.work.short} poster={f.work.poster} label={f.label} />
                  <p className="t-meta mt-3 text-grey-700">
                    {f.caption[0]} <span className="text-grey-500">/</span> {f.caption[1]}
                  </p>
                </li>
              ))}
            </ul>
            <p className="t-small mt-6 text-grey-600 md:text-center lg:text-left">{page.plan.framesNote}</p>
          </div>
        </div>
      </Section>

      {/* Kanäle auf Dunkel: mittiger Kopf, vier schlichte Spalten */}
      <Section mode="studio" space="m" rule="none" labelledBy="kanaele-title">
        <SectionIntro meta={[page.channels.meta]} title={page.channels.title} id="kanaele-title">
          {page.channels.note}
        </SectionIntro>
        <ul className="grid gap-x-[var(--gutter)] md:grid-cols-2 lg:grid-cols-4">
          {page.channels.items.map((c) => (
            <li key={c.name} className="border-t border-line-strong py-5 md:py-6">
              <h3 className="t-h3">{c.name}</h3>
              <p className="t-small mt-2 text-grey-300">{c.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Preis: Paketpreis als schlichte Zahl neben den Details */}
      <Section space="l" rule="none" labelledBy="preis-title">
        <SectionIntro
          meta={[page.price.meta]}
          id="preis-title"
          title={
            <>
              <span className="sr-only">
                CHF {page.price.amount} {page.price.unit}.{" "}
              </span>
              {page.price.title}
            </>
          }
        />

        <div className="grid-12 gap-y-10">
          <div className="col-span-4 flex flex-col items-start md:col-span-5 lg:col-span-4">
            <div className="w-full border-t border-ink pt-5">
              <p aria-hidden className="flex items-baseline gap-2">
                <span className="t-meta text-grey-600">CHF</span>
                <span className="t-num">{page.price.amount}</span>
              </p>
              <p className="t-meta mt-2 text-grey-600">{page.price.unit}</p>
            </div>
            <p className="t-body mt-6 text-grey-700">{page.price.text}</p>
            <div className="mt-8 flex flex-col items-start gap-5">
              <ButtonLink href={cta.primary.href} track="social-media-price">
                {cta.primary.label}
              </ButtonLink>
              <ArrowLink href={page.price.packagesLink.href}>{page.price.packagesLink.label}</ArrowLink>
            </div>
          </div>
          <div className="col-span-4 md:col-span-7 lg:col-span-7 lg:col-start-6">
            <FactsTable
              rows={[
                {
                  k: page.price.includesLabel,
                  v: (
                    <ul>
                      {page.price.includes.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                  ),
                },
                ...page.price.facts,
              ]}
            />
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

      <FinalCta title={page.finalCta.title} secondary={page.finalCta.secondary} />
    </>
  );
}
