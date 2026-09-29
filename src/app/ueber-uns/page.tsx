import Image from "next/image";
import { PageHeader } from "@/components/page/PageHeader";
import { FactsTable, RelatedLinks, Section, SectionIntro, Steps } from "@/components/page/Blocks";
import { FinalCta } from "@/components/blocks/FinalCta";
import { TeamStrip } from "@/components/blocks/TeamStrip";
import { Arrow, ArrowLink, ButtonLink } from "@/components/ui/ButtonLink";
import { Meta } from "@/components/ui/Meta";
import { Placeholder } from "@/components/ui/Placeholder";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { JsonLd } from "@/components/seo/JsonLd";
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

/**
 * Über uns: persönlich und belegt, schlicht wie die bisherige Website.
 * Aufbau: dunkler Kopf mit Kurzfakten, Haltung (mittig), Team mit Porträts, Studio-Band mit eigenem Ad,
 * Arbeitsweise (Kette, Prinzipien, Ablauf), Grenzen in zwei Spalten, Datenblatt mit Belegen.
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
        title={header.title}
        lead={header.lead}
        actions={
          <>
            <ButtonLink href={cta.primary.href} track="about-header">
              {cta.primary.label}
            </ButtonLink>
            <ArrowLink href={header.teamLink.href}>{header.teamLink.label}</ArrowLink>
          </>
        }
        aside={<FactsTable caption={header.glanceCaption} rows={header.glance} />}
      />

      {/* Haltung: zwei Sätze, mittig gesetzt wie auf der bisherigen Website */}
      <Section space="l" rule="none" labelledBy="haltung-title">
        <SectionIntro
          id="haltung-title"
          meta={[stance.meta]}
          title={
            <>
              <span lang="en">{stance.mega}</span>{" "}
              <span className="t-h4 mt-3 block normal-case text-grey-600">{stance.megaDe}</span>
            </>
          }
        >
          {stance.text}
        </SectionIntro>

        <div className="mx-auto max-w-[46rem] border-t border-line pt-10 text-center md:pt-12">
          <h3 className="t-h3" lang="en">
            {stance.claim[0]} <span className="text-grey-500">{stance.claim[1]}</span>
          </h3>
          <p className="t-h4 mt-3">{stance.claimDe}</p>
          <p className="t-body mx-auto mt-3 max-w-[52ch] text-grey-700">{stance.claimText}</p>
        </div>
      </Section>

      {/* Team: Porträts, Bios, Bildplatz fürs Team-Shooting */}
      <section id="team" aria-labelledby="team-title" className="sec-l scroll-mt-[var(--header-h)] border-t border-line">
        <div className="wrap">
          <SectionIntro id="team-title" meta={[team.meta]} title={team.title}>
            {team.lead}
          </SectionIntro>

          <div className="hidden md:block">
            <TeamStrip detailed />
          </div>

          {/* Handy: TeamStrip zeigt Bios erst ab md und die Rollen kollidieren in drei Spalten. Darum hier Porträt + Bio pro Person. */}
          <dl className="border-t border-ink md:hidden">
            {corePeople.map((p) => (
              <div key={p.id} className="grid grid-cols-[38%_1fr] gap-x-4 border-b border-line py-5">
                <div className="relative aspect-[4/5] overflow-hidden bg-paper-2">
                  {p.portrait && (
                    <Image
                      src={p.portrait}
                      alt={`Porträt von ${p.name}`}
                      fill
                      sizes="38vw"
                      className="object-cover object-top grayscale"
                      style={p.objectPosition ? { objectPosition: p.objectPosition } : undefined}
                    />
                  )}
                </div>
                <dt>
                  <span className="t-h4 block">{p.name}</span>
                  <span className="t-meta mt-1.5 block text-grey-600">{p.roleShort}</span>
                </dt>
                <dd className="t-small col-span-2 mt-4 text-grey-700">
                  {p.bio}
                  {(p.email || p.linkedin) && (
                    <span className="mt-2 flex flex-wrap gap-x-5">
                      {p.email && (
                        <a href={`mailto:${p.email}`} className="t-meta inline-flex min-h-11 items-center underline underline-offset-4">
                          {p.email}
                        </a>
                      )}
                      {p.linkedin && (
                        <a
                          href={p.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="t-meta inline-flex min-h-11 items-center underline underline-offset-4"
                        >
                          LinkedIn von {p.name.split(" ")[0]}
                          <span className="sr-only"> (öffnet in neuem Tab)</span>
                        </a>
                      )}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-14 md:mt-20">
            <Placeholder label={team.placeholder.label} spec={team.placeholder.spec} ratio="3 / 1" className="min-h-44" />
          </div>
        </div>
      </section>

      {/* Eigenes Ad im Studio-Band: Video links, Text rechts */}
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
              <Meta className="text-grey-400" items={ownAd.meta} />
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

      {/* Arbeitsweise: Kopf links, Kette rechts, danach Prinzipien und Ablauf */}
      <Section mode="band" space="l" rule="none" labelledBy="method-title">
        <div className="grid-12 gap-y-12">
          <div className="col-span-4 md:col-span-5">
            <div className="md:sticky md:top-[calc(var(--header-h)+2rem)]">
              <p className="t-meta text-grey-600">{method.meta}</p>
              <h2 id="method-title" className="t-h2 mt-4" data-reveal>
                {method.title}
              </h2>
              <p className="t-lead mt-5 max-w-[44ch] text-grey-700">{method.lead}</p>
            </div>
          </div>

          <div className="col-span-4 md:col-span-7">
            <p className="t-meta mb-4 text-grey-600">{method.chainLabel}</p>
            <ol className="border-t border-ink">
              {method.chain.map((c, i) => (
                <li
                  key={c.word}
                  className="grid grid-cols-[1.5rem_1fr] gap-x-3 border-b border-line py-5 md:grid-cols-[2rem_minmax(0,1.1fr)_minmax(0,1fr)] md:items-baseline md:gap-x-6 md:py-7"
                  data-reveal
                  style={{ ["--d" as string]: `${i * 80}ms` }}
                >
                  <Arrow className="mt-1.5 text-grey-500 md:mt-0" />
                  <h3 className="t-h4">{c.word}</h3>
                  <p className="t-small col-start-2 mt-1.5 max-w-[36ch] text-grey-700 md:col-start-3 md:mt-0">{c.text}</p>
                </li>
              ))}
            </ol>
            <p className="t-meta mt-4 flex items-center gap-2 text-grey-600">
              <Arrow className="-rotate-90" />
              {method.loopNote}
            </p>
          </div>
        </div>

        {/* Prinzipien als schlichte Liste */}
        <div className="mt-16 md:mt-24">
          <p className="t-meta mb-4 text-grey-600">{method.principlesLabel}</p>
          <ul className="grid border-t border-ink sm:grid-cols-2 sm:gap-x-[var(--gutter)] lg:grid-cols-5">
            {method.principles.map((pr) => (
              <li key={pr} className="t-h4 border-b border-line py-4">
                {pr}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 md:mt-24">
          <h3 className="t-h3 mb-8 md:mb-10">{method.stepsTitle}</h3>
          <Steps steps={method.steps} />
        </div>
      </Section>

      {/* Was wir nicht tun: vier Grenzen in zwei Spalten */}
      <Section space="l" rule="none" labelledBy="nein-title">
        <SectionIntro id="nein-title" meta={[refusals.meta]} title={refusals.title}>
          {refusals.intro}
        </SectionIntro>
        <ul className="grid border-t border-ink md:grid-cols-2 md:gap-x-[var(--gutter)]">
          {refusals.items.map((r) => (
            <li key={r.no} className="border-b border-line py-6 md:py-8">
              <h3 className="t-h4">{r.no}</h3>
              <p className="t-body mt-2 max-w-[52ch] text-grey-700">{r.why}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Firmendaten und Belege als Datenblatt */}
      <Section space="l" rule="line" labelledBy="fakten-title">
        <SectionIntro id="fakten-title" meta={[facts.meta]} title={facts.title}>
          {facts.intro}
        </SectionIntro>

        <div className="grid-12 gap-y-14">
          <div className="col-span-4 md:col-span-6">
            <FactsTable caption={facts.companyCaption} rows={facts.company} />
          </div>

          <div className="col-span-4 md:col-span-5 md:col-start-8">
            <p className="t-meta py-3 text-grey-600">{facts.proofCaption}</p>
            <ul className="border-t border-ink">
              {facts.proofs.map((p) => (
                <li key={p.v} className="border-b border-line py-4">
                  <p className="t-meta text-grey-600">{p.k}</p>
                  <p className="t-h4 mt-1.5">{p.v}</p>
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

            <figure className="mt-12">
              <p className="t-meta text-grey-600">{facts.quoteLabel}</p>
              <blockquote className="t-h3 mt-3">«{pinelli.quote}»</blockquote>
              <figcaption className="mt-5">
                <p className="font-semibold">{pinelli.person}</p>
                <p className="t-small text-grey-700">
                  {pinelli.role}, {pinelli.company}
                </p>
                <p className="t-meta mt-2 text-grey-500">{pinelli.source}</p>
              </figcaption>
              <div className="mt-5">
                <ArrowLink href={facts.casesLink.href}>{facts.casesLink.label}</ArrowLink>
              </div>
            </figure>
          </div>
        </div>
      </Section>

      <Section space="s" rule="line">
        <RelatedLinks links={page.related} />
      </Section>

      <FinalCta title={page.finalCta.title} secondary={cta.contact} />
    </>
  );
}
