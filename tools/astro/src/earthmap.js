/*
 * 真實大陸的地球貼圖（第三、四課共用）。
 * Natural Earth 1:110m 陸地（公有領域，經 world-atlas 套件），打包時直接編進 JS。
 * 貼圖座標：u = 0.5 + 經度/360（經度 0° 在球的本地 +X，東經 90° 在 -Z）。
 */
import { CanvasTexture, MathUtils, SRGBColorSpace } from 'three';
import { feature } from 'topojson-client';
import land110 from 'world-atlas/land-110m.json';
import { DEG, TAU, makeNoise, sphereLoop } from './common.js';

// ---------------------------------------------------------------------------
// 真實大陸的地球貼圖：Natural Earth 陸地多邊形畫成遮罩，再逐點上色（海深淺、植被、沙漠、冰雪）
export function makeRealEarth() {
  const W = 1536, H = 768;
  const mask = document.createElement('canvas');
  mask.width = W; mask.height = H;
  const m = mask.getContext('2d');
  m.fillStyle = '#000'; m.fillRect(0, 0, W, H);
  m.fillStyle = '#fff';
  const geo = feature(land110, land110.objects.land);
  const polys = geo.features ? geo.features.flatMap((f) => (f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates)) : [];
  m.beginPath();
  for (const poly of polys) {
    for (const ring of poly) {
      // 跨換日線的環：把經度攤平成連續值，再平移 ±360° 各畫一次
      const pts = [];
      let prev = null, off = 0;
      for (const [lo, la] of ring) {
        if (prev != null && Math.abs(lo - prev) > 180) off += lo < prev ? 360 : -360;
        pts.push([lo + off, la]); prev = lo;
      }
      for (const shift of [-360, 0, 360]) {
        pts.forEach(([lo, la], i) => {
          const x = ((lo + shift + 180) / 360) * W, y = ((90 - la) / 180) * H;
          if (i === 0) m.moveTo(x, y); else m.lineTo(x, y);
        });
        m.closePath();
      }
    }
  }
  m.fill('evenodd');
  const md = m.getImageData(0, 0, W, H).data;
  const fbm = makeNoise(17);
  const { cv } = sphereLoop(W, H, (x, y, z, lat, lon) => {
    const px = Math.min(W - 1, Math.floor(((lon / TAU) + 0.5) * W));
    const py = Math.min(H - 1, Math.floor((0.5 - lat / Math.PI) * H));
    const landV = md[(py * W + px) * 4] / 255;
    const alat = Math.abs(lat) / DEG;
    const n = fbm(x * 4, y * 4, z * 4, 3);
    if (landV > 0.5) {
      if (alat > 64 + 6 * n) return [232, 238, 244];
      const desert = MathUtils.smoothstep(12, 20, alat) * MathUtils.smoothstep(36, 26, alat) * MathUtils.clamp(0.7 + n, 0, 1);
      const boreal = MathUtils.smoothstep(48, 60, alat);
      const g = [70 + 30 * n, 118 + 20 * n, 66];
      const b = [70, 96, 70];
      const d = [205, 178, 122];
      const c = g.map((v, i) => v * (1 - boreal) + b[i] * boreal);
      return c.map((v, i) => v * (1 - desert) + d[i] * desert);
    }
    const shelf = 0.2 * n;
    return [22 + 18 * shelf, 70 + 30 * shelf + 10 * Math.cos(lat), 150 + 25 * shelf];
  });
  const t = new CanvasTexture(cv); t.colorSpace = SRGBColorSpace; t.anisotropy = 4;
  return t;
}
export function makeClouds() {
  const fbm = makeNoise(31);
  const { cv } = sphereLoop(512, 256, (x, y, z, lat) => {
    const c = fbm(x * 2.4 + 9, y * 5, z * 2.4, 5);
    const band = 0.6 + 0.4 * Math.abs(Math.cos(lat * 3));
    return [255, 255, 255, MathUtils.clamp((c * band - 0.1) * 2.6, 0, 0.7) * 255];
  });
  const t = new CanvasTexture(cv); t.colorSpace = SRGBColorSpace;
  return t;
}
