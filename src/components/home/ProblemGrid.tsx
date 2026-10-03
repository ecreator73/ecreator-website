import type { CSSProperties } from "react";
import { homeCplAverage, homeProblems, homeProblemsIntro, type HomeProblem } from "@/content/pages/home";
import { withAccent } from "@/lib/accent";
import { ArrowLink } from "@/components/ui/ButtonLink";
import { NumberChip } from "@/components/page/Blocks";
import { ProblemAnim } from "./ProblemAnim";

/** Reihenfolge eines Elements in seiner Grafik (für die gestaffelte Schleife, Klassen pv-*) */
const nth = (i: number) => ({ ["--i" as string]: i }) as CSSProperties;

/**
 * Probleme der Kunden als 2×2-Karten: oben eine kleine Grafik, die das Problem in einer Schleife zeigt
 * (Timer, startet sichtbar, Pause-Knopf in ProblemAnim), darunter die typischen Symptome mit rotem ✕
 * und ein Weg zur Lösung.
 */
export function ProblemGrid() {
  return (
    <section aria-labelledby="probleme-title" className="sec-l relative isolate bg-paper-2">
      {/* Netz über die ganze Section: hinter Titel, Karten und Zwischenräumen, zu den Rändern weich auslaufend */}
      <div aria-hidden className="net pointer-events-none absolute inset-0 -z-10 [--net-at:50%_42%] [--net-line:0.17] [--net-size:80%_74%]" />
      <div className="wrap">
        <div className="mx-auto mb-10 max-w-[46rem] text-center md:mb-14">
          <p className="label-pill">{homeProblemsIntro.label}</p>
          <h2 id="probleme-title" className="t-h2 mt-4">
            {withAccent(homeProblemsIntro.title, homeProblemsIntro.accent)}
          </h2>
          <p className="t-lead mx-auto mt-5 max-w-[52ch] text-grey-600">{homeProblemsIntro.text}</p>
        </div>
        <ProblemAnim>
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            {homeProblems.map((p, i) => (
              <ProblemCard key={p.id} p={p} n={i + 1} />
            ))}
          </ul>
        </ProblemAnim>
      </div>
    </section>
  );
}

function ProblemCard({ p, n }: { p: HomeProblem; n: number }) {
  return (
    <li className="card flex flex-col p-3 sm:p-4">
      <div
        className="relative h-48 overflow-hidden rounded-2xl bg-paper-2 px-5 pb-5 pt-14"
        style={{ ["--off" as string]: `${(n - 1) * 0.6}s` } as CSSProperties}
        aria-hidden
      >
        <span className="absolute left-4 top-4">
          <NumberChip n={n} />
        </span>
        {p.visual === "funnel" && <FunnelViz />}
        {p.visual === "cost" && <CostViz />}
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

/* ---------------------------------------------------------------- Grafiken (illustrativ; Zahl nur beim Ø CPL) */

/** Aufrufe und Besuche sind da (Schimmer = Bewegung), der Anfragen-Balken bleibt winzig und pulsiert rot */
function FunnelViz() {
  const rows = [
    { label: "Aufrufe", w: "100%", tone: "bg-grey-300 pv-shine" },
    { label: "Besuche", w: "62%", tone: "bg-violet/60 pv-shine" },
    { label: "Anfragen", w: "5%", tone: "bg-alert pv-pulse" },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      {rows.map((r, i) => (
        <div key={r.label} className="grid grid-cols-[4.5rem_1fr] items-center gap-3">
          <span className="text-[0.8125rem] font-medium text-grey-600">{r.label}</span>
          <span className="h-4 rounded-full bg-white">
            <span className={`pv-bar relative block h-full overflow-hidden rounded-full ${r.tone}`} style={{ width: r.w, ...nth(i) }} />
          </span>
        </div>
      ))}
    </div>
  );
}

/** Kosten pro Lead steigen (rote Kurve), tief darunter die violette Linie: Ø CHF 12 bei unseren Kunden */
function CostViz() {
  const line = "M0 88 L50 82 L100 84 L150 66 L200 58 L250 34 L300 14";
  return (
    <div className="relative h-full">
      <div className="absolute left-0 top-0">
        <span className="block text-[0.8125rem] font-medium text-grey-600">Kosten pro Lead</span>
        {/* Legende statt Label an der Linie: die steigende Kurve kreuzt sonst den Text */}
        <span className="pv-bench-label mt-1 flex items-center gap-1.5 text-[0.6875rem] font-semibold text-violet-deep">
          <span className="w-4 border-t-2 border-dashed border-violet" />
          {homeCplAverage.label}
        </span>
      </div>
      <span className="pv-badge absolute right-0 top-0 flex items-center gap-1 rounded-full bg-alert/12 px-2 py-0.5 text-[0.75rem] font-semibold text-alert">
        <svg aria-hidden viewBox="0 0 10 10" className="h-2.5 w-2.5">
          <path d="M2 7l3-4 3 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        steigt
      </span>
      <svg viewBox="0 0 300 100" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[64%] w-full overflow-visible">
        <path d="M0 99.5H300" stroke="rgb(29 29 31 / 0.12)" strokeWidth="1" />
        <path d={`${line} L300 100 L0 100 Z`} className="pv-area fill-alert/10" />
        <path d={line} pathLength={1} className="pv-draw stroke-alert" fill="none" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      <span className="pv-bench absolute inset-x-0 bottom-[13%] border-t-2 border-dashed border-violet" />
    </div>
  );
}

/** Viele Leads, wenige passende: Punkte kommen herein, dann wird sichtbar, dass nur einzelne passen (grün) */
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
            className={`pv-q aspect-square rounded-full ${good.has(i) ? "pv-q-good bg-ok ring-2 ring-ok/20" : "bg-alert/25"}`}
            style={nth(i)}
          />
        ))}
      </div>
    </div>
  );
}

/** Beiträge erscheinen unregelmässig und ohne einheitlichen Look, die Reichweite bleibt klein */
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
          <span key={i} className="pv-tile flex aspect-[9/16] items-center justify-center rounded-lg border border-dashed border-grey-300" style={nth(i)}>
            <span className="text-[0.625rem] text-grey-400">leer</span>
          </span>
        ) : (
          <span key={i} className="pv-tile relative aspect-[9/16] overflow-hidden rounded-lg bg-white shadow-[0_1px_2px_rgb(11_29_63/0.06)]" style={nth(i)}>
            <span className={`absolute left-1/2 top-1.5 aspect-square w-[calc(100%-0.75rem)] -translate-x-1/2 ${t.shape} ${t.tone}`} />
            <span className="absolute bottom-1.5 left-1.5 right-1.5 h-1 rounded-full bg-paper-2">
              <span className="pv-reach block h-full rounded-full bg-alert/70" style={{ width: `${t.v * 100}%`, ...nth(i) }} />
            </span>
          </span>
        ),
      )}
    </div>
  );
}
