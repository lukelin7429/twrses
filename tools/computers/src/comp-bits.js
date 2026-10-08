/*
 * 電腦概論 · 第一課「電腦為什麼只用 0 和 1？」的 3D 模型（全部自繪示意）。
 *
 * 一個機制：**開和關最不容易弄錯；一排開關就能數很大的數**。
 * 一塊木板上八組「撥桿開關＋燈泡」（bits3d.js）：最右邊是 1，往左是 2、4、8……128。
 *   點任何一組（或右邊的位元列按鈕）  撥開關；上方即時顯示十進位的數字、算式（8 + 4 + 1 = 13）和二進位寫法
 *   .cp-add          加一：進位像骨牌一樣從右往左傳（一顆青色小球從這盞燈跳到左邊那盞）
 *   .al-play         往上數／暫停：一直加一
 *   data-speed       0.5／1／4 倍
 *   .cp-reset        全部關掉
 *   data-t="values"  位值牌；data-t="labels"  燈泡上方的 0／1 標籤
 * 255 再加一：八盞全滅，進位小球從最左邊飛出去（溢位）——八個開關裝不下 256。
 *
 * 控制器（state、進位的時間軸）不靠 WebGL：瀏覽器不支援 WebGL 時 3D 不畫，右邊的位元列照樣能撥、能數。
 * 2D（不需要 WebGL）：用五根手指數到 31、猜猜這是多少、為什麼不用十種亮度、卡片小圖（bits2d.js）。
 *
 * 產物：cd tools/computers && npm run build → assets/js/comp-bits.js
 * 除錯：document.querySelector('[data-compbits-lab]').__lab
 *   set(n)、toggle(i)、addOne()、setPlaying(bool)、setSpeed(0.5|1|4)、demo('one'|'places'|'carry'|'max')、
 *   run(秒) 直接把時間往前推、goCam() 直接到最終構圖、render()
 */
import {
  AmbientLight, CircleGeometry, Color, DirectionalLight, HemisphereLight, MathUtils, Mesh, MeshStandardMaterial, PCFShadowMap,
  PerspectiveCamera, Raycaster, Scene, Vector2, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { bitString, fromBits, maxValue, rippleSteps, sumText, toBits } from './bits.js';
import { drawMinis, initFingers, initGuess, initLevels } from './bits2d.js';
import { makeBitRow } from './bits3d.js';
import { labeler, lazyBoot } from './common.js';

const N = 8;
const HOP = 0.45;      // 1 倍速時，進位傳一位要幾秒
const GAP = 0.75;      // 自動往上數時，兩次加一之間停幾秒
const V = (x, y, z) => new Vector3(x, y, z);

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const spaceWrap = $('.al-space');
  const cv = $('.al-space-cv');
  const R = { num: $('.cp-num'), eq: $('.cp-eq'), bin: $('.cp-bin'), msg: $('.cp-msg'), play: $('.al-play'), strip: [...$$('[data-bit]')] };
  const state = { bits: toBits(0, N), playing: false, speed: 1, labels: true, values: true, t: 0 };
  let ripple = null;      // { steps, k, wait, from, hop }
  let pause = 0;          // 自動數：離下一次加一還有幾秒
  let script = null;      // 卡片示範：[{ at, fn }]
  let view = null;        // 3D（沒有 WebGL 時是 null）

  const value = () => fromBits(state.bits);
  const say = (en, zh) => { R.msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };

  function show(pending) {
    const v = pending ?? value(), bits = pending === undefined ? state.bits : toBits(pending, N);
    R.num.textContent = String(v);
    R.eq.textContent = sumText(bits);
    R.bin.textContent = bitString(bits);
    R.strip.forEach((b) => {
      const i = Number(b.getAttribute('data-bit')), on = state.bits[i];
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.querySelector('b').textContent = String(on);
    });
    root.classList.toggle('cp-carrying', !!ripple);
  }
  function setBit(i, on, instant) {
    state.bits[i] = on ? 1 : 0;
    if (view) view.row.set(i, on, instant);
  }
  function set(n, instant = false) {
    ripple = null; pause = 0;
    toBits(n, N).forEach((b, i) => setBit(i, b, instant));
    show();
  }
  function stopAll() { script = null; if (state.playing) setPlaying(false); }

  function toggle(i) {
    if (ripple) return;
    stopAll();
    setBit(i, !state.bits[i]);
    show();
    const v = value();
    say(`${state.bits[i] ? 'On' : 'Off'}: the switch worth ${2 ** i}. The row now shows ${v}.`,
        `${state.bits[i] ? '打開' : '關掉'}代表 ${2 ** i} 的開關，這一排現在是 ${v}。`);
  }
  function addOne() {
    if (ripple) return false;
    ripple = { steps: rippleSteps(state.bits), k: 0, wait: 0, from: value(), hop: HOP };
    say('Adding one…', '加一……');
    root.classList.add('cp-carrying');
    return true;
  }
  function settle() {
    const { steps, from } = ripple, over = steps[steps.length - 1].carry, moved = steps.length;
    ripple = null; pause = GAP;
    show();
    if (over) {
      say(`${from} + 1 does not fit. All ${N} switches flipped off and the carry fell off the left end: ${N} switches can only count to ${maxValue(N)}. A ninth switch would be worth 256.`,
          `${from}＋1 裝不下了。${N} 個開關全部關掉，進位從最左邊掉出去：${N} 個開關最多只能數到 ${maxValue(N)}，第九個開關才代表 256。`);
    } else if (moved === 1) {
      say(`${from} + 1 = ${value()}. The rightmost switch was off, so it just turned on. No carry.`,
          `${from}＋1＝${value()}。最右邊的開關本來是關的，打開就好，不用進位。`);
    } else {
      say(`${from} + 1 = ${value()}. ${moved} switches moved: ${moved - 1} turned off and passed a carry to the left, like dominoes, and the last one turned on.`,
          `${from}＋1＝${value()}。動了 ${moved} 個開關：${moved - 1} 個關掉並往左進位，像骨牌一樣一個推一個，最後一個打開。`);
    }
  }

  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Count up · 往上數';
    root.classList.remove('al-fresh');
    if (v) pause = 0;
  }
  const press = (sel, attr, v) => $$(sel).forEach((b) => b.setAttribute('aria-pressed', b.getAttribute(attr) === String(v) ? 'true' : 'false'));
  function setSpeed(v) { state.speed = v; press('[data-speed]', 'data-speed', v); }

  /** 時間往前走 dt 秒：進位一位一位傳、自動往上數、卡片示範的劇本 */
  function step(dt) {
    const d = dt * state.speed;
    state.t += dt;
    if (script) {
      script.t += dt;
      while (script && script.list.length && script.t >= script.list[0].at) script.list.shift().fn();
      if (script && !script.list.length) script = null;
    }
    if (ripple) {
      ripple.wait -= d;
      while (ripple && ripple.wait <= 0) {
        if (ripple.k >= ripple.steps.length) { settle(); break; }
        const s = ripple.steps[ripple.k++];
        setBit(s.i, s.to);
        R.strip.forEach((b) => { if (Number(b.getAttribute('data-bit')) === s.i) { b.setAttribute('aria-pressed', s.to ? 'true' : 'false'); b.querySelector('b').textContent = String(s.to); } });
        if (s.carry && view) view.row.carry(s.i, ripple.hop / state.speed);
        ripple.wait += s.carry ? ripple.hop : ripple.hop * 0.6;
      }
    } else if (state.playing) {
      pause -= d;
      if (pause <= 0) addOne();
    }
    if (view) view.row.update(dt);
  }

  // ── 3D ──────────────────────────────────────────────────────────────
  function make3D() {
    let renderer;
    try { renderer = new WebGLRenderer({ canvas: cv, antialias: true }); } catch (e) { return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFShadowMap;
    const scene = new Scene();
    scene.background = new Color(0x0b1326);
    const camera = new PerspectiveCamera(34, 1, 0.05, 200);
    const controls = new OrbitControls(camera, cv);
    controls.enableDamping = true; controls.dampingFactor = 0.08;
    controls.minDistance = 2; controls.maxDistance = 40;
    controls.maxPolarAngle = Math.PI * 0.49;
    scene.add(new HemisphereLight(0xdfe8ff, 0x1a1410, 0.75));
    scene.add(new AmbientLight(0xffffff, 0.18));
    const sun = new DirectionalLight(0xfff1dc, 1.25);
    sun.position.set(-4, 9, 6); sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -7, right: 7, top: 4, bottom: -4, near: 1, far: 25 });
    sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.02;
    scene.add(sun);
    const floor = new Mesh(new CircleGeometry(90, 64), new MeshStandardMaterial({ color: 0x121c36, roughness: 0.95 }));
    floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);

    const row = makeBitRow({ n: N });
    scene.add(row.group);
    scene.updateMatrixWorld(true);
    state.bits.forEach((b, i) => row.set(i, b, true));

    const lab = labeler($('.al-labels'), cv, camera);
    const lbs = state.bits.map(() => lab.add('cp-lb', '0'));
    const lbCarry = lab.add('cp-lb cp-lb-carry', 'carry<small>進位</small>');
    const lbEnds = [lab.add('cp-lb cp-lb-end', 'worth 1<small>代表 1</small>'), lab.add('cp-lb cp-lb-end', `worth ${2 ** (N - 1)}<small>代表 ${2 ** (N - 1)}</small>`)];
    const tmp = V(0, 0, 0);

    function fit(w, h) {
      const vf = MathUtils.degToRad(camera.fov / 2);
      const hf = Math.atan(Math.tan(vf) * camera.aspect);
      return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf));
    }
    const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
    function goHome(instant) {
      const t = V(0, 0.65, 0), p = V(0, 0.52, 1).normalize().multiplyScalar(fit(row.width + 1.1, 3.6)).add(t);
      if (instant) { camera.position.copy(p); controls.target.copy(t); fly.t = 1; return; }
      fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0;
    }
    function labels() {
      const on = state.labels;
      lbs.forEach((l, i) => {
        l.hidden = !on;
        if (!on) return;
        const b = row.get(i);
        if (l.textContent !== String(b)) l.textContent = String(b);
        l.classList.toggle('is-on', !!b);
        lab.place(l, row.bulbPos(i, tmp), -34 * (cv.clientHeight / 640 + 0.35));
      });
      lbCarry.hidden = !row.carryAt;
      if (row.carryAt) lab.place(lbCarry, tmp.copy(row.carryAt).applyMatrix4(row.group.matrixWorld), -22);
      const narrow = root.classList.contains('cp-narrow');
      lbEnds.forEach((l, k) => {
        l.hidden = !on || narrow || state.values;
        if (!l.hidden) lab.place(l, tmp.set(row.x(k ? N - 1 : 0), 0.3, 1.25), 0);
      });
    }
    function render() { controls.update(); labels(); renderer.render(scene, camera); }
    function tick(dt) {
      if (fly.t < 1) {
        fly.t = Math.min(1, fly.t + dt / 1.0);
        const k = MathUtils.smootherstep(fly.t, 0, 1);
        camera.position.lerpVectors(fly.p0, fly.p1, k);
        controls.target.lerpVectors(fly.t0, fly.t1, k);
      }
    }

    // 點一下撥開關（拖曳超過幾個像素算旋轉，不算點）
    const ray = new Raycaster(), ndc = new Vector2();
    const at = (e) => { const r = cv.getBoundingClientRect(); ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1); ray.setFromCamera(ndc, camera); return row.hit(ray); };
    let down = null;
    cv.addEventListener('pointerdown', (e) => { down = { x: e.clientX, y: e.clientY }; });
    cv.addEventListener('pointerup', (e) => {
      if (!down) return;
      const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y); down = null;
      if (moved > 6) return;
      const i = at(e);
      if (i >= 0) toggle(i);
    });
    cv.addEventListener('pointermove', (e) => { if (e.pointerType !== 'mouse') return; const i = at(e); row.hover(i); cv.style.cursor = i >= 0 ? 'pointer' : ''; });
    cv.addEventListener('pointerleave', () => row.hover(-1));
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
    return { row, camera, controls, scene, render, tick, goHome };
  }
  view = make3D();
  if (!view) root.classList.add('al-nogl');

  // ── 右邊的按鈕 ────────────────────────────────────────────────────────
  R.strip.forEach((b) => b.addEventListener('click', () => toggle(Number(b.getAttribute('data-bit')))));
  $('.cp-add').addEventListener('click', () => { stopAll(); addOne(); });
  $('.cp-reset').addEventListener('click', () => { stopAll(); set(0); say('All off: zero.', '全部關掉，就是 0。'); });
  R.play.addEventListener('click', () => { script = null; setPlaying(!state.playing); });
  $$('[data-speed]').forEach((b) => b.addEventListener('click', () => setSpeed(Number(b.getAttribute('data-speed')))));
  const tgL = $('[data-t="labels"]'), tgV = $('[data-t="values"]');
  if (tgL) tgL.addEventListener('change', () => { state.labels = tgL.checked; });
  if (tgV) tgV.addEventListener('change', () => { state.values = tgV.checked; root.classList.toggle('cp-novalues', !tgV.checked); if (view) view.row.setPlates(tgV.checked); });

  // ── 卡片示範 ──────────────────────────────────────────────────────────
  const play = (list) => { script = { t: 0, list }; };
  const DEMO = {
    one() {
      stopAll(); set(0); setSpeed(1);
      say('One switch has only two states: off is 0, on is 1.', '一個開關只有兩種狀態：關是 0，開是 1。');
      play([{ at: 0.9, fn: () => { setBit(0, 1); show(); } }, { at: 2.0, fn: () => { setBit(0, 0); show(); } }, { at: 3.1, fn: () => { setBit(0, 1); show(); say('Off, on. 0, 1. That is one bit.', '關、開；0、1。這就是一個位元。'); } }]);
    },
    places() {
      stopAll(); set(0); setSpeed(1);
      say('One light at a time, from right to left: each place is worth double the one before.', '由右往左，一次只亮一盞：每一位代表的數都是右邊那一位的兩倍。');
      play(Array.from({ length: N }, (_, i) => ({ at: 0.8 + i * 0.9, fn: () => { set(2 ** i); say(`This switch alone is worth ${2 ** i}.`, `只開這一個，就是 ${2 ** i}。`); } })));
    },
    carry() {
      stopAll(); set(127); setSpeed(0.5);
      say('127: seven switches are on. Now watch what adding one does.', '127：七個開關都開著。看看再加一會怎樣。');
      play([{ at: 1.4, fn: () => addOne() }]);
    },
    max() {
      stopAll(); set(maxValue(N)); setSpeed(1);
      say(`All ${N} on: 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = ${maxValue(N)}. That is the biggest number this row can show. Now add one more…`,
          `${N} 個全開：128＋64＋32＋16＋8＋4＋2＋1＝${maxValue(N)}，這一排最多就是這個數。再加一看看……`);
      play([{ at: 3.2, fn: () => addOne() }]);
    },
  };

  let raf = 0, last = 0, visible = false;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    step(dt);
    if (view) { view.tick(dt); view.render(); }
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  setSpeed(1);
  setPlaying(false);
  set(13, true);
  say('This row shows 13: the switches worth 8, 4, and 1 are on. Tap any switch to flip it.', '這一排現在是 13：代表 8、4、1 的開關開著。點任何一個開關，把它撥過去。');
  root.classList.add('al-ready', 'al-fresh');

  root.__lab = {
    state, view, set, toggle, addOne, setPlaying, setSpeed, value,
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => view && view.goHome(true),
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { step(0); if (view) view.render(); },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() {
  drawMinis();
  const f = document.querySelector('[data-cp-fingers]'); if (f) initFingers(f);
  const g = document.querySelector('[data-cp-guess]'); if (g) initGuess(g);
  const l = document.querySelector('[data-cp-levels]'); if (l) initLevels(l);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-compbits-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
