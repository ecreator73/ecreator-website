import Link from "next/link";
import { PageHeader } from "@/components/page/PageHeader";
import { RelatedLinks, Section, SectionIntro } from "@/components/page/Blocks";
import { FinalCta } from "@/components/blocks/FinalCta";
import { Arrow, ArrowLink } from "@/components/ui/ButtonLink";
import { Meta } from "@/components/ui/Meta";
import { JsonLd } from "@/components/seo/JsonLd";
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
import { caseSourceLine } from "./_components/ProofBlock";

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
        title={h.header.title}
        lead={h.header.lead}
        aside={
          <div>
            <p className="t-meta text-grey-600">{h.header.principlesTitle}</p>
            <ul className="mt-3 border-t border-ink">
              {h.header.principles.map((pr) => (
                <li key={pr.title} className="border-b border-line py-3.5">
                  <p className="t-small text-grey-700">
                    <strong className="font-semibold text-ink">{pr.title}</strong> {pr.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        }
      />

      {/* Kategorien als Anker-Filter: funktioniert ohne JavaScript */}
      <nav aria-label={h.filter.label} className="border-b border-line">
        <div className="wrap">
          <ul className="flex flex-wrap items-center justify-center gap-x-4 md:gap-x-7">
            <li className="t-meta mr-2 hidden text-grey-600 lg:block">{h.filter.label}</li>
            {filters.map((f, i) => (
              <li key={f.id} className="flex items-center gap-4 md:gap-7">
                {i > 0 && (
                  <span aria-hidden className="hidden text-grey-400 md:inline">
                    /
                  </span>
                )}
                <a href={`#${f.id}`} className="group inline-flex min-h-12 items-baseline gap-2 py-3">
                  <span className="t-brand transition-colors group-hover:text-grey-600">
                    {f.label}
                  </span>
                  <span className="t-meta text-grey-600">
                    {f.count}
                    <span className="sr-only"> Beiträge</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Leitartikel: links Titel und Kurzantwort, rechts die Kernpunkte */}
      <section aria-labelledby="featured-title" className="sec-m">
        <div className="wrap grid-12 gap-y-10">
          <div className="col-span-4 md:col-span-12 lg:col-span-6">
            <Meta
              items={[
                h.featured.label,
                categoryInfo[featured.category].title,
                `${readingMinutes(featured)} Min`,
                dateLabel(featured),
              ]}
              className="text-grey-600"
            />
            <h2 id="featured-title" className="t-h3 mt-4">
              <Link href={`/insights/${featured.slug}`} className="transition-colors hover:text-grey-600">
                {featured.title}
              </Link>
            </h2>
            <p className="t-meta mt-7 text-grey-600">{h.featured.summaryLabel}</p>
            <p className="t-body mt-2 max-w-[56ch] text-grey-700">{featuredSummary}</p>
            <div className="mt-8">
              <ArrowLink href={`/insights/${featured.slug}`}>{h.featured.cta}</ArrowLink>
            </div>
          </div>
          {featuredTakeaways.length > 0 && (
            <div className="col-span-4 md:col-span-12 lg:col-span-5 lg:col-start-8">
              <p className="t-meta text-grey-600">{h.featured.takeawaysLabel}</p>
              <ul className="mt-3 border-t border-ink">
                {featuredTakeaways.map((t) => (
                  <li key={t} className="grid grid-cols-[1.5rem_1fr] gap-2 border-b border-line py-4">
                    <span aria-hidden className="t-meta pt-[0.35em] text-grey-500">
                      /
                    </span>
                    <p className="t-small text-grey-700">{t}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Index nach Thema: Kategorie links, Artikel als Liste rechts */}
      <section aria-labelledby="index-title" className="border-t border-line">
        <div className="wrap sec-l">
          <SectionIntro id="index-title" meta={[h.index.countLabel(insights.length)]} title={h.index.title} />
          {groups.map((g, gi) => (
            <div
              key={g.cat}
              id={g.info.id}
              className={`grid-12 gap-y-5 ${anchorOffset} ${gi > 0 ? "mt-14 md:mt-20" : ""}`}
            >
              <div className="col-span-4 md:col-span-4 lg:col-span-3">
                <h3 className="t-brand">{g.info.title}</h3>
                <p className="t-small mt-2 max-w-[32ch] text-grey-700">{g.info.text}</p>
                <p className="t-meta mt-3 text-grey-600">{h.index.countLabel(g.items.length)}</p>
              </div>
              <ul className="col-span-4 border-t border-ink md:col-span-8 lg:col-span-9">
                {g.items.map((it) => (
                  <li key={it.slug} className="border-b border-line">
                    <Link
                      href={`/insights/${it.slug}`}
                      className="group grid gap-x-[var(--gutter)] gap-y-3 py-5 md:grid-cols-[1fr_auto] md:py-6"
                    >
                      <div>
                        <h4 className="t-h4 max-w-[44ch] transition-colors group-hover:text-grey-600">{it.title}</h4>
                        <p className="t-small mt-2 max-w-[62ch] text-grey-700">{it.description}</p>
                      </div>
                      <div className="flex items-center justify-between gap-4 md:flex-col md:items-end">
                        <Meta items={[`${readingMinutes(it)} Min`, dateLabel(it)]} className="text-grey-600 md:justify-end" />
                        <Arrow className="h-3 w-5 text-grey-500 transition-transform group-hover:translate-x-1 group-hover:text-ink" />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Kategorie Case: echte Projekte als einfache Spalten, Kennzahl nur mit Quelle */}
      <section id={categoryInfo.Case.id} aria-labelledby="cases-title" className={`bg-paper-2 ${anchorOffset}`}>
        <div className="wrap sec-l">
          <SectionIntro id="cases-title" meta={[`${cases.length} Cases`]} title={categoryInfo.Case.title}>
            {categoryInfo.Case.text} {h.cases.lead}
          </SectionIntro>

          <ul className="grid gap-x-[var(--gutter)] gap-y-12 md:grid-cols-3">
            {cases.map((c) => {
              const m = c.metrics?.[0];
              return (
                <li key={c.slug}>
                  <Link href={`/cases/${c.slug}`} className="group flex h-full flex-col border-t border-ink pt-6">
                    <Meta items={[c.sector, displayClient(c)]} className="text-grey-600" />
                    <h3 className="t-h4 mt-3 transition-colors group-hover:text-grey-600">
                      {m && <span className="sr-only">{m.value} {m.label}: </span>}
                      {c.headline}
                    </h3>
                    <p className="t-small mt-3 text-grey-700">{c.teaser}</p>
                    <Meta items={c.services.slice(0, 3)} className="mt-4 text-grey-600" />
                    <div className="mt-auto pt-6">
                      {m && (
                        <p aria-hidden className="mb-4 flex items-baseline gap-3 border-t border-line pt-4">
                          <span className="t-num">{m.value}</span>
                          <span className="t-small text-grey-700">{m.label}</span>
                        </p>
                      )}
                      <p className="t-meta text-grey-600">{caseSourceLine(c)}</p>
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
          <div className="mt-12 text-center">
            <ArrowLink href={h.cases.more.href}>{h.cases.more.label}</ArrowLink>
          </div>
        </div>
      </section>

      {/* Glossar als Datenblatt */}
      <Section id={h.glossary.id} space="m" rule="none" labelledBy="glossar-title" className={anchorOffset}>
        <SectionIntro id="glossar-title" meta={h.glossary.meta} title={h.glossary.title}>
          {h.glossary.lead}
        </SectionIntro>
        <div className="mx-auto max-w-[60rem]">
          <dl className="border-t border-ink">
            {h.glossary.terms.map((t) => (
              <div
                key={t.k}
                className="grid gap-x-[var(--gutter)] gap-y-2 border-b border-line py-5 md:grid-cols-[minmax(12rem,34%)_1fr] md:py-6"
              >
                <dt className="t-h4">
                  <dfn className="not-italic">{t.k}</dfn>
                </dt>
                <dd>
                  <p className="t-body max-w-[56ch] text-grey-700">{t.v}</p>
                  <ArrowLink href={t.href} className="t-small mt-2">
                    {h.glossary.linkLabel(t.href)}
                  </ArrowLink>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section space="m" rule="line">
        <div className="mx-auto max-w-[60rem]">
          <RelatedLinks title={h.related.title} links={h.related.links.map(linkFor)} />
        </div>
      </Section>

      <FinalCta secondary={h.finalSecondary} />
    </>
  );
}
