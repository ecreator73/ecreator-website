import { PageHeader } from "@/components/page/PageHeader";
import { NumberChip, RelatedLinks, Section, SectionIntro, Todo } from "@/components/page/Blocks";
import { Faq } from "@/components/page/Faq";
import { FinalCta } from "@/components/blocks/FinalCta";
import { ArrowLink, ButtonLink } from "@/components/ui/ButtonLink";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { JsonLd } from "@/components/seo/JsonLd";
import { withAccent as accent } from "@/lib/accent";
import { pageMeta } from "@/lib/metadata";
import { serviceSchema } from "@/lib/schema";
import { cta } from "@/content/site";
import { workById } from "@/content/work";
import { contentDayPage as page, type PlanRow, type RateRow } from "@/content/pages/content-day";

export const metadata = pageMeta(page.meta);

/**
 * Eine Zeile der Content-Day-Preisliste. Auf Mobile trägt die Zeile Dauer und Frist selbst,
 * und «CHF» steht über dem Betrag, damit die Tabelle in die Karte passt.
 */
function RateLine({ r }: { r: RateRow }) {
  return (
    <tr className="border-b border-line align-baseline">
      <th scope="row" className="py-5 pr-3 text-left font-normal md:py-6 md:pr-4">
        <span className="t-h4 block">{r.name}</span>
        <span className="t-small mt-1 block max-w-[38ch] text-grey-600">{r.detail}</span>
        <span className="t-meta mt-2 block text-grey-500 md:hidden">
          {r.duration} <span className="text-grey-400">/</span> fertig {r.delivery}
        </span>
        {r.todo && (
          <span className="mt-3 block [overflow-wrap:anywhere]">
            <Todo>{r.todo}</Todo>
          </span>
        )}
      </th>
      <td className="t-meta-lg hidden whitespace-nowrap py-6 pr-4 md:table-cell">{r.duration}</td>
      <td className="t-meta-lg hidden py-6 pr-4 md:table-cell lg:whitespace-nowrap">{r.delivery}</td>
      <td className="whitespace-nowrap py-5 text-right md:py-6">
        {r.price ? (
          <span className="inline-flex flex-col items-end md:flex-row md:items-baseline">
            <span className="t-meta text-grey-500 md:mr-2">CHF</span>
            <span className="t-num">{r.price}</span>
          </span>
        ) : (
          <span className="t-h4">auf Anfrage</span>
        )}
      </td>
    </tr>
  );
}

/** Drehplan-Zeilen nach Phase gruppieren (vor / am / nach dem Dreh), Nummer bleibt fortlaufend. */
function groupPlan(rows: PlanRow[]) {
  const groups: { group: string; rows: (PlanRow & { n: number })[] }[] = [];
  rows.forEach((r, i) => {
    const last = groups[groups.length - 1];
    const row = { ...r, n: i + 1 };
    if (last && last.group === r.group) last.rows.push(row);
    else groups.push({ group: r.group, rows: [row] });
  });
  return groups;
}

export default function ContentDayPage() {
  const { poster } = page.header;
  const planGroups = groupPlan(page.plan.rows);
  const lastTitle = page.header.title.length - 1;

  return (
    <>
      <JsonLd data={serviceSchema({ ...page.schema, path: page.meta.path })} />

      <PageHeader
        crumbs={page.crumbs}
        meta={page.header.meta}
        title={page.header.title.map((t, i) => (i === lastTitle ? accent(t, page.header.accent) : t))}
        lead={page.header.lead}
        actions={
          <>
            <ButtonLink href={cta.primary.href} track="content-day-header-call">
              {cta.primary.label}
            </ButtonLink>
            <ButtonLink href={cta.contentDay.href} variant="line" track="content-day-header">
              {cta.contentDay.label}
            </ButtonLink>
          </>
        }
        aside={
          /* Der Einstiegspreis: kurz und mittig, die ganze Preisliste folgt direkt darunter */
          <div className="text-center">
            <p className="t-meta text-grey-600">{poster.label}</p>
            <p className="mt-3 flex items-baseline justify-center gap-2">
              <span className="t-meta text-grey-600">ab CHF</span>
              <span className="t-num">{poster.from}</span>
            </p>
            <dl className="t-small mt-4 flex flex-wrap justify-center gap-x-5 gap-y-1 text-grey-600">
              {poster.rows.map((row) => (
                <div key={row.k} className="flex gap-1.5">
                  <dt>{row.k}</dt>
                  <dd className="font-semibold text-ink">{row.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        }
      />

      {/* Preisliste: alle Optionen aus offers.ts als Tabelle in einer Karte */}
      <Section mode="band" space="l" rule="none" labelledBy="preise-title">
        <SectionIntro meta={[page.rates.meta]} title={accent(page.rates.title, page.rates.accent)} id="preise-title" />
        <div className="card mx-auto max-w-[60rem] overflow-hidden">
          <div className="px-5 pt-2 md:px-8 md:pt-3">
            <table className="w-full border-collapse">
              <caption className="sr-only">Preise Content Day in CHF</caption>
              <thead className="t-meta text-grey-600">
                <tr className="border-b border-line-strong">
                  <th scope="col" className="py-3 pr-4 text-left font-semibold">
                    Option
                  </th>
                  <th scope="col" className="hidden py-3 pr-4 text-left font-semibold md:table-cell">
                    Dauer
                  </th>
                  <th scope="col" className="hidden py-3 pr-4 text-left font-semibold md:table-cell">
                    Fertigstellung
                  </th>
                  <th scope="col" className="py-3 text-right font-semibold">
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
                  <th scope="rowgroup" colSpan={4} className="t-meta pb-3 pt-10 text-left font-semibold text-grey-600">
                    {page.rates.existingGroup}
                  </th>
                </tr>
                <RateLine r={page.rates.existing} />
              </tbody>
            </table>
          </div>
          <div className="bg-paper-2/70 px-5 py-6 md:px-8">
            <p className="t-meta text-grey-600">{page.rates.alwaysLabel}</p>
            <ul className="check-list mt-4 flex flex-wrap gap-x-8 gap-y-3">
              {page.rates.always.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <p className="t-small mt-5 text-grey-600">{page.rates.express}</p>
          </div>
        </div>
      </Section>

      {/* Wofür: Einsätze als Pillen, Events und Testimonials als Full Content Day markiert */}
      <Section space="l" rule="none" labelledBy="wofuer-title">
        <SectionIntro meta={[page.uses.meta]} title={page.uses.title} id="wofuer-title">
          {page.uses.text}
        </SectionIntro>
        <ul className="mx-auto flex max-w-[64rem] flex-wrap justify-center gap-2.5">
          {page.uses.general.map((u) => (
            <li key={u} className="t-small rounded-full border border-line-strong bg-paper px-4 py-2 font-semibold shadow-[0_6px_14px_-10px_rgb(11_29_63/0.25)]">
              {u}
            </li>
          ))}
          {page.uses.fullDay.map((u) => (
            <li key={u} className="t-small rounded-full border border-dashed border-line-strong px-4 py-2 font-semibold text-grey-600">
              {u}
            </li>
          ))}
        </ul>
        <p className="t-small mt-5 text-center text-grey-600">{page.uses.fullDayNote}</p>
      </Section>

      {/* Drehplan: fünf Schritte in drei Karten, gruppiert nach vor / am / nach dem Dreh, ohne Uhrzeiten */}
      <Section mode="band" space="l" rule="none" labelledBy="plan-title">
        <SectionIntro meta={[page.plan.meta]} title={page.plan.title} id="plan-title">
          {page.plan.lead}
        </SectionIntro>

        <div className="grid gap-[var(--gutter)] md:grid-cols-3">
          {planGroups.map((g) => (
            <div key={g.group} className="card p-6 lg:p-8">
              <p className="t-meta text-grey-600">{g.group}</p>
              <ol start={g.rows[0].n} className="mt-5 space-y-6">
                {g.rows.map((r) => (
                  <li key={r.title} className="border-t border-line pt-6 first:border-t-0 first:pt-0">
                    <div className="flex items-center gap-3">
                      {/* Nummer rein dekorativ, die Liste trägt die Reihenfolge */}
                      <span aria-hidden className="flex flex-none">
                        <NumberChip n={r.n} />
                      </span>
                      <h3 className="t-h4">{r.title}</h3>
                    </div>
                    <p className="t-small mt-3 text-grey-600">{r.text}</p>
                    {r.figure && (
                      <p className="mt-4 flex flex-wrap items-baseline gap-x-2">
                        <span className="t-num">{r.figure.a}</span>
                        <span className="t-meta text-grey-600">oder</span>
                        <span className="t-num">{r.figure.b}</span>
                        <span className="t-meta text-grey-600">{r.figure.unit}</span>
                      </p>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
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

      {/* Einmal oder laufend: die Produkte, die einen Dreh enthalten, als zwei Preiskarten */}
      <Section space="l" rule="none" labelledBy="laufend-title">
        <SectionIntro meta={[page.ongoing.meta]} title={page.ongoing.title} id="laufend-title">
          {page.ongoing.text}
        </SectionIntro>
        <ul className="mx-auto grid max-w-[60rem] gap-[var(--gutter)] md:grid-cols-2">
          {page.ongoing.items.map((it) => (
            <li key={it.name} className="card flex flex-col items-start p-6 md:p-8">
              <h3 className="t-h3">{it.name}</h3>
              <p className="t-small mt-2 text-grey-600">{it.text}</p>
              {/* Preis und Link unten bündig, damit beide Karten auf einer Linie stehen */}
              <p className="mt-auto flex flex-wrap items-baseline gap-x-2 pt-6">
                <span className="t-meta text-grey-600">{it.prefix}</span>
                <span className="t-num">{it.price}</span>
                <span className="t-meta text-grey-600">{it.unit}</span>
              </p>
              <div className="pt-5">
                <ArrowLink href={it.link.href}>{it.link.label}</ArrowLink>
              </div>
            </li>
          ))}
        </ul>
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
