"""Full-page Screenshots + Slices fuer die visuelle Pruefung.
Usage: python scripts/shoot.py <base_url> <out_dir> <path> [<path> ...]  (env WIDTHS="1440,390")"""
import asyncio, os, sys
from playwright.async_api import async_playwright
from PIL import Image
Image.MAX_IMAGE_PIXELS = None
base, out, paths = sys.argv[1], sys.argv[2], sys.argv[3:]
widths = [int(w) for w in os.environ.get("WIDTHS", "1440,390").split(",")]
os.makedirs(out, exist_ok=True)
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for w in widths:
            ctx = await b.new_context(viewport={"width": w, "height": 900 if w > 800 else 844}, device_scale_factor=1)
            pg = await ctx.new_page()
            errs = []
            pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
            pg.on("pageerror", lambda e: errs.append(str(e)))
            for path in paths:
                name = (path.strip("/").replace("/", "_") or "home") + f"_{w}"
                await pg.goto(base + path, wait_until="load", timeout=90000)
                await pg.wait_for_timeout(1200)
                H = await pg.evaluate("document.documentElement.scrollHeight"); y = 0
                while y < H:
                    await pg.evaluate(f"window.scrollTo(0,{y})"); await pg.wait_for_timeout(90); y += 500
                    H = await pg.evaluate("document.documentElement.scrollHeight")
                await pg.wait_for_timeout(900)
                await pg.evaluate("window.scrollTo(0,0)"); await pg.wait_for_timeout(700)
                ow = await pg.evaluate("document.documentElement.scrollWidth")
                HH = await pg.evaluate("document.documentElement.scrollHeight")
                step = 1800 if w > 800 else 1600
                for i, y0 in enumerate(range(0, HH, step)):
                    h = min(step, HH - y0)
                    f = os.path.join(out, f"{name}_{i:02d}.png")
                    await pg.screenshot(path=f, full_page=True, clip={"x": 0, "y": y0, "width": w, "height": h})
                    c = Image.open(f)
                    if w > 800: c = c.resize((w // 2, h // 2))
                    c.convert("RGB").save(f[:-4] + ".jpg", quality=72); os.remove(f)
                print(f"{path} w={w} H={HH} overflowX={ow > w} ({ow}) errors={len(errs)}")
                for e in errs[:5]: print("   ERR:", e[:300])
                errs.clear()
            await ctx.close()
        await b.close()
asyncio.run(main())
