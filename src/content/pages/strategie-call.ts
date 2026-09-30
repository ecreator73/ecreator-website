import { strategyCall } from "@/content/site";
import { pinelli } from "@/content/testimonials";
import type { FaqItem } from "@/components/page/Faq";

/**
 * /strategie-call (Vertrag C20, docs/PAGES.md). Die Seite ist die Conversion: kein FinalCta.
 * Quellen: strategyCall in site.ts (Live-Site /termin-buchen/, FACTS 8.6 SC01–SC03),
 * FAQ in eigenen Worten nach der Live-FAQ (R-ABOUT §3.6).
 * Bewusst NICHT verwendet:
 *  - «Termin jederzeit kostenfrei verschieben» (N26, widerspricht AGB Ziff. 9). Keine Verschiebe-Frage im FAQ.
 *  - «Google Meet oder Zoom» (N28): der Kalender vergibt nur Google Meet.
 *  - «Deine Daten werden nicht weiterverkauft» (nicht in strategyCall.promises).
 *  - Antwortzeit «24 Stunden» (K06, LIVE-ANGABE).
 *  - Wer den Call führt: nicht belegt. Claudio und Fabian erscheinen als Geschäftsführung, ohne Zusage.
 */

const quote = (at: string) => {
  const q = pinelli.more?.find((m) => m.at === at);
  if (!q) throw new Error(`Zitat bei ${at} fehlt in testimonials.ts`);
  return q.text;
};

const faq: FaqItem[] = [
  {
    q: "Ist der Strategie-Call wirklich kostenlos?",
    a: `Ja. Der Call kostet nichts und verpflichtet dich zu nichts. Wir nehmen uns ${strategyCall.duration} Zeit, um dein Ziel, dein Angebot und dein Setup zu verstehen.`,
  },
  {
    q: "Was soll ich vorbereiten?",
    a: "Nicht viel. Hilfreich sind dein wichtigstes Ziel, ungefähr dein Werbebudget und die Kanäle, die du heute schon nutzt. Mehr brauchen wir nicht.",
  },
  {
    q: "Wie läuft das Gespräch ab?",
    a: "Per Google Meet. Nach der Buchung bekommst du eine Bestätigung per E-Mail mit dem Link zum Call. Du brauchst nur einen Browser, installieren musst du nichts.",
  },
  {
    q: "Für wen ist der Call gedacht?",
    a: "Für Unternehmen, die über Werbung, Content, Tracking oder Landingpages mehr passende Anfragen gewinnen wollen. Egal, ob du neu startest oder bestehende Kampagnen verbessern willst.",
  },
  {
    q: "Was passiert nach dem Call?",
    a: "Du bekommst eine klare Einschätzung und eine Prioritätenliste für die nächsten vier Wochen. Ob wir danach zusammenarbeiten, entscheidest du. Eine Vertragspflicht gibt es nicht.",
  },
];

export const strategieCallPage = {
  meta: {
    title: "Strategie-Call buchen: 30 Minuten, kostenlos",
    description:
      "Kostenloser Strategie-Call mit eCreator: 30 Minuten per Google Meet. Wir klären dein Ziel, prüfen Funnel und Tracking und legen die nächsten Schritte fest.",
    path: "/strategie-call",
  },
  crumbs: [{ name: "Strategie-Call", path: "/strategie-call" }],
  schema: {
    name: "Strategie-Call",
    serviceType: "Marketingberatung",
    description:
      "Kostenloses Beratungsgespräch von 30 Minuten per Google Meet: Ziel und Angebot klären, Tracking und Funnel prüfen, nächste Schritte festlegen.",
    offers: [{ name: "Strategie-Call, 30 Minuten", price: "0", description: "kostenlos, per Google Meet" }],
  },
  header: {
    meta: ["Strategie-Call", "Google Meet"],
    title: ["Strategie-Call.", "30 Minuten, kostenlos."],
    /** Akzentwort in der H1 */
    accent: "kostenlos",
    lead: "Du wählst direkt einen Termin. In 30 Minuten schauen wir auf deinen Funnel, prüfen dein Tracking und zeigen dir konkrete nächste Schritte.",
    jump: { label: "Lieber schreiben", href: "#schreiben" },
  },
  booking: {
    id: "termin",
    title: "Termin wählen",
    factsCaption: "Der Call",
    facts: [
      { k: "Dauer", v: strategyCall.duration },
      { k: "Kosten", v: strategyCall.price },
      { k: "Medium", v: strategyCall.medium },
      { k: "Zeitzone", v: "Zürich" },
    ],
    promisesLabel: "Das gilt",
    promises: strategyCall.promises,
    peopleLabel: "Geschäftsführung",
    peopleIds: ["claudio", "fabian"],
  },
  agenda: {
    meta: ["Ablauf", strategyCall.duration],
    title: "Drei Punkte. Danach weisst du, was zuerst kommt.",
    items: strategyCall.agenda,
  },
  voice: {
    meta: ["Kundenstimme", "Finanzbranche"],
    quote: quote("00:45"),
    follow: quote("01:35"),
    person: pinelli.person,
    role: `${pinelli.role}, ${pinelli.company}`,
    source: pinelli.source,
    link: { label: "Cases ansehen", href: "/cases" },
  },
  write: {
    id: "schreiben",
    meta: ["Alternative"],
    title: "Lieber schreiben?",
    text: "Wenn dir kein Termin passt oder du zuerst eine Frage hast: Schreib uns. Wir melden uns und schlagen dir einen Termin vor.",
    phoneLabel: "Oder direkt anrufen",
    mailLabel: "E-Mail",
    fallback: "Das Formular wird geladen. Ohne JavaScript erreichst du uns per E-Mail oder Telefon.",
  },
  faq: {
    meta: ["Fragen vor der Buchung"],
    title: "Häufige Fragen",
    items: faq,
  },
  related: {
    title: "Vor dem Call ansehen",
    links: [
      { label: "Pakete und Preise", href: "/pakete", text: "Pro und Advanced mit klaren Monatspreisen." },
      { label: "Potenzialrechner", href: "/rechner", text: "Rechne vorab mit deinen eigenen Zahlen." },
      { label: "Cases", href: "/cases", text: "Arbeit, die man zeigen kann." },
      { label: "Kontakt", href: "/kontakt", text: "Telefon, E-Mail und Adresse." },
    ],
  },
};
