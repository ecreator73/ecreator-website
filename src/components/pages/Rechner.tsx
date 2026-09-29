"use client";

import { useEffect, useId, useState } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { cta } from "@/content/site";
import type { CalcField, rechnerPage } from "@/content/pages/rechner";

type Copy = (typeof rechnerPage)["calc"];
type FieldId = CalcField["id"];
type Values = Record<FieldId, string>;

/* ---------- Zahlen: Schweizer Schreibweise mit Apostroph, Punkt als Dezimalzeichen ---------- */

const group = (int: string) => int.replace(/\B(?=(\d{3})+(?!\d))/g, "'");

/** «3'000», «2.5», «1 200», «12,5» → Zahl. Leer → null, Unsinn → NaN */
function parse(raw: string): number | null {
  const s = raw.trim().replace(/[\s'’]/g, "").replace(",", ".");
  if (s === "") return null;
  if (!/^-?\d*\.?\d+$|^-?\d+\.?$/.test(s)) return Number.NaN;
  return Number(s);
}

/** Ganze Zahl mit Apostroph; unter 10 eine Nachkommastelle, damit kleine Werte nicht auf 0 fallen */
function fmt(n: number, { money = false }: { money?: boolean } = {}) {
  const decimals = !money && Math.abs(n) < 10 && Math.round(n * 10) % 10 !== 0 ? 1 : 0;
  const [i, d] = Math.abs(n).toFixed(decimals).split(".");
  return `${n < 0 ? "-" : ""}${group(i)}${d ? `.${d}` : ""}`;
}

/** Eingabe zurückschreiben: Tausender mit Apostroph, Nachkommastellen unverändert */
function plain(n: number) {
  const [i, d] = String(Math.abs(n)).split(".");
  return `${n < 0 ? "-" : ""}${group(i)}${d ? `.${d}` : ""}`;
}

const toInput = (n: number | null) => (n === null ? "" : plain(n));

function initialValues(fields: CalcField[]): Values {
  return Object.fromEntries(fields.map((f) => [f.id, toInput(f.example)])) as Values;
}

/**
 * Potenzialrechner als Datenblatt: links die Annahmen (.field), rechts die Rechnung mit t-num-Ergebnissen.
 * Ergebnis sofort sichtbar, kein Absenden, kein Lead-Gate. Alles pro Monat (FACTS N24).
 * Die Rechnung steht bei jedem Ergebnis dabei, damit niemand einer Blackbox glauben muss.
 */
export function Rechner({ copy }: { copy: Copy }) {
  const fields = copy.fields as CalcField[];
  const [values, setValues] = useState<Values>(() => initialValues(fields));
  const [touched, setTouched] = useState<Partial<Record<FieldId, boolean>>>({});
  const uid = useId();
  const fid = (id: string) => `${uid}-${id}`;

  /* Validierung */
  const parsed = Object.fromEntries(fields.map((f) => [f.id, parse(values[f.id])])) as Record<FieldId, number | null>;
  const errorOf = (f: CalcField): string | null => {
    const v = parsed[f.id];
    if (v === null) return f.optional ? null : copy.errors.invalid;
    if (Number.isNaN(v)) return copy.errors.invalid;
    if (f.id === "cpl" && v <= 0) return copy.errors.positive;
    if (f.max !== undefined && (v < 0 || v > f.max)) return copy.errors.percent;
    if (v < 0) return copy.errors.negative;
    return null;
  };
  const errors = Object.fromEntries(fields.map((f) => [f.id, errorOf(f)])) as Record<FieldId, string | null>;
  const valid = fields.every((f) => !errors[f.id]);

  /* Rechnung (monatlich, ohne ×12) */
  const budget = parsed.budget ?? 0;
  const cpl = parsed.cpl ?? 0;
  const quote = parsed.quote ?? 0;
  const perCustomer = parsed.revenue ?? 0;
  const fee = parsed.fee ?? 0;
  const hasFee = !!parsed.fee && parsed.fee > 0;

  const leads = valid ? budget / cpl : null;
  const customers = leads !== null ? leads * (quote / 100) : null;
  const revenue = customers !== null ? customers * perCustomer : null;
  const cost = customers !== null && customers > 0 ? (budget + fee) / customers : null;

  const show = (n: number | null, money = false) => (n === null || !Number.isFinite(n) ? "–" : fmt(n, { money }));

  /* Zusammenfassung für Screenreader, verzögert, damit nicht jeder Tastendruck angesagt wird */
  const summaryNow = valid
    ? copy.summary
        .replace("{leads}", show(leads))
        .replace("{customers}", show(customers))
        .replace("{revenue}", show(revenue, true))
    : copy.summaryInvalid;
  const [summary, setSummary] = useState("");
  useEffect(() => {
    const t = window.setTimeout(() => setSummary(summaryNow), 800);
    return () => window.clearTimeout(t);
  }, [summaryNow]);

  const set = (id: FieldId, v: string) => setValues((prev) => ({ ...prev, [id]: v }));
  const tidy = (id: FieldId) => {
    setTouched((t) => ({ ...t, [id]: true }));
    const v = parse(values[id]);
    if (v !== null && Number.isFinite(v)) set(id, plain(v));
  };
  const reset = () => {
    setValues(initialValues(fields));
    setTouched({});
  };

  const n = plain;

  return (
    <div className="grid-12 gap-y-14">
      {/* Annahmen */}
      <fieldset className="col-span-4 min-w-0 md:col-span-12 lg:col-span-5">
        <legend className="t-meta text-grey-600">{copy.inputsLabel}</legend>
        <p className="t-small mt-3 max-w-[46ch] text-grey-700">{copy.examplesNote}</p>

        <div className="mt-6 border-t border-ink">
          {fields.map((f) => {
            const err = errors[f.id];
            const showErr = !!err && (touched[f.id] || parsed[f.id] !== null);
            const isExample = f.example !== null && parsed[f.id] === f.example;
            const badge = f.optional ? null : isExample ? copy.exampleBadge : copy.ownBadge;
            return (
              <div key={f.id} className="border-b border-line py-5">
                <div className="flex items-baseline justify-between gap-4">
                  <label htmlFor={fid(f.id)} className="t-meta text-grey-600">
                    {f.label}
                    <span className="sr-only">{f.unit === "%" ? " in Prozent" : " in Franken"}</span>
                  </label>
                  {badge && (
                    <span
                      className={`t-meta rounded-full border px-2 py-0.5 ${isExample ? "border-line text-grey-600" : "border-ink text-ink"}`}
                    >
                      {badge}
                    </span>
                  )}
                </div>
                <div className="mt-1 flex items-baseline gap-3">
                  {f.unitPosition === "before" && (
                    <span aria-hidden className="t-meta flex-none text-grey-600">
                      {f.unit}
                    </span>
                  )}
                  <input
                    id={fid(f.id)}
                    name={f.id}
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    spellCheck={false}
                    value={values[f.id]}
                    placeholder={f.optional ? "–" : undefined}
                    onChange={(e) => set(f.id, e.target.value)}
                    onBlur={() => tidy(f.id)}
                    aria-invalid={showErr || undefined}
                    aria-describedby={`${fid(f.id)}-hint${showErr ? ` ${fid(f.id)}-err` : ""}`}
                    className="field t-num min-w-0 flex-1 leading-[1.1]"
                  />
                  {f.unitPosition === "after" && (
                    <span aria-hidden className="t-meta flex-none text-grey-600">
                      {f.unit}
                    </span>
                  )}
                </div>
                <p id={`${fid(f.id)}-hint`} className="t-small mt-2 max-w-[48ch] text-grey-600">
                  {f.hint}
                </p>
                {showErr && (
                  <p id={`${fid(f.id)}-err`} className="t-small mt-1 text-[#c2352b]">
                    {err}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <button type="button" onClick={reset} className="link t-small mt-3 inline-flex min-h-11 items-center">
          {copy.reset}
        </button>
      </fieldset>

      {/* Mobile: Ergebnis klebt unten, solange man die Annahmen bearbeitet (Duplikat, darum aria-hidden) */}
      <div
        aria-hidden
        className="sticky bottom-0 z-10 col-span-4 -mx-[var(--margin)] -my-7 border-t border-ink bg-paper px-[var(--margin)] py-3 md:col-span-12 lg:hidden"
      >
        <div className="flex items-baseline justify-between gap-4">
          <span className="t-meta text-grey-600">
            {copy.results.revenue} <span className="text-grey-400">/</span> Monat
          </span>
          <span className="flex min-w-0 items-baseline gap-2">
            <span className="t-meta text-grey-600">CHF</span>
            <span className="t-num leading-none">{show(revenue, true)}</span>
          </span>
        </div>
        <p className="t-meta mt-1 text-grey-600">
          {show(leads)} {copy.results.leads} <span className="text-grey-400">/</span> {show(customers)} {copy.results.customers}
        </p>
      </div>

      {/* Rechnung */}
      <section
        aria-labelledby={fid("result")}
        className="col-span-4 min-w-0 bg-paper-2 px-5 py-7 md:col-span-12 md:px-10 md:py-10 lg:col-span-7 lg:col-start-6 lg:self-start"
      >
        <h3 id={fid("result")} className="t-meta text-grey-600">
          {copy.resultsLabel}
        </h3>

        <dl className="mt-6 border-t border-ink">
          <ResultRow
            label={copy.results.leads}
            calc={valid ? `${n(budget)} ÷ ${n(cpl)}` : "–"}
            value={show(leads)}
          />
          <ResultRow
            label={copy.results.customers}
            calc={valid && leads !== null ? `${show(leads)} × ${n(quote)} %` : "–"}
            value={show(customers)}
          />
          {/* Umsatz: gleiche Zeile wie Leads und Kunden, nur mit kräftiger Linie darunter */}
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-x-4 border-b border-ink py-5">
            <dt className="min-w-0">
              <span className="t-h3 block">{copy.results.revenue}</span>
              <span className="t-meta mt-2 block text-grey-600">
                {valid && customers !== null ? `${show(customers)} × ${n(perCustomer)}` : "–"}
              </span>
            </dt>
            <dd className="t-num text-right [overflow-wrap:anywhere]">
              <span className="t-meta mr-2 align-middle text-grey-600">CHF</span>
              {show(revenue, true)}
            </dd>
          </div>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 border-b border-line py-4">
            <dt>
              <span className="t-small block font-semibold">{hasFee ? copy.results.costPerCustomerFee : copy.results.costPerCustomer}</span>
              <span className="t-meta mt-1 block text-grey-600">
                {valid && customers !== null
                  ? hasFee
                    ? `(${n(budget)} + ${n(fee)}) ÷ ${show(customers)}`
                    : `${n(budget)} ÷ ${show(customers)}`
                  : "–"}
              </span>
            </dt>
            <dd className="t-num text-right [overflow-wrap:anywhere]">
              <span className="t-meta mr-2 align-middle text-grey-600">CHF</span>
              {show(cost, true)}
            </dd>
          </div>
        </dl>

        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {summary}
        </p>

        <p className="t-small mt-6 max-w-[56ch] text-grey-700">
          {copy.disclaimer} {copy.rounding}
        </p>

        <div className="mt-8 border-t border-line pt-6">
          <ButtonLink href={cta.primary.href} track="rechner-result">
            {cta.primary.label}
          </ButtonLink>
          <p className="t-small mt-4 max-w-[46ch] text-grey-700">{copy.ctaNote}</p>
        </div>
      </section>
    </div>
  );
}

function ResultRow({ label, calc, value }: { label: string; calc: string; value: string }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-x-4 border-b border-line py-5">
      <dt className="min-w-0">
        <span className="t-h3 block">{label}</span>
        <span className="t-meta mt-2 block text-grey-600">{calc}</span>
      </dt>
      <dd className="t-num text-right [overflow-wrap:anywhere]">{value}</dd>
    </div>
  );
}
