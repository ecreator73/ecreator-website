# Seiten-Verträge (Phase 7)

Verbindlich für alle Unterseiten. Vorher lesen: `docs/ART-DIRECTION.md`, `design-system.md`, `docs/POSITIONING-IA.md`, `_research/FACTS.md` (Kap. 11 «Nicht verwenden»), und die Homepage-Umsetzung (`src/app/page.tsx`, `src/components/**`) als Referenz für Qualität und Stil.

## A. Harte Regeln (gelten für jede Seite)

1. **Real Data Rule.** Keine erfundenen Kunden, Zahlen, Zitate, Awards, Partner, Standorte, Teamgrössen, Öffnungszeiten, Reaktionszeiten, Budgets, Resultate. Erlaubt sind nur Angaben aus `src/content/*.ts` (dort mit Quelle) und aus `_research/FACTS.md` mit Status VERIFIZIERT / LIVE-ANGABE / EXTERN. Methodik (wie eCreator arbeitet) darf beschrieben werden, ohne Ergebnisversprechen (AGB Ziff. 11: keine Garantie für Leads, Umsätze, Bewerbungen, Rankings). Fehlt etwas: `<Todo>` oder `<Placeholder>` (sichtbar, gestaltet), nie Fülltext.
2. **Preise nur aus `src/content/offers.ts`.** Keine Mengen erfinden (z.B. keine Anzahl Videos beim Content Day). Werbebudget ist nie inklusive. Keine Einstellgarantie beim Recruiting.
3. **Copy:** Du-Form, Schweizer Rechtschreibung (ss), `2'490`, keine Gedankenstriche (– —) als Stilmittel, kurze Sätze, konkret. Verboten: «massgeschneidert», «digitale Exzellenz», «innovativ», «360 Grad», «nächstes Level», «entfesseln», «Gamechanger», «Leidenschaft trifft Innovation», «gemeinsam erfolgreich», «Blabla», «ganzheitlich», «Full-Service», «Synergien», «State of the Art». Englisch nur für Brand-Statements. Fachbegriffe (CRO, AEO, CAPI, Server-Side Tracking) beim ersten Auftreten in einem Halbsatz erklären.
4. **Design Version 4 (gilt vor allem Folgenden, ART-DIRECTION.md §0d):** hell und luftig nach dem Vorbild anfragenfluss.de. Seitenkopf `PageHeader` (hell, violettes Netz, mittig), Abschnittsköpfe mit `label-pill` (über `SectionIntro`), Titel in Satzschreibung mit höchstens einem Akzentwort (`withAccent` aus `@/lib/accent`), Inhalte in `card`s, Listen als `check-list`, Bausteine `Steps`/`IndexList`/`Definition`/`Faq`/`RelatedLinks` (Karten, nicht erneut in Karten packen), runde Nummern `NumberChip`, dunkle Abschnitte als `section.studio` (eingerücktes Panel). Primär-Button nur für den Strategie-Call.
   **Design Version 3 (überholt wo es V4 widerspricht, ART-DIRECTION.md §0c):** schlicht wie die bisherige Website. Plus Jakarta Sans + Inter, nur die zentralen Utilities (`t-h1` nur für die H1, `t-h2` für Abschnitte, `t-h3`/`t-h4`, `t-num` max. 40 px). Keine Inline-Schriftgrössen über 1.5rem, keine Plakat-Zahlen, kein `t-mega`/`t-display` (entfernt), kein Schlitz, keine `RingArc`/`RingLens` (entfernt). Seitenkopf immer `PageHeader` (dunkel, Netz, mittig), Abschnittsköpfe mittig über `SectionIntro`. Die Art-Direction-Hinweise der einzelnen Seiten unten (Plakate, Manifest-Typo, Mikrofon-Kreis) sind damit überholt, die Inhalte gelten weiter.
   **Design (Version 2, überholt wo es V3 widerspricht):** nur Tokens/Utilities aus `globals.css` und Bausteine aus `src/components/**`. Creme-Grund `paper`, Tinte, Studio-Modus (`studio`) für Produktion. Keine neuen Farben, keine Verläufe, keine Schatten, keine Icon-Bibliotheken, keine Emojis, keine Karten-Raster. **Verboten aus V1:** Timecodes, REC-Punkte, «9:16»-Labels als Dekor, Schnittmarken (CropMarks), sichtbare Rasterlinien (GridLines), Sektions-Nummern («/ 01»), violette Schlusspunkte, violette Trenner. **Violett** nur für: primären Button (`ButtonLink` variant primary = Strategie-Call), aktive Elemente in Diagrammen, `.strike`, den `FinalCta`. Rund nur für Klickbares und Logo-Motive (Ring im Button, `RingArc`, `RingLens`). **Schlitz** (`.slit`) höchstens einmal pro Seite, nie durch Gesichter. `t-mega` (Versal, breit) nur für 1 Marken-Moment pro Seite. Sektionsabstände mit `sec-s/m/l/xl` bewusst variieren. Mindestens **drei verschiedene Abschnitts-Kompositionen** pro Seite (z.B. Zahl als Headline, Tabelle/Datenblatt, Index, Vollbreite-Medium, Zitat, Manifest-Typo). Mono (`t-meta`) nur für kurze Labels, Sätze immer in `t-small`/`t-body`. Jedes Werk (Video/Screenshot) nur einmal pro Seite.
5. **Aufbau jeder Unterseite:** `PageHeader` (mit Breadcrumbs) → Inhalt → mind. **ein echtes Proof-Element** (Work-Video, Case, Testimonial, Webprojekt; nur passendes, belegtes Material aus `work.ts`, `cases.ts`, `testimonials.ts`) → `RelatedLinks` (interne Verlinkung, 2–4 Links) → `FinalCta` (mit passendem `secondary`-CTA laut Tabelle unten).
6. **SEO pro Seite:** `export const metadata = pageMeta({...})` mit eindeutigem Title (≤ 60 Zeichen inkl. « · eCreator») und Description (140–160 Zeichen), genau **eine H1**, logische H2/H3, Breadcrumbs (Schema kommt aus der Komponente), `serviceSchema` bei Leistungen/Produkten (mit `offers`, wenn Preis bekannt), `Faq` mit Schema nur bei echten Fragen (3–6 Stück, erste Satz = direkte Antwort). Alt-Texte beschreibend.
7. **Content zentral:** Seitentexte als Objekt in `src/content/pages/<slug>.ts` (typisiert), die Route `src/app/<route>/page.tsx` rendert nur. So bleiben Texte an einem Ort pflegbar.
8. **Mobile first denken:** Jede Seite muss bei 390 px ohne horizontales Scrollen funktionieren, Touch-Ziele ≥ 44 px, keine Hover-only-Inhalte.
9. **Next.js 16:** `params`/`searchParams` sind Promises (`await props.params`). `PageProps<'/route/[slug]'>` nutzen. `generateStaticParams` für dynamische Routen. `useSearchParams` nur in Client-Komponenten innerhalb `<Suspense>`.

## B. CTA pro Seite

| Seite | Primär | Sekundär (FinalCta `secondary`) |
|---|---|---|
| Leistungsseiten allgemein | Strategie-Call buchen | passendes Anliegen |
| /content-produktion, /content-day | Strategie-Call | **Content Day anfragen** `/kontakt?anliegen=content-day` |
| /podcast-studio | (im Header) | **Studio anfragen** `/kontakt?anliegen=podcast-studio` (hier im Seitenkopf primär als Button `btn-paper`) |
| /social-recruiting | Strategie-Call | **Recruiting besprechen** `/kontakt?anliegen=recruiting` |
| /webdesign | Strategie-Call | **Website-Projekt besprechen** `/kontakt?anliegen=website` |
| /crm-automation | Strategie-Call | **CRM-Projekt besprechen** `/kontakt?anliegen=crm` |
| /seo, /ai-search | Strategie-Call | Anfrage `/kontakt?anliegen=seo` |
| /pakete | Strategie-Call | `/kontakt?anliegen=pakete` |

## C. Seiten

### C1 · `/leistungen` · Übersicht
- **Keyword:** Marketingagentur Leistungen / Performance Marketing, Content, Webdesign, SEO, CRM
- **Title:** «Leistungen: Content, Ads, Web, SEO & CRM» · **H1:** «Alles, was ein System braucht.»
- **Art Direction:** die System-Timeline als Orientierung (Komponente `SystemTimeline` wiederverwenden) + alle Leistungen gruppiert nach den 4 Nav-Gruppen als grosser typografischer Index (Gruppen als t-brand-Zwischentitel), Studio-Produkte als dunkles Band mit `RateCard`, Pakete-Verweis.
- Keine FAQ. Schema: ItemList der Leistungen optional.

### C2 · `/performance-marketing`
- **Keyword:** Performance Marketing Agentur Schweiz · **H1:** «Performance Marketing, das auf Kunden optimiert.»
- Inhalt: Kanäle (Meta, Instagram, Facebook, Google, TikTok, LinkedIn wo passend), Lead Generation, Creative Testing, Kampagnenstrategie, Conversion-Optimierung, Reporting, Tracking (Anker `#tracking`: Pixel, Conversion API, Server-Side, Qualitätssignale wie «Termin gebucht»). Methodik aus FACTS M04–M10 und dem Case (Themen trennen, Video vorqualifiziert, Tracking bis zum Lead, wöchentlicher Testing-Rhythmus als Arbeitsweise, nicht als Garantie).
- **Art Direction:** Kopf «wide». Ein «Kanal-Fahrplan» (Tabelle: Kanal / wofür / typische Formate) statt Kanal-Kacheln. Case-Zahlen des Finanz-Case als Plakat mit Quelle. Creatives als Filmstreifen (`workVideos`). Potenzialrechner-Teaser → `/rechner`.
- FAQ (Schema ja): Wie schnell sieht man erste Resultate (ehrlich, ohne Versprechen), welches Budget ist sinnvoll (Rechner-Tipp live: «3'000–6'000 CHF/Monat ist ideal für saubere Tests» = LIVE-ANGABE, als Richtwert kennzeichnen), Meta oder Google, ist das Werbebudget inklusive (nein), wie wird gemessen.
- Service-Schema. Links: Meta Ads, Google Ads, Content Day, Pakete, Insight Tracking.

### C3 · `/performance-marketing/meta-ads`
- **Keyword:** Meta Ads Agentur Schweiz (Facebook Ads, Instagram Ads) · **H1:** «Meta Ads für Facebook und Instagram.»
- Inhalt: wofür Meta (Nachfrage erzeugen), Formate (Reels, Stories, Feed, Lead-Formulare vs. Landingpage; FACTS CA-Learning «Landingpage schlägt Lead-Ad» nur als Erfahrungswert aus dem Case kennzeichnen), Creative-Testing, Pixel + Conversion API, Zielgruppen, Reporting. Proof: Finanz-Case + Spitex-Videos.
- **Art Direction:** 9:16 im Zentrum. Ein grosser vertikaler Video-Frame neben einem «Aufbau eines Ads»-Index (Einstieg, Problem, Lösung, Beweis, Handlung) als nummerierte Liste, ohne Timecodes.
- FAQ ja. Service-Schema. Links: Performance Marketing, Content Day, Google Ads.

### C4 · `/performance-marketing/google-ads`
- **Keyword:** Google Ads Agentur Schweiz · **H1:** «Google Ads: da sein, wenn jemand sucht.»
- Inhalt: Suchkampagnen, Keyword-Strategie, Anzeigentexte, Landingpages, Conversion-Tracking, Local; Hinweis: im Pro-Paket nicht regulär enthalten, im Advanced ja. Performance Max nur erwähnen, keine Versprechen.
- **Art Direction:** typografisch, fast ohne Bild: eine gesetzte «Suchanfrage» als grosses Zitat-Element (z.B. «Gipser Thalwil Offerte») → Anzeige → Landingpage → Anfrage als Kette (Steps). Webprojekt Trapletti als Beispiel für die Landingpage-Seite (ohne Resultate zu behaupten).
- FAQ ja. Service-Schema.

### C5 · `/content-produktion`
- **Keyword:** Content Produktion Schweiz / Videoproduktion Social Media · **H1:** «Content, der verkauft. Selbst produziert.»
- Inhalt: Social-Media-Videos, Ads, UGC, Testimonials, Recruiting-Content, Image-Videos, Produktvideos, Events, Short-Form, Videografie, Editing, Models, Skripte, Content-Strategie. Ablauf (Skript → Drehtag → Schnitt → Varianten → Ausspielung).
- **Art Direction:** **Studio-Modus** (dunkler Kopf). Grosse Wand aus den echten `workVideos` (jedes einmal) + das Interview (16:9) als Beleg, dass auch Testimonials produziert werden. Bildplätze für Behind the Scenes klar markiert.
- Verweis prominent auf `/content-day` (Preise) und `/podcast-studio`. FAQ ja (Rechte an Videos: AGB prüfen, sonst Todo).

### C6 · `/content-day` · Produkt
- **Keyword:** Content Day / Drehtag buchen Schweiz · **H1:** «Content Day. Vier Stunden Dreh, fertig geschnitten.»
- Inhalt: alle Optionen aus `offers.ts` (4h mit Model CHF 2'490, 4h ohne Model CHF 1'990, Bestandskunden 3h CHF 1'500, Full Content Day 8h auf Anfrage), enthalten: Produktion, Videograf, Equipment, Schnitt; Fertigstellung 7 bzw. 14 Arbeitstage, Express gegen Aufpreis. **Keine Anzahl Videos nennen.** Für wen / wofür (Social, Ads, Events, Testimonials, Unternehmenscontent). Ablauf mit Vorbereitung.
- **Art Direction:** Studio-Modus. Preis als Plakat im Kopf (aside), `RateCard` (Content-Day-Zeilen), ein «Drehplan»-Element: Ablauf eines Content Days als Schritte (Vorbereitung, Aufbau, Dreh, Schnitt, Lieferung), ohne erfundene Uhrzeiten. Echte Beispiele aus `workVideos`.
- CTA im Kopf: `Content Day anfragen` (btn-paper) + Strategie-Call. FAQ ja (Model, Location, Rechte, Express, Schnittrunden → nur was belegt ist, sonst «im Gespräch»). Service-Schema mit Offers.

### C7 · `/podcast-studio` · Produkt
- **Keyword:** Podcast Studio mieten (Kanton Zürich nur, wenn Standort bestätigt; **Standort ist UNKLAR** → im Text neutral «Studio von eCreator», Standort als `<Todo>`)
- **H1:** «Podcast-Studio. Aufnehmen, ohne selbst aufzubauen.»
- Inhalt: 2 Stunden CHF 690, 4 Stunden CHF 990, inkl. Studio, Equipment, Aufnahme-Infrastruktur; Schnitt, Planung, Strategie auf Anfrage. Für wen (Unternehmen, Interviews, Kundengespräche, Recruiting-Formate). Ablauf einer Buchung.
- **Art Direction:** eigenständigste Seite: **Studio / Media / Culture.** Vollflächig dunkel (Studio-Modus), grosser Versal-Titel `t-mega` wie ein Sendungs-Titel, `RingArc` als grosses Motiv (das Logo als «Mikrofon-Kreis»), Preise als Plakat (`t-num`). Bildplätze für Studio-Fotos (Totale, Mikrofone, Kameras), klar markiert. Kein REC, keine Fake-UI.
- FAQ ja. Service-Schema mit Offers. CTA: Studio anfragen.

### C8 · `/social-media`
- **Keyword:** Social Media Agentur Schweiz · **H1:** «Social Media mit Plan, Produktion und Budget.»
- Inhalt: Strategie, Content-Planung, Produktion, Social Ads, Kampagnen; Kanäle Instagram, Facebook, TikTok, LinkedIn. Abgrenzung: kein reines Posting, sondern Teil des Systems.
- **Art Direction:** «Redaktionsplan» als typografische Wochen-/Monatsstruktur (ohne erfundene Kundeninhalte: generische Formate wie «Hook-Video», «Team-Video», «Testimonial»), daneben 9:16-Frames.

### C9 · `/webdesign`
- **Keyword:** Webdesign Schweiz / Webdesign Zürich / Website erstellen lassen · **H1:** «Websites, die Anfragen bringen.»
- Inhalt: Websites, Landingpages, WordPress, Elementor, Shopify, UX/UI, CRO (erklären), technische Umsetzung, Integrationen (Formulare, Kalender, WhatsApp, CRM), Tracking. 4-Schritte-Ablauf.
- Proof: **zwei belegte Webprojekte** aus `work.ts` (`webProjects`: Trapletti, Spitex Nächstenpflege) mit echten Screenshots Desktop + Mobile, Credit-Beleg als Mono-Caption. Keine Resultate behaupten.
- **Art Direction:** grosse Screenshots im Format-Rahmen, Desktop und Mobile nebeneinander, lange Seite als Scroll-Ausschnitt (`desktopFull` in einem Frame mit overflow, der beim Hover/Fokus scrollt, reduced-motion statisch).
- FAQ ja (Kosten: keine Preise bekannt → «nach Umfang, im Gespräch»; Dauer: unbelegt → keine Zahl). Service-Schema.
- Alte URL `/webseite-erstellen-lassen/` → 301 hierher.

### C10 · `/seo`
- **Keyword:** SEO Agentur Schweiz / SEO Agentur Zürich · **H1:** «SEO: gefunden werden, wenn es zählt.»
- Inhalt: Technical SEO, Onpage, Content, Local SEO, Keyword-Strategie, interne Verlinkung, Structured Data. Honest: SEO braucht Zeit, keine Ranking-Garantie.
- **Art Direction:** «Audit-Protokoll»: eine Checkliste als Datenblatt (Bereich / was wir prüfen / warum), dazu die eigene Website als Beispiel für Structured Data (zeige einen gekürzten, echten JSON-LD-Ausschnitt dieser Website als Code-Block im Mono-Stil).
- FAQ ja. Service-Schema.

### C11 · `/ai-search` · AEO
- **Keyword:** AEO Agentur Schweiz / AI Search Optimierung / Sichtbarkeit in ChatGPT · **H1:** «Gefunden werden, auch wenn eine KI antwortet.»
- Inhalt: Answer Engine Optimization erklärt (`Definition`-Baustein), AI Search Visibility, Content-Architektur, Entity Signals, Structured Data, Brand Authority; Unterschied zu SEO; was konkret gemacht wird. Keine Versprechen zu Nennungen.
- **Art Direction:** Frage-Antwort-Dramaturgie: grosse gesetzte Beispiel-Frage, wie sie jemand einer KI stellt, und daneben die Bausteine, aus denen eine Antwort-Engine Quellen auswählt (als Index, nicht als Fake-Chat-UI).
- FAQ ja (passt hier besonders). Service-Schema. Link auf Insight «Was ist AEO?».

### C12 · `/crm-automation`
- **Keyword:** CRM Lösungen Schweiz / CRM Agentur · **H1:** «CRM und Automation: kein Lead bleibt liegen.»
- Inhalt: individuelle CRM-Systeme, Lead-Management, Sales-Pipelines, Follow-ups, Terminprozesse, E-Mail-Automationen, WhatsApp-Workflows, Reporting, Dashboards, Kundenportale, Integrationen.
- **Art Direction:** die Pipeline als typografisches Flussdiagramm (Spalten: Neu / Kontaktiert / Termin / Angebot / Kunde, aus Linien und Mono-Labels, **ohne** Fake-Zahlen oder Fake-Dashboard). Automationen als «Wenn / Dann»-Liste im Datenblatt-Stil.
- FAQ ja. Service-Schema.

### C13 · `/social-recruiting` · Produkt
- **Keyword:** Social Recruiting Schweiz / Mitarbeitende über Social Media finden · **H1:** «Social Recruiting. Bewerbungen über Instagram und TikTok.»
- Inhalt: Paket CHF 5'900 mit allen Bestandteilen aus `offers.ts`, Werbebudget exkl., keine Einstellgarantie, nicht wie Personalvermittlung (Unterschied erklären). Ablauf. Bewerber-System erklärt.
- Proof: eCreator-eigenes Ad für Personalvermittlungen (echt, `workVideos.ecreator`). Keine Recruiting-Kennzahlen (keine belegt).
- **Art Direction:** «Stelleninserat vs. Recruiting-Video» als Gegenüberstellung in Typo (links ein nüchtern gesetztes Inserat-Muster, rechts der 9:16-Frame). Preis als Plakat.
- FAQ ja. Service-Schema mit Offer.

### C14 · `/pakete`
- **Keyword:** Marketing Paket KMU Schweiz / Performance Marketing Preise · **H1:** «Zwei Pakete. Klare Preise.»
- Inhalt: `PackagesSheet`, Mindestlaufzeit 6 Monate (Briefing; AGB nennt 12 Monate → `Todo`-Hinweis NICHT auf der Seite, nur in README), was nicht enthalten ist (Werbebudget, Google Ads im Pro), Einzelprodukte mit Preisen (Content Day, Podcast, Recruiting) als `RateCard`/Liste, Projekte ohne Preis (Website, CRM, SEO) → Anfrage.
- **Art Direction:** Preisliste als Hauptdarsteller, grösste Zahlen der Website. FAQ ja (Laufzeit, Kündigung nur soweit belegt, Budget, Wechsel zwischen Paketen → nur Belegtes, sonst «im Strategie-Call»).

### C15 · `/cases` + `/cases/[slug]`
- **Hub H1:** «Arbeit, die man zeigen kann.» Alle Cases aus `cases.ts` (Anzeigename über `displayClient`), gross und unterschiedlich gesetzt (nicht als Kachel-Raster): Case 1 mit Plakat-Zahlen, Case 2 als Video-Paar + Website, Case 3 als Website-Screenshot. Danach die komplette Video-Wand (`workVideos`) mit ehrlichen Captions. Webprojekte.
- **Detail:** Template für alle Cases: Kopf (Kunde/anonymisiert, Branche, Leistungen), Beleg-Zeile (`evidence`), Ausgangslage, Ansatz (Steps), Umsetzung/Medien, Resultat nur mit Quelle, Testimonial wenn vorhanden (für Finanz-Case: Interview `pinelli`, aber ohne den Case explizit dem Namen zuzuordnen, solange `nameApproved` false: Formulierung «Kundenstimme aus der Finanzbranche» + Name des Sprechers aus dem öffentlichen Video ist erlaubt), nächster Case.
- Schema: Article für Case-Detail. Alte URL der Case Study → 301 auf `/cases/finanzdienstleister-lead-generierung`.

### C16 · `/insights` + `/insights/[slug]`
- **Hub H1:** «Was wir wissen.» Kategorien als Filter-Links (ohne JS funktionsfähig als Anker/Abschnitte), Liste aus `insights.ts`, Cases als Kategorie «Case» verlinkt.
- **Artikel:** Inhalte in `src/content/articles/<slug>.ts` als `Block[]` (siehe `components/page/ArticleBody.tsx`). Aufbau: Kopf (Kategorie, Lesezeit, Datum, Autor «eCreator Redaktion»), Kurzantwort-Box (2–3 Sätze, AEO), Inhaltsverzeichnis, Body, «Das Wichtigste in Kürze», verwandte Leistungen. Article-Schema + Breadcrumbs.
- **Regeln für Artikel:** fachlich korrekt, keine erfundenen Statistiken, Studien oder Kundenbeispiele; Zahlen nur, wenn allgemein belegbar und mit Quelle verlinkt, sonst weglassen. Schweizer Kontext (revDSG statt DSGVO wo relevant). 900–1'500 Wörter.
- Migration: Tracking-Artikel (überarbeiten gemäss FACTS N34), «Von 0 auf 50» wird zum Ratgeber «Performance Ads mit kleinem Budget» ohne den anonymen Fall als Beleg.

### C17 · `/ueber-uns`
- **Keyword:** Marketingagentur Kanton Zürich / eCreator Team · **H1:** «Wir sind eCreator.»
- Inhalt: Haltung (Systems over campaigns, We create customers not clicks), wie wir arbeiten (Mission FACTS M10 in eigenen Worten), Team (`TeamStrip detailed`), Firmendaten (GmbH seit 2026 im HR des Kantons Zürich, Sitz Neerach), was wir nicht tun (keine Gewinnspiel-Leads, keine Versprechen ohne Messung). Kein Gründungsjahr 2023.
- **Art Direction:** persönlich: grosse Porträts, Zitat-artige Haltungssätze, eCreator-Ad als «so sieht unser Büro aus». Bildplatz «Team-Shooting» (TODO echtes Shooting).
- Schema: AboutPage + Person-Schemas der drei.

### C18 · `/marketingagentur-zuerich` · Standort
- **Keyword:** Marketingagentur Zürich / Marketingagentur Kanton Zürich · **H1:** «Marketingagentur im Kanton Zürich.»
- Inhalt: ehrlich: Sitz in Neerach, Zürcher Unterland (FACTS U05: «rund 16 Kilometer nördlich von Zürich»), Kunden in der ganzen Deutschschweiz, Content Days vor Ort beim Kunden. Keine Fahrzeiten, kein «Büro in Zürich». Leistungen im Überblick, Cases aus der Region nur wenn belegt (Trapletti, Thalwil = Kanton Zürich).
- **Art Direction:** «Koordinaten»-Kopf (Neerach, 47.5° N / 8.5° E nur wenn korrekt aus Wikipedia; sonst weglassen), grosse Typo, Adresse als Datenblatt, Link zu Google Maps. Keine eingebettete Karte (Datenschutz).
- LocalBusiness/ProfessionalService-Schema bereits global.

### C19 · `/rechner` · Potenzialrechner
- **H1:** «Was dein Werbebudget bringen kann.» Rechner mit korrekter Formel: Leads = Budget ÷ Ziel-CPL, Kunden = Leads × Abschlussquote, Umsatz = Kunden × Ø Umsatz pro Kunde (FACTS N24: keine ×12-Fehler, Werte monatlich). Defaults konservativ und als Beispiel gekennzeichnet (Budget 3'000, CPL 30, Abschlussquote 10 %, Umsatz 2'500; alle editierbar). Ergebnis sofort sichtbar, **kein Lead-Gate**. Disclaimer: Schätzung, keine Garantie (AGB Ziff. 11). CTA: Strategie-Call.
- **Art Direction:** Rechner als Datenblatt (Felder als `.field`, Ergebnis als `t-num`-Plakat), keine Slider-Spielerei.

### C20 · `/strategie-call`
- **H1:** «Strategie-Call. 30 Minuten, kostenlos.» Inhalt aus `strategyCall` (site.ts): Ablauf (3 Punkte), Versprechen (belegt), `BookingEmbed`, darunter Alternative `InquiryForm` mit `defaultAnliegen="strategie-call"`, Kontakt direkt. Gesichter von Claudio und Fabian. FAQ (5 Fragen aus FACTS 8.6 in eigenen Worten, ohne widersprüchliche Verschiebe-Aussage).
- Kein FinalCta (die Seite ist die Conversion).

### C21 · `/kontakt`
- **H1:** «Kontakt.» `InquiryForm` (in `<Suspense>`), Anliegen-Vorwahl per Query, Direktkontakt (Telefon, E-Mail, Adresse Datenblatt, Google-Maps-Link, Google-Bewertung mit Stand-Datum, Instagram, LinkedIn). Keine Öffnungszeiten (UNKLAR). Kein FinalCta.

### C22 · Rechtliches `/impressum`, `/datenschutz`, `/agb`
- Inhalt aus der Live-Site übernehmen (`_research/raw/*.html`), nur formal bereinigt (ss, Datum fix statt JS-Datum: Impressum geändert 2026-03-26, Datenschutz 2026-02-21, AGB «Stand 2026, geändert 2026-05-25»), `noindex` nicht nötig. Datenschutz: veraltete Punkte (Newsletter N44) NICHT stillschweigend löschen, sondern als `Todo` markieren; neue lokale Verarbeitung (Formular → eCreator, Google-Kalender erst nach Klick, Google Fonts lokal gehostet) als `Todo`-Hinweis «vor Livegang juristisch ergänzen». `article`-Typografie.

### C23 · `not-found`
- Studio-Modus, «404. Diese Seite ist nicht im Schnitt gelandet.» + Links auf Home, Leistungen, Kontakt.
