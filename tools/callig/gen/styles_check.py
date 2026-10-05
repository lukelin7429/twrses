import json, sys
from PIL import Image, ImageDraw
REF, J, OUT = sys.argv[1:4]
d = json.load(open(J)); FILES = {"yan": "yan-duobao-%s.png", "liu": "liu-xuanmi-%s.png"}
tiles = []
for key, c in d["chars"].items():
    for who in ("yan", "liu"):
        im = Image.open(f"{REF}/" + FILES[who] % c["char"]).convert("RGB").resize((1000, 1000))
        ov = Image.new("RGBA", (1000, 1000), (0, 0, 0, 0)); g = ImageDraw.Draw(ov)
        cx, cy, k = c[who]["xf"]
        for st in c[who]["strokes"]:
            P = st["pts"]
            for a, b in zip(P, P[1:]):
                n = max(2, int(((b[0]-a[0])**2 + (b[1]-a[1])**2) ** .5 / 4))
                for i in range(n + 1):
                    u = i / n; x = a[0] + (b[0]-a[0]) * u; y = a[1] + (b[1]-a[1]) * u; p = a[2] + (b[2]-a[2]) * u
                    r = (6 + 112 * p ** 1.12) / 2 / k
                    X = cx + (x - 500) / k; Y = cy + (y - 500) / k
                    g.ellipse([X - r, Y - r, X + r, Y + r], fill=(255, 0, 0, 255))
        ov.putalpha(ov.split()[3].point(lambda v: 110 if v else 0))
        im = Image.alpha_composite(im.convert("RGBA"), ov).convert("RGB").resize((520, 520))
        tiles.append(im)
W = Image.new("RGB", (520 * 2, 520 * (len(tiles) // 2)))
for i, t in enumerate(tiles): W.paste(t, ((i % 2) * 520, (i // 2) * 520))
W.save(OUT)
