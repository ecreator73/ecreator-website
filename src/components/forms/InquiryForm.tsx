"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useId, useRef, useState } from "react";
import { ANLIEGEN, type Anliegen } from "@/content/anliegen";
import { site } from "@/content/site";
import { BtnArrow } from "@/components/ui/ButtonLink";

type Status = "idle" | "sending" | "success" | "error" | "preview";
type Errors = Partial<Record<"anliegen" | "name" | "email" | "telefon" | "nachricht" | "datenschutz", string>>;

const isAnliegen = (v: string | null): v is Anliegen => !!v && ANLIEGEN.some((a) => a.value === v);

/**
 * Ein Formular für alle Anliegen. Vorwahl über ?anliegen=... (z.B. von «Content Day anfragen»).
 * Unkontrollierte Felder, Validierung beim Absenden, Fehlertexte direkt am Feld.
 */
export function InquiryForm({ defaultAnliegen = "strategie-call", source }: { defaultAnliegen?: Anliegen; source?: string }) {
  const params = useSearchParams();
  const fromQuery = params.get("anliegen");
  const initial = isAnliegen(fromQuery) ? fromQuery : defaultAnliegen;
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();
  const fid = (n: string) => `${uid}-${n}`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data: Record<string, unknown> = Object.fromEntries(fd.entries());
    data.datenschutz = fd.get("datenschutz") === "on";
    data.quelle = source ?? (typeof window !== "undefined" ? window.location.pathname + window.location.search : "");

    // Clientseitige Prüfung (Server prüft erneut)
    const next: Errors = {};
    if (String(data.name ?? "").trim().length < 2) next.name = "Bitte gib deinen Namen an.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(data.email ?? "").trim())) next.email = "Bitte gib eine gültige E-Mail-Adresse an.";
    if (String(data.nachricht ?? "").trim().length < 10) next.nachricht = "Ein, zwei Sätze zu deinem Anliegen helfen uns bei der Vorbereitung.";
    if (!data.datenschutz) next.datenschutz = "Bitte bestätige die Datenschutzerklärung.";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("success");
        formRef.current?.reset();
      } else if (json.preview) {
        // Vorschau-Deployment ohne Anfrage-Ziel: nichts geht verloren, Kontakt direkt anbieten
        setStatus("preview");
      } else {
        if (json.errors) setErrors(json.errors);
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="border-t border-ink pt-8">
        <p className="t-meta text-grey-600">Anfrage angekommen</p>
        <p className="t-h2 mt-6 max-w-[18ch]">Danke. Wir melden uns innerhalb von 24 Stunden.</p>
        <p className="t-lead mt-5 max-w-[46ch] text-grey-700">
          Wenn es eilt: ruf uns an unter{" "}
          <a href={site.phoneHref} className="link">
            {site.phone}
          </a>
          .
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="link t-small mt-8">
          Weitere Anfrage senden
        </button>
      </div>
    );
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={fid(`${k}-err`)} className="t-small mt-2 text-[#c2352b]">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof Errors) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? fid(`${k}-err`) : undefined,
  });

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid grid-cols-1 gap-x-[var(--gutter)] gap-y-8 md:grid-cols-2">
      <div className="md:col-span-2">
        <label htmlFor={fid("anliegen")} className="t-meta text-grey-600">
          Worum geht es?
        </label>
        <select id={fid("anliegen")} name="anliegen" defaultValue={initial} key={initial} className="field" {...aria("anliegen")}>
          {ANLIEGEN.map((a) => (
            <option key={a.value} value={a.value}>
              {a.label}
            </option>
          ))}
        </select>
        {err("anliegen")}
      </div>

      <div>
        <label htmlFor={fid("name")} className="t-meta text-grey-600">
          Name *
        </label>
        <input id={fid("name")} name="name" autoComplete="name" required className="field" {...aria("name")} />
        {err("name")}
      </div>
      <div>
        <label htmlFor={fid("firma")} className="t-meta text-grey-600">
          Firma
        </label>
        <input id={fid("firma")} name="firma" autoComplete="organization" className="field" />
      </div>
      <div>
        <label htmlFor={fid("email")} className="t-meta text-grey-600">
          E-Mail *
        </label>
        <input id={fid("email")} name="email" type="email" autoComplete="email" required className="field" {...aria("email")} />
        {err("email")}
      </div>
      <div>
        <label htmlFor={fid("telefon")} className="t-meta text-grey-600">
          Telefon (optional)
        </label>
        <input id={fid("telefon")} name="telefon" type="tel" autoComplete="tel" className="field" {...aria("telefon")} />
        {err("telefon")}
      </div>
      <div className="md:col-span-2">
        <label htmlFor={fid("nachricht")} className="t-meta text-grey-600">
          Nachricht *
        </label>
        <textarea
          id={fid("nachricht")}
          name="nachricht"
          rows={5}
          required
          className="field"
          placeholder="Was möchtest du erreichen? Gibt es schon Website, Kampagnen oder Material?"
          {...aria("nachricht")}
        />
        {err("nachricht")}
      </div>

      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={fid("website")}>Website</label>
        <input id={fid("website")} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="md:col-span-2">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="datenschutz"
            className="mt-1 h-5 w-5 flex-none accent-[var(--color-violet)]"
            {...aria("datenschutz")}
          />
          <span className="t-small text-grey-700">
            Ich bin einverstanden, dass eCreator meine Angaben zur Bearbeitung der Anfrage verwendet. Mehr in der{" "}
            <Link href="/datenschutz" className="link">
              Datenschutzerklärung
            </Link>
            .
          </span>
        </label>
        {err("datenschutz")}
      </div>

      <div className="flex flex-col items-start gap-4 md:col-span-2 sm:flex-row sm:items-center sm:gap-8">
        <button type="submit" className="btn btn-primary" disabled={status === "sending"} data-cta="inquiry-submit">
          <span>{status === "sending" ? "Wird gesendet …" : "Anfrage senden"}</span>
          <BtnArrow />
        </button>
        <p className="t-meta text-grey-600" aria-live="polite">
          {status === "preview"
            ? "In dieser Vorschau ist das Formular noch nicht aktiv. Schreib bitte an " + site.email + " oder ruf an: " + site.phone + "."
            : status === "error"
              ? "Das hat nicht geklappt. Bitte versuche es nochmals oder schreib an " + site.email + "."
              : "Antwort innerhalb von 24 Stunden."}
        </p>
      </div>
    </form>
  );
}
