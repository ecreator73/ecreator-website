import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page/PageHeader";
import { FactsTable, RelatedLinks, Section, SectionIntro, Steps, Todo } from "@/components/page/Blocks";
import { FinalCta } from "@/components/blocks/FinalCta";
import { VideoTestimonial } from "@/components/blocks/VideoTestimonial";
import { Arrow, ArrowLink } from "@/components/ui/ButtonLink";
import { Meta } from "@/components/ui/Meta";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta } from "@/lib/metadata";
import { articleSchema } from "@/lib/schema";
import { caseBySlug, cases, displayClient, type CaseStudy } from "@/content/cases";
import { pinelli } from "@/content/testimonials";
import { webProjects, workById } from "@/content/work";
import {
  caseDetails,
  caseLabels as L,
  caseOrder,
  type FinanceDetail,
  type SpitexDetail,
  type TraplettiDetail,
} from "@/content/pages/cases";

export const dynamicParams = false;

export function generateStaticParams() {
  return cases.filter((c) => caseDetails[c.slug]).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(props: PageProps<"/cases/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const d = caseDetails[slug];
  if (!d) return {};
  return pageMeta({
    title: d.metaTitle,
    description: d.metaDescription,
    path: `/cases/${slug}`,
    ogType: "article",
    publishedTime: d.published,
    modifiedTime: d.modified,
  });
}

const domain = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group -my-2.5 inline-flex min-h-11 items-center gap-2 py-2.5 font-semibold"
    >
      <span className="link">{children}</span>
      <Arrow className="-rotate-45 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      <span className="sr-only"> (öffnet in neuem Tab)</span>
    </a>
  );
}

function Shot({ src, alt, ratio, sizes, priority, className = "" }: { src: string; alt: string; ratio: string; sizes: string; priority?: boolean; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-paper-2 ${className}`} style={{ aspectRatio: ratio }}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
    </div>
  );
}

export default async function CasePage(props: PageProps<"/cases/[slug]">) {
  const { slug } = await props.params;
  const c = caseBySlug(slug);
  const d = caseDetails[slug];
  if (!c || !d) notFound();

  const path = `/cases/${slug}`;
  const client = displayClient(c);
  const evidence = d.evidence ?? c.evidence;
  const next = caseOrder[(caseOrder.indexOf(slug) + 1) % caseOrder.length];
  const nextCase = caseBySlug(next)!;

  const facts = [
    { k: L.client, v: client as ReactNode },
    { k: L.sector, v: c.sector as ReactNode },
    { k: L.services, v: c.services.join(", ") as ReactNode },
    ...d.facts.map((f) => ({ k: f.k, v: f.href ? <ExternalLink href={f.href}>{f.v}</ExternalLink> : f.v })),
  ];

  const site = d.kind === "pair" ? webProjects.find((p) => p.id === "naechstenpflege")! : webProjects.find((p) => p.id === "trapletti")!;

  // Screenshot unter dem Datenblatt: mittig und begrenzt, damit der Kopf ruhig bleibt
  const headerMedia: ReactNode =
    d.kind === "finance" ? undefined : (
      <figure className="mx-auto max-w-[64rem]">
        <Shot
          src={site.desktop}
          alt={`Startseite von ${domain(site.url)} am Desktop`}
          ratio="16 / 10"
          sizes="(min-width: 1100px) 64rem, 94vw"
          priority
          className="border border-line"
        />
        <figcaption className="mt-3">
          <Meta className="text-grey-700" items={d.headerCaption} />
        </figcaption>
      </figure>
    );

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: c.headline,
          description: d.metaDescription,
          path,
          datePublished: d.published,
          dateModified: d.modified,
          section: "Case",
          image: d.image,
        })}
      />

      <PageHeader
        crumbs={[
          { name: L.hubCrumb, path: "/cases" },
          { name: d.crumb, path },
        ]}
        meta={["Case", c.sector]}
        title={d.titleLines}
        lead={c.teaser}
        aside={
          <>
            <FactsTable rows={facts} />
            {/* Belege direkt unter dem Datenblatt, im selben Stil */}
            <section aria-labelledby="beleg-title" className="mt-10">
              <h2 id="beleg-title" className="t-meta text-grey-600">
                {L.evidence}
              </h2>
              <ul className="mt-3 border-t border-ink">
                {evidence.map((e) => (
                  <li key={e} className="t-body border-b border-line py-3.5 text-grey-700">
                    {e}
                  </li>
                ))}
              </ul>
              {d.evidenceTodo && (
                <p className="mt-5">
                  <Todo>{d.evidenceTodo}</Todo>
                </p>
              )}
            </section>
          </>
        }
        media={headerMedia}
      />

      {/* Ausgangslage: ein Satz als Titel, die Details darunter */}
      <Section space="l" rule="none" labelledBy="ausgangslage-title">
        <SectionIntro
          meta={[L.challenge]}
          title={d.challenge.statement}
          id="ausgangslage-title"
          className={c.challenge.length > 1 ? "" : "mb-0! md:mb-0!"}
        >
          {c.challenge.length > 1 ? undefined : c.challenge[0]}
        </SectionIntro>
        {c.challenge.length > 1 && (
          <ul className="grid gap-x-[var(--gutter)] gap-y-6 hyphens-auto md:grid-cols-3">
            {c.challenge.map((p) => (
              <li key={p} className="t-body border-t border-ink pt-4 text-grey-700">
                {p}
              </li>
            ))}
          </ul>
        )}
      </Section>

      {/* Ansatz als Schrittfolge */}
      <Section mode="band" space="l" rule="none" labelledBy="ansatz-title">
        <SectionIntro meta={[L.approach]} title={d.approach.title} id="ansatz-title" />
        <Steps steps={c.approach} />
      </Section>

      {d.kind === "finance" && <FinanceBody d={d} />}
      {d.kind === "pair" && <SpitexBody d={d} c={c} />}
      {d.kind === "website" && <TraplettiBody d={d} />}

      {d.kind !== "finance" && <Outcome c={c} d={d} siteUrl={site.url} />}

      {/* Nächster Case: eine ruhige Karte, darunter der Weg zurück zur Übersicht */}
      <nav aria-label={L.next} className="border-t border-line">
        <div className="wrap sec-m">
          <Link
            href={`/cases/${next}`}
            className="group mx-auto flex max-w-[56rem] items-center justify-between gap-6 border border-line p-6 transition-colors duration-300 hover:border-ink md:p-8"
          >
            <span>
              <span className="t-meta block text-grey-600">{L.next}</span>
              <span className="t-small mt-3 block text-grey-600">
                {displayClient(nextCase)} / {nextCase.sector}
              </span>
              <span className="t-h3 mt-1 block">{caseDetails[next].hubTitle}</span>
            </span>
            <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-ink transition-transform duration-300 group-hover:translate-x-1">
              <Arrow />
            </span>
          </Link>
          <div className="mt-8 text-center">
            <ArrowLink href="/cases">{L.allCases}</ArrowLink>
          </div>
        </div>
      </nav>

      <Section space="m" rule="line">
        <RelatedLinks links={d.related} />
      </Section>

      <FinalCta secondary={d.secondary} />
    </>
  );
}

/* ==========================================================================
   Finanz-Case: Phasen, Formel, Resultat mit Quelle, Kundenstimme
   ========================================================================== */

function FinanceBody({ d }: { d: FinanceDetail }) {
  const max = Math.max(...d.result.funnel.rows.map((r) => r.leads));
  return (
    <>
      {/* Umsetzung: drei Phasen als einfache Liste */}
      <Section space="l" rule="none" labelledBy="phasen-title">
        <SectionIntro title={d.phases.title} id="phasen-title" />
        <ol className="mx-auto max-w-[56rem] border-t border-ink">
          {d.phases.rows.map((r) => (
            <li
              key={r.k}
              className="grid gap-x-[var(--gutter)] gap-y-2 border-b border-line py-6 md:grid-cols-[9rem_minmax(0,1fr)] md:py-8"
            >
              <p className="t-meta pt-1.5 text-grey-600">{r.k}</p>
              <div>
                <h3 className="t-h4">{r.title}</h3>
                <p className="t-body mt-2 text-grey-700">{r.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="t-small mx-auto mt-5 max-w-[56rem] text-grey-600">{d.phases.note}</p>
      </Section>

      {/* Die Formel hinter den Creatives: vier kurze Punkte nebeneinander */}
      <Section space="l" rule="line" labelledBy="formel-title">
        <SectionIntro title={d.formula.meta} id="formel-title">
          {d.formula.text}
        </SectionIntro>
        <ol className="mx-auto grid max-w-[64rem] gap-x-[var(--gutter)] gap-y-6 grid-cols-2 lg:grid-cols-4">
          {d.formula.lines.map((l, i) => (
            <li key={l} className="border-t border-ink pt-4">
              <span className="t-meta text-grey-600">{String(i + 1).padStart(2, "0")}</span>
              <p className="t-h4 mt-2">{l}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 text-center">
          <Todo>{d.formula.todo}</Todo>
        </p>
      </Section>

      {/* Resultat: Kosten pro Lead als Karte, Funnel-Split als Tabelle, Quelle sichtbar */}
      <Section space="l" rule="line" labelledBy="resultat-title">
        <SectionIntro meta={[L.outcome]} title={d.outcome.title} id="resultat-title" />

        <div className="mx-auto grid max-w-[64rem] items-start gap-x-[var(--gutter)] gap-y-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <div className="border border-line bg-paper-2 p-6 md:p-8">
            <p className="t-meta text-grey-600">{d.result.cpl.label}</p>
            <p className="t-num mt-4 flex items-baseline gap-3">
              <span className="text-grey-500">
                <span className="sr-only">vorher </span>
                {d.result.cpl.before}
              </span>
              <span aria-hidden className="text-grey-400">
                →
              </span>
              <span>
                <span className="sr-only">danach </span>
                {d.result.cpl.after}
              </span>
            </p>
            <p className="t-small mt-3 text-grey-600">{d.result.cpl.note}</p>
          </div>

          <div>
            <table className="w-full border-collapse">
              <caption className="t-meta pb-3 text-left text-grey-600 [caption-side:top]">{d.result.funnel.caption}</caption>
              <thead>
                <tr className="border-y border-ink">
                  <th scope="col" className="t-meta py-3 pr-3 text-left font-normal text-grey-600">
                    {d.result.funnel.head[0]}
                  </th>
                  <th scope="col" className="t-meta py-3 pr-3 text-right font-normal text-grey-600">
                    {d.result.funnel.head[1]}
                  </th>
                  <th scope="col" className="t-meta py-3 text-right font-normal text-grey-600">
                    {d.result.funnel.head[2]}
                  </th>
                </tr>
              </thead>
              <tbody>
                {d.result.funnel.rows.map((r) => (
                  <tr key={r.theme} className="border-b border-line">
                    <th scope="row" className="py-4 pr-3 text-left align-top font-normal">
                      <span className="t-h4 block">{r.theme}</span>
                      <span aria-hidden className="mt-2.5 block h-1 bg-ink" style={{ width: `${(r.leads / max) * 100}%` }} />
                    </th>
                    <td className="t-h3 tnum py-4 pr-3 text-right align-top">{r.leads}</td>
                    <td className="t-h3 tnum py-4 text-right align-top text-grey-600">{r.cpl}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-b border-ink">
                  <th scope="row" className="t-meta py-4 pr-3 text-left font-normal">
                    {d.result.funnel.total.label}
                  </th>
                  <td className="t-h3 tnum py-4 pr-3 text-right">{d.result.funnel.total.leads}</td>
                  <td className="t-meta py-4 text-right text-grey-600">{d.result.funnel.total.cpl}</td>
                </tr>
              </tfoot>
            </table>
            <p className="t-small mt-6 text-grey-700">{d.result.leadNote}</p>
            <p className="t-small mt-3 text-grey-600">{d.outcome.source}</p>
          </div>
        </div>
      </Section>

      {/* Kundenstimme: Sprecher aus dem öffentlichen Video, ohne ihn diesem Case zuzuordnen */}
      <section aria-labelledby="stimme-title" className="studio">
        <div className="wrap sec-l">
          <SectionIntro meta={[d.voice.meta]} title={d.voice.title} id="stimme-title">
            {d.voice.note}
          </SectionIntro>
          <VideoTestimonial t={pinelli} headingLevel="h3" />
        </div>
      </section>
    </>
  );
}

/* ==========================================================================
   Spitex: Ad und Website als Paar
   ========================================================================== */

function SpitexBody({ d, c }: { d: SpitexDetail; c: CaseStudy }) {
  const ad = workById("naechstenpflege");
  const site = webProjects.find((p) => p.id === "naechstenpflege")!;
  return (
    <section aria-labelledby="paar-title" className="studio">
      <div className="wrap grid-12 sec-l items-center gap-y-12">
        {/* Text links, das Paar rechts: beide gleich hoch, ohne Versatz */}
        <div className="col-span-4 md:col-span-5">
          <p className="t-meta text-grey-400">{d.pair.meta}</p>
          <h2 id="paar-title" className="t-h2 mt-4" data-reveal>
            {d.pair.title}
          </h2>
          {d.pair.text.map((p) => (
            <p key={p} className="t-lead mt-5 max-w-[46ch] text-grey-300">
              {p}
            </p>
          ))}
        </div>
        <div className="col-span-4 grid grid-cols-2 items-start gap-[var(--gutter)] md:col-span-7 lg:col-span-6 lg:col-start-7">
          <figure>
            <VideoFrame src={ad.src} poster={ad.poster} mode="player" label={`${ad.title}, Social Ad für ${c.client}`} />
            <figcaption className="mt-3">
              <Meta className="text-grey-400 [&_span]:whitespace-normal" items={d.pair.adCaption} />
            </figcaption>
          </figure>
          <figure>
            <Shot
              src={site.mobile}
              alt={`Startseite von ${domain(site.url)} auf dem Handy`}
              ratio="9 / 16"
              sizes="(min-width: 1024px) 22vw, (min-width: 768px) 28vw, 45vw"
              className="bg-ink-2"
            />
            <figcaption className="mt-3">
              <Meta className="text-grey-400 [&_span]:whitespace-normal" items={d.pair.siteCaption} />
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   Trapletti: die ganze Startseite im Rahmen, dazu mobil
   ========================================================================== */

function TraplettiBody({ d }: { d: TraplettiDetail }) {
  const site = webProjects.find((p) => p.id === "trapletti")!;
  return (
    <Section space="l" rule="none" labelledBy="seite-title">
      <SectionIntro meta={[d.fullPage.meta]} title={d.fullPage.title} id="seite-title">
        {d.fullPage.lead}
      </SectionIntro>

      <div className="grid-12 items-start gap-y-12">
        <figure className="col-span-4 md:col-span-8">
          {/* Der erste Bildschirm steht schon im Seitenkopf: der Rahmen beginnt darunter (-62.3 % der Bildbreite). */}
          <div
            role="region"
            aria-label={`Startseite von ${domain(site.url)} ab dem zweiten Bildschirm, im Rahmen scrollbar`}
            tabIndex={0}
            className="h-[min(62svh,34rem)] overflow-y-auto border border-line bg-paper-2 [scrollbar-width:thin] md:h-[clamp(28rem,72vh,46rem)]"
          >
            <Image
              src={site.desktopFull}
              alt={`Startseite von ${domain(site.url)} am Desktop: Leistungen, Über uns, Referenzen, Arbeitsablauf und Kontaktformular`}
              width={1000}
              height={4521}
              sizes="(min-width: 768px) 62vw, 94vw"
              className="block h-auto w-full"
              style={{ marginTop: "-62.3%" }}
            />
          </div>
          <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
            <Meta className="text-grey-700" items={d.fullPage.desktopCaption} />
            <span className="t-meta flex items-center gap-2 text-grey-600">
              {d.fullPage.hint}
              <Arrow className="rotate-90" />
            </span>
          </figcaption>
        </figure>

        <figure className="col-span-4 mx-auto w-full max-w-[18rem] md:col-span-4 md:max-w-none lg:col-span-3 lg:col-start-10">
          <Shot
            src={site.mobile}
            alt={`Startseite von ${domain(site.url)} auf dem Handy`}
            ratio="585 / 1266"
            sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 18rem"
            className="border border-line"
          />
          <figcaption className="mt-3">
            <Meta className="text-grey-700" items={d.fullPage.mobileCaption} />
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}

/* ==========================================================================
   Resultat ohne Kennzahlen: was belegt ist, plus sichtbarer Platzhalter
   ========================================================================== */

function Outcome({ c, d, siteUrl }: { c: CaseStudy; d: SpitexDetail | TraplettiDetail; siteUrl: string }) {
  return (
    <Section space="l" rule="line" labelledBy="resultat-title">
      <SectionIntro meta={[L.outcome]} title={d.outcome.title} id="resultat-title" className="mb-0! md:mb-0!">
        {c.outcome.map((p) => (
          <p key={p} className="mt-4 first:mt-0">
            {p}
          </p>
        ))}
      </SectionIntro>
      <div className="mt-8 flex flex-col items-center gap-4 text-center">
        <ExternalLink href={siteUrl}>{domain(siteUrl)}</ExternalLink>
        <p className="t-small max-w-[60ch] text-grey-600">{d.outcome.source}</p>
        {d.outcome.todo && <Todo>{d.outcome.todo}</Todo>}
      </div>
    </Section>
  );
}
