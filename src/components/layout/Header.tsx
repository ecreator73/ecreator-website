"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { cta, nav, site } from "@/content/site";
import { BtnArrow } from "@/components/ui/ButtonLink";

type Panel = "leistungen" | "studio" | null;

export function Header() {
  const pathname = usePathname();
  const [panel, setPanel] = useState<Panel>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  // Header-CTA nur violett, wenn kein anderer primärer CTA sichtbar ist (max. eine primäre Handlung pro Viewport)
  const [pageCtaVisible, setPageCtaVisible] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  const close = useCallback(() => {
    setPanel(null);
    setMenuOpen(false);
  }, []);

  // Bei Routenwechsel alles schliessen (während des Renderns, statt per Effekt)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setPanel(null);
    setMenuOpen(false);
    setPageCtaVisible(false);
  }

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll("main .btn-primary"));
    if (!targets.length) return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      setPageCtaVisible(visible.size > 0);
    });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const onDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setPanel(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [close]);

  // Mobile-Menü modal: Scroll sperren, Inhalt dahinter inert, Fokus hinein und zurück
  const wasOpen = useRef(false);
  useEffect(() => {
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    if (main) main.inert = menuOpen;
    if (footer) footer.inert = menuOpen;
    if (menuOpen) {
      document.querySelector<HTMLElement>("#mobile-menu a, #mobile-menu summary")?.focus();
    } else if (wasOpen.current) {
      toggleRef.current?.focus();
    }
    wasOpen.current = menuOpen;
    return () => {
      document.documentElement.style.overflow = "";
      if (main) main.inert = false;
      if (footer) footer.inert = false;
    };
  }, [menuOpen]);

  const openHover = (p: Panel) => {
    window.clearTimeout(closeTimer.current);
    setPanel(p);
  };
  const leaveHover = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setPanel(null), 180);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const leistungenActive = nav.leistungen.some((g) => g.links.some((l) => isActive(l.href))) || pathname === "/leistungen";
  const studioActive = nav.studio.some((l) => isActive(l.href));

  return (
    <header ref={headerRef} className="sticky top-0 z-50 px-[clamp(10px,2vw,24px)] pt-2.5 text-ink lg:pt-3.5">
      {/* Schwebende Pille: weiss, feiner Rand, weicher Schatten */}
      <div className="relative mx-auto flex h-14 max-w-[1180px] items-center justify-between gap-4 rounded-full border border-[rgb(11_29_63/0.08)] bg-white/95 pl-5 pr-2 shadow-float backdrop-blur-md lg:h-16 lg:pl-7">
        <Link href="/" aria-label="eCreator, zur Startseite" className="-m-2 p-2">
          <Logo variant="lockup" className="h-[24px] w-auto lg:h-[28px]" />
        </Link>

        {/* Desktop-Navigation */}
        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            <li onMouseEnter={() => openHover("leistungen")} onMouseLeave={leaveHover}>
              <button
                type="button"
                className="nav-item"
                aria-expanded={panel === "leistungen"}
                aria-controls="panel-leistungen"
                data-active={leistungenActive || undefined}
                onClick={() => setPanel(panel === "leistungen" ? null : "leistungen")}
              >
                Leistungen
                <Caret open={panel === "leistungen"} />
              </button>
            </li>
            <li onMouseEnter={() => openHover("studio")} onMouseLeave={leaveHover}>
              <button
                type="button"
                className="nav-item"
                aria-expanded={panel === "studio"}
                aria-controls="panel-studio"
                data-active={studioActive || undefined}
                onClick={() => setPanel(panel === "studio" ? null : "studio")}
              >
                Studio
                <Caret open={panel === "studio"} />
              </button>
            </li>
            {nav.main.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="nav-item" data-active={isActive(l.href) || undefined}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={cta.primary.href}
            data-cta="header"
            className={`btn btn-sm max-[359px]:hidden ${pageCtaVisible ? "btn-line" : "btn-primary"}`}
          >
            <span className="hidden sm:inline">{cta.primary.label}</span>
            <span className="sm:hidden">{cta.primary.short}</span>
            <BtnArrow />
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-strong lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Menü schliessen" : "Menü öffnen"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span aria-hidden className="relative block h-2.5 w-4">
              <span
                className={`absolute left-0 right-0 top-0 h-px bg-current transition-transform duration-300 ${
                  menuOpen ? "translate-y-[4.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 right-0 h-px bg-current transition-transform duration-300 ${
                  menuOpen ? "-translate-y-[4.5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mega-Panel Leistungen: Karte unter der Pille */}
      <div
        id="panel-leistungen"
        role="region"
        aria-label="Leistungen"
        hidden={panel !== "leistungen"}
        onMouseEnter={() => openHover("leistungen")}
        onMouseLeave={leaveHover}
        className="card absolute inset-x-[clamp(10px,2vw,24px)] top-full mx-auto mt-2 hidden max-w-[1180px] text-ink lg:block"
      >
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] px-8 py-8">
          <div className="col-span-3 flex flex-col justify-between border-r border-line pr-8">
            <div>
              <p className="label-pill">Leistungen</p>
              <p className="t-h3 mt-4 max-w-[14ch]">Jede Leistung ist eine Spur im selben System.</p>
            </div>
            <Link href="/leistungen" className="link t-small mt-8 inline-block font-semibold">
              Alle Leistungen im Überblick
            </Link>
          </div>
          {nav.leistungen.map((group) => (
            <div key={group.title} className="col-span-2 pl-2 first-of-type:col-start-5">
              <p className="t-meta text-grey-600">{group.title}</p>
              <ul className="mt-4 space-y-3">
                {group.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="group block">
                      <span className="t-h4 block transition-colors group-hover:text-grey-600">{l.label}</span>
                      {l.note && <span className="t-meta mt-1 block text-grey-600">{l.note}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Studio-Panel: dunkle Karte unter der Pille */}
      <div
        id="panel-studio"
        role="region"
        aria-label="Studio"
        hidden={panel !== "studio"}
        onMouseEnter={() => openHover("studio")}
        onMouseLeave={leaveHover}
        className="studio absolute inset-x-[clamp(10px,2vw,24px)] top-full mx-auto mt-2 hidden max-w-[1180px] rounded-[var(--radius-card)] shadow-float lg:block"
      >
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] px-8 py-8">
          <div className="col-span-4">
            <p className="label-pill">Studio und Produktion</p>
            <p className="t-h3 mt-4 max-w-[16ch]">Wir produzieren selbst. Mit Preisen, die hier stehen.</p>
          </div>
          <ul className="col-span-8 grid grid-cols-3 border-l border-line">
            {nav.studio.map((l) => (
              <li key={l.href} className="border-r border-line last:border-r-0">
                <Link href={l.href} className="group flex h-full flex-col justify-between gap-10 px-6 py-2">
                  <span className="t-h3 transition-colors group-hover:text-paper/70">{l.label}</span>
                  <span className="t-meta text-grey-400">{l.note ?? "Video, Foto, Schnitt"}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile-Menü: hell, unter der Pille */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="fixed inset-x-0 bottom-0 top-[calc(var(--header-h)+4px)] overflow-y-auto bg-paper lg:hidden"
      >
        <nav aria-label="Mobile Navigation" className="wrap flex min-h-full flex-col pt-4">
          <ul className="grid grid-cols-2 gap-[var(--gutter)] border-b border-line pb-5">
            <li>
              <Link href="/content-day" className="card block px-4 py-3.5">
                <span className="block font-semibold">Content Day</span>
                <span className="t-small text-grey-600">ab CHF 1&apos;990</span>
              </Link>
            </li>
            <li>
              <Link href="/pakete" className="card block px-4 py-3.5">
                <span className="block font-semibold">Pakete & Preise</span>
                <span className="t-small text-grey-600">ab CHF 3&apos;500 / Mt.</span>
              </Link>
            </li>
          </ul>
          <MobileGroup title="Leistungen">
            <ul>
              {nav.leistungen.flatMap((g) => g.links).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="flex items-baseline justify-between gap-4 py-2.5">
                    <span className="t-h4">{l.label}</span>
                    {l.note && <span className="t-small text-grey-500">{l.note}</span>}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/leistungen" className="t-small inline-block py-3 font-semibold text-violet-deep">
                  Alle Leistungen →
                </Link>
              </li>
            </ul>
          </MobileGroup>
          <MobileGroup title="Studio">
            <ul>
              {nav.studio.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="flex items-baseline justify-between gap-4 py-2.5">
                    <span className="t-h4">{l.label}</span>
                    {l.note && <span className="t-small text-grey-500">{l.note}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </MobileGroup>
          <ul className="border-b border-line py-2">
            {nav.main.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="t-h3 block py-2.5">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/kontakt" className="t-h3 block py-2.5">
                Kontakt
              </Link>
            </li>
          </ul>
          <div className="sticky bottom-0 mt-auto bg-paper pb-[max(1rem,env(safe-area-inset-bottom))] pt-5">
            <Link href={cta.primary.href} className="btn btn-primary w-full" data-cta="menu">
              <span>{cta.primary.label}</span>
              <BtnArrow />
            </Link>
            <div className="t-small mt-3 grid grid-cols-2 gap-4 text-grey-600">
              <a href={site.phoneHref} className="py-2">
                Anrufen {site.phone.replace("+41 ", "0")}
              </a>
              <a href={`mailto:${site.email}`} className="py-2 text-right">
                {site.email}
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

function Caret({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 10 6"
      className={`ml-1.5 inline-block h-[6px] w-[10px] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    >
      <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function MobileGroup({
  title,
  children,
  defaultOpen,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details className="group border-b border-line" open={defaultOpen}>
      <summary className="flex cursor-pointer items-center justify-between py-4">
        <span className="t-h3">{title}</span>
        <span aria-hidden className="text-xl leading-none text-grey-500 group-open:hidden">+</span>
        <span aria-hidden className="hidden text-xl leading-none text-grey-500 group-open:inline">−</span>
      </summary>
      <div className="pb-4">{children}</div>
    </details>
  );
}
