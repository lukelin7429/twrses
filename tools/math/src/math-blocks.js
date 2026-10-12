/*
 * 看得見的數學 · 第一課「為什麼我們十個一數？」的 3D 模型（全部自繪示意）。
 *
 * 一個想法：**位值——滿十個就換成一個大的；改成滿五個、滿二個就換，也是同一條規則**。
 * 桌上四格（個位在最右邊）：小方塊（1）、長條（10）、平板（100）、大方塊（1,000）。
 *   .mth-add         加一：多一個小方塊；那一格滿了（十個）就縫合成一根長條，「喀」一聲搬到左邊那一格；
 *                    左邊那一格也滿了就再併一次
 *   .al-play         往上數／暫停
 *   data-speed       0.5／1／4／16 倍
 *   .mth-go          直接顯示輸入的數（.mth-in）
 *   .mth-reset       歸零
 *   data-base        幾個換一個：10／5／2（積木的大小跟著變；範圍 0–9,999／0–624／0–255）
 *   data-t="digits"  每一格前面的數字標籤；data-t="sound"  併起來時的「喀」
 *
 * 畫面上的數字永遠等於積木代表的量：加一的瞬間數字就變了，進位只是「同樣多的東西換一種包法」，
 * 所以進位過程中數字不動，變的只有每一格的個數（剛滿的那一格會短暫顯示 10）。
 *
 * 控制器（state、進位的時間軸）不靠 WebGL：瀏覽器不支援 WebGL 時 3D 不畫，右邊的數字、位值列與按鈕照樣能用。
 * 2D（不需要 WebGL）：這堆積木是多少、同一個數三種寫法、卡片小圖（place2d.js）。
 *
 * 產物：cd tools/math && npm run build → assets/js/math-blocks.js
 * 除錯：document.querySelector('[data-mathblocks-lab]').__lab
 *   set(n)、addOne()、setBase(10|5|2)、setPlaying(bool)、setSpeed(n)、demo('ten'|'hundred'|'zero'|'two')、
 *   run(秒) 直接把時間往前推、goCam()、render()、value()（顯示的數）、counts()（控制器的各位個數）、
 *   blocks()（畫面上實際的積木：{ counts, value }）、check()（三者一致就回傳 true）
 */
import {
  AmbientLight, CircleGeometry, Color, DirectionalLight, HemisphereLight, MathUtils, Mesh, MeshStandardMaterial, PCFShadowMap,
  PerspectiveCamera, Scene, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { makeBlocks, pieceCss } from './blocks3d.js';
import { labeler, lazyBoot } from './common.js';
import { enWords, placeNameEn, placeNameZh, placeOneEn, zhWords, baseDigitsEn, baseDigitsZh } from './names.js';
import { WIDTHS, fromDigits, groupThousands, maxValue, numeral, placeValue, toDigits } from './place.js';
import { drawMinis, initPile, initSame } from './place2d.js';

const T = { spawn: 0.34, full: 0.42, squeeze: 0.42, travel: 0.58, gap: 0.3 };   // 1 倍速時各階段幾秒
const V = (x, y, z) => new Vector3(x, y, z);
const BASE_EN = { 10: 'ten', 5: 'five', 2: 'two' };
const BASE_ZH = { 10: '十', 5: '五', 2: '二' };

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const spaceWrap = $('.al-space');
  const cv = $('.al-space-cv');
  const R = { num: $('.mth-num'), name: $('.mth-name'), eq: $('.mth-eq'), basew: $('.mth-basew'), basek: $('.mth-basek'), basen: $('.mth-basen'), strip: $('.mth-strip'), msg: $('.mth-msg'), play: $('.al-play'), input: $('.mth-in'), range: $('.mth-range') };
  const state = { base: 10, width: WIDTHS[10], counts: [0, 0, 0, 0], playing: false, speed: 1, digits: true, sound: true, t: 0 };
  let op = null;          // 進位的時間軸：{ from, i, phase, wait, carries }
  let pause = 0;          // 自動數：離下一次加一還有幾秒
  let script = null;      // 卡片示範：{ t, list: [{ at, fn }] }
  let view = null;        // 3D（沒有 WebGL 時是 null）

  const max = () => maxValue(state.width, state.base);
  /** 顯示的數：各位個數 × 位值。進位途中某一位可以暫時是 base 個，總和不變。 */
  const value = () => fromDigits(state.counts, state.base);
  const say = (en, zh) => { R.msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  const one = (i) => (state.base === 10 ? ['one', 'ten', 'hundred', 'thousand'][i] : placeOneEn(i, state.base));
  const many = (i) => placeNameEn(i, state.base);
  const zhp = (i) => (state.base === 10 ? ['一', '十', '百', '千'][i] : placeNameZh(i, state.base));

  // ── 聲音：併起來時「喀」一聲（瀏覽器自己合成，不載任何音檔）──────────────────
  let actx = null;
  function click(i) {
    if (!state.sound) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state === 'suspended') actx.resume();
      const t = actx.currentTime, o = actx.createOscillator(), g = actx.createGain();
      o.type = 'triangle';
      o.frequency.setValueAtTime(1500 - i * 260, t);
      o.frequency.exponentialRampToValueAtTime(260 - i * 30, t + 0.07);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.32, t + 0.004);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.11);
      o.connect(g).connect(actx.destination);
      o.start(t); o.stop(t + 0.13);
    } catch (e) { /* 沒有聲音也照樣能用 */ }
  }

  function buildStrip() {
    R.strip.innerHTML = '';
    R.strip.style.setProperty('--n', String(state.width));
    for (let i = state.width - 1; i >= 0; i--) {
      const d = document.createElement('span');
      d.className = 'mth-pl'; d.setAttribute('data-place', String(i));
      d.style.setProperty('--pc', pieceCss(i));
      d.innerHTML = `<small>${groupThousands(placeValue(i, state.base))}</small><b>0</b>`;
      R.strip.appendChild(d);
    }
    R.strip.setAttribute('aria-label', state.base === 10
      ? 'Place values from thousands on the left to ones on the right · 位值：左邊是千位，最右邊是個位'
      : `Place values in base ${BASE_EN[state.base]}; the rightmost place is worth 1 · ${BASE_ZH[state.base]}個一數的位值，最右邊代表 1`);
  }
  function show() {
    const v = value(), b = state.base;
    R.num.textContent = groupThousands(v);
    R.name.innerHTML = `${enWords(v)}<span class="zh">${zhWords(v)}</span>`;
    R.strip.querySelectorAll('.mth-pl').forEach((d) => {
      const i = Number(d.getAttribute('data-place')), c = state.counts[i];
      d.querySelector('b').textContent = String(c);
      d.classList.toggle('is-full', c >= b);
      d.classList.toggle('is-zero', c === 0);
    });
    const settled = state.counts.every((c) => c < b);
    const digits = settled ? state.counts : toDigits(v, b, state.width);
    const hi = Math.max(0, digits.reduce((m, d, i) => (d ? i : m), 0));
    const parts = [];
    for (let i = hi; i >= 0; i--) parts.push(b === 10 ? groupThousands(digits[i] * placeValue(i, b)) : `${digits[i]} × ${placeValue(i, b)}`);
    R.eq.textContent = b === 10 ? parts.join(' + ') : `${parts.join(' + ')} = ${v}`;
    const num = numeral(digits);
    R.basek.textContent = `Counting by ${BASE_EN[b]}s, you write · ${BASE_ZH[b]}個一數，寫成`;
    R.basen.textContent = num;
    R.basen.setAttribute('aria-label', `${baseDigitsEn(num)} · ${baseDigitsZh(num)}`);
    root.classList.toggle('mth-carrying', !!op);
  }
  function setCounts(counts, instant = true) {
    state.counts = counts.slice();
    if (view) { view.blocks.set(state.counts); if (instant) view.refit(true); }
  }
  function set(n, quiet) {
    op = null; pause = 0;
    const v = Math.max(0, Math.min(max(), Math.floor(Number(n) || 0)));
    setCounts(toDigits(v, state.base, state.width));
    show();
    if (!quiet) {
      const d = toDigits(v, 10);
      if (state.base === 10) {
        const en = [], zh = [];
        for (let i = d.length - 1; i >= 0; i--) { en.push(`${d[i]} ${d[i] === 1 ? one(i) : many(i)}`); zh.push(`${d[i]} 個${zhp(i)}`); }
        const zeros = d.some((x, i) => x === 0 && i < d.length - 1) && v > 0;
        say(`${groupThousands(v)} is ${en.join(', ')}.${zeros ? ' The 0 holds the place of the kind of block that is missing.' : ''}`,
            `${groupThousands(v)} 是 ${zh.join('、')}。${zeros ? '那個 0 是在替「一個也沒有」的那種積木佔位子。' : ''}`);
      } else {
        const num = numeral(state.counts);
        say(`${v} things, traded ${BASE_EN[state.base]} at a time, are written ${num}.`,
            `${v} 個東西，滿${BASE_ZH[state.base]}個就換，寫成 ${num}。`);
      }
    }
    return v;
  }
  function stopAll() { script = null; if (state.playing) setPlaying(false); }

  function addOne() {
    if (op) return false;
    if (value() >= max()) {
      if (state.playing) setPlaying(false);
      say(`${groupThousands(max())} is as far as ${state.width} places can go when you trade ${BASE_EN[state.base]} at a time. One more would need a new place on the left, worth ${groupThousands(placeValue(state.width, state.base))}.`,
          `滿${BASE_ZH[state.base]}個就換的話，${state.width} 位最多只能寫到 ${groupThousands(max())}。再多一個，左邊就要多開一位，代表 ${groupThousands(placeValue(state.width, state.base))}。`);
      return false;
    }
    op = { from: value(), i: 0, phase: 'spawn', wait: T.spawn, carries: 0 };
    state.counts[0]++;
    if (view) view.blocks.spawn(0, T.spawn / state.speed);
    show();
    return true;
  }
  function advance() {
    const b = state.base, i = op.i;
    if (op.phase === 'spawn' || op.phase === 'arrive') {
      if (state.counts[i] >= b) {
        op.phase = 'full'; op.wait += T.full;
        say(`${b} ${many(i)} in one place: that is too many for one digit. Trade them for 1 ${one(i + 1)}.`,
            `這一格有 ${b} 個${zhp(i)}，一個數字寫不下了。換成 1 個${zhp(i + 1)}。`);
        show();
      } else settle();
    } else if (op.phase === 'full') {
      op.phase = 'squeeze'; op.wait += T.squeeze;
      if (view) view.blocks.squeeze(i, T.squeeze / state.speed);
    } else if (op.phase === 'squeeze') {
      state.counts[i] = 0; state.counts[i + 1]++;
      op.carries++;
      click(i);
      if (view) { view.blocks.fuse(i); view.blocks.travel(i + 1, T.travel / state.speed); view.refit(true); }
      op.phase = 'travel'; op.wait += T.travel;
      show();
    } else if (op.phase === 'travel') {
      op.i++; op.phase = 'arrive'; op.wait += 0.05;
    }
  }
  function settle() {
    const { from, carries } = op, b = state.base, v = value();
    op = null; pause = T.gap;
    show();
    const a = groupThousands(from), c = groupThousands(v);
    if (carries === 0) {
      say(`${a} + 1 = ${c}. One more small cube, and nothing is full yet.`, `${a}＋1＝${c}。多一個小方塊，還沒有哪一格滿。`);
    } else {
      const en = [], zh = [];
      for (let i = 0; i < carries; i++) { en.push(`${b} ${many(i)} became 1 ${one(i + 1)}`); zh.push(`${b} 個${zhp(i)}換成 1 個${zhp(i + 1)}`); }
      const tail = b === 10
        ? [`The amount never changed; only the packing did. Each emptied place gets a 0.`, `東西一樣多，只是換了包法；空出來的那一格寫 0。`]
        : [`In this system the number is written ${numeral(state.counts)}.`, `用這種數法，這個數寫成 ${numeral(state.counts)}。`];
      say(`${a} + 1 = ${c}. ${en.join(', then ')}. ${tail[0]}`, `${a}＋1＝${c}。${zh.join('，接著 ')}。${tail[1]}`);
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
  function setBase(b, quiet) {
    if (!WIDTHS[b]) return;
    const keep = value();
    op = null; pause = 0;
    state.base = b; state.width = WIDTHS[b];
    press('[data-base]', 'data-base', b);
    root.setAttribute('data-mth-base', String(b));
    R.input.max = String(max());
    R.range.innerHTML = `0–${groupThousands(max())}`;
    const v = Math.min(keep, max());
    state.counts = toDigits(v, b, state.width);      // 先換成新進位制的各位數，再重建積木
    buildStrip();
    if (view) view.rebuild();
    set(v, true);
    if (!quiet) {
      const num = numeral(state.counts);
      const clipped = keep > max() ? [` (${groupThousands(keep)} does not fit in ${state.width} places here, so the model went back to ${groupThousands(v)}.)`, `（${groupThousands(keep)} 在這裡的 ${state.width} 位裝不下，所以退回 ${groupThousands(v)}。）`] : ['', ''];
      if (b === 10) say(`Trade at ten: ten ones make a ten, ten tens make a hundred, ten hundreds make a thousand.${clipped[0]}`, `滿十個就換：十個一是十，十個十是百，十個百是千。${clipped[1]}`);
      else if (b === 5) say(`Trade at five: five ones make a five, five fives make a twenty-five, and five of those make 125. The same ${v} things are now written ${num}.${clipped[0]}`, `滿五個就換：五個一換一個五，五個五換一個二十五，再五個換一個 125。同樣是 ${v} 個東西，現在寫成 ${num}。${clipped[1]}`);
      else say(`Trade at two: two ones make a two, two twos make a four, then 8, 16, and so on. Every place holds only 0 or 1, just like a computer. The same ${v} things are now written ${num}.${clipped[0]}`, `滿二個就換：兩個一換一個二，兩個二換一個四，再來是 8、16……每一位只有 0 或 1，和電腦一樣。同樣是 ${v} 個東西，現在寫成 ${num}。${clipped[1]}`);
    }
  }

  /** 時間往前走 dt 秒：進位的各個階段、自動往上數、卡片示範的劇本 */
  function step(dt) {
    const d = dt * state.speed;
    state.t += dt;
    if (script) {
      script.t += dt;
      while (script && script.list.length && script.t >= script.list[0].at) script.list.shift().fn();
      if (script && !script.list.length) script = null;
    }
    if (op) {
      op.wait -= d;
      let guard = 0;
      while (op && op.wait <= 0 && guard++ < 40) advance();
    } else if (state.playing) {
      pause -= d;
      if (pause <= 0) addOne();
    }
    if (view) view.blocks.update(dt);
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
    controls.minDistance = 1.2; controls.maxDistance = 40;
    controls.maxPolarAngle = Math.PI * 0.49;
    scene.add(new HemisphereLight(0xdfe8ff, 0x1a1410, 0.85));
    scene.add(new AmbientLight(0xffffff, 0.22));
    const sun = new DirectionalLight(0xfff1dc, 1.3);
    sun.position.set(-5, 10, 7); sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -8, right: 8, top: 8, bottom: -8, near: 1, far: 30 });
    sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.02;
    scene.add(sun);
    const floor = new Mesh(new CircleGeometry(90, 64), new MeshStandardMaterial({ color: 0x121c36, roughness: 0.95 }));
    floor.rotation.x = -Math.PI / 2; floor.position.y = -0.04; floor.receiveShadow = true; scene.add(floor);

    const lab = labeler($('.al-labels'), cv, camera);
    const api = { blocks: null, camera, controls, scene };
    let lbs = [];
    function rebuild() {
      if (api.blocks) scene.remove(api.blocks.group);
      lbs.forEach((l) => l.remove());
      api.blocks = makeBlocks({ base: state.base, width: state.width });
      scene.add(api.blocks.group);
      api.blocks.set(state.counts);
      lbs = api.blocks.cols.map((c) => {
        const l = lab.add('mth-lb', `<b>0</b><small>${state.base === 10 ? `${placeNameEn(c.i)} ${placeNameZh(c.i)}` : `× ${groupThousands(placeValue(c.i, state.base))}`}</small>`);
        l.style.setProperty('--pc', pieceCss(c.i));
        return l;
      });
      range = -1;
      refit(false);
    }

    function fit(w, h) {
      const vf = MathUtils.degToRad(camera.fov / 2);
      const hf = Math.atan(Math.tan(vf) * camera.aspect);
      return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf));
    }
    const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
    const DIR = V(0, 0.78, 1).normalize();
    let range = -1;
    /** 鏡頭要框到第幾位：有積木的最高位再多一位（進位要去的地方）；手機上畫面窄，只框到有積木的最高位 */
    const wanted = () => Math.min(state.width - 1, Math.max(1, state.counts.reduce((m, c, i) => (c ? i : m), 0) + (root.classList.contains('mth-narrow') ? 0 : 1)));
    function frame(hi, smooth, home) {
      const e = api.blocks.extent(hi);
      const t = V(e.cx, e.h * 0.28, e.cz * 0.9);
      const dir = home ? DIR.clone() : camera.position.clone().sub(controls.target).normalize();
      if (!Number.isFinite(dir.x) || dir.lengthSq() < 0.5) dir.copy(DIR);
      const p = dir.multiplyScalar(fit(e.w + 1.7, e.d * 0.7 + e.h * 0.9 + 1.2)).add(t);
      if (!smooth) { camera.position.copy(p); controls.target.copy(t); fly.t = 1; return; }
      fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0;
    }
    function refit(smooth) {
      const hi = wanted();
      if (hi === range) return;
      const first = range < 0;
      range = hi;
      frame(hi, smooth && !first, first);
    }
    function goHome(instant) { range = wanted(); frame(range, !instant, true); }
    const tmp = V(0, 0, 0);
    function labels() {
      lbs.forEach((l, i) => {
        l.hidden = !state.digits;
        if (l.hidden) return;
        const c = state.counts[i], b = l.firstChild;
        if (b.textContent !== String(c)) b.textContent = String(c);
        l.classList.toggle('is-full', c >= state.base);
        l.classList.toggle('is-zero', c === 0);
        lab.place(l, api.blocks.anchor(i, tmp), 26);
      });
    }
    function render() { controls.update(); labels(); renderer.render(scene, camera); }
    function tick(dt) {
      if (fly.t < 1) {
        fly.t = Math.min(1, fly.t + dt / 0.9);
        const k = MathUtils.smootherstep(fly.t, 0, 1);
        camera.position.lerpVectors(fly.p0, fly.p1, k);
        controls.target.lerpVectors(fly.t0, fly.t1, k);
      }
    }
    $('.al-home').addEventListener('click', () => goHome(false));

    let band0 = null;
    function resize() {
      const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.fov = camera.aspect < 1.1 ? 42 : 34;
      camera.updateProjectionMatrix();
      root.classList.toggle('mth-narrow', w < 520);
      const band = camera.aspect < 0.9 ? 0 : camera.aspect < 1.25 ? 1 : 2;
      if (band !== band0 && api.blocks) { band0 = band; range = -1; goHome(true); }
    }
    Object.assign(api, { rebuild, refit, goHome, render, tick });
    rebuild();
    new ResizeObserver(resize).observe(spaceWrap);
    resize();
    return api;
  }
  buildStrip();
  view = make3D();
  if (!view) root.classList.add('al-nogl');

  // ── 右邊的按鈕 ────────────────────────────────────────────────────────
  $('.mth-add').addEventListener('click', () => { stopAll(); addOne(); });
  $('.mth-reset').addEventListener('click', () => { stopAll(); set(0, true); say('Zero: the table is empty.', '0：桌上什麼都沒有。'); });
  const go = () => {
    stopAll();
    const raw = R.input.value.trim();
    if (!/^\d+$/.test(raw)) { say(`Type a whole number from 0 to ${groupThousands(max())}.`, `請輸入 0 到 ${groupThousands(max())} 的整數。`); return; }
    const n = Number(raw);
    if (n > max()) { say(`${groupThousands(n)} is too big for this table: ${state.width} places go up to ${groupThousands(max())}.`, `${groupThousands(n)} 太大了，這張桌子只有 ${state.width} 位，最多到 ${groupThousands(max())}。`); return; }
    set(n);
  };
  $('.mth-go').addEventListener('click', go);
  R.input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); go(); } });
  R.play.addEventListener('click', () => { script = null; setPlaying(!state.playing); });
  $$('[data-speed]').forEach((b) => b.addEventListener('click', () => setSpeed(Number(b.getAttribute('data-speed')))));
  $$('[data-base]').forEach((b) => b.addEventListener('click', () => { stopAll(); setBase(Number(b.getAttribute('data-base'))); }));
  const tgD = $('[data-t="digits"]'), tgS = $('[data-t="sound"]');
  if (tgD) tgD.addEventListener('change', () => { state.digits = tgD.checked; });
  if (tgS) tgS.addEventListener('change', () => { state.sound = tgS.checked; });

  // ── 卡片示範 ──────────────────────────────────────────────────────────
  const play = (list) => { script = { t: 0, list }; };
  const DEMO = {
    ten() {
      stopAll(); setBase(10, true); set(7, true); setSpeed(0.5);
      say('Seven small cubes. Watch the ones place fill up: 8, 9, and then…', '七個小方塊。看個位那一格慢慢滿起來：8、9，然後……');
      play([{ at: 1.2, fn: () => addOne() }, { at: 3.2, fn: () => addOne() }, { at: 5.4, fn: () => addOne() }]);
    },
    hundred() {
      stopAll(); setBase(10, true); set(99, true); setSpeed(0.5);
      say('99: nine tens and nine ones. Both places are one away from full. Now add one.', '99：九個十、九個一，兩格都只差一個就滿了。再加一看看。');
      play([{ at: 1.8, fn: () => addOne() }]);
    },
    zero() {
      stopAll(); setBase(10, true); setSpeed(1); set(35, true);
      say('35: three tens and five ones.', '35：三個十、五個一。');
      play([{ at: 2.4, fn: () => { set(305, true); say('305: three hundreds, NO tens, and five ones. The middle space is empty, and the 0 says so. Without the 0 this would read 35.', '305：三個百、沒有十、五個一。中間那一格是空的，0 就是在說這件事；少了 0，就會被讀成 35。'); } }]);
    },
    two() {
      stopAll(); setBase(10, true); setSpeed(1); set(13, true);
      say('13 things, traded ten at a time: 1 ten and 3 ones.', '13 個東西，滿十個就換：1 個十、3 個一。');
      play([
        { at: 2.6, fn: () => setBase(5) },
        { at: 6.2, fn: () => setBase(2) },
      ]);
    },
  };

  let raf = 0, last = 0, visible = false;
  function frameLoop(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    step(dt);
    if (view) { view.tick(dt); view.render(); }
    raf = requestAnimationFrame(frameLoop);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frameLoop); }
  }, { rootMargin: '120px' }).observe(root);

  setSpeed(1);
  setPlaying(false);
  setBase(10, true);
  set(26, true);
  say('26: two rods of ten and six small cubes. Press +1, or Count up, and watch what happens when a place gets ten.', '26：兩根長條（各十個）和六個小方塊。按「+1」或「往上數」，看一格滿十個的時候會怎樣。');
  root.classList.add('al-ready', 'al-fresh');

  const blocks = () => (view ? { counts: view.blocks.counts(), value: view.blocks.value() } : null);
  root.__lab = {
    state, view, set, addOne, setBase, setPlaying, setSpeed, value,
    counts: () => state.counts.slice(),
    shown: () => Number(R.num.textContent.replace(/,/g, '')),
    blocks,
    /** 顯示的數＝控制器的各位個數＝畫面上的積木 */
    check: () => {
      const b = blocks(), v = value();
      return Number(R.num.textContent.replace(/,/g, '')) === v && (!b || (b.value === v && b.counts.every((c, i) => c === state.counts[i])));
    },
    busy: () => !!op,
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => view && view.goHome(true),
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) { step(0.02); if (view) view.tick(0.02); } },
    render: () => { step(0); if (view) view.render(); },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() {
  drawMinis();
  const p = document.querySelector('[data-mth-pile]'); if (p) initPile(p);
  const s = document.querySelector('[data-mth-same]'); if (s) initSame(s);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-mathblocks-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
