import { homeCases, homeCasesIntro, type HomeCase } from "@/content/pages/home";
import { pinelli } from "@/content/testimonials";
import { workById } from "@/content/work";
import { withAccent } from "@/lib/accent";
import { ArrowLink } from "@/components/ui/ButtonLink";
import { Todo } from "@/components/page/Blocks";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { CaseInterview } from "./CaseInterview";

/**
 * Case Studies auf der Startseite: Karten mit grossem Video im Querformat (16:9) und daneben Branche, Kunde,
 * Leistungen als Häkchen, Kennzahlen, Zitat und Link. Das Video steht abwechselnd links und rechts
 * (auf Handy und Tablet oben). Ziel des Hero-Buttons «Erfahrungen».
 */
export function CaseStudies() {
  return (
    <section id="erfahrungen" aria-labelledby="cases-title" className="sec-l relative isolate bg-paper-2">
      <div aria-hidden className="net pointer-events-none absolute left-1/2 top-0 -z-10 h-[40rem] w-[min(100%,70rem)] -translate-x-1/2 [--net-at:50%_32%]" />
      <div className="wrap">
        <div className="mx-auto mb-12 max-w-[46rem] text-center md:mb-16">
          <p className="label-pill">{homeCasesIntro.label}</p>
          <h2 id="cases-title" className="t-h2 mt-4">
            {withAccent(homeCasesIntro.title, homeCasesIntro.accent)}
          </h2>
        </div>
        <div className="mx-auto max-w-[84rem] space-y-6 md:space-y-10">
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
      className={`grid grid-cols-1 items-center gap-6 rounded-[var(--radius-card)] border border-[rgb(11_29_63/0.09)] bg-white p-2 sm:p-2.5 lg:gap-10 ${
        flip ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]" : "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]"
      }`}
      data-reveal
    >
      <div className={flip ? "lg:order-2" : ""} data-reveal="pop">
        {c.media.kind === "interview" ? <CaseInterview t={pinelli} /> : <AdMedia workId={c.media.workId} />}
      </div>

      <div className={`px-3 pb-5 sm:px-4 lg:py-6 ${flip ? "lg:pl-6 lg:pr-0" : "lg:pl-0 lg:pr-8"}`}>
        <p className="t-meta flex items-center gap-2 text-violet-deep">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-violet" />
          {c.sector} · Case Study
        </p>
        <h3 id={`case-${c.id}`} className="t-h2 mt-3 text-[clamp(1.625rem,1.25rem+1.1vw,2.125rem)]">
          {c.client}
        </h3>
        <p className="t-body mt-2.5 text-grey-600">{c.summary}</p>

        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5" aria-label="Leistungen">
          {c.services.map((s) => (
            <li key={s} className="flex items-center gap-1.5 text-[0.875rem] font-medium text-ink">
              <Tick />
              {s}
            </li>
          ))}
        </ul>

        {(c.kpis || c.highlights || c.todo) && (
          <div className="mt-5 border-t border-line pt-5">
            {c.kpis && (
              <dl className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4">
                {c.kpis.map((k) => (
                  <div key={k.label} className="flex flex-col-reverse justify-end">
                    <dt className="mt-1 text-[0.8125rem] leading-snug text-grey-500">{k.label}</dt>
                    <dd className="t-num whitespace-nowrap text-[clamp(1.5rem,1.2rem+0.9vw,1.875rem)]">{k.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {c.highlights && (
              <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {c.highlights.map((h) => (
                  <div key={h.title}>
                    <dt className="t-h4">{h.title}</dt>
                    <dd className="t-small mt-1 text-grey-600">{h.text}</dd>
                  </div>
                ))}
              </dl>
            )}
            {c.todo && (
              <div className={c.kpis || c.highlights ? "mt-5" : ""}>
                <Todo>{c.todo}</Todo>
              </div>
            )}
          </div>
        )}

        {c.quote && (
          <blockquote className="mt-5 border-l-2 border-violet pl-4">
            <p className="t-body font-medium text-ink">«{c.quote.text}»</p>
            <footer className="t-small mt-1 text-grey-500">
              <span className="font-semibold text-ink">{c.quote.by}</span> · {c.quote.role}
            </footer>
          </blockquote>
        )}
        {(c.link || c.source) && (
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-1">
            {c.link && <ArrowLink href={c.link.href}>{c.link.label}</ArrowLink>}
            {c.source && <p className="t-small text-grey-500">{c.source}</p>}
          </div>
        )}
      </div>
    </article>
  );
}

function Tick() {
  return (
    <svg aria-hidden viewBox="0 0 12 10" className="h-2.5 w-3 flex-none text-violet">
      <path d="M1 5.2l3.2 3L11 1.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Social Ads sind im Hochformat gedreht. Damit alle Cases im Querformat stehen, sitzt das Ad unbeschnitten
 * in einem 16:9-Rahmen (auf dem Handy 4:3, damit es nicht zu klein wird); dahinter liegt sein eigenes
 * Standbild, weich gezeichnet. Ab Tablet steht der Kunde unten links im Bild.
 */
function AdMedia({ workId }: { workId: string }) {
  const w = workById(workId);
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-media)] bg-ink shadow-float sm:aspect-video">
      <div
        aria-hidden
        className="absolute inset-0 scale-125 bg-cover bg-center opacity-90 blur-2xl saturate-150"
        style={{ backgroundImage: `url(${w.poster})` }}
      />
      <div aria-hidden className="absolute inset-0 bg-ink/30" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/10 to-transparent" />
      <div className="absolute inset-y-3 left-1/2 -translate-x-1/2 sm:inset-y-4">
        <VideoFrame
          src={w.src}
          poster={w.poster}
          label={`${w.title}, Social Ad${w.client ? ` für ${w.client}` : ""}`}
          rounded={false}
          className="h-full rounded-xl shadow-float"
        />
      </div>
      {w.client && (
        <div className="pointer-events-none absolute bottom-5 left-5 hidden max-w-[11rem] text-white sm:block md:bottom-6 md:left-6">
          <p className="t-meta flex items-center gap-2 text-white/85">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-violet" />
            Social Ad
          </p>
          <p className="mt-1.5 font-display text-[1.125rem] font-bold leading-tight">{w.client}</p>
        </div>
      )}
    </div>
  );
}
