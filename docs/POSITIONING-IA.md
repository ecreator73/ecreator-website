# Positionierung & Informationsarchitektur (Phase 2)

## 1. Positionierung

**Kategorie (so wird gesucht):** Marketingagentur Schweiz.
**Position (so wird erinnert):** Die Marketingagentur, die Content, Performance Marketing,
Websites und CRM als **ein System** baut, produziert und misst.

| Ebene | Formulierung |
|---|---|
| Markenclaim (EN, bestehend, weiterentwickelt) | **Systems over campaigns.** |
| Deutsch | Systeme statt Kampagnen. |
| Logo-Tagline (bleibt) | We create customers, not clicks. |
| Kernversprechen | Aus Aufmerksamkeit werden Kunden. Messbar. |
| Abgrenzung | Keine reine Social-Media-, Ads-, Web- oder Videoagentur. Alles davon, verbunden. |

**Die Kette, die eCreator verkauft** (und die die Website als Timeline zeigt):
Aufmerksamkeit → Nachfrage → Traffic → Conversion → Lead → Sales → Messung → Skalierung.

**Beweis-Säulen**
1. Wir produzieren selbst: Content Days, Videograf, Models, Schnitt, eigenes Podcast-Studio.
2. Wir schalten und messen: Meta, Instagram, Facebook, Google, TikTok, LinkedIn, Tracking bis Server-Side.
3. Wir bauen die Infrastruktur: Websites, Landingpages, CRM, Automationen, Dashboards.
4. Echte Resultate: dokumentierte Cases (siehe `_research/FACTS.md`).
5. Echte Menschen: Claudio, Fabian, Ricardo und Team, erreichbar statt Ticket-System.

**Tonalität:** Du (wie die bestehende Website), kurz, konkret, selbstbewusst ohne Superlative.
Englisch nur für Brand-Statements. Verbotene Floskeln siehe `design-system.md` § Copy.

## 2. Zielgruppen & Einstiege

| Einstieg | Typischer Besucher | Landet auf | Erste Frage |
|---|---|---|---|
| Instagram / Meta / TikTok Ad (mobil) | KMU-Inhaber:in, sieht ein Video | Produktseite (Content Day, Recruiting) oder Home | «Was kostet das, was bekomme ich?» |
| Google (Dienstleistung + Ort) | Marketingverantwortliche:r, vergleicht | Leistungsseite (Meta Ads, Webdesign, SEO) | «Können die das, für Firmen wie uns?» |
| Empfehlung / Brand-Suche | Entscheider:in | Home, Cases, Über uns | «Wer sind die, wem haben sie geholfen?» |
| AI Search (ChatGPT, Perplexity, AI Overviews) | Recherche | Insights, FAQ, Leistungsseiten | präzise Antworten, Definitionen |

Branchenfokus (KMU, Dienstleister, Finanz, Versicherung, Treuhand, Immobilien, Bau/Handwerk,
Healthcare/Pflege, E-Commerce) wird **nicht** als dünne Branchen-Einzelseiten gebaut,
sondern als «Für wen wir arbeiten» mit echten Cases verknüpft. Branchenseiten erst,
wenn pro Branche ein echter Case existiert (siehe `seo-map.md`).

## 3. CTA-Hierarchie

| Stufe | Label | Ziel | Wo |
|---|---|---|---|
| **Primär** (violett) | Strategie-Call buchen | `/strategie-call` | Header, Hero, Abschlussblock jeder Seite |
| Sekundär (kontextuell, schwarz) | Content Day anfragen | `/kontakt?anliegen=content-day` | Studio, Content, Content Day |
| | Recruiting besprechen | `/kontakt?anliegen=recruiting` | Social Recruiting |
| | Studio anfragen | `/kontakt?anliegen=podcast-studio` | Podcast-Studio |
| | Website-Projekt besprechen | `/kontakt?anliegen=website` | Webdesign |
| | CRM-Projekt besprechen | `/kontakt?anliegen=crm` | CRM & Automation |
| Tertiär | Textlinks («Case lesen», «Leistung ansehen») | intern | überall |

Regel: pro Viewport maximal eine primäre und eine sekundäre Handlung.
Alle Anfragen laufen in **ein** Formular mit vorgewähltem Anliegen (eine Integration später).

## 4. Sitemap

```
/                                   Home
/leistungen                         Leistungen (Index + System)
  /performance-marketing            Performance Marketing
    /performance-marketing/meta-ads     Meta Ads (Facebook, Instagram)
    /performance-marketing/google-ads   Google Ads
  /content-produktion               Content-Produktion
  /content-day                      Content Day (Produkt mit Preisen)
  /podcast-studio                   Podcast-Studio (Produkt mit Preisen)
  /social-media                     Social Media
  /webdesign                        Webdesign & Development
  /seo                              SEO
  /ai-search                        AEO / AI Search
  /crm-automation                   CRM & Automation
  /social-recruiting                Social Recruiting (Produkt CHF 5'900)
/pakete                             Pro & Advanced + Einzelprodukte
/cases                              Arbeiten & Cases
  /cases/[slug]                     Case-Detail (nur mit echten Daten)
/insights                           Insights (Wissen, Cases, Anleitungen)
  /insights/[slug]
/ueber-uns                          Team, Arbeitsweise, Standort
/marketingagentur-zuerich           Standort Kanton Zürich (Neerach), Studio-Besuch
/rechner                            Potenzialrechner (bestehendes Tool, neu gestaltet)
/strategie-call                     Hauptconversion: Termin
/kontakt                            Kontakt + Anfrage (Anliegen vorwählbar)
/impressum  /datenschutz  /agb
```

Flache, kurze URLs für Produkte (gut für Ads, Instagram-Bio, Offline).
Breadcrumbs bilden trotzdem die logische Hierarchie ab (Home › Leistungen › Meta Ads).

## 5. Navigation

Desktop (6 Punkte + CTA):
`Leistungen ▾` · `Studio ▾` · `Cases` · `Pakete` · `Über uns` · `Insights` · **[● Strategie-Call]**

- **Leistungen ▾** (Mega-Panel, drei Gruppen nach der System-Logik):
  - *Nachfrage erzeugen:* Performance Marketing, Meta Ads, Google Ads, Social Media
  - *Gefunden werden:* SEO, AEO / AI Search
  - *Infrastruktur:* Webdesign & Development, CRM & Automation
  - *Produkt:* Social Recruiting
- **Studio ▾**: Content-Produktion, Content Day, Podcast-Studio. Eigener Hauptpunkt, weil
  Produktion das sichtbarste Unterscheidungsmerkmal ist und dort drei verkaufsfähige
  Produkte mit Preisen liegen.
- Mobile: Logo · «Call buchen» (kompakt) · Menü. Menü = schwarzes Vollbild-Sheet
  (Studio-Modus) mit grossen Links, Gruppen aufklappbar, Kontakt direkt (Telefon, E-Mail).

Footer: alle Leistungen, Studio, Cases, Insights, Standort, Kontakt, Rechtliches, Socials.

## 6. Homepage-Dramaturgie

Was muss ein Besucher zuerst sehen? **Wer, was, Beweis, in 5 Sekunden.**

| # | Moment | Modus | Zweck |
|---|---|---|---|
| 1 | Hero: Aussage + Kontaktabzug echter Ad-Videos + Kundenlogos | Office | Wer/Was/Beweis sofort |
| 2 | Manifest: durchgestrichene Schubladen → «Ein System» | Office, Typo | Positionierung |
| 3 | Die Timeline: 8 Stationen × 5 Spuren, Playhead | Office, Raster | System erklären |
| 4 | Featured Case (grösste belegte Zahl zuerst) | Office | Proof, früh |
| 5 | Video-Testimonial / Kundenstimme gross | Studio | Vertrauen, Mensch |
| 6 | Leistungs-Index 01–07 mit Hover-Vorschau | Office | Orientierung, SEO-Links |
| 7 | Studio: Content Day + Podcast als Preisliste | Studio | Produkte verkaufen |
| 8 | Pakete Pro / Advanced als Datenblatt | Office | Preise transparent |
| 9 | Social Recruiting | Office | Produkt |
| 10 | Menschen: Claudio, Fabian, Ricardo | Office | Persönlichkeit |
| 11 | Insights als Index | Office | Autorität |
| 12 | Abschluss: violetter Block, Call mit Gesichtern | Violett | Conversion |

Proof ist nie weiter als zwei Scrolls entfernt: Logos im Hero, Case an Position 4,
Kundenstimme an 5, Recruiting-Video an 9, Stimme vor dem Abschluss.
