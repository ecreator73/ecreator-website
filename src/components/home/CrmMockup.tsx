import type { CSSProperties } from "react";

/** Stagger-Verzögerung für die Einblend-Animationen */
const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` }) as CSSProperties;

type Source = "Meta" | "Google" | "Website" | "Telefon";
const SOURCE_TONE: Record<Source, string> = {
  Meta: "bg-violet/12 text-violet-deep",
  Google: "bg-[#1a73e8]/10 text-[#1557b0]",
  Website: "bg-grey-300/40 text-grey-700",
  Telefon: "bg-ok/12 text-ok",
};

/*
 * Beispielansicht mit Demo-Daten: zeigt, wie ein eCreator-CRM aufgebaut ist (Kennzahlen, Leads pro Quelle,
 * Pipeline). Keine echten Kundenzahlen und keine Personen; die Ansicht ist sichtbar als Beispiel beschriftet.
 */
const KPIS = [
  { label: "Neue Leads", value: "42", note: "diese Woche" },
  { label: "Termine", value: "11", note: "gebucht" },
  { label: "Kosten pro Lead", value: "CHF 12", note: "Durchschnitt" },
  { label: "Abschlüsse", value: "4", note: "diese Woche" },
];

/** Leads pro Woche, gestapelt nach Quelle (Meta, Google, Website, Telefon) */
const WEEKS = [
  [6, 3, 2, 1],
  [7, 4, 2, 1],
  [9, 4, 3, 2],
  [8, 6, 3, 1],
  [11, 6, 4, 2],
  [13, 7, 4, 2],
  [15, 8, 5, 3],
  [18, 11, 8, 5],
];
const STACK_TONE = ["bg-violet", "bg-[#1a73e8]", "bg-grey-400", "bg-ok"];

const PIPELINE: { stage: string; cards: { t: string; s: Source; time: string }[] }[] = [
  {
    stage: "Neu",
    cards: [
      { t: "Anfrage Vorsorge", s: "Meta", time: "vor 12 Min." },
      { t: "Offerte Umbau", s: "Google", time: "vor 1 Std." },
    ],
  },
  { stage: "Kontaktiert", cards: [{ t: "Rückruf Krankenkasse", s: "Telefon", time: "heute" }] },
  {
    stage: "Termin",
    cards: [
      { t: "Beratung Steuern", s: "Meta", time: "Do, 10:00" },
      { t: "Erstgespräch", s: "Website", time: "Fr, 14:30" },
    ],
  },
  { stage: "Kunde", cards: [{ t: "Vertrag unterzeichnet", s: "Google", time: "gestern" }] },
];

export function CrmMockup() {
  const max = Math.max(...WEEKS.map((w) => w.reduce((a, b) => a + b, 0)));
  return (
    <figure className="relative" aria-label="Beispielansicht eines CRM mit Demo-Daten">
      <div className="overflow-hidden rounded-[var(--radius-card)] border border-[rgb(11_29_63/0.08)] bg-white shadow-card" data-reveal="viz">
        {/* Fensterleiste */}
        <div className="flex items-center justify-between gap-3 border-b border-line bg-paper-2/70 px-4 py-2.5">
          <span className="hidden gap-1.5 sm:flex" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-grey-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-grey-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-grey-300" />
          </span>
          <span className="whitespace-nowrap text-[0.8125rem] font-semibold text-ink">CRM · Übersicht</span>
          <span className="whitespace-nowrap rounded-full bg-alert/10 px-2.5 py-0.5 text-[0.6875rem] font-semibold text-alert">
            <span className="sm:hidden">Demo-Daten</span>
            <span className="hidden sm:inline">Beispiel mit Demo-Daten</span>
          </span>
        </div>

        <div className="space-y-4 p-4 sm:p-5">
          {/* Kennzahlen */}
          <dl className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {KPIS.map((k, i) => (
              <div key={k.label} className="viz-pop rounded-xl border border-line px-3 py-2.5" style={d(i * 90)}>
                <dt className="text-[0.6875rem] font-medium text-grey-500">{k.label}</dt>
                <dd className="t-num mt-0.5 text-[1.375rem]">{k.value}</dd>
                <dd className="text-[0.6875rem] text-grey-500">{k.note}</dd>
              </div>
            ))}
          </dl>

          {/* Leads pro Woche nach Quelle */}
          <div className="rounded-xl border border-line p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[0.75rem] font-semibold text-ink">Leads pro Woche</span>
              <span className="flex flex-wrap gap-x-3 gap-y-1 text-[0.6875rem] text-grey-600">
                {(["Meta", "Google", "Website", "Telefon"] as Source[]).map((s, i) => (
                  <span key={s} className="flex items-center gap-1">
                    <span className={`h-2 w-2 rounded-full ${STACK_TONE[i]}`} />
                    {s}
                  </span>
                ))}
              </span>
            </div>
            <div className="mt-3 flex h-24 items-end gap-1.5 sm:gap-2">
              {WEEKS.map((w, i) => {
                const total = w.reduce((a, b) => a + b, 0);
                return (
                  <span key={i} className="viz-grow-y flex flex-1 flex-col-reverse overflow-hidden rounded-t-md" style={{ height: `${(total / max) * 100}%`, ...d(200 + i * 70) }}>
                    {w.map((v, k) => (
                      <span key={k} className={STACK_TONE[k]} style={{ height: `${(v / total) * 100}%` }} />
                    ))}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Pipeline */}
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {PIPELINE.map((col, ci) => (
              <div key={col.stage} className="rounded-xl bg-paper-2 p-2">
                <p className="flex items-center justify-between px-1 pb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-grey-600">
                  {col.stage}
                  <span className="rounded-full bg-white px-1.5 text-grey-500">{col.cards.length}</span>
                </p>
                <ul className="space-y-1.5">
                  {col.cards.map((c, k) => (
                    <li
                      key={c.t}
                      className="viz-pop rounded-lg bg-white px-2.5 py-2 shadow-[0_1px_2px_rgb(11_29_63/0.06)]"
                      style={d(600 + ci * 140 + k * 90)}
                    >
                      <span className="block truncate text-[0.75rem] font-semibold text-ink">{c.t}</span>
                      <span className="mt-1 flex items-center justify-between gap-1">
                        <span className={`rounded-full px-1.5 py-px text-[0.625rem] font-semibold ${SOURCE_TONE[c.s]}`}>{c.s}</span>
                        <span className="truncate text-[0.625rem] text-grey-500">{c.time}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="t-small mt-3 text-center text-grey-500">
        Beispielansicht mit Demo-Daten. So sieht ein CRM aus, das wir für Kunden aufbauen.
      </figcaption>
    </figure>
  );
}
