/*
 * 台灣歷史 Taiwan's Story · 第五課「荷蘭人為什麼在台南蓋城？」
 *
 * 一、熱蘭遮城 [data-twhfort-lab]：3D 示意（fort3d.js，依 1632 年的版畫）＋右邊那張版畫本身（同樣的編號標在版畫上）
 *     ＋一張說明卡＋直的時間軸（1600–1670，事件可以點）。
 *     .twh-spot[data-spot]   重點清單；3D 裡、版畫上也各有一顆同編號的圓鈕
 *     data-t="today"         今天：海已經變成陸地、船不見了，城只剩一段牆（示意）
 *     .twh-ev[data-ev]       時間軸旁的事件
 *   沒有 WebGL 時：3D 不畫，版畫、清單、說明卡、時間軸照樣能用。
 * 二、貨物往哪裡去 [data-twh-trade]（trade2d.js）；三、這份工作是誰做的 [data-twh-sort]（evidence2d.js）；
 * 四、整個系列的時間軸（timeline2d.js）。
 *
 * 產物：cd tools/twhist && npm run build → assets/js/twh-fort.js
 * 除錯：document.querySelector('[data-twhfort-lab]').__lab
 *   select(key)、event(key)、setToday(bool)、demo(...)、render()、check()＝選到的重點在 3D、版畫、清單上是同一個，而且時間軸游標在那個事件的年份
 */
import {
  AmbientLight, Color, DirectionalLight, Fog, HemisphereLight, MathUtils, PCFShadowMap, PerspectiveCamera, Scene, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { initEvidence } from './evidence2d.js';
import { makeFort } from './fort3d.js';
import { yearToAgo } from './timeline.js';
import { initTimelines, mountTimeline } from './timeline2d.js';
import { initTrades } from './trade2d.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const bi = (en, zh) => `${esc(en)}<span class="zh">${esc(zh)}</span>`;

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const cfg = JSON.parse($('script.twh-lab-data').textContent);
  const spots = cfg.spots, byKey = Object.fromEntries(spots.map((s) => [s.key, s]));
  const events = cfg.events, evKey = Object.fromEntries(events.map((e) => [e.key, e]));
  const now = new Date().getFullYear();
  const spaceWrap = $('.al-space'), cv = $('.al-space-cv');
  const R = { card: $('.twh-site-card'), msg: $('.twh-msg'), list: $('.twh-spots'), print: $('.twh-print-hots'), evs: $('.twh-evs'), year: $('.twh-age') };
  const state = { sel: null, ev: null, today: false };
  const say = (en, zh) => { R.msg.innerHTML = bi(en, zh); };

  // ── 右邊：直的時間軸＋事件 ────────────────────────────────────────────
  const tl = mountTimeline($('.twh-vtl'), {
    older: cfg.older, nearest: cfg.nearest, nearestLinear: cfg.nearest, kind: 'linear', vertical: true, controls: false, list: false,
    spans: [{ fromAgo: yearToAgo(cfg.from, now), toAgo: yearToAgo(cfg.to, now), cls: 'layer twh-tl-s1', en: '', zh: '' }],
  });
  events.forEach((e) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'twh-ev'; b.setAttribute('data-ev', e.key); b.setAttribute('aria-pressed', 'false');
    b.innerHTML = `<b>${e.year}</b><span>${bi(e.en, e.zh)}</span>`;
    b.addEventListener('click', () => event(e.key));
    R.evs.append(b);
  });
  function event(key) {
    const e = evKey[key]; if (!e) return;
    state.ev = key;
    R.evs.querySelectorAll('.twh-ev').forEach((b) => { const on = b.getAttribute('data-ev') === key; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', String(on)); });
    tl.setCursor(yearToAgo(e.year, now), { en: String(e.year), zh: `${e.year} 年` });
    R.year.innerHTML = bi(String(e.year), `${e.year} 年`);
    R.card.innerHTML = `<h3>${bi(e.en, e.zh)}</h3><p>${bi(e.text_en, e.text_zh)}</p><p class="twh-site-src">${esc(e.src)}</p>`;
    say(e.en, e.zh);
  }

  // ── 重點：清單、版畫上的圓鈕 ─────────────────────────────────────────
  spots.forEach((s, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<button type="button" class="twh-spot" data-spot="${s.key}" aria-pressed="false"><i>${i + 1}</i><span>${bi(s.en, s.zh)}</span></button>`;
    li.firstChild.addEventListener('click', () => select(s.key));
    R.list.append(li);
    if (s.print) {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'twh-hot'; b.setAttribute('data-hot', s.key);
      b.style.left = `${s.print.x}%`; b.style.top = `${s.print.y}%`;
      b.innerHTML = `<i>${i + 1}</i>`; b.title = `${s.en} · ${s.zh}`;
      b.addEventListener('click', () => select(s.key));
      R.print.append(b);
    }
  });
  function select(key) {
    const s = byKey[key]; if (!s) return;
    if (!!s.today !== state.today) setToday(!!s.today);
    state.sel = key;
    R.list.querySelectorAll('.twh-spot').forEach((b) => { const on = b.getAttribute('data-spot') === key; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', String(on)); });
    R.print.querySelectorAll('.twh-hot').forEach((b) => b.classList.toggle('is-on', b.getAttribute('data-hot') === key));
    R.card.innerHTML = `<h3>${bi(s.en, s.zh)}</h3><p>${bi(s.text_en, s.text_zh)}</p>`
      + `<p class="twh-site-src">${bi(s.basis_en, s.basis_zh)}</p>`;
    say(s.en, s.zh);
    root.classList.remove('al-fresh');
  }
  function setToday(on) {
    state.today = !!on;
    const tg = $('[data-t="today"]'); if (tg) tg.checked = state.today;
    root.classList.toggle('twh-is-today', state.today);
    if (view) view.fort.setToday(state.today ? 1 : 0);
    R.list.querySelectorAll('.twh-spot').forEach((b) => { const s = byKey[b.getAttribute('data-spot')]; b.parentElement.hidden = !!s.today !== state.today; });
    if (state.sel && !!byKey[state.sel].today !== state.today) state.sel = null;
    say(state.today ? cfg.today_en : cfg.then_en, state.today ? cfg.today_zh : cfg.then_zh);
  }

  // ── 3D ──────────────────────────────────────────────────────────────
  let view = null;
  function make3D() {
    let renderer;
    try { renderer = new WebGLRenderer({ canvas: cv, antialias: true }); } catch (e) { return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = PCFShadowMap;
    const scene = new Scene();
    scene.background = new Color(0xbcd3e0); scene.fog = new Fog(0xbcd3e0, 34, 70);
    const camera = new PerspectiveCamera(36, 1, 0.1, 200);
    const controls = new OrbitControls(camera, cv);
    controls.enableDamping = true; controls.dampingFactor = 0.08;
    controls.minDistance = 8; controls.maxDistance = 60;
    controls.minPolarAngle = Math.PI * 0.18; controls.maxPolarAngle = Math.PI * 0.46;
    scene.add(new HemisphereLight(0xf4f1e6, 0x5a5040, 1.05));
    scene.add(new AmbientLight(0xffffff, 0.3));
    const sun = new DirectionalLight(0xfff0d8, 1.6);
    sun.position.set(-10, 16, 12); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -18, right: 18, top: 14, bottom: -14, near: 1, far: 60 });
    sun.shadow.bias = -0.0006; sun.shadow.normalBias = 0.04;
    scene.add(sun);
    const fort = makeFort();
    scene.add(fort.group);
    const lab = labeler($('.al-labels'), cv, camera);
    const pins = spots.map((s, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'al-lab twh-pin'; b.tabIndex = -1;
      b.innerHTML = `<i>${i + 1}</i>`; b.title = `${s.en} · ${s.zh}`;
      b.addEventListener('click', () => select(s.key));
      $('.al-labels').append(b);
      return { key: s.key, el: b };
    });
    const center = new Vector3(0, 1.4, -1), DIR = new Vector3(0.12, 0.5, 1).normalize();
    function goHome() {
      const vf = MathUtils.degToRad(camera.fov / 2), hf = Math.atan(Math.tan(vf) * camera.aspect);
      const dist = Math.max(8 / Math.tan(vf), (camera.aspect < 0.95 ? 12 : 15.5) / Math.tan(hf));
      camera.position.copy(DIR).multiplyScalar(Math.min(56, dist)).add(center);
      controls.target.copy(center); controls.update();
    }
    const tmp = new Vector3();
    function render() {
      controls.update();
      pins.forEach((p) => {
        const vis = fort.visible(p.key);
        p.el.hidden = !vis;
        if (vis) { lab.place(p.el, fort.anchor(p.key, tmp)); p.el.classList.toggle('is-on', p.key === state.sel); }
      });
      renderer.render(scene, camera);
    }
    let band0 = -1;
    function resize() {
      const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
      const band = camera.aspect < 0.95 ? 0 : camera.aspect < 1.5 ? 1 : 2;
      if (band !== band0) { band0 = band; goHome(); }
    }
    $('.al-home').addEventListener('click', goHome);
    new ResizeObserver(resize).observe(spaceWrap);
    resize(); goHome();
    return { fort, render, goHome, camera };
  }
  view = make3D();
  if (!view) root.classList.add('al-nogl');

  const tg = $('[data-t="today"]');
  if (tg) tg.addEventListener('change', () => setToday(tg.checked));

  const DEMO = {};
  for (const [k, d] of Object.entries(cfg.demo)) DEMO[k] = () => { if (d.ev) event(d.ev); if (d.spot) select(d.spot); };

  let raf = 0, last = 0, visible = false;
  function frame(t) {
    raf = 0; if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000); last = t;
    if (view) { view.fort.tick(dt); view.render(); }
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => { visible = ents[0].isIntersecting; if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); } }, { rootMargin: '120px' }).observe(root);

  setToday(false);
  event(cfg.start_ev);
  say(cfg.hello_en, cfg.hello_zh);
  root.classList.add('al-ready', 'al-fresh');
  root.__lab = {
    state, tl, select, event, setToday, spots, events, demo: (v) => DEMO[v] && DEMO[v](),
    render: () => view && view.render(), goCam: () => view && view.goHome(),
    check: () => {
      const listOn = [...R.list.querySelectorAll('.twh-spot.is-on')].map((b) => b.getAttribute('data-spot'));
      const printOn = [...R.print.querySelectorAll('.twh-hot.is-on')].map((b) => b.getAttribute('data-hot'));
      const s = state.sel ? byKey[state.sel] : null;
      const okSpot = !s || (listOn.length === 1 && listOn[0] === s.key && (s.print ? printOn[0] === s.key : printOn.length === 0));
      const okEv = !state.ev || Math.abs(tl.state().cursor - yearToAgo(evKey[state.ev].year, now)) < 1e-6;
      return okSpot && okEv;
    },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() { initTimelines(); initEvidence(); initTrades(); }
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-twhfort-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
