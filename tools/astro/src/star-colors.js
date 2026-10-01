/*
 * 天文教育 · 第十二課「星星為什麼有不同的顏色？」的 3D 模型。
 *
 * 一個機制：顏色＝表面溫度。越冷越紅，越熱越藍白；太陽在中間。
 * 兩個視角共用一個 renderer：
 *   ・加熱一顆星（heat）：一顆星的表面溫度從 2,000 K 拉到 30,000 K，顏色照黑體光譜（starcolor.js）；旁邊放一顆太陽對照。
 *   ・星星排排站（sort）：第十課的 Hipparcos 星（near-stars.js）先在天上的真實方向（距離壓縮），按「排排站」就飛進
 *     赫羅圖（左熱右冷、上亮下暗）：顏色真的照溫度排好，大部分落在主序帶上。
 * 右側：這顆星的光，一個顏色一個顏色看（Planck 曲線、可見光彩虹、太陽虛線對照）。
 *
 * 產物：cd tools/astro && npm run build → assets/js/star-colors.js
 */
import {
  AdditiveBlending, BufferGeometry, CanvasTexture, Color, Float32BufferAttribute, LineBasicMaterial, LineSegments, MathUtils, Mesh,
  PerspectiveCamera, Points, Scene, ShaderMaterial, SphereGeometry, Sprite, SpriteMaterial, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DEG, TAU, glowTexture } from './common.js';
import { STARS } from './stars-data.js';
import { N_STARS, STAR_ECL, altAz } from './sky.js';
import { NEAR_NAMED } from './near-stars.js';
import { N_NEAR, absMag, eqToEclVec, eqVec, lyOf, nearStar, starByKey } from './distance.js';
import { SUN_BV, SUN_MV, SUN_T, TEMPS, bbColor, bvToT, cmf, colorName, peakBand, planck, spectralClass, wienPeak } from './starcolor.js';

const SITE = { lat: 24.08, lon: 120.54 };
const RS = 600;
const T_MIN = 2000, T_MAX = 30000;
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const commas = (n) => Math.round(n).toLocaleString('en-US');
const celsius = (T) => commas(Math.round((T - 273.15) / 100) * 100);   // 攝氏，取到百位
const sv = (p) => new Vector3(p[0], p[2], -p[1]);
const rgbStr = (c) => `rgb(${c.join(',')})`;
/** 名星（含太陽）：key → { en, zh, T }。 */
function starInfo(k) {
  if (k === 'sun') return { key: 'sun', en: 'The Sun', zh: '太陽', T: SUN_T };
  const s = starByKey(k);
  return { key: k, en: s.en, zh: s.zh, T: TEMPS[k] };
}
/** 單一波長的顏色（畫彩虹條用）。 */
function wavelengthRGB(nm) {
  const [X, Y, Z] = cmf(nm);
  let r = 3.2406 * X - 1.5372 * Y - 0.4986 * Z, g = -0.9689 * X + 1.8758 * Y + 0.0415 * Z, b = 0.0557 * X - 0.2040 * Y + 1.0570 * Z;
  r = Math.max(0, r); g = Math.max(0, g); b = Math.max(0, b);
  const m = Math.max(r, g, b, 1e-6), fade = nm < 420 ? (nm - 380) / 40 * 0.7 + 0.3 : nm > 700 ? (780 - nm) / 80 * 0.7 + 0.3 : 1;
  return [r, g, b].map((v) => Math.round(255 * Math.pow(v / m, 0.8) * fade));
}

// ---------------------------------------------------------------------------
function initLab(root) {
  const $ = (s) => root.querySelector(s), $$ = (s) => root.querySelectorAll(s);
  const spaceWrap = $('.al-space'), spaceCv = $('.al-space-cv'), labels = $('.al-labels'), specCv = $('.cl-spec-cv');
  let renderer;
  try { renderer = new WebGLRenderer({ canvas: spaceCv, antialias: true }); } catch (e) { root.classList.add('al-nogl'); }
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const state = { view: 'heat', key: 'betelgeuse', T: TEMPS.betelgeuse, sorted: false, mix: 0 };

  let camera, controls, heat = {}, sort = {};
  if (renderer) {
    renderer.setPixelRatio(dpr);
    camera = new PerspectiveCamera(45, 1.6, 0.1, 5000);
    controls = new OrbitControls(camera, spaceCv);
    controls.enableDamping = true; controls.dampingFactor = 0.08; controls.enablePan = false;
    const starPts = (pos, col, size) => {
      const g = new BufferGeometry();
      g.setAttribute('position', new Float32BufferAttribute(pos, 3)); g.setAttribute('tint', new Float32BufferAttribute(col, 3)); g.setAttribute('size', new Float32BufferAttribute(size, 1));
      return g;
    };
    // ---------- 加熱一顆星 ----------
    heat.scene = new Scene(); heat.scene.background = new Color(0x03050d);
    {
      const p = [], c = [], s = [];
      for (let i = 0; i < N_STARS; i++) {
        const l = STAR_ECL[i * 2] * DEG, b = STAR_ECL[i * 2 + 1] * DEG, mag = STARS[i * 4 + 2], br = MathUtils.clamp(0.7 - mag * 0.12, 0.1, 0.7);
        p.push(RS * Math.cos(b) * Math.cos(l), RS * Math.sin(b), -RS * Math.cos(b) * Math.sin(l));
        const col = bbColor(bvToT(STARS[i * 4 + 3])); c.push(col[0] / 255 * br, col[1] / 255 * br, col[2] / 255 * br);
        s.push(MathUtils.clamp(5 - mag, 1.2, 5));
      }
      heat.scene.add(new Points(starPts(p, c, s), new ShaderMaterial({
        uniforms: { dpr: { value: dpr } },
        vertexShader: `attribute vec3 tint; attribute float size; uniform float dpr; varying vec3 vC;
          void main(){ vC = tint; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_PointSize = size * dpr; }`,
        fragmentShader: `varying vec3 vC; void main(){ float r = length(gl_PointCoord - 0.5) * 2.0; float a = smoothstep(1.0, 0.15, r); a *= a; gl_FragColor = vec4(vC * a, 1.0); }`,
        blending: AdditiveBlending, transparent: true, depthWrite: false,
      })));
    }
    // 星的表面：顏色＋周邊變暗＋一點顆粒（程序化）
    const surf = () => new ShaderMaterial({
      uniforms: { col: { value: new Color(1, 1, 1) }, time: { value: 0 } },
      vertexShader: `varying vec3 vN; varying vec3 vP; void main(){ vN = normalize(normalMatrix * normal); vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `uniform vec3 col; uniform float time; varying vec3 vN; varying vec3 vP;
        float h(vec3 p){ return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453); }
        float n(vec3 p){ vec3 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
          return mix(mix(mix(h(i), h(i+vec3(1,0,0)), f.x), mix(h(i+vec3(0,1,0)), h(i+vec3(1,1,0)), f.x), f.y),
                     mix(mix(h(i+vec3(0,0,1)), h(i+vec3(1,0,1)), f.x), mix(h(i+vec3(0,1,1)), h(i+vec3(1,1,1)), f.x), f.y), f.z); }
        void main(){ float mu = clamp(dot(normalize(vN), vec3(0,0,1)), 0.0, 1.0);
          float g = 0.88 + 0.12 * n(vP * 6.0 + vec3(time * 0.15));
          float limb = 0.45 + 0.55 * pow(mu, 0.6);
          gl_FragColor = vec4(col * limb * g, 1.0); }`,
    });
    heat.star = new Mesh(new SphereGeometry(3, 64, 48), surf()); heat.scene.add(heat.star);
    heat.glow = new Sprite(new SpriteMaterial({ map: glowTexture([[0, 'rgba(255,255,255,.9)'], [0.3, 'rgba(255,255,255,.35)'], [1, 'rgba(255,255,255,0)']]), blending: AdditiveBlending, depthWrite: false, transparent: true }));
    heat.glow.scale.setScalar(14); heat.scene.add(heat.glow);
    heat.sun = new Mesh(new SphereGeometry(0.9, 48, 32), surf()); heat.sun.position.set(7.5, -2.2, 0); heat.scene.add(heat.sun);
    heat.sun.material.uniforms.col.value.setRGB(...bbColor(SUN_T).map((v) => v / 255));
    const sg = new Sprite(new SpriteMaterial({ map: heat.glow.material.map, color: new Color(...bbColor(SUN_T).map((v) => v / 255)), blending: AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.6 }));
    sg.scale.setScalar(4); heat.sun.add(sg);

    // ---------- 星星排排站 ----------
    sort.scene = new Scene(); sort.scene.background = new Color(0x03050d);
    const N = N_NEAR + 1, a0 = [], a1 = [], col = [], size = [], delay = [];
    sort.hr = []; sort.sky = [];
    // 赫羅圖：橫軸 B−V（−0.4 到 2.0，左熱右冷），縱軸絕對星等（−8 到 16，上亮下暗）
    const hrY = (M) => 26 - (MathUtils.clamp(M, -8, 16) + 8) / 24 * 52;
    const hrPos = (bv, M) => new Vector3(-30 + (MathUtils.clamp(bv, -0.4, 2.0) + 0.4) / 2.4 * 60, hrY(M), 0);
    for (let i = 0; i < N; i++) {
      let p0, p1, T, M;
      if (i === N_NEAR) { p0 = new Vector3(0, 0, 0); M = SUN_MV; p1 = hrPos(SUN_BV, M); T = SUN_T; }   // 太陽：在正中央
      else {
        const s = nearStar(i), ly = lyOf(s.plx), r = 16 * Math.log10(1 + ly / 2);
        p0 = sv(eqToEclVec(eqVec(s.ra, s.dec))).multiplyScalar(r); M = absMag(s.mag, s.plx); p1 = hrPos(s.bv, M); T = bvToT(s.bv);
        p1.z = (Math.sin(i * 12.9898) * 43758.5453 % 1) * 1.2;
      }
      a0.push(p0.x, p0.y, p0.z); a1.push(p1.x, p1.y, p1.z); sort.sky.push(p0); sort.hr.push(p1);
      const c = bbColor(T); col.push(c[0] / 255, c[1] / 255, c[2] / 255);
      size.push(i === N_NEAR ? 9 : MathUtils.clamp(6.2 - 0.32 * M, 2.2, 9));
      delay.push(Math.min(1, (p1.x + 30) / 60) * 0.35);
    }
    const g = new BufferGeometry();
    g.setAttribute('position', new Float32BufferAttribute(a0, 3)); g.setAttribute('hr', new Float32BufferAttribute(a1, 3));
    g.setAttribute('tint', new Float32BufferAttribute(col, 3)); g.setAttribute('size', new Float32BufferAttribute(size, 1)); g.setAttribute('delay', new Float32BufferAttribute(delay, 1));
    sort.pts = new Points(g, new ShaderMaterial({
      uniforms: { dpr: { value: dpr }, mixv: { value: 0 } },
      vertexShader: `attribute vec3 hr; attribute vec3 tint; attribute float size; attribute float delay; uniform float dpr; uniform float mixv; varying vec3 vC;
        void main(){ float k = smoothstep(delay, delay + 0.65, mixv); vec3 p = mix(position, hr, k);
          vC = tint; gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0); gl_PointSize = size * dpr; }`,
      fragmentShader: `varying vec3 vC; void main(){ float r = length(gl_PointCoord - 0.5) * 2.0; float a = smoothstep(1.0, 0.2, r); gl_FragColor = vec4(vC * a, 1.0); }`,
      blending: AdditiveBlending, transparent: true, depthWrite: false,
    }));
    sort.pts.frustumCulled = false; sort.scene.add(sort.pts);
    // 赫羅圖的軸與主序帶示意
    const ax = [];
    const P = (x, y) => [x, y, -0.5];
    ax.push(...P(-31, -27), ...P(31, -27), ...P(-31, -27), ...P(-31, 27));
    for (const M of [-5, 0, 5, 10, 15]) ax.push(...P(-31, hrY(M)), ...P(-30, hrY(M)));
    sort.axes = new LineSegments(new BufferGeometry().setAttribute('position', new Float32BufferAttribute(ax, 3)), new LineBasicMaterial({ color: 0x9fb0cf, transparent: true, opacity: 0 }));
    sort.scene.add(sort.axes);
    sort.idx = Object.fromEntries(Object.entries(NEAR_NAMED).map(([k, v]) => [k, v[0]])); sort.idx.sun = N_NEAR;
  }

  // ---------------- 標籤 ----------------
  const mk = (cls, h) => { const s = document.createElement('span'); s.className = `al-lab ${cls}`; s.innerHTML = h; s.style.opacity = 0; labels.appendChild(s); return s; };
  const L = renderer ? {
    star: mk('cl-star', ''), sun: mk('sun', '&#9728; Sun for comparison · 太陽對照'),
    hot: mk('cl-ax', '&larr; Hotter, bluer · 越熱越藍'), cool: mk('cl-ax', 'Cooler, redder &rarr; · 越冷越紅'), up: mk('cl-ax', '&uarr; Brighter · 越亮'), down: mk('cl-ax', '&darr; Fainter · 越暗'),
    ms: mk('cl-grp', 'Main sequence · 主序星'), giants: mk('cl-grp', 'Giants · 巨星'), wd: mk('cl-grp', 'White dwarfs · 白矮星'),
    names: Object.fromEntries(['sun', 'proxima', 'betelgeuse', 'arcturus', 'procyon', 'sirius', 'rigel', 'spica', 'vega', 'aldebaran', 'antares', 'acen', 'barnard'].map((k) => [k, mk('cl-nm', `${starInfo(k).en} · ${starInfo(k).zh}`)])),
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
  const mixed = (i) => { const k = MathUtils.smoothstep(state.mix, 0.0, 1.0); return sort.sky[i].clone().lerp(sort.hr[i], k); };
  function updateLabels() {
    cw = spaceCv.clientWidth; ch = spaceCv.clientHeight; prevShown = shown; shown = new Set();
    if (state.view === 'heat') {
      L.star.innerHTML = `${state.key ? `${starInfo(state.key).en} · ${starInfo(state.key).zh}<br>` : ''}${commas(state.T)} K`;
      place(L.star, new Vector3(0, -3.3, 0), 6);
      place(L.sun, heat.sun.position.clone().add(new Vector3(0, -1, 0)), 6);
    } else {
      const m = state.mix;
      if (m > 0.6) {
        place(L.hot, new Vector3(-24, -29, 0), 0); place(L.cool, new Vector3(24, -29, 0), 0);
        place(L.up, new Vector3(-33, 22, 0), 0); place(L.down, new Vector3(-33, -22, 0), 0);
        place(L.ms, new Vector3(-17, -7, 0), 0); place(L.giants, new Vector3(20, 18, 0), 0); place(L.wd, new Vector3(-14, -19, 0), 0);
      }
      const narrow = cw < 520;
      for (const [k, el] of Object.entries(L.names)) {
        if (narrow && !['sun', 'betelgeuse', 'sirius', 'rigel', 'proxima', state.key].includes(k)) continue;
        el.classList.toggle('on', k === state.key);
        place(el, mixed(sort.idx[k]), 8);
      }
    }
    for (const el of prevShown) if (!shown.has(el)) el.style.opacity = 0;
  }

  // ---------------- 讀數與光譜 ----------------
  const R = { name: $('.cl-name'), temp: $('.cl-temp'), color: $('.cl-color'), cls: $('.cl-class'), peak: $('.cl-peak'), flux: $('.cl-flux') };
  function readouts() {
    const T = state.T, cn = colorName(T), pb = peakBand(T), info = state.key ? starInfo(state.key) : null;
    R.name.innerHTML = info ? `${info.en} · ${info.zh}` : 'Your own star · 自己調的星';
    R.temp.innerHTML = `${commas(T)} K<span>約攝氏 ${celsius(T)} 度</span>`;
    R.color.innerHTML = `${cn.en[0].toUpperCase()}${cn.en.slice(1)}<span>${cn.zh}</span>`;
    R.cls.innerHTML = `${spectralClass(T)} star<span>${spectralClass(T)} 型星</span>`;
    R.peak.innerHTML = `${commas(wienPeak(T))} nm, ${pb.en}<span>${commas(wienPeak(T))} 奈米，${pb.zh}最強</span>`;
    const f = Math.pow(T / SUN_T, 4);
    R.flux.innerHTML = f >= 1.05 ? `${f < 10 ? f.toFixed(1) : commas(f)} times the Sun's<span>每平方公尺發出的光是太陽的 ${f < 10 ? f.toFixed(1) : commas(f)} 倍</span>`
      : f > 0.95 ? 'The same as the Sun<span>和太陽一樣</span>' : `${(f * 100).toFixed(0)}% of the Sun's<span>每平方公尺發出的光只有太陽的 ${(f * 100).toFixed(0)}%</span>`;
  }
  function drawSpec() {
    const W = specCv.clientWidth || 300, H = Math.round(W * 0.62);
    if (specCv.width !== Math.round(W * dpr)) { specCv.width = Math.round(W * dpr); specCv.height = Math.round(H * dpr); specCv.style.height = `${H}px`; }
    const c = specCv.getContext('2d'); c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.fillStyle = '#02040c'; c.fillRect(0, 0, W, H);
    const L0 = 100, L1 = 1600, x = (nm) => 12 + (nm - L0) / (L1 - L0) * (W - 24), base = H - 30, top = 18;
    // 可見光彩虹條
    for (let nm = 380; nm <= 780; nm += 2) { c.fillStyle = rgbStr(wavelengthRGB(nm)); c.fillRect(x(nm), base + 4, x(nm + 2) - x(nm) + 0.5, 8); }
    c.fillStyle = '#9fb0cf'; c.font = `600 ${Math.max(9, W * 0.032)}px system-ui, sans-serif`; c.textAlign = 'center';
    c.fillText('UV 紫外線', x(240), base + 24); c.fillText('Visible 可見光', x(580), base + 24); c.fillText('Infrared 紅外線', x(1200), base + 24);
    const curve = (T, stroke, fill, dash) => {
      let mx = 0; for (let nm = L0; nm <= L1; nm += 5) mx = Math.max(mx, planck(nm, T));
      const pk = planck(wienPeak(T), T); mx = Math.max(mx, pk);
      c.beginPath();
      for (let nm = L0; nm <= L1; nm += 5) { const yy = base - (planck(nm, T) / mx) * (base - top); nm === L0 ? c.moveTo(x(nm), yy) : c.lineTo(x(nm), yy); }
      if (fill) { c.lineTo(x(L1), base); c.lineTo(x(L0), base); c.closePath(); c.fillStyle = fill; c.fill(); }
      c.setLineDash(dash ? [5, 4] : []); c.strokeStyle = stroke; c.lineWidth = dash ? 1.4 : 2.2; c.stroke(); c.setLineDash([]);
    };
    const col = bbColor(state.T);
    curve(SUN_T, 'rgba(255,241,234,.55)', null, true);
    curve(state.T, rgbStr(col), `rgba(${col.join(',')},.18)`, false);
    // 峰值
    const pk = wienPeak(state.T);
    if (pk <= L1) { c.strokeStyle = 'rgba(255,211,110,.8)'; c.setLineDash([2, 3]); c.beginPath(); c.moveTo(x(pk), top - 4); c.lineTo(x(pk), base); c.stroke(); c.setLineDash([]); }
    c.fillStyle = '#ffd36e'; c.textAlign = pk > 1100 ? 'right' : 'left'; c.font = `700 ${Math.max(9, W * 0.034)}px system-ui, sans-serif`;
    c.fillText(pk <= L1 ? ` peak ${commas(pk)} nm 最強 ` : '→ peak farther in the infrared', pk <= L1 ? x(pk) : W - 12, top + 4);
    c.textAlign = 'right'; c.fillStyle = 'rgba(255,241,234,.8)'; c.fillText('- - Sun 太陽', W - 14, top + 22); c.textAlign = 'left';
    c.strokeStyle = 'rgba(160,180,230,.3)'; c.beginPath(); c.moveTo(12, base); c.lineTo(W - 12, base); c.stroke();
  }
  function setTemp(T, key = null) {
    state.T = Math.round(T); state.key = key;
    const s = Math.log(T / T_MIN) / Math.log(T_MAX / T_MIN);
    slider.value = String(s); slider.style.setProperty('--p', `${s * 100}%`);
    slider.style.setProperty('--grad', `linear-gradient(90deg, ${[0, 0.2, 0.4, 0.6, 0.8, 1].map((q) => `${rgbStr(bbColor(T_MIN * Math.pow(T_MAX / T_MIN, q)))} ${q * 100}%`).join(', ')})`);
    $$('.cl-chip').forEach((b) => b.classList.toggle('on', b.dataset.star === key));
    if (renderer) {
      const c = bbColor(T).map((v) => v / 255);
      heat.star.material.uniforms.col.value.setRGB(c[0], c[1], c[2]);
      heat.glow.material.color.setRGB(c[0], c[1], c[2]);
    }
    readouts(); drawSpec();
  }
  function setStar(k) { setTemp(starInfo(k).T, k); }

  // ---------------- 相機 ----------------
  const camFrom = new Vector3(), tgtFrom = new Vector3();
  let camT = 1;
  const camGoal = () => (state.view === 'heat' ? { pos: new Vector3(2.5, 1.5, 17), tgt: new Vector3(1.5, 0, 0) }
    : state.sorted ? { pos: new Vector3(0, 1, camera.aspect < 1.1 ? 60 : 76), tgt: new Vector3(0, 1, 0) } : { pos: new Vector3(30, 26, 62), tgt: new Vector3(0, 0, 0) });
  function goCam(instant) {
    if (!renderer) return;
    if (instant) { const g = camGoal(); camera.position.copy(g.pos); controls.target.copy(g.tgt); camT = 1; return; }
    camFrom.copy(camera.position); tgtFrom.copy(controls.target); camT = 0;
  }
  function setView(v) {
    const changed = v !== state.view;
    state.view = v; root.dataset.view = v;
    $$('.ec-view button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.view === v ? 'true' : 'false'));
    goCam(changed);
  }
  function setSorted(s) {
    state.sorted = s;
    sortBtn.innerHTML = s ? 'Back to the sky · 回到天空' : 'Sort them by color · 依顏色排排站';
    sortBtn.setAttribute('aria-pressed', s ? 'true' : 'false');
    if (state.view !== 'sort') setView('sort');
    goCam(false);
  }

  function resize() {
    if (renderer) {
      const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
      if (w && h) {
        renderer.setSize(w, h, false); camera.aspect = w / h;
        const hMin = (camera.aspect < 1.1 ? 70 : 58) * DEG;
        camera.fov = Math.max(42, 2 * Math.atan(Math.tan(hMin / 2) / camera.aspect) / DEG);
        camera.updateProjectionMatrix();
      }
    }
    drawSpec();
  }
  if (renderer) new ResizeObserver(resize).observe(spaceWrap);
  new ResizeObserver(drawSpec).observe(specCv);

  // ---------------- 操作 ----------------
  const slider = $('.cl-temp-sl'), sortBtn = $('.cl-sort');
  slider.addEventListener('input', () => { setTemp(T_MIN * Math.pow(T_MAX / T_MIN, parseFloat(slider.value)), null); if (state.view !== 'heat') setView('heat'); root.classList.remove('al-fresh'); });
  $$('.cl-chip').forEach((b) => b.addEventListener('click', () => { setStar(b.dataset.star); root.classList.remove('al-fresh'); }));
  $$('.ec-view button').forEach((b) => b.addEventListener('click', () => setView(b.dataset.view)));
  sortBtn.addEventListener('click', () => { setSorted(!state.sorted); root.classList.remove('al-fresh'); });
  if (renderer) $('.al-home').addEventListener('click', () => goCam(false));
  // 排排站時，被選的星加一個金色圈
  let sel = null;
  if (renderer) {
    const g = new BufferGeometry(); g.setAttribute('position', new Float32BufferAttribute([0, 0, 0], 3));
    const cv = document.createElement('canvas'); cv.width = cv.height = 64; const cx = cv.getContext('2d'); cx.strokeStyle = '#ffd36e'; cx.lineWidth = 5; cx.beginPath(); cx.arc(32, 32, 26, 0, TAU); cx.stroke();
    const tex = new CanvasTexture(cv);
    sel = new Points(g, new ShaderMaterial({
      uniforms: { map: { value: tex }, dpr: { value: dpr } },
      vertexShader: `uniform float dpr; void main(){ gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_PointSize = 26.0 * dpr; }`,
      fragmentShader: `uniform sampler2D map; void main(){ gl_FragColor = texture2D(map, gl_PointCoord); }`,
      transparent: true, depthWrite: false,
    }));
    sel.frustumCulled = false; sort.scene.add(sel);
  }

  // ---------------- 迴圈 ----------------
  let visible = false, raf = 0, last = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    if (renderer) {
      const target = state.sorted ? 1 : 0;
      if (state.mix !== target) state.mix = target > state.mix ? Math.min(1, state.mix + dt / 2.4) : Math.max(0, state.mix - dt / 2.4);
      sort.pts.material.uniforms.mixv.value = state.mix * 1.35;
      sort.axes.material.opacity = Math.max(0, state.mix - 0.5) * 1.2;
      heat.star.material.uniforms.time.value = t / 1000; heat.sun.material.uniforms.time.value = t / 1000;
      heat.star.rotation.y += dt * 0.05;
      if (sel) { const i = sort.idx[state.key]; sel.visible = state.view === 'sort' && i !== undefined; if (sel.visible) sel.geometry.attributes.position.array.set(mixed(i).toArray()), sel.geometry.attributes.position.needsUpdate = true; }
      if (camT < 1) {
        camT = Math.min(1, camT + dt / 1.4);
        const k = MathUtils.smootherstep(camT, 0, 1), g = camGoal();
        camera.position.lerpVectors(camFrom, g.pos, k); controls.target.lerpVectors(tgtFrom, g.tgt, k);
      }
      controls.update();
      updateLabels();
      renderer.render(state.view === 'heat' ? heat.scene : sort.scene, camera);
    }
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  root.dataset.view = 'heat';
  resize(); setStar('betelgeuse'); goCam(true);
  root.classList.add('al-ready', 'al-fresh');
  root.__lab = {
    camera, controls, state, setStar, setTemp, setView, setSorted, goCam, drawSpec,
    finish: () => { state.mix = state.sorted ? 1 : 0; goCam(true); },
    render: () => { if (renderer) { sort.pts.material.uniforms.mixv.value = state.mix * 1.35; sort.axes.material.opacity = Math.max(0, state.mix - 0.5) * 1.2; controls.update(); updateLabels(); renderer.render(state.view === 'heat' ? heat.scene : sort.scene, camera); } },
  };
  return { setStar, setView };
}

// ---------------------------------------------------------------------------
// 頁面下方：今晚九點彰化的亮星，由冷（紅）到熱（藍）
const tw = (d) => { const x = new Date(d.getTime() + 8 * 3600000); return { y: x.getUTCFullYear(), m: x.getUTCMonth() + 1, d: x.getUTCDate() }; };
const DIRS = [['north', '北'], ['northeast', '東北'], ['east', '東'], ['southeast', '東南'], ['south', '南'], ['southwest', '西南'], ['west', '西'], ['northwest', '西北']];
function renderTonight(box) {
  const x = tw(new Date()), at = new Date(Date.UTC(x.y, x.m - 1, x.d, 21) - 8 * 3600000), up = [];
  for (const [k, [i, en, zh]] of Object.entries(NEAR_NAMED)) {
    const s = nearStar(i); if (s.mag > 2.6 || !TEMPS[k]) continue;
    const h = altAz(s.ra, s.dec, at, SITE); if (h.alt < 10) continue;
    up.push({ k, en, zh, T: TEMPS[k], alt: h.alt, az: h.az });
  }
  up.sort((a, b) => a.T - b.T);
  const fist = (a) => Math.max(1, Math.round(a / 10));
  const cards = up.map((s) => {
    const c = bbColor(s.T), cn = colorName(s.T), [d, dz] = DIRS[Math.round(s.az / 45) % 8];
    return `<div class="tn-item cl-tn"><span class="cl-sw" style="--c:rgb(${c.join(',')})" aria-hidden="true"></span><div><h3>${s.en}<span class="zh">${s.zh}</span></h3>
      <p><b>${commas(s.T)} K · ${spectralClass(s.T)}</b> · ${cn.en}<span class="zh">約攝氏 ${celsius(s.T)} 度，${cn.zh}</span></p>
      <p class="cl-where">Look ${d}, about ${fist(s.alt)} fist${fist(s.alt) > 1 ? 's' : ''} up<span class="zh">往${dz}方看，約 ${fist(s.alt)} 個拳頭高</span></p></div></div>`;
  }).join('');
  const bar = up.length ? `<div class="cl-bar" aria-hidden="true">${up.map((s) => `<i style="background:rgb(${bbColor(s.T).join(',')})" title="${s.en}"></i>`).join('')}</div>` : '';
  box.innerHTML = `<p class="tn-when">${MON[x.m - 1]} ${x.d}, ${x.y}, 9:00 p.m. over Changhua, coolest to hottest<span>${x.y} 年 ${x.m} 月 ${x.d} 日晚上 9 點，彰化，由冷到熱</span></p>${bar}
    <div class="tn-grid cl-tn-grid">${cards}</div>
    <p class="tn-note">Star colors are soft, because our eyes see color poorly in the dark. Compare two stars side by side, or look through binoculars slightly out of focus. · 星星的顏色很淡，因為眼睛在暗處分辨顏色的能力很差；把兩顆星並排比較，或用雙筒望遠鏡稍微失焦來看，顏色會比較明顯。</p>`;
  box.setAttribute('aria-busy', 'false');
}

function boot() {
  const root = document.querySelector('[data-color-lab]');
  let api = null, started = false;
  const start = () => { if (!started && root) { started = true; api = initLab(root); } return api; };
  if (root) {
    const io = new IntersectionObserver((ents) => { if (ents[0].isIntersecting) { io.disconnect(); start(); } }, { rootMargin: '600px' });
    io.observe(root);
  }
  const tn = document.querySelector('[data-starcolors]');
  if (tn) renderTonight(tn);
  document.querySelectorAll('[data-swatch]').forEach((el) => { el.style.setProperty('--c', `rgb(${bbColor(+el.getAttribute('data-swatch')).join(',')})`); });
  document.querySelectorAll('[data-lab-color]').forEach((b) => b.addEventListener('click', () => {
    const lab = start(); if (!lab) return;
    lab.setView('heat'); lab.setStar(b.getAttribute('data-lab-color'));
    root.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }));
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
