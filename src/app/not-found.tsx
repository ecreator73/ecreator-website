import { RelatedLinks } from "@/components/page/Blocks";
import { notFoundPage as p } from "@/content/pages/legal";

/** 404: heller Kopf mit Netz wie die übrigen Seiten, darunter drei Wege zurück. */
export default function NotFound() {
  return (
    <>
      <section className="intro relative -mt-[var(--header-h)] overflow-hidden">
        <div aria-hidden className="hero-grid absolute inset-0" />
        <div className="wrap relative flex flex-col items-center pb-16 pt-[calc(var(--header-h)+5rem)] text-center md:pb-20">
          <p className="label-pill">{p.meta}</p>
          <h1 className="t-h1 mt-6 max-w-[20ch]">
            <span className="text-accent">404.</span> {p.title}
          </h1>
          <p className="t-lead mt-6 max-w-[40ch] text-grey-600">{p.lead}</p>
        </div>
      </section>
      <div className="wrap sec-m">
        <div className="mx-auto max-w-[44rem]">
          <RelatedLinks title="Weiter zu" links={p.links} />
        </div>
      </div>
    </>
  );
}
