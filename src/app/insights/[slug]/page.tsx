import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page/PageHeader";
import { ArticleBody, headingsOf } from "@/components/page/ArticleBody";
import { RelatedLinks, Section, SectionIntro, Todo } from "@/components/page/Blocks";
import { FinalCta } from "@/components/blocks/FinalCta";
import { ArrowLink } from "@/components/ui/ButtonLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta } from "@/lib/metadata";
import { articleSchema } from "@/lib/schema";
import { formatDate, insightBySlug, insights } from "@/content/insights";
import { articles } from "@/content/articles";
import {
  articlePage as p,
  categoryInfo,
  hasContent,
  linkFor,
  moreInsights,
  readingMinutes,
  seoFor,
  titleLines,
} from "@/content/pages/insights";
import { ProofBlock } from "../_components/ProofBlock";

export const dynamicParams = false;

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata(props: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const meta = insightBySlug(slug);
  if (!meta) return {};
  const seo = seoFor(slug);
  return pageMeta({
    title: seo?.title ?? meta.title,
    description: seo?.description ?? meta.description,
    path: `/insights/${slug}`,
    ogType: "article",
    publishedTime: meta.published,
    modifiedTime: meta.updated,
    // Leerer Artikel (noch in Arbeit): nicht indexieren
    noindex: !hasContent(slug),
  });
}

const hostOf = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

export default async function InsightArticlePage(props: PageProps<"/insights/[slug]">) {
  const { slug } = await props.params;
  const meta = insightBySlug(slug);
  if (!meta) notFound();

  const content = articles[slug];
  const ready = hasContent(slug);
  const path = `/insights/${slug}`;
  const seo = seoFor(slug);
  const minutes = readingMinutes(meta);
  const toc = ready ? headingsOf(content.blocks) : [];
  const cat = categoryInfo[meta.category];
  const more = moreInsights(meta, 2);

  const facts = [
    { k: p.labels.category, v: cat.title },
    { k: p.labels.reading, v: p.labels.minutes(minutes) },
    { k: p.labels.published, v: <time dateTime={meta.published}>{formatDate(meta.published)}</time> },
    ...(meta.updated && meta.updated !== meta.published
      ? [{ k: p.labels.updated, v: <time dateTime={meta.updated}>{formatDate(meta.updated)}</time> }]
      : []),
    { k: p.labels.author, v: content?.author ?? p.author },
  ];

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: meta.title,
          description: meta.description,
          path,
          datePublished: meta.published,
          dateModified: meta.updated,
          section: meta.category,
        })}
      />

      {/* Artikel-Titel sind länger als Seitentitel: H1 in der Grösse der Sektionstitel (t-h2) */}
      <div className="[&_h1]:t-h2">
        <PageHeader
          crumbs={[p.root, { name: seo?.crumb ?? meta.title, path }]}
          meta={[meta.category, p.labels.minutes(minutes)]}
          title={titleLines(meta.title)}
          lead={meta.description}
          aside={
            /* Eckdaten als ruhige Zeile statt Tabelle */
            <dl className="flex flex-wrap justify-center gap-x-8 gap-y-5 text-center md:gap-x-10">
              {facts.map((f) => (
                <div key={f.k}>
                  <dt className="t-meta text-grey-600">{f.k}</dt>
                  <dd className="t-small mt-1 text-ink">{f.v}</dd>
                </div>
              ))}
            </dl>
          }
        />
      </div>

      {ready ? (
        <>
          {/* Kurzantwort (AEO): beantwortet die Titelfrage direkt */}
          {content.summary && (
            <section aria-labelledby="kurzantwort" className="bg-paper-2">
              <div className="wrap sec-s">
                <div className="mx-auto max-w-[46rem]">
                  <h2 id="kurzantwort" className="t-meta text-grey-600">
                    {p.labels.summary}
                  </h2>
                  <p className="t-lead mt-3 text-ink">{content.summary}</p>
                </div>
              </div>
            </section>
          )}

          {/* Inhaltsverzeichnis + Text */}
          <div className="wrap sec-m">
            <div className="grid-12 gap-y-12">
              {toc.length > 0 && (
                <nav aria-labelledby="toc-title" className="col-span-4 md:col-span-8 lg:col-span-3">
                  <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
                    <p id="toc-title" className="t-meta text-grey-600">
                      {p.labels.toc}
                    </p>
                    <ol className="mt-3 border-t border-ink">
                      {toc.map((h, i) => (
                        <li key={h.id} className="border-b border-line">
                          <a
                            href={`#${h.id}`}
                            className="group grid min-h-11 grid-cols-[2rem_1fr] items-baseline gap-2 py-2.5"
                          >
                            <span className="t-meta text-grey-600">{String(i + 1).padStart(2, "0")}</span>
                            <span className="t-small transition-colors group-hover:text-grey-600">{h.text}</span>
                          </a>
                        </li>
                      ))}
                    </ol>
                  </div>
                </nav>
              )}

              <article className="col-span-4 md:col-span-12 lg:col-span-8 lg:col-start-5">
                <ArticleBody blocks={content.blocks} />

                {content.sources && content.sources.length > 0 && (
                  <footer className="mt-20 max-w-[44rem] border-t border-ink pt-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <h2 className="t-meta text-ink">{p.labels.sources}</h2>
                      <p className="t-meta text-grey-600">{p.labels.sourcesNote}</p>
                    </div>
                    <ol className="mt-3">
                      {content.sources.map((s, i) => (
                        <li key={s.url} className="border-b border-line">
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group grid min-h-11 grid-cols-[2rem_1fr] items-baseline gap-2 py-3"
                          >
                            <span className="t-meta text-grey-600">{String(i + 1).padStart(2, "0")}</span>
                            <span>
                              <span className="t-small block text-ink underline decoration-line-strong underline-offset-4 transition-colors group-hover:decoration-ink">
                                {s.label}
                              </span>
                              <span className="t-meta mt-1 block text-grey-600">
                                {hostOf(s.url)}
                                <span className="sr-only"> (öffnet in neuem Tab)</span>
                              </span>
                            </span>
                          </a>
                        </li>
                      ))}
                    </ol>
                  </footer>
                )}
              </article>
            </div>
          </div>

          {/* Das Wichtigste in Kürze: mittiger Kopf, schlichte nummerierte Liste */}
          {content.takeaways.length > 0 && (
            <Section space="m" rule="line" labelledBy="takeaways-title">
              <SectionIntro id="takeaways-title" title={p.labels.takeaways} />
              <ol className="mx-auto max-w-[46rem] border-t border-ink">
                {content.takeaways.map((t, i) => (
                  <li key={t} className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-line py-5">
                    <span className="t-meta pt-[0.4em] text-grey-600">{String(i + 1).padStart(2, "0")}</span>
                    <p className="t-body text-ink">{t}</p>
                  </li>
                ))}
              </ol>
            </Section>
          )}
        </>
      ) : (
        /* Artikel noch leer: Seite bleibt vollständig, Platzhalter sichtbar */
        <Section space="l" rule="line" labelledBy="pending-title">
          <SectionIntro id="pending-title" meta={[p.pending.meta]} title={p.pending.title} />
          <div className="flex flex-col items-center gap-8 text-center">
            <p>
              <Todo>{p.pending.todo}</Todo>
            </p>
            <ArrowLink href={p.pending.back.href}>{p.pending.back.label}</ArrowLink>
          </div>
        </Section>
      )}

      {/* Proof: belegtes Material passend zur Kategorie */}
      <Section space="l" rule="line" labelledBy="proof-title">
        <ProofBlock
          proof={p.proofByCategory[meta.category]}
          label={p.labels.proof}
          caseLinkLabel={p.labels.caseLink}
          headingId="proof-title"
        />
      </Section>

      {/* Verwandte Leistungen + weiterlesen */}
      <Section space="m" rule="line">
        <div className="grid-12 gap-y-14">
          <div className="col-span-4 md:col-span-6">
            <RelatedLinks title={p.labels.services} links={meta.related.map(linkFor)} />
          </div>
          <div className="col-span-4 md:col-span-6">
            <RelatedLinks
              title={p.labels.more}
              links={more.map((m) => ({
                label: m.title,
                href: `/insights/${m.slug}`,
                text: `${categoryInfo[m.category].title} / ${p.labels.minutes(readingMinutes(m))}`,
              }))}
            />
          </div>
        </div>
      </Section>

      <FinalCta secondary={p.secondaryByCategory[meta.category]} />
    </>
  );
}
