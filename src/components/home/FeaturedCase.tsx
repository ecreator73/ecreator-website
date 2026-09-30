import { caseBySlug, displayClient } from "@/content/cases";
import { workById } from "@/content/work";
import { ArrowLink } from "@/components/ui/ButtonLink";
import { VideoFrame } from "@/components/ui/VideoFrame";

/**
 * Grösster belegter Proof: drei Zahlen, Vorgehen, ein Creative daraus.
 * Vorher/Nachher statt Füllzahlen. Quelle sichtbar. Kunde anonymisiert, bis die Freigabe vorliegt.
 */
export function FeaturedCase() {
  const c = caseBySlug("finanzdienstleister-lead-generierung")!;
  const creative = workById("steuern");
  const stats = [
    { value: "600", label: "qualifizierte Leads" },
    { value: "3", label: "Monate" },
    { value: "CHF 10", label: "pro Lead, vorher 45–80" },
  ];

  return (
    <section id="case" aria-labelledby="case-title" className="sec-l border-t border-line">
      <div className="wrap">
        <div className="mx-auto max-w-[46rem] text-center">
          <p className="label-pill">Case · {c.sector}</p>
          <h2 id="case-title" className="t-h2 mt-4">
            600 qualifizierte Leads in drei Monaten.
          </h2>
          <p className="t-lead mt-5 text-grey-700">
            {displayClient(c)}. {c.teaser}
          </p>
        </div>

        <dl className="card mx-auto mt-12 grid max-w-[56rem] sm:grid-cols-3">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col-reverse items-center gap-1 py-6 text-center ${i > 0 ? "border-t border-line sm:border-l sm:border-t-0" : ""}`}
            >
              <dt className="t-small text-grey-600">{s.label}</dt>
              <dd className="t-num">{s.value}</dd>
            </div>
          ))}
        </dl>

        <div className="grid-12 mt-14 items-center gap-y-10 md:mt-16">
          <div className="col-span-4 md:col-span-7 lg:col-span-5 lg:col-start-2">
            <ul className="space-y-6">
              {c.approach.map((a) => (
                <li key={a.title}>
                  <h3 className="t-h4">{a.title}</h3>
                  <p className="t-body mt-1.5 text-grey-700">{a.text}</p>
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <ArrowLink href={`/cases/${c.slug}`}>Ganzen Case lesen</ArrowLink>
            </div>
            <p className="t-small mt-6 max-w-[60ch] text-grey-600">
              Quelle: Case Study auf ecreator.ch, 21.02.2026. Zahlen laut eCreator, Kunde dort anonymisiert.
            </p>
          </div>

          <figure className="col-span-4 md:col-span-4 md:col-start-9 lg:col-span-3 lg:col-start-9">
            <VideoFrame src={creative.short} poster={creative.poster} label={`Social Ad, Thema ${creative.theme}`} />
            <figcaption className="t-meta mt-3 text-grey-600">
              Social Ad <span className="text-grey-400">/</span> Thema {creative.theme}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
