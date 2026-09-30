/*
 * 天文教育各課共用：程序化貼圖（月面、地球）、星空、光暈、月面著色、月相分區、時間格式。
 * 由 moon-phases.js（第一課）與 eclipses.js（第二課）共用。
 */
import {
  AdditiveBlending, BackSide, BufferGeometry, CanvasTexture, Float32BufferAttribute, MathUtils,
  Points, PointsMaterial, ShaderMaterial, SRGBColorSpace, Vector2, Vector3,
} from 'three';

export const SYN = 29.530588853;
export const TAU = Math.PI * 2;
export const DEG = Math.PI / 180;

// 八相的區間：主要月相各 ±12°（約 ±1 天），其餘為過渡的眉月／凸月。
export const PHASE_CENTERS = [0, 45, 90, 135, 180, 225, 270, 315];
export function phaseIndex(elongDeg) {
  const e = ((elongDeg % 360) + 360) % 360;
  if (e < 12 || e >= 348) return 0;
  if (e < 78) return 1;
  if (e < 102) return 2;
  if (e < 168) return 3;
  if (e < 192) return 4;
  if (e < 258) return 5;
  if (e < 282) return 6;
  return 7;
}

export const ZH_DAY = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
  '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
  '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'];

// ---------------------------------------------------------------------------
// 程序化貼圖（不外連任何圖檔）：3D value noise 取樣在球面上，所以經度 0°/360° 無接縫。
export function makeNoise(seed) {
  const perm = new Uint8Array(512);
  let x = seed >>> 0;
  const rnd = () => ((x = (x * 1664525 + 1013904223) >>> 0) / 4294967296);
  const p = Array.from({ length: 256 }, (_, i) => i);
  for (let i = 255; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [p[i], p[j]] = [p[j], p[i]]; }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  const val = new Float32Array(256).map(() => rnd() * 2 - 1);
  const h = (i, j, k) => val[perm[perm[perm[i & 255] + (j & 255)] + (k & 255)]];
  const sm = (t) => t * t * (3 - 2 * t);
  function noise(px, py, pz) {
    const i = Math.floor(px), j = Math.floor(py), k = Math.floor(pz);
    const fx = sm(px - i), fy = sm(py - j), fz = sm(pz - k);
    const l = (a, b, t) => a + (b - a) * t;
    return l(
      l(l(h(i, j, k), h(i + 1, j, k), fx), l(h(i, j + 1, k), h(i + 1, j + 1, k), fx), fy),
      l(l(h(i, j, k + 1), h(i + 1, j, k + 1), fx), l(h(i, j + 1, k + 1), h(i + 1, j + 1, k + 1), fx), fy),
      fz);
  }
  return function fbm(px, py, pz, oct = 5) {
    let a = 0.5, f = 1, s = 0;
    for (let o = 0; o < oct; o++) { s += a * noise(px * f, py * f, pz * f); a *= 0.5; f *= 2.03; }
    return s;
  };
}

export function sphereLoop(W, H, fn) {
  const cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d');
  const img = ctx.createImageData(W, H);
  const d = img.data;
  for (let y = 0; y < H; y++) {
    const lat = (0.5 - (y + 0.5) / H) * Math.PI;
    const cl = Math.cos(lat), sl = Math.sin(lat);
    for (let x = 0; x < W; x++) {
      const lon = ((x + 0.5) / W - 0.5) * TAU;
      const rgb = fn(cl * Math.cos(lon), sl, cl * Math.sin(lon), lat, lon);
      const o = (y * W + x) * 4;
      d[o] = rgb[0]; d[o + 1] = rgb[1]; d[o + 2] = rgb[2]; d[o + 3] = rgb.length > 3 ? rgb[3] : 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return { cv, ctx };
}

// 月面：主要月海放在大致正確的月面經緯度（東經為正，從地球看在右邊），
// 所以「從地球看」畫面裡看得到熟悉的月面花紋，也看得出永遠是同一面朝向地球。
export const MARIA = [
  // [緯度, 經度, 半徑（弧度）]
  [33, -16, 0.34], [28, 17, 0.21], [8, 31, 0.24], [17, 59, 0.13], [-6, 50, 0.16],
  [-15, 34, 0.11], [-20, -15, 0.17], [-24, -39, 0.11], [15, -55, 0.4], [-4, -32, 0.22],
  [55, -5, 0.1], [2, 6, 0.1],
];
export function makeMoonTexture() {
  const fbm = makeNoise(7);
  const mc = MARIA.map(([la, lo, r]) => {
    const a = la * DEG, b = lo * DEG;
    return [Math.cos(a) * Math.cos(b), Math.sin(a), Math.cos(a) * Math.sin(b), r];
  });
  const W = 1024, H = 512;
  const { cv, ctx } = sphereLoop(W, H, (x, y, z) => {
    // 貼圖經度 → 月面：u=0.5 是近地面中心（mesh 的 +X），往右經度增加。
    // sphereLoop 的 z 是 cos(lat) sin(lon)，與 MARIA 的換算相同。
    const n = fbm(x * 3, y * 3, z * 3);
    let mare = 0;
    for (const [mx, my, mz, r] of mc) {
      const dot = Math.max(-1, Math.min(1, x * mx + y * my + z * mz));
      const ang = Math.acos(dot);
      const edge = r * (1 + 0.8 * fbm(x * 3.2 + 11, y * 3.2, z * 3.2, 4));
      mare = Math.max(mare, MathUtils.smoothstep(edge, edge * 0.55, ang));
    }
    const fine = fbm(x * 18, y * 18, z * 18, 3);
    const hi = 0.66 + 0.12 * n + 0.06 * fine;
    const lo = 0.42 + 0.08 * fbm(x * 6 + 5, y * 6, z * 6, 3) + 0.03 * fine;
    const v = hi * (1 - mare) + lo * mare;
    return [v * 255, v * 252, v * 246];
  });
  // 撞擊坑：只畫反照率（亮環＋略暗的坑底），不烘焙陰影——光照是即時算的。
  let s = 4242;
  const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  const crater = (lat, lon, r, rim, floor) => {
    const cx = (lon / 360 + 0.5) * W, cy = (0.5 - lat / 180) * H;
    const sx = r / Math.max(0.2, Math.cos(lat * DEG));
    ctx.save();
    ctx.translate(cx, cy); ctx.scale(sx, r);
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
    g.addColorStop(0, `rgba(40,40,44,${floor})`);
    g.addColorStop(0.7, `rgba(40,40,44,${floor * 0.6})`);
    g.addColorStop(0.86, `rgba(255,255,250,${rim})`);
    g.addColorStop(1, 'rgba(255,255,250,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(0, 0, 1, 0, TAU); ctx.fill();
    ctx.restore();
  };
  for (let i = 0; i < 900; i++) {
    const lat = Math.asin(rnd() * 2 - 1) / DEG, lon = rnd() * 360 - 180;
    const r = 1.2 + Math.pow(rnd(), 3) * 9;
    crater(lat, lon, r, 0.05 + rnd() * 0.08, 0.06 + rnd() * 0.08);
  }
  // 三個有明顯輻射紋的年輕坑：第谷、哥白尼、克卜勒
  for (const [lat, lon, r, rays] of [[-43, -11, 7, 26], [9.6, -20, 6, 16], [8, -38, 4, 10]]) {
    const cx = (lon / 360 + 0.5) * W, cy = (0.5 - lat / 180) * H;
    ctx.save();
    ctx.translate(cx, cy); ctx.scale(1 / Math.cos(lat * DEG), 1);
    for (let k = 0; k < rays; k++) {
      const ang = rnd() * TAU, len = 20 + rnd() * 55;
      const ex = Math.cos(ang) * len, ey = Math.sin(ang) * len;
      const g = ctx.createLinearGradient(0, 0, ex, ey);
      g.addColorStop(0, 'rgba(255,255,250,0.10)'); g.addColorStop(1, 'rgba(255,255,250,0)');
      ctx.strokeStyle = g;
      ctx.lineWidth = 0.6 + rnd() * 1.2;
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(ex, ey); ctx.stroke();
    }
    ctx.restore();
    crater(lat, lon, r, 0.32, 0.04);
  }
  const tex = new CanvasTexture(cv);
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

export function glowTexture(stops) {
  const cv = document.createElement('canvas');
  cv.width = cv.height = 256;
  const ctx = cv.getContext('2d');
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  for (const [o, c] of stops) g.addColorStop(o, c);
  ctx.fillStyle = g; ctx.fillRect(0, 0, 256, 256);
  const t = new CanvasTexture(cv); t.colorSpace = SRGBColorSpace;
  return t;
}

export function starField(n, radius, seed, size) {
  let s = seed;
  const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  const pos = [], col = [];
  for (let i = 0; i < n; i++) {
    const u = rnd() * 2 - 1, th = rnd() * TAU, r = Math.sqrt(1 - u * u);
    pos.push(radius * r * Math.cos(th), radius * u, radius * r * Math.sin(th));
    const b = 0.45 + 0.55 * Math.pow(rnd(), 2.2);
    const warm = rnd();
    col.push(b * (warm > 0.8 ? 1 : 0.86), b * 0.92, b * (warm < 0.25 ? 1 : 0.84));
  }
  const g = new BufferGeometry();
  g.setAttribute('position', new Float32BufferAttribute(pos, 3));
  g.setAttribute('color', new Float32BufferAttribute(col, 3));
  return new Points(g, new PointsMaterial({ size, sizeAttenuation: false, vertexColors: true, transparent: true, opacity: 0.95, depthWrite: false }));
}

// 「從地球看」的月面著色：Lommel–Seeliger（真實月面的反射律）＋地球照。
// 第二課另外打開 shadowOn：在月面上逐點算「從這一點看，太陽被地球遮掉幾成」，
// 本影裡再補上大氣折射進來的紅光——月全食的紅月亮。
// 角度單位一律是「月亮視半徑」：shadowCenter 是地影中心相對月心的位置（x 向右、y 向上），
// earthR／sunR 是從月面看地球、太陽的視半徑。
export const skyMoonMaterial = (map) => new ShaderMaterial({
  uniforms: {
    map: { value: map }, sunDir: { value: new Vector3(1, 0, 0) }, earthshine: { value: 0.03 },
    shadowOn: { value: 0 }, shadowCenter: { value: new Vector2(100, 0) },
    earthR: { value: 3.7 }, sunR: { value: 1.03 },
  },
  vertexShader: `
    varying vec3 vN; varying vec3 vV; varying vec2 vUv;
    void main(){
      vUv = uv;
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      vN = normalize(normalMatrix * normal);
      vV = normalize(-mv.xyz);
      gl_Position = projectionMatrix * mv;
    }`,
  fragmentShader: `
    uniform sampler2D map; uniform vec3 sunDir; uniform float earthshine;
    uniform float shadowOn; uniform vec2 shadowCenter; uniform float earthR; uniform float sunR;
    varying vec3 vN; varying vec3 vV; varying vec2 vUv;
    // 兩圓（半徑 a、b，圓心距 d）重疊面積佔圓 a 的比例
    float overlapFrac(float a, float b, float d){
      if (d >= a + b) return 0.0;
      if (d <= abs(a - b)) return b >= a ? 1.0 : (b * b) / (a * a);
      float x = clamp((d*d + a*a - b*b) / (2.0*d*a), -1.0, 1.0);
      float y = clamp((d*d + b*b - a*a) / (2.0*d*b), -1.0, 1.0);
      float k = max(0.0, (-d + a + b) * (d + a - b) * (d - a + b) * (d + a + b));
      return (a*a*acos(x) + b*b*acos(y) - 0.5*sqrt(k)) / (3.14159265 * a*a);
    }
    void main(){
      vec3 n = normalize(vN); vec3 v = normalize(vV);
      float mu0 = dot(n, normalize(sunDir));
      float mu = max(dot(n, v), 0.0);
      float lit = mu0 > 0.0 ? min(2.0 * mu0 / (mu0 + mu + 1e-4), 1.35) : 0.0;
      lit *= smoothstep(-0.015, 0.05, mu0);
      vec3 albedo = texture2D(map, vUv).rgb;
      vec3 col = albedo * (lit * 1.12 + earthshine * (1.0 - min(lit, 1.0)));
      if (shadowOn > 0.5) {
        float d = length(n.xy - shadowCenter);
        float cover = overlapFrac(sunR, earthR, d);
        float umbraEdge = earthR - sunR;
        vec3 red = vec3(0.62, 0.20, 0.07) * (0.10 + 0.22 * clamp(d / max(umbraEdge, 0.01), 0.0, 1.0));
        float inUmbra = smoothstep(0.985, 1.0, cover);
        col = albedo * (lit * 1.12 * (1.0 - cover)) + albedo * red * inUmbra * min(lit + 0.6, 1.0);
      }
      gl_FragColor = vec4(col * vec3(1.0, 0.985, 0.95), 1.0);
      #include <colorspace_fragment>
    }`,
});

export const atmosphereMaterial = () => new ShaderMaterial({
  vertexShader: `
    varying vec3 vN; varying vec3 vV;
    void main(){
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz);
      gl_Position = projectionMatrix * mv;
    }`,
  fragmentShader: `
    varying vec3 vN; varying vec3 vV;
    void main(){
      // 背面球殼：越靠近地球邊緣越亮，往外淡出
      float f = pow(abs(dot(normalize(vN), normalize(vV))), 1.8);
      gl_FragColor = vec4(vec3(0.35, 0.62, 1.0) * f * 0.95, 1.0);
    }`,
  blending: AdditiveBlending, transparent: true, depthWrite: false, side: BackSide,
});

// ---------------------------------------------------------------------------
export function fmtClock(h) {
  h = ((h % 24) + 24) % 24;
  const hh = Math.floor(h), mm = Math.round((h - hh) * 2) * 30;
  const H24 = (mm === 60 ? hh + 1 : hh) % 24, M = mm === 60 ? 0 : mm;
  const h12 = H24 % 12 === 0 ? 12 : H24 % 12;
  const ap = H24 < 12 ? 'a.m.' : 'p.m.';
  const en = H24 === 12 && M === 0 ? 'noon' : H24 === 0 && M === 0 ? 'midnight' : `${h12}:${M ? '30' : '00'} ${ap}`;
  return { en, zh: `${String(H24).padStart(2, '0')}:${M ? '30' : '00'}` };
}

