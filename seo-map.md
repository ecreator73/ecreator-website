# SEO Map

Stand: 29.09.2026. Grundlage: `_research/p1-seo-audit.md` (Audit der Live-Site), `_research/p1-market-scan.md` (Wettbewerb), `docs/POSITIONING-IA.md`.
Tatsächliche Titles und Descriptions je Route: siehe Abschnitt 6 (aus dem Code extrahiert, `scripts/qa.py`).

## 1. Ausgangslage

- Die Live-Site ist nur für Brand-Suchen sichtbar. Für keines der Ziel-Keywords erscheint ecreator.ch (Stichprobe, WebSearch, US-basiert, als Indiz).
- Es gab keine Leistungs-Detailseiten; 5 von 6 Leistungen existierten nur als JavaScript-Tabs.
- Domain und GmbH sind jung (HR-Eintrag 26.02.2026). Ein nachgewiesener Backlink (naechstenpflege.ch).
- Namensverwechslung mit «eCreator Studio» und «ECREATOR LTD» möglich → saubere Entity (Organization-Schema mit `sameAs`, Google-Unternehmensprofil, LinkedIn) ist Pflicht.

## 2. Keyword → Seite

Eine Seite pro Suchintention. Keine Seite nur für ein Keyword-Variante.

| Keyword-Cluster (primär / sekundär) | Seite | Suchintention |
|---|---|---|
| Marketingagentur Schweiz / Marketingagentur KMU, Deutschschweiz | `/` | Anbieter finden |
| Marketingagentur Zürich / Marketingagentur Kanton Zürich, Zürcher Unterland | `/marketingagentur-zuerich` | Anbieter in der Region, ehrlich: Sitz Neerach |
| Performance Marketing Agentur Schweiz / Leadgenerierung, Tracking | `/performance-marketing` | Anbieter + Methode |
| Meta Ads Agentur Schweiz / Facebook Ads, Instagram Ads Agentur | `/performance-marketing/meta-ads` | Anbieter |
| Google Ads Agentur Schweiz / Google Werbung KMU | `/performance-marketing/google-ads` | Anbieter |
| Content Produktion Schweiz / Videoproduktion Social Media, UGC | `/content-produktion` | Anbieter |
| Content Day / Drehtag buchen, Social-Media-Videos Preis | `/content-day` | Produkt mit Preis |
| Podcast Studio mieten / Podcast-Aufnahme (Ort erst nach Bestätigung) | `/podcast-studio` | Produkt mit Preis |
| Social Media Agentur Schweiz / Social-Media-Betreuung | `/social-media` | Anbieter |
| Social Recruiting Schweiz / Mitarbeitende über Social Media finden | `/social-recruiting` | Produkt mit Preis |
| Webdesign Schweiz, Webdesign Zürich / Website erstellen lassen, Landingpage | `/webdesign` | Anbieter |
| SEO Agentur Schweiz, SEO Agentur Zürich / Local SEO, technisches SEO | `/seo` | Anbieter |
| AEO / AI Search Optimierung, Sichtbarkeit in ChatGPT, GEO | `/ai-search` | Anbieter + Erklärung |
| CRM Lösungen Schweiz / CRM Agentur, Marketing-Automation, Lead-Management | `/crm-automation` | Anbieter |
| Marketing Pakete KMU, Performance Marketing Preise | `/pakete` | Preisvergleich |
| Was ist AEO? | `/insights/was-ist-aeo` | Information (AEO-Ziel) |
| Meta Ads oder Google Ads | `/insights/meta-ads-oder-google-ads` | Information |
| Tracking Werbebudget, Conversion API, Server-Side Tracking | `/insights/tracking-werbebudget` | Information (bestehende Sichtbarkeit) |
| Performance Ads kleines Budget | `/insights/performance-ads-kleines-budget` | Information |
| Content Day vorbereiten | `/insights/content-day-vorbereiten` | Information → Produkt |
| Social Recruiting Ablauf | `/insights/social-recruiting-ablauf` | Information → Produkt |
| Werbebudget Rechner / Lead-Rechner | `/rechner` | Tool |

## 3. Bewusst nicht gebaut

- **Branchenseiten** (Treuhand, Versicherung, Immobilien, Bau, Pflege …): erst, wenn pro Branche ein freigegebener Case existiert. Ohne Beleg wären es dünne Seiten, die sich nur im Branchennamen unterscheiden. Kandidaten mit Material: Finanz (Case), Pflege (Spitex Nächstenpflege), Handwerk (Trapletti).
- **Stadtseiten** (Winterthur, Baden, Zug …): kein Standort, keine Kunden dort belegt.
- **Einzelseiten TikTok Ads / LinkedIn Ads**: als Abschnitte in Performance Marketing; eigene Seiten, wenn Referenzen vorliegen.
- **Podcast Studio Zürich**: Keyword erst verwenden, wenn der Studio-Standort bestätigt ist und tatsächlich im Raum Zürich liegt.

## 4. Technische Grundlage (umgesetzt)

| Element | Umsetzung |
|---|---|
| Titles / Descriptions | pro Route über `pageMeta()` (`src/lib/metadata.ts`), Template « · eCreator», eindeutig |
| Canonical | pro Route, ohne Schrägstrich am Ende, absolute Basis `https://www.ecreator.ch` |
| Open Graph / Twitter | pro Route; Sharing-Bild `src/app/opengraph-image.tsx` (1200×630) |
| Sitemap | `src/app/sitemap.ts` aus dem Routen-Register `src/content/routes.ts` |
| robots.txt | `src/app/robots.ts`: alles erlaubt ausser `/api/`, KI-Crawler ausdrücklich erlaubt |
| Sprache | `<html lang="de-CH">`, `og:locale de_CH` |
| Überschriften | genau eine H1 pro Seite, H2/H3 logisch |
| Breadcrumbs | sichtbar + `BreadcrumbList` (Komponente `Breadcrumbs`) |
| Structured Data | `Organization` + `ProfessionalService` (global, mit Adresse, UID, Gründern, `sameAs`), `WebSite`, `Service` (mit `Offer` wo Preis), `FAQPage` nur bei echten FAQ, `Article` für Insights und Cases, `Person` für das Team, `BreadcrumbList` |
| Keine Fake-Reviews | kein `AggregateRating` (die Google-Bewertung ist extern und wird nicht ins Schema übernommen) |
| Alt-Texte | beschreibend; dekorative Bilder `alt=""` |
| Weiterleitungen | siehe `migration-map.md` |
| Performance | statisch vorgerendert, Fonts lokal (`next/font`), Videos 8-s-Vorschauen (~250 KB) nur sichtbar, Bilder AVIF/WebP |

## 5. Interne Verlinkung

- **Hub → Spokes:** `/leistungen` verlinkt jede Leistung; Header-Mega-Menü und Footer verlinken alle Leistungen und Studio-Produkte.
- **Spoke → Spoke:** jede Leistungsseite hat `RelatedLinks` auf 2–4 Nachbarn entlang des Kreislaufs (z.B. Meta Ads → Content Day → Webdesign → CRM).
- **Insights → Leistung:** jeder Artikel verlinkt im Text und am Ende die passende Leistung (`related` in `insights.ts`).
- **Cases → Leistungen** über die Leistungs-Liste im Case-Kopf.
- **Alle Seiten → Conversion:** primär `/strategie-call`, kontextuell `/kontakt?anliegen=…`.
- Anker: `/performance-marketing#tracking` wird aus dem Kreislauf verlinkt.

## 6. AEO / AI Search

- Jede Leistungsseite beantwortet im Kopf in 1–2 Sätzen: *Was ist das, für wen, was kostet es (wenn bekannt)?*
- Definitionen als `Definition`-Baustein (z.B. AEO, Server-Side Tracking).
- FAQ-Antworten beginnen mit der direkten Antwort, danach Kontext.
- Konsistente Entitäten: Firmenname, Adresse, Telefon, Personen und Preise stehen zentral in `src/content/*` und sind überall gleich.
- `public/llms.txt`: kuratierte Übersicht der wichtigsten Seiten für Sprachmodelle.
- Autoren: vorerst «eCreator Redaktion». Sobald Claudio/Fabian/Ricardo Artikel freigeben, als `Person` mit Profil verknüpfen (E-E-A-T).

## 7. Offene SEO-Aufgaben (ausserhalb dieses Repos)

1. Google-Unternehmensprofil pflegen (Kategorie, Leistungen, Fotos, Bewertungen).
2. local.ch-Eintrag beanspruchen (FACTS S09).
3. Einträge in Agentur-Vergleichslisten (Markt-Scan: generische SERPs werden von Listen dominiert).
4. Google Search Console + Bing Webmaster Tools anmelden, Sitemap einreichen.
5. Backlinks: Credit-Links auf Kundenwebsites («Webseite bei eCreator») einheitlich auf `https://www.ecreator.ch/webdesign` setzen.
