import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow } from "@/components/ui/ButtonLink";

/* ==========================================================================
   Bausteine für Unterseiten. Bewusst wenige, flexible Teile.
   Layout-Variation entsteht durch die Seite, nicht durch den Baustein.
   ========================================================================== */

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  mode?: "office" | "studio" | "band";
  /** Abstand oben/unten (sec-s/m/l/xl), pro Seite bewusst mischen */
  space?: "s" | "m" | "l" | "xl";
  /** Linie oben: ink (Kapitelbeginn), line (Unterabschnitt), none */
  rule?: "ink" | "line" | "none";
  labelledBy?: string;
};

export function Section({ children, id, className = "", mode = "office", space = "m", rule = "line", labelledBy }: SectionProps) {
  const pad = { s: "sec-s", m: "sec-m", l: "sec-l", xl: "sec-xl" }[space];
  const bg = mode === "studio" ? "studio" : mode === "band" ? "bg-paper-2" : "";
  const border = rule === "ink" ? "border-t border-ink" : rule === "line" ? "border-t border-line" : "";
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${bg} ${border} ${className}`}>
      <div className={`wrap ${pad}`}>{children}</div>
    </section>
  );
}

type IntroProps = {
  meta?: string[];
  title: ReactNode;
  id?: string;
  children?: ReactNode;
  /** center: mittig wie auf der bisherigen Website (Standard) | left: linksbündig, z.B. neben einer Spalte */
  variant?: "center" | "left";
  as?: "h2" | "h3";
  className?: string;
};

/** Kopf eines Abschnitts: kleine Überzeile, Titel, ein kurzer Satz. */
export function SectionIntro({ meta, title, id, children, variant = "center", as: H = "h2", className = "" }: IntroProps) {
  const center = variant === "center";
  return (
    <div className={`mb-10 md:mb-14 ${center ? "mx-auto max-w-[46rem] text-center" : "max-w-[52rem]"} ${className}`}>
      {meta && <p className="label-pill mb-5">{meta.join(" · ")}</p>}
      <H id={id} className="t-h2" data-reveal>
        {title}
      </H>
      {children && (
        <div className={`t-lead mt-5 max-w-[52ch] text-grey-700 [text-wrap:pretty] [.studio_&]:text-grey-300 ${center ? "mx-auto" : ""}`}>
          {children}
        </div>
      )}
    </div>
  );
}

/** Runde Nummer (01, 02 …) als kleiner violetter Chip. Dekorativ: die Liste selbst trägt die Nummerierung. */
export function NumberChip({ n }: { n: number }) {
  return (
    <span
      aria-hidden
      className="tnum inline-flex h-9 w-9 flex-none items-center justify-center rounded-full bg-violet/10 text-[0.8125rem] font-semibold text-violet-deep [.studio_&]:bg-violet/20 [.studio_&]:text-violet-2"
    >
      {String(n).padStart(2, "0")}
    </span>
  );
}

/** Nummerierte Liste als Karten: Leistungen, Deliverables, Gründe. */
export function IndexList({
  items,
  columns = 1,
  numbered = true,
}: {
  items: { title: string; text?: ReactNode; meta?: string }[];
  columns?: 1 | 2;
  numbered?: boolean;
}) {
  return (
    <ol className={`grid gap-3 ${columns === 2 ? "md:grid-cols-2 md:gap-[var(--gutter)]" : ""}`}>
      {items.map((it, i) => (
        <li key={it.title} className="card flex gap-4 p-5 md:p-6">
          {numbered ? (
            <NumberChip n={i + 1} />
          ) : (
            <span aria-hidden className="mt-2 h-2 w-2 flex-none rounded-full bg-violet" />
          )}
          <div className="min-w-0">
            <h3 className="t-h4 pt-1.5">{it.title}</h3>
            {it.text && <div className="t-small mt-1.5 max-w-[56ch] text-grey-700 [.studio_&]:text-grey-300">{it.text}</div>}
            {it.meta && <p className="t-meta mt-2 text-grey-600 [.studio_&]:text-grey-400">{it.meta}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Schrittfolge (Ablauf) als Karten mit runder Nummer. Mobile: untereinander. */
export function Steps({ steps }: { steps: { title: string; text: ReactNode; meta?: string }[] }) {
  return (
    <ol className="grid gap-[var(--gutter)] md:grid-cols-2 lg:grid-flow-col lg:auto-cols-fr lg:grid-cols-none">
      {steps.map((s, i) => (
        <li key={s.title} className="card p-6">
          <NumberChip n={i + 1} />
          <h3 className="t-h4 mt-4">{s.title}</h3>
          <div className="t-small mt-2 text-grey-700 [.studio_&]:text-grey-300">{s.text}</div>
          {s.meta && <p className="t-meta mt-3 text-grey-600 [.studio_&]:text-grey-400">{s.meta}</p>}
        </li>
      ))}
    </ol>
  );
}

/** Datenblatt: Schlüssel / Wert, z.B. Dauer, Preis, Fertigstellung. Leichte Linien, passt in Karten. */
export function FactsTable({ rows, caption }: { rows: { k: string; v: ReactNode }[]; caption?: string }) {
  return (
    <dl>
      {caption && <p className="t-meta pb-3 text-grey-600 [.studio_&]:text-grey-400">{caption}</p>}
      {rows.map((r) => (
        <div key={r.k} className="grid grid-cols-[minmax(0,38%)_minmax(0,1fr)] gap-3 border-b border-line py-3.5 last:border-b-0">
          <dt className="t-meta min-w-0 hyphens-auto pt-[0.3em] text-grey-600 [overflow-wrap:anywhere] [.studio_&]:text-grey-400">{r.k}</dt>
          <dd className="t-body">{r.v}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Definition für Answer Engines: Begriff + präzise Antwort im ersten Satz, als Karte. */
export function Definition({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="card mx-auto max-w-[56rem] p-6 md:p-10">
      <p className="label-pill">Definition</p>
      <p className="t-h3 mt-5 max-w-[40ch]">
        <dfn className="not-italic">{term}</dfn>
      </p>
      <div className="t-lead mt-4 max-w-[58ch] text-grey-700 [.studio_&]:text-grey-300">{children}</div>
    </div>
  );
}

/**
 * Interne Verlinkung: verwandte Seiten.
 * list: eine Karte mit Zeilen und Pfeil-Knöpfen | grid: Label-Pille und 2 bis 4 Link-Karten nebeneinander.
 */
export function RelatedLinks({
  title = "Passt dazu",
  links,
  layout = "list",
}: {
  title?: string;
  links: readonly { label: string; href: string; text?: string }[];
  layout?: "list" | "grid";
}) {
  if (layout === "grid") {
    return (
      <div>
        <p className="mb-8 text-center">
          <span className="label-pill">{title}</span>
        </p>
        <ul className={`grid gap-4 sm:grid-cols-2 md:gap-5 ${links.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="card group flex h-full flex-col p-6 transition-transform duration-300 motion-safe:hover:-translate-y-0.5">
                <span className="flex items-start justify-between gap-4">
                  <span className="t-h4">{l.label}</span>
                  <Arrow className="mt-[0.45em] text-grey-500 transition-[color,transform] duration-300 group-hover:translate-x-1 group-hover:text-ink" />
                </span>
                {l.text && <span className="t-small mt-2 block text-grey-700 [.studio_&]:text-grey-300">{l.text}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div className="card p-6 md:p-8">
      <p className="t-h4">{title}</p>
      <ul className="mt-2">
        {links.map((l) => (
          <li key={l.href} className="border-b border-line last:border-b-0">
            <Link href={l.href} className="group flex items-center justify-between gap-6 py-4">
              <span>
                <span className="t-h4 block transition-colors group-hover:text-violet-deep [.studio_&]:group-hover:text-violet-2">
                  {l.label}
                </span>
                {l.text && <span className="t-small mt-1 block text-grey-600 [.studio_&]:text-grey-300">{l.text}</span>}
              </span>
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-line-strong transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                <Arrow className="h-2.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Sichtbarer, gestalteter Content-Platzhalter für fehlende Daten (klar als offen markiert). */
export function Todo({ children }: { children: ReactNode }) {
  return (
    <span className="hatch inline-flex items-center gap-2 rounded-lg border border-line-strong px-2.5 py-1 text-[0.8125rem] font-medium leading-snug text-grey-600 [.studio_&]:text-grey-400">
      <span aria-hidden className="inline-block h-2 w-2 rounded-full border border-current" />
      Platzhalter: {children}
    </span>
  );
}

/** Grosses Einzelzitat oder Statement ohne Kartenrahmen. */
export function Statement({ children, by }: { children: ReactNode; by?: ReactNode }) {
  return (
    <figure className="grid-12 gap-y-6">
      <blockquote className="t-h2 col-span-4 md:col-span-10 md:col-start-2">{children}</blockquote>
      {by && <figcaption className="t-meta col-span-4 text-grey-600 md:col-span-10 md:col-start-2">{by}</figcaption>}
    </figure>
  );
}
