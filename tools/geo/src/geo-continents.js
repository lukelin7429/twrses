/*
 * 地理 Geography · 第六課「世界有幾大洲、幾大洋？」。
 *
 * 一個想法：陸地和海水是連在一起的，大洲、大洋的界線是人約定的；所以「有幾個」要看你用哪一種算法。
 * 3D：地球儀（globe.js）上的陸地照 regions.js 的規則上色（不畫國界，只用顏色分組）。
 * 切換四種大洲算法（七大洲／歐亞合一／南北美合一／有人住的五大洲）與兩種大洋算法（四大洋／五大洋）；
 * 點陸地或海，那一洲、那一洋會亮起來，旁邊顯示名字與面積（面積是頁面上引用的數字，不是自己量的）。
 * 2D（不需要 WebGL）：bars2d.js「誰最大？」、count2d.js「有幾個？要看怎麼算」。
 *
 * 產物：cd tools/geo && npm run build → assets/js/geo-continents.js
 * 除錯：document.querySelector('[data-geocont-lab]').__lab
 *   state（scheme、oceans、pick）、setScheme(k)、setOceans('off'|'4'|'5')、pickAt(lon, lat)、clear()、
 *   demo('seven'|'eurasia'|'america'|'five'|'oceans'|'taiwan')、info()、render()、goHome()
 */
import { AmbientLight, DirectionalLight, PerspectiveCamera, Raycaster, Scene, Sphere, Vector2, Vector3, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { lonLatToVec3, vec3ToLonLat } from './geo.js';
import { getLand } from './land.js';
import { makeGlobe } from './globe.js';
import { drawLand } from './map2d.js';
import { COLORS, LABEL_AT, NAMES, SCHEMES, continentOf, groupOf, landRows, makeIsLand, oceanOf } from './regions.js';
import { initBars } from './bars2d.js';
import { initCount } from './count2d.js';

const CONT = ['asia', 'europe', 'africa', 'namerica', 'samerica', 'oceania', 'antarctica'];
const OCEANS5 = ['pacific', 'atlantic', 'indian', 'southern', 'arctic'];
const STEP = 0.5;                                  // 分類圖的格子（度）
const CW = 360 / STEP, CH = 180 / STEP;
const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const cv = $('.al-space-cv'), spaceWrap = $('.al-space');
  const areas = JSON.parse($('script[type="application/json"]').textContent);   // { key: { km2, en, zh } }
  const state = { scheme: 'seven', oceans: 'off', pick: null, labels: true };
  const land = getLand();
  const isLand = makeIsLand(landRows(land.polys, 0.25));
  // 每一格先記下它屬於哪一洲、哪一洋（換算法時只要重新上色）
  const contIdx = new Uint8Array(CW * CH), oc5 = new Uint8Array(CW * CH), oc4 = new Uint8Array(CW * CH);
  const OCK = [...OCEANS5, 'lake'];
  for (let j = 0; j < CH; j++) for (let i = 0; i < CW; i++) {
    const lon = -180 + (i + 0.5) * STEP, lat = 90 - (j + 0.5) * STEP, k = j * CW + i;
    contIdx[k] = CONT.indexOf(continentOf(lon, lat));
    oc5[k] = OCK.indexOf(oceanOf(lon, lat, true)); oc4[k] = OCK.indexOf(oceanOf(lon, lat, false));
  }
  const cls = document.createElement('canvas'); cls.width = CW; cls.height = CH;
  const cctx = cls.getContext('2d');
  const ocv = document.createElement('canvas'); ocv.width = CW; ocv.height = CH;
  const octx = ocv.getContext('2d');

  /** 目前選到的那一組（洲或洋）；沒選就 null */
  const selGroup = () => state.pick && state.pick.group;
  function paintClasses() {
    const img = cctx.createImageData(CW, CH), sel = selGroup();
    for (let k = 0; k < CW * CH; k++) {
      const g = groupOf(CONT[contIdx[k]], state.scheme);
      const [r, gg, b] = hex(COLORS[g]);
      const dim = sel && sel !== g ? 0.42 : 1;
      img.data[4 * k] = r * dim; img.data[4 * k + 1] = gg * dim; img.data[4 * k + 2] = b * dim; img.data[4 * k + 3] = 255;
    }
    cctx.putImageData(img, 0, 0);
    const oimg = octx.createImageData(CW, CH), arr = state.oceans === '4' ? oc4 : oc5;
    for (let k = 0; k < CW * CH; k++) {
      const o = OCK[arr[k]], [r, g, b] = hex(COLORS[o]);
      const dim = sel && sel !== o ? 0.5 : sel === o ? 1.35 : 1;
      oimg.data[4 * k] = Math.min(255, r * dim); oimg.data[4 * k + 1] = Math.min(255, g * dim); oimg.data[4 * k + 2] = Math.min(255, b * dim); oimg.data[4 * k + 3] = 255;
    }
    octx.putImageData(oimg, 0, 0);
  }
  paintClasses();

  function readout() {
    const s = SCHEMES[state.scheme], nOc = state.oceans === '4' ? 4 : 5;
    $('.gg-cn-n').textContent = s.groups.length;
    $('.gg-cn-nk').innerHTML = `${s.en}<span class="zh">${s.zh}</span>`;
    $('.gg-cn-on').textContent = state.oceans === 'off' ? '–' : nOc;
    $('.gg-cn-onk').innerHTML = state.oceans === 'off' ? 'Turn on the oceans below<span class="zh">按下面的按鈕，把大洋也分顏色</span>'
      : nOc === 4 ? 'Four oceans<span class="zh">四大洋</span>' : 'Five oceans, with the Southern Ocean<span class="zh">五大洋（含南大洋）</span>';
    const p = state.pick, box = $('.gg-cn-pick');
    if (!p) box.innerHTML = `<p class="gg-cn-pk">Tap the land or the sea · 點一下陸地或海</p><p class="gg-cn-pn">${'Nothing picked yet'}<span class="zh">還沒有選</span></p>`;
    else {
      const a = areas[p.group], nm = NAMES[p.group];
      const area = a ? `<p class="gg-cn-pa">About <b>${(a.km2 / 1e6).toFixed(1)} million km²</b><span class="zh">約 ${(a.km2 / 1e4).toLocaleString('en-US', { maximumFractionDigits: 0 })} 萬平方公里</span></p>` : '';
      const note = p.note ? `<p class="gg-cn-pnote">${p.note.en}<span class="zh">${p.note.zh}</span></p>` : '';
      box.innerHTML = `<p class="gg-cn-pk">${p.kind === 'land' ? 'This land belongs to · 這塊陸地屬於' : 'This water belongs to · 這片海屬於'}</p>`
        + `<p class="gg-cn-pn"><i style="background:${COLORS[p.group]}"></i>${nm.en}<span class="zh">${nm.zh}</span></p>${area}${note}`;
    }
    root.querySelectorAll('[data-scheme]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.scheme === state.scheme)));
    root.querySelectorAll('[data-oceans]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.oceans === state.oceans)));
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
    scene.add(new AmbientLight(0xffffff, 1.7));
    const key = new DirectionalLight(0xffffff, 1.3); key.position.set(3, 2, 4); scene.add(key);
    const small = Math.min(window.innerWidth, window.innerHeight) < 700;
    const globe = makeGlobe({ land, texWidth: small ? 2048 : 4096 });
    scene.add(globe.group);
    globe.show('circles', false); globe.show('select', false);
    const off = document.createElement('canvas');
    globe.addLayer({ key: 'regions', on: true, draw(ctx, W, H, toXY) {
      ctx.imageSmoothingEnabled = false;
      if (state.oceans !== 'off') ctx.drawImage(ocv, 0, 0, W, H);
      off.width = W; off.height = H;
      const o = off.getContext('2d');
      o.imageSmoothingEnabled = false; o.drawImage(cls, 0, 0, W, H);
      o.globalCompositeOperation = 'destination-in';
      drawLand(o, land, toXY, { fill: '#000' });
      o.globalCompositeOperation = 'source-over';
      ctx.drawImage(off, 0, 0);
      ctx.beginPath(); for (const poly of land.polys) for (const ring of poly) { ring.forEach(([lon, lat], i) => { const [x, y] = toXY(lon, lat); if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); }); ctx.closePath(); }
      ctx.lineWidth = Math.max(1, W / 2048); ctx.strokeStyle = 'rgba(20,30,40,.55)'; ctx.stroke();
      if (state.pick) {                                    // 點到的位置：白色圓點（貼圖上，經度方向拉寬一點，看起來才是圓的）
        const [x, y] = toXY(state.pick.lon, state.pick.lat), r = W / 260, sx = 1 / Math.max(0.2, Math.cos(state.pick.lat * Math.PI / 180));
        ctx.save(); ctx.translate(x, y); ctx.scale(sx, 1);
        ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill();
        ctx.lineWidth = r * 0.45; ctx.strokeStyle = '#111a2b'; ctx.stroke(); ctx.restore();
      }
    } });
    globe.show('graticule', false); globe.show('equator', false);

    const controls = new OrbitControls(camera, cv);
    controls.enablePan = false; controls.enableDamping = true; controls.dampingFactor = 0.12; controls.minDistance = 2.4; controls.maxDistance = 7;
    const labs = labeler($('.al-labels'), cv, camera);
    const LAB = {};
    for (const k of [...CONT, 'eurasia', 'america', ...OCEANS5]) LAB[k] = labs.add(`gg-lab gg-cn-tag${OCEANS5.includes(k) ? ' gg-cn-tag-o' : ''}`, `${NAMES[k].en.replace('Australia and Oceania', 'Oceania')} <i>${NAMES[k].zh}</i>`);
    const P = new Vector3(), N = new Vector3(), toCam = new Vector3();
    function placeLabels() {
      const shown = new Set(state.labels ? SCHEMES[state.scheme].groups : []);
      if (state.labels && state.oceans !== 'off') for (const o of OCEANS5) if (state.oceans === '5' || o !== 'southern') shown.add(o);
      for (const [k, el] of Object.entries(LAB)) {
        if (!shown.has(k)) { el.style.opacity = 0; continue; }
        const [lon, lat] = LABEL_AT[k];
        globe.pointAt(lon, lat, P, 0.02); globe.normalAt(lon, lat, N);
        labs.place(el, P, 0);
        toCam.copy(camera.position).sub(P).normalize();
        const d = N.dot(toCam);
        if (d < 0.15) el.style.opacity = 0; else if (+el.style.opacity) el.style.opacity = Math.min(1, (d - 0.15) * 4).toFixed(2);
        el.classList.toggle('is-sel', selGroup() === k);
      }
    }
    function resize() { const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight; if (!w || !h) return; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); const k = w / h < 1 ? 1.45 : 1; camera.position.setLength(4.6 * k); }
    function render() { globe.update(); renderer.render(scene, camera); placeLabels(); }
    function home(lon = 60, lat = 25) {
      const v = lonLatToVec3(lon, lat); camera.position.set(v[0], v[1], v[2]).multiplyScalar(4.6);
      const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight; if (w / h < 1) camera.position.multiplyScalar(1.45); camera.lookAt(0, 0, 0);
    }
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
    return { renderer, camera, controls, globe, render, home, refresh() { globe.redraw(); } };
  }

  /** 特別的地方：答案「要看怎麼算」的時候，多說一句 */
  function noteFor(kind, group, lon, lat) {
    if (kind === 'land' && group === 'antarctica') return { en: 'No one lives here all year, but in every count on this page it is still a continent.', zh: '這裡沒有人長年居住，但在這一頁的每一種算法裡，它都還是一個洲。' };
    if (kind === 'land' && group === 'america') return { en: 'North and South America meet at the narrow Isthmus of Panama. This count joins them into one.', zh: '南北美洲在狹窄的巴拿馬地峽相接；這種算法把它們合成一個。' };
    if (kind === 'water' && lat < -60 && state.oceans === '4') return { en: 'Count five oceans and this water becomes the Southern Ocean.', zh: '改成五大洋的算法，這片海就變成南大洋。' };
    if (kind === 'water' && group === 'southern') return { en: 'Count four oceans and this water goes back to the ocean to its north.', zh: '改成四大洋的算法，這片海又回到北邊那個大洋。' };
    if (group === 'lake') return { en: 'Water with land all around it is a lake, even when its name says “sea”.', zh: '四周都是陸地的水是湖，即使名字叫「海」。' };
    if (kind === 'land' && (group === 'eurasia' || group === 'europe' || group === 'asia') && lon > 25 && lon < 70 && lat > 38) return { en: 'Europe and Asia are one piece of land. The line between them was drawn by people.', zh: '歐洲和亞洲是同一塊陸地，中間的界線是人畫的。' };
    return null;
  }

  const api = {
    state, ready: () => true,
    setScheme(k) { state.scheme = k; if (state.pick && state.pick.kind === 'land') api.pickAt(state.pick.lon, state.pick.lat, true); else { paintClasses(); if (view) view.refresh(); readout(); kick(); } },
    setOceans(v) { state.oceans = v; if (state.pick && state.pick.kind === 'water') api.pickAt(state.pick.lon, state.pick.lat, true); else { paintClasses(); if (view) view.refresh(); readout(); kick(); } },
    pickAt(lon, lat, keep) {
      const kind = isLand(lon, lat) ? 'land' : 'water';
      if (kind === 'water' && state.oceans === 'off' && !keep) state.oceans = '5';
      const group = kind === 'land' ? groupOf(continentOf(lon, lat), state.scheme) : oceanOf(lon, lat, state.oceans !== '4');
      state.pick = { lon, lat, kind, group, note: noteFor(kind, group, lon, lat) };
      paintClasses();
      if (view) view.refresh();
      readout(); kick();
      return state.pick;
    },
    clear() { state.pick = null; paintClasses(); if (view) view.refresh(); readout(); kick(); },
    demo(k) {
      if (SCHEMES[k]) { api.clear(); api.setScheme(k); api.goHome(k === 'america' || k === 'five' ? -60 : 60, 25); }
      else if (k === 'oceans') { api.clear(); api.setOceans('5'); api.goHome(150, -40); }
      else if (k === 'taiwan') { api.setScheme('seven'); api.pickAt(121, 23.7); api.goHome(121, 23.7); }
    },
    info() { return { scheme: state.scheme, count: SCHEMES[state.scheme].groups.length, oceans: state.oceans, pick: state.pick && { kind: state.pick.kind, group: state.pick.group } }; },
    goHome(lon, lat) { if (view) { view.home(lon, lat); kick(); } },
    render() { if (view) view.render(); },
  };
  root.querySelectorAll('[data-scheme]').forEach((b) => b.addEventListener('click', () => api.setScheme(b.dataset.scheme)));
  root.querySelectorAll('[data-oceans]').forEach((b) => b.addEventListener('click', () => api.setOceans(b.dataset.oceans)));
  root.querySelectorAll('[data-t]').forEach((c) => c.addEventListener('change', () => {
    const k = c.dataset.t;
    if (k === 'labels') state.labels = c.checked;
    else if (k === 'grid' && view) { view.globe.show('graticule', c.checked); view.globe.show('equator', c.checked); }
    kick();
  }));
  if (view) $('.al-home').addEventListener('click', () => api.goHome());
  $('.gg-cn-clear').addEventListener('click', () => api.clear());

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
  document.querySelectorAll('[data-gg-bars]').forEach((el) => initBars(el));
  document.querySelectorAll('[data-gg-count]').forEach((el) => initCount(el));
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D); else init2D();

lazyBoot('[data-geocont-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
