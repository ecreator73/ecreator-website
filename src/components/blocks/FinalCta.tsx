import Image from "next/image";
import Link from "next/link";
import { cta, site, strategyCall } from "@/content/site";
import { corePeople } from "@/content/team";
import { BtnArrow } from "@/components/ui/ButtonLink";

type FinalCtaProps = {
  /** Headline in zwei Zeilen */
  title?: [string, string];
  text?: string;
  /** Optionaler kontextueller Zweit-CTA (z.B. Content Day anfragen) */
  secondary?: { label: string; href: string };
};

/**
 * Abschluss jeder Seite: dunkles, abgerundetes Panel mit violettem Schimmer.
 * Persönlich über die Gesichter, die Namen und die direkte Nummer. Eine klare Handlung, Risiko sichtbar klein.
 */
export function FinalCta({
  title = ["Lass uns über deine", "nächsten Kunden reden."],
  text = "Kostenlos, per Video-Call. Wir schauen uns an, wo du stehst, was fehlt und was sich lohnt. Du gehst mit einer Prioritätenliste für die nächsten vier Wochen raus.",
  secondary,
}: FinalCtaProps) {
  const leads = corePeople.filter((p) => ["claudio", "fabian"].includes(p.id)).map((p) => p.name);
  return (
    <section aria-labelledby="final-cta" className="studio mb-3">
      <div className="wrap grid-12 sec-m gap-y-12">
        <div className="col-span-4 md:col-span-12 lg:col-span-7">
          <p className="label-pill">Strategie-Call</p>
          <h2 id="final-cta" className="t-h2 mt-6">
            <span className="block">{title[0]}</span> <span className="block text-violet-2">{title[1]}</span>
          </h2>
          <p className="t-lead mt-6 max-w-[42ch] text-grey-300">{text}</p>
          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <Link href={cta.primary.href} className="btn btn-paper" data-cta="final">
              <span>{cta.primary.label}</span>
              <BtnArrow />
            </Link>
            {secondary && (
              <Link href={secondary.href} className="btn btn-line">
                <span>{secondary.label}</span>
                <BtnArrow />
              </Link>
            )}
          </div>
          <p className="t-small mt-5 text-grey-400">{strategyCall.promises.join(". ")}.</p>
        </div>

        {/* Die Menschen dahinter + direkter Draht */}
        <div className="col-span-4 md:col-span-12 lg:col-span-4 lg:col-start-9 lg:self-end">
          <div className="card p-6 md:p-7">
            <ul className="flex -space-x-3" aria-label="Team">
              {corePeople.map((p) =>
                p.portrait ? (
                  <li key={p.id} className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-night">
                    <Image
                      src={p.portrait}
                      alt={p.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                      style={p.objectPosition ? { objectPosition: p.objectPosition } : undefined}
                    />
                  </li>
                ) : null,
              )}
            </ul>
            <p className="t-small mt-5 text-grey-300">Lieber direkt anrufen</p>
            <a href={site.phoneHref} className="t-num mt-1 block hover:underline" data-cta="final-phone">
              {site.phone.replace("+41 ", "0")}
            </a>
            <p className="t-small mt-4 border-t border-line pt-4 text-grey-400">Geschäftsführung: {leads.join(" / ")}</p>
            <a href={`mailto:${site.email}`} className="t-body mt-1 inline-flex min-h-11 items-center underline-offset-4 hover:underline">
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
