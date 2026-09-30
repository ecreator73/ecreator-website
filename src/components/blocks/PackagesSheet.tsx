import { packages } from "@/content/offers";

/**
 * Pro und Advanced als Datenblatt. Jede Zelle ist wörtlich aus dem Briefing (offers.ts),
 * gruppiert in vergleichbare Zeilen. Keine «Beliebt»-Badges, keine Häkchen-Matrix.
 * Mobile: Zeilenbezeichnung über den zwei Spalten, kein seitliches Scrollen.
 */
const [pro, adv] = packages;
const NA = "nicht aufgeführt";

const rows: { k: string; pro: string; adv: string }[] = [
  { k: "Fokus", pro: pro.focus.join(" / "), adv: adv.focus.join(" / ") },
  { k: "Dreh", pro: "Monatlicher Content Shoot, 4 Videos, Videograf, Schnitt, Model", adv: "6 Videos pro Content Shoot" },
  { k: "Werbung", pro: "Meta / Social Ads", adv: "Google Ads, Performance Marketing" },
  {
    k: "Website & Infrastruktur",
    pro: "Kampagnenspezifische Landingpages, CRM & Sales-Infrastruktur",
    adv: "Website bzw. Redesign / Branding je nach Projekt, technische Optimierung, Server-Side Tracking",
  },
  { k: "Sichtbarkeit & Strategie", pro: NA, adv: "SEO, Content- und Social-Strategie" },
  { k: "Hinweis", pro: "Google Ads nicht regulär enthalten", adv: NA },
];

const cell = (v: string) => `min-w-0 hyphens-auto [hyphenate-limit-chars:15_6_6] ${v === NA ? "text-grey-500" : ""}`;

export function PackagesSheet() {
  return (
    <div role="table" aria-label="Vergleich der Pakete Pro und Advanced" className="card px-5 py-4 text-[0.95rem] md:px-8 md:py-6 md:text-base">
      <div role="rowgroup">
        <div role="row" className="grid grid-cols-2 gap-x-[var(--gutter)] border-b border-line-strong pb-5 md:grid-cols-[26%_1fr_1fr]">
          <span role="columnheader" className="t-meta hidden self-end text-grey-600 md:block">
            Paket
          </span>
          {[pro, adv].map((p) => (
            <div key={p.id} role="columnheader">
              <span className="t-h3 block">{p.name}</span>
              <span className="mt-2 flex items-end gap-1.5">
                <span className="t-meta mb-1 text-grey-600">CHF</span>
                <span className="t-num">{p.price.amount}</span>
              </span>
              <span className="t-meta mt-1 block text-grey-600">
                {p.price.unit}
                <span className="block md:inline"> / {p.minTerm}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div role="rowgroup">
        {rows.map((r) => (
          <div
            key={r.k}
            role="row"
            className="grid grid-cols-2 gap-x-[var(--gutter)] gap-y-1.5 border-b border-line py-4 md:grid-cols-[26%_1fr_1fr]"
          >
            <span role="rowheader" className="t-meta col-span-2 text-grey-600 md:col-span-1 md:pt-[0.2em]">
              {r.k}
            </span>
            <span role="cell" className={cell(r.pro)}>
              {r.pro}
            </span>
            <span role="cell" className={cell(r.adv)}>
              {r.adv}
            </span>
          </div>
        ))}
      </div>
      <p className="t-small mt-4 text-grey-700">
        Auszug der Leistungen laut Paket. Werbebudget ist nicht im Paketpreis enthalten.
      </p>
    </div>
  );
}
