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
import { BufferAttribute, BufferGeometry, Line, LineBasicMaterial, Vector3 } from 'three';
import { lazyBoot } from './common.js';
import { getTaiwan, heightAt, sides } from './taiwan.js';
import { makeTaiwan3D, U } from './taiwan3d.js';
import { drawCut } from './twmap2d.js';
import { initCut } from './cut2d.js';
import { initForm } from './form2d.js';

export { VEX } from './taiwan3d.js';
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
    let tw;
    try { tw = makeTaiwan3D({ cv, wrap: spaceWrap, labelsEl: $('.al-labels'), T, labels: LABELS, onPick: (e, n) => api.pickAt(e, n) }); } catch (e) { return null; }
    tw.addView('yushan', [new Vector3(-5, 9, 6.5), new Vector3((T.peak.e - eC) / U, 0.6, -(T.peak.n - nC) / U)]);
    // 切線：沿著地表的一條紅線（浮起來一點）
    const cutGeo = new BufferGeometry(); cutGeo.setAttribute('position', new BufferAttribute(new Float32Array((T.nx * 2 + 1) * 3), 3));
    const cutLine = new Line(cutGeo, new LineBasicMaterial({ color: 0xff5a8a })); cutLine.frustumCulled = false; tw.scene.add(cutLine);
    function setCutLine() {
      const a = cutGeo.getAttribute('position');
      for (let i = 0; i <= T.nx * 2; i++) { const v = tw.surface(T.e0 + i / 2, state.n, 0.04); a.setXYZ(i, v.x, v.y, v.z); }
      a.needsUpdate = true; cutLine.visible = state.cutOn;
    }
    new ResizeObserver(() => { tw.resize(); tw.render(); readout(); }).observe(spaceWrap);
    return { renderer: tw.renderer, camera: tw.camera, controls: tw.controls, render: tw.render, look: tw.look, setCutLine, terrain: tw.terrain, tw };
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
    if (k === 'labels') { state.labels = c.checked; if (view) view.tw.showLabels(c.checked); }
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
