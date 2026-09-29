import type { ReactNode } from "react";
import type { Crumb } from "@/lib/schema";
import { Breadcrumbs } from "./Breadcrumbs";
import { Meta } from "@/components/ui/Meta";

type PageHeaderProps = {
  crumbs: Crumb[];
  /** Kleine Überzeile über der H1, z.B. ["Leistung", "Performance Marketing"] */
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
  /** "studio": auch Zusatz und Medium stehen auf dunklem Grund */
  mode?: "office" | "studio";
};

/**
 * Seitenkopf für Unterseiten, wie der Hero der Startseite und die Unterseiten der bisherigen Website:
 * dunkler Grund mit Netz, alles mittig. Zusatz (aside) und Medium folgen darunter.
 */
export function PageHeader({ crumbs, meta, title, lead, actions, aside, media, mode = "office" }: PageHeaderProps) {
  const studio = mode === "studio";
  return (
    <header className="intro">
      <div className="studio relative -mt-[var(--header-h)] overflow-hidden" data-hero-dark>
        <div aria-hidden className="hero-net absolute inset-0" />
        <div className="wrap relative pt-[var(--header-h)]">
          <Breadcrumbs items={crumbs} className="pt-3" />
          <div className="mx-auto flex max-w-[58rem] flex-col items-center pb-16 pt-10 text-center md:pb-24 md:pt-14">
            {meta && <Meta className="intro-fade mb-5 justify-center text-grey-400" items={meta} />}
            <h1 className="lines t-h1">
              {title.map((l, i) => (
                <span key={i} className="ln">
                  {i > 0 && " "}
                  <span>{l}</span>
                </span>
              ))}
            </h1>
            {lead && <div className="intro-fade t-lead mt-6 max-w-[46ch] text-grey-300">{lead}</div>}
            {actions && (
              <div className="intro-fade-2 mt-9 flex flex-col items-center gap-5 sm:flex-row sm:gap-8">{actions}</div>
            )}
          </div>
        </div>
      </div>

      {(aside || media) && (
        <div className={studio ? "studio" : "border-b border-line"}>
          <div className={`wrap ${studio ? "pb-14 md:pb-20" : "py-12 md:py-16"}`}>
            {aside && <aside className="mx-auto max-w-[44rem]">{aside}</aside>}
            {media && <div className={aside ? "mt-12 md:mt-16" : ""}>{media}</div>}
          </div>
        </div>
      )}
    </header>
  );
}
