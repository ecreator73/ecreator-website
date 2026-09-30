import Image from "next/image";
import { PageHeader } from "@/components/page/PageHeader";
import { FactsTable, RelatedLinks, Section, SectionIntro, Steps } from "@/components/page/Blocks";
import { Faq } from "@/components/page/Faq";
import { FinalCta } from "@/components/blocks/FinalCta";
import { Arrow, ArrowLink, ButtonLink } from "@/components/ui/ButtonLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { withAccent } from "@/lib/accent";
import { pageMeta } from "@/lib/metadata";
import { serviceSchema } from "@/lib/schema";
import { cta } from "@/content/site";
import { webProjects } from "@/content/work";
import { webdesignPage as page } from "@/content/pages/webdesign";

export const metadata = pageMeta(page.meta);

type WebProject = (typeof webProjects)[number];
type ProjectCopy = (typeof page.projects.items)[number];

const host = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

/** Fensterleiste über Screenshots: drei Punkte und die Adresse, rein dekorativ (Adresse steht in der Bildunterschrift). */
function BrowserBar({ address }: { address?: string }) {
  return (
    <div aria-hidden className="flex h-9 items-center gap-3 border-b border-line bg-paper-2 px-3.5 md:h-10">
      <span className="flex w-[2.625rem] flex-none gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-grey-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-grey-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-grey-300" />
      </span>
      {address && (
        <span className="mx-auto min-w-0 truncate rounded-full bg-white px-3 py-0.5 text-[0.75rem] text-grey-600">{address}</span>
      )}
      <span className="w-[2.625rem] flex-none" />
    </div>
  );
}

/**
 * Die ganze Seite im Format-Rahmen: in Ruhe der Kopf der Website, bei Hover oder Fokus
 * läuft der Screenshot einmal durch (object-position). Bei reduced-motion bleibt er stehen.
 * Antippen setzt den Fokus, damit es auch auf Touch-Geräten funktioniert.
 */
function FullPageShot({ p, priority }: { p: WebProject; priority?: boolean }) {
  return (
    <div
      tabIndex={0}
      role="img"
      aria-label={`Ganze Startseite von ${host(p.url)} (Website für ${p.client}), als Screenshot`}
      className="group relative aspect-[16/10] overflow-hidden bg-white focus-visible:outline-offset-[-3px]"
    >
      <Image
        src={p.desktopFull}
        alt=""
        fill
        priority={priority}
        sizes="(min-width: 1024px) 64vw, (min-width: 768px) 70vw, 100vw"
        className="object-cover object-top transition-[object-position] duration-[1.4s] ease-[cubic-bezier(.45,0,.2,1)] motion-safe:group-hover:object-bottom motion-safe:group-hover:duration-[14s] motion-safe:group-focus:object-bottom motion-safe:group-focus:duration-[14s]"
      />
    </div>
  );
}

/** Handy-Screenshot im dunklen Geräterahmen */
function MobileShot({ p }: { p: WebProject }) {
  return (
    <div className="rounded-[26px] bg-ink p-[5px] shadow-card">
      <div className="relative aspect-[585/1266] overflow-hidden rounded-[21px] bg-white">
        <Image
          src={p.mobile}
          alt={`Startseite von ${host(p.url)} auf dem Handy`}
          fill
          sizes="(min-width: 768px) 22vw, 45vw"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

/** Ein Webprojekt als Karte: Desktop (ganze Seite) im Browserfenster und Handy nebeneinander, darunter Kurzbeschrieb, Punkte und Links. */
function Project({ p, copy, priority }: { p: WebProject; copy: ProjectCopy; priority?: boolean }) {
  const L = page.projects.labels;
  return (
    <article aria-labelledby={`p-${p.id}`} className="card p-5 sm:p-6 md:p-8 lg:p-10">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h3 id={`p-${p.id}`} className="t-h3">
          {p.client}
        </h3>
        <ul className="flex flex-wrap gap-2">
          {[p.kind, p.place].map((tag) => (
            <li key={tag} className="rounded-full bg-paper-2 px-3 py-1 text-[0.8125rem] font-medium text-grey-600">
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid-12 mt-6 items-end gap-y-6 md:mt-8">
        <figure className="col-span-4 md:col-span-9">
          <div className="overflow-hidden rounded-[var(--radius-media)] border border-line bg-white">
            <BrowserBar address={host(p.url)} />
            <FullPageShot p={p} priority={priority} />
          </div>
          <figcaption className="t-meta mt-3 text-grey-600">
            {host(p.url)} <span className="text-grey-400">/</span> {L.desktop}
          </figcaption>
        </figure>

        <figure className="col-span-2 md:col-span-3">
          <MobileShot p={p} />
          <figcaption className="t-meta mt-3 text-grey-600">{L.mobile}</figcaption>
        </figure>

        {/* Auf dem Handy: Text neben dem Handy-Screenshot */}
        <div className="col-span-2 self-center md:hidden">
          <ProjectPoints copy={copy} />
        </div>
      </div>

      <div className="grid-12 mt-8 gap-y-6 border-t border-line pt-8">
        <p className="t-lead col-span-4 text-grey-700 md:col-span-6">{p.summary}</p>
        <div className="hidden md:col-span-3 md:block">
          <ProjectPoints copy={copy} />
        </div>
        <div className="col-span-4 flex flex-col items-start gap-1 md:col-span-3 md:items-end">
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group -my-2.5 inline-flex min-h-11 items-center gap-2 whitespace-nowrap py-2.5 font-semibold"
          >
            <span className="link">{L.visit}</span>
            <Arrow className="-rotate-45 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span className="sr-only"> {host(p.url)} (öffnet in neuem Tab)</span>
          </a>
          <ArrowLink href={copy.caseHref}>{L.case}</ArrowLink>
        </div>
      </div>

      <p className="t-small mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-[14px] bg-paper-2 px-4 py-3 text-grey-600">
        <span className="t-meta">{L.evidence}</span>
        <span>{p.evidence}</span>
      </p>
    </article>
  );
}

function ProjectPoints({ copy }: { copy: ProjectCopy }) {
  return (
    <ul className="check-list space-y-2.5">
      {copy.points.map((pt) => (
        <li key={pt} className="t-small">
          {pt}
        </li>
      ))}
    </ul>
  );
}

export default function WebdesignPage() {
  const projects = page.projects.items.map((copy) => ({
    copy,
    p: webProjects.find((w) => w.id === copy.id)!,
  }));

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
            <ButtonLink href={cta.primary.href} track="webdesign-header">
              {cta.primary.label}
            </ButtonLink>
            <ArrowLink href={page.header.secondaryLink.href}>{page.header.secondaryLink.label}</ArrowLink>
          </>
        }
        aside={<FactsTable caption={page.header.factsCaption} rows={[...page.header.facts]} />}
      />

      {/* Beweis zuerst: zwei belegte Websites als Karten, Desktop und Handy nebeneinander */}
      <section id="projekte" aria-labelledby="projekte-title" className="bg-paper-2">
        <div className="wrap sec-l">
          <SectionIntro
            meta={[page.projects.meta]}
            title={withAccent(page.projects.title, page.projects.accent)}
            id="projekte-title"
          >
            <p>{page.projects.intro}</p>
            <p className="mt-5">
              <span className="t-small inline-flex rounded-[14px] border border-line bg-white px-3.5 py-1.5 text-grey-600 sm:rounded-full">
                {page.projects.hint}
              </span>
            </p>
          </SectionIntro>

          <div className="flex flex-col gap-6 md:gap-8">
            {projects.map(({ p, copy }, i) => (
              <Project key={p.id} p={p} copy={copy} priority={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* Haltung als Satz, dann die Begriffe als zwei Karten */}
      <Section space="l" rule="none" labelledBy="cro-title">
        <SectionIntro meta={[page.cro.meta]} title={page.cro.statement[0]} id="cro-title">
          {page.cro.statement[1]}
        </SectionIntro>
        <div className="mx-auto grid max-w-[64rem] gap-4 md:grid-cols-2 md:gap-5">
          <div className="card p-6 md:p-8">
            <p className="label-pill">Definition</p>
            <p className="t-h3 mt-5">
              <dfn className="not-italic">{page.cro.term}</dfn>
            </p>
            <p className="t-body mt-3 text-grey-700">{page.cro.definition}</p>
          </div>
          <div className="card p-6 md:p-8">
            <h3 className="t-h3">{page.cro.uxTitle}</h3>
            <p className="t-body mt-3 text-grey-700">{page.cro.ux}</p>
          </div>
        </div>
      </Section>

      {/* Bauplan: links die Seite als Schema, rechts was in jeden Abschnitt gehört */}
      <Section mode="band" space="l" rule="none" labelledBy="bauplan-title">
        <SectionIntro meta={[page.anatomy.meta]} title={page.anatomy.title} id="bauplan-title">
          {page.anatomy.intro}
        </SectionIntro>

        <ol className="card mx-auto max-w-[60rem] p-4 sm:p-6 md:p-10">
          {page.anatomy.blocks.map((b, i) => {
            const first = i === 0;
            const last = i === page.anatomy.blocks.length - 1;
            const ask = b.id === "anfrage";
            const measure = b.id === "messung";
            return (
              <li key={b.id} className="grid grid-cols-[5.5rem_1fr] md:grid-cols-[9rem_1fr]">
                {/* Schema-Spalte: die Abschnitte ergeben zusammen eine Seite */}
                <div
                  aria-hidden
                  className={`border-x border-t ${first ? "rounded-t-[14px]" : ""} ${last ? "rounded-b-[14px] border-b" : ""} ${
                    ask ? "border-ink bg-ink text-paper" : measure ? "hatch border-dashed border-line-strong" : "border-line-strong bg-paper-2"
                  } ${b.id === "kopf" ? "min-h-36 md:min-h-40" : b.id === "angebot" ? "min-h-28 md:min-h-32" : "min-h-24"}`}
                >
                  <span className="t-meta block p-2 md:p-3">{b.label}</span>
                </div>
                {/* Die Linie jeder Zeile setzt direkt am Schema an: Abschnitt und Erklärung gehören zusammen */}
                <div className={`py-5 pl-5 md:grid md:grid-cols-2 md:gap-x-8 md:py-6 md:pl-8 ${first ? "" : "border-t border-line"}`}>
                  <h3 className="t-h4">{b.title}</h3>
                  <p className="t-small mt-1.5 text-grey-700 md:mt-0.5">{b.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </Section>

      {/* Technik: die Systeme als Karten */}
      <Section space="l" rule="none" labelledBy="stack-title">
        <SectionIntro
          meta={[page.stack.meta]}
          id="stack-title"
          title={
            <>
              <span className="block">{page.stack.title[0]}</span>{" "}
              <span className="block text-grey-500">{page.stack.title[1]}</span>
            </>
          }
        >
          {page.stack.intro}
        </SectionIntro>
        <dl className="grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {page.stack.items.map((s) => (
            <div key={s.title} className="card p-6 md:p-8">
              <dt className="t-h3">{s.title}</dt>
              <dd className="t-small mt-3 text-grey-700">{s.text}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Integrationen: links die Einordnung, rechts das Datenblatt als Karte */}
      <Section mode="band" space="l" rule="none" labelledBy="integrationen-title">
        <div className="grid-12 gap-y-10">
          <div className="col-span-4 md:col-span-5 lg:col-span-4">
            <div className="md:sticky md:top-[calc(var(--header-h)+2rem)]">
              <p className="label-pill">{page.integrations.meta}</p>
              <h2 id="integrationen-title" className="t-h2 mt-5" data-reveal>
                {page.integrations.title}
              </h2>
              <p className="t-lead mt-5 max-w-[36ch] text-grey-700">{page.integrations.intro}</p>
              <div className="mt-6">
                <ArrowLink href={page.integrations.crmLink.href}>{page.integrations.crmLink.label}</ArrowLink>
              </div>
            </div>
          </div>
          <div className="col-span-4 md:col-span-7 lg:col-start-6">
            <dl className="card px-6 py-2 md:px-8 md:py-3">
              {page.integrations.rows.map((r, i) => (
                <div
                  key={r.k}
                  className={`grid gap-1.5 py-5 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6 ${i > 0 ? "border-t border-line" : ""}`}
                >
                  <dt className="t-h4">{r.k}</dt>
                  <dd className="t-body text-grey-700">{r.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* Ablauf: vier Schritte als Karten (gemeinsamer Baustein, runde Nummer) */}
      <Section space="l" rule="none" labelledBy="ablauf-title">
        <SectionIntro meta={[page.steps.meta]} title={page.steps.title} id="ablauf-title" />
        <Steps steps={[...page.steps.items]} />
        <div className="mx-auto mt-10 flex max-w-[46rem] flex-col items-center gap-5 text-center md:mt-12">
          <p className="t-body text-grey-700">{page.steps.packages.text}</p>
          <ButtonLink href={page.steps.packages.link.href} variant="line">
            {page.steps.packages.link.label}
          </ButtonLink>
        </div>
      </Section>

      {/* FAQ in einer Karte */}
      <Section mode="band" space="l" rule="none" labelledBy="faq-title">
        <SectionIntro meta={[page.faq.meta]} title={page.faq.title} id="faq-title">
          {page.faq.intro}
        </SectionIntro>
        <div className="mx-auto max-w-[56rem]">
          <Faq items={[...page.faq.items]} />
        </div>
      </Section>

      {/* Weiterlesen als Kartenraster (geteilter Baustein) */}
      <Section space="m" rule="none">
        <RelatedLinks layout="grid" links={page.related} />
      </Section>

      <FinalCta title={page.finalCta.title} secondary={cta.website} />
    </>
  );
}
