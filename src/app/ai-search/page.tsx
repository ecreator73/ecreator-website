import Image from "next/image";
import { PageHeader } from "@/components/page/PageHeader";
import { FactsTable, NumberChip, RelatedLinks, Section, SectionIntro, Steps } from "@/components/page/Blocks";
import { Faq } from "@/components/page/Faq";
import { FinalCta } from "@/components/blocks/FinalCta";
import { ArrowLink, ButtonLink } from "@/components/ui/ButtonLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta } from "@/lib/metadata";
import { serviceSchema } from "@/lib/schema";
import { withAccent } from "@/lib/accent";
import { cta } from "@/content/site";
import { aiSearchPage as page } from "@/content/pages/ai-search";

export const metadata = pageMeta(page.meta);

const nn = (n: number) => String(n).padStart(2, "0");
const isPunct = (t: string) => /^[?!.,:;]$/.test(t);

/** Datenblatt in einer Karte: ohne kräftige Linie oben und ohne Linie unter der letzten Zeile */
const factsInCard = "[&>dl]:border-t-0 [&>dl>div:last-child]:border-b-0";

export default function AiSearchPage() {
  const { header, definition, question, difference, approach, refusals, proof, faq } = page;
  /** Welche Teile der Beispiel-Frage deckt Baustein n ab? */
  const partsFor = (n: number) => question.parts.filter((p) => p.ref === n).map((p) => p.t);

  return (
    <>
      <JsonLd data={serviceSchema({ ...page.service, path: page.meta.path })} />

      <PageHeader
        crumbs={header.crumbs}
        meta={header.meta}
        title={header.title}
        lead={header.lead}
        actions={
          <>
            <ButtonLink href={cta.primary.href} track="ai-search-header">
              {cta.primary.label}
            </ButtonLink>
            <ArrowLink href={header.anchor.href}>{header.anchor.label}</ArrowLink>
          </>
        }
        aside={
          <div className={factsInCard}>
            <FactsTable rows={header.facts} />
          </div>
        }
      />

      {/* Definition für Answer Engines: Antwort im ersten Satz, als ruhige Karte */}
      <section aria-labelledby="definition-title">
        <div className="wrap pb-16 pt-2 md:pb-24">
          <h2 id="definition-title" className="sr-only">
            Was ist AEO?
          </h2>
          <div className="card mx-auto max-w-[56rem] p-6 md:p-10">
            <p className="label-pill">Definition</p>
            <p className="t-h3 mt-5 max-w-[40ch]">
              <dfn className="not-italic">{definition.term}</dfn>
            </p>
            <p className="t-lead mt-4 max-w-[62ch] text-grey-700">{definition.text}</p>
            <div className="mt-7 flex flex-col items-start gap-x-8 gap-y-2 border-t border-line pt-5 md:flex-row md:items-center md:justify-between">
              <p className="t-small text-grey-600">{definition.also}</p>
              <ArrowLink href={definition.link.href}>{definition.link.label}</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      {/* Bausteine: mittiger Kopf, die Beispiel-Frage als Karte, darunter die Bausteine als Karten-Raster */}
      <section id={question.id} aria-labelledby="bausteine-title" className="studio">
        <div className="wrap sec-l">
          <SectionIntro meta={question.meta} title={question.title} id="bausteine-title">
            {question.lead}
          </SectionIntro>

          <figure className="card mx-auto max-w-[46rem] px-5 py-7 text-center md:px-10 md:py-9">
            <figcaption className="t-small text-grey-400">{question.label}</figcaption>
            <blockquote className="mt-4">
              <p lang="de-CH" className="t-h3">
                <span aria-hidden className="text-grey-500">
                  «
                </span>
                {question.parts.map((p, i) => {
                  const prev = question.parts[i - 1];
                  const next = question.parts[i + 1];
                  /* Satzzeichen direkt nach einem markierten Teil steht vor der Fussnote */
                  const trailing = next && !next.ref && isPunct(next.t) ? next.t : "";
                  if (!p.ref) return prev?.ref && isPunct(p.t) ? null : <span key={i}>{p.t}</span>;
                  return (
                    <span key={i}>
                      <span className="underline decoration-violet-2 decoration-2 underline-offset-[6px]">{p.t}</span>
                      {trailing}
                      <sup className="t-meta ml-0.5 align-super text-violet-2">
                        <span className="sr-only"> (Baustein </span>
                        {nn(p.ref)}
                        <span className="sr-only">)</span>
                      </sup>
                    </span>
                  );
                })}
                <span aria-hidden className="text-grey-500">
                  »
                </span>
              </p>
            </blockquote>
          </figure>

          <ol className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {question.blocks.map((b, i) => {
              const inQuestion = partsFor(i + 1);
              return (
                <li key={b.title} className="card flex flex-col p-6 md:p-7">
                  <div className="flex items-start gap-4">
                    <span aria-hidden className="flex flex-none">
                      <NumberChip n={i + 1} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="t-h4">{b.title}</h3>
                      <p className="t-small mt-0.5 text-grey-400">{b.alias}</p>
                    </div>
                  </div>
                  <p className="t-small mt-4 text-grey-300">{b.text}</p>
                  {inQuestion.length > 0 && (
                    <div className="mt-auto pt-5">
                      <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-line pt-4">
                        <span className="t-meta text-grey-400">In der Frage</span>
                        <span className="t-small text-paper">{inQuestion.map((t) => `«${t}»`).join(", ")}</span>
                      </p>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Unterschied zu SEO: Statement + Vergleich als Tabelle in einer Karte */}
      <Section space="l" rule="none" labelledBy="unterschied-title">
        <SectionIntro meta={difference.meta} title={withAccent(difference.title, "AEO")} id="unterschied-title">
          {difference.lead}
          <a
            href={difference.source.href}
            target="_blank"
            rel="noopener noreferrer"
            className="t-small mt-4 flex min-h-11 items-center justify-center text-grey-700"
          >
            <span>
              Quelle: <span className="link">{difference.source.label}</span>
            </span>
            <span className="sr-only"> (öffnet in neuem Tab)</span>
          </a>
        </SectionIntro>

        <div className="card mx-auto max-w-[68rem] px-5 py-2 md:px-8 md:py-3">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Vergleich von SEO und AEO</caption>
            <thead className="hidden md:table-header-group">
              <tr className="border-b border-line">
                <th scope="col" className="t-meta w-[22%] py-5 pr-6 align-bottom font-normal text-grey-600">
                  {difference.head[0]}
                </th>
                <th scope="col" className="t-h3 w-[39%] py-5 pr-6 text-grey-500">
                  {difference.head[1]}
                </th>
                <th scope="col" className="t-h3 py-5 text-violet-deep">
                  {difference.head[2]}
                </th>
              </tr>
            </thead>
            <tbody>
              {difference.rows.map((r) => (
                <tr key={r[0]} className="block border-b border-line py-5 last:border-b-0 md:table-row md:py-0">
                  <th
                    scope="row"
                    className="t-meta block pb-3 font-normal text-grey-600 md:table-cell md:py-6 md:pr-6 md:align-top"
                  >
                    {r[0]}
                  </th>
                  <td
                    data-label={difference.head[1]}
                    className="t-small grid grid-cols-[3.25rem_minmax(0,1fr)] py-1 text-grey-700 before:t-meta before:pt-[0.3em] before:text-grey-600 before:content-[attr(data-label)] md:table-cell md:py-6 md:pr-6 md:align-top md:before:content-none"
                  >
                    {r[1]}
                  </td>
                  <td
                    data-label={difference.head[2]}
                    className="t-body grid grid-cols-[3.25rem_minmax(0,1fr)] py-1 font-medium before:t-meta before:pt-[0.35em] before:font-normal before:text-violet-deep before:content-[attr(data-label)] md:table-cell md:py-6 md:align-top md:before:content-none"
                  >
                    {r[2]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 text-center">
          <ArrowLink href={difference.link.href}>{difference.link.label}</ArrowLink>
        </div>
      </Section>

      {/* Vorgehen */}
      <Section mode="band" space="l" rule="none" labelledBy="vorgehen-title">
        <SectionIntro meta={approach.meta} title={withAccent(approach.title, "konkret")} id="vorgehen-title">
          {approach.lead}
        </SectionIntro>
        <Steps steps={approach.steps} />
      </Section>

      {/* Was wir nicht tun: Titel und Text links, die drei Punkte als Karte rechts */}
      <Section space="l" rule="none" labelledBy="nicht-title">
        <div className="grid-12 items-center gap-y-10">
          <div className="col-span-4 md:col-span-6 lg:col-span-5">
            <p className="label-pill">{refusals.meta.join(" · ")}</p>
            <h2 id="nicht-title" className="t-h2 mt-5" data-reveal>
              {refusals.intro}
            </h2>
            <p className="t-lead mt-5 max-w-[52ch] text-grey-700">{refusals.text}</p>
          </div>
          <ul className="card col-span-4 px-5 py-2 md:col-span-6 md:px-7 lg:col-span-6 lg:col-start-7">
            {refusals.items.map((d) => (
              <li key={d} className="flex items-center gap-4 border-b border-line py-5 last:border-b-0">
                <span
                  aria-hidden
                  className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-paper-2 text-[0.8125rem] font-semibold text-grey-600"
                >
                  ✕
                </span>
                <span className="t-h4">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Beleg: echtes Webprojekt, als Beispiel für klare Angaben */}
      <Section mode="band" space="l" rule="none" labelledBy="beispiel-title">
        <div className="grid-12 items-center gap-y-12">
          <figure className="col-span-4 max-w-[13rem] md:col-span-4 md:max-w-none lg:col-span-3 lg:col-start-2">
            <div className="relative aspect-[585/1266] overflow-hidden rounded-[var(--radius-media)] border border-line bg-paper-2 shadow-[var(--shadow-card)]">
              <Image
                src={proof.image.src}
                alt={proof.image.alt}
                fill
                sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 208px"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="t-meta mt-3 text-grey-600">{proof.caption}</figcaption>
          </figure>
          <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
            <p className="label-pill">{proof.meta.join(" · ")}</p>
            <h2 id="beispiel-title" className="t-h2 mt-5">
              <span className="block">{proof.title[0]}</span> <span className="block">{proof.title[1]}</span>
            </h2>
            <p className="t-lead mt-5 text-grey-700">{proof.text}</p>
            <div className={`card mt-8 px-5 py-1.5 md:px-6 ${factsInCard}`}>
              <FactsTable rows={proof.facts} />
            </div>
            <p className="t-small mt-4 text-grey-600">{proof.note}</p>
            <div className="mt-7 flex flex-col items-start gap-x-8 gap-y-3 sm:flex-row sm:items-center">
              <ArrowLink href={proof.caseLink.href}>{proof.caseLink.label}</ArrowLink>
              <a
                href={proof.siteLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="t-small inline-flex min-h-11 items-center text-grey-700"
              >
                <span className="link">{proof.siteLink.label}</span>
                <span className="sr-only"> (öffnet in neuem Tab)</span>
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* Fragen: Liste in einer Karte */}
      <Section space="l" rule="none" labelledBy="faq-title">
        <SectionIntro meta={faq.meta} title={faq.title} id="faq-title" />
        <div className="mx-auto max-w-[52rem]">
          <Faq items={faq.items} />
        </div>
      </Section>

      {/* Weiterlesen als Karte (geteilter Baustein) */}
      <Section space="m" rule="none" className="-mt-6 md:-mt-10">
        <div className="mx-auto max-w-[52rem]">
          <RelatedLinks links={page.related} />
        </div>
      </Section>

      <FinalCta title={page.finalCta.title} text={page.finalCta.text} secondary={page.finalCta.secondary} />
    </>
  );
}
