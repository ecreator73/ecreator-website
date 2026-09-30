import Image from "next/image";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/page/PageHeader";
import { NumberChip, RelatedLinks, Section, SectionIntro } from "@/components/page/Blocks";
import { FinalCta } from "@/components/blocks/FinalCta";
import { Arrow, ArrowLink, ButtonLink } from "@/components/ui/ButtonLink";
import { Placeholder } from "@/components/ui/Placeholder";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { JsonLd } from "@/components/seo/JsonLd";
import { withAccent } from "@/lib/accent";
import { pageMeta } from "@/lib/metadata";
import { abs, personSchema } from "@/lib/schema";
import { cta, site } from "@/content/site";
import { corePeople } from "@/content/team";
import { pinelli } from "@/content/testimonials";
import { workById } from "@/content/work";
import { ueberUnsPage as page } from "@/content/pages/ueber-uns";

export const metadata = pageMeta(page.meta);

/** AboutPage-Schema (lokal, schema.ts hat keinen Helfer dafür): die Seite beschreibt die Organisation aus layout.tsx. */
function aboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `${page.meta.title} · eCreator`,
    description: page.meta.description,
    url: abs(page.meta.path),
    inLanguage: "de-CH",
    about: { "@id": `${site.url}/#organization` },
    isPartOf: { "@id": `${site.url}/#website` },
  };
}

/** Schlüssel / Wert in einer Karte: feine Linien statt schwarzer Regel. */
function Rows({ rows }: { rows: { k: string; v: ReactNode }[] }) {
  return (
    <dl className="divide-y divide-line">
      {rows.map((r) => (
        <div key={r.k} className="grid grid-cols-[minmax(0,40%)_minmax(0,1fr)] gap-3 py-3.5 first:pt-0 last:pb-0">
          <dt className="t-small min-w-0 hyphens-auto pt-[0.1em] text-grey-600">{r.k}</dt>
          <dd className="t-body">{r.v}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Kleines Symbol-Feld in Karten (violett getönt) */
function IconBadge({ children, tone = "violet" }: { children: ReactNode; tone?: "violet" | "grey" }) {
  const cls = tone === "violet" ? "bg-violet/10 text-violet-deep" : "bg-paper-2 text-ink";
  return (
    <span aria-hidden className={`t-small flex h-10 w-10 flex-none items-center justify-center rounded-xl font-semibold tnum ${cls}`}>
      {children}
    </span>
  );
}

/**
 * Über uns: persönlich und belegt, hell und ruhig.
 * Aufbau: Kopf mit Kurzfakten als Karte, Haltung (Band) mit Claim-Karte, Team als Porträtkarten,
 * Studio-Panel mit eigenem Ad, Arbeitsweise (Prinzipien als Häkchen-Liste, Kette als Karte, Ablauf in drei Karten),
 * Grenzen als 2×2-Karten, Firmendaten und Belege als Karten.
 */
export default function UeberUnsPage() {
  const { header, stance, team, ownAd, method, refusals, facts } = page;
  const ad = workById("ecreator");

  return (
    <>
      <JsonLd
        data={[
          aboutPageSchema(),
          ...corePeople.map((p) =>
            personSchema({ name: p.name, jobTitle: p.role, image: p.portrait, description: p.bio }),
          ),
        ]}
      />

      <PageHeader
        crumbs={page.crumbs}
        meta={header.meta}
        title={header.title.map((l) => withAccent(l, header.accent))}
        lead={header.lead}
        actions={
          <>
            <ButtonLink href={cta.primary.href} track="about-header">
              {cta.primary.label}
            </ButtonLink>
            <ArrowLink href={header.teamLink.href}>{header.teamLink.label}</ArrowLink>
          </>
        }
        aside={
          /* Kurzfakten als 2×2-Raster in der Karte, ohne eigene Linien */
          <div className="text-center">
            <p className="t-meta text-grey-600">{header.glanceCaption}</p>
            <dl className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {header.glance.map((r) => (
                <div key={r.k}>
                  <dt className="t-small text-grey-600">{r.k}</dt>
                  <dd className="t-body mt-0.5 font-semibold">{r.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        }
      />

      {/* Haltung: Satz mittig, der Claim als ruhige Karte darunter */}
      <Section mode="band" space="l" rule="none" labelledBy="haltung-title">
        <SectionIntro
          id="haltung-title"
          meta={[stance.meta]}
          title={
            <>
              <span lang="en">{withAccent(stance.mega, stance.accent)}</span>{" "}
              <span className="t-h4 mt-3 block text-grey-600">{stance.megaDe}</span>
            </>
          }
        >
          {stance.text}
        </SectionIntro>

        <div className="card mx-auto max-w-[46rem] p-7 text-center md:p-10">
          <h3 className="t-h3" lang="en">
            {stance.claim[0]} <span className="text-grey-500">{stance.claim[1]}</span>
          </h3>
          <p className="t-h4 mt-3">{stance.claimDe}</p>
          <p className="t-body mx-auto mt-3 max-w-[52ch] text-grey-700">{stance.claimText}</p>
        </div>
      </Section>

      {/* Team: Porträtkarten mit Bio, danach Bildplatz fürs Team-Shooting */}
      <section id="team" aria-labelledby="team-title" className="sec-l scroll-mt-[var(--header-h)]">
        <div className="wrap">
          <SectionIntro id="team-title" meta={[team.meta]} title={team.title}>
            {team.lead}
          </SectionIntro>

          {/* Handy: Porträt links neben Name und Rolle, Bio darunter. Ab md: Porträt oben, alles gestapelt. */}
          <ul className="grid gap-5 md:grid-cols-3">
            {corePeople.map((p) => (
              <li key={p.id} className="card grid grid-cols-[38%_minmax(0,1fr)] content-start overflow-hidden md:grid-cols-1">
                <div className="relative aspect-[4/5] bg-paper-2">
                  {p.portrait && (
                    <Image
                      src={p.portrait}
                      alt={`Porträt von ${p.name}`}
                      fill
                      sizes="(min-width: 768px) 30vw, 38vw"
                      className="object-cover object-top"
                      style={p.objectPosition ? { objectPosition: p.objectPosition } : undefined}
                    />
                  )}
                </div>
                <div className="self-center px-4 py-4 md:self-auto md:px-6 md:pb-0 md:pt-6">
                  <h3 className="t-h4">{p.name}</h3>
                  <p className="t-small mt-1 text-grey-600">{p.roleShort}</p>
                  <p className="t-small mt-1 hidden text-grey-500 md:block">{p.focus.join(" · ")}</p>
                </div>
                <div className="col-span-2 border-t border-line px-4 pb-4 pt-4 md:col-span-1 md:border-t-0 md:px-6 md:pb-6 md:pt-4">
                  <p className="t-small text-grey-700">{p.bio}</p>
                  {(p.email || p.linkedin) && (
                    <p className="mt-2 flex flex-wrap gap-x-5">
                      {p.email && (
                        <a href={`mailto:${p.email}`} className="t-small inline-flex min-h-11 items-center font-semibold underline underline-offset-4">
                          {p.email}
                        </a>
                      )}
                      {p.linkedin && (
                        <a
                          href={p.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="t-small inline-flex min-h-11 items-center font-semibold underline underline-offset-4"
                        >
                          LinkedIn von {p.name.split(" ")[0]}
                          <span className="sr-only"> (öffnet in neuem Tab)</span>
                        </a>
                      )}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-12 md:mt-16">
            <Placeholder
              label={team.placeholder.label}
              spec={team.placeholder.spec}
              ratio="3 / 1"
              className="min-h-44 rounded-[var(--radius-media)]"
            />
          </div>
        </div>
      </section>

      {/* Eigenes Ad im Studio-Panel: Video links, Text rechts */}
      <section aria-labelledby="ad-title" className="studio">
        <div className="wrap sec-m">
          <div className="mx-auto grid max-w-[60rem] items-center gap-10 md:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] md:gap-16">
            <figure>
              <div className="w-[48%] md:w-auto">
                <VideoFrame src={ad.short} poster={ad.poster} label={ownAd.videoLabel} />
              </div>
              {/* als Fliesstext gesetzt, damit die lange Zeile auf schmalen Handys umbricht */}
              <figcaption className="t-meta mt-3 text-grey-400">
                {ownAd.caption[0]} <span className="text-grey-500">/</span> {ownAd.caption[1]}
              </figcaption>
            </figure>
            <div>
              <p className="label-pill">{ownAd.meta.join(" · ")}</p>
              <h2 id="ad-title" className="t-h2 mt-5" data-reveal>
                {ownAd.title}
              </h2>
              <p className="t-lead mt-5 max-w-[44ch] text-grey-300">{ownAd.text}</p>
              <div className="mt-8">
                <ArrowLink href={ownAd.link.href} className="text-paper">
                  {ownAd.link.label}
                </ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Arbeitsweise: Kopf mit Prinzipien links, die Kette als Karte rechts, danach der Ablauf in drei Karten */}
      <Section mode="band" space="l" rule="none" labelledBy="method-title">
        <div className="grid-12 gap-y-12 lg:items-center">
          <div className="col-span-4 md:col-span-12 lg:col-span-5">
            <p className="label-pill">{method.meta}</p>
            <h2 id="method-title" className="t-h2 mt-5" data-reveal>
              {withAccent(method.title, method.accent)}
            </h2>
            <p className="t-lead mt-5 max-w-[44ch] text-grey-700">{method.lead}</p>

            <h3 className="t-h4 mt-10">{method.principlesLabel}</h3>
            <ul className="check-list mt-5 space-y-3">
              {method.principles.map((pr) => (
                <li key={pr} className="t-body">
                  {pr}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-4 md:col-span-12 lg:col-span-6 lg:col-start-7">
            <div className="card p-6 md:p-8">
              <p className="t-meta text-grey-600">{method.chainLabel}</p>
              <ol className="mt-3 divide-y divide-line">
                {method.chain.map((c, i) => (
                  <li
                    key={c.word}
                    className="flex gap-4 py-4 md:py-5"
                    data-reveal
                    style={{ ["--d" as string]: `${i * 80}ms` }}
                  >
                    <IconBadge>
                      <Arrow />
                    </IconBadge>
                    <div className="min-w-0">
                      <h3 className="t-h4">{c.word}</h3>
                      <p className="t-small mt-1 max-w-[44ch] text-grey-700">{c.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="t-small flex items-center gap-2 border-t border-line pt-4 text-grey-600">
                <Arrow className="-rotate-90" />
                {method.loopNote}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-24">
          <h3 className="t-h3 text-center">{method.stepsTitle}</h3>
          <ol className="mt-8 grid gap-5 md:mt-10 md:grid-cols-3">
            {method.steps.map((s, i) => (
              <li key={s.title} className="card flex flex-col p-6 md:p-8">
                <span aria-hidden className="flex self-start">
                  <NumberChip n={i + 1} />
                </span>
                <h4 className="t-h4 mt-5">{s.title}</h4>
                <p className="t-small mt-2 text-grey-700">{s.text}</p>
                {s.meta && (
                  <div className="mt-auto pt-5">
                    <p className="t-small border-t border-line pt-4 font-medium text-grey-600">{s.meta}</p>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Was wir nicht tun: vier Grenzen als 2×2-Karten */}
      <Section space="l" rule="none" labelledBy="nein-title">
        <SectionIntro id="nein-title" meta={[refusals.meta]} title={refusals.title}>
          {refusals.intro}
        </SectionIntro>
        <ul className="mx-auto grid max-w-[64rem] gap-5 md:grid-cols-2">
          {refusals.items.map((r) => (
            <li key={r.no} className="card p-6 md:p-8">
              <IconBadge tone="grey">
                <svg viewBox="0 0 12 12" className="h-3 w-3">
                  <path d="M2 2l8 8M10 2l-8 8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </IconBadge>
              <h3 className="t-h4 mt-5">{r.no}</h3>
              <p className="t-body mt-2 max-w-[52ch] text-grey-700">{r.why}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Firmendaten, Belege und Kundenstimme als drei Karten */}
      <Section mode="band" space="l" rule="none" labelledBy="fakten-title">
        <SectionIntro id="fakten-title" meta={[facts.meta]} title={withAccent(facts.title, facts.accent)}>
          {facts.intro}
        </SectionIntro>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div className="card p-6 md:p-8">
            <h3 className="t-h4 mb-5">{facts.companyCaption}</h3>
            <Rows rows={facts.company} />
          </div>

          <div className="card p-6 md:p-8">
            <h3 className="t-h4 mb-2">{facts.proofCaption}</h3>
            <ul className="divide-y divide-line">
              {facts.proofs.map((p) => (
                <li key={p.v} className="py-4 last:pb-0">
                  <p className="t-small text-grey-600">{p.k}</p>
                  <p className="t-h4 mt-1">{p.v}</p>
                  <p className="t-small mt-1 text-grey-700">{p.note}</p>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group -mb-2.5 inline-flex min-h-11 items-center gap-2 font-semibold"
                  >
                    <span className="link">{p.linkLabel}</span>
                    <Arrow className="-rotate-45 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    <span className="sr-only"> {p.v} (öffnet in neuem Tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <figure className="card flex flex-col p-6 md:col-span-2 md:p-8 lg:col-span-1">
            <p className="label-pill self-start">{facts.quoteLabel}</p>
            <blockquote className="t-h3 mt-6">«{pinelli.quote}»</blockquote>
            <figcaption className="mt-6 border-t border-line pt-5">
              <p className="font-semibold">{pinelli.person}</p>
              <p className="t-small text-grey-700">
                {pinelli.role}, {pinelli.company}
              </p>
              <p className="t-meta mt-2 text-grey-500">{pinelli.source}</p>
            </figcaption>
            <div className="mt-auto pt-6">
              <ArrowLink href={facts.casesLink.href}>{facts.casesLink.label}</ArrowLink>
            </div>
          </figure>
        </div>
      </Section>

      <Section space="m" rule="none">
        <div className="mx-auto max-w-[52rem]">
          <RelatedLinks links={page.related} />
        </div>
      </Section>

      <FinalCta title={page.finalCta.title} secondary={cta.contact} />
    </>
  );
}
