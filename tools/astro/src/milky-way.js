/*
 * 天文教育 · 第十四課「銀河是什麼？」的 3D 模型。
 *
 * 一個機制：我們住在一個扁平的星系盤「裡面」。順著盤面往外看，視線穿過成千上億顆星，疊成一條光帶；
 * 往盤面上下看，星星就少了。
 * 左 3D：程序生成的棒旋星系（示意圖，不是星圖）：1 單位＝1,000 光年，直徑約 100、厚約 1、太陽在離中心 26.7 的地方。
 *   三個視角：從外面看、從側面看（看出有多扁）、從太陽看（相機放在太陽上，看到的就是一條光帶，
 *   方向照真實銀道座標標出人馬座、天鵝座、牛郎織女…，外圈疊上真實亮星）。
 * 右 2D：彰化的全天星圖，銀河光帶照真實銀道座標畫上去。
 * 座標：Y＝銀河北極；從太陽看銀經 l、銀緯 b 的方向＝(−cos b cos l, sin b, cos b sin l)（右手系，銀河從北極看順時針轉）。
 * 產物：cd tools/astro && npm run build → assets/js/milky-way.js
 */
import {
  AdditiveBlending, BufferGeometry, Color, Float32BufferAttribute, Line, LineBasicMaterial, MathUtils,
  PerspectiveCamera, Points, Scene, ShaderMaterial, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DEG, TAU } from './common.js';
import { LINES, STARS } from './stars-data.js';
import { N_STARS, allStarsAltAz, altAz, bvColor, moonAltAzOf } from './sky.js';
import { eqToGal, galToEq, milkyWayAt } from './galaxy.js';
import { moonPhase } from './libration.js';

const SUN = new Vector3(26.7, 0.02, 0);
const SITE = { lat: 24.08, lon: 120.54 };
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DIRS = [['north', '北'], ['northeast', '東北'], ['east', '東'], ['southeast', '東南'], ['south', '南'], ['southwest', '西南'], ['west', '西'], ['northwest', '西北']];
const dirOf = (az) => DIRS[Math.round(az / 45) % 8];
/** 從太陽看銀經 l、銀緯 b 的方向。 */
const gdir = (l, b) => new Vector3(-Math.cos(b * DEG) * Math.cos(l * DEG), Math.sin(b * DEG), Math.cos(b * DEG) * Math.sin(l * DEG));

// ---------------------------------------------------------------------------
// 程序生成的銀河（固定亂數種子，每次一樣）
function makeGalaxy() {
  let s = 20260101;
  const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  const gauss = () => Math.sqrt(-2 * Math.log(rnd() + 1e-9)) * Math.cos(TAU * rnd());
  const pos = [], col = [], size = [];
  const push = (x, y, z, c, sz) => { pos.push(x, y, z); col.push(...c); size.push(sz); };
  // 核球：黃白、扁
  for (let i = 0; i < 7000; i++) { const r = Math.abs(gauss()) * 2.2, th = rnd() * TAU, ph = Math.acos(2 * rnd() - 1); push(r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph) * 0.55, r * Math.sin(ph) * Math.sin(th), [1.0, 0.86, 0.62], 1.2); }
  // 棒：長軸和日心－銀心連線夾 27°，近端在銀經 0–90° 那一側
  const bar = new Vector3(Math.cos(27 * DEG), 0, Math.sin(27 * DEG));
  for (let i = 0; i < 6000; i++) { const t = gauss() * 4.2, w = gauss() * 1.1; push(bar.x * t - bar.z * w, gauss() * 0.35, bar.z * t + bar.x * w, [1.0, 0.82, 0.58], 1.1); }
  // 盤面：指數分布、薄
  for (let i = 0; i < 24000; i++) {
    const r = -5.5 * Math.log(1 - rnd() * 0.985) + 1.5, th = rnd() * TAU;
    if (r > 52) continue;
    push(r * Math.cos(th), gauss() * 0.28, r * Math.sin(th), [0.88, 0.88, 0.95], 0.9);
  }
  // 旋臂：四條對數螺線（拖曳：越外面角度越落後），藍白、帶一點粉紅的星雲
  const ARMS = 4, k = 1 / Math.tan(13 * DEG);
  for (let i = 0; i < 26000; i++) {
    const a = i % ARMS, r = 4 + Math.pow(rnd(), 0.8) * 46, th0 = a * TAU / ARMS + 0.35;
    const th = th0 - Math.log(r / 4) * k / 2.6 + gauss() * 0.11;
    const rr = r + gauss() * 0.9, y = gauss() * 0.22;
    const pink = rnd() < 0.05;
    push(rr * Math.cos(th), y, rr * Math.sin(th), pink ? [1.0, 0.55, 0.7] : [0.72, 0.82, 1.0], pink ? 1.4 : 1.0);
  }
  return { pos, col, size };
}

// ---------------------------------------------------------------------------
function initLab(root) {
  const $ = (s) => root.querySelector(s), $$ = (s) => root.querySelectorAll(s);
  const spaceWrap = $('.al-space'), spaceCv = $('.al-space-cv'), labels = $('.al-labels'), skyCv = $('.mw-sky-cv');
  let renderer;
  try { renderer = new WebGLRenderer({ canvas: spaceCv, antialias: true }); } catch (e) { root.classList.add('al-nogl'); }
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const state = { view: 'outside', when: 'tonight', real: true };

  let scene, camera, controls, galaxyPts, realStars, sunMark, ruler;
  if (renderer) {
    renderer.setPixelRatio(dpr);
    scene = new Scene(); scene.background = new Color(0x02030a);
    camera = new PerspectiveCamera(50, 1.6, 0.01, 5000);
    controls = new OrbitControls(camera, spaceCv);
    controls.enableDamping = true; controls.dampingFactor = 0.08; controls.enablePan = false;
    const gal = makeGalaxy(), g = new BufferGeometry();
    g.setAttribute('position', new Float32BufferAttribute(gal.pos, 3)); g.setAttribute('tint', new Float32BufferAttribute(gal.col, 3)); g.setAttribute('size', new Float32BufferAttribute(gal.size, 1));
    galaxyPts = new Points(g, new ShaderMaterial({
      uniforms: { dpr: { value: dpr }, gain: { value: 1 } },
      vertexShader: `attribute vec3 tint; attribute float size; uniform float dpr; varying vec3 vC;
        void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); float d = max(-mv.z, 0.05);
          vC = tint; gl_Position = projectionMatrix * mv; gl_PointSize = clamp(size * 60.0 / d, 0.9, 3.2) * dpr; }`,
      fragmentShader: `uniform float gain; varying vec3 vC; void main(){ float r = length(gl_PointCoord - 0.5) * 2.0; float a = smoothstep(1.0, 0.0, r);
        gl_FragColor = vec4(vC * a * 0.32 * gain, 1.0); }`,
      blending: AdditiveBlending, transparent: true, depthWrite: false,
    }));
    galaxyPts.frustumCulled = false; scene.add(galaxyPts);
    // 從太陽看時，外圈疊上真實亮星（銀道座標，半徑 900）
    {
      const p = [], c = [], sz = [];
      for (let i = 0; i < N_STARS; i++) {
        const q = eqToGal(STARS[i * 4], STARS[i * 4 + 1]), v = gdir(q.l, q.b).multiplyScalar(900).add(SUN), mag = STARS[i * 4 + 2], br = MathUtils.clamp(0.95 - mag * 0.16, 0.15, 1), cc = bvColor(STARS[i * 4 + 3]);
        p.push(v.x, v.y, v.z); c.push(cc[0] / 255 * br, cc[1] / 255 * br, cc[2] / 255 * br); sz.push(MathUtils.clamp(5.5 - mag, 1.2, 6));
      }
      const sg = new BufferGeometry();
      sg.setAttribute('position', new Float32BufferAttribute(p, 3)); sg.setAttribute('tint', new Float32BufferAttribute(c, 3)); sg.setAttribute('size', new Float32BufferAttribute(sz, 1));
      realStars = new Points(sg, new ShaderMaterial({
        uniforms: { dpr: { value: dpr } },
        vertexShader: `attribute vec3 tint; attribute float size; uniform float dpr; varying vec3 vC; void main(){ vC = tint; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_PointSize = size * dpr; }`,
        fragmentShader: `varying vec3 vC; void main(){ float r = length(gl_PointCoord - 0.5) * 2.0; float a = smoothstep(1.0, 0.15, r); a *= a; gl_FragColor = vec4(vC * a, 1.0); }`,
        blending: AdditiveBlending, transparent: true, depthWrite: false,
      }));
      realStars.frustumCulled = false; scene.add(realStars);
    }
    // 太陽的位置：黃色圈加點（固定像素，著色器畫）
    {
      const sgm = new BufferGeometry(); sgm.setAttribute('position', new Float32BufferAttribute(SUN.toArray(), 3));
      sunMark = new Points(sgm, new ShaderMaterial({
        uniforms: { dpr: { value: dpr } },
        vertexShader: `uniform float dpr; void main(){ gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_PointSize = 20.0 * dpr; }`,
        fragmentShader: `void main(){ float r = length(gl_PointCoord - 0.5) * 2.0; float ring = smoothstep(0.62, 0.72, r) * (1.0 - smoothstep(0.86, 0.96, r)); float dot = 1.0 - smoothstep(0.18, 0.26, r);
          float a = max(ring, dot); if (a < 0.02) discard; gl_FragColor = vec4(1.0, 0.83, 0.43, a); }`,
        transparent: true, depthWrite: false,
      }));
      sunMark.frustumCulled = false; scene.add(sunMark);
    }
    // 尺規：10 萬光年
    ruler = new Line(new BufferGeometry().setFromPoints([new Vector3(-50, 0, -58), new Vector3(50, 0, -58)]), new LineBasicMaterial({ color: 0x9fb0cf, transparent: true, opacity: 0.6 }));
    scene.add(ruler);
  }

  // ---------------- 標籤 ----------------
  const mk = (cls, h) => { const s = document.createElement('span'); s.className = `al-lab ${cls}`; s.innerHTML = h; s.style.opacity = 0; labels.appendChild(s); return s; };
  const DIRL = [[0, 0, 'Sagittarius · 人馬座<br><small>toward the center · 銀河中心方向</small>'], [82, 0, 'Cygnus · 天鵝座'], [120, 0, 'Cassiopeia · 仙后座'],
    [180, 0, 'Taurus · 金牛座<br><small>away from the center · 背向中心</small>'], [300, 0, 'Crux · 南十字座'], [67.45, 19.24, 'Vega · 織女星'], [47.74, -8.91, 'Altair · 牛郎星']];
  const L = renderer ? {
    sun: mk('mw-sun', 'Sun · 太陽<br><small>We are here · 我們在這裡</small>'), gc: mk('mw-gc', 'Galactic center · 銀河中心'), ruler: mk('mw-ruler', '100,000 light-years · 10 萬光年'),
    thick: mk('mw-ruler', 'About 1,000 light-years thick · 厚約 1,000 光年'),
    dirs: DIRL.map(([l, b, h]) => ({ l, b, el: mk(b ? 'mw-star' : 'mw-dir', h) })),
  } : null;
  const proj = new Vector3();
  let shown = new Set(), prevShown = new Set(), cw = 0, ch = 0;
  function place(el, v, dy = 6) {
    proj.copy(v).project(camera);
    if (proj.z > 1 || Math.abs(proj.x) > 1.02 || Math.abs(proj.y) > 1.02) return false;
    el.style.opacity = 1; shown.add(el);
    el.style.transform = `translate(${(proj.x * 0.5 + 0.5) * cw}px, ${(-proj.y * 0.5 + 0.5) * ch + dy}px) translate(-50%, 0)`;
    return true;
  }
  function updateLabels() {
    cw = spaceCv.clientWidth; ch = spaceCv.clientHeight; prevShown = shown; shown = new Set();
    if (state.view === 'inside') {
      for (const d of L.dirs) place(d.el, gdir(d.l, d.b).multiplyScalar(300).add(SUN), d.b ? 8 : -34);
    } else {
      place(L.sun, SUN, 12); place(L.gc, new Vector3(0, 0, 0), state.view === 'edge' ? -48 : 26);
      if (state.view === 'outside') place(L.ruler, new Vector3(0, 0, -58), -24);
      if (state.view === 'edge') place(L.thick, new Vector3(-26, 0, 0), 22);
    }
    for (const el of prevShown) if (!shown.has(el)) el.style.opacity = 0;
  }

  // ---------------- 相機 ----------------
  const camFrom = new Vector3(), tgtFrom = new Vector3();
  let camT = 1;
  function camGoal() {
    if (state.view === 'inside') return { pos: SUN.clone().add(new Vector3(0.5, 0.15, 0)), tgt: SUN.clone().add(new Vector3(-8, 0.15, 0)) };
    if (state.view === 'edge') return { pos: new Vector3(0, 1.2, 86), tgt: new Vector3(0, 0, 0) };
    return { pos: new Vector3(28, 60, 58), tgt: new Vector3(2, 0, -4) };
  }
  function setLimits() {
    if (!renderer) return;
    if (state.view === 'inside') { controls.minDistance = 0.3; controls.maxDistance = 2; camera.fov = Math.max(camera.fov, 70); }
    else { controls.minDistance = 8; controls.maxDistance = 400; }
    realStars.visible = state.view === 'inside' && state.real;
    sunMark.visible = state.view !== 'inside'; ruler.visible = state.view === 'outside';
    galaxyPts.material.uniforms.gain.value = state.view === 'inside' ? 1.6 : 1;
    resize();
  }
  function setView(v, instant = false) {
    state.view = v; root.dataset.view = v;
    $$('.ec-view button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.view === v ? 'true' : 'false'));
    setLimits();
    if (!renderer) return;
    if (instant || v === 'inside') { const g = camGoal(); camera.position.copy(g.pos); controls.target.copy(g.tgt); camT = 1; return; }
    camFrom.copy(camera.position); tgtFrom.copy(controls.target); camT = 0;
  }

  function resize() {
    if (renderer) {
      const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
      if (w && h) {
        renderer.setSize(w, h, false); camera.aspect = w / h;
        const hMin = (state.view === 'inside' ? 100 : camera.aspect < 1.1 ? 70 : 58) * DEG;
        camera.fov = Math.min(100, Math.max(42, 2 * Math.atan(Math.tan(hMin / 2) / camera.aspect) / DEG));
        camera.updateProjectionMatrix();
      }
    }
    drawSky();
  }

  // ---------------- 右側：彰化的全天星圖＋銀河 ----------------
  // 銀河光帶的取樣點：銀緯呈常態分布（中心附近較厚），往銀心方向較亮；天鵝座到天鷹座有一道暗帶（大裂縫）
  const band = (() => {
    let s = 7; const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
    const gauss = () => Math.sqrt(-2 * Math.log(rnd() + 1e-9)) * Math.cos(TAU * rnd());
    const out = [];
    while (out.length < 9000) {
      const l = rnd() * 360, dl = Math.min(l, 360 - l), w = 0.3 + 0.7 * Math.exp(-((dl / 55) ** 2));
      if (rnd() > w) continue;
      const b = gauss() * (3.5 + 4 * Math.exp(-((dl / 25) ** 2)));
      if (l > 15 && l < 80 && b > -0.5 && b < 3.5 && rnd() < 0.65) continue;     // 大裂縫（暗星雲）
      const q = galToEq(l, b); out.push(q.ra, q.dec, w);
    }
    return out;
  })();
  const R = { when: $('.mw-when'), gc: $('.mw-gcr'), band: $('.mw-band'), moon: $('.mw-moon') };
  function skyTime() {
    const now = new Date(), x = new Date(now.getTime() + 8 * 3600000);
    if (state.when === 'now') return now;
    if (state.when === 'july') return new Date(Date.UTC(x.getUTCMonth() > 6 ? x.getUTCFullYear() + 1 : x.getUTCFullYear(), 6, 15, 13));
    return new Date(Date.UTC(x.getUTCFullYear(), x.getUTCMonth(), x.getUTCDate(), 13));
  }
  function proj2(alt, az, Rr) { const r = Rr * Math.tan((90 - alt) * DEG / 2); return [-r * Math.sin(az * DEG), -r * Math.cos(az * DEG)]; }
  function drawSky() {
    if (!skyCv) return;
    const W = skyCv.clientWidth || 300, H = W, N = Math.round(W * dpr);
    if (skyCv.width !== N || skyCv.height !== N) { skyCv.width = N; skyCv.height = N; }
    const c = skyCv.getContext('2d'); c.setTransform(dpr, 0, 0, dpr, 0, 0);
    const cx = W / 2, cy = H / 2, Rr = W * 0.46, t = skyTime();
    c.fillStyle = '#02040c'; c.fillRect(0, 0, W, H);
    c.save(); c.beginPath(); c.arc(cx, cy, Rr, 0, TAU); c.clip();
    c.fillStyle = '#050a1c'; c.fillRect(0, 0, W, H);
    c.globalCompositeOperation = 'lighter';
    const rr = Math.max(2, W / 95);
    for (let i = 0; i < band.length; i += 3) {
      const h = altAz(band[i], band[i + 1], t, SITE); if (h.alt < 0) continue;
      const [x, y] = proj2(h.alt, h.az, Rr), a = 0.05 * band[i + 2];
      c.fillStyle = `rgba(200,210,255,${a})`; c.beginPath(); c.arc(cx + x, cy + y, rr, 0, TAU); c.fill();
    }
    c.globalCompositeOperation = 'source-over';
    const aa = allStarsAltAz(t, SITE);
    c.strokeStyle = 'rgba(140,165,220,.2)'; c.lineWidth = 0.8; c.beginPath();
    for (const seg of Object.values(LINES)) for (let k = 0; k < seg.length; k += 2) {
      const a = seg[k], b = seg[k + 1]; if (aa[a * 2] < 0 || aa[b * 2] < 0) continue;
      const [x1, y1] = proj2(aa[a * 2], aa[a * 2 + 1], Rr), [x2, y2] = proj2(aa[b * 2], aa[b * 2 + 1], Rr); c.moveTo(cx + x1, cy + y1); c.lineTo(cx + x2, cy + y2);
    }
    c.stroke();
    for (let i = 0; i < N_STARS; i++) {
      const alt = aa[i * 2]; if (alt < 0) continue;
      const mag = STARS[i * 4 + 2], [x, y] = proj2(alt, aa[i * 2 + 1], Rr), col = bvColor(STARS[i * 4 + 3]);
      c.fillStyle = `rgba(${col.map(Math.round).join(',')},${MathUtils.clamp(1.1 - mag * 0.17, 0.25, 1)})`;
      c.beginPath(); c.arc(cx + x, cy + y, MathUtils.clamp(2.3 - mag * 0.36, 0.5, 2.5) * (W / 320), 0, TAU); c.fill();
    }
    // 銀心、牛郎、織女
    const mark = (ra, dec, lab, col) => { const h = altAz(ra, dec, t, SITE); if (h.alt < 0) return; const [x, y] = proj2(h.alt, h.az, Rr); c.strokeStyle = col; c.lineWidth = 1.6; c.beginPath(); c.arc(cx + x, cy + y, 7, 0, TAU); c.stroke(); c.fillStyle = col; c.font = `700 ${Math.max(9, W * 0.034)}px system-ui, sans-serif`; c.textAlign = 'center'; c.fillText(lab, cx + x, cy + y - 11); };
    const gc = galToEq(0, 0);
    mark(gc.ra, gc.dec, 'Center 銀心', '#ffd36e'); mark(279.2347, 38.7837, 'Vega 織女', '#cfe2ff'); mark(297.6958, 8.8683, 'Altair 牛郎', '#cfe2ff');
    const moon = moonAltAzOf(t, SITE);
    if (moon.alt > 0) { const [x, y] = proj2(moon.alt, moon.az, Rr), g = c.createRadialGradient(cx + x, cy + y, 0, cx + x, cy + y, 22); g.addColorStop(0, 'rgba(255,250,230,1)'); g.addColorStop(0.3, 'rgba(255,250,230,.5)'); g.addColorStop(1, 'rgba(255,250,230,0)'); c.fillStyle = g; c.beginPath(); c.arc(cx + x, cy + y, 22, 0, TAU); c.fill(); }
    c.restore();
    c.strokeStyle = 'rgba(160,180,230,.45)'; c.lineWidth = 1.2; c.beginPath(); c.arc(cx, cy, Rr, 0, TAU); c.stroke();
    c.font = `700 ${Math.max(10, W * 0.04)}px system-ui, sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle';
    for (const [lab, x, y] of [['N 北', 0, -Rr], ['S 南', 0, Rr], ['E 東', -Rr, 0], ['W 西', Rr, 0]]) { c.fillStyle = 'rgba(2,4,12,.85)'; c.fillRect(cx + x - 15, cy + y - 8, 30, 16); c.fillStyle = '#9fb0cf'; c.fillText(lab, cx + x, cy + y); }
    c.textBaseline = 'alphabetic';
    // 讀數
    const w = milkyWayAt(t, SITE), lx = new Date(t.getTime() + 8 * 3600000), ph = moonPhase(t);
    R.when.innerHTML = `${MON[lx.getUTCMonth()]} ${lx.getUTCDate()}, ${lx.getUTCFullYear()}, ${String(lx.getUTCHours()).padStart(2, '0')}:${String(lx.getUTCMinutes()).padStart(2, '0')} over Changhua<span>${lx.getUTCFullYear()} 年 ${lx.getUTCMonth() + 1} 月 ${lx.getUTCDate()} 日 ${String(lx.getUTCHours()).padStart(2, '0')}:${String(lx.getUTCMinutes()).padStart(2, '0')}，彰化</span>`;
    const [gd, gdz] = dirOf(w.gcAz);
    R.gc.innerHTML = w.gcAlt > 0 ? `${Math.round(w.gcAlt)}° up in the ${gd}<span>在${gdz}方，高 ${Math.round(w.gcAlt)}°</span>` : 'Below the horizon<span>在地平線下</span>';
    R.band.innerHTML = w.cons.length ? `${w.cons.map((x) => x.en).join(' · ')}<span>${w.cons.map((x) => x.zh).join('、')}</span>` : 'Too low to see well<span>太低，看不清楚</span>';
    R.moon.innerHTML = moon.alt > 0 ? `${Math.round(ph.illum * 100)}% lit and up: ${ph.illum > 0.4 ? 'its light hides the faint band' : 'a thin Moon, not much trouble'}<span>亮面 ${Math.round(ph.illum * 100)}%，在天上${ph.illum > 0.4 ? '：月光會蓋掉暗淡的銀河' : '：細細的月亮，影響不大'}</span>` : 'Down: good for the Milky Way<span>不在天上：適合看銀河</span>';
  }

  // ---------------- 操作 ----------------
  $$('.ec-view button').forEach((b) => b.addEventListener('click', () => { setView(b.dataset.view); root.classList.remove('al-fresh'); }));
  $$('.mw-whenb button').forEach((b) => b.addEventListener('click', () => { state.when = b.dataset.when; $$('.mw-whenb button').forEach((x) => x.setAttribute('aria-pressed', x === b ? 'true' : 'false')); drawSky(); }));
  const tg = $('[data-t="real"]'); if (tg) tg.addEventListener('change', () => { state.real = tg.checked; if (realStars) realStars.visible = state.view === 'inside' && state.real; });
  if (renderer) $('.al-home').addEventListener('click', () => setView(state.view));
  if (renderer) new ResizeObserver(resize).observe(spaceWrap);
  new ResizeObserver(() => drawSky()).observe(skyCv);

  // ---------------- 迴圈 ----------------
  let visible = false, raf = 0, last = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    if (renderer) {
      if (camT < 1) {
        camT = Math.min(1, camT + dt / 1.6);
        const k = MathUtils.smootherstep(camT, 0, 1), g = camGoal();
        camera.position.lerpVectors(camFrom, g.pos, k); controls.target.lerpVectors(tgtFrom, g.tgt, k);
      }
      if (state.view !== 'inside' && root.classList.contains('al-fresh')) galaxyPts.rotation.y -= dt * 0.02;   // 剛打開時慢慢轉（順時針，和真實方向一樣）
      controls.update(); updateLabels(); renderer.render(scene, camera);
    }
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  setView('outside', true);
  root.classList.add('al-ready', 'al-fresh');
  root.__lab = {
    camera, controls, state, setView, drawSky,
    render: () => { if (renderer) { galaxyPts.rotation.y = 0; controls.update(); updateLabels(); renderer.render(scene, camera); } },
  };
  return { setView };
}

// ---------------------------------------------------------------------------
// 頁面下方：今晚彰化的銀河，以及一年裡晚上九點銀心的高度
function renderTonight(box) {
  const now = new Date(), x = new Date(now.getTime() + 8 * 3600000), y = x.getUTCFullYear(), at = new Date(Date.UTC(y, x.getUTCMonth(), x.getUTCDate(), 13));
  const w = milkyWayAt(at, SITE), ph = moonPhase(at), moon = moonAltAzOf(at, SITE);
  const [gd, gdz] = dirOf(w.gcAz), [td, tdz] = dirOf(w.top.az);
  const bars = Array.from({ length: 12 }, (_, m) => { const a = milkyWayAt(new Date(Date.UTC(y, m, 15, 13)), SITE).gcAlt; return { m, a }; });
  const barHtml = bars.map(({ m, a }) => `<div class="mw-bar${a > 15 ? ' up' : ''}${m === x.getUTCMonth() ? ' now' : ''}"><i style="height:${Math.max(0, a) / 40 * 100}%"></i><b>${a > 0 ? Math.round(a) + '°' : '—'}</b><span>${MON[m]}<em>${m + 1} 月</em></span></div>`).join('');
  box.innerHTML = `<p class="tn-when">${MON[x.getUTCMonth()]} ${x.getUTCDate()}, ${y}, 9:00 p.m. over Changhua<span>${y} 年 ${x.getUTCMonth() + 1} 月 ${x.getUTCDate()} 日晚上 9 點，彰化</span></p>
    <div class="tn-grid mw-tn-grid">
      <div class="tn-item"><span class="tn-ico" aria-hidden="true">&#10022;</span><div><h3>The band<span class="zh">銀河光帶</span></h3><p>${w.cons.length ? `Runs through ${w.cons.map((c) => c.en).join(', ')}; highest in the ${td}, ${Math.round(w.top.alt)}° up` : 'Too low tonight'}<span class="zh">${w.cons.length ? `經過${w.cons.map((c) => c.zh).join('、')}；最高點在${tdz}方，高 ${Math.round(w.top.alt)}°` : '今晚太低'}</span></p></div></div>
      <div class="tn-item"><span class="tn-ico" aria-hidden="true">&#9673;</span><div><h3>The bright center<span class="zh">明亮的銀心</span></h3><p>${w.gcAlt > 0 ? `${Math.round(w.gcAlt)}° up in the ${gd}, in Sagittarius` : 'Below the horizon at 9 p.m.'}<span class="zh">${w.gcAlt > 0 ? `在${gdz}方人馬座，高 ${Math.round(w.gcAlt)}°` : '晚上九點在地平線下'}</span></p></div></div>
      <div class="tn-item"><span class="tn-ico" aria-hidden="true">&#9790;</span><div><h3>The Moon<span class="zh">月亮</span></h3><p>${moon.alt > 0 ? `${Math.round(ph.illum * 100)}% lit and up${ph.illum > 0.4 ? ': too bright for the faint band' : ''}` : `Down at 9 p.m. (${Math.round(ph.illum * 100)}% lit): good`}<span class="zh">${moon.alt > 0 ? `亮面 ${Math.round(ph.illum * 100)}%，在天上${ph.illum > 0.4 ? '：太亮，會蓋掉銀河' : ''}` : `九點時不在天上（亮面 ${Math.round(ph.illum * 100)}%）：很好`}</span></p></div></div>
    </div>
    <h3 class="tn-h">The center at 9 p.m., month by month · 每個月晚上九點的銀心高度</h3>
    <div class="mw-bars" role="img" aria-label="Height of the galactic center at 9 p.m. on the 15th of each month">${barHtml}</div>
    <p class="tn-note">Gold bars: the bright center is more than 15° up at 9 p.m. In Taiwan, the best Milky Way season is summer. You need a dark place away from city lights, such as the Hehuan Mountain Dark Sky Park. · 金色：晚上九點銀心高於 15°。在台灣，看銀河最好的季節是夏天，而且要到遠離城市燈光的地方，例如合歡山暗空公園。</p>`;
  box.setAttribute('aria-busy', 'false');
}

function boot() {
  const root = document.querySelector('[data-milkyway-lab]');
  let api = null, started = false;
  const start = () => { if (!started && root) { started = true; api = initLab(root); } return api; };
  if (root) {
    const io = new IntersectionObserver((ents) => { if (ents[0].isIntersecting) { io.disconnect(); start(); } }, { rootMargin: '600px' });
    io.observe(root);
  }
  const tn = document.querySelector('[data-milkyway]');
  if (tn) renderTonight(tn);
  document.querySelectorAll('[data-lab-view]').forEach((b) => b.addEventListener('click', () => {
    const lab = start(); if (!lab) return;
    lab.setView(b.getAttribute('data-lab-view'));
    root.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }));
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
