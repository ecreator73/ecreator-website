import type { ReactNode } from "react";
import Image from "next/image";
import { PageHeader } from "@/components/page/PageHeader";
import { RelatedLinks, Section, SectionIntro } from "@/components/page/Blocks";
import { FinalCta } from "@/components/blocks/FinalCta";
import { Arrow, ArrowLink, ButtonLink } from "@/components/ui/ButtonLink";
import { Meta } from "@/components/ui/Meta";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { withAccent } from "@/lib/accent";
import { pageMeta } from "@/lib/metadata";
import { caseBySlug, cases, displayClient } from "@/content/cases";
import { visibleWorkVideos, webProjects, workById, type WorkVideo } from "@/content/work";
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
  w.client === "eCreator" ? { kind: [...h.wall.ownAd] } : { kind: [h.wall.ad, w.theme], client: w.client };

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

/**
 * Kopf eines Case-Abschnitts, wie der Case auf der Startseite: Label-Pille, Titel,
 * ein Satz mit dem Kunden vorne. Mittig, ruhig.
 */
function CaseIntro({ id, meta, client, title, teaser }: { id: string; meta: string[]; client: string; title: string; teaser: string }) {
  return (
    <div className="mx-auto max-w-[46rem] text-center">
      <p className="label-pill mb-5">{meta.join(" · ")}</p>
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
    <div className="mt-10 flex flex-col items-center gap-5 text-center md:mt-12">
      <ButtonLink href={href} variant="line">
        {h.readCase}
        <span className="sr-only">: {sr}</span>
      </ButtonLink>
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
  const wall = visibleWorkVideos.filter((w) => w.id !== spitexAd.id);

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
        title={h.titleLines.map((l) => withAccent(l, h.titleAccent))}
        lead={h.lead({ cases: cases.length, ads: visibleWorkVideos.length, sites: webProjects.length })}
        aside={
          <nav aria-label={h.jumpTitle}>
            <p className="t-meta text-grey-600">{h.jumpTitle}</p>
            {/* Sprungmarken als ruhige Liste in der Karte, nur feine Trennlinien */}
            <ol className="mt-3 divide-y divide-line">
              {jumps.map((j) => (
                <li key={j.id}>
                  <a href={`#${j.id}`} className="group flex min-h-12 items-center gap-4 py-2.5">
                    {/* Label und Zusatz teilen sich die Zeile, auf schmalen Screens bricht der Zusatz um */}
                    <span className="flex min-w-0 flex-1 flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                      <span className="font-semibold transition-colors group-hover:text-grey-600">{j.label}</span>
                      <span className="t-meta text-grey-600">{j.meta}</span>
                    </span>
                    <Arrow className="rotate-90 text-grey-400 transition-transform duration-300 group-hover:translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        }
      />

      {/* Case 1: Kopf mittig, die Zahlen als zwei Karten, Quelle sichtbar */}
      <Section id={h.anchors[finance.slug]} space="l" rule="none" labelledBy="finanz-title">
        <CaseIntro
          id="finanz-title"
          meta={["Case", finance.sector, h.finance.published]}
          client={displayClient(finance)}
          title={h.finance.title}
          teaser={finance.teaser}
        />

        <dl className="mx-auto mt-12 grid max-w-[52rem] gap-[var(--gutter)] sm:grid-cols-2">
          <div className="card flex flex-col-reverse items-center gap-2 p-6 text-center md:p-8">
            <dt className="t-small text-grey-600">{h.finance.leadsLabel}</dt>
            <dd className="t-num">{h.finance.leadsValue}</dd>
          </div>
          <div className="card flex flex-col-reverse items-center gap-2 p-6 text-center md:p-8">
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

      {/* Case 2: Ad und Website als Paar, gleich hoch nebeneinander, auf grauem Band */}
      <Section id={h.anchors[spitex.slug]} mode="band" space="l" rule="none" labelledBy="spitex-title">
        <CaseIntro
          id="spitex-title"
          meta={["Case", spitex.sector]}
          client={displayClient(spitex)}
          title={h.spitex.title}
          teaser={spitex.teaser}
        />

        <div className="mx-auto mt-12 grid max-w-[40rem] grid-cols-2 items-start gap-[var(--gutter)]">
          <figure>
            <VideoFrame
              src={spitexAd.short}
              poster={spitexAd.poster}
              label={`${spitexAd.title}, Social Ad für ${spitex.client}`}
              className="shadow-card"
            />
            <figcaption className="mt-3">
              <Meta className="text-grey-700 [&_span]:whitespace-normal" items={h.spitex.adCaption} />
            </figcaption>
          </figure>
          <figure>
            <div className="relative aspect-[9/16] overflow-hidden rounded-[var(--radius-media)] border border-line bg-white shadow-card">
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
          {/* Leistungen als kleine Tags */}
          <ul aria-label="Leistungen" className="flex flex-wrap justify-center gap-2">
            {spitex.services.map((s) => (
              <li key={s} className="t-small rounded-full border border-line bg-white px-3 py-1 text-grey-700">
                {s}
              </li>
            ))}
          </ul>
        </CaseFoot>
      </Section>

      {/* Case 3: die Website im Browserfenster, mittig und begrenzt */}
      <Section id={h.anchors[trap.slug]} space="l" rule="none" labelledBy="trapletti-title">
        <CaseIntro
          id="trapletti-title"
          meta={["Case", trap.sector, trapSite.place]}
          client={displayClient(trap)}
          title={h.trapletti.title}
          teaser={trap.teaser}
        />

        <figure className="mx-auto mt-12 max-w-[64rem]">
          <BrowserFrame url={domain(trapSite.url)}>
            <div className="relative aspect-[16/10] bg-paper-2">
              <Image
                src={trapSite.desktop}
                alt={`Startseite von ${domain(trapSite.url)} am Desktop`}
                fill
                sizes="(min-width: 1100px) 64rem, 94vw"
                className="object-cover object-top"
              />
            </div>
          </BrowserFrame>
          <figcaption className="mt-4">
            <Meta className="text-grey-700" items={h.trapletti.caption} />
          </figcaption>
        </figure>

        <CaseFoot href={`/cases/${trap.slug}`} sr={displayClient(trap)} />
      </Section>

      {/* Video-Wand: jedes weitere Ad einmal, Captions nur mit Belegtem */}
      <section id={h.anchors.ads} aria-labelledby="ads-title" className="studio">
        <div className="wrap sec-l">
          <SectionIntro id="ads-title" meta={[h.headerMeta[1]]} title={h.wall.title(wall.length)}>
            <p>{h.wall.lead}</p>
          </SectionIntro>

          <div
            role="region"
            aria-label="Ads, auf dem Handy seitlich wischbar"
            tabIndex={0}
            className="relative -mx-[var(--margin)] snap-x snap-mandatory overflow-x-auto [scroll-padding-inline:var(--margin)] [scrollbar-width:none] md:mx-0 md:overflow-visible [&::-webkit-scrollbar]:hidden"
          >
            {/* Ab Tablet ein Raster mit mittiger letzter Zeile: 4 pro Zeile, breit 7 pro Zeile */}
            <ul className="flex w-max gap-[var(--gutter)] px-[var(--margin)] pb-2 md:w-full md:flex-wrap md:justify-center md:gap-y-12 md:px-0">
              {wall.map((w) => (
                <li
                  key={w.id}
                  className="w-[44vw] max-w-[240px] snap-start md:w-[calc((100%_-_3*var(--gutter))/4)] md:max-w-none xl:w-[calc((100%_-_6*var(--gutter))/7)]"
                >
                  <VideoFrame
                    src={w.short}
                    poster={w.poster}
                    label={`${w.title}, ${w.client === "eCreator" ? "eigenes Ad von eCreator" : `Social Ad, Thema ${w.theme}`}`}
                  />
                  <p className="t-small mt-3 font-semibold text-paper">{w.title}</p>
                  <Meta className="mt-1.5 text-grey-400" items={wallCaption(w).kind} />
                  {wallCaption(w).client && <p className="t-meta mt-1 text-grey-300">{wallCaption(w).client}</p>}
                  {w.platform.length > 0 && <p className="t-meta mt-1 text-grey-500">{w.platform.join(", ")}</p>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Websites als Karten: live, mit Credit, ohne Screenshots zu wiederholen */}
      <Section id={h.anchors.websites} space="l" rule="none" labelledBy="websites-title">
        <SectionIntro
          id="websites-title"
          meta={[h.headerMeta[2]]}
          title={withAccent(h.websites.title(webProjects.length), h.websites.titleAccent)}
        >
          <p>{h.websites.lead}</p>
        </SectionIntro>
        <ul className="mx-auto grid max-w-[64rem] gap-[var(--gutter)] md:grid-cols-2">
          {webProjects.map((p) => {
            const slug = caseForSite[p.id];
            return (
              <li key={p.id} className="card flex flex-col p-6 md:p-8">
                <h3 className="t-h3">{p.client}</h3>
                <Meta className="mt-2 text-grey-600" items={[p.kind, p.place]} />
                <p className="t-body mt-5 text-grey-700">{p.summary}</p>
                <p className="t-small mb-6 mt-3 text-grey-600">{p.evidence}</p>
                {/* Links unten in der Karte, gleich hoch in beiden Karten */}
                <div className="mt-auto flex flex-wrap items-center gap-x-8 gap-y-1 border-t border-line pt-4">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-11 items-center gap-2 py-2.5 font-semibold"
                  >
                    <span className="link">{domain(p.url)}</span>
                    <Arrow className="-rotate-45 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    <span className="sr-only"> ({h.websites.visit}, öffnet in neuem Tab)</span>
                  </a>
                  {slug && (
                    <ArrowLink href={`/cases/${slug}`} className="my-0!">
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

      {/* Verwandte Seiten direkt unter den Website-Karten, ohne zweiten Abstand oben */}
      <div className="wrap sec-m pt-0!">
        <div className="mx-auto max-w-[56rem]">
          <RelatedLinks links={h.related} />
        </div>
      </div>

      <FinalCta secondary={h.secondary} />
    </>
  );
}
