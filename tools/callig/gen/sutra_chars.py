# 第十三課：抄經用的五個字「心、色、即、是、空」（楷書，自己畫的中心線＋壓力；筆順、筆數依教育部《國字標準字體筆順學習網》）。
# 用法：python3 sutra_chars.py <輸出資料夾 src/strokes> [檢查圖.png]   （小樣板 heng／shu／dian／slow 和 couplet_chars.py 一樣）
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
C["xin"] = ("心", "heart; mind", 24515, [
  S(1, "Left dot", "左點", [(176, 388, 0, "in"), (162, 408, 0.4, "in"), (142, 520, 0.4, "go"), (124, 606, 0.5, "turn"), (138, 624, 0.2, "out"), (150, 610, 0, "out")]),
  S(2, "Lying hook", "臥鉤", [(278, 394, 0, "in"), (294, 414, 0.42, "in"), (326, 548, 0.4, "go"), (410, 668, 0.44, "go"), (570, 720, 0.5, "go"), (750, 706, 0.54, "go"), (826, 678, 0.58, "turn"), (792, 600, 0.3, "fast"), (708, 508, 0, "out")]),
  dian(3, 404, 258, 518, 350, p=0.46),
  dian(4, 714, 284, 884, 430, p=0.52),
])
C["se"] = ("色", "form; color", 33394, [
  S(1, "Left-falling", "撇", [(398, 92, 0, "in"), (410, 108, 0.46, "in"), (360, 180, 0.4, "go"), (290, 254, 0.34, "go"), (220, 318, 0.18, "fast"), (184, 346, 0, "out")]),
  S(2, "Horizontal, left-falling", "橫撇", [(320, 250, 0, "in"), (336, 260, 0.36, "in"), (430, 224, 0.34, "go"), (540, 190, 0.36, "go"), (590, 190, 0.5, "turn"), (560, 262, 0.4, "go"), (480, 350, 0.28, "go"), (430, 394, 0.14, "fast"), (400, 414, 0, "out")]),
  S(3, "Horizontal-turn", "橫折", [(180, 432, 0, "in"), (196, 444, 0.36, "in"), (340, 410, 0.34, "go"), (500, 372, 0.36, "go"), (586, 354, 0.38, "go"), (646, 372, 0.56, "turn"), (630, 440, 0.42, "go"), (584, 540, 0.3, "out"), (566, 574, 0, "out")]),
  slow(shu(4, 386, 430, 376, 590, p=0.32, tip=True), 0.75),
  heng(5, 182, 614, 588, 572, p=0.3, end=0.34),
  S(6, "Vertical-bend-hook", "豎彎鉤", [(170, 408, 0, "in"), (182, 424, 0.42, "in"), (172, 560, 0.38, "go"), (166, 720, 0.38, "go"), (170, 830, 0.42, "go"), (200, 880, 0.5, "turn"), (360, 888, 0.44, "go"), (600, 878, 0.44, "go"), (790, 866, 0.5, "go"), (850, 846, 0.58, "turn"), (838, 760, 0.3, "fast"), (804, 640, 0, "out")]),
])
C["ji"] = ("即", "is; that is", 21363, [
  S(1, "Horizontal-turn", "橫折", [(196, 140, 0, "in"), (214, 152, 0.34, "in"), (310, 128, 0.32, "go"), (408, 106, 0.34, "go"), (474, 120, 0.52, "turn"), (462, 190, 0.4, "go"), (420, 310, 0.34, "go"), (392, 384, 0.24, "out"), (382, 402, 0, "out")]),
  heng(2, 212, 274, 372, 250, p=0.28, end=0.3),
  heng(3, 200, 394, 356, 382, p=0.28, end=0.3),
  S(4, "Vertical, rising", "豎提", [(178, 112, 0, "in"), (190, 130, 0.42, "in"), (186, 280, 0.38, "go"), (182, 450, 0.38, "go"), (168, 620, 0.4, "go"), (160, 700, 0.5, "turn"), (184, 716, 0.46, "turn"), (290, 620, 0.26, "fast"), (392, 524, 0, "out")]),
  slow(dian(5, 344, 480, 440, 612, p=0.42), 0.85),
  S(6, "Horizontal-turn-hook", "橫折鉤", [(584, 260, 0, "in"), (600, 270, 0.34, "in"), (700, 252, 0.32, "go"), (792, 236, 0.36, "go"), (846, 240, 0.52, "turn"), (826, 310, 0.4, "go"), (800, 420, 0.38, "go"), (776, 506, 0.42, "go"), (756, 548, 0.5, "turn"), (716, 520, 0.24, "fast"), (650, 462, 0, "out")]),
  S(7, "Vertical", "豎", [(558, 222, 0, "in"), (572, 240, 0.48, "in"), (572, 320, 0.4, "go"), (568, 520, 0.38, "go"), (564, 720, 0.38, "go"), (562, 830, 0.24, "fast"), (562, 896, 0, "out")]),
])
C["shi4"] = ("是", "is", 26159, [   # key 用 shi4：shi.json 已經是第四課的「十」
  slow(shu(1, 324, 118, 362, 392, p=0.34, tip=True), 0.9),
  S(2, "Horizontal-turn", "橫折", [(338, 116, 0, "in"), (354, 126, 0.34, "in"), (460, 104, 0.32, "go"), (556, 84, 0.36, "go"), (620, 100, 0.54, "turn"), (606, 180, 0.4, "go"), (578, 300, 0.36, "go"), (560, 380, 0.28, "out"), (556, 398, 0, "out")]),
  heng(3, 372, 252, 546, 232, p=0.26, end=0.28),
  heng(4, 380, 372, 548, 366, p=0.28, end=0.32),
  heng(5, 142, 520, 796, 440, p=0.38, end=0.5),
  slow(shu(6, 474, 494, 470, 742, p=0.36, tip=True), 0.9),
  heng(7, 502, 622, 648, 598, p=0.28, end=0.32),
  S(8, "Left-falling", "撇", [(322, 548, 0, "in"), (316, 566, 0.42, "in"), (290, 650, 0.38, "go"), (230, 752, 0.32, "go"), (140, 836, 0.18, "fast"), (62, 884, 0, "out")]),
  S(9, "Right-falling", "捺", [(300, 648, 0, "in"), (318, 664, 0.2, "in"), (400, 720, 0.3, "go"), (520, 790, 0.42, "go"), (660, 850, 0.58, "go"), (780, 880, 0.7, "turn"), (880, 878, 0.36, "out"), (940, 872, 0, "out")]),
])
C["kong"] = ("空", "empty; emptiness", 31354, [
  slow(dian(1, 412, 118, 506, 240, p=0.46), 0.9),
  S(2, "Left dot", "左點", [(228, 232, 0, "in"), (216, 250, 0.4, "in"), (196, 340, 0.4, "go"), (172, 420, 0.48, "turn"), (184, 436, 0.2, "out"), (196, 424, 0, "out")]),
  S(3, "Horizontal hook", "橫鉤", [(220, 300, 0, "in"), (236, 310, 0.36, "in"), (400, 274, 0.34, "go"), (600, 232, 0.36, "go"), (760, 198, 0.4, "go"), (862, 196, 0.56, "turn"), (840, 262, 0.34, "fast"), (690, 368, 0, "out")]),
  S(4, "Left-falling", "撇", [(424, 292, 0, "in"), (416, 310, 0.4, "in"), (386, 384, 0.36, "go"), (322, 468, 0.3, "go"), (254, 530, 0.16, "fast"), (206, 562, 0, "out")]),
  S(5, "Vertical-bend", "豎彎", [(538, 258, 0, "in"), (550, 276, 0.4, "in"), (540, 380, 0.36, "go"), (530, 462, 0.42, "turn"), (566, 488, 0.44, "turn"), (680, 484, 0.4, "go"), (748, 478, 0.44, "out"), (770, 468, 0, "out")]),
  heng(6, 270, 642, 670, 596, p=0.32, end=0.36),
  slow(shu(7, 478, 648, 472, 826, p=0.36, tip=True), 0.8),
  heng(8, 146, 870, 864, 814, p=0.4, end=0.54),
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
    W = Image.new("RGB", (520 * len(C), 520), (246, 240, 225))
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
