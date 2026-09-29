import type { ReactNode } from "react";
import Image from "next/image";
import { PageHeader } from "@/components/page/PageHeader";
import { RelatedLinks, Section, SectionIntro } from "@/components/page/Blocks";
import { FinalCta } from "@/components/blocks/FinalCta";
import { Arrow, ArrowLink } from "@/components/ui/ButtonLink";
import { Meta } from "@/components/ui/Meta";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { pageMeta } from "@/lib/metadata";
import { caseBySlug, cases, displayClient } from "@/content/cases";
import { webProjects, workById, workVideos, type WorkVideo } from "@/content/work";
import { caseDetails, casesHub as h } from "@/content/pages/cases";

export const metadata = pageMeta(h.meta);

const domain = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

/** Webprojekt → zugehöriger Case */
const caseForSite: Record<string, string> = {
  trapletti: "trapletti",
  naechstenpflege: "spitex-naechstenpflege",
};

/** Ehrliche Caption: Kunde nur, wenn er im Material selbst belegt ist (w.client). */
const wallCaption = (w: WorkVideo): { kind: string[]; client?: string } =>
  w.id === "ecreator" ? { kind: [...h.wall.ownAd] } : { kind: [h.wall.ad, w.theme], client: w.client };

/**
 * Kopf eines Case-Abschnitts, wie der Case auf der Startseite: Überzeile, Titel,
 * ein Satz mit dem Kunden vorne. Mittig, ruhig.
 */
function CaseIntro({ id, meta, client, title, teaser }: { id: string; meta: string[]; client: string; title: string; teaser: string }) {
  return (
    <div className="mx-auto max-w-[46rem] text-center">
      <Meta className="mb-4 justify-center text-grey-600" items={meta} />
      <h2 id={id} className="t-h2" data-reveal>
        {title}
      </h2>
      <p className="t-lead mx-auto mt-5 max-w-[52ch] text-grey-700">
        <span className="font-semibold text-ink">{client}.</span> {teaser}
      </p>
    </div>
  );
}

/** Link zum Case plus Zusatzzeile, mittig unter dem Material */
function CaseFoot({ href, sr, children }: { href: string; sr: string; children?: ReactNode }) {
  return (
    <div className="mt-10 flex flex-col items-center gap-4 text-center md:mt-12">
      <ArrowLink href={href}>
        {h.readCase}
        <span className="sr-only">: {sr}</span>
      </ArrowLink>
      {children}
    </div>
  );
}

export default function CasesPage() {
  const finance = caseBySlug("finanzdienstleister-lead-generierung")!;
  const spitex = caseBySlug("spitex-naechstenpflege")!;
  const trap = caseBySlug("trapletti")!;

  const spitexAd = workById("naechstenpflege");
  const spitexSite = webProjects.find((p) => p.id === "naechstenpflege")!;
  const trapSite = webProjects.find((p) => p.id === "trapletti")!;

  // Jedes Werk nur einmal pro Seite: das Spitex-Ad steht schon im Case-Paar.
  const wall = workVideos.filter((w) => w.id !== spitexAd.id);

  const jumps = [
    ...cases.map((c) => ({ id: h.anchors[c.slug], label: caseDetails[c.slug].crumb, meta: c.sector })),
    { id: h.anchors.ads, label: h.wall.jump, meta: `${wall.length} Videos` },
    { id: h.anchors.websites, label: h.websites.jump, meta: `${webProjects.length} Projekte` },
  ];

  return (
    <>
      <PageHeader
        crumbs={[{ name: h.crumb, path: h.meta.path }]}
        meta={h.headerMeta}
        title={h.titleLines}
        lead={h.lead({ cases: cases.length, ads: workVideos.length, sites: webProjects.length })}
        aside={
          <nav aria-label={h.jumpTitle}>
            <p className="t-meta text-grey-600">{h.jumpTitle}</p>
            <ol className="mt-3 border-t border-ink">
              {jumps.map((j) => (
                <li key={j.id} className="border-b border-line">
                  <a href={`#${j.id}`} className="group flex min-h-11 flex-wrap items-center justify-between gap-x-4 py-2">
                    <span className="font-semibold transition-colors group-hover:text-grey-600">{j.label}</span>
                    <span className="t-meta text-grey-600">{j.meta}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        }
      />

      {/* Case 1: Kopf mittig, die Zahlen als ruhige Reihe, Quelle sichtbar */}
      <Section id={h.anchors[finance.slug]} space="l" rule="none" labelledBy="finanz-title">
        <CaseIntro
          id="finanz-title"
          meta={["Case", finance.sector, h.finance.published]}
          client={displayClient(finance)}
          title={h.finance.title}
          teaser={finance.teaser}
        />

        <dl className="mx-auto mt-12 grid max-w-[56rem] border-y border-line sm:grid-cols-2">
          <div className="flex flex-col-reverse items-center gap-1 py-6 text-center">
            <dt className="t-small text-grey-600">{h.finance.leadsLabel}</dt>
            <dd className="t-num">{h.finance.leadsValue}</dd>
          </div>
          <div className="flex flex-col-reverse items-center gap-1 border-t border-line py-6 text-center sm:border-l sm:border-t-0">
            <dt className="t-small text-grey-600">
              {h.finance.cplLabel}, {h.finance.cplNote}
            </dt>
            <dd className="t-num flex items-baseline gap-3">
              <span className="text-grey-500">
                <span className="sr-only">vorher </span>
                {h.finance.cplBefore}
              </span>
              <span aria-hidden className="text-grey-400">
                →
              </span>
              <span>
                <span className="sr-only">danach </span>
                {h.finance.cplAfter}
              </span>
            </dd>
          </div>
        </dl>

        <CaseFoot href={`/cases/${finance.slug}`} sr={caseDetails[finance.slug].crumb}>
          <p className="t-small max-w-[60ch] text-grey-600">{h.finance.source}</p>
        </CaseFoot>
      </Section>

      {/* Case 2: Ad und Website als Paar, gleich hoch nebeneinander */}
      <Section id={h.anchors[spitex.slug]} space="l" rule="line" labelledBy="spitex-title">
        <CaseIntro
          id="spitex-title"
          meta={["Case", spitex.sector]}
          client={displayClient(spitex)}
          title={h.spitex.title}
          teaser={spitex.teaser}
        />

        <div className="mx-auto mt-12 grid max-w-[40rem] grid-cols-2 items-start gap-[var(--gutter)]">
          <figure>
            <VideoFrame src={spitexAd.short} poster={spitexAd.poster} label={`${spitexAd.title}, Social Ad für ${spitex.client}`} />
            <figcaption className="mt-3">
              <Meta className="text-grey-700 [&_span]:whitespace-normal" items={h.spitex.adCaption} />
            </figcaption>
          </figure>
          <figure>
            <div className="relative aspect-[9/16] overflow-hidden bg-paper-2">
              <Image
                src={spitexSite.mobile}
                alt={`Startseite von ${domain(spitexSite.url)} auf dem Handy`}
                fill
                sizes="(min-width: 768px) 20rem, 45vw"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="mt-3">
              <Meta className="text-grey-700 [&_span]:whitespace-normal" items={h.spitex.siteCaption} />
            </figcaption>
          </figure>
        </div>

        <CaseFoot href={`/cases/${spitex.slug}`} sr={displayClient(spitex)}>
          <Meta className="justify-center text-grey-600" items={spitex.services} />
        </CaseFoot>
      </Section>

      {/* Case 3: die Website als Bild, mittig und begrenzt */}
      <Section id={h.anchors[trap.slug]} space="l" rule="line" labelledBy="trapletti-title">
        <CaseIntro
          id="trapletti-title"
          meta={["Case", trap.sector, trapSite.place]}
          client={displayClient(trap)}
          title={h.trapletti.title}
          teaser={trap.teaser}
        />

        <figure className="mx-auto mt-12 max-w-[64rem]">
          <div className="relative aspect-[16/10] overflow-hidden border border-line bg-paper-2">
            <Image
              src={trapSite.desktop}
              alt={`Startseite von ${domain(trapSite.url)} am Desktop`}
              fill
              sizes="(min-width: 1100px) 64rem, 94vw"
              className="object-cover object-top"
            />
          </div>
          <figcaption className="mt-3">
            <Meta className="text-grey-700" items={h.trapletti.caption} />
          </figcaption>
        </figure>

        <CaseFoot href={`/cases/${trap.slug}`} sr={displayClient(trap)} />
      </Section>

      {/* Video-Wand: jedes weitere Ad einmal, Captions nur mit Belegtem */}
      <section id={h.anchors.ads} aria-labelledby="ads-title" className="studio">
        <div className="wrap sec-l">
          <SectionIntro id="ads-title" title={h.wall.title(wall.length)}>
            <p>{h.wall.lead}</p>
          </SectionIntro>

          <div
            role="region"
            aria-label="Ads, auf dem Handy seitlich wischbar"
            tabIndex={0}
            className="relative -mx-[var(--margin)] snap-x snap-mandatory overflow-x-auto [scroll-padding-inline:var(--margin)] [scrollbar-width:none] md:mx-0 md:overflow-visible [&::-webkit-scrollbar]:hidden"
          >
            <ul className="flex w-max gap-[var(--gutter)] px-[var(--margin)] pb-2 md:grid md:w-full md:grid-cols-3 md:gap-y-12 md:px-0 lg:grid-cols-6">
              {wall.map((w) => (
                <li key={w.id} className="w-[44vw] max-w-[240px] snap-start md:w-auto md:max-w-none">
                  <VideoFrame
                    src={w.short}
                    poster={w.poster}
                    label={`${w.title}, ${w.id === "ecreator" ? "eigenes Ad von eCreator" : `Social Ad, Thema ${w.theme}`}`}
                  />
                  <p className="t-small mt-3 font-semibold text-paper">{w.title}</p>
                  <Meta className="mt-1.5 text-grey-400" items={wallCaption(w).kind} />
                  {wallCaption(w).client && <p className="t-meta mt-1 text-grey-300">{wallCaption(w).client}</p>}
                  <p className="t-meta mt-1 text-grey-500">{w.platform.join(", ")}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Websites als Liste: live, mit Credit, ohne Screenshots zu wiederholen */}
      <Section id={h.anchors.websites} space="l" rule="none" labelledBy="websites-title">
        <SectionIntro id="websites-title" title={h.websites.title(webProjects.length)}>
          <p>{h.websites.lead}</p>
        </SectionIntro>
        <ul className="border-t border-ink">
          {webProjects.map((p) => {
            const slug = caseForSite[p.id];
            return (
              <li key={p.id} className="grid-12 gap-y-4 border-b border-line py-7 md:py-9">
                <div className="col-span-4 md:col-span-4">
                  <h3 className="t-h4">{p.client}</h3>
                  <Meta className="mt-2 text-grey-600" items={[p.kind, p.place]} />
                </div>
                <div className="col-span-4 md:col-span-5">
                  <p className="t-body text-grey-700">{p.summary}</p>
                  <p className="t-small mt-2 text-grey-600">{p.evidence}</p>
                </div>
                <div className="col-span-4 flex flex-col items-start gap-1 md:col-span-3 md:items-end">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group -my-2.5 inline-flex min-h-11 items-center gap-2 py-2.5 font-semibold"
                  >
                    <span className="link">{domain(p.url)}</span>
                    <Arrow className="-rotate-45 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    <span className="sr-only"> ({h.websites.visit}, öffnet in neuem Tab)</span>
                  </a>
                  {slug && (
                    <ArrowLink href={`/cases/${slug}`}>
                      {h.readCase}
                      <span className="sr-only">: {p.client}</span>
                    </ArrowLink>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section space="m" rule="line">
        <RelatedLinks links={h.related} />
      </Section>

      <FinalCta secondary={h.secondary} />
    </>
  );
}
