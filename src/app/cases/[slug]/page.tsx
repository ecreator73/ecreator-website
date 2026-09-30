import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page/PageHeader";
import { FactsTable, NumberChip, RelatedLinks, Section, SectionIntro, Steps, Todo } from "@/components/page/Blocks";
import { FinalCta } from "@/components/blocks/FinalCta";
import { VideoTestimonial } from "@/components/blocks/VideoTestimonial";
import { Arrow, ArrowLink } from "@/components/ui/ButtonLink";
import { Meta } from "@/components/ui/Meta";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { JsonLd } from "@/components/seo/JsonLd";
import { withAccent } from "@/lib/accent";
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
      className="group -my-2.5 inline-flex min-h-11 max-w-full items-center gap-2 py-2.5 font-semibold"
    >
      <span className="link min-w-0 [overflow-wrap:anywhere]">{children}</span>
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

/** Screenshot im Browserfenster: Leiste mit drei Punkten und Domain, darunter das Bild. */
function BrowserFrame({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-media)] border border-line bg-white shadow-card">
      <div aria-hidden className="flex items-center gap-3 border-b border-line bg-paper-2 px-4 py-2.5">
        <span className="flex flex-none gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-grey-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-grey-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-grey-300" />
        </span>
        <span className="mx-auto min-w-0 truncate rounded-full bg-white px-3 py-0.5 text-[0.75rem] text-grey-600">{url}</span>
        <span className="hidden w-[2.625rem] flex-none sm:block" />
      </div>
      {children}
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

  // Screenshot unter dem Datenblatt: im Browserfenster, mittig und begrenzt
  const headerMedia: ReactNode =
    d.kind === "finance" ? undefined : (
      <figure className="mx-auto max-w-[64rem]">
        <BrowserFrame url={domain(site.url)}>
          <Shot
            src={site.desktop}
            alt={`Startseite von ${domain(site.url)} am Desktop`}
            ratio="16 / 10"
            sizes="(min-width: 1100px) 64rem, 94vw"
            priority
          />
        </BrowserFrame>
        <figcaption className="mt-4">
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
        title={d.titleLines.map((l) => withAccent(l, d.titleAccent))}
        lead={c.teaser}
        aside={
          <>
            {/* Datenblatt bündig oben in der Karte, die Karte rahmt schon */}
            <div className="[&_dl>div:first-child]:pt-0">
              <FactsTable rows={facts} />
            </div>
            {/* Belege direkt unter dem Datenblatt, als Häkchen-Liste */}
            <section aria-labelledby="beleg-title" className="mt-4 border-t border-line pt-6">
              <h2 id="beleg-title" className="t-meta text-grey-600">
                {L.evidence}
              </h2>
              <ul className="check-list mt-4 space-y-3">
                {evidence.map((e) => (
                  <li key={e} className="t-body text-grey-700">
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

      {/* Ausgangslage: ein Satz als Titel, die Details als Karten auf grauem Band */}
      <Section mode="band" space="l" rule="none" labelledBy="ausgangslage-title">
        <SectionIntro
          meta={[L.challenge]}
          title={d.challenge.statement}
          id="ausgangslage-title"
          className={c.challenge.length > 1 ? "" : "mb-0! md:mb-0!"}
        >
          {c.challenge.length > 1 ? undefined : c.challenge[0]}
        </SectionIntro>
        {c.challenge.length > 1 && (
          <ul className="mx-auto grid max-w-[72rem] gap-[var(--gutter)] hyphens-auto [hyphenate-limit-chars:15_6_6] md:grid-cols-3">
            {c.challenge.map((p, i) => (
              <li key={p} className="card p-6 md:p-8">
                <span aria-hidden>
                  <NumberChip n={i + 1} />
                </span>
                <p className="t-body mt-5 text-grey-700">{p}</p>
              </li>
            ))}
          </ul>
        )}
      </Section>

      {/* Ansatz: die Schritte als Karten (gemeinsamer Baustein Steps) */}
      <Section space="l" rule="none" labelledBy="ansatz-title">
        <SectionIntro meta={[L.approach]} title={d.approach.title} id="ansatz-title" />
        <div className={`mx-auto ${c.approach.length > 2 ? "max-w-[72rem]" : "max-w-[56rem]"}`}>
          <Steps steps={c.approach} />
        </div>
      </Section>

      {d.kind === "finance" && <FinanceBody d={d} />}
      {d.kind === "pair" && <SpitexBody d={d} c={c} />}
      {d.kind === "website" && <TraplettiBody d={d} />}

      {d.kind !== "finance" && <Outcome c={c} d={d} siteUrl={site.url} />}

      {/* Nächster Case und verwandte Seiten: zwei Karten in einer Spalte, gleich breit.
          Nach dem weissen Resultat ohne zusätzlichen Abstand oben, nach dem dunklen Panel mit. */}
      <div className={`wrap sec-m ${d.kind === "finance" ? "" : "pt-0!"}`}>
        <nav aria-label={L.next} className="mx-auto max-w-[56rem]">
          <Link
            href={`/cases/${next}`}
            className="card group flex items-center justify-between gap-6 p-6 transition-transform duration-300 hover:-translate-y-0.5 md:p-8"
          >
            <span>
              <span className="t-meta block text-grey-600">{L.next}</span>
              <span className="t-small mt-3 block text-grey-600">
                {displayClient(nextCase)} / {nextCase.sector}
              </span>
              <span className="t-h3 mt-1 block">{caseDetails[next].hubTitle}</span>
            </span>
            <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-ink text-white shadow-cta transition-transform duration-300 group-hover:translate-x-1">
              <Arrow />
            </span>
          </Link>
          <div className="mt-8 text-center">
            <ArrowLink href="/cases">{L.allCases}</ArrowLink>
          </div>
        </nav>
        <div className="mx-auto mt-12 max-w-[56rem] md:mt-16">
          <RelatedLinks links={d.related} />
        </div>
      </div>

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
      {/* Umsetzung: drei Phasen in einer Karte, feine Trennlinien */}
      <Section mode="band" space="l" rule="none" labelledBy="phasen-title">
        <SectionIntro meta={[d.phases.label]} title={d.phases.title} id="phasen-title" />
        <ol className="card mx-auto max-w-[56rem] divide-y divide-line px-6 md:px-10">
          {d.phases.rows.map((r) => (
            <li
              key={r.k}
              className="grid gap-x-[var(--gutter)] gap-y-3 py-6 md:grid-cols-[9rem_minmax(0,1fr)] md:py-8"
            >
              <p>
                <span className="t-small inline-flex whitespace-nowrap rounded-full bg-paper-2 px-3 py-1 font-semibold text-grey-700">
                  {r.k}
                </span>
              </p>
              <div>
                <h3 className="t-h4">{r.title}</h3>
                <p className="t-body mt-2 text-grey-700">{r.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="t-small mx-auto mt-5 max-w-[56rem] text-center text-grey-600">{d.phases.note}</p>
      </Section>

      {/* Die Formel hinter den Creatives: vier kurze Karten nebeneinander */}
      <Section space="l" rule="none" labelledBy="formel-title">
        <SectionIntro meta={[d.formula.label]} title={d.formula.meta} id="formel-title">
          {d.formula.text}
        </SectionIntro>
        <ol className="mx-auto grid max-w-[64rem] grid-cols-2 gap-[var(--gutter)] lg:grid-cols-4">
          {d.formula.lines.map((l, i) => (
            <li key={l} className="card p-5 md:p-6">
              <span aria-hidden>
                <NumberChip n={i + 1} />
              </span>
              <p className="t-h4 mt-4">{l}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 text-center">
          <Todo>{d.formula.todo}</Todo>
        </p>
      </Section>

      {/* Resultat: Kosten pro Lead und Funnel-Split als Karten auf grauem Band, Quelle sichtbar */}
      <Section mode="band" space="l" rule="none" labelledBy="resultat-title">
        <SectionIntro meta={[L.outcome]} title={withAccent(d.outcome.title, d.outcome.titleAccent)} id="resultat-title" />

        {/* Kennzahl links und Funnel-Split rechts, beide Karten gleich hoch */}
        <div className="mx-auto grid max-w-[64rem] gap-[var(--gutter)] md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <div className="card flex flex-col items-center justify-center p-6 text-center md:p-8">
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

          <div className="card p-6 md:p-8">
            <table className="w-full border-collapse">
              <caption className="t-meta pb-3 text-left text-grey-600 [caption-side:top]">{d.result.funnel.caption}</caption>
              <thead>
                <tr className="border-b border-line">
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
                      <span aria-hidden className="mt-2.5 block h-1.5 rounded-full bg-violet" style={{ width: `${(r.leads / max) * 100}%` }} />
                    </th>
                    <td className="t-h3 tnum py-4 pr-3 text-right align-top">{r.leads}</td>
                    <td className="t-h3 tnum py-4 text-right align-top text-grey-600">{r.cpl}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row" className="t-meta pb-0 pr-3 pt-4 text-left font-normal">
                    {d.result.funnel.total.label}
                  </th>
                  <td className="t-h3 tnum pb-0 pr-3 pt-4 text-right">{d.result.funnel.total.leads}</td>
                  <td className="t-meta pb-0 pt-4 text-right text-grey-600">{d.result.funnel.total.cpl}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Begriff und Quelle mittig unter den Karten */}
        <div className="mx-auto mt-8 max-w-[60ch] text-center">
          <p className="t-small text-grey-700">{d.result.leadNote}</p>
          <p className="t-small mt-3 text-grey-600">{d.outcome.source}</p>
        </div>
      </Section>

      {/* Kundenstimme: Sprecher aus dem öffentlichen Video, ohne ihn diesem Case zuzuordnen */}
      {/* mt-3: schmaler weisser Abstand zwischen grauem Band und dunklem Panel */}
      <section aria-labelledby="stimme-title" className="studio mt-3">
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
          <p className="label-pill">{d.pair.meta}</p>
          <h2 id="paar-title" className="t-h2 mt-5" data-reveal>
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
              className="rounded-[var(--radius-media)] bg-ink-2"
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
   Trapletti: die ganze Startseite im Browserfenster, dazu mobil
   ========================================================================== */

function TraplettiBody({ d }: { d: TraplettiDetail }) {
  const site = webProjects.find((p) => p.id === "trapletti")!;
  return (
    <Section mode="band" space="l" rule="none" labelledBy="seite-title">
      <SectionIntro meta={[d.fullPage.meta]} title={d.fullPage.title} id="seite-title">
        {d.fullPage.lead}
      </SectionIntro>

      <div className="grid-12 items-start gap-y-12">
        <figure className="col-span-4 md:col-span-8">
          <BrowserFrame url={domain(site.url)}>
            {/* Der erste Bildschirm steht schon im Seitenkopf: der Rahmen beginnt darunter (-62.3 % der Bildbreite). */}
            <div
              role="region"
              aria-label={`Startseite von ${domain(site.url)} ab dem zweiten Bildschirm, im Rahmen scrollbar`}
              tabIndex={0}
              className="h-[min(62svh,34rem)] overflow-y-auto bg-paper-2 [scrollbar-width:thin] md:h-[clamp(28rem,72vh,46rem)]"
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
          </BrowserFrame>
          <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
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
            className="rounded-[var(--radius-media)] border border-line shadow-card"
          />
          <figcaption className="mt-4">
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
    <Section space="l" rule="none" labelledBy="resultat-title">
      {/* Resultat als ruhige Karte: Aussage oben, Link und Beleg darunter, abgesetzt durch eine feine Linie */}
      <div className="card mx-auto max-w-[56rem] px-6 py-10 md:px-12 md:py-14">
        <SectionIntro meta={[L.outcome]} title={d.outcome.title} id="resultat-title" className="mb-0! md:mb-0!">
          {c.outcome.map((p) => (
            <p key={p} className="mt-4 first:mt-0">
              {p}
            </p>
          ))}
        </SectionIntro>
        <div className="mt-8 flex flex-col items-center gap-4 border-t border-line pt-8 text-center">
          <ExternalLink href={siteUrl}>{domain(siteUrl)}</ExternalLink>
          <p className="t-small max-w-[60ch] text-grey-600">{d.outcome.source}</p>
          {d.outcome.todo && <Todo>{d.outcome.todo}</Todo>}
        </div>
      </div>
    </Section>
  );
}
