import { contentDay, packages } from "@/content/offers";
import type { Crumb } from "@/lib/schema";

/**
 * /social-media · Seitentexte (Vertrag C8, docs/PAGES.md).
 *
 * Quellen:
 *  - Leistungsumfang (Strategie, Content-Planung, Produktion, Social Ads; Instagram, Facebook, TikTok, LinkedIn):
 *    src/content/services.ts + Briefing (docs/PAGES.md C8), AGB Ziff. 2 «Social Media Marketing» (FACTS 8.1)
 *  - Arbeitsweise (Creative-Pipeline, wöchentliche Tests, Reporting mit Handlung): FACTS M10/M11, VERIFIZIERT
 *  - Preise und Paketinhalte: ausschliesslich src/content/offers.ts (Briefing)
 *  - Budget-Richtwert 3'000 bis 6'000 CHF/Monat: FACTS 9.3, VERIFIZIERT (Live-Site), nur als Richtwert
 *  - Werbebudget nicht im Honorar: AGB Ziff. 7 (FACTS A06)
 *  - Person: src/content/team.ts (Ricardo Sorrilha, Rolle laut Briefing)
 *  - Videos: src/content/work.ts. «Hook» für das Pflege-Video: Dateiname der Quelle
 *    «Pflegezukunft5_aGenZy-Hook-2800.mp4» (FACTS 10.5). Kunde nicht genannt (Freigabe offen).
 * Der Redaktionsplan ist eine BEISPIELSTRUKTUR mit generischen Formaten, keine Kundeninhalte,
 * keine Uhrzeiten, keine Posting-Frequenz als Versprechen.
 * Offen: Community Management / wer veröffentlicht (nicht belegt) → sichtbarer Platzhalter.
 */

const pro = packages.find((p) => p.id === "pro")!;
const dayFrom = contentDay.options.find((o) => o.id === "4h")!;
const proTerm = pro.minTerm.replace(/^Mindestlaufzeit /, "");

export type Fact = { k: string; v: string };
export type PlanCell = { format: string; text: string };
export type PlanWeek = { label: string; cells: [PlanCell, PlanCell, PlanCell] };
export type LinkRef = { label: string; href: string };

export const socialMediaPage = {
  meta: {
    title: "Social Media Agentur Schweiz: Plan, Dreh, Ads",
    description:
      "Social Media Agentur aus dem Kanton Zürich: Strategie, Redaktionsplan, eigene Videoproduktion und Social Ads für Instagram, Facebook, TikTok und LinkedIn.",
    path: "/social-media",
  },

  schema: {
    name: "Social Media Marketing",
    serviceType: "Social Media Marketing",
    description:
      "Social Media für KMU: Strategie, Content-Planung mit Redaktionsplan, Videoproduktion mit eigenem Team und bezahlte Kampagnen auf Instagram, Facebook, TikTok und LinkedIn.",
  },

  crumbs: [
    { name: "Leistungen", path: "/leistungen" },
    { name: "Social Media", path: "/social-media" },
  ] satisfies Crumb[],

  header: {
    meta: ["Leistung", "Nachfrage erzeugen"],
    title: ["Social Media", "mit Plan, Produktion", "und Budget."],
    lead: "Wir planen, was du zeigst, drehen es selbst und bringen es mit bezahlten Kampagnen zu den Leuten, die du erreichen willst. Auf Instagram, Facebook, TikTok und, wo es passt, LinkedIn.",
    facts: [
      { k: "Kanäle", v: "Instagram, Facebook, TikTok, LinkedIn" },
      { k: "Produktion", v: "Eigenes Team: Videograf, Equipment, Schnitt" },
      { k: "Im Paket", v: `Pro, CHF ${pro.price.amount} ${pro.price.unit}` },
      { k: "Nur Dreh", v: `Content Day ab CHF ${dayFrom.price.amount}` },
    ] satisfies Fact[],
  },

  /** Abgrenzung: kein reines Posting. Links durchgestrichen, rechts, was stattdessen zählt. */
  contrast: {
    meta: "Abgrenzung",
    title: "Kein Posting-Service. Ein Teil des Systems.",
    lead: "Beiträge sind bei uns kein Selbstzweck. Sie holen Aufmerksamkeit, bauen Vertrauen auf oder führen zur Anfrage, und wir messen, was davon passiert.",
    rows: [
      { not: "Posten, weil Dienstag ist.", but: "Jeder Beitrag hat eine Aufgabe: Aufmerksamkeit, Vertrauen oder Anfrage." },
      { not: "Likes zählen.", but: "Anfragen zählen, und wir sehen, von welchem Beitrag sie kommen." },
      { not: "Ein Video für alle Kanäle.", but: "Formate, die zum Kanal passen, und Varianten, die wir gegeneinander testen." },
      { not: "Content ohne Budget.", but: "Die stärksten Beiträge bekommen Werbebudget und erreichen die Leute, die du suchst." },
    ],
  },

  /** Bausteine der Leistung, mit der Person, die Social Media und Content verantwortet. */
  parts: {
    meta: "So arbeiten wir",
    title: "Vier Teile. Ein Team.",
    lead: "Strategie, Planung, Dreh und Kampagnen liegen bei einem Team. Darum passt das Video zur Anzeige und die Anzeige zur Seite, auf der die Anfrage landet.",
    personId: "ricardo",
    personLabel: "Social Media, Content, Videografie",
    items: [
      {
        title: "Strategie",
        text: "Wen willst du erreichen, mit welchem Angebot, auf welchem Kanal? Daraus entstehen die Themen und die Zahl, an der wir Erfolg messen.",
      },
      {
        title: "Content-Planung",
        text: "Ein Redaktionsplan legt fest, welches Format welche Aufgabe übernimmt. Beiträge und Anzeigen kommen aus demselben Plan.",
      },
      {
        title: "Produktion",
        text: "Skripte, Dreh und Schnitt macht unser eigenes Team, mit Videograf, Equipment und bei Bedarf einem Model von eCreator.",
        link: { label: "Content-Produktion", href: "/content-produktion" },
      },
      {
        title: "Social Ads und Kampagnen",
        text: "Bezahlte Kampagnen auf Meta (Facebook, Instagram) und TikTok, optimiert auf Anfragen statt auf Klicks. Neue Einstiege und Varianten testen wir laufend, was funktioniert, bekommt mehr Budget.",
        link: { label: "Meta Ads", href: "/performance-marketing/meta-ads" },
      },
    ] as { title: string; text: string; link?: LinkRef }[],
    todo: "Umfang Community Management (Kommentare, Nachrichten) und wer die Beiträge veröffentlicht, von eCreator bestätigen",
  },

  /** Beispielstruktur eines Monats. Generische Formate, keine Kundeninhalte, keine Uhrzeiten. */
  plan: {
    meta: ["Redaktionsplan", "Beispielstruktur"],
    title: "Ein Monat, geplant, bevor gedreht wird.",
    lead: "So ist ein Monat aufgebaut: Jede Woche hat einen Beitrag für Aufmerksamkeit, einen für Vertrauen und einen für die Anfrage. Die Formate sind Beispiele. Was drinsteht, kommt aus deinem Angebot.",
    roles: [
      { name: "Aufmerksamkeit", text: "Neue Leute stoppen" },
      { name: "Vertrauen", text: "Zeigen, wer dahintersteht" },
      { name: "Anfrage", text: "Den nächsten Schritt leicht machen" },
    ],
    weeks: [
      {
        label: "Woche 1",
        cells: [
          { format: "Hook-Video", text: "Die wichtigste Aussage gleich am Anfang, bevor weitergewischt wird." },
          { format: "Team-Video", text: "Wer du bist und wie ihr arbeitet, gezeigt statt behauptet." },
          { format: "Angebots-Video", text: "Was du anbietest, für wen, und wie man anfragt." },
        ],
      },
      {
        label: "Woche 2",
        cells: [
          { format: "Frage aus dem Alltag", text: "Eine Frage, die deine Kundschaft wirklich stellt." },
          { format: "Testimonial", text: "Kundinnen und Kunden erzählen in eigenen Worten." },
          { format: "Anzeige in zwei Varianten", text: "Zwei Einstiege, gleiches Angebot. Der bessere bleibt." },
        ],
      },
      {
        label: "Woche 3",
        cells: [
          { format: "Behind the Scenes", text: "Ein Blick in Werkstatt, Büro oder Praxis." },
          { format: "Kurz erklärt", text: "Ein Begriff, ein häufiger Fehler oder ein Tipp aus deinem Fach." },
          { format: "Einwand beantwortet", text: "Die häufigste Frage vor dem Kauf, direkt beantwortet." },
        ],
      },
      {
        label: "Woche 4",
        cells: [
          { format: "Trend-Format", text: "Ein aktuelles Format, auf dein Thema übertragen." },
          { format: "Ablauf gezeigt", text: "So läuft die Zusammenarbeit, Schritt für Schritt." },
          { format: "Erinnerung", text: "Retargeting, also eine Anzeige für Leute, die dich schon gesehen haben." },
        ],
      },
    ] satisfies PlanWeek[],
    loop: {
      label: "Monatsende",
      text: "Auswertung: Welche Beiträge haben Anfragen gebracht? Das prägt den Plan für den nächsten Monat.",
    },
    frames: [
      { id: "pflegezukunft", caption: ["Hook-Video", "Pflege"], label: "Hook-Video zum Thema Pflege, Social Ad" },
      { id: "fitness", caption: ["Instagram", "Fitness"], label: "Video zum Thema Fitness, Training im Studio" },
    ] as { id: string; caption: [string, string]; label: string }[],
    framesNote: "Formate aus echten eCreator-Produktionen",
  },

  channels: {
    meta: "Kanäle",
    title: "Vier Kanäle. Nicht jeder passt zu jedem Angebot.",
    items: [
      { name: "Instagram", text: "Reels, Stories und Feed. Kurze Videos im Hochformat, als Beitrag und als Anzeige." },
      { name: "Facebook", text: "Läuft über dasselbe Werbekonto wie Instagram. Eine Kampagne kann auf beiden Plattformen ausgespielt werden." },
      { name: "TikTok", text: "Videos, die wie TikTok aussehen und nicht wie Werbung. Als Beitrag und als TikTok Ads." },
      { name: "LinkedIn", text: "Wo es passt: für Angebote an Unternehmen und für Themen als Arbeitgeber." },
    ],
    note: "Welche Kanäle für dich Sinn ergeben, klären wir im Strategie-Call.",
  },

  /** Preis: Social Media ist Kern des Pakets Pro (Fokus laut offers.ts). */
  price: {
    meta: "Im Paket",
    amount: pro.price.amount,
    unit: pro.price.unit ?? "pro Monat",
    title: `Social Media, Ads und Dreh im Paket ${pro.name}.`,
    text: `${pro.summary} Das Werbebudget kommt separat dazu. Als Richtwert für saubere Tests empfehlen wir CHF 3'000 bis 6'000 pro Monat.`,
    includesLabel: "Enthalten",
    includes: pro.includes,
    facts: [
      { k: "Laufzeit", v: `Mindestens ${proTerm}` },
      { k: "Werbebudget", v: "Nicht im Paketpreis, geht direkt an Meta oder TikTok" },
      { k: "Nur Produktion", v: `Content Day ab CHF ${dayFrom.price.amount}` },
    ] satisfies Fact[],
    packagesLink: { label: "Pakete vergleichen", href: "/pakete" } satisfies LinkRef,
  },

  faq: {
    meta: "Fragen",
    title: "Was oft gefragt wird.",
    items: [
      {
        q: "Was gehört bei eCreator zu Social Media?",
        a: "Strategie, Content-Planung, Produktion und bezahlte Kampagnen. Wir planen die Beiträge in einem Redaktionsplan, drehen sie mit eigenem Team und bringen die wichtigsten mit Social Ads zu den Leuten, die du erreichen willst.",
      },
      {
        q: "Welche Kanäle betreut ihr?",
        a: "Instagram, Facebook, TikTok und LinkedIn. Welche davon für dich sinnvoll sind, hängt von deinem Angebot und deiner Zielgruppe ab. Das klären wir im kostenlosen Strategie-Call.",
      },
      {
        q: "Was kostet Social Media mit eCreator?",
        a: `Im Paket ${pro.name} kostet es CHF ${pro.price.amount} ${pro.price.unit}, die Mindestlaufzeit beträgt ${proTerm}. Enthalten sind unter anderem Meta- und Social Ads und ein monatlicher Content Shoot mit Videograf, Schnitt und Model. Nur die Produktion gibt es als Content Day ab CHF ${dayFrom.price.amount}.`,
      },
      {
        q: "Ist das Werbebudget im Preis enthalten?",
        a: "Nein. Das Werbebudget geht direkt an Meta oder TikTok und kommt zum Honorar dazu. Als Richtwert für saubere Tests empfehlen wir CHF 3'000 bis 6'000 pro Monat.",
      },
      {
        q: "Reicht es nicht, regelmässig zu posten?",
        a: "Posten allein ist schwer planbar. Ohne Werbebudget entscheidet der Algorithmus, wer deine Beiträge sieht. Mit Kampagnen legst du fest, wen du erreichst, und mit Tracking siehst du, welche Beiträge zu Anfragen führen.",
      },
    ],
  },

  related: [
    { label: "Content-Produktion", href: "/content-produktion", text: "Skripte, Dreh und Schnitt mit eigenem Team." },
    { label: "Meta Ads", href: "/performance-marketing/meta-ads", text: "Kampagnen auf Facebook und Instagram." },
    { label: "Content Day", href: "/content-day", text: `Vier Stunden Dreh, ab CHF ${dayFrom.price.amount}.` },
    { label: "Pakete", href: "/pakete", text: `Pro ab CHF ${pro.price.amount} ${pro.price.unit}.` },
  ] satisfies (LinkRef & { text: string })[],

  finalCta: {
    title: ["Lass uns planen, was", "deine Kunden sehen."] as [string, string],
    secondary: { label: "Paket Pro anfragen", href: "/kontakt?anliegen=pakete" } satisfies LinkRef,
  },
};
