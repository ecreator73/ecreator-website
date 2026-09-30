import { socialRecruiting } from "@/content/offers";
import type { Crumb } from "@/lib/schema";

/**
 * /social-recruiting · Seitentexte (Vertrag C13, docs/PAGES.md).
 *
 * Quellen:
 *  - Paketpreis, Bestandteile, Hinweise: ausschliesslich src/content/offers.ts (Briefing, FACTS P06)
 *    → keine Einstellgarantie, Werbebudget nicht inklusive (AGB Ziff. 7 und 11)
 *  - Leistungsbausteine Recruiting-Funnel, Vorqualifizierung, Follow-ups, Termin-Handling:
 *    Live-Site /unsere-leistungen/, FACTS L04, VERIFIZIERT
 *  - Stellenmeldepflicht: arbeit.swiss (SECO), abgerufen 29.09.2026 (wie Insight «social-recruiting-ablauf»)
 *  - Proof: Ad für Spitex Nächstenpflege (Kunde im Abspann, Website-Credit, work.ts / cases.ts, belegt)
 *    und das eigene eCreator-Ad für Personalvermittlungen (work.ts, VERIFIZIERT)
 * Bewusst NICHT genannt: Recruiting-Kennzahlen (keine belegt), empfohlenes Werbebudget (offen, FACTS 9.1 Pkt. 6),
 * Folgekosten nach dem ersten Monat (offen) → sichtbarer Platzhalter, Drehort (offen), MWST-Status (offen).
 */

const inc = socialRecruiting.includes;
const [noteBudget, noteGuarantee] = socialRecruiting.notes;

export type Fact = { k: string; v: string };
export type LinkRef = { label: string; href: string };

export const socialRecruitingPage = {
  meta: {
    title: "Social Recruiting Schweiz: Paket für CHF 5'900",
    description: `Social Recruiting für CHF ${socialRecruiting.price.amount}: Content Day, Recruiting-Videos, bis zu 2 Kampagnen auf Meta und TikTok und ein Bewerber-System. Werbebudget separat.`,
    path: "/social-recruiting",
  },

  schema: {
    name: "Social Recruiting",
    serviceType: "Social Recruiting",
    description:
      "Mitarbeitende über Social Media finden: Content Day mit Recruiting-, Team- und Image-Videos, bis zu zwei Kampagnen auf Meta und TikTok, ein Monat Kampagnenverwaltung und ein Bewerber-System.",
    offers: [
      {
        name: "Social Recruiting (Paket)",
        price: socialRecruiting.price.amount.replace(/'/g, ""),
        description: `${inc.join(", ")}. ${noteBudget}`,
      },
    ],
  },

  crumbs: [
    { name: "Leistungen", path: "/leistungen" },
    { name: "Social Recruiting", path: "/social-recruiting" },
  ] satisfies Crumb[],

  header: {
    meta: ["Produkt", "Social Recruiting"],
    title: ["Social Recruiting.", "Bewerbungen über Instagram und TikTok."] as [string, string],
    /** Akzentwort in der H1 (violett), muss wörtlich in einer Titelzeile stehen */
    accent: "Bewerbungen",
    lead: "Ein Inserat sehen die Leute, die gerade suchen. Mit Videos auf Instagram, Facebook und TikTok erreichst du auch die anderen. Wir drehen mit deinem Team, schalten die Kampagnen und bauen das Bewerber-System, in dem jede Bewerbung landet.",
    packageLink: { label: "Was im Paket ist", href: "#paket" } satisfies LinkRef,
    facts: [
      { k: "Paketpreis", v: `CHF ${socialRecruiting.price.amount}` },
      { k: "Kanäle", v: "Meta (Facebook, Instagram), TikTok" },
      { k: "Kampagnen", v: "Bis zu 2" },
      { k: "Betreuung", v: "1 Monat Kampagnenverwaltung" },
      { k: "Werbebudget", v: "Nicht im Paketpreis" },
    ] satisfies Fact[],
  },

  /** Gegenüberstellung: links ein nüchternes Inserat-Muster, rechts ein echtes Ad (9:16). */
  versus: {
    meta: "Zwei Wege zur Bewerbung",
    title: "Ein Inserat wartet. Ein Video kommt zu den Leuten.",
    accent: "Video",
    ad: {
      label: "Stelleninserat",
      /** generisches Muster, keine echte Stelle, kein Kunde */
      sample: {
        tag: "Muster",
        intro: "Wir suchen per sofort oder nach Vereinbarung",
        role: "[Berufsbezeichnung]",
        pensum: "80–100 %",
        blocks: [
          { k: "Ihre Aufgaben", v: "Selbstständige Ausführung aller anfallenden Arbeiten im Bereich …" },
          { k: "Ihr Profil", v: "Abgeschlossene Ausbildung, mehrjährige Berufserfahrung, Teamfähigkeit, Belastbarkeit." },
          { k: "Wir bieten", v: "Ein motiviertes Team und zeitgemässe Anstellungsbedingungen." },
        ],
        apply: "Senden Sie uns Ihre vollständigen Bewerbungsunterlagen mit Lebenslauf, Zeugnissen und Motivationsschreiben.",
      },
      facts: [
        { k: "Erreicht", v: "Wer gerade aktiv sucht" },
        { k: "Format", v: "Text mit Aufgaben und Anforderungen" },
        { k: "Bewerbung", v: "Unterlagen, oft am Computer" },
      ] satisfies Fact[],
    },
    video: {
      label: "Recruiting-Video",
      workId: "naechstenpflege",
      caption: ["Spitex Nächstenpflege", "Angehörige gewinnen"] as [string, string],
      text: "Echtes Beispiel: Dieses Ad spricht pflegende Angehörige direkt an. Wer sich angesprochen fühlt, meldet sich über die Website an.",
      facts: [
        { k: "Erreicht", v: "Auch wer gerade nicht sucht" },
        { k: "Format", v: "Video mit echten Menschen" },
        { k: "Bewerbung", v: "Kurzes Formular auf dem Handy" },
      ] satisfies Fact[],
      caseLink: { label: "Projekt Spitex Nächstenpflege", href: "/cases/spitex-naechstenpflege" } satisfies LinkRef,
    },
  },

  /** Paket: Preis als schlichte Zahl, Bestandteile gruppiert, jede Zeile wörtlich aus offers.ts. */
  pack: {
    meta: "Das Paket",
    amount: socialRecruiting.price.amount,
    note: socialRecruiting.price.note,
    title: "Alles, was der Kanal braucht. Zu einem Preis.",
    accent: "einem Preis",
    groups: [
      { k: "Dreh", items: inc.slice(0, 5) },
      { k: "Kampagnen", items: inc.slice(5, 9) },
      { k: "System", items: inc.slice(9) },
    ],
    notIncluded: { k: "Nicht enthalten", v: "Werbebudget. Es geht direkt an Meta und TikTok." },
    /** Werbebudget steht schon in der Zeile «Nicht enthalten», darum hier nur der Garantie-Hinweis. */
    notes: [noteGuarantee],
    todo: "Folgekosten nach dem ersten Monat (Kampagnenverwaltung, Bewerber-System) von eCreator bestätigen",
    callLink: { label: "Zuerst ein Strategie-Call", href: "/strategie-call" } satisfies LinkRef,
  },

  /** Ehrliche Abgrenzung zur Personalvermittlung, mit dem eigenen Ad als Beleg. */
  agency: {
    meta: "Abgrenzung",
    /** weiches Trennzeichen, damit das lange Wort auf 360 px umbrechen kann */
    title: "Wir sind keine Personal­vermittlung.",
    lead: "Eine Personalvermittlung bringt dir Personen. Wir bauen dir den Kanal, über den sich Leute direkt bei dir bewerben.",
    columns: ["Personalvermittlung", "Social Recruiting mit eCreator"] as [string, string],
    rows: [
      {
        k: "Aufgabe",
        a: "Sucht passende Personen für dich und stellt sie dir vor.",
        b: "Dreht die Videos, schaltet die Kampagnen und baut das Bewerber-System.",
      },
      {
        k: "Auswahl",
        a: "Die Vermittlung trifft eine Vorauswahl.",
        b: "Du entscheidest. Jede Bewerbung kommt direkt zu dir.",
      },
      {
        k: "Kontakt",
        a: "Läuft zuerst über die Vermittlung.",
        b: "Direkt zwischen dir und den Bewerbenden, vom ersten Formular an.",
      },
    ],
    own: {
      workId: "ecreator-recruiting",
      caption: ["Eigenes Ad", "Recruiting mit Social Ads"] as [string, string],
      label: "Eigenes Ad von eCreator: Recruiting mit Social Ads",
      text: "So werben wir selbst für Social Recruiting: Video und Social Ads statt Stellenportal, die Bewerbenden werden vorqualifiziert und landen direkt im Recruiting-CRM.",
    },
  },

  process: {
    meta: "Ablauf",
    title: "Vom Gespräch bis zur ersten Bewerbung.",
    lead: "Fünf Schritte. Dauer und Werbebudget hängen von Stelle, Region und Zeitplan ab, das klären wir vor dem Start.",
    steps: [
      { title: "Gespräch", text: "Welche Stelle, welche Region, wen suchst du? Daraus entstehen Botschaft und Drehplan." },
      { title: "Content Day", text: "Ein ganzer Drehtag mit deinem Team: Recruiting-Ads, Team-Videos, Image-Videos und Fotos." },
      { title: "Kampagnen", text: "Bis zu zwei Kampagnen auf Meta und TikTok, mit den Videos aus dem Drehtag." },
      { title: "Bewerbungen", text: "Wer sich bewirbt, füllt ein kurzes Formular aus. Jede Bewerbung landet im Bewerber-System." },
      { title: "Betreuung", text: "Einen Monat lang verwalten wir die Kampagnen, schauen auf die Zahlen und passen an." },
    ],
  },

  system: {
    meta: "Bewerber-System",
    term: "Bewerber-System",
    definition:
      "Ein Bewerber-System ist ein Recruiting-CRM, also eine Datenbank für Bewerbende. Jede Bewerbung landet dort mit allen Angaben, der Quelle und dem aktuellen Stand, statt verstreut in E-Mail-Postfächern.",
    title: "Jede Bewerbung hat einen Stand.",
    lead: "Dein Team sieht auf einen Blick, wer neu ist, wer schon ein Gespräch hatte und wer noch auf eine Antwort wartet.",
    stations: [
      { name: "Neu", text: "Die Bewerbung ist da, mit Angaben aus dem Formular und der Kampagne, aus der sie kommt." },
      { name: "Vorqualifiziert", text: "Ein paar Fragen im Formular, etwa zu Ausbildung, Pensum oder Eintritt, zeigen früh, wer passt." },
      { name: "Kontaktiert", text: "Jemand aus deinem Team meldet sich. Nachfassen und Terminvereinbarung gehören zum Prozess." },
      { name: "Gespräch", text: "Das Vorstellungsgespräch findet statt. Der Entscheid liegt bei dir." },
    ],
    stationsNote: "Beispiel für die Stationen einer Bewerbung",
    speed: {
      k: "Warum Tempo zählt",
      v: "Wer sich am Sonntagabend auf dem Handy bewirbt, will nicht lange auf eine Antwort warten. Das System zeigt, welche Bewerbung noch offen ist.",
    },
    crmLink: { label: "CRM & Automation", href: "/crm-automation" } satisfies LinkRef,
  },

  faq: {
    meta: "Fragen",
    title: "Was vor dem Start geklärt sein sollte.",
    items: [
      {
        q: "Was kostet Social Recruiting bei eCreator?",
        a: `Das Paket kostet CHF ${socialRecruiting.price.amount}. Enthalten sind ${inc[0].replace(/^1 /, "ein ")}, Recruiting-, Team- und Image-Videos, Fotos, bis zu zwei Kampagnen auf Meta und TikTok, ein Monat Kampagnenverwaltung und ein Bewerber-System. Das Werbebudget kommt dazu.`,
      },
      {
        q: "Wie viel Werbebudget brauche ich?",
        a: "Das hängt von Region, Beruf und Laufzeit der Kampagne ab. Das Werbebudget geht direkt an Meta und TikTok und ist nicht im Paketpreis enthalten. Wie hoch es sein sollte, klären wir vor dem Start im Gespräch.",
      },
      {
        q: "Garantiert ihr Einstellungen?",
        a: `Nein. ${noteGuarantee} Ob aus einer Bewerbung ein Vertrag wird, hängt auch von Lohn, Arbeitszeiten, Arbeitsweg und deiner Reaktionszeit ab.`,
      },
      {
        q: "Seid ihr eine Personalvermittlung?",
        a: "Nein. Wir stellen dir keine Kandidatinnen und Kandidaten vor und entscheiden nicht mit, wen du einstellst. Die Bewerbungen kommen direkt zu dir, Auswahl, Gespräche und Vertrag bleiben bei dir.",
      },
      {
        q: "Auf welchen Kanälen laufen die Kampagnen?",
        a: "Auf Meta, also Facebook und Instagram, und auf TikTok. Im Paket sind bis zu zwei Kampagnen enthalten.",
      },
      {
        q: "Gilt die Stellenmeldepflicht auch für Social Media?",
        a: "Ja, wenn deine Stelle meldepflichtig ist. Das ist sie, wenn sie zu einer Berufsart mit schweizweit mindestens 5 Prozent Arbeitslosigkeit gehört. Dann meldest du sie zuerst dem RAV und darfst sie erst fünf Arbeitstage nach der Publikation im Job-Room anderweitig ausschreiben, auch auf Social Media. Ob deine Stelle betroffen ist, zeigt der Check-up auf arbeit.swiss.",
      },
    ],
  },

  related: [
    { label: "Content Day", href: "/content-day", text: "Der Drehtag, der im Paket steckt." },
    { label: "CRM & Automation", href: "/crm-automation", text: "Wie Nachfassen und Termine automatisch laufen." },
    { label: "Social Recruiting im Detail", href: "/insights/social-recruiting-ablauf", text: "Der Ablauf Schritt für Schritt, mit Stellenmeldepflicht." },
    { label: "Case Spitex Nächstenpflege", href: "/cases/spitex-naechstenpflege", text: "Video, Kampagne und Website mit einer Botschaft." },
  ] satisfies (LinkRef & { text: string })[],

  finalCta: {
    title: ["Lass uns über deine", "offenen Stellen reden."] as [string, string],
    text: "Kostenlos, per Video-Call. Wir schauen uns an, wen du suchst, wo diese Leute unterwegs sind und ob Social Recruiting für deine Stelle passt.",
  },
};
