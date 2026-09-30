"use client";

import { useRef, useState } from "react";
import type { Testimonial } from "@/content/testimonials";

type Props = {
  t: Testimonial;
  headingLevel?: "h2" | "h3";
  /** Inhalt unter den Zitaten (z.B. CTA) */
  children?: React.ReactNode;
};

const toSeconds = (at: string) => {
  const [m, s] = at.split(":").map(Number);
  return m * 60 + s;
};

/**
 * Video-Testimonial als Vollbreite-Moment im Studio-Modus:
 * 16:9 über die ganze Breite, Bauchbinde wie im Original, Kernzitat gross,
 * wörtliche Auszüge mit Zeitmarke (springen an die Stelle), Untertitel.
 */
export function VideoTestimonial({ t, headingLevel = "h2", children }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const H = headingLevel;
  const v = t.video!;

  const play = (at?: string) => {
    const el = ref.current;
    if (!el) return;
    setStarted(true);
    el.controls = true;
    el.muted = false;
    if (at) el.currentTime = toSeconds(at);
    el.play().catch(() => {});
    if (at) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    }
  };

  return (
    <div>
      <div className="relative">
        <div className="relative aspect-video overflow-hidden rounded-[var(--radius-card)] bg-ink-2" data-reveal="cut">
          <video
            ref={ref}
            className="absolute inset-0 h-full w-full object-cover"
            poster={v.poster}
            preload="none"
            playsInline
            aria-label={`Video-Interview mit ${t.person}, ${t.company}`}
            onEnded={() => setStarted(false)}
          >
            <source src={v.src} type="video/mp4" />
            {v.captions && <track kind="captions" src={v.captions} srcLang="de" label="Deutsch" default />}
          </video>
          {!started && (
            <button
              type="button"
              onClick={() => play()}
              className="group absolute inset-0 flex flex-col justify-between p-4 text-left md:p-8"
              aria-label={`Interview mit ${t.person} abspielen, ${v.duration}, mit Ton und Untertiteln`}
            >
              <span className="t-meta self-start bg-ink/70 px-2 py-1 text-paper">Kundenstimme / Video-Interview</span>
              <span className="flex flex-wrap items-end justify-between gap-4">
                {/* Bauchbinde */}
                <span className="hidden rounded-xl bg-ink/75 px-3 py-2 text-paper backdrop-blur-sm md:block md:px-4 md:py-3">
                  <span className="block text-[0.95rem] font-semibold md:text-lg">{t.person}</span>
                  <span className="t-meta block text-grey-300">
                    {t.role}, {t.company}
                  </span>
                </span>
                <span className="flex items-center gap-3 rounded-full bg-paper py-2 pl-2 pr-4 text-ink shadow-float transition-colors group-hover:bg-violet group-hover:text-white">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] border-current">
                    <svg aria-hidden viewBox="0 0 12 14" className="ml-0.5 h-3.5 w-3">
                      <path d="M0 0l12 7-12 7z" fill="currentColor" />
                    </svg>
                  </span>
                  <span className="font-semibold">Interview ansehen</span>
                  <span className="t-meta opacity-70">{v.duration}</span>
                </span>
              </span>
            </button>
          )}
        </div>
      </div>

      <div className="grid-12 mt-12 gap-y-10 md:mt-16">
        <H className="t-h2 col-span-4 md:col-span-12 lg:col-span-8">
          «{t.quote}»
        </H>
        <div className="col-span-4 md:col-span-8 lg:col-span-4 lg:self-end">
          <p className="font-semibold">{t.person}</p>
          <p className="t-meta mt-1 text-grey-400">
            {t.role}, {t.company}
          </p>
          <p className="t-meta mt-4 text-grey-500">{t.source}</p>
        </div>
      </div>

      {t.more && (
        <ol className="mt-12 grid border-t border-line md:grid-cols-3" aria-label="Auszüge aus dem Interview">
          {t.more.map((m) => (
            <li key={m.at} className="border-b border-line md:border-b-0 md:border-l md:first:border-l-0">
              <button
                type="button"
                onClick={() => play(m.at)}
                aria-label={`Interview ab ${m.at} abspielen: ${m.text}`}
                className="group w-full py-5 text-left md:px-6 md:first:pl-0"
              >
                <span className="t-meta text-grey-400 group-hover:text-paper">Ab {m.at} ansehen →</span>
                <span className="t-lead mt-2 block text-grey-300 transition-colors group-hover:text-paper">«{m.text}»</span>
              </button>
            </li>
          ))}
        </ol>
      )}
      {children}
    </div>
  );
}
