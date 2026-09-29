/**
 * «Systems over campaigns» als Kreislauf: 9 Stationen (die Kette aus dem Briefing)
 * auf 5 Ringen (Disziplinen). Station 9 führt zurück zu Station 1: ein System endet nicht.
 */

export type TrackId = "content" | "ads" | "web" | "crm" | "data";

export const tracks: { id: TrackId; label: string; detail: string; href: string }[] = [
  { id: "content", label: "Content", detail: "Videos, Fotos, Skripte, Models", href: "/content-produktion" },
  { id: "ads", label: "Werbung", detail: "Meta, Google, TikTok, LinkedIn", href: "/performance-marketing" },
  { id: "web", label: "Website", detail: "Landingpages, SEO, AEO", href: "/webdesign" },
  { id: "crm", label: "CRM", detail: "Pipeline, Nachfassen, Termine", href: "/crm-automation" },
  { id: "data", label: "Daten", detail: "Tracking, Auswertung", href: "/performance-marketing#tracking" },
];

export type Station = {
  n: string;
  title: string;
  text: string;
  clips: Partial<Record<TrackId, string>>;
};

export const stations: Station[] = [
  {
    n: "01",
    title: "Aufmerksamkeit erzeugen",
    text: "Kurze Videos mit klarem Einstieg, gedreht an einem Content Day, ausgespielt auf Instagram, Facebook und TikTok.",
    clips: { content: "Videos", ads: "Reichweite" },
  },
  {
    n: "02",
    title: "Nachfrage abholen",
    text: "Wer schon sucht, soll dich finden: Google Ads für Suchanfragen, SEO für Google, AEO für ChatGPT und Co.",
    clips: { ads: "Google Ads", web: "SEO, AEO" },
  },
  {
    n: "03",
    title: "Besucher zu Anfragen machen",
    text: "Jede Kampagne bekommt die passende Landingpage: ein Angebot, ein klarer Beweis, ein nächster Schritt.",
    clips: { web: "Landingpage", content: "Beweis", data: "Messpunkte" },
  },
  {
    n: "04",
    title: "Anfragen erfassen",
    text: "Formular, Anruf oder Terminbuchung landen sauber im CRM, mit Quelle und Kampagne.",
    clips: { web: "Formular", crm: "Erfassung", data: "Conversion API" },
  },
  {
    n: "05",
    title: "Anfragen nachfassen",
    text: "Pipelines und automatische Nachrichten per E‑Mail oder WhatsApp. Keine Anfrage bleibt liegen.",
    clips: { crm: "Pipeline, Follow-up" },
  },
  {
    n: "06",
    title: "Verkauf unterstützen",
    text: "Terminprozesse, Erinnerungen und Material, das beim Abschluss hilft, zum Beispiel Kundenstimmen.",
    clips: { crm: "Termine", content: "Kundenstimmen" },
  },
  {
    n: "07",
    title: "Messen, was Kunden bringt",
    text: "Sauberes Tracking, auch serverseitig. So siehst du, welche Anzeige zu einem Abschluss geführt hat.",
    clips: { data: "Tracking", crm: "Abschlüsse" },
  },
  {
    n: "08",
    title: "Optimieren",
    text: "Neue Creatives testen, Landingpages verbessern, Budgets verschieben. Entscheidungen auf Basis echter Zahlen.",
    clips: { content: "Varianten", ads: "Tests", web: "Landingpage", data: "Auswertung" },
  },
  {
    n: "09",
    title: "Skalieren",
    text: "Was funktioniert, bekommt mehr Budget, mehr Content und mehr Kapazität. Dann beginnt die nächste Runde.",
    clips: { content: "Produktion", ads: "Budget", crm: "Kapazität" },
  },
];
