import Image from "next/image";
import { caseBySlug, displayClient, type CaseStudy } from "@/content/cases";
import { webProjects, workById } from "@/content/work";
import type { ArticleProof } from "@/content/pages/insights";
import { ArrowLink } from "@/components/ui/ButtonLink";
import { Meta } from "@/components/ui/Meta";
import { VideoFrame } from "@/components/ui/VideoFrame";

/** Quelle / Beleg eines Cases als Mono-Zeile (Zahlen nur mit Quelle, Kunde nur mit Freigabe). */
export function caseSourceLine(c: CaseStudy) {
  if (c.status === "belegt") return `Beleg: ${c.evidence[0]}`;
  const src = c.metrics?.[0]?.source ?? c.evidence[0];
  return `Quelle: ${src}. Zahlen laut eCreator${c.nameApproved ? "" : ", Kunde dort anonymisiert"}.`;
}

type Props = { proof: ArticleProof; label: string; caseLinkLabel: string; headingId: string };

/**
 * Proof-Element unter einem Artikel. Drei ruhige Kompositionen, je nach Material:
 * Case mit Kennzahlen (Zahlen als schlichte Zeile), Video neben Text, Website-Screenshot neben Text.
 */
export function ProofBlock({ proof, label, caseLinkLabel, headingId }: Props) {
  if (proof.kind === "video") {
    const v = workById(proof.videoId);
    return (
      <div className={videoPair}>
        <figure className={videoFigure}>
          <VideoFrame src={v.short} poster={v.poster} label={`${v.theme}: ${v.title}`} />
          <figcaption className="t-meta mt-3 text-grey-700">
            {v.theme} <span className="text-grey-500">/</span> {v.title}
          </figcaption>
        </figure>
        <div>
          <Meta items={[label, ...proof.meta]} className="text-grey-600" />
          <h2 id={headingId} className="t-h3 mt-4">
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

  const head = (
    <>
      <Meta items={[label, "Case", c.sector]} className="text-grey-600" />
      <p className="t-small mt-4 font-semibold text-grey-600">{displayClient(c)}</p>
      <h2 id={headingId} className="t-h3 mt-1">
        {c.headline}
      </h2>
      <p className="t-body mt-4 max-w-[56ch] text-grey-700">{c.teaser}</p>
    </>
  );

  const approach = (
    <ul className="border-t border-line">
      {c.approach.map((a) => (
        <li key={a.title} className="grid grid-cols-[1.5rem_1fr] gap-2 border-b border-line py-3">
          <span aria-hidden className="t-meta pt-[0.35em] text-grey-500">
            /
          </span>
          <p className="t-small text-grey-700">
            <strong className="font-semibold text-ink">{a.title}.</strong> {a.text}
          </p>
        </li>
      ))}
    </ul>
  );

  const foot = (
    <>
      <div className="mt-8">
        <ArrowLink href={href}>{caseLinkLabel}</ArrowLink>
      </div>
      <p className="t-meta mt-5 max-w-[60ch] text-grey-600">{caseSourceLine(c)}</p>
    </>
  );

  // Case mit Kennzahlen: Text und Zahlenzeile links, Vorgehen rechts
  if (metrics.length > 0) {
    return (
      <div className="grid-12 gap-y-10">
        <div className="col-span-4 md:col-span-12 lg:col-span-6">
          {head}
          <dl className="mt-8 grid grid-cols-3 gap-[var(--gutter)] border-t border-ink pt-5">
            {metrics.map((m) => (
              <div key={m.label} className="flex flex-col-reverse gap-1">
                <dt className="t-small text-grey-700">{m.label}</dt>
                <dd className="t-num">{m.value}</dd>
              </div>
            ))}
          </dl>
          {foot}
        </div>
        <div className="col-span-4 md:col-span-12 lg:col-span-5 lg:col-start-8 lg:pt-1">{approach}</div>
      </div>
    );
  }

  const text = (
    <>
      {head}
      <div className="mt-7">{approach}</div>
      {foot}
    </>
  );

  // Website-Screenshot neben Text
  const web = c.media.web ? webProjects.find((w) => w.id === c.media.web) : undefined;
  if (c.media.hero.type === "image" && web) {
    return (
      <div className="grid-12 items-center gap-y-10">
        <figure className="col-span-4 md:col-span-12 lg:col-span-7">
          <div className="relative aspect-[16/10] overflow-hidden border border-line bg-paper-2">
            <Image
              src={web.desktop}
              alt={`Website von ${web.client}, Startseite am Desktop`}
              fill
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="object-cover object-top"
            />
          </div>
          <figcaption className="t-meta mt-3 text-grey-700">
            {web.kind} <span className="text-grey-500">/</span> {web.client} <span className="text-grey-500">/</span> {web.place}
          </figcaption>
        </figure>
        <div className="col-span-4 md:col-span-10 lg:col-span-5">{text}</div>
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
          <figcaption className="t-meta mt-3 text-grey-700">
            Social Ad <span className="text-grey-500">/</span> {v.theme}
          </figcaption>
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
