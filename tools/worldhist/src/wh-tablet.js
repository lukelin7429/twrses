/*
 * 世界歷史 第三課〈Why Did People Invent Writing? 人為什麼發明文字？〉
 * 「在泥板上記帳」：一塊濕泥板、一支削尖的蘆葦筆。選一個數字，按「寫上去」，筆一下一下壓出記號。
 * 兩種寫法可以切換：更早的圓頭筆壓痕（原始楔形文字的數字），和後來的楔形（直楔＝1、角楔＝10、滿 60 進位）。
 * **示意**：記號的形狀依博物館與 CDLI 的說明簡化，排列方式各時代、各書吏不完全一樣；頁面的 lab.scale_* 有寫明。
 * 同一支 bundle 帶這一頁不需要 WebGL 的小互動（平行時間軸、最早的文字地圖、分類遊戲）。
 *
 * 除錯：document.querySelector('[data-wh-tablet-lab]').__lab
 *   state、set(n)、style('wedge'|'round')、write(立即?)、clear()、slow(bool)、demo('one'|'count'|'round'|'sixty')、info()、render()
 */
import {
  AmbientLight, BoxGeometry, CanvasTexture, Color, CylinderGeometry, DirectionalLight, Group, HemisphereLight, Mesh, MeshLambertMaterial,
  MeshStandardMaterial, PerspectiveCamera, Scene, SRGBColorSpace, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot, bi } from './common.js';
import { groups, marks, bounds, pressOrder, read, MAX } from './tablet.js';
import './timeline2d.js';
import './centers2d.js';
import './sort2d.js';

const TW = 6, TD = 4.2, TH = 0.62;                       // 泥板的寬、深、厚（場景單位）
const CW = 1280, CH = Math.round(CW * TD / TW);          // 泥板正面的貼圖
const CLAY = '#c79a6b';

// ── 在貼圖上畫一個壓痕（從正上方看，光從左上來）──
function drawMark(ctx, kind, style, cx, cy, u) {
  ctx.save(); ctx.translate(cx, cy);
  const dark = 'rgba(70,42,22,.78)', mid = 'rgba(110,70,40,.55)', hi = 'rgba(255,236,210,.55)';
  if (style === 'round') {
    if (kind === 'ten') {                                  // 圓形壓痕
      const r = u * 0.34;
      const g = ctx.createRadialGradient(-r * 0.25, -r * 0.25, r * 0.1, 0, 0, r);
      g.addColorStop(0, dark); g.addColorStop(0.75, mid); g.addColorStop(1, 'rgba(110,70,40,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = hi; ctx.lineWidth = u * 0.05; ctx.beginPath(); ctx.arc(0, 0, r * 0.98, Math.PI * 0.05, Math.PI * 0.85); ctx.stroke();
    } else {                                               // 斜壓的橢圓痕（大的＝60）
      const s = kind === 'sixty' ? 1.35 : 1;
      ctx.rotate(-0.35);
      const g = ctx.createLinearGradient(0, -u * 0.35 * s, 0, u * 0.35 * s);
      g.addColorStop(0, dark); g.addColorStop(1, 'rgba(110,70,40,.15)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(0, 0, u * 0.16 * s, u * 0.36 * s, 0, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = hi; ctx.lineWidth = u * 0.04; ctx.beginPath(); ctx.ellipse(0, 0, u * 0.16 * s, u * 0.36 * s, 0, Math.PI * 0.1, Math.PI * 0.9); ctx.stroke();
    }
  } else if (kind === 'ten') {                             // 角楔：一個指向左邊的三角形壓痕
    const a = u * 0.34;
    ctx.beginPath(); ctx.moveTo(-a, 0); ctx.lineTo(a * 0.55, -a * 0.75); ctx.lineTo(a * 0.55, a * 0.75); ctx.closePath();
    const g = ctx.createLinearGradient(-a, 0, a * 0.55, 0); g.addColorStop(0, dark); g.addColorStop(1, mid);
    ctx.fillStyle = g; ctx.fill();
    ctx.strokeStyle = hi; ctx.lineWidth = u * 0.045; ctx.beginPath(); ctx.moveTo(-a, 0); ctx.lineTo(a * 0.55, a * 0.75); ctx.stroke();
  } else {                                                 // 直楔：上面是三角形的頭，下面拖一條尾巴（60 用同一個形狀）
    const w = u * 0.27, hh = u * 0.3, tail = u * 0.95;
    ctx.translate(0, -u * 0.3);
    ctx.beginPath(); ctx.moveTo(-w, 0); ctx.lineTo(w, 0); ctx.lineTo(0, hh); ctx.closePath();
    const g = ctx.createLinearGradient(0, 0, 0, hh); g.addColorStop(0, dark); g.addColorStop(1, mid);
    ctx.fillStyle = g; ctx.fill();
    ctx.strokeStyle = mid; ctx.lineWidth = u * 0.07; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, hh * 0.8); ctx.lineTo(0, tail); ctx.stroke();
    ctx.strokeStyle = hi; ctx.lineWidth = u * 0.045; ctx.beginPath(); ctx.moveTo(w, 0); ctx.lineTo(0, hh); ctx.stroke();
  }
  ctx.restore();
}
function drawClay(ctx) {
  ctx.fillStyle = CLAY; ctx.fillRect(0, 0, CW, CH);
  // 一點點紋理：細小的斑點，讓它看起來像泥
  let s = 7;
  for (let i = 0; i < 2600; i++) {
    s = (s * 16807) % 2147483647; const x = (s % 10000) / 10000 * CW;
    s = (s * 16807) % 2147483647; const y = (s % 10000) / 10000 * CH;
    s = (s * 16807) % 2147483647; const a = ((s % 1000) / 1000) * 0.08;
    ctx.fillStyle = (i % 2 ? `rgba(90,55,30,${a})` : `rgba(255,240,220,${a})`); ctx.fillRect(x, y, 3, 3);
  }
  // 書吏常在泥板上先劃一條橫線分欄：這裡只畫一條很淡的
  ctx.strokeStyle = 'rgba(100,62,34,.25)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(CW * 0.06, CH * 0.82); ctx.lineTo(CW * 0.94, CH * 0.82); ctx.stroke();
}

function init(root) {
  const $ = (s) => root.querySelector(s);
  const cv = $('.al-space-cv'), space = $('.al-space');
  const numIn = $('.wh-tb-num'), out = $('.wh-tb-n');
  const state = { n: 23, style: 'wedge', slow: false, queue: [], pressed: [], busy: false, t: 0 };
  let raf = 0, last = 0, idle = 0, visible = true;

  let view = null;
  try {
    const renderer = new WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const scene = new Scene();
    const camera = new PerspectiveCamera(34, 1, 0.1, 100);
    const controls = new OrbitControls(camera, cv);
    controls.enablePan = false; controls.enableDamping = true; controls.minDistance = 5; controls.maxDistance = 16;
    controls.maxPolarAngle = Math.PI * 0.46; controls.target.set(0, 0.4, 0);
    camera.position.set(0, 8.6, 5.0);
    scene.add(new HemisphereLight(0xfff4e6, 0x6b5440, 1.0), new AmbientLight(0xffffff, 0.2));
    const sun = new DirectionalLight(0xffffff, 1.6); sun.position.set(-5, 9, 4); scene.add(sun);
    // 桌子
    const table = new Mesh(new BoxGeometry(14, 0.4, 9), new MeshLambertMaterial({ color: '#6b4a32' })); table.position.y = -0.2; scene.add(table);
    // 泥板：側面是泥色，正面貼可以畫的貼圖
    const tex = document.createElement('canvas'); tex.width = CW; tex.height = CH;
    const tctx = tex.getContext('2d'); drawClay(tctx);
    const map = new CanvasTexture(tex); map.colorSpace = SRGBColorSpace; map.anisotropy = 4;
    const side = new MeshStandardMaterial({ color: CLAY, roughness: 0.95 });
    const face = new MeshStandardMaterial({ map, roughness: 0.92 });
    const tablet = new Mesh(new BoxGeometry(TW, TH, TD), [side, side, face, side, side, side]);
    tablet.position.y = TH / 2; scene.add(tablet);
    // 蘆葦筆：一支細長的桿子，尖端削成斜面
    const stylus = new Group();
    const shaft = new Mesh(new CylinderGeometry(0.11, 0.12, 4.2, 10), new MeshLambertMaterial({ color: '#d8c27a' }));
    shaft.position.y = 2.1; stylus.add(shaft);
    const tip = new Mesh(new CylinderGeometry(0.0, 0.11, 0.35, 3), new MeshLambertMaterial({ color: '#b89a52' }));
    tip.position.y = -0.17; tip.rotation.y = Math.PI / 6; stylus.add(tip);
    for (let k = 1; k < 4; k++) { const node = new Mesh(new CylinderGeometry(0.13, 0.13, 0.06, 10), new MeshLambertMaterial({ color: '#a88a45' })); node.position.y = k * 1.1; stylus.add(node); }
    scene.add(stylus);
    const rest = new Vector3(TW / 2 + 1.1, TH + 0.2, 0.6);
    stylus.position.copy(rest); stylus.rotation.set(0, 0, -0.5);
    const labs = labeler($('.al-labels'), cv, camera);
    const L = { tablet: labs.add('wh-lab', 'Clay tablet<i>泥板</i>'), stylus: labs.add('wh-lab', 'Reed stylus<i>蘆葦筆</i>') };
    function resize() { const w = space.clientWidth, h = space.clientHeight; if (!w || !h) return; renderer.setSize(w, h, false); camera.aspect = w / h; camera.fov = w / h < 1.1 ? 46 : 34; camera.updateProjectionMatrix(); }
    new ResizeObserver(() => { resize(); render(); }).observe(space);
    controls.addEventListener('change', () => kick());
    view = { renderer, scene, camera, controls, tctx, map, stylus, rest, labs, L, tablet };
    resize(); controls.update();
  } catch (e) { view = null; if (window.console) console.warn('World History tablet model: 3D is off', e); }
  if (!view) root.classList.add('al-nogl', 'wh-nogl');

  // 版面：把一組記號放在泥板正面的中間（貼圖座標）
  const U = 170;                                            // 一個記號單位多少像素
  function layout(ms) {
    const b = bounds(ms), ox = (CW - b.w * U) / 2, oy = (CH * 0.82 - b.h * U) / 2 + U * 0.05;
    return ms.map((m) => ({ ...m, px: ox + (m.x + 0.31) * U, py: oy + (m.y + 0.5) * U }));
  }
  const toWorld = (px, py) => new Vector3((px / CW - 0.5) * TW, TH, (py / CH - 0.5) * TD);

  // 右邊欄：數字拆成幾個 60、幾個 10、幾個 1，以及三種記號長什麼樣子
  function readout() {
    const g = groups(state.n);
    out.textContent = String(state.n);
    const parts = [];
    if (g.sixties) parts.push([`${g.sixties} × 60`, `${g.sixties} 個 60`]);
    if (g.tens) parts.push([`${g.tens} × 10`, `${g.tens} 個 10`]);
    if (g.ones) parts.push([`${g.ones} × 1`, `${g.ones} 個 1`]);
    $('.wh-tb-split').innerHTML = bi(`${parts.map((p) => p[0]).join(' + ')} = ${state.n}`, `${parts.map((p) => p[1]).join(' ＋ ')} ＝ ${state.n}`);
    root.querySelectorAll('[data-style]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.style === state.style));
    root.querySelectorAll('.wh-tb-key [data-key-style]').forEach((el) => { el.hidden = el.dataset.keyStyle !== state.style; });
    numIn.setAttribute('aria-valuetext', String(state.n));
    $('.wh-tb-count').textContent = `${state.pressed.length} / ${marks(state.n, state.style).length}`;
  }
  function clear() {
    state.queue = []; state.pressed = []; state.busy = false;
    if (view) { drawClay(view.tctx); view.map.needsUpdate = true; view.stylus.position.copy(view.rest); view.stylus.rotation.set(0, 0, -0.5); }
    readout(); kick();
  }
  function write(now) {
    clear();
    const ms = layout(pressOrder(marks(state.n, state.style)));
    if (!view || now) { for (const m of ms) press(m); readout(); render(); return; }
    state.queue = ms; state.busy = true; state.t = 0; kick();
  }
  function press(m) {
    state.pressed.push(m);
    if (view) { drawMark(view.tctx, m.kind, state.style, m.px, m.py, U); view.map.needsUpdate = true; }
  }
  // 筆的動作：移到上方（0–0.45）→ 壓下（0.45–0.6）→ 停一下 → 抬起（0.75–1）
  function animate(dt) {
    if (!state.busy || !view) return false;
    const m = state.queue[0];
    if (!m) { state.busy = false; view.stylus.position.copy(view.rest); view.stylus.rotation.set(0, 0, -0.5); readout(); return true; }
    const dur = state.slow ? 2.4 : 0.55;
    state.t += dt / dur;
    const target = toWorld(m.px, m.py), p = view.stylus.position, k = Math.min(1, state.t);
    // 角楔是把筆尖的角斜斜地壓進去；直楔是筆幾乎直立往下壓
    const tilt = m.kind === 'ten' ? 0.55 : state.style === 'round' && m.kind !== 'ten' ? 0.45 : 0.18;
    const from = state.prev || view.rest;
    if (k < 0.45) { const e = k / 0.45; p.lerpVectors(from, new Vector3(target.x, TH + 0.9, target.z), e * e * (3 - 2 * e)); }
    else if (k < 0.6) { const e = (k - 0.45) / 0.15; p.set(target.x, TH + 0.9 - 0.9 * e + 0.02, target.z); }
    else if (k < 0.75) { p.set(target.x, TH + 0.02, target.z); if (!m.done) { m.done = true; press(m); readout(); } }
    else { const e = (k - 0.75) / 0.25; p.set(target.x, TH + 0.02 + 0.9 * e, target.z); }
    view.stylus.rotation.set(0, 0, m.kind === 'ten' && state.style === 'wedge' ? tilt : -tilt);
    if (k >= 1) { state.prev = new Vector3(target.x, TH + 0.9, target.z); state.queue.shift(); state.t = 0; if (!state.queue.length) state.prev = null; }
    return true;
  }
  function render() {
    if (!view) return;
    const { labs, L, camera } = view;
    labs.place(L.tablet, new Vector3(-TW / 2 + 0.6, TH + 0.05, TD / 2 + 0.25), true);
    labs.place(L.stylus, view.stylus.position.clone().add(new Vector3(0.4, 1.4, 0)), true);
    view.renderer.render(view.scene, camera);
  }
  function frame(t) {
    raf = 0;
    const dt = Math.min(0.05, last ? (t - last) / 1000 : 0.016); last = t;
    const busy = animate(dt);
    if (view) view.controls.update();
    render();
    idle = busy ? 0 : idle + 1;
    if (visible && idle < 60) raf = requestAnimationFrame(frame);
  }
  function kick() { idle = 0; if (!raf && visible) { last = 0; raf = requestAnimationFrame(frame); } }
  new IntersectionObserver((ents) => { visible = ents[0].isIntersecting; if (visible) kick(); }).observe(root);

  function set(n) { state.n = Math.min(MAX, Math.max(1, Math.round(n))); numIn.value = state.n; clear(); }
  function style(s) { state.style = s; clear(); }
  numIn.addEventListener('input', () => set(Number(numIn.value)));
  root.addEventListener('click', (ev) => {
    const b = ev.target.closest('button'); if (!b || !root.contains(b)) return;
    if (b.dataset.style) style(b.dataset.style);
    else if (b.dataset.act === 'write') write();
    else if (b.dataset.act === 'clear') clear();
    else if (b.dataset.step) set(state.n + Number(b.dataset.step));
  });
  root.querySelectorAll('.al-tg input').forEach((inp) => inp.addEventListener('change', () => { if (inp.dataset.t === 'slow') state.slow = inp.checked; }));
  if (view) $('.al-home').addEventListener('click', () => { view.camera.position.set(0, 8.6, 5.0); view.controls.target.set(0, 0.4, 0); view.controls.update(); kick(); });

  const DEMOS = {
    one: () => { state.slow = true; const tg = root.querySelector('[data-t="slow"]'); if (tg) tg.checked = true; style('wedge'); set(1); write(); },
    count: () => { state.slow = false; style('wedge'); set(23); write(); },
    round: () => { state.slow = false; style('round'); set(23); write(); },
    sixty: () => { state.slow = false; style('wedge'); set(61); write(); },
  };
  const api = {
    state, set, style, write, clear,
    slow(on) { state.slow = !!on; },
    demo(name) { if (DEMOS[name]) DEMOS[name](); },
    info() { return { n: state.n, style: state.style, pressed: state.pressed.length, total: marks(state.n, state.style).length, read: read(state.pressed), busy: state.busy, webgl: !!view }; },
    render() { readout(); render(); },
    ready: () => true,
  };
  set(state.n);
  write(true);
  root.__lab = api;
  return api;
}

lazyBoot('[data-wh-tablet-lab]', init, { demo: (lab, v) => lab.demo(v) });
