/*
 * 天文教育 · 第十課「星星離我們多遠？」的 3D 模型。
 *
 * 一個機制：視差。地球繞太陽，半年後到了軌道的另一邊；近的星在遠方星空前面微微換了位置，越遠的星換得越少。
 * 兩個場景共用一個 renderer：
 *   ・視差（parallax）：地球軌道是真實大小（1 AU＝10 單位），到恆星的距離縮小 67,000 倍（同一個倍率，所以遠近關係是對的）。
 *     兩條視線從地球「今天」與「半年後」的位置穿過那顆星，打到遠方星空上的兩個點——那段差距就是視差位移。
 *   ・太陽的鄰居（20／100／2,000 光年）：Hipparcos 量到的真實恆星位置（1 光年＝1 單位），
 *     沿視線方向的橘色短線是距離的誤差範圍：越遠越長。
 * 右側「望遠鏡裡看到的」：用真實視差畫一年的視差橢圓（每顆星同一個放大倍率），北上東左。
 *
 * 座標同第七課：黃道 (x, y, z) → 場景 (x, z, -y)。星表：near-stars.js（Hipparcos，CC BY-NC 3.0 IGO，Credit: ESA）。
 * 產物：cd tools/astro && npm run build → assets/js/star-distance.js
 */
import {
  AdditiveBlending, BufferGeometry, CanvasTexture, Color, Float32BufferAttribute, Group, Line, LineBasicMaterial,
  LineDashedMaterial, LineLoop, LineSegments, MathUtils, Mesh, MeshBasicMaterial, PerspectiveCamera, Points,
  PointsMaterial, Scene, ShaderMaterial, SphereGeometry, Sprite, SpriteMaterial, SRGBColorSpace, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DEG, TAU, glowTexture } from './common.js';
import { STARS } from './stars-data.js';
import { N_STARS, STAR_ECL, altAz, bvColor } from './sky.js';
import { NEAR_NAMED } from './near-stars.js';
import {
  AU_PER_LY, N_NEAR, absMag, birthdayStars, coinKm, departYear, eqToEclVec, eqVec, eraOf, fmtYear, lyOf, lyRange,
  nearStar, parallaxShift, starByKey, starName,
} from './distance.js';
import { helio } from './planets.js';

const K = 10;                       // 視差場景：1 AU＝10 單位
export const SHRINK = 67000;        // 視差場景：恆星距離縮小的倍率
const RS_A = 90000;                 // 視差場景的遠方星空半徑
const SIGHT_N = 48;                 // 每條視線切成幾個點（越靠近地球越密）
const DAY = 86400000, YEAR = 365.25636 * DAY;
const SITE = { lat: 24.08, lon: 120.54 };   // 彰化
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const sv = (p, k = 1) => new Vector3(p[0] * k, p[2] * k, -p[1] * k);
const eclDir = (s) => sv(eqToEclVec(eqVec(s.ra, s.dec)));
const lineGeo = (pts) => { const g = new BufferGeometry(); g.setAttribute('position', new Float32BufferAttribute(pts.flatMap((p) => [p.x, p.y, p.z]), 3)); return g; };
const fmtLy = (ly) => (ly < 10 ? ly.toFixed(2) : ly < 100 ? ly.toFixed(1) : Math.round(ly).toLocaleString('en-US'));
const fmtArcsec = (mas) => (mas / 1000).toFixed(mas >= 100 ? 3 : 4);
const commas = (n) => Math.round(n).toLocaleString('en-US');
const relErr = (s) => s.e / s.plx;
/** 光出發的年份（誤差大時給範圍）。 */
function departText(s, now = new Date()) {
  const ly = lyOf(s.plx), y = departYear(ly, now), era = eraOf(y);
  if (relErr(s) < 0.04) {
    const fy = fmtYear(y);
    return { en: `${fy.en}${era.key === 'roc' ? '' : `, ${era.en}`}`, zh: `${fy.zh}（${era.zh}）`, y };
  }
  const [lo, hi] = lyRange(s.plx, s.e);
  const y1 = departYear(hi, now), y2 = departYear(lo, now), e1 = eraOf(y1), e2 = eraOf(y2);
  const a = fmtYear(y1), b = fmtYear(y2), round = (t) => t.replace(/\d+/, (m) => String(Math.round(+m / 10) * 10));
  const eras = e1.zh === e2.zh ? { en: e1.en, zh: e1.zh } : { en: `${e1.en} to ${e2.en}`, zh: `${e1.zh}到${e2.zh}` };
  if (!isFinite(hi)) return { en: `before ${b.en} (too far to measure well)`, zh: `${b.zh}以前（太遠，量不準）`, y };
  return { en: `between about ${round(a.en)} and ${round(b.en)}, ${eras.en}`, zh: `大約 ${round(a.zh)}到 ${round(b.zh)}（${eras.zh}）`, y };
}
function distText(s) {
  const ly = lyOf(s.plx);
  if (relErr(s) < 0.04) return { en: `${fmtLy(ly)} light-years`, zh: `${fmtLy(ly)} 光年` };
  const [lo, hi] = lyRange(s.plx, s.e);
  return { en: `about ${fmtLy(ly)} light-years (${commas(lo)}–${commas(hi)})`, zh: `約 ${fmtLy(ly)} 光年（${commas(lo)}–${commas(hi)}）` };
}

function ringTexture() {
  const cv = document.createElement('canvas'); cv.width = cv.height = 64;
  const c = cv.getContext('2d'); c.strokeStyle = '#fff'; c.lineWidth = 5; c.beginPath(); c.arc(32, 32, 26, 0, TAU); c.stroke();
  const t = new CanvasTexture(cv); t.colorSpace = SRGBColorSpace; return t;
}
// uMax：離原點超過這個距離的星不畫（鄰居視角只畫視野範圍內的星）
function starPoints(pos, tint, size, dpr) {
  const g = new BufferGeometry();
  g.setAttribute('position', new Float32BufferAttribute(pos, 3)); g.setAttribute('tint', new Float32BufferAttribute(tint, 3)); g.setAttribute('size', new Float32BufferAttribute(size, 1));
  return new Points(g, new ShaderMaterial({
    uniforms: { dpr: { value: dpr }, uMax: { value: 1e12 } },
    vertexShader: `attribute vec3 tint; attribute float size; uniform float dpr; uniform float uMax; varying vec3 vC;
      void main(){ vC = tint; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_PointSize = length(position) > uMax ? 0.0 : size * dpr; }`,
    fragmentShader: `varying vec3 vC; void main(){ float r = length(gl_PointCoord - 0.5) * 2.0; float a = smoothstep(1.0, 0.15, r); a *= a; gl_FragColor = vec4(vC * a, 1.0); }`,
    blending: AdditiveBlending, transparent: true, depthWrite: false,
  }));
}

// ---------------------------------------------------------------------------
function initLab(root) {
  const $ = (s) => root.querySelector(s), $$ = (s) => root.querySelectorAll(s);
  const spaceWrap = $('.al-space'), spaceCv = $('.al-space-cv'), labels = $('.al-labels'), scopeCv = $('.dl-scope-cv');
  let renderer;
  try { renderer = new WebGLRenderer({ canvas: spaceCv, antialias: true, logarithmicDepthBuffer: true }); } catch (e) { root.classList.add('al-nogl'); }
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const state = { view: 'parallax', star: 'proxima', t: Date.now(), playing: false, sight: true, faint: true, err: true };
  const t0 = Date.now();

  let camera, controls, A = {}, B = {};
  if (renderer) {
    renderer.setPixelRatio(dpr);
    camera = new PerspectiveCamera(45, 1.6, 0.05, 400000);
    controls = new OrbitControls(camera, spaceCv);
    controls.enableDamping = true; controls.dampingFactor = 0.08; controls.enablePan = false;
    const sunTex = glowTexture([[0, 'rgba(255,255,245,1)'], [0.15, 'rgba(255,235,170,1)'], [0.3, 'rgba(255,190,80,.45)'], [1, 'rgba(255,120,20,0)']]);
    const starTex = glowTexture([[0, 'rgba(255,255,255,1)'], [0.12, 'rgba(255,255,255,.95)'], [0.35, 'rgba(255,255,255,.25)'], [1, 'rgba(255,255,255,0)']]);

    // ---------- 場景 A：視差 ----------
    A.scene = new Scene(); A.scene.background = new Color(0x03050d);
    {
      const p = new Float32Array(N_STARS * 3), tint = new Float32Array(N_STARS * 3), size = new Float32Array(N_STARS);
      for (let i = 0; i < N_STARS; i++) {
        const l = STAR_ECL[i * 2] * DEG, b = STAR_ECL[i * 2 + 1] * DEG;
        p.set([RS_A * Math.cos(b) * Math.cos(l), RS_A * Math.sin(b), -RS_A * Math.cos(b) * Math.sin(l)], i * 3);
        const mag = STARS[i * 4 + 2], br = MathUtils.clamp(0.85 - mag * 0.14, 0.15, 0.9), c = bvColor(STARS[i * 4 + 3]);
        tint.set([c[0] / 255 * br, c[1] / 255 * br, c[2] / 255 * br], i * 3);
        size[i] = MathUtils.clamp(6 - mag * 1.0, 1.3, 6.5);
      }
      A.scene.add(starPoints(p, tint, size, dpr));
    }
    A.sun = new Sprite(new SpriteMaterial({ map: sunTex, blending: AdditiveBlending, depthWrite: false, transparent: true }));
    A.sun.scale.setScalar(4); A.scene.add(A.sun);
    A.scene.add(new Mesh(new SphereGeometry(0.7, 32, 16), new MeshBasicMaterial({ color: 0xffe9a8 })));
    {
      const pts = []; const now = new Date();
      for (let k = 0; k < 360; k++) pts.push(sv(helio('earth', new Date(now.getTime() + (k / 360) * YEAR)), K));
      A.orbit = new LineLoop(lineGeo(pts), new LineBasicMaterial({ color: 0x4fd1c5, transparent: true, opacity: 0.55 }));
      A.scene.add(A.orbit);
    }
    A.earth = new Mesh(new SphereGeometry(0.55, 32, 16), new MeshBasicMaterial({ color: 0x4f9cff })); A.scene.add(A.earth);
    A.earth2 = new Mesh(new SphereGeometry(0.55, 32, 16), new MeshBasicMaterial({ color: 0xff9a4a, transparent: true, opacity: 0.85 })); A.scene.add(A.earth2);
    A.star = new Sprite(new SpriteMaterial({ map: starTex, color: 0xffffff, blending: AdditiveBlending, depthWrite: false, transparent: true, sizeAttenuation: false }));
    A.star.scale.setScalar(0.05); A.scene.add(A.star);
    // setFromPoints 不會加大既有的 buffer，所以建立時就給足點數（視線 SIGHT_N 點、角度弧 25 點）。
    // 視線要延伸到很遠的背景星空，切成多段：一端跑到相機背後時（對數深度緩衝），整條線才不會一起消失。
    const mkLine = (col, op = 0.9, n = 2) => { const l = new Line(lineGeo(Array.from({ length: n }, () => new Vector3())), new LineBasicMaterial({ color: col, transparent: true, opacity: op })); l.frustumCulled = false; A.scene.add(l); return l; };
    A.sight1 = mkLine(0x4fd1c5, 0.9, SIGHT_N); A.sight2 = mkLine(0xff9a4a, 0.9, SIGHT_N);
    A.base = new Line(lineGeo([new Vector3(), new Vector3(1, 0, 0)]), new LineDashedMaterial({ color: 0xffffff, dashSize: 0.6, gapSize: 0.5, transparent: true, opacity: 0.6 }));
    A.base.frustumCulled = false; A.scene.add(A.base);
    A.arc = mkLine(0xffd36e, 1, 25);
    const ringMat = (c) => new PointsMaterial({ map: ringTexture(), color: c, size: 18 * dpr, sizeAttenuation: false, transparent: true, depthWrite: false });
    const pt = (c) => { const g = new BufferGeometry(); g.setAttribute('position', new Float32BufferAttribute([0, 0, 0], 3)); const p = new Points(g, ringMat(c)); p.frustumCulled = false; A.scene.add(p); return p; };
    A.hit1 = pt(0x4fd1c5); A.hit2 = pt(0xff9a4a);
    // 太陽的固定像素圓點：遠星視角裡軌道縮成一點時，還看得到地球軌道在哪裡
    { const g = new BufferGeometry(); g.setAttribute('position', new Float32BufferAttribute([0, 0, 0], 3)); A.sunDot = new Points(g, new PointsMaterial({ map: sunTex, color: 0xffe9a8, size: 22 * dpr, sizeAttenuation: false, transparent: true, depthWrite: false, blending: AdditiveBlending })); A.scene.add(A.sunDot); }

    // ---------- 場景 B：太陽的鄰居 ----------
    B.scene = new Scene(); B.scene.background = new Color(0x03050d);
    B.pos = []; B.dist = [];
    const pos = [], tint = [], size = [], faintPos = [], faintTint = [], faintSize = [];
    const drop = { 20: [], 100: [], 2000: [] }, errR = { 20: [], 100: [], 2000: [] };
    for (let i = 0; i < N_NEAR; i++) {
      const s = nearStar(i), ly = lyOf(s.plx), d = eclDir(s), v = d.clone().multiplyScalar(ly);
      B.pos.push(v); B.dist.push(ly);
      const M = absMag(s.mag, s.plx), c = bvColor(s.bv), faint = s.mag > 6;
      const br = faint ? 0.55 : 1, sz = MathUtils.clamp(5.4 - 0.42 * M, 2.2, 11) * (faint ? 0.8 : 1);
      (faint ? faintPos : pos).push(v.x, v.y, v.z);
      (faint ? faintTint : tint).push(c[0] / 255 * br, c[1] / 255 * br, c[2] / 255 * br);
      (faint ? faintSize : size).push(sz);
      for (const R of [20, 100, 2000]) if (ly <= R * 1.02 && (R === 20 || !faint)) drop[R].push(v.x, v.y, v.z, v.x, 0, v.z);
      const [lo, hi] = lyRange(s.plx, s.e);
      const a = d.clone().multiplyScalar(lo), b = d.clone().multiplyScalar(Math.min(hi, 6000));
      for (const R of [20, 100, 2000]) if (ly <= R * 1.05 && (R === 20 || !faint)) errR[R].push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
    B.bright = starPoints(pos, tint, size, dpr); B.scene.add(B.bright);
    B.faint = starPoints(faintPos, faintTint, faintSize, dpr); B.scene.add(B.faint);
    const segs = (arr, col, op) => { const g = new BufferGeometry(); g.setAttribute('position', new Float32BufferAttribute(arr, 3)); return new LineSegments(g, new LineBasicMaterial({ color: col, transparent: true, opacity: op, depthWrite: false })); };
    B.drops = Object.fromEntries(Object.entries(drop).map(([R, arr]) => { const l = segs(arr, 0x7f9bd8, R === '100' ? 0.1 : 0.2); B.scene.add(l); return [R, l]; }));
    B.errs = Object.fromEntries(Object.entries(errR).map(([R, arr]) => { const l = segs(arr, 0xff9a4a, 0.8); B.scene.add(l); return [R, l]; }));
    B.rings = {};
    for (const [R, radii] of [[20, [5, 10, 15, 20]], [100, [25, 50, 75, 100]], [2000, [500, 1000, 1500, 2000]]]) {
      const g = new Group();
      for (const r of radii) g.add(new LineLoop(lineGeo(Array.from({ length: 128 }, (_, k) => new Vector3(r * Math.cos(k / 128 * TAU), 0, r * Math.sin(k / 128 * TAU)))), new LineBasicMaterial({ color: 0x9fb0cf, transparent: true, opacity: r === radii[radii.length - 1] ? 0.4 : 0.22 })));
      B.scene.add(g); B.rings[R] = { g, radii };
    }
    B.sun = new Sprite(new SpriteMaterial({ map: sunTex, blending: AdditiveBlending, depthWrite: false, transparent: true, sizeAttenuation: false }));
    B.sun.scale.setScalar(0.06); B.scene.add(B.sun);
    B.sel = new Points((() => { const g = new BufferGeometry(); g.setAttribute('position', new Float32BufferAttribute([0, 0, 0], 3)); return g; })(),
      new PointsMaterial({ map: ringTexture(), color: 0xffd36e, size: 26 * dpr, sizeAttenuation: false, transparent: true, depthWrite: false }));
    B.sel.frustumCulled = false; B.scene.add(B.sel);
  }

  // ---------------- 標籤 ----------------
  const mk = (cls, h) => { const s = document.createElement('span'); s.className = `al-lab ${cls}`; s.innerHTML = h; s.style.opacity = 0; labels.appendChild(s); return s; };
  const L = renderer ? {
    sun: mk('sun', '&#9728; Sun · 太陽'), earth: mk('dl-earth', 'Earth today · 今天的地球'), earth2: mk('dl-earth2', 'Half a year later · 半年後'),
    star: mk('dl-star', ''), arc: mk('dl-arc', ''), hit1: mk('dl-hit1', 'Seen today · 今天看到'), hit2: mk('dl-hit2', 'Half a year later · 半年後看到'),
    far: mk('dl-far', ''), orbit: mk('dl-earth', ''), bsun: mk('sun', '&#9728; Sun · 太陽'), rings: [], named: {},
  } : null;
  if (L) {
    for (let k = 0; k < 4; k++) L.rings.push(mk('dl-ring', ''));
    for (const [key, [, en, zh]] of Object.entries(NEAR_NAMED)) L.named[key] = mk(`dl-nm dl-nm-${key}`, `${en} · ${zh}`);
  }
  const SHOW = {
    20: ['proxima', 'acen', 'barnard', 'sirius', '61cyg', 'procyon', 'epseri', 'taucet', 'altair'],
    100: ['acen', 'sirius', 'procyon', 'altair', 'vega', 'fomalhaut', 'arcturus', 'capella', 'pollux', 'castor', 'aldebaran', 'regulus', 'denebola', 'dubhe'],
    2000: ['betelgeuse', 'rigel', 'deneb', 'antares', 'polaris', 'alnilam'],
  };
  // 每一格只改「這一格要顯示」與「上一格顯示、這一格不顯示」的標籤：
  // 先全部設成 0 再設回 1 的話，中間讀 clientWidth 會強制重算樣式，透明度過場每格都從 0 重來，標籤就看不見了。
  // 手機（窄畫面）只標幾顆代表星
  const SHOW_M = { 20: ['acen', 'sirius', '61cyg', 'taucet', 'altair'], 100: ['sirius', 'vega', 'altair', 'arcturus', 'capella', 'aldebaran', 'fomalhaut'], 2000: SHOW[2000] };
  const proj = new Vector3();
  let shown = new Set(), cw = 0, ch = 0;
  function place(el, v, dy = 6, show = true) {
    proj.copy(v).project(camera);
    const off = !show || proj.z > 1 || Math.abs(proj.x) > 1.02 || Math.abs(proj.y) > 1.02;
    if (off) return false;
    el.style.opacity = 1; shown.add(el);
    el.style.transform = `translate(${(proj.x * 0.5 + 0.5) * cw}px, ${(-proj.y * 0.5 + 0.5) * ch + dy}px) translate(-50%, 0)`;
    return true;
  }
  let prevShown = new Set();
  const beginLabels = () => { cw = spaceCv.clientWidth; ch = spaceCv.clientHeight; prevShown = shown; shown = new Set(); };
  const endLabels = () => { for (const el of prevShown) if (!shown.has(el)) el.style.opacity = 0; };

  // ---------------- 狀態 ----------------
  const sel = () => starByKey(state.star);
  const R = { name: $('.dl-name'), plx: $('.dl-plx'), dist: $('.dl-dist'), left: $('.dl-left'), coin: $('.dl-coin'), cmp: $('.dl-cmp'), date: $('.dl-date'), count: $('.dl-count') };
  let geomA = null;
  function updateA() {
    const s = sel(), dir = eclDir(s), D = lyOf(s.plx) * AU_PER_LY * K / SHRINK;
    const S = dir.clone().multiplyScalar(D);
    const E = sv(helio('earth', new Date(state.t)), K), E2 = sv(helio('earth', new Date(state.t + YEAR / 2)), K);
    geomA = { S, E, E2, D, dir };
    if (!renderer) return;
    A.earth.position.copy(E); A.earth2.position.copy(E2);
    A.star.position.copy(S);
    const c = bvColor(s.bv); A.star.material.color.setRGB(c[0] / 255, c[1] / 255, c[2] / 255);
    A.star.scale.setScalar(MathUtils.clamp(0.07 - s.mag * 0.008, 0.045, 0.085));
    const hit = (from) => from.clone().add(S.clone().sub(from).normalize().multiplyScalar(RS_A * 0.98));
    const h1 = hit(E), h2 = hit(E2);
    const seg = (from, to) => Array.from({ length: SIGHT_N }, (_, k) => from.clone().lerp(to, Math.pow(k / (SIGHT_N - 1), 3)));
    A.sight1.geometry.setFromPoints(seg(E, h1)); A.sight2.geometry.setFromPoints(seg(E2, h2));
    A.base.geometry.setFromPoints([E, E2]); A.base.computeLineDistances();
    A.hit1.geometry.attributes.position.array.set(h1.toArray()); A.hit1.geometry.attributes.position.needsUpdate = true;
    A.hit2.geometry.attributes.position.array.set(h2.toArray()); A.hit2.geometry.attributes.position.needsUpdate = true;
    // 角度弧：在星的位置，兩條視線之間
    const u1 = E.clone().sub(S).normalize(), u2 = E2.clone().sub(S).normalize(), r = Math.min(D * 0.28, 9), arc = [];
    for (let k = 0; k <= 24; k++) arc.push(S.clone().add(u1.clone().lerp(u2, k / 24).normalize().multiplyScalar(r)));
    A.arc.geometry.setFromPoints(arc);
    for (const o of [A.sight1, A.sight2, A.hit1, A.hit2, A.arc]) o.visible = state.sight;
  }
  function updateB() {
    if (!renderer) return;
    const s = sel();
    B.sel.geometry.attributes.position.array.set(B.pos[s.i].toArray()); B.sel.geometry.attributes.position.needsUpdate = true;
    const Rr = +state.view;
    for (const [k, r] of Object.entries(B.rings)) r.g.visible = +k === Rr;
    for (const [k, l] of Object.entries(B.drops)) l.visible = +k === Rr;
    for (const [k, l] of Object.entries(B.errs)) l.visible = state.err && +k === Rr;
    B.faint.visible = state.faint;
    if (Rr) for (const p of [B.bright, B.faint]) p.material.uniforms.uMax.value = Rr * 1.05;
  }
  function readouts() {
    const s = sel(), now = new Date();
    R.name.innerHTML = `${s.en} · ${s.zh}`;
    const rel = relErr(s) * 100;
    R.plx.innerHTML = `${fmtArcsec(s.plx)}″ ± ${fmtArcsec(s.e)}″<span>視差 ${fmtArcsec(s.plx)} 角秒（誤差 ${rel < 1 ? rel.toFixed(1) : Math.round(rel)}%）</span>`;
    const d = distText(s); R.dist.innerHTML = `${d.en}<span>${d.zh}</span>`;
    const dep = departText(s, now); R.left.innerHTML = `${dep.en}<span>${dep.zh}</span>`;
    const km = coinKm(s.plx);
    const kmT = km < 10 ? km.toFixed(1) : commas(km);
    R.coin.innerHTML = `A coin (20 mm) seen from ${kmT} km away<span>像從 ${kmT} 公里外看一枚一元硬幣</span>`;
    const px = starByKey('proxima'), f = px.plx / s.plx;
    R.cmp.innerHTML = state.star === 'proxima' ? 'The biggest shift of any star<span>所有恆星裡位移最大的</span>'
      : f < 1.05 ? 'About the same as Proxima Centauri<span>和比鄰星差不多</span>'
        : `${f < 10 ? f.toFixed(1) : commas(f)} times smaller than Proxima Centauri's<span>比比鄰星的小 ${f < 10 ? f.toFixed(1) : commas(f)} 倍</span>`;
    const dt = new Date(state.t + 8 * 3600000);
    R.date.innerHTML = `Earth's place: ${MON[dt.getUTCMonth()]} ${dt.getUTCDate()}, ${dt.getUTCFullYear()}<span>地球的位置：${dt.getUTCFullYear()} 年 ${dt.getUTCMonth() + 1} 月 ${dt.getUTCDate()} 日</span>`;
    if (state.view !== 'parallax') {
      const Rr = +state.view, inR = B.dist.filter((x) => x <= Rr);
      const seen = inR.filter((_, k) => nearStar(k).mag <= 6).length;
      R.count.innerHTML = Rr === 20
        ? `Within 20 light-years, Hipparcos measured ${inR.length} stars, but only ${seen} are bright enough to see without a telescope. Most of the Sun's neighbors are dim red dwarfs.<span>20 光年內，Hipparcos 量到 ${inR.length} 顆星，肉眼看得到的只有 ${seen} 顆；太陽的鄰居大多是暗淡的紅矮星。</span>`
        : Rr === 100 ? `Within 100 light-years: ${seen} stars you can see without a telescope, and many more you cannot.<span>100 光年內：肉眼看得到的有 ${seen} 顆，看不到的更多。</span>`
          : 'Far stars have long orange bars: their parallax is so small that the distance is uncertain.<span>遠方的星，橘色誤差線很長：視差太小，距離量不準。</span>';
    } else {
      // 地球軌道縮成 30 公分的盤子（1 AU＝15 公分）時，這顆星要放多遠
      const km = lyOf(s.plx) * AU_PER_LY * 0.15 / 1000;
      R.count.innerHTML = `In this model, the distances to the stars are shrunk ${commas(SHRINK)} times, but Earth's orbit is not. True to scale, if Earth's orbit were a plate 30 cm across, ${s.en} would be ${commas(km)} km away.<span>模型裡，恆星的距離縮小了 ${commas(SHRINK)} 倍，地球軌道沒有縮。照真實比例：地球軌道若是一個 30 公分的盤子，${s.zh}要放在 ${commas(km)} 公里外。</span>`;
    }
  }

  // ---------------- 望遠鏡裡看到的（2D）----------------
  const bg = (() => { let x = 97; const r = () => ((x = (x * 1664525 + 1013904223) >>> 0) / 4294967296); return Array.from({ length: 70 }, () => [r(), r(), 0.25 + r() * 0.75 * r()]); })();
  function drawScope() {
    const W = scopeCv.clientWidth || 300, H = W;
    if (scopeCv.width !== Math.round(W * dpr) || scopeCv.height !== Math.round(H * dpr)) { scopeCv.width = Math.round(W * dpr); scopeCv.height = Math.round(H * dpr); }
    const c = scopeCv.getContext('2d'); c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.fillStyle = '#02040c'; c.fillRect(0, 0, W, H);
    for (const [x, y, b] of bg) { c.fillStyle = `rgba(210,220,255,${b * 0.7})`; c.beginPath(); c.arc(x * W, y * H, 0.6 + b * 1.1, 0, TAU); c.fill(); }
    const s = sel(), S = (0.4 * W) / 800, cx = W / 2, cy = H / 2;   // 每毫角秒幾像素：比鄰星的橢圓約占四成寬
    c.strokeStyle = 'rgba(160,180,230,.25)'; c.lineWidth = 1; c.setLineDash([3, 4]);
    c.beginPath(); c.moveTo(cx, 8); c.lineTo(cx, H - 8); c.moveTo(8, cy); c.lineTo(W - 8, cy); c.stroke(); c.setLineDash([]);
    const P = (t) => { const p = parallaxShift(s.ra, s.dec, s.plx, new Date(t)); return [cx - p.east * S, cy - p.north * S]; };
    c.strokeStyle = 'rgba(255,211,110,.55)'; c.lineWidth = 1.4; c.beginPath();
    for (let k = 0; k <= 73; k++) { const [x, y] = P(state.t + (k / 73) * YEAR); k ? c.lineTo(x, y) : c.moveTo(x, y); }
    c.stroke();
    const col = bvColor(s.bv), rgb = `rgb(${col.map(Math.round).join(',')})`;
    const [x2, y2] = P(state.t + YEAR / 2);
    c.strokeStyle = '#ff9a4a'; c.lineWidth = 2; c.beginPath(); c.arc(x2, y2, 6, 0, TAU); c.stroke();
    const [x1, y1] = P(state.t);
    const g = c.createRadialGradient(x1, y1, 0, x1, y1, 9); g.addColorStop(0, '#fff'); g.addColorStop(0.35, rgb); g.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = g; c.beginPath(); c.arc(x1, y1, 9, 0, TAU); c.fill();
    c.strokeStyle = '#4fd1c5'; c.lineWidth = 2; c.beginPath(); c.arc(x1, y1, 10, 0, TAU); c.stroke();
    // 比例尺：1 角秒
    const bar = 1000 * S;
    c.strokeStyle = '#fff'; c.lineWidth = 2; c.beginPath(); c.moveTo(12, H - 14); c.lineTo(12 + bar, H - 14); c.moveTo(12, H - 18); c.lineTo(12, H - 10); c.moveTo(12 + bar, H - 18); c.lineTo(12 + bar, H - 10); c.stroke();
    c.fillStyle = '#e8edf7'; c.font = `700 ${Math.max(10, W * 0.036)}px system-ui, sans-serif`; c.fillText('1″ = 1/3600°', 12, H - 22);
    c.fillStyle = '#9fb0cf'; c.font = `600 ${Math.max(9, W * 0.032)}px system-ui, sans-serif`;
    c.fillText('N', cx + 5, 16); c.fillText('E', 8, cy - 5);
    if (s.plx * S < 3) { c.fillStyle = '#ffd36e'; c.textAlign = 'center'; c.fillText('Too small to see at this zoom · 小到看不出來', cx, cy + 28); c.textAlign = 'left'; }
  }

  // ---------------- 相機 ----------------
  const camFrom = new Vector3(), tgtFrom = new Vector3();
  let camT = 1, activeScene = null;
  function camGoal() {
    if (state.view === 'parallax') {
      // 從三角形（今天的地球、半年後的地球、星）的正面看，稍微往上抬
      const { D, dir, S, E, E2 } = geomA;
      const n = new Vector3().crossVectors(E2.clone().sub(E), S.clone().sub(E));
      if (n.lengthSq() < 1e-9) n.set(0, 1, 0);
      n.normalize(); if (n.y < 0) n.negate();
      const half = Math.max(D * 0.62, 16), dist = half / Math.tan((camera.fov / 2) * DEG) * 1.3;
      const tgt = dir.clone().multiplyScalar(D * 0.5);
      // 相機稍微退到「星的反方向」：視線延伸到背景星空的那一端永遠在相機前方
      return { pos: tgt.clone().add(n.multiplyScalar(dist)).add(dir.clone().multiplyScalar(-dist * 0.22)), tgt };
    }
    const Rr = +state.view, D = Rr * (camera.aspect < 1.1 ? 1.3 : 1.75);
    return { pos: new Vector3(D * 0.5, D * 0.62, D * 0.66), tgt: new Vector3() };
  }
  function goCam(instant) {
    if (!renderer) return;
    if (instant) { const g = camGoal(); camera.position.copy(g.pos); controls.target.copy(g.tgt); camT = 1; return; }
    camFrom.copy(camera.position); tgtFrom.copy(controls.target); camT = 0;
  }
  function setLimits() {
    if (!renderer) return;
    if (state.view === 'parallax') { controls.minDistance = 4; controls.maxDistance = 60000; camera.near = 0.05; }
    else { controls.minDistance = 0.5; controls.maxDistance = +state.view * 8; camera.near = 0.01; }
    camera.updateProjectionMatrix();
  }

  function setView(v) {
    const sameKind = (v === 'parallax') === (state.view === 'parallax');
    state.view = v;
    root.dataset.view = v;
    $$('.ec-view button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.view === v ? 'true' : 'false'));
    setLimits(); updateA(); updateB(); readouts();
    goCam(!sameKind);
  }
  function setStar(k) {
    state.star = k;
    $$('.dl-chip').forEach((b) => b.classList.toggle('on', b.dataset.star === k));
    // 太遠的星，在 20 光年的視野裡看不到：自動換到看得到的範圍
    const ly = lyOf(sel().plx);
    if (state.view !== 'parallax' && ly > +state.view) setView(ly <= 100 ? '100' : '2000');
    updateA(); updateB(); readouts(); drawScope();
    if (state.view === 'parallax') goCam(false);
  }
  function setT(t) {
    state.t = t;
    slider.value = String(Math.round(((((t - t0) / DAY) % 365.25) + 365.25) % 365.25));
    slider.style.setProperty('--p', `${(+slider.value / 365) * 100}%`);
    updateA(); readouts(); drawScope();
  }

  function updateLabels() { beginLabels(); labelsFor(); endLabels(); }
  function labelsFor() {
    if (state.view === 'parallax') {
      const { S, E, E2, D } = geomA, s = sel();
      // 兩個地球在螢幕上離多遠：太近就不標太陽、半年後的地球標在上面；擠成一點就只標「地球軌道」
      const px = (v) => { proj.copy(v).project(camera); return [proj.x * cw / 2, proj.y * ch / 2]; };
      const [ax, ay] = px(E), [bx, by] = px(E2), dpx = Math.hypot(ax - bx, ay - by);
      if (dpx < 50) { L.orbit.innerHTML = "Earth's orbit · 地球軌道"; place(L.orbit, new Vector3(), 12); }
      else {
        if (dpx > 300) place(L.sun, new Vector3(), 14);
        place(L.earth, E, 10); place(L.earth2, E2, dpx > 300 ? 10 : -30);
      }
      const onScr = place(L.star, S, 10);
      L.star.innerHTML = `${s.en} · ${s.zh}`;
      if (state.sight) {
        L.arc.innerHTML = 'Shift · 視差位移';
        // 弧的位置離星名太近時，改標在星的上方
        const arcAt = S.clone().add(E.clone().add(E2).multiplyScalar(0.5).sub(S).normalize().multiplyScalar(Math.min(D * 0.28, 9) + 2));
        const [sx, sy] = px(S), [qx, qy] = px(arcAt);
        if (Math.hypot(sx - qx, sy - qy) > 60) place(L.arc, arcAt, -12); else place(L.arc, S, -36);
        place(L.hit1, new Vector3().fromArray(A.hit1.geometry.attributes.position.array), 14);
        place(L.hit2, new Vector3().fromArray(A.hit2.geometry.attributes.position.array), 14);
      }
      if (!onScr) { L.far.innerHTML = `${s.en} is off screen · 在畫面外`; place(L.far, S, 0); }
      return;
    }
    const Rr = +state.view;
    place(L.bsun, new Vector3(), 12);
    B.rings[Rr].radii.forEach((r, k) => { L.rings[k].innerHTML = `${commas(r)} ly · 光年`; place(L.rings[k], new Vector3(r * 0.7071, 0, r * 0.7071), 0); });
    const show = new Set((cw < 520 ? SHOW_M : SHOW)[Rr]); show.add(state.star);
    for (const [key, [i]] of Object.entries(NEAR_NAMED)) {
      if (!show.has(key) || B.dist[i] > Rr * 1.05) continue;
      if (!state.faint && nearStar(i).mag > 6 && key !== state.star) continue;
      const el = L.named[key];
      el.classList.toggle('on', key === state.star);
      place(el, B.pos[i], key === 'proxima' ? 12 : key === 'acen' ? -22 : 8);
    }
  }

  function resize() {
    if (!renderer) return;
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (w && h) {
      renderer.setSize(w, h, false); camera.aspect = w / h;
      const hMin = (camera.aspect < 1.1 ? 70 : 58) * DEG;
      camera.fov = Math.max(42, 2 * Math.atan(Math.tan(hMin / 2) / camera.aspect) / DEG);
      camera.updateProjectionMatrix();
    }
    drawScope();
  }
  if (renderer) new ResizeObserver(resize).observe(spaceWrap);
  new ResizeObserver(drawScope).observe(scopeCv);

  // ---------------- 操作 ----------------
  const playBtn = $('.al-play'), slider = $('.dl-time');
  function setPlaying(p) {
    state.playing = p; root.classList.toggle('is-playing', p);
    playBtn.setAttribute('aria-pressed', p ? 'true' : 'false');
    playBtn.querySelector('.al-play-t').innerHTML = p ? 'Pause · 暫停' : 'Play · 播放';
  }
  playBtn.addEventListener('click', () => { setPlaying(!state.playing); root.classList.remove('al-fresh'); });
  $$('.ec-view button').forEach((b) => b.addEventListener('click', () => setView(b.dataset.view)));
  $$('.dl-chip').forEach((b) => b.addEventListener('click', () => setStar(b.dataset.star)));
  $('.dl-now').addEventListener('click', () => { setPlaying(false); setT(Date.now()); });
  $('.dl-half').addEventListener('click', () => { setPlaying(false); setT(state.t + YEAR / 2); });
  slider.addEventListener('input', () => { setPlaying(false); setT(t0 + parseFloat(slider.value) * DAY); });
  const bind = (sel2, fn) => { const el = $(sel2); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="sight"]', (v) => { state.sight = v; updateA(); });
  bind('[data-t="faint"]', (v) => { state.faint = v; updateB(); });
  bind('[data-t="err"]', (v) => { state.err = v; updateB(); });
  if (renderer) $('.al-home').addEventListener('click', () => goCam(false));

  // ---------------- 迴圈 ----------------
  let visible = false, raf = 0, last = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    if (state.playing) setT(state.t + dt * 30 * DAY);   // 一年約 12 秒
    if (renderer) {
      if (camT < 1) {
        camT = Math.min(1, camT + dt / 1.2);
        const k = MathUtils.smootherstep(camT, 0, 1), g = camGoal();
        camera.position.lerpVectors(camFrom, g.pos, k);
        controls.target.lerpVectors(tgtFrom, g.tgt, k);
      }
      controls.update();
      activeScene = state.view === 'parallax' ? A.scene : B.scene;
      updateLabels();
      renderer.render(activeScene, camera);
    }
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  root.dataset.view = 'parallax';
  setLimits(); resize(); setT(t0); setStar('proxima'); goCam(true);
  root.classList.add('al-ready', 'al-fresh');
  root.__lab = { camera, controls, state, setView, setStar, setT, setPlaying, drawScope, goCam, render: () => { if (renderer) { controls.update(); updateLabels(); renderer.render(state.view === 'parallax' ? A.scene : B.scene, camera); } } };
  return { setView, setStar };
}

// ---------------------------------------------------------------------------
// 頁面下方：今晚的星光是哪一年出發的（彰化晚上九點），以及生日星
const tw = (d) => { const x = new Date(d.getTime() + 8 * 3600000); return { y: x.getUTCFullYear(), m: x.getUTCMonth() + 1, d: x.getUTCDate() }; };
const twDate = (y, m, d, h = 0) => new Date(Date.UTC(y, m - 1, d, h) - 8 * 3600000);
const DIRS = [['north', '北'], ['northeast', '東北'], ['east', '東'], ['southeast', '東南'], ['south', '南'], ['southwest', '西南'], ['west', '西'], ['northwest', '西北']];
const dirOf = (az) => DIRS[Math.round(az / 45) % 8];
const NAMED_LIST = Object.entries(NEAR_NAMED).map(([key, [i, en, zh]]) => ({ key, ...nearStar(i), en, zh }));
/** 黃昏晚上九點最高（過子午線）的月份。 */
function bestMonth(s) {
  // 3 月 21 日前後晚上九點，正南方的赤經約 9 時；之後每個月多 2 小時
  return Math.floor((((s.ra / 15 - 9) / 2) % 12 + 12) % 12 + 2.7) % 12;   // 0＝一月
}
function renderTonight(box) {
  const now = new Date(), x = tw(now), at = twDate(x.y, x.m, x.d, 21);
  // 第五課的地平座標公式（J2000 位置，不加歲差：差 0.4°，對「往哪個方向、幾個拳頭高」沒影響）
  const up = [];
  for (const s of NAMED_LIST) {
    const { alt, az } = altAz(s.ra, s.dec, at, SITE);
    if (alt >= 10 && s.mag <= 3) up.push({ ...s, alt, az });
  }
  up.sort((a, b) => b.plx - a.plx);
  const fist = (a) => Math.max(1, Math.round(a / 10));
  const card = (s) => {
    const dep = departText(s, now), dist = distText(s), [d, dz] = dirOf(s.az);
    return `<div class="tn-item dl-tn"><span class="tn-ico" aria-hidden="true">&#9733;</span><div><h3>${s.en}<span class="zh">${s.zh}</span></h3>
      <p class="dl-tn-dist">${dist.en}<span class="zh">${dist.zh}</span></p>
      <p class="dl-tn-left"><b>Light left: ${dep.en}</b><span class="zh">光出發於 ${dep.zh}</span></p>
      <p class="dl-tn-where">Look ${d}, about ${fist(s.alt)} fist${fist(s.alt) > 1 ? 's' : ''} up<span class="zh">往${dz}方看，約 ${fist(s.alt)} 個拳頭高</span></p></div></div>`;
  };
  const far = up[up.length - 1];
  box.innerHTML = `<p class="tn-when">${MON[x.m - 1]} ${x.d}, ${x.y}, 9:00 p.m. over Changhua, nearest first<span>${x.y} 年 ${x.m} 月 ${x.d} 日晚上 9 點，彰化，由近到遠</span></p>
    <div class="tn-grid dl-tn-grid">${up.map(card).join('')}</div>
    ${far ? `<p class="tn-note">Tonight's farthest bright star on this list is ${far.en}. The light you see left it ${departText(far, now).en.replace(/^between/, 'sometime between')}. · 今晚清單上最遠的亮星是${far.zh}：你看到的光，出發於${departText(far, now).zh}。</p>` : ''}`;
  box.setAttribute('aria-busy', 'false');
}
function renderBirthday(box) {
  const input = box.querySelector('.dl-born'), out = box.querySelector('[data-birthday-out]');
  const nowY = new Date().getUTCFullYear();
  input.max = String(nowY);
  function draw() {
    const born = parseInt(input.value, 10);
    if (!(born > 1900 && born <= nowY)) { out.innerHTML = ''; return; }
    const age = (Date.now() - Date.UTC(born, 6, 1)) / (365.25 * DAY);
    if (age < 4) { out.innerHTML = `<p class="dl-bd-none">No star is that close. Even the nearest star, Proxima Centauri, is 4.2 light-years away, so the light that left it when you were born is still on its way.<span>沒有那麼近的星。最近的比鄰星也在 4.2 光年外：你出生那年從它出發的光，還在路上。</span></p>`; return; }
    const list = birthdayStars(age, 3, 5.0, (s) => s.dec > -50);   // 彰化看得到（最高超過 16°）
    out.innerHTML = `<p class="dl-bd-lead">You are about ${Math.floor(age)} years old. The light reaching us tonight from these stars left them close to the year you were born:<span>你大約 ${Math.floor(age)} 歲。今晚從這幾顆星傳來的光，差不多就在你出生那年出發：</span></p>
      <div class="dl-bd-grid">${list.map((s) => { const m = bestMonth(s), y = fmtYear(departYear(s.ly)); return `<div class="dl-bd"><b>${s.en}</b><span class="zh">${s.zh}</span><p>${fmtLy(s.ly)} light-years · 光年<br>Light left in ${y.en} · 光出發於 ${y.zh}<br>Best at 9 p.m. in ${MONTH[m]} · ${m + 1} 月晚上九點最好找</p></div>`; }).join('')}</div>`;
  }
  input.addEventListener('input', draw);
  draw();
}

function boot() {
  const root = document.querySelector('[data-distance-lab]');
  let api = null, started = false;
  const start = () => { if (!started && root) { started = true; api = initLab(root); } return api; };
  if (root) {
    const io = new IntersectionObserver((ents) => { if (ents[0].isIntersecting) { io.disconnect(); start(); } }, { rootMargin: '600px' });
    io.observe(root);
  }
  const tn = document.querySelector('[data-starlight]');
  if (tn) renderTonight(tn);
  const bd = document.querySelector('[data-birthday]');
  if (bd) renderBirthday(bd);
  // 鄰居卡：光出發的年份（照今天算）
  document.querySelectorAll('[data-depart]').forEach((el) => {
    const s = starByKey(el.getAttribute('data-depart'));
    if (!s) return;
    const d = departText(s);
    el.innerHTML = `Light you see tonight left in ${d.en}<span class="zh">今晚看到的光，出發於 ${d.zh}</span>`;
  });
  document.querySelectorAll('[data-lab-star]').forEach((b) => b.addEventListener('click', () => {
    const lab = start(); if (!lab) return;
    lab.setStar(b.getAttribute('data-lab-star'));
    root.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }));
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
}
