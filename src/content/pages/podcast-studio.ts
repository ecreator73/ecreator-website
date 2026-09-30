import { contentDay, podcastStudio, socialRecruiting } from "@/content/offers";
import { site } from "@/content/site";

/**
 * Seite /podcast-studio (Vertrag C7, docs/PAGES.md). Version 4: helle Seite, das Interview im dunklen Panel.
 * Preise und Leistungsumfang nur aus offers.ts (Briefing, FACTS P07).
 * UNKLAR laut FACTS 9.1 Punkt 7 und darum NICHT behauptet: Standort des Studios, Anzahl Mikrofone,
 * Kameras und Plätze, Betreuung während der Aufnahme, Format und Weg der Datenübergabe, Parkplätze,
 * Vorlaufzeiten, Storno-Regeln (die AGB decken das Studio noch nicht ab). Offene Punkte stehen als
 * sichtbare Platzhalter auf der Seite. Keine Aussage, dass ein bestimmtes Video im Studio entstand.
 */

const [two, four] = podcastStudio.options;
const dayFrom = contentDay.options.find((o) => o.id === "4h");
if (!dayFrom) throw new Error("Content-Day-Option «4h» fehlt in offers.ts");

/** «Studio, Equipment und Aufnahme-Infrastruktur» */
const joinDe = (items: string[]) => items.join(", ").replace(/, ([^,]*)$/, " und $1");
const included = joinDe(podcastStudio.includes);
const onRequest = joinDe(podcastStudio.onRequest);

export type LinkRef = { label: string; href: string };
export type FactRow = { k: string; v?: string; todo?: string };
export type FormatRow = { name: string; text: string; link?: LinkRef };
export type StepItem = { title: string; text: string; meta?: string };
export type PlaceholderSpec = { label: string; spec: string };
export type FaqEntry = { q: string; a: string };

export const podcastStudioPage = {
  meta: {
    title: `Podcast-Studio mieten: ab CHF ${two.price.amount}`,
    description: `Podcast-Studio von eCreator mieten: ${two.duration} CHF ${two.price.amount}, ${four.duration} CHF ${four.price.amount}, inklusive ${included}. ${podcastStudio.onRequest[0]} auf Anfrage.`,
    path: "/podcast-studio",
  },

  crumbs: [{ name: "Podcast-Studio", path: "/podcast-studio" }],

  header: {
    meta: ["Studio", "Podcast-Studio"],
    /** Zeile 1 als Titel (t-h1), Zeile 2 als kleinere graue Unterzeile (t-h2) */
    title: ["Podcast-Studio.", "Aufnehmen, ohne selbst aufzubauen."] as [string, string],
    lead: `Du bringst das Thema und deine Gäste mit. ${included} sind im Preis. Zwei oder vier Stunden, ab CHF ${two.price.amount}.`,
    pricesLink: { label: "Preise ansehen", href: "#preise" } satisfies LinkRef,
  },

  prices: {
    meta: "Preise in CHF",
    title: "Zwei Stunden oder vier.",
    lead: `Du buchst das Studio für eine Aufnahme mit ${two.duration} oder ${four.duration}. ${included} sind immer dabei.`,
    options: podcastStudio.options.map((o) => ({ duration: o.duration, amount: o.price.amount })),
    includedLabel: "Im Preis",
    included: podcastStudio.includes,
    onRequestLabel: "Auf Anfrage",
    onRequest: podcastStudio.onRequest,
    note: "Termin nach Absprache",
  },

  studio: {
    meta: "Das Studio",
    title: "Die Technik steht schon.",
    /** Akzentwort (violett) */
    accent: "Technik",
    text: "Du setzt dich hin, sprichst und nimmst auf. Aufbauen und verkabeln musst du nichts.",
    photos: {
      wide: { label: "Totale: das Studio mit den Sprecherplätzen", spec: "Echtes Foto aus dem Studio, Querformat 3:2" },
      mics: { label: "Detail: Mikrofone am Sprecherplatz", spec: "Echtes Foto, Hochformat 4:5" },
      cams: { label: "Detail: Kameras und Aufnahme-Setup", spec: "Echtes Foto, Hochformat 4:5" },
    } satisfies Record<string, PlaceholderSpec>,
    facts: [
      { k: "Dauer", v: `${two.duration} oder ${four.duration}` },
      { k: "Im Preis", v: podcastStudio.includes.join(" / ") },
      { k: "Auf Anfrage", v: podcastStudio.onRequest.join(" / ") },
      { k: "Standort", todo: "Standort des Studios" },
      { k: "Ausstattung", todo: "Anzahl Mikrofone, Kameras und Plätze" },
      { k: "Übergabe", todo: "Format und Weg der Aufnahmedateien" },
      { k: "Termin", v: "Nach Absprache, über deine Anfrage" },
    ] satisfies FactRow[],
  },

  formats: {
    meta: "Formate",
    title: "Für Unternehmen, die reden wollen.",
    accent: "reden",
    lead: "Aber kein eigenes Studio aufbauen. Vier Formate, für die sich eine Aufnahme lohnt.",
    items: [
      {
        name: "Unternehmens-Podcast",
        text: "Du sprichst in Folgen über dein Fachgebiet, deine Branche und deine Arbeit. So hören Kunden, wie du denkst, bevor ihr euch trefft.",
      },
      {
        name: "Interviews",
        text: "Mit Fachleuten, Partnern oder Gästen aus deiner Branche. Ein Gespräch, das du auf deiner Website und auf LinkedIn weiterverwenden kannst.",
      },
      {
        name: "Kundengespräche",
        text: "Eine Kundin oder ein Kunde erzählt, wie die Zusammenarbeit läuft. In eigenen Worten, für deine Website und dein Verkaufsgespräch.",
      },
      {
        name: "Recruiting-Formate",
        text: "Dein Team erzählt, wie es bei euch arbeitet. So hören Bewerbende, mit wem sie es zu tun haben.",
        link: { label: "Social Recruiting", href: "/social-recruiting" },
      },
    ] satisfies FormatRow[],
  },

  proof: {
    meta: ["Format", "Kundengespräch"],
    title: "So klingt ein Kundengespräch.",
    text: "Ein Kunde erzählt in eigenen Worten, wie die Zusammenarbeit läuft. Solche Gespräche kannst du im Studio aufnehmen.",
    note: "Beispiel für das Format: ein Interview, das eCreator auf LinkedIn veröffentlicht hat. Es zeigt das Format, nicht das Studio.",
  },

  process: {
    meta: "Buchung",
    title: "So läuft eine Buchung.",
    lead: "Vier Schritte von der Anfrage bis zur fertigen Aufnahme. Termine vereinbaren wir direkt mit dir.",
    steps: [
      {
        title: "Anfrage",
        text: "Du schickst uns über das Formular eine Anfrage mit dem Anliegen Podcast-Studio: Wunschdauer, mögliche Termine und worum es geht.",
        meta: `${two.duration} oder ${four.duration}`,
      },
      {
        title: "Termin",
        text: `Wir melden uns, klären Termin und Ablauf und ob du ${onRequest} dazu willst.`,
        meta: "Nach Absprache",
      },
      {
        title: "Aufnahme",
        text: `${included} stehen bereit. Du und deine Gäste konzentriert euch auf das Gespräch.`,
        meta: "Im Preis",
      },
      {
        title: "Nach der Aufnahme",
        text: "Du bekommst deine Aufnahme. Auf Wunsch schneiden wir sie für dich.",
        meta: "Schnitt auf Anfrage",
      },
    ] satisfies StepItem[],
  },

  extras: {
    meta: "Auf Anfrage",
    /** «Schnitt. Planung. Strategie.» als normaler Abschnittstitel */
    title: podcastStudio.onRequest.map((w) => `${w}.`).join(" "),
    text: "Aus einer Aufnahme wird ein Podcast, wenn Format, Themen, Gäste und Schnitt zusammenpassen. Das übernehmen wir auf Anfrage. Du entscheidest, was du selbst machst und was wir machen.",
    note: `${onRequest} sind nicht im Studiopreis enthalten. Umfang und Preis klären wir bei deiner Anfrage.`,
    link: { label: "Content-Produktion ansehen", href: "/content-produktion" } satisfies LinkRef,
  },

  faq: {
    meta: "Fragen",
    title: "Was oft gefragt wird.",
    items: [
      {
        q: "Was kostet das Podcast-Studio?",
        a: `${two.duration} kosten CHF ${two.price.amount}, ${four.duration} CHF ${four.price.amount}. Im Preis sind ${included} enthalten. ${onRequest} gibt es auf Anfrage, sie sind nicht im Studiopreis enthalten.`,
      },
      {
        q: "Muss ich eigene Technik mitbringen?",
        a: `Nein, ${included} sind im Preis enthalten. Du bringst dein Thema und deine Gäste mit. Welche Ausstattung genau bereitsteht, sagen wir dir bei deiner Anfrage.`,
      },
      {
        q: "Schneidet ihr die Aufnahme auch?",
        a: "Ja, auf Anfrage. Der Schnitt ist nicht im Studiopreis enthalten. Umfang und Preis klären wir, wenn du das Studio anfragst.",
      },
      {
        q: "Wie buche ich das Studio?",
        a: `Über das Anfrageformular mit dem Anliegen «Podcast-Studio» oder per Telefon unter ${site.phone.replace("+41 ", "0")}. Sag uns, ob du ${two.duration} oder ${four.duration} brauchst, welche Termine dir passen und worum es in der Aufnahme geht. Wir melden uns mit einem Terminvorschlag.`,
      },
      {
        q: "Helft ihr auch bei Konzept und Themen?",
        a: "Ja, Planung und Strategie gibt es auf Anfrage. Wir klären mit dir Format, Themen und Gäste und wie der Podcast zu deinem übrigen Marketing passt.",
      },
    ] satisfies FaqEntry[],
  },

  related: [
    { label: "Content-Produktion", href: "/content-produktion", text: "Videos für Social Media, Ads und Recruiting, selbst produziert." },
    { label: "Content Day", href: "/content-day", text: `Ein Drehtag mit Videograf, Equipment und Schnitt. Ab CHF ${dayFrom.price.amount}.` },
    { label: "Social Recruiting", href: "/social-recruiting", text: `Recruiting-Videos, Kampagnen und Bewerber-System. CHF ${socialRecruiting.price.amount}.` },
  ] satisfies (LinkRef & { text: string })[],

  finalCta: {
    title: ["Erst das Thema,", "dann das Mikrofon."] as [string, string],
    text: "Im kostenlosen Strategie-Call klären wir, ob ein Podcast zu deinem Marketing passt und wie er zu deinen Kunden kommt. Oder du fragst das Studio direkt an.",
  },

  schema: {
    name: "Podcast-Studio",
    serviceType: "Podcast-Studio zur Miete",
    description: `Podcast-Studio von eCreator zur Miete für ${two.duration} oder ${four.duration}, inklusive ${included}. ${onRequest} auf Anfrage.`,
    offers: podcastStudio.options.map((o) => ({
      name: `Podcast-Studio ${o.duration}`,
      price: o.price.amount.replace(/'/g, ""),
      description: `Inklusive ${included}`,
    })),
  },
};
