import { Suspense } from "react";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/page/PageHeader";
import { NumberChip, Section, RelatedLinks, Todo } from "@/components/page/Blocks";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { ButtonLink, ArrowLink } from "@/components/ui/ButtonLink";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta } from "@/lib/metadata";
import { cta, site } from "@/content/site";
import { corePeople } from "@/content/team";
import { workById } from "@/content/work";
import { kontaktPage as p } from "@/content/pages/kontakt";

export const metadata = pageMeta(p.meta);

/** Schlüssel / Wert in einer Karte: feine Linien statt schwarzer Regel. */
function Rows({ rows }: { rows: { k: string; v: ReactNode }[] }) {
  return (
    <dl className="divide-y divide-line">
      {rows.map((r) => (
        <div key={r.k} className="grid grid-cols-[minmax(0,36%)_minmax(0,1fr)] gap-3 py-3.5 first:pt-0 last:pb-0">
          <dt className="t-small min-w-0 hyphens-auto pt-[0.1em] text-grey-600">{r.k}</dt>
          <dd className="t-body">{r.v}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Kontakt: hell und direkt. Telefon und E-Mail als Karte im Kopf, Formular als Karte auf grauem Band,
 * Adresse mit Datenblatt-Karte, Team im dunklen Panel.
 */
export default function KontaktPage() {
  const ad = workById(p.people.videoId);

  return (
    <>
      <JsonLd data={p.schema} />

      <PageHeader
        crumbs={p.crumbs}
        meta={p.header.meta}
        title={p.header.title}
        lead={p.header.lead}
        actions={
          <>
            <ButtonLink href={cta.primary.href} track="kontakt-header">
              {cta.primary.label}
            </ButtonLink>
            <ArrowLink href={p.header.formLink.href}>{p.header.formLink.label}</ArrowLink>
          </>
        }
        aside={
          /* Telefon und E-Mail nebeneinander, mittig, feine Trennlinie */
          <div className="grid divide-y divide-line text-center sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            <div className="pb-6 sm:pb-0 sm:pr-6">
              <p className="t-small text-grey-600">{p.header.phoneLabel}</p>
              <a
                href={site.phoneHref}
                className="t-h3 tnum mt-1 inline-flex min-h-11 items-center hover:underline"
                data-cta="kontakt-phone"
              >
                {site.phone.replace("+41 ", "0")}
              </a>
            </div>
            <div className="pt-6 sm:pl-6 sm:pt-0">
              <p className="t-small text-grey-600">{p.header.mailLabel}</p>
              <a
                href={`mailto:${site.email}`}
                className="link t-h3 mt-1 inline-flex min-h-11 items-center"
                data-cta="kontakt-mail"
              >
                {site.email}
              </a>
            </div>
          </div>
        }
      />

      {/* Formular: der Hauptinhalt, als Karte auf grauem Band. Anliegen per ?anliegen= vorgewählt */}
      <Section id={p.form.id} mode="band" space="l" rule="none" labelledBy="anfrage-title" className="scroll-mt-20">
        <div className="grid-12 gap-y-12">
          <div className="col-span-4 md:col-span-12 lg:col-span-4">
            <p className="label-pill">{p.form.meta.join(" · ")}</p>
            <h2 id="anfrage-title" className="t-h2 mt-5" data-reveal>
              {p.form.title}
            </h2>
            <p className="t-lead mt-5 max-w-[34ch] text-grey-700">{p.form.text}</p>

            <h3 className="t-h4 mt-10">{p.form.stepsLabel}</h3>
            <ol className="mt-5 space-y-5">
              {p.form.steps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span aria-hidden className="flex flex-none">
                    <NumberChip n={i + 1} />
                  </span>
                  <div className="pt-1.5">
                    <h4 className="font-semibold leading-snug">{s.title}</h4>
                    <p className="t-small mt-1 text-grey-700">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="col-span-4 md:col-span-12 lg:col-span-7 lg:col-start-6">
            <div className="card p-6 md:p-10">
              <Suspense fallback={<FormFallback text={p.form.fallback} />}>
                <InquiryForm source="/kontakt" />
              </Suspense>
            </div>
          </div>
        </div>
      </Section>

      {/* Adresse links, Datenblatt als Karte rechts, Karte nur als Link (Datenschutz) */}
      <Section space="l" rule="none" labelledBy="adresse-title">
        <div className="grid-12 gap-y-12 lg:items-center">
          <div className="col-span-4 md:col-span-12 lg:col-span-5">
            <p className="label-pill">{p.address.meta.join(" · ")}</p>
            <h2 id="adresse-title" className="t-h2 mt-5">
              {p.address.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </h2>
            <p className="t-lead mt-5 max-w-[36ch] text-grey-700">{p.address.region}.</p>
            <div className="mt-8">
              <ButtonLink href={site.address.mapsUrl} variant="line" track="kontakt-maps">
                {p.address.mapLabel}
              </ButtonLink>
              <p className="t-small mt-4 max-w-[46ch] text-grey-600">{p.address.mapNote}</p>
            </div>
          </div>
          <div className="col-span-4 md:col-span-12 lg:col-span-6 lg:col-start-7">
            <div className="card p-6 md:p-8">
              <Rows
                rows={[
                  ...p.address.rows,
                  { k: p.address.visitLabel, v: <Todo>{p.address.visitTodo}</Todo> },
                  {
                    k: p.address.socialsLabel,
                    v: (
                      <span className="-my-2 flex flex-col items-start">
                        {site.socials.map((s) => (
                          <a
                            key={s.href}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link inline-flex min-h-11 items-center"
                          >
                            {s.label}
                            <span className="sr-only"> (öffnet in neuem Tab)</span>
                          </a>
                        ))}
                      </span>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Proof + Menschen: das eigene Ad, vor der Logowand gedreht */}
      <section aria-labelledby="team-title" className="studio">
        <div className="wrap sec-m">
          <div className="mx-auto grid max-w-[60rem] items-center gap-10 md:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] md:gap-16">
            <figure>
              <div className="w-[48%] md:w-auto">
                <VideoFrame src={ad.short} poster={ad.poster} label="eCreator-Ad, gedreht vor der eCreator-Logowand" />
              </div>
              <figcaption className="t-meta mt-3 text-grey-400">
                {ad.theme} <span className="text-grey-500">/</span> {ad.title}
              </figcaption>
            </figure>
            <div>
              <p className="label-pill">{p.people.meta.join(" · ")}</p>
              <h2 id="team-title" className="t-h2 mt-5" data-reveal>
                {p.people.title}
              </h2>
              <p className="t-lead mt-5 max-w-[46ch] text-grey-300">{p.people.text}</p>
              <ul className="card mt-10 divide-y divide-line px-5 md:px-6">
                {corePeople.map((person) => (
                  <li
                    key={person.id}
                    className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <span className="t-h4">{person.name}</span>
                    <span className="t-small text-grey-400 sm:text-right">{person.roleShort}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <ArrowLink href={p.people.link.href} className="text-paper">
                  {p.people.link.label}
                </ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section space="m" rule="none">
        <div className="mx-auto max-w-[52rem]">
          <RelatedLinks title={p.related.title} links={p.related.links} />
        </div>
      </Section>
    </>
  );
}

function FormFallback({ text }: { text: string }) {
  return (
    <div className="hatch flex min-h-[520px] items-end rounded-[var(--radius-media)] p-6">
      <p className="t-small max-w-[40ch] text-grey-700">
        {text}{" "}
        <a href={`mailto:${site.email}`} className="link">
          {site.email}
        </a>
      </p>
    </div>
  );
}
