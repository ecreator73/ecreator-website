import Link from "next/link";
import { PageHeader } from "@/components/page/PageHeader";
import { RelatedLinks, Section, SectionIntro } from "@/components/page/Blocks";
import { FinalCta } from "@/components/blocks/FinalCta";
import { Arrow, ButtonLink } from "@/components/ui/ButtonLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { withAccent } from "@/lib/accent";
import { pageMeta } from "@/lib/metadata";
import { abs } from "@/lib/schema";
import { formatDate, insightBySlug, insights, type InsightMeta } from "@/content/insights";
import { articles } from "@/content/articles";
import { cases, displayClient } from "@/content/cases";
import {
  categoryInfo,
  categoryOrder,
  insightsHub as h,
  linkFor,
  readingMinutes,
} from "@/content/pages/insights";
import { ArrowBubble, caseSourceLine, linkCard } from "./_components/ProofBlock";

export const metadata = pageMeta(h.meta);

const anchorOffset = "scroll-mt-[calc(var(--header-h)+1.5rem)]";

/** Datum für Listen: «aktualisiert» nur, wenn es eine Aktualisierung gibt. */
const dateLabel = (it: InsightMeta) =>
  it.updated && it.updated !== it.published ? `Aktualisiert ${formatDate(it.updated)}` : formatDate(it.published);

export default function InsightsPage() {
  const groups = categoryOrder
    .map((cat) => ({ cat, info: categoryInfo[cat], items: insights.filter((i) => i.category === cat) }))
    .filter((g) => g.items.length > 0);

  const filters = [
    ...groups.map((g) => ({ id: g.info.id, label: g.info.title, count: g.items.length })),
    { id: categoryInfo.Case.id, label: categoryInfo.Case.title, count: cases.length },
  ];

  const featured = insightBySlug(h.featured.slug) ?? insights[0];
  const fa = articles[featured.slug];
  const featuredSummary = fa?.summary || featured.description;
  const featuredTakeaways = fa?.takeaways.slice(0, 3) ?? [];

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Insights von eCreator",
    itemListElement: [
      ...insights.map((i) => ({ path: `/insights/${i.slug}`, name: i.title })),
      ...cases.map((c) => ({ path: `/cases/${c.slug}`, name: c.headline })),
    ].map((e, i) => ({ "@type": "ListItem", position: i + 1, name: e.name, url: abs(e.path) })),
  };

  return (
    <>
      <JsonLd data={itemList} />

      <PageHeader
        crumbs={h.crumbs}
        meta={h.header.meta}
        title={h.header.title.map((l) => withAccent(l, h.header.accent))}
        lead={h.header.lead}
        aside={
          /* Grundsätze als Häkchen-Liste in der Karte */
          <div>
            <p className="t-h4">{h.header.principlesTitle}</p>
            <ul className="check-list mt-5 space-y-3.5">
              {h.header.principles.map((pr) => (
                <li key={pr.title} className="t-small text-grey-700">
                  <strong className="font-semibold text-ink">{pr.title}</strong> {pr.text}
                </li>
              ))}
            </ul>
          </div>
        }
      />

      {/* Kategorien als Anker-Filter (Pillen): funktioniert ohne JavaScript */}
      <nav aria-label={h.filter.label} className="wrap">
        <ul className="flex flex-wrap items-center justify-center gap-2 md:gap-2.5">
          <li className="t-small mr-1.5 hidden text-grey-600 md:block">{h.filter.label}</li>
          {filters.map((f) => (
            <li key={f.id}>
              <a
                href={`#${f.id}`}
                className="t-small inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-white py-1.5 pl-4 pr-1.5 font-medium text-ink shadow-[0_1px_2px_rgb(11_29_63/0.05)] transition-colors hover:border-line-strong hover:bg-paper-2"
              >
                {f.label}
                <span className="grid h-7 min-w-7 place-items-center rounded-full bg-paper-2 px-2 text-[0.75rem] font-semibold tabular-nums text-grey-600">
                  {f.count}
                  <span className="sr-only"> Beiträge</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Leitartikel als grosse Karte: links Titel und Kurzantwort, rechts die Kernpunkte */}
      <section aria-labelledby="featured-title" className="sec-m">
        <div className="wrap">
          <div className="card grid gap-8 p-6 md:p-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12 lg:p-12">
            <div className="flex flex-col items-start">
              <p className="label-pill">{h.featured.label}</p>
              <p className="t-small mt-5 text-grey-600">
                {[categoryInfo[featured.category].title, `${readingMinutes(featured)} Min`, dateLabel(featured)].join(" · ")}
              </p>
              <h2 id="featured-title" className="t-h3 mt-2 max-w-[28ch]">
                <Link href={`/insights/${featured.slug}`} className="transition-colors hover:text-grey-600">
                  {featured.title}
                </Link>
              </h2>
              <p className="t-small mt-7 font-semibold text-ink">{h.featured.summaryLabel}</p>
              <p className="t-body mt-1.5 max-w-[56ch] text-grey-700">{featuredSummary}</p>
              <div className="mt-8">
                <ButtonLink href={`/insights/${featured.slug}`} variant="line">
                  {h.featured.cta}
                </ButtonLink>
              </div>
            </div>
            {featuredTakeaways.length > 0 && (
              <div className="self-start rounded-[var(--radius-media)] bg-paper-2 p-6 md:p-8">
                <p className="t-h4">{h.featured.takeawaysLabel}</p>
                <ul className="check-list mt-5 space-y-4">
                  {featuredTakeaways.map((t) => (
                    <li key={t} className="t-small text-grey-700">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Index nach Thema: Kategorie links, Artikel als Karten rechts, auf grauem Band */}
      <section aria-labelledby="index-title" className="bg-paper-2">
        <div className="wrap sec-l">
          <SectionIntro id="index-title" meta={[h.index.countLabel(insights.length)]} title={h.index.title} />
          <div className="space-y-14 md:space-y-16">
            {groups.map((g) => (
              <div key={g.cat} id={g.info.id} className={`grid-12 gap-y-6 ${anchorOffset}`}>
                <div className="col-span-4 md:col-span-12 lg:col-span-3">
                  <h3 className="t-h3">{g.info.title}</h3>
                  <p className="t-small mt-2 max-w-[40ch] text-grey-700">{g.info.text}</p>
                  <p className="t-small mt-3 text-grey-600">{h.index.countLabel(g.items.length)}</p>
                </div>
                <ul className="col-span-4 grid gap-4 md:col-span-12 lg:col-span-9">
                  {g.items.map((it) => (
                    <li key={it.slug}>
                      <Link
                        href={`/insights/${it.slug}`}
                        className={`${linkCard} grid grid-cols-[minmax(0,1fr)] gap-x-8 gap-y-5 p-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:p-8`}
                      >
                        <div>
                          <h4 className="t-h4 max-w-[48ch]">{it.title}</h4>
                          <p className="t-small mt-2 max-w-[62ch] text-grey-700">{it.description}</p>
                        </div>
                        <div className="flex items-center justify-between gap-5 md:flex-col md:items-end md:justify-center">
                          <p className="t-small text-grey-600 sm:whitespace-nowrap">
                            {readingMinutes(it)} Min · {dateLabel(it)}
                          </p>
                          <ArrowBubble />
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kategorie Case: echte Projekte als Karten, Kennzahl nur mit Quelle */}
      <section id={categoryInfo.Case.id} aria-labelledby="cases-title" className={anchorOffset}>
        <div className="wrap sec-l">
          <SectionIntro id="cases-title" meta={[`${cases.length} Cases`]} title={categoryInfo.Case.title}>
            {categoryInfo.Case.text} {h.cases.lead}
          </SectionIntro>

          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cases.map((c) => {
              const m = c.metrics?.[0];
              return (
                <li key={c.slug}>
                  <Link href={`/cases/${c.slug}`} className={`${linkCard} flex h-full flex-col p-6 md:p-8`}>
                    <p className="t-small text-grey-600">
                      {c.sector} · {displayClient(c)}
                    </p>
                    <h3 className="t-h4 mt-3">
                      {m && (
                        <span className="sr-only">
                          {m.value} {m.label}:{" "}
                        </span>
                      )}
                      {c.headline}
                    </h3>
                    <p className="t-small mt-3 text-grey-700">{c.teaser}</p>
                    <p className="mt-5 flex flex-wrap gap-1.5">
                      {c.services.slice(0, 3).map((s) => (
                        <span
                          key={s}
                          className="rounded-full bg-paper-2 px-2.5 py-1 text-[0.75rem] font-medium leading-tight text-grey-700"
                        >
                          {s}
                        </span>
                      ))}
                    </p>
                    <div className="mt-auto pt-7">
                      {m && (
                        <p aria-hidden className="mb-4 flex items-baseline gap-3 border-t border-line pt-5">
                          <span className="t-num">{m.value}</span>
                          <span className="t-small text-grey-700">{m.label}</span>
                        </p>
                      )}
                      <p className="text-[0.8125rem] leading-snug text-grey-600">{caseSourceLine(c)}</p>
                      <span className="t-small mt-5 inline-flex items-center gap-2 font-semibold">
                        <span className="link">{h.cases.cta}</span>
                        <Arrow className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-12 flex justify-center">
            <ButtonLink href={h.cases.more.href} variant="line">
              {h.cases.more.label}
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Glossar als Karte mit ruhigen Zeilen, auf grauem Band */}
      <Section
        id={h.glossary.id}
        mode="band"
        space="l"
        rule="none"
        labelledBy="glossar-title"
        className={anchorOffset}
      >
        <SectionIntro id="glossar-title" meta={h.glossary.meta} title={h.glossary.title}>
          {h.glossary.lead}
        </SectionIntro>
        <div className="card mx-auto max-w-[60rem] px-6 md:px-10">
          <dl>
            {h.glossary.terms.map((t) => (
              <div
                key={t.k}
                className="grid gap-x-[var(--gutter)] gap-y-2 border-b border-line py-6 last:border-b-0 md:grid-cols-[minmax(12rem,32%)_1fr] md:py-7"
              >
                <dt className="t-h4">
                  <dfn className="not-italic">{t.k}</dfn>
                </dt>
                <dd>
                  <p className="t-body max-w-[56ch] text-grey-700">{t.v}</p>
                  <Link
                    href={t.href}
                    className="group t-small mt-3 inline-flex min-h-11 items-center gap-2 font-semibold md:min-h-0"
                  >
                    <span className="link">{h.glossary.linkLabel(t.href)}</span>
                    <Arrow className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* Weiter zu: verwandte Seiten als Karten */}
      <Section space="l" rule="none">
        <RelatedLinks layout="grid" title={h.related.title} links={h.related.links.map(linkFor)} />
      </Section>

      <FinalCta secondary={h.finalSecondary} />
    </>
  );
}
