/*
 * 萬物原理 · 真實大陸的地球貼圖（第七課 GPS 用）。
 * 從 tools/astro/src/earthmap.js 抄來、略為簡化：不直接 import 那份，是因為跨 tools 目錄會從
 * tools/astro/node_modules 解析 three，打包進第二份 three.js。
 * Natural Earth 1:110m 陸地（公有領域，經 world-atlas 套件），打包時直接編進 JS。
 * 貼圖座標：u = 0.5 + 經度/360（經度 0° 在球的本地 +X，東經 90° 在 −Z），跟 gpscalc.js 的座標一致。
 */
import { CanvasTexture, MathUtils, SRGBColorSpace } from 'three';
import { feature } from 'topojson-client';
import land110 from 'world-atlas/land-110m.json';

const TAU = Math.PI * 2, DEG = Math.PI / 180;

// 小小的 value noise，只用來讓陸地和海的顏色不要一片死板
function makeNoise(seed) {
  const perm = new Uint8Array(512);
  let x = seed >>> 0;
  const rnd = () => ((x = (x * 1664525 + 1013904223) >>> 0) / 4294967296);
  const p = Array.from({ length: 256 }, (_, i) => i);
  for (let i = 255; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [p[i], p[j]] = [p[j], p[i]]; }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  const val = new Float32Array(256).map(() => rnd() * 2 - 1);
  const h = (i, j, k) => val[perm[perm[perm[i & 255] + (j & 255)] + (k & 255)]];
  const sm = (t) => t * t * (3 - 2 * t);
  const lerp = (a, b, t) => a + (b - a) * t;
  function noise(px, py, pz) {
    const i = Math.floor(px), j = Math.floor(py), k = Math.floor(pz);
    const fx = sm(px - i), fy = sm(py - j), fz = sm(pz - k);
    const x00 = lerp(h(i, j, k), h(i + 1, j, k), fx), x10 = lerp(h(i, j + 1, k), h(i + 1, j + 1, k), fx);
    const x01 = lerp(h(i, j, k + 1), h(i + 1, j, k + 1), fx), x11 = lerp(h(i, j + 1, k + 1), h(i + 1, j + 1, k + 1), fx);
    return lerp(lerp(x00, x10, fy), lerp(x01, x11, fy), fz);
  }
  return (px, py, pz, oct = 3) => {
    let s = 0, a = 0.5, f = 1;
    for (let o = 0; o < oct; o++) { s += a * noise(px * f, py * f, pz * f); a *= 0.5; f *= 2; }
    return s;
  };
}

export function makeRealEarth(W = 1536, H = 768) {
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
  const cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d');
  const img = ctx.createImageData(W, H);
  const d = img.data;
  for (let y = 0; y < H; y++) {
    const lat = (0.5 - (y + 0.5) / H) * Math.PI;
    const cl = Math.cos(lat), sl = Math.sin(lat), alat = Math.abs(lat) / DEG;
    for (let x = 0; x < W; x++) {
      const lon = ((x + 0.5) / W - 0.5) * TAU;
      const o = (y * W + x) * 4;
      const n = fbm(cl * Math.cos(lon) * 4, sl * 4, cl * Math.sin(lon) * 4, 3);
      let c;
      if (md[o] > 127) {
        if (alat > 64 + 6 * n) c = [232, 238, 244];
        else {
          const desert = MathUtils.smoothstep(alat, 12, 20) * (1 - MathUtils.smoothstep(alat, 26, 36)) * MathUtils.clamp(0.7 + n, 0, 1);
          const boreal = MathUtils.smoothstep(alat, 48, 60);
          const g = [70 + 30 * n, 118 + 20 * n, 66], b = [70, 96, 70], s = [205, 178, 122];
          c = g.map((v, i) => (v * (1 - boreal) + b[i] * boreal) * (1 - desert) + s[i] * desert);
        }
      } else {
        const sh = 0.2 * n;
        c = [22 + 18 * sh, 70 + 30 * sh + 10 * cl, 150 + 25 * sh];
      }
      d[o] = c[0]; d[o + 1] = c[1]; d[o + 2] = c[2]; d[o + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const t = new CanvasTexture(cv); t.colorSpace = SRGBColorSpace; t.anisotropy = 4;
  return t;
}
