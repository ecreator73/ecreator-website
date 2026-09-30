"""Kundenlogos und Partner-Badges für die Website aufbereiten.

Kundenlogos: einfarbig (#0B0B0C) auf transparent, weisse Details/Hintergründe ausgespart,
auf den Inhalt beschnitten, Höhe 120 px. Dazu eine Farbversion mit identischem Ausschnitt
(public/clients/color/, für den Hover-Zustand). Weisse Logos bekommen keine Farbversion
(sie werden beim Hover einfach schwarz). Partner-Badges: Originalfarben (offizielle Zeichen
nicht verändern), nur beschnitten und auf 120 px Höhe gebracht.

Usage: python scripts/logos.py   (liest _research/assets-live/clients + partners, schreibt public/clients + public/partners)
"""
import os
import sys

from PIL import Image, ImageChops

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "_research", "assets-live")
H = 120
INK = (11, 11, 12)

CLIENTS = {
    # Quelle (clients/) -> Ziel-Slug
    "asset-management-switzerland-ag__b2d78e3e-b30d-418e-81bd-809d02894fa5.png": "asset-management",
    "spitex-naechstenpflege__image-removebg-preview-1.png": "spitex-naechstenpflege",
    "novara-ag-immobilien__d8369cfe-6c91-4dad-85a9-05fd7bf13fe4-2.png": "novara",
    "arana-care__Design-ohne-Titel-19-1.png": "arana-care",
    "allianz__Design-ohne-Titel-17.png": "allianz",
    "126_logo_01-1.png": "babas-doener",
    "Swiss_Life_logo_logotype_SwissLife.png": "swiss-life",
    "image-CczCwWaa.png": "pkfinder",
    "images.png": "nobilis-estate",
    "logo-dark.png": "promacare",
}

PARTNERS = {
    "google-partner__google-partner-1.webp": "google-partner",
    "meta-business-partner__Met-Business-Partners.png": "meta-business-partner",
    "tiktok-marketing-partner__6819740a7d336611ab02b519_TikTok.png": "tiktok-marketing-partner",
}


def smoothstep(e0, e1, x):
    t = min(1.0, max(0.0, (x - e0) / (e1 - e0)))
    return t * t * (3 - 2 * t)


def mono(path):
    im = Image.open(path).convert("RGBA")
    px = im.load()
    w, h = im.size
    # Weisses Logo auf Transparenz (z.B. Baba's Döner): Form = Alpha
    lums = []
    for y in range(0, h, 3):
        for x in range(0, w, 3):
            r, g, b, a = px[x, y]
            if a > 200:
                lums.append((0.2126 * r + 0.7152 * g + 0.0722 * b) / 255)
    white_logo = lums and sum(lums) / len(lums) > 0.85 and any(px[x, y][3] < 50 for x in range(0, w, 7) for y in range(0, h, 7))
    out = Image.new("RGBA", (w, h))
    color = Image.new("RGBA", (w, h))
    op = out.load()
    cp = color.load()
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
            alpha = a if white_logo else a * (1 - smoothstep(0.82, 0.94, lum))
            op[x, y] = (*INK, int(alpha))
            cp[x, y] = (r, g, b, int(alpha))
    return out, (None if white_logo else color)


def bbox_of(im):
    return im.getchannel("A").point(lambda v: 255 if v > 12 else 0).getbbox()


def trim_badge(im):
    # Badges: auf Inhalt beschneiden (transparenter Rand oder weisser Rand)
    rgba = im.convert("RGBA")
    alpha_box = rgba.getchannel("A").point(lambda v: 255 if v > 12 else 0).getbbox()
    rgba = rgba.crop(alpha_box) if alpha_box else rgba
    bg = Image.new("RGBA", rgba.size, (255, 255, 255, 255))
    diff = ImageChops.difference(Image.alpha_composite(bg, rgba).convert("RGB"), bg.convert("RGB")).convert("L")
    box = diff.point(lambda v: 255 if v > 18 else 0).getbbox()
    return rgba.crop(box) if box else rgba


def fit(im):
    w = round(im.width * H / im.height)
    return im.resize((w, H), Image.LANCZOS)


def main():
    os.makedirs(os.path.join(ROOT, "public", "clients"), exist_ok=True)
    os.makedirs(os.path.join(ROOT, "public", "partners"), exist_ok=True)
    os.makedirs(os.path.join(ROOT, "public", "clients", "color"), exist_ok=True)
    for src, slug in CLIENTS.items():
        p = os.path.join(SRC, "clients", src)
        if not os.path.exists(p):
            print("fehlt", src, file=sys.stderr)
            continue
        m, c = mono(p)
        box = bbox_of(m)
        im = fit(m.crop(box))
        im.save(os.path.join(ROOT, "public", "clients", f"{slug}.png"), optimize=True)
        if c is not None:
            fit(c.crop(box)).save(os.path.join(ROOT, "public", "clients", "color", f"{slug}.png"), optimize=True)
        print(f"client {slug}: {im.width}x{im.height}{'' if c is not None else ' (weiss, keine Farbversion)'}")
    for src, slug in PARTNERS.items():
        im = fit(trim_badge(Image.open(os.path.join(SRC, "partners", src))))
        im.save(os.path.join(ROOT, "public", "partners", f"{slug}.png"), optimize=True)
        print(f"partner {slug}: {im.width}x{im.height}")


if __name__ == "__main__":
    main()
