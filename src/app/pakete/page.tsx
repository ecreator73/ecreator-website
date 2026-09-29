import Link from "next/link";
import { PageHeader } from "@/components/page/PageHeader";
import { Section, SectionIntro, FactsTable, RelatedLinks, Todo } from "@/components/page/Blocks";
import { Faq } from "@/components/page/Faq";
import { PackagesSheet } from "@/components/blocks/PackagesSheet";
import { RateCard } from "@/components/blocks/RateCard";
import { FinalCta } from "@/components/blocks/FinalCta";
import { ButtonLink, ArrowLink, Arrow } from "@/components/ui/ButtonLink";
import { Meta } from "@/components/ui/Meta";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta } from "@/lib/metadata";
import { serviceSchema } from "@/lib/schema";
import { cta } from "@/content/site";
import { paketePage as p } from "@/content/pages/pakete";

export const metadata = pageMeta(p.meta);

export default function PaketePage() {
  const r = p.singles.recruiting;
  return (
    <>
      <JsonLd data={serviceSchema({ ...p.schema, path: p.meta.path })} />

      <PageHeader
        crumbs={p.crumbs}
        meta={p.header.meta}
        title={p.header.title}
        lead={p.header.lead}
        actions={
          <>
            <ButtonLink href={cta.primary.href} track="pakete-header">
              {cta.primary.label}
            </ButtonLink>
            <ArrowLink href={p.header.secondary.href}>{p.header.secondary.label}</ArrowLink>
          </>
        }
        aside={<FactsTable rows={p.header.facts} />}
      />

      {/* Preise: die zwei Pakete als einfache Karten nebeneinander */}
      <section aria-labelledby="preise-title">
        <div className="wrap sec-m">
          <h2 id="preise-title" className="sr-only">
            {p.poster.title}
          </h2>
          <div className="mx-auto grid max-w-[64rem] gap-[var(--gutter)] md:grid-cols-2">
            {p.poster.rows.map((row) => (
              <article
                key={row.id}
                aria-labelledby={`paket-${row.id}`}
                className="flex flex-col border border-line-strong bg-white p-6 md:p-8"
              >
                <h3 id={`paket-${row.id}`} className="t-brand">
                  {row.name}
                </h3>
                <p className="mt-4 flex items-baseline gap-2">
                  <span className="t-meta text-grey-600">CHF</span>
                  <span className="t-num">{row.amount}</span>
                </p>
                <p className="t-meta mt-2 text-grey-600">
                  {row.unit} <span className="text-grey-400">/</span> {row.term}
                </p>
                <p className="t-body mt-6 border-t border-line pt-5 text-grey-700">{row.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Vergleich als Datenblatt */}
      <Section id={p.compare.id} space="l" rule="line" labelledBy="vergleich-title">
        <SectionIntro id="vergleich-title" meta={p.compare.meta} title={p.compare.title}>
          {p.compare.text}
        </SectionIntro>
        <PackagesSheet />
      </Section>

      {/* Budget: zwei Posten nebeneinander, darunter was nicht im Paketpreis steckt */}
      <Section mode="band" space="l" rule="none" labelledBy="budget-title">
        <SectionIntro id="budget-title" meta={[p.budget.meta]} title={p.budget.title.join(" ")}>
          {p.budget.text}
        </SectionIntro>

        <div className="mx-auto grid max-w-[52rem] gap-[var(--gutter)] sm:grid-cols-2">
          <BudgetTerm label={p.budget.packageLabel} value={p.budget.packageValue} note={p.budget.packageNote} />
          <BudgetTerm label={p.budget.budgetLabel} value={p.budget.budgetValue} note={p.budget.budgetNote} />
        </div>

        <div className="mx-auto mt-12 max-w-[52rem] md:mt-14">
          <FactsTable caption={p.budget.notIncludedTitle} rows={p.budget.notIncluded} />
          <div className="mt-6">
            <ArrowLink href={p.budget.rechner.href}>{p.budget.rechner.label}</ArrowLink>
          </div>
        </div>
      </Section>

      {/* Einzelprodukte im Studio-Modus */}
      <section aria-labelledby="einzel-title" className="studio">
        <div className="wrap sec-l">
          <SectionIntro id="einzel-title" meta={p.singles.meta} title={p.singles.title}>
            {p.singles.text}
          </SectionIntro>
          <RateCard />
          <div className="mt-10 flex justify-center">
            <ButtonLink href={cta.contentDay.href} variant="paper" track="pakete-contentday">
              {cta.contentDay.label}
            </ButtonLink>
          </div>

          {/* Social Recruiting als eine Karte. DOM-Reihenfolge = Mobile-Reihenfolge: Titel und Preis, Bestandteile, Hinweise.
              Ab md: links Titel, Preis und Hinweise, rechts die Bestandteile. */}
          <article
            aria-labelledby="recruiting-title"
            className="mt-16 grid gap-x-[var(--gutter)] gap-y-8 border border-line-strong p-6 md:mt-20 md:grid-cols-12 md:p-10"
          >
            <div className="md:col-span-5 md:row-start-1">
              <p className="t-meta text-grey-400">{r.meta}</p>
              <h3 id="recruiting-title" className="t-h3 mt-4">
                {r.name}
              </h3>
              <p className="mt-4 flex items-baseline gap-2">
                <span className="t-meta text-grey-400">CHF</span>
                <span className="t-num">{r.amount}</span>
              </p>
              <p className="t-meta mt-2 text-grey-400">{r.note}</p>
            </div>
            <div className="md:col-span-6 md:col-start-7 md:row-span-2 md:row-start-1">
              <p className="t-meta text-grey-400">{r.includesLabel}</p>
              <ul className="t-small mt-3 grid grid-cols-1 gap-x-8 border-t border-line sm:grid-cols-2">
                {r.includes.map((it) => (
                  <li key={it} className="border-b border-line py-2.5 text-grey-300">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-5 md:row-start-2 md:self-start">
              <ul className="t-small space-y-2 border-t border-line pt-4 text-grey-300">
                {r.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col items-start gap-4">
                <ArrowLink href={r.href} className="text-paper">
                  {r.link}
                </ArrowLink>
                <ArrowLink href={cta.recruiting.href} className="text-paper">
                  {cta.recruiting.label}
                </ArrowLink>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Projekte ohne Festpreis: drei einfache Karten mit Anfrage */}
      <Section space="l" rule="none" labelledBy="projekte-title">
        <SectionIntro id="projekte-title" meta={p.projects.meta} title={p.projects.title}>
          {p.projects.text}
        </SectionIntro>
        <ul className="grid gap-[var(--gutter)] lg:grid-cols-3">
          {p.projects.items.map((it) => (
            <li key={it.href} className="flex flex-col border border-line-strong bg-white p-6 md:p-8">
              <h3 className="t-h3">
                {/* Pfeil im Textfluss: folgt dem letzten Wort, auch wenn der Titel umbricht */}
                <Link href={it.href} className="group">
                  <span className="transition-colors group-hover:text-grey-600">{it.name}</span>
                  <Arrow className="ml-2.5 inline-block h-3 w-5 align-baseline text-grey-500 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </h3>
              <p className="t-small mt-3 text-grey-700">{it.text}</p>
              {/* mt-auto + pt-6: Anfrage-Zeile in allen Karten auf gleicher Höhe */}
              <div className="mt-auto pt-6">
                <div className="flex flex-col items-start gap-2 border-t border-line pt-5">
                  <p className="t-meta text-grey-600">{p.projects.priceLabel}</p>
                  <ArrowLink href={it.cta.href}>{it.cta.label}</ArrowLink>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* Kundenstimme: ein Zitat, mittig */}
      <section aria-label="Kundenstimme" className="border-t border-line">
        <div className="wrap sec-l">
          <figure className="mx-auto max-w-[46rem] text-center">
            <Meta className="justify-center text-grey-600" items={p.voice.meta} />
            <blockquote className="mt-6">
              <p className="t-h3" data-reveal>
                «{p.voice.quote.text}»
              </p>
              <p className="t-lead mx-auto mt-5 max-w-[44ch] text-grey-700">«{p.voice.follow.text}»</p>
            </blockquote>
            <figcaption className="mt-8">
              <p className="t-h4">{p.voice.person}</p>
              <p className="t-small mt-1 text-grey-700">{p.voice.role}</p>
              <p className="t-meta mt-3 text-grey-600">Quelle: {p.voice.source}</p>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* FAQ: nur Belegtes, Offenes sichtbar markiert */}
      <Section id="fragen" space="l" rule="line" labelledBy="faq-title">
        <SectionIntro id="faq-title" meta={p.faq.meta} title={p.faq.title} />
        <div className="mx-auto max-w-[52rem]">
          <Faq items={p.faq.items} />
          <div className="mt-14">
            <h3 className="t-meta text-grey-600">{p.faq.openTitle}</h3>
            <ul className="mt-4 border-t border-line">
              {p.faq.open.map((o) => (
                <li key={o.q} className="border-b border-line py-5">
                  <p className="t-h4">{o.q}</p>
                  {"interim" in o && o.interim && <p className="t-small mt-1.5 text-grey-700">{o.interim}</p>}
                  <div className="mt-3">
                    <Todo>{o.todo}</Todo>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section space="s" rule="line">
        <div className="mx-auto max-w-[52rem]">
          <RelatedLinks links={p.related} />
        </div>
      </Section>

      <FinalCta title={p.finalCta.title} secondary={p.finalCta.secondary} />
    </>
  );
}

/** Ein Posten der Rechnung: Label, Betrag, kurze Notiz. */
function BudgetTerm({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="border border-line-strong bg-white p-6 md:p-8">
      <p className="t-meta text-grey-600">{label}</p>
      <p className="mt-3 flex items-baseline gap-2">
        <span className="t-meta text-grey-600">CHF</span>
        <span className="t-num">{value}</span>
      </p>
      <p className="t-small mt-3 text-grey-700">{note}</p>
    </div>
  );
}
