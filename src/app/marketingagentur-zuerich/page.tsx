import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/page/PageHeader";
import { FactsTable, RelatedLinks, Section, SectionIntro } from "@/components/page/Blocks";
import { Faq } from "@/components/page/Faq";
import { FinalCta } from "@/components/blocks/FinalCta";
import { Arrow, ArrowLink, ButtonLink } from "@/components/ui/ButtonLink";
import { Meta } from "@/components/ui/Meta";
import { pageMeta } from "@/lib/metadata";
import { cta, site } from "@/content/site";
import { services } from "@/content/services";
import { webProjects } from "@/content/work";
import { standortPage as page } from "@/content/pages/marketingagentur-zuerich";

export const metadata = pageMeta(page.meta);

const host = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

/**
 * Standortseite, ehrlich: Sitz Neerach, Einsatzgebiet Deutschschweiz. Schlicht wie die bisherige Website.
 * Aufbau: dunkler Kopf mit Koordinaten darunter, Einsatzgebiet in vier gleichen Spalten, Zusammenarbeit (drei Spalten),
 * Adresse + Datenblatt (ohne eingebettete Karte), Leistungs-Index, Webprojekt aus dem Kanton, FAQ.
 * LocalBusiness/ProfessionalService-Schema kommt global aus layout.tsx.
 */
export default function StandortPage() {
  const { header, scale, together, address, proof, faq } = page;
  const trapletti = webProjects.find((w) => w.id === "trapletti")!;
  const phoneLocal = site.phone.replace("+41 ", "0");

  return (
    <>
      <PageHeader
        crumbs={page.crumbs}
        meta={header.meta}
        title={header.title}
        lead={header.lead}
        actions={
          <>
            <ButtonLink href={cta.primary.href} track="standort-header">
              {cta.primary.label}
            </ButtonLink>
            <ArrowLink href={header.addressLink.href}>{header.addressLink.label}</ArrowLink>
          </>
        }
        aside={
          /* Die Gemeinde als Messpunkt: Name, Gebiet, Koordinaten, schlicht und mittig */
          <div className="text-center">
            <p className="t-h3">{header.coords.label}</p>
            <Meta className="mt-2 justify-center text-grey-600" items={header.coords.area} />
            <p className="t-num mt-5" aria-label={`${header.coords.lat}, ${header.coords.lon}`}>
              <span className="whitespace-nowrap">{header.coords.lat}</span>{" "}
              <span className="whitespace-nowrap text-grey-500">{header.coords.lon}</span>
            </p>
            <p className="t-small mt-3 text-grey-600">{header.coords.source}</p>
          </div>
        }
      />

      {/* Einsatzgebiet: vier Stufen von Neerach bis Deutschschweiz, gleich gross nebeneinander */}
      <Section space="l" rule="none" labelledBy="gebiet-title">
        <SectionIntro id="gebiet-title" meta={[scale.meta]} title={scale.title} />
        <ol className="grid border-t border-ink sm:grid-cols-2 sm:gap-x-[var(--gutter)] lg:grid-cols-4">
          {scale.rows.map((r, i) => (
            <li
              key={r.place}
              className="border-b border-line py-6 md:py-8"
              data-reveal
              style={{ ["--d" as string]: `${i * 90}ms` }}
            >
              <p className="t-meta text-grey-600">{r.label}</p>
              <h3 className="t-h3 mt-3">{r.place}</h3>
              <p className="t-small mt-2 max-w-[40ch] text-grey-700">{r.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Zusammenarbeit: drei Arten von Nähe */}
      <Section mode="band" space="l" rule="none" labelledBy="zusammen-title">
        <SectionIntro
          id="zusammen-title"
          meta={[together.meta]}
          title={
            <>
              <span className="block">{together.title[0]}</span>{" "}
              <span className="block text-grey-500">{together.title[1]}</span>
            </>
          }
        />
        <dl className="grid border-t border-ink md:grid-cols-3">
          {together.items.map((it, i) => (
            <div
              key={it.title}
              className={`border-b border-line py-6 md:border-b-0 md:py-8 md:pr-6 ${i > 0 ? "md:border-l md:pl-6" : ""}`}
            >
              <dt className="t-h4">{it.title}</dt>
              <dd className="t-small mt-2 max-w-[40ch] text-grey-700">{it.text}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-10 text-center">
          <ArrowLink href={together.link.href}>{together.link.label}</ArrowLink>
        </div>
      </Section>

      {/* Adresse links, Datenblatt rechts, ohne eingebettete Karte */}
      <section id="adresse" aria-labelledby="adresse-title" className="sec-l scroll-mt-[var(--header-h)]">
        <div className="wrap">
          <div className="grid-12 gap-y-12">
            <div className="col-span-4 md:col-span-6">
              <p className="t-meta text-grey-600">{address.meta}</p>
              <h2 id="adresse-title" className="t-h2 mt-4">
                <span className="block">{address.title[0]}</span> <span className="block">{address.title[1]}</span>
              </h2>
              <a
                href={site.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ink mt-8"
                data-cta="standort-maps"
              >
                <span>{address.mapsLabel}</span>
                <span className="btn-ring" aria-hidden>
                  <Arrow className="btn-arrow h-[9px] w-[13px] -rotate-45" />
                </span>
                <span className="sr-only"> (öffnet in neuem Tab)</span>
              </a>
              <p className="t-small mt-4 max-w-[40ch] text-grey-600">{address.mapsNote}</p>
            </div>
            <div className="col-span-4 md:col-span-6">
              <FactsTable
                caption={address.caption}
                rows={[
                  ...address.rows,
                  {
                    k: address.phoneLabel,
                    v: (
                      <a href={site.phoneHref} className="-my-2.5 inline-flex min-h-11 items-center underline-offset-4 hover:underline">
                        {phoneLocal}
                      </a>
                    ),
                  },
                  {
                    k: address.emailLabel,
                    v: (
                      <a href={`mailto:${site.email}`} className="-my-2.5 inline-flex min-h-11 items-center underline-offset-4 hover:underline">
                        {site.email}
                      </a>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Leistungen im Überblick: Index mit Links */}
      <Section space="l" rule="line" labelledBy="leistungen-title">
        <SectionIntro id="leistungen-title" meta={[page.services.meta]} title={page.services.title}>
          {page.services.intro}
        </SectionIntro>
        <ul className="border-t border-ink md:grid md:grid-cols-2 md:gap-x-[var(--gutter)]">
          {[
            ...services.map((s) => ({ key: s.slug, name: s.name, href: s.href, text: s.short.replace(/CHF /g, "CHF ") })),
            {
              key: "content-day",
              name: page.services.contentDay.label,
              href: page.services.contentDay.href,
              text: page.services.contentDay.note,
            },
          ].map((s) => (
            <li key={s.key} className="border-b border-line">
              <Link href={s.href} className="group grid grid-cols-[1fr_1.25rem] items-baseline gap-4 py-5">
                <span>
                  <span className="t-h4 block transition-colors group-hover:text-grey-600">{s.name}</span>
                  <span className="t-small mt-1 hidden max-w-[48ch] text-grey-700 sm:block">{s.text}</span>
                </span>
                <Arrow className="text-grey-500 transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <ArrowLink href={page.services.allLink.href}>{page.services.allLink.label}</ArrowLink>
        </div>
      </Section>

      {/* Beleg aus dem Kanton: Trapletti, Thalwil */}
      <Section space="l" rule="line" labelledBy="beleg-title">
        <SectionIntro id="beleg-title" meta={proof.meta} title={proof.title} />

        <div className="grid-12 items-end gap-y-6">
          <figure className="col-span-4 md:col-span-9">
            <div className="relative aspect-[16/10] overflow-hidden border border-line bg-white">
              <Image
                src={trapletti.desktop}
                alt={`Startseite von ${host(trapletti.url)} auf dem Desktop: Website für ${trapletti.client}`}
                fill
                sizes="(min-width: 768px) 72vw, 100vw"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="t-meta mt-3 text-grey-600">
              {host(trapletti.url)} <span className="text-grey-400">/</span> {proof.labels.desktop}
            </figcaption>
          </figure>
          <figure className="col-span-2 md:col-span-3">
            <div className="relative aspect-[585/1266] overflow-hidden border border-line bg-white">
              <Image
                src={trapletti.mobile}
                alt={`Startseite von ${host(trapletti.url)} auf dem Handy`}
                fill
                sizes="(min-width: 768px) 22vw, 45vw"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="t-meta mt-3 text-grey-600">{proof.labels.mobile}</figcaption>
          </figure>
          <div className="col-span-2 self-center md:hidden">
            <p className="t-small text-grey-700">{trapletti.summary}</p>
          </div>
        </div>

        <div className="grid-12 mt-8 gap-y-6 md:mt-10">
          <p className="t-lead col-span-4 hidden text-grey-700 md:col-span-7 md:block">{trapletti.summary}</p>
          <div className="col-span-4 flex flex-col items-start gap-1 md:col-span-3 md:col-start-10">
            <a
              href={trapletti.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group -my-2.5 inline-flex min-h-11 items-center gap-2 whitespace-nowrap py-2.5 font-semibold"
            >
              <span className="link">{proof.labels.visit}</span>
              <Arrow className="-rotate-45 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span className="sr-only"> {host(trapletti.url)} (öffnet in neuem Tab)</span>
            </a>
            <ArrowLink href={proof.caseHref}>{proof.labels.case}</ArrowLink>
          </div>
        </div>
        <p className="t-meta mt-8 border-t border-line pt-3 text-grey-600">
          {proof.labels.evidence} <span className="text-grey-400">/</span> {trapletti.evidence}
        </p>
      </Section>

      {/* FAQ */}
      <Section mode="band" space="l" rule="none" labelledBy="faq-title">
        <div className="grid-12 gap-y-10">
          <div className="col-span-4 md:col-span-4">
            <p className="t-meta text-grey-600">{faq.meta}</p>
            <h2 id="faq-title" className="t-h2 mt-5">
              {faq.title}
            </h2>
          </div>
          <div className="col-span-4 md:col-span-8">
            <Faq items={faq.items} />
          </div>
        </div>
      </Section>

      <Section space="s" rule="none">
        <RelatedLinks links={page.related} />
      </Section>

      <FinalCta title={page.finalCta.title} secondary={cta.contact} />
    </>
  );
}
