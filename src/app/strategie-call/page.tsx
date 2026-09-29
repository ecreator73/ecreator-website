import { Suspense } from "react";
import Image from "next/image";
import { PageHeader } from "@/components/page/PageHeader";
import { Section, SectionIntro, FactsTable, RelatedLinks, Steps } from "@/components/page/Blocks";
import { Faq } from "@/components/page/Faq";
import { BookingEmbed } from "@/components/forms/BookingEmbed";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { ArrowLink } from "@/components/ui/ButtonLink";
import { Meta } from "@/components/ui/Meta";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta } from "@/lib/metadata";
import { serviceSchema } from "@/lib/schema";
import { site } from "@/content/site";
import { corePeople } from "@/content/team";
import { strategieCallPage as p } from "@/content/pages/strategie-call";

export const metadata = pageMeta(p.meta);

export default function StrategieCallPage() {
  const people = corePeople.filter((person) => p.booking.peopleIds.includes(person.id));

  return (
    <>
      <JsonLd data={serviceSchema({ ...p.schema, path: p.meta.path })} />

      <PageHeader
        crumbs={p.crumbs}
        meta={p.header.meta}
        title={p.header.title}
        lead={p.header.lead}
      />

      {/* Kalender zuerst: auf dem Handy direkt nach dem Kopf */}
      <Section id={p.booking.id} space="s" rule="ink" labelledBy="termin-title" className="scroll-mt-20">
        <h2 id="termin-title" className="sr-only">
          {p.booking.title}
        </h2>
        <div className="grid-12 gap-y-12">
          <div className="col-span-4 md:col-span-12 lg:col-span-7">
            <BookingEmbed />

            <div className="mt-10">
              <p className="t-meta text-grey-600">{p.booking.promisesLabel}</p>
              <ul className="mt-3 grid border-t border-ink sm:grid-cols-3 sm:gap-x-[var(--gutter)]">
                {p.booking.promises.map((it) => (
                  <li key={it} className="t-small flex gap-3 border-b border-line py-3.5 sm:border-b-0 sm:pt-4">
                    <span aria-hidden className="t-meta pt-[0.3em] text-grey-500">
                      /
                    </span>
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
            <div className="grid gap-x-[var(--gutter)] gap-y-12 md:grid-cols-2 lg:grid-cols-1">
              <figure>
                <figcaption className="t-meta text-grey-600">{p.booking.peopleLabel}</figcaption>
                <ul className="mt-4 grid grid-cols-2 gap-x-[var(--gutter)]">
                  {people.map((person) => (
                    <li key={person.id}>
                      <div className="group relative aspect-[4/5] overflow-hidden bg-paper-2">
                        {person.portrait && (
                          <Image
                            src={person.portrait}
                            alt={`Porträt ${person.name}`}
                            fill
                            sizes="(min-width: 1024px) 16vw, 45vw"
                            className="object-cover object-top grayscale transition-[filter] duration-700 group-hover:grayscale-0"
                            style={person.objectPosition ? { objectPosition: person.objectPosition } : undefined}
                          />
                        )}
                      </div>
                      <p className="t-h4 mt-3">{person.name}</p>
                      <p className="t-meta mt-1.5 text-grey-600">{person.roleShort}</p>
                    </li>
                  ))}
                </ul>
              </figure>

              <FactsTable caption={p.booking.factsCaption} rows={p.booking.facts} />
            </div>
          </div>
        </div>
      </Section>

      {/* Ablauf: die drei Punkte, die im Call besprochen werden */}
      <Section space="l" rule="line" labelledBy="ablauf-title">
        <SectionIntro id="ablauf-title" meta={p.agenda.meta} title={p.agenda.title} />
        <Steps steps={p.agenda.items} />
      </Section>

      {/* Kundenstimme: Skepsis vorher, Ergebnis nachher, wörtlich aus dem Interview, mittig */}
      <section aria-labelledby="stimme-title" className="studio">
        <div className="wrap sec-m">
          <div className="mx-auto max-w-[46rem] text-center">
            <Meta className="justify-center text-grey-400" items={p.voice.meta} />
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
                <span className="t-meta mt-1.5 block text-grey-400">{p.voice.role}</span>
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

      {/* Alternative: schreiben oder anrufen */}
      <Section id={p.write.id} space="m" rule="none" labelledBy="schreiben-title" className="scroll-mt-20">
        <div className="grid-12 gap-y-12">
          <div className="col-span-4 md:col-span-12 lg:col-span-4">
            <Meta className="text-grey-600" items={p.write.meta} />
            <h2 id="schreiben-title" className="t-h2 mt-5" data-reveal>
              {p.write.title}
            </h2>
            <p className="t-lead mt-6 max-w-[34ch] text-grey-700">{p.write.text}</p>

            <div className="mt-10 border-t border-ink pt-4">
              <p className="t-meta text-grey-600">{p.write.phoneLabel}</p>
              <a
                href={site.phoneHref}
                className="t-num mt-2 inline-block hover:underline"
                data-cta="strategie-call-phone"
              >
                {site.phone.replace("+41 ", "0")}
              </a>
              <p className="t-meta mt-5 text-grey-600">{p.write.mailLabel}</p>
              <a href={`mailto:${site.email}`} className="link t-body mt-1 inline-flex min-h-11 items-center">
                {site.email}
              </a>
            </div>
          </div>
          <div className="col-span-4 md:col-span-12 lg:col-span-7 lg:col-start-6">
            <Suspense fallback={<FormFallback text={p.write.fallback} />}>
              <InquiryForm defaultAnliegen="strategie-call" source="/strategie-call" />
            </Suspense>
          </div>
        </div>
      </Section>

      <Section space="m" rule="ink" labelledBy="faq-title">
        <div className="grid-12 gap-y-8">
          <div className="col-span-4 md:col-span-4">
            <Meta className="text-grey-600" items={p.faq.meta} />
            <h2 id="faq-title" className="t-h2 mt-5">
              {p.faq.title}
            </h2>
          </div>
          <div className="col-span-4 md:col-span-8">
            <Faq items={p.faq.items} />
          </div>
        </div>
      </Section>

      <Section space="s" rule="none">
        <RelatedLinks title={p.related.title} links={p.related.links} />
      </Section>
    </>
  );
}

function FormFallback({ text }: { text: string }) {
  return (
    <div className="hatch flex min-h-[520px] items-end border border-line-strong p-6">
      <p className="t-small max-w-[40ch] text-grey-700">
        {text}{" "}
        <a href={`mailto:${site.email}`} className="link">
          {site.email}
        </a>
      </p>
    </div>
  );
}
