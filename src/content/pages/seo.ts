/**
 * Seite /seo (Vertrag C10 in docs/PAGES.md).
 * Nur belegte Angaben: Preise aus offers.ts, Webprojekt aus work.ts / cases.ts,
 * JSON-LD-Auszug direkt aus organizationSchema() (derselbe Datenblock, den jede Seite ausgibt).
 * Keine Ranking-Garantie (AGB Ziff. 11), keine Zeitversprechen, keine erfundenen Resultate.
 */
import type { FaqItem } from "@/components/page/Faq";
import { organizationSchema, type Crumb } from "@/lib/schema";
import { packages } from "@/content/offers";
import { caseBySlug } from "@/content/cases";
import { serviceBySlug } from "@/content/services";
import { webProjects } from "@/content/work";

const advanced = packages.find((p) => p.id === "advanced")!;
const trapletti = webProjects.find((w) => w.id === "trapletti")!;
const traplettiCase = caseBySlug("trapletti")!;

/* --------------------------------------------------------------------------
   Echter JSON-LD-Auszug dieser Website: Felder aus organizationSchema(),
   gekürzt (Auswahl der Felder, knowsAbout auf die ersten Einträge).
   -------------------------------------------------------------------------- */
const org = organizationSchema();
const KNOWS_SHOWN = 4;
const excerpt = {
  "@context": org["@context"],
  "@type": org["@type"],
  "@id": org["@id"],
  name: org.name,
  legalName: org.legalName,
  url: org.url,
  address: org.address,
  knowsAbout: org.knowsAbout.slice(0, KNOWS_SHOWN),
  sameAs: org.sameAs,
};
const fieldsTotal = Object.keys(org).length;
const fieldsShown = Object.keys(excerpt).length;

export type AuditArea = {
  area: string;
  /** kurze Erklärung oder Fachbegriff unter dem Bereich */
  alias: string;
  checks: string[];
  why: string;
};

export type Link = { label: string; href: string; text?: string };

export type SeoPage = {
  meta: { title: string; description: string; path: string };
  service: { name: string; serviceType: string; description: string };
  header: {
    crumbs: Crumb[];
    meta: string[];
    title: string[];
    lead: string;
    auditLink: Link;
    facts: { k: string; v: string }[];
  };
  audit: {
    id: string;
    meta: string[];
    title: string;
    intro: string;
    protocol: string[];
    columns: [string, string, string];
    areas: AuditArea[];
  };
  structured: {
    meta: string[];
    title: string;
    lead: string;
    /** JSON-LD-Auszug, fertig formatiert */
    code: string;
    /** Schlüssel, die im Code hervorgehoben und rechts erklärt werden */
    annotations: { k: string; v: string }[];
    label: string;
    caption: string;
    link: Link;
  };
  guarantee: { meta: string[]; number: string; label: string; title: string; text: string; source: Link };
  proof: {
    meta: string[];
    title: string;
    summary: string;
    angle: string;
    facts: { k: string; v: string }[];
    image: { src: string; alt: string };
    caption: string;
    caseLink: Link;
    siteLink: Link;
  };
  process: { meta: string[]; title: string; lead: string; steps: { title: string; text: string }[] };
  faq: { meta: string[]; title: string; items: FaqItem[] };
  related: Link[];
  finalCta: { title: [string, string]; text: string; secondary: { label: string; href: string } };
};

const host = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

export const seoPage: SeoPage = {
  meta: {
    title: "SEO Agentur Schweiz: Technik, Inhalte, Local SEO",
    description:
      "SEO aus dem Kanton Zürich: Technik, Onpage, Inhalte, Local SEO und strukturierte Daten. Mit Audit-Protokoll, Reporting und ehrlich ohne Ranking-Garantie.",
    path: "/seo",
  },

  service: {
    name: "SEO",
    serviceType: "Suchmaschinenoptimierung (SEO)",
    description:
      "Suchmaschinenoptimierung für Schweizer KMU: technisches SEO, Onpage, Inhalte, Keyword-Strategie, interne Verlinkung, Local SEO und strukturierte Daten. Ohne Ranking-Garantie.",
  },

  header: {
    crumbs: [
      { name: "Leistungen", path: "/leistungen" },
      { name: "SEO", path: "/seo" },
    ],
    meta: ["Leistung", "Gefunden werden"],
    title: ["SEO: gefunden", "werden, wenn", "es zählt."],
    lead:
      "Wer bei Google nach deiner Leistung sucht, hat schon einen Bedarf. SEO (Suchmaschinenoptimierung) sorgt dafür, dass Google deine Website versteht und für die richtigen Suchen in Betracht zieht. Wir prüfen, was fehlt, und bauen es auf.",
    auditLink: { label: "Zum Audit-Protokoll", href: "#audit" },
    facts: [
      { k: "Bereiche", v: "Technik, Onpage, Inhalte, Local SEO, strukturierte Daten" },
      { k: "Als Projekt", v: "Preis nach Umfang, wir klären ihn im Gespräch" },
      {
        k: "Im Paket",
        v: `${advanced.name}, CHF ${advanced.price.amount} ${advanced.price.unit}, ${advanced.minTerm}`,
      },
      { k: "Garantie", v: "Keine Ranking-Garantie" },
    ],
  },

  audit: {
    id: "audit",
    meta: ["Audit-Protokoll"],
    title: "Das prüfen wir, bevor wir etwas ändern.",
    intro:
      "Jedes SEO-Projekt beginnt mit demselben Protokoll: acht Bereiche, von der Technik bis zur Messung. Am Ende steht eine Liste nach Priorität, kein Bericht voller automatischer Warnungen.",
    protocol: ["Protokoll", "8 Bereiche", "Ergebnis: Liste nach Priorität"],
    columns: ["Bereich", "Was wir prüfen", "Warum"],
    areas: [
      {
        area: "Technik",
        alias: "Technical SEO",
        checks: [
          "Indexierung: welche Seiten bei Google sind, welche fehlen und welche dort nichts verloren haben",
          "Crawling: robots.txt, Sitemap, Weiterleitungen, Fehlerseiten",
          "Ladezeit und Core Web Vitals, Googles Messwerte für Tempo und Stabilität einer Seite",
          "Darstellung auf dem Handy",
          "Doppelte Inhalte und Canonical-Angaben, also welche Version einer Seite zählt",
        ],
        why: "Was Google nicht lesen oder nicht laden kann, zeigt es auch nicht.",
      },
      {
        area: "Onpage",
        alias: "Auf der Seite selbst",
        checks: [
          "Title und Meta-Description jeder Seite",
          "Genau eine H1, logische Zwischentitel",
          "Sprechende URLs und beschreibende Alt-Texte für Bilder",
        ],
        why: "Google und Menschen sollen in Sekunden verstehen, worum es auf einer Seite geht.",
      },
      {
        area: "Keyword-Strategie",
        alias: "Wonach gesucht wird",
        checks: [
          "Wonach deine Kunden tatsächlich suchen, mit ihren eigenen Worten",
          "Suchintention: informieren, vergleichen oder anfragen",
          "Welche Suche zu welcher Seite gehört",
        ],
        why: "Jede Seite braucht eine klare Aufgabe. Sonst konkurrieren deine eigenen Seiten miteinander.",
      },
      {
        area: "Inhalte",
        alias: "Content",
        checks: [
          "Eine eigene Seite pro Leistung",
          "Antworten auf die Fragen, die im Verkaufsgespräch kommen",
          "Belege, Preise und Beispiele, wo es sie gibt",
        ],
        why: "Google will die Seite zeigen, die eine Frage am besten beantwortet. Das ist selten die mit den meisten Keywords.",
      },
      {
        area: "Interne Verlinkung",
        alias: "Links zwischen deinen Seiten",
        checks: [
          "Welche Seiten auf welche verweisen",
          "Linktexte, die sagen, wohin es geht",
          "Seiten, auf die kein einziger interner Link zeigt",
        ],
        why: "Links zeigen Google, was zusammengehört und was wichtig ist.",
      },
      {
        area: "Local SEO",
        alias: "Suchen mit Ort",
        checks: [
          "Google-Unternehmensprofil: Kategorie, Leistungen, Öffnungszeiten, Fotos",
          "Name, Adresse und Telefon überall gleich geschrieben",
          "Standortseiten nur dort, wo du wirklich arbeitest",
        ],
        why: "Bei Suchen mit Ort zeigt Google oft zuerst Karte und Unternehmensprofile.",
      },
      {
        area: "Strukturierte Daten",
        alias: "Structured Data",
        checks: [
          "Organisation, Adresse und Kontakt als JSON-LD",
          "Leistungen, Fragen und Antworten, Artikel, Brotkrumen",
          "Prüfung mit den Testwerkzeugen von Google und schema.org",
        ],
        why: "Maschinenlesbare Fakten helfen Suchmaschinen und KI-Systemen, dich richtig einzuordnen.",
      },
      {
        area: "Messung",
        alias: "Search Console, Analytics",
        checks: [
          "Google Search Console und Google Analytics sauber eingerichtet",
          "Welche Suchen zu Besuchen führen und welche Besuche zu Anfragen",
        ],
        why: "Rankings allein bringen keine Kunden. Wir schauen, welche Suchen zu Anfragen führen.",
      },
    ],
  },

  structured: {
    meta: ["Strukturierte Daten", "Beispiel"],
    title: "Diese Website, so wie Maschinen sie lesen.",
    lead:
      "Strukturierte Daten sind Angaben im Quelltext, die Suchmaschinen und KI-Systeme ohne Raten lesen: wer du bist, wo, was du anbietest. Wir setzen sie als JSON-LD, einen Datenblock nach dem Standard schema.org. Hier der Block, den jede Seite von ecreator.ch mitliefert.",
    code: JSON.stringify(excerpt, null, 2),
    annotations: [
      { k: "@type", v: "Was für ein Eintrag: eine Organisation, genauer ein Dienstleistungsbetrieb." },
      { k: "@id", v: "Eine feste Kennung. Jede Leistungsseite verweist darauf als Anbieter." },
      { k: "address", v: "Wo. Gleich geschrieben wie im Impressum und im Handelsregister." },
      { k: "knowsAbout", v: "Die Themen, in denen wir arbeiten. Hilft bei der Zuordnung." },
      { k: "sameAs", v: "Welche Profile zur selben Firma gehören." },
    ],
    label: "JSON-LD / ecreator.ch / Organisation",
    caption: `Auszug, gekürzt: ${fieldsShown} von ${fieldsTotal} Feldern, knowsAbout mit ${KNOWS_SHOWN} von ${org.knowsAbout.length} Einträgen. Vollständig im Quelltext jeder Seite.`,
    link: { label: "Warum das für KI-Suche zählt", href: "/ai-search" },
  },

  guarantee: {
    meta: ["Erwartungen"],
    number: "0",
    label: "Ranking-Garantien",
    title: "Wir versprechen, was wir in der Hand haben.",
    text: "Wer oben steht, entscheidet Google. Es hängt auch von deiner Konkurrenz und von der Zeit ab, SEO wirkt deshalb nicht über Nacht. In der Hand haben wir Technik, Inhalte, Struktur und Signale deiner Website. Daran arbeiten wir, und im Reporting siehst du, was sich bewegt.",
    source: { label: "Nachzulesen: AGB Ziffer 11", href: "/agb" },
  },

  proof: {
    meta: ["Beispiel", "Webprojekt"],
    title: `${trapletti.client.replace(" GmbH", "")}, ${trapletti.place}.`,
    summary: trapletti.summary,
    angle:
      "Leistung und Ort stehen schon in der ersten Zeile: «Gipser & Maler in Thalwil». Dazu klar getrennte Leistungen und die Offertanfrage auf jeder Seite. Das lesen Menschen und Suchmaschinen zuerst.",
    facts: [
      { k: "Kunde", v: trapletti.client },
      { k: "Leistungen", v: traplettiCase.services.join(", ") },
      { k: "Beleg", v: trapletti.evidence },
    ],
    image: {
      src: trapletti.desktop,
      alt: `Website ${trapletti.client}, Startseite am Desktop: Überschrift «Saubere Arbeit. Klare Resultate.», darüber «Gipser & Maler in Thalwil», Buttons für Offerte und Leistungen`,
    },
    caption: `Website / ${host(trapletti.url)} / Desktop`,
    caseLink: { label: "Case ansehen", href: `/cases/${traplettiCase.slug}` },
    siteLink: { label: host(trapletti.url), href: trapletti.url },
  },

  process: {
    meta: ["Ablauf"],
    title: "So läuft ein SEO-Projekt.",
    lead: "Vier Schritte, danach in Runden: messen, nachschärfen, weiterbauen.",
    steps: [
      {
        title: "Audit",
        text: "Wir gehen das Protokoll durch und halten fest, was fehlt. Du bekommst eine Liste nach Priorität.",
      },
      {
        title: "Plan",
        text: "Welche Suche zu welcher Seite gehört und was zuerst kommt: Technik, bestehende Seiten oder neue Inhalte.",
      },
      {
        title: "Umsetzung",
        text: "Technische Korrekturen, Texte, Struktur und strukturierte Daten. Auf deiner bestehenden Website oder als Teil eines Relaunchs.",
      },
      {
        title: "Messen und nachschärfen",
        text: "Search Console und Analytics zeigen, welche Seiten gefunden werden und welche Anfragen bringen. Danach richtet sich die nächste Runde.",
      },
    ],
  },

  faq: {
    meta: ["Fragen"],
    title: "Fragen zu SEO.",
    items: [
      {
        q: "Wie lange dauert es, bis SEO wirkt?",
        a: "Dafür gibt es keine feste Frist. Technische Korrekturen können schnell greifen, neue Inhalte brauchen länger, bis Google sie einordnet. Wie schnell es geht, hängt auch von deiner Konkurrenz und vom Zustand deiner Website ab. Was sich bewegt, zeigen wir dir im Reporting.",
      },
      {
        q: "Gebt ihr eine Garantie für Platz 1 bei Google?",
        a: "Nein. Über Rankings entscheidet Google, deshalb garantieren wir keine Positionen, so steht es auch in unseren AGB. Wir arbeiten an allem, was du beeinflussen kannst: Technik, Inhalte, Struktur und Signale.",
      },
      {
        q: "Was kostet SEO bei eCreator?",
        a: `Als einzelnes Projekt richtet sich der Preis nach dem Umfang, den klären wir im Gespräch. Im Paket ${advanced.name} (CHF ${advanced.price.amount} ${advanced.price.unit}, ${advanced.minTerm}) ist SEO bereits enthalten.`,
      },
      {
        q: "Brauche ich für SEO eine neue Website?",
        a: "Nicht unbedingt. Oft lässt sich eine bestehende Website technisch und inhaltlich verbessern. Wenn die Basis nicht trägt, sagen wir dir das nach dem Audit offen.",
      },
      {
        q: "Macht ihr auch Local SEO?",
        a: "Ja. Für Betriebe mit lokaler Kundschaft prüfen wir das Google-Unternehmensprofil, einheitliche Angaben zu Name, Adresse und Telefon und die Seiten, die zu Suchen mit Ort passen.",
      },
      {
        q: "Was ist der Unterschied zwischen SEO und AEO?",
        a: "SEO zielt auf die Suchergebnisse von Google, AEO (Answer Engine Optimization) auf die Antworten von KI-Systemen wie ChatGPT, Perplexity oder Google AI Overviews. AEO baut auf SEO auf und ergänzt es um klare Antworten, eindeutige Firmenangaben und Erwähnungen.",
      },
    ],
  },

  related: [
    { label: "AEO / AI Search", href: "/ai-search", text: serviceBySlug("ai-search")?.short },
    { label: "Webdesign & Development", href: "/webdesign", text: serviceBySlug("webdesign")?.short },
    { label: "Google Ads", href: "/performance-marketing/google-ads", text: "Anzeigen in der Google-Suche, während SEO aufbaut." },
    { label: "Pakete", href: "/pakete", text: `SEO ist im Paket ${advanced.name} enthalten.` },
  ],

  finalCta: {
    title: ["Lass uns schauen,", "wer dich findet."],
    text: "Kostenlos, per Video-Call. Wir schauen uns an, wie deine Website heute gefunden wird, was fehlt und was sich zuerst lohnt. Du gehst mit einer Prioritätenliste raus.",
    secondary: { label: "SEO-Projekt besprechen", href: "/kontakt?anliegen=seo" },
  },
};
