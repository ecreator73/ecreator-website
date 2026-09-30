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
import { workById } from "@/content/work";
import { socialRecruitingPage as page } from "@/content/pages/social-recruiting";

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

export default function SocialRecruitingPage() {
  const { versus, pack, agency, process, system } = page;
  const ad = workById(versus.video.workId);
  const own = workById(agency.own.workId);

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
            <ButtonLink href={cta.primary.href} track="social-recruiting-header">
              {cta.primary.label}
            </ButtonLink>
            <ArrowLink href={page.header.packageLink.href}>{page.header.packageLink.label}</ArrowLink>
          </>
        }
        aside={<HeadFacts rows={page.header.facts} />}
      />

      {/* Gegenüberstellung: zwei Karten, nüchternes Inserat-Muster gegen ein echtes Ad im Hochformat */}
      <Section mode="band" space="l" rule="none" labelledBy="versus-title">
        <SectionIntro meta={[versus.meta]} title={withAccent(versus.title, versus.accent)} id="versus-title" />

        <div className="grid gap-4 md:gap-5 lg:grid-cols-2">
          {/* Links: Inserat */}
          <article className="card flex flex-col p-6 md:p-8">
            <h3 className="t-h3">{versus.ad.label}</h3>
            <div
              className="mt-6 rounded-2xl border border-line bg-paper-2 p-5 md:p-6"
              role="img"
              aria-label="Muster eines klassischen Stelleninserats"
            >
              <p className="t-meta text-grey-500">{versus.ad.sample.tag}</p>
              <p className="t-small mt-5 text-grey-700">{versus.ad.sample.intro}</p>
              <p className="t-h4 mt-2 text-grey-700">
                {versus.ad.sample.role} <span className="whitespace-nowrap">{versus.ad.sample.pensum}</span>
              </p>
              <dl className="mt-6 space-y-4">
                {versus.ad.sample.blocks.map((b) => (
                  <div key={b.k}>
                    <dt className="t-small font-semibold text-grey-700">{b.k}</dt>
                    <dd className="t-small text-grey-600">{b.v}</dd>
                  </div>
                ))}
              </dl>
              <p className="t-small mt-6 border-t border-line pt-4 text-grey-600">{versus.ad.sample.apply}</p>
            </div>
            <FactRows rows={versus.ad.facts} className="mt-auto pt-6" />
          </article>

          {/* Rechts: echtes Recruiting-Ad, Text neben dem Video */}
          <article className="card border-violet/25 p-6 md:p-8">
            <h3 className="t-h3">{versus.video.label}</h3>
            <div className="mt-6 grid gap-x-[var(--gutter)] gap-y-8 sm:grid-cols-[minmax(0,14rem)_1fr]">
              <figure className="max-w-[300px]">
                <VideoFrame src={ad.src} poster={ad.poster} mode="player" label={`${ad.title}, Ad für ${ad.client}`} />
                <figcaption className="t-meta mt-3 text-grey-700">
                  {versus.video.caption[0]} <span className="text-grey-500">/</span> {versus.video.caption[1]}
                </figcaption>
              </figure>
              <div>
                <p className="t-body text-grey-700">{versus.video.text}</p>
                <FactRows rows={versus.video.facts} className="mt-6" />
                <div className="mt-6">
                  <ArrowLink href={versus.video.caseLink.href}>{versus.video.caseLink.label}</ArrowLink>
                </div>
              </div>
            </div>
          </article>
        </div>
      </Section>

      {/* Paket: mittiger Kopf, eine Preiskarte. Links Preis und Abschluss, rechts die Bestandteile als Häkchen-Listen */}
      <Section id="paket" space="l" rule="none" labelledBy="paket-title">
        <SectionIntro
          meta={[pack.meta]}
          id="paket-title"
          title={
            <>
              <span className="sr-only">Social Recruiting für CHF {pack.amount}. </span>
              {withAccent(pack.title, pack.accent)}
            </>
          }
        />

        <div className="card mx-auto grid max-w-[68rem] overflow-hidden lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="flex flex-col items-start p-6 md:p-10">
            <p aria-hidden className="flex items-baseline gap-2">
              <span className="t-meta text-grey-600">CHF</span>
              <span className="t-num">{pack.amount}</span>
            </p>
            <p className="t-meta mt-2 text-grey-600">{pack.note}</p>
            <ul className="t-body mt-6 space-y-3 text-grey-700">
              {pack.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
            <p className="mt-6">
              <Todo>{pack.todo}</Todo>
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <ButtonLink href={cta.recruiting.href} variant="line" track="social-recruiting-package">
                {cta.recruiting.label}
              </ButtonLink>
              <ArrowLink href={pack.callLink.href}>{pack.callLink.label}</ArrowLink>
            </div>
          </div>

          <dl className="grid gap-x-8 gap-y-8 border-t border-line bg-paper-2/60 p-6 sm:grid-cols-2 md:p-10 lg:border-l lg:border-t-0">
            {pack.groups.map((g) => (
              <div key={g.k}>
                <dt className="t-meta text-grey-600">{g.k}</dt>
                <dd>
                  <ul className="check-list t-body mt-4 space-y-2.5">
                    {g.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
            <div>
              <dt className="t-meta text-grey-600">{pack.notIncluded.k}</dt>
              <dd className="t-body mt-4 text-grey-700">{pack.notIncluded.v}</dd>
            </div>
          </dl>
        </div>
      </Section>

      {/* Abgrenzung Personalvermittlung: Kopf und Vergleich links, das eigene Ad als Beleg rechts */}
      <Section mode="studio" space="l" rule="none" labelledBy="agency-title">
        <div className="grid-12 gap-y-12">
          <div className="col-span-4 md:col-span-12 lg:col-span-8">
            <SectionIntro variant="left" meta={[agency.meta]} title={agency.title} id="agency-title">
              {agency.lead}
            </SectionIntro>

            <div role="table" aria-label="Personalvermittlung und Social Recruiting im Vergleich" className="card px-5 py-2 md:px-8 md:py-4">
              <div role="rowgroup">
                <div role="row" className="hidden grid-cols-[7rem_1fr_1fr] gap-x-[var(--gutter)] border-b border-line py-4 md:grid">
                  <span role="columnheader">
                    <span className="sr-only">Merkmal</span>
                  </span>
                  {agency.columns.map((c, i) => (
                    <span key={c} role="columnheader" className={`t-meta ${i === 1 ? "text-violet-2" : "text-grey-400"}`}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <div role="rowgroup">
                {agency.rows.map((r) => (
                  <div
                    key={r.k}
                    role="row"
                    className="grid gap-x-[var(--gutter)] gap-y-3 border-b border-line py-5 last:border-b-0 md:grid-cols-[7rem_1fr_1fr] md:py-6"
                  >
                    <span role="rowheader" className="t-meta pt-1 text-grey-400">
                      {r.k}
                    </span>
                    <span role="cell" className="t-body text-grey-400">
                      <span className="t-meta mb-1 block text-grey-500 md:hidden">{agency.columns[0]}</span>
                      {r.a}
                    </span>
                    <span role="cell" className="t-body">
                      <span className="t-meta mb-1 block text-violet-2 md:hidden">{agency.columns[1]}</span>
                      {r.b}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-4 md:col-span-12 lg:col-span-3 lg:col-start-10 lg:self-end">
            <figure className="mx-auto max-w-[300px] lg:mx-0">
              <VideoFrame src={own.short} poster={own.poster} label={agency.own.label} />
              <figcaption className="mt-3">
                <span className="t-meta block text-grey-400">
                  {agency.own.caption[0]} <span className="text-grey-500">/</span> {agency.own.caption[1]}
                </span>
                <span className="t-small mt-4 block text-grey-300">{agency.own.text}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </Section>

      {/* Ablauf: fünf Schritte als Karten */}
      <Section mode="band" space="l" rule="none" labelledBy="ablauf-title">
        <SectionIntro meta={[process.meta]} title={process.title} id="ablauf-title">
          {process.lead}
        </SectionIntro>
        <ol className="grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-5">
          {process.steps.map((s, i) => (
            <li key={s.title} className="card flex gap-4 p-5 sm:flex-col sm:gap-0 sm:p-6">
              <span aria-hidden className="flex flex-none self-start">
                <NumberChip n={i + 1} />
              </span>
              <div className="min-w-0 sm:mt-5">
                <h3 className="t-h4">{s.title}</h3>
                <p className="t-small mt-2 text-grey-700">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Bewerber-System: Definition als Karte, darunter die Stationen einer Bewerbung */}
      <Section space="l" rule="none" labelledBy="system-title">
        <SectionIntro meta={[system.meta]} title={system.title} id="system-title">
          {system.lead}
        </SectionIntro>

        <div className="card mx-auto max-w-[56rem] p-6 md:p-10">
          <p className="t-meta text-grey-600">Definition</p>
          <p className="t-h3 mt-3 max-w-[40ch]">
            <dfn className="not-italic">{system.term}</dfn>
          </p>
          <p className="t-lead mt-4 max-w-[58ch] text-grey-700">{system.definition}</p>
        </div>

        <div className="mt-14 md:mt-16">
          <p className="t-meta mb-5 text-center text-grey-600">{system.stationsNote}</p>
          <ol className="grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
            {system.stations.map((s, i) => (
              <li key={s.name} className="card flex gap-4 p-5 sm:flex-col sm:gap-0 sm:p-6">
                {/* Mobile: Nummer mit Pfeil nach unten links, Desktop: Nummer und Pfeil nach rechts in einer Zeile.
                    Nummer und Pfeil sind reine Deko (die Liste ist schon geordnet), daher aria-hidden. */}
                <p aria-hidden className="flex shrink-0 flex-col items-center gap-2 sm:flex-row sm:justify-between sm:gap-4">
                  <NumberChip n={i + 1} />
                  {i < system.stations.length - 1 && (
                    <span className="t-h4 text-grey-400">
                      <span className="sm:hidden">↓</span>
                      <span className="hidden lg:inline">→</span>
                    </span>
                  )}
                </p>
                <div className="min-w-0 sm:mt-5">
                  <p className="t-h3">{s.name}</p>
                  <p className="t-small mt-2 text-grey-700">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8 grid gap-x-[var(--gutter)] gap-y-4 rounded-[var(--radius-card)] bg-violet/[0.07] p-6 md:grid-cols-[12rem_1fr_auto] md:items-center md:p-8">
          <p className="t-meta text-violet-deep">{system.speed.k}</p>
          <p className="t-lead max-w-[52ch]">{system.speed.v}</p>
          <div className="md:justify-self-end">
            <ArrowLink href={system.crmLink.href}>{system.crmLink.label}</ArrowLink>
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

      <FinalCta title={page.finalCta.title} text={page.finalCta.text} secondary={cta.recruiting} />
    </>
  );
}
