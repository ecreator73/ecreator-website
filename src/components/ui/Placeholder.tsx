type PlaceholderProps = {
  label: string;
  spec?: string;
  ratio?: string;
  className?: string;
  tone?: "paper" | "ink";
};

/**
 * Gestalteter Bildplatz für fehlendes echtes Material.
 * Bewusst als offen erkennbar: Schraffur im Schnitt-Winkel + Beschreibung des benötigten Shots.
 * Keine Stock- oder KI-Bilder als Ersatz.
 */
export function Placeholder({ label, spec, ratio = "16 / 9", className = "", tone }: PlaceholderProps) {
  const toneCls =
    tone === "ink"
      ? "bg-ink-2 text-grey-400"
      : tone === "paper"
        ? "bg-paper-2 text-grey-600"
        : "bg-paper-2 text-grey-600 [.studio_&]:bg-ink-2 [.studio_&]:text-grey-400";
  return (
    <div
      role="img"
      aria-label={`Bildplatz: ${label}`}
      className={`hatch relative flex w-full flex-col justify-between overflow-hidden p-4 ${toneCls} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <span className="t-meta flex items-center gap-2">
        <span aria-hidden className="inline-block h-2 w-2 border border-current" /> Bildplatz
      </span>
      <span className="t-meta max-w-[34ch] leading-relaxed">
        {label}
        {spec && <span className="mt-1 block opacity-70">{spec}</span>}
      </span>
    </div>
  );
}
