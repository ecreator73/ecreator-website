import Image from "next/image";
import { workById, webProjects } from "@/content/work";
import { VideoFrame } from "@/components/ui/VideoFrame";

type Item =
  | { kind: "video"; id: string; caption: [string, string]; src: string; poster: string; label: string }
  | { kind: "web"; id: string; caption: [string, string]; src: string; alt: string };

const ads = ["vorsorge", "krankenkasse"].map(workById);
const sites = webProjects;

const items: Item[] = [
  { kind: "video", id: ads[0].id, caption: ["Social Ad", ads[0].theme], src: ads[0].short, poster: ads[0].poster, label: ads[0].title },
  {
    kind: "web",
    id: sites[0].id,
    caption: ["Website", sites[0].url.replace(/^https?:\/\//, "").replace(/\/$/, "")],
    src: sites[0].mobile,
    alt: `Website ${sites[0].client}, mobile Ansicht`,
  },
  { kind: "video", id: ads[1].id, caption: ["Social Ad", ads[1].theme], src: ads[1].short, poster: ads[1].poster, label: ads[1].title },
  {
    kind: "web",
    id: sites[1].id,
    caption: ["Website + Kampagnen", sites[1].url.replace(/^https?:\/\//, "").replace(/\/$/, "")],
    src: sites[1].mobile,
    alt: `Website ${sites[1].client}, mobile Ansicht`,
  },
];

/**
 * Arbeiten: Ads und Websites nebeneinander, jede Arbeit nur einmal pro Seite.
 * Ein einziger Schnitt (9°) läuft quer über den ganzen Streifen, wie durch die Ringe des Logos.
 */
export function WorkStrip() {
  return (
    <section id="arbeit" aria-labelledby="arbeit-title" className="sec-s">
      <div className="wrap">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <h2 id="arbeit-title" className="t-h3 max-w-[28ch]">
            Ads, die wir gedreht haben. Websites, die wir gebaut haben.
          </h2>
          <p className="t-meta text-grey-600">Echte Arbeiten, keine Mockups</p>
        </div>
      </div>
      <div
        className="wrap snap-x snap-mandatory overflow-x-auto pb-2 [scroll-padding-inline:var(--margin)] [scrollbar-width:none] md:snap-none [&::-webkit-scrollbar]:hidden"
        role="region"
        aria-label="Arbeiten, horizontal scrollbar"
        tabIndex={0}
      >
        <ul className="grid w-max grid-flow-col gap-[var(--gutter)] overflow-visible md:w-full md:grid-flow-row md:grid-cols-4">
          {items.map((it) => (
            <li key={it.id} className="w-[40vw] max-w-[260px] snap-start md:w-auto md:max-w-none">
              {it.kind === "video" ? (
                <VideoFrame src={it.src} poster={it.poster} label={it.label} />
              ) : (
                <div className="relative aspect-[9/16] overflow-hidden bg-paper-2">
                  <Image src={it.src} alt={it.alt} fill sizes="(min-width: 768px) 24vw, 44vw" className="object-cover object-top" />
                </div>
              )}
              <p className="t-meta mt-3 text-grey-700">
                {it.caption[0]} <span className="text-grey-500">/</span> {it.caption[1]}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
