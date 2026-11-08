/*
 * 地理 Geography · 第九課「從天上看，台灣長什麼樣子？」。
 *
 * 一個想法：台灣的山在中間偏東、平原在西邊；東邊陡、西邊緩。
 * 3D：立體地形引擎（terrain3d.js）＋真實的台灣本島地形（taiwan.js：內政部 2026 年版 20 公尺 DTM 平均成 1 公里），高度放大 VEX 倍。
 * 世界座標的一個單位＝10 公里（所以 exag ＝ VEX ÷ 10）。一條紅線是「切一刀」的東西向剖面線，右邊欄同時畫出剖面與東西兩邊的坡度。
 * 點地形顯示那裡的海拔。不畫縣市界、不標行政區名；標的是山、平原、盆地、台地、縱谷的名字。
 * 2D（不需要 WebGL）：cut2d.js「切一刀」、form2d.js「這是哪一種地形？」。
 *
 * 產物：cd tools/geo && npm run build → assets/js/geo-taiwan.js
 * 除錯：document.querySelector('[data-geotw-lab]').__lab
 *   state（n、key、pick）、setN(公里)、cut('taipei'|'changhua'|'yushan'|'kaohsiung')、pickAt(e, n 公里)、view('south'|'west'|'east'|'top')、
 *   demo('whole'|'yushan'|'east'|'west')、info()、render()、goHome()
 */
import {
  AmbientLight, BufferAttribute, BufferGeometry, DirectionalLight, Line, LineBasicMaterial, PerspectiveCamera, Raycaster, Scene, Vector2, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { makeTerrain } from './terrain3d.js';
import { getTaiwan, heightAt, sides } from './taiwan.js';
import { drawCut, twColor } from './twmap2d.js';
import { initCut } from './cut2d.js';
import { initForm } from './form2d.js';

export const VEX = 5;                 // 高度放大倍數（頁面上要寫）
const U = 10;                         // 一個世界單位＝10 公里
// 順序＝優先順序（重疊時先留前面的）
const LABELS = [
  ['yushan', 'Yushan', '玉山'], ['central', 'Central Mountain Range', '中央山脈'], ['coastal', 'Coastal Mountain Range', '海岸山脈'],
  ['taipeiBasin', 'Taipei Basin', '臺北盆地'], ['chianan', 'Chianan Plain', '嘉南平原'], ['huadong', 'Huadong Longitudinal Valley', '花東縱谷'],
  ['xueshan', 'Xueshan Range', '雪山山脈'], ['bagua', 'Bagua Tableland', '八卦台地'], ['lanyang', 'Lanyang Plain', '蘭陽平原'], ['pingtung', 'Pingtung Plain', '屏東平原'],
];

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const cv = $('.al-space-cv'), spaceWrap = $('.al-space');
  const data = JSON.parse($('script[type="application/json"]').textContent);
  const T = getTaiwan();
  const eC = T.e0 + T.nx / 2, nC = T.n0 + T.ny / 2;
  const first = data.lines.find((l) => l.key === 'changhua') || data.lines[0];
  const state = { n: first.n, key: first.key, pick: null, labels: true, cutOn: true };
  const sl = $('.gg-tw3-n');
  sl.min = Math.ceil(T.n0 + 3); sl.max = Math.floor(T.n0 + T.ny - 3);

  function readout() {
    const s = sides(T, state.n), g = $('.gg-tw3-cut');
    const w = g.clientWidth, h = g.clientHeight, d = Math.min(window.devicePixelRatio || 1, 2);
    if (w && h) {
      g.width = Math.round(w * d); g.height = Math.round(h * d); const c = g.getContext('2d'); c.setTransform(d, 0, 0, d, 0, 0);
      const pts = []; for (let e = T.e0; e <= T.e0 + T.nx; e += 0.5) pts.push({ e, z: heightAt(T, e, state.n) });
      drawCut(c, w, h, pts, { exag: 10, e0: T.e0, e1: T.e0 + T.nx, mark: s && s.top, padL: 34, padB: 18 });
    }
    const r = (x) => Math.round(x).toLocaleString('en-US');
    $('.gg-tw3-nums').innerHTML = s ? `<div><dt>West side<span class="zh">西邊</span></dt><dd>${r(s.wSlope)} <small>m/km</small></dd></div><div><dt>East side<span class="zh">東邊</span></dt><dd>${r(s.eSlope)} <small>m/km</small></dd></div>` : '';
    $('.gg-tw3-top').innerHTML = s ? `Highest point on the line: <b>${r(s.top.z)} m</b>, ${r(s.wKm)} km from the west coast and ${r(s.eKm)} km from the east coast.<span class="zh">線上最高點 <b>${r(s.top.z)} 公尺</b>，離西海岸 ${r(s.wKm)} 公里、離東海岸 ${r(s.eKm)} 公里。</span>` : '';
    sl.value = state.n;
    root.querySelectorAll('[data-cut3]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.cut3 === state.key)));
    const out = $('.gg-tw3-pick');
    if (state.pick) {
      const z = heightAt(T, ...state.pick);
      out.innerHTML = Number.isNaN(z) ? 'That is the sea.<span class="zh">那裡是海。</span>' : `Height here: <b>about ${r(z)} m</b> (1 km average).<span class="zh">這裡的海拔：<b>大約 ${r(z)} 公尺</b>（1 公里格子的平均）。</span>`;
    } else out.innerHTML = 'Tap the land to read its height.<span class="zh">點地形，讀出那裡的海拔。</span>';
    return api.info();
  }

  let view = null;
  try { view = init3D(); } catch (e) { view = null; }
  if (!view) root.classList.add('al-nogl');

  function init3D() {
    let renderer;
    try { renderer = new WebGLRenderer({ canvas: cv, antialias: true }); } catch (e) { return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x07101f, 1);
    const scene = new Scene();
    const camera = new PerspectiveCamera(34, 1, 0.1, 400);
    scene.add(new AmbientLight(0xbfcbe6, 0.85));
    const sun = new DirectionalLight(0xffffff, 1.6); sun.position.set(-20, 30, -14); scene.add(sun);
    const M = { box: [-T.nx / 2 / U, -T.ny / 2 / U, T.nx / 2 / U, T.ny / 2 / U], h: (x, y) => { const z = heightAt(T, eC + x * U, nC + y * U); return Number.isNaN(z) ? -60 : z; } };
    const terrain = makeTerrain({ M, n: T.nx, ny: T.ny, exag: VEX / U, color: twColor, sea: -60 });
    terrain.show('lines', false);
    scene.add(terrain.group);
    const toW = (e, n, z) => terrain.toWorld((e - eC) / U, (n - nC) / U, z);

    // 切線：沿著地表的一條紅線（浮起來一點）
    const cutGeo = new BufferGeometry(); cutGeo.setAttribute('position', new BufferAttribute(new Float32Array((T.nx * 2 + 1) * 3), 3));
    const cutLine = new Line(cutGeo, new LineBasicMaterial({ color: 0xff5a8a })); cutLine.frustumCulled = false; scene.add(cutLine);
    function setCutLine() {
      const a = cutGeo.getAttribute('position');
      for (let i = 0; i <= T.nx * 2; i++) {
        const e = T.e0 + i / 2, z = heightAt(T, e, state.n), v = toW(e, state.n, Number.isNaN(z) ? 0 : z);
        a.setXYZ(i, v.x, v.y + 0.04, v.z);
      }
      a.needsUpdate = true; cutLine.visible = state.cutOn;
    }

    const controls = new OrbitControls(camera, cv);
    controls.enablePan = true; controls.enableDamping = true; controls.dampingFactor = 0.12; controls.minDistance = 6; controls.maxDistance = 80;
    controls.maxPolarAngle = Math.PI / 2 - 0.05;
    const labs = labeler($('.al-labels'), cv, camera);
    const tags = LABELS.map(([k, en, zh]) => ({ k, el: labs.add(`gg-lab gg-tw3-lab${k === 'yushan' ? ' is-peak' : ''}`, k === 'yushan' ? `${en} <i>${zh}</i> <b>3,952 m</b>` : `${en} <i>${zh}</i>`) }));
    const P = new Vector3();
    // 標籤照 LABELS 的順序放；和前面已經放好的重疊就先藏起來（轉到別的角度會再出現）
    function placeLabels() {
      const boxes = [];
      for (const t of tags) {
        const p = t.k === 'yushan' ? T.peak : T.places[t.k], z = heightAt(T, p.e, p.n);
        P.copy(toW(p.e, p.n, Number.isNaN(z) ? 0 : z)); P.y += 0.15;
        labs.place(t.el, P, -10);
        if (!state.labels) { t.el.style.opacity = 0; continue; }
        if (t.el.style.opacity === '0') continue;
        const r = t.el.getBoundingClientRect();
        if (boxes.some((b) => r.left < b.right + 4 && r.right > b.left - 4 && r.top < b.bottom + 2 && r.bottom > b.top - 2)) t.el.style.opacity = 0;
        else boxes.push(r);
      }
    }
    function resize() { const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight; if (!w || !h) return; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); }
    function render() { renderer.render(scene, camera); placeLabels(); }
    const VIEWS = {
      south: [new Vector3(6, 24, 42), new Vector3(0, 0, 0)],
      west: [new Vector3(-24, 10, 8), new Vector3(0, 0, -1)],
      east: [new Vector3(24, 9, 8), new Vector3(0, 0, -1)],
      top: [new Vector3(0, 52, 0.5), new Vector3(0, 0, 0)],
      yushan: [new Vector3(-5, 9, 6.5), new Vector3((T.peak.e - eC) / U, 0.6, -(T.peak.n - nC) / U)],
    };
    function look(k) {
      const [p, t] = VIEWS[k]; camera.position.copy(p); controls.target.copy(t);
      const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight; if (w / h < 1) camera.position.sub(t).multiplyScalar(1.35).add(t);
      camera.lookAt(t); controls.update();
    }
    const ray = new Raycaster(), ndc = new Vector2();
    let down = null;
    cv.addEventListener('pointerdown', (e) => { down = { x: e.clientX, y: e.clientY }; });
    cv.addEventListener('pointerup', (e) => {
      if (!down || Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) { down = null; return; }
      down = null;
      const r = cv.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ndc, camera);
      const hit = ray.intersectObject(terrain.mesh)[0];
      if (hit) { const [x, y] = terrain.fromWorld(hit.point); api.pickAt(eC + x * U, nC + y * U); }
    });
    new ResizeObserver(() => { resize(); render(); readout(); }).observe(spaceWrap);
    look('south'); resize();
    return { renderer, camera, controls, render, look, setCutLine, terrain };
  }

  const api = {
    state, ready: () => true,
    setN(n) { state.n = +n; state.key = (data.lines.find((l) => Math.abs(l.n - state.n) < 0.5) || {}).key || null; if (view) view.setCutLine(); readout(); kick(); return sides(T, state.n); },
    cut(k) { const l = data.lines.find((x) => x.key === k); return l ? api.setN(l.n) : null; },
    pickAt(e, n) { state.pick = [e, n]; readout(); kick(); return heightAt(T, e, n); },
    view(k) { if (view) { view.look(k); kick(); } },
    demo(k) {
      if (k === 'whole') { api.cut('changhua'); api.view('south'); }
      else if (k === 'yushan') { api.setN(T.peak.n); api.pickAt(T.peak.e, T.peak.n); api.view('yushan'); }
      else if (k === 'east') { api.cut('changhua'); api.view('east'); }
      else if (k === 'west') { api.cut('changhua'); api.view('west'); }
      kick();
    },
    info() { const s = sides(T, state.n); return { n: state.n, key: state.key, top: s && Math.round(s.top.z), wSlope: s && s.wSlope, eSlope: s && s.eSlope, pick: state.pick, height: state.pick ? heightAt(T, ...state.pick) : null }; },
    goHome() { api.view('south'); },
    render() { if (view) view.render(); },
  };
  sl.addEventListener('input', () => api.setN(+sl.value));
  root.querySelectorAll('[data-cut3]').forEach((b) => b.addEventListener('click', () => api.cut(b.dataset.cut3)));
  root.querySelectorAll('[data-view]').forEach((b) => b.addEventListener('click', () => api.view(b.dataset.view)));
  root.querySelectorAll('[data-t]').forEach((c) => c.addEventListener('change', () => {
    const k = c.dataset.t;
    if (k === 'labels') state.labels = c.checked;
    else if (k === 'cut') { state.cutOn = c.checked; if (view) view.setCutLine(); }
    else if (k === 'sea' && view) view.terrain.show('water', c.checked);
    kick();
  }));
  if (view) $('.al-home').addEventListener('click', () => api.goHome());

  let raf = 0, visible = true, idle = 0;
  function frame() {
    raf = 0;
    const moving = view ? view.controls.update() : false;
    if (view) view.render();
    idle = moving ? 0 : idle + 1;
    if (visible && idle < 60) raf = requestAnimationFrame(frame);
  }
  function kick() { idle = 0; if (!raf && visible) raf = requestAnimationFrame(frame); }
  if (view) { view.controls.addEventListener('start', kick); view.controls.addEventListener('change', kick); }
  new IntersectionObserver((ents) => { visible = ents[0].isIntersecting; if (visible) kick(); }).observe(root);
  if (view) view.setCutLine();
  readout(); kick();
  root.__lab = api;
  return api;
}

function init2D() {
  document.querySelectorAll('[data-gg-cut]').forEach((el) => initCut(el));
  document.querySelectorAll('[data-gg-form]').forEach((el) => initForm(el));
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D); else init2D();

lazyBoot('[data-geotw-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
