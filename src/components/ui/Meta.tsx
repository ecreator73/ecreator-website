import type { ReactNode } from "react";

type MetaProps = {
  children?: ReactNode;
  items?: string[];
  className?: string;
  as?: "p" | "span" | "div";
};

/** Kleine Überzeile (Kicker). items werden mit dem Schnitt «/» getrennt. */
export function Meta({ children, items, className = "", as: Tag = "p" }: MetaProps) {
  return (
    <Tag className={`t-meta flex flex-wrap items-center gap-x-2 gap-y-1 ${className}`}>
      {items ? <Slashed items={items} /> : children}
    </Tag>
  );
}

/** «Content / Ads / Web»: der Schrägstrich ist der Schnitt aus dem Logo. */
export function Slashed({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <span className={className}>
      {items.map((it, i) => (
        <span key={`${it}-${i}`}>
          {i > 0 && (
            <>
              <span className="sr-only">,</span>{" "}
              <span className="text-grey-400 [.studio_&]:text-grey-500" aria-hidden>
                /
              </span>{" "}
            </>
          )}
          <span className="whitespace-nowrap">{it}</span>
        </span>
      ))}
    </span>
  );
}
