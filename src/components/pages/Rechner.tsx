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
 * Potenzialrechner als zwei Karten: links die Annahmen (.field), rechts die Rechnung als Kacheln wie ein Cockpit.
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
    <div className="grid-12 items-start gap-y-5 md:gap-y-6">
      {/* Annahmen */}
      <div className="card col-span-4 min-w-0 p-6 md:col-span-12 md:p-8 lg:col-span-5">
        <fieldset className="min-w-0">
          <legend className="t-h4">{copy.inputsLabel}</legend>
          <p className="t-small mt-2 max-w-[46ch] text-grey-600">{copy.examplesNote}</p>

          <div className="mt-5">
            {fields.map((f) => {
              const err = errors[f.id];
              const showErr = !!err && (touched[f.id] || parsed[f.id] !== null);
              const isExample = f.example !== null && parsed[f.id] === f.example;
              const badge = f.optional ? null : isExample ? copy.exampleBadge : copy.ownBadge;
              return (
                <div key={f.id} className="border-t border-line py-5">
                  <div className="flex items-center justify-between gap-4">
                    <label htmlFor={fid(f.id)} className="t-small font-semibold">
                      {f.label}
                      <span className="sr-only">{f.unit === "%" ? " in Prozent" : " in Franken"}</span>
                    </label>
                    {badge && (
                      <span
                        className={`flex-none rounded-full px-2.5 py-0.5 text-[0.75rem] font-medium ${isExample ? "bg-paper-2 text-grey-600" : "bg-[rgb(120_102_244/0.1)] text-violet-deep"}`}
                      >
                        {badge}
                      </span>
                    )}
                  </div>
                  <div className="mt-2.5 flex items-center gap-3">
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
                  <p id={`${fid(f.id)}-hint`} className="t-small mt-2.5 max-w-[48ch] text-grey-600">
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

          <div className="border-t border-line pt-2">
            <button type="button" onClick={reset} className="link t-small inline-flex min-h-11 items-center">
              {copy.reset}
            </button>
          </div>
        </fieldset>
      </div>

      {/* Mobile: Ergebnis schwebt unten, solange man die Annahmen bearbeitet (Duplikat, darum aria-hidden) */}
      <div aria-hidden className="sticky bottom-3 z-10 col-span-4 md:col-span-12 lg:hidden">
        <div className="card rounded-2xl px-5 py-3 shadow-[var(--shadow-float)]">
          <div className="flex items-baseline justify-between gap-4">
            <span className="t-small font-semibold text-violet-deep">
              {copy.results.revenue} <span className="text-grey-400">/</span> Monat
            </span>
            <span className="flex min-w-0 items-baseline gap-2">
              <span className="t-meta text-grey-600">CHF</span>
              <span className="t-num leading-none">{show(revenue, true)}</span>
            </span>
          </div>
          <p className="t-meta mt-1 text-grey-600">
            {show(leads)} {copy.results.leads} <span className="text-grey-400">/</span> {show(customers)}{" "}
            {copy.results.customers}
          </p>
        </div>
      </div>

      {/* Rechnung: Kacheln wie ein kleines Cockpit, Umsatz hervorgehoben */}
      <section
        aria-labelledby={fid("result")}
        className="card col-span-4 min-w-0 p-6 md:col-span-12 md:p-8 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:col-span-7 lg:col-start-6"
      >
        <h3 id={fid("result")} className="t-h4">
          {copy.resultsLabel}
        </h3>

        <dl className="mt-6 grid grid-cols-2 gap-3">
          <ResultTile
            label={copy.results.leads}
            calc={valid ? `${n(budget)} ÷ ${n(cpl)}` : "–"}
            value={show(leads)}
          />
          <ResultTile
            label={copy.results.customers}
            calc={valid && leads !== null ? `${show(leads)} × ${n(quote)} %` : "–"}
            value={show(customers)}
          />
          <ResultTile
            wide
            highlight
            label={copy.results.revenue}
            calc={valid && customers !== null ? `${show(customers)} × ${n(perCustomer)}` : "–"}
            value={show(revenue, true)}
            unit="CHF"
          />
          <ResultTile
            wide
            label={hasFee ? copy.results.costPerCustomerFee : copy.results.costPerCustomer}
            calc={
              valid && customers !== null
                ? hasFee
                  ? `(${n(budget)} + ${n(fee)}) ÷ ${show(customers)}`
                  : `${n(budget)} ÷ ${show(customers)}`
                : "–"
            }
            value={show(cost, true)}
            unit="CHF"
          />
        </dl>

        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {summary}
        </p>

        <p className="t-small mt-6 max-w-[56ch] text-grey-600">
          {copy.disclaimer} {copy.rounding}
        </p>

        <div className="mt-7 border-t border-line pt-7">
          <ButtonLink href={cta.primary.href} track="rechner-result">
            {cta.primary.label}
          </ButtonLink>
          <p className="t-small mt-4 max-w-[46ch] text-grey-600">{copy.ctaNote}</p>
        </div>
      </section>
    </div>
  );
}

/** Ergebnis-Kachel: Bezeichnung, Zahl, darunter die Rechnung. highlight = Umsatz (violett getönt). */
function ResultTile({
  label,
  calc,
  value,
  unit,
  wide = false,
  highlight = false,
}: {
  label: string;
  calc: string;
  value: string;
  unit?: string;
  wide?: boolean;
  highlight?: boolean;
}) {
  return (
    <div
      className={`min-w-0 rounded-2xl p-4 md:p-5 ${wide ? "col-span-2" : ""} ${highlight ? "bg-[rgb(120_102_244/0.08)]" : "bg-paper-2"}`}
    >
      <dt className={`t-small font-semibold ${highlight ? "text-violet-deep" : "text-grey-700"}`}>{label}</dt>
      <dd className="mt-2 flex min-w-0 items-baseline gap-2">
        {unit && <span className="t-meta flex-none text-grey-600">{unit}</span>}
        <span className="t-num min-w-0 [overflow-wrap:anywhere]">{value}</span>
      </dd>
      <dd className="t-meta mt-2 text-grey-600">{calc}</dd>
    </div>
  );
}
