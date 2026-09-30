# eCreator Design System

> Grundlage: `docs/ART-DIRECTION.md` (Version 4: hell und luftig nach dem Vorbild anfragenfluss.de, eCreator-Violett als Akzent). Umsetzung: `src/app/globals.css` (Tokens, Utilities, Komponentenklassen) und `src/components/ui/*` (Primitives).
> Regel für alles: **hell, ruhig, produktartig.** Viel Weiss, Karten mit weicher Tiefe, mittige Köpfe mit Label-Pille, ein Akzentwort in Violett.

---

## 1. Farben

| Token | Hex | Rolle |
|---|---|---|
| `paper` | `#FFFFFF` | Grundfläche |
| `paper-2` | `#F5F5F7` | hellgraue Bänder, Footer |
| `ink` | `#1D1D1F` | Text, primärer Button |
| `night` | `#111114` | dunkle Panels (`studio`) |
| `grey-700` / `600` / `500` | `#3A3A3C` / `#56565B` / `#6E6E73` | Fliesstext sekundär / Metadaten / leise Texte (alle ≥ 4.5:1 auf Weiss) |
| `grey-400` / `300` | `#98989D` / `#C7C7CC` | Text auf dunklen Panels |
| **`violet`** | **`#7866F4`** | **eCreator Violett:** Akzentwort, Label-Pillen, Leuchten des Primär-Buttons, Netz, aktive Zustände |
| `violet-2` | `#8978FF` | Violett auf Dunkel |
| `violet-deep` | `#5A48D8` | kleiner violetter Text auf Weiss (5.6:1) |
| `line` / `line-strong` | ink 10 % / 20 % | Linien, Formularfelder |

Radien: `--radius-card` 24 px, `--radius-media` 18 px, `--radius-btn` 14 px. Schatten: `shadow-card` (Karten),
`shadow-float` (Header, Menüs), `--shadow-cta` (violettes Leuchten unter dem Primär-Button).

### Violett-Regel
Violett ist Akzent, nicht Fläche: ein Akzentwort pro wichtigem Titel, Label-Pillen, Netz und Leuchten, aktive Navigation.
Nicht als Button-Fläche mit weisser Schrift (Kontrast 4.2:1 zu knapp für normale Schrift).

## 2. Typografie

**Plus Jakarta Sans** für Titel, **Inter** für Text, **Pinyon Script** nur für die eine Schreibschrift-Zeile im Hero.
Alle lokal über `next/font/google`. Titel in **Satzschreibung**, fett und eng.

| Utility | Einsatz | Grösse (fluid) | Einstellungen |
|---|---|---|---|
| `t-h1` | H1 (Hero bis 68 px, Seitenköpfe bis 60 px) | 36 → 60 px | 700, −0.035em, lh 1.05 |
| `t-h2` | Sektionstitel | 30 → 48 px | 700, −0.03em, lh 1.08 |
| `t-h3` / `t-h4` | Karten-, Listentitel | 20 → 24 px / 17 → 19 px | 700 / 650 |
| `t-num` | Zahlen, Preise | 28 → 40 px | 700, tabellarische Ziffern |
| `t-lead` | Einleitungen | 17 → 19 px | Inter 400 |
| `t-body` / `t-small` | Fliesstext | 17 / 15 px | Inter 400 |
| `t-meta` | kleine Versal-Labels unter Zahlen, Tabellenköpfe, Captions | 12 px | Jakarta 600, +0.08em |
| `label-pill` | Überzeile über Titeln | 13 px | Inter 500, violett getönte Pille mit Punkt |
| `text-accent` | Akzentwort im Titel | – | violetter Verlauf |

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

| Klasse | Aussehen | Einsatz |
|---|---|---|
| `btn btn-primary` | dunkel, weisse Schrift, violettes Leuchten; auf dunklen Panels automatisch weiss | **nur** Strategie-Call |
| `btn btn-line` | Kontur | sekundäre Handlung, Header-CTA wenn ein Primär-Button sichtbar ist |
| `btn btn-paper` | weiss | Handlung auf dunklen Panels |
| `btn-sm` | kleine Pille | Header |
| `ArrowLink` | Text + Pfeil, 44 px Trefferfläche | tertiär |

Weitere Bausteine: `card` (Karte), `check-list` (Häkchen-Liste), `hero-grid` (violettes Netz mit Leuchten),
`bg-grid` (graues Raster), `section.studio` (dunkles, eingerücktes Panel, automatisch abgerundet).

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
