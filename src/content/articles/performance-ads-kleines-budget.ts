import type { ArticleContent } from "./types";
import { strategyCall } from "@/content/site";
import { packages } from "@/content/offers";

/**
 * Insight: Performance Ads mit kleinem Budget. Ersetzt den Live-Artikel «Von 0 auf 50 Anfragen»
 * (FACTS 4.2). Der anonyme Fall wird NICHT als Beleg verwendet (N16, N19, N20, N37: keine +320 %,
 * keine 60 %, keine 225/58 CHF, keine fremden Google-Bewertungen, kein Zitat).
 * Übernommen nur, was FACTS als Methodik/Leitfaden freigibt:
 *  - Rechenbeispiel Auftragswert × Abschlussquote (CB09, VERIFIZIERT als Rechenbeispiel)
 *  - Eignungs-Leitfaden 1–3 Kantone, Auftragswert ab 500 CHF (CB10, VERIFIZIERT als Leitfaden)
 *  - Budget-Richtwert 3'000–6'000 CHF (KZ12, eCreator-Empfehlung)
 *  - Arbeitsprinzipien: Tracking vor Skalierung, wöchentliche Tests, keine Gewinnspiele (M11, M12)
 * Mindestlaufzeit aus offers.ts. Lernphase laut Meta-Hilfebereich (sources).
 */
const minTerm = packages[0].minTerm.replace("Mindestlaufzeit ", "");

export const article: ArticleContent = {
  summary:
    "Ein kleines Werbebudget kann funktionieren, wenn es fokussiert eingesetzt wird: ein Angebot, eine Zielgruppe, ein Kanal, eine passende Landingpage und sauberes Tracking. Als Richtwert für saubere Tests empfehlen wir 3'000 bis 6'000 Franken Werbebudget pro Monat, 3'000 Franken sind also das untere Ende. Wichtiger als der Betrag ist, dass das Fundament steht, bevor das Geld in Reichweite fliesst.",
  takeaways: [
    "Werbebudget ist das Geld, das an Meta oder Google geht. Betreuung und Produktion kommen separat dazu.",
    "Rechne rückwärts: Wie viel darf eine Anfrage kosten, damit sich ein Auftrag für dich lohnt?",
    "Kleines Budget heisst Fokus: ein Angebot, eine Zielgruppe, ein Kanal. Zu viele Kampagnen verhungern.",
    "Fundament vor Reichweite: Angebot, Landingpage, Creatives und Tracking müssen stehen, bevor das Budget steigt.",
    "Plane mehrere Monate ein und werte wöchentlich aus. Die ersten Wochen sind Lernzeit, nicht das Endergebnis.",
  ],
  blocks: [
    {
      type: "p",
      text: "«3'000 Franken reichen doch nicht für Werbung in der Schweiz.» Diesen Satz hören wir oft. Er stimmt, wenn das Geld auf fünf Kampagnen, drei Zielgruppen und eine Startseite ohne klares Angebot verteilt wird. Er stimmt nicht unbedingt, wenn das Budget fokussiert eingesetzt wird und das Fundament steht.",
    },
    {
      type: "p",
      text: "Dieser Ratgeber zeigt, was du mit einem kleinen Budget realistisch planen kannst, wo es typischerweise versickert und wie ein Start aussieht, der dir verwertbare Zahlen liefert.",
    },

    { type: "h2", text: "Was 3'000 Franken im Monat bedeuten" },
    {
      type: "p",
      text: "Zuerst eine Begriffsklärung. Mit Werbebudget meinen wir das Geld, das direkt an Meta, Google oder TikTok geht. Betreuung, Content-Produktion und Landingpages kosten zusätzlich. Bei eCreator ist das Werbebudget nie im Paketpreis enthalten. Wer beides vermischt, rechnet sich eine Kampagne schön oder schlecht.",
    },
    {
      type: "p",
      text: "Als Richtwert für saubere Tests empfehlen wir 3'000 bis 6'000 Franken Werbebudget pro Monat. Damit bekommen die Plattformen genug Daten, um zu lernen, und du bekommst genug Anfragen, um Entscheidungen zu treffen. 3'000 Franken sind das untere Ende dieses Rahmens. Das kann reichen, lässt aber wenig Spielraum für Umwege.",
    },

    { type: "h2", text: "Rechne rückwärts: Was darf eine Anfrage kosten?" },
    { type: "p", text: "Bevor du über das Budget sprichst, kläre, wie viel dir eine Anfrage wert ist. Die Rechnung ist einfach:" },
    {
      type: "table",
      head: ["Grösse", "Rechnung"],
      rows: [
        ["Umsatz pro Anfrage", "Ø Auftragswert × Abschlussquote"],
        ["Anfragen pro Monat", "Werbebudget ÷ Kosten pro Anfrage"],
        ["Aufträge pro Monat", "Anfragen × Abschlussquote"],
      ],
      caption: "Alle Werte pro Monat",
    },
    {
      type: "p",
      text: "Ein Rechenbeispiel: Bei einem durchschnittlichen Auftrag von 2'000 Franken und einer Abschlussquote von 20 % bringt jede Anfrage im Schnitt 400 Franken Umsatz. Wie viel davon du für eine Anfrage ausgeben kannst, hängt von deiner Marge ab. Diese Grenze ist dein Zielwert für die Kosten pro Anfrage, auf Englisch Cost per Lead oder kurz CPL. An ihm misst du jede Kampagne.",
    },
    {
      type: "p",
      text: "Mit deinen eigenen Zahlen rechnest du im [Potenzialrechner](/rechner). Die Werte dort sind Beispiele, keine Prognose.",
    },

    { type: "h2", text: "Wo kleine Budgets versickern" },
    { type: "p", text: "Bei kleinen Budgets fällt jeder Fehler stärker ins Gewicht. Diese fünf sehen wir am häufigsten:" },
    {
      type: "ol",
      items: [
        "**Zu viel auf einmal.** Drei Angebote, vier Zielgruppen, zwei Plattformen. Jede Kampagne bekommt ein paar Franken am Tag, und keine sammelt genug Daten.",
        "**Zu früh zu viel geändert.** Nach dem Start und nach grösseren Änderungen durchläuft eine Anzeigengruppe bei Meta eine Lernphase. Laut Meta endet sie in der Regel nach rund 50 Optimierungsereignissen innerhalb einer Woche. Mit kleinem Budget erreichst du diese Zahl bei Anfragen oft nicht. Umso wichtiger ist es, die Ereignisse auf wenige Anzeigengruppen zu bündeln und nicht täglich umzubauen.",
        "**Optimiert auf Klicks statt auf Anfragen.** Günstige Klicks sind kein Erfolg, wenn niemand anfragt.",
        "**Keine eigene Landingpage.** Die Anzeige verspricht etwas Konkretes, die Startseite zeigt alles andere. Der Klick ist bezahlt, die Anfrage bleibt aus.",
        "**Leads um jeden Preis.** Gewinnspiele und Gratis-Geschenke bringen viele Einträge, aber selten Kundschaft. Wir setzen solche Mechaniken bewusst nicht ein.",
      ],
    },

    { type: "h2", text: "Fundament vor Reichweite" },
    { type: "p", text: "Mehr Budget macht ein schwaches Fundament nicht besser, nur teurer. Bevor du erhöhst, sollten diese Punkte stehen:" },
    {
      type: "checklist",
      items: [
        "**Ein Angebot mit niedrigem Einstieg.** Eine kostenlose Offerte, eine Analyse oder ein Erstgespräch. Kein allgemeines «Kontaktieren Sie uns».",
        "**Ein konkreter Nutzen in der Anzeige.** Welches Problem löst du, und was hat die Person davon? Ein konkretes Ergebnis ist greifbarer als ein allgemeines Versprechen.",
        "**Beweise.** Google-Bewertungen, Referenzen, Fotos echter Projekte, Stimmen von Kundinnen und Kunden. Sie gehören in die Anzeige und auf die Landingpage.",
        "**Eine Landingpage pro Angebot.** Eine Botschaft, ein kurzes Formular, auf dem Handy schnell und einfach.",
        "**Mehrere Creatives.** Nicht ein Video, sondern mehrere Varianten mit unterschiedlichem Einstieg, damit du vergleichen kannst.",
        "**Sauberes Tracking.** Jede Anfrage kommt bei der Plattform an und wird einmal gezählt. Wie das geht, steht im Artikel [Ohne sauberes Tracking verbrennst du Werbebudget](/insights/tracking-werbebudget).",
      ],
    },

    { type: "h2", text: "Ein Kanal, ein Angebot, eine Zielgruppe" },
    {
      type: "p",
      text: "Mit kleinem Budget gewinnt, wer sich beschränkt. Wähle das Angebot mit dem besten Verhältnis aus Auftragswert und Nachfrage, die Zielgruppe, die am schnellsten entscheidet, und den Kanal, der zu ihrer Situation passt. Sucht deine Kundschaft aktiv, ist Google Ads in der Suche oft der direktere Weg. Muss der Bedarf erst geweckt werden, eher Meta Ads. Die Unterschiede erklärt der Artikel [Meta Ads oder Google Ads](/insights/meta-ads-oder-google-ads).",
    },
    { type: "p", text: "Erst wenn dieser eine Weg verlässlich Anfragen bringt, lohnt sich ein zweites Angebot oder ein zweiter Kanal." },

    { type: "h2", text: "Wie ein realistischer Start aussieht" },
    {
      type: "p",
      text: "Wir gehen in drei Phasen vor. Wie lange jede dauert, hängt vom Ausgangspunkt ab: Gibt es schon eine Landingpage, Material für Creatives und ein funktionierendes Tracking?",
    },
    {
      type: "ol",
      items: [
        "**Fundament.** Tracking prüfen und einrichten, Angebot schärfen, Landingpage bauen oder anpassen.",
        "**Creatives und Funnel.** Mehrere Varianten produzieren, die Kampagne mit wenigen Anzeigengruppen starten, Anfragen bis ins CRM verfolgen.",
        "**Testen und ausbauen.** Wöchentlich auswerten, schwache Anzeigen stoppen, starke ausbauen. Regelmässig neue Varianten nachliefern, weil sich auch gute Creatives mit der Zeit abnutzen.",
      ],
    },
    {
      type: "p",
      text: `Rechne in den ersten Wochen nicht mit dem Endergebnis. Am Anfang lernt die Plattform noch, und du testest noch. Entscheidend ist, ob die Richtung stimmt. Plane deshalb mehrere Monate ein. Unsere [Pakete](/pakete) haben eine Mindestlaufzeit von ${minTerm}.`,
    },

    { type: "h2", text: "Welche Zahlen du jede Woche anschauen solltest" },
    {
      type: "p",
      text: "Bei kleinem Budget brauchst du wenige Zahlen, die aber verlässlich. Schau sie jede Woche an und immer im Zusammenhang, nie einzeln:",
    },
    {
      type: "ul",
      items: [
        "**Anfragen.** Wie viele echte Anfragen kamen rein, gezählt im Postfach oder CRM, nicht nur im Werbekonto?",
        "**Kosten pro Anfrage.** Werbebudget geteilt durch Anfragen, verglichen mit deinem Zielwert.",
        "**Qualität.** Wie viele Anfragen wurden zu einem Termin oder einer Offerte? Hier zeigt sich, ob die Anzeige die richtigen Menschen anspricht.",
        "**Aufträge.** Was am Ende unterschrieben wird. Diese Zahl kommt mit Verzögerung, entscheidet aber über das Budget.",
      ],
    },
    {
      type: "p",
      text: "Klickrate und Preis pro Klick sind nützlich, um ein Creative oder eine Landingpage zu beurteilen. Als Ziel taugen sie nicht.",
    },

    { type: "h2", text: "Wann ein kleines Budget gut passt" },
    {
      type: "table",
      head: ["Faktor", "Eher gut geeignet", "Eher schwieriger"],
      rows: [
        ["Markt", "Lokal oder regional, etwa 1 bis 3 Kantone", "National oder international"],
        ["Angebot", "Klar, mit definierter Zielgruppe", "Mehrere Angebote und Zielgruppen gleichzeitig"],
        ["Auftragswert", "Hoch genug, dass sich eine Anfrage lohnt, etwa ab 500 Franken", "Sehr tiefer Wert pro Auftrag"],
        ["Vertrauen", "Bewertungen, Referenzen, echte Projekte vorhanden", "Noch nichts, was man zeigen kann"],
        ["Zeit", "Bereitschaft für mehrere Monate mit laufenden Tests", "Erwartung an sofortige Resultate"],
      ],
      caption: "Leitfaden, keine feste Grenze",
    },

    { type: "h2", text: "Fazit: Das Budget ist selten das Hauptproblem" },
    {
      type: "p",
      text: "Ein kleines Budget verzeiht weniger Fehler, aber es kann funktionieren. Entscheidend sind Fokus, ein Angebot, das sich lohnt, eine Landingpage, die überzeugt, und eine Messung, der du trauen kannst. Wer Werbung als Schalter sieht, den man umlegt, wird mit jedem Budget enttäuscht. Wer sie als System aufbaut, testet und verbessert, kann auch klein anfangen.",
    },
    {
      type: "p",
      text: `Ob dein Angebot für einen Start mit kleinem Budget passt, klären wir im [Strategie-Call](/strategie-call): ${strategyCall.duration}, ${strategyCall.price}. Vorher kannst du im [Potenzialrechner](/rechner) mit deinen eigenen Zahlen rechnen.`,
    },
  ],
  sources: [{ label: "Meta-Hilfebereich für Unternehmen: Infos zur Lernphase", url: "https://www.facebook.com/business/help/112167992830700" }],
};
