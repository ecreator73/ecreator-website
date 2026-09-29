/**
 * Kundenstimmen. KEINE erfundenen oder anonymen Zitate.
 * Die Testimonials der bisherigen Live-Site (Initialen, Branchen statt Namen, Stockfotos)
 * sind nicht belegt und werden bewusst NICHT übernommen.
 *
 * Belegt: Video-Interview mit Costantino Pinelli (Asset Management Switzerland AG),
 * von eCreator am 17.06.2026 auf LinkedIn veröffentlicht. Zitate sind wörtliche Auszüge
 * aus dem Transkript (automatisch erstellt, sprachlich nur bei eindeutigen Erkennungsfehlern
 * korrigiert, siehe _research/interview-transcript*.json). Vor Livegang mit dem Video abgleichen.
 */

export type Testimonial = {
  id: string;
  person: string;
  role: string;
  company: string;
  quote: string;
  /** längerer wörtlicher Auszug, in dem das Kernzitat steht */
  context?: string;
  /** weitere wörtliche Auszüge mit Zeitstempel */
  more?: { text: string; at: string }[];
  /** Zeitstempel im Video */
  at?: string;
  video?: { src: string; poster: string; loop?: string; duration: string; captions?: string };
  source: string;
  todo?: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "pinelli",
    person: "Costantino Pinelli",
    role: "CEO",
    company: "Asset Management Switzerland AG",
    quote: "Die Agenda ist voll.",
    context:
      "Man muss nicht immer von den Mitarbeitern hören: Ich habe zu wenig Termine, es läuft nicht. Sondern die Agenda ist voll.",
    more: [
      { text: "Am Anfang war ich auch skeptisch.", at: "00:45" },
      {
        text: "Die Zusammenarbeit mit eCreator hat mir ermöglicht, dass ich kontinuierlich neue Leads bekommen habe.",
        at: "01:35",
      },
      { text: "Deswegen ist es nur zum Weiterempfehlen.", at: "02:13" },
    ],
    at: "02:05",
    video: {
      src: "/work/interview-asset-management.mp4",
      poster: "/work/interview-asset-management-poster.jpg",
      loop: "/work/interview-asset-management-loop.mp4",
      duration: "02:22",
      captions: "/work/interview-asset-management.de.vtt",
    },
    source: "Video-Interview, LinkedIn eCreator GmbH, 17.06.2026",
    todo: "Freigabe für die Nutzung auf der Website bestätigen. Zitate gegen das Video prüfen.",
  },
];

/** Offene Plätze für weitere Video-Testimonials (gestaltete Platzhalter, keine Inhalte erfinden). */
export const testimonialSlots = [
  { id: "slot-1", label: "Video-Testimonial Kunde", spec: "60 bis 90 s, 16:9 und 9:16, am Content Day aufgenommen" },
  { id: "slot-2", label: "Video-Testimonial Kunde", spec: "Interview-Setup wie oben, Name und Firma als Bauchbinde" },
];

export const pinelli = testimonials[0];
