"""Technische QA über alle Routen der Sitemap.

Prüft pro Route: HTTP-Status, genau eine H1, Title-Länge (<= 60), Description-Länge (120-165),
Canonical, og:title, JSON-LD-Typen, Bilder ohne alt, interne Links (Status), doppelte Titles/Descriptions,
Overflow bei 320/360/390/768/1024/1440 px, Konsolenfehler, Weiterleitungen der Alt-URLs.
Schreibt docs/qa/qa-report.md und docs/qa/qa-report.json.

Usage: python scripts/qa.py [base_url]   (Default http://localhost:3101)
"""
import asyncio, json, os, re, sys, urllib.request, urllib.error
from html.parser import HTMLParser

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3101"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "docs", "qa")
WIDTHS = [320, 360, 390, 768, 1024, 1440]

LEGACY = {
    "/unsere-leistungen/": "/leistungen",
    "/webseite-erstellen-lassen/": "/webdesign",
    "/termin-buchen/": "/strategie-call",
    "/600-leads-in-3-monaten-a-10-chf-case-study-asset-management/": "/cases/finanzdienstleister-lead-generierung",
    "/von-0-auf-50-anfragen-monat/": "/insights/performance-ads-kleines-budget",
    "/ohne-sauberes-tracking-verbrennst-du-werbebudget-so-fixst-du-es/": "/insights/tracking-werbebudget",
    "/blogs/": "/insights",
    "/category/blog/": "/insights",
    "/author/itmanager/": "/ueber-uns",
    "/about": "/ueber-uns",
    "/kontakt/": "/kontakt",
    "/ueber-uns/": "/ueber-uns",
}


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *a, **k):
        return None


opener = urllib.request.build_opener(NoRedirect)


def fetch(path, follow=True):
    url = BASE + path
    try:
        if follow:
            with urllib.request.urlopen(url, timeout=120) as r:
                return r.status, r.read().decode("utf-8", "replace"), r.headers
        with opener.open(url, timeout=120) as r:
            return r.status, "", r.headers
    except urllib.error.HTTPError as e:
        return e.code, "", e.headers


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.h1 = 0
        self.title = ""
        self._in_title = False
        self.desc = None
        self.canonical = None
        self.og_title = None
        self.jsonld = []
        self._in_ld = False
        self._ld = ""
        self.img_no_alt = []
        self.links = set()

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "h1":
            self.h1 += 1
        elif tag == "title":
            self._in_title = True
        elif tag == "meta":
            if a.get("name") == "description":
                self.desc = a.get("content", "")
            if a.get("property") == "og:title":
                self.og_title = a.get("content")
        elif tag == "link" and a.get("rel") == "canonical":
            self.canonical = a.get("href")
        elif tag == "script" and a.get("type") == "application/ld+json":
            self._in_ld = True
            self._ld = ""
        elif tag == "img":
            if "alt" not in a:
                self.img_no_alt.append(a.get("src", "?"))
        elif tag == "a":
            h = a.get("href") or ""
            if h.startswith("/") and not h.startswith("//"):
                self.links.add(h.split("#")[0].split("?")[0] or "/")

    def handle_endtag(self, tag):
        if tag == "title":
            self._in_title = False
        if tag == "script" and self._in_ld:
            self._in_ld = False
            try:
                d = json.loads(self._ld)
                t = d.get("@type")
                self.jsonld.append(t if isinstance(t, str) else "+".join(t))
            except Exception:
                self.jsonld.append("INVALID")

    def handle_data(self, data):
        if self._in_title:
            self.title += data
        if self._in_ld:
            self._ld += data


def routes_from_sitemap():
    st, body, _ = fetch("/sitemap.xml")
    locs = re.findall(r"<loc>([^<]+)</loc>", body)
    out = []
    for l in locs:
        p = re.sub(r"^https?://[^/]+", "", l) or "/"
        out.append(p)
    return out


async def browser_checks(routes):
    from playwright.async_api import async_playwright

    res = {}
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for w in WIDTHS:
            ctx = await b.new_context(viewport={"width": w, "height": 900})
            pg = await ctx.new_page()
            errs = []
            pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
            pg.on("pageerror", lambda e: errs.append(str(e)))
            for r in routes:
                errs.clear()
                try:
                    await pg.goto(BASE + r, wait_until="load", timeout=90000)
                    await pg.wait_for_timeout(400)
                    sw = await pg.evaluate("document.documentElement.scrollWidth")
                except Exception as e:
                    sw = -1
                    errs.append(f"navigation: {e}")
                res.setdefault(r, {})[w] = {"overflow": sw > w, "scrollWidth": sw, "errors": list(errs)}
            await ctx.close()
        await b.close()
    return res


def main():
    os.makedirs(OUT, exist_ok=True)
    routes = routes_from_sitemap()
    report = {"base": BASE, "routes": {}, "links": {}, "legacy": {}, "dupes": {}}
    titles, descs = {}, {}
    all_links = set()
    for r in routes:
        st, body, _ = fetch(r)
        pp = Page()
        pp.feed(body)
        t = pp.title.strip()
        d = (pp.desc or "").strip()
        titles.setdefault(t, []).append(r)
        descs.setdefault(d, []).append(r)
        all_links |= pp.links
        issues = []
        if st != 200:
            issues.append(f"status {st}")
        if pp.h1 != 1:
            issues.append(f"{pp.h1} H1")
        if len(t) > 60:
            issues.append(f"title {len(t)} Zeichen")
        if not (120 <= len(d) <= 165):
            issues.append(f"description {len(d)} Zeichen")
        if not pp.canonical:
            issues.append("kein canonical")
        if pp.img_no_alt:
            issues.append(f"{len(pp.img_no_alt)} img ohne alt")
        if "INVALID" in pp.jsonld:
            issues.append("ungültiges JSON-LD")
        if re.search(r"[—–]\s", re.sub(r"<[^>]+>", " ", body.split("<main", 1)[-1].split("</main>")[0])):
            issues.append("Gedankenstrich im sichtbaren Text")
        if "ß" in re.sub(r"<[^>]+>", " ", body.split("<main", 1)[-1]):
            issues.append("ß im Text")
        report["routes"][r] = {
            "status": st, "h1": pp.h1, "title": t, "titleLen": len(t), "description": d, "descLen": len(d),
            "canonical": pp.canonical, "ogTitle": pp.og_title, "jsonld": pp.jsonld, "issues": issues,
        }
    report["dupes"] = {
        "titles": {k: v for k, v in titles.items() if len(v) > 1},
        "descriptions": {k: v for k, v in descs.items() if len(v) > 1},
    }
    for l in sorted(all_links):
        st, _, h = fetch(l, follow=False)
        report["links"][l] = st
    for old, new in LEGACY.items():
        st, _, h = fetch(old, follow=False)
        loc = (h.get("location") if h else None) or ""
        loc = re.sub(r"^https?://[^/]+", "", loc)
        report["legacy"][old] = {"status": st, "location": loc, "ok": st in (301, 308) and loc == new}
    st, _, _ = fetch("/produkt-rechner", follow=False)
    report["legacy"]["/produkt-rechner"] = {"status": st, "ok": st == 410}

    report["browser"] = asyncio.run(browser_checks(routes))

    json.dump(report, open(os.path.join(OUT, "qa-report.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)

    lines = [f"# QA-Report\n\nBasis: `{BASE}` · {len(routes)} Routen aus der Sitemap\n", "## Seiten\n",
             "| Route | Status | H1 | Title (Zeichen) | Description (Zeichen) | JSON-LD | Probleme |", "|---|---|---|---|---|---|---|"]
    for r, v in report["routes"].items():
        lines.append(f"| `{r}` | {v['status']} | {v['h1']} | {v['titleLen']} | {v['descLen']} | {', '.join(v['jsonld'])} | {'; '.join(v['issues']) or 'ok'} |")
    lines += ["\n## Doppelte Titles / Descriptions\n", f"```\n{json.dumps(report['dupes'], ensure_ascii=False, indent=1)}\n```"]
    bad_links = {k: v for k, v in report["links"].items() if v != 200}
    lines += ["\n## Interne Links\n", f"{len(report['links'])} geprüft, nicht 200: " + (", ".join(f'`{k}` ({v})' for k, v in bad_links.items()) or "keine")]
    lines += ["\n## Weiterleitungen alter URLs\n", "| Alt | Status | Ziel | ok |", "|---|---|---|---|"]
    for k, v in report["legacy"].items():
        lines.append(f"| `{k}` | {v['status']} | `{v.get('location','')}` | {'ja' if v['ok'] else 'NEIN'} |")
    lines += ["\n## Browser (Overflow / Konsole)\n", "| Route | " + " | ".join(f"{w}px" for w in WIDTHS) + " |", "|---|" + "---|" * len(WIDTHS)]
    for r, byw in report["browser"].items():
        cells = []
        for w in WIDTHS:
            x = byw.get(w, {})
            c = "ok"
            if x.get("overflow"):
                c = f"OVERFLOW {x.get('scrollWidth')}"
            if x.get("errors"):
                c += f" / {len(x['errors'])} Fehler"
            cells.append(c)
        lines.append(f"| `{r}` | " + " | ".join(cells) + " |")
    open(os.path.join(OUT, "qa-report.md"), "w", encoding="utf-8").write("\n".join(lines) + "\n")
    n_issues = sum(1 for v in report["routes"].values() if v["issues"])
    n_over = sum(1 for byw in report["browser"].values() for x in byw.values() if x.get("overflow"))
    n_err = sum(1 for byw in report["browser"].values() for x in byw.values() if x.get("errors"))
    print(f"routes={len(routes)} routeIssues={n_issues} badLinks={len(bad_links)} overflow={n_over} consoleErrors={n_err}")


if __name__ == "__main__":
    main()
