import Image from "next/image";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/page/PageHeader";
import { NumberChip, RelatedLinks, Section, SectionIntro, Todo } from "@/components/page/Blocks";
import { Faq } from "@/components/page/Faq";
import { FinalCta } from "@/components/blocks/FinalCta";
import { ArrowLink, ButtonLink } from "@/components/ui/ButtonLink";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { JsonLd } from "@/components/seo/JsonLd";
import { withAccent } from "@/lib/accent";
import { pageMeta } from "@/lib/metadata";
import { serviceSchema } from "@/lib/schema";
import { cta } from "@/content/site";
import { team } from "@/content/team";
import { workById } from "@/content/work";
import { socialMediaPage as page } from "@/content/pages/social-media";

export const metadata = pageMeta(page.meta);

/** Fakten im Seitenkopf: ruhiges Raster statt Tabelle, die Karte liefert der PageHeader. */
function HeadFacts({ rows }: { rows: { k: string; v: ReactNode }[] }) {
  return (
    <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
      {rows.map((r) => (
        <div key={r.k} className="min-w-0">
          <dt className="t-meta text-grey-600">{r.k}</dt>
          <dd className="t-body mt-1">{r.v}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Schlüssel / Wert mit feinen Linien, für Fakten innerhalb einer Karte. */
function FactRows({ rows, className = "" }: { rows: { k: string; v: ReactNode }[]; className?: string }) {
  return (
    <dl className={`divide-y divide-line ${className}`}>
      {rows.map((r) => (
        <div key={r.k} className="grid grid-cols-[minmax(0,38%)_minmax(0,1fr)] gap-3 py-3.5">
          <dt className="t-meta min-w-0 hyphens-auto pt-[0.3em] text-grey-600 [overflow-wrap:anywhere]">{r.k}</dt>
          <dd className="t-body">{r.v}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function SocialMediaPage() {
  const person = team.find((p) => p.id === page.parts.personId);
  const frames = page.plan.frames.map((f) => ({ ...f, work: workById(f.id) }));

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
            <ButtonLink href={cta.primary.href} track="social-media-header">
              {cta.primary.label}
            </ButtonLink>
            <ArrowLink href="#redaktionsplan">Redaktionsplan ansehen</ArrowLink>
          </>
        }
        aside={<HeadFacts rows={page.header.facts} />}
      />

      {/* Abgrenzung: mittiger Kopf, darunter vier Karten. Oben durchgestrichen, darunter, was stattdessen zählt. */}
      <Section mode="band" space="l" rule="none" labelledBy="abgrenzung-title">
        <SectionIntro
          meta={[page.contrast.meta]}
          title={withAccent(page.contrast.title, page.contrast.accent)}
          id="abgrenzung-title"
        >
          {page.contrast.lead}
        </SectionIntro>

        <ul className="mx-auto grid max-w-[68rem] gap-4 md:grid-cols-2 md:gap-5">
          {page.contrast.rows.map((r, i) => (
            <li key={r.not} className="card flex flex-col p-6 md:p-8">
              <p>
                <span className="sr-only">Nicht: </span>
                <span className="strike t-h4" style={{ ["--d" as string]: `${i * 140}ms` }}>
                  {r.not}
                </span>
              </p>
              <p className="t-body mt-4 border-t border-line pt-4 text-grey-700">
                <span className="sr-only">Sondern: </span>
                {r.but}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Vier Teile + Person: Kopf links, die vier Teile als Karten rechts */}
      <Section space="l" rule="none" labelledBy="teile-title">
        <div className="grid-12 gap-y-10">
          <div className="col-span-4 md:col-span-12 lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <SectionIntro variant="left" meta={[page.parts.meta]} title={page.parts.title} id="teile-title">
                {page.parts.lead}
              </SectionIntro>
              {person?.portrait && (
                <figure className="flex items-center gap-4">
                  <div className="relative aspect-[4/5] w-24 shrink-0 overflow-hidden rounded-[var(--radius-media)] bg-paper-2 md:w-28">
                    <Image
                      src={person.portrait}
                      alt={`Porträt ${person.name}`}
                      fill
                      sizes="112px"
                      className="object-cover"
                      style={person.objectPosition ? { objectPosition: person.objectPosition } : undefined}
                    />
                  </div>
                  <figcaption>
                    <span className="t-h4 block">{person.name}</span>
                    <span className="t-small mt-1 block text-grey-600">{page.parts.personLabel}</span>
                  </figcaption>
                </figure>
              )}
            </div>
          </div>

          <div className="col-span-4 md:col-span-12 lg:col-span-8">
            <ol className="grid gap-4 sm:grid-cols-2 md:gap-5">
              {page.parts.items.map((it, i) => (
                <li key={it.title} className="card flex gap-4 p-5 sm:flex-col sm:gap-0 sm:p-6 md:p-8">
                  <span aria-hidden className="flex flex-none self-start">
                    <NumberChip n={i + 1} />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col sm:mt-5">
                    <h3 className="t-h3">{it.title}</h3>
                    <p className="t-small mt-2 text-grey-700">{it.text}</p>
                    {it.link && (
                      <div className="mt-auto pt-5">
                        <ArrowLink href={it.link.href} className="t-small text-ink">
                          {it.link.label}
                        </ArrowLink>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6">
              <Todo>{page.parts.todo}</Todo>
            </p>
          </div>
        </div>
      </Section>

      {/* Redaktionsplan: mittiger Kopf, darunter der Monat als Tabelle in einer Karte und zwei echte 9:16-Formate */}
      <Section id="redaktionsplan" mode="band" space="l" rule="none" labelledBy="plan-title">
        <SectionIntro meta={page.plan.meta} title={withAccent(page.plan.title, page.plan.accent)} id="plan-title">
          {page.plan.lead}
        </SectionIntro>

        <div className="grid-12 gap-y-10">
          <div className="col-span-4 md:col-span-12 lg:col-span-8">
            <div className="card p-5 md:p-8">
              {/* Spaltenköpfe (Desktop). Auf Mobile trägt jede Zelle ihre Rolle selbst. */}
              <div aria-hidden className="hidden grid-cols-[6.5rem_repeat(3,minmax(0,1fr))] gap-x-[var(--gutter)] border-b border-line pb-4 md:grid">
                <span />
                {page.plan.roles.map((r) => (
                  <span key={r.name}>
                    <span className="t-meta block text-violet-deep">{r.name}</span>
                    <span className="t-small mt-1 block text-grey-600">{r.text}</span>
                  </span>
                ))}
              </div>

              <ol aria-label="Redaktionsplan, Beispiel für einen Monat">
                {page.plan.weeks.map((w) => (
                  <li
                    key={w.label}
                    className="grid gap-x-[var(--gutter)] border-b border-line py-5 first:pt-1 md:grid-cols-[6.5rem_repeat(3,minmax(0,1fr))] md:py-6 md:first:pt-6"
                  >
                    <h3 className="t-meta-lg pb-2 pt-1 md:pb-0">{w.label}</h3>
                    {w.cells.map((c, i) => (
                      <div
                        key={c.format}
                        className="border-t border-line py-3 first-of-type:border-t-0 md:border-t-0 md:py-0"
                      >
                        <p className="t-meta mb-1 text-violet-deep md:sr-only">{page.plan.roles[i].name}</p>
                        <div>
                          <p className="t-h4">{c.format}</p>
                          <p className="t-small mt-1.5 text-grey-700">{c.text}</p>
                        </div>
                      </div>
                    ))}
                  </li>
                ))}
              </ol>

              <div className="mt-6 grid gap-x-[var(--gutter)] gap-y-2 rounded-2xl bg-violet/[0.07] p-5 md:grid-cols-[6.5rem_1fr] md:p-6">
                <p className="t-meta-lg text-violet-deep">{page.plan.loop.label}</p>
                <p className="t-body max-w-[58ch]">{page.plan.loop.text}</p>
              </div>
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

      {/* Kanäle auf Dunkel: mittiger Kopf, vier Karten */}
      <Section mode="studio" space="m" rule="none" labelledBy="kanaele-title">
        <SectionIntro meta={[page.channels.meta]} title={page.channels.title} id="kanaele-title">
          {page.channels.note}
        </SectionIntro>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {page.channels.items.map((c) => (
            <li key={c.name} className="card p-6">
              <h3 className="t-h3">{c.name}</h3>
              <p className="t-small mt-2 text-grey-300">{c.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Preis: eine Preiskarte, links Paketpreis und Handlung, rechts Inhalt und Bedingungen */}
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

        <div className="card mx-auto grid max-w-[68rem] overflow-hidden lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="flex flex-col items-start p-6 md:p-10">
            <p aria-hidden className="flex items-baseline gap-2">
              <span className="t-meta text-grey-600">CHF</span>
              <span className="t-num">{page.price.amount}</span>
            </p>
            <p className="t-meta mt-2 text-grey-600">{page.price.unit}</p>
            <p className="t-body mt-6 text-grey-700">{page.price.text}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <ButtonLink href={cta.primary.href} track="social-media-price">
                {cta.primary.label}
              </ButtonLink>
              <ArrowLink href={page.price.packagesLink.href}>{page.price.packagesLink.label}</ArrowLink>
            </div>
          </div>

          <div className="border-t border-line bg-paper-2/60 p-6 md:p-10 lg:border-l lg:border-t-0">
            <p className="t-meta text-grey-600">{page.price.includesLabel}</p>
            <ul className="check-list t-body mt-5 space-y-3">
              {page.price.includes.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <FactRows rows={page.price.facts} className="mt-8 border-t border-line" />
          </div>
        </div>
      </Section>

      <Section mode="band" space="l" rule="none" labelledBy="faq-title">
        <SectionIntro meta={[page.faq.meta]} title={page.faq.title} id="faq-title" />
        <div className="mx-auto max-w-[60rem]">
          <Faq items={page.faq.items} />
        </div>
      </Section>

      {/* Verwandte Seiten als Karten */}
      <Section space="m" rule="none">
        <RelatedLinks layout="grid" links={page.related} />
      </Section>

      <FinalCta title={page.finalCta.title} secondary={page.finalCta.secondary} />
    </>
  );
}
