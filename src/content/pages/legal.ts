import type { Crumb } from "@/lib/schema";
import { company } from "@/content/company";
import { site } from "@/content/site";

/**
 * Rechtstexte /impressum, /datenschutz, /agb (Verträge C22, docs/PAGES.md).
 *
 * Quelle: Live-Site ecreator.ch, _research/raw/impressum.html, datenschutz.html, agb.html
 * (sichtbarer Text per html.parser extrahiert). Nur formal bereinigt:
 * ss statt ß, «» statt „“, fixes Datum statt JS-Tagesdatum (FACTS N29), Titelzeilen mit Gedankenstrich entfernt.
 * Inhaltlich unverändert. Zusätze nur:
 *  · Impressum: CH-ID aus dem Handelsregister (FACTS U07, EXTERN).
 *  · Datenschutz: sichtbare Platzhalter für veraltete oder fehlende Punkte (FACTS N44, R-LEGAL §5).
 * AGB: Text wie publiziert. Nichts ergänzt (auch nicht zu Ziff. 9 vs. Strategie-Call).
 *
 * Inline-Syntax in Texten: [Linktext](href) und **fett**.
 */

export type LegalListItem = { text: string; todo?: string };

export type LegalBlock =
  | { type: "p"; text: string; todo?: string }
  | { type: "ul"; items: LegalListItem[] }
  | { type: "address"; lines: string[] }
  | { type: "todo"; text: string };

export type LegalSection = { id: string; title: string; blocks: LegalBlock[] };

export type LegalSheet = {
  id: string;
  title: string;
  rows: { k: string; v: string; href?: string }[];
};

export type LegalPage = {
  meta: { title: string; description: string; path: string };
  crumbs: Crumb[];
  header: { meta: string[]; title: string[]; lead: string };
  /** Dokumentdaten im Seitenrand (Stand, Herausgeberin ...) */
  doc: { k: string; v: string; href?: string }[];
  /** Impressum: Firmendaten als Datenblatt */
  sheets?: LegalSheet[];
  /** Hinweis vor Livegang (sichtbar) */
  note?: { todo: string; text: string };
  /** Inhaltsverzeichnis anzeigen */
  toc?: boolean;
  sections: LegalSection[];
  closing?: string;
  related: { label: string; href: string; text?: string }[];
};

const mail = `[${site.email}](mailto:${site.email})`;

const legalLinks = {
  impressum: { label: "Impressum", href: "/impressum", text: "Firmenangaben, Handelsregister, Haftung." },
  datenschutz: { label: "Datenschutz", href: "/datenschutz", text: "Welche Daten wir bearbeiten und welche Rechte du hast." },
  agb: { label: "AGB", href: "/agb", text: "Allgemeine Geschäftsbedingungen der eCreator GmbH." },
  kontakt: { label: "Kontakt", href: "/kontakt", text: "Fragen zu diesen Texten? Schreib uns." },
};

/* ==========================================================================
   Impressum · geändert 26.03.2026
   ========================================================================== */

export const impressumPage: LegalPage = {
  meta: {
    title: "Impressum",
    description:
      "Impressum der eCreator GmbH in Neerach ZH: Firmenangaben, Geschäftsführung, Handelsregister des Kantons Zürich, UID und CH-ID, Haftung und Urheberrechte.",
    path: "/impressum",
  },
  crumbs: [{ name: "Impressum", path: "/impressum" }],
  header: {
    meta: ["Rechtliches", "Impressum"],
    title: ["Impressum."],
    lead: "Wer hinter dieser Website steht und wie du uns erreichst.",
  },
  doc: [{ k: "Stand", v: "26.03.2026" }],
  sheets: [
    {
      id: "angaben",
      title: "Angaben gemäss Schweizer Recht",
      rows: [
        { k: "Firma", v: company.legalName },
        { k: "Adresse", v: `${site.address.street}, ${site.address.zip} ${site.address.city}, ${site.address.countryName}` },
        { k: "E-Mail", v: site.email, href: `mailto:${site.email}` },
        { k: "Webseite", v: "www.ecreator.ch" },
      ],
    },
    {
      id: "vertretung",
      title: "Vertretungsberechtigte Person",
      rows: [{ k: "Geschäftsführung", v: company.management }],
    },
    {
      id: "handelsregister",
      title: "Handelsregister",
      rows: [
        { k: "Register", v: "Eingetragen im Handelsregister des Kantons Zürich." },
        { k: "UID / CHE-Nummer", v: company.uid },
        // FACTS U07: CH-ID laut Moneyhouse / Zefix, fehlt im Live-Impressum.
        { k: "CH-ID", v: company.registerNo },
      ],
    },
  ],
  sections: [
    {
      id: "haftungsausschluss",
      title: "Haftungsausschluss",
      blocks: [
        {
          type: "p",
          text: "Die Inhalte dieser Website wurden mit grösstmöglicher Sorgfalt erstellt. eCreator GmbH übernimmt jedoch keine Gewähr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit, Aktualität oder Vollständigkeit der bereitgestellten Informationen.",
        },
        {
          type: "p",
          text: "Haftungsansprüche gegen eCreator GmbH wegen Schäden materieller oder immaterieller Art, welche aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen, durch Missbrauch der Verbindung oder durch technische Störungen entstanden sind, werden ausgeschlossen.",
        },
      ],
    },
    {
      id: "urheberrechte",
      title: "Urheberrechte",
      blocks: [
        {
          type: "p",
          text: "Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf dieser Website gehören ausschliesslich der eCreator GmbH oder den speziell genannten Rechteinhabern. Für die Reproduktion jeglicher Elemente ist die schriftliche Zustimmung der Rechteinhaber im Voraus einzuholen.",
        },
      ],
    },
    {
      id: "externe-links",
      title: "Externe Links",
      blocks: [
        {
          type: "p",
          text: "Verweise und Links auf Webseiten Dritter liegen ausserhalb unseres Verantwortungsbereichs. Es wird jegliche Verantwortung für solche Webseiten abgelehnt. Der Zugriff und die Nutzung solcher Webseiten erfolgen auf eigene Gefahr des Nutzers oder der Nutzerin.",
        },
      ],
    },
  ],
  closing: "Stand: 26.03.2026",
  related: [legalLinks.datenschutz, legalLinks.agb, legalLinks.kontakt],
};

/* ==========================================================================
   Datenschutz · geändert 21.02.2026
   ========================================================================== */

export const datenschutzPage: LegalPage = {
  meta: {
    title: "Datenschutzerklärung",
    description:
      "Datenschutzerklärung der eCreator GmbH: welche Personendaten wir bearbeiten, zu welchem Zweck, welche Tools wir einsetzen, wie lange wir speichern und deine Rechte.",
    path: "/datenschutz",
  },
  crumbs: [{ name: "Datenschutz", path: "/datenschutz" }],
  header: {
    meta: ["Rechtliches", "Datenschutzerklärung"],
    title: ["Datenschutz."],
    lead: "Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. In dieser Datenschutzerklärung informieren wir Sie darüber, welche Daten wir erheben, wie wir sie verwenden und welche Rechte Ihnen zustehen.",
  },
  doc: [
    { k: "Stand", v: "21.02.2026" },
    { k: "Verantwortlich", v: company.legalName },
    { k: "Anfragen", v: site.email, href: `mailto:${site.email}` },
  ],
  note: {
    todo: "Vor Livegang juristisch prüfen",
    text: "Dieser Text ist die Datenschutzerklärung der bisherigen Website, inhaltlich unverändert. Die markierten Stellen sind veraltet oder fehlen für die neue Website. Ebenfalls offen: gesetzliche Grundlage (revDSG) nennen und die Anrede an die Du-Form der Website angleichen.",
  },
  toc: true,
  sections: [
    {
      id: "verantwortliche-stelle",
      title: "1. Verantwortliche Stelle",
      blocks: [
        {
          type: "address",
          lines: [company.legalName, site.address.street, `${site.address.zip} ${site.address.city}`, site.address.countryName],
        },
        { type: "p", text: `E-Mail: ${mail}` },
      ],
    },
    {
      id: "erhebung",
      title: "2. Erhebung und Bearbeitung von Personendaten",
      blocks: [
        { type: "p", text: "Wir bearbeiten Personendaten, die Sie uns freiwillig zur Verfügung stellen, z.B. über:" },
        {
          type: "ul",
          items: [
            { text: "Kontaktformulare", todo: "Neues Anfrageformular. Empfänger und Ablage der Daten nennen" },
            { text: "E-Mail-Kontakt" },
            { text: "Terminbuchungen" },
            { text: "Vertragsabschlüsse" },
            // FACTS N44: kein Newsletter vorhanden
            { text: "Newsletter-Anmeldungen", todo: "Kein Newsletter vorhanden. Streichen oder einführen" },
          ],
        },
        {
          type: "p",
          text: "Dazu gehören insbesondere Name, E-Mail-Adresse, Telefonnummer, Firma sowie weitere Informationen, die zur Vertragserfüllung erforderlich sind.",
        },
      ],
    },
    {
      id: "zweck",
      title: "3. Zweck der Datenbearbeitung",
      blocks: [
        { type: "p", text: "Wir bearbeiten Ihre Daten zu folgenden Zwecken:" },
        {
          type: "ul",
          items: [
            { text: "Erbringung unserer Marketing- und Beratungsdienstleistungen" },
            { text: "Kommunikation mit Kunden und Interessenten" },
            { text: "Vertragsabwicklung und Rechnungsstellung" },
            { text: "Optimierung unserer Website und Werbekampagnen" },
            { text: "Marketing- und Analysezwecke" },
          ],
        },
      ],
    },
    {
      id: "drittanbieter",
      title: "4. Einsatz von Drittanbietern und Tools",
      blocks: [
        {
          type: "p",
          text: "Zur Erbringung unserer Dienstleistungen nutzen wir Drittanbieter-Tools (z.B. Google Analytics, Google Ads, Meta Ads, TikTok Ads, CRM- und Tracking-Tools). Diese Anbieter können Daten gemäss ihren eigenen Datenschutzbestimmungen verarbeiten.",
        },
        {
          type: "p",
          text: "Datenübermittlungen ins Ausland erfolgen nur, sofern angemessene Datenschutzstandards gewährleistet sind.",
        },
        { type: "todo", text: "Terminbuchung über Google Calendar lädt erst nach Klick. Anbieter und Übermittlung ergänzen" },
        { type: "todo", text: "Schriften sind lokal gehostet, keine Anfrage an Google Fonts. Als Hinweis ergänzen" },
        { type: "todo", text: "Eingesetzte Dienste mit der neuen Website abgleichen (Hosting, Tracking)" },
      ],
    },
    {
      id: "cookies",
      title: "5. Cookies und Tracking",
      blocks: [
        {
          type: "p",
          text: "Unsere Website verwendet Cookies und vergleichbare Technologien, um die Benutzerfreundlichkeit zu verbessern und das Nutzungsverhalten zu analysieren. Sie können Cookies in Ihrem Browser jederzeit deaktivieren.",
        },
        { type: "todo", text: "Consent-Lösung und tatsächliche Cookies vor Livegang festlegen" },
      ],
    },
    {
      id: "logfiles",
      title: "6. Server-Logfiles",
      blocks: [
        {
          type: "p",
          text: "Beim Besuch unserer Website werden automatisch technische Informationen (z.B. IP-Adresse, Browsertyp, Betriebssystem, Datum und Uhrzeit) erfasst. Diese Daten dienen der technischen Sicherheit und Optimierung unserer Website.",
        },
        { type: "todo", text: "Hosting-Anbieter und Serverstandort ergänzen" },
      ],
    },
    {
      id: "speicherdauer",
      title: "7. Speicherdauer",
      blocks: [
        {
          type: "p",
          text: "Wir speichern personenbezogene Daten nur so lange, wie es zur Erfüllung der jeweiligen Zwecke oder gesetzlicher Aufbewahrungspflichten erforderlich ist.",
        },
      ],
    },
    {
      id: "datensicherheit",
      title: "8. Datensicherheit",
      blocks: [
        {
          type: "p",
          text: "Wir treffen angemessene technische und organisatorische Massnahmen, um Ihre Daten vor unbefugtem Zugriff, Verlust oder Missbrauch zu schützen.",
        },
      ],
    },
    {
      id: "rechte",
      title: "9. Ihre Rechte",
      blocks: [
        { type: "p", text: "Sie haben das Recht auf:" },
        {
          type: "ul",
          items: [
            { text: "Auskunft über Ihre gespeicherten Daten" },
            { text: "Berichtigung unrichtiger Daten" },
            { text: "Löschung Ihrer Daten (sofern keine gesetzliche Pflicht entgegensteht)" },
            { text: "Einschränkung der Verarbeitung" },
            { text: "Datenübertragbarkeit" },
          ],
        },
        { type: "p", text: `Anfragen können jederzeit an ${mail} gerichtet werden.` },
      ],
    },
    {
      id: "aenderungen",
      title: "10. Änderungen",
      blocks: [
        {
          type: "p",
          text: "Wir behalten uns vor, diese Datenschutzerklärung jederzeit anzupassen. Es gilt die jeweils auf unserer Website veröffentlichte Version.",
        },
      ],
    },
  ],
  closing: "Stand: 21.02.2026",
  related: [legalLinks.impressum, legalLinks.agb, legalLinks.kontakt],
};

/* ==========================================================================
   AGB · «Stand 2026», geändert 25.05.2026
   ========================================================================== */

export const agbPage: LegalPage = {
  meta: {
    title: "Allgemeine Geschäftsbedingungen (AGB)",
    description:
      "Die AGB der eCreator GmbH: Vertragsabschluss und Laufzeit, Preise und Zahlung, Werbebudgets, Termine und Shootings, Nutzungsrechte, Haftung und Gerichtsstand.",
    path: "/agb",
  },
  crumbs: [{ name: "AGB", path: "/agb" }],
  header: {
    meta: ["Rechtliches", "AGB"],
    title: ["Allgemeine", "Geschäfts­bedingungen."],
    lead: "Diese AGB gelten für sämtliche Dienstleistungen, Angebote, Verträge und Geschäftsbeziehungen zwischen der eCreator GmbH und ihren Kunden.",
  },
  doc: [
    { k: "Stand", v: "2026" },
    { k: "Geändert", v: "25.05.2026" },
    { k: "Herausgeberin", v: company.legalName },
  ],
  toc: true,
  sections: [
    {
      id: "geltungsbereich",
      title: "1. Geltungsbereich",
      blocks: [
        {
          type: "p",
          text: "Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für sämtliche Dienstleistungen, Angebote, Verträge und Geschäftsbeziehungen zwischen der eCreator GmbH (nachfolgend «eCreator») und ihren Kunden.",
        },
        {
          type: "p",
          text: "Mit Unterzeichnung eines Angebots, Vertrags, einer Offerte oder durch Inanspruchnahme der Dienstleistungen akzeptiert der Kunde diese AGB vollumfänglich.",
        },
        {
          type: "p",
          text: "Abweichende Bedingungen des Kunden gelten nur, sofern diese ausdrücklich und schriftlich durch eCreator bestätigt wurden.",
        },
      ],
    },
    {
      id: "dienstleistungen",
      title: "2. Dienstleistungen",
      blocks: [
        { type: "p", text: "eCreator erbringt Dienstleistungen insbesondere in folgenden Bereichen:" },
        {
          type: "ul",
          items: [
            "Performance Marketing",
            "Social Media Marketing",
            "Google Ads",
            "TikTok Ads",
            "LinkedIn Ads",
            "Webseiten & Landingpages",
            "CRM- & Automationslösungen",
            "Branding & Design",
            "Content-Produktion",
            "Videoproduktion",
            "SEO / AEO",
            "Recruiting & Social Recruiting",
            "Beratungs- und Strategiedienstleistungen",
            "Software- und Systemlösungen",
          ].map((text) => ({ text })),
        },
        {
          type: "p",
          text: "Der genaue Leistungsumfang ergibt sich aus der jeweiligen Offerte, dem Vertrag oder schriftlichen Vereinbarungen.",
        },
      ],
    },
    {
      id: "vertragsabschluss",
      title: "3. Vertragsabschluss",
      blocks: [
        { type: "p", text: "Ein Vertrag kommt zustande durch:" },
        {
          type: "ul",
          items: [
            "schriftliche Bestätigung,",
            "digitale Zustimmung,",
            "Unterzeichnung einer Offerte,",
            "Annahme eines Angebots,",
            "oder durch Inanspruchnahme der Dienstleistungen.",
          ].map((text) => ({ text })),
        },
        {
          type: "p",
          text: "Auch mündliche Absprachen können verbindlich sein, sofern diese durch eCreator schriftlich bestätigt werden.",
        },
      ],
    },
    {
      id: "vertragslaufzeit",
      title: "4. Vertragslaufzeit",
      blocks: [
        { type: "p", text: "Sofern nichts anderes schriftlich vereinbart wurde, beträgt die Mindestvertragslaufzeit 12 Monate." },
        { type: "p", text: "Die Vertragslaufzeit beginnt mit Vertragsunterzeichnung oder Projektstart." },
        {
          type: "p",
          text: "Der Vertrag verlängert sich automatisch jeweils um die ursprünglich vereinbarte Laufzeit, sofern keine fristgerechte schriftliche Kündigung erfolgt.",
        },
        { type: "p", text: "Die Kündigungsfrist beträgt 30 Tage vor Vertragsende." },
        { type: "p", text: "Kündigungen haben ausschliesslich schriftlich per E-Mail oder eingeschriebenem Brief zu erfolgen." },
      ],
    },
    {
      id: "vorzeitige-aufloesung",
      title: "5. Vorzeitige Vertragsauflösung & Rücktrittsrecht",
      blocks: [
        { type: "p", text: "Eine vorzeitige Vertragsauflösung durch den Kunden ist ausgeschlossen." },
        {
          type: "p",
          text: "Bei vorzeitiger Vertragsbeendigung bleibt die gesamte vereinbarte Vertragssumme bis zum Ende der regulären Laufzeit geschuldet.",
        },
        { type: "p", text: "Bereits geleistete Zahlungen werden nicht zurückerstattet." },
        {
          type: "p",
          text: "Ein gesetzliches Rücktritts- oder Widerrufsrecht wird, soweit gesetzlich zulässig, ausgeschlossen. Mit Vertragsabschluss sowie Beginn der Dienstleistungserbringung erklärt sich der Kunde ausdrücklich damit einverstanden, dass eCreator unmittelbar mit der Leistungsausführung beginnt.",
        },
        {
          type: "p",
          text: "Bereits erbrachte Leistungen, Aufwände, Strategien, Produktionen, Kampagnen, Konzepte oder vorbereitende Arbeiten sind in jedem Fall vollständig zu vergüten.",
        },
        {
          type: "p",
          text: "Bereits gestartete Kampagnen, Produktionen oder laufende Dienstleistungen sind grundsätzlich von Rückerstattungen ausgeschlossen.",
        },
      ],
    },
    {
      id: "preise-zahlung",
      title: "6. Preise & Zahlungsbedingungen",
      blocks: [
        {
          type: "p",
          text: "Alle Preise verstehen sich in Schweizer Franken (CHF) exklusive gesetzlicher Mehrwertsteuer, sofern nicht anders angegeben.",
        },
        { type: "p", text: "Rechnungen sind innerhalb von 10 Tagen netto zahlbar, sofern nichts anderes vereinbart wurde." },
        { type: "p", text: "**Zahlungserinnerungen & Mahnwesen:**" },
        {
          type: "p",
          text: "Erfolgt innerhalb von 7 Tagen nach Fälligkeit kein Zahlungseingang, wird eine erste Zahlungserinnerung versendet.",
        },
        {
          type: "p",
          text: "Bleibt die Zahlung weitere 5 Tage nach Versand der Zahlungserinnerung aus, ist eCreator berechtigt, eine erste Mahnung inklusive Mahngebühr zu verrechnen.",
        },
        {
          type: "p",
          text: "Erfolgt danach innerhalb weiterer 7 Tage kein vollständiger Zahlungseingang, wird eine zweite Mahnung versendet.",
        },
        {
          type: "p",
          text: "Nach Ablauf der zweiten Mahnfrist ist eCreator berechtigt, offene Forderungen an ein Inkassounternehmen oder rechtliche Vertretung zu übergeben sowie laufende Leistungen, Kampagnen, Webseiten, CRM-Systeme oder Zugriffe temporär auszusetzen.",
        },
        { type: "p", text: "Bei Zahlungsverzug ist eCreator zusätzlich berechtigt:" },
        {
          type: "ul",
          items: [
            "Leistungen auszusetzen,",
            "Werbekampagnen zu stoppen,",
            "Zugänge zu sperren,",
            "Webseiten offline zu nehmen,",
            "CRM-Systeme oder Automationen zu deaktivieren,",
            "Hosting- oder Domainzugriffe einzuschränken,",
            "Verzugszinsen sowie Mahngebühren zu verrechnen.",
          ].map((text) => ({ text })),
        },
        { type: "p", text: "**Mahngebühren:**" },
        {
          type: "ul",
          items: ["1. Mahnung: CHF 20", "2. Mahnung: CHF 50", "Übergabe Inkasso: zusätzliche Kosten gemäss Aufwand"].map(
            (text) => ({ text }),
          ),
        },
      ],
    },
    {
      id: "werbebudgets",
      title: "7. Werbebudgets & Drittanbieter-Kosten",
      blocks: [
        {
          type: "p",
          text: "Werbebudgets (Meta, Google, TikTok etc.) sind grundsätzlich nicht im Honorar enthalten, sofern nichts anderes vereinbart wurde.",
        },
        {
          type: "p",
          text: "Zusätzliche Drittanbieter-Kosten wie Hosting, Domains, Softwarelizenzen, CRM-Kosten, API-Kosten, Stockmaterial, externe Tools, KI-Tools und Plattformgebühren werden separat verrechnet oder direkt vom Kunden getragen.",
        },
      ],
    },
    {
      id: "mitwirkung",
      title: "8. Mitwirkungspflicht des Kunden",
      blocks: [
        {
          type: "p",
          text: "Der Kunde verpflichtet sich, sämtliche für die Leistungserbringung erforderlichen Informationen, Unterlagen, Inhalte, Zugänge und Freigaben rechtzeitig bereitzustellen.",
        },
        { type: "p", text: "Verzögerungen aufgrund fehlender Mitwirkung des Kunden gehen nicht zulasten von eCreator." },
        {
          type: "p",
          text: "Wird die Zusammenarbeit durch mangelnde Mitwirkung erheblich erschwert oder verzögert, bleibt die Vergütung dennoch geschuldet.",
        },
        {
          type: "p",
          text: "Verzögert sich ein Projekt aufgrund fehlender Freigaben, verspäteter Rückmeldungen oder nicht bereitgestellter Inhalte durch den Kunden, verschieben sich sämtliche vereinbarten Fristen entsprechend.",
        },
      ],
    },
    {
      id: "termine",
      title: "9. Termine, Meetings & Shootings",
      blocks: [
        {
          type: "p",
          text: "Gebuchte Meetings, Calls, Shootings oder Beratungstermine müssen mindestens 24 Stunden im Voraus abgesagt oder verschoben werden.",
        },
        {
          type: "p",
          text: "Bei verspäteter Absage oder Nichterscheinen ist eCreator berechtigt, eine Aufwandsentschädigung von CHF 150 pro Termin zu verrechnen.",
        },
        {
          type: "p",
          text: "Bei Shootings, Videoproduktionen oder externen Produktionen können zusätzliche Ausfallkosten, Studio- oder Organisationskosten separat verrechnet werden.",
        },
        {
          type: "p",
          text: "Werden durch eCreator organisierte Models, Creator, Darsteller oder externe Personen kurzfristig abgesagt oder verschoben, haftet der Kunde für sämtliche daraus entstehenden Ausfallkosten, Organisationsaufwände sowie Produktionsverschiebungen.",
        },
        {
          type: "p",
          text: "Kurzfristige Absagen von Shootings innerhalb von 48 Stunden vor Produktionsbeginn können mit bis zu 100 % der vereinbarten Produktionskosten verrechnet werden.",
        },
        {
          type: "p",
          text: "Bereits gebuchte externe Leistungen wie Studios, Locations, Fotografen, Videografen, Models oder weitere Produktionspartner werden unabhängig von der Durchführung vollständig weiterverrechnet, sofern diese durch eCreator bereits verbindlich organisiert oder reserviert wurden.",
        },
      ],
    },
    {
      id: "freigaben",
      title: "10. Freigaben & Inhalte",
      blocks: [
        { type: "p", text: "Vom Kunden freigegebene Inhalte, Kampagnen, Webseiten, Anzeigen oder Designs gelten als genehmigt." },
        { type: "p", text: "Nachträgliche Änderungen können separat verrechnet werden." },
        {
          type: "p",
          text: "Leistungen gelten als abgenommen, sofern der Kunde nicht innert 5 Arbeitstagen nach Übergabe schriftlich wesentliche Mängel meldet.",
        },
        {
          type: "p",
          text: "Der Kunde trägt die Verantwortung für rechtliche Zulässigkeit, Markenrechte, Bildrechte, Datenschutz, Inhalte und Werbeaussagen.",
        },
      ],
    },
    {
      id: "keine-erfolgsgarantie",
      title: "11. Keine Erfolgsgarantie",
      blocks: [
        {
          type: "p",
          text: "Marketing- und Werbemassnahmen hängen von zahlreichen externen Faktoren ab. Daher übernimmt eCreator keine Garantie für Umsatzsteigerungen, Leads, Verkäufe, Bewerbungen, Rankings, Reichweiten, Abschlüsse oder Conversion Rates.",
        },
        {
          type: "p",
          text: "Sämtliche Prognosen, Beispiele oder Erfahrungswerte dienen ausschliesslich als Richtwerte. Ein konkreter wirtschaftlicher Erfolg wird ausdrücklich nicht geschuldet oder garantiert.",
        },
      ],
    },
    {
      id: "haftungsausschluss",
      title: "12. Haftungsausschluss",
      blocks: [
        {
          type: "p",
          text: "Die Haftung von eCreator wird, soweit gesetzlich zulässig, ausgeschlossen. Insbesondere haftet eCreator nicht für indirekte Schäden, Folgeschäden, entgangenen Gewinn, Datenverlust, Plattform-Sperrungen, Werbekonto-Sperrungen, Algorithmus-Änderungen, technische Ausfälle, Umsatzeinbussen oder Drittanbieter-Probleme.",
        },
        {
          type: "p",
          text: "Die maximale Haftung von eCreator ist auf den Betrag der letzten Monatsrechnung beschränkt. Für Sperrungen, Einschränkungen oder Deaktivierungen von Werbekonten, Business Managern oder Plattformzugängen durch Drittanbieter übernimmt eCreator keinerlei Haftung.",
        },
      ],
    },
    {
      id: "plattformen",
      title: "13. Plattformen, Drittanbieter & KI-Systeme",
      blocks: [
        {
          type: "p",
          text: "Der Kunde anerkennt, dass Plattformen wie Meta, Google, TikTok, LinkedIn, YouTube, Webflow, Shopify, Hostinganbieter und KI-Systeme jederzeit Richtlinien, Funktionen oder Algorithmen ändern können. Für daraus entstehende Auswirkungen übernimmt eCreator keine Haftung.",
        },
        {
          type: "p",
          text: "eCreator kann zur Leistungserbringung KI-gestützte Systeme und Tools verwenden. Eine vollständige Fehlerfreiheit oder Exklusivität KI-generierter Inhalte kann nicht garantiert werden.",
        },
      ],
    },
    {
      id: "nutzungsrechte",
      title: "14. Nutzungsrechte",
      blocks: [
        {
          type: "p",
          text: "Sämtliche durch eCreator erstellten Designs, Strategien, Kampagnen, Webseiten, Systeme, Codes, Inhalte, Automationen und Konzepte bleiben bis zur vollständigen Bezahlung Eigentum von eCreator.",
        },
        {
          type: "p",
          text: "Ohne ausdrückliche schriftliche Zustimmung dürfen Inhalte weder kopiert noch weitergegeben werden. Durch eCreator entwickelte Strategien, Systeme, Automationen oder Konzepte dürfen ohne schriftliche Zustimmung nicht an Dritte weitergegeben oder nachgebaut werden.",
        },
        {
          type: "p",
          text: "Rohdaten, unbearbeitetes Videomaterial, Projektdateien, Quellcodes sowie editierbare Arbeitsdateien sind nicht Bestandteil der vereinbarten Nutzungsrechte, sofern dies nicht ausdrücklich schriftlich vereinbart wurde.",
        },
      ],
    },
    {
      id: "zusatzaufwand",
      title: "15. Zusatzaufwand & Änderungswünsche",
      blocks: [
        {
          type: "p",
          text: "Zusätzliche Änderungswünsche, Mehraufwand oder Leistungen ausserhalb des vereinbarten Umfangs werden separat nach Aufwand verrechnet.",
        },
      ],
    },
    {
      id: "referenznutzung",
      title: "16. Referenznutzung",
      blocks: [
        {
          type: "p",
          text: "eCreator ist berechtigt, abgeschlossene Projekte, Logos, Kampagnen, Webseiten, erzielte Resultate sowie anonymisierte Performance-Daten zu Referenz- und Marketingzwecken zu verwenden, sofern keine schriftliche Geheimhaltungsvereinbarung besteht.",
        },
      ],
    },
    {
      id: "exklusivitaet",
      title: "17. Exklusivität",
      blocks: [
        {
          type: "p",
          text: "Exklusivitätsvereinbarungen gelten ausschliesslich, sofern diese schriftlich vereinbart wurden. Exklusivität bezieht sich ausschliesslich auf die konkret definierte Branche und Region.",
        },
      ],
    },
    {
      id: "datenschutz",
      title: "18. Datenschutz & Kommunikation",
      blocks: [
        {
          type: "p",
          text: "Der Kunde erklärt sich damit einverstanden, dass eCreator zur Vertragserfüllung personenbezogene Daten verarbeitet.",
        },
        {
          type: "p",
          text: "Der Kunde ist verantwortlich für die rechtliche Zulässigkeit der beworbenen Inhalte sowie für die Einhaltung datenschutzrechtlicher Vorschriften im Zusammenhang mit generierten Leads und Kundendaten.",
        },
        {
          type: "p",
          text: "Kommunikation per E-Mail, WhatsApp, Telefon, Slack und CRM-Systemen wird als geschäftsübliche Kommunikation akzeptiert.",
        },
      ],
    },
    {
      id: "vertraulichkeit",
      title: "19. Vertraulichkeit",
      blocks: [
        {
          type: "p",
          text: "Beide Parteien verpflichten sich, vertrauliche Informationen nicht an Dritte weiterzugeben. Diese Verpflichtung bleibt auch nach Vertragsende bestehen.",
        },
      ],
    },
    {
      id: "hoehere-gewalt",
      title: "20. Höhere Gewalt",
      blocks: [
        {
          type: "p",
          text: "Für Verzögerungen oder Leistungsausfälle aufgrund höherer Gewalt übernimmt eCreator keine Haftung. Dazu zählen insbesondere Stromausfälle, Serverprobleme, Cyberangriffe, Naturereignisse, Plattformausfälle, Krankheit und staatliche Massnahmen.",
        },
      ],
    },
    {
      id: "aenderungen",
      title: "21. Änderungen der AGB",
      blocks: [
        {
          type: "p",
          text: "eCreator behält sich das Recht vor, diese AGB jederzeit anzupassen. Die jeweils aktuelle Version ist auf der Webseite von eCreator veröffentlicht.",
        },
      ],
    },
    {
      id: "gerichtsstand",
      title: "22. Gerichtsstand & anwendbares Recht",
      blocks: [
        { type: "p", text: "Es gilt ausschliesslich schweizerisches Recht. Gerichtsstand ist der Sitz der eCreator GmbH." },
      ],
    },
    {
      id: "salvatorische-klausel",
      title: "23. Salvatorische Klausel",
      blocks: [
        {
          type: "p",
          text: "Sollten einzelne Bestimmungen dieser AGB unwirksam oder undurchführbar sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.",
        },
      ],
    },
  ],
  closing: "© eCreator GmbH · www.ecreator.ch",
  related: [legalLinks.impressum, legalLinks.datenschutz, legalLinks.kontakt],
};

/* ==========================================================================
   404 (C23)
   ========================================================================== */

export const notFoundPage = {
  meta: "Fehler 404",
  title: "Diese Seite gibt es nicht (mehr).",
  lead: "Vielleicht wurde sie verschoben oder umbenannt. Hier geht es weiter:",
  links: [
    { label: "Startseite", href: "/", text: "Systeme statt Kampagnen: der Überblick." },
    { label: "Leistungen", href: "/leistungen", text: "Content, Ads, Web, SEO und CRM." },
    { label: "Kontakt", href: "/kontakt", text: "Schreib uns, wir helfen weiter." },
  ],
};
