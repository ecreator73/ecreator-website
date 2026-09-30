import { cta, nav } from "@/content/site";
import { services } from "@/content/services";
import { tracks, type TrackId } from "@/content/system";
import { packages, socialRecruiting } from "@/content/offers";

/**
 * /leistungen · Übersicht (Vertrag C1, docs/PAGES.md).
 * Gruppierung kommt aus der Navigation (nav.leistungen), Kurztexte aus services.ts.
 * Hier nur, was services.ts nicht hat: Meta Ads, Google Ads, Gruppentexte, Seitentexte.
 * Keine Zahlen, keine Resultate ausser dem Case mit Quelle (cases.ts).
 */

export type HubEntry = {
  name: string;
  href: string;
  text: string;
  tags: string[];
  /** 2 = Unterseite (z.B. Meta Ads unter Performance Marketing) */
  level: 1 | 2;
  /** Preis in CHF aus offers.ts (nur Produkte mit festem Preis) */
  price?: string;
  priceNote?: string;
};

export type HubProof =
  | { kind: "case"; slug: string }
  | { kind: "web"; id: string }
  | { kind: "video"; id: string; caption: [string, string] };

export type HubGroup = {
  id: string;
  title: string;
  text: string;
  /** Ringe im Kreislauf (system.ts), die diese Gruppe berührt */
  rings: string[];
  entries: HubEntry[];
  proof?: HubProof;
};

/** Leistungen, die in services.ts keinen eigenen Eintrag haben (Unterseiten von Performance Marketing). */
const subpages: Record<string, { text: string; tags: string[] }> = {
  "/performance-marketing/meta-ads": {
    text: "Werbung auf Facebook und Instagram mit Reels, Stories und Feed-Anzeigen. Gemessen mit Pixel und Conversion API, also der Schnittstelle, über die Meta Anfragen direkt vom Server erfährt.",
    tags: ["Facebook", "Instagram", "Creative-Tests", "Zielgruppen"],
  },
  "/performance-marketing/google-ads": {
    text: "Suchkampagnen für Menschen, die schon nach deinem Angebot suchen. Im Paket Advanced enthalten, im Pro nicht regulär.",
    tags: ["Suchkampagnen", "Keywords", "Anzeigentexte", "Conversion-Tracking"],
  },
};

const groupCopy: Record<string, { id: string; text: string; rings: TrackId[]; proof?: HubProof }> = {
  "Nachfrage erzeugen": {
    id: "nachfrage",
    text: "Werbung und Social Media bringen dein Angebot zu Menschen, die dich noch nicht kennen. Google Ads holt die ab, die schon danach suchen.",
    rings: ["ads", "content"],
    proof: { kind: "case", slug: "finanzdienstleister-lead-generierung" },
  },
  "Gefunden werden": {
    id: "gefunden",
    text: "Wer bei Google oder einer KI nach deinem Angebot fragt, soll auf dich stossen. SEO optimiert für Suchmaschinen, AEO (Answer Engine Optimization) für die Antworten von ChatGPT, Perplexity und Google AI Overviews.",
    rings: ["web"],
  },
  Infrastruktur: {
    id: "infrastruktur",
    text: "Hier landet jede Anfrage: auf einer Website, die klar erklärt, was du anbietest, und in einem CRM, in dem kein Lead liegen bleibt.",
    rings: ["web", "crm", "data"],
    proof: { kind: "web", id: "trapletti" },
  },
  Produkt: {
    id: "produkt",
    text: "Ein fertig geschnürtes Paket mit festem Preis, für Unternehmen, die neue Mitarbeitende suchen.",
    rings: ["content", "ads", "crm"],
    // Weiches Trennzeichen (U+00AD) in «Personalvermittlungen»: bricht bei 360 px sauber um, statt überzulaufen
    proof: { kind: "video", id: "ecreator", caption:["Eigenes Ad", "Recruiting für Personal­vermittlungen"] },
  },
};

const ringLabel = (id: TrackId) => tracks.find((t) => t.id === id)?.label ?? id;

const entryFor = (link: { label: string; href: string }): HubEntry => {
  const s = services.find((x) => x.href === link.href);
  const sub = subpages[link.href];
  const isRecruiting = link.href === "/social-recruiting";
  return {
    name: s?.name ?? link.label,
    href: link.href,
    // Preis steht bei Social Recruiting gross daneben, deshalb ohne «CHF 5'900.» im Satz
    text: isRecruiting
      ? "Neue Mitarbeitende über Instagram, Facebook und TikTok: ein ganzer Content Day, bis zu zwei Kampagnen und ein Bewerber-System. Werbebudget separat, keine Einstellgarantie."
      : (s?.short ?? sub?.text ?? ""),
    tags: s?.tags ?? sub?.tags ?? [],
    level: link.href.split("/").length > 2 ? 2 : 1,
    ...(isRecruiting ? { price: socialRecruiting.price.amount, priceNote: socialRecruiting.price.note } : {}),
  };
};

export const hubGroups: HubGroup[] = nav.leistungen.map((g) => {
  const copy = groupCopy[g.title];
  return {
    id: copy.id,
    title: g.title,
    text: copy.text,
    rings: copy.rings.map(ringLabel),
    entries: g.links.map(entryFor),
    proof: copy.proof,
  };
});

const contentProduktion = services.find((s) => s.slug === "content-produktion")!;

export const leistungenPage = {
  meta: {
    title: "Leistungen: Content, Ads, Web, SEO & CRM",
    description:
      "Alle Leistungen von eCreator: Performance Marketing, Meta und Google Ads, Content-Produktion, Webdesign, SEO, AEO, CRM und Social Recruiting aus einem Team.",
    path: "/leistungen",
  },
  crumbs: [{ name: "Leistungen", path: "/leistungen" }],
  header: {
    meta: ["Leistungen", "Studio", "Pakete"],
    title: ["Alles, was ein", "System braucht."],
    /** Akzentwort im Titel (violett) */
    accent: "System",
    lead: "Content, Werbung, Website, SEO und CRM aus einem Team. Du kannst mit einer einzelnen Leistung starten oder alles verbinden. Hier siehst du jede Leistung und wo sie im Kreislauf ansetzt.",
    secondary: { label: "Pakete ansehen", href: "/pakete" },
    jumpTitle: "Auf dieser Seite",
  },
  index: {
    title: "Leistungen nach Bereich",
    ringsLabel: "Im Kreislauf",
  },
  caseProof: {
    label: "qualifizierte Leads in drei Monaten",
    meta: "Case / Finanzdienstleistung",
    source: "Quelle: Case Study auf ecreator.ch, 21.02.2026. Zahlen laut eCreator.",
    link: "Case lesen",
  },
  webProof: {
    meta: "Website",
  },
  studio: {
    id: "studio",
    jumpLabel: "Studio",
    meta: ["Content-Produktion", "Content Day", "Podcast-Studio"],
    title: "Studio.",
    lead: "Videos produzieren wir selbst: mit Videograf, Equipment, Models und Schnitt. Für Podcasts buchst du das Studio mit Equipment und Aufnahme-Infrastruktur. Content Day und Podcast-Studio haben feste Preise.",
    entry: {
      name: contentProduktion.name,
      href: contentProduktion.href,
      text: contentProduktion.short,
      tags: contentProduktion.tags,
    },
    video: { id: "naechstenpflege", caption: ["Social Ad", "Spitex Nächstenpflege"] as [string, string] },
    ratesTitle: "Preise Content Day und Podcast-Studio",
    podcastLink: { label: "Podcast-Studio ansehen", href: "/podcast-studio" },
  },
  system: {
    id: "kreislauf",
    jumpLabel: "Kreislauf",
    meta: ["Orientierung", "Systems over campaigns"],
    title: "Wo jede Leistung im Kreislauf ansetzt.",
    accent: "Kreislauf",
    lead: "Fünf Ringe stehen für Content, Werbung, Website, CRM und Daten. Neun Stationen zeigen den Weg vom ersten Kontakt bis zum Kunden. Nach Station 09 beginnt die nächste Runde, mit dem, was funktioniert hat.",
  },
  packages: {
    meta: "Pakete",
    title: "Oder alles zusammen, als Paket.",
    text: "Pro und Advanced bündeln Werbung, Dreh und Infrastruktur zu einem Monatspreis. Mindestlaufzeit 6 Monate, Werbebudget separat.",
    link: { label: "Pakete vergleichen", href: "/pakete" },
    rows: packages.map((p) => ({ id: p.id, name: p.name, amount: p.price.amount, unit: p.price.unit ?? "" })),
  },
  related: [
    { label: "Cases", href: "/cases", text: "Kampagnen, Videos und Websites, mit Quelle." },
    { label: "Potenzialrechner", href: "/rechner", text: "Was dein Werbebudget bringen kann, als Schätzung." },
    { label: "Über uns", href: "/ueber-uns", text: "Claudio, Fabian und Ricardo: wer hinter eCreator steht." },
  ],
  finalCta: { secondary: { label: cta.contact.label, href: cta.contact.href } },
};

export type LeistungenPage = typeof leistungenPage;
