"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { stations, tracks } from "@/content/system";

/* Geometrie (viewBox 0..1000, Zentrum 500/500) */
const C = 500;
const RADII = [440, 385, 330, 275, 220]; // Content aussen … Daten innen
const BAND = 38;
const GAP_DEG = 22; // freier Bereich oben für die Ring-Beschriftung
const START = -90 + GAP_DEG / 2;
const SPAN = (360 - GAP_DEG) / stations.length;

const polar = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return [C + r * Math.cos(a), C + r * Math.sin(a)] as const;
};
const arc = (r: number, a0: number, a1: number) => {
  const [x0, y0] = polar(r, a0);
  const [x1, y1] = polar(r, a1);
  return `M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
};
const mid = (i: number) => START + SPAN * i + SPAN / 2;

/**
 * Kreislauf statt Timeline: 5 Ringe (Disziplinen) × 9 Sektoren (Stationen).
 * Desktop: Der Ring bleibt stehen (sticky), die aktive Station folgt dem Lesen der Liste
 * (IntersectionObserver auf der Bildschirmmitte). Kein Timer, keine Karussell-Steuerung.
 * Mobile: Ring statisch, Liste darunter.
 */
export function RingSystem() {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    let io: IntersectionObserver | undefined;
    const setup = () => {
      io?.disconnect();
      if (!mq.matches) return;
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              const i = Number((e.target as HTMLElement).dataset.i);
              if (!Number.isNaN(i)) setActive(i);
            }
          }
        },
        { rootMargin: "-48% 0px -48% 0px", threshold: 0 },
      );
      itemRefs.current.forEach((el) => el && io!.observe(el));
    };
    setup();
    mq.addEventListener("change", setup);
    return () => {
      io?.disconnect();
      mq.removeEventListener("change", setup);
    };
  }, []);

  const st = stations[active];

  return (
    <div className="grid-12 gap-y-12">
      {/* Ring */}
      <div className="col-span-4 md:col-span-8 md:col-start-3 lg:order-2 lg:col-span-6 lg:col-start-7">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+6vh)]">
          <figure className="relative mx-auto w-full max-w-[560px]">
            <svg viewBox="0 0 1000 1000" className="h-auto w-full" role="img" aria-label="Kreislauf: neun Stationen auf fünf Ringen">
              {/* Ring-Bänder (Grundfläche) */}
              {RADII.map((r) => (
                <circle key={r} cx={C} cy={C} r={r} fill="none" stroke="var(--color-ink)" strokeOpacity="0.05" strokeWidth={BAND} />
              ))}
              {/* Sektorgrenzen */}
              {stations.map((_, i) => {
                const a = START + SPAN * i;
                const [x0, y0] = polar(RADII[4] - BAND / 2 - 8, a);
                const [x1, y1] = polar(RADII[0] + BAND / 2 + 8, a);
                return <line key={i} x1={x0} y1={y0} x2={x1} y2={y1} stroke="var(--color-ink)" strokeOpacity="0.12" strokeWidth="1.5" />;
              })}
              {/* Clips */}
              {stations.map((s, i) =>
                tracks.map((t, ti) =>
                  s.clips[t.id] ? (
                    <path
                      key={`${s.n}-${t.id}`}
                      d={arc(RADII[ti], START + SPAN * i + 2.2, START + SPAN * (i + 1) - 2.2)}
                      fill="none"
                      strokeWidth={BAND - 6}
                      className="transition-[stroke] duration-500"
                      stroke={i === active ? "var(--color-violet)" : "var(--color-ink)"}
                      strokeOpacity={i === active ? 1 : 0.2}
                    />
                  ) : null,
                ),
              )}
              {/* Ring-Beschriftung oben (im freien Bereich) */}
              {tracks.map((t, ti) => (
                <text
                  key={t.id}
                  x={C}
                  y={C - RADII[ti] + 6}
                  textAnchor="middle"
                  className="fill-grey-600"
                  style={{ fontFamily: "var(--font-display)", fontSize: 17, letterSpacing: 1, textTransform: "uppercase" }}
                >
                  {t.label}
                </text>
              ))}
              {/* Stationsnummern */}
              {stations.map((s, i) => {
                const [x, y] = polar(RADII[0] + BAND / 2 + 30, mid(i));
                return (
                  <text
                    key={s.n}
                    x={x}
                    y={y + 7}
                    textAnchor="middle"
                    style={{ fontFamily: "var(--font-display)", fontSize: 21 }}
                    className={i === active ? "fill-ink" : "fill-grey-500"}
                  >
                    {s.n}
                  </text>
                );
              })}
              {/* Zeiger */}
              <g
                style={{ transform: `rotate(${mid(active) + 90}deg)`, transformOrigin: "500px 500px" }}
                className="transition-transform duration-700 ease-[var(--ease-cut)]"
              >
                <line x1={C} y1={C - 150} x2={C} y2={C - RADII[0] - BAND / 2 - 6} stroke="var(--color-violet)" strokeWidth="5" />
              </g>
            </svg>
            {/* Mitte: aktive Station (nur Desktop) */}
            <figcaption
              className="pointer-events-none absolute inset-[34%] hidden flex-col items-center justify-center text-center lg:flex"
              aria-live="polite"
            >
              <span className="t-num">{st.n}</span>
              <span className="t-meta mt-2 max-w-[16ch] text-grey-700">{st.title}</span>
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Stationen */}
      <ol className="col-span-4 md:col-span-12 lg:order-1 lg:col-span-5">
        {stations.map((s, i) => (
          <li
            key={s.n}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            data-i={i}
            className={`grid grid-cols-[2.6rem_1fr] gap-x-3 border-t border-line py-5 transition-colors duration-500 lg:grid-cols-[3rem_1fr] lg:py-6 ${
              i === active ? "lg:text-ink" : "lg:text-grey-500"
            }`}
          >
            <span className="t-num text-[1.25rem] lg:text-[1.5rem]">{s.n}</span>
            <div>
              <h3 className="t-h4 lg:t-h3">{s.title}</h3>
              <p className="t-small mt-2 max-w-[42ch] text-grey-700 lg:t-body">{s.text}</p>
              <p className="t-meta mt-3 hidden text-grey-600 lg:block">
                {tracks
                  .filter((t) => s.clips[t.id])
                  .map((t, k) => (
                    <span key={t.id}>
                      {k > 0 && " / "}
                      <Link href={t.href} className="hover:text-ink">
                        {t.label}: {s.clips[t.id]}
                      </Link>
                    </span>
                  ))}
              </p>
            </div>
          </li>
        ))}
        <li className="border-t border-line-strong pt-5">
          <p className="t-meta text-grey-600">Station 09 führt zurück zu 01. Ein System endet nicht.</p>
        </li>
      </ol>
    </div>
  );
}
