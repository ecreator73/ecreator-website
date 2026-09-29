"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { services } from "@/content/services";
import { tracks } from "@/content/system";
import { Arrow } from "@/components/ui/ButtonLink";

const DEFAULT = Math.max(
  0,
  services.findIndex((s) => s.preview?.type === "image"),
);

/**
 * Leistungen als Index. Desktop: Vorschau links (sticky) zeigt echtes Material
 * der Leistung unter dem Zeiger; ohne eigenes Material bleibt das letzte Bild stehen.
 * Mobile: nur Name + Pfeil, kompakt.
 */
export function ServiceIndex() {
  const [shown, setShown] = useState(DEFAULT);
  // Vorschau-Videos nur auf Desktop mit Hover und ohne reduced-motion laden
  const [canPreview, setCanPreview] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (hover: hover) and (prefers-reduced-motion: no-preference)");
    const set = () => setCanPreview(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  const current = services[shown];
  const track = tracks.find((t) => t.id === current.track);

  const hover = (i: number) => {
    if (services[i].preview) setShown(i);
  };

  return (
    <div className="grid-12 gap-y-6">
      {/* Vorschau (Desktop) */}
      <div className="hidden lg:col-span-4 lg:block">
        <div className="sticky top-[calc(var(--header-h)+2rem)]">
          <div className="relative aspect-[4/5] overflow-hidden bg-paper-2">
            {services.map((s, i) =>
              s.preview ? (
                <div
                  key={s.slug}
                  aria-hidden
                  className={`absolute inset-0 transition-opacity duration-500 ${shown === i ? "opacity-100" : "opacity-0"}`}
                >
                  {s.preview.type === "video" ? (
                    shown === i && canPreview ? (
                      <video className="h-full w-full object-cover" src={s.preview.src} poster={s.preview.poster} muted loop autoPlay playsInline preload="none" />
                    ) : shown === i ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={s.preview.poster} alt="" className="h-full w-full object-cover" loading="lazy" />
                    ) : null
                  ) : (
                    <Image src={s.preview.src} alt="" fill sizes="30vw" className="object-cover object-left-top" />
                  )}
                </div>
              ) : null,
            )}
          </div>
          <p className="t-meta mt-3 text-grey-600">
            {current.name} <span className="text-grey-400">/</span> Material aus echten Projekten
            {track && <span className="block text-grey-500">{track.detail}</span>}
          </p>
        </div>
      </div>

      <ol className="col-span-4 border-t border-ink md:col-span-12 lg:col-span-8">
        {services.map((s, i) => (
          <li key={s.slug} className="border-b border-line">
            <Link
              href={s.href}
              onMouseEnter={() => hover(i)}
              onFocus={() => hover(i)}
              className="group grid grid-cols-[2.2rem_1fr_auto] items-baseline gap-x-3 py-4 md:grid-cols-[3rem_1fr_auto] md:py-6"
            >
              <span className="t-meta text-grey-500">{s.n}</span>
              <span>
                <h3 className="t-h3 block transition-transform duration-500 ease-[var(--ease-cut)] group-hover:translate-x-1.5">
                  {s.name}
                </h3>
                <span className="t-small mt-2 hidden max-w-[56ch] text-grey-700 md:block">{s.short}</span>
                <span className="t-meta mt-2 hidden text-grey-500 md:block">{s.tags.join(" / ")}</span>
              </span>
              <Arrow className="h-3 w-5 self-center text-grey-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-ink" />
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
