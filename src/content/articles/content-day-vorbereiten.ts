import type { ArticleContent } from "./types";
import { contentDay, socialRecruiting } from "@/content/offers";
import { cta } from "@/content/site";

/**
 * Insight: Content Day vorbereiten.
 * Preise, Dauer, Fertigstellung und Leistungen ausschliesslich aus src/content/offers.ts (Briefing).
 * Bewusst KEINE Anzahl Videos. Drehort ist nicht belegt: nur bedingt formuliert («wird bei dir gedreht»).
 * AGB-Hinweise (Ziff. 9, 10, 14) laut _research/FACTS.md 9.2, Status VERIFIZIERT.
 */

const opt = (id: string) => {
  const o = contentDay.options.find((x) => x.id === id);
  if (!o) throw new Error(`Content-Day-Option fehlt: ${id}`);
  return o;
};
const withModel = opt("4h-model");
const withoutModel = opt("4h");
const existing = opt("3h-bestand");
const full = opt("8h");

/** Preis im Fliesstext («auf Anfrage») */
const price = (amount: string) => (/\d/.test(amount) ? `CHF\u00a0${amount}` : amount.toLowerCase());
/** Preis als Tabellenzelle («Auf Anfrage») */
const priceCell = (amount: string) => (/\d/.test(amount) ? `CHF\u00a0${amount}` : amount);
const delivery = (d: string) => d.replace(/^Fertigstellung\s+/, "");

export const article: ArticleContent = {
  summary: `Ein Content Day ist ein Drehtag mit eCreator: ${withModel.duration} Produktion mit Videograf, Equipment und Schnitt, fertig geschnitten ${delivery(withModel.delivery)}. Damit sich der Tag lohnt, klärst du vorher drei Dinge: wofür das Material eingesetzt wird, welche Botschaft jedes Video trägt und wer vor der Kamera steht. Diese Checkliste zeigt, was vor, während und nach dem Dreh zu tun ist.`,
  takeaways: [
    "Zuerst der Einsatz: Ads, Social Media, Recruiting oder Website brauchen unterschiedliche Formate und Einstiege.",
    "Ein Video, eine Botschaft, eine Handlung. Stichworte pro Szene reichen, ein auswendig gelerntes Skript braucht es nicht.",
    `Früh entscheiden, wer vor der Kamera steht: Der Content Day (${withModel.duration}) kostet mit Model von eCreator ${price(withModel.price.amount)}, ohne Model ${price(withoutModel.price.amount)}.`,
    "Drehort, Personen und Einverständnisse vor dem Termin klären, die wichtigsten Szenen zuerst drehen.",
    "Nach der Übergabe zeitnah Feedback geben und vorher planen, wann welches Video wo läuft.",
  ],
  blocks: [
    {
      type: "p",
      text: "Vier Stunden sind schnell vorbei. Wer am Drehtag erst überlegt, was gesagt werden soll, verbringt die Zeit mit Diskussionen statt mit Aufnahmen. Die gute Nachricht: Die Vorbereitung ist überschaubar, wenn du sie in der richtigen Reihenfolge machst. Zuerst das Ziel, dann die Botschaft, dann die Menschen, dann der Ort.",
    },

    { type: "h2", text: "Was ist ein Content Day?" },
    {
      type: "p",
      text: `Ein Content Day ist ein fest gebuchter Drehtag. eCreator stellt Videograf und Equipment, dreht nach Plan und schneidet das Material danach fertig. Du bekommst geschnittene Videos, die du einsetzen kannst, keine Rohdaten zum Selbstschneiden. Immer dabei: ${contentDay.includes.join(", ")}.`,
    },
    {
      type: "table",
      head: ["Variante", "Preis", "Fertigstellung"],
      rows: [
        [`${withModel.name}, ${withModel.duration}, ${withModel.price.note}`, priceCell(withModel.price.amount), delivery(withModel.delivery)],
        [`${withoutModel.name}, ${withoutModel.duration}, ${withoutModel.price.note}`, priceCell(withoutModel.price.amount), delivery(withoutModel.delivery)],
        [`${full.name}, ${full.duration}`, priceCell(full.price.amount), delivery(full.delivery)],
        [`${existing.name}, ${existing.duration}`, priceCell(existing.price.amount), delivery(existing.delivery)],
      ],
      caption: `Preise laut aktueller Preisliste. ${contentDay.express}`,
    },
    {
      type: "p",
      text: `Der ${full.name} mit ${full.duration} ist für grössere Vorhaben gedacht: Events, Testimonials, umfangreiche Produktionen, Social Media, Ads und Unternehmenscontent. Alle Varianten mit Beispielen stehen auf der Seite [Content Day](/content-day).`,
    },

    { type: "h2", text: "Vor dem Dreh: Wofür ist das Material?" },
    {
      type: "p",
      text: "Die wichtigste Frage kommt zuerst: Wo läuft das Material? Ein Werbevideo auf Instagram braucht einen anderen Anfang als ein Video auf deiner Website oder ein Recruiting-Clip auf TikTok. Ist der Einsatz klar, ergeben sich Format, Länge und Ton fast von selbst.",
    },
    {
      type: "table",
      head: ["Einsatz", "Worauf es ankommt"],
      rows: [
        ["Ads", "Ein starker Einstieg in den ersten Sekunden, eine klare Handlung am Schluss, mehrere Varianten zum Testen"],
        ["Social Media", "Wiederkehrende Formate, die zu deinem Kanal passen, zum Beispiel Einblicke, Tipps oder Fragen aus dem Alltag"],
        ["Recruiting", "Echte Mitarbeitende, echter Arbeitsalltag, eine konkrete Stelle"],
        ["Website und Verkauf", "Erklärvideos, Kundenstimmen, Einblicke in Team und Ablauf"],
        ["Events", "Stimmung, Stimmen, Programm. Dafür eignet sich der Full Content Day"],
      ],
    },
    {
      type: "p",
      text: "Denk dabei auch ans Format. Hochformat (9:16) passt zu Reels, Stories und TikTok, Querformat (16:9) zu Website, Präsentationen und YouTube. Wenn beides gebraucht wird, sag es vor dem Dreh. Dann wird die Kamera entsprechend eingerichtet.",
    },

    { type: "h2", text: "Botschaft und Skript" },
    {
      type: "p",
      text: "Ein Video trägt eine Botschaft. Wer in einem kurzen Clip drei Angebote erklären will, erklärt keines richtig. Für Werbevideos arbeiten wir mit einem einfachen Aufbau:",
    },
    {
      type: "ol",
      items: [
        "**Einstieg:** ein Satz oder ein Bild, bei dem die richtige Person hängen bleibt. Im Marketing heisst das «Hook».",
        "**Problem:** eine Situation, die deine Kundschaft kennt.",
        "**Lösung:** was du anbietest, konkret und ohne Fachchinesisch.",
        "**Beweis:** eine Kundenstimme, ein Blick hinter die Kulissen, ein belegtes Ergebnis.",
        "**Handlung:** was die Person jetzt tun soll, zum Beispiel einen Termin buchen.",
      ],
    },
    {
      type: "p",
      text: "Das Skript muss niemand auswendig lernen. Stichworte pro Szene reichen, und frei gesprochene Sätze wirken vor der Kamera meist natürlicher als abgelesene. Was uns vor dem Termin hilft:",
    },
    {
      type: "checklist",
      items: [
        "Die Fragen, die Kundinnen und Kunden vor dem Kauf am häufigsten stellen",
        "Einwände, die du im Verkauf regelmässig hörst",
        "Angebote, Preise oder Aktionen, die im Video vorkommen dürfen, und solche, die nicht vorkommen dürfen",
        "Beispiele von Videos, die dir gefallen, gern auch aus anderen Branchen",
        "Logo, Farben und Schriften, falls Einblendungen gewünscht sind",
      ],
    },

    { type: "h2", text: "Wer steht vor der Kamera?" },
    {
      type: "p",
      text: "Wer spricht, prägt ein Video stärker als jede Kamera. Beim Content Day gibt es dafür zwei Varianten:",
    },
    {
      type: "ul",
      items: [
        `**Mit Model von eCreator** (${price(withModel.price.amount)}): Ein Model steht vor der Kamera, wenn du selbst nicht im Bild sein willst oder eine bestimmte Rolle besetzt werden soll.`,
        `**Ohne Model** (${price(withoutModel.price.amount)}): Du, dein Team oder deine Kundschaft stehen selbst vor der Kamera. Das wirkt oft besonders glaubwürdig, braucht aber etwas mehr Vorbereitung.`,
      ],
    },
    {
      type: "p",
      text: "Egal, welche Variante du wählst: Diese Punkte klärst du vor dem Termin.",
    },
    {
      type: "checklist",
      items: [
        "Wer spricht, weiss vorher, worüber, und hat die Stichworte gesehen",
        "Alle Personen, die erkennbar im Bild sind, haben schriftlich eingewilligt. In der Schweiz schützt das Persönlichkeitsrecht auch das eigene Bild, das gilt für Mitarbeitende und Kundschaft",
        "Kleidung einfarbig statt mit feinen Streifen oder kleinen Mustern, die auf Kamera flimmern können",
        "Firmenkleidung nur, wenn sie zur Botschaft passt",
        "Pausen einplanen: Vor der Kamera zu stehen ist anstrengender, als es aussieht",
      ],
    },

    { type: "h2", text: "Drehort und Ablauf am Tag" },
    {
      type: "p",
      text: "Wo gedreht wird, legen wir vor dem Termin gemeinsam fest. Wird bei dir im Betrieb gedreht, hilft diese Liste:",
    },
    {
      type: "checklist",
      items: [
        "Räume aufgeräumt, private Gegenstände und vertrauliche Unterlagen weg, keine Kundendaten auf Bildschirmen",
        "Eine ruhige Ecke für Gespräche und Interviews, ohne Maschinenlärm oder Durchgangsverkehr",
        "Zugang, Parkplatz und eine Ansprechperson vor Ort geklärt",
        "Produkte, Werkzeuge oder Fahrzeuge, die ins Bild sollen, sauber und bereit",
        "Alle Mitwirkenden kennen Uhrzeit und Reihenfolge",
        "Hintergrundmusik aus, Telefone lautlos",
      ],
    },
    {
      type: "p",
      text: "Am Drehtag arbeiten wir den Plan Szene für Szene ab. Zwei Tipps aus der Praxis: Dreh die wichtigsten Szenen zuerst. Wenn am Ende Zeit fehlt, fehlt sie bei den Extras, nicht beim Kernvideo. Und für Ads lohnt es sich, den Einstieg in mehreren Varianten aufzunehmen. So lassen sich später verschiedene Anfänge testen, ohne neu zu drehen.",
    },
    {
      type: "callout",
      title: "Termin realistisch planen",
      text: "Kurzfristige Absagen innerhalb von 48 Stunden vor Produktionsbeginn können laut unseren AGB mit bis zu 100 % der vereinbarten Produktionskosten verrechnet werden. Wähle den Termin darum so, dass die wichtigsten Personen sicher Zeit haben.",
    },

    { type: "h2", text: "Nach dem Dreh: Schnitt, Feedback, Einsatz" },
    {
      type: "p",
      text: `Nach dem Dreh schneiden wir das Material fertig: beim Content Day (${withModel.duration}) ${delivery(withModel.delivery)}, beim ${full.name} ${delivery(full.delivery)}. ${contentDay.express}`,
    },
    {
      type: "p",
      text: "Plane Zeit für dein Feedback ein. Laut AGB gelten Leistungen als abgenommen, wenn du nicht innert 5 Arbeitstagen nach der Übergabe wesentliche Mängel schriftlich meldest. Schau dir die Videos also zeitnah an. Wie viele Korrekturschleifen im Preis enthalten sind, klären wir vor dem Dreh.",
    },
    {
      type: "p",
      text: "Rohdaten, also ungeschnittenes Material und Projektdateien, sind nicht automatisch Teil der Nutzungsrechte. Wenn du sie brauchst, sag es vorher, dann halten wir es schriftlich fest.",
    },
    {
      type: "p",
      text: "Und dann der wichtigste Teil: Das Material muss laufen. Plane schon vor dem Dreh, wann welches Video wo erscheint. Verteile die Videos über mehrere Wochen, statt alles am ersten Tag zu veröffentlichen, und halte Varianten für Ads zurück, damit du später neue Einstiege testen kannst. Seinen Wert zeigt ein Content Day erst, wenn die Videos in Kampagnen, auf Social Media oder auf der Website eingesetzt und ausgewertet werden. Wie das zusammenspielt, steht unter [Performance Marketing](/performance-marketing).",
    },

    { type: "h2", text: "Die Checkliste auf einen Blick" },
    {
      type: "checklist",
      items: [
        "Einsatz festgelegt: Ads, Social Media, Recruiting, Website oder Event",
        "Format geklärt: Hochformat, Querformat oder beides",
        "Pro Video eine Botschaft und eine Handlung",
        "Stichworte pro Szene, Kundenfragen und Einwände gesammelt",
        "Entschieden: mit oder ohne Model von eCreator",
        "Schriftliche Einwilligung aller Personen im Bild",
        "Drehort vorbereitet, Ansprechperson bestimmt",
        "Zeit für Feedback nach der Übergabe reserviert",
        "Plan, wann welches Video wo läuft",
      ],
    },
    {
      type: "p",
      text: `Was wir ausser dem Content Day produzieren, zeigt die Seite [Content-Produktion](/content-produktion). Übrigens: Im Paket [Social Recruiting](/social-recruiting) für CHF\u00a0${socialRecruiting.price.amount} ist ${socialRecruiting.includes[0].replace(/^1 /, "ein ")} bereits enthalten. Wenn du einen Termin planen willst: [${cta.contentDay.label}](${cta.contentDay.href}) oder zuerst im [Strategie-Call](/strategie-call) klären, welches Material du wirklich brauchst.`,
    },
  ],
};
