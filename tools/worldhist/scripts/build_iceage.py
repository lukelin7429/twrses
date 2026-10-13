#!/usr/bin/env python3
"""
世界歷史 World History · 「冰河時期的海平面」圖層的處理腳本。

產物：assets/img/world-history/iceage.png（等距圓柱、經度 -180 到 180、北在上的索引色 PNG）
    0 透明　1 末次冰盛期露出海面的陸棚　2 北半球的冰層　3 兩者都有（冰蓋在露出的陸棚上）

來源（都要寫進頁面的 credit 與出處）：
  1. 海底地形：NOAA ETOPO1 Global Relief Model（Amante & Eakins 2009，doi:10.7289/V5C8276M），美國政府作品、公有領域。
     從 NOAA ERDDAP 取每 6 格一點（0.1 度）：
     https://coastwatch.pfeg.noaa.gov/erddap/griddap/etopo180.nc?altitude[(-90):6:(90)][(-180):6:(180)]
  2. 冰層範圍：Batchelor et al. (2019) "The configuration of Northern Hemisphere ice sheets through the Quaternary",
     Nature Communications 10, 3713（文章 CC BY 4.0）的 LGM best-estimate shapefile（https://osf.io/7jen3/；
     OSF 專案本身沒有另外標授權），這裡只取外形並簡化（柵格化到 0.1 度、丟掉小的山岳冰河）。
     只有北半球；南極洲照今天的外形畫，南美洲南端等地的冰沒有畫。

做法（示意，不是古地理重建）：
  - 「露出的陸棚」＝今天的海床高於 -DROP 公尺、而且和外海相連的海域（內陸海如裏海、黑海不算）。
    只是把今天的海底地形往下「放水」DROP 公尺；沒有修正地殼均衡、沉積與構造運動，所以海岸線只是大約。
  - DROP 取 120：末次冰盛期全球海平面比現在低約 120–135 公尺（Lambeck et al. 2014 約 134 公尺；
    常見的教科書數字是約 120 公尺），取保守的一端。

  python3 scripts/build_iceage.py <etopo.nc> <LGM_best_estimate.shp> [寬度=3600]
"""
import struct, sys, os
import numpy as np
from scipy.io import netcdf_file
from scipy import ndimage
from PIL import Image, ImageDraw

DROP = 120
nc_path, shp_path = sys.argv[1], sys.argv[2]
W = int(sys.argv[3]) if len(sys.argv) > 3 else 3600
H = W // 2

nc = netcdf_file(nc_path, "r", mmap=False)
lat = nc.variables["latitude"][:].copy(); lon = nc.variables["longitude"][:].copy()
z = nc.variables["altitude"][:].astype(np.float32)
if lat[0] < lat[-1]: z = z[::-1]; lat = lat[::-1]          # 北在上
z = z[:-1, :-1] if z.shape[1] % 2 else z                    # 1801×3601 → 1800×3600（去掉重複的 180 度與南極那一列）
gh, gw = z.shape

sea = z <= 0
lab, n = ndimage.label(sea)
# 經度的接縫：左右兩邊相連的標籤併在一起
parent = list(range(n + 1))
def find(a):
    while parent[a] != a: parent[a] = parent[parent[a]]; a = parent[a]
    return a
for r in range(gh):
    a, b = lab[r, 0], lab[r, -1]
    if a and b: parent[find(a)] = find(b)
roots = np.array([find(i) for i in range(n + 1)])
lab = roots[lab]
def cell(lo, la): return int((90 - la) / 180 * gh), int((lo + 180) / 360 * gw)
ocean = lab == lab[cell(-150, 0)]                            # 太平洋中央
shelf = ocean & (z > -DROP)
shelf_d = ndimage.binary_dilation(shelf, iterations=2) & (~ocean | shelf)   # 往陸地那邊長兩格，蓋掉和 Natural Earth 海岸線之間的縫

# 冰層：讀 shapefile（Polygon；座標是 WGS84 經緯度，.prj 寫的是 GCS_WGS_1984），直接柵格化到同一張格子上
def read_shp(path):
    b = open(path, "rb").read(); pos = 100; rings = []
    while pos < len(b):
        _, clen = struct.unpack(">ii", b[pos:pos + 8]); rec = b[pos + 8:pos + 8 + clen * 2]; pos += 8 + clen * 2
        st = struct.unpack("<i", rec[:4])[0]
        if st not in (5, 15, 25): continue
        nparts, npts = struct.unpack("<ii", rec[36:44])
        parts = list(struct.unpack(f"<{nparts}i", rec[44:44 + 4 * nparts])) + [npts]
        pts = np.frombuffer(rec, dtype="<f8", count=npts * 2, offset=44 + 4 * nparts).reshape(-1, 2)
        for i in range(nparts): rings.append(pts[parts[i]:parts[i + 1]])
    return rings
def ring_area(xy): x, y = xy[:, 0], xy[:, 1]; return 0.5 * float(np.sum(x * np.roll(y, -1) - np.roll(x, -1) * y))
img = Image.new("L", (gw, gh), 0); d = ImageDraw.Draw(img)
to_px = lambda xy: [((x + 180) / 360 * gw, (90 - y) / 180 * gh) for x, y in xy]
rings = read_shp(shp_path)
MIN_ICE = 0.6                                               # 平方度；更小的山岳冰河不畫
for p in rings:                                             # 外環順時針（面積 < 0）；這份資料沒有洞
    if ring_area(p) < 0 and abs(ring_area(p)) >= MIN_ICE: d.polygon(to_px(p), fill=255)
ice = np.asarray(img) > 0
la = 90 - (np.arange(gh) + 0.5) * 180 / gh

out = np.zeros((gh, gw), np.uint8); out[shelf_d] = 1; out[ice] += 2
im = Image.fromarray(out, "P")
im.putpalette([0, 0, 0, 200, 180, 120, 240, 246, 252, 225, 228, 220])
if W != gw: im = im.resize((W, H), Image.NEAREST)
dst = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "..", "assets", "img", "world-history", "iceage.png")
im.save(dst, optimize=True, transparency=0)
km2 = lambda m: float(np.sum(m * np.cos(np.radians(la))[:, None]) * (111.19 * 180 / gh) ** 2)
print(f"{W}x{H}  {os.path.getsize(dst)} bytes  exposed shelf ≈ {km2(shelf) / 1e6:.1f} million km², ice ≈ {km2(ice) / 1e6:.1f} million km²")
# 幾個檢查點：True＝末次冰盛期是陸地（露出的陸棚）
for name, lo_, la_ in [("Taiwan Strait", 119.5, 24.5), ("Bering Strait", -169, 66), ("Sunda (Java Sea)", 110, -5), ("Arafura (Sahul)", 136, -9.5),
                       ("Bass Strait", 146, -39.5), ("Wallacea: Makassar Strait", 118.5, -1.5), ("Wallacea: Lombok Strait", 115.75, -8.6),
                       ("Timor Trough", 127, -10.5), ("Bab-el-Mandeb", 43.4, 12.6), ("English Channel", 0, 50.2), ("North Sea", 3, 55), ("Persian Gulf", 51, 27),
                       ("Palk Strait", 79.6, 9.7), ("Korea Strait", 129.3, 34.4), ("Luzon Strait", 121.5, 20.5), ("Caspian N", 50, 45.5), ("Gibraltar", -5.6, 35.95)]:
    r, c = cell(lo_, la_); print(f"  {name:28s} z={z[r, c]:7.0f}  exposed={bool(shelf[r, c])}  ice={bool(ice[r, c])}")
