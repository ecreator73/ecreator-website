import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { VideoCollage } from "@/components/home/VideoCollage";
import { CaseStudies } from "@/components/home/CaseStudies";
import { ProblemGrid } from "@/components/home/ProblemGrid";
import { WhyClients } from "@/components/home/WhyClients";
import { Manifest } from "@/components/home/Manifest";
import { TeamPhoto } from "@/components/home/TeamPhoto";
import { SocialRecruiting } from "@/components/home/SocialRecruiting";
import { RingSystem } from "@/components/system/RingSystem";
import { RateCard } from "@/components/blocks/RateCard";
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
      {/* Case Studies direkt unter den Kundenlogos (Kundenwunsch 03.10.2026): Video und Ergebnisse, Ziel von «Erfahrungen» */}
      <CaseStudies />
      <VideoCollage />

      {/* Probleme der Kunden, dann warum Kunden kommen und bleiben (mit CRM-Beispielansicht und Wachstumspfad) */}
      <ProblemGrid />
      <WhyClients />

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
      <section aria-labelledby="system-title" className="sec-l overflow-x-clip">
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
          {/* Kreislauf auf dem violetten Netz */}
          <div className="relative isolate">
            <div aria-hidden className="net pointer-events-none absolute -inset-x-4 -inset-y-10 -z-10 sm:-inset-x-16 sm:-inset-y-16" />
            <RingSystem />
          </div>
        </div>
      </section>

      {/* Social Recruiting: kompakt, animierte Grafik vom Ad bis zum neuen Mitarbeiter */}
      <SocialRecruiting />

      {/* Team: ein gemeinsames Teamfoto (Bildplatz, bis das Foto da ist) */}
      <TeamPhoto />

      <FinalCta />
    </>
  );
}
