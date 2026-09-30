import type { ReactNode } from "react";
import type { Crumb } from "@/lib/schema";
import { Breadcrumbs } from "./Breadcrumbs";

type PageHeaderProps = {
  crumbs: Crumb[];
  /** Label-Pille über der H1, z.B. ["Leistung", "Performance Marketing"] */
  meta?: string[];
  /** H1 als gesetzte Zeilen. Kurz halten, max. 3 Zeilen. */
  title: ReactNode[];
  lead?: ReactNode;
  /** Buttons / Links unter dem Lead */
  actions?: ReactNode;
  /** Zusatz unter dem Kopf: Preis, Fakten, Sprungmarken ... */
  aside?: ReactNode;
  /** Medium unter dem Kopf (Video, Screenshot, Bildplatz) */
  media?: ReactNode;
  /** "studio": Zusatz und Medium stehen in einem dunklen Panel */
  mode?: "office" | "studio";
};

/**
 * Seitenkopf für Unterseiten, wie der Hero der Startseite: hell mit violettem Netz, alles mittig.
 * Zusatz (aside) als Karte und Medium folgen darunter.
 */
export function PageHeader({ crumbs, meta, title, lead, actions, aside, media, mode = "office" }: PageHeaderProps) {
  const studio = mode === "studio";
  return (
    <header className="intro">
      <div className="relative -mt-[var(--header-h)] overflow-hidden">
        <div aria-hidden className="hero-grid absolute inset-0" />
        <div className="wrap relative pt-[calc(var(--header-h)+1rem)]">
          <Breadcrumbs items={crumbs} className="justify-center pt-2 [&_ol]:justify-center" />
          <div className="mx-auto flex max-w-[56rem] flex-col items-center pb-14 pt-8 text-center md:pb-20 md:pt-12">
            {meta && <p className="label-pill intro-fade mb-6">{meta.join(" · ")}</p>}
            <h1 className="lines t-h1">
              {title.map((l, i) => (
                <span key={i} className="ln">
                  {i > 0 && " "}
                  <span>{l}</span>
                </span>
              ))}
            </h1>
            {lead && <div className="intro-fade t-lead mt-6 max-w-[46ch] text-grey-600">{lead}</div>}
            {actions && (
              <div className="intro-fade-2 mt-9 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">{actions}</div>
            )}
          </div>
        </div>
      </div>

      {(aside || media) &&
        (studio ? (
          <section className="studio">
            <div className="wrap py-10 md:py-14">
              {aside && <aside className="mx-auto max-w-[44rem]">{aside}</aside>}
              {media && <div className={aside ? "mt-10 md:mt-14" : ""}>{media}</div>}
            </div>
          </section>
        ) : (
          <div className="wrap pb-12 md:pb-16">
            {aside && <aside className="card mx-auto max-w-[44rem] p-6 md:p-8">{aside}</aside>}
            {media && <div className={aside ? "mt-10 md:mt-14" : ""}>{media}</div>}
          </div>
        ))}
    </header>
  );
}
