import Image from "next/image";
import { cta, partners } from "@/content/site";
import { visibleClientLogos as clientLogos } from "@/content/work";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { LogoMarquee } from "./LogoMarquee";

/**
 * Hero: hell mit violettem Netz, mittig. Headline mit Akzentwort, Schreibschrift-Zeile, Kernaussage,
 * zwei Buttons (Strategie-Call, Erfahrungen), darunter die Partner-Badges und die Kunden als Laufband.
 */
export function Hero() {
  return (
    <section className="intro relative -mt-[var(--header-h)] overflow-hidden" aria-labelledby="hero-title">
      <div aria-hidden className="hero-grid absolute inset-0" />
      <div className="wrap relative flex flex-col items-center pb-16 pt-[calc(var(--header-h)+4.5rem)] text-center md:pb-24 md:pt-[calc(var(--header-h)+7rem)]">
        <h1 id="hero-title" className="lines t-h1 text-[clamp(2.5rem,1.4rem+4.2vw,4.25rem)]">
          <span className="ln">
            <span>
              <span className="text-accent">Kunden</span> statt Klicks.
            </span>
          </span>
        </h1>
        <p className="t-script intro-fade mt-2 text-[2rem] text-grey-500 md:text-[2.6rem]" aria-hidden>
          We create customers, not clicks.
        </p>
        <p className="t-lead intro-fade-2 mt-6 max-w-[48rem] text-grey-600">
          <span className="font-medium text-ink md:block">Marketing soll kein Geld kosten. Es soll Geld bringen.</span>{" "}
          Wir bauen profitable Systeme zur Neukundengewinnung&nbsp;– messbar und skalierbar.
        </p>
        <div className="intro-fade-2 mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <ButtonLink href={cta.primary.href} track="hero-primary">
            {cta.primary.label}
          </ButtonLink>
          <ButtonLink href="#erfahrungen" variant="line" track="hero-erfahrungen">
            Erfahrungen
          </ButtonLink>
        </div>

        {/* Partner-Badges (siehe site.ts: nur mit aktivem Partnerstatus zeigen) */}
        <div className="intro-fade-2 mt-14 w-full max-w-[52rem] border-t border-line pt-8">
          <p className="t-meta text-grey-500">Partner</p>
          <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 md:gap-x-14">
            {partners.map((p) => (
              <li key={p.name}>
                <Image
                  src={p.src}
                  alt={p.name}
                  width={Math.round((p.w * 44) / p.h)}
                  height={44}
                  className="h-9 w-auto md:h-11"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Kunden als Laufband über die volle Breite */}
      <div className="relative pb-10 md:pb-12">
        <LogoMarquee logos={clientLogos} />
      </div>
    </section>
  );
}
