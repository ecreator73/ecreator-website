import type { CSSProperties } from "react";
import { homeProblems, homeProblemsIntro, type HomeProblem } from "@/content/pages/home";
import { withAccent } from "@/lib/accent";
import { ArrowLink } from "@/components/ui/ButtonLink";
import { NumberChip } from "@/components/page/Blocks";

/** Stagger-Verzögerung für die kleinen Animationen in den Grafiken */
const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` }) as CSSProperties;

/**
 * Probleme der Kunden als 2×2-Karten: oben eine kleine Grafik, die das Problem zeigt
 * (animiert beim Sichtbarwerden), darunter die typischen Symptome mit rotem ✕ und ein Weg zur Lösung.
 */
export function ProblemGrid() {
  return (
    <section aria-labelledby="probleme-title" className="sec-l bg-paper-2">
      <div className="wrap">
        <div className="mx-auto mb-10 max-w-[46rem] text-center md:mb-14">
          <p className="label-pill">{homeProblemsIntro.label}</p>
          <h2 id="probleme-title" className="t-h2 mt-4">
            {withAccent(homeProblemsIntro.title, homeProblemsIntro.accent)}
          </h2>
          <p className="t-lead mx-auto mt-5 max-w-[52ch] text-grey-600">{homeProblemsIntro.text}</p>
        </div>
        <ul className="mx-auto grid max-w-[62rem] grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {homeProblems.map((p, i) => (
            <ProblemCard key={p.id} p={p} n={i + 1} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProblemCard({ p, n }: { p: HomeProblem; n: number }) {
  return (
    <li className="card flex flex-col p-3 sm:p-4">
      <div className="relative h-48 overflow-hidden rounded-2xl bg-paper-2 px-5 pb-5 pt-14" data-reveal="viz" aria-hidden>
        <span className="absolute left-4 top-4">
          <NumberChip n={n} />
        </span>
        {p.visual === "funnel" && <FunnelViz />}
        {p.visual === "inbox" && <InboxViz />}
        {p.visual === "quality" && <QualityViz />}
        {p.visual === "content" && <ContentViz />}
      </div>
      <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
        <h3 className="t-h3">{p.title}</h3>
        <ul className="mt-4 space-y-2.5">
          {p.points.map((pt) => (
            <li key={pt} className="t-small flex gap-2.5 text-grey-700">
              <XMark />
              <span>{pt}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-6">
          <ArrowLink href={p.link.href} className="text-[0.9375rem]">
            {p.link.label}
          </ArrowLink>
        </div>
      </div>
    </li>
  );
}

function XMark() {
  return (
    <span aria-hidden className="mt-[0.2em] flex h-4 w-4 flex-none items-center justify-center rounded-full bg-alert/12 text-alert">
      <svg viewBox="0 0 10 10" className="h-2 w-2">
        <path d="M2 2l6 6M8 2L2 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </span>
  );
}

/* ---------------------------------------------------------------- Grafiken (rein illustrativ, ohne Zahlen) */

/** Aufrufe der Videos und Besuche der Webseite sind da, Anfragen kommen kaum */
function FunnelViz() {
  const rows = [
    { label: "Aufrufe", w: "100%", tone: "bg-grey-300" },
    { label: "Besuche", w: "62%", tone: "bg-violet/60" },
    { label: "Anfragen", w: "5%", tone: "bg-alert" },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      {rows.map((r, i) => (
        <div key={r.label} className="grid grid-cols-[4.5rem_1fr] items-center gap-3">
          <span className="text-[0.8125rem] font-medium text-grey-600">{r.label}</span>
          <span className="h-4 rounded-full bg-white">
            <span className={`viz-grow block h-full rounded-full ${r.tone}`} style={{ width: r.w, ...d(i * 180) }} />
          </span>
        </div>
      ))}
    </div>
  );
}

/** Posteingang mit Anfragen, die liegen bleiben */
function InboxViz() {
  const rows = [
    { t: "Website-Anfrage", s: "3 Tage offen" },
    { t: "Rückruf-Wunsch", s: "niemand zuständig" },
    { t: "Instagram-Nachricht", s: "unbeantwortet" },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-2">
      {rows.map((r, i) => (
        <div key={r.t} className="viz-pop flex items-center gap-3 rounded-xl bg-white px-3 py-2 shadow-[0_1px_2px_rgb(11_29_63/0.06)]" style={d(i * 160)}>
          <span className="h-2 w-2 flex-none rounded-full bg-alert" />
          <span className="min-w-0 flex-1 truncate text-[0.8125rem] font-medium text-ink">{r.t}</span>
          <span className="flex-none text-[0.75rem] text-alert">{r.s}</span>
        </div>
      ))}
    </div>
  );
}

/** Viele Leads, wenige passende: im Raster sind nur einzelne Punkte grün */
function QualityViz() {
  const good = new Set([4, 17, 23]);
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <span className="text-[0.8125rem] font-medium text-grey-600">Eingehende Leads</span>
        <span className="flex gap-3 text-[0.75rem] text-grey-600">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-ok" />
            passend
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-alert/40" />
            unpassend
          </span>
        </span>
      </div>
      <div className="mt-3 grid grid-cols-14 gap-1.5 sm:gap-2">
        {Array.from({ length: 28 }, (_, i) => (
          <span
            key={i}
            className={`viz-pop aspect-square rounded-full ${good.has(i) ? "bg-ok ring-2 ring-ok/20" : "bg-alert/25"}`}
            style={d(i * 28)}
          />
        ))}
      </div>
    </div>
  );
}

/** Beiträge ohne einheitlichen Look (keine Wiedererkennung), mit Lücken im Rhythmus und kaum Reichweite */
function ContentViz() {
  const tiles = [
    { v: 0.22, tone: "bg-grey-300/70", shape: "rounded-md" },
    { v: 0.12, tone: "bg-violet/25", shape: "rounded-full" },
    null,
    { v: 0.18, tone: "bg-[#f0b429]/35", shape: "rounded-sm" },
    null,
    { v: 0.08, tone: "bg-[#1a73e8]/20", shape: "rounded-xl" },
  ];
  return (
    <div className="grid h-full grid-cols-6 items-center gap-2">
      {tiles.map((t, i) =>
        t === null ? (
          <span key={i} className="viz-pop flex aspect-[9/16] items-center justify-center rounded-lg border border-dashed border-grey-300" style={d(i * 110)}>
            <span className="text-[0.625rem] text-grey-400">leer</span>
          </span>
        ) : (
          <span key={i} className="viz-pop relative aspect-[9/16] overflow-hidden rounded-lg bg-white shadow-[0_1px_2px_rgb(11_29_63/0.06)]" style={d(i * 110)}>
            <span className={`absolute left-1/2 top-1.5 aspect-square w-[calc(100%-0.75rem)] -translate-x-1/2 ${t.shape} ${t.tone}`} />
            <span className="absolute bottom-1.5 left-1.5 right-1.5 h-1 rounded-full bg-paper-2">
              <span className="viz-grow block h-full rounded-full bg-alert/70" style={{ width: `${t.v * 100}%`, ...d(500 + i * 110) }} />
            </span>
          </span>
        ),
      )}
    </div>
  );
}
