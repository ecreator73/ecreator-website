"use client";

import { useEffect, useRef } from "react";

/**
 * Social Recruiting als eine Figur, die durch das System wandert und sich dabei verwandelt:
 * Story-Ad im Feed → Kurzbewerbung → Zeile im CRM → qualifiziert → neu im Team.
 * Gesteuert durch Scrollen: Die Fläche bleibt stehen (sticky), die Scroll-Position bestimmt stufenlos,
 * wo die Figur auf der Linie ist und welche Teilschritte sichtbar sind. Rückwärts scrollen läuft rückwärts.
 * Desktop: die Figur fährt von Station zu Station. Handy: sie verwandelt sich an Ort und Stelle, oben Story-Balken.
 * Bei reduzierter Bewegung: kein Scroll-Effekt, fester Zustand, Stationen per Klick umschaltbar.
 * Alle Inhalte sind illustrativ: keine echten Personen, keine Kundendaten.
 */

type PhaseId = "feed" | "ad" | "tap" | "form" | "sent" | "crm" | "qualified" | "hired";

/* Scroll-Fahrplan (Summe 1): Vorlauf, fünf Stationen mit Verweilzeit, vier Fahrten, Rest als Nachlauf */
const LEAD = 0.04;
const DWELL = 0.13;
const TRAVEL = 0.0625;
const STATIONS = 5;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

type Frame = { s: number; station: number; q: number; moving: boolean };

/** Fortschritt 0..1 → Position auf der Linie (s, 0..4), Station und Fortschritt innerhalb der Station (q) */
function frameAt(p: number): Frame {
  let x = p - LEAD;
  if (x <= 0) return { s: 0, station: 0, q: 0, moving: false };
  for (let i = 0; i < STATIONS; i++) {
    if (x < DWELL) return { s: i, station: i, q: x / DWELL, moving: false };
    x -= DWELL;
    if (i < STATIONS - 1) {
      if (x < TRAVEL) return { s: i + easeInOut(x / TRAVEL), station: i, q: 1, moving: true };
      x -= TRAVEL;
    }
  }
  return { s: STATIONS - 1, station: STATIONS - 1, q: 1, moving: false };
}

/** Fortschritt, bei dem eine Station gut zu sehen ist (für Klick auf die Station) */
const progressOf = (i: number) => LEAD + i * (DWELL + TRAVEL) + DWELL * 0.7;

/** Teilschritte, die bis zum lokalen Fortschritt erreicht sind, als Klassen (a1 a2 …) */
const reached = (v: number, at: number[], prefix: string) => at.filter((t) => v > t).map((_, i) => `${prefix}${i + 1}`);

/** Gestalt der Figur: Wechsel auf halber Strecke zwischen zwei Stationen */
function stateAt({ s, station, q, moving }: Frame) {
  const target = Math.round(s);
  const local = moving ? (target > station ? 0 : 1) : q;
  let phase: PhaseId;
  let marks: string[] = [];
  let feed = 1;
  switch (target) {
    case 0:
      if (local < 0.45) {
        phase = "feed";
        feed = easeOut(local / 0.45);
      } else phase = local < 0.75 ? "ad" : "tap";
      break;
    case 1:
      phase = local > 0.84 ? "sent" : "form";
      marks = reached(local, [0.12, 0.36, 0.6], "a");
      break;
    case 2:
      // die bestehenden Bewerbungen sind schon da, die neue kommt an der Station oben an (c1)
      phase = "crm";
      marks = reached(local, [0.2], "c");
      break;
    case 3:
      phase = "qualified";
      marks = reached(local, [0.1, 0.28, 0.46, 0.64, 0.8], "q");
      break;
    default:
      // das Team ist schon da, der Neue rückt an der Station dazu (h1), dann das Label (h2)
      phase = "hired";
      marks = reached(local, [0.15, 0.4], "h");
  }
  return { phase, marks, feed, target, local };
}

export function RecruitingFlow({ steps }: { steps: readonly string[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  /** Zustand direkt ins DOM schreiben (kein React-Render pro Scroll-Bild) */
  const apply = (f: Frame) => {
    const root = rootRef.current;
    if (!root) return;
    const st = stateAt(f);
    const cls = ["rf", ...st.marks].join(" ");
    if (root.className !== cls) root.className = cls;
    if (root.dataset.phase !== st.phase) root.dataset.phase = st.phase;
    root.style.setProperty("--x", `${(10 + f.s * 20).toFixed(3)}%`);
    root.style.setProperty("--feed", st.feed.toFixed(4));
    root.querySelectorAll<HTMLElement>(".rf-step").forEach((b, i) => {
      b.dataset.state = i < st.target ? "done" : i === st.target ? "now" : "todo";
      b.dataset.trail = i <= st.target - 2 ? "on" : "off";
      if (i === st.target) b.setAttribute("aria-current", "step");
      else b.removeAttribute("aria-current");
    });
    root.querySelectorAll<HTMLElement>(".rf-seg").forEach((seg, i) => {
      const fill = i < st.target ? 1 : i === st.target ? st.local : 0;
      seg.style.setProperty("--fill", fill.toFixed(3));
    });
    const now = root.querySelector<HTMLElement>(".rf-now");
    if (now && now.textContent !== steps[st.target]) now.textContent = steps[st.target];
  };

  /** Fortschritt 0..1 aus der Scroll-Position: 0, sobald die Fläche anhält, 1, wenn sie weiterzieht */
  const measure = () => {
    const track = trackRef.current;
    const pin = pinRef.current;
    if (!track || !pin) return { p: 0, r: new DOMRect(), top: 0, total: 0 };
    const r = track.getBoundingClientRect();
    const top = parseFloat(getComputedStyle(pin).top) || 0;
    const total = r.height - pin.offsetHeight;
    return { p: total > 0 ? clamp((top - r.top) / total) : 0, r, top, total };
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      track.dataset.mode = "static";
      apply(frameAt(progressOf(3)));
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      apply(frameAt(measure().p));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
    // apply und measure lesen nur Refs, einmal einrichten genügt
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Klick auf eine Station: dorthin scrollen (bei reduzierter Bewegung direkt umschalten) */
  const goTo = (i: number) => {
    if (trackRef.current?.dataset.mode === "static") {
      apply(frameAt(progressOf(i)));
      return;
    }
    const { r, top, total } = measure();
    window.scrollTo({ top: window.scrollY + r.top - top + progressOf(i) * total, behavior: "smooth" });
  };

  return (
    <div ref={trackRef} className="rf-scroll" data-mode="scroll">
      <div
        ref={pinRef}
        className="rf-pin rounded-[var(--radius-card)] border border-[rgb(11_29_63/0.08)] bg-paper-2 px-4 pb-4 pt-6 sm:px-8 sm:pb-6 sm:pt-10"
      >
        <div ref={rootRef} className="rf" data-phase="feed">
          {/* Handy: Fortschritt wie bei Stories */}
          <div className="rf-story" aria-hidden>
            {steps.map((label) => (
              <span key={label} className="rf-seg">
                <span />
              </span>
            ))}
          </div>

          <div className="rf-stage" aria-hidden>
            <div className="rf-token">
              {/* 1 · Story-Ad im Feed */}
              <div className="rf-face rf-face-ad">
                <div className="rf-screen">
                  <div className="rf-strip">
                    <div className="rf-post" />
                    <div className="rf-post" />
                    <div className="rf-ad">
                      <span className="rf-ad-sponsor">Gesponsert</span>
                      <span className="rf-ad-title">
                        Wir suchen <em>dich.</em>
                      </span>
                      <span className="rf-ad-btn">Jetzt bewerben</span>
                    </div>
                  </div>
                  <span className="rf-tap" />
                </div>
              </div>

              {/* 2 · Kurzbewerbung auf dem Handy */}
              <div className="rf-face rf-face-form">
                <p className="rf-form-title">Bewerbung</p>
                <ul className="rf-form-list">
                  <li>
                    Erfahrung <b>3+ Jahre</b>
                  </li>
                  <li>
                    Pensum <b>80–100 %</b>
                  </li>
                  <li>
                    Start <b>Sofort</b>
                  </li>
                </ul>
                <span className="rf-send">
                  <span className="a">Senden</span>
                  <span className="b">Gesendet ✓</span>
                </span>
              </div>

              {/* 3 + 4 · Im CRM, dann qualifiziert und nach oben priorisiert */}
              <div className="rf-face rf-face-crm">
                <div className="rf-row rf-row-me">
                  <Person className="rf-avatar" />
                  <span className="rf-row-text">
                    <b>Bewerbung</b>
                    <small>via Instagram</small>
                  </span>
                  <span className="rf-crit">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="rf-pill">
                    <span className="a">Neu</span>
                    <span className="b">Passt</span>
                  </span>
                </div>
                <div className="rf-row rf-row-ghost">
                  <Person className="rf-avatar" />
                  <span className="rf-bars">
                    <i />
                    <i />
                  </span>
                  <span className="rf-pill rf-pill-ghost">
                    <span className="a">Offen</span>
                    <span className="b">Später</span>
                  </span>
                </div>
                <div className="rf-row rf-row-ghost rf-row-fade">
                  <Person className="rf-avatar" />
                  <span className="rf-bars">
                    <i />
                    <i />
                  </span>
                  <span className="rf-pill rf-pill-ghost">
                    <span className="a">Offen</span>
                  </span>
                </div>
              </div>

              {/* 5 · Neu im Team */}
              <div className="rf-face rf-face-team">
                <span className="rf-team">
                  <Person className="rf-mate" />
                  <Person className="rf-mate" />
                  <Person className="rf-mate" />
                  <span className="rf-new">
                    <Person className="rf-new-person" />
                    <span className="rf-check">
                      <svg viewBox="0 0 12 10">
                        <path d="M1.5 5.2l3 3L10.5 1.8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </span>
                </span>
                <span className="rf-team-label">Neu im Team</span>
              </div>
            </div>
          </div>

          {/* Linie mit Stationen: auf dem Desktop sichtbar, auf dem Handy nur für Screenreader */}
          <div className="rf-track">
            <span className="rf-line" aria-hidden />
            <span className="rf-fill" aria-hidden />
            <ol className="rf-steps" aria-label="Ablauf Social Recruiting">
              {steps.map((label, s) => (
                <li key={label} style={{ left: `${10 + s * 20}%` }}>
                  <button
                    type="button"
                    className="rf-step"
                    data-state={s === 0 ? "now" : "todo"}
                    data-trail="off"
                    aria-current={s === 0 ? "step" : undefined}
                    onClick={() => goTo(s)}
                  >
                    {/* Spur: an erledigten Stationen bleibt ein kleines Zeichen stehen */}
                    <svg className="rf-mark" viewBox="0 0 24 24" aria-hidden>
                      {MARKS[s]}
                    </svg>
                    <span className="rf-dot" aria-hidden />
                    <span className="rf-label">{label}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          {/* Handy: aktueller Schritt */}
          <p className="rf-now" aria-hidden>
            {steps[0]}
          </p>
        </div>
      </div>
    </div>
  );
}

/** Zeichen der Spur je Station: Handy, Formular, CRM-Liste, qualifiziert, Person */
const MARKS = [
  <g key="ad" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <rect x="7" y="3" width="10" height="18" rx="2.5" />
    <path d="M10.5 18h3" />
  </g>,
  <g key="form" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M8.5 8h7M8.5 12h7M8.5 16h4" />
  </g>,
  <g key="crm" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="4" y="4" width="16" height="4" rx="1.5" />
    <rect x="4" y="10" width="16" height="4" rx="1.5" />
    <rect x="4" y="16" width="16" height="4" rx="1.5" />
  </g>,
  <g key="ok" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="8.5" />
    <path d="M8.5 12.2l2.4 2.4 4.6-5" />
  </g>,
  <g key="hired" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <circle cx="12" cy="9" r="3.5" />
    <path d="M5.5 20c1-3.4 3.6-5 6.5-5s5.5 1.6 6.5 5" />
  </g>,
];

/** Neutrale Person (kein Foto): Kopf und Schultern */
function Person({ className }: { className: string }) {
  return (
    <span className={className}>
      <svg viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="9" r="4" fill="currentColor" />
        <path d="M4.5 20.5c1.2-3.8 4.1-5.6 7.5-5.6s6.3 1.8 7.5 5.6" fill="currentColor" />
      </svg>
    </span>
  );
}
