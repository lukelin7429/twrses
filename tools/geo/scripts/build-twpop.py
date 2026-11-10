"""
地理 Geography · 第十一課「台灣的人住在哪裡？」的人口格網處理腳本（之後要換版本，重跑這一支）。

  人口：歐盟 JRC GHS-POP R2023A，epoch 2025（推估），30 角秒，WGS84（第八課已用的同一個檔）
        GHS_POP_E2025_GLOBE_R2023A_4326_30ss_V1_0.tif（CC BY 4.0；DOI 10.2905/2FF68A52-5B5B-4A22-8F40-C41DA8332CFE）
  格子：第九課的台灣 1 公里格子（src/data/taiwan.json，內政部 2026 年 20 公尺 DTM 平均而來，TWD97／TM2 公里）

步驟：
  1. 只解壓台灣本島附近（東經 119.8–122.2、北緯 21.7–25.5）的 tile；每個 30 角秒小格（約 0.85 × 0.93 公里）
     用中心點的經緯度換成 TM2，落在哪一個 1 公里格子就加進那一格。
  2. 落在海裡（DTM 沒有資料）的小格：2 公里內有陸地就加到最近的陸地格子（海岸線兩份資料畫得不一樣）；
     再遠的（澎湖、綠島、蘭嶼、小琉球、龜山島等離島）不算，另外記在 meta.offIsland。
  3. 寫出 src/data/twpop.json：
       meta   來源、授權、改了什麼、本島總人數（四捨五入前的加總）、離島人數、海裡移到岸上的人數
       p      每一個陸地格子（照 taiwan.json 的順序：由南往北、每列由西往東，只列陸地）的人數，四捨五入；
              base64 的 16 位元整數（小端序）；超過 65,534 人的格子存 65535，真正的數字放 big { 陸地序號: 人數 }
       cities 課文標的城市（Natural Earth 10m Populated Places 的位置，換成 TM2 公里）

  ~/Developer/twrses-geo-tools/venv/bin/python scripts/build-twpop.py <GHS…30ss_V1_0.tif>
"""
import base64, json, math, os, sys
from collections import deque
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
TW = os.path.join(HERE, '..', 'src', 'data', 'taiwan.json')
OUT = os.path.join(HERE, '..', 'src', 'data', 'twpop.json')
BOX = (119.8, 122.2, 21.7, 25.5)          # 經度、緯度範圍（只含本島與附近離島）
SNAP = 2                                  # 海裡的小格，2 公里內有陸地就移過去

# 標在 3D 上的城市（Natural Earth 10m Populated Places，公有領域；經緯度照 NE）
CITIES = {
    'taipei': ('Taipei', '臺北', 121.568333, 25.035833), 'taoyuan': ('Taoyuan', '桃園', 121.311111, 24.988889),
    'hsinchu': ('Hsinchu', '新竹', 120.97674, 24.816791), 'taichung': ('Taichung', '臺中', 120.681667, 24.152078),
    'changhua': ('Changhua', '彰化', 120.513409, 24.0734), 'chiayi': ('Chiayi', '嘉義', 120.435067, 23.475452),
    'tainan': ('Tainan', '臺南', 120.200043, 23.000003), 'kaohsiung': ('Kaohsiung', '高雄', 120.266602, 22.633307),
    'yilan': ('Yilan', '宜蘭', 121.75, 24.75), 'hualien': ('Hualien', '花蓮', 121.600009, 23.983742),
    'taitung': ('Taitung', '臺東', 121.140037, 22.755393), 'keelung': ('Keelung', '基隆', 121.733282, 25.133258),
}


def tm2(lon, lat):
    """經緯度（度）→ TM2 二度分帶（公尺），numpy 向量化；公式同 build-taiwan.py。"""
    a, f = 6378137.0, 1 / 298.257222101
    e2 = f * (2 - f); ep2 = e2 / (1 - e2); k0 = 0.9999
    phi, lam = np.radians(lat), np.radians(lon - 121)
    s = np.sin(phi)
    N = a / np.sqrt(1 - e2 * s ** 2); T = np.tan(phi) ** 2; C = ep2 * np.cos(phi) ** 2; A = lam * np.cos(phi)
    M = a * ((1 - e2 / 4 - 3 * e2 ** 2 / 64 - 5 * e2 ** 3 / 256) * phi - (3 * e2 / 8 + 3 * e2 ** 2 / 32 + 45 * e2 ** 3 / 1024) * np.sin(2 * phi)
             + (15 * e2 ** 2 / 256 + 45 * e2 ** 3 / 1024) * np.sin(4 * phi) - (35 * e2 ** 3 / 3072) * np.sin(6 * phi))
    x = k0 * N * (A + (1 - T + C) * A ** 3 / 6 + (5 - 18 * T + T * T + 72 * C - 58 * ep2) * A ** 5 / 120) + 250000
    y = k0 * (M + N * np.tan(phi) * (A * A / 2 + (5 - T + 9 * C + 4 * C * C) * A ** 4 / 24 + (61 - 58 * T + T * T + 600 * C - 330 * ep2) * A ** 6 / 720))
    return x, y


def load_taiwan():
    d = json.load(open(TW, encoding='utf-8'))
    m = d['meta']
    h = np.frombuffer(base64.b64decode(d['h']), dtype='<u2').reshape(m['ny'], m['nx'])
    return m, h != 65535


def nearest_land(land):
    """每一個海格子最近的陸地格子（八方向 BFS 的步數），超過 SNAP 步就是 −1。"""
    ny, nx = land.shape
    near = np.full(land.shape, -1, dtype=np.int64); dist = np.full(land.shape, 99, dtype=np.int64)
    q = deque()
    for i, j in zip(*np.nonzero(land)):
        near[i, j] = i * nx + j; dist[i, j] = 0; q.append((i, j))
    while q:
        i, j = q.popleft()
        if dist[i, j] >= SNAP:
            continue
        for a in (-1, 0, 1):
            for b in (-1, 0, 1):
                x, y = i + a, j + b
                if 0 <= x < ny and 0 <= y < nx and dist[x, y] > dist[i, j] + 1:
                    dist[x, y] = dist[i, j] + 1; near[x, y] = near[i, j]; q.append((x, y))
    return near


def main(tif):
    import tifffile
    m, land = load_taiwan()
    ny, nx, e0, n0 = m['ny'], m['nx'], m['e0'], m['n0']
    near = nearest_land(land).ravel()
    acc = np.zeros(ny * nx); off = 0.0; snapped = 0.0
    with tifffile.TiffFile(tif) as t:
        page = t.pages[0]
        H, W = page.shape
        dx, dy = page.tags['ModelPixelScaleTag'].value[:2]
        x0, y0 = page.tags['ModelTiepointTag'].value[3:5]
        c_lo, c_hi = int((BOX[0] - x0) / dx), int((BOX[1] - x0) / dx)
        r_lo, r_hi = int((y0 - BOX[3]) / dy), int((y0 - BOX[2]) / dy)
        th, tw = page.tilelength, page.tilewidth
        tiles_x = (W + tw - 1) // tw
        want = [r * tiles_x + c for r in range(r_lo // th, r_hi // th + 1) for c in range(c_lo // tw, c_hi // tw + 1)]
        fh = t.filehandle
        def segs():
            for i in want:                          # 只讀需要的 tile（照位移讀原始位元組，再交給 tifffile 解壓）
                fh.seek(page.dataoffsets[i]); yield page.decode(fh.read(page.databytecounts[i]), i)
        for seg, idx, shape in segs():
            if seg is None:
                continue
            r0, c0 = idx[-3], idx[-2]
            blk = np.array(seg, dtype=np.float64).reshape(shape[-3], shape[-2])
            h = min(blk.shape[0], H - r0); w = min(blk.shape[1], W - c0)
            blk = blk[:h, :w]
            blk[~np.isfinite(blk) | (blk < 0)] = 0
            lon = x0 + (c0 + np.arange(w) + 0.5) * dx
            lat = y0 - (r0 + np.arange(h) + 0.5) * dy
            LON, LAT = np.meshgrid(lon, lat)
            inbox = (LON >= BOX[0]) & (LON <= BOX[1]) & (LAT >= BOX[2]) & (LAT <= BOX[3]) & (blk > 0)
            if not inbox.any():
                continue
            v = blk[inbox]
            E, N = tm2(LON[inbox], LAT[inbox])
            col = np.floor(E / 1000 - e0).astype(int); row = np.floor(N / 1000 - n0).astype(int)
            ok = (col >= 0) & (col < nx) & (row >= 0) & (row < ny)
            off += v[~ok].sum()
            k = np.where(ok, row * nx + col, 0)
            tgt = np.where(ok, near[k], -1)
            snapped += v[(tgt >= 0) & ok & ~land.ravel()[k]].sum()
            off += v[tgt < 0].sum()
            np.add.at(acc, tgt[tgt >= 0], v[tgt >= 0])
    flat = land.ravel()
    vals = np.round(acc[flat]).astype(np.int64)
    big = {int(i): int(x) for i, x in enumerate(vals) if x > 65534}
    p16 = np.where(vals > 65534, 65535, vals).astype('<u2')
    cities = {}
    for k, (en, zh, lo, la) in CITIES.items():
        E, N = tm2(np.array(lo), np.array(la))
        cities[k] = {'en': en, 'zh': zh, 'e': round(float(E) / 1000, 2), 'n': round(float(N) / 1000, 2)}
    data = {
        'meta': {
            'source': 'GHS-POP R2023A, epoch 2025 (projected), 30 arc-seconds — European Commission, Joint Research Centre',
            'doi': '10.2905/2FF68A52-5B5B-4A22-8F40-C41DA8332CFE',
            'license': 'CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/)',
            'changes': 'Added up the 30″ cells into the 1 km grid of lesson 9 (TWD97 / TM2); cells in the sea within 2 km of the coast were moved to the nearest land square; outlying islands are left out.',
            'grid': 'taiwan.json (lesson 9)', 'total': round(float(acc.sum())), 'offIsland': round(off), 'snapped': round(snapped),
            'landCells': int(flat.sum()), 'maxCell': int(vals.max()),
        },
        'p': base64.b64encode(p16.tobytes()).decode('ascii'),
        'big': big,
        'cities': cities,
    }
    with open(OUT, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, separators=(',', ':'))
    print(json.dumps(data['meta'], ensure_ascii=False), f'big cells {len(big)}', f'-> {os.path.getsize(OUT):,} bytes')


if __name__ == '__main__':
    main(sys.argv[1])
