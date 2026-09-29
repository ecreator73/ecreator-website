# Migration Map · ecreator.ch → neue Website

Stand: 29.09.2026 · Grundlage: Live-Sitemap (Yoast, 16 URLs), HTTP-Tests der Live-Site, `_research/p1-seo-audit.md` §1.2 und §5.
Umsetzung der Weiterleitungen: `next.config.ts` (`redirects()`), Status **308 Permanent Redirect** (von Google wie 301 behandelt), jeweils **ein Sprung**.
URL-Schema neu: ohne Schrägstrich am Ende. Alte Formen mit Schrägstrich werden direkt auf das Ziel geleitet.

## 1. Seiten der Live-Sitemap

| Bestehende URL | Neue URL | Entscheid | 301/308 nötig | Begründung |
|---|---|---|---|---|
| `/` | `/` | beibehalten | nein | Startseite, einziger nachgewiesener Backlink (naechstenpflege.ch) |
| `/unsere-leistungen/` | `/leistungen` | ändern | **ja** | Sichtbarste URL in Brand-Suchen. Neuer Hub mit eigenen Detailseiten je Leistung |
| `/webseite-erstellen-lassen/` | `/webdesign` | ändern | **ja** | Keyword «Webdesign Schweiz/Zürich», Seite war Canvas-LP ohne Navigation und mit Titel-Duplikat. Keyword «Webseite erstellen lassen» wird auf `/webdesign` als Formulierung aufgenommen |
| `/ueber-uns/` | `/ueber-uns` | beibehalten | nur Slash-Form | Kernseite |
| `/kontakt/` | `/kontakt` | beibehalten | nur Slash-Form | Formular-Ziel, evtl. Ads-Final-URL |
| `/termin-buchen/` | `/strategie-call` | ändern | **ja** | Hauptconversion bekommt sprechenden Namen. `/strategie-call/` war bisher in Schema/Canonical referenziert, aber 404 |
| `/rechner/` | `/rechner` | beibehalten, neu gebaut | nur Slash-Form | Tool mit korrigierter Formel (FACTS N24), ohne Lead-Gate |
| `/produkt-rechner/` | – | **entfernt, 410 Gone** | nein (410) | Interne Seite, wird nicht migriert |
| `/blogs/` | `/insights` | ändern | **ja** | Wissensbereich statt «Blog» |
| `/category/blog/` | `/insights` | entfernen | **ja** | Einzige Kategorie, Duplikat |
| `/author/itmanager/` | `/ueber-uns` | entfernen | **ja** | WordPress-Login-Name, kein Autor |
| `/600-leads-in-3-monaten-a-10-chf-case-study-asset-management/` | `/cases/finanzdienstleister-lead-generierung` | ändern | **ja** | Case wandert in die Case-Struktur. Slug ohne Kundennamen, solange keine Freigabe vorliegt |
| `/von-0-auf-50-anfragen-monat/` | `/insights/performance-ads-kleines-budget` | ändern | **ja** | Anonymer «Praxisbericht» mit Rechenfehlern (FACTS N16, N19, N20) wird zum Ratgeber ohne unbelegten Fall |
| `/ohne-sauberes-tracking-verbrennst-du-werbebudget-so-fixst-du-es/` | `/insights/tracking-werbebudget` | ändern | **ja** | Einzige Content-URL mit SERP-Sichtbarkeit. Inhalt überarbeitet (FACTS N34) |
| `/impressum/` | `/impressum` | beibehalten | nur Slash-Form | robots.txt-Sperre der Live-Site entfällt |
| `/datenschutz/` | `/datenschutz` | beibehalten | nur Slash-Form | Inhalt vor Livegang juristisch prüfen |
| `/agb/` | `/agb` | beibehalten | nur Slash-Form | |

## 2. Referenzierte, bisher tote URLs (Sicherheitsnetz)

Diese URLs lieferten 404, wurden aber intern verlinkt oder in Canonicals/JSON-LD genannt (Google kann sie kennen):

| URL | Ziel | Grund |
|---|---|---|
| `/about`, `/about/` | `/ueber-uns` | «Mehr»-Buttons und Partner-Logos auf /ueber-uns/ |
| `/strategie-call/` | `/strategie-call` | jetzt echte Seite |
| `/blog/`, `/blog` | `/insights` | heute 301 → /blogs/ |
| `/blog/case-study-asset-management-600-leads/` | `/cases/finanzdienstleister-lead-generierung` | Body-Canonical/JSON-LD |
| `/blog/asset-management-600-leads/` | `/cases/finanzdienstleister-lead-generierung` | Body-Canonical/JSON-LD |
| `/blog/schweizer-kmu-50-anfragen-3000-chf/` | `/insights/performance-ads-kleines-budget` | Body-Canonical/JSON-LD |
| `/blog/tracking-werbebudget/` | `/insights/tracking-werbebudget` | Body-Canonical/JSON-LD |
| `/blogs/page/2/` | `/insights` | Archiv |
| `/page/2/` | `/` | Startseiten-Duplikat |
| `/2026/`, `/2026/02/` | `/insights` | Datumsarchive |
| `/feed/`, `/comments/feed/` | `/insights` | Feeds entfallen (optional später RSS) |

## 3. Nicht in der Next.js-App lösbar (Hosting/DNS, beim Go-live)

| Thema | Heute | Soll |
|---|---|---|
| `http://ecreator.ch/` | 307 → 307 (zwei temporäre Sprünge) | **ein** 301 auf `https://www.ecreator.ch/` |
| `https://ecreator.ch/` | 307 | 301 auf `https://www.ecreator.ch/` |
| WordPress-Kurzlinks `/?p=2507`, `/?page_id=…`, `/?author=1` | 301 auf WP-URLs | optional am Hosting auf neue Ziele leiten, sonst 404 |
| `/wp-content/uploads/…` (OG-Bild, Logos, Case-Bilder) | 200 | für geteilte Links optional wichtigste Bilder weiterleiten |
| `/wp-login.php`, `/wp-json/`, `/xmlrpc.php` | erreichbar | entfallen mit WordPress |

## 4. Sofort auf der Live-Site (unabhängig vom Relaunch)

1. Den kaputten LinkedIn-Link (`/company/ecreator` → 404) und den Bewertungslink auf /kontakt/ (`g.page/r/ecreator-bewertung`) ersetzen.

## 5. Vor dem Go-live prüfen

- Google Search Console: Berichte «Seiten» (16 Monate) und «Links» exportieren. Jede URL mit Klicks oder Backlinks muss hier stehen.
- Final-URLs aus Google Ads, Meta Ads und TikTok Ads exportieren. Falls Kampagnen auf alte URLs zeigen: auf die neuen Ziele umstellen (Weiterleitungen würden funktionieren, kosten aber Ladezeit und können Parameter verlieren).
- Nach Livegang: neue Sitemap einreichen, 404-Bericht 4 Wochen lang wöchentlich prüfen, Weiterleitungen mindestens 12 Monate aktiv lassen.

## 6. Test

Lokal geprüft mit `curl -I` gegen den Dev-Server (siehe README, Abschnitt QA): jede alte URL, mit und ohne Schrägstrich, liefert 308 mit genau einem Sprung auf die Ziel-URL; `/produkt-rechner` liefert 410.
