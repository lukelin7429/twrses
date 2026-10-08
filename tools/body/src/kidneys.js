/*
 * 人體探索 · 第十三課「喝下去的水去了哪裡？」的 3D 腎臟。
 *
 * 真實的：骨架（skeleton.glb）淡淡定位；腎臟、輸尿管、膀胱是 BodyParts3D 的真實形狀（organs.glb，座標與骨架對齊）。
 * 自繪示意：主動脈、下腔靜脈、腎動脈與腎靜脈（鮮紅＝從心臟來、暗紅＝過濾後回去，沿用第三課不用藍色的約定）、
 *   血球、沿輸尿管往下的尿滴、膀胱裡的尿；浮在身體左邊的一顆放大腎元（絲球體、鮑氏囊、腎小管、集尿管、旁邊的微血管）。
 *
 * 模擬（示意，以體重約 30 公斤的孩子估算）：畫面 1 秒＝20 分鐘，模型的時鐘從早上 7:00 開始。
 *   過濾量約 4.4 公升／小時（大人約 140 公升／天）；尿量隨「喝了多少水」w（0–1）從 15 到 110 毫升／小時；
 *   膀胱容量 350 毫升，半滿時「想上廁所」，按鈕把它排空。尿液顏色從深琥珀到淡黃。
 * 腎元的粒子全部是「進度 s 的函數」：先沿血管到絲球體 → 過濾進腎小管 →
 *   水（藍，回收比例隨 w 變）與有用的東西（綠）在某一點跨回微血管、沿血管離開；廢物（黃褐）一路到集尿管。紅血球太大，留在血管裡。
 *
 * 喝水紀錄與顏色卡（initTracker）是 2D，不需要 WebGL。
 * 產物：cd tools/body && npm run build → assets/js/kidneys.js
 */
import {
  AmbientLight, BufferGeometry, CatmullRomCurve3, Color, DirectionalLight, DoubleSide, Float32BufferAttribute, Group,
  HemisphereLight, LineBasicMaterial, LineSegments, MathUtils, Mesh, MeshBasicMaterial, MeshStandardMaterial,
  PerspectiveCamera, Scene, SphereGeometry, TorusKnotGeometry, TubeGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot, loadBones, loadOrgans, worldVerts } from './common.js';

const V = (x, y, z) => new Vector3(x, y, z);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const cr = (pts) => new CatmullRomCurve3(pts, false, 'centripetal');
const MIN_PER_SEC = 20, FILTER_L_H = 4.4, CAP_ML = 350;
const urineRate = (w) => MathUtils.lerp(15, 110, w);              // 毫升／小時
const DARK = new Color(0xc98f1c), PALE = new Color(0xf5eeb0);

// ---------------- 喝水紀錄與顏色卡（2D） ----------------
function initTracker(root) {
  const box = root.querySelector('.kd2-strip');
  if (!box || box.dataset.ready) return null;
  box.dataset.ready = '1';
  const q = (s) => box.querySelector(s);
  const kg = q('.kd2-kg'), ml = q('.kd2-ml'), cups = [...box.querySelectorAll('.kd2-cup')], bar = q('.kd2-bar i'), mark = q('.kd2-bar b'), out = q('.kd2-total');
  let count = 0;
  function calc() {
    const w = parseFloat(kg.value), each = Math.max(0, parseFloat(ml.value) || 0);
    const goal = Math.max(1500, w > 0 ? w * 30 : 0);
    const total = count * each;
    cups.forEach((c, i) => c.setAttribute('aria-pressed', i < count ? 'true' : 'false'));
    bar.style.width = `${Math.min(100, (total / goal) * 100)}%`;
    mark.textContent = `${goal.toLocaleString('en-US')} mL`;
    const left = Math.max(0, goal - total), more = each > 0 ? Math.ceil(left / each) : 0;
    const why = w > 0 && w * 30 > 1500 ? [`${w} kg × 30`, `${w} 公斤 × 30`] : ['at least 1,500 mL for elementary students', '國小學生至少 1,500 毫升'];
    out.innerHTML = total >= goal
      ? `<b>${total.toLocaleString('en-US')} mL</b>: you reached today's goal of ${goal.toLocaleString('en-US')} mL (${why[0]}). Well done!<span class="zh">${total.toLocaleString('en-US')} 毫升：達到今天的目標 ${goal.toLocaleString('en-US')} 毫升（${why[1]}），做得好！</span>`
      : `<b>${total.toLocaleString('en-US')} mL</b> so far. Goal: ${goal.toLocaleString('en-US')} mL (${why[0]}). About <b>${more}</b> more ${more === 1 ? 'cup' : 'cups'} to go.<span class="zh">目前 ${total.toLocaleString('en-US')} 毫升。目標 ${goal.toLocaleString('en-US')} 毫升（${why[1]}），大約還要再喝 ${more} 杯。</span>`;
  }
  cups.forEach((c, i) => c.addEventListener('click', () => { count = count === i + 1 ? i : i + 1; calc(); }));
  kg.addEventListener('input', calc); ml.addEventListener('input', calc);
  const MSG = [
    ['Almost clear: you are drinking plenty. There is no need to force down more.', '幾乎透明：水喝得很夠了，不必再硬灌。'],
    ['Pale yellow: just right. Keep sipping through the day.', '淡黃色：剛剛好。繼續一整天小口小口地喝。'],
    ['Yellow: you are fine, but have a cup of water soon.', '黃色：還可以，但等一下記得喝一杯水。'],
    ['Dark yellow: your kidneys are saving water. Drink a cup now.', '深黃色：腎臟正在省水，現在就喝一杯吧。'],
  ];
  const sws = [...box.querySelectorAll('.kd2-sw')], cm = q('.kd2-color-msg');
  sws.forEach((b) => b.addEventListener('click', () => {
    sws.forEach((x) => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
    const m = MSG[+b.dataset.c];
    cm.innerHTML = `${esc(m[0])} Some foods and vitamins change the color too. If it ever looks red or brown, tell an adult.<span class="zh">${esc(m[1])}有些食物和維生素也會改變顏色；如果看起來是紅色或褐色，要告訴大人。</span>`;
  }));
  calc();
  return { scrollTo: () => box.scrollIntoView({ behavior: 'smooth', block: 'center' }) };
}

function initLab(root) {
  const $ = (sel) => root.querySelector(sel);
  const tracker = initTracker(root);
  const spaceWrap = $('.al-space');
  const cv = $('.al-space-cv');
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas: cv, antialias: true });
  } catch (e) {
    root.classList.add('al-nogl');
    return { ready: () => true, test: () => tracker && tracker.scrollTo() };
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const scene = new Scene();
  scene.background = new Color(0x0a1224);
  const camera = new PerspectiveCamera(32, 1, 0.01, 30);
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 0.1; controls.maxDistance = 5;
  scene.add(new HemisphereLight(0xdfe8ff, 0x2a1a20, 1.1));
  scene.add(new AmbientLight(0xffffff, 0.25));
  const key = new DirectionalLight(0xfff3e0, 1.9); key.position.set(1.5, 2.5, 3); scene.add(key);
  const rim = new DirectionalLight(0x9fc4ff, 0.8); rim.position.set(-2, 1.5, -2.5); scene.add(rim);

  const R = {
    loading: $('.sk-loading'), bar: $('.sk-bar i'), t: $('.kd2-t'), filt: $('.kd2-filt'), urine: $('.kd2-urine'), blad: $('.kd2-blad'),
    fill: $('.kd2-fill'), blT: $('.kd2-bl-t'), status: $('.kd2-status'), zoom: $('.kd2-zoom'), go: $('.kd2-go'), water: $('.kd2-water'),
  };
  const lab = labeler($('.al-labels'), cv, camera);
  const state = { ready: false, labels: true, blood: true, w: 0.55, min: 7 * 60, filtL: 0, urineMl: 0, bladMl: 60, zoom: false, emptying: 0, clock: 0 };
  let bones = null, parts = null;
  const P = {};
  const M = {
    art: new MeshStandardMaterial({ color: 0xff3434, roughness: 0.45 }),
    vein: new MeshStandardMaterial({ color: 0x7a2a66, roughness: 0.45 }),
    rbcA: new MeshBasicMaterial({ color: 0xff7a6a }), rbcV: new MeshBasicMaterial({ color: 0xb05a9a }),
    urine: new MeshStandardMaterial({ color: 0xe8c53a, roughness: 0.3, emissive: 0x3a2a00 }),
    tub: new MeshStandardMaterial({ color: 0xe9d59a, roughness: 0.5, transparent: true, opacity: 0.4, side: DoubleSide, depthWrite: false }),
    cap: new MeshStandardMaterial({ color: 0xff5a4a, roughness: 0.5, transparent: true, opacity: 0.45, side: DoubleSide, depthWrite: false }),
    glom: new MeshStandardMaterial({ color: 0xe0382e, roughness: 0.5 }),
    h2o: new MeshBasicMaterial({ color: 0x6fc3ff }), good: new MeshBasicMaterial({ color: 0x7ddc9a }),
    waste: new MeshBasicMaterial({ color: 0xc9a23a }), cell: new MeshBasicMaterial({ color: 0xff3434 }),
  };
  const body = new Group(), neph = new Group();
  body.visible = false; neph.visible = false;        // 載入完、放好位置才顯示
  scene.add(body, neph);
  const tube = (curve, r, mat, seg = 60, parent = body) => { const m = new Mesh(new TubeGeometry(curve, seg, r, 10, false), mat); parent.add(m); return m; };

  const flows = [];                                   // { curve, dots[], speed, mat }
  const drops = [];                                   // 輸尿管裡的尿滴
  let bladPivot = null, bladFill = null, zoomLines = null;

  Promise.all([
    loadBones(root.getAttribute('data-model'), (p) => { R.bar.style.width = `${Math.round(p * 80)}%`; }),
    loadOrgans(root.getAttribute('data-organs')),
  ]).then(([sk, og]) => {
    bones = sk.bones; parts = og.parts;
    scene.add(sk.model); scene.add(og.model);
    for (const b of bones.values()) {
      const near = ['spine', 'chest', 'pelvis'].includes(b.info.region);
      b.mat.opacity = near ? 0.2 : 0.08; b.mat.depthWrite = false; b.mesh.renderOrder = 1;
    }
    const K = (n) => parts.get(n);
    for (const n of ['r-kidney', 'l-kidney']) { K(n).mat.color.setHex(0x9c3a2e); K(n).mat.roughness = 0.5; }
    for (const n of ['r-ureter', 'l-ureter']) { K(n).mat.color.setHex(0xe9c9a0); K(n).mat.transparent = true; K(n).mat.opacity = 0.75; }
    K('tongue').mesh.visible = false; if (K('trachea')) K('trachea').mesh.visible = false;      // 別課用的器官
    // 膀胱：掛在底部的 pivot 上，裝得越滿越大；裡面一顆黃色的「尿」
    const bl = K('bladder');
    bl.mat.color.setHex(0xf0a8a0); bl.mat.transparent = true; bl.mat.opacity = 0.5; bl.mat.depthWrite = false; bl.mat.side = DoubleSide;
    bladPivot = new Group(); bladPivot.position.set(bl.center.x, bl.box.min.y, bl.center.z); scene.add(bladPivot); bladPivot.updateMatrixWorld(true);
    bladPivot.attach(bl.mesh);
    const bs = bl.box.getSize(V(0, 0, 0));
    bladFill = new Mesh(new SphereGeometry(1, 24, 16), M.urine);
    bladFill.scale.set(bs.x * 0.4, bs.y * 0.4, bs.z * 0.4); bladFill.position.set(0, bs.y * 0.5, 0);
    bladPivot.add(bladFill);
    P.blad = bl.center.clone(); P.bs = bs;

    // 自繪血管：主動脈在脊柱前偏左、下腔靜脈偏右
    const zf = bones.get('l1').box.max.z + 0.012;
    const kr = K('r-kidney'), kl = K('l-kidney');
    const hilR = V(kr.box.max.x - 0.006, kr.center.y, kr.center.z + 0.004), hilL = V(kl.box.min.x + 0.006, kl.center.y, kl.center.z + 0.004);
    const aTop = V(0.012, 1.33, zf), aBot = V(0.01, 1.0, zf + 0.004);
    const vTop = V(-0.02, 1.33, zf + 0.004), vBot = V(-0.02, 1.0, zf + 0.008);
    const aorta = cr([aTop, V(0.012, 1.2, zf), V(0.011, 1.1, zf), aBot]);
    const cava = cr([vBot, V(-0.02, 1.1, zf + 0.006), V(-0.02, 1.2, zf + 0.004), vTop]);
    tube(aorta, 0.008, M.art); tube(cava, 0.009, M.vein);
    tube(cr([aBot, V(0.03, 0.96, zf + 0.008), V(0.05, 0.92, zf + 0.012)]), 0.005, M.art, 20);
    tube(cr([aBot, V(-0.01, 0.96, zf + 0.008), V(-0.04, 0.92, zf + 0.012)]), 0.005, M.art, 20);
    const mk = (hil, side) => {
      const ya = hil.y + 0.004, yv = hil.y - 0.006;
      const art = cr([aTop, V(0.012, ya + 0.05, zf), V(0.012, ya + 0.004, zf), V(hil.x * 0.5 + 0.006, ya, zf - 0.004), hil.clone().setY(ya)]);
      const ven = cr([hil.clone().setY(yv), V(hil.x * 0.5 - 0.01, yv, zf + 0.002), V(-0.02, yv + 0.004, zf + 0.006), V(-0.02, yv + 0.06, zf + 0.004), vTop]);
      tube(cr([V(0.012, ya + 0.004, zf), V(hil.x * 0.5 + 0.006, ya, zf - 0.004), hil.clone().setY(ya)]), 0.004, M.art, 24);
      tube(cr([hil.clone().setY(yv), V(hil.x * 0.5 - 0.01, yv, zf + 0.002), V(-0.02, yv + 0.004, zf + 0.006)]), 0.0045, M.vein, 24);
      for (const [curve, mat] of [[art, M.rbcA], [ven, M.rbcV]]) {
        const dots = [];
        for (let i = 0; i < 7; i++) { const d = new Mesh(new SphereGeometry(0.0034, 10, 8), mat); d.renderOrder = 5; body.add(d); dots.push(d); }
        flows.push({ curve, dots, off: side * 0.07 });
      }
    };
    mk(hilR, 0); mk(hilL, 1);
    P.hilR = hilR; P.hilL = hilL; P.aorta = V(0.012, 1.24, zf); P.cava = V(-0.02, 1.2, zf);
    P.kidR = kr.center.clone(); P.kidL = kl.center.clone();

    // 輸尿管中心線：把真實輸尿管的頂點依高度切片取平均，尿滴沿著它往下
    for (const n of ['r-ureter', 'l-ureter']) {
      const vs = worldVerts(K(n).mesh).sort((a, b) => b.y - a.y);
      const pts = [], N = 14, per = Math.floor(vs.length / N);
      for (let i = 0; i < N; i++) { const c = V(0, 0, 0); const sl = vs.slice(i * per, (i + 1) * per); for (const v of sl) c.add(v); pts.push(c.multiplyScalar(1 / sl.length)); }
      const curve = cr(pts);
      for (let i = 0; i < 5; i++) { const d = new Mesh(new SphereGeometry(0.0032, 10, 8), M.urine); d.renderOrder = 5; body.add(d); drops.push({ d, curve, off: i / 5 + (n[0] === 'l' ? 0.1 : 0) }); }
      if (n === 'l-ureter') P.ureter = curve.getPointAt(0.5);
    }

    buildNephron(kl);
    // 鏡頭：正面略偏左上，看腎臟到膀胱
    P.target = V(0.06, (kr.center.y + bl.center.y) / 2 + 0.02, 0.08);
    P.home = V(0.12, 0.1, 0.8);
    camera.position.copy(homePos());
    controls.target.copy(P.target);
    body.visible = true; neph.visible = true;
    state.ready = true;
    R.loading.hidden = true;
    root.classList.add('al-ready');
  }).catch((e) => {
    console.error(e);
    R.loading.innerHTML = 'The model could not be loaded. Please reload the page.<br><span class="zh">模型載入失敗，請重新整理頁面。</span>';
  });
  const fit = () => MathUtils.clamp(1 + (1.1 - camera.aspect) * 0.7, 1, 1.5);
  function homePos() { return P.target.clone().add(P.home.clone().multiplyScalar(fit())); }

  // ---------------- 放大的腎元（浮在身體左邊，引線接到左腎） ----------------
  const NP = {};                                      // 路徑
  const parts3 = [];                                  // 粒子
  function buildNephron(kl) {
    const o = V(kl.box.max.x + 0.13, kl.center.y + 0.07, kl.center.z + 0.06);
    neph.position.copy(o);
    const blood = cr([V(-0.075, 0.04, 0), V(-0.03, 0.022, 0), V(-0.008, 0.006, 0), V(0.006, -0.006, 0.004), V(-0.004, -0.004, -0.004), V(0.008, 0.01, 0),
      V(0.03, 0.028, 0), V(0.058, 0.012, 0.012), V(0.062, -0.03, 0.012), V(0.046, -0.085, 0.012), V(0.06, -0.12, 0.012), V(0.082, -0.07, 0.012), V(0.098, -0.01, 0.012), V(0.12, 0.04, 0.006)]);
    const tub = cr([V(0.016, -0.012, 0), V(0.032, -0.028, 0), V(0.016, -0.042, 0), V(0.034, -0.056, 0), V(0.03, -0.1, 0), V(0.036, -0.132, 0), V(0.048, -0.1, 0),
      V(0.05, -0.05, 0), V(0.066, -0.034, 0), V(0.08, -0.05, 0), V(0.098, -0.04, 0), V(0.104, -0.09, 0), V(0.104, -0.16, 0)]);
    NP.blood = blood; NP.tub = tub; NP.g = 0.22;      // 血管路徑上絲球體的位置
    tube(blood, 0.0045, M.cap, 160, neph); tube(tub, 0.0075, M.tub, 160, neph);
    const glom = new Mesh(new TorusKnotGeometry(0.011, 0.0036, 80, 10, 3, 4), M.glom); glom.position.set(0, 0, 0); neph.add(glom);
    const capsule = new Mesh(new SphereGeometry(0.021, 24, 16), M.tub); capsule.position.set(0.002, -0.002, 0); neph.add(capsule);
    const add = (mat, r, kind, n) => { for (let i = 0; i < n; i++) { const m = new Mesh(new SphereGeometry(r, 8, 6), mat); m.renderOrder = 6; neph.add(m); parts3.push({ m, kind, s: Math.random(), seed: Math.random(), tr: Math.random() }); } };
    add(M.cell, 0.0036, 'cell', 10); add(M.h2o, 0.002, 'h2o', 34); add(M.good, 0.0022, 'good', 10); add(M.waste, 0.0022, 'waste', 12);
    // 引線：左腎表面一點 → 腎元四周
    const from = V(kl.box.max.x - 0.004, kl.center.y, kl.center.z + 0.01);
    const arr = [];
    for (const c of [V(-0.085, 0.06, 0), V(-0.085, -0.17, 0), V(0.13, 0.06, 0), V(0.13, -0.17, 0)]) { const w = c.clone().add(o); arr.push(from.x, from.y, from.z, w.x, w.y, w.z); }
    zoomLines = new LineSegments(new BufferGeometry(), new LineBasicMaterial({ color: 0xffd36e, transparent: true, opacity: 0.45 }));
    zoomLines.geometry.setAttribute('position', new Float32BufferAttribute(arr, 3));
    scene.add(zoomLines);
    P.neph = o.clone().add(V(0.022, -0.05, 0));
    P.n1 = o.clone().add(V(-0.012, 0.03, 0)); P.n2 = o.clone().add(V(0.012, -0.11, 0)); P.n3 = o.clone().add(V(0.125, -0.15, 0));
    P.nIn = o.clone().add(V(-0.075, 0.052, 0)); P.nOut = o.clone().add(V(0.12, 0.054, 0));
  }
  const tp = V(0, 0, 0), tq = V(0, 0, 0);
  function stepNephron(dt) {
    const keepWater = MathUtils.lerp(0.97, 0.62, state.w);     // 水有多少比例被回收（示意）
    for (const p of parts3) {
      p.s += dt * 0.085;
      if (p.s >= 1) { p.s -= 1; p.seed = Math.random(); p.tr = Math.random(); }
      const s = p.s, g = NP.g;
      if (p.kind === 'cell') { NP.blood.getPointAt(s, p.m.position); continue; }
      if (s < 0.18) { NP.blood.getPointAt((s / 0.18) * g, p.m.position); continue; }
      const back = p.kind === 'good' ? true : p.kind === 'waste' ? false : p.seed < keepWater;
      const tr = p.kind === 'good' ? 0.08 + p.tr * 0.2 : 0.15 + p.tr * 0.7;   // 在腎小管的哪裡被回收
      const tt = (s - 0.18) / 0.82;                    // 0–1：過濾之後的進度
      if (!back) { NP.tub.getPointAt(Math.min(1, tt * 1.05), p.m.position); continue; }
      const t1 = tr * 0.6;                             // 走到回收點花掉的進度
      if (tt < t1) { NP.tub.getPointAt((tt / t1) * tr, p.m.position); continue; }
      const ub = 0.42 + 0.5 * tr;                      // 對應的微血管位置
      if (tt < t1 + 0.06) { NP.tub.getPointAt(tr, tp); NP.blood.getPointAt(ub, tq); p.m.position.lerpVectors(tp, tq, (tt - t1) / 0.06); continue; }
      NP.blood.getPointAt(Math.min(1, ub + ((tt - t1 - 0.06) / (1 - t1 - 0.06)) * (1 - ub)), p.m.position);
    }
  }

  // ---------------- 模擬 ----------------
  const uCol = new Color();
  function sim(dt) {
    const dMin = dt * MIN_PER_SEC, w = state.w;
    state.clock += dt;
    state.min += dMin;
    state.filtL += (FILTER_L_H / 60) * dMin;
    const made = (urineRate(w) / 60) * dMin;
    state.urineMl += made;
    if (state.emptying > 0) {
      state.emptying -= dt;
      state.bladMl = Math.max(0, state.bladMl - dt * 320);
      if (state.bladMl <= 0) state.emptying = 0;
    } else {
      state.bladMl = Math.min(CAP_ML, state.bladMl + made);
      state.fullT = state.bladMl >= CAP_ML ? (state.fullT || 0) + dt : 0;
      if (state.fullT > 8) { state.emptying = 2; state.fullT = 0; }      // 滿了 8 秒沒人按，模型自己去上廁所
    }
    uCol.copy(DARK).lerp(PALE, Math.pow(w, 0.8));
    M.urine.color.copy(uCol);
    // 血球、尿滴
    for (const f of flows) f.dots.forEach((d, i) => { d.visible = state.blood; if (state.blood) f.curve.getPointAt((state.clock * 0.22 + i / f.dots.length + f.off) % 1, d.position); });
    const sp = 0.05 + 0.2 * w;
    for (const dr of drops) { dr.curve.getPointAt((state.clock * sp + dr.off) % 1, dr.d.position); dr.d.scale.setScalar(0.7 + 0.8 * w); }
    // 膀胱
    const fill = state.bladMl / CAP_ML;
    if (bladPivot) { const k = 0.72 + 0.6 * fill; bladPivot.scale.set(k, k, k); bladFill.scale.set(P.bs.x * 0.42 * Math.cbrt(Math.max(0.02, fill)), P.bs.y * 0.42 * Math.cbrt(Math.max(0.02, fill)), P.bs.z * 0.42 * Math.cbrt(Math.max(0.02, fill))); bladFill.position.y = P.bs.y * 0.42 * Math.cbrt(Math.max(0.02, fill)) + P.bs.y * 0.08; }
    stepNephron(dt);
    // 文字
    const hh = Math.floor(state.min / 60) % 24, mm = Math.floor(state.min % 60);
    R.t.textContent = `${hh}:${String(mm).padStart(2, '0')}`;
    R.filt.textContent = `${state.filtL.toFixed(0)} L`;
    R.urine.textContent = `${Math.round(state.urineMl)} mL`;
    R.blad.textContent = `${Math.round(fill * 100)}%`;
    R.fill.style.height = `${Math.round(fill * 100)}%`; R.fill.style.background = `#${uCol.getHexString()}`;
    R.blT.textContent = `${Math.round(state.bladMl)} / ${CAP_ML} mL`;
    R.go.disabled = fill < 0.3 || state.emptying > 0;
    let en, zh, cls = 'ey-ok';
    if (state.emptying > 0) { en = 'Ahh. The bladder squeezes, and the urine leaves the body. Remember to wash your hands!'; zh = '呼——膀胱收縮，把尿液排出體外。記得洗手！'; }
    else if (fill >= 0.98) { en = 'The bladder is full! Holding it for a long time is not good for you. Send the model to the restroom.'; zh = '膀胱滿了！憋太久對身體不好，快讓模型去上廁所。'; cls = 'ey-bad'; }
    else if (fill >= 0.5) { en = 'The bladder is half full. Nerves tell the brain: time to find a restroom.'; zh = '膀胱半滿了，神經告訴大腦：該去找廁所了。'; cls = 'ey-bad'; }
    else if (w < 0.25) { en = 'Not enough water. The kidneys take almost all the water back into the blood, so there is very little urine, and it is dark yellow.'; zh = '水喝得不夠。腎臟把幾乎所有的水都收回血液裡，所以尿很少，顏色是深黃色。'; cls = 'ey-bad'; }
    else if (w > 0.75) { en = 'Plenty of water. The kidneys let the extra go, so there is more urine, and it is pale.'; zh = '水喝得很夠。腎臟把多餘的水放掉，所以尿比較多，顏色很淡。'; }
    else { en = 'Just right. Blood flows in, the nephrons filter it, take back what the body needs, and send the rest to the bladder.'; zh = '剛剛好。血流進來，腎元把它過濾、把身體需要的收回去，其餘的送到膀胱。'; }
    const h = `${esc(en)}<span class="zh">${esc(zh)}</span>`;
    if (R.status.innerHTML !== h) { R.status.innerHTML = h; R.status.className = `ey-status kd2-status ${cls}`; }
  }

  // ---------------- 操作 ----------------
  const fillSlider = () => R.water.style.setProperty('--p', `${R.water.value}%`);
  R.water.addEventListener('input', () => { state.w = R.water.value / 100; fillSlider(); });
  fillSlider();
  R.go.addEventListener('click', () => { if (state.ready && state.bladMl > 0) state.emptying = 2; });
  function setZoom(on) {
    state.zoom = on; R.zoom.setAttribute('aria-pressed', on ? 'true' : 'false');
    if (!state.ready) return;
    if (on) flyTo(P.neph.clone().add(V(0.02, 0.03, 0.42).multiplyScalar(fit())), P.neph);
    else flyTo(homePos(), P.target);
  }
  R.zoom.addEventListener('click', () => setZoom(!state.zoom));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="blood"]', (v) => { state.blood = v; });
  bind('[data-t="skel"]', (v) => { if (bones) for (const b of bones.values()) b.mesh.visible = v; });
  $('.al-home').addEventListener('click', () => { if (state.ready) setZoom(false); });
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t) { fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0; }

  // ---------------- 標籤 ----------------
  const Lb = {
    kidR: lab.add('ey-lb', 'Right kidney · 右腎'), kidL: lab.add('ey-lb', 'Left kidney · 左腎'), ure: lab.add('ey-lb', 'Ureter · 輸尿管'),
    blad: lab.add('ey-lb', 'Bladder · 膀胱'), aorta: lab.add('ey-lb sn-lb-v', 'From the heart · 從心臟來'), cava: lab.add('ey-lb kd2-lb-v', 'Back to the heart · 回心臟'),
    neph: lab.add('ey-lb ey-lb-o', 'One nephron, magnified · 放大的一顆腎元'),
    n1: lab.add('ey-lb ey-lb-d', '1 Filter · 過濾'), n2: lab.add('ey-lb ey-lb-d', '2 Take back · 回收'), n3: lab.add('ey-lb ey-lb-d', '3 Flush · 排出'),
    nIn: lab.add('ey-lb sn-lb-v', 'Blood in · 血進來'), nOut: lab.add('ey-lb kd2-lb-v', 'Clean blood out · 乾淨的血出去'),
  };
  let autoLabels = true;
  const tgL = $('[data-t="labels"]');
  if (tgL) tgL.addEventListener('change', () => { autoLabels = false; });
  function updateLabels() {
    const on = state.ready && state.labels;
    for (const el of Object.values(Lb)) el.hidden = !on;
    if (!on) return;
    const show = (el, v, p, dy = 0) => { el.hidden = !v; if (v) lab.place(el, p, dy); };
    const z = state.zoom;
    show(Lb.kidR, !z, P.kidR.clone().add(V(-0.05, 0.03, 0)));
    show(Lb.kidL, !z, P.kidL.clone().add(V(0.03, 0.065, 0)));
    show(Lb.ure, !z, P.ureter.clone().add(V(0.03, 0, 0)));
    show(Lb.blad, !z, P.blad.clone().add(V(0, -0.045, 0)));
    show(Lb.aorta, !z, P.aorta.clone().add(V(0.03, 0.08, 0)));
    show(Lb.cava, !z, P.cava.clone().add(V(-0.05, 0.11, 0)));
    show(Lb.neph, !z, P.neph.clone().add(V(0, 0.13, 0)));
    show(Lb.n1, z, P.n1, -6); show(Lb.n2, z, P.n2, 0); show(Lb.n3, z, P.n3, 8);
    show(Lb.nIn, z, P.nIn, -6); show(Lb.nOut, z, P.nOut, -6);
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
  }
  new ResizeObserver(resize).observe(spaceWrap);
  resize();

  function step(dt) {
    if (!state.ready) return;
    sim(dt);
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
    step(dt);
    controls.update();
    updateLabels();
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  // 除錯用：$('[data-kidneys-lab]').__lab；背景分頁 rAF 很慢時用 run(秒)／render()
  root.__lab = {
    camera, controls, state, setZoom,
    setWater: (w) => { state.w = w; R.water.value = Math.round(w * 100); fillSlider(); },
    run: (sec) => { for (let x = 0; x < sec; x += 1 / 30) step(1 / 30); fly.t = 1; },
    render: () => { step(0); controls.update(); updateLabels(); renderer.render(scene, camera); },
  };
  return { ready: () => state.ready, test: () => tracker && tracker.scrollTo() };
}

lazyBoot('[data-kidneys-lab]', initLab, { test: (lab) => lab.test() });
