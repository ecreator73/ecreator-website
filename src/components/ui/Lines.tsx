import type { ElementType, ReactNode } from "react";

type LinesProps = {
  as?: ElementType;
  lines: ReactNode[];
  className?: string;
  /** "scroll" = Reveal beim Sichtbarwerden, "intro" = CSS-Animation beim Laden (Eltern mit .intro), "none" = statisch */
  reveal?: "scroll" | "intro" | "none";
  id?: string;
};

/**
 * Headline mit bewusst gesetzten Zeilen. Jede Zeile sitzt in einer Maske und
 * schiebt beim Reveal von unten ein. Ohne JS ist alles sichtbar.
 */
export function Lines({ as: Tag = "h2", lines, className = "", reveal = "scroll", id }: LinesProps) {
  return (
    <Tag id={id} className={`lines ${className}`} data-reveal={reveal === "scroll" ? "lines" : undefined}>
      {lines.map((line, i) => (
        <span key={i} className="ln" style={{ ["--i" as string]: i }}>
          {i > 0 && " "}
          <span>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
