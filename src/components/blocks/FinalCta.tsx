import Link from "next/link";
import { cta, site, strategyCall } from "@/content/site";
import { corePeople } from "@/content/team";
import { RingArrow } from "@/components/ui/ButtonLink";

type FinalCtaProps = {
  /** Headline in zwei Zeilen */
  title?: [string, string];
  text?: string;
  /** Optionaler kontextueller Zweit-CTA (z.B. Content Day anfragen) */
  secondary?: { label: string; href: string };
};

/**
 * Der violette Abschlussblock: die einzige grosse Violett-Fläche jeder Seite.
 * Persönlich über Namen und die direkte Nummer, eine klare Handlung, Risiko sichtbar klein.
 */
export function FinalCta({
  title = ["Lass uns über deine", "nächsten Kunden reden."],
  text = "Kostenlos, per Video-Call. Wir schauen uns an, wo du stehst, was fehlt und was sich lohnt. Du gehst mit einer Prioritätenliste für die nächsten vier Wochen raus.",
  secondary,
}: FinalCtaProps) {
  const names = corePeople.filter((p) => ["claudio", "fabian"].includes(p.id)).map((p) => p.name);
  return (
    <section aria-labelledby="final-cta" className="relative overflow-hidden bg-violet text-ink">
      <div className="wrap grid-12 sec-m gap-y-12">
        <div className="col-span-4 md:col-span-12 lg:col-span-8">
          <p className="t-meta">Strategie-Call</p>
          <h2 id="final-cta" className="t-h2 mt-6">
            <span className="block">{title[0]}</span> <span className="block">{title[1]}</span>
          </h2>
          <p className="t-lead mt-6 max-w-[42ch]">{text}</p>
          <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Link href={cta.primary.href} className="btn btn-ink" data-cta="final">
              <span>{cta.primary.label}</span>
              <RingArrow />
            </Link>
            {secondary && (
              <Link href={secondary.href} className="btn border border-ink/40 hover:border-ink">
                <span>{secondary.label}</span>
                <RingArrow />
              </Link>
            )}
          </div>
          <p className="t-small mt-5">{strategyCall.promises.join(". ")}.</p>
        </div>

        <div className="col-span-4 flex flex-col justify-end md:col-span-12 lg:col-span-4">
          <p className="t-meta">Lieber direkt anrufen</p>
          <a href={site.phoneHref} className="t-num mt-2 block hover:underline" data-cta="final-phone">
            {site.phone.replace("+41 ", "0")}
          </a>
          <p className="t-meta mt-4 border-t border-ink/30 pt-4">Geschäftsführung: {names.join(" / ")}</p>
          <a href={`mailto:${site.email}`} className="t-body mt-1 inline-flex min-h-11 items-center underline-offset-4 hover:underline">
            {site.email}
          </a>
        </div>
      </div>
    </section>
  );
}
