/*
 * 人體探索 · 第二十一課「你的力氣從哪裡來？」的 3D 模型：跟著燃料走。
 *
 * 真實的：骨架（skeleton.glb）淡淡定位；食道、胃、十二指腸、膽囊是 BodyParts3D 的真實形狀（organs.glb，座標與骨架對齊）。
 * 自繪示意：肝臟、胰臟、其餘的小腸、門靜脈、心臟、通往大腦與腿部肌肉的血管、大腦、一條大腿肌肉，以及所有的小點。
 *
 * 模擬（示意，不是測量）：一切都是（早餐 meal、早餐後的小時數 t）的函數 model(meal, t)：
 *   g 血糖（平常＝1，沒有單位）、ins 胰島素、store 肝臟存糖、absorb 小腸正在吸收多少、stomach 胃裡還剩多少。
 *   「飯、蛋、青菜」慢慢升、撐很久；「只喝含糖飲料」衝高、很快被收走、有些人會掉到平常以下；「沒吃」由肝臟慢慢放糖。
 *   小點的流動用真實時間（state.clock），和 t 無關，所以暫停時看到的是「那個時刻」的流量。
 *
 * 餐盤工具（initPlate）是 2D，不需要 WebGL；不算熱量、不打分數，只看六大類今天吃到了哪幾類。
 * 產物：cd tools/body && npm run build → assets/js/energy.js
 */
import {
  AmbientLight, CatmullRomCurve3, Color, DirectionalLight, DoubleSide, Group, HemisphereLight, MathUtils, Mesh,
  MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, Scene, SphereGeometry, TubeGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot, loadBones, loadOrgans, worldVerts } from './common.js';

const V = (x, y, z) => new Vector3(x, y, z);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const cr = (pts) => new CatmullRomCurve3(pts, false, 'centripetal');
const sm = (a, b, x) => MathUtils.smoothstep(x, a, b);
const TMAX = 5;
const COLORS = { meal: '#7ddc9a', drink: '#ff9a4a', none: '#9fb4d8' };

export function model(meal, t) {
  if (meal === 'none') return { g: 1 - 0.05 * sm(0, 5, t), ins: 0.06, store: 0.42 - 0.2 * (t / 5), absorb: 0, stomach: 0, release: 0.6 };
  if (meal === 'drink') {
    return {
      g: 1 + 0.75 * sm(0.05, 0.5, t) * (1 - sm(0.5, 1.3, t)) - 0.09 * sm(1.1, 1.7, t) * (1 - sm(2.1, 2.9, t)) - 0.03 * sm(4, 5, t),
      ins: 0.08 + 0.9 * sm(0.1, 0.55, t) * (1 - sm(0.7, 1.6, t)),
      store: 0.42 + 0.2 * sm(0.2, 1.2, t) - 0.25 * sm(1.6, 5, t),
      absorb: sm(0.05, 0.3, t) * (1 - sm(0.5, 1.1, t)),
      stomach: 1 - sm(0.05, 0.8, t),
      release: 0.6 * sm(1.5, 2.1, t),
    };
  }
  return {
    g: 1 + 0.3 * sm(0.15, 0.9, t) * (1 - sm(0.9, 2.3, t)) + 0.05 * sm(0.9, 2.3, t) * (1 - sm(3.6, 4.5, t)) - 0.03 * sm(4.3, 5, t),
    ins: 0.08 + 0.5 * sm(0.2, 0.9, t) * (1 - sm(1, 2.4, t)) + 0.15 * sm(1, 2.4, t) * (1 - sm(3.6, 4.4, t)),
    store: 0.42 + 0.4 * sm(0.3, 3.5, t) - 0.1 * sm(4.2, 5, t),
    absorb: 0.45 * sm(0.15, 0.6, t) * (1 - sm(3.4, 4.3, t)),
    stomach: 1 - sm(0.1, 4, t),
    release: 0.6 * sm(4.1, 4.6, t),
  };
}
function noteKey(meal, t) {
  if (meal === 'none') return 'none';
  if (t >= 4.2) return 'done';
  if (meal === 'meal') return t < 2 ? 'meal_rise' : 'meal_steady';
  return t < 1.1 ? 'drink_spike' : t < 2.5 ? 'drink_dip' : 'drink_after';
}

// ---------------- 餐盤工具（2D） ----------------
function initPlate(root) {
  const box = root.querySelector('.fu-strip');
  if (!box || box.dataset.ready) return null;
  box.dataset.ready = '1';
  let groups = [];
  try { groups = JSON.parse(root.getAttribute('data-groups') || '[]'); } catch (e) { /* 留空 */ }
  const rows = [...box.querySelectorAll('.fu-g[data-g]')], chips = [...box.querySelectorAll('.fu-chip')];
  const nEl = box.querySelector('.fu-n'), msg = box.querySelector('.fu-msg');
  const KEY = 'twrses-body-plate', today = new Date().toDateString();
  let ticks = {};
  try { const s = JSON.parse(localStorage.getItem(KEY) || 'null'); if (s && s.day === today && s.ticks) ticks = s.ticks; } catch (e) { /* 沒有也能用 */ }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify({ day: today, ticks })); } catch (e) { /* 沒有也能用 */ } };
  function draw() {
    const have = new Set();
    for (const r of rows) {
      const g = r.dataset.g;
      r.querySelectorAll('.fu-tick').forEach((b) => { const on = !!(ticks[g] && ticks[g][b.dataset.m]); b.setAttribute('aria-pressed', on ? 'true' : 'false'); if (on) have.add(g); });
      r.classList.toggle('fu-on', have.has(g));
    }
    chips.forEach((c) => c.classList.toggle('fu-on', have.has(c.dataset.g)));
    nEl.textContent = String(have.size);
    const missing = groups.filter((g) => !have.has(g.key));
    let en, zh;
    if (!have.size) { en = 'Tap every food group you have eaten today, meal by meal.'; zh = '一餐一餐地回想，把今天吃到的食物類別點起來。'; }
    else if (!missing.length) { en = 'All six groups today! Your body has what it needs to move, think, and build.'; zh = '六大類今天都吃到了！身體要動、要想、要長大，需要的東西都有了。'; }
    else {
      const m = missing[0];
      en = `Not yet today: ${missing.map((g) => g.en.toLowerCase()).join(', ')}. The plate rhyme says: “${m.rhyme_en}.” Could it go into your next meal?`;
      zh = `今天還沒吃到：${missing.map((g) => g.zh).join('、')}。餐盤口訣說：「${m.rhyme_zh}」。下一餐可以把它補上嗎？`;
    }
    msg.innerHTML = `${esc(en)}<span class="zh">${esc(zh)}</span>`;
  }
  box.querySelectorAll('.fu-tick').forEach((b) => b.addEventListener('click', () => {
    const g = b.closest('.fu-g').dataset.g;
    ticks[g] = ticks[g] || {};
    ticks[g][b.dataset.m] = !ticks[g][b.dataset.m];
    save(); draw();
  }));
  box.querySelector('.fu-clear').addEventListener('click', () => { ticks = {}; save(); draw(); });
  draw();
  return { scrollTo: () => box.scrollIntoView({ behavior: 'smooth', block: 'center' }), ticks: () => ticks };
}

function initLab(root) {
  const $ = (sel) => root.querySelector(sel);
  const plate = initPlate(root);
  const spaceWrap = $('.al-space');
  const cv = $('.al-space-cv');
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas: cv, antialias: true });
  } catch (e) {
    root.classList.add('al-nogl');
    return { ready: () => true, test: () => plate && plate.scrollTo() };
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const scene = new Scene();
  scene.background = new Color(0x0a1224);
  const camera = new PerspectiveCamera(32, 1, 0.01, 30);
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 0.2; controls.maxDistance = 6;
  scene.add(new HemisphereLight(0xdfe8ff, 0x2a1a20, 1.1));
  scene.add(new AmbientLight(0xffffff, 0.25));
  const key = new DirectionalLight(0xfff3e0, 1.9); key.position.set(1.5, 2.5, 3); scene.add(key);
  const rim = new DirectionalLight(0x9fc4ff, 0.8); rim.position.set(-2, 1.5, -2.5); scene.add(rim);

  let NOTES = {};
  try { NOTES = JSON.parse(root.getAttribute('data-notes') || '{}'); } catch (e) { /* 留空 */ }
  const R = {
    loading: $('.sk-loading'), bar: $('.sk-bar i'), t: $('.fu-t'), since: $('.fu-since'), chart: $('.fu-chart'), status: $('.fu-status'),
    ins: $('.fu-bar-ins i'), store: $('.fu-bar-store i'), stom: $('.fu-bar-stom i'),
    slider: $('.fu-slider'), play: $('.al-play'), playT: $('.al-play-t'), meals: [...root.querySelectorAll('[data-meal]')],
  };
  const lab = labeler($('.al-labels'), cv, camera);
  const state = { ready: false, labels: true, meal: 'meal', t: 0, playing: false, clock: 0, swallow: 1, compare: true, hold: false, note: '' };
  let bones = null;
  const P = {};
  const M = {
    liver: new MeshStandardMaterial({ color: 0x8a4a34, roughness: 0.55, transparent: true, opacity: 0.6, depthWrite: false, side: DoubleSide }),
    panc: new MeshStandardMaterial({ color: 0xf0c070, roughness: 0.6 }),
    gut: new MeshStandardMaterial({ color: 0xe8a0a0, roughness: 0.6, transparent: true, opacity: 0.5, depthWrite: false }),
    vein: new MeshStandardMaterial({ color: 0x7a2a66, roughness: 0.45 }),
    art: new MeshStandardMaterial({ color: 0xc8343a, roughness: 0.45 }),
    heart: new MeshStandardMaterial({ color: 0xd9363a, roughness: 0.5 }),
    brain: new MeshStandardMaterial({ color: 0xf2b6c0, roughness: 0.6, emissive: 0x30151a }),
    mus: new MeshStandardMaterial({ color: 0xc23a34, roughness: 0.5, emissive: 0x200808 }),
    sugar: new MeshBasicMaterial({ color: 0xffd23a }), ins: new MeshBasicMaterial({ color: 0x5fb6ff }),
    food: new MeshStandardMaterial({ color: 0xd8b070, roughness: 0.8 }),
  };
  const body = new Group();
  body.visible = false;                               // 載入完、放好位置才顯示
  scene.add(body);
  const tube = (curve, r, mat, seg = 60) => { const m = new Mesh(new TubeGeometry(curve, seg, r, 10, false), mat); body.add(m); return m; };
  const dots = (n, r, mat) => { const a = []; for (let i = 0; i < n; i++) { const d = new Mesh(new SphereGeometry(r, 10, 8), mat); d.renderOrder = 6; d.visible = false; body.add(d); a.push(d); } return a; };
  const F = {};                                       // 各條路徑與小點
  let stomFill = null, bolus = null, eso = null, brain = null, mus = null, heart = null;
  const storeDots = [];

  Promise.all([
    loadBones(root.getAttribute('data-model'), (p) => { R.bar.style.width = `${Math.round(p * 80)}%`; }),
    loadOrgans(root.getAttribute('data-organs')),
  ]).then(([sk, og]) => {
    bones = sk.bones; const parts = og.parts;
    scene.add(sk.model); scene.add(og.model);
    for (const b of bones.values()) { b.mat.opacity = 0.13; b.mat.depthWrite = false; b.mesh.renderOrder = 1; }
    const K = (n) => parts.get(n);
    const USE = ['esophagus', 'stomach', 'duodenum', 'gallbladder'];
    for (const [n, part] of parts) if (!USE.includes(n)) part.mesh.visible = false;          // 別課用的器官
    K('esophagus').mat.color.setHex(0xe7a59a);
    const st = K('stomach');
    st.mat.color.setHex(0xf0949a); st.mat.transparent = true; st.mat.opacity = 0.55; st.mat.depthWrite = false; st.mat.side = DoubleSide; st.mesh.renderOrder = 3;
    K('duodenum').mat.color.setHex(0xe8a0a0);
    K('gallbladder').mat.color.setHex(0x6f9a4a);

    // 食道中心線：真實食道的頂點依高度切片取平均，食物沿著它往下
    const ev = worldVerts(K('esophagus').mesh).sort((a, b) => b.y - a.y);
    const ep = [], N = 10, per = Math.floor(ev.length / N);
    for (let i = 0; i < N; i++) { const c = V(0, 0, 0); const sl = ev.slice(i * per, (i + 1) * per); for (const v of sl) c.add(v); ep.push(c.multiplyScalar(1 / sl.length)); }
    const sc = st.center.clone();
    ep.push(sc.clone().add(V(0.01, 0.02, 0)));
    eso = cr(ep);
    bolus = new Mesh(new SphereGeometry(0.011, 14, 10), M.food); bolus.visible = false; bolus.renderOrder = 4; body.add(bolus);
    const ss = st.box.getSize(V(0, 0, 0));
    stomFill = new Mesh(new SphereGeometry(1, 20, 14), M.food); stomFill.position.copy(sc).add(V(0.005, -0.012, 0)); stomFill.renderOrder = 2; body.add(stomFill);
    P.ss = ss; P.stom = sc.clone();

    // 自繪：肝臟（右邊肋骨下方，往左變薄）
    const lg = new SphereGeometry(1, 36, 24), lp = lg.attributes.position;
    for (let i = 0; i < lp.count; i++) {
      const x = lp.getX(i), y = lp.getY(i), z = lp.getZ(i);
      const k = x > -0.2 ? 1 - 0.55 * ((x + 0.2) / 1.2) : 1;      // 往身體左邊（+X）變薄
      lp.setXYZ(i, x, (y < 0 ? y * 0.7 : y) * k + 0.25 * (1 - k), z * k);
    }
    lg.computeVertexNormals();
    const liver = new Mesh(lg, M.liver);
    const LC = V(-0.052, 1.2, 0.108);
    liver.position.copy(LC); liver.scale.set(0.074, 0.056, 0.062); liver.renderOrder = 4; body.add(liver);
    for (let i = 0; i < 36; i++) {
      const a = Math.random() * Math.PI * 2, u = Math.random() * 2 - 1, rr = Math.cbrt(Math.random()) * 0.72, q = Math.sqrt(1 - u * u);
      const d = new Mesh(new SphereGeometry(0.0042, 8, 6), M.sugar);
      d.position.set(LC.x - 0.012 + rr * q * Math.cos(a) * 0.058, LC.y + 0.004 + rr * u * 0.034, LC.z + rr * q * Math.sin(a) * 0.04);
      d.renderOrder = 5; d.visible = false; body.add(d); storeDots.push(d);
    }
    // 胰臟：胃的後下方，頭靠著十二指腸
    const pc = cr([V(-0.03, 1.094, 0.142), V(0.015, 1.1, 0.14), V(0.06, 1.112, 0.134), V(0.094, 1.124, 0.124)]);
    const panc = tube(pc, 0.011, M.panc, 30); panc.scale.set(1, 1, 1);
    // 小腸：從十二指腸的末端接下去，盤在肚子裡
    const dv = worldVerts(K('duodenum').mesh);
    let dEnd = dv[0]; for (const v of dv) if (v.x > dEnd.x) dEnd = v;
    const coilPts = [dEnd.clone(), V(0.06, 1.062, 0.15)];
    [1.04, 1.012, 0.984, 0.956, 0.93].forEach((y, i) => { const s = i % 2 ? -1 : 1; coilPts.push(V(0.062 * s, y + 0.01, 0.165), V(0, y, 0.178), V(-0.062 * s, y - 0.004, 0.165)); });
    const coil = cr(coilPts);
    tube(coil, 0.0105, M.gut, 220).renderOrder = 3;
    // 門靜脈：小腸 → 肝臟
    const pIn = V(0, 1.0, 0.16);
    const portal = cr([pIn, V(-0.006, 1.06, 0.135), V(-0.02, 1.125, 0.118), V(-0.04, 1.17, 0.104), LC.clone().add(V(0, 0, -0.004))]);
    tube(portal, 0.0042, M.vein, 40);
    // 心臟、往大腦和腿的血管
    const HC = V(0.018, 1.33, 0.145);
    heart = new Mesh(new SphereGeometry(1, 24, 18), M.heart); heart.position.copy(HC); heart.scale.set(0.04, 0.046, 0.036); body.add(heart);
    const sbox = [...bones.values()].filter((b) => b.info.region === 'skull').reduce((bx, b) => (bx ? bx.union(b.box) : b.box.clone()), null);
    const BC = sbox.getCenter(V(0, 0, 0)).add(V(0, sbox.getSize(V(0, 0, 0)).y * 0.16, -0.012));
    const bs = sbox.getSize(V(0, 0, 0));
    brain = new Mesh(new SphereGeometry(1, 28, 20), M.brain); brain.position.copy(BC); brain.scale.set(bs.x * 0.36, bs.y * 0.27, bs.z * 0.36); body.add(brain);
    const fem = bones.get('l-femur');
    const MC = fem.center.clone().add(V(0.004, 0.02, 0.045));
    const fh = fem.box.getSize(V(0, 0, 0)).y;
    mus = new Mesh(new SphereGeometry(1, 24, 18), M.mus); mus.position.copy(MC); mus.scale.set(0.027, fh * 0.3, 0.024); body.add(mus);
    const zf = bones.get('l1').box.max.z + 0.012; P.zf = V(0, 0, zf);
    const up = cr([LC.clone().add(V(0.02, 0.03, -0.01)), V(-0.01, 1.27, 0.13), HC]);
    const toBrain = cr([HC, V(0.016, 1.4, 0.12), V(0.022, 1.48, 0.1), V(0.024, BC.y - bs.y * 0.34, 0.09), BC.clone().add(V(0.01, -0.02, 0))]);
    const toLeg = cr([HC, V(0.02, 1.27, zf + 0.02), V(0.012, 1.16, zf), V(0.012, 1.04, zf + 0.006), V(0.05, 0.96, zf + 0.03), V(fem.box.max.x - 0.03, fem.box.max.y - 0.06, MC.z - 0.01), MC.clone().add(V(0, fh * 0.2, 0))]);
    tube(up, 0.0042, M.vein, 24); tube(toBrain, 0.0036, M.art, 50); tube(toLeg, 0.004, M.art, 80);
    F.coil = { curve: coil, dots: dots(16, 0.006, M.sugar), sp: 0.05 };
    F.portal = { curve: portal, dots: dots(10, 0.0064, M.sugar), sp: 0.22 };
    F.up = { curve: up, dots: dots(5, 0.0064, M.sugar), sp: 0.4 };
    F.brain = { curve: toBrain, dots: dots(10, 0.0064, M.sugar), sp: 0.16 };
    F.leg = { curve: toLeg, dots: dots(14, 0.0064, M.sugar), sp: 0.1 };
    F.insA = { curve: cr([pc.getPointAt(0.45), V(0, 1.11, 0.13), portal.getPointAt(0.5), portal.getPointAt(0.75), LC.clone()]), dots: dots(7, 0.0056, M.ins), sp: 0.2 };
    F.insB = { curve: toLeg, dots: dots(9, 0.0056, M.ins), sp: 0.1, off: 0.035 };

    P.liver = LC.clone(); P.panc = pc.getPointAt(0.8); P.coil = V(0, 0.985, 0.17); P.heart = HC.clone(); P.brain = BC.clone();
    P.mus = MC.clone(); P.eso = eso.getPointAt(0.35); P.portal = portal.getPointAt(0.45);
    P.target = V(0.01, (BC.y + MC.y) / 2, 0.05);
    P.home = V(0.45, 0.1, 2.1);
    P.belly = V(0.01, 1.12, 0.1);
    camera.position.copy(homePos());
    controls.target.copy(P.target);
    body.visible = true;
    state.ready = true;
    R.loading.hidden = true;
    root.classList.add('al-ready');
    apply();
  }).catch((e) => {
    console.error(e);
    R.loading.innerHTML = 'The model could not be loaded. Please reload the page.<br><span class="zh">模型載入失敗，請重新整理頁面。</span>';
  });
  const fit = () => MathUtils.clamp(1 + (1.0 - camera.aspect) * 0.9, 1, 1.7);
  function homePos() { return P.target.clone().add(P.home.clone().multiplyScalar(fit())); }

  // ---------------- 模擬 ----------------
  let cur = model(state.meal, 0);
  function flow(f, n, dir = 1) {
    f.dots.forEach((d, i) => {
      const on = i < n; d.visible = on;
      if (on) { const u = (state.clock * f.sp + i / Math.max(1, n) + (f.off || 0)) % 1; f.curve.getPointAt(dir > 0 ? u : 1 - u, d.position); }
    });
  }
  function apply() {
    cur = model(state.meal, state.t);
    const m = cur;
    if (state.ready) {
      flow(F.coil, Math.round(m.absorb * 16));
      flow(F.portal, Math.round(m.absorb * 10));
      const base = Math.max(0, (m.g - 0.72) / 1.05);                 // 血液裡一直都有糖
      flow(F.up, Math.max(2, Math.round(base * 5)));
      flow(F.brain, Math.max(3, Math.round(base * 10)));
      flow(F.leg, Math.max(4, Math.round(base * 14)));
      flow(F.insA, Math.round(m.ins * 7)); flow(F.insB, Math.round(m.ins * 9));
      storeDots.forEach((d, i) => { d.visible = i < Math.round(m.store * 36); });
      const k = Math.cbrt(Math.max(0, m.stomach));
      stomFill.visible = m.stomach > 0.02;
      stomFill.scale.set(P.ss.x * 0.3 * k, P.ss.y * 0.3 * k, P.ss.z * 0.3 * k);
      M.food.color.setHex(state.meal === 'drink' ? 0xb07a4a : 0xe2c58a);
      bolus.visible = state.swallow < 1 && state.meal !== 'none';
      if (bolus.visible) eso.getPointAt(Math.min(1, state.swallow), bolus.position);
      const beat = 1 + 0.05 * Math.max(0, Math.sin(state.clock * 7.5));
      heart.scale.set(0.04 * beat, 0.046 * beat, 0.036 * beat);
      M.brain.emissive.setScalar(0.1 + 0.05 * Math.sin(state.clock * 2));
    }
    // 文字
    const min = Math.round(state.t * 60), hh = 7 + Math.floor(min / 60), mm = min % 60;
    R.t.textContent = `${hh}:${String(mm).padStart(2, '0')}`;
    const h = Math.floor(min / 60), dur = h && !mm ? `${h} h` : `${h ? `${h} h ` : ''}${mm} min`, durZ = h && !mm ? `${h} 小時` : `${h ? `${h} 小時 ` : ''}${mm} 分鐘`;
    const since = min === 0
      ? (state.meal === 'none' ? ['No breakfast today', '今天沒吃早餐'] : ['Breakfast time', '早餐時間'])
      : (state.meal === 'none' ? [`${dur} since getting up`, `起床後 ${durZ}`] : [`${dur} after breakfast`, `早餐後 ${durZ}`]);
    R.since.innerHTML = `${esc(since[0])}<small>${esc(since[1])}</small>`;
    R.ins.style.width = `${Math.round(Math.min(1, m.ins) * 100)}%`;
    R.store.style.width = `${Math.round(Math.min(1, m.store) * 100)}%`;
    R.stom.style.width = `${Math.round(m.stomach * 100)}%`;
    const nk = noteKey(state.meal, state.t);
    if (nk !== state.note && NOTES[nk]) {
      state.note = nk;
      R.status.innerHTML = `${esc(NOTES[nk].en)}<span class="zh">${esc(NOTES[nk].zh)}</span>`;
      R.status.className = `ey-status fu-status ${nk === 'drink_dip' || nk === 'none' ? 'ey-bad' : 'ey-ok'}`;
    }
    drawChart();
  }

  // ---------------- 血糖曲線（2D，沒有單位） ----------------
  function drawChart() {
    const c = R.chart; if (!c) return;
    const r = c.getBoundingClientRect(), d = Math.min(window.devicePixelRatio || 1, 2), w = Math.round(r.width * d), h = Math.round(r.height * d);
    if (!w || !h) return;
    if (c.width !== w || c.height !== h) { c.width = w; c.height = h; }
    const g = c.getContext('2d'); g.clearRect(0, 0, w, h);
    const padL = 6 * d, padR = 6 * d, padT = 8 * d, padB = 16 * d, lo = 0.8, hi = 1.85;
    const X = (t) => padL + (t / TMAX) * (w - padL - padR), Y = (v) => padT + (1 - (v - lo) / (hi - lo)) * (h - padT - padB);
    g.font = `${10 * d}px sans-serif`; g.fillStyle = 'rgba(255,255,255,.45)'; g.textAlign = 'center';
    g.strokeStyle = 'rgba(255,255,255,.08)'; g.lineWidth = 1;
    for (let t = 0; t <= TMAX; t++) { g.beginPath(); g.moveTo(X(t), padT); g.lineTo(X(t), h - padB); g.stroke(); g.fillText(`${7 + t}:00`, Math.min(w - 14 * d, Math.max(14 * d, X(t))), h - 3 * d); }
    g.setLineDash([4 * d, 4 * d]); g.strokeStyle = 'rgba(255,255,255,.4)'; g.beginPath(); g.moveTo(padL, Y(1)); g.lineTo(w - padR, Y(1)); g.stroke(); g.setLineDash([]);
    const line = (meal, bold) => {
      g.strokeStyle = COLORS[meal]; g.globalAlpha = bold ? 1 : 0.3; g.lineWidth = (bold ? 2.6 : 1.4) * d; g.lineJoin = 'round'; g.beginPath();
      for (let i = 0; i <= 100; i++) { const t = (i / 100) * TMAX, y = Y(model(meal, t).g); if (i === 0) g.moveTo(X(t), y); else g.lineTo(X(t), y); }
      g.stroke(); g.globalAlpha = 1;
    };
    if (state.compare) for (const k of ['meal', 'drink', 'none']) if (k !== state.meal) line(k, false);
    line(state.meal, true);
    g.fillStyle = '#fff'; g.beginPath(); g.arc(X(state.t), Y(cur.g), 4.5 * d, 0, Math.PI * 2); g.fill();
    g.strokeStyle = COLORS[state.meal]; g.lineWidth = 2 * d; g.stroke();
  }

  // ---------------- 操作 ----------------
  const fillSlider = () => R.slider.style.setProperty('--p', `${(R.slider.value / 500) * 100}%`);
  function setPlaying(on) { state.playing = on; R.play.setAttribute('aria-pressed', on ? 'true' : 'false'); root.classList.toggle('is-playing', on); R.playT.textContent = on ? 'Pause · 暫停' : 'Play · 播放'; }
  function setT(t, pause = true) { state.t = MathUtils.clamp(t, 0, TMAX); R.slider.value = Math.round(state.t * 100); fillSlider(); if (pause) setPlaying(false); apply(); }
  function setMeal(k) {
    if (!COLORS[k]) return;
    state.meal = k; state.note = '';
    R.meals.forEach((b) => b.setAttribute('aria-pressed', b.dataset.meal === k ? 'true' : 'false'));
    state.swallow = k === 'none' ? 1 : 0;
    setT(0, false);
  }
  R.meals.forEach((b) => b.addEventListener('click', () => setMeal(b.dataset.meal)));
  R.slider.addEventListener('input', () => setT(R.slider.value / 100));
  R.play.addEventListener('click', () => { if (!state.playing && state.t >= TMAX - 0.01) { state.swallow = state.meal === 'none' ? 1 : 0; setT(0, false); } setPlaying(!state.playing); });
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="skel"]', (v) => { if (bones) for (const b of bones.values()) b.mesh.visible = v; });
  bind('[data-t="compare"]', (v) => { state.compare = v; drawChart(); });
  $('.al-home').addEventListener('click', () => { if (state.ready) flyTo(homePos(), P.target); });
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t) { fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0; }
  fillSlider();

  // ---------------- 標籤 ----------------
  const Lb = {
    eso: lab.add('ey-lb', 'Esophagus · 食道'), stom: lab.add('ey-lb', 'Stomach · 胃'), liver: lab.add('ey-lb ey-lb-o', 'Liver: the sugar bank · 肝臟：糖銀行'),
    panc: lab.add('ey-lb fu-lb-i', 'Pancreas · 胰臟'), coil: lab.add('ey-lb', 'Small intestine · 小腸'), heart: lab.add('ey-lb', 'Heart · 心臟'),
    brain: lab.add('ey-lb', 'Brain · 大腦'), mus: lab.add('ey-lb', 'Leg muscle · 腿部肌肉'),
  };
  for (const el of Object.values(Lb)) el.hidden = true;
  let autoLabels = true;
  const tgL = $('[data-t="labels"]');
  if (tgL) tgL.addEventListener('change', () => { autoLabels = false; });
  function updateLabels() {
    const on = state.ready && state.labels;
    for (const el of Object.values(Lb)) el.hidden = !on;
    if (!on) return;
    lab.place(Lb.eso, P.eso.clone().add(V(-0.12, 0.07, 0)));
    lab.place(Lb.stom, P.stom.clone().add(V(0.13, 0.02, 0)));
    lab.place(Lb.liver, P.liver.clone().add(V(-0.17, 0.03, 0)));
    lab.place(Lb.panc, P.panc.clone().add(V(0.12, -0.035, 0)));
    lab.place(Lb.coil, P.coil.clone().add(V(-0.15, -0.03, 0)));
    lab.place(Lb.heart, P.heart.clone().add(V(0.13, 0.02, 0)));
    lab.place(Lb.brain, P.brain.clone().add(V(0.15, 0.03, 0)));
    lab.place(Lb.mus, P.mus.clone().add(V(0.13, 0, 0)));
  }

  // ---------------- 尺寸、迴圈 ----------------
  function resize() {
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = camera.aspect < 0.9 ? 40 : 32;
    camera.updateProjectionMatrix();
    if (autoLabels) { state.labels = w >= 520; if (tgL) tgL.checked = state.labels; }
    drawChart();
  }
  new ResizeObserver(resize).observe(spaceWrap);
  resize();

  function step(dt) {
    state.clock += dt;
    if (state.swallow < 1) state.swallow = Math.min(1, state.swallow + dt / 1.6);
    if (state.playing) {
      state.t = Math.min(TMAX, state.t + dt / 5);                    // 5 小時 ≈ 25 秒
      R.slider.value = Math.round(state.t * 100); fillSlider();
      if (state.t >= TMAX) setPlaying(false);
    }
    apply();
    if (fly.t < 1) {
      fly.t = Math.min(1, fly.t + dt / 0.9);
      const k = MathUtils.smootherstep(fly.t, 0, 1);
      camera.position.lerpVectors(fly.p0, fly.p1, k);
      controls.target.lerpVectors(fly.t0, fly.t1, k);
    }
  }
  let visible = false, raf = 0, last = 0;
  function frame(tm) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (tm - (last || tm)) / 1000);
    last = tm;
    if (state.ready) step(state.hold ? 0 : dt);
    controls.update();
    updateLabels();
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);
  apply();

  // 除錯用：$('[data-energy-lab]').__lab；背景分頁 rAF 很慢時用 run(秒)／render()
  root.__lab = {
    camera, controls, state, P, F, setT, setMeal, setPlaying, model, plate,
    zoomBelly: () => flyTo(P.belly.clone().add(V(0.12, 0.05, 0.75)), P.belly),
    run: (sec) => { for (let x = 0; x < sec; x += 1 / 30) step(1 / 30); fly.t = 1; },
    render: () => { step(0); controls.update(); updateLabels(); renderer.render(scene, camera); },
  };
  return { ready: () => state.ready, test: () => plate && plate.scrollTo() };
}

lazyBoot('[data-energy-lab]', initLab, { test: (lab) => lab.test() });
