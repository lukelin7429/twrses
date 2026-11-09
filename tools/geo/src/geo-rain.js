/*
 * 地理 Geography · 第十課「台灣雨這麼多，為什麼還會缺水？」。
 *
 * 一個想法：台灣雨很多，但河又短又陡，雨水很快流進海裡；雨又集中在幾個月，乾季很長。
 * 3D：第九課的立體台灣（taiwan3d.js）＋用地形算出來的河（flow.js：填平窪地、往最陡的方向流、集水面積 ≥ RIVER_KM2 畫成河）
 * ＋一場雨：雨滴落在山上，順著流向一路流到海。點地形：從那裡下一滴雨，畫出它的路，讀出走幾公里、從多高、平均坡度、在哪一邊入海。
 * 不畫縣市界；河名只標幾條主要河川的出海口（資料在 data/geography.json 的 rain.rivers）。
 * 2D（不需要 WebGL）：rain2d.js「每個月下多少雨？」、drop2d.js「雨水會流到哪裡？」。
 *
 * 產物：cd tools/geo && npm run build → assets/js/geo-rain.js
 * 除錯：document.querySelector('[data-georain-lab]').__lab
 *   state（pick、raining、rivers）、pickAt(e, n 公里)、setRain(on)、view(k)、demo('west'|'east'|'rain'|'rivers')、info()、render()、goHome()
 */
import { BufferAttribute, BufferGeometry, Line, LineBasicMaterial, LineSegments, Points, PointsMaterial, Vector3 } from 'three';
import { lazyBoot } from './common.js';
import { getTaiwan, heightAt } from './taiwan.js';
import { makeTaiwan3D } from './taiwan3d.js';
import { cellOf, getFlow, pathFrom } from './flow.js';
import { initRainBars } from './rain2d.js';
import { initDrop } from './drop2d.js';

export const RIVER_KM2 = 60;          // 集水面積 60 平方公里以上就畫成河
const DROPS = 700, SPEED = 18;        // 雨滴數、每秒走幾公里（動畫用，不是真的流速）
const LABELS = [['yushan', 'Yushan', '玉山'], ['central', 'Central Mountain Range', '中央山脈'], ['taipeiBasin', 'Taipei Basin', '臺北盆地'], ['chianan', 'Chianan Plain', '嘉南平原'], ['huadong', 'Huadong Longitudinal Valley', '花東縱谷']];

/** 出海口最接近哪一條主要河川（4 公里內） */
export function riverAt(rivers, outlet) {
  let best = null, bd = 4;
  for (const r of rivers) { const d = Math.hypot(r.e - outlet[0], r.n - outlet[1]); if (d < bd) { bd = d; best = r; } }
  return best;
}

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const cv = $('.al-space-cv'), spaceWrap = $('.al-space');
  const data = JSON.parse($('script[type="application/json"]').textContent);
  const T = getTaiwan(), F = getFlow();
  const state = { pick: null, path: null, raining: true, rivers: true, labels: true };

  function readout() {
    const out = $('.gg-rn-out'), p = state.path, r = (x) => Math.round(x).toLocaleString('en-US');
    if (!p) { out.innerHTML = `<p class="gg-rn-where">Tap the land to drop a raindrop there.<span class="zh">點地形，在那裡下一滴雨。</span></p>`; return api.info(); }
    const riv = riverAt(data.rivers, p.outlet), slope = p.drop / Math.max(p.km, 0.5);
    const side = p.side === 'west' ? { en: 'the west coast', zh: '西海岸' } : { en: 'the east coast', zh: '東海岸' };
    out.innerHTML = `<dl class="gg-sb-nums">
      <div><dt>Distance to the sea<span class="zh">流到海的距離</span></dt><dd>${r(p.km)} <small>km</small></dd></div>
      <div><dt>Starting height<span class="zh">起點海拔</span></dt><dd>${r(heightAt(T, ...state.pick))} <small>m</small></dd></div>
      <div class="gg-sb-wide"><dt>Average slope<span class="zh">平均坡度</span></dt><dd>${r(slope)} <small>m/km</small></dd></div></dl>
      <p class="gg-rn-where">It reaches the sea on ${side.en}${riv ? `, through the <b>${riv.en}</b>` : ''}.<span class="zh">它從${side.zh}入海${riv ? `，經過<b>${riv.zh}</b>` : ''}。</span></p>`;
    return api.info();
  }

  let view = null;
  try { view = init3D(); } catch (e) { view = null; }
  if (!view) root.classList.add('al-nogl');

  function init3D() {
    let tw;
    try { tw = makeTaiwan3D({ cv, wrap: spaceWrap, labelsEl: $('.al-labels'), T, labels: LABELS, onPick: (e, n) => api.pickAt(e, n) }); } catch (e) { return null; }
    const { nx } = T, ofCell = (i) => { const x = i % nx, y = (i - x) / nx; return [T.e0 + x + 0.5, T.n0 + y + 0.5]; };
    // 河：集水面積夠大的格子，連到它流去的那一格
    const seg = [];
    for (let i = 0; i < F.acc.length; i++) {
      if (F.acc[i] < RIVER_KM2 || F.dir[i] < 0) continue;
      const a = tw.surface(...ofCell(i), 0.03), b = tw.surface(...ofCell(F.dir[i]), 0.03);
      seg.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
    const rg = new BufferGeometry(); rg.setAttribute('position', new BufferAttribute(new Float32Array(seg), 3));
    const rivers = new LineSegments(rg, new LineBasicMaterial({ color: 0x8fd4ff })); rivers.frustumCulled = false; tw.scene.add(rivers);
    // 雨滴：每一滴有自己的路，走到海就從別的地方重新落下
    const land = []; for (let i = 0; i < T.grid.length; i++) if (!Number.isNaN(T.grid[i])) land.push(i);
    let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const drops = Array.from({ length: DROPS }, () => ({ p: null, t: 0 }));
    const respawn = (d) => { const c = land[Math.floor(rnd() * land.length)], [e, n] = ofCell(c); d.p = pathFrom(F, e, n); d.t = rnd() * 0.3; };
    drops.forEach((d) => { respawn(d); d.t = rnd() * (d.p ? d.p.km : 1); });
    const dg = new BufferGeometry(); dg.setAttribute('position', new BufferAttribute(new Float32Array(DROPS * 3), 3));
    const pts = new Points(dg, new PointsMaterial({ color: 0xbfe6ff, size: 0.16, transparent: true, opacity: 0.95 })); pts.frustumCulled = false; tw.scene.add(pts);
    const V = new Vector3();
    function placeDrops(dt) {
      const a = dg.getAttribute('position');
      drops.forEach((d, k) => {
        if (!d.p) { respawn(d); return; }
        d.t += dt * SPEED;
        if (d.t >= d.p.km) respawn(d);
        // 沿著路走 t 公里
        const P = d.p.pts; let t = d.t, i = 0;
        while (i + 1 < P.length) { const L = Math.hypot(P[i + 1][0] - P[i][0], P[i + 1][1] - P[i][1]); if (t <= L) break; t -= L; i++; }
        const A = P[i], B = P[Math.min(i + 1, P.length - 1)], L = Math.hypot(B[0] - A[0], B[1] - A[1]) || 1, f = Math.min(1, t / L);
        V.copy(tw.surface(A[0] + (B[0] - A[0]) * f, A[1] + (B[1] - A[1]) * f, 0.08));
        a.setXYZ(k, V.x, V.y, V.z);
      });
      a.needsUpdate = true;
    }
    // 選的那一滴：亮色的路線
    const pg = new BufferGeometry(); pg.setAttribute('position', new BufferAttribute(new Float32Array(3 * 600), 3));
    const pathLine = new Line(pg, new LineBasicMaterial({ color: 0xffd36e })); pathLine.frustumCulled = false; pathLine.visible = false; tw.scene.add(pathLine);
    // 線只有 1 像素：再沿路放一串金色的點，遠看也看得見
    const pathDots = new Points(pg, new PointsMaterial({ color: 0xffd36e, size: 0.22 })); pathDots.frustumCulled = false; pathDots.visible = false; tw.scene.add(pathDots);
    function setPath() {
      const p = state.path; if (!p) { pathLine.visible = pathDots.visible = false; return; }
      const a = pg.getAttribute('position'), n = Math.min(600, p.pts.length);
      for (let i = 0; i < n; i++) { const v = tw.surface(p.pts[i][0], p.pts[i][1], 0.1); a.setXYZ(i, v.x, v.y, v.z); }
      pg.setDrawRange(0, n); a.needsUpdate = true; pathLine.visible = pathDots.visible = true;
    }
    new ResizeObserver(() => { tw.resize(); tw.render(); }).observe(spaceWrap);
    return { tw, controls: tw.controls, render: tw.render, look: tw.look, placeDrops, setPath, rivers, pts };
  }

  const api = {
    state, ready: () => true,
    pickAt(e, n) { const p = pathFrom(F, e, n); if (!p) return null; state.pick = [e, n]; state.path = p; if (view) view.setPath(); readout(); kick(); return p; },
    setRain(on) { state.raining = on; if (view) view.pts.visible = on; root.querySelectorAll('[data-rain]').forEach((b) => b.setAttribute('aria-pressed', String(on))); kick(); },
    view(k) { if (view) { view.look(k); kick(); } },
    demo(k) {
      const P = T.places;
      if (k === 'west') { api.pickAt(T.peak.e, T.peak.n); api.view('south'); }
      else if (k === 'east') { api.pickAt(P.coastal.e, P.coastal.n); api.view('east'); }
      else if (k === 'rain') { api.setRain(true); api.view('south'); }
      else if (k === 'rivers') { api.setRain(false); api.view('top'); }
      kick();
    },
    info() { const p = state.path; return { pick: state.pick, km: p && p.km, drop: p && p.drop, side: p && p.side, river: p && (riverAt(data.rivers, p.outlet) || {}).key, cells: cellOf(F, ...(state.pick || [0, 0])) }; },
    goHome() { api.view('south'); },
    render() { if (view) view.render(); },
  };
  root.querySelectorAll('[data-rain]').forEach((b) => b.addEventListener('click', () => api.setRain(!state.raining)));
  root.querySelectorAll('[data-view]').forEach((b) => b.addEventListener('click', () => api.view(b.dataset.view)));
  root.querySelectorAll('[data-t]').forEach((c) => c.addEventListener('change', () => {
    const k = c.dataset.t;
    if (k === 'labels' && view) view.tw.showLabels(c.checked);
    else if (k === 'rivers' && view) view.rivers.visible = c.checked;
    else if (k === 'sea' && view) view.tw.terrain.show('water', c.checked);
    kick();
  }));
  if (view) $('.al-home').addEventListener('click', () => api.goHome());

  // 下雨時要一直畫；不下雨時跟別課一樣，停下來就不畫
  let raf = 0, visible = true, idle = 0, last = 0;
  function frame(t) {
    raf = 0;
    const dt = last ? Math.min(0.05, (t - last) / 1000) : 0; last = t;
    const moving = view ? view.controls.update() : false;
    if (view && state.raining) view.placeDrops(dt);
    if (view) view.render();
    idle = moving || state.raining ? 0 : idle + 1;
    if (visible && idle < 60) raf = requestAnimationFrame(frame); else last = 0;
  }
  function kick() { idle = 0; if (!raf && visible) raf = requestAnimationFrame(frame); }
  if (view) { view.controls.addEventListener('start', kick); view.controls.addEventListener('change', kick); }
  new IntersectionObserver((ents) => { visible = ents[0].isIntersecting; if (visible) kick(); }).observe(root);
  readout(); kick();
  root.__lab = api;
  return api;
}

function init2D() {
  document.querySelectorAll('[data-gg-rainbars]').forEach((el) => initRainBars(el));
  document.querySelectorAll('[data-gg-drop]').forEach((el) => initDrop(el));
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D); else init2D();

lazyBoot('[data-georain-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
