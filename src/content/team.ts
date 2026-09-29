/**
 * Team. Quelle: ecreator.ch/ueber-uns (Karten + Modal-Bios), Impressum, Briefing.
 * Porträts:
 *  - Fabian, Ricardo: unbearbeitete Originalfotos aus der WordPress-Mediathek der Live-Site.
 *  - Claudio: Porträt der Live-Site (TODO: Foto aus einem Team-Shoot).
 * Weitere Personen der Live-Site (Kaylou Tagayi, Aristote Francisco, Darus Firesh) sind wegen
 * widersprüchlicher Angaben (Karte vs. Modal) NICHT veröffentlicht, bis eCreator sie bestätigt.
 */

export type Person = {
  id: string;
  name: string;
  /** Rolle laut Briefing */
  role: string;
  roleShort: string;
  focus: string[];
  bio: string;
  portrait?: string;
  /** Bildausschnitt, damit Augenlinie und Kopfgrösse bei allen gleich wirken */
  objectPosition?: string;
  core: boolean;
  email?: string;
  linkedin?: string;
  /** Hinweis für die Freigabe vor Livegang */
  todo?: string;
};

export const team: Person[] = [
  {
    id: "claudio",
    name: "Claudio Peres",
    role: "Geschäftsführung",
    roleShort: "Co-Inhaber, Geschäftsführung",
    focus: ["Performance Marketing", "Ads", "Web", "CRM", "Technik"],
    bio: "Claudio verantwortet Strategie und den System-Ansatz bei eCreator: Video-Vorqualifizierung, Tracking-First und ein fester Testing-Rhythmus, damit Wachstum planbar wird.",
    portrait: "/team/claudio.webp",
    objectPosition: "50% 20%",
    core: true,
    linkedin: "https://www.linkedin.com/in/claudio-peres-97aa8b216",
    todo: "Foto aus einem Team-Shoot nachliefern.",
  },
  {
    id: "fabian",
    // Namensform wie im Impressum. Live «Über uns»: «Fabian Leutwiler Mbah», HR: «Mbah, Fabian Ifeanyi».
    name: "Fabian Mbah",
    role: "Geschäftsführung, Head of Sales",
    roleShort: "Co-Inhaber, Geschäftsführung, Sales",
    focus: ["Sales", "Beratung", "CRM"],
    bio: "Fabian verantwortet Sales und Beratung. Sein Fokus: klare Ziele, die passende Strategie und saubere Umsetzung, damit aus Leads Abschlüsse werden.",
    portrait: "/team/fabian.webp",
    core: true,
    email: "fabian@ecreator.ch",
    objectPosition: "42% 30%",
    todo: "Schreibweise festlegen (Impressum «Fabian Mbah», Über uns «Fabian Leutwiler Mbah», HR «Mbah, Fabian Ifeanyi»).",
  },
  {
    id: "ricardo",
    name: "Ricardo Sorrilha",
    role: "Social Media, Content, Videografie",
    roleShort: "Social Media & Content",
    focus: ["Social Media", "Content", "Videografie"],
    bio: "Ricardo produziert Performance-Content: Video-Hooks, Varianten und klare Botschaften, mit Fokus auf Vorqualifizierung.",
    portrait: "/team/ricardo.webp",
    objectPosition: "50% 22%",
    core: true,
    todo: "Rollenbezeichnung bestätigen (Live-Site: Karte «Creative & Sales Manager», Modal «Performance Content Producer»).",
  },
];

export const corePeople = team.filter((p) => p.core);
