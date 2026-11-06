/*
 * 世界歷史 第七課〈How Did Qin and Han Unite China? 秦和漢怎麼統一中國？〉
 * 「七種錢變成一種」：桌上排著戰國各國的錢（布幣、刀幣、圜錢、蟻鼻錢），按「秦統一」每一枚翻過來變成圓形方孔的半兩錢；
 * 再按「漢朝」換成五銖錢。只畫外形、不畫錢上的字；尺寸依資料（公分），是典型的大小，實物差很多。
 *
 * 資料在 data/world_history.json 的 lab（states[]、banliang、wuzhu、modes[]）。
 * 除錯：document.querySelector('[data-wh-coins-lab]').__lab
 *   state、mode('before'|'qin'|'han')、pick(key)、info()、settle()、render()
 */
import {
  AmbientLight, Color, DirectionalLight, ExtrudeGeometry, Group, HemisphereLight, Mesh, MeshStandardMaterial,
  PerspectiveCamera, PlaneGeometry, MeshLambertMaterial, Path, Scene, Shape, Vector2, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot, bi, readJson } from './common.js';
import { outline, bbox } from './coins.js';
import './timeline2d.js';
import './centers2d.js';
import './sort2d.js';

const MODES = ['before', 'qin', 'han'];

function shapeOf(kind, size) {
  const o = outline(kind, size), sh = new Shape(o.outer.map(([x, y]) => new Vector2(x, y)));
  for (const h of o.holes) sh.holes.push(new Path(h.map(([x, y]) => new Vector2(x, y))));
  return sh;
}
function coinGeo(kind, size) {
  const g = new ExtrudeGeometry(shapeOf(kind, size), { depth: kind === 'antnose' ? 0.35 : 0.14, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.04, bevelSegments: 2, curveSegments: 8 });
  g.center(); g.rotateX(-Math.PI / 2);            // 平放在桌上
  return g;
}

function init(root) {
  const data = readJson(root);
  const $ = (s) => root.querySelector(s);
  const cv = $('.al-space-cv'), space = $('.al-space'), playBtn = $('.al-play');
  const state = { mode: 'before', t: 1, sel: data.states[0].key, touring: false };
  const N = data.states.length;
  // 排在桌上：刀幣很長，轉成刀尖朝向觀眾；每一排照實際的寬度排，彼此留 2 公分
  const turn = data.states.map((s) => (s.kind === 'knife' ? Math.PI / 2 : 0));
  const foot = data.states.map((s, i) => { const [x0, y0, x1, y1] = bbox(outline(s.kind, s.size).outer); const w = x1 - x0, d = y1 - y0; return turn[i] ? [d, w] : [w, d]; });
  const rows = []; let row = [];
  data.states.forEach((s, i) => { if (row.length && (s.kind === 'knife') !== (data.states[row[0]].kind === 'knife') && row.length >= 3) { rows.push(row); row = []; } row.push(i); });
  if (row.length) rows.push(row);
  const slots = new Array(N); let zCur = 0; const rowDepth = rows.map((r) => Math.max(...r.map((i) => foot[i][1])));
  const totalD = rowDepth.reduce((a, b) => a + b, 0) + 3 * (rows.length - 1);
  rows.forEach((r, ri) => {
    const width = r.reduce((a, i) => a + foot[i][0], 0) + 2.4 * (r.length - 1);
    let x = -width / 2; const zc = -totalD / 2 + zCur + rowDepth[ri] / 2;
    r.forEach((i) => { slots[i] = new Vector3(x + foot[i][0] / 2, 0, zc); x += foot[i][0] + 2.4; });
    zCur += rowDepth[ri] + 3;
  });
  const spanW = Math.max(...rows.map((r) => r.reduce((a, i) => a + foot[i][0], 0) + 2.4 * (r.length - 1)));
  const K = Math.max(spanW * 1.0, totalD * 1.55, 14), HOME = [0, K * 1.15, K * 0.42];          // 相機距離照桌上排得多大來定
  // 統一以後都是一樣的圓錢：排成緊密的方陣，不留刀幣原本的空位
  const CC = Math.min(4, N), compact = data.states.map((s, i) => { const r = Math.floor(i / CC), c = i % CC, inRow = Math.min(CC, N - r * CC); return new Vector3((c - (inRow - 1) / 2) * 4.6, 0, (r - (Math.ceil(N / CC) - 1) / 2) * 4.6); });
  let raf = 0, last = 0, idle = 0, visible = true, tourAt = 0;

  let view = null;
  try {
    const renderer = new WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const scene = new Scene();
    const camera = new PerspectiveCamera(36, 1, 0.3, 300);
    const controls = new OrbitControls(camera, cv);
    controls.enablePan = false; controls.enableDamping = true; controls.minDistance = 8; controls.maxDistance = 120;
    controls.maxPolarAngle = Math.PI * 0.47; controls.target.set(0, 0, 0);
    camera.position.set(...HOME);
    scene.add(new HemisphereLight(0xfff4e0, 0x5a4026, 0.9), new AmbientLight(0xffffff, 0.35));
    const sun = new DirectionalLight(0xffffff, 1.7); sun.position.set(-10, 18, 8); scene.add(sun);
    const table = new Mesh(new PlaneGeometry(60, 40), new MeshLambertMaterial({ color: '#6b4a2e' })); table.rotation.x = -Math.PI / 2; table.position.y = -0.2; scene.add(table);
    const bronze = (c) => new MeshStandardMaterial({ color: new Color(c), metalness: 0.55, roughness: 0.55 });
    const coins = data.states.map((s, i) => {
      const g = new Group(); g.position.copy(slots[i]); scene.add(g);
      const holder = new Group(); holder.rotation.y = turn[i]; g.add(holder);
      const old = new Mesh(coinGeo(s.kind, s.size), bronze(s.color || '#7d8f6a'));
      const ban = new Mesh(coinGeo('square', data.banliang.size), bronze('#9a7b45'));
      const wu = new Mesh(coinGeo('square', data.wuzhu.size), bronze('#8a8f5c'));
      holder.add(old); g.add(ban, wu);
      return { g, old, ban, wu };
    });
    const labs = labeler($('.al-labels'), cv, camera);
    const L = data.states.map((s) => labs.add('wh-lab', bi(s.short_en || s.en, s.short_zh || s.zh)));
    function resize() { const w = space.clientWidth, h = space.clientHeight; if (!w || !h) return; renderer.setSize(w, h, false); camera.aspect = w / h; camera.fov = w / h < 1.1 ? 52 : 36; camera.updateProjectionMatrix(); }
    new ResizeObserver(() => { resize(); render(); }).observe(space);
    controls.addEventListener('change', () => kick());
    view = { renderer, scene, camera, controls, coins, labs, L };
    resize(); controls.update();
  } catch (e) { view = null; if (window.console) console.warn('World History coins model: 3D is off', e); }
  if (!view) root.classList.add('al-nogl', 'wh-nogl');

  const ease = (u) => (u < 0 ? 0 : u > 1 ? 1 : u * u * (3 - 2 * u));
  // 每一枚錢依序翻面：前半圈舊的縮小，後半圈新的長出來
  function place() {
    if (!view) return;
    const target = state.mode;
    view.coins.forEach((c, i) => {
      const u = ease(state.t * 1.4 - i * 0.06), lift = Math.sin(u * Math.PI) * 2.2, spin = u * Math.PI * 2;
      const show = { before: c.old, qin: c.ban, han: c.wu }[target];
      const prev = state.from ? { before: c.old, qin: c.ban, han: c.wu }[state.from] : show;
      [c.old, c.ban, c.wu].forEach((m) => { m.visible = false; });
      const cur = u < 0.5 ? prev : show, s = u < 0.5 ? 1 - u * 2 : (u - 0.5) * 2;
      cur.visible = true; cur.scale.setScalar(prev === show ? 1 : Math.max(0.02, s));
      const a = state.from === 'before' || (!state.from && target === 'before') ? slots[i] : compact[i], b = target === 'before' ? slots[i] : compact[i];
      c.g.position.lerpVectors(prev === show && state.from !== 'before' && target !== 'before' ? b : a, b, u); c.g.position.y = lift;
      c.g.rotation.y = prev === show ? 0 : spin; c.g.rotation.z = Math.sin(u * Math.PI) * 0.6;
      const on = state.sel === data.states[i].key;
      [c.old, c.ban, c.wu].forEach((m) => { m.material.emissive = new Color(on ? '#5a3c08' : '#000000'); });
    });
  }
  function update() {
    $('.wh-co-kinds').textContent = state.mode === 'before' ? `${new Set(data.states.map((s) => s.coin_en)).size}` : '1';
    const s = data.states.find((x) => x.key === state.sel);
    const card = $('.wh-co-card');
    const coinEn = state.mode === 'before' ? s.coin_en : (state.mode === 'qin' ? data.banliang.en : data.wuzhu.en);
    const coinZh = state.mode === 'before' ? s.coin_zh : (state.mode === 'qin' ? data.banliang.zh : data.wuzhu.zh);
    const noteEn = state.mode === 'before' ? s.note_en : (state.mode === 'qin' ? data.banliang.note_en : data.wuzhu.note_en);
    const noteZh = state.mode === 'before' ? s.note_zh : (state.mode === 'qin' ? data.banliang.note_zh : data.wuzhu.note_zh);
    card.innerHTML = `<h3>${bi(s.en, s.zh)}</h3><p class="wh-co-coin">${bi(coinEn, coinZh)}</p><p>${bi(noteEn, noteZh)}</p>`;
    root.querySelectorAll('[data-mode]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.mode === state.mode));
    root.querySelectorAll('[data-mode-card]').forEach((c) => { c.hidden = c.dataset.modeCard !== state.mode; });
    root.querySelectorAll('[data-pick]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.pick === state.sel));
    root.dataset.mode = state.mode;
    place();
  }
  function render() {
    if (!view) return;
    const { labs, L } = view;
    const narrow = view.camera.aspect < 1.1;                                                      // 手機上只標選中的那一枚
    data.states.forEach((s, i) => { const p = view.coins[i].g.position, d = state.mode === 'before' ? foot[i][1] : 3.4; labs.place(L[i], new Vector3(p.x, 1.2, p.z - d / 2 - 0.8), !narrow || s.key === state.sel); });
    view.renderer.render(view.scene, view.camera);
  }
  function frame(tm) {
    raf = 0;
    const dt = Math.min(0.05, last ? (tm - last) / 1000 : 0.016); last = tm;
    let busy = false;
    if (state.t < 1.5) { state.t = Math.min(1.5, state.t + dt / 1.8); place(); busy = true; }
    if (state.touring && tm - tourAt > 4500) {
      const i = MODES.indexOf(state.mode);
      if (i === MODES.length - 1) tour(false); else { mode(MODES[i + 1]); tourAt = tm; }
      busy = true;
    }
    if (view) view.controls.update();
    render();
    idle = busy || state.touring ? 0 : idle + 1;
    if (visible && idle < 60) raf = requestAnimationFrame(frame);
  }
  function kick() { idle = 0; if (!raf && visible) { last = 0; raf = requestAnimationFrame(frame); } }
  new IntersectionObserver((ents) => { visible = ents[0].isIntersecting; if (visible) kick(); }).observe(root);

  function mode(k) { if (!MODES.includes(k) || k === state.mode) return; state.from = state.mode; state.mode = k; state.t = 0; update(); kick(); }
  function pick(k) { if (data.states.some((s) => s.key === k)) { state.sel = k; update(); kick(); } }
  function tour(on) {
    state.touring = on; tourAt = performance.now();
    playBtn.setAttribute('aria-pressed', on); playBtn.querySelector('.al-play-t').textContent = on ? 'Stop · 停' : 'Unify the coins · 統一錢幣';
    root.classList.toggle('is-playing', on);
    if (on) { if (state.mode !== 'before') { state.from = state.mode; state.mode = 'before'; state.t = 0; update(); } tourAt = performance.now(); }
    kick();
  }
  playBtn.addEventListener('click', () => tour(!state.touring));
  root.addEventListener('click', (ev) => {
    const m = ev.target.closest('[data-mode]'); if (m) { if (state.touring) tour(false); mode(m.dataset.mode); return; }
    const p = ev.target.closest('[data-pick]'); if (p) pick(p.dataset.pick);
  });
  if (view) $('.al-home').addEventListener('click', () => { view.camera.position.set(...HOME); view.controls.target.set(0, 0, 0); view.controls.update(); kick(); });
  const DEMOS = {
    before: () => { mode('before'); pick(data.states[0].key); },
    knife: () => { mode('before'); pick((data.states.find((s) => s.kind === 'knife') || data.states[0]).key); },
    qin: () => mode('qin'),
    han: () => mode('han'),
  };
  const api = {
    state, mode, pick, tour,
    demo(n) { if (DEMOS[n]) DEMOS[n](); },
    info() { return { mode: state.mode, sel: state.sel, coins: N, webgl: !!view }; },
    settle() { state.t = 1.5; place(); render(); },
    cam(x, y, z) { if (view) { view.camera.position.set(x, y, z); view.controls.update(); render(); } },
    render() { place(); update(); render(); },
    ready: () => true,
  };
  update();
  root.__lab = api;
  return api;
}

lazyBoot('[data-wh-coins-lab]', init, { demo: (lab, v) => lab.demo(v) });
