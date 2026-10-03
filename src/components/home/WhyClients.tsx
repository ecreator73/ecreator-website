import type { CSSProperties } from "react";
import { homeWhy } from "@/content/pages/home";
import { cta } from "@/content/site";
import { withAccent } from "@/lib/accent";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { NumberChip } from "@/components/page/Blocks";
import { CrmMockup } from "./CrmMockup";

/** Stagger-Verzögerung für die Einblend-Animationen */
const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` }) as CSSProperties;

/**
 * Warum Kunden kommen und bleiben: drei Gründe links, daneben die CRM-Beispielansicht.
 * Darunter Punkt 04 als breite Karte mit schematischer Umsatz-Grafik (0 → Build → Grow → Scale → Keep growing).
 */
export function WhyClients() {
  const w = homeWhy;
  return (
    <section aria-labelledby="warum-title" className="sec-l overflow-x-clip">
      <div className="wrap">
        <div className="mx-auto mb-10 max-w-[46rem] text-center md:mb-14">
          <p className="label-pill">{w.label}</p>
          <h2 id="warum-title" className="t-h2 mt-4">
            {withAccent(w.title, w.accent)}
          </h2>
        </div>

        <div className="mx-auto grid max-w-[70rem] grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
          <ol className="divide-y divide-line" data-reveal>
            {w.reasons.map((r, i) => (
              <li key={r.kicker} className="flex gap-4 py-6 first:pt-0 last:pb-0 sm:gap-5">
                <NumberChip n={i + 1} />
                <div>
                  <p className="t-meta text-violet-deep">{r.kicker}</p>
                  <h3 className="t-h3 mt-1.5">{r.title}</h3>
                  <p className="t-body mt-2 text-grey-600">{r.text}</p>
                </div>
              </li>
            ))}
          </ol>
          {/* CRM-Ansicht auf dem violetten Netz, wie ein Produktbild */}
          <div className="relative isolate">
            <div aria-hidden className="net pointer-events-none absolute -inset-x-8 -inset-y-12 -z-10 sm:-inset-x-24 sm:-inset-y-24 lg:-inset-x-36 lg:-inset-y-28" />
            <CrmMockup />
          </div>
        </div>

        <GrowthCard />
      </div>
    </section>
  );
}

/** Punkt 04 als breite Karte: links Titel, Text und Button, rechts die Umsatz-Grafik */
function GrowthCard() {
  const g = homeWhy.growth;
  return (
    <article aria-labelledby="warum-wachstum" className="card mx-auto mt-10 max-w-[70rem] p-5 sm:p-8 md:mt-14 lg:p-10" data-reveal>
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <div className="flex items-center gap-3">
            <NumberChip n={homeWhy.reasons.length + 1} />
            <p className="t-meta text-violet-deep">{g.kicker}</p>
          </div>
          <h3 id="warum-wachstum" className="t-h2 mt-5 text-[clamp(1.5rem,1.1rem+1.4vw,2.125rem)]">
            {g.title}
          </h3>
          <p className="t-body mt-4 text-grey-600">{g.text}</p>
          <div className="mt-7">
            <ButtonLink href={cta.primary.href} track="warum-wachstum">
              {cta.primary.label}
            </ButtonLink>
          </div>
        </div>
        <RevenueChart />
      </div>
    </article>
  );
}

/**
 * Umsatz über die Phasen 0 → Build → Grow → Scale → Keep growing: Kurve mit Fläche, Punkte je Phase,
 * gestrichelte Verlängerung nach oben (es geht weiter). Schematisch und ohne Zahlen, so auch beschriftet.
 */
function RevenueChart() {
  const stages = homeWhy.growth.stages;
  const pts = stages.map((s, i) => [10 + i * 20, 100 - s.h] as const);
  const [lx, ly] = pts[pts.length - 1];
  const line = pts.map(([px, py]) => `${px},${py}`).join(" ");
  const area = `M${pts[0][0]},100 ${pts.map(([px, py]) => `L${px},${py}`).join(" ")} L${lx},100 Z`;
  return (
    <figure className="rounded-2xl bg-paper-2 p-4 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[0.875rem] font-semibold text-ink">Umsatz</span>
        <span className="flex items-center gap-1 rounded-full bg-ok/12 px-2.5 py-0.5 text-[0.75rem] font-semibold text-ok">
          <svg aria-hidden viewBox="0 0 10 10" className="h-2.5 w-2.5">
            <path d="M2 7l3-4 3 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          steigt
        </span>
      </div>

      <div className="relative mt-5 h-32 sm:h-36" data-reveal="viz" aria-hidden>
        {pts.map(([px], i) => (
          <span key={i} className="absolute inset-y-0 w-px bg-grey-300/50" style={{ left: `${px}%` }} />
        ))}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="viz-wipe absolute inset-0 h-full w-full" style={d(150)}>
          <defs>
            <linearGradient id="umsatz-flaeche" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--color-violet)" stopOpacity="0.3" />
              <stop offset="1" stopColor="var(--color-violet)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill="url(#umsatz-flaeche)" />
          <polyline
            points={line}
            fill="none"
            stroke="var(--color-violet-deep)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <line
            x1={lx}
            y1={ly}
            x2={98}
            y2={2}
            stroke="var(--color-violet-deep)"
            strokeWidth="2"
            strokeDasharray="3 4"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        {pts.map(([px, py], i) => (
          <span
            key={i}
            className={`viz-pop absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-violet-deep ${
              i === pts.length - 1 ? "bg-violet-deep ring-4 ring-violet/20" : "bg-white"
            }`}
            style={{ left: `${px}%`, top: `${py}%`, ...d(500 + i * 110) }}
          />
        ))}
        <span className="absolute inset-x-0 bottom-0 h-px bg-grey-300" />
      </div>

      <ol className="mt-3 grid grid-cols-5 text-center">
        {stages.map((s, i) => (
          <li
            key={s.label}
            className={`t-meta text-[0.625rem] leading-tight sm:text-[0.6875rem] ${i === stages.length - 1 ? "text-violet-deep" : "text-grey-600"}`}
          >
            {s.label}
          </li>
        ))}
      </ol>
      <figcaption className="mt-4 text-[0.75rem] text-grey-500">Schematische Darstellung</figcaption>
    </figure>
  );
}
