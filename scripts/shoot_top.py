"""Viewport-Screenshots (nicht Full-Page) einer Route, optional nach Scroll."""
import asyncio, sys
from playwright.async_api import async_playwright
base, out, path = sys.argv[1], sys.argv[2], sys.argv[3]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for w, h in [(1440, 900), (390, 844)]:
            pg = await b.new_page(viewport={"width": w, "height": h})
            await pg.goto(base + path, wait_until="load", timeout=120000)
            await pg.wait_for_timeout(2500)
            await pg.screenshot(path=f"{out}_{w}.png")
            await pg.evaluate("window.scrollTo(0, 700)"); await pg.wait_for_timeout(900)
            await pg.screenshot(path=f"{out}_{w}_scrolled.png")
            ow = await pg.evaluate("document.documentElement.scrollWidth")
            print(w, "overflow" if ow > w else "ok")
            await pg.close()
        await b.close()
asyncio.run(main())
