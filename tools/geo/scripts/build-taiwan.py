"""
地理 Geography · 第九課的台灣地形資料處理腳本（之後要換版本，重跑這一支）。

  高程：內政部「2026年版全臺灣20公尺網格數值地形模型DTM資料」（政府資料開放平臺資料集 178729）
        不分幅_全台20MDEM(2026).zip（263 MB）→ DEMg_tawiwan_20m_20260228_g14_update.tif（10035 × 18852，float32，20 公尺，
        TWD97／TM2 二度分帶座標，左上角 E 150,980、N 2,799,160，nodata −32767；只有臺灣本島）
        https://www.tgos.tw/MDE/VirtualDir_TC/Product/915aa7e9-d952-4cec-8bf3-aca264254e9b/不分幅_全台20MDEM(2026).zip
        授權：政府資料開放授權條款－第1版（https://data.gov.tw/license），要附「顯名聲明」：
        「內政部 2026年版全臺灣20公尺網格數值地形模型DTM資料 此開放資料依政府資料開放授權條款 (Open Government Data License) 進行公眾釋出……」
        改了什麼（頁面的資料說明要寫）：把每 50 × 50 格（1 公里 × 1 公里）平均成一格；一半以上沒有資料的格子算海；
        北部山區有一塊原始資料沒有值（約 140 平方公里，不和海相連），用四周的格子反覆平均補起來（meta.filled 記補了幾格）。
  地名：課文用的幾個地形（盆地、平原、台地、縱谷、山脈）的大約位置，經緯度在下面的 PLACES，換成 TM2 公里座標。

步驟：
  1. 讀 GeoTIFF（不壓縮，直接 memmap），每 50 × 50 格平均（只算有資料的格），有資料的格子不到一半就算海。
  2. 玉山：在玉山主峰附近 2 公里內找 20 公尺網格的最高點（和國土測繪中心公告的 3,952 公尺對照，寫進測試）。
  3. 寫出 src/data/taiwan.json：
       meta    來源、版本、授權與顯名聲明、改了什麼、格子大小、左下角的 TM2 座標（公里）、格數
       h       每格的海拔（公尺，四捨五入；海是 −1），由南往北一列一列、每列由西往東；base64 的 16 位元整數（小端序，海存 65535）
       peak    20 公尺網格的玉山最高點 { e, n（公里）, h（公尺）}；max1k：1 公里格子裡最高的一格
       places  { key: { e, n } }（公里）

  ~/Developer/twrses-geo-tools/venv/bin/python scripts/build-taiwan.py <DEMg_…tif>
"""
import base64, json, math, os, sys
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'src', 'data', 'taiwan.json')
B = 50                       # 50 × 20 公尺 = 1 公里
YUSHAN = (120.957, 23.470)   # 玉山主峰的大約位置（找 2 公里內的最高點）

# 課文與小遊戲用的地形（大約的中心點，經緯度）
PLACES = {
    'taipeiBasin': (121.52, 25.05), 'linkou': (121.36, 25.07), 'lanyang': (121.75, 24.68), 'taichungBasin': (120.68, 24.15),
    'bagua': (120.635, 23.90), 'chianan': (120.25, 23.25), 'pingtung': (120.55, 22.65), 'huadong': (121.31, 23.35),
    'central': (121.15, 23.75), 'xueshan': (121.23, 24.38), 'coastal': (121.38, 23.30), 'yushan': YUSHAN,
}


def tm2(lon, lat):
    """經緯度（TWD97／GRS80）→ TM2 二度分帶（中央經線 121 度、尺度 0.9999、東偏 250,000 公尺），回傳公尺。"""
    a, f = 6378137.0, 1 / 298.257222101
    e2 = f * (2 - f); ep2 = e2 / (1 - e2); k0 = 0.9999
    phi, lam = math.radians(lat), math.radians(lon - 121)
    N = a / math.sqrt(1 - e2 * math.sin(phi) ** 2); T = math.tan(phi) ** 2; C = ep2 * math.cos(phi) ** 2; A = lam * math.cos(phi)
    M = a * ((1 - e2 / 4 - 3 * e2 ** 2 / 64 - 5 * e2 ** 3 / 256) * phi - (3 * e2 / 8 + 3 * e2 ** 2 / 32 + 45 * e2 ** 3 / 1024) * math.sin(2 * phi)
             + (15 * e2 ** 2 / 256 + 45 * e2 ** 3 / 1024) * math.sin(4 * phi) - (35 * e2 ** 3 / 3072) * math.sin(6 * phi))
    x = k0 * N * (A + (1 - T + C) * A ** 3 / 6 + (5 - 18 * T + T * T + 72 * C - 58 * ep2) * A ** 5 / 120) + 250000
    y = k0 * (M + N * math.tan(phi) * (A * A / 2 + (5 - T + 9 * C + 4 * C * C) * A ** 4 / 24 + (61 - 58 * T + T * T + 600 * C - 330 * ep2) * A ** 6 / 720))
    return x, y


def fill_holes(grid):
    """原始資料在北部山區有一塊沒有資料（約 140 平方公里，不和海相連）：用四周的格子反覆平均補起來，回傳補了幾格。"""
    ny, nx = grid.shape
    sea = np.isnan(grid)
    outside = np.zeros_like(sea)                         # 從邊界灌進去的才是真的海
    stack = [(i, j) for i in range(ny) for j in (0, nx - 1) if sea[i, j]] + [(i, j) for j in range(nx) for i in (0, ny - 1) if sea[i, j]]
    while stack:
        i, j = stack.pop()
        if outside[i, j]:
            continue
        outside[i, j] = True
        for a, b in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            x, y = i + a, j + b
            if 0 <= x < ny and 0 <= y < nx and sea[x, y] and not outside[x, y]:
                stack.append((x, y))
    hole = sea & ~outside
    if hole.any():
        grid[hole] = np.nanmean(grid)
        for _ in range(400):                             # 拉普拉斯平滑：洞裡每格換成上下左右的平均
            p = np.pad(grid, 1, mode='edge')
            avg = np.nanmean(np.stack([p[:-2, 1:-1], p[2:, 1:-1], p[1:-1, :-2], p[1:-1, 2:]]), axis=0)
            grid[hole] = avg[hole]
    return int(hole.sum())


def main(tif):
    import tifffile
    with tifffile.TiffFile(tif) as t:
        page = t.pages[0]
        x0, y0 = page.tags['ModelTiepointTag'].value[3:5]
        dx = page.tags['ModelPixelScaleTag'].value[0]
        a = page.asarray(out='memmap')
    H, W = a.shape
    ny, nx = H // B, W // B
    v = np.asarray(a[:ny * B, :nx * B], dtype=np.float32).reshape(ny, B, nx, B)
    ok = v > -1000
    cnt = ok.sum(axis=(1, 3))
    s = np.where(ok, v, 0).sum(axis=(1, 3))
    mean = np.where(cnt >= B * B / 2, s / np.maximum(cnt, 1), np.nan)
    grid = mean[::-1]                                    # 由南往北
    filled = fill_holes(grid)
    e0, n0 = x0 / 1000, (y0 - ny * B * dx) / 1000        # 左下角（公里）
    cell = B * dx / 1000

    # 玉山：20 公尺網格 2 公里內最高點
    ye, yn = tm2(*YUSHAN)
    c, r = int((ye - x0) / dx), int((y0 - yn) / dx)
    win = np.asarray(a[r - 100:r + 101, c - 100:c + 101], dtype=np.float32)
    i, j = np.unravel_index(np.argmax(win), win.shape)
    peak = {'e': round((x0 + (c - 100 + j + 0.5) * dx) / 1000, 3), 'n': round((y0 - (r - 100 + i + 0.5) * dx) / 1000, 3), 'h': round(float(win[i, j]), 2)}
    big = np.nanmax(grid); bi = np.unravel_index(np.nanargmax(grid), grid.shape)

    h16 = np.where(np.isnan(grid), 65535, np.clip(np.round(grid), 0, 65534)).astype('<u2')
    data = {
        'meta': {
            'source': '內政部 2026年版全臺灣20公尺網格數值地形模型DTM資料（DEMg_tawiwan_20m_20260228_g14_update）',
            'dataset': 'https://data.gov.tw/dataset/178729',
            'license': '政府資料開放授權條款－第1版 Open Government Data License, version 1.0 (https://data.gov.tw/license)',
            'attribution': '內政部 2026年版全臺灣20公尺網格數值地形模型DTM資料 此開放資料依政府資料開放授權條款 (Open Government Data License) 進行公眾釋出，使用者於遵守本條款各項規定之前提下，得利用之。政府資料開放授權條款：https://data.gov.tw/license',
            'changes': 'Averaged 50 × 50 cells (20 m) into 1 km cells; cells with less than half valid data are treated as sea; a small area with no data in the northern mountains was filled by averaging the squares around it.',
            'filled': filled,
            'crs': 'TWD97 / TM2 (EPSG:3826), km', 'cell': cell, 'e0': e0, 'n0': n0, 'nx': nx, 'ny': ny,
        },
        'h': base64.b64encode(h16.tobytes()).decode('ascii'),
        'peak': peak,
        'max1k': {'e': round(e0 + (bi[1] + 0.5) * cell, 3), 'n': round(n0 + (bi[0] + 0.5) * cell, 3), 'h': round(float(big), 1)},
        'places': {k: dict(zip(('e', 'n'), (round(q / 1000, 2) for q in tm2(*ll)))) for k, ll in PLACES.items()},
    }
    with open(OUT, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, separators=(',', ':'))
    print(f'grid {nx} × {ny} km, origin ({e0}, {n0}) km, land cells {int((~np.isnan(grid)).sum())}, peak20m {peak}, max1k {data["max1k"]}  -> {os.path.getsize(OUT):,} bytes')


if __name__ == '__main__':
    main(sys.argv[1])
