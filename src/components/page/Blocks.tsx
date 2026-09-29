import Link from "next/link";
import type { ReactNode } from "react";
import { Meta } from "@/components/ui/Meta";
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
      {meta && (
        <Meta className={`mb-4 text-grey-600 [.studio_&]:text-grey-400 ${center ? "justify-center" : ""}`} items={meta} />
      )}
      <H id={id} className="t-h2" data-reveal>
        {title}
      </H>
      {children && (
        <div className={`t-lead mt-5 max-w-[52ch] text-grey-700 [.studio_&]:text-grey-300 ${center ? "mx-auto" : ""}`}>
          {children}
        </div>
      )}
    </div>
  );
}

/** Nummerierte Liste mit Linien (Index-Stil): Leistungen, Deliverables, Gründe. */
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
    <ol className={`border-t border-ink ${columns === 2 ? "md:grid md:grid-cols-2 md:gap-x-[var(--gutter)]" : ""}`}>
      {items.map((it, i) => (
        <li key={it.title} className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-line py-5 md:grid-cols-[3.25rem_1fr]">
          <span className="t-meta pt-1.5 text-grey-600 [.studio_&]:text-grey-400">
            {numbered ? String(i + 1).padStart(2, "0") : "/"}
          </span>
          <div>
            <h3 className="t-h4">{it.title}</h3>
            {it.text && <div className="t-small mt-1.5 max-w-[56ch] text-grey-700 [.studio_&]:text-grey-300">{it.text}</div>}
            {it.meta && <p className="t-meta mt-2 text-grey-600 [.studio_&]:text-grey-400">{it.meta}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Horizontale Schrittfolge (Ablauf). Mobile: vertikal. */
export function Steps({ steps }: { steps: { title: string; text: ReactNode; meta?: string }[] }) {
  return (
    <ol className="grid border-t border-ink md:grid-cols-2 lg:grid-flow-col lg:auto-cols-fr lg:grid-cols-none">
      {steps.map((s, i) => (
        <li key={s.title} className="relative border-b border-line py-6 pr-6 md:border-b-0 md:border-l md:py-8 md:pl-6 md:first:border-l-0 md:first:pl-0">
          <p className="t-num text-[3.4rem] text-ink [.studio_&]:text-paper">{String(i + 1).padStart(2, "0")}</p>
          <h3 className="t-h4 mt-4">{s.title}</h3>
          <div className="t-small mt-2 text-grey-700 [.studio_&]:text-grey-300">{s.text}</div>
          {s.meta && <p className="t-meta mt-3 text-grey-600 [.studio_&]:text-grey-400">{s.meta}</p>}
        </li>
      ))}
    </ol>
  );
}

/** Datenblatt: Schlüssel / Wert, z.B. Dauer, Preis, Fertigstellung. */
export function FactsTable({ rows, caption }: { rows: { k: string; v: ReactNode }[]; caption?: string }) {
  return (
    <dl className="border-t border-ink">
      {caption && <p className="t-meta py-3 text-grey-600 [.studio_&]:text-grey-400">{caption}</p>}
      {rows.map((r) => (
        <div key={r.k} className="grid grid-cols-[minmax(7rem,38%)_1fr] gap-3 border-b border-line py-3.5">
          <dt className="t-meta pt-[0.3em] text-grey-600 [.studio_&]:text-grey-400">{r.k}</dt>
          <dd className="t-body">{r.v}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Definition für Answer Engines: Begriff + präzise Antwort im ersten Satz. */
export function Definition({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="grid-12 gap-y-4 border-y border-ink py-8 md:py-10">
      <p className="t-meta col-span-4 text-grey-600 md:col-span-3 [.studio_&]:text-grey-400">Definition</p>
      <div className="col-span-4 md:col-span-9">
        <p className="t-h3 max-w-[40ch]">
          <dfn className="not-italic">{term}</dfn>
        </p>
        <div className="t-lead mt-4 max-w-[58ch] text-grey-700 [.studio_&]:text-grey-300">{children}</div>
      </div>
    </div>
  );
}

/** Interne Verlinkung: verwandte Seiten als Index. */
export function RelatedLinks({ title = "Passt dazu", links }: { title?: string; links: { label: string; href: string; text?: string }[] }) {
  return (
    <div>
      <p className="t-meta mb-4 text-grey-600 [.studio_&]:text-grey-400">{title}</p>
      <ul className="border-t border-ink">
        {links.map((l) => (
          <li key={l.href} className="border-b border-line">
            <Link href={l.href} className="group flex items-baseline justify-between gap-6 py-5">
              <span>
                <span className="t-h3 block transition-colors group-hover:text-grey-600 [.studio_&]:group-hover:text-grey-300">
                  {l.label}
                </span>
                {l.text && <span className="t-small mt-1 block text-grey-700 [.studio_&]:text-grey-300">{l.text}</span>}
              </span>
              <Arrow className="h-3 w-5 text-grey-500 transition-transform group-hover:translate-x-1" />
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
    <span className="hatch t-meta inline-flex items-center gap-2 border border-line-strong px-2 py-1 text-grey-600 [.studio_&]:text-grey-400">
      <span aria-hidden className="inline-block h-2 w-2 border border-current" />
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
