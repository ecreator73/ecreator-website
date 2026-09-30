import Image from "next/image";
import { PageHeader } from "@/components/page/PageHeader";
import { NumberChip, RelatedLinks, Section, SectionIntro } from "@/components/page/Blocks";
import { Faq } from "@/components/page/Faq";
import { FinalCta } from "@/components/blocks/FinalCta";
import { Arrow, ArrowLink, ButtonLink } from "@/components/ui/ButtonLink";
import { Placeholder } from "@/components/ui/Placeholder";
import { JsonLd } from "@/components/seo/JsonLd";
import { withAccent } from "@/lib/accent";
import { pageMeta } from "@/lib/metadata";
import { serviceSchema } from "@/lib/schema";
import { cta } from "@/content/site";
import { pinelli } from "@/content/testimonials";
import { crmPage as page } from "@/content/pages/crm-automation";

export const metadata = pageMeta(page.meta);

/** Kleines rundes Pfeil-Symbol zwischen zwei Karten (Richtung per Klasse am Pfeil) */
function Connector({ className = "", arrowClass = "" }: { className?: string; arrowClass?: string }) {
  return (
    <span
      aria-hidden
      className={`absolute z-10 flex h-7 w-7 items-center justify-center rounded-full bg-ink text-white shadow-card ${className}`}
    >
      <Arrow className={arrowClass} />
    </span>
  );
}

/**
 * Die Pipeline als Kartenfolge: fünf Stufen, jede Karte zeigt auf die nächste.
 * Desktop: fünf Spalten mit Pfeilen dazwischen und einem Rücklauf-Bogen darunter (Kreislauf).
 * Mobile: dieselben Karten untereinander, Pfeile nach unten.
 */
function Pipeline() {
  const { stages, loopLabel, loop, lost } = page.pipeline;
  return (
    <div>
      <ol className="grid gap-5 lg:grid-cols-5 lg:gap-4">
        {stages.map((s, i) => {
          const last = i === stages.length - 1;
          return (
            <li key={s.name} className="relative">
              <div className="card flex h-full flex-col p-6">
                {/* Runde Nummer (geteilter Baustein), rein dekorativ, die Liste trägt die Reihenfolge */}
                <span aria-hidden className="flex">
                  <NumberChip n={i + 1} />
                </span>
                <h3 className="t-h3 mt-4">{s.name}</h3>
                <p className="t-small mt-2 text-grey-700">{s.text}</p>
                <ul className="check-list mt-5 space-y-2.5 border-t border-line pt-5" aria-label={`Automatisch auf der Stufe ${s.name}`}>
                  {s.auto.map((a) => (
                    <li key={a} className="t-small">
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Pfeil zur nächsten Stufe: mobil nach unten, Desktop nach rechts */}
              {!last && (
                <Connector
                  className="-bottom-6 left-1/2 -translate-x-1/2 lg:bottom-auto lg:left-auto lg:-right-[1.375rem] lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0"
                  arrowClass="h-[9px] w-3.5 rotate-90 lg:rotate-0"
                />
              )}
            </li>
          );
        })}
      </ol>

      {/* Rücklauf: aus Kunden lernen die Kampagnen, der Kreislauf schliesst sich */}
      <div aria-hidden className="relative mx-[10%] mt-4 hidden h-12 rounded-b-[24px] border-x border-b border-line-strong lg:block">
        <Arrow className="absolute -left-[8.5px] -top-[7px] -rotate-90 text-grey-500" />
      </div>
      <p className="mt-6 flex justify-center lg:-mt-[1.05rem]">
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-[0.8125rem] font-medium shadow-card">
          <Arrow className="-rotate-90 text-violet lg:hidden" />
          {loopLabel}
        </span>
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-5 lg:mt-10">
        <p className="card t-body p-6 md:p-8">{loop}</p>
        <p className="card t-body p-6 text-grey-700 md:p-8">{lost}</p>
      </div>
    </div>
  );
}

export default function CrmAutomationPage() {
  const t = pinelli;

  return (
    <>
      <JsonLd data={serviceSchema({ ...page.schema, path: page.meta.path })} />

      <PageHeader
        crumbs={page.crumbs}
        meta={[...page.header.meta]}
        title={page.header.title.map((l) => withAccent(l, page.header.accent))}
        lead={page.header.lead}
        actions={
          <>
            <ButtonLink href={cta.primary.href} track="crm-header">
              {cta.primary.label}
            </ButtonLink>
            <ArrowLink href={page.header.secondaryLink.href}>{page.header.secondaryLink.label}</ArrowLink>
          </>
        }
      />

      {/* Einstieg: wo Anfragen heute liegen, durchgestrichen. Übrig bleibt ein System. */}
      <section aria-labelledby="manifest-title" className="sec-l bg-paper-2">
        <div className="wrap">
          <div className="mx-auto max-w-[48rem] text-center">
            <h2 id="manifest-title">
              <span className="label-pill">{page.manifest.kicker}</span>{" "}
              <span className="mt-6 flex flex-wrap justify-center gap-2.5">
                {page.manifest.struck.map((d) => (
                  <span
                    key={d}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-[0.9375rem] font-medium text-grey-500"
                  >
                    <svg aria-hidden viewBox="0 0 10 10" className="h-2.5 w-2.5 flex-none text-grey-400">
                      <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                    <s className="decoration-1">{d} </s>
                  </span>
                ))}
              </span>{" "}
              <span className="t-h2 mt-8 block" data-reveal>
                <span className="text-accent">{page.manifest.mega}</span>
              </span>
            </h2>
            <p className="t-lead mt-6 text-grey-700">{page.manifest.left}</p>
            <p className="t-lead mt-4">{page.manifest.right}</p>
          </div>
        </div>
      </section>

      {/* Die Pipeline als Kartenfolge */}
      <Section space="l" rule="none" labelledBy="pipeline-title">
        <SectionIntro meta={[page.pipeline.meta]} title={page.pipeline.title} id="pipeline-title">
          {page.pipeline.intro}
        </SectionIntro>
        <Pipeline />
      </Section>

      {/* Wenn / Dann: jede Regel als Karte */}
      <Section id="automationen" mode="band" space="l" rule="none" labelledBy="regeln-title">
        <SectionIntro meta={[page.rules.meta]} title={page.rules.title} id="regeln-title">
          {page.rules.intro}
        </SectionIntro>

        <ol className="grid gap-4 md:grid-cols-2 md:gap-5">
          {page.rules.items.map((r) => (
            <li key={r.when} className="card grid grid-cols-[minmax(0,1fr)_auto] content-start gap-x-4 p-6 md:p-8">
              <p className="t-meta col-start-1 row-start-1 self-center text-grey-600">{page.rules.head.when}</p>
              <p className="t-h4 col-span-2 mt-3">{r.when}</p>
              <div className="col-span-2 mt-5 border-t border-line pt-5">
                <p className="t-meta flex items-center gap-2 text-violet-deep">
                  <Arrow />
                  {page.rules.head.then}
                </p>
                <p className="t-body mt-2 text-grey-700">{r.then}</p>
              </div>
              {/* Kanal steht im Code am Schluss (Lesereihenfolge), optisch oben rechts */}
              <p className="col-start-2 row-start-1 self-center">
                <span className="sr-only">{page.rules.head.channel}: </span>
                <span className="t-meta inline-flex rounded-full bg-paper-2 px-3 py-1.5 text-grey-600">{r.channel}</span>
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Was wir bauen: nach Aufgabe gruppiert, je Gruppe eine Karte */}
      <Section space="l" rule="none" labelledBy="bauen-title">
        <SectionIntro meta={[page.build.meta]} title={page.build.title} id="bauen-title">
          {page.build.intro}
        </SectionIntro>

        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          {page.build.groups.map((g) => (
            <div key={g.name} className="card p-6 md:p-8">
              <h3 className="t-h3">{g.name}</h3>
              <ul className="check-list mt-6 space-y-5">
                {g.items.map((it) => (
                  <li key={it.title}>
                    <p className="t-h4">{it.title}</p>
                    <p className="t-small mt-1 max-w-[46ch] text-grey-700">{it.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid-12 mt-10 gap-y-4 md:mt-14">
          {/* Bildplatz im Fensterrahmen: hier kommt der echte Screenshot hin */}
          <div className="col-span-4 md:col-span-7">
            <div className="card overflow-hidden">
              <div aria-hidden className="flex h-9 items-center gap-1.5 border-b border-line bg-paper-2 px-3.5 md:h-10">
                <span className="h-2.5 w-2.5 rounded-full bg-grey-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-grey-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-grey-300" />
              </div>
              <Placeholder label={page.build.placeholder.label} spec={page.build.placeholder.spec} ratio="16 / 10" tone="paper" />
            </div>
          </div>
          <div className="col-span-4 flex flex-col gap-4 md:col-span-5">
            <div className="card flex flex-1 flex-col justify-center p-6 md:p-8">
              <p className="t-body text-grey-700">{page.build.recruiting.text}</p>
              <ArrowLink href={page.build.recruiting.link.href} className="mt-3 self-start">
                {page.build.recruiting.link.label}
              </ArrowLink>
            </div>
            <div className="card flex flex-1 flex-col justify-center p-6 md:p-8">
              <p className="t-body text-grey-700">{page.build.packages.text}</p>
              <ArrowLink href={page.build.packages.link.href} className="mt-3 self-start">
                {page.build.packages.link.label}
              </ArrowLink>
            </div>
          </div>
        </div>
      </Section>

      {/* Beleg: Kundenstimme aus dem veröffentlichten Video-Interview */}
      <section aria-labelledby="stimme-title" className="studio sec-l">
        <div className="wrap">
          <div className="grid-12 gap-y-12">
            <div className="col-span-4 md:col-span-8">
              <h2 id="stimme-title" className="label-pill">
                {page.proof.meta}
              </h2>
              <p className="t-lead mt-6 max-w-[40ch] text-grey-300">{page.proof.lead}</p>
              <figure className="mt-8 md:mt-10">
                <blockquote>
                  <p className="t-h2">«{t.quote}»</p>
                  {t.context && <p className="t-lead mt-6 max-w-[48ch] text-grey-300">«{t.context}»</p>}
                </blockquote>
                <figcaption className="mt-8 border-t border-line pt-4">
                  <p className="t-h4">{t.person}</p>
                  <p className="t-meta mt-1.5 text-grey-400">
                    {t.role}, {t.company} <span className="text-grey-500">/</span> {t.source}
                  </p>
                  <p className="t-small mt-3 max-w-[52ch] text-grey-300">{page.proof.project}</p>
                </figcaption>
              </figure>
            </div>
            {t.video?.poster && (
              <div className="col-span-4 w-2/3 md:col-span-4 md:w-auto md:self-end">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-media)] bg-ink-2">
                  <Image
                    src={t.video.poster}
                    alt={`${t.person} im Video-Interview`}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover object-[56%_40%] grayscale"
                  />
                </div>
                <p className="t-meta mt-3 text-grey-400">{page.proof.still}</p>
              </div>
            )}
          </div>
          <div className="mt-12 border-t border-line pt-6 md:mt-16">
            <ArrowLink href={page.proof.casesLink.href} className="text-paper">
              {page.proof.casesLink.label}
            </ArrowLink>
          </div>
        </div>
      </section>

      {/* FAQ in einer Karte */}
      <Section space="l" rule="none" labelledBy="faq-title">
        <SectionIntro meta={[page.faq.meta]} title={page.faq.title} id="faq-title" />
        <div className="mx-auto max-w-[56rem]">
          <Faq items={[...page.faq.items]} />
        </div>
      </Section>

      {/* Weiterlesen als Kartenraster (geteilter Baustein) */}
      <Section space="s" rule="none">
        <RelatedLinks layout="grid" links={page.related} />
      </Section>

      <FinalCta title={page.finalCta.title} secondary={cta.crm} />
    </>
  );
}
