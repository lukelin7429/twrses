/*
 * 看得見的數學 · 第四課「分數相加，為什麼不能分母加分母？」的 3D 模型（全部自繪示意）。
 *
 * 一個想法：**要先切成一樣大的塊，才能數在一起**。
 * 桌上兩條一樣長的分數條 A、B（每條是「一整條」＝1），各自切成 d 塊、塗 n 塊；下面一條是答案。
 *   .mth-fr-pick          A、B 的分子分母（分母只能選 2、3、4、5、6、8、10、12）
 *   .mth-fr-wrong         「分子加分子、分母加分母」：在最下面多一條錯的答案，跟 A 比一比
 *   .mth-fr-cut           切成一樣大：兩條都切成最小公分母那麼多塊（每一塊再切細，總長不變）
 *   .mth-fr-join          接起來：A 塗色的塊和 B 塗色的塊飛到答案條上，接成一條
 *   .mth-fr-reset         重來
 * 形狀、數字全部來自 fraction.js 的純函式；check() 會核對畫面上每一條的塊數、塗色塊數和顯示的分數。
 * 控制器不靠 WebGL：沒有 WebGL 時 3D 不畫，右邊的分數、算式與按鈕照樣能用。
 *
 * 產物：cd tools/math && npm run build → assets/js/math-fraction.js
 * 除錯：document.querySelector('[data-mathfraction-lab]').__lab
 *   set([n, d], [n, d])、showWrong(bool)、cut()、join()、reset()、demo('wrong'|'cut'|'join'|'equal')、run(秒)、goCam()、render()、
 *   pieces()＝{ a:[塊數, 塗色], b:[…], sum:[塊數, 塗色], wrong:[…] }、check()
 */
import {
  AmbientLight, BoxGeometry, CircleGeometry, Color, DirectionalLight, HemisphereLight, MathUtils, Mesh, MeshStandardMaterial, PCFShadowMap,
  PerspectiveCamera, Scene, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { DENOMS, add, addBottoms, compare, lcd, toDenominator, toMixed } from './fraction.js';
import { frac, initAlign, initCompare } from './fraction2d.js';
import { fractionEn, fractionZh } from './names.js';

const L = 12;                 // 一整條的長度
const H = 0.5, DEP = 1.3;     // 條子的高、深
const ROW = { a: -4.2, b: -2.2, sum: 0.4, sum2: 2.2, wrong: 4.6 };
const COL = { a: 0x4a90d9, b: 0xf4c542, off: 0x2b3550, wrong: 0xe2574c };
const V = (x, y, z) => new Vector3(x, y, z);

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const spaceWrap = $('.al-space');
  const cv = $('.al-space-cv');
  const R = { fa: $('[data-f="a"] .mth-fr-show'), fb: $('[data-f="b"] .mth-fr-show'), ra: $('[data-f="a"] .mth-fr-read'), rb: $('[data-f="b"] .mth-fr-read'), eq: $('.mth-fr-eq'), wq: $('.mth-fr-weq'), msg: $('.mth-msg'), wrong: $('.mth-fr-wrong'), cut: $('.mth-fr-cut'), join: $('.mth-fr-join') };
  const state = { a: [1, 2], b: [1, 3], wrong: false, cut: false, joined: false };
  let anims = [];             // { mesh, from, to, t, dur, arc }
  let cutT = 1;               // 切細的動畫進度
  let script = null, view = null;
  const say = (en, zh) => { R.msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  const D = () => lcd(state.a, state.b);
  const kOf = (f) => (state.cut ? D() : f[1]);
  const cOf = (f) => (state.cut ? toDenominator(f, D())[0] : f[0]);

  function eqHTML() {
    const { a, b } = state, s = add(a, b);
    if (!state.cut) return `${frac(...a)} + ${frac(...b)} = ?`;
    const x = toDenominator(a, D()), y = toDenominator(b, D()), raw = [x[0] + y[0], D()];
    let out = `${frac(...x)} + ${frac(...y)} = ${state.joined ? frac(...raw) : '?'}`;
    if (state.joined && (s[0] !== raw[0] || s[1] !== raw[1])) {
      const m = toMixed(s);
      out += ` = ${s[1] === 1 ? s[0] : m.whole ? `${m.whole}${m.n ? ` ${frac(m.n, m.d)}` : ''}` : frac(...s)}`;
    }
    return out;
  }
  function show() {
    const { a, b } = state;
    R.fa.innerHTML = frac(...a, 'mth-fr-big'); R.fb.innerHTML = frac(...b, 'mth-fr-big');
    R.ra.innerHTML = `${fractionEn(...a)}<span class="zh">${fractionZh(...a)}</span>`;
    R.rb.innerHTML = `${fractionEn(...b)}<span class="zh">${fractionZh(...b)}</span>`;
    R.eq.innerHTML = eqHTML();
    const w = addBottoms(a, b);
    R.wq.hidden = !state.wrong;
    R.wq.innerHTML = `${frac(...a)} + ${frac(...b)} ≠ ${frac(...w)}`;
    R.cut.disabled = state.cut; R.join.disabled = !state.cut || state.joined;
    R.wrong.setAttribute('aria-pressed', String(state.wrong));
    if (view) view.rebuild();
  }
  function set(a, b, quiet) {
    const fix = (f) => { const d = DENOMS.includes(f[1]) ? f[1] : 2; return [Math.max(1, Math.min(d, f[0])), d]; };
    state.a = fix(a); state.b = fix(b); state.cut = false; state.joined = false; state.wrong = false; cutT = 1; anims = [];
    show();
    if (!quiet) say('Two strips, each one whole. Try adding the tops and the bottoms first, then cut them into equal pieces.', '兩條一樣長的條子，各是一整條。先試試「分子加分子、分母加分母」，再把它們切成一樣大的塊。');
  }
  function showWrong(v) {
    state.wrong = v === undefined ? !state.wrong : !!v;
    show();
    if (state.wrong) {
      const w = addBottoms(state.a, state.b), big = compare(state.a, state.b) >= 0 ? state.a : state.b;
      const c = compare(w, big);
      say(`Adding tops and bottoms gives ${w[0]}/${w[1]}. Compare it with ${big[0]}/${big[1]} in the red strip: it is ${c < 0 ? 'smaller' : 'no bigger'}! Adding something can't leave you with less, so this answer must be wrong.`,
          `分子加分子、分母加分母，得到 ${fractionZh(...w)}。看紅色那一條，跟${fractionZh(...big)}比一比：它${c < 0 ? '反而比較小' : '一點也沒有變大'}！加了東西不可能變少，所以這個答案一定是錯的。`);
    }
  }
  function cut() {
    if (state.cut) return false;
    state.cut = true; cutT = 0;
    const d = D(), x = toDenominator(state.a, d), y = toDenominator(state.b, d);
    show();
    say(`Cut both strips into ${d} equal pieces. ${state.a[0]}/${state.a[1]} becomes ${x[0]}/${d}, and ${state.b[0]}/${state.b[1]} becomes ${y[0]}/${d}. Same amounts, smaller pieces.`,
        `兩條都切成 ${d} 等分。${fractionZh(...state.a)}變成${fractionZh(x[0], d)}，${fractionZh(...state.b)}變成${fractionZh(y[0], d)}。東西一樣多，只是塊比較小。`);
    return true;
  }
  function join() {
    if (!state.cut || state.joined) return false;
    state.joined = true;
    const d = D(), x = toDenominator(state.a, d), y = toDenominator(state.b, d), s = add(state.a, state.b), m = toMixed(s);
    show();
    if (view) view.flyJoin();
    const more = s[0] > s[1] ? [` That is more than one whole strip: ${m.whole} and ${m.n}/${m.d}.`, `比一整條還多：${m.whole} 又${fractionZh(m.n, m.d)}。`] : ['', ''];
    say(`Now the pieces are the same size, so you can count them together: ${x[0]} + ${y[0]} = ${x[0] + y[0]} pieces, each one ${d}th of a strip. The answer is ${x[0] + y[0]}/${d}.${more[0]}`,
        `現在每一塊一樣大，可以數在一起了：${x[0]}＋${y[0]}＝${x[0] + y[0]} 塊，每一塊都是一條的 ${d} 分之 1。答案是${fractionZh(x[0] + y[0], d)}。${more[1]}`);
    return true;
  }
  function reset() { set(state.a, state.b); }

  function step(dt) {
    if (script) {
      script.t += dt;
      while (script && script.list.length && script.t >= script.list[0].at) script.list.shift().fn();
      if (script && !script.list.length) script = null;
    }
    if (cutT < 1) { cutT = Math.min(1, cutT + dt / 1.1); if (view) view.layout(); }
    anims = anims.filter((a) => {
      a.t = Math.min(1, a.t + dt / a.dur);
      const k = MathUtils.smootherstep(a.t, 0, 1);
      a.mesh.position.lerpVectors(a.from, a.to, k);
      a.mesh.position.y += Math.sin(Math.PI * a.t) * a.arc;
      return a.t < 1;
    });
  }

  // ── 3D ──────────────────────────────────────────────────────────────
  function make3D() {
    let renderer;
    try { renderer = new WebGLRenderer({ canvas: cv, antialias: true }); } catch (e) { return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = PCFShadowMap;
    const scene = new Scene();
    scene.background = new Color(0x0b1326);
    const camera = new PerspectiveCamera(34, 1, 0.05, 300);
    const controls = new OrbitControls(camera, cv);
    controls.enableDamping = true; controls.dampingFactor = 0.08;
    controls.minDistance = 4; controls.maxDistance = 80;
    controls.maxPolarAngle = Math.PI * 0.49;
    scene.add(new HemisphereLight(0xdfe8ff, 0x1a1410, 0.85));
    scene.add(new AmbientLight(0xffffff, 0.24));
    const sun = new DirectionalLight(0xfff1dc, 1.25);
    sun.position.set(-8, 18, 10); sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -14, right: 14, top: 12, bottom: -12, near: 1, far: 50 });
    sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.02;
    scene.add(sun);
    const floor = new Mesh(new CircleGeometry(160, 64), new MeshStandardMaterial({ color: 0x121c36, roughness: 0.95 }));
    floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);

    const unit = new BoxGeometry(1, H, DEP);
    const mats = Object.fromEntries(Object.entries(COL).map(([k, c]) => [k, new MeshStandardMaterial({ color: c, roughness: 0.5, transparent: k === 'off', opacity: k === 'off' ? 0.55 : 1 })]));
    const frameMat = new MeshStandardMaterial({ color: 0x9fb0cf, roughness: 0.8, transparent: true, opacity: 0.18 });
    let strips = {};          // key → { k, c, color, meshes: [], frame }
    const lab = labeler($('.al-labels'), cv, camera);
    const lbs = { a: lab.add('mth-lb mth-lb-fa', ''), b: lab.add('mth-lb mth-lb-fb', ''), sum: lab.add('mth-lb mth-lb-fs', ''), wrong: lab.add('mth-lb mth-lb-fw', '') };
    const tmp = V(0, 0, 0);

    const gapOf = (k) => Math.min(0.08, (L / k) * 0.12);
    function place(st, i, out) {
      // 第 i 塊的中心；cutT 動畫時從粗的切法慢慢裂開
      const k = st.k, w = L / k, g = gapOf(k) * (st.anim ? cutT : 1);
      out.set(-L / 2 + w * (i + 0.5), H / 2, st.z);
      return { w: w - g };
    }
    function makeStrip(key, k, c, color, z, count = k) {
      const st = { key, k, c, color, z, meshes: [], anim: false };
      st.frame = new Mesh(new BoxGeometry(L + 0.24, 0.06, DEP + 0.24), frameMat);
      st.frame.position.set(0, 0.03, z); st.frame.receiveShadow = true; scene.add(st.frame);
      for (let i = 0; i < count; i++) {
        const m = new Mesh(unit, i < c ? mats[color] : mats.off);
        m.castShadow = true; m.receiveShadow = true; m.userData.on = i < c;
        scene.add(m); st.meshes.push(m);
      }
      return st;
    }
    function clear() {
      Object.values(strips).forEach((st) => { scene.remove(st.frame); st.meshes.forEach((m) => scene.remove(m)); });
      strips = {};
    }
    function rebuild() {
      clear();
      const { a, b } = state;
      strips.a = makeStrip('a', kOf(a), cOf(a), 'a', ROW.a);
      strips.b = makeStrip('b', kOf(b), cOf(b), 'b', ROW.b);
      if (state.cut && cutT < 1) { strips.a.anim = true; strips.b.anim = true; }
      if (state.joined) {
        const d = D(), x = toDenominator(a, d), y = toDenominator(b, d), tot = x[0] + y[0];
        strips.sum = makeStrip('sum', d, 0, 'a', ROW.sum, d);
        strips.sum.meshes.forEach((m, i) => { m.material = i < x[0] ? mats.a : i < tot ? mats.b : mats.off; m.userData.on = i < tot; });
        if (tot > d) {
          strips.sum2 = makeStrip('sum2', d, 0, 'b', ROW.sum2, d);
          strips.sum2.meshes.forEach((m, i) => { const j = d + i; m.material = j < x[0] ? mats.a : j < tot ? mats.b : mats.off; m.userData.on = j < tot; });
        }
      } else {
        strips.sum = makeStrip('sum', 1, 0, 'a', ROW.sum, 1);
      }
      if (state.wrong) { const w = addBottoms(a, b); strips.wrong = makeStrip('wrong', w[1], w[0], 'wrong', ROW.wrong); }
      layout();
      frame(false);
    }
    function layout() {
      Object.values(strips).forEach((st) => {
        st.meshes.forEach((m, i) => {
          if (anims.some((x) => x.mesh === m)) return;
          const { w } = place(st, i, tmp);
          m.position.copy(tmp); m.scale.set(Math.max(0.02, w), 1, 1);
        });
      });
    }
    /** 接起來：答案條上塗色的塊，從 A、B 對應的塊飛過來 */
    function flyJoin() {
      {
        if (!strips.sum || !strips.a) return;
        const d = D(), x = toDenominator(state.a, d)[0];
        const targets = [...(strips.sum ? strips.sum.meshes : []), ...(strips.sum2 ? strips.sum2.meshes : [])];
        targets.forEach((m, j) => {
          if (!m.userData.on) return;
          const src = j < x ? strips.a.meshes[j] : strips.b.meshes[j - x];
          if (!src) return;
          anims.push({ mesh: m, from: src.position.clone(), to: m.position.clone(), t: 0, dur: 0.7 + j * 0.02, arc: 1.4 });
          m.position.copy(src.position);
        });
      }
    }
    function fit(w, h) {
      const vf = MathUtils.degToRad(camera.fov / 2);
      const hf = Math.atan(Math.tan(vf) * camera.aspect);
      return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf));
    }
    const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
    const DIR = V(0, 1.25, 1).normalize();
    function frame(smooth) {
      const zb = ROW.a - 1.4, zf = (state.wrong ? ROW.wrong : state.joined && strips.sum2 ? ROW.sum2 : ROW.sum) + 1.4;
      const t = V(0, 0, (zb + zf) / 2);
      const p = DIR.clone().multiplyScalar(fit(L + 7.5, (zf - zb) * 0.82 + 2)).add(t);
      if (!smooth) { camera.position.copy(p); controls.target.copy(t); fly.t = 1; return; }
      fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0;
    }
    function labels() {
      // 第一、二條的標籤放左邊，答案與錯答案放右邊：手機上才不會疊在一起
      const set1 = (key, html, z) => {
        const l = lbs[key], on = !!strips[key] && html;
        l.hidden = !on; if (!on) return;
        if (l.dataset.h !== html) { l.innerHTML = html; l.dataset.h = html; }
        lab.place(l, tmp.set(key === 'a' || key === 'b' ? -L / 2 - 1.6 : L / 2 + 1.8, 0.3, z), 0);
      };
      const { a, b } = state, d = D();
      set1('a', state.cut ? frac(...toDenominator(a, d)) : frac(...a), ROW.a);
      set1('b', state.cut ? frac(...toDenominator(b, d)) : frac(...b), ROW.b);
      const s = add(a, b), raw = state.cut ? toDenominator(a, d)[0] + toDenominator(b, d)[0] : 0;
      set1('sum', state.joined ? frac(raw, d) : '<b>?</b>', state.joined && strips.sum2 ? (ROW.sum + ROW.sum2) / 2 : ROW.sum);
      set1('wrong', state.wrong ? `${frac(...addBottoms(a, b))}<b>✗</b>` : '', ROW.wrong);
      void s;
    }
    function render() { controls.update(); labels(); renderer.render(scene, camera); }
    function tick(dt) {
      if (fly.t < 1) {
        fly.t = Math.min(1, fly.t + dt / 0.9);
        const k = MathUtils.smootherstep(fly.t, 0, 1);
        camera.position.lerpVectors(fly.p0, fly.p1, k);
        controls.target.lerpVectors(fly.t0, fly.t1, k);
      }
      if (cutT >= 1) Object.values(strips).forEach((st) => { st.anim = false; });
    }
    $('.al-home').addEventListener('click', () => frame(true));
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
      if (band !== band0) { band0 = band; frame(false); }
    }
    new ResizeObserver(resize).observe(spaceWrap);
    return { scene, camera, rebuild, layout, flyJoin, frame, render, tick, strips: () => strips };
  }
  view = make3D();
  if (!view) root.classList.add('al-nogl');

  // ── 右邊的按鈕 ────────────────────────────────────────────────────────
  $$('[data-f]').forEach((box) => {
    const key = box.getAttribute('data-f');
    box.querySelectorAll('[data-step]').forEach((btn) => btn.addEventListener('click', () => {
      script = null;
      const [part, dir] = btn.getAttribute('data-step').split(':'), f = state[key].slice(), di = DENOMS.indexOf(f[1]);
      if (part === 'n') f[0] = Math.max(1, Math.min(f[1], f[0] + Number(dir)));
      else { f[1] = DENOMS[Math.max(0, Math.min(DENOMS.length - 1, di + Number(dir)))]; f[0] = Math.min(f[0], f[1]); }
      const next = { a: state.a, b: state.b, [key]: f };
      set(next.a, next.b);
    }));
  });
  R.wrong.addEventListener('click', () => { script = null; showWrong(); });
  R.cut.addEventListener('click', () => { script = null; cut(); });
  R.join.addEventListener('click', () => { script = null; join(); });
  $('.mth-fr-reset').addEventListener('click', () => { script = null; reset(); });

  // ── 卡片示範 ──────────────────────────────────────────────────────────
  const play = (list) => { script = { t: 0, list }; };
  const DEMO = {
    wrong() { set([1, 2], [1, 3], true); say('One half plus one third. What if we just add the tops and the bottoms?', '二分之一加三分之一。如果直接分子加分子、分母加分母呢？'); play([{ at: 1.2, fn: () => showWrong(true) }]); },
    cut() { set([1, 2], [1, 3], true); say('Halves and thirds are different sizes. Cut both strips into the same size pieces.', '二分之一和三分之一的一塊不一樣大。把兩條切成一樣大的塊。'); play([{ at: 1.2, fn: cut }]); },
    join() { set([1, 2], [1, 3], true); play([{ at: 0.6, fn: cut }, { at: 2.6, fn: join }]); },
    equal() {
      set([1, 2], [2, 4], true);
      say('One half and two fourths: put them side by side. Same length. Different cuts, same amount.', '二分之一和四分之二並排放：一樣長。切法不同，一樣多。');
      play([{ at: 2.2, fn: () => { cut(); say('Cut both into fourths: two fourths and two fourths. They were equal all along.', '兩條都切成四等分：四分之二和四分之二。它們本來就一樣多。'); } }]);
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

  set([1, 2], [1, 3], true);
  say('One half and one third, each on a strip of the same length. What is one half plus one third? Try the wrong way first, then cut the strips into equal pieces.', '一條是二分之一，一條是三分之一，兩條一樣長。二分之一加三分之一是多少？先試試錯的方法，再把它們切成一樣大的塊。');
  root.classList.add('al-ready');

  const count = (st) => (st ? [st.meshes.length, st.meshes.filter((m) => m.userData.on).length] : null);
  root.__lab = {
    state, view, set, showWrong, cut, join, reset,
    pieces: () => { const s = view ? view.strips() : {}; return { a: count(s.a), b: count(s.b), sum: count(s.sum), sum2: count(s.sum2), wrong: count(s.wrong) }; },
    /** 每一條畫面上的塊數與塗色塊數，等於它代表的分數；接起來的總塗色塊數÷公分母＝真正的和 */
    check: () => {
      if (!view) return true;
      const p = root.__lab.pieces(), { a, b } = state;
      const ok = (pc, f) => pc && pc[0] === kOf(f) && pc[1] === cOf(f);
      if (!ok(p.a, a) || !ok(p.b, b)) return false;
      if (state.wrong) { const w = addBottoms(a, b); if (!p.wrong || p.wrong[0] !== w[1] || p.wrong[1] !== w[0]) return false; }
      if (state.joined) {
        const d = D(), tot = (p.sum ? p.sum[1] : 0) + (p.sum2 ? p.sum2[1] : 0), s = add(a, b);
        if (p.sum[0] !== d || tot * s[1] !== s[0] * d) return false;
      }
      return true;
    },
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => view && view.frame(false),
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) { step(0.02); if (view) view.tick(0.02); } },
    render: () => { step(0); if (view) view.render(); },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() {
  const c = document.querySelector('[data-mth-cmp]'); if (c) initCompare(c);
  const a = document.querySelector('[data-mth-align]'); if (a) initAlign(a);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-mathfraction-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
