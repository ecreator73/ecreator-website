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
import { withAccent } from "@/lib/accent";
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
        title={p.header.title.map((l) => withAccent(l, p.header.accent))}
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
            {/* Sprungmarken als Pillen, wie Filter in einer App */}
            <ul className="mt-4 flex flex-wrap justify-center gap-2">
              {jump.map((j) => (
                <li key={j.id}>
                  <a
                    href={`#${j.id}`}
                    className="t-small group inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-white px-4 font-semibold transition-colors hover:border-line-strong hover:bg-paper-2"
                  >
                    <span>{j.label}</span>
                    <Arrow className="h-3 w-3.5 rotate-90 text-grey-500 transition-transform duration-300 group-hover:translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        }
      />

      {/* Index: vier Bereiche aus der Navigation, abwechselnd weiss und hellgrau */}
      <div aria-label={p.index.title} role="region">
        {hubGroups.map((g, i) => (
          <GroupBlock key={g.id} g={g} band={i % 2 === 1} />
        ))}
      </div>

      {/* Studio: dunkles Panel mit Preisliste */}
      <section id={p.studio.id} aria-labelledby="studio-title" className="studio">
        <div className="wrap sec-l">
          <div className="grid-12 gap-y-10">
            <div className="col-span-4 md:col-span-7 lg:col-span-7">
              <SectionIntro variant="left" id="studio-title" meta={p.studio.meta} title={p.studio.title}>
                {p.studio.lead}
              </SectionIntro>
              <ol className="card px-5 md:px-8">
                <li>
                  <EntryLink e={{ ...p.studio.entry, level: 1 }} />
                </li>
              </ol>
            </div>
            <figure className="col-span-4 w-full max-w-[230px] md:col-span-4 md:col-start-9 md:max-w-none lg:col-span-3 lg:col-start-10">
              <StudioVideo />
            </figure>
          </div>

          <div className="card mt-14 p-5 md:mt-20 md:p-8">
            <h3 className="sr-only">{p.studio.ratesTitle}</h3>
            <RateCard />
          </div>
          <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
            <ButtonLink href={cta.contentDay.href} variant="line" track="leistungen-studio-contentday">
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
        <SectionIntro id="kreislauf-title" meta={p.system.meta} title={withAccent(p.system.title, p.system.accent)}>
          {p.system.lead}
        </SectionIntro>
        <RingSystem />
      </Section>

      {/* Pakete: mittiger Kopf, zwei Preiskarten */}
      <Section mode="band" space="l" rule="none" labelledBy="pakete-title">
        <SectionIntro id="pakete-title" meta={[p.packages.meta]} title={p.packages.title}>
          {p.packages.text}
        </SectionIntro>
        <dl className="mx-auto grid max-w-[52rem] gap-[var(--gutter)] sm:grid-cols-2">
          {p.packages.rows.map((r) => (
            <div key={r.id} className="card p-6 md:p-8">
              <dt className="t-h3">{r.name}</dt>
              <dd className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="t-meta text-grey-600">CHF</span>
                <span className="t-num">{r.amount}</span>
                <span className="t-small text-grey-600">{r.unit}</span>
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-10 flex justify-center">
          <ButtonLink href={p.packages.link.href} variant="line">
            {p.packages.link.label}
          </ButtonLink>
        </div>
      </Section>

      {/* Weiterlesen als Karte, Linien hell statt schwarz */}
      <Section space="m" rule="none">
        <div className="mx-auto max-w-[52rem]">
          <RelatedLinks links={p.related} />
        </div>
      </Section>

      <FinalCta secondary={p.finalCta.secondary} />
    </>
  );
}

/* ---------- Bausteine dieser Seite ---------- */

function GroupBlock({ g, band }: { g: HubGroup; band: boolean }) {
  return (
    <section id={g.id} aria-labelledby={`${g.id}-title`} className={band ? "bg-paper-2" : ""}>
      <div className="wrap sec-m">
        <div className="grid-12 gap-y-8 lg:grid-rows-[auto_1fr]">
          <div className="col-span-4 md:col-span-12 lg:col-span-4 lg:row-start-1">
            <p className="label-pill">
              {p.index.ringsLabel}: {g.rings.join(" · ")}
            </p>
            <h2 id={`${g.id}-title`} className="t-h2 mt-5" data-reveal>
              {g.title}
            </h2>
            <p className="t-body mt-5 max-w-[42ch] text-grey-700">{g.text}</p>
          </div>

          {/* Leistungen des Bereichs als eine Karte mit ruhigen Zeilen, Unterseiten eingerückt */}
          <ol className="card col-span-4 px-5 md:col-span-12 md:px-8 lg:col-span-8 lg:col-start-5 lg:row-span-2 lg:row-start-1 lg:self-start">
            {g.entries.map((e) => (
              <li key={e.href} className="border-b border-line last:border-b-0">
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
        </div>
      </div>
    </section>
  );
}

function EntryLink({ e }: { e: HubEntry }) {
  const sub = e.level === 2;
  return (
    <Link
      href={e.href}
      className={`group grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-5 md:gap-x-8 ${
        sub ? "py-5 pl-5 md:py-6 md:pl-12" : "py-6 md:py-7"
      }`}
    >
      <h3
        className={`${sub ? "t-h4" : "t-h3"} col-start-1 row-start-1 block transition-colors duration-300 group-hover:text-violet-deep [.studio_&]:group-hover:text-violet-2`}
      >
        {e.name}
      </h3>
      {/* Text unter Titel und Preis: auf Mobile über die volle Breite, damit ein Preis ihn nicht zusammendrückt */}
      <span className={`col-span-2 row-start-2 block md:col-span-1 ${e.price ? "" : "pr-8 md:pr-0"}`}>
        <span className={`${sub ? "t-small" : "t-body"} mt-2 block max-w-[56ch] text-grey-700 [.studio_&]:text-grey-300`}>
          {e.text}
        </span>
        {e.tags.length > 0 && (
          <span className="mt-4 hidden flex-wrap gap-1.5 md:flex">
            {e.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-paper-2 px-2.5 py-1 text-[0.75rem] font-medium leading-tight text-grey-600 [.studio_&]:bg-white/10 [.studio_&]:text-grey-300"
              >
                {t}
              </span>
            ))}
          </span>
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
        /* -my-1: der Kreis macht die Titelzeile nicht höher, der Text rückt nah an den Titel */
        <span
          aria-hidden
          className={`col-start-2 row-start-1 -my-1 grid h-8 w-8 place-items-center rounded-full border border-line text-grey-600 transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-white [.studio_&]:text-grey-300 [.studio_&]:group-hover:border-paper [.studio_&]:group-hover:bg-paper [.studio_&]:group-hover:text-ink`}
        >
          <Arrow className="h-2.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      )}
    </Link>
  );
}

/** Social Recruiting ist ein Produkt: Bestandteile sichtbar, wörtlich aus offers.ts. */
function RecruitingIncludes() {
  return (
    <div className="border-t border-line pb-6 pt-5 md:pb-8">
      <p className="t-meta text-grey-600">Enthalten</p>
      <ul className="check-list t-small mt-4 grid grid-cols-1 gap-x-8 gap-y-3 text-grey-700 sm:grid-cols-2">
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
      <figure className="card p-6 md:p-7">
        <p className="label-pill">{p.caseProof.meta}</p>
        <p className="t-num mt-5" aria-hidden>
          {lead?.value}
        </p>
        <figcaption>
          <p className="t-h4 mt-2 max-w-[18ch]">
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
        <div
          className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-media)] border border-line bg-paper-2 shadow-[var(--shadow-card)]"
          data-reveal="cut"
        >
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
