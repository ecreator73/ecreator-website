import type { ArticleContent } from "./types";
import { strategyCall } from "@/content/site";

/**
 * Insight: Was ist AEO?
 * Fakten zu Google, OpenAI und Perplexity nur aus deren eigener Dokumentation (siehe sources, abgerufen 29.09.2026).
 * Keine Statistiken, keine Versprechen zu Nennungen (AGB Ziff. 11).
 */
export const article: ArticleContent = {
  summary:
    "AEO (Answer Engine Optimization) heisst: Du bereitest deine Website so auf, dass KI-Suchsysteme wie ChatGPT, Perplexity und Google AI Overviews dein Unternehmen finden, verstehen und als Quelle nennen können. Die Grundlage bleibt solide Suchmaschinenoptimierung (SEO). Dazu kommen Texte, die Fragen direkt beantworten, eindeutige Angaben zu deinem Unternehmen und strukturierte Daten, die zum sichtbaren Inhalt passen.",
  takeaways: [
    "Antwortmaschinen suchen, lesen und fassen zusammen. Nennen können sie nur Seiten, die sie abrufen dürfen und verstehen.",
    "Ohne SEO kein AEO: Für AI Overviews gelten laut Google dieselben technischen Voraussetzungen wie für die normale Suche.",
    "Antwort zuerst: Frage als Zwischentitel, direkte Antwort im ersten Satz, Details danach.",
    "Dein Unternehmen muss überall gleich beschrieben sein: Name, Adresse, Leistungen und Personen auf Website, Google-Profil, LinkedIn und in Verzeichnissen.",
    "Niemand kann Nennungen in KI-Antworten garantieren. Messbar sind Crawler-Zugriffe, Besuche aus KI-Tools und regelmässige Stichproben.",
  ],
  blocks: [
    {
      type: "p",
      text: "In ChatGPT oder Perplexity gibst du keine Stichworte ein, sondern stellst eine Frage. Zurück kommt eine formulierte Antwort mit einigen Quellen daneben, keine Liste mit zehn Links. Google blendet bei manchen Suchanfragen eine KI-Übersicht über den Ergebnissen ein. Für Unternehmen heisst das: Es reicht nicht mehr, irgendwo in der Trefferliste zu stehen. Du willst in der Antwort vorkommen.",
    },
    {
      type: "quote",
      text: "«Welche Agentur im Kanton Zürich dreht Social-Media-Videos und schaltet auch die Werbung dazu?»",
      by: "Beispiel einer Frage an eine Antwortmaschine",
    },
    {
      type: "p",
      text: "Eine Antwort auf so eine Frage hat Platz für wenige Namen. AEO sorgt dafür, dass deiner eine faire Chance hat: weil die Maschine deine Seiten lesen darf, versteht, was du anbietest, und eine klare Antwort findet, die sie übernehmen kann.",
    },

    { type: "h2", text: "Was ist eine Antwortmaschine?" },
    {
      type: "p",
      text: "Eine Antwortmaschine (englisch Answer Engine) ist ein Suchsystem, das nicht nur Links auflistet, sondern selbst eine Antwort formuliert und dafür Quellen aus dem Web heranzieht. Die bekanntesten drei:",
    },
    {
      type: "ul",
      items: [
        "**ChatGPT mit Websuche.** OpenAI betreibt dafür einen eigenen Crawler namens OAI-SearchBot. Ein Crawler ist ein Programm, das Websites automatisch abruft und liest. Seiten, die OAI-SearchBot aussperren, erscheinen laut OpenAI nicht in den Suchantworten von ChatGPT.",
        "**Perplexity.** Eine Suchmaschine, die ihre Antworten mit nummerierten Quellen versieht. Der zuständige Crawler heisst PerplexityBot.",
        "**Google AI Overviews und AI Mode.** Die KI-Übersicht über den Suchergebnissen und der Dialog-Modus von Google. Beide greifen auf den Google-Index zurück, also auf dieselben Seiten wie die klassische Suche.",
      ],
    },
    {
      type: "p",
      text: "Alle arbeiten nach einem ähnlichen Muster: Sie verstehen die Frage, suchen passende Seiten, teilweise mit mehreren Teilsuchen gleichzeitig, und fassen zusammen. Google nennt diese Teilsuchen «Query Fan-out». Welche Seiten am Ende als Quelle erscheinen, entscheidet ein Sprachmodell. Das macht das Ergebnis weniger vorhersehbar als einen Platz in der klassischen Trefferliste.",
    },

    { type: "h2", text: "AEO und SEO: was bleibt, was dazukommt" },
    {
      type: "p",
      text: "AEO ersetzt SEO nicht, es baut darauf auf. Google schreibt in seiner [Dokumentation zu den KI-Funktionen](https://developers.google.com/search/docs/appearance/ai-features?hl=de) ausdrücklich, dass für AI Overviews dieselben Grundlagen gelten wie für die normale Suche. Was sich ändert, ist der Blickwinkel: weg von einzelnen Suchbegriffen, hin zu Fragen, Antworten und deinem Unternehmen als Ganzes.",
    },
    {
      type: "table",
      head: ["Aspekt", "SEO", "AEO"],
      rows: [
        ["Ziel", "Ein guter Platz in der Trefferliste", "Als Quelle in einer KI-Antwort genannt werden"],
        ["Was man sieht", "Eine Liste von Links, du wählst selbst", "Eine formulierte Antwort mit wenigen Quellen"],
        ["Worum es geht", "Seite und Suchbegriff", "Frage, Antwort und das Unternehmen dahinter"],
        ["Grundlage", "Crawling, Indexierung, Inhalte, Verlinkung", "Dasselbe, plus direkte Antworten und eindeutige Angaben zum Unternehmen"],
        ["Messung", "Rankings, Klicks, Search Console", "Crawler-Zugriffe, Besuche aus KI-Tools, Stichproben"],
      ],
      caption: "SEO ist die Grundlage, AEO der zusätzliche Blickwinkel",
    },

    { type: "h2", text: "Die vier Bausteine von AEO" },
    { type: "h3", text: "Auffindbar sein" },
    {
      type: "p",
      text: "Eine Antwortmaschine kann nur zitieren, was sie lesen darf. Bei Google heisst das: Eine Seite muss indexiert sein und mit Snippet angezeigt werden dürfen (dem kurzen Textauszug im Suchergebnis), um in AI Overviews als Quelle zu erscheinen. Zusätzliche technische Anforderungen gibt es laut Google nicht.",
    },
    {
      type: "p",
      text: "Bei ChatGPT und Perplexity legt die Datei robots.txt fest, ob deren Such-Crawler deine Seiten abrufen dürfen. So steht es in der Dokumentation beider Anbieter. Prüfe zusätzlich Firewall und Hosting: Manche Sicherheitseinstellungen blockieren Crawler, ohne dass es jemand bemerkt. Und stell wichtige Inhalte als Text auf die Seite. Was nur in einem Bild oder Video steckt, kann eine Maschine schlechter zitieren.",
    },
    { type: "h3", text: "Inhalte als Antworten bauen" },
    {
      type: "p",
      text: "Antwortmaschinen suchen auf einer Seite den Abschnitt, der eine Frage beantwortet. Das gelingt leichter, wenn jeder Abschnitt für sich verständlich ist:",
    },
    {
      type: "ul",
      items: [
        "Stell die Frage als Zwischentitel, so wie deine Kundschaft sie formuliert.",
        "Beantworte sie im ersten Satz darunter. Erklärungen, Ausnahmen und Beispiele folgen danach.",
        "Nenne Fakten konkret: Preis, Dauer, Ort, Zielgruppe, Ablauf. Wo du eine Zahl nennen kannst, nenn sie.",
        "Erkläre Fachbegriffe in einem Halbsatz, wenn sie zum ersten Mal vorkommen.",
        "Zeig, wer den Text verantwortet und wann er zuletzt aktualisiert wurde.",
      ],
    },
    {
      type: "p",
      text: "Die besten Fragen liefert dein Verkauf. Was fragen Interessenten am Telefon, bevor sie kaufen? Genau das fragen sie auch eine KI. Dieser Artikel ist übrigens selbst so gebaut: Kurzantwort oben, Fragen als Zwischentitel, das Wichtigste am Schluss.",
    },
    { type: "h3", text: "Dein Unternehmen als Entität" },
    {
      type: "p",
      text: "Eine Entität ist etwas eindeutig Bestimmbares: eine Firma, eine Person, ein Ort, ein Produkt. Suchsysteme verknüpfen Angaben aus vielen Quellen zu einem Bild davon, wer du bist, was du anbietest und wo. Je widersprüchlicher diese Angaben sind, desto schwieriger wird die Zuordnung. Darum:",
    },
    {
      type: "ul",
      items: [
        "Firmenname, Adresse und Telefonnummer überall identisch: Website, Google-Unternehmensprofil, LinkedIn, Verzeichnisse wie local.ch.",
        "Leistungen überall mit denselben Begriffen beschreiben, nicht auf jeder Plattform anders.",
        "Menschen mit Namen und Rolle zeigen, damit klar ist, wer hinter dem Unternehmen steht.",
        "Im Impressum vollständige Firma, Handelsregister und UID nennen. Das sind überprüfbare Angaben.",
        "Erwähnungen ausserhalb der eigenen Website pflegen, etwa in Branchenverzeichnissen, Fachbeiträgen oder Bewertungen. Eine Antwortmaschine liest nicht nur, was du über dich selbst sagst.",
      ],
    },
    { type: "h3", text: "Strukturierte Daten" },
    {
      type: "p",
      text: "Strukturierte Daten sind ein maschinenlesbarer Steckbrief im Code der Seite, meist im Format JSON-LD mit dem Vokabular von schema.org. Damit sagst du einer Maschine ausdrücklich: Das ist eine Organisation, das ist ihre Adresse, das ist eine Dienstleistung mit diesem Preis, das ist eine Frage mit dieser Antwort.",
    },
    {
      type: "p",
      text: "Wichtig ist die richtige Erwartung. Google betont, dass es für AI Overviews kein spezielles Markup braucht, und verlangt, dass strukturierte Daten zum sichtbaren Text passen. Sie sind also kein Trick, sondern eine saubere Beschreibung dessen, was ohnehin auf der Seite steht. Sinnvoll sind vor allem:",
    },
    {
      type: "ul",
      items: [
        "**Organization** oder **LocalBusiness**: Firma, Adresse, Kontakt und über «sameAs» die Links zu deinen offiziellen Profilen.",
        "**Service** mit **Offer**: die Leistung und, wenn es einen gibt, der Preis.",
        "**FAQPage**: nur für echte Fragen, die sichtbar auf der Seite beantwortet werden.",
        "**Article**: Artikel mit Autor, Veröffentlichungs- und Änderungsdatum.",
        "**BreadcrumbList**: der Pfad, auf dem eine Seite in der Website liegt.",
      ],
    },

    { type: "h2", text: "Was du für AEO nicht brauchst" },
    {
      type: "ul",
      items: [
        "**Spezielle KI-Dateien.** Die Datei llms.txt ist ein Vorschlag aus der Entwickler-Community, kein anerkannter Standard. Google schreibt ausdrücklich, dass für die KI-Funktionen der Suche keine neuen maschinenlesbaren Dateien nötig sind.",
        "**Texte für Maschinen statt für Menschen.** Keyword-Listen und versteckter Text verstossen gegen die Spam-Richtlinien von Google. Versteckte Anweisungen an KI-Systeme sind derselbe Trick in neuer Form.",
        "**Versprochene Spitzenplätze.** Wer dir garantiert, dass ChatGPT dich «als Erstes» nennt, verspricht etwas, das niemand ausserhalb von OpenAI kontrolliert. Antworten können sich zudem von Anfrage zu Anfrage unterscheiden.",
      ],
    },

    { type: "h2", text: "Wie misst man AEO?" },
    {
      type: "p",
      text: "Ehrlich gesagt: nur teilweise. Es gibt kein Konto, das dir zeigt, wie oft ChatGPT dein Unternehmen nennt. Messbar ist trotzdem einiges:",
    },
    {
      type: "ul",
      items: [
        "**Zugriffe:** In den Server-Logs siehst du, ob Googlebot, OAI-SearchBot und PerplexityBot deine Seiten abrufen.",
        "**Besuche:** In der Webanalyse lassen sich Besuche mit Herkunft chatgpt.com oder perplexity.ai getrennt auswerten, inklusive der Anfragen, die daraus entstehen.",
        "**Google:** Klicks aus AI Overviews und AI Mode zählt Google in der Search Console zum normalen Suchtraffic, im Leistungsbericht unter dem Suchtyp «Web».",
        "**Stichproben:** Stell die zehn wichtigsten Fragen deiner Kundschaft regelmässig in ChatGPT, Perplexity und Google und notiere, welche Quellen genannt werden. Das ist keine Statistik, zeigt aber Veränderungen.",
        "**Nachfragen:** Frag neue Kundinnen und Kunden, wie sie auf dich gekommen sind, und halte die Antwort im CRM fest, deiner Kundendatenbank.",
      ],
    },
    {
      type: "callout",
      title: "Keine Garantie",
      text: "Ob und wie eine Antwortmaschine dein Unternehmen nennt, entscheidet der Anbieter. Das gilt für uns wie für jede andere Agentur. Wir können die Voraussetzungen verbessern und messen, was sich verändert. Nennungen versprechen können wir nicht.",
    },

    { type: "h2", text: "Der Einstieg in fünf Schritten" },
    {
      type: "ol",
      items: [
        "Prüfe in der Google Search Console, ob deine wichtigsten Seiten indexiert sind, und ob robots.txt und Firewall die Such-Crawler von OpenAI und Perplexity zulassen.",
        "Sammle die Fragen, die du im Verkauf und im Kundendienst am häufigsten hörst.",
        "Beantworte sie auf den passenden Leistungsseiten oder in einer FAQ, jeweils direkt im ersten Satz.",
        "Vereinheitliche Firmenname, Adresse, Leistungen und Personen auf Website, Google-Profil, LinkedIn und in Verzeichnissen.",
        "Ergänze strukturierte Daten für Organisation, Leistungen, Artikel und FAQ, passend zum sichtbaren Text, und prüfe sie mit dem Test für Rich-Suchergebnisse von Google.",
      ],
    },
    {
      type: "p",
      text: `Das meiste davon ist solides SEO-Handwerk mit einem klaren Fokus auf Antworten. Wie wir dabei vorgehen, steht auf der Seite [AEO / AI Search](/ai-search), die technische Grundlage unter [SEO](/seo). Wo deine Website heute steht, klären wir im [Strategie-Call](/strategie-call): ${strategyCall.duration}, ${strategyCall.price}.`,
    },
  ],
  sources: [
    {
      label: "Google Search Central: KI-Funktionen und deine Website (AI Overviews, AI Mode)",
      url: "https://developers.google.com/search/docs/appearance/ai-features?hl=de",
    },
    {
      label: "Google Search Central: Einführung in strukturierte Daten",
      url: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data?hl=de",
    },
    { label: "OpenAI: Übersicht der OpenAI-Crawler (OAI-SearchBot, GPTBot)", url: "https://platform.openai.com/docs/bots" },
    { label: "Perplexity: Perplexity-Crawler (PerplexityBot)", url: "https://docs.perplexity.ai/guides/bots" },
    { label: "schema.org: Vokabular für strukturierte Daten", url: "https://schema.org/" },
  ],
};
