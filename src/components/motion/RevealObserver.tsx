"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Ein einziger IntersectionObserver für alle Scroll-Reveals der Seite.
 * Markiert Elemente mit [data-reveal] oder .strike beim Sichtbarwerden mit .is-in.
 * Ohne JS (kein html.js) und bei reduced-motion ist alles sofort sichtbar (siehe globals.css).
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const selector = "[data-reveal]:not(.is-in), .strike:not(.is-in)";

    if (reduce || !("IntersectionObserver" in window)) {
      document.querySelectorAll(selector).forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    const scan = () => document.querySelectorAll(selector).forEach((el) => io.observe(el));
    scan();

    // Später gerenderte Inhalte (Client-Komponenten) ebenfalls erfassen
    let raf = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(scan);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
