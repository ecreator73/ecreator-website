import Image from "next/image";
import { cta } from "@/content/site";
import { visibleClientLogos as clientLogos } from "@/content/work";
import { ButtonLink } from "@/components/ui/ButtonLink";

/** Logos nach Fläche statt Höhe normalisieren, damit keins optisch dominiert. */
const logoSize = (w: number, h: number, area = 3300) => {
  const ratio = w / h;
  const width = Math.round(Math.sqrt(area * ratio));
  return { width, height: Math.round(width / ratio) };
};

/**
 * Hero wie auf der bisherigen ecreator.ch: dunkler Grund mit Netz, mittig gesetzt,
 * Versal-Headline mit Grauverlauf, Schreibschrift-Zeile, ein Satz, ein Button.
 * Danach, auf Creme, die Kunden.
 */
export function Hero() {
  return (
    <>
      <section className="intro relative -mt-[var(--header-h)] overflow-hidden bg-night text-paper" aria-labelledby="hero-title" data-hero-dark>
        <div aria-hidden className="hero-net absolute inset-0" />
        <div className="wrap relative flex min-h-[34rem] flex-col items-center justify-center pb-20 pt-[calc(var(--header-h)+4.5rem)] text-center md:pb-24 lg:min-h-[88svh]">
          <h1 id="hero-title">
            <span className="t-meta intro-fade mb-6 block text-grey-400">
              Marketingagentur für KMU in der Schweiz<span className="sr-only">:</span>
            </span>
            <span className="lines t-h1 block">
              <span className="ln">
                <span>Kunden</span>
              </span>{" "}
              <span className="ln">
                <span className="text-fade">statt Klicks.</span>
              </span>
            </span>
          </h1>
          <p className="t-script intro-fade mt-4 text-[2.25rem] text-grey-300 md:text-[3rem]" aria-hidden>
            We create customers, not clicks.
          </p>
          <p className="t-lead intro-fade-2 mt-7 max-w-[32rem] text-grey-300">
            Videos, Werbung, Website und CRM aus einem Team. Gemessen an neuen Kunden.
          </p>
          <div className="intro-fade-2 mt-9">
            <ButtonLink href={cta.primary.href} variant="paper" track="hero-primary">
              {cta.primary.label}
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Kunden, auf Creme wie die Logo-Reihe der bisherigen Website */}
      <div className="border-b border-line">
        <div className="wrap py-10 text-center md:py-12">
          <p className="t-meta text-grey-600">Kunden, Auswahl</p>
          <ul className="mt-7 grid grid-cols-3 items-center justify-items-center gap-x-6 gap-y-6 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-12">
            {clientLogos.map((l) => {
              const s = logoSize(l.w, l.h);
              return (
                <li key={l.name} className="opacity-75">
                  <Image src={l.src} alt={l.name} width={s.width} height={s.height} className="h-auto max-w-full" />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
