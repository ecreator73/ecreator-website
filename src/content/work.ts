/**
 * Arbeiten: echte Video-Creatives und Projekte von eCreator.
 * Quelle Videos: Mediathek ecreator.ch (Startseite, Kampagnen-Karten, Galerie) + eigenes eCreator-Ad.
 * Beschriftung nur mit belegbaren Angaben:
 *  - "client" nur, wenn der Kunde im Material selbst sichtbar ist (z.B. Logo im Abspann)
 *    oder die Live-Site es eindeutig so zeigt.
 *  - Sonst nur Thema/Format. Keine Kennzahlen an Videos ohne klare Zuordnung.
 */

export type WorkVideo = {
  id: string;
  title: string;
  theme: string;
  client?: string;
  platform: string[];
  duration: string;
  src: string;
  loop: string;
  /** 8-Sekunden-Vorschau, klein, für Streifen */
  short: string;
  poster: string;
  note?: string;
  todo?: string;
};

export const workVideos: WorkVideo[] = [
  {
    id: "naechstenpflege",
    title: "Pflegende Angehörige",
    theme: "Pflege",
    client: "Spitex Nächstenpflege",
    platform: ["Meta", "Instagram"],
    duration: "00:25",
    src: "/work/naechstenpflege.mp4",
    loop: "/work/naechstenpflege-loop.mp4",
    short: "/work/naechstenpflege-short.mp4",
    poster: "/work/naechstenpflege-poster.jpg",
    note: "Kundenlogo im Abspann des Videos.",
  },
  {
    id: "steuern",
    title: "Steuererklärung",
    theme: "Steuern",
    client: "Asset Management Switzerland AG",
    platform: ["Meta", "Instagram"],
    duration: "00:20",
    src: "/work/steuern.mp4",
    loop: "/work/steuern-loop.mp4",
    short: "/work/steuern-short.mp4",
    poster: "/work/steuern-poster.jpg",
    note: "Kundenlogo im Abspann des Videos.",
    todo: "Freigabe für die Nennung als Referenz einholen.",
  },
  {
    id: "vorsorge",
    title: "Pensionskasse nach dem Jobwechsel",
    theme: "Vorsorge",
    platform: ["Meta", "Instagram"],
    duration: "00:31",
    src: "/work/pk.mp4",
    loop: "/work/pk-loop.mp4",
    short: "/work/pk-short.mp4",
    poster: "/work/pk-poster.jpg",
    todo: "Kunde bestätigen (Hypothese laut Recherche: PKfinder, Pensionskassen).",
  },
  {
    id: "ecreator",
    title: "Recruiting-System für Personalvermittlungen",
    theme: "Eigenes Ad",
    client: "eCreator",
    platform: ["Meta", "Instagram"],
    duration: "00:31",
    src: "/work/ecreator-ad.mp4",
    loop: "/work/ecreator-ad-loop.mp4",
    short: "/work/ecreator-ad-short.mp4",
    poster: "/work/ecreator-ad-poster.jpg",
    note: "Gedreht im eCreator-Büro (Logo-Wand im Bild). Standort des Büros nicht belegt.",
  },
  {
    id: "krankenkasse",
    title: "Krankenkasse wechseln",
    theme: "Krankenkasse",
    platform: ["Meta", "Instagram"],
    duration: "00:13",
    src: "/work/krankenkasse.mp4",
    loop: "/work/krankenkasse-loop.mp4",
    short: "/work/krankenkasse-short.mp4",
    poster: "/work/krankenkasse-poster.jpg",
    todo: "Live-Site zeigt dieses Video mit Allianz-Logo, die Case Study nennt das Thema bei einem Asset-Management-Kunden. Zuordnung bestätigen.",
  },
  {
    id: "pflegezukunft",
    title: "Für die Liebsten da sein",
    theme: "Pflege",
    client: "Pflegezukunft Schweiz",
    platform: ["Meta", "TikTok"],
    duration: "00:20",
    src: "/work/pflegezukunft.mp4",
    loop: "/work/pflegezukunft-loop.mp4",
    short: "/work/pflegezukunft-short.mp4",
    poster: "/work/pflegezukunft-poster.jpg",
    note: "Absender im Abspann des Videos.",
    todo: "Kundenbeziehung und Freigabe bestätigen (nur im Video genannt).",
  },
  {
    id: "fitness",
    title: "Training im Studio",
    theme: "Fitness",
    platform: ["Instagram"],
    duration: "00:15",
    src: "/work/fitness.mp4",
    loop: "/work/fitness-loop.mp4",
    short: "/work/fitness-short.mp4",
    poster: "/work/fitness-poster.jpg",
    todo: "Kunde und Kontext bestätigen.",
  },
];

export const workById = (id: string) => workVideos.find((w) => w.id === id)!;

/** Kundenlogos von der Live-Site (Nutzungsfreigabe vor Livegang bestätigen). Einträge mit needsApproval werden nicht angezeigt. */
export const clientLogos = [
  { name: "Asset Management Switzerland AG", src: "/clients/asset-management.png", w: 627, h: 120 },
  { name: "Spitex Nächstenpflege", src: "/clients/spitex-naechstenpflege.png", w: 447, h: 120 },
  { name: "Trapletti Gipser Maler GmbH", src: "/clients/trapletti.png", w: 428, h: 120 },
  { name: "Novara AG Immobilien", src: "/clients/novara.png", w: 536, h: 120 },
  { name: "Arana Care", src: "/clients/arana-care.png", w: 456, h: 120 },
  // Allianz: Kundenbeziehung extern nicht belegt, Weltmarke → nur mit Freigabe (siehe README TODO)
  { name: "Allianz", src: "/clients/allianz.png", w: 483, h: 120, needsApproval: true },
];

/** Webprojekt, belegt durch Credit «Webseite bei eCreator» im Footer von nt-gipsermaler.ch */
export const webProjects = [
  {
    id: "trapletti",
    client: "Trapletti Gipser Maler GmbH",
    place: "Thalwil",
    url: "https://nt-gipsermaler.ch/",
    kind: "Website",
    desktop: "/work/trapletti-desktop.webp",
    desktopFull: "/work/trapletti-desktop-full.webp",
    mobile: "/work/trapletti-mobile.webp",
    summary:
      "Neue Website für einen Gipser- und Malerbetrieb am Zürichsee: klare Leistungen, Referenzen, Offertanfrage auf jeder Seite, mobil optimiert.",
    evidence: "Footer der Website: «Webseite bei eCreator».",
  },
  {
    id: "naechstenpflege",
    client: "Spitex Nächstenpflege",
    place: "Zürich, Aargau, Schaffhausen",
    url: "https://naechstenpflege.ch/",
    kind: "Website + Kampagnen",
    desktop: "/work/naechstenpflege-site-desktop.webp",
    desktopFull: "/work/naechstenpflege-site-full.webp",
    mobile: "/work/naechstenpflege-site-mobile.webp",
    summary:
      "Website und Video-Kampagnen für pflegende Angehörige: dieselbe Botschaft in Ad, Landingpage und Anmeldung.",
    evidence: "Footer der Website: «made by eCreator.ch». Kundenlogo im Abspann der Ads.",
  },
];

export const visibleClientLogos = clientLogos.filter((l) => !("needsApproval" in l && l.needsApproval));
