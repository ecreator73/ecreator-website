import { PageHeader } from "@/components/page/PageHeader";
import { Definition, FactsTable, RelatedLinks, Section, SectionIntro, Steps, Todo } from "@/components/page/Blocks";
import { Faq } from "@/components/page/Faq";
import { FinalCta } from "@/components/blocks/FinalCta";
import { ArrowLink, ButtonLink } from "@/components/ui/ButtonLink";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta } from "@/lib/metadata";
import { serviceSchema } from "@/lib/schema";
import { cta } from "@/content/site";
import { workById } from "@/content/work";
import { socialRecruitingPage as page } from "@/content/pages/social-recruiting";

export const metadata = pageMeta(page.meta);

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
        title={page.header.title}
        lead={page.header.lead}
        actions={
          <>
            <ButtonLink href={cta.primary.href} track="social-recruiting-header">
              {cta.primary.label}
            </ButtonLink>
            <ArrowLink href={page.header.packageLink.href}>{page.header.packageLink.label}</ArrowLink>
          </>
        }
        aside={<FactsTable rows={page.header.facts} />}
      />

      {/* Gegenüberstellung: nüchternes Inserat-Muster gegen ein echtes Ad im Hochformat */}
      <Section space="l" rule="ink" labelledBy="versus-title">
        <SectionIntro meta={[versus.meta]} title={versus.title} id="versus-title" />

        <div className="grid-12 gap-y-16">
          {/* Links: Inserat */}
          <div className="col-span-4 md:col-span-6 lg:col-span-5">
            <h3 className="t-h3">{versus.ad.label}</h3>
            <div className="mt-6 border border-line-strong bg-paper-2 p-6 md:p-8" role="img" aria-label="Muster eines klassischen Stelleninserats">
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
            <div className="mt-8">
              <FactsTable rows={versus.ad.facts} />
            </div>
          </div>

          {/* Rechts: echtes Recruiting-Ad, Text oben neben dem Video */}
          <div className="col-span-4 md:col-span-6 md:border-l md:border-line md:pl-[var(--gutter)] lg:col-span-6 lg:col-start-7 lg:pl-[calc(var(--gutter)*2)]">
            <h3 className="t-h3">{versus.video.label}</h3>
            <div className="mt-6 grid gap-[var(--gutter)] gap-y-8 lg:grid-cols-[minmax(0,17rem)_1fr]">
              <figure className="max-w-[300px]">
                <VideoFrame src={ad.src} poster={ad.poster} mode="player" label={`${ad.title}, Ad für ${ad.client}`} />
                <figcaption className="t-meta mt-3 text-grey-700">
                  {versus.video.caption[0]} <span className="text-grey-500">/</span> {versus.video.caption[1]}
                </figcaption>
              </figure>
              <div>
                <p className="t-body text-grey-700">{versus.video.text}</p>
                <div className="mt-8">
                  <FactsTable rows={versus.video.facts} />
                </div>
                <div className="mt-6">
                  <ArrowLink href={versus.video.caseLink.href}>{versus.video.caseLink.label}</ArrowLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Paket: mittiger Kopf, links Preis und Abschluss, rechts die Bestandteile */}
      <Section id="paket" space="l" rule="ink" labelledBy="paket-title">
        <SectionIntro
          meta={[pack.meta]}
          id="paket-title"
          title={
            <>
              <span className="sr-only">Social Recruiting für CHF {pack.amount}. </span>
              {pack.title}
            </>
          }
        />

        <div className="grid-12 gap-y-12">
          <div className="col-span-4 flex flex-col items-start md:col-span-5 lg:col-span-4">
            <div className="w-full border-t border-ink pt-5">
              <p aria-hidden className="flex items-baseline gap-2">
                <span className="t-meta text-grey-600">CHF</span>
                <span className="t-num">{pack.amount}</span>
              </p>
              <p className="t-meta mt-2 text-grey-600">{pack.note}</p>
            </div>
            <ul className="t-body mt-6 space-y-3 text-grey-700">
              {pack.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
            <p className="mt-6">
              <Todo>{pack.todo}</Todo>
            </p>
            <div className="mt-8 flex flex-col items-start gap-5">
              <ButtonLink href={cta.recruiting.href} variant="ink" track="social-recruiting-package">
                {cta.recruiting.label}
              </ButtonLink>
              <ArrowLink href={pack.callLink.href}>{pack.callLink.label}</ArrowLink>
            </div>
          </div>

          <dl className="col-span-4 border-t border-ink md:col-span-7 lg:col-span-7 lg:col-start-6">
            {pack.groups.map((g) => (
              <div key={g.k} className="grid grid-cols-[minmax(6.5rem,30%)_1fr] gap-3 border-b border-line py-4 md:py-5">
                <dt className="t-meta pt-[0.3em] text-grey-600">{g.k}</dt>
                <dd>
                  <ul className="t-body">
                    {g.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
            <div className="grid grid-cols-[minmax(6.5rem,30%)_1fr] gap-3 border-b border-line py-4 md:py-5">
              <dt className="t-meta pt-[0.3em] text-grey-600">{pack.notIncluded.k}</dt>
              <dd className="t-body text-grey-700">{pack.notIncluded.v}</dd>
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

            <div role="table" aria-label="Personalvermittlung und Social Recruiting im Vergleich">
              <div role="rowgroup">
                <div role="row" className="hidden grid-cols-[7rem_1fr_1fr] gap-x-[var(--gutter)] border-b border-line-strong pb-3 md:grid">
                  <span role="columnheader">
                    <span className="sr-only">Merkmal</span>
                  </span>
                  {agency.columns.map((c) => (
                    <span key={c} role="columnheader" className="t-meta text-grey-400">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <div role="rowgroup" className="border-t border-line-strong md:border-t-0">
                {agency.rows.map((r) => (
                  <div key={r.k} role="row" className="grid gap-x-[var(--gutter)] gap-y-3 border-b border-line py-5 md:grid-cols-[7rem_1fr_1fr] md:py-6">
                    <span role="rowheader" className="t-meta pt-1 text-grey-400">
                      {r.k}
                    </span>
                    <span role="cell" className="t-body text-grey-400">
                      <span className="t-meta mb-1 block text-grey-500 md:hidden">{agency.columns[0]}</span>
                      {r.a}
                    </span>
                    <span role="cell" className="t-body">
                      <span className="t-meta mb-1 block text-grey-400 md:hidden">{agency.columns[1]}</span>
                      {r.b}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-4 md:col-span-12 lg:col-span-3 lg:col-start-10">
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

      {/* Ablauf */}
      <Section mode="band" space="m" rule="none" labelledBy="ablauf-title">
        <SectionIntro meta={[process.meta]} title={process.title} id="ablauf-title">
          {process.lead}
        </SectionIntro>
        <Steps steps={process.steps} />
      </Section>

      {/* Bewerber-System */}
      <Section space="l" rule="none" labelledBy="system-title">
        <SectionIntro meta={[system.meta]} title={system.title} id="system-title">
          {system.lead}
        </SectionIntro>
        <Definition term={system.term}>{system.definition}</Definition>

        <div className="mt-14 md:mt-16">
          <p className="t-meta mb-5 text-grey-600">{system.stationsNote}</p>
          <ol className="grid gap-y-0 md:grid-cols-4 md:gap-x-[var(--gutter)]">
            {system.stations.map((s, i) => (
              <li key={s.name} className="border-t border-ink py-5 md:pb-0 md:pt-6">
                <p className="flex items-baseline justify-between gap-4">
                  <span className="t-h3">{s.name}</span>
                  {i < system.stations.length - 1 && (
                    <span aria-hidden className="t-h4 text-grey-400">
                      <span className="md:hidden">↓</span>
                      <span className="hidden md:inline">→</span>
                    </span>
                  )}
                </p>
                <p className="t-small mt-3 max-w-[34ch] text-grey-700">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid-12 mt-14 gap-y-6 border-t border-line pt-8 md:mt-16">
          <p className="t-meta col-span-4 text-grey-600 md:col-span-3">{system.speed.k}</p>
          <p className="t-lead col-span-4 max-w-[52ch] md:col-span-7">{system.speed.v}</p>
          <div className="col-span-4 md:col-span-2 md:justify-self-end">
            <ArrowLink href={system.crmLink.href}>{system.crmLink.label}</ArrowLink>
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

      <FinalCta title={page.finalCta.title} text={page.finalCta.text} secondary={cta.recruiting} />
    </>
  );
}
