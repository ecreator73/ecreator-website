# eCreator Website (Neubau 2026)

Lokale Neuentwicklung von www.ecreator.ch. **Nicht deployt.** Keine Änderungen an der Live-Site oder an DNS.

- Stack: Next.js 16.3 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS 4. Keine UI-Bibliothek, keine Animations-Bibliothek.
- Schriften lokal über `next/font`, wie auf der bisherigen Website: Plus Jakarta Sans (Titel), Inter (Text), Pinyon Script (nur eine Zeile im Hero).
- Alle Seiten statisch vorgerendert. Einzige Server-Route: `POST /api/inquiry` (Anfrageformular).

## Dokumentation

| Datei | Inhalt |
|---|---|
| `docs/ART-DIRECTION.md` | Designidee, Kundenentscheide (§0b bis §0d, aktuell: hell und luftig nach dem Vorbild anfragenfluss.de), Violett-Regel, Bildsprache |
| `design-system.md` | Tokens, Typo-Skala, Raster, Abstände, Buttons, Bewegung, Formulare, Komponenten |
| `docs/POSITIONING-IA.md` | Positionierung, Zielgruppen, CTA-Hierarchie, Sitemap, Navigation, Homepage-Dramaturgie |
| `docs/PAGES.md` | Verträge je Unterseite (Keyword, Inhalt, Art Direction, Schema) und harte Regeln |
| `seo-map.md` | Keyword → Seite, technische SEO-Grundlage, interne Verlinkung, AEO |
| `migration-map.md` | alte URL → neue URL, Weiterleitungen, Aufgaben beim Go-live |
| `_research/` | **intern, nicht im Repo:** Faktenregister (FACTS.md, Verweise wie «FACTS N17» im Code), Analyse der bisherigen Website, Originalmedien. Bei eCreator anfragen. |

## Starten

Voraussetzung: Node.js 20 oder neuer.

```bash
npm install
```

```bash
npm run dev
```

Öffnet die Website auf http://localhost:3000. Produktionsversion lokal:

```bash
npm run build && npm run start
```

Optional: `.env.example` nach `.env.local` kopieren und `INQUIRY_WEBHOOK_URL` setzen, damit Formularanfragen weitergeleitet werden. Ohne Variable landen Anfragen lokal in `.data/inquiries.jsonl` (nicht versioniert). `.env*`-Dateien nie committen.

Auf dem ursprünglichen Entwicklungsrechner liegt Node portabel unter `C:\Users\Win11\ecreator-os\.tools\node`; Preview-Konfigurationen in Claude Code: `ecreator-editorial` (Dev, Port 3100) und `ecreator-editorial-prod` (Port 3101).

## Vorschau auf Vercel

Seit 02.10.2026 als Vorschau online: **https://ecreator-website.vercel.app** (Vercel-Projekt `ecreator-website`, Team `info-56790304s-projects`). Die Live-Website ecreator.ch und die DNS sind davon nicht berührt.

- **Nicht im Google-Index:** Auf Vercel sendet jede Seite `X-Robots-Tag: noindex, nofollow`, `robots.txt` sperrt alles (`src/lib/preview.ts`, `next.config.ts`, `src/app/robots.ts`). Erst beim Livegang unter ecreator.ch in Vercel `SITE_INDEXING=on` setzen.
- **Formular:** Ohne `INQUIRY_WEBHOOK_URL` meldet das Formular auf Vercel «in dieser Vorschau nicht aktiv» und nennt E-Mail und Telefon (nichts geht still verloren). Für echte Anfragen die Variable in Vercel setzen.
- **Deploy von der Platte:** `.vercelignore` hält Recherche, Screenshots, Doku, Skripte, `.env*` und das nicht freigegebene Trading-Video draussen.

```bash
npx vercel@latest deploy --prod --yes --scope info-56790304s-projects
```

- **GitHub:** Das Vercel-Projekt ist mit `ecreator73/ecreator-website` verbunden. Ein Push auf `main` löst automatisch einen Produktions-Deploy aus, deshalb vor einem Push sicherstellen, dass `main` dem gewünschten Stand entspricht.

## Struktur

```
src/
  app/                    Routen (page.tsx rendert nur, Texte liegen in content/)
    api/inquiry/          Formular-Endpunkt
    sitemap.ts robots.ts opengraph-image.tsx not-found.tsx
  content/                ZENTRALE INHALTE (hier pflegen)
    site.ts               Firma, Kontakt, Navigation, CTAs, Strategie-Call, Google-Profil
    company.ts            Handelsregister-Daten
    offers.ts             Pakete und Preise (Pro, Advanced, Content Day, Podcast, Recruiting)
    services.ts           Leistungen (Übersicht)
    system.ts             Kreislauf: 9 Stationen × 5 Disziplinen
    work.ts               echte Videos, Kundenlogos, Webprojekte
    cases.ts              Cases (mit Quellen, Freigabe-Schalter nameApproved)
    testimonials.ts       Kundenstimmen (nur belegte)
    team.ts               Team
    insights.ts           Artikel-Metadaten; Texte in content/articles/*.ts
    pages/*.ts            Texte der einzelnen Unterseiten
    routes.ts             Routen-Register für Sitemap
  components/
    brand/                Logo
    system/RingSystem     Kreislauf-Diagramm
    home/                 Bausteine der Startseite
    blocks/               wiederverwendbare Sektionen (RateCard, PackagesSheet, VideoTestimonial …)
    page/                 Bausteine für Unterseiten (PageHeader, Section, Faq, ArticleBody …)
    ui/                   Buttons, Video, Meta-Labels, Bildplätze
    forms/                InquiryForm, BookingEmbed
  lib/                    metadata.ts (pageMeta), schema.ts (Structured Data), integrations/
public/
  work/                   komprimierte Videos (Loop 8 s, Player mit Ton), Poster, Website-Screenshots
  team/ clients/ brand/   Porträts, Kundenlogos (monochrom), Logo-SVGs
  llms.txt                Übersicht für KI-Suchmaschinen
scripts/
  shoot.py                Full-Page-Screenshots (Desktop + Mobile) für die visuelle Prüfung
  shoot_top.py            Viewport-Screenshots
  qa.py                   technische QA über alle Routen
```

## Inhalte pflegen

- **Preise ändern:** nur `src/content/offers.ts`. Alle Seiten, Tabellen und das Schema lesen von dort.
- **Kunde freigeben:** in `src/content/cases.ts` `nameApproved: true` setzen, dann erscheint der echte Name statt der Anonymisierung.
- **Logo ausblenden/einblenden:** `src/content/work.ts` → `clientLogos` (`needsApproval: true` blendet aus).
- **Neuer Artikel:** Eintrag in `src/content/insights.ts` + Datei in `src/content/articles/<slug>.ts` + Import in `articles/index.ts`.
- **Google-Bewertung:** `site.google` in `site.ts` (Wert mit Datum). Wird aktuell bewusst nicht angezeigt (siehe offene Punkte).

## Integrationen (vorbereitet, noch nicht angebunden)

| Thema | Stand | Umstellen |
|---|---|---|
| Anfragen | `POST /api/inquiry` validiert (inkl. Honeypot) und speichert lokal in `.data/inquiries.jsonl` | `INQUIRY_WEBHOOK_URL` setzen (CRM, Make/Zapier, eigene Function), siehe `src/lib/integrations/inquiry.ts` |
| Terminbuchung | Google Calendar Appointment Schedules, lädt erst nach Klick (Datenschutz) | URL in `site.ts` → `strategyCall.bookingUrl`, Anbieter austauschbar |
| Tracking | nicht eingebaut. Buttons tragen bereits `data-cta`-Attribute für die spätere Messung | GTM mit Consent Mode v2 + Banner, Events cta_click, inquiry_submit, booking; Buchungs-Tool mit Bestätigungs-Event |

## Entscheidungen, die man kennen sollte

1. **Echte Daten only.** Die bisherigen Testimonials (Initialen, Stockfotos), die Gesamtkennzahlen (800 % ROAS, 12'500+ Leads, 10 Mio.+ Ad Spend) und «5.0 auf Google» sind nicht belegt und erscheinen nicht. Begründung je Punkt in `_research/FACTS.md` Kapitel 11. Partner-Badges und Kundenlogos (u. a. Allianz, Swiss Life) zeigt die Startseite seit 30.09.2026 auf Wunsch von eCreator; Partnerstatus und Freigaben siehe offene Punkte.
2. **Einziges echtes Testimonial:** Video-Interview mit Costantino Pinelli (Asset Management Switzerland AG), von eCreator auf LinkedIn veröffentlicht. Zitate stammen wörtlich aus der Transkription; deutsche Untertitel liegen in `public/work/interview-asset-management.de.vtt`.
3. **600-Leads-Case:** Auf der Startseite seit 30.09.2026 auf Wunsch von eCreator mit Namen und Video-Interview (Freigabe siehe offene Punkte). Die Case-Seite bleibt anonymisiert, bis der Kunde Name und Zahlen freigibt.
4. **Art Direction Version 4: hell und luftig nach dem Vorbild anfragenfluss.de** (Kundenentscheid 29.09.2026): weisser Grund, schwebender Header, Titel in Satzschreibung mit violettem Akzentwort, Label-Pillen, Karten mit weichem Schatten, dunkle Panels eingerückt. Übernommen wurden Muster, keine Inhalte. Vorher: V1 zu nah an Offscript, V2 zu plakativ, V3 dunkel und in Versalien (ART-DIRECTION.md §0 bis §0d).
5. **Du-Form** wie auf der bisherigen Website, Schweizer Rechtschreibung.
6. `/produkt-rechner` liefert **410 Gone** (interne Seite, wird nicht migriert).
7. **Startseite: Probleme, «Warum Kunden kommen. Und bleiben.» und CRM-Ansicht** (`ProblemGrid`, `WhyClients`, `CrmMockup`, Texte in `src/content/pages/home.ts`): Die Grafiken der Problem-Karten (laufen als Schleife mit Timer, Pause-Knopf; einzige Zahl ist der Ø CPL von CHF 12 als eCreator-Angabe) und die Umsatz-Grafik bei Punkt 04 (0 → Build → Grow → Scale → Keep growing) sind illustrativ und ohne Zahlen; die Umsatz-Grafik ist als «Schematische Darstellung» beschriftet. Die CRM-Ansicht ist eine Beispielansicht mit Demo-Daten und sichtbar so beschriftet; sie zeigt keine echten Kundenzahlen und keine Personen.
8. **Case Studies nach Gestaltungsvorlage des Kunden** (30.09.2026): dünner Rahmen, auf dem Desktop volle Seitenbreite, grosses Video im Querformat, Name unten links auf Verlauf, Play-Knopf in der Mitte; rechts Branche, Kunde, Leistungen als Häkchen, Kennzahlen (aus `cases.ts`), Zitat wörtlich aus dem Interview. Aus der Vorlage **nicht** übernommen, weil nicht belegt: «+80'000 Mehrumsatz», «5.0 Kundenbewertung» (echte Google-Bewertung 4.7 aus 12, wird bewusst nicht gezeigt) und das dortige Zitat. Das Interview läuft als 16:9-Vorschau (1280×720); die Social Ads sind im Hochformat gedreht und stehen unbeschnitten in einem 16:9-Rahmen (Handy 4:3) vor ihrem weichgezeichneten Standbild.
9. **Header-Logo mit Tagline** «We create customers, not clicks.» wie in der Logo-Datei (Kundenwunsch 30.09.2026), dafür grösser gesetzt (Desktop 46 px hoch).
10. **Violettes Netz** nicht nur im Hero (Kundenwunsch 30.09.2026): Utility `net` in `globals.css` (Mitte und Grösse über `--net-at` / `--net-size`), Linienstärke über `--net-line`; eingesetzt über die ganze Probleme-Section, hinter dem Titel der Case Studies, hinter der CRM-Ansicht und hinter dem Kreislauf. Alle dunklen Panels (`section.studio`) haben oben rechts ein feines Netz beim violetten Leuchten.
11. **Startseite ohne Leistungen-Section; Team als ein gemeinsames Teamfoto** statt Einzelporträts (Kundenwunsch 30.09.2026). Ein echtes Gruppenfoto fehlt noch, bis dahin steht ein beschrifteter Bildplatz (`TeamPhoto`, Eintrag `homeTeam.photo.src` in `src/content/pages/home.ts`).
12. **Social Recruiting auf der Startseite** (Briefing 30.09.2026, `SocialRecruiting` + `RecruitingFlow`): kompakt, ohne Preis und Pakete. Eine Figur wandert durch Gesehen → Beworben → Im CRM → Qualifiziert → Eingestellt und verwandelt sich dabei (Story-Ad, Kurzbewerbung, CRM-Zeile, neu im Team); auf dem Handy an Ort und Stelle mit Story-Balken. Das Ad ist bewusst typografisch (keine echte Person, keine Kundendaten). Gesteuert durch Scrollen (01.10.2026): Die Fläche bleibt stehen (sticky), die Scroll-Position bestimmt Position und Teilschritte, rückwärts läuft rückwärts; Klick auf eine Station scrollt dorthin; bei reduzierter Bewegung statisch und per Klick umschaltbar.

## Offene Punkte für eCreator (vor Livegang)

**Freigaben**
- [ ] Asset Management Switzerland AG: Logo, namentliche Nennung mit den Case-Zahlen, Video-Interview auf der Website
- [ ] Spitex Nächstenpflege, Trapletti Gipser Maler GmbH, Novara AG Immobilien, Arana Care, Pflegezukunft Schweiz: Logo und Arbeiten
- [ ] Neue Videos (29.09.2026): Freigaben von Arana Care, ProMaCare und Baba's Döner, Model-Releases der Darstellenden, Musikrechte Baba's Döner (Ton nur nach Klärung)
- [ ] Trading-Video «All Time High University»: ausgeblendet (`needsApproval` in `src/content/work.ts`), weil es Rendite-Aussagen ohne Risikohinweis enthält. Nur nach Kundenfreigabe und Prüfung zeigen
- [ ] Absender der Videos «Vergessene Vorsorgegelder» und «Call Agents» bestätigen (im Video nicht erkennbar, bisher anonym)
- [ ] Partner-Badges im Hero (Google Partner, Meta Business Partner, TikTok Marketing Partner): nur zeigen, solange der Partnerstatus bei allen drei aktiv ist, sonst in `src/content/site.ts` (`partners`) entfernen
- [ ] Kundenlogos im Laufband (Stand 30.09.2026, u. a. Allianz und Swiss Life): schriftliche Freigabe der Marken für die Nutzung als Referenz; Ausblenden über `needsApproval` in `src/content/work.ts`
- [ ] Case Studies Startseite (`src/content/pages/home.ts`): Zahl Asset Management prüfen (gesetzt: «600+ Leads in 3 Monaten» laut veröffentlichter Case Study; Angabe «in einem Monat» nicht belegt); Resultat für Baba's Döner nachliefern (Platzhalter)
- [ ] «Ø CHF 12 pro Lead bei unseren Kunden» (Startseite, Karte «Lead-Kosten zu hoch», eCreator-Angabe 01.10.2026): vor Livegang mit Ads-Daten über alle Konten belegen (`homeCplAverage` in `src/content/pages/home.ts`)
- [ ] CRM-Ansicht auf der Startseite: optional durch einen echten, anonymisierten Screenshot aus einem Kunden-CRM ersetzen (nur mit Freigabe), sonst bleibt die beschriftete Demo-Ansicht

**Fakten**
- [ ] Case-Zahlen belegen (Ads-Manager-Export) und Widersprüche der alten Case Study klären (FACTS N17, N18)
- [ ] Zuordnung der Videos Vorsorge, Krankenkasse, Fitness zu Kunden
- [ ] Namensform Fabian (Impressum «Fabian Mbah», Über uns «Fabian Leutwiler Mbah», HR «Mbah, Fabian Ifeanyi»), Rollen von Claudio und Ricardo
- [ ] Weitere Teammitglieder (Kaylou, Aristote, Darus) bestätigen, falls sie auf die Website sollen
- [ ] Standort des Podcast-Studios und Fotos davon
- [ ] MWST-Status und Preisangaben inkl./exkl. MWST
- [ ] Mindestlaufzeit: AGB sagen 12 Monate mit Verlängerung, Briefing sagt 6 Monate
- [ ] AGB §9 (CHF 150 bei kurzfristiger Absage) vs. «Termin jederzeit verschieben»
- [ ] Antwortzeit 24 Stunden bestätigen, Öffnungszeiten festlegen (Website 08–18, Google 09–19)
- [ ] Google-Bewertung: Anzeige auf der Website mit eCreator klären
- [ ] TikTok-Account @ecreator.gmbh bestätigen

**Material**
- [ ] Team-Shooting am Set: ein gemeinsames Teamfoto für die Startseite (Querformat, Datei nach `public/team/`, dann `homeTeam.photo.src` in `src/content/pages/home.ts` setzen) und neue Porträts
- [ ] Behind-the-Scenes-Fotos eines Content Days, Fotos vom Podcast-Studio
- [ ] Weitere Video-Testimonials (Bildplätze vorbereitet)

**Technik / Recht**
- [ ] Datenschutzerklärung juristisch aktualisieren (Formular, Google Kalender, Tracking)
- [ ] Tracking + Consent-Banner
- [ ] Open-Graph-Bild ist im hellen Look, aber noch in Archivo gesetzt: für Plus Jakarta Sans die TTF-Datei in `src/app/_og` ablegen und in `src/app/opengraph-image.tsx` einbinden
- [ ] Hosting, Host-Weiterleitung auf `https://www.ecreator.ch` mit einem 301
- [ ] Live-Site: LinkedIn-Link und Bewertungslink auf /kontakt/ korrigieren
