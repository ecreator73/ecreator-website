import Image from "next/image";
import { PageHeader } from "@/components/page/PageHeader";
import { Definition, FactsTable, RelatedLinks, Section, SectionIntro, Steps } from "@/components/page/Blocks";
import { Faq } from "@/components/page/Faq";
import { FinalCta } from "@/components/blocks/FinalCta";
import { ArrowLink, ButtonLink } from "@/components/ui/ButtonLink";
import { Meta } from "@/components/ui/Meta";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta } from "@/lib/metadata";
import { serviceSchema } from "@/lib/schema";
import { cta } from "@/content/site";
import { aiSearchPage as page } from "@/content/pages/ai-search";

export const metadata = pageMeta(page.meta);

const nn = (n: number) => String(n).padStart(2, "0");
const isPunct = (t: string) => /^[?!.,:;]$/.test(t);

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
        aside={<FactsTable rows={header.facts} />}
      />

      {/* Definition für Answer Engines: Antwort im ersten Satz */}
      <Section space="m" rule="none" labelledBy="definition-title">
        <h2 id="definition-title" className="sr-only">
          Was ist AEO?
        </h2>
        <Definition term={definition.term}>{definition.text}</Definition>
        <div className="grid-12 mt-6 gap-y-3">
          <div className="col-span-4 flex flex-col items-start gap-x-8 gap-y-2 md:col-span-9 md:col-start-4 lg:flex-row lg:items-center">
            <p className="t-meta text-grey-600">{definition.also}</p>
            <ArrowLink href={definition.link.href}>
              {definition.link.label}
            </ArrowLink>
          </div>
        </div>
      </Section>

      {/* Bausteine: mittiger Kopf, die Beispiel-Frage als ruhige Box, darunter die Bausteine im Raster */}
      <section id={question.id} aria-labelledby="bausteine-title" className="studio">
        <div className="wrap sec-l">
          <SectionIntro title={question.title} id="bausteine-title">
            {question.lead}
          </SectionIntro>

          <figure className="mx-auto max-w-[46rem] border border-line bg-ink-2 px-5 py-7 text-center md:px-10 md:py-9">
            <figcaption className="t-meta text-grey-400">{question.label}</figcaption>
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
                      <span className="underline decoration-grey-500 decoration-1 underline-offset-4">{p.t}</span>
                      {trailing}
                      <sup className="t-meta ml-0.5 align-super text-grey-400">
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

          <ol className="mt-12 border-t border-paper md:mt-16 md:grid md:grid-cols-2 md:gap-x-[var(--gutter)] lg:grid-cols-3">
            {question.blocks.map((b, i) => {
              const inQuestion = partsFor(i + 1);
              return (
                <li key={b.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 border-b border-line py-6 md:pr-4">
                  <span className="t-meta pt-1.5 text-grey-400">{nn(i + 1)}</span>
                  <div>
                    <h3 className="t-h4">{b.title}</h3>
                    <p className="t-meta mt-1.5 text-grey-400">{b.alias}</p>
                    <p className="t-small mt-3 text-grey-300">{b.text}</p>
                    {inQuestion.length > 0 && (
                      <p className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="t-meta text-grey-400">In der Frage</span>
                        <span className="t-small text-paper">{inQuestion.map((t) => `«${t}»`).join(", ")}</span>
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Unterschied zu SEO: Statement + Vergleich als Datenblatt */}
      <Section space="xl" rule="none" labelledBy="unterschied-title">
        <SectionIntro meta={difference.meta} title={difference.title} id="unterschied-title">
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

        <table className="w-full border-collapse border-t border-ink text-left">
          <caption className="sr-only">Vergleich von SEO und AEO</caption>
          <thead className="hidden md:table-header-group">
            <tr className="border-b border-line">
              <th scope="col" className="t-meta w-[22%] py-4 pr-6 align-bottom font-normal text-grey-600">
                {difference.head[0]}
              </th>
              <th scope="col" className="t-h3 w-[39%] py-4 pr-6 text-grey-500">
                {difference.head[1]}
              </th>
              <th scope="col" className="t-h3 py-4">
                {difference.head[2]}
              </th>
            </tr>
          </thead>
          <tbody>
            {difference.rows.map((r) => (
              <tr key={r[0]} className="block border-b border-line py-5 md:table-row md:py-0">
                <th scope="row" className="t-meta block pb-3 font-normal text-grey-600 md:table-cell md:py-6 md:pr-6 md:align-top">
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
                  className="t-body grid grid-cols-[3.25rem_minmax(0,1fr)] py-1 font-medium before:t-meta before:pt-[0.35em] before:font-normal before:text-grey-600 before:content-[attr(data-label)] md:table-cell md:py-6 md:align-top md:before:content-none"
                >
                  {r[2]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ArrowLink href={difference.link.href} className="mt-10">
          {difference.link.label}
        </ArrowLink>
      </Section>

      {/* Vorgehen */}
      <Section mode="band" space="m" rule="none" labelledBy="vorgehen-title">
        <SectionIntro meta={approach.meta} title={approach.title} id="vorgehen-title">
          {approach.lead}
        </SectionIntro>
        <Steps steps={approach.steps} />
      </Section>

      {/* Was wir nicht tun: Titel und Text links, die drei Punkte als schlichte Liste rechts */}
      <Section space="l" rule="none" labelledBy="nicht-title">
        <div className="grid-12 gap-y-10">
          <div className="col-span-4 md:col-span-6 lg:col-span-5">
            <h2 id="nicht-title" className="t-h2" data-reveal>
              {refusals.intro}
            </h2>
            <p className="t-lead mt-5 max-w-[52ch] text-grey-700">{refusals.text}</p>
          </div>
          <ul className="col-span-4 self-start border-t border-ink md:col-span-6 lg:col-span-6 lg:col-start-7">
            {refusals.items.map((d) => (
              <li key={d} className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-3 border-b border-line py-5">
                <span aria-hidden className="t-meta text-grey-600">
                  ✕
                </span>
                <span className="t-h4">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Beleg: echtes Webprojekt, als Beispiel für klare Angaben */}
      <Section space="l" rule="ink" labelledBy="beispiel-title">
        <div className="grid-12 items-start gap-y-12">
          <figure className="col-span-4 max-w-[12rem] md:col-span-4 md:max-w-none lg:col-span-3">
            <div className="relative aspect-[585/1266] overflow-hidden border border-line bg-paper-2">
              <Image
                src={proof.image.src}
                alt={proof.image.alt}
                fill
                sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 192px"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="t-meta mt-3 text-grey-700">{proof.caption}</figcaption>
          </figure>
          <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-5 xl:col-span-6 xl:col-start-5">
            <Meta className="text-grey-600" items={proof.meta} />
            <h2 id="beispiel-title" className="t-h2 mt-5">
              <span className="block">{proof.title[0]}</span> <span className="block">{proof.title[1]}</span>
            </h2>
            <p className="t-lead mt-6 text-grey-700">{proof.text}</p>
            <div className="mt-10">
              <FactsTable rows={proof.facts} />
            </div>
            <p className="t-small mt-5 text-grey-600">{proof.note}</p>
            <div className="mt-8 flex flex-col items-start gap-x-8 gap-y-3 sm:flex-row sm:items-center">
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

      <Section space="m" rule="ink" labelledBy="faq-title">
        <SectionIntro meta={faq.meta} title={faq.title} id="faq-title" />
        <Faq items={faq.items} />
      </Section>

      <Section space="s" rule="line">
        <RelatedLinks links={page.related} />
      </Section>

      <FinalCta title={page.finalCta.title} text={page.finalCta.text} secondary={page.finalCta.secondary} />
    </>
  );
}
