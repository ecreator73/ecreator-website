import Image from "next/image";
import { corePeople } from "@/content/team";

/**
 * Die Menschen hinter eCreator: drei gleich geschnittene Porträts auf einer Grundlinie,
 * Zuständigkeit statt Titel-Floskeln. Mobile als 3er-Reihe, damit es nicht zwei Screens füllt.
 */
export function TeamStrip({ detailed = false }: { detailed?: boolean }) {
  return (
    <ul className="grid grid-cols-3 gap-x-[var(--gutter)] gap-y-10">
      {corePeople.map((p) => (
        <li key={p.id}>
          <div className="group relative aspect-[4/5] overflow-hidden bg-paper-2">
            {p.portrait && (
              <Image
                src={p.portrait}
                alt=""
                fill
                sizes="(min-width: 768px) 30vw, 32vw"
                className="object-cover object-top grayscale transition-[filter] duration-700 group-hover:grayscale-0"
                style={p.objectPosition ? { objectPosition: p.objectPosition } : undefined}
              />
            )}
          </div>
          <h3 className="mt-4 text-[1rem] font-semibold leading-tight md:t-h3">{p.name}</h3>
          <p className="mt-1 text-[0.8125rem] leading-snug text-grey-600 [hyphens:auto] md:t-meta md:mt-2">{p.roleShort}</p>
          <p className="t-meta mt-1 hidden text-grey-500 md:block">{p.focus.join(" / ")}</p>
          {detailed && <p className="t-body mt-4 hidden max-w-[38ch] text-grey-700 md:block">{p.bio}</p>}
          {detailed && (p.email || p.linkedin) && (
            <p className="t-meta mt-4 hidden flex-wrap gap-x-5 gap-y-1 md:flex">
              {p.email && (
                <a href={`mailto:${p.email}`} className="link">
                  {p.email}
                </a>
              )}
              {p.linkedin && (
                <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="link">
                  LinkedIn ↗
                </a>
              )}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}
