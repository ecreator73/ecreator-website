import { contentDay, packages, podcastStudio } from "@/content/offers";

/**
 * Seite /content-produktion (Vertrag C5, docs/PAGES.md).
 * Alle Preise und Fristen kommen aus offers.ts, alle Videos aus work.ts.
 * Keine Anzahl Videos pro Drehtag, keine Resultate, kein Drehort (UNKLAR laut FACTS 9.1).
 * Das Interview (testimonials.ts) wird als Beispiel für das Format gezeigt, ohne zu behaupten,
 * dass eCreator es gedreht hat (Herkunft laut FACTS F01 unbestätigt).
 */

const option = (id: string) => {
  const o = contentDay.options.find((x) => x.id === id);
  if (!o) throw new Error(`Content-Day-Option «${id}» fehlt in offers.ts`);
  return o;
};

const day = option("4h");
const dayModel = option("4h-model");
const dayFull = option("8h");
const [pro, advanced] = packages;
const podcastFrom = podcastStudio.options[0];

/** «Fertigstellung in 7 Arbeitstagen» → «7 Arbeitstagen» */
const deliveryOf = (d: string) => d.replace(/^Fertigstellung in /, "");
/** «Fertigstellung in 7 Arbeitstagen» → «7 Arbeitstage» */
const deliveryDays = (d: string) => deliveryOf(d).replace(/tagen$/, "tage");

export type LinkRef = { label: string; href: string };
export type FormatItem = { name: string; text: string; link?: LinkRef };
export type WallItem = { id: string; caption: [string, string] };
export type StepItem = { title: string; text: string; meta?: string };
export type FaqEntry = { q: string; a: string };

export const contentProduktionPage = {
  meta: {
    title: "Content-Produktion Schweiz: Social-Media-Videos",
    description: `Content-Produktion aus dem Kanton Zürich: Skripte, Dreh und Schnitt für Social Media, Ads, Recruiting und Testimonials. Content Day ab CHF ${day.price.amount}.`,
    path: "/content-produktion",
  },

  crumbs: [{ name: "Content-Produktion", path: "/content-produktion" }],

  header: {
    meta: ["Studio", "Content-Produktion"],
    title: ["Content, der verkauft.", "Selbst produziert."],
    /** Akzentwort (violett) in Zeile 1 */
    accent: "verkauft",
    lead: "Wir schreiben die Skripte, drehen mit eigenem Videografen und Equipment und schneiden die Varianten, die deine Kampagnen brauchen. Für Social Media, Ads, Recruiting und deine Website.",
    priceLink: { label: `Content Day ab CHF ${day.price.amount}`, href: "/content-day" } satisfies LinkRef,
  },

  /** Jedes Werk genau einmal. Kunde nur, wenn er im Material selbst sichtbar und freigegeben ist. */
  wall: {
    title: "Dreizehn Ads aus unserer Produktion.",
    /** Kanäle als Überzeile */
    platforms: ["Meta", "Instagram", "TikTok"],
    lead: { id: "ecreator", caption: ["Eigenes Ad", "Recruiting für Personalvermittlungen"] } satisfies WallItem,
    items: [
      { id: "naechstenpflege", caption: ["Social Ad", "Spitex Nächstenpflege"] },
      { id: "arana-care", caption: ["Social Ad", "Arana Care"] },
      { id: "babas-doener", caption: ["Social Ad", "Baba's Döner"] },
      { id: "promacare", caption: ["Social Ad", "ProMaCare"] },
      { id: "vorsorge", caption: ["Social Ad", "Vorsorge"] },
      { id: "call-agents", caption: ["Recruiting-Ad", "Call Agents"] },
      { id: "steuern", caption: ["Social Ad", "Steuern"] },
      { id: "pflegezukunft", caption: ["Social Ad", "Pflege"] },
      { id: "vergessene-vorsorgegelder", caption: ["Social Ad", "Vorsorge"] },
      { id: "krankenkasse", caption: ["Social Ad", "Krankenkasse"] },
      { id: "ecreator-recruiting", caption: ["Eigenes Ad", "Recruiting"] },
      { id: "fitness", caption: ["Social Ad", "Fitness"] },
    ] satisfies WallItem[],
  },

  formats: {
    meta: "Formate",
    title: "Jedes Video hat eine Aufgabe.",
    accent: "Aufgabe",
    lead: "Aufmerksamkeit holen, ein Angebot erklären, Vertrauen aufbauen oder Leute für dein Team finden. Das Format folgt der Aufgabe, nicht umgekehrt.",
    items: [
      { name: "Social-Media-Videos", text: "Kurze Videos für Instagram, TikTok, Facebook und LinkedIn, gedreht für den Feed, nicht für den Fernseher." },
      {
        name: "Ads",
        text: "Videos für bezahlte Kampagnen. Sie sagen in den ersten Sekunden, worum es geht, und sortieren so schon vor dem Klick vor.",
        link: { label: "Meta Ads", href: "/performance-marketing/meta-ads" },
      },
      { name: "UGC", text: "Videos im Stil von Nutzerbeiträgen (User Generated Content): persönlich, direkt in die Kamera gesprochen." },
      { name: "Testimonials", text: "Kundinnen und Kunden erzählen in eigenen Worten, wie die Zusammenarbeit läuft." },
      {
        name: "Recruiting-Content",
        text: "Team- und Stellenvideos, die zeigen, wie es sich bei dir arbeitet.",
        link: { label: "Social Recruiting", href: "/social-recruiting" },
      },
      { name: "Image-Videos", text: "Wer ihr seid, was ihr macht und wie ihr arbeitet." },
      { name: "Produktvideos", text: "Dein Produkt im Einsatz, verständlich in wenigen Sekunden." },
      { name: "Events", text: "Dein Anlass, aufgenommen und für Social Media geschnitten." },
    ] satisfies FormatItem[],
  },

  process: {
    meta: "Ablauf",
    title: "Vom Skript bis zur Kampagne.",
    lead: "Ein Video ist erst fertig, wenn es läuft und man sieht, was es bringt. Darum hört unsere Produktion nicht beim Export auf.",
    steps: [
      {
        title: "Skript",
        text: "Wir klären Ziel, Zielgruppe und Kanal und schreiben die Skripte. Jedes Video bekommt eine klare Botschaft.",
        meta: "Skripte / Content-Strategie",
      },
      {
        title: "Drehtag",
        text: `Videograf, Equipment und auf Wunsch ein Model von eCreator. Gebucht als Content Day mit ${day.duration} oder ${dayFull.duration}.`,
        meta: "Videografie / Models",
      },
      {
        title: "Schnitt",
        text: "Wir schneiden für die Formate der Plattformen, hochkant für Reels, Stories und TikTok und in den Formaten, die du sonst brauchst.",
        meta: "Editing",
      },
      {
        title: "Varianten",
        text: "Aus einem Dreh entstehen verschiedene Einstiege und Längen. So lässt sich in der Kampagne testen, welche Version besser ankommt.",
        meta: "Short-Form",
      },
      {
        title: "Ausspielung",
        text: "Die Videos laufen als Ads auf Instagram, Facebook und TikTok oder auf deinen Kanälen. Das Tracking zeigt, was funktioniert, und der nächste Dreh baut darauf auf.",
        meta: "Ads / Tracking",
      },
    ] satisfies StepItem[],
    link: { label: "Wie wir Kampagnen aufsetzen", href: "/performance-marketing" } satisfies LinkRef,
  },

  set: {
    meta: "Am Set",
    title: "Produktion im eigenen Team.",
    text: "Du planst den Dreh mit den Leuten, die auch deine Kampagnen und deine Website bauen. So passt das Video zur Anzeige und die Anzeige zur Landingpage.",
    personLabel: "Content und Videografie",
    personId: "ricardo",
    placeholders: [
      { label: "Behind the Scenes: Videograf mit Kamera am Set, Totale", spec: "Echtes Foto von einem Content Day, Querformat 3:2" },
      { label: "Detail am Set: Kamera, Monitor, Model vor der Kamera", spec: "Echtes Foto, Hochformat 4:5" },
    ],
    todo: "Fotos vom nächsten Content Day nachliefern",
  },

  testimonial: {
    meta: ["Format", "Testimonial"],
    title: "Kundenstimmen als Video.",
    text: "Ein Kunde erzählt in eigenen Worten, wie die Zusammenarbeit läuft. So ein Interview trägt auf der Website, im Verkaufsgespräch und als Ad. Testimonial-Interviews drehen wir an einem Full Content Day.",
    note: "Beispiel für das Format: ein Interview, das eCreator auf LinkedIn veröffentlicht hat.",
  },

  entry: {
    meta: ["Einstieg", "Content Day"],
    /** «Content Day / 4 Stunden» über dem Preis */
    priceLabel: `${day.name} / ${day.duration}`,
    price: day.price.amount,
    title: "Der einfachste Weg zu neuem Material.",
    accent: "Material",
    text: `${day.duration} Dreh mit Videograf und Equipment, fertig geschnitten in ${deliveryOf(day.delivery)}. Mit Model von eCreator CHF ${dayModel.price.amount}.`,
    /** «Im Preis» als Häkchen-Liste in der Preiskarte */
    includedLabel: "Im Preis",
    included: contentDay.includes,
    facts: [
      { k: "Dauer", v: `${day.duration} oder ${dayFull.duration}` },
      { k: "Fertig nach", v: `${deliveryDays(day.delivery)} (${day.duration}) / ${deliveryDays(dayFull.delivery)} (${dayFull.duration})` },
    ],
    primary: { label: "Content Day ansehen", href: "/content-day" } satisfies LinkRef,
    podcast: { label: `Podcast-Studio ab CHF ${podcastFrom.price.amount}`, href: "/podcast-studio" } satisfies LinkRef,
    packagesNote: `Laufend produzieren: In den Paketen ab CHF ${pro.price.amount} pro Monat ist ein monatlicher Content Shoot enthalten.`,
  },

  faq: {
    meta: "Fragen",
    title: "Was oft gefragt wird.",
    items: [
      {
        q: "Was kostet Content-Produktion bei eCreator?",
        a: `Der Einstieg ist ein Content Day: ${day.duration} Dreh für CHF ${day.price.amount}, mit Model von eCreator für CHF ${dayModel.price.amount}. ${contentDay.includes.join(", ").replace(/, ([^,]*)$/, " und $1")} sind im Preis enthalten. Für grössere Produktionen gibt es den Full Content Day mit ${dayFull.duration}, Preis auf Anfrage.`,
      },
      {
        q: "Schreibt ihr auch die Skripte?",
        a: "Ja, Skripte und Content-Strategie gehören zu unserer Content-Produktion. Vor dem Dreh klären wir, welche Botschaft jedes Video tragen soll und für welchen Kanal es gedacht ist.",
      },
      {
        q: "Wie schnell sind die Videos fertig?",
        a: `Nach einem Content Day mit ${day.duration} in ${deliveryOf(day.delivery)}, nach einem Full Content Day mit ${dayFull.duration} in ${deliveryOf(dayFull.delivery)}. ${contentDay.express}`,
      },
      {
        q: "Bekomme ich auch das Rohmaterial?",
        a: "Nicht automatisch. Laut unseren AGB gehören Rohdaten, unbearbeitetes Videomaterial und Projektdateien nicht zu den vereinbarten Nutzungsrechten, ausser das ist ausdrücklich schriftlich vereinbart. Wenn du Rohmaterial brauchst, sag es uns vor dem Dreh.",
      },
      {
        q: "Kann ich laufend Content produzieren lassen?",
        a: `Ja, über die Pakete ${pro.name} und ${advanced.name}. Beide enthalten einen Content Shoot und verbinden die Produktion mit Werbung und Infrastruktur. ${pro.name} kostet CHF ${pro.price.amount}, ${advanced.name} CHF ${advanced.price.amount} pro Monat, Mindestlaufzeit je 6 Monate.`,
      },
    ] satisfies FaqEntry[],
  },

  related: [
    { label: "Content Day", href: "/content-day", text: `Optionen, Preise und Ablauf. Ab CHF ${day.price.amount}.` },
    { label: "Podcast-Studio", href: "/podcast-studio", text: `Aufnehmen, ohne selbst aufzubauen. Ab CHF ${podcastFrom.price.amount}.` },
    { label: "Social Recruiting", href: "/social-recruiting", text: "Recruiting-Videos, Kampagnen und Bewerber-System, mit einem ganzen Content Day." },
    { label: "Meta Ads", href: "/performance-marketing/meta-ads", text: "Wie aus den Videos Kampagnen auf Facebook und Instagram werden." },
  ] satisfies (LinkRef & { text: string })[],

  finalCta: {
    title: ["Erst planen,", "dann drehen."] as [string, string],
    text: "Im kostenlosen Strategie-Call klären wir, welche Videos deine Kampagnen brauchen und ob ein Content Day oder ein Paket besser passt. Du gehst mit einer Prioritätenliste für die nächsten vier Wochen raus.",
  },

  schema: {
    name: "Content-Produktion",
    serviceType: "Videoproduktion für Social Media und Werbung",
    description:
      "Skripte, Dreh mit Videograf und Equipment, Models, Schnitt und Varianten für Social Media, Ads, Recruiting, Testimonials, Image- und Produktvideos.",
    offers: [
      { name: `Content Day ${day.duration}, ${day.price.note}`, price: day.price.amount.replace(/'/g, "") },
      { name: `Content Day ${dayModel.duration}, ${dayModel.price.note}`, price: dayModel.price.amount.replace(/'/g, "") },
    ],
  },
};
