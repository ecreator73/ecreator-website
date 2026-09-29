import type { ArticleContent } from "./types";
import { strategyCall } from "@/content/site";

/**
 * Insight: Meta Ads oder Google Ads (neu). Nachfrage erzeugen vs. Nachfrage abholen.
 * Nur allgemeines, prüfbares Wissen. Keine Benchmarks, keine Kundenbeispiele ausser dem verlinkten Case.
 * Budget-Richtwert 3'000–6'000 CHF: eCreator-Empfehlung (FACTS KZ12), als Richtwert gekennzeichnet.
 * Paket-Angaben aus src/content/offers.ts (Google Ads im Pro nicht regulär enthalten).
 */
export const article: ArticleContent = {
  summary:
    "Google Ads in der Suche holt Nachfrage ab: Deine Anzeige erscheint, wenn jemand aktiv nach deinem Angebot sucht. Meta Ads erzeugt Nachfrage: Du erreichst Menschen auf Facebook und Instagram, bevor sie suchen, und überzeugst mit dem Creative. Welcher Kanal passt, hängt vor allem davon ab, ob nach deinem Angebot schon gesucht wird.",
  takeaways: [
    "Google Ads in der Suche holt bestehende Nachfrage ab. Mehr Anfragen, als Menschen suchen, gibt es dort nicht.",
    "Meta Ads erzeugt Nachfrage. Das Creative entscheidet, wer stehen bleibt und ob die Person versteht, worum es geht.",
    "Die wichtigste Frage: Suchen Menschen bereits nach deinem Angebot? Der Keyword-Planer von Google gibt eine erste Antwort.",
    "Mit kleinem Budget startest du besser mit einem Kanal, bis Tracking und Landingpage funktionieren.",
    "Beide Kanäle brauchen dasselbe Fundament: ein klares Angebot, eine passende Landingpage und sauberes Tracking.",
  ],
  blocks: [
    {
      type: "p",
      text: "Meta oder Google? Die Frage hören wir oft, und die ehrliche Antwort lautet: Es kommt darauf an, in welcher Situation deine Kundschaft ist, wenn sie dich braucht. Sucht sie aktiv nach einer Lösung, oder weiss sie noch gar nicht, dass es dein Angebot gibt? Genau hier unterscheiden sich die beiden Kanäle.",
    },

    { type: "h2", text: "Nachfrage abholen oder Nachfrage erzeugen" },
    {
      type: "p",
      text: "Bei **Google Ads** in der Suche tippt jemand einen Begriff ein, zum Beispiel «Gipser Thalwil Offerte», und deine Anzeige erscheint bei den Suchergebnissen. Die Person hat den Bedarf schon. Deine Aufgabe ist, im richtigen Moment da zu sein und mit einer passenden Seite zu überzeugen. Das nennt man Nachfrage abholen, englisch Demand Capture.",
    },
    {
      type: "p",
      text: "Bei **Meta Ads** scrollt jemand durch Instagram oder Facebook und sucht gerade nichts. Deine Anzeige unterbricht den Feed, idealerweise mit einem Video, das in den ersten Sekunden ein Problem anspricht, das die Person kennt. Du weckst einen Bedarf oder machst einen vorhandenen bewusst. Das nennt man Nachfrage erzeugen, englisch Demand Creation.",
    },
    {
      type: "table",
      head: ["Merkmal", "Google Ads (Suche)", "Meta Ads"],
      rows: [
        ["Situation der Person", "Sucht aktiv nach einer Lösung", "Scrollt und sucht gerade nichts"],
        ["Auslöser der Anzeige", "Suchbegriff (Keyword)", "Zielgruppe und Verhalten, das der Algorithmus erkennt"],
        ["Was überzeugt", "Passende Anzeige, passende Landingpage, Vertrauen", "Das Creative: Einstieg, Botschaft, Beweis"],
        ["Stärke", "Hohe Absicht, kurzer Weg zur Anfrage", "Reichweite bei Menschen, die dich noch nicht kennen"],
        ["Grenze", "Nur so viel Volumen, wie gesucht wird", "Braucht laufend neue Creatives und gute Vorqualifizierung"],
      ],
      caption: "Die Tabelle beschreibt Suchkampagnen. Google hat mit YouTube und Demand Gen auch Formate, die Nachfrage erzeugen.",
    },

    { type: "h2", text: "Wann Google Ads passt" },
    { type: "p", text: "Google Ads in der Suche ist stark, wenn dein Angebot einen Namen hat, nach dem Menschen suchen. Typisch sind:" },
    {
      type: "ul",
      items: [
        "**Dringender Bedarf.** Ein Rohrbruch, ein Schädlingsbefall, ein defektes Gerät. Wer jetzt Hilfe braucht, sucht und ruft die ersten passenden Anbieter an.",
        "**Lokale Dienstleistungen mit Offerte.** Maler, Gipser, Reinigung, Umzug. Gesucht wird oft nach Leistung und Ort zusammen.",
        "**Bekannte Lösungen im B2B.** Wenn deine Kundschaft den Fachbegriff für das kennt, was du verkaufst, sucht sie gezielt danach.",
      ],
    },
    {
      type: "p",
      text: "Die Grenze ist das Suchvolumen. Suchen im Monat nur wenige Menschen nach deinem Angebot, kannst du mit mehr Budget nicht mehr Anfragen kaufen. Wie viele Suchen es ungefähr gibt, zeigt der [Keyword-Planer von Google](https://support.google.com/google-ads/answer/7337243?hl=de). Die Werte sind Schätzungen, geben aber eine Richtung.",
    },

    { type: "h2", text: "Wann Meta Ads passt" },
    { type: "p", text: "Meta Ads ist stark, wenn kaum jemand nach deinem Angebot sucht, obwohl viele es brauchen könnten. Typisch sind:" },
    {
      type: "ul",
      items: [
        "**Erklärungsbedürftige Angebote.** Vorsorge, Versicherungen, Finanzthemen oder Pflege. Viele haben das Problem, kennen aber die Lösung nicht.",
        "**Neue oder wenig bekannte Produkte.** Wer nicht weiss, dass es etwas gibt, kann nicht danach suchen.",
        "**Recruiting.** Gute Fachkräfte haben meist eine Stelle und suchen nicht aktiv. Auf Instagram und Facebook erreichst du sie trotzdem.",
        "**Angebote mit starkem Bild.** Vorher und nachher, Menschen, Emotionen. Was man zeigen kann, fällt im Feed auf.",
      ],
    },
    {
      type: "p",
      text: "Auf Meta übernimmt das Creative einen grossen Teil der Zielgruppenwahl. Der Algorithmus zeigt die Anzeige vermehrt den Menschen, die darauf reagieren. Ein Video, das klar sagt, für wen das Angebot ist, filtert deshalb schon vor dem Klick.",
    },
    {
      type: "p",
      text: "Für Anfragen kannst du Formulare direkt in Facebook und Instagram nutzen, sogenannte [Lead Ads](https://www.facebook.com/business/ads/lead-ads), oder auf eine eigene Landingpage führen. Formulare sind bequemer. Eine Landingpage gibt mehr Raum für Vertrauen und Vorqualifizierung.",
    },

    { type: "h2", text: "Die Frage, die entscheidet" },
    {
      type: "p",
      text: "Bevor du Budget verteilst, beantworte eine Frage: Suchen Menschen bereits nach dem, was du anbietest? Drei einfache Wege, es herauszufinden:",
    },
    {
      type: "ol",
      items: [
        "Gib die Begriffe, die deine Kundschaft verwenden würde, in den Keyword-Planer ein und prüfe das geschätzte Suchvolumen für deine Region.",
        "Tippe die Begriffe bei Google ein und achte auf die Vorschläge der Autovervollständigung. Sie zeigen, wie Menschen tatsächlich suchen.",
        "Frag deine letzten zehn Kundinnen und Kunden, wie sie auf dich gekommen sind. Haben viele gesucht, ist die Suche ein Kanal. Kamen viele über Empfehlungen oder Social Media, eher nicht.",
      ],
    },
    { type: "p", text: "Viel Suchvolumen spricht für Google. Wenig Suchvolumen bei grossem Bedarf spricht für Meta." },

    { type: "h2", text: "Typische Angebote und wo wir starten würden" },
    {
      type: "table",
      head: ["Angebot", "Start mit", "Warum"],
      rows: [
        ["Notfall-Dienstleistung", "Google Ads", "Der Bedarf ist akut, die Person sucht sofort."],
        ["Lokales Handwerk mit Offerte", "Google Ads, dann Meta", "Die Suche bringt Anfragen, Meta macht Referenzen und Vorher-nachher-Bilder sichtbar."],
        ["Vorsorge, Versicherung, Finanzen", "Meta Ads", "Viele haben das Problem, wenige suchen danach. Video erklärt und qualifiziert vor."],
        ["Recruiting", "Meta Ads", "Passende Leute suchen selten aktiv nach einer neuen Stelle."],
        ["B2B-Dienstleistung mit bekanntem Fachbegriff", "Google Ads", "Wer den Begriff kennt, sucht gezielt."],
        ["Neues Produkt, neue Kategorie", "Meta Ads", "Ohne Bekanntheit gibt es keine Suche."],
      ],
      caption: "Ausgangspunkt, keine Regel. Die Daten aus den ersten Wochen entscheiden.",
    },
    {
      type: "p",
      text: "Wie ein Meta-Setup für ein erklärungsbedürftiges Thema aussehen kann, zeigt unser [Case aus der Finanzbranche](/cases/finanzdienstleister-lead-generierung): eine eigene Kampagne pro Thema und Videos, die vorqualifizieren.",
    },

    { type: "h2", text: "Beides zusammen: wie sich die Kanäle ergänzen" },
    {
      type: "p",
      text: "Meta und Google schliessen sich nicht aus. Oft wirken sie nacheinander: Jemand sieht dein Video auf Instagram, merkt sich den Namen und sucht ein paar Tage später bei Google danach. Erscheint dann ein Mitbewerber vor dir, geht die Anfrage vielleicht dorthin. Umgekehrt kannst du Menschen, die deine Website besucht haben, auf Meta noch einmal ansprechen. Das nennt man Retargeting.",
    },
    {
      type: "p",
      text: "Mit kleinem Budget solltest du trotzdem mit einem Kanal beginnen. Verteilst du wenig Geld auf zwei Plattformen, sammelt keine davon genug Daten, um zu lernen. Als Richtwert für saubere Tests empfehlen wir ein Werbebudget von 3'000 bis 6'000 Franken pro Monat. Mehr dazu im Ratgeber [Performance Ads mit kleinem Budget](/insights/performance-ads-kleines-budget).",
    },

    { type: "h2", text: "Was für beide gilt" },
    {
      type: "ul",
      items: [
        "**Ein klares Angebot.** Was bekommt jemand, der jetzt anfragt? Eine kostenlose Offerte, eine Analyse, einen Termin?",
        "**Eine Landingpage, die zur Anzeige passt.** Wer auf «Gipser Thalwil» klickt, will nicht erst auf der Startseite suchen müssen.",
        "**Sauberes Tracking.** Ohne echte Anfragen als Signal optimieren beide Plattformen ins Leere. Wie das geht, steht im Artikel [Ohne sauberes Tracking verbrennst du Werbebudget](/insights/tracking-werbebudget).",
        "**Tests mit System.** Beide Kanäle brauchen Zeit und laufende Tests: wöchentlich auswerten, Gewinner ausbauen, Verlierer stoppen.",
      ],
    },
    {
      type: "p",
      text: "Wie wir die beiden Kanäle umsetzen, steht unter [Meta Ads](/performance-marketing/meta-ads) und [Google Ads](/performance-marketing/google-ads). Im Paket Pro sind Meta und Social Ads enthalten, Google Ads regulär erst im Paket Advanced. Details findest du unter [Pakete](/pakete).",
    },
    {
      type: "p",
      text: `Welcher Kanal zu deinem Angebot passt, klären wir im [Strategie-Call](/strategie-call): ${strategyCall.duration}, ${strategyCall.price}.`,
    },
  ],
  sources: [
    { label: "Google Ads-Hilfe: Keyword-Planer", url: "https://support.google.com/google-ads/answer/7337243?hl=de" },
    { label: "Google Ads-Hilfe: Demand Gen-Kampagnen", url: "https://support.google.com/google-ads/answer/13695777?hl=de" },
    { label: "Meta: Lead Ads für Facebook und Instagram", url: "https://www.facebook.com/business/ads/lead-ads" },
  ],
};
