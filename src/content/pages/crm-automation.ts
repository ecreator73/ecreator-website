import type { Crumb } from "@/lib/schema";

/**
 * /crm-automation · Seitentexte (Vertrag C12, docs/PAGES.md).
 *
 * Quellen:
 *  - Leistung «CRM- & Automationslösungen», «Software- und Systemlösungen»: AGB Ziff. 2 (FACTS 8.1, VERIFIZIERT)
 *  - «CRM-Flows & Automationen», «Dashboard/Reporting»: Live-Site L05 (FACTS 8.2, VERIFIZIERT)
 *  - «Formulare, Kalender, WhatsApp, CRM-Anbindung und automatisierte Anfrageprozesse», HubSpot: FACTS W02/W04 (VERIFIZIERT)
 *  - Qualitätssignale statt nur «Lead», «Reporting mit Handlung»: FACTS M10/M11 (VERIFIZIERT)
 *  - Conversion API / Key Events (Lead-Formular, Kalender-Buchung): FACTS CA18 (VERIFIZIERT als Methodik)
 *  - CRM & Sales-Infrastruktur im Pro-Paket, Bewerber-System im Social Recruiting: src/content/offers.ts
 *  - Drittkosten (CRM-Kosten, Softwarelizenzen, API-Kosten): AGB Ziff. 7 (FACTS A07)
 *  - Kundenstimme: src/content/testimonials.ts (pinelli, Video-Interview LinkedIn 17.06.2026)
 * Bewusst NICHT genannt: Preise, Projektdauer, Fristen in Stunden/Tagen, Kennzahlen, CRM-Kundenprojekte
 * (keines belegt), Software-Partnerschaften.
 */

export type Stage = {
  name: string;
  text: string;
  /** kurze Mono-Labels: was auf dieser Stufe automatisch passiert */
  auto: string[];
};
export type Rule = { when: string; then: string; channel: string };
export type BuildItem = { title: string; text: string };
export type BuildGroup = { name: string; items: BuildItem[] };

export const crmPage = {
  meta: {
    title: "CRM-Lösungen Schweiz: CRM & Automation",
    description:
      "CRM-Lösungen aus dem Kanton Zürich: Pipelines, Follow-ups per E-Mail und WhatsApp, Terminprozesse und Dashboards. Damit keine Anfrage liegen bleibt.",
    path: "/crm-automation",
  },

  crumbs: [
    { name: "Leistungen", path: "/leistungen" },
    { name: "CRM & Automation", path: "/crm-automation" },
  ] satisfies Crumb[],

  schema: {
    name: "CRM & Automation",
    serviceType: "CRM-Lösungen und Marketing-Automatisierung",
    description:
      "Individuelle CRM-Systeme und Automatisierungen für KMU: Lead-Management, Sales-Pipelines, Follow-ups per E-Mail und WhatsApp, Terminprozesse, Reporting, Dashboards, Kundenportale und Integrationen mit Website, Kalender und Werbeplattformen.",
  },

  header: {
    meta: ["Leistung", "Infrastruktur"],
    title: ["CRM und Automation:", "kein Lead bleibt liegen."],
    /** Akzentwort im Titel (violett), muss wörtlich in einer Titelzeile stehen */
    accent: "kein Lead",
    lead: "Wir bauen CRM-Systeme und Automatisierungen für KMU. Jede Anfrage landet an einem Ort, mit Quelle, und bekommt einen nächsten Schritt. Nachfassen, Termine, Offerten und Auswertung laufen im selben System.",
    secondaryLink: { label: "Wenn / Dann ansehen", href: "#automationen" },
  },

  manifest: {
    kicker: "Wo Anfragen heute oft liegen:",
    struck: ["Im Postfach.", "In der Excel-Liste.", "Im WhatsApp-Chat.", "Im Kopf vom Chef."],
    mega: "Ein System.",
    left: "Eine Anfrage kostet Werbebudget, Content und Zeit. Wenn sie danach im falschen Postfach liegt, war alles davor umsonst.",
    right: "Ein CRM gibt jeder Anfrage einen Ort, eine zuständige Person und einen nächsten Schritt. Automatisierungen sorgen dafür, dass dieser Schritt auch passiert.",
  },

  pipeline: {
    meta: "Die Pipeline",
    title: "Fünf Stufen. Jede Anfrage weiss, wo sie steht.",
    intro:
      "So sieht eine typische Pipeline aus. Die Stufen passen wir an deinen Verkauf an. Unter jeder Stufe steht, was dort automatisch passiert.",
    stages: [
      {
        name: "Neu",
        text: "Die Anfrage kommt an: über das Formular, den Kalender, ein Telefonat oder eine Lead-Anzeige.",
        auto: ["Quelle erfasst", "Zuständig festgelegt", "Bestätigung verschickt"],
      },
      {
        name: "Kontaktiert",
        text: "Jemand aus deinem Team meldet sich. Wer nicht erreichbar ist, bekommt eine Nachricht.",
        auto: ["Aufgabe: anrufen", "E-Mail", "WhatsApp"],
      },
      {
        name: "Termin",
        text: "Der Kontakt bucht selbst oder am Telefon. Bestätigung und Erinnerung laufen automatisch.",
        auto: ["Kalender", "Erinnerung", "Unterlagen vorab"],
      },
      {
        name: "Angebot",
        text: "Die Offerte ist verschickt. Das System merkt sich, wann nachgefasst wird.",
        auto: ["Offerte", "Nachfassen", "Status sichtbar"],
      },
      {
        name: "Kunde",
        text: "Aus der Anfrage ist ein Auftrag geworden. Dieses Signal geht zurück an die Kampagnen.",
        auto: ["Übergabe", "Bewertung anfragen", "Signal an Meta, Google"],
      },
    ] satisfies Stage[],
    loopLabel: "Zurück in den Kreislauf",
    loop: "Wird aus einer Anfrage ein Kunde, erfahren das auch die Kampagnen. So können sie lernen, welche Anfragen zählen.",
    lost: "Und wer abspringt? Wird mit Grund markiert. Auch das ist eine Information.",
  },

  rules: {
    meta: "Automatisierungen",
    title: "Wenn das passiert, passiert das.",
    intro:
      "Automatisierungen sind Regeln. Hier die häufigsten, als Beispiele. Welche Regeln dein Betrieb braucht und welche Fristen gelten, legen wir mit dir fest.",
    head: { when: "Wenn", then: "Dann", channel: "Kanal" },
    items: [
      {
        when: "Jemand fragt über die Website an",
        then: "Der Kontakt landet mit Quelle und Kampagne im CRM. Dein Team bekommt eine Aufgabe, der Kontakt eine Bestätigung.",
        channel: "CRM / E-Mail",
      },
      {
        when: "Die Anfrage ist nach deiner Frist noch offen",
        then: "Die zuständige Person wird erinnert. Bleibt sie offen, sieht es die Teamleitung.",
        channel: "Aufgabe",
      },
      {
        when: "Der Kontakt ist am Telefon nicht erreichbar",
        then: "Er bekommt eine kurze Nachricht mit einem Link, über den er selbst einen Termin wählt.",
        channel: "WhatsApp / E-Mail",
      },
      {
        when: "Ein Termin ist gebucht",
        then: "Beide Seiten bekommen eine Bestätigung, vor dem Termin eine Erinnerung. In der Pipeline rückt der Kontakt auf «Termin».",
        channel: "Kalender / E-Mail",
      },
      {
        when: "Eine Offerte bleibt unbeantwortet",
        then: "Zuerst fasst eine E-Mail nach. Danach entsteht eine Aufgabe für einen Anruf.",
        channel: "E-Mail / Aufgabe",
      },
      {
        when: "Aus der Anfrage wird ein Auftrag",
        then: "Das CRM meldet den Abschluss an Meta und Google zurück, zum Beispiel über die Conversion API (CAPI), also direkt vom Server an die Werbeplattform. So können die Kampagnen auf Kunden optimieren statt auf Klicks.",
        channel: "Conversion API",
      },
      {
        when: "Der Auftrag ist abgeschlossen",
        then: "Der Kunde bekommt eine Bitte um eine Google-Bewertung.",
        channel: "E-Mail",
      },
      {
        when: "Eine neue Woche beginnt",
        then: "Du bekommst eine Übersicht: wie viele Anfragen aus welcher Quelle kamen, wo sie stehen und was als Nächstes zu tun ist.",
        channel: "E-Mail / Dashboard",
      },
    ] satisfies Rule[],
  },

  build: {
    meta: "Was wir bauen",
    title: "Vom Formular bis zum Kundenportal.",
    intro:
      "Wir arbeiten mit bestehenden CRM-Systemen wie HubSpot oder bauen ein eigenes, wenn Standard-Software nicht zu deinem Ablauf passt.",
    groups: [
      {
        name: "Erfassen",
        items: [
          { title: "Lead-Management", text: "Alle Anfragen an einem Ort, mit Quelle, Zuständigkeit und Verlauf." },
          {
            title: "Integrationen",
            text: "Website-Formulare, Kalender, Lead-Anzeigen, E-Mail und Telefon laufen im selben System zusammen.",
          },
        ],
      },
      {
        name: "Nachfassen",
        items: [
          { title: "Follow-ups", text: "Nachfassen nach festen Regeln statt nach Gedächtnis." },
          { title: "E-Mail-Automatisierungen", text: "Bestätigungen, Erinnerungen und Nachfass-Mails, in deinem Ton geschrieben." },
          { title: "WhatsApp-Workflows", text: "Für Kontakte, die lieber schreiben als telefonieren." },
          { title: "Terminprozesse", text: "Buchung, Bestätigung, Erinnerung und Verschiebung ohne Hin und Her." },
        ],
      },
      {
        name: "Steuern",
        items: [
          { title: "Sales-Pipelines", text: "Stufen, die zu deinem Verkauf passen, nicht zu einer Vorlage." },
          { title: "Dashboards", text: "Anfragen, Termine und Abschlüsse pro Quelle auf einen Blick." },
          { title: "Reporting", text: "Was passiert ist und was als Nächstes zu tun ist." },
        ],
      },
      {
        name: "Bauen",
        items: [
          { title: "Individuelle CRM-Systeme", text: "Ein eigenes System für deinen Ablauf, wenn Standard nicht reicht." },
          { title: "Kundenportale", text: "Ein geschützter Bereich, in dem deine Kunden Unterlagen, Status oder Termine sehen." },
        ],
      },
    ] satisfies BuildGroup[],
    placeholder: {
      label: "Echtes CRM-Setup eines Kunden, anonymisiert",
      spec: "Screenshot der Pipeline-Ansicht, Namen und Beträge geschwärzt, nach Freigabe",
    },
    recruiting: {
      text: "Dasselbe Prinzip für Bewerbungen: Im Social-Recruiting-Paket ist ein Bewerber-System enthalten.",
      link: { label: "Social Recruiting", href: "/social-recruiting" },
    },
    packages: {
      text: "Im Pro-Paket ist die CRM- und Sales-Infrastruktur enthalten.",
      link: { label: "Pakete ansehen", href: "/pakete" },
    },
  },

  proof: {
    meta: "Kundenstimme",
    lead: "Am Ende zählt nicht die Zahl der Anfragen, sondern ob daraus Termine werden.",
    /** ehrliche Einordnung: die Stimme stammt aus einem Lead-Generierungs-Projekt (cases.ts), nicht aus einem CRM-Projekt */
    project: "Aus einem Projekt zur Lead-Generierung mit Kampagnen, Video, Landingpages und Tracking bis zum Lead.",
    still: "Standbild aus dem Video-Interview",
    casesLink: { label: "Alle Cases ansehen", href: "/cases" },
  },

  faq: {
    meta: "Fragen",
    title: "Fragen zu CRM und Automation.",
    items: [
      {
        q: "Welches CRM nutzt ihr?",
        a: "Das, was zu deinem Betrieb passt: ein bestehendes System wie HubSpot oder ein eigenes, wenn Standard-Software nicht zu deinem Ablauf passt. Entscheidend ist, dass dein Team damit arbeitet.",
      },
      {
        q: "Muss ich mein bestehendes CRM wechseln?",
        a: "Nein, nicht zwingend. Oft reicht es, das bestehende System sauber aufzusetzen und mit Website, Formularen und Kalender zu verbinden. Ob das genügt, zeigt die Analyse.",
      },
      {
        q: "Was kostet ein CRM-Projekt?",
        a: "Das hängt vom Umfang ab, deshalb nennen wir den Preis erst nach dem Gespräch. Kosten für CRM-Software, Lizenzen oder Schnittstellen kommen separat dazu oder laufen direkt über dich, so steht es in unseren AGB. Im Pro-Paket ist die CRM- und Sales-Infrastruktur enthalten.",
      },
      {
        q: "Kann das CRM mit Meta und Google Ads verbunden werden?",
        a: "Ja. Wird aus einer Anfrage ein Termin oder ein Kunde, kann das CRM dieses Signal an Meta und Google zurückmelden, zum Beispiel über die Conversion API. So können die Kampagnen auf echte Termine optimieren statt auf Klicks.",
      },
      {
        q: "Wie steht es um den Datenschutz?",
        a: "Das klären wir vor dem Aufbau: welches System, wo die Daten gespeichert werden und wer Zugriff hat. Grundlage ist das Schweizer Datenschutzgesetz (revDSG).",
      },
    ],
  },

  related: [
    { label: "Webdesign", href: "/webdesign", text: "Die Website, von der die Anfragen kommen." },
    {
      label: "Performance Marketing",
      href: "/performance-marketing#tracking",
      text: "Tracking und Kampagnen, die auf Termine optimieren.",
    },
    { label: "Social Recruiting", href: "/social-recruiting", text: "Kampagnen und Bewerber-System für neue Mitarbeitende." },
    { label: "Pakete", href: "/pakete", text: "CRM- und Sales-Infrastruktur im Pro-Paket." },
  ],

  finalCta: {
    title: ["Lass uns schauen, wo deine", "Anfragen liegen bleiben."] as [string, string],
  },
} as const;
