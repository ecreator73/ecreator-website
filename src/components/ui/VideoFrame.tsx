"use client";

import { useEffect, useRef, useState } from "react";

type VideoFrameProps = {
  src: string;
  poster?: string;
  /** CSS aspect-ratio, z.B. "9 / 16" */
  ratio?: string;
  label: string;
  className?: string;
  /** "ambient": stumm, läuft nur sichtbar, mit Pause-Knopf. "player": Klick startet mit Ton. */
  mode?: "ambient" | "player";
  priority?: boolean;
};

/**
 * Video ohne Mockup-Rahmen.
 * Ambient: stumm, läuft nur solange sichtbar, eigener Pause-Knopf (WCAG 2.2.2).
 * Bei prefers-reduced-motion startet nichts automatisch.
 */
export function VideoFrame({
  src,
  poster,
  ratio = "9 / 16",
  label,
  className = "",
  mode = "ambient",
  priority,
}: VideoFrameProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [running, setRunning] = useState(false);
  const [withSound, setWithSound] = useState(false);
  const userPaused = useRef(false);

  useEffect(() => {
    const v = ref.current;
    if (!v || mode !== "ambient") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Reduzierte Bewegung: nichts startet automatisch, der Knopf zeigt «abspielen»
    if (reduce) {
      userPaused.current = true;
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPaused.current) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [mode]);

  // Player: beim Verlassen des Viewports anhalten
  useEffect(() => {
    const v = ref.current;
    if (!v || mode !== "player") return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && !v.paused) v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, [mode]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      setPaused(false);
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      setPaused(true);
      v.pause();
    }
  };

  const startWithSound = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = false;
    v.controls = true;
    setWithSound(true);
    v.play().catch(() => {});
  };

  return (
    <div className={`relative overflow-hidden rounded-[var(--radius-media)] bg-ink-2 ${className}`} style={{ aspectRatio: ratio }}>
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        poster={poster}
        muted={!withSound}
        loop={mode === "ambient"}
        playsInline
        preload={priority ? "metadata" : "none"}
        aria-label={label}
        onPlay={() => setRunning(true)}
        onPause={() => setRunning(false)}
      />
      {mode === "player" && !withSound && (
        <button
          type="button"
          onClick={startWithSound}
          className="group absolute inset-0 flex items-start justify-start p-3 text-left focus-visible:outline-offset-[-6px] focus-visible:outline-paper md:p-4"
          aria-label={`${label} abspielen (mit Ton)`}
        >
          <span className="flex items-center gap-2.5 rounded-full bg-paper py-1.5 pl-1.5 pr-3.5 text-ink shadow-float transition-colors group-hover:bg-violet group-hover:text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border-[1.5px] border-current">
              <svg aria-hidden viewBox="0 0 12 14" className="ml-0.5 h-3 w-2.5">
                <path d="M0 0l12 7-12 7z" fill="currentColor" />
              </svg>
            </span>
            <span className="t-meta">Mit Ton ansehen</span>
          </span>
        </button>
      )}
      {mode === "ambient" && (
        <button
          type="button"
          onClick={toggle}
          aria-label={paused || !running ? `${label} abspielen` : `${label} pausieren`}
          aria-pressed={paused}
          className="absolute bottom-1 right-1 flex h-11 w-11 items-center justify-center focus-visible:outline-offset-[-4px] focus-visible:outline-paper"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink/55 text-paper">
            {paused || !running ? (
              <svg aria-hidden viewBox="0 0 12 14" className="ml-0.5 h-2.5 w-2">
                <path d="M0 0l12 7-12 7z" fill="currentColor" />
              </svg>
            ) : (
              <svg aria-hidden viewBox="0 0 10 12" className="h-2.5 w-2">
                <path d="M1 0v12M9 0v12" stroke="currentColor" strokeWidth="2.4" />
              </svg>
            )}
          </span>
        </button>
      )}
    </div>
  );
}
