import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/page/PageHeader";
import { Section, SectionIntro, RelatedLinks } from "@/components/page/Blocks";
import { RingSystem } from "@/components/system/RingSystem";
import { RateCard } from "@/components/blocks/RateCard";
import { FinalCta } from "@/components/blocks/FinalCta";
import { ButtonLink, ArrowLink, Arrow } from "@/components/ui/ButtonLink";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta } from "@/lib/metadata";
import { abs } from "@/lib/schema";
import { cta } from "@/content/site";
import { caseBySlug } from "@/content/cases";
import { webProjects, workById } from "@/content/work";
import { hubGroups, leistungenPage as p, type HubEntry, type HubGroup, type HubProof } from "@/content/pages/leistungen";
import { socialRecruiting } from "@/content/offers";

export const metadata = pageMeta(p.meta);

/** ItemList aller Leistungen (Vertrag C1: optional). */
const itemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Leistungen von eCreator",
  itemListElement: [...hubGroups.flatMap((g) => g.entries), p.studio.entry].map((e, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: e.name,
    url: abs(e.href),
  })),
};

export default function LeistungenPage() {
  const jump = [
    ...hubGroups.map((g) => ({ id: g.id, label: g.title })),
    { id: p.studio.id, label: p.studio.jumpLabel },
    { id: p.system.id, label: p.system.jumpLabel },
  ];

  return (
    <>
      <JsonLd data={itemList} />
      <PageHeader
        crumbs={p.crumbs}
        meta={p.header.meta}
        title={p.header.title}
        lead={p.header.lead}
        actions={
          <>
            <ButtonLink href={cta.primary.href} track="leistungen-header">
              {cta.primary.label}
            </ButtonLink>
            <ArrowLink href={p.header.secondary.href}>{p.header.secondary.label}</ArrowLink>
          </>
        }
        aside={
          <nav aria-label={p.header.jumpTitle} className="text-center">
            <p className="t-meta text-grey-600">{p.header.jumpTitle}</p>
            {/* Sprungmarken als ruhige Zeile statt Liste */}
            <ul className="mt-3 flex flex-wrap justify-center gap-x-7 gap-y-1">
              {jump.map((j) => (
                <li key={j.id}>
                  <a href={`#${j.id}`} className="group inline-flex min-h-11 items-center gap-2 font-semibold">
                    <span className="transition-colors group-hover:text-grey-600">{j.label}</span>
                    <Arrow className="h-3 w-3.5 rotate-90 text-grey-500 transition-transform duration-300 group-hover:translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        }
      />

      {/* Index: vier Bereiche aus der Navigation */}
      <div className="wrap sec-m" aria-label={p.index.title} role="region">
        {hubGroups.map((g, i) => (
          <GroupBlock key={g.id} g={g} first={i === 0} />
        ))}
      </div>

      {/* Studio: dunkles Band mit Preisliste */}
      <section id={p.studio.id} aria-labelledby="studio-title" className="studio">
        <div className="wrap sec-l">
          <div className="grid-12 gap-y-10">
            <div className="col-span-4 md:col-span-7 lg:col-span-7">
              <SectionIntro variant="left" id="studio-title" meta={p.studio.meta} title={p.studio.title}>
                {p.studio.lead}
              </SectionIntro>
              <ul className="border-t border-line-strong">
                <li className="border-b border-line">
                  <EntryLink e={{ ...p.studio.entry, level: 1 }} />
                </li>
              </ul>
            </div>
            <figure className="col-span-4 w-full max-w-[230px] md:col-span-4 md:col-start-9 md:max-w-none lg:col-span-3 lg:col-start-10">
              <StudioVideo />
            </figure>
          </div>

          <div className="mt-14 md:mt-20">
            <h3 className="sr-only">{p.studio.ratesTitle}</h3>
            <RateCard />
          </div>
          <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
            <ButtonLink href={cta.contentDay.href} variant="paper" track="leistungen-studio-contentday">
              {cta.contentDay.label}
            </ButtonLink>
            <ArrowLink href={p.studio.podcastLink.href} className="text-paper">
              {p.studio.podcastLink.label}
            </ArrowLink>
          </div>
        </div>
      </section>

      {/* Kreislauf als Orientierung */}
      <Section id={p.system.id} space="l" rule="none" labelledBy="kreislauf-title">
        <SectionIntro id="kreislauf-title" meta={p.system.meta} title={p.system.title}>
          {p.system.lead}
        </SectionIntro>
        <RingSystem />
      </Section>

      {/* Pakete: Kopf links, zwei Preiszeilen rechts */}
      <Section space="l" rule="line" labelledBy="pakete-title">
        <div className="grid-12 items-center gap-y-10">
          <div className="col-span-4 md:col-span-6 lg:col-span-5">
            <p className="t-meta text-grey-600">{p.packages.meta}</p>
            <h2 id="pakete-title" className="t-h2 mt-4">
              {p.packages.title}
            </h2>
            <p className="t-body mt-5 max-w-[44ch] text-grey-700">{p.packages.text}</p>
            <div className="mt-6">
              <ArrowLink href={p.packages.link.href}>{p.packages.link.label}</ArrowLink>
            </div>
          </div>
          <dl className="col-span-4 border-t border-ink md:col-span-6 lg:col-span-6 lg:col-start-7">
            {p.packages.rows.map((r) => (
              <div key={r.id} className="flex items-baseline justify-between gap-4 border-b border-line py-5 md:py-6">
                <dt className="t-brand">{r.name}</dt>
                <dd className="flex items-baseline gap-2">
                  <span className="t-meta text-grey-600">CHF</span>
                  <span className="t-num">{r.amount}</span>
                  <span className="t-small text-grey-600">{r.unit}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section space="s" rule="line">
        <div className="mx-auto max-w-[52rem]">
          <RelatedLinks links={p.related} />
        </div>
      </Section>

      <FinalCta secondary={p.finalCta.secondary} />
    </>
  );
}

/* ---------- Bausteine dieser Seite ---------- */

function GroupBlock({ g, first }: { g: HubGroup; first: boolean }) {
  return (
    <section
      id={g.id}
      aria-labelledby={`${g.id}-title`}
      className={`grid-12 gap-y-8 lg:grid-rows-[auto_1fr] ${first ? "" : "mt-16 md:mt-20 lg:mt-24"}`}
    >
      <div className="col-span-4 border-t border-ink pt-5 md:col-span-12 lg:col-span-4 lg:row-start-1">
        <h2 id={`${g.id}-title`} className="t-brand">
          {g.title}
        </h2>
        <p className="t-body mt-5 max-w-[42ch] text-grey-700">{g.text}</p>
        <p className="t-meta mt-5 text-grey-600">
          {p.index.ringsLabel}: {g.rings.join(" / ")}
        </p>
      </div>

      <ol className="col-span-4 border-t border-ink md:col-span-12 lg:col-span-8 lg:col-start-5 lg:row-span-2 lg:row-start-1">
        {g.entries.map((e) => (
          <li key={e.href} className="border-b border-line">
            <EntryLink e={e} />
            {e.price && <RecruitingIncludes />}
          </li>
        ))}
      </ol>

      {g.proof && (
        <div className="col-span-4 md:col-span-6 lg:col-span-3 lg:row-start-2 lg:self-start">
          <Proof proof={g.proof} />
        </div>
      )}
    </section>
  );
}

function EntryLink({ e }: { e: HubEntry }) {
  const sub = e.level === 2;
  return (
    <Link
      href={e.href}
      className={`group grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-5 md:gap-x-8 ${
        sub ? "py-5 pl-6 md:py-6 md:pl-16" : "py-6 md:py-8"
      }`}
    >
      <h3
        className={`${sub ? "t-h4" : "t-h3"} col-start-1 row-start-1 block transition-transform duration-500 ease-[var(--ease-cut)] group-hover:translate-x-1.5`}
      >
        {e.name}
      </h3>
      {/* Text unter Titel und Preis: auf Mobile über die volle Breite, damit ein Preis ihn nicht zusammendrückt */}
      <span className={`col-span-2 row-start-2 block md:col-span-1 ${e.price ? "" : "pr-8 md:pr-0"}`}>
        <span className={`${sub ? "t-small" : "t-body"} mt-3 block max-w-[56ch] text-grey-700 [.studio_&]:text-grey-300`}>
          {e.text}
        </span>
        {e.tags.length > 0 && (
          <span className="t-meta mt-3 hidden text-grey-600 md:block [.studio_&]:text-grey-400">{e.tags.join(" / ")}</span>
        )}
      </span>
      {e.price ? (
        <span className="col-start-2 row-start-1 flex flex-col items-end pt-1 text-right md:row-span-2">
          <span className="flex items-end gap-1.5 whitespace-nowrap">
            <span className="t-meta mb-1 text-grey-600">CHF</span>
            <span className="t-num">{e.price}</span>
          </span>
          {e.priceNote && <span className="t-meta mt-2 text-grey-600">{e.priceNote}</span>}
        </span>
      ) : (
        <Arrow
          className={`${sub ? "mt-2" : "mt-3 md:mt-5"} col-start-2 row-start-1 h-3 w-5 text-grey-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-ink [.studio_&]:group-hover:text-paper`}
        />
      )}
    </Link>
  );
}

/** Social Recruiting ist ein Produkt: Bestandteile sichtbar, wörtlich aus offers.ts. */
function RecruitingIncludes() {
  return (
    <div className="border-t border-line pb-6 pt-5 md:pb-8">
      <p className="t-meta text-grey-600">Enthalten</p>
      <ul className="t-small mt-3 grid grid-cols-1 gap-x-8 gap-y-1.5 text-grey-700 sm:grid-cols-2">
        {socialRecruiting.includes.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ul>
    </div>
  );
}

function Proof({ proof }: { proof: HubProof }) {
  if (proof.kind === "case") {
    const c = caseBySlug(proof.slug)!;
    const lead = c.metrics?.[0];
    return (
      <figure>
        <p className="t-meta text-grey-600">{p.caseProof.meta}</p>
        <p className="t-num mt-4" aria-hidden>
          {lead?.value}
        </p>
        <figcaption>
          <p className="t-h4 mt-3 max-w-[18ch]">
            <span className="sr-only">{lead?.value} </span>
            {p.caseProof.label}
          </p>
          <p className="t-small mt-4 max-w-[34ch] text-grey-600">{p.caseProof.source}</p>
          <div className="mt-4">
            <ArrowLink href={`/cases/${c.slug}`}>{p.caseProof.link}</ArrowLink>
          </div>
        </figcaption>
      </figure>
    );
  }
  if (proof.kind === "web") {
    const w = webProjects.find((x) => x.id === proof.id)!;
    const domain = w.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
    return (
      <figure>
        <div className="relative aspect-[16/10] bg-paper-2" data-reveal="cut">
          <Image
            src={w.desktop}
            alt={`Website ${w.client}, Startseite in der Desktop-Ansicht`}
            fill
            sizes="(min-width: 1024px) 24vw, (min-width: 768px) 48vw, 92vw"
            className="object-cover object-left-top"
          />
        </div>
        <figcaption className="mt-3">
          <p className="t-meta text-grey-700">
            {p.webProof.meta} <span className="text-grey-500">/</span> {domain}
          </p>
          <p className="t-small mt-1.5 text-grey-600">{w.evidence}</p>
        </figcaption>
      </figure>
    );
  }
  const v = workById(proof.id);
  return (
    <figure className="grid grid-cols-[minmax(0,10.5rem)_minmax(0,1fr)] items-end gap-x-5 md:block md:max-w-[260px]">
      <VideoFrame src={v.short} poster={v.poster} label={`${v.title}, ${v.theme}, produziert von eCreator`} />
      <figcaption className="t-meta text-grey-700 md:mt-3">
        {proof.caption[0]} <span className="text-grey-500">/</span> {proof.caption[1]}
      </figcaption>
    </figure>
  );
}

function StudioVideo() {
  const v = workById(p.studio.video.id);
  return (
    <>
      <VideoFrame src={v.short} poster={v.poster} label={`${v.title}, Social Ad für ${v.client}`} />
      <figcaption className="t-meta mt-3 text-grey-400">
        {p.studio.video.caption[0]} <span className="text-grey-500">/</span> {p.studio.video.caption[1]}
      </figcaption>
    </>
  );
}
