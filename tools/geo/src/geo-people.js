/*
 * 地理 Geography · 第八課「人都住在哪裡？」。
 *
 * 一個想法：人在陸地上分布得很不平均；大多數人住在有水、平地、氣候溫和的地方，沙漠、高山、寒帶的人很少。
 * 3D：地球儀（globe.js）上「一點＝一百萬人」的點圖（GHS-POP 2025，pop.js；點畫在貼圖上，高緯度照 1／cos 拉寬才會是圓的）。
 * 切換「大沙漠／海拔 3,000 公尺以上／寒帶」的提示範圍，看那裡有幾點、占全世界人口與陸地面積的幾成（比例在處理腳本裡算好）。
 * 點地球：那個 1 度 × 1 度格子裡大約住了多少人（資料年份 2025）。不畫國界、不標國名。
 * 2D（不需要 WebGL）：why2d.js「這裡人多還是人少？」、hundred2d.js「如果世界只有一百個人」。
 *
 * 產物：cd tools/geo && npm run build → assets/js/geo-people.js
 * 除錯：document.querySelector('[data-geopop-lab]').__lab
 *   state（area、pick）、setArea(null|'desert'|'high'|'polar')、pickAt(經度, 緯度)、demo('asia'|'nile'|'tibet'|'polar')、
 *   info()、render()、goHome()
 */
import { AmbientLight, DirectionalLight, PerspectiveCamera, Raycaster, Scene, Sphere, Vector2, Vector3, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { lonLatToVec3, vec3ToLonLat } from './geo.js';
import { getLand } from './land.js';
import { makeGlobe } from './globe.js';
import { POLAR, areaStats, cellKm2, getPop, inArea, peopleIn } from './pop.js';
import { fmtPeople, initWhy } from './why2d.js';
import { initHundred } from './hundred2d.js';

const RAD = Math.PI / 180;
const AREA = {
  desert: { en: 'Large deserts', zh: '大沙漠', fill: 'rgba(235,190,110,.30)', line: 'rgba(255,214,150,.85)' },
  high: { en: 'Land above 3,000 m', zh: '海拔 3,000 公尺以上', fill: 'rgba(205,210,240,.42)', line: 'rgba(230,235,255,.85)' },
  polar: { en: 'Polar zones', zh: '寒帶', fill: 'rgba(150,200,255,.26)', line: 'rgba(169,212,255,.9)' },
};
const AREA_LABELS = {
  desert: [[13, 22, 'Sahara', '撒哈拉沙漠'], [104, 43, 'Gobi', '戈壁'], [50, 20, 'Rub’ al Khali', '魯卜哈利沙漠'], [125, -25, 'Australian deserts', '澳洲的沙漠']],
  high: [[87, 33, 'Plateau of Tibet', '青藏高原'], [-68, -20, 'Andes', '安地斯山脈']],
  polar: [[100, 72, 'Arctic Circle', '北極圈'], [-60, -70, 'Antarctic Circle', '南極圈']],
};
const fmtLL = (lon, lat) => ({
  en: `${Math.abs(lat).toFixed(1)}° ${lat >= 0 ? 'N' : 'S'}, ${Math.abs(lon).toFixed(1)}° ${lon >= 0 ? 'E' : 'W'}`,
  zh: `${lat >= 0 ? '北緯' : '南緯'} ${Math.abs(lat).toFixed(1)} 度、${lon >= 0 ? '東經' : '西經'} ${Math.abs(lon).toFixed(1)} 度`,
});
const pct = (x) => (x < 0.01 ? (x * 100).toFixed(1) : Math.round(x * 100)) + '%';

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const cv = $('.al-space-cv'), spaceWrap = $('.al-space');
  const pop = getPop();
  const state = { area: null, pick: null, labels: true, dots: true };
  const member = {};          // 每一點在不在某個範圍裡（Uint8Array，第一次用到才算）
  const stats = {};
  const memberOf = (kind) => {
    if (!member[kind]) { const m = new Uint8Array(pop.dots.length / 2); for (let i = 0; i < m.length; i++) m[i] = inArea(pop, kind, pop.dots[2 * i], pop.dots[2 * i + 1]) ? 1 : 0; member[kind] = m; }
    return member[kind];
  };
  const statOf = (kind) => stats[kind] || (stats[kind] = areaStats(pop, kind));

  function readout() {
    const total = pop.meta.total;
    $('.gg-pp-total').innerHTML = `${(total / 1e9).toFixed(2)} billion<span class="zh">${(total / 1e8).toFixed(1)} 億</span>`;
    $('.gg-pp-dots').textContent = (pop.dots.length / 2).toLocaleString('en-US');
    root.querySelectorAll('[data-area]').forEach((b) => b.setAttribute('aria-pressed', String((b.dataset.area || null) === (state.area || null) || (b.dataset.area === 'none' && !state.area))));
    const box = $('.gg-pp-area');
    if (state.area) {
      const a = AREA[state.area], s = statOf(state.area);
      box.hidden = false;
      box.innerHTML = `<b>${a.en}</b><span class="zh">${a.zh}</span>
        <span class="gg-pp-two"><span><b>${pct(s.land)}</b> of the land<span class="zh">占陸地面積</span></span><span><b>${pct(s.share)}</b> of the people<span class="zh">占全世界人口</span></span></span>
        <span class="gg-pp-sm">${s.dots.toLocaleString('en-US')} dots = about ${s.dots.toLocaleString('en-US')} million people · ${s.dots.toLocaleString('en-US')} 點＝大約 ${(s.dots / 100).toFixed(1)} 億人</span>`;
    } else box.hidden = true;
    const out = $('.gg-pp-pick');
    if (state.pick) {
      const [lon, lat] = state.pick, n = peopleIn(pop, lon, lat), f = fmtPeople(n), L = fmtLL(lon, lat);
      const cy = Math.floor(lat) + 0.5, km = Math.round(cellKm2(cy) / 1000) * 1000;
      out.innerHTML = `<b>${L.en}</b><span class="zh">${L.zh}</span>In this 1° × 1° square (about ${km.toLocaleString('en-US')} km²): <b>${f.en}</b> people (${pop.meta.year}).<span class="zh">這個 1 度 × 1 度的格子（大約 ${km.toLocaleString('en-US')} 平方公里）住了<b>${f.zh}</b>人（${pop.meta.year} 年）。</span>`;
    } else out.innerHTML = `Tap the globe to see how many people live there.<span class="zh">點地球，看那裡住了多少人。</span>`;
    return api.info();
  }

  let view = null;
  try { view = init3D(); } catch (e) { view = null; }
  if (!view) root.classList.add('al-nogl');

  function init3D() {
    let renderer;
    try { renderer = new WebGLRenderer({ canvas: cv, antialias: true }); } catch (e) { return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x03060f, 1);
    const scene = new Scene();
    const camera = new PerspectiveCamera(32, 1, 0.1, 100);
    scene.add(new AmbientLight(0xc9d6f2, 1.1));
    const key = new DirectionalLight(0xffffff, 1.2); scene.add(key);
    const small = Math.min(window.innerWidth, window.innerHeight) < 700;
    const globe = makeGlobe({ land: getLand(), texWidth: small ? 2048 : 4096 });
    scene.add(globe.group);
    globe.show('circles', false); globe.show('select', false); globe.show('graticule', false);
    // 整顆地球調暗一點，金色的點才看得清楚（像夜晚）
    globe.addLayer({ key: 'dim', on: true, draw(ctx, W, H) { ctx.fillStyle = 'rgba(3,8,24,.42)'; ctx.fillRect(0, 0, W, H); } });
    // 提示範圍
    globe.addLayer({ key: 'area', on: true, draw(ctx, W, H, toXY) {
      if (!state.area) return;
      const a = AREA[state.area];
      ctx.fillStyle = a.fill; ctx.strokeStyle = a.line; ctx.lineWidth = Math.max(2, W / 1500);
      if (state.area === 'polar') {
        for (const [l0, l1] of [[POLAR, 90], [-90, -POLAR]]) { const [, y0] = toXY(0, l1), [, y1] = toXY(0, l0); ctx.fillRect(0, y0, W, y1 - y0); }
        ctx.setLineDash([W / 300, W / 400]);
        for (const l of [POLAR, -POLAR]) { const [, y] = toXY(0, l); ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
        ctx.setLineDash([]);
        return;
      }
      if (state.area === 'high') {
        // 0.25 度格子的連續段
        const cw = W / 1440, ch = H / 720;
        for (const [r, a, b] of pop.areas.high) { ctx.fillRect(a * cw, r * ch, (b - a) * cw + 0.5, ch + 0.5); }
        return;
      }
      for (const ring of pop.areas[state.area]) {
        ctx.beginPath(); ring.forEach(([lon, lat], i) => { const [x, y] = toXY(lon, lat); if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); }); ctx.closePath();
        ctx.fill(); ctx.stroke();
      }
    } });
    // 人口的點：高緯度橫向拉寬 1／cos，貼到球上才是圓的
    globe.addLayer({ key: 'dots', on: true, draw(ctx, W, H, toXY) {
      const r = W / 1150, m = state.area ? memberOf(state.area) : null, d = pop.dots;
      for (let pass = 0; pass < 2; pass++) {
        ctx.fillStyle = pass === 0 ? (m ? 'rgba(255,211,110,.4)' : 'rgba(255,214,102,1)') : 'rgba(255,250,225,1)';
        ctx.beginPath();
        for (let i = 0; i < d.length; i += 2) {
          if (m && (pass === 1) !== !!m[i / 2]) continue;
          if (!m && pass === 1) break;
          const [x, y] = toXY(d[i], d[i + 1]), rx = r / Math.max(0.2, Math.cos(d[i + 1] * RAD));
          ctx.moveTo(x + rx, y); ctx.ellipse(x, y, rx, r, 0, 0, Math.PI * 2);
        }
        ctx.fill();
      }
      // 選到的格子
      if (state.pick) {
        const lon0 = Math.floor(state.pick[0]), lat0 = Math.floor(state.pick[1]);
        const [x0, y0] = toXY(lon0, lat0 + 1), [x1, y1] = toXY(lon0 + 1, lat0);
        ctx.strokeStyle = '#ff6b6b'; ctx.lineWidth = Math.max(2, W / 1100); ctx.strokeRect(x0, y0, x1 - x0, y1 - y0);
      }
    } });
    globe.addMark(121.0, 23.7, 0xff4d4d, 0.9);

    const controls = new OrbitControls(camera, cv);
    controls.enablePan = false; controls.enableDamping = true; controls.dampingFactor = 0.12; controls.minDistance = 1.8; controls.maxDistance = 7;
    const labs = labeler($('.al-labels'), cv, camera);
    const twLab = labs.add('gg-lab gg-lab-tw', 'Taiwan <i>台灣</i>');
    const areaLabs = {};
    for (const [k, list] of Object.entries(AREA_LABELS)) areaLabs[k] = list.map(([lon, lat, en, zh]) => ({ lon, lat, el: labs.add('gg-lab gg-pp-alab', `${en} <i>${zh}</i>`) }));
    const P = new Vector3(), N = new Vector3(), toCam = new Vector3();
    const facing = (lon, lat, el, dy = 0, min = 0.2) => {
      globe.pointAt(lon, lat, P, 0.02); globe.normalAt(lon, lat, N); labs.place(el, P, dy);
      toCam.copy(camera.position).sub(P).normalize(); if (N.dot(toCam) < min) el.style.opacity = 0;
    };
    function placeLabels() {
      for (const [k, list] of Object.entries(areaLabs)) for (const { lon, lat, el } of list) { if (!state.labels || state.area !== k) el.style.opacity = 0; else facing(lon, lat, el); }
      if (state.labels) facing(121, 23.7, twLab, 14); else twLab.style.opacity = 0;
    }
    function resize() { const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight; if (!w || !h) return; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); }
    function render() { key.position.copy(camera.position).multiplyScalar(2); globe.update(); renderer.render(scene, camera); placeLabels(); }
    function look(lon, lat, dist = 4.2) {
      const v = lonLatToVec3(lon, lat); camera.position.set(v[0], v[1], v[2]).multiplyScalar(dist);
      const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight; if (w / h < 1) camera.position.multiplyScalar(1.4); camera.lookAt(0, 0, 0);
    }
    const home = () => look(80, 22);
    const ray = new Raycaster(), ndc = new Vector2(), unit = new Sphere(new Vector3(), 1), hitV = new Vector3();
    let down = null;
    cv.addEventListener('pointerdown', (e) => { down = { x: e.clientX, y: e.clientY }; });
    cv.addEventListener('pointerup', (e) => {
      if (!down || Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) { down = null; return; }
      down = null;
      const r = cv.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ndc, camera);
      if (ray.ray.intersectSphere(unit, hitV)) { const [lon, lat] = vec3ToLonLat([hitV.x, hitV.y, hitV.z]); api.pickAt(lon, lat); }
    });
    new ResizeObserver(() => { resize(); render(); }).observe(spaceWrap);
    home(); resize();
    return { renderer, camera, controls, globe, render, home, look };
  }

  const api = {
    state, ready: () => true,
    setArea(k) { state.area = k && k !== 'none' ? k : null; if (view) view.globe.redraw(); readout(); kick(); return state.area ? statOf(state.area) : null; },
    pickAt(lon, lat) { state.pick = [lon, lat]; if (view) view.globe.redraw(); readout(); kick(); return peopleIn(pop, lon, lat); },
    demo(k) {
      if (k === 'asia') { api.setArea(null); api.pickAt(120.5, 23.5); if (view) view.look(100, 22); }
      else if (k === 'nile') { api.setArea('desert'); api.pickAt(31.2, 30.6); if (view) view.look(25, 25, 3.2); }
      else if (k === 'tibet') { api.setArea('high'); api.pickAt(88.5, 33.5); if (view) view.look(88, 28, 3.4); }
      else if (k === 'polar') { api.setArea('polar'); api.pickAt(100.5, 70.5); if (view) view.look(60, 58, 4.2); }
      kick();
    },
    info() {
      const s = state.area ? statOf(state.area) : null;
      return { area: state.area, dots: pop.dots.length / 2, total: pop.meta.total, pick: state.pick, people: state.pick ? peopleIn(pop, ...state.pick) : null, stats: s };
    },
    goHome() { if (view) { view.home(); kick(); } },
    render() { if (view) view.render(); },
  };
  root.querySelectorAll('[data-area]').forEach((b) => b.addEventListener('click', () => api.setArea(b.dataset.area)));
  root.querySelectorAll('[data-t]').forEach((c) => c.addEventListener('change', () => {
    const k = c.dataset.t;
    if (k === 'labels') state.labels = c.checked;
    else if (k === 'dots' && view) view.globe.setLayer('dots', c.checked);
    else if (k === 'grid' && view) view.globe.show('graticule', c.checked);
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
  readout(); kick();
  root.__lab = api;
  return api;
}

function init2D() {
  document.querySelectorAll('[data-gg-why]').forEach((el) => initWhy(el));
  document.querySelectorAll('[data-gg-hundred]').forEach((el) => initHundred(el));
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D); else init2D();

lazyBoot('[data-geopop-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
