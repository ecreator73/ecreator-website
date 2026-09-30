import { cta } from "@/content/site";
import { socialRecruiting } from "@/content/offers";
import { workById } from "@/content/work";
import { ButtonLink, ArrowLink } from "@/components/ui/ButtonLink";
import { VideoFrame } from "@/components/ui/VideoFrame";

/** Social Recruiting als eigenes Produkt: Preis, Inhalt als ein Satz, ehrliche Hinweise, dazu unser eigenes Recruiting-Ad. */
export function RecruitingBand() {
  const ad = workById("ecreator-recruiting");
  return (
    <section aria-labelledby="recruiting-title" className="sec-l border-t border-line">
      <div className="wrap grid-12 gap-y-12">
        <div className="col-span-4 md:col-span-7 lg:col-span-7">
          <p className="label-pill">Produkt · Social Recruiting</p>
          <h2 id="recruiting-title" className="t-h2 mt-6 max-w-[14ch]" data-reveal>
            Neue Leute über Instagram und TikTok finden.
          </h2>
          <p className="t-lead mt-6 max-w-[44ch] text-grey-700">
            Viele gute Leute suchen nicht aktiv auf Jobportalen, sind aber täglich auf Instagram und TikTok. Du bekommst
            Recruiting-Videos, bis zu zwei Kampagnen und ein Bewerber-System, in dem jede Bewerbung landet.
          </p>

          <p className="mt-10 flex items-end gap-3">
            <span className="t-meta mb-2 text-grey-600">CHF</span>
            <span className="t-num">{socialRecruiting.price.amount}</span>
            <span className="t-meta mb-2 text-grey-600">{socialRecruiting.price.note}</span>
          </p>
          <p className="t-body mt-6 max-w-[58ch] border-t border-line pt-5">
            <span className="t-meta mr-2 text-grey-600">Enthalten</span>
            {socialRecruiting.includes.join(" / ")}
          </p>
          <ul className="t-small mt-5 space-y-1 text-grey-700">
            {socialRecruiting.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
            <ButtonLink href={cta.recruiting.href} variant="ink" track="recruiting">
              {cta.recruiting.label}
            </ButtonLink>
            <ArrowLink href="/social-recruiting">So funktioniert es</ArrowLink>
          </div>
        </div>

        <figure className="col-span-4 md:col-span-5 lg:col-span-4 lg:col-start-9">
          <div className="mx-auto max-w-[340px] md:mt-20">
            <VideoFrame src={ad.src} poster={ad.poster} mode="player" label={`${ad.title}, eigenes Ad von eCreator`} />
          </div>
          <figcaption className="t-meta mx-auto mt-3 max-w-[340px] text-grey-700">
            Eigenes Ad <span className="text-grey-500">/</span> Recruiting mit Social Ads <span className="text-grey-500">/</span> {ad.duration}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
