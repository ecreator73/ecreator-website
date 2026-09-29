import type { ArticleContent } from "./types";
import { socialRecruiting } from "@/content/offers";
import { cta, strategyCall } from "@/content/site";

/**
 * Insight: Social Recruiting, der Ablauf.
 * Paketpreis und Bestandteile ausschliesslich aus src/content/offers.ts (Briefing).
 * Keine Einstellgarantie, Werbebudget separat, keine Recruiting-Kennzahlen (keine belegt).
 * Stellenmeldepflicht: arbeit.swiss (SECO), abgerufen 29.09.2026. DSG: Fedlex SR 235.1.
 */

/** Paket-Bestandteil wörtlich aus offers.ts (bricht laut, falls er dort umbenannt wird) */
const inc = (start: string) => {
  const item = socialRecruiting.includes.find((x) => x.startsWith(start));
  if (!item) throw new Error(`Social-Recruiting-Bestandteil fehlt: ${start}`);
  return item;
};

export const article: ArticleContent = {
  summary:
    "Beim Social Recruiting kommt die offene Stelle zu den Leuten: als Video aus deinem Betrieb, ausgespielt mit bezahlten Kampagnen auf Instagram, Facebook und TikTok. Wer sich angesprochen fühlt, bewirbt sich in wenigen Schritten über eine Landingpage oder ein kurzes Formular, und jede Bewerbung landet in einem Bewerber-System. Eine Einstellung kann niemand garantieren, aber jeder Schritt bis zur Bewerbung wird sichtbar und messbar.",
  takeaways: [
    "Social Recruiting erreicht auch Menschen, die gerade nicht aktiv suchen, mit Videos im Feed statt Inseraten auf Jobportalen.",
    "Der Ablauf hat vier Teile: Recruiting-Video, Kampagne, Landingpage oder Formular, Bewerber-System.",
    "Die Bewerbung muss auf dem Handy in wenigen Minuten gehen. Lebenslauf und Zeugnisse kommen später.",
    "Das Werbebudget kommt zum Paketpreis dazu, eine Einstellung ist nie garantiert.",
    "Prüfe vor dem Start die Stellenmeldepflicht und informiere Bewerbende, wofür du ihre Daten verwendest.",
  ],
  blocks: [
    {
      type: "p",
      text: "Ein Stelleninserat wartet darauf, gefunden zu werden. Es erreicht Menschen, die gerade aktiv suchen und dafür Jobportale öffnen. Viele gute Fachkräfte tun das nicht, weil sie bereits eine Stelle haben. Social Recruiting dreht die Richtung um: Die Stelle kommt zu den Leuten, mitten in ihren Feed auf Instagram, Facebook oder TikTok.",
    },

    { type: "h2", text: "Was ist Social Recruiting?" },
    {
      type: "p",
      text: "Social Recruiting heisst: Du suchst Mitarbeitende über soziale Netzwerke. In der Form, um die es hier geht, mit bezahlten Kampagnen statt mit einzelnen Beiträgen auf deinem Profil. Im Zentrum stehen kurze Videos, die zeigen, wie die Arbeit bei dir wirklich aussieht, und eine Bewerbung, die auf dem Handy schnell erledigt ist.",
    },
    {
      type: "p",
      text: "Das ersetzt nicht jede andere Form der Personalsuche. Für manche Stellen bleiben Inserat, persönliches Netzwerk oder eine Personalvermittlung der richtige Weg. Social Recruiting ergänzt diese Kanäle dort, wo die passenden Leute nicht selbst suchen.",
    },
    {
      type: "table",
      head: ["Merkmal", "Stelleninserat", "Social Recruiting"],
      rows: [
        ["Wen es erreicht", "Menschen, die aktiv suchen", "Auch Menschen, die gerade nicht suchen"],
        ["Wo", "Jobportale, Karriereseite", "Instagram, Facebook, TikTok"],
        ["Format", "Text mit Aufgaben und Profil", "Video mit echten Menschen aus dem Betrieb"],
        ["Bewerbung", "Oft mit Lebenslauf und Motivations\u00adschreiben", "Kurzes Formular, auf dem Handy ausfüllbar"],
        ["Auswertung", "Je nach Portal Aufrufe und Bewerbungen", "Jeder Schritt vom Aufruf bis zum Gespräch"],
      ],
      caption: "Zwei Wege zur Bewerbung im Vergleich",
    },

    { type: "h2", text: "Der Ablauf in vier Schritten" },
    { type: "h3", text: "Das Recruiting-Video" },
    {
      type: "p",
      text: "Alles beginnt mit dem Material. An einem Content Day entstehen Videos, in denen Mitarbeitende erzählen, was sie an ihrer Arbeit mögen. Man sieht echte Arbeitsplätze, echte Werkzeuge, echte Kolleginnen und Kollegen. Genau das kann ein Textinserat nicht zeigen.",
    },
    {
      type: "p",
      text: "Der Einstieg entscheidet, ob jemand weiterschaut. Er spricht die gesuchte Person direkt an, zum Beispiel mit einer Frage zu ihrem heutigen Arbeitsalltag. Danach zeigt das Video, was die Stelle ausmacht, und endet mit einer klaren Aufforderung: «Jetzt bewerben, es dauert nur wenige Minuten.» Neben dem eigentlichen Recruiting-Ad helfen Team-Videos und Fotos, die auf der Bewerbungsseite und in weiteren Anzeigen eingesetzt werden.",
    },
    {
      type: "p",
      text: "Wie du den Drehtag vorbereitest, steht in unserer [Checkliste für den Content Day](/insights/content-day-vorbereiten).",
    },
    { type: "h3", text: "Die Kampagne" },
    {
      type: "p",
      text: "Die Videos laufen als bezahlte Anzeigen auf Meta, also Facebook und Instagram, und auf TikTok. Bezahlt, weil ein normaler Beitrag vor allem deine bestehenden Follower erreicht. Die Fachkraft, die du suchst, folgt dir wahrscheinlich noch nicht.",
    },
    {
      type: "p",
      text: "Die Kampagne legt fest, wo und wie lange die Anzeige läuft und wen sie ungefähr erreichen soll, zum Beispiel Menschen in der Region deines Betriebs. Für Stellenanzeigen gelten auf Meta je nach Land zusätzliche Regeln bei der Zielgruppenwahl. Umso wichtiger ist das Video: Es spricht die richtigen Leute an und zeigt den anderen früh, dass die Stelle nicht zu ihnen passt.",
    },
    {
      type: "p",
      text: "Während die Kampagne läuft, schauen wir auf die Zahlen und passen Anzeigen, Texte und Einstellungen an, wenn die Daten es nahelegen. Braucht es mehr als eine Stelle, lohnen sich getrennte Kampagnen: Eine Pflegefachperson und ein Lernender in der Logistik brauchen unterschiedliche Videos und eine andere Ansprache.",
    },
    {
      type: "callout",
      title: "Werbebudget",
      text: "Das Werbebudget, also das Geld, das direkt an Meta und TikTok geht, ist nicht im Paketpreis enthalten. Wie hoch es sein sollte, hängt von Region, Beruf und Laufzeit ab. Das klären wir vor dem Start im Gespräch.",
    },
    { type: "h3", text: "Landingpage oder Formular" },
    {
      type: "p",
      text: "Wer auf die Anzeige tippt, landet auf einer Landingpage, einer einzelnen Seite nur für diese Stelle, oder direkt in einem kurzen Formular. Hier gilt: so wenige Hürden wie möglich. Name, Kontakt und ein paar Fragen zur Eignung, etwa zu Ausbildung, Pensum oder frühestem Eintritt. Lebenslauf und Zeugnisse kommen später, wenn beide Seiten Interesse haben.",
    },
    {
      type: "ul",
      items: [
        "Die Stelle in einem Satz: Beruf, Ort, Pensum",
        "Was dich als Arbeitgeber ausmacht, konkret statt «junges, dynamisches Team»",
        "Das Video oder Ausschnitte daraus",
        "Wer sich nach der Bewerbung meldet und wie es weitergeht",
        "Ein Datenschutzhinweis, wofür die Angaben verwendet werden",
      ],
    },
    {
      type: "p",
      text: "Der letzte Punkt ist Pflicht, nicht Kür. Bewerbungsdaten sind Personendaten. Das revidierte Schweizer Datenschutzgesetz (revDSG), seit September 2023 in Kraft, verlangt, dass du Bewerbende informierst, wofür du ihre Daten bearbeitest, und dass du sie nicht länger aufbewahrst als nötig.",
    },
    { type: "h3", text: "Das Bewerber-System" },
    {
      type: "p",
      text: "Jede Bewerbung landet in einem Bewerber-System. Das ist ein Recruiting-CRM, also eine Datenbank für Bewerbende, mit allen Angaben, der Quelle und dem aktuellen Stand. So geht keine Bewerbung in einem E-Mail-Postfach verloren, und dein Team sieht auf einen Blick, wer offen ist, wer ein Gespräch hat und wer eine Absage bekommt.",
    },
    {
      type: "p",
      text: "Entscheidend ist die Geschwindigkeit. Wer sich am Sonntagabend auf dem Handy bewirbt, wartet nicht gern zwei Wochen auf eine Antwort. Hilfreich sind eine automatische Eingangsbestätigung und eine feste Person im Team, die neue Bewerbungen zeitnah anruft. Wie solche Abläufe automatisiert werden, zeigt die Seite [CRM & Automation](/crm-automation).",
    },

    { type: "h2", text: "Was realistisch ist" },
    {
      type: "p",
      text: "Social Recruiting schafft einen Kanal, über den passende Bewerbungen hereinkommen können. Es garantiert keine Einstellung. Ob aus einer Bewerbung ein Vertrag wird, hängt von Dingen ab, die keine Kampagne steuert: Lohn, Arbeitszeiten, Arbeitsweg, dein Ruf als Arbeitgeber und wie schnell du reagierst.",
    },
    {
      type: "p",
      text: "Darum messen wir jeden Schritt: Wie viele Menschen sehen das Video, wie viele klicken, wie viele bewerben sich, wie viele Gespräche finden statt. So siehst du, wo es hakt. Klicken viele, aber bewerben sich wenige, lohnt sich zuerst ein Blick auf die Landingpage. Kommen viele Bewerbungen, aber wenige passen, muss das Video klarer sagen, wen du suchst.",
    },
    {
      type: "callout",
      title: "Stellenmeldepflicht prüfen",
      text: "Gehört die Stelle zu einer Berufsart mit schweizweit mindestens 5 Prozent Arbeitslosigkeit, musst du sie zuerst dem RAV melden. Anderweitig ausschreiben darfst du sie erst fünf Arbeitstage nach der Publikation im Job-Room der Arbeitslosenversicherung. Das gilt auch für Anzeigen auf Social Media. Ob deine Stelle betroffen ist, zeigt der Check-up auf [arbeit.swiss](https://www.arbeit.swiss/de/arbeitgebende/stellenmeldepflicht-faq).",
    },

    { type: "h2", text: "Häufige Fehler" },
    {
      type: "ul",
      items: [
        "**Das Inserat abfilmen.** Anforderungen vorlesen ist kein Recruiting-Video. Zeig Menschen und Arbeit.",
        "**Zu viele Hürden.** Wer auf dem Handy zuerst ein Konto anlegen und Dokumente hochladen muss, bricht leicht ab.",
        "**Keine Antwort.** Bewerbungen, die tagelang liegen bleiben, sind verlorenes Werbebudget.",
        "**Eine Anzeige für alles.** Unterschiedliche Berufe brauchen unterschiedliche Videos.",
      ],
    },

    { type: "h2", text: "Social Recruiting mit eCreator" },
    {
      type: "p",
      text: `Bei eCreator ist Social Recruiting ein festes Paket für CHF\u00a0${socialRecruiting.price.amount}. Es deckt Material, Kampagnen und Bewerber-System ab:`,
    },
    {
      type: "table",
      head: ["Teil", "Im Paket enthalten"],
      rows: [
        ["Material", [inc("1 ganzer Content Day"), inc("Recruiting-Ad"), inc("Team-Videos"), inc("Image-Videos"), inc("Fotos")].join(", ")],
        ["Kampagnen", `${inc("Bis zu 2 Kampagnen")} auf ${inc("Meta")} und ${inc("TikTok")}, ${inc("1 Monat")}`],
        ["Bewerbungen", inc("Recruiting-CRM")],
        ["Werbebudget", "Nicht enthalten. Es geht direkt an Meta und TikTok und kommt zum Paketpreis dazu"],
      ],
      caption: `Paketpreis CHF\u00a0${socialRecruiting.price.amount} laut aktueller Preisliste`,
    },
    {
      type: "p",
      // Werbebudget steht bereits in der Tabelle, hier nur der Hinweis zur Einstellgarantie
      text: socialRecruiting.notes.filter((n) => !n.startsWith("Werbebudget")).join(" "),
    },
    {
      type: "p",
      text: "Wir sind keine Personalvermittlung. Wir stellen dir keine Kandidatinnen und Kandidaten vor und entscheiden nicht mit, wen du einstellst. Die Bewerbungen kommen direkt zu dir, Auswahl, Gespräche und Vertrag bleiben bei dir.",
    },
    {
      type: "p",
      text: `Wie das Paket aufgebaut ist, steht auf der Seite [Social Recruiting](/social-recruiting), den Drehtag dahinter erklärt die Seite [Content Day](/content-day). Ob es für deine Stelle passt, klären wir im [Strategie-Call](/strategie-call), ${strategyCall.duration} und ${strategyCall.price}, oder direkt über [${cta.recruiting.label}](${cta.recruiting.href}).`,
    },
  ],
  sources: [
    {
      label: "SECO / arbeit.swiss: Fragen und Antworten zur Stellenmeldepflicht",
      url: "https://www.arbeit.swiss/de/arbeitgebende/stellenmeldepflicht-faq",
    },
    {
      label: "Fedlex: Bundesgesetz über den Datenschutz (DSG, SR 235.1)",
      url: "https://www.fedlex.admin.ch/eli/cc/2022/491/de",
    },
  ],
};
