import Image from "next/image";
import { PageHeader } from "@/components/page/PageHeader";
import { RelatedLinks, Section, SectionIntro } from "@/components/page/Blocks";
import { Faq } from "@/components/page/Faq";
import { FinalCta } from "@/components/blocks/FinalCta";
import { Arrow, ArrowLink, ButtonLink } from "@/components/ui/ButtonLink";
import { Placeholder } from "@/components/ui/Placeholder";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta } from "@/lib/metadata";
import { serviceSchema } from "@/lib/schema";
import { cta } from "@/content/site";
import { pinelli } from "@/content/testimonials";
import { crmPage as page } from "@/content/pages/crm-automation";

export const metadata = pageMeta(page.meta);

/**
 * Die Pipeline als typografisches Flussdiagramm: fünf Stufen aus Linien und Mono-Labels,
 * ohne Zahlen und ohne Dashboard-Optik. Desktop: Spalten mit Pfeil-Spur und Rücklauf (Kreislauf).
 * Mobile: dieselben Stufen untereinander, Spur senkrecht.
 */
function Pipeline() {
  const { stages, loopLabel, loop, lost } = page.pipeline;
  return (
    <div>
      <ol className="grid gap-y-0 lg:grid-cols-5 lg:gap-x-[var(--gutter)]">
        {stages.map((s, i) => {
          const last = i === stages.length - 1;
          return (
            <li key={s.name} className="relative pb-10 pl-9 lg:pb-0 lg:pl-0">
              {/* Spur mobil: senkrecht, mit Pfeil zur nächsten Stufe */}
              <span aria-hidden className="absolute left-[7px] top-[0.9rem] h-px w-3.5 bg-ink lg:hidden" />
              <span aria-hidden className={`absolute bottom-3 left-[7px] top-[0.9rem] w-px bg-ink lg:hidden ${last ? "hidden" : ""}`} />
              {!last && <Arrow className="absolute bottom-3 left-[2px] rotate-90 text-ink lg:hidden" />}

              <h3 className="t-h3">{s.name}</h3>

              {/* Spur Desktop: waagrecht, jede Stufe zeigt auf die nächste */}
              <div aria-hidden className="mt-5 hidden items-center lg:flex">
                <span className="h-3 w-px bg-ink" />
                <span className="h-px flex-1 bg-ink" />
                {last ? <span className="h-3 w-px bg-ink" /> : <Arrow className="-ml-[3px] text-ink" />}
              </div>

              <p className="t-small mt-3 max-w-[34ch] text-grey-700 lg:mt-5">{s.text}</p>
              <ul className="mt-5 border-t border-line" aria-label={`Automatisch auf der Stufe ${s.name}`}>
                {s.auto.map((a) => (
                  <li key={a} className="t-meta border-b border-line py-2.5 text-grey-600">
                    {a}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>

      {/* Rücklauf: aus Kunden lernen die Kampagnen, der Kreislauf schliesst sich */}
      <div className="relative mt-2 hidden h-14 border-x border-b border-ink lg:mt-10 lg:block" aria-hidden>
        <Arrow className="absolute -left-[8.5px] -top-[7px] -rotate-90 text-ink" />
      </div>
      <p className="t-meta relative flex items-start gap-3 border-t border-ink pt-3 lg:-mt-[0.6rem] lg:justify-center lg:border-t-0 lg:pt-0">
        <Arrow className="mt-[3px] -rotate-90 text-ink lg:hidden" />
        <span className="lg:bg-paper-2 lg:px-4">{loopLabel}</span>
      </p>

      <div className="grid-12 mt-6 gap-y-4 lg:mt-12">
        <p className="t-body col-span-4 max-w-[44ch] md:col-span-6 lg:col-span-5">{loop}</p>
        <p className="t-body col-span-4 max-w-[44ch] text-grey-700 md:col-span-6 lg:col-span-5 lg:col-start-8">{lost}</p>
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
        title={[...page.header.title]}
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
      <section aria-labelledby="manifest-title" className="sec-l">
        <div className="wrap">
          <div className="mx-auto max-w-[46rem] text-center">
            <h2 id="manifest-title">
              <span className="t-meta block text-grey-600">{page.manifest.kicker}</span>{" "}
              <span className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-1">
                {page.manifest.struck.map((d) => (
                  <s key={d} className="t-h4 text-grey-500 decoration-1">
                    {d}{" "}
                  </s>
                ))}
              </span>{" "}
              <span className="t-h2 mt-6 block" data-reveal>
                {page.manifest.mega}
              </span>
            </h2>
            <p className="t-lead mt-6 text-grey-700">{page.manifest.left}</p>
            <p className="t-lead mt-4">{page.manifest.right}</p>
          </div>
        </div>
      </section>

      {/* Die Pipeline als Diagramm */}
      <Section mode="band" space="l" rule="none" labelledBy="pipeline-title">
        <SectionIntro meta={[page.pipeline.meta]} title={page.pipeline.title} id="pipeline-title">
          {page.pipeline.intro}
        </SectionIntro>
        <Pipeline />
      </Section>

      {/* Wenn / Dann als Datenblatt */}
      <Section id="automationen" space="l" rule="none" labelledBy="regeln-title">
        <SectionIntro meta={[page.rules.meta]} title={page.rules.title} id="regeln-title">
          {page.rules.intro}
        </SectionIntro>

        <div className="border-t border-ink">
          <div aria-hidden className="grid-12 hidden py-3 md:grid">
            <span className="t-meta col-span-4 text-grey-600">{page.rules.head.when}</span>
            <span className="t-meta col-span-6 text-grey-600">{page.rules.head.then}</span>
            <span className="t-meta col-span-2 text-right text-grey-600">{page.rules.head.channel}</span>
          </div>
          <ol>
            {page.rules.items.map((r) => (
              <li key={r.when} className="grid-12 gap-y-2 border-t border-line py-5 md:py-6">
                <p className="col-span-4">
                  <span className="t-meta block text-grey-600 md:sr-only">{page.rules.head.when}</span>
                  <span className="t-h4 mt-1 block md:mt-0">{r.when}</span>
                </p>
                <p className="col-span-4 md:col-span-6">
                  <span className="t-meta mt-2 block text-grey-600 md:sr-only">{page.rules.head.then}</span>
                  <span className="mt-1 flex gap-3 md:mt-0">
                    <Arrow className="mt-[0.55em] hidden text-grey-500 md:block" />
                    <span className="t-body text-grey-700">{r.then}</span>
                  </span>
                </p>
                <p className="t-meta col-span-4 text-grey-600 md:col-span-2 md:pt-[0.3em] md:text-right">
                  <span className="sr-only">{page.rules.head.channel}: </span>
                  {r.channel}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Was wir bauen: nach Aufgabe gruppiert */}
      <Section space="l" rule="ink" labelledBy="bauen-title">
        <SectionIntro meta={[page.build.meta]} title={page.build.title} id="bauen-title">
          {page.build.intro}
        </SectionIntro>

        <div>
          {page.build.groups.map((g) => (
            <div key={g.name} className="grid-12 gap-y-4 border-t border-line py-7 md:py-9">
              <h3 className="t-h3 col-span-4 text-grey-500 md:col-span-4 lg:col-span-3">{g.name}</h3>
              <ul className="col-span-4 grid gap-x-[var(--gutter)] gap-y-6 sm:grid-cols-2 md:col-span-8 lg:col-span-8 lg:col-start-5">
                {g.items.map((it) => (
                  <li key={it.title}>
                    <p className="t-h4">{it.title}</p>
                    <p className="t-small mt-1.5 max-w-[40ch] text-grey-700">{it.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid-12 mt-10 gap-y-10 border-t border-ink pt-10 md:mt-14 md:pt-14">
          <div className="col-span-4 md:col-span-6">
            <Placeholder label={page.build.placeholder.label} spec={page.build.placeholder.spec} ratio="16 / 10" tone="paper" />
          </div>
          <div className="col-span-4 flex flex-col gap-8 md:col-span-5 md:col-start-8 md:justify-center">
            <div>
              <p className="t-body text-grey-700">{page.build.recruiting.text}</p>
              <ArrowLink href={page.build.recruiting.link.href} className="mt-2">
                {page.build.recruiting.link.label}
              </ArrowLink>
            </div>
            <div className="border-t border-line pt-6">
              <p className="t-body text-grey-700">{page.build.packages.text}</p>
              <ArrowLink href={page.build.packages.link.href} className="mt-2">
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
              <h2 id="stimme-title" className="t-meta text-grey-400">
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
                <div className="relative aspect-[4/5] overflow-hidden bg-ink-2">
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

      {/* FAQ */}
      <Section space="l" rule="none" labelledBy="faq-title">
        <SectionIntro meta={[page.faq.meta]} title={page.faq.title} id="faq-title" />
        <div className="mx-auto max-w-[56rem]">
          <Faq items={[...page.faq.items]} />
        </div>
      </Section>

      <Section space="s" rule="line">
        <RelatedLinks links={[...page.related]} />
      </Section>

      <FinalCta title={page.finalCta.title} secondary={cta.crm} />
    </>
  );
}
