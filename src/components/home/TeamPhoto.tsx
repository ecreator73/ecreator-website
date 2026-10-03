import Image from "next/image";
import { homeTeam } from "@/content/pages/home";
import { withAccent } from "@/lib/accent";
import { ArrowLink } from "@/components/ui/ButtonLink";
import { Placeholder } from "@/components/ui/Placeholder";

/**
 * Team auf der Startseite: ein gemeinsames Teamfoto statt Einzelporträts.
 * Solange kein echtes Gruppenfoto vorliegt (homeTeam.photo.src = null), steht dort ein beschrifteter Bildplatz.
 */
export function TeamPhoto() {
  const t = homeTeam;
  return (
    <section aria-labelledby="team-title" className="sec-l border-t border-line">
      <div className="wrap">
        <div className="mx-auto mb-12 max-w-[46rem] text-center md:mb-14">
          <p className="label-pill">{t.label}</p>
          <h2 id="team-title" className="t-h2 mt-4">
            {withAccent(t.title, t.accent)}
          </h2>
          <p className="t-lead mx-auto mt-5 max-w-[50ch] text-grey-700">{t.text}</p>
        </div>

        <div className="mx-auto max-w-[64rem]" data-reveal>
          {t.photo.src ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] shadow-float sm:aspect-video">
              <Image
                src={t.photo.src}
                alt={t.photo.alt}
                fill
                sizes="(min-width: 1100px) 1024px, 100vw"
                className="object-cover object-[center_30%]"
              />
            </div>
          ) : (
            <Placeholder
              label={t.photo.placeholder.label}
              spec={t.photo.placeholder.spec}
              ratio="21 / 9"
              className="min-h-56 rounded-[var(--radius-card)]"
            />
          )}
        </div>

        <div className="mt-12 text-center">
          <ArrowLink href={t.link.href}>{t.link.label}</ArrowLink>
        </div>
      </div>
    </section>
  );
}
