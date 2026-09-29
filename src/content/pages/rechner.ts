import { packages } from "@/content/offers";
import { caseBySlug, displayClient } from "@/content/cases";
import { abs } from "@/lib/schema";
import type { FaqItem } from "@/components/page/Faq";

/**
 * /rechner · Potenzialrechner (Vertrag C19, docs/PAGES.md).
 * Formel laut FACTS N24 korrigiert, alles pro Monat, keine Hochrechnung ×12:
 *   Leads = Budget ÷ Ziel-CPL · Kunden = Leads × Abschlussquote · Umsatz = Kunden × Ø Umsatz pro Kunde.
 * Defaults konservativ und als Beispiel gekennzeichnet (Vertrag): 3'000 / 30 / 10 % / 2'500.
 * Honorar als optionale Kostenposition (N24). Kein Lead-Gate. Disclaimer nach AGB Ziff. 11 (FACTS A11).
 * Bewusst NICHT verwendet: Branchen-Benchmarks der alten Rechner-Seite (KZ11, unbelegt),
 * «Unser Benchmark Ø 8 CHF» (KZ05), internes Wording (N25), Multiplikatoren wie «93.8×» (N24).
 * Budget-Richtwert 3'000–6'000 CHF: FACTS KZ12, VERIFIZIERT.
 */

const [pro, advanced] = packages;
const finanzCase = caseBySlug("finanzdienstleister-lead-generierung")!;
const metric = (label: string) => {
  const m = finanzCase.metrics?.find((x) => x.label === label);
  if (!m) throw new Error(`Kennzahl «${label}» fehlt in cases.ts`);
  return m;
};

export type CalcField = {
  id: "budget" | "cpl" | "quote" | "revenue" | "fee";
  label: string;
  unit: string;
  unitPosition: "before" | "after";
  /** Beispielwert als Zahl, null = leer (optional) */
  example: number | null;
  hint: string;
  optional?: boolean;
  max?: number;
  min?: number;
};

const faq: FaqItem[] = [
  {
    q: "Wie genau ist das Ergebnis?",
    a: "Es ist eine Schätzung, keine Prognose. Der Rechner multipliziert nur deine eigenen Annahmen. Wie viele Leads und Kunden tatsächlich entstehen, hängt von Angebot, Creative, Landingpage, Tracking und Verkauf ab. Eine Garantie gibt es nicht.",
  },
  {
    q: "Welche Kosten pro Lead soll ich eintragen?",
    a: "Am besten deinen eigenen Wert aus bisherigen Kampagnen. Wenn du keinen hast, rechne vorsichtig und eher zu hoch. Die Kosten pro Lead unterscheiden sich stark je nach Branche, Angebot und Qualität der Anfragen.",
  },
  {
    q: "Warum rechnet der Rechner pro Monat und nicht pro Jahr?",
    a: "Weil Werbebudget monatlich ausgegeben wird. Trag beim Umsatz pro Kunde deshalb ein, was ein neuer Kunde im Schnitt bringt, und nicht seinen Wert über mehrere Jahre. Sonst sieht das Ergebnis besser aus, als es ist.",
  },
  {
    q: "Ist das Agenturhonorar eingerechnet?",
    a: `Nur, wenn du es einträgst. Das Feld Honorar ist optional und fliesst in die Kosten pro Kunde ein. Zum Vergleich: Das Paket ${pro.name} kostet CHF ${pro.price.amount}, ${advanced.name} CHF ${advanced.price.amount} pro Monat. Das Werbebudget ist darin nicht enthalten.`,
  },
  {
    q: "Welches Werbebudget ist sinnvoll?",
    a: "Als Richtwert für saubere Tests empfehlen wir 3'000 bis 6'000 CHF pro Monat. Was für dich passt, hängt von Ziel, Markt und Angebot ab. Das klären wir im Strategie-Call.",
  },
];

export const rechnerPage = {
  meta: {
    title: "Potenzialrechner: Was bringt mein Werbebudget?",
    description:
      "Rechne aus, was dein monatliches Werbebudget bringen kann: Leads, Kunden und Umsatz aus deinen eigenen Annahmen. Ehrliche Formel, kein Formular, keine Garantie.",
    path: "/rechner",
  },
  crumbs: [{ name: "Potenzialrechner", path: "/rechner" }],
  schema: {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Potenzialrechner",
    url: abs("/rechner"),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: "de-CH",
    isAccessibleForFree: true,
    description:
      "Schätzt aus Werbebudget, Kosten pro Lead, Abschlussquote und Umsatz pro Kunde, wie viele Leads, Kunden und wie viel Umsatz pro Monat entstehen können.",
    provider: { "@id": "https://www.ecreator.ch/#organization" },
  },
  header: {
    meta: ["Potenzialrechner", "Schätzung"],
    title: ["Was dein Werbebudget", "bringen kann."],
    lead: "Vier Annahmen, drei Zahlen. Trag deine eigenen Werte ein und sieh sofort, was ein Monatsbudget damit bringen kann. Ohne Formular, ohne E-Mail-Adresse.",
    formulaCaption: "Die Formel",
    formula: [
      { k: "Leads", v: "Budget ÷ Kosten pro Lead" },
      { k: "Kunden", v: "Leads × Abschlussquote" },
      { k: "Umsatz", v: "Kunden × Ø Umsatz pro Kunde" },
      { k: "Zeitraum", v: "ein Monat, ohne Hochrechnung aufs Jahr" },
    ],
  },
  calc: {
    id: "rechnen",
    title: "Rechne mit deinen Zahlen",
    inputsLabel: "Deine Annahmen",
    examplesNote: "Vorausgefüllt mit Beispielwerten. Ersetze sie durch deine eigenen.",
    exampleBadge: "Beispiel",
    ownBadge: "Dein Wert",
    reset: "Beispielwerte wiederherstellen",
    fields: [
      {
        id: "budget",
        label: "Werbebudget pro Monat",
        unit: "CHF",
        unitPosition: "before",
        example: 3000,
        hint: "Was du pro Monat bei Meta, Google oder TikTok ausgibst. Richtwert für saubere Tests: 3'000 bis 6'000 CHF.",
        min: 0,
      },
      {
        id: "cpl",
        label: "Ziel-Kosten pro Lead",
        unit: "CHF",
        unitPosition: "before",
        example: 30,
        hint: "Was eine Anfrage kosten darf. Rechne lieber zu hoch als zu tief.",
        min: 0.01,
      },
      {
        id: "quote",
        label: "Abschlussquote",
        unit: "%",
        unitPosition: "after",
        example: 10,
        hint: "Wie viele von 100 Anfragen bei dir Kunde werden. Nimm deinen Erfahrungswert.",
        min: 0,
        max: 100,
      },
      {
        id: "revenue",
        label: "Ø Umsatz pro Kunde",
        unit: "CHF",
        unitPosition: "before",
        example: 2500,
        hint: "Was ein neuer Kunde im Schnitt bringt. Kein Jahres- oder Lebenszeitwert, sonst rechnest du dich reich.",
        min: 0,
      },
      {
        id: "fee",
        label: "Honorar pro Monat",
        unit: "CHF",
        unitPosition: "before",
        example: null,
        optional: true,
        hint: `Optional. Zählt zu den Kosten pro Kunde. Pakete: ${pro.name} CHF ${pro.price.amount}, ${advanced.name} CHF ${advanced.price.amount} pro Monat.`,
        min: 0,
      },
    ] satisfies CalcField[],
    resultsLabel: "Ergebnis pro Monat",
    results: {
      leads: "Leads",
      customers: "Kunden",
      revenue: "Umsatz",
      costPerCustomer: "Werbekosten pro Kunde",
      costPerCustomerFee: "Kosten pro Kunde inkl. Honorar",
    },
    errors: {
      invalid: "Bitte eine Zahl eingeben.",
      positive: "Bitte einen Wert über 0 eingeben.",
      percent: "Bitte einen Wert zwischen 0 und 100 eingeben.",
      negative: "Bitte keinen negativen Wert eingeben.",
    },
    /** Platzhalter {leads}, {customers}, {revenue} werden im Rechner ersetzt (aria-live) */
    summary: "Bei diesen Annahmen: rund {leads} Leads, {customers} Kunden und CHF {revenue} Umsatz pro Monat.",
    summaryInvalid: "Kein Ergebnis: Bitte prüfe die markierten Felder.",
    rounding: "Werte gerundet.",
    disclaimer:
      "Eine Schätzung aus deinen Annahmen, keine Zusage. eCreator übernimmt keine Garantie für Leads, Abschlüsse oder Umsatz (AGB Ziff. 11).",
    ctaNote: "Welche Werte für dein Angebot realistisch sind, schauen wir im Call an.",
  },
  limits: {
    meta: ["Grenzen"],
    title: "Was der Rechner nicht weiss.",
    text: "Er rechnet mit deinen Annahmen. Ob sie eintreten, entscheidet sich an vier Stellen, die in keiner Formel stehen.",
    items: [
      {
        title: "Dein Creative",
        text: "Wie klar ein Video dein Angebot erklärt, beeinflusst, was ein Lead kostet und wie gut er zu dir passt.",
      },
      {
        title: "Deine Landingpage",
        text: "Führt die Seite die Botschaft der Anzeige weiter, oder beginnt sie von vorn? Das entscheidet, ob aus einem Klick eine Anfrage wird.",
      },
      {
        title: "Dein Tracking",
        text: "Ohne sauberes Tracking optimiert die Werbeplattform auf Klicks statt auf echte Anfragen.",
      },
      {
        title: "Dein Verkauf",
        text: "Die Abschlussquote hängt davon ab, wie schnell und wie gut nachgefasst wird. Das entscheidet sich im Verkauf, nicht in der Anzeige.",
      },
    ],
    agb: {
      quote: "Sämtliche Prognosen, Beispiele oder Erfahrungswerte dienen ausschliesslich als Richtwerte.",
      source: "AGB eCreator GmbH, Ziff. 11",
    },
  },
  proof: {
    meta: ["Zum Vergleich", "Case", finanzCase.sector],
    title: "Ein veröffentlichter Fall.",
    client: displayClient(finanzCase),
    figures: [
      { value: metric("qualifizierte Leads").value, label: "qualifizierte Leads" },
      { value: metric("Kosten pro Lead").value.replace("CHF ", ""), unit: "CHF", label: "Kosten pro Lead" },
      { value: metric("Monate Laufzeit").value, label: "Monate" },
    ],
    text: "Ein einzelner Fall aus der Finanzbranche mit drei getrennten Kampagnen und Video-Creatives, die vorqualifizieren. Kein Richtwert für dein Angebot: Darum rechnet der Rechner oben mit 30 Franken pro Lead.",
    source: "Quelle: Case Study auf ecreator.ch, 21.02.2026. Zahlen laut eCreator, Kunde dort anonymisiert.",
    link: { label: "Ganzen Case lesen", href: `/cases/${finanzCase.slug}` },
  },
  faq: {
    meta: ["Fragen zum Rechner"],
    title: "Häufige Fragen",
    items: faq,
  },
  related: {
    links: [
      { label: "Performance Marketing", href: "/performance-marketing", text: "Kampagnen, Creatives und Tracking aus einem Team." },
      { label: "Meta Ads", href: "/performance-marketing/meta-ads", text: "Werbung auf Facebook und Instagram." },
      { label: "Pakete und Preise", href: "/pakete", text: `${pro.name} ab CHF ${pro.price.amount} pro Monat.` },
    ],
  },
  finalCta: {
    secondary: { label: "Performance Marketing anfragen", href: "/kontakt?anliegen=performance" },
  },
};
