import type { ArticleContent } from "./types";
import { strategyCall } from "@/content/site";

/**
 * Insight: Tracking. Überarbeitung des Live-Artikels (FACTS 4.4, N34):
 *  - keine Prozentzahlen ohne Quelle (60 %, 40 %, 60–80 %, 95–100 %, «80 % der Konten» entfernt)
 *  - GA4-Begriffe korrigiert: Schlüsselereignisse, früher in GA4 «Conversions» (nicht «Zielvorhaben»)
 *  - «Data-Driven Attribution aktivieren» und «in 30 Minuten» entfernt, kein Zeitversprechen
 *  - Server-Side nicht mehr «datenschutzkonformer», dafür revDSG-Abschnitt (Schweiz)
 * Fakten zu Meta, Google, Apple und WebKit nur aus deren Dokumentation (sources, abgerufen 29.09.2026).
 * Das Rechenbeispiel ist als solches gekennzeichnet, keine Messung.
 */
export const article: ArticleContent = {
  summary:
    "Sauberes Tracking heisst: Jede Anfrage, jeder gebuchte Termin und jeder Kauf wird einmal und vollständig an Meta, Google und deine Webanalyse gemeldet. Dafür reicht der Pixel im Browser allein nicht mehr. Du brauchst zusätzlich einen Weg über den Server, etwa die Conversions API, eine saubere Deduplizierung und regelmässige Tests mit echten Anfragen.",
  takeaways: [
    "Ad-Blocker, Browser-Schutz und abgelehnte Einwilligungen lassen Signale aus dem Browser verloren gehen. Wie viele, ist auf jeder Website anders: Miss es selbst.",
    "Pixel und Conversions API gehören zusammen. Mit derselben Event-ID zählt Meta jede Anfrage nur einmal.",
    "Optimiere auf das, was zählt: Anfrage, gebuchter Termin, Kauf. Nicht auf Klicks oder Seitenaufrufe.",
    "In GA4 heissen wichtige Aktionen heute Schlüsselereignisse. Den Begriff Conversion verwendet Google für die Messung in Google Ads.",
    "Server-Side Tracking ist nicht automatisch datenschutzkonform. In der Schweiz gilt das revidierte Datenschutzgesetz, bei Publikum in der EU oft zusätzlich EU-Recht.",
  ],
  blocks: [
    {
      type: "p",
      text: "Du schaltest Anzeigen auf Meta, Google oder TikTok, und die Zahlen im Werbekonto sehen ordentlich aus. Trotzdem weisst du nicht genau, welche Kampagne dir Kunden bringt. Das liegt selten an den Anzeigen. Meistens liegt es an der Messung: Anfragen kommen nicht bei der Plattform an, werden doppelt gezählt oder landen beim falschen Kanal.",
    },
    {
      type: "p",
      text: "Das kostet doppelt. Du entscheidest auf einer falschen Grundlage, und die Algorithmen von Meta und Google lernen von falschen Signalen. Dieser Artikel zeigt, wo Tracking typischerweise bricht, wie ein sauberes Setup aussieht und was in der Schweiz beim Datenschutz gilt.",
    },

    { type: "h2", text: "Was sauberes Tracking bedeutet" },
    {
      type: "p",
      text: "Sauberes Tracking heisst: Jede Aktion, die für dein Geschäft zählt, wird einmal, vollständig und dem richtigen Kanal zugeordnet erfasst. Bei den meisten KMU sind das eine abgeschickte Anfrage, ein gebuchter Termin oder ein Kauf. Diese Daten gelangen auf zwei Wegen zu Meta und Google:",
    },
    {
      type: "ul",
      items: [
        "**Über den Browser.** Ein Skript auf deiner Website, etwa der Meta Pixel oder das Google-Tag, meldet die Aktion direkt aus dem Browser der besuchenden Person. Das ist schnell eingerichtet, aber anfällig.",
        "**Über den Server.** Dein Server oder ein eigener Tracking-Server schickt die Aktion direkt an die Plattform. Bei Meta heisst diese Schnittstelle Conversions API, kurz CAPI. Server-Side Tracking meint allgemein, dass Messdaten zuerst über einen Server laufen, den du kontrollierst, bevor sie weitergehen.",
      ],
    },

    { type: "h2", text: "Warum der Pixel allein nicht mehr reicht" },
    { type: "p", text: "Der Weg über den Browser ist in den letzten Jahren unzuverlässiger geworden. Drei Gründe kommen meistens zusammen:" },
    {
      type: "ul",
      items: [
        "**Ad-Blocker und Browser-Schutz.** Viele Ad-Blocker unterdrücken Tracking-Skripte ganz. Safari löscht mit der Intelligent Tracking Prevention unter anderem Cookies, die per Skript gesetzt wurden, nach sieben Tagen ohne Besuch der Website. Kommt jemand später zurück und fragt an, fehlt die Verbindung zur Anzeige.",
        "**App Tracking Transparency.** Seit iOS 14.5 (2021) müssen Apps auf dem iPhone um Erlaubnis fragen, bevor sie Menschen über Apps und Websites anderer Anbieter hinweg verfolgen. Das betrifft auch Facebook und Instagram, wo viele deiner Anzeigen laufen.",
        "**Einwilligungen.** Wer im Cookie-Banner ablehnt, wird nicht getrackt. Das ist richtig so. Ein gutes Setup berücksichtigt die Entscheidung, statt sie zu umgehen.",
      ],
    },
    {
      type: "p",
      text: "Wie gross die Lücke ist, hängt von deinem Publikum, deinem Banner und deiner Technik ab. Pauschale Prozentzahlen, wie man sie oft liest, helfen dir deshalb wenig. Miss es selbst: Vergleiche die Anfragen eines Monats in deinem Postfach oder CRM mit der Zahl, die Meta, Google Ads und GA4 melden.",
    },

    { type: "h2", text: "Die fünf häufigsten Tracking-Fehler" },
    { type: "h3", text: "1. Nur Pixel, keine Conversions API" },
    {
      type: "p",
      text: "Der Pixel meldet nur, was der Browser durchlässt. Ohne die Conversions API als zweiten Weg fehlen Meta genau die Signale, die für die Optimierung am wichtigsten sind: die Anfragen selbst.",
    },
    { type: "h3", text: "2. Doppelte Zählung ohne Deduplizierung" },
    {
      type: "p",
      text: "Wer Pixel und Conversions API parallel nutzt, meldet jede Anfrage zweimal. Meta erkennt das Duplikat nur, wenn beide Meldungen denselben Ereignisnamen und dieselbe Event-ID tragen. Fehlt die ID, zählt das Werbekonto zu viele Anfragen, und der Preis pro Anfrage wirkt tiefer, als er ist.",
    },
    { type: "h3", text: "3. Optimiert wird auf das falsche Ziel" },
    {
      type: "p",
      text: "Klicks, Seitenaufrufe oder Scrolltiefe sind leicht zu messen, aber sie bezahlen keine Rechnung. Optimiert eine Kampagne auf Klicks, liefert der Algorithmus Klicks. Optimiere auf echte Anfragen und wenn möglich auf Qualitätssignale wie «Termin gebucht».",
    },
    { type: "h3", text: "4. GA4 ist installiert, aber nicht eingerichtet" },
    {
      type: "p",
      text: "Google Analytics 4 zählt Seitenaufrufe, aber niemand hat festgelegt, welche Ereignisse wichtig sind. Dafür markierst du in GA4 Ereignisse als **Schlüsselereignisse** (englisch Key Events). Früher hiessen sie in GA4 Conversions. Diesen Begriff verwendet Google heute für Aktionen, mit denen Google Ads die Leistung von Kampagnen misst und Gebote steuert.",
    },
    {
      type: "p",
      text: "Oft fehlen auch einheitliche UTM-Parameter, also die Zusätze in Links, die Quelle, Medium und Kampagne kennzeichnen. Dann landen Besuche aus deinen Anzeigen in GA4 unter «Direkt» oder in einem falschen Kanal.",
    },
    { type: "h3", text: "5. Nie mit einer echten Anfrage getestet" },
    {
      type: "p",
      text: "Das Tag ist eingebaut, aber niemand hat je ein Formular abgeschickt und nachgeschaut, ob die Meldung ankommt. Nach einem Website-Update oder einem neuen Formular bricht das Tracking oft unbemerkt. Ein fester Test nach jeder Änderung verhindert das.",
    },

    { type: "h2", text: "Pixel und Conversions API im Vergleich" },
    {
      type: "table",
      head: ["Merkmal", "Meta Pixel", "Conversions API"],
      rows: [
        ["Wo es läuft", "Im Browser der besuchenden Person", "Auf deinem Server oder einem Tracking-Server"],
        ["Ad-Blocker, Browser-Schutz", "Kann blockiert oder eingeschränkt werden", "Hängt nicht vom Browser ab"],
        ["Einwilligung", "Nötig, wo das Recht es verlangt", "Genauso nötig. Der Server-Weg ersetzt keine Einwilligung"],
        ["Aufwand", "Gering, Code-Schnipsel oder Plugin", "Höher, über Plugin, eigene Schnittstelle oder Server-Container"],
        ["Rolle im Setup", "Behalten, als erster Weg", "Ergänzen, als zuverlässiger zweiter Weg"],
      ],
      caption: "Grundlage: Dokumentation von Meta zur Conversions API",
    },
    {
      type: "callout",
      title: "Beide parallel",
      text: "Den Pixel abzuschalten, ist keine gute Idee. Meta empfiehlt, Pixel und Conversions API gemeinsam zu nutzen und über Ereignisname und Event-ID zu deduplizieren. So kommen die Signale aus beiden Wegen an, jede Aktion wird aber nur einmal gezählt.",
    },

    { type: "h2", text: "So richtest du ein sauberes Setup ein" },
    {
      type: "ol",
      items: [
        "**Bestandsaufnahme.** Welche Tags laufen heute, über welches Plugin oder den Google Tag Manager? Welche Ereignisse kommen bei Meta, Google Ads und GA4 an? Dabei helfen die Browser-Erweiterung Meta Pixel Helper und der Tag Assistant von Google.",
        "**Ereignisse festlegen.** Definiere wenige, klare Ereignisse: Anfrage abgeschickt, Termin gebucht, Kauf. Gib ihnen überall denselben Namen und lege fest, auf welches Ereignis die Kampagnen optimieren.",
        "**Einwilligung klären.** Bestimme, welche Tools erst nach Zustimmung laden, und passe Cookie-Banner und Datenschutzerklärung an.",
        "**Server-Weg einrichten.** Die Conversions API lässt sich über Plugins von Shop- und CMS-Systemen, über eine eigene Schnittstelle oder über einen Server-Container im Google Tag Manager anbinden. Google Ads kennt mit den erweiterten Conversions ein ähnliches Prinzip: Kontaktdaten wie die E-Mail-Adresse werden vor dem Versand gehasht, also in eine nicht lesbare Prüfsumme umgewandelt, und helfen beim Zuordnen.",
        "**GA4 und Google Ads verbinden.** Schlüsselereignisse markieren, Google Ads mit GA4 verknüpfen, UTM-Parameter für alle Kampagnen nach einem festen Schema setzen.",
        "**Testen.** Schick eine echte Test-Anfrage ab. Prüfe im Meta Events Manager mit der Funktion zum Testen von Ereignissen, ob sie über Browser und Server ankommt und nur einmal gezählt wird. In GA4 zeigt die DebugView, ob das Schlüsselereignis erscheint.",
      ],
    },

    { type: "h2", text: "Datenschutz: was in der Schweiz gilt" },
    {
      type: "p",
      text: "Tracking ist Datenbearbeitung. In der Schweiz gilt dafür seit dem 1. September 2023 das revidierte Datenschutzgesetz (revDSG). Es verlangt vor allem Transparenz: Deine Datenschutzerklärung muss sagen, welche Daten du zu welchem Zweck bearbeitest, an wen sie gehen und in welche Länder. Für Cookies und ähnliche Techniken verlangt das Fernmeldegesetz, dass du darüber informierst und die Bearbeitung abgelehnt werden kann.",
    },
    {
      type: "p",
      text: "Sprichst du gezielt Menschen in der EU an, gelten oft zusätzlich die EU-Regeln. Dort ist für Tracking zu Werbezwecken in der Regel eine vorherige Einwilligung nötig.",
    },
    {
      type: "p",
      text: "Wichtig: Server-Side Tracking ist nicht automatisch datenschutzkonform. Es gibt dir aber mehr Kontrolle. Du entscheidest auf dem eigenen Server, welche Daten weitergehen, kannst unnötige Felder entfernen und Kontaktdaten vor dem Versand hashen. Die Regeln zu Information und Einwilligung gelten trotzdem.",
    },
    {
      type: "callout",
      title: "Keine Rechtsberatung",
      text: "Dieser Abschnitt gibt einen Überblick. Wie dein Banner und deine Datenschutzerklärung konkret aussehen müssen, klärst du am besten mit einer Fachperson für Datenschutz.",
    },

    { type: "h2", text: "Woran du erkennst, dass es funktioniert" },
    {
      type: "checklist",
      items: [
        "Eine Test-Anfrage erscheint im Meta Events Manager über Browser und Server, wird aber nur einmal gezählt.",
        "Die Qualität des Event-Abgleichs im Events Manager ist geprüft, die übermittelten Kontaktdaten sind vollständig.",
        "GA4 zeigt das Schlüsselereignis in der DebugView, sobald du testest.",
        "Besuche aus Anzeigen erscheinen in GA4 mit der richtigen Quelle und dem richtigen Medium.",
        "Die Zahl der Anfragen in Meta, Google Ads und GA4 liegt in derselben Grössenordnung wie in deinem Postfach oder CRM.",
        "Nach jedem Website-Update wird erneut getestet.",
      ],
    },

    { type: "h2", text: "Was schlechtes Tracking kostet" },
    {
      type: "p",
      text: "Ein Rechenbeispiel mit runden Zahlen, keine Messung: Du gibst 3'000 Franken für Anzeigen aus und bekommst 60 echte Anfragen. Eine Anfrage kostet dich also 50 Franken. Meldet das Tracking nur 40 davon, zeigt dir das Werbekonto 75 Franken pro Anfrage. Vielleicht stoppst du eine Kampagne, die in Wahrheit funktioniert.",
    },
    {
      type: "p",
      text: "Der grössere Schaden ist unsichtbar. Meta und Google zeigen deine Anzeigen bevorzugt Menschen, die den gemeldeten Anfragen ähneln. Fehlen Anfragen oder sind sie doppelt gezählt, lernt der Algorithmus von einem verzerrten Bild. Das wirkt Woche für Woche.",
    },
    {
      type: "p",
      text: "Die meisten Fehler lassen sich beheben, ohne die Kampagnen neu aufzusetzen. Wie viel Aufwand es ist, hängt davon ab, wie deine Website gebaut ist und welche Systeme angebunden sind.",
    },

    { type: "h2", text: "Fazit: erst messen, dann skalieren" },
    {
      type: "p",
      text: "Mehr Budget macht ein kaputtes Tracking nicht besser, nur teurer. Deshalb steht bei uns das Tracking am Anfang jeder Kampagne: Ereignisse festlegen, Server-Weg einrichten, deduplizieren, testen. Erst dann lohnt es sich, Creatives zu testen und das Budget zu erhöhen.",
    },
    {
      type: "p",
      text: `Wie wir Tracking in Kampagnen einbauen, steht unter [Performance Marketing](/performance-marketing#tracking). Im [Strategie-Call](/strategie-call) schauen wir gemeinsam auf dein Tracking und deinen Funnel: ${strategyCall.duration}, ${strategyCall.price}.`,
    },
  ],
  sources: [
    { label: "Meta for Developers: Conversions API", url: "https://developers.facebook.com/docs/marketing-api/conversions-api/" },
    {
      label: "Meta for Developers: Doppelte Ereignisse von Pixel und Conversions API (Deduplizierung)",
      url: "https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events/",
    },
    {
      label: "Google Analytics-Hilfe: Conversions im Vergleich zu Schlüsselereignissen",
      url: "https://support.google.com/analytics/answer/13965727?hl=de",
    },
    {
      label: "Google Analytics-Hilfe: Ereignisse als Schlüsselereignisse markieren",
      url: "https://support.google.com/analytics/answer/13128484?hl=de",
    },
    { label: "Google Ads-Hilfe: Erweiterte Conversions", url: "https://support.google.com/google-ads/answer/9888656?hl=de" },
    { label: "Google Tag Manager: Serverseitiges Tagging", url: "https://developers.google.com/tag-platform/tag-manager/server-side" },
    { label: "WebKit: Tracking Prevention in WebKit", url: "https://webkit.org/tracking-prevention/" },
    { label: "Apple Developer: App Tracking Transparency", url: "https://developer.apple.com/documentation/apptrackingtransparency" },
    { label: "Fedlex: Bundesgesetz über den Datenschutz (DSG, SR 235.1)", url: "https://www.fedlex.admin.ch/eli/cc/2022/491/de" },
  ],
};
