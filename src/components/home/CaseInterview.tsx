"use client";

import { useRef } from "react";
import type { Testimonial } from "@/content/testimonials";
import { VideoFrame } from "@/components/ui/VideoFrame";

/**
 * Interview als Medienblock eines Case: Vorschau im Querformat (stumm, in Schleife), Name unten links auf einem
 * Verlauf, runder Play-Knopf in der Mitte. Der Knopf öffnet das ganze Interview mit Ton und Untertiteln in einem Dialog.
 */
export function CaseInterview({ t }: { t: Testimonial }) {
  const v = t.video!;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const open = () => {
    dialogRef.current?.showModal();
    videoRef.current?.play().catch(() => {});
  };
  const close = () => dialogRef.current?.close();

  return (
    <div className="relative">
      <VideoFrame
        src={v.loop ?? v.src}
        poster={v.loopPoster ?? v.poster}
        ratio="16 / 9"
        label={`Ausschnitt aus dem Video-Interview mit ${t.person}`}
        className="shadow-float"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 rounded-b-[var(--radius-media)] bg-gradient-to-t from-black/75 via-black/30 to-transparent"
      />
      <div className="pointer-events-none absolute bottom-4 left-4 right-16 text-white sm:bottom-6 sm:left-6">
        <p className="t-meta hidden items-center gap-2 text-white/85 sm:flex">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-violet" />
          Kundenstimme im Video
        </p>
        <p className="mt-1.5 font-display text-[clamp(1.125rem,1rem+0.6vw,1.5rem)] font-bold leading-tight">{t.person}</p>
        <p className="mt-0.5 text-[0.875rem] text-white/75">
          {t.role}
          <span className="hidden sm:inline">, {t.company}</span>
        </p>
      </div>
      <button
        type="button"
        onClick={open}
        className="absolute left-1/2 top-[42%] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-float transition duration-300 hover:scale-105 hover:bg-violet hover:text-white sm:top-1/2 sm:h-[4.5rem] sm:w-[4.5rem]"
        aria-haspopup="dialog"
        aria-label={`Interview mit ${t.person} abspielen, ${v.duration}, mit Ton und Untertiteln`}
      >
        <svg aria-hidden viewBox="0 0 12 14" className="ml-1 h-4 w-3.5">
          <path d="M0 0l12 7-12 7z" fill="currentColor" />
        </svg>
      </button>

      {/* Ganzes Interview: Querformat, mit Ton und Untertiteln. Schliessen per Knopf, Esc oder Klick daneben. */}
      <dialog
        ref={dialogRef}
        onClose={() => videoRef.current?.pause()}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        aria-label={`Video-Interview mit ${t.person}, ${t.company}`}
        className="m-auto w-[min(94vw,1100px)] max-w-none overflow-visible bg-transparent p-0 backdrop:bg-ink/80 backdrop:backdrop-blur-sm"
      >
        <div className="relative aspect-video overflow-hidden rounded-[var(--radius-card)] bg-black">
          <video ref={videoRef} className="h-full w-full" src={v.src} poster={v.poster} controls playsInline preload="none">
            {v.captions && <track kind="captions" src={v.captions} srcLang="de" label="Deutsch" default />}
          </video>
        </div>
        <button
          type="button"
          onClick={close}
          className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-paper text-ink shadow-float transition-colors hover:bg-violet hover:text-white"
          aria-label="Interview schliessen"
        >
          <svg aria-hidden viewBox="0 0 12 12" className="h-3 w-3">
            <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </dialog>
    </div>
  );
}
