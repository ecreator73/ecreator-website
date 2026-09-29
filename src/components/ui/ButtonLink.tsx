import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "ink" | "line" | "paper";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: "sm" | "md";
  className?: string;
  /** für spätere Messung (data-cta), z.B. "hero-primary" */
  track?: string;
};

const isExternal = (href: string) =>
  href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");

/** Eckige Fläche + Ring mit Pfeil. Violett (primary) nur für die primäre Handlung. */
export function ButtonLink({ href, children, variant = "primary", size = "md", className = "", track }: Props) {
  const cls = `btn btn-${variant} ${size === "sm" ? "btn-sm" : ""} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      <RingArrow />
    </>
  );
  if (isExternal(href)) {
    const newTab = href.startsWith("http");
    return (
      <a href={href} className={cls} data-cta={track} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {inner}
        {newTab && <span className="sr-only"> (öffnet in neuem Tab)</span>}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} data-cta={track}>
      {inner}
    </Link>
  );
}

export function RingArrow() {
  return (
    <span className="btn-ring" aria-hidden>
      <Arrow className="btn-arrow h-[9px] w-[13px]" />
    </span>
  );
}

/** Textlink mit Pfeil (tertiäre Handlung). */
export function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`group -my-2.5 inline-flex min-h-11 items-center gap-2 whitespace-nowrap py-2.5 font-semibold ${className}`}>
      <span className="link">{children}</span>
      <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 10" className={`h-[10px] w-4 flex-none ${className}`}>
      <path d="M0 5h14M10 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
