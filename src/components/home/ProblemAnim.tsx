"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

const REDUCED = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (cb: () => void) => {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/**
 * Steuert die Schleifen-Animationen der Problem-Grafiken (CSS-Keyframes, Klassen pv-*):
 * startet, sobald die Karten im Bild sind, Pause-Knopf (WCAG 2.2.2),
 * bei reduzierter Bewegung kein Start, die Grafiken zeigen das fertige Bild.
 */
export function ProblemAnim({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  const [paused, setPaused] = useState(false);
  const reduced = useSyncExternalStore(subscribeReduced, () => window.matchMedia(REDUCED).matches, () => false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="pv relative mx-auto max-w-[62rem]"
      data-state={reduced ? "static" : run ? "run" : "idle"}
      data-paused={paused || undefined}
    >
      {children}
      {!reduced && (
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label={paused ? "Animationen abspielen" : "Animationen anhalten"}
          className="pv-toggle"
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
      )}
    </div>
  );
}
