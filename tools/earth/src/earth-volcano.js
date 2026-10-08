/*
 * 地球與天氣 · 第五課「火山怎麼噴發？」的 3D 模型（全部自繪示意，不是任何一座真實的火山）。
 *
 * 一個機制：岩漿比周圍的岩石輕，所以往上擠；岩漿裡溶著氣體，越往上壓力越小，氣體冒出來變成越來越大的氣泡
 *   （像打開一瓶搖過的汽水）。岩漿稀、氣體少 → 熔岩靜靜流出來；岩漿黏、氣體多 → 氣體逃不掉，最後爆開。
 *
 * 場景：切開一半的火山：底下的岩漿庫、中間的通道、山頂的火山口。可以選岩漿稀或黏、氣體少或多，四種噴發。
 *   壓力慢慢累積（build），滿了就噴（erupt），再重來。
 *
 * 產物：cd tools/earth && npm run build → assets/js/earth-volcano.js
 * 除錯：document.querySelector('[data-earthvolcano-lab]').__lab
 */
import {
  AmbientLight, BoxGeometry, CircleGeometry, Color, CylinderGeometry, DirectionalLight, DoubleSide, HemisphereLight, InstancedMesh, Matrix4, Mesh,
  MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, Scene, Shape, ShapeGeometry, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { styleOf, pressure, expand, radiusRatio, CYCLE_S } from './volcalc.js';

const V = (x, y, z) => new Vector3(x, y, z);
const at = (obj, x, y, z) => { obj.position.set(x, y, z); return obj; };
const std = (color, o = {}) => new MeshStandardMaterial({ color, roughness: 0.85, ...o });
const hash = (i, k) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
const RB = 4.2, RT = 0.5, HT = 2.7;                       // 火山：底的半徑、山頂的半徑、高度
const CH = { x: 0, y: -2.1, rx: 1.9, ry: 0.72 };          // 岩漿庫
const CW = 0.3;                                           // 通道的半寬
const DEEP_KM = 3;                                        // 岩漿庫頂當成地下 3 公里（只用來算氣泡大小）
const ERUPT_S = 5, N_BUB = 34, N_OUT = 150;
const LAVA = 0xff7a1a, HOT = 0xffd23c;

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const spaceWrap = $('.al-space');
  const cv = $('.al-space-cv');
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas: cv, antialias: true });
  } catch (e) {
    root.classList.add('al-nogl');
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const scene = new Scene();
  scene.background = new Color(0x0e1830);
  const camera = new PerspectiveCamera(34, 1, 0.1, 120);
  const TARGET = V(0, 1.2, 0);
  const homePos = () => TARGET.clone().add(V(1.2, 2.4, 19).multiplyScalar(camera.aspect < 0.85 ? 1.5 : camera.aspect < 1.2 ? 1.12 : 1.0));
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 6; controls.maxDistance = 55;
  controls.minPolarAngle = 0.6; controls.maxPolarAngle = Math.PI * 0.52;
  controls.minAzimuthAngle = -0.8; controls.maxAzimuthAngle = 0.8;
  controls.target.copy(TARGET);
  scene.add(new HemisphereLight(0xeaf2ff, 0x2a3040, 1.05));
  scene.add(new AmbientLight(0xffffff, 0.5));
  const sun = new DirectionalLight(0xffffff, 0.9); sun.position.set(-4, 9, 8); scene.add(sun);

  // 地下（後半塊）與切面
  scene.add(at(new Mesh(new BoxGeometry(14, 3.4, 3), std(0x5e4e40)), 0, -1.7, -1.5));
  scene.add(at(new Mesh(new BoxGeometry(14, 0.06, 3), std(0x4f9a5a)), 0, 0.03, -1.5));
  const face = (pts, color, z) => { const s = new Shape(); pts.forEach(([x, y], i) => (i ? s.lineTo(x, y) : s.moveTo(x, y))); const m = new Mesh(new ShapeGeometry(s), new MeshBasicMaterial({ color, side: DoubleSide })); m.position.z = z; scene.add(m); return m; };
  face([[-7, -3.4], [7, -3.4], [7, 0], [-7, 0]], 0x7a6753, 0.002);
  face([[-7, -1.2], [7, -1.2], [7, -0.6], [-7, -0.6]], 0x8f7a60, 0.004);
  // 火山：後半個截頭圓錐＋切面（梯形）
  scene.add(at(new Mesh(new CylinderGeometry(RT, RB, HT, 48, 1, true, Math.PI / 2, Math.PI), std(0x6f6258, { side: DoubleSide })), 0, HT / 2, 0));
  face([[-RB, 0], [RB, 0], [RT, HT], [-RT, HT]], 0x857466, 0.006);
  // 岩漿庫與通道（畫在切面上）
  const magMat = new MeshBasicMaterial({ color: LAVA });
  const chamber = new Mesh(new CircleGeometry(1, 64), magMat); chamber.scale.set(CH.rx, CH.ry, 1); chamber.position.set(CH.x, CH.y, 0.01); scene.add(chamber);
  const conduit = new Mesh(new BoxGeometry(CW * 2, HT - (CH.y + CH.ry) + 0.02, 0.01), magMat); conduit.position.set(0, (HT + CH.y + CH.ry) / 2, 0.012); scene.add(conduit);
  // 氣泡、噴出來的東西（熔岩／火山灰）、熔岩丘
  const bub = new InstancedMesh(new CircleGeometry(1, 16), new MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 }), N_BUB); bub.frustumCulled = false; scene.add(bub);
  const out = new InstancedMesh(new SphereGeometry(0.07, 8, 6), new MeshBasicMaterial({ color: 0xffffff }), N_OUT); out.frustumCulled = false; scene.add(out);
  const dome = at(new Mesh(new SphereGeometry(0.6, 24, 16), new MeshBasicMaterial({ color: 0xc8501a })), 0, HT, 0); scene.add(dome);

  // ---------------- 標籤 ----------------
  const lab = labeler($('.al-labels'), cv, camera);
  const mk = (cls, en, zh) => lab.add(`cp-lb ${cls}`, `${en}<small>${zh}</small>`);
  const L = {
    chamber: mk('ew-lb-push', 'Magma chamber', '岩漿庫'), conduit: mk('', 'The way up', '往上的通道'),
    bub: mk('ew-vc-lb-bub', 'Gas bubbles grow as they rise', '氣泡越往上越大'), top: lab.add('cp-lb ew-lb-fault', ''),
  };
  const NAMES = {
    flow: ['Lava flows out quietly', '熔岩靜靜地流出來'], fountain: ['A fountain of lava', '熔岩噴泉'],
    dome: ['A thick lump squeezes out', '慢慢擠出一團濃稠的熔岩'], blast: ['An explosion of ash', '爆炸，噴出火山灰'],
  };

  const R = {
    magmas: [...root.querySelectorAll('.ew-vc-magma button')], gases: [...root.querySelectorAll('.ew-vc-gas button')],
    bar: $('.ew-vc-bar'), status: $('.ew-vc-status'), style: $('.ew-vc-style'), count: $('.ew-vc-count'), msgs: [...root.querySelectorAll('.ew-vc-msg')], play: $('.al-play'),
  };
  // phase 'build'＝壓力累積（p 0→1）、'erupt'＝噴發（e 0→1）
  const state = { magma: 'runny', gas: 'low', phase: 'build', p: 0.35, e: 0, n: 0, labels: true, playing: true, clock: 0 };
  const style = () => styleOf(state.magma, state.gas);

  const m4 = new Matrix4(), col = new Color(), ASH = new Color(0x8b8f99), ROCKC = new Color(0x5a3a2a), LAVAC = new Color(LAVA), HOTC = new Color(HOT);
  const slopeY = (x) => Math.max(0, HT * (1 - (Math.abs(x) - RT) / (RB - RT)));          // 山坡的高度
  function draw() {
    const st = style(), er = state.phase === 'erupt', e = er ? state.e : 0, pulse = 0.5 + 0.5 * Math.sin(state.clock * 6);
    magMat.color.copy(LAVAC).lerp(HOTC, Math.min(1, state.p) * (0.3 + 0.2 * pulse));
    // 氣泡：在通道和岩漿庫頂部往上升；半徑照波以耳定律隨壓力變小而變大
    const nb = state.gas === 'high' ? N_BUB : 9, y0 = CH.y + CH.ry * 0.2, speed = (state.magma === 'sticky' ? 0.07 : 0.16) * (er ? 2.4 : 0.5 + state.p);
    for (let i = 0; i < N_BUB; i++) {
      const u = ((state.clock * speed * (0.7 + 0.6 * hash(i, 1)) + hash(i, 2)) % 1 + 1) % 1, y = y0 + u * (HT - y0), km = DEEP_KM * (1 - u);
      const r = (i < nb ? 0.17 : 0) / radiusRatio(km), wide = y < CH.y + CH.ry ? 0.9 : CW - 0.05;
      m4.makeScale(r, r, 1).setPosition((hash(i, 3) - 0.5) * 2 * wide, y, 0.02); bub.setMatrixAt(i, m4);
    }
    bub.instanceMatrix.needsUpdate = true;
    // 噴出來的東西
    for (let i = 0; i < N_OUT; i++) {
      const side = hash(i, 4) < 0.5 ? -1 : 1, ph = hash(i, 5), u = er ? ((e * 3 + ph) % 1) : 0; let x = 0, y = -50, z = 0.06, s = 0;
      if (er && e > ph * 0.25) {
        if (st === 'flow') { x = side * (RT * 0.6 + u * (RB - RT) * 0.95); y = slopeY(x) + 0.06; s = i < 70 ? 1 - u * 0.5 : 0; col.copy(HOTC).lerp(LAVAC, u); }
        else if (st === 'fountain') {
          if (i < 60) { const vx = side * (0.2 + hash(i, 6) * 0.9), T = u; x = vx * T * 1.6; y = HT + 3.2 * T * (1 - T) * 4 * (0.5 + hash(i, 7) * 0.5); s = 1; col.copy(HOTC).lerp(LAVAC, T); }
          else if (i < 110) { x = side * (RT + u * (RB - RT) * 0.9); y = slopeY(x) + 0.06; s = 1 - u * 0.5; col.copy(LAVAC); }
        } else if (st === 'dome') { if (i < 26) { x = side * (RT + u * (RB - RT) * 0.5); y = slopeY(x) + 0.05; s = 0.9 * (1 - u); col.copy(ROCKC).lerp(LAVAC, 0.3); } }
        else {                                                                   // blast：火山灰柱＋拋出的石塊
          if (i < 110) { const rise = u * 4.4, spread = 0.25 + rise * rise * 0.07; x = (hash(i, 6) - 0.5) * 2 * spread + Math.sin(state.clock * 2 + i) * 0.05; y = HT + rise; z = (hash(i, 8) - 0.7) * spread; s = 1.3 + rise * 0.55; col.copy(ASH).multiplyScalar(0.6 + 0.4 * hash(i, 9)); }
          else { const vx = side * (0.6 + hash(i, 6) * 1.6), T = u; x = vx * T * 2.4; y = Math.max(slopeY(x), HT + 4.5 * T * (1 - T) * 4 * (0.4 + hash(i, 7) * 0.6)); s = 0.9; col.copy(ROCKC).lerp(HOTC, 0.4 * (1 - T)); }
        }
      }
      m4.makeScale(s, s, s).setPosition(x, y, z); out.setMatrixAt(i, m4); out.setColorAt(i, col);
    }
    out.instanceMatrix.needsUpdate = true; if (out.instanceColor) out.instanceColor.needsUpdate = true;
    const ds = st === 'dome' ? (er ? 0.35 + 0.75 * e : 0.35) : 0.001; dome.scale.set(ds, ds * 0.7, ds);
  }

  let narrow = false;
  function updateLabels() {
    const on = state.labels, er = state.phase === 'erupt', n = NAMES[style()];
    const show = (el, s, v, dy = 0) => { el.hidden = !s; if (s) lab.place(el, v, dy); };
    show(L.chamber, on, V(CH.x + (narrow ? 0 : 1.2), CH.y, 0.05), narrow ? 26 : 0); L.chamber.style.marginLeft = narrow ? '0' : '84px';
    show(L.conduit, on && !narrow, V(-CW, 0.9, 0.05), 0); L.conduit.style.marginLeft = '-84px';
    show(L.bub, on && state.gas === 'high' && !narrow, V(CW, -0.4, 0.05), 0); L.bub.style.marginLeft = '128px';
    L.top.innerHTML = `${n[0]}<small>${n[1]}</small>`; L.top.classList.toggle('slip', er && style() === 'blast');
    show(L.top, er, V(0, HT + (style() === 'blast' ? 2.2 : 0.9), 0.05), -26);
  }

  function readout() {
    const st = style(), er = state.phase === 'erupt', n = NAMES[st];
    R.magmas.forEach((b) => b.setAttribute('aria-pressed', b.dataset.magma === state.magma ? 'true' : 'false'));
    R.gases.forEach((b) => b.setAttribute('aria-pressed', b.dataset.gas === state.gas ? 'true' : 'false'));
    R.bar.style.setProperty('--w', `${(er ? 1 - state.e : Math.min(1, state.p)) * 100}%`);
    R.bar.classList.toggle('hot', !er && state.p > 0.85);
    R.status.innerHTML = er ? 'Erupting!<small>噴發中！</small>' : state.p > 0.85 ? 'About to erupt<small>快要噴了</small>' : 'Pressure is building<small>壓力正在累積</small>';
    R.status.className = `cp-ht-status ew-vc-status ${er ? 'bad' : ''}`;
    R.style.innerHTML = `${n[0]}<small>${n[1]}</small>`;
    R.count.innerHTML = `${state.n}<small>eruptions so far · 已經噴發幾次</small>`;
    R.msgs.forEach((m) => { m.hidden = m.dataset.msg !== st; });
  }

  function set(o) { if (o.magma === 'runny' || o.magma === 'sticky') state.magma = o.magma; if (o.gas === 'low' || o.gas === 'high') state.gas = o.gas; state.phase = 'build'; state.e = 0; state.p = Math.min(state.p, 0.6); readout(); }
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    root.classList.remove('al-fresh');
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Play · 播放';
  }
  R.magmas.forEach((b) => b.addEventListener('click', () => { set({ magma: b.dataset.magma }); setPlaying(true); }));
  R.gases.forEach((b) => b.addEventListener('click', () => { set({ gas: b.dataset.gas }); setPlaying(true); }));
  R.play.addEventListener('click', () => setPlaying(!state.playing));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  $('.al-home').addEventListener('click', () => { camera.position.copy(homePos()); controls.target.copy(TARGET); });

  function advance(dt) {
    if (!state.playing) return;
    state.clock += dt;
    if (state.phase === 'build') { state.p += dt / CYCLE_S[style()]; if (state.p >= 1) { state.p = 1; state.phase = 'erupt'; state.e = 0; state.n += 1; } }
    else { state.e += dt / ERUPT_S; if (state.e >= 1) { state.phase = 'build'; state.p = 0; state.e = 0; } }
  }
  let lastR = 0;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    advance(dt); draw();
    controls.update();
    updateLabels();
    if (t - lastR > 100) { lastR = t; readout(); }
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  function resize() {
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    narrow = w < 560;
  }
  new ResizeObserver(resize).observe(spaceWrap);
  resize();
  camera.position.copy(homePos());
  let visible = false, raf = 0, last = 0;
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  draw(); readout();
  root.classList.add('al-ready', 'al-fresh', 'is-playing');

  const go = (magma, gas) => { set({ magma, gas }); state.p = 0.8; setPlaying(true); };
  const DEMO = { flow: () => go('runny', 'low'), fountain: () => go('runny', 'high'), dome: () => go('sticky', 'low'), blast: () => go('sticky', 'high') };
  root.__lab = {
    camera, controls, state, set, setPlaying, style,
    seek: (phase, x) => { state.phase = phase; if (phase === 'erupt') { state.e = x; state.p = 1; } else { state.p = x; state.e = 0; } },
    render: () => { draw(); controls.update(); updateLabels(); readout(); renderer.render(scene, camera); },
  };
  return { ready: () => true, demo: (v) => { if (DEMO[v]) DEMO[v](); } };
}

// ---------------- 頁面下方：氣泡往上升會變多大？（不需要 WebGL） ----------------
function initBubble() {
  const el = document.querySelector('[data-earth-bubble]');
  if (!el) return;
  const $ = (s) => el.querySelector(s);
  const km = $('.ew-bb-km'), out = $('.ew-bb-km-out'), n = $('.ew-bb-n'), atm = $('.ew-bb-atm'), en = $('.ew-bb-en'), zh = $('.ew-bb-zh'), deep = $('.ew-bb-deep'), marker = $('.ew-bb-marker');
  function show() {
    const d = +km.value / 10, x = expand(d), r = radiusRatio(d);
    out.textContent = `${d.toFixed(1)} km`;
    km.style.setProperty('--p', `${(d / 5) * 100}%`);
    n.textContent = x >= 10 ? Math.round(x).toLocaleString('en-US') : x.toFixed(1);
    atm.textContent = Math.round(pressure(d)).toLocaleString('en-US');
    deep.style.width = deep.style.height = `${Math.max(3, 120 / r)}px`;
    marker.style.top = `${(d / 5) * 100}%`;
    en.textContent = d === 0 ? 'At the surface there is nothing left to expand into. The bubble is as big as it will get.' : `A bubble that starts ${d.toFixed(1)} kilometers down grows to about ${n.textContent} times its volume by the time it reaches the top.`;
    zh.textContent = d === 0 ? '到了地表，氣泡已經不會再變大了。' : `一顆從地下 ${d.toFixed(1)} 公里出發的氣泡，到達地表的時候，體積大約變成原來的 ${n.textContent} 倍。`;
    el.querySelectorAll('.ew-bb-pre button').forEach((b) => b.setAttribute('aria-pressed', +b.dataset.km === +km.value ? 'true' : 'false'));
    el.dataset.x = String(x);
  }
  km.addEventListener('input', show);
  el.querySelectorAll('.ew-bb-pre button').forEach((b) => b.addEventListener('click', () => { km.value = b.dataset.km; show(); }));
  show();
  el.__bubble = { show };
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initBubble);
else initBubble();

lazyBoot('[data-earthvolcano-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
