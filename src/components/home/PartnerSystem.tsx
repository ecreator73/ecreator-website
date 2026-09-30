import { homeSystem } from "@/content/pages/home";
import { withAccent } from "@/lib/accent";
import { ArrowLink } from "@/components/ui/ButtonLink";
import { CrmMockup } from "./CrmMockup";

/**
 * Warum unsere Partner glücklich sind: links das Versprechen mit Häkchen-Liste,
 * rechts eine Beispielansicht des CRM mit Kennzahlen, Leads pro Quelle und Pipeline.
 */
export function PartnerSystem() {
  const s = homeSystem;
  return (
    <section aria-labelledby="system-partner-title" className="sec-l">
      <div className="wrap">
        <div className="mx-auto mb-10 max-w-[46rem] text-center md:mb-14">
          <p className="label-pill">{s.label}</p>
          <h2 id="system-partner-title" className="t-h2 mt-4">
            {withAccent(s.title, s.accent)}
          </h2>
        </div>
        <div className="mx-auto grid max-w-[70rem] grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
          <div data-reveal>
            <h3 className="t-h3 md:text-[1.875rem]">{s.heading}</h3>
            <p className="t-lead mt-4 text-grey-600">{s.text}</p>
            <ul className="check-list mt-7 space-y-3">
              {s.points.map((p) => (
                <li key={p} className="t-body font-semibold text-ink">
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ArrowLink href={s.link.href}>{s.link.label}</ArrowLink>
            </div>
          </div>
          <CrmMockup />
        </div>
      </div>
    </section>
  );
}
