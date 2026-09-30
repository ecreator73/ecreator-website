"use client";

import { useRef } from "react";
import type { Testimonial } from "@/content/testimonials";
import { VideoFrame } from "@/components/ui/VideoFrame";

/**
 * Interview als Medienblock einer Case-Karte: scharfe Hochformat-Vorschau (stumm, in Schleife),
 * per Klick das ganze Interview im Querformat mit Ton und Untertiteln in einem Dialog.
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
        src={v.portraitLoop ?? v.loop ?? v.src}
        poster={v.portraitPoster ?? v.poster}
        label={`Ausschnitt aus dem Video-Interview mit ${t.person}`}
        className="shadow-float"
      />
      <span className="pointer-events-none absolute left-3 top-3 rounded-xl bg-ink/70 px-2.5 py-1.5 text-paper backdrop-blur-sm">
        <span className="block text-[0.875rem] font-semibold leading-tight">{t.person}</span>
        <span className="block text-[0.75rem] text-grey-300">{t.role}</span>
      </span>
      <button
        type="button"
        onClick={open}
        className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-paper py-1.5 pl-1.5 pr-3.5 text-ink shadow-float transition-colors hover:bg-violet hover:text-white"
        aria-haspopup="dialog"
        aria-label={`Interview mit ${t.person} abspielen, ${v.duration}, mit Ton und Untertiteln`}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full border-[1.5px] border-current">
          <svg aria-hidden viewBox="0 0 12 14" className="ml-0.5 h-3 w-2.5">
            <path d="M0 0l12 7-12 7z" fill="currentColor" />
          </svg>
        </span>
        <span className="text-[0.875rem] font-semibold">Interview ansehen</span>
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
