"""
地理 Geography · 第八課的人口資料處理腳本（之後要換版本或年份，重跑這一支）。

  人口：GHS-POP R2023A，2025 年（epoch 2025，推估），30 角秒（約 1 公里），WGS84 經緯度格網
        GHS_POP_E2025_GLOBE_R2023A_4326_30ss_V1_0.zip（484 MB，2024-09 版）
        https://jeodpp.jrc.ec.europa.eu/ftp/jrc-opendata/GHSL/GHS_POP_GLOBE_R2023A/GHS_POP_E2025_GLOBE_R2023A_4326_30ss/V1-0/
        出處：Schiavina M., Freire S., Carioli A., MacManus K. (2023): GHS-POP R2023A - GHS population grid multitemporal
        (1975-2030). European Commission, Joint Research Centre (JRC). doi:10.2905/2FF68A52-5B5B-4A22-8F40-C41DA8332CFE
        授權：CC BY 4.0（© European Union, 1995-2026；檔案裡的 copyright.txt：
        「Reuse is allowed provided appropriate credit is given and any changes are indicated.」）
        改了什麼（頁面的資料說明要寫）：加總成 5 分與 1 度格子；再換算成「一點＝一百萬人」的點。
  高度：NOAA ETOPO5（5 分格網，ETOPO5.DOS，18.7 MB，美國政府資料、公有領域）
        https://www.ngdc.noaa.gov/mgg/global/relief/ETOPO5/TOPO/ETOPO5/
        很舊、很粗（亞洲、南美、非洲部分地區只有 1 度的解析度），只拿來劃「海拔 3,000 公尺以上」的大範圍，以及熱帶 2,000 公尺以上的對照。
  陸地：Natural Earth 1:50m Land 5.1.2（公有領域）；沙漠：Natural Earth 1:50m Geography Regions 5.0.0（公有領域），
        只取幾個大而乾的沙漠，當作 3D 上的提示範圍（不是精確的邊界）。

步驟：
  1. 讀 GHS-POP 的 GeoTIFF（43202 × 21384，每格是那一格住了幾個人，原點不在整數度上），照每一格中心的經緯度
     加總成 5 分（1/12 度）的格子；第一次跑會存成 pop5m.npy，之後直接讀。再加總成 1 度。
  2. 一點＝一百萬人：在 1 度格子上做誤差擴散（Floyd–Steinberg，由北往南、蛇形），每一格的點數加起來
     和那一帶的人口差不到一點，人少的地方（每格不到一百萬）也會有點，不會整片消失。
  3. 每一點放在它那一格裡的哪裡：照 5 分小格的人口抽一個小格，再在小格裡隨機放（亂數種子固定，每次跑結果一樣）。
  4. 在 5 分格子上算三種範圍的人口與陸地面積比例（陸地用 Natural Earth 的陸地，面積照 cos 緯度加權）：
       desert  幾個大沙漠（Natural Earth 的範圍）
       high    海拔 3,000 公尺以上、南北緯 60 度之間（不算南極洲與格陵蘭的冰原）
       另外記兩個對照（只寫進 meta.stats，不畫）：熱帶（南北回歸線之間）2,000 公尺以上的高地、海拔 100 公尺以下的低地
       polar   南北緯 66.56 度（90 − 23.44，第七課的極圈）以外
  5. 寫出 src/data/pop.json：
       meta    來源、版本、授權、改了什麼、總人口、三種範圍與兩個對照的 { people, share, land }
       cells   1 度格子裡住了多少人（百人，四捨五入；只列住了 50 人以上或有點的格子）：[[經度格, 緯度格, 百人], …]
               經度格 0 是西經 180 到 179 度，緯度格 0 是北緯 90 到 89 度
       dots    每一點的經緯度（× 10 的整數）：[經度, 緯度, 經度, 緯度, …]
       areas   desert：[環, …]（每個環是 [[經度, 緯度], …]，0.1 度）；
               high：0.25 度格子的連續段 [[列, 起, 迄], …]（列 0 是北緯 90 到 89.75 度，欄 0 是西經 180 度起）

  ~/Developer/twrses-geo-tools/venv/bin/python scripts/build-pop.py <GHS GeoTIFF> <ETOPO5.DOS> <ne_50m_land.geojson> <ne_50m_geography_regions_polys.shp>
  （需要 numpy、tifffile、imagecodecs、pyshp、matplotlib）
"""
import json, os, sys
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'src', 'data', 'pop.json')
PER_DOT = 1_000_000
SEED = 8
K = 12                      # 5 分格子：每度 12 格
POLAR = 90 - 23.44
HIGH_M = 3000

# 提示範圍：Natural Earth 的名稱（NAME 欄；FEATURECLA 是 Desert）
DESERTS = ['SAHARA', 'RUB’ AL KHALI', 'GOBI DESERT', 'TAKLIMAKAN DESERT', 'KALAHARI DESERT', 'NAMIB DESERT',
           'GREAT SANDY DESERT', 'GREAT VICTORIA DESERT', 'Gibson Desert', 'DESIERTO DE ATACAMA']


def read_grid(tif):
    cache = os.path.join(os.path.dirname(os.path.abspath(tif)), 'pop5m.npy')
    if os.path.exists(cache):
        return np.load(cache)
    import tifffile
    with tifffile.TiffFile(tif) as t:
        page = t.pages[0]
        H, W = page.shape                       # 21384 × 43202（不是剛好整數度；照每一格中心的經緯度分到 5 分格子）
        dx, dy = page.tags['ModelPixelScaleTag'].value[:2]
        x0, y0 = page.tags['ModelTiepointTag'].value[3:5]
        out = np.zeros((180 * K, 360 * K), dtype=np.float64)
        # 一塊一塊（256 × 256 的 tile）解壓，算每一格中心落在哪個小格，加總；nodata（負值）當 0
        for seg, idx, shape in page.segments():
            if seg is None:
                continue
            r0, c0 = idx[-3], idx[-2]
            blk = np.array(seg, dtype=np.float64).reshape(shape[-3], shape[-2])
            h = min(blk.shape[0], H - r0); w = min(blk.shape[1], W - c0)
            blk = blk[:h, :w]
            blk[~np.isfinite(blk) | (blk < 0)] = 0
            if not blk.any():
                continue
            lon = x0 + (c0 + np.arange(w) + 0.5) * dx
            lat = y0 - (r0 + np.arange(h) + 0.5) * dy
            col = np.clip(np.floor((lon + 180) * K).astype(int), 0, 360 * K - 1)
            row = np.clip(np.floor((90 - lat) * K).astype(int), 0, 180 * K - 1)
            ra, ca = row.min(), col.min()
            nr, nc = row.max() - ra + 1, col.max() - ca + 1
            k = ((row - ra)[:, None] * nc + (col - ca)[None, :]).ravel()
            out[ra:ra + nr, ca:ca + nc] += np.bincount(k, weights=blk.ravel(), minlength=nr * nc).reshape(nr, nc)
    np.save(cache, out)
    return out


def read_etopo(path):
    """ETOPO5.DOS：2160 × 4320 個 16 位元整數（低位元組在前），從北極、東經 0 度開始往東；改成從西經 180 度開始。"""
    a = np.fromfile(path, '<i2').reshape(180 * K, 360 * K)
    return np.roll(a, 180 * K, axis=1)


def centers():
    lon = -180 + (np.arange(360 * K) + 0.5) / K
    lat = 90 - (np.arange(180 * K) + 0.5) / K
    return np.meshgrid(lon, lat)


def rasterize(rings, LON, LAT):
    """偶奇規則：環內的 5 分格子（用每個環的外框只檢查附近的格子）。"""
    from matplotlib.path import Path
    m = np.zeros(LON.shape, bool)
    for ring in rings:
        ring = np.asarray(ring)
        (x0, y0), (x1, y1) = ring.min(0), ring.max(0)
        c0 = max(0, int((x0 + 180) * K)); c1 = min(360 * K, int((x1 + 180) * K) + 1)
        r0 = max(0, int((90 - y1) * K)); r1 = min(180 * K, int((90 - y0) * K) + 1)
        if c1 <= c0 or r1 <= r0:
            continue
        sub = Path(ring).contains_points(np.c_[LON[r0:r1, c0:c1].ravel(), LAT[r0:r1, c0:c1].ravel()]).reshape(r1 - r0, c1 - c0)
        m[r0:r1, c0:c1] ^= sub
    return m


def land_rings(geojson):
    gj = json.load(open(geojson, encoding='utf-8'))
    out = []
    for f in gj['features']:
        g = f['geometry']
        for p in (g['coordinates'] if g['type'] == 'MultiPolygon' else [g['coordinates']]):
            out += p
    return out


def desert_rings(shp):
    import shapefile
    r = shapefile.Reader(shp)
    rings, names = [], []
    for sr in r.shapeRecords():
        if sr.record['NAME'] in DESERTS and sr.record['FEATURECLA'] == 'Desert':
            s = sr.shape; parts = list(s.parts) + [len(s.points)]
            rings += [s.points[parts[i]:parts[i + 1]] for i in range(len(s.parts))]
            names.append(sr.record['NAME'])
    miss = set(DESERTS) - set(names)
    assert not miss, miss
    return rings


def dither(g1):
    """Floyd–Steinberg：每格的點數（整數），蛇形掃描、經度方向首尾相接。"""
    H, W = g1.shape
    v = g1 / PER_DOT
    n = np.zeros((H, W), dtype=np.int32)
    for y in range(H):
        xs = range(W) if y % 2 == 0 else range(W - 1, -1, -1)
        d = 1 if y % 2 == 0 else -1
        for x in xs:
            q = int(np.floor(v[y, x] + 0.5)) if v[y, x] > 0 else 0
            n[y, x] = q
            e = v[y, x] - q
            if e == 0:
                continue
            # 誤差只往有人的格子推（海上、無人地不放點）
            targets = [((x + d) % W, y, 7 / 16)]
            if y + 1 < H:
                targets += [((x - d) % W, y + 1, 3 / 16), (x, y + 1, 5 / 16), ((x + d) % W, y + 1, 1 / 16)]
            live = [(tx, ty, w) for tx, ty, w in targets if g1[ty, tx] > 0]
            if not live:
                continue    # 四周都沒人（小島）：誤差丟掉，最多差不到一點
            s = sum(w for *_, w in live)
            for tx, ty, w in live:
                v[ty, tx] += e * w / s
    return n


def place(n, g5, rng):
    dots = []
    for y, x in zip(*np.nonzero(n)):
        sub = g5[y * K:(y + 1) * K, x * K:(x + 1) * K].ravel()
        for k in rng.choice(K * K, size=n[y, x], p=sub / sub.sum()):
            sy, sx = divmod(int(k), K)
            lon = -180 + x + (sx + rng.random()) / K
            lat = 90 - y - (sy + rng.random()) / K
            # 量化到 0.1 度時不要跑出自己那一格（四捨五入可能進到隔壁格）
            dots += [int(min(max(round(lon * 10), (x - 180) * 10), (x - 180) * 10 + 9)), int(min(max(round(lat * 10), (89 - y) * 10 + 1), (90 - y) * 10))]
    return dots


def simplify(ring, tol=0.15):
    """Douglas–Peucker（度）。閉合的環先在離起點最遠的點切成兩段，各自簡化。"""
    pts = np.asarray(ring)
    if len(pts) > 3 and np.allclose(pts[0], pts[-1]):
        far = int(np.argmax(np.hypot(*(pts - pts[0]).T)))
        a, b = _dp(pts[:far + 1], tol), _dp(pts[far:], tol)
        return a + b[1:-1]
    return _dp(pts, tol)


def _dp(pts, tol):
    if len(pts) < 4:
        return [[round(x, 1), round(y, 1)] for x, y in pts]
    keep = np.zeros(len(pts), bool); keep[0] = keep[-1] = True
    stack = [(0, len(pts) - 1)]
    while stack:
        a, b = stack.pop()
        if b <= a + 1:
            continue
        A, B = pts[a], pts[b]; seg = B - A; L = np.hypot(*seg) or 1e-12
        d = np.abs(seg[0] * (pts[a + 1:b, 1] - A[1]) - seg[1] * (pts[a + 1:b, 0] - A[0])) / L
        i = int(np.argmax(d))
        if d[i] > tol:
            keep[a + 1 + i] = True
            stack += [(a, a + 1 + i), (a + 1 + i, b)]
    return [[round(x, 1), round(y, 1)] for x, y in pts[keep]]


def runs(mask):
    """0.25 度格子的連續段 [[列, 起, 迄（不含）], …]。"""
    out = []
    for r in range(mask.shape[0]):
        d = np.diff(np.r_[False, mask[r], False].astype(np.int8))
        for a, b in zip(np.nonzero(d == 1)[0], np.nonzero(d == -1)[0]):
            out.append([r, int(a), int(b)])
    return out


def main(tif, etopo, land_gj, shp):
    g5 = read_grid(tif)
    g1 = g5.reshape(180, K, 360, K).sum(axis=(1, 3))
    total = g1.sum()
    n = dither(g1.copy())
    rng = np.random.default_rng(SEED)
    dots = place(n, g5, rng)
    cells = [[int(x), int(y), max(1, int(round(g1[y, x] / 100)))] for y, x in zip(*np.nonzero((g1 >= 50) | (n > 0)))]   # 有點的格子一定列

    LON, LAT = centers()
    w = np.cos(np.radians(LAT))
    land = rasterize(land_rings(land_gj), LON, LAT)
    elev = read_etopo(etopo)
    drings = desert_rings(shp)
    masks = {
        'desert': rasterize(drings, LON, LAT) & land,
        'high': (elev > HIGH_M) & (np.abs(LAT) < 60) & land,
        'polar': (np.abs(LAT) > POLAR) & land,
    }
    landw = (w * land).sum()
    stats = {}
    for k, m in masks.items():
        p = g5[m].sum()
        stats[k] = {'people': int(round(p)), 'share': round(p / total, 5), 'land': round((w * m).sum() / landw, 4)}
    extra = {
        'tropicHigh': (elev > 2000) & (np.abs(LAT) < 23.44) & land,      # 熱帶的高地：涼爽，人反而不少
        'low': (elev < 100) & land,                                       # 和 Cohen & Small (1998) 的 33.5%／15.6% 對照
    }
    for k, m in extra.items():
        p = g5[m].sum()
        stats[k] = {'people': int(round(p)), 'share': round(p / total, 5), 'land': round((w * m).sum() / landw, 4)}
    print('people on the land mask:', round(g5[land].sum() / total, 4))
    hi4 = masks['high'].reshape(720, 3, 1440, 3).sum(axis=(1, 3)) >= 5     # 0.25 度：9 個 5 分格子有 5 個以上算高地
    data = {
        'meta': {
            'source': 'GHS-POP R2023A, epoch 2025, 30 arcsec (WGS84)',
            'file': 'GHS_POP_E2025_GLOBE_R2023A_4326_30ss_V1_0',
            'citation': 'Schiavina M., Freire S., Carioli A., MacManus K. (2023): GHS-POP R2023A - GHS population grid multitemporal (1975-2030). European Commission, Joint Research Centre (JRC). doi:10.2905/2FF68A52-5B5B-4A22-8F40-C41DA8332CFE',
            'license': 'CC BY 4.0, © European Union',
            'changes': 'Summed into 5-minute and 1-degree cells; converted to one dot per million people (error diffusion, dots placed by 5-minute population).',
            'areas': {'desert': 'Natural Earth 1:50m Geography Regions 5.0.0 (public domain): ' + ', '.join(DESERTS),
                      'high': f'Land above {HIGH_M} m between 60° S and 60° N, from NOAA ETOPO5 (public domain); land from Natural Earth 1:50m Land 5.1.2',
                      'polar': f'Land beyond {POLAR:.2f}° N and S'},
            'year': 2025, 'total': int(round(total)), 'perDot': PER_DOT, 'dotCount': len(dots) // 2,
            'stats': stats,
        },
        'cells': cells,
        'dots': dots,
        'areas': {'desert': [simplify(r) for r in drings if len(r) > 3], 'high': runs(hi4)},
    }
    with open(OUT, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, separators=(',', ':'))
    print(f'total {total:,.0f}  dots {len(dots) // 2}  cells {len(cells)}  high runs {len(data["areas"]["high"])}  -> {os.path.getsize(OUT):,} bytes')
    print(json.dumps(stats))


if __name__ == '__main__':
    main(*sys.argv[1:5])
