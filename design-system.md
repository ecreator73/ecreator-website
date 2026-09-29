# eCreator Design System

> Grundlage: `docs/ART-DIRECTION.md` (Version 3: schlicht wie die bisherige Website, Kreislauf als Inhalt). Umsetzung: `src/app/globals.css` (Tokens, Utilities, Komponentenklassen) und `src/components/ui/*` (Primitives).
> Regel für alles: **schlicht, ruhig, wiedererkennbar wie die bisherige ecreator.ch.** Wenige Grössen, mittige Köpfe, klare Buttons.

---

## 1. Farben

| Token | Hex | Rolle | Kontrast |
|---|---|---|---|
| `paper` | `#FEFBF6` | Grundfläche «Office», eCreator-Creme aus dem bestehenden Elementor-Kit | Tinte darauf 19.3:1 |
| `paper-2` | `#F3EEE4` | Bildgründe, Bildplätze | |
| `white` | `#FFFFFF` | nur Formularfelder/Bildgründe, sparsam | |
| `ink` | `#0B0B0C` | Text, Linien, Fläche «Studio» | |
| `ink-2` / `ink-3` | `#151517` / `#222225` | Flächen im Studio, Footer-Wortmarke | |
| `grey-700` | `#3D3D40` | Fliesstext sekundär | 10.3:1 auf paper |
| `grey-600` | `#55555A` | Metadaten auf paper | 6.9:1 |
| `grey-500` | `#6B6B70` | sekundäre Texte, durchgestrichene Begriffe | 5.1:1 auf paper |
| `grey-400` | `#8E8E93` | Metadaten auf ink | 6.0:1 auf ink |
| `grey-300` | `#BDBCB7` | Fliesstext auf ink | 10.6:1 auf ink |
| **`violet`** | **`#7866F4`** | **eCreator Violett** (Live-Site, Elementor Global Kit `--e-global-color-cb393e8`) | 4.2:1 auf paper (nur grosse Schrift/Flächen), 4.7:1 auf ink |
| `violet-2` | `#8978FF` | bestehende Sekundärfarbe der Marke, violetter Text auf Dunkel | 5.8:1 auf ink |
| `violet-deep` | `#5A48D8` | abgeleitete Stufe, **nur** für kleinen violetten Text auf Hell | 5.6:1 auf paper |
| `line` | ink 14 % | Haarlinien | |
| `line-strong` | ink 30 % | betonte Linien, Formularfelder | |

### Violett-Regel
Violett ist ein **Signal** mit festem Budget: primärer Button (Strategie-Call), Zeiger und aktive Sektoren im Kreislauf, Durchstreichen im Manifest, Abschlussblock am Seitenende, Textauswahl, Fokus-Ring auf Creme. **Nicht:** Trenner, Schlusspunkte, Nummern, Anführungszeichen, Porträts, Preise, Verläufe, Glows. Maximal zwei violette Elemente pro Viewport.

## 2. Typografie

Wie auf der bisherigen Website: **Plus Jakarta Sans** für Titel, **Inter** für Text, dazu **Pinyon Script** nur für die eine
Schreibschrift-Zeile im Hero. Alle drei lokal über `next/font/google` (keine Requests an Google zur Laufzeit).
Seit dem Kundenentscheid vom 29.09.2026 gilt: **ruhige Grössen, keine Plakat-Schrift** (siehe ART-DIRECTION §0c).

| Utility | Einsatz | Grösse (fluid) | Einstellungen |
|---|---|---|---|
| `t-h1` | nur die H1 einer Seite (Hero, Seitenkopf) | 32 → 64 px | Jakarta 700, VERSAL, −0.015em, lh 1.08 |
| `t-h2` | Sektionstitel, Aussagen, Zitate | 26 → 44 px | Jakarta 700, VERSAL, −0.01em, lh 1.12 |
| `t-h3` | Karten-/Listentitel | 20 → 26 px | Jakarta 700, Satzschreibung |
| `t-h4` | kleine Titel | 17 → 20 px | Jakarta 700 |
| `t-brand` | kurze Labels (Paketnamen, Branchen) | 18 px | Jakarta 700, VERSAL, +0.02em |
| `t-num` | Zahlen, Preise, Resultate | 28 → 40 px | Jakarta 700, tabellarische Ziffern |
| `t-lead` | Einleitungen | 17 → 20 px | Inter 400, lh 1.55 |
| `t-body` / `t-small` | Fliesstext | 17 px / 15 px | Inter 400, lh 1.6 / 1.5 |
| `t-meta` / `t-meta-lg` | kleine Überzeile (Kicker), Captions | 12 / 13 px | Jakarta 600, VERSAL, +0.1em |
| `t-script` | nur Hero: «We create customers, not clicks.» | 36 → 48 px | Pinyon Script |

Regeln: Keine Inline-Schriftgrössen über 1.5rem, kein `text-[clamp()]`, keine Breiten-Achse, keine Plakatzahlen.
Titel-Versalien nur über `t-h1`/`t-h2`. `text-wrap: balance` für Titel, `pretty` für Absätze, Silbentrennung nur in H1/H2
(lange deutsche Wörter in Versalien auf dem Handy). Zahlen immer mit Schweizer Apostroph (`2'490`).

## 3. Raster & Abstände

- Container `wrap`: max. 1440 px Inhalt, Rand `--margin` = clamp(20 px, 3.4vw, 48 px).
- Raster `grid-12`: 4 Spalten < 768 px, 12 Spalten ab 768 px, Gutter `--gutter` = clamp(16 px, 1.7vw, 24 px).
- **Kopf jeder Seite:** dunkel (`night`/`ink`) mit Netz (`hero-net`), alles mittig: Überzeile, H1, ein Satz, Buttons. Zusatz (Fakten, Preis, Sprungmarken) und Medium folgen darunter auf Creme, mittig, max. 44rem.
- **Abschnittsköpfe** standardmässig mittig (`SectionIntro`, Variante `center`): Überzeile, `t-h2`, ein kurzer Satz. Linksbündig (`left`), wenn der Kopf neben Inhalt in zwei Spalten steht.
- Sektionsabstände in vier Stufen: `sec-s` (44–64 px), `sec-m` (56–88 px), `sec-l` (72–112 px), `sec-xl` (88–136 px).

## 4. Breakpoints

| Name | ab | Hauptänderung |
|---|---|---|
| (base) | 0 | 4 Spalten, Listen statt Timelines, Filmstreifen horizontal wischbar |
| `sm` | 640 px | Buttons nebeneinander, 2-spaltige Listen |
| `md` | 768 px | 12 Spalten |
| `lg` | 1024 px | Desktop-Navigation, System-Timeline, Vorschau im Leistungsindex |
| `xl` | 1280 px | feinere Spaltenverteilung |

## 5. Linien, Ecken, Flächen

- Ecken: **0** für Inhalte (Bilder, Tabellen, Listen). Rund ist, was man anklickt: Buttons als Pill wie auf der bisherigen Website, Pause-Knöpfe; dazu der Kreislauf.
- Linien: 1 px `line`; Sektionsbeginn oft mit `border-ink` (volle Tinte) statt Haarlinie.
- Keine Schatten, kein Glas. Einziger Verlauf: der Grauverlauf im Hero-Titel (`text-fade`). Tiefe entsteht durch Fläche (paper / paper-2 / ink).
- Karten nur für echte Objekte; Standard sind Listen mit Linien (Index, Fahrplan, Datenblatt).

## 6. Buttons & Links

Aufbau wie auf der bisherigen Website: **Pill** mit Text in Versalien (Inter 600) + **runder Pfeil-Knopf** rechts.

| Klasse | Aussehen | Einsatz |
|---|---|---|
| `btn btn-primary` | Violett, Tinte, schwarzer Pfeil-Knopf | **nur** Strategie-Call |
| `btn btn-paper` | Weiss, Tinte, schwarzer Pfeil-Knopf | Hauptbutton auf dunklem Grund (Hero wie live), kontextuelle Handlung auf Dunkel |
| `btn btn-ink` | Tinte, Creme, heller Pfeil-Knopf | kontextuelle Handlung auf Hell, im violetten Abschlussblock |
| `btn btn-line` | Kontur | Header-CTA, solange ein primärer Button auf der Seite sichtbar ist |
| `ArrowLink` | Text + Pfeil, 44 px Trefferfläche | tertiär |

Max. eine violette Handlung pro Viewport (Header schaltet automatisch auf Kontur).

## 7. Bildbehandlung

- Echte Videos/Bilder, ohne Mockups, ohne Schnittmarken, ohne Timecodes. Jedes Werk einmal pro Seite.
- Captions in `t-meta`: Art / Thema oder Kunde. Kunde nur, wenn belegt (Logo im Material, Credit, Freigabe).
- Porträts: 4:5, Graustufen, Farbe bei Hover; identischer Bildausschnitt per `objectPosition`.
- Fehlendes Material: `Placeholder` nur auf Unterseiten, nie auf der Startseite.
- Ambient-Videos: `*-short.mp4` (8 s, ca. 250 KB), stumm, nur sichtbar, **Pause-Knopf**. Player: Klick mit Ton, Untertitel.

## 8. Bewegung

| Muster | Umsetzung | Dauer / Kurve |
|---|---|---|
| Zeilen-Reveal | `Lines` + `data-reveal="lines"`; Hero per CSS (`.intro`) | 0.9 s, `--ease-cut` cubic-bezier(.2,.7,0,1) |
| Einblenden | `data-reveal` | 0.8 s |
| Durchstreichen | `.strike` | 0.9 s, gestaffelt |
| Zeiger im Kreislauf | folgt dem Lesen der Stationen (IntersectionObserver), kein Timer | 0.7 s |
| Hover | Farbwechsel, Pfeil +4 px, Indexzeile +8 px | 0.2 – 0.5 s |

Ein einziger IntersectionObserver (`RevealObserver`). Inhalte sind ohne JavaScript vollständig sichtbar (`html.js`-Gate). `prefers-reduced-motion`: keine Reveals, kein Auto-Ablauf, keine Autoplay-Videos.

## 9. Formulare

`.field`: nur Unterlinie, 18 px Schrift, Fokus = 2 px violette Linie, Fehler = rote Linie + Text. Labels immer sichtbar (kleine Überzeile, über dem Feld). Pflichtfelder markiert. Anliegen per `?anliegen=` vorwählbar.

## 10. Copy-Regeln

- Du-Form, Schweizer Rechtschreibung (ss), Zahlen `2'490`, Datum `29.09.2026`.
- Keine Gedankenstriche (—/–) als Stilmittel; Komma, Punkt oder Schrägstrich.
- Verboten: «massgeschneiderte Lösungen», «digitale Exzellenz», «innovativ», «360 Grad», «auf das nächste Level», «entfesseln», «Gamechanger», «Leidenschaft trifft Innovation», «gemeinsam erfolgreich», «Blabla».
- Englisch nur für Brand-Statements (`Systems over campaigns.`, `We create customers, not clicks.`).
- Jede Zahl, jeder Kunde, jedes Zitat mit Quelle im Content-File. Keine Beispielwerte als Resultate.

## 11. Komponenten-Inventar

| Komponente | Datei | Zweck |
|---|---|---|
| `Logo` | `components/brand/Logo.tsx` | Lockup / Full (mit Tagline) / Mark, aus Kunden-SVG |
| `Meta`, `Slashed` | `components/ui/Meta.tsx` | kleine Überzeile, Schrägstrich-Trenner |
| `Lines` | `components/ui/Lines.tsx` | Headline mit gesetzten Zeilen + Reveal |
| `ButtonLink`, `ArrowLink` | `components/ui/ButtonLink.tsx` | Handlungen |
| `VideoFrame` | `components/ui/VideoFrame.tsx` | Ambient/Player-Video |
| `Placeholder` | `components/ui/Placeholder.tsx` | Bildplatz |
| `PageHeader` | `components/page/PageHeader.tsx` | dunkler, mittiger Seitenkopf mit Netz |
| `SectionIntro` | `components/page/Blocks.tsx` | Abschnittskopf (mittig / links) |
| `RingSystem` | `components/system/RingSystem.tsx` | Kreislauf: 9 Stationen × 5 Ringe |
| `RateCard` | `components/blocks/RateCard.tsx` | Preisliste Content Day / Podcast |
| `PackagesSheet` | `components/blocks/PackagesSheet.tsx` | Pro / Advanced als Datenblätter |
| `VideoTestimonial` | `components/blocks/VideoTestimonial.tsx` | Interview + Timecode-Zitate |
| `TeamStrip` | `components/blocks/TeamStrip.tsx` | Menschen |
| `InsightsList` | `components/blocks/InsightsList.tsx` | redaktioneller Index |
| `FinalCta` | `components/blocks/FinalCta.tsx` | violetter Abschluss |
