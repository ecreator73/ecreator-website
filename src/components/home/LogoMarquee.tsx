"use client";

import Image from "next/image";
import { useState } from "react";

type LogoItem = { name: string; src: string; color?: string; w: number; h: number };

/** Logos nach Fläche statt Höhe normalisieren, damit keins optisch dominiert. */
const logoSize = (w: number, h: number, area = 2600) => {
  const ratio = w / h;
  const width = Math.round(Math.sqrt(area * ratio));
  return { width, height: Math.round(width / ratio) };
};

/**
 * Kundenlogos als endloses Laufband, ohne Rahmen, mit weichen Rändern.
 * Die Liste läuft zweimal hintereinander (zweite Kopie aria-hidden), damit die Schleife nahtlos ist.
 * Pause per Knopf (WCAG 2.2.2) und beim Überfahren. Bei reduzierter Bewegung steht alles still und bricht um.
 * Beim Überfahren eines Logos erscheinen die Originalfarben (weisse Logos werden einfach schwarz).
 */
export function LogoMarquee({ logos, label = "Kunden, Auswahl" }: { logos: LogoItem[]; label?: string }) {
  const [paused, setPaused] = useState(false);

  const row = (hidden: boolean) => (
    <ul className="marquee-row" aria-hidden={hidden || undefined}>
      {logos.map((l) => {
        const s = logoSize(l.w, l.h);
        return (
          <li key={l.name} className="group relative flex flex-none items-center">
            <Image
              src={l.src}
              alt={hidden ? "" : l.name}
              width={s.width}
              height={s.height}
              className={`h-auto max-h-12 w-auto opacity-70 transition-opacity duration-300 ${l.color ? "group-hover:opacity-0" : "group-hover:opacity-100"}`}
            />
            {l.color && (
              <Image
                src={l.color}
                alt=""
                aria-hidden
                width={s.width}
                height={s.height}
                className="absolute left-0 top-1/2 h-auto max-h-12 w-auto -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="relative">
      <p className="t-meta text-center text-grey-500">{label}</p>
      <div className={`marquee mt-6 ${paused ? "is-paused" : ""}`}>
        <div className="marquee-track">
          {row(false)}
          {row(true)}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? "Logo-Laufband starten" : "Logo-Laufband anhalten"}
        className="marquee-toggle absolute right-[var(--margin)] top-0 flex h-8 w-8 items-center justify-center rounded-full border border-line-strong bg-white text-grey-600 transition-colors hover:text-ink"
      >
        {paused ? (
          <svg aria-hidden viewBox="0 0 12 14" className="ml-0.5 h-2.5 w-2">
            <path d="M0 0l12 7-12 7z" fill="currentColor" />
          </svg>
        ) : (
          <svg aria-hidden viewBox="0 0 10 12" className="h-2.5 w-2">
            <path d="M1 0v12M9 0v12" stroke="currentColor" strokeWidth="2.4" />
          </svg>
        )}
      </button>
    </div>
  );
}
