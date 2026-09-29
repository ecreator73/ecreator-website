"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { cta, nav, site } from "@/content/site";
import { RingArrow } from "@/components/ui/ButtonLink";

type Panel = "leistungen" | "studio" | null;

export function Header() {
  const pathname = usePathname();
  const [panel, setPanel] = useState<Panel>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Über dem dunklen Hero der Startseite ist der Header dunkel (wie auf der bisherigen Website)
  const [overDark, setOverDark] = useState(false);
  // Header-CTA nur violett, wenn kein anderer primärer CTA sichtbar ist (max. eine primäre Handlung pro Viewport)
  const [pageCtaVisible, setPageCtaVisible] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  const close = useCallback(() => {
    setPanel(null);
    setMenuOpen(false);
  }, []);

  // Bei Routenwechsel alles schliessen
  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll("main .btn-primary"));
    if (!targets.length) {
      setPageCtaVisible(false);
      return;
    }
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
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const hero = document.querySelector<HTMLElement>("[data-hero-dark]");
      const h = headerRef.current?.offsetHeight ?? 64;
      setOverDark(!!hero && hero.getBoundingClientRect().bottom > h);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
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
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        menuOpen
          ? "bg-ink text-paper"
          : overDark
            ? `header-dark text-paper ${scrolled || panel ? "bg-night" : "bg-transparent"}`
            : "bg-paper text-ink"
      } ${(scrolled || panel) && !overDark ? "shadow-[0_1px_0_var(--color-line)]" : ""}`}
    >
      <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link href="/" aria-label="eCreator, zur Startseite" className="-m-2 p-2">
          <Logo variant="lockup" className="h-[26px] w-auto lg:h-[30px]" />
        </Link>

        {/* Desktop-Navigation */}
        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-1">
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
            className={`btn btn-sm ${menuOpen ? "btn-paper" : pageCtaVisible ? "btn-line" : "btn-primary"}`}
          >
            <span className="hidden sm:inline">{cta.primary.label}</span>
            <span className="sm:hidden">{cta.primary.short}</span>
            <RingArrow />
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="t-meta -mr-2 inline-flex h-11 min-w-11 items-center justify-center gap-2 px-2 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Menü schliessen" : "Menü öffnen"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span aria-hidden className="relative block h-3 w-5">
              <span
                className={`absolute left-0 right-0 top-0 h-px bg-current transition-transform duration-300 ${
                  menuOpen ? "translate-y-[6px] rotate-[81deg]" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 right-0 h-px bg-current transition-transform duration-300 ${
                  menuOpen ? "-translate-y-[5px] -rotate-[9deg]" : ""
                }`}
              />
            </span>
            {/* feste Breite: beide Labels im selben Rasterfeld */}
            <span aria-hidden className="grid max-[479px]:hidden">
              <span className={`[grid-area:1/1] ${menuOpen ? "invisible" : ""}`}>Menü</span>
              <span className={`[grid-area:1/1] ${menuOpen ? "" : "invisible"}`}>Schliessen</span>
            </span>
          </button>
        </div>
      </div>

      {/* Mega-Panel Leistungen (Office) */}
      <div
        id="panel-leistungen"
        role="region"
        aria-label="Leistungen"
        hidden={panel !== "leistungen"}
        onMouseEnter={() => openHover("leistungen")}
        onMouseLeave={leaveHover}
        className="absolute inset-x-0 top-full hidden border-t border-line bg-paper text-ink shadow-[0_1px_0_var(--color-line)] [--color-line:rgb(11_11_12/0.14)] [--color-line-strong:rgb(11_11_12/0.3)] lg:block"
      >
        <div className="wrap grid grid-cols-12 gap-x-[var(--gutter)] py-10">
          <div className="col-span-3 flex flex-col justify-between border-r border-line pr-8">
            <div>
              <p className="t-meta text-grey-600">Leistungen / System</p>
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

      {/* Studio-Panel (Studio-Modus, schwarz) */}
      <div
        id="panel-studio"
        role="region"
        aria-label="Studio"
        hidden={panel !== "studio"}
        onMouseEnter={() => openHover("studio")}
        onMouseLeave={leaveHover}
        className="studio absolute inset-x-0 top-full hidden lg:block"
      >
        <div className="wrap grid grid-cols-12 gap-x-[var(--gutter)] py-10">
          <div className="col-span-4">
            <p className="t-meta text-grey-400">Studio / Produktion</p>
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

      {/* Mobile-Menü (Studio-Modus, Vollbild) */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="studio fixed inset-x-0 bottom-0 top-[var(--header-h)] overflow-y-auto lg:hidden"
      >
        <nav aria-label="Mobile Navigation" className="wrap flex min-h-full flex-col pt-4">
          <ul className="grid grid-cols-2 gap-[var(--gutter)] border-b border-line pb-5">
            <li>
              <Link href="/content-day" className="block border border-line-strong px-3 py-3">
                <span className="block font-semibold">Content Day</span>
                <span className="t-meta text-grey-400">ab CHF 1&apos;990</span>
              </Link>
            </li>
            <li>
              <Link href="/pakete" className="block border border-line-strong px-3 py-3">
                <span className="block font-semibold">Pakete & Preise</span>
                <span className="t-meta text-grey-400">ab CHF 3&apos;500 / Mt.</span>
              </Link>
            </li>
          </ul>
          <MobileGroup title="Leistungen">
            <ul>
              {nav.leistungen.flatMap((g) => g.links).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="flex items-baseline justify-between gap-4 py-2.5">
                    <span className="t-h4">{l.label}</span>
                    {l.note && <span className="t-meta text-grey-400">{l.note}</span>}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/leistungen" className="t-meta inline-block py-3 text-grey-400">
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
                    {l.note && <span className="t-meta text-grey-400">{l.note}</span>}
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
          <div className="sticky bottom-0 mt-auto bg-ink pb-[max(1rem,env(safe-area-inset-bottom))] pt-5">
            <Link href={cta.primary.href} className="btn btn-primary w-full" data-cta="menu">
              <span>{cta.primary.label}</span>
              <RingArrow />
            </Link>
            <div className="t-meta mt-3 grid grid-cols-2 gap-4 text-grey-400">
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
        <span className="t-meta text-grey-400 group-open:hidden">öffnen +</span>
        <span className="t-meta hidden text-grey-400 group-open:inline">schliessen −</span>
      </summary>
      <div className="pb-4">{children}</div>
    </details>
  );
}
