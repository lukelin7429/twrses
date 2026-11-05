/*
 * 地理 Geography · 第七課「為什麼赤道熱、兩極冷？」。
 *
 * 一個想法：同一束陽光，直射時集中在一小塊地面；越往兩極越斜，同樣的能量攤在越大的面積上。
 * 3D：地球儀（globe.js）＋一束截面是正方形的平行光（九條金色的光線＋地面上亮起來的光斑），沿東經 121 度（經過台灣）
 * 上下移動；旁邊一束「直射」的對照光（淡色）。讀數：正午太陽高度角、光斑是直射時的幾倍、每平方公尺分到幾成。
 * 季節按鈕讓直射點在南北回歸線之間移動；可以開關「五帶」色帶（依回歸線與極圈分的簡化分法）。不畫國界。
 * 2D（不需要 WebGL）：torch2d.js「手電筒照桌面」、sunq2d.js「哪裡的太陽比較高？」。
 *
 * 產物：cd tools/geo && npm run build → assets/js/geo-sunbeam.js
 * 除錯：document.querySelector('[data-geosun-lab]').__lab
 *   state（lat、season、decl）、setLat(緯度)、setSeason('march'|'june'|'december')、demo('equator'|'taiwan'|'high'|'june')、
 *   info()、render()、goHome()
 */
import { AmbientLight, BufferAttribute, BufferGeometry, DirectionalLight, LineBasicMaterial, LineSegments, PerspectiveCamera, Raycaster, Scene, Sphere, Vector2, Vector3, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { lonLatToVec3, vec3ToLonLat } from './geo.js';
import { getLand } from './land.js';
import { makeGlobe } from './globe.js';
import { SEASONS, TILT, beam, noonAltitude, share, spread, sunDir, zoneOf } from './sunlight.js';
import { initTorch } from './torch2d.js';
import { initSunq } from './sunq2d.js';

const LON0 = 121;                  // 光束走的經線（經過台灣）
const HALF = 0.07;                 // 光束截面的半寬（地球半徑）；讀數用 1 / sin(高度角)，不用畫出來的光斑（粗光束會多算地球的弧度）
const ZONE = {
  torrid: { en: 'Tropical zone', zh: '熱帶' },
  temperate: { en: 'Temperate zone', zh: '溫帶' },
  frigid: { en: 'Polar zone', zh: '寒帶' },
};
const fmt = (x, d = 1) => (Math.round(x * 10 ** d) / 10 ** d).toFixed(d);
const latText = (lat) => (Math.abs(lat) < 0.05 ? { en: '0°', zh: '赤道' } : { en: `${fmt(Math.abs(lat))}° ${lat > 0 ? 'N' : 'S'}`, zh: `${lat > 0 ? '北緯' : '南緯'} ${fmt(Math.abs(lat))} 度` });

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const cv = $('.al-space-cv'), spaceWrap = $('.al-space');
  const state = { lat: 25, season: 'march', decl: 0, zones: true, ref: true, labels: true };
  const sl = $('.gg-sb-lat');
  let cur = null, refB = null;

  function compute() {
    const alt = noonAltitude(state.lat, state.decl);
    cur = alt > 2 ? beam(LON0, state.decl, state.lat, HALF) : null;
    refB = beam(LON0, state.decl, state.decl, HALF);
    return alt;
  }
  function readout() {
    const alt = noonAltitude(state.lat, state.decl), z = zoneOf(state.lat), L = latText(state.lat), D = latText(state.decl);
    $('.gg-sb-where').innerHTML = `${L.en}<span class="zh">${L.zh}・${ZONE[z.zone].zh}</span>`;
    $('.gg-sb-alt').textContent = alt > 0 ? `${fmt(alt)}°` : '—';
    $('.gg-sb-x').textContent = alt > 0 ? `× ${fmt(spread(alt), 2)}` : '—';
    $('.gg-sb-share').textContent = alt > 0 ? `${Math.round(share(alt) * 100)}%` : '0%';
    $('.gg-sb-bar i').style.width = `${alt > 0 ? share(alt) * 100 : 0}%`;
    const msg = alt <= 0 ? 'night' : alt <= 2 ? 'low' : alt > 89 ? 'overhead' : 'slant';
    root.querySelectorAll('.gg-sb-msg [data-when]').forEach((s) => { s.hidden = s.dataset.when !== msg; });
    $('.gg-sb-sub').innerHTML = `In ${state.season === 'march' ? 'March' : state.season === 'june' ? 'June' : 'December'}, the Sun is overhead at ${state.decl === 0 ? 'the equator' : state.decl > 0 ? 'the Tropic of Cancer' : 'the Tropic of Capricorn'} (${D.en}).<span class="zh">${state.season === 'march' ? '三月' : state.season === 'june' ? '六月' : '十二月'}太陽直射${state.decl === 0 ? '赤道' : state.decl > 0 ? '北回歸線' : '南回歸線'}${state.decl === 0 ? '' : `（${D.zh}）`}。</span>`;
    sl.value = state.lat;
    root.querySelectorAll('[data-season]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.season === state.season)));
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
    scene.add(new AmbientLight(0x8fa6d6, 0.35));
    const sun = new DirectionalLight(0xffffff, 2.6); scene.add(sun);
    const small = Math.min(window.innerWidth, window.innerHeight) < 700;
    const land = getLand();
    const globe = makeGlobe({ land, texWidth: small ? 2048 : 4096 });
    scene.add(globe.group);
    globe.show('circles', false); globe.show('select', false);
    // 五帶：依回歸線與極圈分的色帶（簡化分法），加上四條線
    globe.addLayer({ key: 'zones', on: true, draw(ctx, W, H, toXY) {
      const band = (a, b, c) => { const [, y0] = toXY(0, b), [, y1] = toXY(0, a); ctx.fillStyle = c; ctx.fillRect(0, y0, W, y1 - y0); };
      band(-TILT, TILT, 'rgba(255,140,60,.14)');
      band(TILT, 90 - TILT, 'rgba(120,220,140,.07)'); band(-(90 - TILT), -TILT, 'rgba(120,220,140,.07)');
      band(90 - TILT, 90, 'rgba(150,200,255,.24)'); band(-90, -(90 - TILT), 'rgba(150,200,255,.24)');
      ctx.lineWidth = Math.max(2, W / 1400); ctx.setLineDash([W / 300, W / 400]);
      for (const [lat, c] of [[TILT, '#ffb36b'], [-TILT, '#ffb36b'], [90 - TILT, '#a9d4ff'], [-(90 - TILT), '#a9d4ff']]) {
        const [, y] = toXY(0, lat); ctx.strokeStyle = c; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
      ctx.setLineDash([]);
    } });
    // 光斑：畫在貼圖上（對照光淡、目前的光亮）
    globe.addLayer({ key: 'patch', on: true, draw(ctx, W, H, toXY) {
      const fill = (b, col, line) => {
        if (!b || b.ring.length < 3) return;
        ctx.beginPath(); b.ring.forEach(([lon, lat], i) => { const [x, y] = toXY(lon, lat); if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); }); ctx.closePath();
        ctx.fillStyle = col; ctx.fill(); ctx.lineWidth = W / 900; ctx.strokeStyle = line; ctx.stroke();
      };
      if (state.ref && Math.abs(state.lat - state.decl) > 0.5) fill(refB, 'rgba(255,240,170,.35)', 'rgba(255,240,170,.8)');
      fill(cur, `rgba(255,214,90,${cur ? Math.max(0.35, 0.95 / cur.ratio).toFixed(2) : 0})`, '#fff3c4');
    } });
    globe.show('graticule', false); globe.show('equator', true);
    globe.addMark(121.0, 23.7, 0xff4d4d, 0.9);

    // 光線：九條金色線（對照光六條淡色線）
    const mk = (color, opacity) => { const g = new BufferGeometry(); g.setAttribute('position', new BufferAttribute(new Float32Array(9 * 6), 3)); const o = new LineSegments(g, new LineBasicMaterial({ color, transparent: true, opacity })); o.frustumCulled = false; scene.add(o); return o; };
    const rayCur = mk(0xffd36e, 1), rayRef = mk(0xfff1c0, 0.4);
    const setRays = (obj, b) => {
      const a = obj.geometry.attributes.position.array; a.fill(0);
      if (b) b.rays.forEach((r, i) => { a.set(r.from, 6 * i); a.set(r.to, 6 * i + 3); });
      obj.geometry.attributes.position.needsUpdate = true; obj.visible = !!b;
    };

    const controls = new OrbitControls(camera, cv);
    controls.enablePan = false; controls.enableDamping = true; controls.dampingFactor = 0.12; controls.minDistance = 2.4; controls.maxDistance = 7;
    const labs = labeler($('.al-labels'), cv, camera);
    const sunLab = labs.add('gg-lab gg-sb-sun', 'Sunlight <i>陽光</i> →');
    const patchLab = labs.add('gg-lab gg-sb-patch', '');
    const lineLabs = [[TILT, 'Tropic of Cancer', '北回歸線'], [-TILT, 'Tropic of Capricorn', '南回歸線'], [90 - TILT, 'Arctic Circle', '北極圈'], [-(90 - TILT), 'Antarctic Circle', '南極圈']]
      .map(([lat, en, zh]) => ({ lat, el: labs.add('gg-lab gg-sb-line', `${en} <i>${zh}</i>`) }));
    const twLab = labs.add('gg-lab gg-lab-tw', 'Taiwan <i>台灣</i>');
    const P = new Vector3(), N = new Vector3(), toCam = new Vector3();
    const facing = (lon, lat, el, dy = 0, min = 0.2) => {
      globe.pointAt(lon, lat, P, 0.02); globe.normalAt(lon, lat, N); labs.place(el, P, dy);
      toCam.copy(camera.position).sub(P).normalize(); if (N.dot(toCam) < min) el.style.opacity = 0;
    };
    function apply() {
      const s = sunDir(LON0, state.decl);
      sun.position.set(s[0] * 10, s[1] * 10, s[2] * 10);
      setRays(rayCur, cur); setRays(rayRef, state.ref && Math.abs(state.lat - state.decl) > 0.5 ? refB : null);
      globe.redraw();
    }
    function placeLabels() {
      const s = sunDir(LON0, state.decl);
      P.set(s[0] * 2.3, s[1] * 2.3 + 0.12, s[2] * 2.3); labs.place(sunLab, P, 0);
      if (!state.labels) sunLab.style.opacity = 0;
      if (cur && state.labels) { patchLab.innerHTML = `× ${fmt(spread(noonAltitude(state.lat, state.decl)), 2)}`; facing(LON0 + 9, state.lat, patchLab, 0, 0.05); } else patchLab.style.opacity = 0;
      // 線的名字放在光束西邊 45 度，比較不會被擋住
      for (const { lat, el } of lineLabs) { if (!state.labels || !state.zones) { el.style.opacity = 0; continue; } facing(LON0 - 45, lat, el, -9); }
      if (state.labels) facing(121, 23.7, twLab, 14); else twLab.style.opacity = 0;
    }
    function resize() { const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight; if (!w || !h) return; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); const k = w / h < 1 ? 1.45 : 1; camera.position.setLength(4.6 * k); }
    function render() { globe.update(); renderer.render(scene, camera); placeLabels(); }
    function home() {
      const v = lonLatToVec3(LON0 - 38, 14); camera.position.set(v[0], v[1], v[2]).multiplyScalar(4.6);
      const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight; if (w / h < 1) camera.position.multiplyScalar(1.45); camera.lookAt(0, 0, 0);
    }
    // 點地球：把光束移到那個緯度
    const ray = new Raycaster(), ndc = new Vector2(), unit = new Sphere(new Vector3(), 1), hitV = new Vector3();
    let down = null;
    cv.addEventListener('pointerdown', (e) => { down = { x: e.clientX, y: e.clientY }; });
    cv.addEventListener('pointerup', (e) => {
      if (!down || Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) { down = null; return; }
      down = null;
      const r = cv.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ndc, camera);
      if (ray.ray.intersectSphere(unit, hitV)) api.setLat(Math.round(vec3ToLonLat([hitV.x, hitV.y, hitV.z])[1]));
    });
    new ResizeObserver(() => { resize(); render(); }).observe(spaceWrap);
    home(); resize();
    return { renderer, camera, controls, globe, render, apply, home };
  }

  const api = {
    state, ready: () => true,
    setLat(lat) { state.lat = Math.max(-85, Math.min(85, lat)); compute(); if (view) view.apply(); readout(); kick(); },
    setSeason(k) { state.season = k; state.decl = SEASONS[k]; compute(); if (view) view.apply(); readout(); kick(); },
    demo(k) {
      if (k === 'equator') { api.setSeason('march'); api.setLat(0); }
      else if (k === 'taiwan') { api.setSeason('march'); api.setLat(25); }
      else if (k === 'high') { api.setSeason('march'); api.setLat(60); }
      else if (k === 'june') { api.setSeason('june'); api.setLat(TILT); }
      if (view) view.home();
      kick();
    },
    info() {
      const alt = noonAltitude(state.lat, state.decl);
      return { lat: state.lat, decl: state.decl, alt, zone: zoneOf(state.lat).zone, ratio: cur ? cur.ratio : null, shown: alt > 0 ? spread(alt) : null, spread: spread(alt), share: share(alt) };
    },
    goHome() { if (view) { view.home(); kick(); } },
    render() { if (view) view.render(); },
  };
  sl.addEventListener('input', () => api.setLat(+sl.value));
  root.querySelectorAll('[data-season]').forEach((b) => b.addEventListener('click', () => api.setSeason(b.dataset.season)));
  root.querySelectorAll('[data-t]').forEach((c) => c.addEventListener('change', () => {
    const k = c.dataset.t;
    if (k === 'labels') state.labels = c.checked;
    else if (k === 'zones') { state.zones = c.checked; if (view) view.globe.setLayer('zones', c.checked); }
    else if (k === 'ref') { state.ref = c.checked; if (view) view.apply(); }
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
  compute(); if (view) view.apply(); readout(); kick();
  root.__lab = api;
  return api;
}

function init2D() {
  document.querySelectorAll('[data-gg-torch]').forEach((el) => initTorch(el));
  document.querySelectorAll('[data-gg-sunq]').forEach((el) => initSunq(el));
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D); else init2D();

lazyBoot('[data-geosun-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
