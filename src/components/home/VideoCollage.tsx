"use client";

import { useEffect, useRef } from "react";
import { workById } from "@/content/work";
import { VideoFrame } from "@/components/ui/VideoFrame";

/** Mitte: das Video, aus dem herausgezoomt wird. */
const CENTER = "arana-care";

type Col = { ids: [string, string]; shift: string; outer?: boolean; at: [number, number] };
/** Spalten links und rechts der Mitte. at = Fortschritt (0 bis 1), ab dem das jeweilige Video hereinploppt. */
const LEFT: Col[] = [
  { ids: ["creator-casting", "vorsorge"], shift: "-14%", outer: true, at: [0.46, 0.56] },
  { ids: ["promacare", "call-agents"], shift: "10%", at: [0.16, 0.28] },
];
const RIGHT: Col[] = [
  { ids: ["pflegezukunft", "vergessene-vorsorgegelder"], shift: "-10%", at: [0.22, 0.34] },
  { ids: ["krankenkasse", "steuern"], shift: "14%", outer: true, at: [0.5, 0.6] },
];

/** Endgrösse der Collage (herausgezoomt). Auf dem Handy etwas grösser, damit weniger Weissraum bleibt. */
const BASE = 0.92;
const BASE_MOBILE = 1.1;

/**
 * Echte Arbeiten als Collage, wie auf der bisherigen Website, aber umgekehrt gezoomt:
 * Zuerst füllt das mittlere Video fast die ganze Höhe, beim Scrollen zoomt die Bühne heraus
 * und die anderen Ads ploppen nacheinander herein. Die Bühne bleibt dabei stehen (sticky).
 * Ohne JavaScript oder bei reduzierter Bewegung: ruhige Collage, alles sichtbar, kein Zoom.
 */
export function VideoCollage() {
  const trackRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const center = centerRef.current;
    if (!track || !center) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tiles = Array.from(track.querySelectorAll<HTMLElement>("[data-pop-at]"));
    // Erst jetzt dürfen die Videos versteckt starten (ohne JS bleiben sie sichtbar)
    track.dataset.popReady = "";

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = track.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      const p = distance > 0 ? Math.min(1, Math.max(0, -rect.top / distance)) : 1;
      const base = window.innerWidth < 768 ? BASE_MOBILE : BASE;
      // Start: Mitte füllt ca. 90 % der Höhe, aber nie breiter als der Viewport (Layout-Masse, ohne Transform)
      const zoom = Math.max(
        base,
        Math.min((window.innerHeight * 0.9) / center.offsetHeight, window.innerWidth / center.offsetWidth),
      );
      track.style.setProperty("--collage-scale", (zoom - p * (zoom - base)).toFixed(4));
      for (const t of tiles) t.classList.toggle("is-in", p >= Number(t.dataset.popAt));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      delete track.dataset.popReady;
    };
  }, []);

  const center = workById(CENTER);

  return (
    <section id="arbeit" aria-labelledby="arbeit-title" className="relative">
      <div className="wrap pt-6 text-center md:pt-10">
        <p className="label-pill">Echte Arbeiten, keine Mockups</p>
        <h2 id="arbeit-title" className="t-h2 mx-auto mt-5 max-w-[20ch]">
          Ads, die wir <span className="text-accent">selbst</span> gedreht haben.
        </h2>
        <p className="t-lead mx-auto mt-5 max-w-[46ch] text-grey-600">
          Social Ads aus unserer Produktion für Pflege, Vorsorge, Gastronomie und Recruiting.
        </p>
      </div>

      {/* Scroll-Strecke: die Bühne steht, während herausgezoomt wird */}
      <div ref={trackRef} className="relative -mt-10 h-[200svh] md:-mt-3 motion-reduce:mt-6 motion-reduce:h-auto">
        <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden motion-reduce:static motion-reduce:h-auto motion-reduce:py-10">
          <div
            className="flex items-center justify-center gap-3 will-change-transform md:gap-4"
            style={{ transform: `scale(var(--collage-scale, ${BASE}))` }}
          >
            {LEFT.map((col, i) => (
              <Column key={`l${i}`} {...col} />
            ))}
            <div ref={centerRef} className="w-[40vw] max-w-[300px] flex-none md:w-[21vw]" data-reveal="pop">
              <VideoFrame
                src={center.src}
                poster={center.poster}
                label={`${center.title}, Social Ad, Thema ${center.theme}`}
                className="shadow-float"
              />
            </div>
            {RIGHT.map((col, i) => (
              <Column key={`r${i}`} {...col} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Eine Spalte der Collage: zwei Ads übereinander, leicht versetzt; jedes Video ploppt einzeln herein. */
function Column({ ids, shift, outer, at }: Col) {
  return (
    <div
      className={`flex-none flex-col gap-3 md:gap-4 ${outer ? "hidden w-[13vw] max-w-[190px] md:flex" : "flex w-[25vw] max-w-[220px] md:w-[16vw]"}`}
      style={{ transform: `translateY(${shift})` }}
    >
      {ids.map((id, k) => {
        const w = workById(id);
        return (
          <div key={id} className="pop" data-pop-at={at[k]}>
            <VideoFrame
              src={w.short}
              poster={w.poster}
              label={`${w.title}, ${w.client === "eCreator" ? "eigenes Ad von eCreator" : `Social Ad, Thema ${w.theme}`}`}
            />
          </div>
        );
      })}
    </div>
  );
}
