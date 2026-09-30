import Image from "next/image";
import type { ReactNode } from "react";
import { caseBySlug, displayClient, type CaseStudy } from "@/content/cases";
import { webProjects, workById } from "@/content/work";
import type { ArticleProof } from "@/content/pages/insights";
import { Arrow, ArrowLink } from "@/components/ui/ButtonLink";
import { VideoFrame } from "@/components/ui/VideoFrame";

/** Quelle / Beleg eines Cases als Zeile (Zahlen nur mit Quelle, Kunde nur mit Freigabe). */
export function caseSourceLine(c: CaseStudy) {
  if (c.status === "belegt") return `Beleg: ${c.evidence[0]}`;
  const src = c.metrics?.[0]?.source ?? c.evidence[0];
  return `Quelle: ${src}. Zahlen laut eCreator${c.nameApproved ? "" : ", Kunde dort anonymisiert"}.`;
}

/* --------------------------------------------------------------------------
   Kleine Bausteine für /insights und /insights/[slug] (v4: Karten statt Linien)
   -------------------------------------------------------------------------- */

/** Karte als Link: weiss, abgerundet, hebt sich beim Hover leicht an. */
export const linkCard =
  "card group transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-quart)] motion-safe:hover:-translate-y-0.5 hover:shadow-[var(--shadow-float)]";

/** Runder Pfeil-Knopf rechts in Link-Karten. */
export function ArrowBubble() {
  return (
    <span
      aria-hidden
      className="grid h-10 w-10 flex-none place-items-center rounded-full bg-paper-2 text-ink transition-colors duration-300 group-hover:bg-ink group-hover:text-white"
    >
      <Arrow className="transition-transform duration-300 group-hover:translate-x-0.5" />
    </span>
  );
}

/** Screenshot im hellen Browser-Rahmen: drei Punkte und Adresszeile mit der echten Domain. */
function BrowserFrame({ url, children }: { url: string; children: ReactNode }) {
  const host = url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
  return (
    <div className="card overflow-hidden p-0">
      <div aria-hidden className="flex items-center gap-3 border-b border-line bg-paper-2 px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="mx-auto truncate rounded-full bg-white px-4 py-1 text-[0.75rem] text-grey-600 shadow-[0_1px_2px_rgb(11_29_63/0.06)]">
          {host}
        </span>
        <span className="w-[2.625rem]" />
      </div>
      {children}
    </div>
  );
}

type Props = { proof: ArticleProof; label: string; caseLinkLabel: string; headingId: string };

/**
 * Proof-Element unter einem Artikel. Drei ruhige Kompositionen, je nach Material:
 * Case mit Kennzahlen (mittiger Kopf, Zahlen als Karte), Video neben Text, Website-Screenshot im Browser-Rahmen.
 */
export function ProofBlock({ proof, label, caseLinkLabel, headingId }: Props) {
  if (proof.kind === "video") {
    const v = workById(proof.videoId);
    return (
      <div className={videoPair}>
        <figure className={videoFigure}>
          <VideoFrame src={v.short} poster={v.poster} label={`${v.theme}: ${v.title}`} />
          <figcaption className="t-small mt-3 text-grey-600">
            {v.theme} · {v.title}
          </figcaption>
        </figure>
        <div>
          <p className="label-pill">{[label, ...proof.meta].join(" · ")}</p>
          <h2 id={headingId} className="t-h3 mt-5">
            {proof.title}
          </h2>
          <p className="t-body mt-4 max-w-[56ch] text-grey-700">{proof.text}</p>
          <div className="mt-8">
            <ArrowLink href={proof.link.href}>{proof.link.label}</ArrowLink>
          </div>
        </div>
      </div>
    );
  }

  const c = caseBySlug(proof.slug);
  if (!c) return null;
  const href = `/cases/${c.slug}`;
  const metrics = c.metrics?.slice(0, 3) ?? [];
  const pill = [label, "Case", c.sector].join(" · ");

  const approach = (
    <ul className="check-list space-y-4">
      {c.approach.map((a) => (
        <li key={a.title} className="t-small text-grey-700">
          <strong className="font-semibold text-ink">{a.title}.</strong> {a.text}
        </li>
      ))}
    </ul>
  );

  // Case mit Kennzahlen: mittiger Kopf, Zahlen als Karte, Vorgehen in drei Spalten
  if (metrics.length > 0) {
    return (
      <div>
        <div className="mx-auto max-w-[46rem] text-center">
          <p className="label-pill">{pill}</p>
          <p className="t-small mt-5 font-semibold text-grey-600">{displayClient(c)}</p>
          <h2 id={headingId} className="t-h2 mt-2">
            {c.headline}
          </h2>
          <p className="t-lead mx-auto mt-5 max-w-[52ch] text-grey-700">{c.teaser}</p>
        </div>

        <dl className="card mx-auto mt-10 grid max-w-[56rem] sm:grid-cols-3 md:mt-12">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className={`flex flex-col-reverse items-center gap-1 px-4 py-6 text-center md:py-7 ${i > 0 ? "border-t border-line sm:border-l sm:border-t-0" : ""}`}
            >
              <dt className="t-small text-grey-600">{m.label}</dt>
              <dd className="t-num">{m.value}</dd>
            </div>
          ))}
        </dl>

        <ul className="check-list mx-auto mt-12 grid max-w-[60rem] gap-x-10 gap-y-6 md:mt-14 md:grid-cols-3">
          {c.approach.map((a) => (
            <li key={a.title}>
              <p className="t-h4">{a.title}</p>
              <p className="t-small mt-1.5 text-grey-700">{a.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col items-center gap-5 text-center">
          <ArrowLink href={href}>{caseLinkLabel}</ArrowLink>
          <p className="t-small max-w-[60ch] text-grey-600">{caseSourceLine(c)}</p>
        </div>
      </div>
    );
  }

  const text = (
    <>
      <p className="label-pill">{pill}</p>
      <p className="t-small mt-5 font-semibold text-grey-600">{displayClient(c)}</p>
      <h2 id={headingId} className="t-h3 mt-1.5">
        {c.headline}
      </h2>
      <p className="t-body mt-4 max-w-[56ch] text-grey-700">{c.teaser}</p>
      <div className="mt-7">{approach}</div>
      <div className="mt-8">
        <ArrowLink href={href}>{caseLinkLabel}</ArrowLink>
      </div>
      <p className="t-small mt-5 max-w-[60ch] text-grey-600">{caseSourceLine(c)}</p>
    </>
  );

  // Website-Screenshot im Browser-Rahmen neben Text
  const web = c.media.web ? webProjects.find((w) => w.id === c.media.web) : undefined;
  if (c.media.hero.type === "image" && web) {
    return (
      <div className="grid-12 items-center gap-y-10">
        <figure className="col-span-4 md:col-span-12 lg:col-span-7">
          <BrowserFrame url={web.url}>
            <div className="relative aspect-[16/10] bg-paper-2">
              <Image
                src={web.desktop}
                alt={`Website von ${web.client}, Startseite am Desktop`}
                fill
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="object-cover object-top"
              />
            </div>
          </BrowserFrame>
          <figcaption className="t-small mt-4 text-grey-600">
            {web.kind} · {web.client} · {web.place}
          </figcaption>
        </figure>
        <div className="col-span-4 md:col-span-10 lg:col-span-5 lg:pl-4">{text}</div>
      </div>
    );
  }

  // Video neben Text
  const videoId = c.media.videos?.[0];
  const v = videoId ? workById(videoId) : undefined;
  return (
    <div className={v ? videoPair : "mx-auto max-w-[46rem]"}>
      {v && (
        <figure className={videoFigure}>
          <VideoFrame src={v.short} poster={v.poster} label={`Social Ad, Thema ${v.theme}`} />
          <figcaption className="t-small mt-3 text-grey-600">Social Ad · {v.theme}</figcaption>
        </figure>
      )}
      <div>{text}</div>
    </div>
  );
}

/* Video und Text als mittiges Paar: schmales Hochformat links, Text rechts */
const videoPair =
  "mx-auto grid max-w-[60rem] items-center gap-10 md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] md:gap-14";
const videoFigure = "max-w-[12rem] md:max-w-none";
