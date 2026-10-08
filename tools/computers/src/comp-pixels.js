/*
 * 電腦概論 · 第二課「0 和 1 怎麼變成文字、圖片和聲音？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：**大家約好一張對照表（編碼）**——同一排位元，照不同的表讀，就是數、字，或顏色。
 * 場景：左後方一面「像素牆」（16 × 16 塊，自己畫的蘋果）；右後方三根柱子（紅、綠、藍，高度＝0–255）和一塊色塊（三個數混出來的顏色）；
 *       前面桌上是第一課的八個開關（bits3d.js），顯示被選的那個像素、被選的那一色的數。
 *   點牆上的一塊（或右邊的小地圖）  選一個像素
 *   data-chan="0|1|2" 或點柱子      八個開關顯示紅、綠或藍
 *   撥開關（3D 或右邊的位元列）、拉 data-rgb 滑桿  改這個像素的顏色
 *   data-view="far|all|wall"        遠看（看起來是一張圖）／全景／貼近牆（看見一格一格）
 *   .cp-reset                       還原整張圖
 * 右邊「同樣八個位元，三種讀法」：當成數、當成字（ASCII）、當成這一色的量。
 *
 * 控制器不靠 WebGL：沒有 WebGL 時 3D 不畫，小地圖、滑桿、位元列照樣能用。
 * 2D（不需要 WebGL）：打字看編號、8 × 8 像素畫、聲音取樣（codes2d.js）。
 *
 * 產物：cd tools/computers && npm run build → assets/js/comp-pixels.js
 * 除錯：document.querySelector('[data-comppixels-lab]').__lab
 *   select(i)、setChan(0|1|2)、setValue(n)、setView('far'|'all'|'wall', 立刻?)、demo('far'|'rgb'|'switch'|'same')、
 *   run(秒)、goCam()、render()
 */
import {
  AmbientLight, BoxGeometry, BufferGeometry, CircleGeometry, Color, DirectionalLight, HemisphereLight, InstancedMesh, Line,
  LineBasicMaterial, MathUtils, Matrix4, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, Raycaster, Scene,
  Vector2, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { bitString, fromBits, toBits } from './bits.js';
import { makeBitRow } from './bits3d.js';
import { asciiChar, parsePicture, rgbHex } from './codes.js';
import { initChars, initDraw, initSound } from './codes2d.js';
import { labeler, lazyBoot } from './common.js';

const W = 16, H = 16, PITCH = 0.32;
const WALL = { x: -2.9, y: 3.15, z: -1.4 };
const BARS = { x: [1.75, 2.75, 3.75], z: -1.4, max: 3.6 };
const CH = [
  { en: 'red', zh: '紅', k: 'R', hex: 0xff3b30 },
  { en: 'green', zh: '綠', k: 'G', hex: 0x34c759 },
  { en: 'blue', zh: '藍', k: 'B', hex: 0x3b82f6 },
];
const START = 7 * W + 5;   // 一開始選蘋果上的一塊紅
const V = (x, y, z) => new Vector3(x, y, z);

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const spaceWrap = $('.al-space'), cv = $('.al-space-cv');
  const R = {
    map: $('.cp-px-map'), sw: $('.cp-px-sw'), pos: $('.cp-px-pos'), hex: $('.cp-px-hex'), msg: $('.cp-msg'),
    strip: [...$$('[data-bit]')], sliders: [...$$('[data-rgb]')], vals: [...$$('.cp-ch-v')], chanName: $$('.cp-chan-name'),
    asNum: $('.cp-as-num'), asChar: $('.cp-as-char'), asAmt: $('.cp-as-amt'), bin: $('.cp-bin'),
  };
  const state = { px: parsePicture(), sel: START, chan: 0, view: 'all', labels: true, t: 0 };
  let script = null, view = null;

  const value = () => state.px[state.sel][state.chan];
  const say = (en, zh) => { R.msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  const press = (sel, attr, v) => $$(sel).forEach((b) => b.setAttribute('aria-pressed', b.getAttribute(attr) === String(v) ? 'true' : 'false'));

  // ── 右邊的小地圖（2D，沒有 WebGL 也能選像素）─────────────────────────
  const mg = R.map.getContext('2d');
  function drawMap() {
    const s = R.map.width / W;
    for (let i = 0; i < W * H; i++) { mg.fillStyle = rgbHex(state.px[i]); mg.fillRect((i % W) * s, Math.floor(i / W) * s, s + 0.5, s + 0.5); }
    const x = (state.sel % W) * s, y = Math.floor(state.sel / W) * s;
    mg.lineWidth = 3; mg.strokeStyle = '#fff'; mg.strokeRect(x + 1.5, y + 1.5, s - 3, s - 3);
    mg.lineWidth = 1.5; mg.strokeStyle = '#10182e'; mg.strokeRect(x - 0.5, y - 0.5, s + 1, s + 1);
  }
  R.map.addEventListener('click', (e) => {
    const r = R.map.getBoundingClientRect();
    const c = Math.min(W - 1, Math.floor(((e.clientX - r.left) / r.width) * W)), row = Math.min(H - 1, Math.floor(((e.clientY - r.top) / r.height) * H));
    user(); select(row * W + c);
  });
  R.map.addEventListener('keydown', (e) => {
    const d = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -W, ArrowDown: W }[e.key];
    if (!d) return;
    e.preventDefault();
    const n = state.sel + d;
    if (n < 0 || n >= W * H || (Math.abs(d) === 1 && Math.floor(n / W) !== Math.floor(state.sel / W))) return;
    user(); select(n);
  });

  function show() {
    const p = state.px[state.sel], v = value(), bits = toBits(v, 8), ch = CH[state.chan];
    R.sw.style.background = rgbHex(p);
    R.pos.innerHTML = `Column ${(state.sel % W) + 1}, row ${Math.floor(state.sel / W) + 1}<small>第 ${(state.sel % W) + 1} 行、第 ${Math.floor(state.sel / W) + 1} 列</small>`;
    R.hex.textContent = `rgb(${p.join(', ')}) = ${rgbHex(p)}`;
    R.sliders.forEach((s, k) => { s.value = String(p[k]); });
    R.vals.forEach((b, k) => { b.textContent = String(p[k]); });
    R.strip.forEach((b) => { const i = Number(b.getAttribute('data-bit')); b.setAttribute('aria-pressed', bits[i] ? 'true' : 'false'); b.querySelector('b').textContent = String(bits[i]); });
    R.chanName.forEach((e) => { e.textContent = e.classList.contains('zh') ? ch.zh : ch.en; });
    R.bin.textContent = bitString(bits);
    R.asNum.textContent = String(v);
    const c = asciiChar(v);
    R.asChar.innerHTML = c === ' ' ? 'a space<small>空格</small>' : c ? `<b>${c.replace('<', '&lt;').replace('&', '&amp;')}</b>` : v > 127 ? 'not in ASCII<small>ASCII 沒有這一號</small>' : 'a control code<small>控制碼，印不出來</small>';
    R.asAmt.innerHTML = `${Math.round((v / 255) * 100)}% ${ch.en}<small>${ch.zh}色的 ${Math.round((v / 255) * 100)}%</small>`;
    root.dataset.chan = String(state.chan);
    press('[data-chan]', 'data-chan', state.chan);
    drawMap();
    if (view) view.sync();
  }
  function select(i) { state.sel = i; show(); }
  function setChan(c) { state.chan = c; show(); }
  function setRGB(k, v) { state.px[state.sel][k] = Math.max(0, Math.min(255, Math.round(v))); show(); }
  const setValue = (v) => setRGB(state.chan, v);
  function reset() { state.px = parsePicture(); show(); }
  function user() { script = null; root.classList.remove('al-fresh'); }
  function setView(v, instant) { state.view = v; press('[data-view]', 'data-view', v); if (view) view.goHome(!!instant); }

  function told() {
    const p = state.px[state.sel], ch = CH[state.chan], v = value();
    say(`This pixel is three numbers: red ${p[0]}, green ${p[1]}, blue ${p[2]}. The switches show its ${ch.en}: ${bitString(toBits(v, 8))} = ${v}.`,
        `這個像素是三個數：紅 ${p[0]}、綠 ${p[1]}、藍 ${p[2]}。開關顯示的是它的${ch.zh}：${bitString(toBits(v, 8))}＝${v}。`);
  }

  R.strip.forEach((b) => b.addEventListener('click', () => { user(); const i = Number(b.getAttribute('data-bit')); const bits = toBits(value(), 8); bits[i] = bits[i] ? 0 : 1; setValue(fromBits(bits)); told(); }));
  R.sliders.forEach((s) => s.addEventListener('input', () => { user(); const k = Number(s.getAttribute('data-rgb')); state.chan = k; setRGB(k, Number(s.value)); told(); }));
  $$('[data-chan]').forEach((b) => b.addEventListener('click', () => { user(); setChan(Number(b.getAttribute('data-chan'))); told(); }));
  $$('[data-view]').forEach((b) => b.addEventListener('click', () => { user(); setView(b.getAttribute('data-view')); }));
  $('.cp-reset').addEventListener('click', () => { user(); reset(); say('The picture is back to the way it started.', '整張圖還原了。'); });
  const tgL = $('[data-t="labels"]');
  if (tgL) tgL.addEventListener('change', () => { state.labels = tgL.checked; });

  // ── 3D ──────────────────────────────────────────────────────────────
  function make3D() {
    let renderer;
    try { renderer = new WebGLRenderer({ canvas: cv, antialias: true }); } catch (e) { return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const scene = new Scene();
    scene.background = new Color(0x0b1326);
    const camera = new PerspectiveCamera(34, 1, 0.05, 400);
    const controls = new OrbitControls(camera, cv);
    controls.enableDamping = true; controls.dampingFactor = 0.08;
    controls.minDistance = 2; controls.maxDistance = 120;
    controls.maxPolarAngle = Math.PI * 0.49;
    scene.add(new HemisphereLight(0xdfe8ff, 0x1a1410, 0.8));
    scene.add(new AmbientLight(0xffffff, 0.2));
    const sun = new DirectionalLight(0xfff1dc, 1.1); sun.position.set(-4, 9, 8); scene.add(sun);
    const floor = new Mesh(new CircleGeometry(90, 64), new MeshStandardMaterial({ color: 0x121c36, roughness: 0.95 }));
    floor.rotation.x = -Math.PI / 2; scene.add(floor);

    // 像素牆：後面一塊深色的板子，前面 256 塊方磚（MeshBasicMaterial：顏色不受燈光影響，數字是多少就是多少）
    const back = new Mesh(new BoxGeometry(W * PITCH + 0.5, H * PITCH + 0.5, 0.2), new MeshStandardMaterial({ color: 0x1d2740, roughness: 0.6 }));
    back.position.set(WALL.x, WALL.y, WALL.z - 0.2); scene.add(back);
    const leg = new Mesh(new BoxGeometry(0.5, WALL.y - H * PITCH / 2, 0.3), new MeshStandardMaterial({ color: 0x1d2740, roughness: 0.6 }));
    leg.position.set(WALL.x, (WALL.y - H * PITCH / 2) / 2, WALL.z - 0.2); scene.add(leg);
    const tiles = new InstancedMesh(new BoxGeometry(PITCH * 0.9, PITCH * 0.9, 0.12), new MeshBasicMaterial(), W * H);
    const m4 = new Matrix4(), col = new Color();
    const tilePos = (i, out = V(0, 0, 0)) => out.set(WALL.x + ((i % W) - (W - 1) / 2) * PITCH, WALL.y + ((H - 1) / 2 - Math.floor(i / W)) * PITCH, WALL.z);
    scene.add(tiles);
    const frame = new Mesh(new BoxGeometry(PITCH * 1.16, PITCH * 1.16, 0.1), new MeshBasicMaterial({ color: 0xffffff }));
    scene.add(frame);

    // 三根柱子＋一塊色塊
    const plinth = new Mesh(new BoxGeometry(3.4, 0.14, 1.3), new MeshStandardMaterial({ color: 0x1d2740, roughness: 0.6 }));
    plinth.position.set(BARS.x[1], 0.07, BARS.z); scene.add(plinth);
    const bars = CH.map((c, k) => {
      const ghost = new Mesh(new BoxGeometry(0.7, BARS.max, 0.7), new MeshBasicMaterial({ color: c.hex, transparent: true, opacity: 0.1, depthWrite: false }));
      ghost.position.set(BARS.x[k], 0.14 + BARS.max / 2, BARS.z); ghost.userData.chan = k;
      const bar = new Mesh(new BoxGeometry(0.62, 1, 0.62), new MeshBasicMaterial({ color: c.hex }));
      bar.userData.chan = k;
      const ring = new Mesh(new BoxGeometry(0.9, 0.06, 0.9), new MeshBasicMaterial({ color: 0xffd36e }));
      ring.position.set(BARS.x[k], 0.17, BARS.z);
      scene.add(ghost, bar, ring);
      return { ghost, bar, ring, h: 0 };
    });
    const swatch = new Mesh(new BoxGeometry(1.5, 1.5, 0.16), new MeshBasicMaterial());
    swatch.position.set(BARS.x[1], 0.14 + BARS.max + 1.25, BARS.z); scene.add(swatch);
    const swBack = new Mesh(new BoxGeometry(1.7, 1.7, 0.1), new MeshBasicMaterial({ color: 0xffffff }));
    swBack.position.copy(swatch.position); swBack.position.z -= 0.08; scene.add(swBack);
    const lineGeo = new BufferGeometry().setFromPoints([V(0, 0, 0), V(0, 0, 0)]);
    const line = new Line(lineGeo, new LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55 }));
    scene.add(line);

    // 第一課的八個開關
    const row = makeBitRow({ n: 8, spacing: 1.05 });
    row.group.position.set(0.45, 0, 2.3);
    scene.add(row.group);
    scene.updateMatrixWorld(true);

    const lab = labeler($('.al-labels'), cv, camera);
    const lbBars = CH.map((c) => lab.add(`cp-lb cp-lb-ch cp-lb-${c.k.toLowerCase()}`, ''));
    const lbSw = lab.add('cp-lb cp-lb-end', 'this pixel<small>這個像素</small>');
    const lbRow = lab.add('cp-lb cp-lb-end', '');
    const tmp = V(0, 0, 0), tmp2 = V(0, 0, 0);

    function sync() {
      for (let i = 0; i < W * H; i++) {
        tilePos(i, tmp); if (i === state.sel) tmp.z += 0.16;
        m4.makeTranslation(tmp.x, tmp.y, tmp.z); tiles.setMatrixAt(i, m4);
        const p = state.px[i]; tiles.setColorAt(i, col.setRGB(p[0] / 255, p[1] / 255, p[2] / 255, 'srgb'));
      }
      tiles.instanceMatrix.needsUpdate = true; tiles.instanceColor.needsUpdate = true;
      tilePos(state.sel, frame.position); frame.position.z += 0.1;
      const p = state.px[state.sel];
      swatch.material.color.setRGB(p[0] / 255, p[1] / 255, p[2] / 255, 'srgb');
      bars.forEach((b, k) => { b.target = 0.02 + (p[k] / 255) * BARS.max; b.ring.visible = k === state.chan; });
      lbBars.forEach((l, k) => { l.innerHTML = `${CH[k].k} ${p[k]}<small>${CH[k].zh}</small>`; l.classList.toggle('is-on', k === state.chan); });
      lbRow.innerHTML = `${CH[state.chan].en} = ${p[state.chan]}<small>${CH[state.chan].zh}＝${p[state.chan]}</small>`;
      toBits(p[state.chan], 8).forEach((b, i) => row.set(i, b));
      tilePos(state.sel, tmp); tmp.z += 0.24; tmp2.copy(swatch.position); tmp2.x -= 0.85;
      lineGeo.setFromPoints([tmp.clone(), tmp2.clone()]);
    }

    function fit(w, h) {
      const vf = MathUtils.degToRad(camera.fov / 2);
      const hf = Math.atan(Math.tan(vf) * camera.aspect);
      return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf));
    }
    const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
    function goHome(instant) {
      let t, p;
      if (state.view === 'wall') { t = V(WALL.x, WALL.y, WALL.z); p = V(0.12, 0.05, 1).normalize().multiplyScalar(fit(W * PITCH + 0.9, H * PITCH + 0.9)).add(t); }
      else if (state.view === 'far') { t = V(WALL.x, WALL.y, WALL.z); p = V(0.05, 0.03, 1).normalize().multiplyScalar(fit(W * PITCH + 0.9, H * PITCH + 0.9) * 7).add(t); }
      else { t = V(-0.4, 2.75, 0); p = V(0, 0.3, 1).normalize().multiplyScalar(fit(11.3, 7.3)).add(t); }
      if (instant) { camera.position.copy(p); controls.target.copy(t); fly.t = 1; return; }
      fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0;
    }
    function labels() {
      const on = state.labels && state.view === 'all';
      lbBars.forEach((l, k) => { l.hidden = !on; if (on) lab.place(l, tmp.set(BARS.x[k], 0.14 + bars[k].h, BARS.z), -18); });
      lbSw.hidden = !on || root.classList.contains('cp-narrow');
      if (!lbSw.hidden) lab.place(lbSw, tmp.copy(swatch.position).setY(swatch.position.y + 0.85), -12);
      lbRow.hidden = !on;
      if (on) lab.place(lbRow, tmp.set(row.group.position.x, 1.75, row.group.position.z), 0);
    }
    function render() { controls.update(); labels(); renderer.render(scene, camera); }
    function tick(dt) {
      bars.forEach((b, k) => {
        b.h += ((b.target ?? 0) - b.h) * Math.min(1, dt * 12);
        b.bar.scale.y = Math.max(0.001, b.h); b.bar.position.set(BARS.x[k], 0.14 + b.h / 2, BARS.z);
      });
      row.update(dt);
      if (fly.t < 1) {
        fly.t = Math.min(1, fly.t + dt / (state.view === 'far' ? 1.8 : 1.1));
        const k = MathUtils.smootherstep(fly.t, 0, 1);
        camera.position.lerpVectors(fly.p0, fly.p1, k);
        controls.target.lerpVectors(fly.t0, fly.t1, k);
      }
    }

    const ray = new Raycaster(), ndc = new Vector2();
    const cast = (e) => { const r = cv.getBoundingClientRect(); ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1); ray.setFromCamera(ndc, camera); };
    function pick(e) {
      cast(e);
      const b = row.hit(ray);
      if (b >= 0) return { bit: b };
      const t = ray.intersectObject(tiles, false)[0];
      if (t) return { tile: t.instanceId };
      const c = ray.intersectObjects(bars.flatMap((x) => [x.bar, x.ghost]), false)[0];
      if (c) return { chan: c.object.userData.chan };
      return null;
    }
    let down = null;
    cv.addEventListener('pointerdown', (e) => { down = { x: e.clientX, y: e.clientY }; });
    cv.addEventListener('pointerup', (e) => {
      if (!down) return;
      const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y); down = null;
      if (moved > 6) return;
      const h = pick(e);
      if (!h) return;
      user();
      if (h.bit !== undefined) { const bits = toBits(value(), 8); bits[h.bit] = bits[h.bit] ? 0 : 1; setValue(fromBits(bits)); }
      else if (h.tile !== undefined) select(h.tile);
      else setChan(h.chan);
      told();
    });
    cv.addEventListener('pointermove', (e) => { if (e.pointerType !== 'mouse') return; const h = pick(e); row.hover(h && h.bit !== undefined ? h.bit : -1); cv.style.cursor = h ? 'pointer' : ''; });
    $('.al-home').addEventListener('click', () => goHome(false));

    let band0 = null;
    function resize() {
      const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.fov = camera.aspect < 1.1 ? 42 : 34;
      camera.updateProjectionMatrix();
      root.classList.toggle('cp-narrow', w < 520);
      const band = camera.aspect < 0.9 ? 0 : camera.aspect < 1.25 ? 1 : 2;
      if (band !== band0) { band0 = band; goHome(true); }
    }
    new ResizeObserver(resize).observe(spaceWrap);
    resize();
    return { camera, controls, scene, row, sync, render, tick, goHome, bars };
  }
  view = make3D();
  if (!view) root.classList.add('al-nogl');

  // ── 卡片示範 ──────────────────────────────────────────────────────────
  const play = (list) => { script = { t: 0, list }; };
  const DEMO = {
    far() {
      script = null; reset(); select(START); setView('far', true);
      say('From far away it is an apple. Now watch as we walk up to the screen.', '遠遠看是一顆蘋果。現在走近螢幕看看。');
      play([{ at: 1.6, fn: () => { setView('wall'); } }, { at: 4.2, fn: () => say('Up close it is 256 squares, 16 across and 16 down. Each square is one pixel, and each pixel is a single flat color.', '近看是 256 個方塊，橫 16 個、直 16 個。每個方塊是一個像素，每個像素只有一種顏色。') }]);
    },
    rgb() {
      script = null; reset(); setView('all'); select(START); setChan(0);
      say('One red pixel from the apple. It is stored as three numbers: red 214, green 40, blue 40.', '蘋果上的一個紅色像素，存成三個數：紅 214、綠 40、藍 40。');
      play([{ at: 2.6, fn: () => { select(3 * W + 11); say('A green pixel from the leaf: red 56, green 160, blue 72. Tap any square to read its three numbers.', '葉子上的一個綠色像素：紅 56、綠 160、藍 72。點任何一格，都可以讀出它的三個數。'); } }]);
    },
    switch() {
      script = null; reset(); setView('all'); select(START); setChan(0);
      say('The eight switches from Lesson 1 hold this pixel’s red: 1101 0110 = 214. Watch the pixel as the switches change.', '第一課的八個開關，現在存的是這個像素的紅：1101 0110＝214。看開關變的時候，像素怎麼變。');
      play([
        { at: 2.2, fn: () => { setValue(0); say('All eight off: red is 0. With only green 40 and blue 40 left, the pixel is nearly black.', '八個全關：紅是 0。只剩綠 40、藍 40，這個像素幾乎是黑的。'); } },
        { at: 5.0, fn: () => { setValue(255); say('All eight on: red is 255, as red as this screen can make it.', '八個全開：紅是 255，這個螢幕能做出的最紅。'); } },
        { at: 7.8, fn: () => { setValue(214); told(); } },
      ]);
    },
    same() {
      script = null; reset(); setView('all'); select(START); setChan(0); setValue(65);
      say('The switches now say 0100 0001. Read as a number, that is 65. Read with the ASCII table, it is the letter A. Read as an amount of red, it is 25% red. Same bits, three meanings.',
          '開關現在是 0100 0001。當成數來讀是 65；照 ASCII 表來讀是字母 A；當成紅色的量是 25% 的紅。同樣的位元，三種意思。');
    },
  };

  let raf = 0, last = 0, visible = false;
  function step(dt) {
    state.t += dt;
    if (script) {
      script.t += dt;
      while (script && script.list.length && script.t >= script.list[0].at) script.list.shift().fn();
      if (script && !script.list.length) script = null;
    }
    if (view) view.tick(dt);
  }
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    step(dt);
    if (view) view.render();
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  press('[data-view]', 'data-view', 'all');
  show();
  told();
  root.classList.add('al-ready', 'al-fresh');

  root.__lab = {
    state, view, select, setChan, setValue, setRGB, setView, reset, value,
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => view && view.goHome(true),
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { step(0); if (view) view.render(); },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() {
  const c = document.querySelector('[data-cp-chars]'); if (c) initChars(c);
  const d = document.querySelector('[data-cp-draw]'); if (d) initDraw(d);
  const s = document.querySelector('[data-cp-sound]'); if (s) initSound(s);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-comppixels-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
