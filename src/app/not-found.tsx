import { RelatedLinks } from "@/components/page/Blocks";
import { notFoundPage as p } from "@/content/pages/legal";

/** 404: dunkler Kopf mit Netz wie die übrigen Seiten, darunter drei Wege zurück. */
export default function NotFound() {
  return (
    <>
      <section className="studio intro relative -mt-[var(--header-h)] overflow-hidden" data-hero-dark>
        <div aria-hidden className="hero-net absolute inset-0" />
        <div className="wrap relative flex flex-col items-center pb-20 pt-[calc(var(--header-h)+4rem)] text-center md:pb-24">
          <p className="t-meta text-grey-400">{p.meta}</p>
          <h1 className="t-h1 mt-5 max-w-[20ch]">
            <span className="text-fade">404.</span> {p.title}
          </h1>
          <p className="t-lead mt-6 max-w-[40ch] text-grey-300">{p.lead}</p>
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
