import { site } from "@/content/site";
import { company } from "@/content/company";
import { abs } from "@/lib/schema";

/**
 * /kontakt (Vertrag C21, docs/PAGES.md). Kein FinalCta.
 * Quellen: site.ts / company.ts (Impressum, Kontakt, Handelsregister), FACTS 1.1–1.3 und 8.8.
 * Bewusst NICHT verwendet:
 *  - Öffnungszeiten (K05 UNKLAR: Live-Site 08–18 Uhr vs. Google-Profil 09–19 Uhr).
 *  - Google-Bewertung (Vorgabe für diese Seite).
 *  - Antwortzeit «24 Stunden» (K06, LIVE-ANGABE) im Seitentext.
 *  - «Zürich / Remote» (N05), «Keine langen Verträge» (N27), eingebettete Karte (Datenschutz).
 *  - Ob an der Adresse ein Büro für Besuche besteht (U04: Mehrfirmenadresse, UNKLAR) → Platzhalter.
 */

export const kontaktPage = {
  meta: {
    title: "Kontakt: Anfrage, Telefon und Adresse",
    description:
      "Schreib eCreator über das Formular, ruf an unter 044 974 27 60 oder schreib an info@ecreator.ch. Marketingagentur mit Sitz in Neerach im Kanton Zürich.",
    path: "/kontakt",
  },
  crumbs: [{ name: "Kontakt", path: "/kontakt" }],
  schema: {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Kontakt eCreator",
    url: abs("/kontakt"),
    inLanguage: "de-CH",
    about: { "@id": `${site.url}/#organization` },
  },
  header: {
    meta: ["Kontakt", `${site.address.city} ${site.address.regionCode}`],
    title: ["Kontakt."],
    lead: "Sag uns kurz, worum es geht. Wir melden uns persönlich. Wenn es schneller gehen soll, ruf direkt an.",
    formLink: { label: "Zum Formular", href: "#anfrage" },
    phoneLabel: "Telefon",
    mailLabel: "E-Mail",
  },
  form: {
    id: "anfrage",
    meta: ["Anfrage"],
    title: "Schreib uns.",
    text: "Ein Formular für alle Anliegen. Wähl oben aus, worum es geht, dann können wir uns passend vorbereiten.",
    stepsLabel: "So geht es weiter",
    steps: [
      { title: "Du schreibst uns", text: "Ein paar Sätze zu deinem Ziel, deinem Angebot und dem, was es schon gibt." },
      {
        title: "Wir schauen es uns an",
        text: "Wir prüfen dein Setup, also Tracking, Ads und Landingpage, und zeigen dir konkrete Hebel.",
      },
      { title: "Du entscheidest", text: "Ob und wie wir zusammenarbeiten, entscheidest du danach." },
    ],
    fallback: "Das Formular wird geladen. Ohne JavaScript erreichst du uns per E-Mail oder Telefon.",
  },
  address: {
    meta: ["Adresse", site.address.region],
    lines: [site.address.street, `${site.address.zip} ${site.address.city}`],
    region: "Zürcher Unterland, rund 16 Kilometer nördlich von Zürich",
    mapNote:
      "Wir binden keine Karte ein. Google Maps öffnet sich erst, wenn du auf den Link klickst, vorher gehen keine Daten an Google.",
    rows: [
      { k: "Firma", v: company.legalName },
      { k: "UID", v: company.uid },
      { k: "Register", v: company.register },
    ],
    mapLabel: "In Google Maps öffnen",
    visitLabel: "Besuch vor Ort",
    visitTodo: "Besuche vor Ort, von eCreator zu bestätigen",
    socialsLabel: "Kanäle",
  },
  people: {
    meta: ["Team"],
    title: "Du sprichst mit den Leuten, die es machen.",
    text: "Am Telefon, im Video-Call oder beim Dreh: Bei eCreator redest du mit den Leuten, die deine Kampagnen, Videos und Websites bauen. Das Video ist unser eigenes Ad, gedreht vor der eCreator-Logowand.",
    link: { label: "Mehr über eCreator", href: "/ueber-uns" },
    videoId: "ecreator",
  },
  related: {
    title: "Direkter zum Ziel",
    links: [
      { label: "Strategie-Call buchen", href: "/strategie-call", text: "30 Minuten, kostenlos, per Google Meet." },
      { label: "Pakete und Preise", href: "/pakete", text: "Pro und Advanced mit klaren Monatspreisen." },
      { label: "Potenzialrechner", href: "/rechner", text: "Was dein Werbebudget bringen kann." },
    ],
  },
};
