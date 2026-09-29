import { contentDay, packages, socialRecruiting, podcastStudio } from "@/content/offers";

/**
 * Seite /content-day (Vertrag C6, docs/PAGES.md).
 * Alle Preise, Dauern und Fristen kommen aus offers.ts (Briefing).
 * Bewusst NICHT genannt: Anzahl Videos pro Content Day, Drehort (UNKLAR laut FACTS 9.1 Punkt 5),
 * Höhe des Express-Aufpreises (nicht genannt), MWST-Status (UNKLAR), Anzahl Korrekturschleifen.
 * AGB-Stellen (Ziff. 9, 10, 14) wörtlich belegt in _research/FACTS.md 9.2 (A09, A10, A14).
 */

const option = (id: string) => {
  const o = contentDay.options.find((x) => x.id === id);
  if (!o) throw new Error(`Content-Day-Option «${id}» fehlt in offers.ts`);
  return o;
};

const withModel = option("4h-model");
const noModel = option("4h");
const existing = option("3h-bestand");
const full = option("8h");
const [pro, advanced] = packages;

/** «Fertigstellung in 7 Arbeitstagen» → «7 Arbeitstagen» */
const deliveryIn = (d: string) => d.replace(/^Fertigstellung in /, "");
/** «Fertigstellung in 7 Arbeitstagen» → «7» */
const deliveryDays = (d: string) => d.match(/\d+/)?.[0] ?? "";
/** «4 Stunden» → «4» */
const hours = (d: string) => d.match(/\d+/)?.[0] ?? "";
/** «Produktion, Videograf, Equipment und Schnitt» */
const listDe = (xs: string[]) => (xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} und ${xs[xs.length - 1]}`);

/**
 * Zahl und Einheit («7 Arbeitstagen») sowie «CHF» und Betrag nie umbrechen.
 * Gilt nur für sichtbare Texte: Metadaten, Schema und Links bleiben unverändert.
 */
const NB = " ";
const SKIP = ["meta", "schema", "href", "path"] as const;
function keepTogether<T>(v: T): T {
  if (typeof v === "string")
    return v.replace(/CHF (?=\d)/g, `CHF${NB}`).replace(/(\d) (Stunden|Arbeitstagen|Arbeitstage|Monate)\b/g, `$1${NB}$2`) as T;
  if (Array.isArray(v)) return v.map((x) => keepTogether(x)) as T;
  if (v && typeof v === "object")
    return Object.fromEntries(
      Object.entries(v).map(([k, x]) => [k, (SKIP as readonly string[]).includes(k) ? x : keepTogether(x)]),
    ) as T;
  return v;
}

export type RateRow = {
  id: string;
  name: string;
  detail: string;
  duration: string;
  delivery: string;
  /** Ziffern-String wie «1'990» oder null für «auf Anfrage» */
  price: string | null;
  todo?: string;
};

export type PlanRow = { group: string; title: string; text: string; figure?: { a: string; b: string; unit: string } };
export type LinkRef = { label: string; href: string };

export const contentDayPage = keepTogether({
  meta: {
    title: `Content Day: Drehtag buchen ab CHF ${noModel.price.amount}`,
    description: `Content Day von eCreator: ${noModel.duration} Dreh mit Videograf, Equipment und Schnitt für CHF ${noModel.price.amount}, mit Model CHF ${withModel.price.amount}. Fertig geschnitten in ${deliveryIn(noModel.delivery)}.`,
    path: "/content-day",
  },

  crumbs: [
    { name: "Content-Produktion", path: "/content-produktion" },
    { name: "Content Day", path: "/content-day" },
  ],

  header: {
    meta: ["Studio", "Content Day"],
    title: ["Content Day.", "Vier Stunden Dreh,", "fertig geschnitten."],
    lead: `Ein Videograf mit Equipment dreht mit dir, deinem Team oder einem Model von eCreator. Danach schneiden wir das Material für deine Kanäle, fertig in ${deliveryIn(noModel.delivery)}.`,
    poster: {
      label: `Content Day / ${noModel.duration} / ohne Model`,
      from: noModel.price.amount,
      rows: [
        { k: "Mit Model von eCreator", v: `CHF ${withModel.price.amount}` },
        { k: "Fertig in", v: deliveryIn(noModel.delivery) },
      ],
    },
  },

  rates: {
    meta: "Preise",
    title: "Was ein Content Day kostet.",
    always: `Immer im Preis: ${contentDay.includes.join(" / ")}`,
    rows: [
      {
        id: noModel.id,
        name: noModel.name,
        detail: "Ohne Model: vor der Kamera stehen du, dein Team oder dein Produkt",
        duration: noModel.duration,
        delivery: `in ${deliveryIn(noModel.delivery)}`,
        price: noModel.price.amount,
      },
      {
        id: withModel.id,
        name: `${withModel.name} mit Model`,
        detail: "Mit Model von eCreator vor der Kamera",
        duration: withModel.duration,
        delivery: `in ${deliveryIn(withModel.delivery)}`,
        price: withModel.price.amount,
      },
      {
        id: full.id,
        name: full.name,
        detail: "Für Events, Testimonials und umfangreiche Produktionen",
        duration: full.duration,
        delivery: `in ${deliveryIn(full.delivery)}`,
        price: null,
      },
    ] satisfies RateRow[],
    existing: {
      id: existing.id,
      name: existing.name,
      detail: `${listDe(existing.includes)} inbegriffen`,
      duration: existing.duration,
      delivery: "nach Absprache",
      price: existing.price.amount,
      todo: "Fertigstellungsfrist für den 3-Stunden-Tag von eCreator bestätigen",
    } satisfies RateRow,
    existingGroup: existing.audience ?? "Für bestehende Kundinnen und Kunden",
    express: contentDay.express,
  },

  uses: {
    meta: "Wofür",
    title: "Wofür du drehst.",
    /** Allgemeine Einsätze laut offers.ts useCases (ohne Events/Testimonials, die gehören zum 8-Stunden-Tag) */
    general: ["Social Media", "Ads", "Recruiting", "Produktvideos", "Unternehmens­content"],
    fullDay: ["Events", "Testimonials"],
    fullDayNote: `Events und Testimonials: am ${full.name} mit ${full.duration}`,
    text: `Mit ${noModel.duration} entsteht Material für deine laufenden Kanäle und Kampagnen. Für Events, Testimonials und umfangreiche Produktionen ist der ${full.name} mit ${full.duration} gedacht.`,
  },

  plan: {
    meta: "Drehplan",
    title: "So läuft ein Content Day.",
    lead: "Fünf Schritte, vom ersten Gespräch bis zu den fertigen Videos.",
    rows: [
      {
        group: "Vor dem Dreh",
        title: "Vorbereitung",
        text: "Wir klären Ziel, Kanäle und Inhalte und planen den Ablauf. So ist vor dem Drehtag klar, welches Material entstehen soll.",
      },
      {
        group: "Am Drehtag",
        title: "Aufbau",
        text: "Videograf und Equipment werden am vereinbarten Drehort eingerichtet, bevor die erste Einstellung läuft.",
      },
      {
        group: "Am Drehtag",
        title: "Dreh",
        text: `${noModel.duration} Dreh, am ${full.name} ${full.duration}. Vor der Kamera stehen du, dein Team, dein Produkt oder ein Model von eCreator.`,
        figure: { a: hours(noModel.duration), b: hours(full.duration), unit: "Stunden" },
      },
      {
        group: "Nach dem Dreh",
        title: "Schnitt",
        text: "Wir schneiden das Material für die Kanäle, auf denen es laufen soll. Der Schnitt ist im Preis enthalten.",
      },
      {
        group: "Nach dem Dreh",
        title: "Lieferung",
        text: `Fertig geschnitten in ${deliveryIn(noModel.delivery)}, nach einem ${full.name} in ${deliveryIn(full.delivery)}. ${contentDay.express}`,
        figure: { a: deliveryDays(noModel.delivery), b: deliveryDays(full.delivery), unit: "Arbeitstage" },
      },
    ] satisfies PlanRow[],
  },

  /** Echte Arbeiten, jede genau einmal auf dieser Seite. Keine Behauptung, an welchem Drehtag sie entstanden sind. */
  examples: {
    meta: "Beispiele",
    title: "Material aus unserer Produktion.",
    text: "Social Ads für Meta, Instagram und TikTok, gedreht und geschnitten für den Feed.",
    items: [
      { id: "ecreator", caption: ["Eigenes Ad", "Recruiting für Personalvermittlungen"] as [string, string] },
      { id: "naechstenpflege", caption: ["Social Ad", "Spitex Nächstenpflege"] as [string, string] },
      { id: "pflegezukunft", caption: ["Social Ad", "Pflege"] as [string, string] },
    ],
    links: [
      { label: "Mehr zur Content-Produktion", href: "/content-produktion" },
      { label: "Cases ansehen", href: "/cases" },
    ] satisfies LinkRef[],
  },

  ongoing: {
    meta: "Einmal oder laufend",
    title: "Einmal drehen oder jeden Monat.",
    text: "Ein Content Day ist ein einzelner Auftrag. Wer laufend Material braucht, dreht über ein Paket oder bucht den Dreh als Teil von Social Recruiting.",
    items: [
      {
        name: `Pakete ${pro.name} und ${advanced.name}`,
        text: `Monatlicher Content Shoot, verbunden mit Werbung und Infrastruktur. ${pro.minTerm}.`,
        price: pro.price.amount,
        unit: pro.price.unit ?? "",
        prefix: "ab CHF",
        link: { label: "Pakete ansehen", href: "/pakete" } satisfies LinkRef,
      },
      {
        name: "Social Recruiting",
        text: `Ein ganzer Content Day für Recruiting-, Team- und Image-Videos, dazu Kampagnen und Bewerber-System. ${socialRecruiting.notes[0]}`,
        price: socialRecruiting.price.amount,
        unit: socialRecruiting.price.note ?? "",
        prefix: "CHF",
        link: { label: "Social Recruiting ansehen", href: "/social-recruiting" } satisfies LinkRef,
      },
    ],
  },

  faq: {
    meta: "Fragen",
    title: "Fragen zum Content Day.",
    items: [
      {
        q: "Was kostet ein Content Day?",
        a: `Ein Content Day mit ${noModel.duration} kostet CHF ${noModel.price.amount} ohne Model und CHF ${withModel.price.amount} mit Model von eCreator. ${listDe(contentDay.includes)} sind im Preis enthalten. Den Preis für den ${full.name} mit ${full.duration} nennen wir dir auf Anfrage.`,
      },
      {
        q: "Wie viele Videos entstehen an einem Content Day?",
        a: "Das legen wir vor dem Dreh gemeinsam fest. Wie viele Videos sinnvoll sind, hängt von deinen Zielen, den Formaten und den Längen ab.",
      },
      {
        q: "Brauche ich ein Model?",
        a: `Nein. Ohne Model kostet der Content Day CHF ${noModel.price.amount}, dann stehen du, dein Team oder dein Produkt vor der Kamera. Mit einem Model von eCreator kostet er CHF ${withModel.price.amount}.`,
      },
      {
        q: "Wo wird gedreht?",
        a: "Den Drehort legen wir im Gespräch fest. Dort klären wir auch, was es vor Ort braucht.",
      },
      {
        q: "Wie schnell sind die Videos fertig?",
        a: `Nach einem Content Day mit ${noModel.duration} in ${deliveryIn(noModel.delivery)}, nach einem ${full.name} in ${deliveryIn(full.delivery)}. ${contentDay.express} Wie viele Korrekturschleifen dazugehören, klären wir vor dem Auftrag.`,
      },
      {
        q: "Wem gehören die Videos, und bekomme ich das Rohmaterial?",
        a: "Die Nutzungsrechte an den fertigen Videos werden im Auftrag vereinbart. Laut unseren AGB gehören Rohmaterial und Projektdateien nicht automatisch dazu, ausser das ist schriftlich vereinbart. Wenn du Rohmaterial brauchst, sag es uns vor dem Dreh.",
      },
    ],
  },

  related: [
    { label: "Content-Produktion", href: "/content-produktion", text: "Skripte, Dreh, Schnitt und Varianten für Social Media, Ads und Recruiting." },
    { label: "Podcast-Studio", href: "/podcast-studio", text: `Aufnehmen, ohne selbst aufzubauen. Ab CHF ${podcastStudio.options[0].price.amount}.` },
    { label: "Meta Ads", href: "/performance-marketing/meta-ads", text: "Wie aus den Videos Kampagnen auf Facebook und Instagram werden." },
  ] satisfies (LinkRef & { text: string })[],

  finalCta: {
    title: ["Termin finden,", "Dreh planen."] as [string, string],
    text: `Im kostenlosen Strategie-Call klären wir, welche Videos du brauchst und ob ${hours(noModel.duration)} oder ${hours(full.duration)} Stunden passen. Wenn schon alles klar ist, frag direkt einen Content Day an.`,
  },

  schema: {
    name: "Content Day",
    serviceType: "Drehtag für Social-Media- und Werbevideos",
    description: `Drehtag mit Videograf, Equipment und Schnitt. ${noModel.duration} ab CHF ${noModel.price.amount}, fertig geschnitten in ${deliveryIn(noModel.delivery)}. ${full.name} mit ${full.duration} auf Anfrage.`,
    offers: [
      {
        name: `Content Day ${noModel.duration}, ${noModel.price.note}`,
        price: noModel.price.amount.replace(/'/g, ""),
        description: `${listDe(noModel.includes)}. ${noModel.delivery}.`,
      },
      {
        name: `Content Day ${withModel.duration}, ${withModel.price.note}`,
        price: withModel.price.amount.replace(/'/g, ""),
        description: `${listDe(withModel.includes)}. ${withModel.delivery}.`,
      },
    ],
  },
});
