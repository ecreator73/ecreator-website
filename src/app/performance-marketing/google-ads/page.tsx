import Image from "next/image";
import { PageHeader } from "@/components/page/PageHeader";
import { FactsTable, RelatedLinks, Section, SectionIntro } from "@/components/page/Blocks";
import { Faq } from "@/components/page/Faq";
import { FinalCta } from "@/components/blocks/FinalCta";
import { ArrowLink, ButtonLink } from "@/components/ui/ButtonLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta } from "@/lib/metadata";
import { serviceSchema } from "@/lib/schema";
import { cta } from "@/content/site";
import { googleAdsPage as page } from "@/content/pages/google-ads";

export const metadata = pageMeta(page.meta);

export default function GoogleAdsPage() {
  const { chain, landing, keywords, setup, pricing } = page;

  return (
    <>
      <JsonLd data={serviceSchema({ ...page.schema, path: page.meta.path })} />

      <PageHeader
        crumbs={page.crumbs}
        meta={page.header.meta}
        title={page.header.title}
        lead={page.header.lead}
        actions={
          <>
            <ButtonLink href={cta.primary.href} track="google-header">
              {cta.primary.label}
            </ButtonLink>
            <ArrowLink href={page.header.secondaryLink.href}>{page.header.secondaryLink.label}</ArrowLink>
          </>
        }
      />

      {/* Die Kette bis zur Anfrage: Titel mittig, die Beispiel-Suche, dann vier Glieder als schlichte Reihe */}
      <Section space="m" rule="ink" labelledBy="kette-title">
        <SectionIntro title={chain.title} id="kette-title">
          {chain.lead}
        </SectionIntro>
        <figure className="mb-10 text-center md:mb-14">
          <figcaption className="t-meta text-grey-600">{chain.label}</figcaption>
          <blockquote className="mt-3">
            <p className="t-h3">
              <span className="text-grey-400">«</span>
              {chain.query}
              <span className="text-grey-400">»</span>
            </p>
          </blockquote>
        </figure>
        <ol className="grid gap-y-8 md:grid-cols-2 md:gap-x-[var(--gutter)] lg:grid-cols-4">
          {chain.steps.map((s, i) => (
            <li key={s.title} className="border-t border-ink pt-5">
              <p aria-hidden className="t-meta text-grey-600">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="t-h4 mt-3">{s.title}</h3>
              <p className="t-small mt-2 max-w-[44ch] text-grey-700">{s.text}</p>
              <p className="t-meta mt-3 text-grey-600">{s.meta}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Das Glied «Landingpage» als echtes Beispiel: Titel mittig, ein Bild, darunter Hinweis und Links */}
      <Section mode="band" space="m" rule="none" labelledBy="ziel-title">
        <SectionIntro meta={[landing.meta]} title={landing.title} id="ziel-title">
          {landing.text}
        </SectionIntro>
        <figure className="mx-auto max-w-[60rem]">
          <div className="relative aspect-[16/10] overflow-hidden bg-paper" data-reveal="cut">
            <Image
              src={landing.image.desktop}
              alt={landing.image.alt}
              fill
              sizes="(min-width: 1024px) 60rem, 92vw"
              className="object-cover object-top"
            />
          </div>
          <figcaption className="t-meta mt-3 text-grey-700">
            {landing.caption[0]} <span className="text-grey-500">/</span> {landing.caption[1]}
          </figcaption>
        </figure>
        <div className="mx-auto mt-8 max-w-[46rem] text-center">
          <p className="t-small text-grey-700">{landing.note}</p>
          <p className="t-meta mt-3 text-grey-600">{landing.evidence}</p>
          <div className="mt-5 flex flex-col items-center gap-1 sm:flex-row sm:justify-center sm:gap-8">
            {landing.links.map((l) => (
              <ArrowLink key={l.href} href={l.href}>
                {l.label}
              </ArrowLink>
            ))}
          </div>
        </div>
      </Section>

      {/* Suchbegriffe nach Absicht: ausgeschlossene Begriffe sind durchgestrichen */}
      <Section space="m" rule="none" labelledBy="keywords-title">
        <SectionIntro meta={[keywords.meta]} title={keywords.title} id="keywords-title">
          {keywords.lead}
        </SectionIntro>
        <div role="table" aria-label={`${keywords.meta}: ${keywords.caption}`}>
          <div role="rowgroup">
            <div
              role="row"
              className="hidden border-b border-ink pb-3 md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,4fr)_minmax(0,3fr)] md:gap-x-[var(--gutter)]"
            >
              {keywords.columns.map((c) => (
                <span key={c} role="columnheader" className="t-meta text-grey-600">
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div role="rowgroup" className="border-t border-ink md:border-t-0">
            {keywords.rows.map((r) => {
              const out = "excluded" in r && r.excluded;
              return (
                <div
                  key={r.query}
                  role="row"
                  className="grid gap-y-2 border-b border-line py-5 md:grid-cols-[minmax(0,5fr)_minmax(0,4fr)_minmax(0,3fr)] md:items-baseline md:gap-x-[var(--gutter)] md:py-6"
                >
                  <p
                    role="rowheader"
                    className={`t-h4 ${out ? "text-grey-500 line-through decoration-[0.06em]" : ""}`}
                  >
                    «{r.query}»
                  </p>
                  <p role="cell" className="t-body text-grey-700">
                    {r.intent}
                  </p>
                  <p role="cell" className={`t-h4 ${out ? "text-grey-500" : ""}`}>
                    {r.action}
                  </p>
                </div>
              );
            })}
          </div>
          <p className="t-meta mt-4 text-grey-600">{keywords.caption}</p>
        </div>
      </Section>

      {/* Leistungsumfang als Datenblatt: Titel mittig, Begriffe in zwei Spalten */}
      <Section space="m" rule="ink" labelledBy="setup-title">
        {/* «gemessenen» passt auch mobil in eine Zeile, deshalb hier keine automatische Silbentrennung */}
        <SectionIntro meta={[setup.meta]} title={setup.title} id="setup-title" className="[&_h2]:hyphens-manual" />
        <dl className="border-t border-ink md:grid md:grid-cols-2 md:gap-x-[var(--gutter)]">
          {setup.rows.map((r) => (
            <div key={r.k} className="border-b border-line py-5">
              <dt className="t-h4">{r.k}</dt>
              <dd className="t-small mt-1.5 max-w-[56ch] text-grey-700">{r.v}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Paket-Hinweis: Titel mittig, der Preis schlicht in einer Zeile, darunter Datenblatt und Handlung */}
      <Section id="paket" space="m" rule="ink" labelledBy="paket-title">
        <SectionIntro
          meta={[pricing.meta]}
          title={
            <>
              <span className="sr-only">
                CHF {pricing.amount} {pricing.unit}.{" "}
              </span>
              {pricing.title}
            </>
          }
          id="paket-title"
        >
          {pricing.text}
        </SectionIntro>
        <div className="mx-auto max-w-[44rem]">
          <p aria-hidden className="flex items-baseline justify-center gap-2 border-t border-ink pt-6">
            <span className="t-meta text-grey-600">CHF</span>
            <span className="t-num">{pricing.amount}</span>
            <span className="t-small text-grey-600">{pricing.unit}</span>
          </p>
          <div className="mt-6">
            <FactsTable rows={pricing.facts} />
          </div>
          <div className="mt-8 flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-8">
            <ButtonLink href={pricing.packages.href} variant="ink" track="google-pakete">
              {pricing.packages.label}
            </ButtonLink>
            <ArrowLink href={pricing.calc.href}>{pricing.calc.label}</ArrowLink>
          </div>
        </div>
      </Section>

      <Section space="m" rule="ink" labelledBy="faq-title">
        <SectionIntro meta={[page.faq.meta]} title={page.faq.title} id="faq-title" />
        <Faq items={page.faq.items} />
      </Section>

      <Section space="s" rule="line">
        <RelatedLinks links={page.related} />
      </Section>

      <FinalCta title={page.finalCta.title} text={page.finalCta.text} secondary={page.finalCta.secondary} />
    </>
  );
}
