import { homeRecruiting } from "@/content/pages/home";
import { withAccent } from "@/lib/accent";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { RecruitingFlow } from "./RecruitingFlow";

/**
 * Social Recruiting auf der Startseite: kompakt, die animierte Grafik ist der Held der Section.
 * Beim Scrollen bleibt die Grafik stehen und erzählt den Ablauf (Desktop: Text links bleibt mit stehen).
 * Kein Preis, keine Pakete, keine Feature-Liste: die Details stehen auf /social-recruiting.
 */
export function SocialRecruiting() {
  const r = homeRecruiting;
  return (
    <section aria-labelledby="recruiting-title" className="sec-l border-t border-line">
      {/* Handy und Tablet: Text, Grafik, Button untereinander. Desktop: Text und Button links, Grafik rechts. */}
      <div className="wrap grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] xl:gap-14">
        <div>
          <div className="max-w-[34rem] xl:sticky xl:top-[max(calc(var(--header-h)+2rem),calc(50svh-10.5rem))]">
            <p className="label-pill">{r.label}</p>
            <h2 id="recruiting-title" className="t-h2 mt-4">
              {withAccent(r.title, r.accent)}
            </h2>
            <p className="t-lead mt-5 text-grey-600">{r.text}</p>
            <div className="mt-8 hidden xl:block">
              <ButtonLink href={r.cta.href} variant="line" track="recruiting">
                {r.cta.label}
              </ButtonLink>
            </div>
          </div>
        </div>

        <RecruitingFlow steps={r.steps} />

        <div className="xl:hidden">
          <ButtonLink href={r.cta.href} variant="line" track="recruiting">
            {r.cta.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
