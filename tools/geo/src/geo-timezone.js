/*
 * 地理 Geography · 第五課「台北是白天，紐約為什麼是晚上？」。
 *
 * 一個想法：地球每 24 小時自轉一圈、每小時轉 15 度；太陽照到哪裡，哪裡就是白天。
 * 人把地球分成時區，讓同一區的鐘一樣；往東跨過國際換日線，日期要減一天。
 * 3D：地球儀（globe.js）配一盞固定在右邊的太陽（DirectionalLight）。拖 UTC 時間，**地球由西向東轉**（不是太陽在動），
 * 晨昏線（金色）停在白天和黑夜的交界。八個城市只有經緯度與名字，旁邊顯示當地的理想時區時間與星期。
 * 理想時區帶（每 15 度一條，畫在貼圖上）與理想的換日線（180 度）可以開關——**不畫真正的時區界線與國界**。
 * 2D（不需要 WebGL）：clock2d.js「那裡幾點？」、call2d.js「打電話前先算一算」。
 *
 * 產物：cd tools/geo && npm run build → assets/js/geo-timezone.js
 * 除錯：document.querySelector('[data-geotime-lab]').__lab
 *   state（utc、decl、playing）、setUTC(小時)、setSeason('march'|'june'|'december')、play()、
 *   demo('turn'|'taipei'|'dateline'|'seasons')、info()、run(秒)、render()、goHome()
 */
import { AmbientLight, DirectionalLight, MathUtils, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { getLand } from './land.js';
import { makeGlobe } from './globe.js';
import { CITIES, dayName, idealZone, isDay, subsolarLon, terminator, zoneTime } from './timezone.js';
import { initClock } from './clock2d.js';
import { initCall } from './call2d.js';

const SEASON = { march: 0, june: 23.44, december: -23.44 };
const fmtUTC = (u) => { const x = ((u % 24) + 24) % 24, h = Math.floor(x + 1e-9), m = Math.round((x - h) * 60) % 60; return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`; };

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const cv = $('.al-space-cv'), spaceWrap = $('.al-space');
  const state = { utc: 4, decl: 0, playing: false, labels: true, season: 'march' };
  const sl = $('.gg-tz-utc');
  const rows = [...root.querySelectorAll('[data-city]')];
  function readout() {
    const day0 = Math.floor(state.utc / 24);
    $('.gg-tz-clock').textContent = fmtUTC(state.utc);
    $('.gg-tz-day').textContent = `${dayName(day0).en} · ${dayName(day0).zh}`;
    const tp = zoneTime(121.5, state.utc);
    for (const r of rows) {
      const c = CITIES.find((x) => x.key === r.dataset.city), t = zoneTime(c.lon, state.utc), day = isDay(c.lon, c.lat, state.utc, state.decl);
      r.querySelector('.gg-tz-t').textContent = t.text.en;
      r.querySelector('.gg-tz-d').textContent = `${dayName(day0 + t.dayShift).en.slice(0, 3)} · ${dayName(day0 + t.dayShift).zh}`;
      r.querySelector('.gg-tz-i').textContent = day ? '☀️' : '🌙';
      const diff = t.zone - tp.zone;
      r.querySelector('.gg-tz-x').textContent = c.key === 'taipei' ? '—' : `${diff > 0 ? '+' : ''}${diff} h`;
      r.classList.toggle('is-night', !day);
    }
    sl.value = ((state.utc % 24) + 24) % 24;
    root.querySelectorAll('[data-season]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.season === state.season)));
    $('.gg-tz-play .al-play-t').textContent = state.playing ? 'Pause · 暫停' : 'Turn the Earth · 讓地球轉';
    return { utc: state.utc, taipei: tp.text.en };
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
    camera.position.set(0.6, 1.1, 4.4);
    scene.add(new AmbientLight(0x8fa6d6, 0.1));           // 夜的那一面還看得到一點點
    const sun = new DirectionalLight(0xffffff, 3.4); scene.add(sun);
    const small = Math.min(window.innerWidth, window.innerHeight) < 700;
    const land = getLand();
    const globe = makeGlobe({ land, texWidth: small ? 2048 : 4096 });
    scene.add(globe.group);
    globe.show('circles', false); globe.show('select', false);
    // 理想時區帶：每 15 度一條，畫在貼圖上；標上 UTC 的時差
    globe.addLayer({ key: 'zones', on: true, draw(ctx, W, H, toXY) {
      for (let z = -12; z <= 12; z++) {
        const a = Math.max(-180, z * 15 - 7.5), b = Math.min(180, z * 15 + 7.5);
        const [x0] = toXY(a, 0), [x1] = toXY(b, 0);
        ctx.fillStyle = z % 2 ? 'rgba(255,211,110,.13)' : 'rgba(111,224,255,.08)'; ctx.fillRect(x0, 0, x1 - x0, H);
        ctx.font = `800 ${Math.round(W / 140)}px system-ui, sans-serif`; ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(255,255,255,.85)';
        for (const lat of [-52, 58]) { const [, y] = toXY(0, lat); ctx.fillText(`${z > 0 ? '+' : ''}${z}`, (x0 + x1) / 2, y); }
      }
    } });
    const dateLine = globe.addPath(0xff5a5a, 1, 100, 0.008);
    dateLine.set(Array.from({ length: 73 }, (_, i) => [180, -90 + i * 2.5]), 11);
    const term = globe.addPath(0xffd36e, 1, 400, 0.01);
    for (const c of CITIES) globe.addMark(c.lon, c.lat, c.key === 'taipei' ? 0xff4d4d : 0xffffff, 1.1);

    const controls = new OrbitControls(camera, cv);
    controls.enablePan = false; controls.enableDamping = true; controls.dampingFactor = 0.12; controls.minDistance = 2.4; controls.maxDistance = 7;
    const labs = labeler($('.al-labels'), cv, camera);
    const cityLabs = CITIES.map((c) => ({ c, el: labs.add(`gg-lab gg-tz-lab${c.key === 'taipei' ? ' gg-lab-tw' : ''}`, '') }));
    const sunLab = labs.add('gg-lab gg-tz-sun', 'Sunlight <i>陽光</i> →');
    const dlLab = labs.add('gg-lab gg-tz-dl', 'Date line <i>換日線</i>');
    const P = new Vector3(), N = new Vector3(), toCam = new Vector3();
    function apply() {
      const s = subsolarLon(state.utc);
      globe.group.rotation.y = (90 - s) * Math.PI / 180;   // 太陽直射的經度轉到 +x（太陽在右邊）
      const d = state.decl * Math.PI / 180;
      sun.position.set(Math.cos(d) * 10, Math.sin(d) * 10, 0);
      term.set(terminator(state.utc, state.decl, 240));
      globe.group.updateMatrixWorld(true);
    }
    function placeLabels() {
      const day0 = Math.floor(state.utc / 24);
      for (const { c, el } of cityLabs) {
        if (!state.labels) { el.style.opacity = 0; continue; }
        const t = zoneTime(c.lon, state.utc);
        el.innerHTML = `${c.en} <i>${c.zh}</i> <b>${t.text.en}</b>`;
        globe.pointAt(c.lon, c.lat, P, 0.02); globe.normalAt(c.lon, c.lat, N);
        P.applyMatrix4(globe.group.matrixWorld); N.transformDirection(globe.group.matrixWorld);
        labs.place(el, P, -14);
        toCam.copy(camera.position).sub(P).normalize();
        if (N.dot(toCam) < 0.15) el.style.opacity = 0;
        el.classList.toggle('is-night', !isDay(c.lon, c.lat, state.utc, state.decl));
        void day0;
      }
      P.set(1.55, 0.05, 0); labs.place(sunLab, P, 0);
      globe.pointAt(180, 12, P, 0.02); globe.normalAt(180, 12, N); P.applyMatrix4(globe.group.matrixWorld); N.transformDirection(globe.group.matrixWorld);
      labs.place(dlLab, P, 0); toCam.copy(camera.position).sub(P).normalize();
      if (N.dot(toCam) < 0.15 || !state.dateLine) dlLab.style.opacity = 0;
    }
    function resize() { const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight; if (!w || !h) return; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); const k = w / h < 1 ? 1.45 : 1; camera.position.setLength(4.6 * k); }
    function render() { globe.update(); renderer.render(scene, camera); placeLabels(); }
    new ResizeObserver(() => { resize(); render(); }).observe(spaceWrap);
    resize(); apply();
    return { renderer, camera, controls, globe, render, apply, dateLine, home() { camera.position.set(0.6, 1.1, 4.4); const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight; if (w / h < 1) camera.position.multiplyScalar(1.45); camera.lookAt(0, 0, 0); } };
  }
  state.dateLine = true;
  const api = {
    state, ready: () => true,
    setUTC(u) { state.utc = u; if (view) view.apply(); readout(); kick(); },
    setSeason(k) { state.season = k; state.decl = SEASON[k]; if (view) view.apply(); readout(); kick(); },
    play() { state.playing = !state.playing; readout(); kick(); },
    demo(k) {
      state.playing = false;
      if (k === 'turn') { api.setSeason('march'); state.playing = true; }
      else if (k === 'taipei') { api.setSeason('march'); api.setUTC(6); }
      else if (k === 'dateline') { api.setSeason('march'); api.setUTC(20); }
      else if (k === 'seasons') { api.setSeason('june'); api.setUTC(4); }
      readout(); kick();
    },
    info() { return { utc: state.utc, decl: state.decl, cities: CITIES.map((c) => ({ key: c.key, time: zoneTime(c.lon, state.utc).text.h24, shift: zoneTime(c.lon, state.utc).dayShift, day: isDay(c.lon, c.lat, state.utc, state.decl), zone: idealZone(c.lon) })) }; },
    goHome() { if (view) { view.home(); kick(); } },
    run(sec) { for (let i = 0, n = Math.ceil(sec * 60); i < n; i++) step(1 / 60); },
    render() { if (view) view.render(); },
  };
  sl.addEventListener('input', () => { state.playing = false; const day0 = Math.floor(state.utc / 24) * 24; api.setUTC(day0 + +sl.value); });
  $('.gg-tz-play').addEventListener('click', () => api.play());
  root.querySelectorAll('[data-season]').forEach((b) => b.addEventListener('click', () => api.setSeason(b.dataset.season)));
  root.querySelectorAll('[data-t]').forEach((c) => c.addEventListener('change', () => {
    const k = c.dataset.t;
    if (k === 'labels') state.labels = c.checked;
    else if (k === 'zones' && view) view.globe.setLayer('zones', c.checked);
    else if (k === 'dateline') { state.dateLine = c.checked; if (view) view.dateLine.obj.visible = c.checked; }
    else if (k === 'grid' && view) view.globe.show('graticule', c.checked);
    kick();
  }));
  if (view) $('.al-home').addEventListener('click', () => api.goHome());

  let raf = 0, last = 0, visible = true, idle = 0;
  function step(dt) {
    let moving = false;
    if (state.playing) { state.utc += dt * 1.5; if (view) view.apply(); readout(); moving = true; }   // 每秒 1.5 小時
    if (view && view.controls.update()) moving = true;
    return moving;
  }
  function frame(now) {
    raf = 0; const dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016; last = now;
    const moving = step(dt); if (view) view.render();
    idle = moving ? 0 : idle + 1;
    if (visible && idle < 60) raf = requestAnimationFrame(frame);
  }
  function kick() { idle = 0; if (!raf && visible) { last = 0; raf = requestAnimationFrame(frame); } }
  if (view) { view.controls.addEventListener('start', kick); view.controls.addEventListener('change', kick); }
  new IntersectionObserver((ents) => { visible = ents[0].isIntersecting; if (visible) kick(); }).observe(root);
  readout(); kick();
  root.__lab = api;
  return api;
}

function init2D() {
  document.querySelectorAll('[data-gg-clock]').forEach((el) => initClock(el));
  document.querySelectorAll('[data-gg-call]').forEach((el) => initCall(el));
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D); else init2D();

lazyBoot('[data-geotime-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
