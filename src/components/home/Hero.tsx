import Image from "next/image";
import { cta } from "@/content/site";
import { visibleClientLogos as clientLogos } from "@/content/work";
import { ButtonLink } from "@/components/ui/ButtonLink";

/** Logos nach Fläche statt Höhe normalisieren, damit keins optisch dominiert. */
const logoSize = (w: number, h: number, area = 2600) => {
  const ratio = w / h;
  const width = Math.round(Math.sqrt(area * ratio));
  return { width, height: Math.round(width / ratio) };
};

/** Belegte Kennzahlen (Case Finanzdienstleister, Preise aus offers.ts). */
const proof = [
  { value: "600", label: "Qualifizierte Leads in 3 Monaten" },
  { value: "CHF 10", label: "Pro Lead, vorher 45 bis 80" },
  { value: "CHF 1'990", label: "Einstiegspreis Content Day" },
];

/**
 * Hero: hell mit violettem Netz, mittig. Label, Headline mit Akzentwort, Schreibschrift-Zeile, ein Satz,
 * zwei Buttons, darunter belegte Kennzahlen und die Kunden als Logo-Kacheln.
 */
export function Hero() {
  return (
    <section className="intro relative -mt-[var(--header-h)] overflow-hidden" aria-labelledby="hero-title">
      <div aria-hidden className="hero-grid absolute inset-0" />
      <div className="wrap relative flex flex-col items-center pb-16 pt-[calc(var(--header-h)+4rem)] text-center md:pb-20 md:pt-[calc(var(--header-h)+6rem)]">
        <p className="label-pill intro-fade">Marketingagentur für KMU in der Schweiz</p>
        <h1 id="hero-title" className="lines t-h1 mt-6 text-[clamp(2.5rem,1.4rem+4.2vw,4.25rem)]">
          <span className="ln">
            <span>
              <span className="text-accent">Kunden</span> statt Klicks.
            </span>
          </span>
        </h1>
        <p className="t-script intro-fade mt-2 text-[2rem] text-grey-500 md:text-[2.6rem]" aria-hidden>
          We create customers, not clicks.
        </p>
        <p className="t-lead intro-fade-2 mt-6 max-w-[34rem] text-grey-600">
          Videos, Werbung, Website und CRM aus einem Team. Gemessen an neuen Kunden.
        </p>
        <div className="intro-fade-2 mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <ButtonLink href={cta.primary.href} track="hero-primary">
            {cta.primary.label}
          </ButtonLink>
          <ButtonLink href="/pakete" variant="line" track="hero-pakete">
            Pakete und Preise
          </ButtonLink>
        </div>

        {/* Vertrauensleiste: nur belegte Zahlen */}
        <dl className="intro-fade-2 mt-14 grid w-full max-w-[52rem] grid-cols-1 border-t border-line pt-8 sm:grid-cols-3">
          {proof.map((p, i) => (
            <div key={p.label} className={`flex flex-col-reverse items-center gap-0.5 py-2.5 sm:py-0 ${i > 0 ? "sm:border-l sm:border-line" : ""}`}>
              <dt className="t-meta text-grey-500">{p.label}</dt>
              <dd className="t-num">{p.value}</dd>
            </div>
          ))}
        </dl>

        {/* Kunden als Logo-Kacheln */}
        <div className="mt-12 w-full">
          <p className="t-meta text-grey-500">Kunden, Auswahl</p>
          <ul className="mx-auto mt-5 grid max-w-[60rem] grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {clientLogos.map((l) => {
              const s = logoSize(l.w, l.h);
              return (
                <li key={l.name} className="card flex h-20 items-center justify-center px-5 shadow-none">
                  <Image src={l.src} alt={l.name} width={s.width} height={s.height} className="h-auto max-h-11 w-auto max-w-full opacity-80" />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
