# 第九課：顏體、柳體的筆畫資料。中心線是自己對著拓本讀座標描的；壓力（粗細）是從拓本量出來的線寬換算的。
# 參考（只當底圖對位）：顏＝〈多寶塔碑〉北宋拓本（東京國立博物館 TB-1371，Wikimedia Commons，公有領域）；
#                     柳＝〈玄秘塔碑〉整拓（Wikimedia Commons，公有領域）
# 用法：python3 styles_chars.py <ref9 資料夾> <輸出 styles.json> [檢查圖資料夾]
import json, sys, os, math
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage
REF, OUT = sys.argv[1], sys.argv[2]
CHK = sys.argv[3] if len(sys.argv) > 3 else None
V = {"in": 85, "go": 260, "turn": 120, "out": 130}
SIZE = 660          # 兩種寫法都放大到同樣大（字的長邊＝660 單位），粗細才能比
FILES = {"yan": "yan-duobao-%s.png", "liu": "liu-xuanmi-%s.png"}
FROM = {"yan": "〈多寶塔碑〉", "liu": "〈玄秘塔碑〉"}
# 每一點：(x, y, 種類)；座標是把參考圖放大成 1000×1000 之後讀的
D = {
 "shi": ("十", "ten", [("Horizontal", "橫"), ("Vertical", "豎")], {
   "yan": ("發明資乎十力", [
     [(172,428,"in"),(238,452,"in"),(330,430,"go"),(440,408,"go"),(560,388,"go"),(650,378,"go"),(702,388,"turn"),(716,404,"out")],
     [(412,246,"in"),(470,272,"in"),(482,350,"go"),(486,450,"go"),(487,550,"go"),(484,620,"go"),(468,690,"out")]]),
   "liu": ("一百六十座", [
     [(158,482,"in"),(188,476,"in"),(300,455,"go"),(440,436,"go"),(580,420,"go"),(700,410,"go"),(752,424,"turn"),(776,446,"out")],
     [(420,188,"in"),(468,216,"in"),(480,300,"go"),(483,450,"go"),(481,600,"go"),(478,700,"go"),(476,775,"out")]]),
 }),
 "ren": ("人", "person", [("Left-falling", "撇"), ("Right-falling", "捺")], {
   "yan": ("寺內淨人", [
     [(430,258,"in"),(458,300,"in"),(420,352,"go"),(366,412,"go"),(300,488,"go"),(230,560,"go"),(160,625,"go"),(112,658,"out")],
     [(378,412,"in"),(412,446,"in"),(470,515,"go"),(550,578,"go"),(640,632,"go"),(730,672,"go"),(790,688,"turn"),(872,680,"out")]]),
   "liu": ("既成人", [
     [(462,268,"in"),(490,302,"in"),(440,380,"go"),(370,470,"go"),(290,560,"go"),(200,650,"go"),(108,722,"out")],
     [(396,436,"in"),(424,462,"in"),(480,508,"go"),(560,560,"go"),(660,620,"go"),(740,660,"go"),(790,676,"turn"),(912,636,"out")]]),
 }),
 "da": ("大", "big", [("Horizontal", "橫"), ("Left-falling", "撇"), ("Right-falling", "捺")], {
   "yan": ("大唐西京", [
     [(248,438,"in"),(304,470,"in"),(400,440,"go"),(500,405,"go"),(600,376,"go"),(686,370,"go"),(722,386,"turn"),(716,402,"out")],
     [(418,182,"in"),(474,226,"in"),(468,330,"go"),(452,430,"go"),(422,520,"go"),(372,620,"go"),(302,700,"go"),(232,750,"go"),(186,770,"out")],
     [(478,498,"in"),(506,528,"in"),(548,578,"go"),(606,644,"go"),(680,700,"go"),(740,734,"turn"),(852,734,"out")]]),
   "liu": ("駕橫海之大航", [
     [(182,422,"in"),(216,430,"in"),(320,410,"go"),(440,386,"go"),(560,362,"go"),(646,352,"go"),(672,366,"turn"),(678,384,"out")],
     [(358,164,"in"),(400,196,"in"),(408,300,"go"),(405,400,"go"),(386,500,"go"),(340,600,"go"),(270,700,"go"),(200,770,"go"),(148,802,"out")],
     [(398,462,"in"),(424,486,"in"),(470,530,"go"),(560,600,"go"),(650,656,"go"),(712,686,"turn"),(802,690,"out")]]),
 }),
}
def mask_of(fn):
    im = Image.open(fn).convert("L").resize((1000, 1000), Image.LANCZOS).filter(ImageFilter.MedianFilter(9)).filter(ImageFilter.GaussianBlur(3))
    a = np.asarray(im).astype(float)
    # Otsu
    h, _ = np.histogram(a, 256, (0, 256)); tot = a.size; s = np.dot(np.arange(256), h); sb = wb = 0; best = (0, 128)
    for t in range(256):
        wb += h[t]
        if wb == 0 or wb == tot: continue
        sb += t * h[t]; mb = sb / wb; mf = (s - sb) / (tot - wb); v = wb * (tot - wb) * (mb - mf) ** 2
        if v > best[0]: best = (v, t)
    m = a > best[1] + 12
    m = ndimage.binary_opening(m, iterations=3)
    return m, ndimage.distance_transform_edt(m)
def press(w):   # 線寬（字框單位）→ 壓力：brush.js 的 footprint 反過來（w＝6＋112·p^1.12）
    return max(0.05, min(1.0, ((max(w, 7) - 6) / 112) ** (1 / 1.12)))
out = {"about": "第九課：顏體與柳體（示意）。人師教育協會自己描的中心線；每一點的壓力由拓本上量到的線寬換算（兩種寫法放大到同樣大再比）。筆順、筆數依教育部《國字標準字體筆順學習網》。不是原碑的複製。",
       "src": "顏真卿〈多寶塔碑〉北宋拓本（東京國立博物館藏 TB-1371；Wikimedia Commons，公有領域）；柳公權〈玄秘塔碑〉拓本（Wikimedia Commons，公有領域）",
       "chars": {}}
for key, (ch, en, names, forms) in D.items():
    c = {"char": ch, "en": en}
    for who, (frm, strokes) in forms.items():
        m, dt = mask_of(os.path.join(REF, FILES[who] % ch))
        allp = [q for st in strokes for q in st]
        x0, x1 = min(q[0] for q in allp), max(q[0] for q in allp); y0, y1 = min(q[1] for q in allp), max(q[1] for q in allp)
        k = SIZE / max(x1 - x0, y1 - y0); cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
        ss = []
        for i, pts in enumerate(strokes):
            o = []
            for j, (x, y, kind) in enumerate(pts):
                # 量這一點附近的線寬：取 9×9 內距離轉換的最大值 × 2（手讀的中心線不一定正中）
                xi, yi = int(round(x)), int(round(y)); win = dt[max(0, yi - 14):yi + 15, max(0, xi - 14):xi + 15]
                w = 2 * float(win.max()) * k
                p = 0.03 if j in (0, len(pts) - 1) else round(press(w), 2)
                o.append([round(500 + (x - cx) * k), round(500 + (y - cy) * k), p, V[kind]])
            n_in = next((j for j, q in enumerate(pts) if q[2] != "in"), 1)
            ss.append({"n": i + 1, "en": names[i][0], "zh": names[i][1], "pts": o, "phases": [max(1, n_in), max(n_in + 1, len(pts) - 2)]})
        c[who] = {"from": FROM[who] + "「" + frm + "」", "xf": [round(cx, 1), round(cy, 1), round(k, 4)], "strokes": ss}
        if CHK:
            Image.fromarray((m * 255).astype("uint8")).save(os.path.join(CHK, f"mask-{who}-{key}.png"))
    out["chars"][key] = c
J = lambda v: json.dumps(v, ensure_ascii=False, separators=(', ', ': '))
L = ['{', f'  "about": {J(out["about"])},', f'  "src": {J(out["src"])},', '  "chars": {']
keys = list(out["chars"])
for a, key in enumerate(keys):
    c = out["chars"][key]
    L.append(f'    {J(key)}: {{ "char": {J(c["char"])}, "en": {J(c["en"])},')
    for b, who in enumerate(("yan", "liu")):
        f = c[who]
        L.append(f'      {J(who)}: {{ "from": {J(f["from"])}, "xf": {J(f["xf"])}, "strokes": [')
        for i, st in enumerate(f["strokes"]): L.append('        ' + J(st) + (',' if i < len(f["strokes"]) - 1 else ''))
        L.append('      ] }' + (',' if b == 0 else ''))
    L.append('    }' + (',' if a < len(keys) - 1 else ''))
L += ['  }', '}']
open(OUT, 'w', encoding='utf-8').write('\n'.join(L) + '\n'); json.load(open(OUT)); print('ok')
