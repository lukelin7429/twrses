#!/usr/bin/env python3
"""
美國政治 U.S. Government · 五十州地圖的底圖（一次性的處理腳本；產物 src/data/states.json 打包進 JS）。

來源：美國人口普查局 Cartographic Boundary File「cb_2024_us_state_20m」（KML，1:20,000,000），美國聯邦政府的資料，
人口普查局說明可以免費使用、須註明來源為人口普查局；下載頁 https://www.census.gov/geographies/mapping-files/time-series/geo/cartographic-boundary.html
只取 50 州與哥倫比亞特區（不含波多黎各與其他領地）。

處理：
  1. 投影：Albers USA（本土是等積圓錐投影、標準緯線 29.5 與 45.5 度；阿拉斯加與夏威夷各用自己的等積圓錐投影，
     縮小／搬到左下角——參數照 d3-geo 的 geoAlbersUsa，畫面約 960 × 600）。阿拉斯加跨過 180 度經線的島，經度減 360。
  2. 簡化：Douglas–Peucker，容許誤差 0.35 個單位；丟掉面積小於 1.5 平方單位的小島。
  3. 量化到 0.1 個單位、差分存成整數。

  python3 scripts/build-states.py <cb_2024_us_state_20m.kml>
"""
import json, math, re, sys, pathlib

K = 1070
def conic(par1, par2, lon0, clon, clat, scale, tx, ty):
    p1, p2 = math.radians(par1), math.radians(par2)
    n = (math.sin(p1) + math.sin(p2)) / 2
    c = math.cos(p1) ** 2 + 2 * n * math.sin(p1)
    r0 = math.sqrt(c) / n
    def raw(lon, lat):
        lam, phi = math.radians(lon - lon0), math.radians(lat)
        r = math.sqrt(max(0.0, c - 2 * n * math.sin(phi))) / n
        return r * math.sin(n * lam), r0 - r * math.cos(n * lam)
    cx, cy = raw(clon, clat)
    def f(lon, lat):
        x, y = raw(lon, lat)
        return tx + scale * (x - cx), ty - scale * (y - cy)
    return f

LOWER48 = conic(29.5, 45.5, -96, -96.6, 38.7, K, 480, 250)
ALASKA = conic(55, 65, -154, -156, 58.5, 0.35 * K, 480 - 0.307 * K, 250 + 0.201 * K)
HAWAII = conic(8, 18, -157, -160, 19.9, K, 480 - 0.205 * K, 250 + 0.212 * K)

def dp(pts, tol):
    if len(pts) < 4: return pts
    keep = [False] * len(pts); keep[0] = keep[-1] = True
    stack = [(0, len(pts) - 1)]
    while stack:
        a, b = stack.pop()
        (x1, y1), (x2, y2) = pts[a], pts[b]
        dx, dy = x2 - x1, y2 - y1; L = math.hypot(dx, dy) or 1e-12
        best, bi = 0, None
        for i in range(a + 1, b):
            x, y = pts[i]
            d = abs(dy * (x - x1) - dx * (y - y1)) / L
            if d > best: best, bi = d, i
        if bi is not None and best > tol:
            keep[bi] = True; stack += [(a, bi), (bi, b)]
    return [p for p, k in zip(pts, keep) if k]

def dp_ring(pts, tol):
    """閉合的環：頭尾是同一點，先從離起點最遠的那一點切成兩段，各自簡化再接回去。"""
    if pts[0] == pts[-1]: pts = pts[:-1]
    x0, y0 = pts[0]
    far = max(range(len(pts)), key=lambda i: (pts[i][0] - x0) ** 2 + (pts[i][1] - y0) ** 2)
    a = dp(pts[:far + 1], tol); b = dp(pts[far:] + [pts[0]], tol)
    return a[:-1] + b[:-1]

def area(r):
    return abs(sum(r[i][0] * r[i - 1][1] - r[i - 1][0] * r[i][1] for i in range(len(r)))) / 2

def main(path):
    kml = pathlib.Path(path).read_text(encoding='utf-8')
    out = []
    for pm in re.findall(r'<Placemark.*?</Placemark>', kml, flags=re.S):
        get = lambda k: re.search(rf'<SimpleData name="{k}">(.*?)</SimpleData>', pm).group(1)
        ab, name, fips, aland = get('STUSPS'), get('NAME'), get('STATEFP'), int(get('ALAND'))
        if ab == 'PR': continue
        proj = ALASKA if ab == 'AK' else HAWAII if ab == 'HI' else LOWER48
        rings = []
        for outer in re.findall(r'<outerBoundaryIs>.*?<coordinates>(.*?)</coordinates>', pm, flags=re.S):
            pts = []
            for tok in outer.split():
                lon, lat = map(float, tok.split(',')[:2])
                if ab == 'AK' and lon > 0: lon -= 360
                pts.append(proj(lon, lat))
            if area(pts) < 1.5: continue
            s = dp_ring(pts, 0.35)
            if len(s) < 4: continue
            q = [(round(x * 10), round(y * 10)) for x, y in s]
            enc = [q[0][0], q[0][1]]
            for (x0, y0), (x1, y1) in zip(q, q[1:]): enc += [x1 - x0, y1 - y0]
            rings.append(enc)
        out.append({'abbr': ab, 'name': name, 'fips': fips, 'aland': aland, 'rings': rings})
    out.sort(key=lambda s: s['abbr'])
    meta = {'source': 'U.S. Census Bureau, 2024 Cartographic Boundary File cb_2024_us_state_20m (KML, 1:20,000,000); free to use with acknowledgement of the U.S. Census Bureau as the source',
            'url': 'https://www.census.gov/geographies/mapping-files/time-series/geo/cartographic-boundary.html',
            'projection': 'Albers USA (d3-geo geoAlbersUsa parameters), units of 0.1 on a 960 x 600 canvas',
            'simplify': 'Douglas-Peucker 0.35, islands under 1.5 square units dropped'}
    dst = pathlib.Path(__file__).resolve().parent.parent / 'src' / 'data' / 'states.json'
    dst.write_text(json.dumps({'meta': meta, 'states': out}, separators=(',', ':')), encoding='utf-8')
    n = sum(len(r) // 2 for s in out for r in s['rings'])
    print(f'{len(out)} states, {sum(len(s["rings"]) for s in out)} rings, {n} points, {dst.stat().st_size} bytes -> {dst}')

if __name__ == '__main__':
    main(sys.argv[1])
