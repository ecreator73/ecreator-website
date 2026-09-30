import type { Crumb } from "@/lib/schema";

/**
 * /marketingagentur-zuerich · Standortseite (Vertrag C18, docs/PAGES.md).
 *
 * Quellen:
 *  - Sitz / Adresse: FACTS U04 (Impressum, Zefix), site.address
 *  - Region: FACTS U05 («gehört zum Bezirk Dielsdorf und liegt im Zürcher Unterland», de.wikipedia.org/wiki/Neerach;
 *    «rund 16 Kilometer nördlich von Zürich», gemeinde-schweiz.ch)
 *  - Koordinaten der Gemeinde: 47.517 N / 8.467 E laut en.wikipedia.org/wiki/Neerach (R-MARKET §9), gerundet
 *  - Kunden in der Region: work.ts webProjects (Trapletti Thalwil, Credit im Footer; Spitex Nächstenpflege, Credit im Footer)
 *  - Strategie-Call per Video-Call: site.ts strategyCall (FACTS 8.6)
 *  - Content Day vor Ort beim Kunden: Vertrag C18 (Briefing-Vorgabe). Genauer Drehort bleibt Gesprächssache (FACTS 9.1 Punkt 5).
 * Bewusst NICHT genannt: Fahrzeiten, ÖV, Parkplätze (UNKLAR), «Büro in Zürich» (N05), Beschreibung von Büro oder Studio
 * (Mehrfirmenadresse, U04), Standort des Podcast-Studios (UNKLAR), eingebettete Karte (Datenschutz).
 */

export type Scale = { label: string; place: string; text: string };
export type TextItem = { title: string; text: string };

export const standortPage = {
  meta: {
    title: "Marketingagentur im Kanton Zürich",
    description:
      "eCreator ist eine Marketingagentur mit Sitz in Neerach im Zürcher Unterland. Content, Ads, Websites und CRM für Unternehmen in der ganzen Deutschschweiz.",
    path: "/marketingagentur-zuerich",
  },

  crumbs: [{ name: "Marketingagentur Zürich", path: "/marketingagentur-zuerich" }] satisfies Crumb[],

  header: {
    meta: ["Standort", "Kanton Zürich"],
    // weiches Trennzeichen: bricht nur auf schmalen Screens als «Marketing-/agentur», sonst ein Wort
    title: ["Marketing­agentur", "im Kanton Zürich."],
    /** Akzentwort in der H1 */
    accent: "Kanton Zürich",
    lead: "Unser Sitz ist in Neerach im Zürcher Unterland, rund 16 Kilometer nördlich von Zürich. Wir arbeiten für Unternehmen in der ganzen Deutschschweiz: Beratung per Video-Call, Dreh bei dir vor Ort.",
    addressLink: { label: "Adresse und Karte", href: "#adresse" },
    coords: {
      label: "Neerach",
      lat: "47.52° N",
      lon: "8.47° E",
      area: ["Bezirk Dielsdorf", "Kanton Zürich"],
      source: "Koordinaten der Gemeinde laut Wikipedia",
    },
  },

  scale: {
    meta: "Einsatzgebiet",
    title: "Vom Zürcher Unterland in die Deutschschweiz.",
    accent: "Deutschschweiz",
    rows: [
      {
        label: "Sitz",
        place: "Neerach",
        text: "Hier ist die eCreator GmbH im Handelsregister eingetragen, an der Zürcherstrasse 17.",
      },
      {
        label: "Region",
        place: "Zürcher Unterland",
        text: "Neerach gehört zum Bezirk Dielsdorf und liegt rund 16 Kilometer nördlich von Zürich.",
      },
      {
        label: "Kanton",
        place: "Kanton Zürich",
        text: "Zum Beispiel die Website für Trapletti Gipser Maler in Thalwil am Zürichsee.",
      },
      {
        label: "Einsatzgebiet",
        // weiches Trennzeichen: auf dem Handy «DEUTSCH-/SCHWEIZ»
        place: "Deutsch­schweiz",
        text: "Zum Beispiel Website und Video-Kampagnen für Spitex Nächstenpflege, tätig in Zürich, im Aargau und in Schaffhausen.",
      },
    ] satisfies Scale[],
  },

  together: {
    meta: "Zusammenarbeit",
    title: ["Nah genug für den Dreh.", "Digital für alles andere."],
    items: [
      {
        title: "Beratung per Video-Call",
        text: "Der Strategie-Call dauert 30 Minuten und läuft über Google Meet. Du sparst dir die Anfahrt und bekommst trotzdem eine klare Prioritätenliste.",
      },
      {
        title: "Dreh bei dir vor Ort",
        text: "Einen Content Day drehen wir dort, wo dein Unternehmen arbeitet. So zeigen die Videos deinen Betrieb, dein Team und deine Kundschaft. Den genauen Drehort legen wir im Gespräch fest.",
      },
      {
        title: "Kampagnen mit Radius",
        text: "Meta Ads und Google Ads lassen sich auf Regionen eingrenzen: auf einzelne Orte, den Kanton Zürich oder die ganze Deutschschweiz. So zahlst du nur für Menschen, die du auch bedienen kannst.",
      },
    ] satisfies TextItem[],
    link: { label: "So läuft ein Content Day", href: "/content-day" },
  },

  address: {
    meta: "Adresse",
    title: ["Zürcherstrasse 17,", "8173 Neerach."],
    caption: "Datenblatt",
    rows: [
      { k: "Firma", v: "eCreator GmbH" },
      { k: "Strasse", v: "Zürcherstrasse 17" },
      { k: "PLZ und Ort", v: "8173 Neerach" },
      { k: "Bezirk", v: "Dielsdorf" },
      { k: "Kanton", v: "Zürich" },
    ],
    phoneLabel: "Telefon",
    emailLabel: "E-Mail",
    mapsLabel: "In Google Maps öffnen",
    mapsNote: "Wir betten keine Karte ein. Google Maps lädt erst, wenn du auf den Link klickst.",
  },

  services: {
    meta: "Leistungen",
    title: "Was wir für Unternehmen im Kanton Zürich bauen.",
    intro: "Einzeln buchbar oder als Paket. Am stärksten sind die Teile zusammen.",
    contentDay: { label: "Content Day", href: "/content-day", note: "Vier Stunden Dreh, ab CHF 1'990" },
    allLink: { label: "Alle Leistungen im Überblick", href: "/leistungen" },
  },

  proof: {
    meta: ["Webprojekt", "Thalwil ZH"],
    title: "Aus dem Kanton Zürich: eine Website für Trapletti Gipser Maler.",
    labels: { desktop: "Desktop", mobile: "Handy", evidence: "Beleg", visit: "Website öffnen", case: "Projekt im Detail" },
    caseHref: "/cases/trapletti",
  },

  faq: {
    meta: "Fragen",
    title: "Kurz beantwortet.",
    items: [
      {
        q: "Wo ist eCreator?",
        a: "Die eCreator GmbH hat ihren Sitz an der Zürcherstrasse 17 in 8173 Neerach im Zürcher Unterland. Neerach gehört zum Bezirk Dielsdorf und liegt rund 16 Kilometer nördlich von Zürich.",
      },
      {
        q: "Arbeitet ihr nur für Unternehmen im Kanton Zürich?",
        a: "Nein, wir arbeiten für Unternehmen in der ganzen Deutschschweiz. Beratung und Strategie-Call laufen per Video-Call, Kampagnen steuern wir online, und für den Content Day kommen wir zu dir.",
      },
      {
        q: "Kommt ihr für den Dreh zu uns?",
        a: "Ja, den Content Day drehen wir bei dir vor Ort. Den genauen Drehort und was es dort braucht, klären wir vorher im Gespräch.",
      },
      {
        q: "Wie startet eine Zusammenarbeit?",
        a: "Mit einem kostenlosen Strategie-Call von 30 Minuten über Google Meet. Wir klären Ziel und Angebot, prüfen Tracking und Funnel und legen die nächsten Schritte fest.",
      },
    ],
  },

  related: [
    { label: "Über uns", href: "/ueber-uns", text: "Das Team, die Haltung und die Firmendaten." },
    { label: "Leistungen", href: "/leistungen", text: "Content, Performance Marketing, Web, SEO und CRM im Überblick." },
    { label: "Content Day", href: "/content-day", text: "Vier Stunden Dreh, fertig geschnitten. Ab CHF 1'990." },
    { label: "Cases", href: "/cases", text: "Kampagnen, Videos und Websites mit Beleg." },
  ],

  finalCta: {
    title: ["Von Neerach aus", "zu deinen nächsten Kunden."] as [string, string],
  },
};
