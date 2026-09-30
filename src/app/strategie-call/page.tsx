import { Suspense } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import { PageHeader } from "@/components/page/PageHeader";
import { NumberChip, Section, SectionIntro, RelatedLinks } from "@/components/page/Blocks";
import { Faq } from "@/components/page/Faq";
import { BookingEmbed } from "@/components/forms/BookingEmbed";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { ArrowLink } from "@/components/ui/ButtonLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { withAccent } from "@/lib/accent";
import { pageMeta } from "@/lib/metadata";
import { serviceSchema } from "@/lib/schema";
import { site } from "@/content/site";
import { corePeople } from "@/content/team";
import { strategieCallPage as p } from "@/content/pages/strategie-call";

export const metadata = pageMeta(p.meta);

/** Schlüssel / Wert in einer Karte: feine Linien statt schwarzer Regel. */
function Rows({ rows }: { rows: { k: string; v: ReactNode }[] }) {
  return (
    <dl className="divide-y divide-line">
      {rows.map((r) => (
        <div key={r.k} className="grid grid-cols-[minmax(0,40%)_minmax(0,1fr)] gap-3 py-3 first:pt-0 last:pb-0">
          <dt className="t-small min-w-0 pt-[0.1em] text-grey-600">{r.k}</dt>
          <dd className="t-body">{r.v}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Strategie-Call: die Seite ist die Conversion.
 * Kalender als Karte zuerst, daneben Geschäftsführung und Eckdaten in einer Karte,
 * Ablauf in drei Karten, Kundenstimme im dunklen Panel, Alternative (Formular), FAQ mittig.
 */
export default function StrategieCallPage() {
  const people = corePeople.filter((person) => p.booking.peopleIds.includes(person.id));

  return (
    <>
      <JsonLd data={serviceSchema({ ...p.schema, path: p.meta.path })} />

      <PageHeader
        crumbs={p.crumbs}
        meta={p.header.meta}
        title={p.header.title.map((l) => withAccent(l, p.header.accent))}
        lead={p.header.lead}
      />

      {/* Kalender zuerst: auf dem Handy direkt nach dem Kopf */}
      <Section id={p.booking.id} space="s" rule="none" labelledBy="termin-title" className="scroll-mt-20">
        <h2 id="termin-title" className="sr-only">
          {p.booking.title}
        </h2>
        <div className="grid-12 gap-y-10">
          <div className="col-span-4 md:col-span-12 lg:col-span-7">
            {/* BookingEmbed bringt einen eigenen Rahmen mit: in der Karte ausgeblendet */}
            <div className="card overflow-hidden [&>div]:border-0">
              <BookingEmbed />
            </div>

            <div className="mt-8">
              <h3 className="t-h4">{p.booking.promisesLabel}</h3>
              <ul className="check-list mt-4 grid gap-3 sm:grid-cols-3 sm:gap-x-6">
                {p.booking.promises.map((it) => (
                  <li key={it} className="t-small">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-6">
              <ArrowLink href={p.header.jump.href}>{p.header.jump.label}</ArrowLink>
            </p>
          </div>

          <div className="col-span-4 md:col-span-12 lg:col-span-4 lg:col-start-9">
            <div className="card grid gap-x-8 gap-y-8 p-6 md:grid-cols-2 md:p-8 lg:grid-cols-1">
              <figure>
                <figcaption className="t-meta text-grey-600">{p.booking.peopleLabel}</figcaption>
                <ul className="mt-4 grid grid-cols-2 gap-x-4">
                  {people.map((person) => (
                    <li key={person.id}>
                      <div className="group relative aspect-[4/5] overflow-hidden rounded-[var(--radius-media)] bg-paper-2">
                        {person.portrait && (
                          <Image
                            src={person.portrait}
                            alt={`Porträt ${person.name}`}
                            fill
                            sizes="(min-width: 1024px) 14vw, 40vw"
                            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                            style={person.objectPosition ? { objectPosition: person.objectPosition } : undefined}
                          />
                        )}
                      </div>
                      <p className="t-h4 mt-3">{person.name}</p>
                      <p className="t-small mt-1 text-grey-600">{person.roleShort}</p>
                    </li>
                  ))}
                </ul>
              </figure>

              <div className="border-t border-line pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0 lg:border-l-0 lg:border-t lg:pl-0 lg:pt-6">
                <p className="t-meta mb-4 text-grey-600">{p.booking.factsCaption}</p>
                <Rows rows={p.booking.facts} />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Ablauf: die drei Punkte, die im Call besprochen werden, als Karten */}
      <Section mode="band" space="l" rule="none" labelledBy="ablauf-title">
        <SectionIntro id="ablauf-title" meta={p.agenda.meta} title={p.agenda.title} />
        <ol className="grid gap-5 md:grid-cols-3">
          {p.agenda.items.map((s, i) => (
            <li key={s.title} className="card p-6 md:p-8">
              <span aria-hidden>
                <NumberChip n={i + 1} />
              </span>
              <h3 className="t-h4 mt-5">{s.title}</h3>
              <p className="t-small mt-2 text-grey-700">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Kundenstimme: Skepsis vorher, Ergebnis nachher, wörtlich aus dem Interview, mittig */}
      <section aria-labelledby="stimme-title" className="studio">
        <div className="wrap sec-m">
          <div className="mx-auto max-w-[46rem] text-center">
            <p className="label-pill">{p.voice.meta.join(" · ")}</p>
            <h2 id="stimme-title" className="sr-only">
              Kundenstimme
            </h2>
            <figure className="mt-6">
              <blockquote>
                <p className="t-h3">«{p.voice.quote}»</p>
                <p className="t-lead mx-auto mt-5 max-w-[44ch] text-grey-300">«{p.voice.follow}»</p>
              </blockquote>
              <figcaption className="mt-8 border-t border-line pt-6">
                <span className="t-h4 block">{p.voice.person}</span>
                <span className="t-small mt-1 block text-grey-400">{p.voice.role}</span>
                <span className="t-meta mt-3 block text-grey-500">{p.voice.source}</span>
              </figcaption>
              <div className="mt-8">
                <ArrowLink href={p.voice.link.href} className="text-paper">
                  {p.voice.link.label}
                </ArrowLink>
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* Alternative: schreiben oder anrufen, Formular als Karte */}
      <Section id={p.write.id} space="l" rule="none" labelledBy="schreiben-title" className="scroll-mt-20">
        <div className="grid-12 gap-y-12">
          <div className="col-span-4 md:col-span-12 lg:col-span-4">
            <p className="label-pill">{p.write.meta.join(" · ")}</p>
            <h2 id="schreiben-title" className="t-h2 mt-5" data-reveal>
              {p.write.title}
            </h2>
            <p className="t-lead mt-5 max-w-[34ch] text-grey-700">{p.write.text}</p>

            <div className="card mt-10 p-6 md:p-7">
              <p className="t-small text-grey-600">{p.write.phoneLabel}</p>
              <a
                href={site.phoneHref}
                className="t-num mt-1 inline-block hover:underline"
                data-cta="strategie-call-phone"
              >
                {site.phone.replace("+41 ", "0")}
              </a>
              <p className="t-small mt-5 border-t border-line pt-5 text-grey-600">{p.write.mailLabel}</p>
              <a href={`mailto:${site.email}`} className="link t-body mt-1 inline-flex min-h-11 items-center">
                {site.email}
              </a>
            </div>
          </div>
          <div className="col-span-4 md:col-span-12 lg:col-span-7 lg:col-start-6">
            <div className="card p-6 md:p-10">
              <Suspense fallback={<FormFallback text={p.write.fallback} />}>
                <InquiryForm defaultAnliegen="strategie-call" source="/strategie-call" />
              </Suspense>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ: Kopf mittig, Fragen darunter */}
      <Section mode="band" space="l" rule="none" labelledBy="faq-title">
        <SectionIntro id="faq-title" meta={p.faq.meta} title={p.faq.title} />
        <div className="mx-auto max-w-[52rem]">
          <Faq items={p.faq.items} />
        </div>
      </Section>

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
