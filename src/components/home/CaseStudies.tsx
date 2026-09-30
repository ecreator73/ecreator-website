import { homeCases, homeCasesIntro, type HomeCase } from "@/content/pages/home";
import { pinelli } from "@/content/testimonials";
import { workById } from "@/content/work";
import { withAccent } from "@/lib/accent";
import { ArrowLink } from "@/components/ui/ButtonLink";
import { Todo } from "@/components/page/Blocks";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { CaseInterview } from "./CaseInterview";

/**
 * Case Studies auf der Startseite: kompakte Karten mit Video im Hochformat (scharf in Originalgrösse)
 * und Ergebnissen als Häkchen-Liste. Das Video steht abwechselnd links und rechts (auf dem Handy oben).
 * Ziel des Hero-Buttons «Erfahrungen».
 */
export function CaseStudies() {
  return (
    <section id="erfahrungen" aria-labelledby="cases-title" className="sec-l bg-paper-2">
      <div className="wrap">
        <div className="mx-auto mb-10 max-w-[46rem] text-center md:mb-14">
          <p className="label-pill">{homeCasesIntro.label}</p>
          <h2 id="cases-title" className="t-h2 mt-4">
            {withAccent(homeCasesIntro.title, homeCasesIntro.accent)}
          </h2>
        </div>
        <div className="space-y-5 md:space-y-6">
          {homeCases.map((c, i) => (
            <CaseRow key={c.id} c={c} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseRow({ c, flip }: { c: HomeCase; flip: boolean }) {
  return (
    <article
      aria-labelledby={`case-${c.id}`}
      className={`card mx-auto grid max-w-[58rem] items-center gap-6 p-3 sm:p-4 md:gap-8 ${
        flip
          ? "md:grid-cols-[minmax(0,1fr)_16rem] lg:grid-cols-[minmax(0,1fr)_18rem]"
          : "md:grid-cols-[16rem_minmax(0,1fr)] lg:grid-cols-[18rem_minmax(0,1fr)]"
      }`}
      data-reveal
    >
      <div className={`mx-auto w-full max-w-[16rem] md:max-w-none ${flip ? "md:order-2" : ""}`} data-reveal="pop">
        {c.media.kind === "interview" ? <CaseInterview t={pinelli} /> : <AdMedia workId={c.media.workId} />}
      </div>

      <div className={`px-3 pb-4 sm:px-4 md:py-6 ${flip ? "md:pl-8 md:pr-0 lg:pl-10" : "md:pl-0 md:pr-8 lg:pr-10"}`}>
        <p className="label-pill">{c.label}</p>
        <h3 id={`case-${c.id}`} className="t-h3 mt-4 md:text-[1.75rem]">
          {c.client}
        </h3>
        <p className="t-body mt-2 text-grey-600">{c.summary}</p>
        <ul className="check-list mt-5 space-y-2.5">
          {c.points.map((p) =>
            "text" in p ? (
              <li key={p.text} className="t-body font-semibold text-ink">
                {p.text}
              </li>
            ) : (
              <li key={p.todo} className="is-todo">
                <Todo>{p.todo}</Todo>
              </li>
            ),
          )}
        </ul>
        {c.quote && (
          <blockquote className="mt-6 border-l-2 border-violet pl-4">
            <p className="t-small text-grey-700">«{c.quote.text}»</p>
            <footer className="t-small mt-1 text-grey-500">{c.quote.by}</footer>
          </blockquote>
        )}
        {c.link && (
          <div className="mt-6">
            <ArrowLink href={c.link.href}>{c.link.label}</ArrowLink>
          </div>
        )}
        {c.source && <p className="t-small mt-4 text-grey-500">{c.source}</p>}
      </div>
    </article>
  );
}

/** Hochformat-Ad in 720p: passt genau in den 9:16-Block, bleibt dadurch scharf. */
function AdMedia({ workId }: { workId: string }) {
  const w = workById(workId);
  return (
    <VideoFrame
      src={w.src}
      poster={w.poster}
      label={`${w.title}, Social Ad${w.client ? ` für ${w.client}` : ""}`}
      className="shadow-float"
    />
  );
}
