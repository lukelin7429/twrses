# 第十一課：春聯上的「春」「福」（楷書，自己畫的中心線＋壓力；筆順、筆數依教育部《國字標準字體筆順學習網》）。
# 用法：python3 couplet_chars.py <輸出資料夾 src/strokes> [檢查圖.png]
import json, sys, re
OUT = sys.argv[1]; CHK = sys.argv[2] if len(sys.argv) > 2 else None
V = {"in": 90, "go": 250, "turn": 105, "out": 130, "fast": 330}
def S(n, en, zh, pts):
    """pts: [(x, y, 壓力, 種類)]；頭尾自動放輕"""
    o = [[x, y, (0.02 if i in (0, len(pts) - 1) else p), V[k]] for i, (x, y, p, k) in enumerate(pts)]
    n_in = next((i for i, q in enumerate(pts) if q[3] != "in" and i > 0), 1)
    return {"n": n, "en": en, "zh": zh, "pts": o, "phases": [max(1, n_in), max(n_in + 1, len(pts) - 2)]}
def heng(n, x0, y0, x1, y1, p=0.36, end=None, en="Horizontal", zh="橫"):
    end = end or p + 0.12; dx, dy = x1 - x0, y1 - y0
    return S(n, en, zh, [(x0 + 14, y0 - 12, 0, "in"), (x0, y0, p + 0.1, "in"), (x0 + 0.14 * dx, y0 + 0.14 * dy + 3, p, "go"), (x0 + 0.5 * dx, y0 + 0.5 * dy - 2, p - 0.03, "go"),
                         (x0 + 0.88 * dx, y0 + 0.88 * dy, p, "go"), (x1 - 4, y1 + 4, end, "turn"), (x1 - 2, y1 + 16, end - 0.06, "out"), (x1 - 20, y1 + 12, 0, "out")])
def shu(n, x0, y0, x1, y1, p=0.38, tip=False, en="Vertical", zh="豎"):
    dx, dy = x1 - x0, y1 - y0
    pts = [(x0 - 12, y0 - 10, 0, "in"), (x0, y0, p + 0.12, "in"), (x0 + 0.12 * dx + 3, y0 + 0.12 * dy, p, "go"), (x0 + 0.5 * dx, y0 + 0.5 * dy, p - 0.02, "go"), (x0 + 0.86 * dx, y0 + 0.86 * dy, p, "go")]
    pts += [(x1, y1 - 14, 0.2, "fast"), (x1, y1 + 6, 0, "out")] if tip else [(x1, y1 - 6, p + 0.1, "turn"), (x1 - 6, y1 + 4, 0.3, "out"), (x1 - 12, y1 - 8, 0, "out")]
    return S(n, en, zh, pts)
def dian(n, x0, y0, x1, y1, p=0.5, en="Dot", zh="點"):
    return S(n, en, zh, [(x0 - 8, y0 - 10, 0, "in"), (x0, y0, 0.22, "in"), ((x0 + x1) / 2, (y0 + y1) / 2, p - 0.08, "go"), (x1, y1, p + 0.1, "turn"), (x1 - 10, y1 + 12, 0.3, "out"), (x1 - 22, y1 + 4, 0, "out")])
def slow(st, k):   # 很短的筆畫：放慢一點（一筆至少寫 1 秒）
    st["pts"] = [[x, y, p, round(v * k)] for x, y, p, v in st["pts"]]; return st
C = {}
C["chun"] = ("春", "spring", 26149, [
  heng(1, 292, 214, 690, 192, p=0.34),
  heng(2, 300, 338, 668, 318, p=0.33),
  heng(3, 168, 470, 806, 436, p=0.38, end=0.52),
  S(4, "Left-falling", "撇", [(468, 66, 0, "in"), (480, 84, 0.5, "in"), (472, 200, 0.44, "go"), (446, 330, 0.42, "go"), (392, 468, 0.4, "go"), (300, 600, 0.34, "go"), (176, 700, 0.2, "fast"), (58, 748, 0, "out")]),
  S(5, "Right-falling", "捺", [(506, 420, 0, "in"), (524, 440, 0.2, "in"), (590, 510, 0.32, "go"), (690, 600, 0.46, "go"), (790, 668, 0.62, "go"), (862, 700, 0.72, "turn"), (920, 706, 0.36, "out"), (962, 704, 0, "out")]),
  shu(6, 352, 600, 356, 918, p=0.36),
  S(7, "Horizontal-turn-hook", "橫折鉤", [(350, 606, 0, "in"), (364, 614, 0.34, "in"), (470, 596, 0.34, "go"), (590, 578, 0.36, "go"), (628, 584, 0.56, "turn"), (626, 640, 0.42, "go"), (622, 780, 0.4, "go"), (620, 900, 0.42, "go"), (618, 934, 0.5, "turn"), (590, 912, 0.24, "fast"), (562, 884, 0, "out")]),
  heng(8, 374, 742, 598, 724, p=0.3, end=0.34),
  heng(9, 374, 880, 600, 862, p=0.3, end=0.36),
])
C["fu"] = ("福", "good fortune", 31119, [
  dian(1, 252, 118, 356, 204, p=0.5),
  S(2, "Horizontal, left-falling", "橫撇", [(112, 360, 0, "in"), (126, 374, 0.42, "in"), (220, 336, 0.34, "go"), (330, 292, 0.36, "go"), (408, 268, 0.5, "turn"), (398, 322, 0.46, "go"), (318, 436, 0.4, "go"), (204, 566, 0.3, "go"), (120, 640, 0.16, "fast"), (62, 680, 0, "out")]),
  shu(3, 294, 470, 292, 884, p=0.4),
  slow(dian(4, 336, 548, 428, 618, p=0.44), 0.85),
  heng(5, 502, 208, 806, 176, p=0.34),
  slow(shu(6, 536, 306, 564, 462, p=0.34, tip=True), 0.75),
  S(7, "Horizontal-turn", "橫折", [(540, 318, 0, "in"), (556, 326, 0.32, "in"), (660, 296, 0.32, "go"), (776, 262, 0.34, "go"), (826, 272, 0.54, "turn"), (812, 330, 0.4, "go"), (786, 410, 0.3, "out"), (780, 428, 0, "out")]),
  heng(8, 580, 444, 792, 420, p=0.3, end=0.34),
  shu(9, 482, 532, 510, 812, p=0.36, tip=True),
  S(10, "Horizontal-turn-hook", "橫折鉤", [(490, 544, 0, "in"), (508, 552, 0.34, "in"), (640, 522, 0.34, "go"), (800, 488, 0.36, "go"), (868, 478, 0.4, "go"), (912, 492, 0.58, "turn"), (906, 580, 0.44, "go"), (892, 720, 0.42, "go"), (876, 848, 0.46, "go"), (868, 880, 0.5, "turn"), (842, 842, 0.24, "fast"), (818, 790, 0, "out")]),
  heng(11, 524, 668, 858, 634, p=0.28, end=0.3),
  shu(12, 668, 540, 676, 770, p=0.32, tip=True),
  heng(13, 530, 792, 848, 772, p=0.32, end=0.38),
])
for key, (ch, en, moe, strokes) in C.items():
    for st in strokes: st["pts"] = [[round(x), round(y), round(p, 2), v] for x, y, p, v in st["pts"]]
    d = {"char": ch, "key": key, "en": en, "box": 1000, "count": len(strokes),
         "order_src": f"教育部《國字標準字體筆順學習網》：「{ch}」共 {len(strokes)} 畫（dictView.jsp?ID={moe}）",
         "drawn_by": "人師教育協會自繪：中心線＋每一點的壓力與速度（楷書）", "strokes": strokes}
    J = lambda v: json.dumps(v, ensure_ascii=False, separators=(', ', ': '))
    L = ['{'] + [f'  {J(k)}: {J(d[k])},' for k in d if k != "strokes"] + ['  "strokes": [']
    L += ['    ' + J(st) + (',' if i < len(strokes) - 1 else '') for i, st in enumerate(strokes)] + ['  ]', '}']
    open(f"{OUT}/{key}.json", "w", encoding="utf-8").write("\n".join(L) + "\n"); json.load(open(f"{OUT}/{key}.json"))
if CHK:
    from PIL import Image, ImageDraw
    W = Image.new("RGB", (1040, 520), (200, 40, 40))
    for i, key in enumerate(C):
        g = ImageDraw.Draw(W); ox = i * 520
        for st in C[key][3]:
            P = st["pts"]
            for a, b in zip(P, P[1:]):
                n = max(2, int(((b[0]-a[0])**2 + (b[1]-a[1])**2) ** .5 / 3))
                for j in range(n + 1):
                    u = j / n; x = a[0] + (b[0]-a[0]) * u; y = a[1] + (b[1]-a[1]) * u; p = a[2] + (b[2]-a[2]) * u
                    if p < 0.01: continue
                    r = (6 + 112 * p ** 1.12) / 2 * 0.52
                    g.ellipse([ox + x * .52 - r, y * .52 - r, ox + x * .52 + r, y * .52 + r], fill=(20, 18, 16))
    W.save(CHK)
print("ok")
