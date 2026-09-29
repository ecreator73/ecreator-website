import { PageHeader } from "@/components/page/PageHeader";
import { RelatedLinks, Section, SectionIntro, Todo } from "@/components/page/Blocks";
import { Faq } from "@/components/page/Faq";
import { FinalCta } from "@/components/blocks/FinalCta";
import { ArrowLink, ButtonLink } from "@/components/ui/ButtonLink";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta } from "@/lib/metadata";
import { serviceSchema } from "@/lib/schema";
import { cta } from "@/content/site";
import { workById } from "@/content/work";
import { contentDayPage as page, type RateRow } from "@/content/pages/content-day";

export const metadata = pageMeta(page.meta);

/** Eine Zeile der Content-Day-Preisliste. Auf Mobile trägt die Zeile Dauer und Frist selbst. */
function RateLine({ r }: { r: RateRow }) {
  return (
    <tr className="border-b border-line align-baseline">
      <th scope="row" className="py-5 pr-4 text-left font-normal md:py-6">
        <span className="t-h4 block">{r.name}</span>
        <span className="t-small mt-1 block max-w-[38ch] text-grey-300">{r.detail}</span>
        <span className="t-meta mt-2 block text-grey-400 md:hidden">
          {r.duration} <span className="text-grey-500">/</span> fertig {r.delivery}
        </span>
        {r.todo && (
          <span className="mt-3 block">
            <Todo>{r.todo}</Todo>
          </span>
        )}
      </th>
      <td className="t-meta-lg hidden whitespace-nowrap py-6 pr-4 md:table-cell">{r.duration}</td>
      <td className="t-meta-lg hidden py-6 pr-4 md:table-cell">{r.delivery}</td>
      <td className="whitespace-nowrap py-5 text-right md:py-6">
        {r.price ? (
          <>
            <span className="t-meta mr-2 text-grey-400">CHF</span>
            <span className="t-num">{r.price}</span>
          </>
        ) : (
          <span className="t-h4">auf Anfrage</span>
        )}
      </td>
    </tr>
  );
}

export default function ContentDayPage() {
  const { poster } = page.header;
  const planRows = page.plan.rows;

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
            <ButtonLink href={cta.contentDay.href} variant="paper" track="content-day-header">
              {cta.contentDay.label}
            </ButtonLink>
            <ButtonLink href={cta.primary.href} track="content-day-header-call">
              {cta.primary.label}
            </ButtonLink>
          </>
        }
        aside={
          /* Der Einstiegspreis: kurz und mittig, die ganze Preisliste folgt direkt darunter */
          <div className="text-center">
            <p className="t-meta text-grey-400">{poster.label}</p>
            <p className="mt-3 flex items-baseline justify-center gap-2">
              <span className="t-meta text-grey-400">ab CHF</span>
              <span className="t-num">{poster.from}</span>
            </p>
            <dl className="t-small mt-4 flex flex-wrap justify-center gap-x-5 gap-y-1 text-grey-300">
              {poster.rows.map((row) => (
                <div key={row.k} className="flex gap-1.5">
                  <dt>{row.k}</dt>
                  <dd className="text-paper">{row.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        }
      />

      {/* Preisliste: alle Optionen aus offers.ts als einfache Tabelle */}
      <section aria-labelledby="preise-title" className="studio">
        <div className="wrap">
          <div className="sec-l border-t border-line">
            <SectionIntro meta={[page.rates.meta]} title={page.rates.title} id="preise-title">
              {page.rates.always}
            </SectionIntro>
            <div className="mx-auto max-w-[60rem]">
              <table className="w-full border-collapse">
                <caption className="sr-only">Preise Content Day in CHF</caption>
                <thead className="t-meta text-grey-400">
                  <tr className="border-b border-line-strong">
                    <th scope="col" className="py-3 pr-4 text-left font-normal">
                      Option
                    </th>
                    <th scope="col" className="hidden py-3 pr-4 text-left font-normal md:table-cell">
                      Dauer
                    </th>
                    <th scope="col" className="hidden py-3 pr-4 text-left font-normal md:table-cell">
                      Fertigstellung
                    </th>
                    <th scope="col" className="py-3 text-right font-normal">
                      Preis
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {page.rates.rows.map((r) => (
                    <RateLine key={r.id} r={r} />
                  ))}
                </tbody>
                <tbody>
                  <tr className="border-b border-line-strong">
                    <th scope="rowgroup" colSpan={4} className="t-meta pb-3 pt-12 text-left font-normal text-grey-400">
                      {page.rates.existingGroup}
                    </th>
                  </tr>
                  <RateLine r={page.rates.existing} />
                </tbody>
              </table>
              <p className="t-small mt-5 text-grey-300">{page.rates.express}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Wofür: Einsätze als schlichte Liste, Events und Testimonials als Full Content Day markiert */}
      <Section space="l" rule="none" labelledBy="wofuer-title">
        <SectionIntro meta={[page.uses.meta]} title={page.uses.title} id="wofuer-title">
          {page.uses.text}
        </SectionIntro>
        <ul className="mx-auto flex max-w-[64rem] flex-wrap justify-center gap-2.5">
          {page.uses.general.map((u) => (
            <li key={u} className="t-small border border-line-strong px-4 py-2 font-semibold">
              {u}
            </li>
          ))}
          {page.uses.fullDay.map((u) => (
            <li key={u} className="t-small border border-line px-4 py-2 font-semibold text-grey-600">
              {u}
            </li>
          ))}
        </ul>
        <p className="t-small mt-5 text-center text-grey-600">{page.uses.fullDayNote}</p>
      </Section>

      {/* Drehplan: fünf Schritte, gruppiert nach vor / am / nach dem Dreh, ohne Uhrzeiten */}
      <Section space="m" rule="ink" labelledBy="plan-title">
        <SectionIntro meta={[page.plan.meta]} title={page.plan.title} id="plan-title">
          {page.plan.lead}
        </SectionIntro>

        <ol className="border-b border-line">
          {planRows.map((r, i) => {
            const first = i === 0 || planRows[i - 1].group !== r.group;
            return (
              <li
                key={r.title}
                className={`grid-12 gap-y-3 py-6 md:py-8 ${first ? "border-t border-ink" : "border-t border-line"}`}
              >
                <p className={`t-meta col-span-4 text-grey-600 md:col-span-3 md:block md:pt-3 lg:col-span-2 ${first ? "" : "hidden"}`}>
                  {first ? r.group : <span className="sr-only">{r.group}</span>}
                </p>
                <h3 className="t-h3 col-span-4 md:col-span-4">{r.title}</h3>
                <p className="t-body col-span-4 max-w-[46ch] text-grey-700 md:col-span-5 md:pt-2 lg:col-span-4">{r.text}</p>
                {r.figure && (
                  <p className="col-span-4 flex items-baseline gap-2 md:col-span-5 md:col-start-8 lg:col-span-2 lg:col-start-11 lg:flex-col lg:items-end lg:gap-1">
                    <span className="flex items-baseline gap-2">
                      <span className="t-num">{r.figure.a}</span>
                      <span className="t-meta text-grey-600">oder</span>
                      <span className="t-num">{r.figure.b}</span>
                    </span>
                    <span className="t-meta text-grey-600">{r.figure.unit}</span>
                  </p>
                )}
              </li>
            );
          })}
        </ol>
      </Section>

      {/* Belege: echte Arbeiten, jede genau einmal, in einer ruhigen Reihe */}
      <section aria-labelledby="beispiele-title" className="studio sec-l">
        <div className="wrap">
          <SectionIntro meta={[page.examples.meta]} title={page.examples.title} id="beispiele-title">
            {page.examples.text}
          </SectionIntro>

          <div
            role="region"
            aria-label="Beispiele aus unserer Produktion, auf dem Handy seitlich wischbar"
            tabIndex={0}
            className="-mx-[var(--margin)] snap-x snap-mandatory overflow-x-auto [scroll-padding-inline:var(--margin)] [scrollbar-width:none] md:mx-auto md:max-w-[56rem] md:overflow-visible [&::-webkit-scrollbar]:hidden"
          >
            <ul className="flex w-max gap-[var(--gutter)] px-[var(--margin)] pb-2 md:grid md:w-full md:grid-cols-3 md:px-0 md:pb-0">
              {page.examples.items.map((it) => {
                const w = workById(it.id);
                return (
                  <li key={it.id} className="w-[56vw] max-w-[240px] snap-start md:w-auto md:max-w-none">
                    <VideoFrame src={w.short} poster={w.poster} label={`${it.caption[0]}, ${it.caption[1]}`} />
                    <p className="t-meta mt-3 text-grey-400">
                      {it.caption[0]} <span className="text-grey-500">/</span> {it.caption[1]}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>

          <ul className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-8">
            {page.examples.links.map((l) => (
              <li key={l.href}>
                <ArrowLink href={l.href} className="text-paper">
                  {l.label}
                </ArrowLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Einmal oder laufend: die Produkte, die einen Dreh enthalten, als zwei einfache Karten */}
      <Section mode="band" space="m" rule="none" labelledBy="laufend-title">
        <SectionIntro meta={[page.ongoing.meta]} title={page.ongoing.title} id="laufend-title">
          {page.ongoing.text}
        </SectionIntro>
        <ul className="mx-auto grid max-w-[60rem] gap-[var(--gutter)] md:grid-cols-2">
          {page.ongoing.items.map((it) => (
            <li key={it.name} className="flex flex-col items-start border border-line bg-paper p-6 md:p-8">
              <h3 className="t-h3">{it.name}</h3>
              <p className="t-small mt-2 text-grey-700">{it.text}</p>
              <p className="mt-6 flex flex-wrap items-baseline gap-x-2">
                <span className="t-meta text-grey-600">{it.prefix}</span>
                <span className="t-num">{it.price}</span>
                <span className="t-meta text-grey-600">{it.unit}</span>
              </p>
              <div className="mt-auto pt-5">
                <ArrowLink href={it.link.href}>{it.link.label}</ArrowLink>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section space="m" rule="none" labelledBy="faq-title">
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
