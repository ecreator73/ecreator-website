import Image from "next/image";
import { PageHeader } from "@/components/page/PageHeader";
import { FactsTable, NumberChip, RelatedLinks, Section, SectionIntro } from "@/components/page/Blocks";
import { Faq } from "@/components/page/Faq";
import { FinalCta } from "@/components/blocks/FinalCta";
import { Arrow, ArrowLink, ButtonLink } from "@/components/ui/ButtonLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { withAccent } from "@/lib/accent";
import { pageMeta } from "@/lib/metadata";
import { serviceSchema } from "@/lib/schema";
import { cta } from "@/content/site";
import { googleAdsPage as page } from "@/content/pages/google-ads";

export const metadata = pageMeta(page.meta);

/** Datenblatt in einer Karte: erste und letzte Zeile ohne zusätzlichen Innenabstand */
const factsInCard = "[&_dl>div:first-child]:pt-0 [&_dl>div:last-child]:pb-0";

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

      {/* Die Kette bis zur Anfrage: Titel mittig, die Beispiel-Suche als Suchfeld, dann vier Glieder als Karten */}
      <Section mode="band" space="m" rule="none" labelledBy="kette-title">
        <SectionIntro meta={[chain.meta]} title={chain.title} id="kette-title">
          {chain.lead}
        </SectionIntro>
        <figure className="mx-auto mb-10 max-w-[34rem] text-center md:mb-14">
          <figcaption className="t-meta text-grey-600">{chain.label}</figcaption>
          <blockquote className="mt-4">
            <p className="card flex items-center gap-3 rounded-full px-5 py-3.5 text-left md:px-6 md:py-4">
              <svg aria-hidden viewBox="0 0 20 20" className="h-5 w-5 flex-none text-grey-500">
                <circle cx="8.5" cy="8.5" r="6" fill="none" stroke="currentColor" strokeWidth="1.7" />
                <path d="M13 13l5 5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
              <span className="t-h4">{chain.query}</span>
            </p>
          </blockquote>
        </figure>
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {chain.steps.map((s, i) => (
            <li key={s.title} className="card flex flex-col p-6">
              <div className="flex items-center justify-between">
                <span aria-hidden className="flex flex-none">
                  <NumberChip n={i + 1} />
                </span>
                {i < chain.steps.length - 1 && <Arrow className="hidden h-3 w-5 text-grey-400 lg:block" />}
              </div>
              <h3 className="t-h4 mt-5">{s.title}</h3>
              <p className="t-small mt-2 max-w-[44ch] text-grey-700">{s.text}</p>
              <div className="mt-auto pt-5">
                <span className="t-small inline-flex rounded-full bg-paper-2 px-3 py-1 font-medium text-grey-700">
                  {s.meta}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Das Glied «Landingpage» als echtes Beispiel: Titel mittig, der Screenshot im Browserfenster, darunter Hinweis und Links */}
      <Section space="m" rule="none" labelledBy="ziel-title">
        <SectionIntro meta={[landing.meta]} title={landing.title} id="ziel-title">
          {landing.text}
        </SectionIntro>
        <figure className="mx-auto max-w-[60rem]">
          <div className="card overflow-hidden">
            <div aria-hidden className="flex items-center gap-3 border-b border-line bg-paper-2 px-4 py-3">
              <span className="flex flex-none gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-grey-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-grey-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-grey-300" />
              </span>
              <span className="t-small mx-auto min-w-0 truncate rounded-full bg-paper px-4 py-0.5 text-grey-600">
                {landing.caption[1]}
              </span>
              <span className="w-[2.625rem] flex-none" />
            </div>
            <div className="relative aspect-[16/10] bg-paper" data-reveal="cut">
              <Image
                src={landing.image.desktop}
                alt={landing.image.alt}
                fill
                sizes="(min-width: 1024px) 60rem, 92vw"
                className="object-cover object-top"
              />
            </div>
          </div>
          <figcaption className="t-meta mt-4 text-center text-grey-700">
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

      {/* Suchbegriffe nach Absicht: Tabelle in einer Karte, ausgeschlossene Begriffe sind durchgestrichen */}
      <Section mode="band" space="m" rule="none" labelledBy="keywords-title">
        <SectionIntro
          meta={[keywords.meta]}
          title={withAccent(keywords.title, keywords.accent)}
          id="keywords-title"
        >
          {keywords.lead}
        </SectionIntro>
        <div role="table" aria-label={`${keywords.meta}: ${keywords.caption}`} className="card p-6 md:px-8 md:py-4">
          <div role="rowgroup">
            <div
              role="row"
              className="hidden border-b border-line py-4 md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,4fr)_minmax(0,3fr)] md:gap-x-[var(--gutter)]"
            >
              {keywords.columns.map((c) => (
                <span key={c} role="columnheader" className="t-meta text-grey-600">
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div role="rowgroup">
            {keywords.rows.map((r) => {
              const out = "excluded" in r && r.excluded;
              return (
                <div
                  key={r.query}
                  role="row"
                  className="grid gap-y-2 border-b border-line py-5 first:pt-0 last:border-b-0 last:pb-0 md:grid-cols-[minmax(0,5fr)_minmax(0,4fr)_minmax(0,3fr)] md:items-center md:gap-x-[var(--gutter)] md:first:pt-5 md:last:pb-5"
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
                  <p role="cell">
                    <span
                      className={`t-small inline-flex rounded-full px-3 py-1 font-semibold ${
                        out ? "bg-paper-2 text-grey-600" : "bg-[rgb(120_102_244/0.09)] text-violet-deep"
                      }`}
                    >
                      {r.action}
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <p className="t-meta mt-4 text-grey-600">{keywords.caption}</p>
      </Section>

      {/* Leistungsumfang als Häkchen-Liste in zwei Spalten, in einer Karte */}
      <Section space="m" rule="none" labelledBy="setup-title">
        {/* «gemessenen» passt auch mobil in eine Zeile, deshalb hier keine automatische Silbentrennung */}
        <SectionIntro meta={[setup.meta]} title={setup.title} id="setup-title" className="[&_h2]:hyphens-manual" />
        <ul className="card check-list mx-auto grid max-w-[64rem] gap-x-12 gap-y-7 p-6 md:grid-cols-2 md:p-10">
          {setup.rows.map((r) => (
            <li key={r.k}>
              <h3 className="t-h4">{r.k}</h3>
              <p className="t-small mt-1.5 max-w-[56ch] text-grey-700">{r.v}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Paket-Hinweis: Titel mittig, darunter eine Preiskarte mit Datenblatt und Handlung */}
      <Section id="paket" mode="band" space="m" rule="none" labelledBy="paket-title">
        <SectionIntro
          meta={[pricing.meta]}
          title={
            <>
              <span className="sr-only">
                CHF {pricing.amount} {pricing.unit}.{" "}
              </span>
              {withAccent(pricing.title, pricing.accent)}
            </>
          }
          id="paket-title"
        >
          {pricing.text}
        </SectionIntro>
        <div className="card mx-auto max-w-[44rem] p-5 md:p-10">
          <p aria-hidden className="flex items-baseline justify-center gap-2">
            <span className="t-meta text-grey-600">CHF</span>
            <span className="t-num">{pricing.amount}</span>
            <span className="t-small text-grey-600">{pricing.unit}</span>
          </p>
          <div className={`mt-6 border-t border-line pt-6 ${factsInCard}`}>
            <FactsTable rows={pricing.facts} />
          </div>
          <div className="mt-8 flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-8">
            <ButtonLink href={pricing.packages.href} variant="line" track="google-pakete">
              {pricing.packages.label}
            </ButtonLink>
            <ArrowLink href={pricing.calc.href}>{pricing.calc.label}</ArrowLink>
          </div>
        </div>
      </Section>

      <Section space="m" rule="none" labelledBy="faq-title">
        <SectionIntro meta={[page.faq.meta]} title={page.faq.title} id="faq-title" />
        <div className="mx-auto max-w-[56rem]">
          <Faq items={page.faq.items} />
        </div>
      </Section>

      {/* Verwandte Seiten als Karten (geteilter Baustein) */}
      <Section space="m" rule="none" className="[&>div]:pt-0">
        <RelatedLinks layout="grid" links={page.related} />
      </Section>

      <FinalCta title={page.finalCta.title} text={page.finalCta.text} secondary={page.finalCta.secondary} />
    </>
  );
}
