/*
 * 天文教育 · 第一課「月亮為什麼會有圓缺？」的 3D 模型。
 *
 * 兩個畫面同步：
 *   左 太空視角：太陽光從 +X 射來，地球在原點，月亮沿 +Y（北）逆時針繞行。
 *   右 從地球看：另一個小場景，用 Lommel–Seeliger 反射把月面畫成真實的樣子
 *       （滿月是一片平的亮盤，不是一顆漸層的球），暗面留一點地球照。
 *
 * 座標約定（改之前先讀這段）：
 *   月亮的「距角」a：0 = 朔（新月，月在日地之間），π = 望（滿月）。
 *   月心 = (D cos a, 0, -D sin a)，再依白道傾角繞 Z 軸傾斜——節點線放在上弦／下弦，
 *   所以朔望時月亮一定在黃道面上方或下方，模型裡永遠不會誤發生日食或月食，
 *   跟課文「多數月份月亮從地影上方或下方經過」一致。
 *   從北半球看，camera up = +Y，上弦時右半邊亮；南半球把 up 翻成 -Y。
 *
 * 產物：cd tools/astro && npm run build → assets/js/moon-phases.js
 */
import {
  AdditiveBlending, AmbientLight, ArrowHelper, BackSide, BufferGeometry, CanvasTexture, Color,
  ConeGeometry, DirectionalLight, Float32BufferAttribute, Group, LineBasicMaterial, LineLoop,
  MathUtils, Mesh, MeshBasicMaterial, MeshLambertMaterial, PerspectiveCamera, Points,
  PointsMaterial, Raycaster, Scene, ShaderMaterial, SphereGeometry, SRGBColorSpace, Sprite,
  SpriteMaterial, TorusGeometry, Vector2, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const SYN = 29.530588853;                 // 朔望月（天）
const TAU = Math.PI * 2;
const DEG = Math.PI / 180;

// 兩種比例。compact 是教科書式的「看得清楚」版；true 是真實比例
// （地球半徑 = 1；月球半徑 0.273；地月距離 60.3；白道傾角 5.1°；本影長約 217）。
const SCALES = {
  compact: { D: 6.5, rm: 0.5, incl: 13 * DEG, umbra: 22 },
  true:    { D: 60.3, rm: 0.273, incl: 5.1 * DEG, umbra: 217 },
};

// 八相的區間：主要月相各 ±12°（約 ±1 天），其餘為過渡的眉月／凸月。
const PHASE_CENTERS = [0, 45, 90, 135, 180, 225, 270, 315];
function phaseIndex(elongDeg) {
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

const ZH_DAY = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
  '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
  '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'];

// ---------------------------------------------------------------------------
// 今天的月亮：Meeus《Astronomical Algorithms》48.4 的低精度月相公式，誤差約一小時內，
// 對「今晚月亮長什麼樣子」綽綽有餘。回傳距角（度，0–360，0–180 為漸盈）。
function elongationAt(date) {
  const jd = date.getTime() / 86400000 + 2440587.5;
  const T = (jd - 2451545) / 36525;
  const D = 297.8501921 + 445267.1114034 * T - 0.0018819 * T * T;
  const M = 357.5291092 + 35999.0502909 * T - 0.0001536 * T * T;
  const Mp = 134.9633964 + 477198.8675055 * T + 0.0087414 * T * T;
  const s = (x) => Math.sin(x * DEG);
  const e = D + 6.289 * s(Mp) - 2.1 * s(M) + 1.274 * s(2 * D - Mp) + 0.658 * s(2 * D)
    + 0.214 * s(2 * Mp) + 0.11 * s(D);
  return ((e % 360) + 360) % 360;
}

// 往回找上一次朔的時刻（牛頓法三次就收斂），用來算真正的農曆日期：
// 農曆以東八區的日期為準，朔所在的那一天就是初一。
function lastNewMoon(now) {
  let t = now.getTime() - elongationAt(now) / 360 * SYN * 86400000;
  for (let k = 0; k < 4; k++) {
    let e = elongationAt(new Date(t));
    if (e > 180) e -= 360;
    t -= e / 12.19 * 86400000;
  }
  return new Date(t);
}
function taiwanDayNumber(d) { return Math.floor((d.getTime() + 8 * 3600000) / 86400000); }

// ---------------------------------------------------------------------------
// 程序化貼圖（不外連任何圖檔）：3D value noise 取樣在球面上，所以經度 0°/360° 無接縫。
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

function sphereLoop(W, H, fn) {
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
const MARIA = [
  // [緯度, 經度, 半徑（弧度）]
  [33, -16, 0.34], [28, 17, 0.21], [8, 31, 0.24], [17, 59, 0.13], [-6, 50, 0.16],
  [-15, 34, 0.11], [-20, -15, 0.17], [-24, -39, 0.11], [15, -55, 0.4], [-4, -32, 0.22],
  [55, -5, 0.1], [2, 6, 0.1],
];
function makeMoonTexture() {
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

function makeEarthTextures() {
  const fbm = makeNoise(31);
  const W = 768, H = 384;
  const { cv } = sphereLoop(W, H, (x, y, z, lat) => {
    const alat = Math.abs(lat) / DEG;
    const n = fbm(x * 1.7 + 3, y * 1.7, z * 1.7) + 0.08 * fbm(x * 9, y * 9, z * 9, 2);
    if (alat > 72 + 6 * fbm(x * 4, y * 4, z * 4, 2)) return [236, 242, 248];
    if (n > 0.05) {
      const desert = MathUtils.smoothstep(12, 22, alat) * MathUtils.smoothstep(34, 26, alat);
      const t = Math.min(1, (n - 0.05) * 5);
      const g = [58 + 30 * t, 110 + 12 * t, 62];
      const d = [196, 170, 118];
      const m = desert * 0.8;
      return [g[0] * (1 - m) + d[0] * m, g[1] * (1 - m) + d[1] * m, g[2] * (1 - m) + d[2] * m];
    }
    const deep = Math.min(1, -n * 3 + 0.4);
    return [22 + 20 * (1 - deep), 66 + 40 * (1 - deep), 138 + 40 * (1 - deep)];
  });
  const clouds = sphereLoop(512, 256, (x, y, z, lat) => {
    const c = fbm(x * 2.4 + 9, y * 5, z * 2.4, 5);
    const band = 0.6 + 0.4 * Math.abs(Math.cos(lat * 3));
    const a = MathUtils.clamp((c * band - 0.06) * 3.2, 0, 0.85);
    return [255, 255, 255, a * 255];
  }).cv;
  const t1 = new CanvasTexture(cv); t1.colorSpace = SRGBColorSpace;
  const t2 = new CanvasTexture(clouds); t2.colorSpace = SRGBColorSpace;
  return [t1, t2];
}

function glowTexture(stops) {
  const cv = document.createElement('canvas');
  cv.width = cv.height = 256;
  const ctx = cv.getContext('2d');
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  for (const [o, c] of stops) g.addColorStop(o, c);
  ctx.fillStyle = g; ctx.fillRect(0, 0, 256, 256);
  const t = new CanvasTexture(cv); t.colorSpace = SRGBColorSpace;
  return t;
}

function starField(n, radius, seed, size) {
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
const skyMoonMaterial = (map) => new ShaderMaterial({
  uniforms: { map: { value: map }, sunDir: { value: new Vector3(1, 0, 0) }, earthshine: { value: 0.03 } },
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
    varying vec3 vN; varying vec3 vV; varying vec2 vUv;
    void main(){
      vec3 n = normalize(vN); vec3 v = normalize(vV);
      float mu0 = dot(n, normalize(sunDir));
      float mu = max(dot(n, v), 0.0);
      float lit = mu0 > 0.0 ? min(2.0 * mu0 / (mu0 + mu + 1e-4), 1.35) : 0.0;
      lit *= smoothstep(-0.015, 0.05, mu0);
      vec3 albedo = texture2D(map, vUv).rgb;
      vec3 col = albedo * (lit * 1.12 + earthshine * (1.0 - min(lit, 1.0)));
      gl_FragColor = vec4(col * vec3(1.0, 0.985, 0.95), 1.0);
      #include <colorspace_fragment>
    }`,
});

const atmosphereMaterial = () => new ShaderMaterial({
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
function fmtClock(h) {
  h = ((h % 24) + 24) % 24;
  const hh = Math.floor(h), mm = Math.round((h - hh) * 2) * 30;
  const H24 = (mm === 60 ? hh + 1 : hh) % 24, M = mm === 60 ? 0 : mm;
  const h12 = H24 % 12 === 0 ? 12 : H24 % 12;
  const ap = H24 < 12 ? 'a.m.' : 'p.m.';
  const en = H24 === 12 && M === 0 ? 'noon' : H24 === 0 && M === 0 ? 'midnight' : `${h12}:${M ? '30' : '00'} ${ap}`;
  return { en, zh: `${String(H24).padStart(2, '0')}:${M ? '30' : '00'}` };
}

function initLab(root) {
  const $ = (sel) => root.querySelector(sel);
  const phases = JSON.parse(root.getAttribute('data-phases') || '[]');
  const spaceWrap = $('.al-space');
  const spaceCv = $('.al-space-cv');
  const skyCv = $('.al-sky-cv');
  const labels = $('.al-labels');

  let renderer, skyRenderer;
  try {
    renderer = new WebGLRenderer({ canvas: spaceCv, antialias: true });
    skyRenderer = new WebGLRenderer({ canvas: skyCv, antialias: true });
  } catch (e) {
    root.classList.add('al-nogl');
    return null;
  }
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(dpr);
  skyRenderer.setPixelRatio(dpr);

  const moonTex = makeMoonTexture();
  const [earthTex, cloudTex] = makeEarthTextures();

  // ---------------- 太空視角 ----------------
  const scene = new Scene();
  scene.background = new Color(0x050814);
  const camera = new PerspectiveCamera(40, 1.6, 0.05, 6000);
  const HOME = new Vector3(1.8, 9.2, 9.8);
  camera.position.copy(HOME);
  const controls = new OrbitControls(camera, spaceCv);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.minDistance = 3;
  controls.maxDistance = 60;
  controls.target.set(0, 0, 0);

  scene.add(starField(1800, 2500, 99, 1.6));
  scene.add(new AmbientLight(0xb8c6ff, 0.16));
  const sunLight = new DirectionalLight(0xfff4e0, 3.2);
  sunLight.position.set(1, 0, 0);
  scene.add(sunLight);

  const sun = new Sprite(new SpriteMaterial({
    map: glowTexture([[0, 'rgba(255,255,245,1)'], [0.12, 'rgba(255,240,180,1)'], [0.24, 'rgba(255,190,80,.55)'], [0.5, 'rgba(255,150,40,.14)'], [1, 'rgba(255,120,20,0)']]),
    blending: AdditiveBlending, depthWrite: false, transparent: true,
  }));
  scene.add(sun);

  const rays = new Group();
  for (const [y, z] of [[0, 0], [0.8, 1.3], [-0.8, 1.3], [0.8, -1.3], [-0.8, -1.3], [0, 2.6], [0, -2.6]]) {
    const ar = new ArrowHelper(new Vector3(-1, 0, 0), new Vector3(0, y, z), 1.8, 0xffcf6b, 0.3, 0.16);
    ar.line.material.transparent = true; ar.line.material.opacity = 0.55;
    ar.cone.material.transparent = true; ar.cone.material.opacity = 0.7;
    rays.add(ar);
  }
  scene.add(rays);

  const earth = new Mesh(new SphereGeometry(1, 64, 48), new MeshLambertMaterial({ map: earthTex }));
  // 地軸傾角與月相無關，這裡刻意不畫，免得學生以為兩者有關。
  scene.add(earth);
  const clouds = new Mesh(new SphereGeometry(1.012, 48, 32), new MeshLambertMaterial({ map: cloudTex, transparent: true, depthWrite: false }));
  scene.add(clouds);
  const atmo = new Mesh(new SphereGeometry(1.1, 48, 32), atmosphereMaterial());
  scene.add(atmo);

  const shadow = new Mesh(new ConeGeometry(1, 1, 48, 1, true), new MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.42, depthWrite: false }));
  shadow.rotation.z = Math.PI / 2;         // 軸指向 -X：永遠背對太陽
  shadow.visible = false;
  scene.add(shadow);

  const tilt = new Group();
  scene.add(tilt);
  const ringPts = [];
  for (let i = 0; i < 180; i++) { const t = i / 180 * TAU; ringPts.push(Math.cos(t), 0, -Math.sin(t)); }
  const orbitGeo = new BufferGeometry();
  orbitGeo.setAttribute('position', new Float32BufferAttribute(ringPts, 3));
  const orbit = new LineLoop(orbitGeo, new LineBasicMaterial({ color: 0x9fb6d8, transparent: true, opacity: 0.35 }));
  tilt.add(orbit);

  const moonGeo = new SphereGeometry(1, 64, 48);
  const ghostMat = new MeshLambertMaterial({ map: moonTex, color: 0x8f96a0 });
  const ghosts = PHASE_CENTERS.map((deg, i) => {
    const g = new Mesh(moonGeo, ghostMat);
    g.userData.phase = i;
    tilt.add(g);
    return g;
  });

  const pivot = new Group();
  tilt.add(pivot);
  const moon = new Mesh(moonGeo, new MeshLambertMaterial({ map: moonTex }));
  moon.rotation.y = Math.PI;               // 本地 +X（近地面中心）朝向地球：潮汐鎖定
  pivot.add(moon);
  const earthRing = new Mesh(new TorusGeometry(1.06, 0.035, 10, 96), new MeshBasicMaterial({ color: 0x4fd1c5 }));
  earthRing.rotation.y = Math.PI / 2;      // 環的法線 = 本地 +X = 指向地球
  moon.add(earthRing);
  const sunRing = new Mesh(new TorusGeometry(1.1, 0.035, 10, 96), new MeshBasicMaterial({ color: 0xffd36e }));
  sunRing.rotation.y = Math.PI / 2;        // 法線 = 世界 +X = 指向太陽
  scene.add(sunRing);

  // ---------------- 從地球看 ----------------
  const sky = new Scene();
  const skyCam = new PerspectiveCamera(30, 1, 0.1, 100);
  skyCam.position.set(0, 0, 5.1);
  const skyBgCv = document.createElement('canvas');
  skyBgCv.width = 8; skyBgCv.height = 256;
  const sbx = skyBgCv.getContext('2d');
  const sg = sbx.createLinearGradient(0, 0, 0, 256);
  sg.addColorStop(0, '#02040c'); sg.addColorStop(1, '#0b1630');
  sbx.fillStyle = sg; sbx.fillRect(0, 0, 8, 256);
  const skyBg = new CanvasTexture(skyBgCv); skyBg.colorSpace = SRGBColorSpace;
  sky.background = skyBg;
  const skyStars = starField(260, 40, 5, 1.3);
  sky.add(skyStars);
  const halo = new Sprite(new SpriteMaterial({
    map: glowTexture([[0, 'rgba(255,250,235,.55)'], [0.35, 'rgba(255,245,225,.35)'], [0.55, 'rgba(210,220,255,.08)'], [1, 'rgba(200,210,255,0)']]),
    blending: AdditiveBlending, depthWrite: false, transparent: true,
  }));
  halo.scale.set(3.6, 3.6, 1);
  halo.position.z = -0.5;
  sky.add(halo);
  const skyMoonMat = skyMoonMaterial(moonTex);
  const skyMoon = new Mesh(moonGeo, skyMoonMat);
  sky.add(skyMoon);

  // ---------------- 狀態 ----------------
  const state = {
    age: 0, playing: false, speed: 1.5, south: false,
    scaleT: 0, scaleTarget: 0,           // 0 = compact, 1 = true
    showRings: true, showGhosts: true, showShadow: false,
    today: null,
  };
  const lerp = MathUtils.lerp;
  const cur = { D: 0, rm: 0, incl: 0, umbra: 0 };
  function applyScale() {
    const t = MathUtils.smootherstep(state.scaleT, 0, 1);
    for (const k of Object.keys(cur)) cur[k] = lerp(SCALES.compact[k], SCALES.true[k], t);
    tilt.rotation.z = cur.incl;
    orbit.scale.setScalar(cur.D);
    moon.position.set(cur.D, 0, 0);
    moon.scale.setScalar(cur.rm);
    sunRing.scale.setScalar(cur.rm);
    ghosts.forEach((g, i) => {
      const a = PHASE_CENTERS[i] * DEG;
      g.position.set(cur.D * Math.cos(a), 0, -cur.D * Math.sin(a));
      g.rotation.y = a + Math.PI;
      g.scale.setScalar(cur.rm * 0.55);
    });
    const k = cur.D / SCALES.compact.D;
    sun.position.set(cur.D * 2.35, 0, 0);
    sun.scale.setScalar(cur.D * 0.95);
    rays.position.set(cur.D * 1.3, 0, 0);
    rays.scale.setScalar(Math.max(1, k * 0.9));
    shadow.scale.set(1, cur.umbra, 1);
    shadow.position.set(-cur.umbra / 2, 0, 0);
    controls.maxDistance = lerp(60, 520, t);
  }

  const tmp = new Vector3(), fwd = new Vector3(), right = new Vector3(), up = new Vector3();
  const SUN = new Vector3(1, 0, 0);
  function applyAge() {
    const a = (state.age / SYN) * TAU;
    pivot.rotation.y = a;
    moon.updateWorldMatrix(true, false);
    moon.getWorldPosition(tmp);
    sunRing.position.copy(tmp);
    earthRing.visible = sunRing.visible = state.showRings;
    ghosts.forEach((g) => { g.visible = state.showGhosts; });
    shadow.visible = state.showShadow;

    // 從地心看月亮：把太陽方向換到觀測者的相機座標
    fwd.copy(tmp).normalize();
    const worldUp = state.south ? new Vector3(0, -1, 0) : new Vector3(0, 1, 0);
    right.crossVectors(fwd, worldUp).normalize();
    up.crossVectors(right, fwd).normalize();
    const sd = new Vector3(SUN.dot(right), SUN.dot(up), -SUN.dot(fwd));
    skyMoonMat.uniforms.sunDir.value.copy(sd);
    const illum = (1 - Math.cos(a)) / 2;
    skyMoonMat.uniforms.earthshine.value = 0.012 + 0.05 * (1 + Math.cos(a)) / 2;
    halo.material.opacity = 0.12 + 0.88 * Math.pow(illum, 1.4);
    skyMoon.rotation.set(0, -Math.PI / 2, 0);
    if (state.south) skyMoon.rotateOnWorldAxis(new Vector3(0, 0, 1), Math.PI);
    skyStars.rotation.z = state.south ? Math.PI : 0;
    updateReadout(a, illum, sd);
  }

  // ---------------- 讀數 ----------------
  const R = {
    en: $('.al-phase-en'), zh: $('.al-phase-zh'), age: $('[data-r="age"]'), lunar: $('[data-r="lunar"]'),
    lit: $('[data-r="lit"]'), rise: $('[data-r="rise"]'), set: $('[data-r="set"]'),
    when: $('.al-when'), sunDir: $('.al-sun-dir'), sunDirT: $('.al-sun-dir em'), badge: $('.al-badge'), slider: $('.al-age'),
    chips: root.querySelectorAll('.al-chip'), hemi: $('.al-hemi-note'),
  };
  let lastPhase = -1;
  function updateReadout(a, illum, sd) {
    const elong = a / DEG;
    const pi = phaseIndex(elong);
    const ph = phases[pi] || {};
    if (pi !== lastPhase) {
      R.en.textContent = ph.en || '';
      R.zh.textContent = ph.zh || '';
      R.when.innerHTML = `${ph.when_en || ''}<span>${ph.when_zh || ''}</span>`;
      R.chips.forEach((c, i) => c.classList.toggle('on', i === pi));
      lastPhase = pi;
    }
    R.age.textContent = `${state.age.toFixed(1)} days · ${state.age.toFixed(1)} 天`;
    let lunar;
    if (state.today && Math.abs(state.today.age - state.age) < 1e-6) {
      lunar = `農曆${state.today.lunar}`;
    } else {
      lunar = `約農曆${ZH_DAY[Math.min(29, Math.floor(state.age))]}`;
    }
    R.lunar.textContent = lunar;
    R.lit.textContent = `${Math.round(illum * 100)}%`;
    const rise = 6 + (elong / 360) * 24;
    const r1 = fmtClock(rise), r2 = fmtClock(rise + 12.4);
    R.rise.textContent = `${r1.en} · ${r1.zh}`;
    R.set.textContent = `${r2.en} · ${r2.zh}`;
    R.slider.value = state.age.toFixed(2);
    R.slider.style.setProperty('--p', `${(state.age / SYN) * 100}%`);
    // 太陽在哪個方向：亮面永遠朝向太陽
    const len = Math.hypot(sd.x, sd.y);
    const dir = len > 0.25;
    R.sunDir.classList.toggle('dir', dir);
    R.sunDir.style.setProperty('--ang', `${dir ? Math.atan2(-sd.y, sd.x) : 0}rad`);
    R.sunDirT.textContent = dir ? '' : (sd.z < 0 ? 'Sun behind the Moon · 太陽在月亮後方' : 'Sun behind you · 太陽在你背後');
  }

  // ---------------- 標籤 ----------------
  const lab = (cls, html) => { const s = document.createElement('span'); s.className = `al-lab ${cls}`; s.innerHTML = html; labels.appendChild(s); return s; };
  const L = {
    sun: lab('sun', '&#9728; Sun · 太陽<b>&rarr;</b>'),
    earth: lab('earth', 'Earth · 地球'),
    moon: lab('moon', 'Moon · 月亮'),
  };
  const proj = new Vector3();
  function placeLabel(el, v, dy) {
    proj.copy(v).project(camera);
    const w = spaceCv.clientWidth, h = spaceCv.clientHeight;
    const off = proj.z > 1 || Math.abs(proj.x) > 1.2 || Math.abs(proj.y) > 1.2;
    el.style.opacity = off ? 0 : 1;
    const hw = el.offsetWidth / 2 + 6;
    const x = Math.min(w - hw, Math.max(hw, (proj.x * 0.5 + 0.5) * w));
    el.style.transform = `translate(${x}px, ${(-proj.y * 0.5 + 0.5) * h + dy}px) translate(-50%, 0)`;
  }
  const lp = new Vector3();
  function placeSun() {
    proj.copy(sun.position).project(camera);
    let x = proj.x, y = proj.y;
    if (proj.z > 1) { x = -x; y = -y; }
    const out = Math.abs(x) > 0.92 || Math.abs(y) > 0.9 || proj.z > 1;
    const w = spaceCv.clientWidth, h = spaceCv.clientHeight;
    const el = L.sun;
    el.classList.toggle('edge', out);
    let px, py;
    if (out) {
      const k = 1 / Math.max(Math.abs(x) / 0.8, Math.abs(y) / 0.84, 1e-6);
      px = x * k; py = y * k;
      el.style.setProperty('--ang', `${Math.atan2(-y, x)}rad`);
    } else {
      px = x; py = y - cur.D * 0.03;
    }
    el.style.opacity = 1;
    const hw = el.offsetWidth / 2 + 8, hh = el.offsetHeight / 2 + 8;
    const sx = Math.min(w - hw, Math.max(hw, (px * 0.5 + 0.5) * w));
    const sy = Math.min(h - hh, Math.max(hh, (-py * 0.5 + 0.5) * h));
    el.style.transform = `translate(${sx}px, ${sy}px) translate(-50%, ${out ? '-50%' : '0'})`;
  }
  function updateLabels() {
    placeSun();
    placeLabel(L.earth, lp.set(0, -1.15, 0), 6);
    moon.getWorldPosition(lp); lp.y -= cur.rm * 1.25;
    placeLabel(L.moon, lp, 6);
  }

  // ---------------- 尺寸 ----------------
  function resize() {
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (w && h) {
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // 窄畫面（手機直向、桌機右側有面板）時放大垂直視角，讓水平方向至少有 ~58°，軌道才放得進來。
      const hMin = (camera.aspect < 1.1 ? 66 : 58) * DEG;
      camera.fov = Math.max(40, 2 * Math.atan(Math.tan(hMin / 2) / camera.aspect) / DEG);
      camera.updateProjectionMatrix();
    }
    const s = skyCv.parentElement.clientWidth;
    if (s) { skyRenderer.setSize(s, s, false); }
  }
  new ResizeObserver(resize).observe(spaceWrap);
  new ResizeObserver(resize).observe(skyCv.parentElement);
  resize();

  // ---------------- 操作 ----------------
  const playBtn = $('.al-play');
  function setPlaying(p) {
    state.playing = p;
    root.classList.toggle('is-playing', p);
    playBtn.setAttribute('aria-pressed', p ? 'true' : 'false');
    playBtn.querySelector('.al-play-t').innerHTML = p ? 'Pause · 暫停' : 'Play · 播放';
  }
  function setAge(age, fromUser = true) {
    state.age = ((age % SYN) + SYN) % SYN;
    if (fromUser) R.badge.hidden = true;
    applyAge();
  }
  playBtn.addEventListener('click', () => { setPlaying(!state.playing); R.badge.hidden = true; root.classList.remove('al-fresh'); });
  R.slider.addEventListener('input', () => { setPlaying(false); setAge(parseFloat(R.slider.value)); });
  R.chips.forEach((c, i) => c.addEventListener('click', () => {
    setPlaying(false); setAge(PHASE_CENTERS[i] / 360 * SYN);
  }));
  root.querySelectorAll('.al-speed button').forEach((b) => b.addEventListener('click', () => {
    state.speed = parseFloat(b.getAttribute('data-speed'));
    root.querySelectorAll('.al-speed button').forEach((x) => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
    if (!state.playing) setPlaying(true);
  }));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => { fn(el.checked); applyAge(); }); return el; };
  bind('[data-t="rings"]', (v) => { state.showRings = v; });
  bind('[data-t="ghosts"]', (v) => { state.showGhosts = v; });
  bind('[data-t="shadow"]', (v) => { state.showShadow = v; });
  bind('[data-t="south"]', (v) => {
    state.south = v;
    R.hemi.textContent = v ? 'Southern Hemisphere view (e.g. Australia) · 南半球視角（例：澳洲）' : 'Northern Hemisphere view (Taiwan) · 北半球視角（台灣）';
  });
  bind('[data-t="scale"]', (v) => { state.scaleTarget = v ? 1 : 0; root.classList.toggle('al-true', v); });
  $('.al-home').addEventListener('click', () => {
    camFrom.copy(camera.position); camTo.copy(HOME).multiplyScalar(lerp(1, 9.3, state.scaleT)); camT = 0;
  });
  function goToday() {
    const now = new Date();
    const elong = elongationAt(now);
    const nm = lastNewMoon(now);
    const lunarIdx = taiwanDayNumber(now) - taiwanDayNumber(nm);
    state.today = { age: elong / 360 * SYN, lunar: ZH_DAY[Math.max(0, Math.min(29, lunarIdx))] };
    setPlaying(false);
    setAge(state.today.age, false);
    R.badge.hidden = false;
    R.badge.querySelector('b').textContent = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
  }
  $('.al-today').addEventListener('click', goToday);

  // 點太空視角裡的八個小月亮也能跳過去（拖曳旋轉時不算點擊）
  const ray = new Raycaster();
  const ndc = new Vector2();
  let down = null;
  spaceCv.addEventListener('pointerdown', (e) => { down = [e.clientX, e.clientY]; });
  spaceCv.addEventListener('pointerup', (e) => {
    if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 6 || !state.showGhosts) return;
    const r = spaceCv.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(ghosts, false)[0];
    if (hit) { setPlaying(false); setAge(PHASE_CENTERS[hit.object.userData.phase] / 360 * SYN); }
  });
  spaceCv.addEventListener('pointermove', (e) => {
    if (e.buttons || !state.showGhosts) return;
    const r = spaceCv.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    spaceCv.style.cursor = ray.intersectObjects(ghosts, false).length ? 'pointer' : 'grab';
  });

  // ---------------- 迴圈 ----------------
  let visible = false, raf = 0, last = 0;
  const camFrom = new Vector3(), camTo = new Vector3();
  let camT = 1;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    if (state.playing) setAge(state.age + dt * state.speed, false);
    earth.rotation.y += dt * 0.25;
    clouds.rotation.y += dt * 0.29;
    if (state.scaleT !== state.scaleTarget) {
      const prev = state.scaleT;
      state.scaleT = state.scaleTarget > prev ? Math.min(1, prev + dt / 1.6) : Math.max(0, prev - dt / 1.6);
      const f0 = lerp(1, 9.3, MathUtils.smootherstep(prev, 0, 1));
      const f1 = lerp(1, 9.3, MathUtils.smootherstep(state.scaleT, 0, 1));
      camera.position.multiplyScalar(f1 / f0);
      applyScale(); applyAge();
    }
    if (camT < 1) {
      camT = Math.min(1, camT + dt / 0.9);
      camera.position.lerpVectors(camFrom, camTo, MathUtils.smootherstep(camT, 0, 1));
    }
    controls.update();
    updateLabels();
    renderer.render(scene, camera);
    skyRenderer.render(sky, skyCam);
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  applyScale();
  goToday();
  root.__lab = { camera, controls, state };   // 除錯用：在主控台 $('[data-moon-lab]').__lab
  root.classList.add('al-ready', 'al-fresh');

  const api = {
    setAge: (age) => { setPlaying(false); setAge(age); },
    phase: (i) => { setPlaying(false); setAge(PHASE_CENTERS[i] / 360 * SYN); },
  };
  return api;
}

function boot() {
  const root = document.querySelector('[data-moon-lab]');
  if (!root) return;
  // 貼圖是現場算的（約 0.2 秒），等模型快捲進畫面再建，不拖慢頁面載入。
  let api = null, started = false;
  const start = () => { if (!started) { started = true; api = initLab(root); } return api; };
  const io = new IntersectionObserver((ents) => {
    if (ents[0].isIntersecting) { io.disconnect(); start(); }
  }, { rootMargin: '600px' });
  io.observe(root);
  // 下方「八個月相」卡片的「在 3D 模型中看」按鈕
  document.querySelectorAll('[data-lab-phase]').forEach((b) => b.addEventListener('click', (e) => {
    const lab = start();
    if (!lab) return;
    e.preventDefault();
    lab.phase(parseInt(b.getAttribute('data-lab-phase'), 10));
    root.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }));
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
