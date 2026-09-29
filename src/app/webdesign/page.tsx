import Image from "next/image";
import { PageHeader } from "@/components/page/PageHeader";
import { Definition, FactsTable, RelatedLinks, Section, SectionIntro, Steps } from "@/components/page/Blocks";
import { Faq } from "@/components/page/Faq";
import { FinalCta } from "@/components/blocks/FinalCta";
import { Arrow, ArrowLink, ButtonLink } from "@/components/ui/ButtonLink";
import { Meta } from "@/components/ui/Meta";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta } from "@/lib/metadata";
import { serviceSchema } from "@/lib/schema";
import { cta } from "@/content/site";
import { webProjects } from "@/content/work";
import { webdesignPage as page } from "@/content/pages/webdesign";

export const metadata = pageMeta(page.meta);

type WebProject = (typeof webProjects)[number];
type ProjectCopy = (typeof page.projects.items)[number];

const host = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

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
      className="group relative aspect-[16/10] overflow-hidden border border-line bg-white"
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

function MobileShot({ p }: { p: WebProject }) {
  return (
    <div className="relative aspect-[585/1266] overflow-hidden border border-line bg-white">
      <Image
        src={p.mobile}
        alt={`Startseite von ${host(p.url)} auf dem Handy`}
        fill
        sizes="(min-width: 768px) 22vw, 45vw"
        className="object-cover object-top"
      />
    </div>
  );
}

/** Ein Webprojekt: Desktop (ganze Seite) und Handy nebeneinander, darunter Kurzbeschrieb, Punkte und Links. */
function Project({ p, copy, priority }: { p: WebProject; copy: ProjectCopy; priority?: boolean }) {
  const L = page.projects.labels;
  return (
    <article aria-labelledby={`p-${p.id}`} className="border-t border-ink pt-6 md:pt-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
        <h3 id={`p-${p.id}`} className="t-h3">
          {p.client}
        </h3>
        <Meta className="text-grey-600" items={[p.kind, p.place]} />
      </div>

      <div className="grid-12 mt-6 items-end gap-y-6 md:mt-8">
        <figure className="col-span-4 md:col-span-9">
          <FullPageShot p={p} priority={priority} />
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

      <div className="grid-12 mt-8 gap-y-6">
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

      <p className="t-meta mt-8 border-t border-line pt-3 text-grey-600">
        {L.evidence} <span className="text-grey-400">/</span> {p.evidence}
      </p>
    </article>
  );
}

function ProjectPoints({ copy }: { copy: ProjectCopy }) {
  return (
    <ul className="border-t border-ink">
      {copy.points.map((pt) => (
        <li key={pt} className="t-small border-b border-line py-2.5">
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
        title={[...page.header.title]}
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

      {/* Beweis zuerst: zwei belegte Websites, Desktop und Handy nebeneinander */}
      <section id="projekte" aria-labelledby="projekte-title">
        <div className="wrap sec-l">
          <SectionIntro meta={[page.projects.meta]} title={page.projects.title} id="projekte-title">
            <p>{page.projects.intro}</p>
            <p className="t-meta mt-5 text-grey-600">{page.projects.hint}</p>
          </SectionIntro>

          <div className="flex flex-col gap-20 md:gap-28">
            {projects.map(({ p, copy }, i) => (
              <Project key={p.id} p={p} copy={copy} priority={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* Haltung als Satz, dann die Begriffe */}
      <Section space="l" rule="line" labelledBy="cro-title">
        <SectionIntro title={page.cro.statement[0]} id="cro-title">
          {page.cro.statement[1]}
        </SectionIntro>
        <div className="mx-auto max-w-[60rem]">
          <Definition term={page.cro.term}>{page.cro.definition}</Definition>
          <div className="grid-12 gap-y-4 border-b border-line py-8 md:py-10">
            <h3 className="t-meta col-span-4 text-grey-600 md:col-span-3">{page.cro.uxTitle}</h3>
            <p className="t-lead col-span-4 text-grey-700 md:col-span-9">{page.cro.ux}</p>
          </div>
        </div>
      </Section>

      {/* Bauplan: links die Seite als Schema, rechts was in jeden Abschnitt gehört */}
      <Section mode="band" space="l" rule="none" labelledBy="bauplan-title">
        <SectionIntro meta={[page.anatomy.meta]} title={page.anatomy.title} id="bauplan-title">
          {page.anatomy.intro}
        </SectionIntro>

        <ol className="mx-auto max-w-[60rem]">
          {page.anatomy.blocks.map((b, i) => {
            const last = i === page.anatomy.blocks.length - 1;
            const ask = b.id === "anfrage";
            const measure = b.id === "messung";
            return (
              <li key={b.id} className="grid grid-cols-[5.5rem_1fr] md:grid-cols-[9rem_1fr]">
                {/* Schema-Spalte: die Abschnitte ergeben zusammen eine Seite */}
                <div
                  aria-hidden
                  className={`border-x border-t border-ink ${last ? "border-b" : ""} ${
                    ask ? "bg-ink text-paper" : measure ? "hatch border-dashed" : "bg-paper"
                  } ${b.id === "kopf" ? "min-h-36 md:min-h-40" : b.id === "angebot" ? "min-h-28 md:min-h-32" : "min-h-24"}`}
                >
                  <span className="t-meta block p-2 md:p-3">{b.label}</span>
                </div>
                {/* Die Linie jeder Zeile setzt direkt am Schema an: Abschnitt und Erklärung gehören zusammen */}
                <div
                  className={`border-t border-line py-5 pl-5 md:grid md:grid-cols-2 md:gap-x-8 md:py-6 md:pl-8 ${last ? "border-b" : ""}`}
                >
                  <h3 className="t-h4">{b.title}</h3>
                  <p className="t-small mt-1.5 text-grey-700 md:mt-0.5">{b.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </Section>

      {/* Technik: die Systeme als Zeile, darunter wofür */}
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
        <dl className="grid border-t border-ink sm:grid-cols-2 lg:grid-cols-4">
          {page.stack.items.map((s, i) => (
            <div
              key={s.title}
              className={`border-b border-line py-6 sm:pr-6 lg:border-b-0 lg:py-8 ${i > 0 ? "lg:border-l lg:pl-6" : ""} ${
                i % 2 === 1 ? "sm:border-l sm:pl-6 lg:pl-6" : ""
              }`}
            >
              <dt className="t-h3">{s.title}</dt>
              <dd className="t-small mt-3 text-grey-700">{s.text}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Integrationen als Datenblatt */}
      <Section space="m" rule="ink" labelledBy="integrationen-title">
        <div className="grid-12 gap-y-10">
          <div className="col-span-4 md:col-span-4">
            <div className="md:sticky md:top-[calc(var(--header-h)+2rem)]">
              <p className="t-meta text-grey-600">{page.integrations.meta}</p>
              <h2 id="integrationen-title" className="t-h2 mt-5" data-reveal>
                {page.integrations.title}
              </h2>
              <p className="t-body mt-5 max-w-[36ch] text-grey-700">{page.integrations.intro}</p>
              <div className="mt-6">
                <ArrowLink href={page.integrations.crmLink.href}>{page.integrations.crmLink.label}</ArrowLink>
              </div>
            </div>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
            <FactsTable rows={[...page.integrations.rows]} />
          </div>
        </div>
      </Section>

      {/* Ablauf */}
      <Section mode="band" space="m" rule="none" labelledBy="ablauf-title">
        <SectionIntro meta={[page.steps.meta]} title={page.steps.title} id="ablauf-title" />
        <Steps steps={[...page.steps.items]} />
        <div className="mx-auto mt-10 flex max-w-[46rem] flex-col items-center gap-3 text-center">
          <p className="t-body text-grey-700">{page.steps.packages.text}</p>
          <ArrowLink href={page.steps.packages.link.href}>{page.steps.packages.link.label}</ArrowLink>
        </div>
      </Section>

      {/* FAQ */}
      <Section space="l" rule="none" labelledBy="faq-title">
        <SectionIntro meta={[page.faq.meta]} title={page.faq.title} id="faq-title">
          {page.faq.intro}
        </SectionIntro>
        <div className="mx-auto max-w-[56rem]">
          <Faq items={[...page.faq.items]} />
        </div>
      </Section>

      <Section space="s" rule="line">
        <RelatedLinks links={[...page.related]} />
      </Section>

      <FinalCta title={page.finalCta.title} secondary={cta.website} />
    </>
  );
}
