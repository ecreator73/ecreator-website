import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { VideoCollage } from "@/components/home/VideoCollage";
import { CaseStudies } from "@/components/home/CaseStudies";
import { ProblemGrid } from "@/components/home/ProblemGrid";
import { PartnerSystem } from "@/components/home/PartnerSystem";
import { Manifest } from "@/components/home/Manifest";
import { ServiceIndex } from "@/components/home/ServiceIndex";
import { RecruitingBand } from "@/components/home/RecruitingBand";
import { RingSystem } from "@/components/system/RingSystem";
import { RateCard } from "@/components/blocks/RateCard";
import { TeamStrip } from "@/components/blocks/TeamStrip";
import { FinalCta } from "@/components/blocks/FinalCta";
import { ButtonLink, ArrowLink } from "@/components/ui/ButtonLink";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { cta } from "@/content/site";
import { workById } from "@/content/work";

export const metadata: Metadata = {
  title: { absolute: "eCreator · Marketingagentur Schweiz: Content, Ads, Web, CRM" },
  description:
    "Marketingagentur aus dem Kanton Zürich: Content, Performance Marketing, Websites und CRM aus einem Team. Content Day ab CHF 1'990, Pakete ab CHF 3'500.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const office = workById("ecreator");
  const fitness = workById("fitness");

  return (
    <>
      <Hero />
      <VideoCollage />

      {/* Probleme der Kunden, dann das System dagegen (CRM-Beispielansicht) */}
      <ProblemGrid />
      <PartnerSystem />
      {/* Case Studies: Video und Ergebnisse, abwechselnd links und rechts (Ziel von «Erfahrungen») */}
      <CaseStudies />

      <Manifest />

      {/* Studio */}
      <section aria-labelledby="studio-title" className="studio sec-l relative overflow-hidden">
        <div className="wrap relative">
          <div className="grid-12 items-end gap-y-12">
            <div className="col-span-4 md:col-span-7 lg:col-span-6">
              <p className="label-pill">Studio und Produktion</p>
              <h2 id="studio-title" className="t-h2 mt-5">
                Wir drehen selbst.
              </h2>
              <p className="t-lead mt-8 max-w-[40ch] text-grey-300">
                Videograf, Equipment, Models und Schnitt, dazu ein eigenes Podcast-Studio ab CHF 690. Die Preise stehen
                hier, weil du sie wissen willst.
              </p>
            </div>
            <div className="col-span-4 md:col-span-5 lg:col-span-5 lg:col-start-8">
              <ul className="grid grid-cols-2 gap-[var(--gutter)]">
                <li>
                  <div className="">
                    <VideoFrame src={office.short} poster={office.poster} label="eCreator-Ad, gedreht vor der eCreator-Logowand" />
                  </div>
                  <p className="t-meta mt-3 text-grey-400">Eigenes Ad / vor der Logowand</p>
                </li>
                <li className="mt-12">
                  <VideoFrame src={fitness.short} poster={fitness.poster} label={`Social Ad, Thema ${fitness.theme}`} />
                  <p className="t-meta mt-3 text-grey-400">Social Ad / {fitness.theme}</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 md:mt-24">
            <RateCard />
          </div>
          <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
            <ButtonLink href={cta.contentDay.href} variant="paper" track="studio-contentday">
              {cta.contentDay.label}
            </ButtonLink>
            <ArrowLink href="/podcast-studio" className="text-paper">
              Podcast-Studio ansehen
            </ArrowLink>
          </div>
        </div>
      </section>

      {/* System als Kreislauf */}
      <section aria-labelledby="system-title" className="sec-l">
        <div className="wrap">
          <div className="mx-auto mb-14 max-w-[46rem] text-center md:mb-16">
            <p className="label-pill">Systems over campaigns</p>
            <h2 id="system-title" className="t-h2 mt-4">
              Kampagnen sind Linien. Systeme sind Kreisläufe.
            </h2>
            <p className="t-lead mx-auto mt-5 max-w-[50ch] text-grey-700">
              Eine Kampagne startet und endet. Ein System lernt aus jeder Runde: Was funktioniert, bekommt mehr Budget,
              mehr Content und mehr Kapazität im Verkauf.
            </p>
          </div>
          <RingSystem />
        </div>
      </section>

      {/* Leistungen */}
      <section aria-labelledby="services-title" className="sec-l border-t border-line">
        <div className="wrap">
          <div className="mx-auto mb-12 max-w-[46rem] text-center md:mb-14">
            <p className="label-pill">Leistungen</p>
            <h2 id="services-title" className="t-h2 mt-4">
              Acht Leistungen. Einzeln buchbar, am stärksten zusammen.
            </h2>
          </div>
          <ServiceIndex />
          <div className="mt-10 text-center">
            <ArrowLink href="/leistungen">Alle Leistungen im Überblick</ArrowLink>
          </div>
        </div>
      </section>

      <RecruitingBand />

      {/* Menschen */}
      <section aria-labelledby="team-title" className="sec-l border-t border-line">
        <div className="wrap">
          <div className="mx-auto mb-12 max-w-[46rem] text-center md:mb-14">
            <p className="label-pill">Team</p>
            <h2 id="team-title" className="t-h2 mt-4">
              Claudio, Fabian, Ricardo.
            </h2>
            <p className="t-lead mx-auto mt-5 max-w-[50ch] text-grey-700">
              Du sprichst mit den Leuten, die deine Kampagnen, Videos und Websites bauen. Am Telefon, im Video-Call oder
              beim Dreh.
            </p>
          </div>
          <TeamStrip />
          <div className="mt-12 text-center">
            <ArrowLink href="/ueber-uns">Mehr über eCreator</ArrowLink>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
