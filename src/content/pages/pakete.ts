import { cta, strategyCall } from "@/content/site";
import { packages, socialRecruiting } from "@/content/offers";
import { pinelli } from "@/content/testimonials";
import type { FaqItem } from "@/components/page/Faq";

/**
 * /pakete (Vertrag C14, docs/PAGES.md). Alle Preise und Bestandteile aus offers.ts (Briefing).
 * Regeln: Mindestlaufzeit 6 Monate (Briefing). Werbebudget nie inklusive.
 * Nicht behaupten, dass Advanced alle Pro-Bestandteile enthält (Briefing nennt nur Unterschiede).
 * Unbelegtes (Kündigung nach der Mindestlaufzeit, MWST, Paketwechsel) nur als sichtbarer Platzhalter,
 * nie im FAQ-Schema. Der Konflikt Briefing 6 Monate vs. AGB 12 Monate gehört NICHT auf die Seite.
 */

const [pro, advanced] = packages;
const chf = (amount: string) => amount.replace(/'/g, "");

const quoteAt = (at: string) => {
  const q = pinelli.more?.find((m) => m.at === at);
  if (!q) throw new Error(`Zitat bei ${at} fehlt in testimonials.ts`);
  return q;
};

const faq: FaqItem[] = [
  {
    q: "Wie lange läuft ein Paket?",
    a: "Mindestens 6 Monate, bei Pro und bei Advanced. So bleibt genug Zeit, Kampagnen aufzubauen, sauber zu testen und auf das zu setzen, was funktioniert.",
  },
  {
    q: "Ist das Werbebudget im Paketpreis enthalten?",
    a: "Nein. Das Budget für Meta, Google oder TikTok kommt separat dazu. Als Richtwert für saubere Tests empfehlen wir CHF 3'000 bis 6'000 pro Monat.",
  },
  {
    q: "Ist Google Ads im Pro-Paket enthalten?",
    a: "Nicht regulär. Pro setzt auf Meta und Social Ads. Google Ads ist Teil des Advanced-Pakets.",
  },
  {
    q: "Worin unterscheiden sich Pro und Advanced?",
    a: "Pro konzentriert sich auf Social Media, Performance und Lead Generation, mit monatlichem Content Shoot und 4 Videos. Advanced setzt auf Social und Search: mit Google Ads, SEO, Website bzw. Redesign je nach Projekt, Server-Side Tracking und 6 Videos pro Content Shoot.",
  },
  {
    q: "Kann ich einzelne Leistungen ohne Paket buchen?",
    a: "Ja. Content Day, Podcast-Studio und Social Recruiting haben feste Preise. Websites, CRM und SEO bieten wir als Projekt an, der Preis richtet sich nach dem Umfang.",
  },
  {
    q: "Welches Paket passt zu mir?",
    a: `Das klären wir im Strategie-Call, ${strategyCall.duration} und ${strategyCall.price}. Wir schauen auf dein Ziel, dein Angebot und dein Tracking. Danach weisst du, ob Pro, Advanced oder ein einzelnes Produkt sinnvoller ist.`,
  },
];

export const paketePage = {
  meta: {
    title: "Pakete & Preise: Marketing für KMU ab CHF 3'500",
    description:
      "Pro für CHF 3'500 und Advanced für CHF 4'900 pro Monat, Mindestlaufzeit 6 Monate. Dazu Content Day, Podcast-Studio und Social Recruiting mit festem Preis.",
    path: "/pakete",
  },
  crumbs: [{ name: "Pakete", path: "/pakete" }],
  schema: {
    name: "Marketing-Pakete Pro und Advanced",
    serviceType: "Performance Marketing",
    description:
      "Monatliche Marketing-Pakete für KMU: Werbung, Content-Produktion und Infrastruktur aus einem Team. Mindestlaufzeit 6 Monate, Werbebudget nicht enthalten.",
    offers: packages.map((p) => ({
      name: p.name,
      price: chf(p.price.amount),
      unitText: p.price.unit ?? "pro Monat",
      description: p.minTerm,
    })),
  },
  header: {
    meta: ["Pakete", "Einzelprodukte", "Projekte"],
    title: ["Zwei Pakete.", "Klare Preise."],
    /** Akzentwort im Titel (violett) */
    accent: "Preise",
    lead: "Pro und Advanced verbinden Werbung, Dreh und Infrastruktur zu einem Monatspreis. Dazu kommen Einzelprodukte mit festem Preis und Projekte, die wir nach Umfang anbieten.",
    secondary: { label: "Pakete im Detail", href: "#vergleich" },
    facts: [
      { k: "Laufzeit", v: "mindestens 6 Monate" },
      { k: "Werbebudget", v: "separat, nicht im Paketpreis" },
      { k: "Einstieg", v: `Strategie-Call, ${strategyCall.duration}, ${strategyCall.price}` },
    ],
  },
  poster: {
    title: "Preise der Pakete",
    rows: [
      {
        id: pro.id,
        name: pro.name,
        amount: pro.price.amount,
        unit: pro.price.unit ?? "",
        term: pro.minTerm,
        text: "Social Media, Performance und Lead Generation: Meta Ads, Landingpages pro Kampagne, CRM und ein monatlicher Dreh mit 4 Videos.",
      },
      {
        id: advanced.id,
        name: advanced.name,
        amount: advanced.price.amount,
        unit: advanced.price.unit ?? "",
        term: advanced.minTerm,
        text: "Social und Search: Google Ads, SEO, Website bzw. Redesign je nach Projekt und 6 Videos pro Content Shoot. Dazu Server-Side Tracking, also Messung über einen eigenen Server statt nur im Browser.",
      },
    ],
  },
  compare: {
    id: "vergleich",
    meta: ["Im Detail"],
    title: "Was in den Paketen steckt.",
    text: "Jede Zeile stammt aus der Paketbeschreibung. Wo «nicht aufgeführt» steht, klären wir den Umfang im Strategie-Call.",
  },
  budget: {
    meta: "Was dazukommt",
    title: ["Das Werbebudget", "kommt separat dazu."],
    accent: "separat",
    text: "Paketpreis und Werbebudget sind zwei verschiedene Posten. Das Paket bezahlt unsere Arbeit, das Budget die Anzeigen auf Meta, Google oder TikTok.",
    packageLabel: "Paketpreis",
    packageValue: `${pro.price.amount} / ${advanced.price.amount}`,
    packageNote: "pro Monat, je nach Paket",
    budgetLabel: "Werbebudget",
    budgetValue: "3'000–6'000",
    budgetNote: "pro Monat, Richtwert für saubere Tests",
    notIncludedTitle: "Nicht im Paketpreis",
    notIncluded: [
      { k: "Werbebudget", v: "Für Meta, Google oder TikTok. Kommt immer separat dazu." },
      { k: "Google Ads im Pro", v: "Nicht regulär enthalten. Im Advanced gehört Google Ads dazu." },
      {
        k: "Drittanbieter",
        v: "Hosting, Domains, Software- und CRM-Lizenzen werden laut AGB separat verrechnet oder direkt von dir bezahlt.",
      },
    ],
    rechner: { label: "Was dein Budget bringen kann", href: "/rechner" },
  },
  singles: {
    meta: ["Einzelprodukte"],
    title: "Ohne Paket buchbar. Mit festem Preis.",
    text: "Content Day und Podcast-Studio buchst du einzeln. Social Recruiting ist ein abgeschlossenes Paket für neue Mitarbeitende.",
    recruiting: {
      meta: "Produkt / Social Recruiting",
      name: "Social Recruiting",
      href: "/social-recruiting",
      amount: socialRecruiting.price.amount,
      note: socialRecruiting.price.note ?? "",
      includesLabel: "Enthalten",
      includes: socialRecruiting.includes,
      notes: socialRecruiting.notes,
      link: "Social Recruiting ansehen",
    },
  },
  projects: {
    meta: ["Projekte"],
    title: "Website, CRM und SEO: Preis nach Umfang.",
    text: "Hier hängt der Aufwand davon ab, wo du startest. Beschreib uns dein Projekt, dann klären wir den Umfang.",
    priceLabel: "Preis nach Umfang",
    items: [
      {
        name: "Website und Landingpages",
        href: "/webdesign",
        text: "Neue Website, Relaunch oder Landingpages für einzelne Kampagnen. Im Advanced-Paket ist eine Website bzw. ein Redesign je nach Projekt enthalten.",
        cta: { label: cta.website.label, href: cta.website.href },
      },
      {
        name: "CRM und Automation",
        href: "/crm-automation",
        text: "Pipelines, Follow-ups per E-Mail oder WhatsApp, Terminprozesse und Dashboards. Im Pro-Paket gehört eine CRM- und Sales-Infrastruktur dazu.",
        cta: { label: cta.crm.label, href: cta.crm.href },
      },
      {
        name: "SEO und AEO",
        href: "/seo",
        text: "Technisches SEO, Inhalte, Local SEO und AEO, also Optimierung für die Antworten von KI-Assistenten. Im Advanced-Paket ist SEO enthalten.",
        cta: { label: "SEO-Projekt anfragen", href: "/kontakt?anliegen=seo" },
      },
    ],
  },
  voice: {
    meta: ["Kundenstimme", "Video-Interview"],
    quote: quoteAt("00:45"),
    follow: quoteAt("01:35"),
    person: pinelli.person,
    role: `${pinelli.role}, ${pinelli.company}`,
    source: pinelli.source,
  },
  faq: {
    meta: ["Fragen"],
    title: "Laufzeit, Budget, Umfang.",
    items: faq,
    openTitle: "Noch nicht beantwortet",
    open: [
      { q: "Was passiert nach der Mindestlaufzeit?", todo: "Verlängerung und Kündigungsfrist der Pakete von eCreator bestätigen" },
      { q: "Verstehen sich die Preise mit oder ohne MWST?", todo: "MWST-Hinweis für alle Preise von eCreator bestätigen" },
      {
        q: "Kann ich zwischen Pro und Advanced wechseln?",
        todo: "Regel für einen Paketwechsel von eCreator bestätigen",
        interim: "Das klären wir im Strategie-Call.",
      },
    ],
  },
  related: [
    { label: "Alle Leistungen", href: "/leistungen", text: "Jede Leistung im Überblick, nach Bereich geordnet." },
    { label: "Content Day", href: "/content-day", text: "Vier Stunden Dreh, fertig geschnitten. Ab CHF 1'990." },
    { label: "Performance Marketing", href: "/performance-marketing", text: "Kampagnen, die auf Anfragen und Kunden optimiert sind." },
    { label: "Potenzialrechner", href: "/rechner", text: "Was dein Werbebudget bringen kann, als Schätzung." },
  ],
  finalCta: {
    title: ["Welches Paket passt?", "Das klären wir im Call."] as [string, string],
    secondary: { label: "Paket anfragen", href: "/kontakt?anliegen=pakete" },
  },
};

export type PaketePage = typeof paketePage;
