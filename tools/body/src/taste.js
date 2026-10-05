/*
 * 人體探索 · 第十四課「味道是怎麼來的？」的 3D 模型：風味的兩條路。
 *
 * 真實的：頭骨（skeleton.glb，從正中剖開：用 clippingPlanes 只留身體右半邊，鏡頭從左邊看）、舌頭（organs.glb 的 tongue，整顆）。
 * 自繪示意：臉的輪廓與咽後壁（x = 0 平面上的線）、軟顎、舌頭表面的味蕾（往下打射線找舌面）、鼻腔頂端的嗅覺區與嗅球、
 *   味覺神經、痛覺神經、嗅覺通往大腦的路、淡淡的大腦；兩個浮在臉前方的放大圖（味蕾、嗅覺區）。
 *
 * 一口食物的時間軸 tb（秒）：0–0.8 進嘴 → 味道分子陸續溶進口水、漂到整個舌頭的味蕾（位置是 tb 的函數）→
 *   氣味分子沿「後門」（舌根 → 軟顎後面 → 鼻咽 → 鼻腔頂端）往上（有狀態：捏住鼻子時卡在喉嚨，放開就繼續走，
 *   跟真的捏鼻子試吃一樣）→ 11 秒吞下、14 秒自動再吃一口。
 * 舌頭只回報五種基本味道（甜酸鹹苦鮮，每個味蕾五種都有，所以沒有「舌頭地圖」）；辣椒走的是痛覺與溫度神經（紅色）。
 * 長條的高低是教學用的示意值（lab.foods，以 data-foods 傳進來）。
 *
 * 捏鼻子試吃計分卡（initScore）是 2D，不需要 WebGL。
 * 產物：cd tools/body && npm run build → assets/js/taste.js
 */
import {
  AmbientLight, BoxGeometry, BufferGeometry, CatmullRomCurve3, Color, DirectionalLight, DoubleSide, Float32BufferAttribute, Group,
  HemisphereLight, LineBasicMaterial, LineSegments, MathUtils, Mesh, MeshBasicMaterial, MeshStandardMaterial,
  PerspectiveCamera, Plane, Raycaster, Scene, SphereGeometry, TubeGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot, loadBones, loadOrgans } from './common.js';

const V = (x, y, z) => new Vector3(x, y, z);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const cr = (pts) => new CatmullRomCurve3(pts, false, 'centripetal');
const TASTES = ['sweet', 'sour', 'salty', 'bitter', 'umami'];
const TCOL = [0xff8fc0, 0xe6f04a, 0xdfeaff, 0x6fcf7a, 0xffa24a], PAIN = 0xff3b30, ODOR = 0x9fd8ff;
const SWALLOW = 11, NEXT = 14;
function rng(seed) { let s = seed; return () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; }; }

// ---------------- 捏鼻子試吃計分卡（2D） ----------------
function initScore(root) {
  const box = root.querySelector('.ts-strip');
  if (!box || box.dataset.ready) return null;
  box.dataset.ready = '1';
  const KEY = 'twrses-taste-score';
  let d = { pinch: [0, 0], open: [0, 0] }, hist = [];
  try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.pinch && s.open) d = { pinch: [+s.pinch[0] || 0, +s.pinch[1] || 0], open: [+s.open[0] || 0, +s.open[1] || 0] }; } catch (e) { /* 沒有 localStorage 也能用 */ }
  const q = (s) => box.querySelector(s);
  const undo = q('.ts-undo'), diff = q('.ts-diff'), msg = q('.ts-msg');
  const pct = (a) => (a[1] ? Math.round((a[0] / a[1]) * 100) : 0);
  function draw() {
    for (const k of ['pinch', 'open']) {
      const row = box.querySelector(`[data-row="${k}"]`), a = d[k];
      row.querySelector('.ts-meter i').style.width = `${pct(a)}%`;
      row.querySelector('.ts-score').innerHTML = a[1] ? `<b>${a[0]} / ${a[1]}</b> right (${pct(a)}%)<span class="zh">猜對 ${a[0]} 次，共 ${a[1]} 次</span>` : '<b>0 / 0</b><span class="zh">還沒有紀錄</span>';
    }
    undo.disabled = !hist.length;
    const p = d.pinch, o = d.open;
    diff.textContent = p[1] && o[1] ? `${pct(p)}% → ${pct(o)}%` : '—';
    let en, zh;
    if (!p[1] && !o[1]) { en = 'Tap Right or Wrong after every guess. The card keeps count.'; zh = '每猜一次，就點「猜對」或「猜錯」，計分卡會幫你數。'; }
    else if (p[1] < 5 || o[1] < 5) { en = 'Keep going: try at least five candies each way before you decide.'; zh = '繼續做：兩種情況都至少試五顆，再下結論。'; }
    else if (pct(o) - pct(p) >= 20) { en = 'With the nose open, you got many more right. Most of the “flavor” of the candy came through your nose, not your tongue!'; zh = '放開鼻子之後，猜對的多很多。糖果的「口味」大部分是從鼻子來的，不是舌頭！'; }
    else if (pct(o) - pct(p) > -20) { en = 'About the same both ways. Were some candies much more sour than others? The tongue can tell that. Try flavors that are all just sweet.'; zh = '兩種情況差不多。是不是有幾顆特別酸？那是舌頭分得出來的。換成都只有甜味的口味再試試。'; }
    else { en = 'Surprising: more right answers with the nose pinched. Try more rounds, and make sure the taster cannot see the candy.'; zh = '真意外：捏住鼻子反而猜對比較多。多做幾輪，並確定試吃的人看不到糖果。'; }
    msg.innerHTML = `${esc(en)}<span class="zh">${esc(zh)}</span>`;
    try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) { /* ignore */ }
  }
  box.querySelectorAll('[data-add]').forEach((b) => b.addEventListener('click', () => {
    const k = b.closest('[data-row]').dataset.row, ok = b.dataset.add === '1';
    d[k][1] += 1; if (ok) d[k][0] += 1;
    hist.push([k, ok]); draw();
  }));
  undo.addEventListener('click', () => { const h = hist.pop(); if (!h) return; d[h[0]][1] -= 1; if (h[1]) d[h[0]][0] -= 1; draw(); });
  q('.ts-reset').addEventListener('click', () => { d = { pinch: [0, 0], open: [0, 0] }; hist = []; draw(); });
  draw();
  return { scrollTo: () => box.scrollIntoView({ behavior: 'smooth', block: 'center' }), data: () => d };
}

function initLab(root) {
  const $ = (sel) => root.querySelector(sel);
  const score = initScore(root);
  const spaceWrap = $('.al-space');
  const cv = $('.al-space-cv');
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas: cv, antialias: true });
  } catch (e) {
    root.classList.add('al-nogl');
    return { ready: () => true, test: () => score && score.scrollTo(), food: () => {} };
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.localClippingEnabled = true;
  const scene = new Scene();
  scene.background = new Color(0x0a1224);
  const camera = new PerspectiveCamera(32, 1, 0.01, 30);
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 0.08; controls.maxDistance = 3;
  scene.add(new HemisphereLight(0xdfe8ff, 0x2a1a20, 1.1));
  scene.add(new AmbientLight(0xffffff, 0.3));
  const key = new DirectionalLight(0xfff3e0, 1.8); key.position.set(3, 2.5, 1.5); scene.add(key);
  const rim = new DirectionalLight(0x9fc4ff, 0.7); rim.position.set(1, 1.5, -2.5); scene.add(rim);

  const FOODS = JSON.parse(root.getAttribute('data-foods') || '[]');
  const R = {
    loading: $('.sk-loading'), bar: $('.sk-bar i'), nose: $('.ts-nose'), status: $('.ts-status'), painRow: $('.ts-painrow'), painBar: $('.ts-painrow b i'),
    bars: TASTES.map((k) => $(`.ts-${k} b i`)), pinch: $('.ts-pinch'), bite: $('.ts-bite'), zb: $('.ts-zb'), zs: $('.ts-zs'),
    foods: [...root.querySelectorAll('[data-food]')],
  };
  const lab = labeler($('.al-labels'), cv, camera);
  const state = { ready: false, labels: true, food: 0, pinched: false, zoom: null, tb: 0, clock: 0, tasteLv: 0, smellLv: 0, auto: true };
  let bones = null;
  const P = {};
  const CUT = new Plane(V(-1, 0, 0), -0.003);         // 只留 x < −3 mm（身體右半邊）；正中的鼻中隔另外隱藏
  const M = {
    skin: new MeshBasicMaterial({ color: 0xf2c7a8, transparent: true, opacity: 0.75 }),
    soft: new MeshStandardMaterial({ color: 0xe58a8a, roughness: 0.6 }),
    patch: new MeshStandardMaterial({ color: 0xffc940, roughness: 0.4, emissive: 0x3a2800 }),
    nerve: new MeshStandardMaterial({ color: 0xf2dc7a, roughness: 0.5 }),
    pnerve: new MeshStandardMaterial({ color: 0xd9534a, roughness: 0.5 }),
    brain: new MeshStandardMaterial({ color: 0xe8a8b8, roughness: 0.7, transparent: true, opacity: 0.16, side: DoubleSide, depthWrite: false, clippingPlanes: [CUT] }),
    glow: new MeshBasicMaterial({ color: 0xfff2b0, transparent: true, opacity: 0, depthWrite: false }),
    odor: new MeshBasicMaterial({ color: ODOR }),
    finger: new MeshStandardMaterial({ color: 0xf2c7a8, roughness: 0.7, transparent: true, opacity: 0.8 }),
    pulseT: new MeshBasicMaterial({ color: 0xfff2a0 }), pulseP: new MeshBasicMaterial({ color: 0xff6a5a }), pulseS: new MeshBasicMaterial({ color: 0xffe08a }),
  };
  const head = new Group(), face = new Group(), budG = new Group(), smG = new Group();
  head.visible = false; face.visible = false; budG.visible = false; smG.visible = false;      // 載入完、放好位置才顯示
  scene.add(head, face, budG, smG);
  const tube = (curve, r, mat, seg = 40, parent = head, rs = 8) => { const m = new Mesh(new TubeGeometry(curve, seg, r, rs, false), mat); parent.add(m); return m; };
  const ball = (r, mat, parent = head, seg = 10) => { const m = new Mesh(new SphereGeometry(r, seg, Math.max(6, seg - 2)), mat); parent.add(m); return m; };

  const buds = [];          // { p, m, lit, col }
  const tast = [];          // 味道分子：{ m, kind(0–4 味道, 5 痛), bud, delay }
  const odor = [];          // 氣味分子：{ m, u, delay, jit }
  const pulses = [];        // { m, curve, off, kind }
  let retro = null, fingers = null, bolus = null, leadLines = null;

  Promise.all([
    loadBones(root.getAttribute('data-model'), (p) => { R.bar.style.width = `${Math.round(p * 80)}%`; }),
    loadOrgans(root.getAttribute('data-organs')),
  ]).then(([sk, og]) => {
    bones = sk.bones;
    scene.add(sk.model); scene.add(og.model);
    for (const b of bones.values()) {
      const isHead = b.info.region === 'skull' || /^c[1-4]$/.test(b.info.id);
      b.mesh.visible = isHead && b.info.id !== 'vomer';
      b.mat.opacity = 0.5; b.mat.side = DoubleSide; b.mat.clippingPlanes = [CUT]; b.mat.color.setHex(0xe6dcc6);
    }
    for (const [n, part] of og.parts) part.mesh.visible = n === 'tongue';
    const tg = og.parts.get('tongue');
    tg.mat.color.setHex(0xe9788a); tg.mat.roughness = 0.55;
    P.tongue = tg.center.clone();
    const tb = tg.box;

    // 味蕾：從上往下打射線找舌面，遍布整個舌頭（固定亂數，每次一樣）
    const rnd = rng(14), ray = new Raycaster(), down = V(0, -1, 0);
    og.model.updateMatrixWorld(true);
    for (let z = tb.min.z + 0.004; z < tb.max.z - 0.002; z += 0.0042) {
      for (let x = tb.min.x + 0.003; x < tb.max.x - 0.002; x += 0.0042) {
        const o = V(x + (rnd() - 0.5) * 0.002, tb.max.y + 0.02, z + (rnd() - 0.5) * 0.002);
        ray.set(o, down);
        const hit = ray.intersectObject(tg.mesh, false)[0];
        if (!hit || hit.point.y < tb.max.y - 0.012) continue;
        const mat = new MeshBasicMaterial({ color: 0xffd2d6 });
        const m = ball(0.00075, mat, head, 8); m.position.copy(hit.point); m.position.y += 0.0002;
        buds.push({ p: hit.point.clone(), m, mat, lit: 0, col: new Color(0xffd2d6) });
      }
    }
    const top = (x, z) => { ray.set(V(x, tb.max.y + 0.02, z), down); const h = ray.intersectObject(tg.mesh, false)[0]; return h ? h.point : V(x, tb.max.y, z); };
    P.bolus = top(0.002, tb.min.z + (tb.max.z - tb.min.z) * 0.6).add(V(0, 0.004, 0));
    P.lips = V(0.002, 1.521, 0.204);
    P.budsLb = top(0.006, tb.max.z - 0.012);

    // 自繪：臉的輪廓、咽後壁（x = 0 平面）
    const prof = [[0.150, 1.725], [0.178, 1.700], [0.186, 1.665], [0.188, 1.630], [0.186, 1.610], [0.184, 1.598], [0.196, 1.580], [0.210, 1.565], [0.219, 1.553],
      [0.212, 1.545], [0.200, 1.542], [0.199, 1.534], [0.203, 1.527], [0.198, 1.521], [0.201, 1.514], [0.193, 1.505], [0.192, 1.495], [0.188, 1.484], [0.172, 1.474], [0.140, 1.470], [0.115, 1.462]];
    tube(cr(prof.map(([z, y]) => V(0, y, z))), 0.0009, M.skin, 160, face, 6);
    tube(cr([V(0, 1.585, 0.098), V(0, 1.565, 0.092), V(0, 1.53, 0.091), V(0, 1.47, 0.094)]), 0.0008, M.skin, 40, face, 6);
    // 軟顎與懸雍垂：接在硬顎後緣
    const hp = bones.get('r-palatine').box;
    P.palBack = V(-0.002, hp.min.y + 0.003, hp.min.z + 0.002);
    tube(cr([P.palBack, P.palBack.clone().add(V(0, -0.003, -0.004)), P.palBack.clone().add(V(0, -0.009, -0.0055)), P.palBack.clone().add(V(0, -0.014, -0.005))]), 0.002, M.soft, 24);
    P.softLb = P.palBack.clone().add(V(0, -0.009, -0.006));

    // 嗅覺區（鼻腔頂端）、嗅球、通往大腦的路
    const eth = bones.get('ethmoid').box;
    P.patch = V(-0.0025, eth.max.y - 0.006, (eth.min.z + eth.max.z) / 2 + 0.002);
    const patch = ball(1, M.patch, head, 16); patch.scale.set(0.0035, 0.0012, 0.009); patch.position.copy(P.patch);
    const bulb = ball(1, M.patch, head, 16); bulb.scale.set(0.003, 0.0026, 0.008); bulb.position.copy(P.patch).add(V(0, 0.0085, 0.001));
    const tract = cr([bulb.position.clone(), P.patch.clone().add(V(0, 0.012, -0.02)), P.patch.clone().add(V(-0.004, 0.02, -0.05))]);
    tube(tract, 0.0011, M.nerve, 24);
    // 味覺神經、痛覺神經：從舌頭往後上方到腦幹附近
    P.brain = V(-0.004, 1.615, 0.085);
    const tasteN = cr([V(-0.008, tb.min.y + 0.008, tb.min.z + 0.012), V(-0.022, 1.53, 0.098), V(-0.02, 1.565, 0.075), V(-0.008, 1.595, 0.08), P.brain]);
    const painN = cr([V(-0.012, tb.min.y + 0.01, tb.max.z - 0.02), V(-0.03, 1.54, 0.125), V(-0.028, 1.575, 0.1), V(-0.012, 1.6, 0.092), P.brain]);
    tube(tasteN, 0.0009, M.nerve, 40); tube(painN, 0.0009, M.pnerve, 40);
    const smellN = cr([P.patch, bulb.position.clone(), ...tract.getPoints(8).slice(1), P.brain]);
    for (const [curve, mat, kind] of [[tasteN, M.pulseT, 't'], [painN, M.pulseP, 'p'], [smellN, M.pulseS, 's']]) {
      for (let i = 0; i < 4; i++) { const m = ball(0.0017, mat); m.renderOrder = 6; pulses.push({ m, curve, off: i / 4, kind }); }
    }
    // 淡淡的大腦與「風味」亮點
    const br = ball(1, M.brain, head, 28); br.scale.set(0.058, 0.05, 0.078); br.position.set(0, 1.64, 0.075); br.renderOrder = 2;
    P.glow = ball(0.011, M.glow, head, 16); P.glow.position.copy(P.brain); P.glow.renderOrder = 7;
    P.brainLb = V(0, 1.665, 0.06);

    // 後門：舌根 → 軟顎後面 → 鼻咽 → 後鼻孔 → 鼻腔頂端的嗅覺區
    const pb = P.palBack;
    retro = cr([P.bolus.clone(), top(-0.001, tb.min.z + 0.009).add(V(0, 0.003, 0)), V(-0.001, pb.y - 0.021, pb.z - 0.005), V(-0.001, pb.y - 0.012, pb.z - 0.0115), V(-0.001, pb.y + 0.003, pb.z - 0.011),
      V(-0.002, pb.y + 0.014, pb.z - 0.004), V(-0.0025, pb.y + 0.026, pb.z + 0.012), V(-0.0025, P.patch.y - 0.012, P.patch.z - 0.012), P.patch.clone().add(V(0, -0.002, 0))]);
    P.gate = 0.4;                                     // 捏住鼻子時氣味分子卡在這裡（喉嚨、軟顎後面）
    P.backLb = retro.getPointAt(0.5); P.cavLb = V(-0.003, (pb.y + P.patch.y) / 2 + 0.004, P.patch.z + 0.012);
    P.nostril = V(0, 1.546, 0.206);
    const r2 = rng(7);
    for (let i = 0; i < 26; i++) { const m = ball(0.0011, M.odor); m.renderOrder = 6; odor.push({ m, u: 0, delay: 1.2 + i * 0.26, jit: V(r2() - 0.5, r2() - 0.5, r2() - 0.5).multiplyScalar(0.003), sp: 0.16 + r2() * 0.05 }); }
    for (let i = 0; i < 44; i++) { const mat = new MeshBasicMaterial({ color: 0xffffff }); const m = ball(0.001, mat); m.renderOrder = 6; tast.push({ m, mat, kind: 0, bud: Math.floor(r2() * buds.length), delay: 0.8 + r2() * 4.6 }); }
    bolus = ball(0.005, new MeshStandardMaterial({ color: 0xff6f91, roughness: 0.4 }), head, 16);

    // 捏鼻子的兩根手指
    fingers = new Group(); head.add(fingers);
    for (const s of [-1, 1]) { const f = ball(1, M.finger, fingers, 14); f.scale.set(0.0055, 0.0065, 0.012); f.userData.s = s; f.position.set(s * 0.02, 1.553, 0.21); }
    fingers.visible = false;

    buildBud(top(0.008, tb.max.z - 0.02));
    buildSmell();
    assignFood();
    // 鏡頭：從身體左邊看剖面，臉朝畫面左邊
    P.target = V(0, 1.558, 0.168);
    P.home = V(0.6, 0.045, 0.03);
    camera.position.copy(homePos());
    controls.target.copy(P.target);
    head.visible = true; face.visible = true; budG.visible = true; smG.visible = true;
    state.ready = true;
    R.loading.hidden = true;
    root.classList.add('al-ready');
  }).catch((e) => {
    console.error(e);
    R.loading.innerHTML = 'The model could not be loaded. Please reload the page.<br><span class="zh">模型載入失敗，請重新整理頁面。</span>';
  });
  const fit = () => MathUtils.clamp(1 + (1.15 - camera.aspect) * 0.4, 1, 1.4);
  function homePos() { return P.target.clone().add(P.home.clone().multiplyScalar(fit())); }

  // ---------------- 放大的味蕾（浮在下巴前方） ----------------
  const BUD = { cells: [], mol: [], painTip: null };
  function buildBud(from) {
    const o = V(0, 1.462, 0.258);
    budG.position.copy(o);
    const epi = new MeshStandardMaterial({ color: 0xe9788a, roughness: 0.6, transparent: true, opacity: 0.55, depthWrite: false });
    for (const s of [-1, 1]) { const b = new Mesh(new BoxGeometry(0.012, 0.05, 0.027), epi); b.position.set(-0.004, -0.001, s * 0.0185); budG.add(b); }
    const sal = new Mesh(new BoxGeometry(0.012, 0.007, 0.064), new MeshStandardMaterial({ color: 0x8fd0ff, transparent: true, opacity: 0.3, depthWrite: false })); sal.position.set(-0.004, 0.0275, 0); budG.add(sal);
    // 九顆細胞排成洋蔥形：五顆各管一種味道，其餘是支持細胞
    const order = [-1, 0, -1, 1, 2, 3, -1, 4, -1];
    order.forEach((k, i) => {
      const a = (i / (order.length - 1) - 0.5) * 1.5;
      const mat = new MeshStandardMaterial({ color: k < 0 ? 0xcdb7c6 : TCOL[k], roughness: 0.5, emissive: k < 0 ? 0x000000 : TCOL[k], emissiveIntensity: 0 });
      const c = ball(1, mat, budG, 14); c.scale.set(0.0036, 0.021, 0.0024); c.position.set(i % 2 ? 0.0015 : -0.001, -0.002 + Math.cos(a) * 0.002, Math.sin(a) * 0.0105); c.rotation.x = a * 0.42;
      if (k >= 0) BUD.cells[k] = { mat, base: new Color(TCOL[k]).multiplyScalar(0.42), full: new Color(TCOL[k]) };
    });
    tube(cr([V(0, -0.02, 0), V(0, -0.034, 0.003), V(0, -0.05, -0.004)]), 0.0015, M.nerve, 16, budG);
    tube(cr([V(0, -0.02, -0.006), V(0, -0.03, -0.004), V(0, -0.034, 0.003)]), 0.001, M.nerve, 12, budG);
    tube(cr([V(0, -0.02, 0.006), V(0, -0.03, 0.006), V(0, -0.034, 0.003)]), 0.001, M.nerve, 12, budG);
    // 痛覺神經末梢：在味蕾旁邊，不屬於味蕾
    tube(cr([V(0.002, -0.05, 0.03), V(0.002, -0.02, 0.026), V(0.002, 0.004, 0.027), V(0.002, 0.016, 0.024)]), 0.0011, M.pnerve, 20, budG);
    tube(cr([V(0.002, 0.004, 0.027), V(0.002, 0.014, 0.031)]), 0.0008, M.pnerve, 8, budG);
    BUD.painMat = new MeshBasicMaterial({ color: PAIN, transparent: true, opacity: 0 });
    BUD.painTip = ball(0.0042, BUD.painMat, budG, 12); BUD.painTip.position.set(0.002, 0.017, 0.026);
    const r = rng(3);
    for (let i = 0; i < 12; i++) { const mat = new MeshBasicMaterial({ color: 0xffffff }); const m = ball(0.0013, mat, budG, 8); m.renderOrder = 6; BUD.mol.push({ m, mat, off: r(), z0: (r() - 0.5) * 0.05, kind: 0 }); }
    BUD.pulse = [0, 1, 2].map(() => { const m = ball(0.002, M.pulseT, budG, 8); m.renderOrder = 6; return m; });
    BUD.ppulse = [0, 1].map(() => { const m = ball(0.0018, M.pulseP, budG, 8); m.renderOrder = 6; return m; });
    BUD.nerve = cr([V(0, -0.02, 0), V(0, -0.034, 0.003), V(0, -0.05, -0.004)]);
    BUD.pn = cr([V(0.002, 0.016, 0.024), V(0.002, 0.004, 0.027), V(0.002, -0.02, 0.026), V(0.002, -0.05, 0.03)]);
    P.bud = o.clone().add(V(0, -0.008, 0.003));
    P.bPore = o.clone().add(V(0, 0.024, 0)); P.bCells = o.clone().add(V(0, 0, -0.022)); P.bNerve = o.clone().add(V(0, -0.046, -0.012));
    P.bSal = o.clone().add(V(0, 0.03, -0.026)); P.bPain = o.clone().add(V(0, 0.012, 0.04)); P.bTitle = o.clone().add(V(0, 0.046, 0));
    const arr = [];
    for (const c of [V(0, 0.032, -0.032), V(0, 0.032, 0.032)]) { const w = c.clone().add(o); arr.push(from.x, from.y, from.z, w.x, w.y, w.z); }
    P.leadBud = arr;
  }

  // ---------------- 放大的嗅覺區（浮在額頭前方） ----------------
  const SM = { cells: [], mol: [], pulse: [] };
  const NCOL = [0xff8a7a, 0xffc940, 0x9be37a, 0x6fd3ff, 0xb79bff, 0xff9be0];
  const CHORD = [0b101001, 0b010110, 0b110001, 0b001101, 0b100110, 0b011010];      // 每種食物點亮的一組嗅覺細胞（示意：「和弦」）
  function buildSmell() {
    const o = V(0, 1.652, 0.262);
    smG.position.copy(o);
    const bone = new MeshStandardMaterial({ color: 0xe6dcc6, roughness: 0.7 });
    for (let i = 0; i < 7; i++) { const b = new Mesh(new BoxGeometry(0.01, 0.005, 0.0052), bone); b.position.set(-0.004, 0.012, (i - 3) * 0.0092); smG.add(b); }
    const bulb = ball(1, M.patch, smG, 20); bulb.scale.set(0.006, 0.0075, 0.03); bulb.position.set(-0.002, 0.026, 0);
    const muc = new Mesh(new BoxGeometry(0.012, 0.011, 0.066), new MeshStandardMaterial({ color: 0xa8e0c8, transparent: true, opacity: 0.28, depthWrite: false })); muc.position.set(-0.004, -0.0215, 0); smG.add(muc);
    const lines = [];
    for (let i = 0; i < 6; i++) {
      const z = (i - 2.5) * 0.0092;
      const mat = new MeshStandardMaterial({ color: NCOL[i], roughness: 0.5, emissive: NCOL[i], emissiveIntensity: 0 });
      const body = ball(1, mat, smG, 12); body.scale.set(0.003, 0.0052, 0.003); body.position.set(0, -0.002, z);
      tube(cr([V(0, 0.002, z), V(0, 0.012, z), V(0, 0.021, z * 0.8)]), 0.0007, mat, 10, smG, 6);
      tube(cr([V(0, -0.006, z), V(0, -0.016, z)]), 0.0009, mat, 6, smG, 6);
      const knob = ball(0.0016, mat, smG, 8); knob.position.set(0, -0.0165, z);
      for (const dz of [-0.0032, -0.0012, 0.0012, 0.0032]) lines.push(0, -0.0165, z, 0, -0.025, z + dz);
      SM.cells.push({ mat, z, base: new Color(NCOL[i]).multiplyScalar(0.38), full: new Color(NCOL[i]) });
      const pm = ball(0.0016, M.pulseS, smG, 8); pm.renderOrder = 6; SM.pulse.push(pm);
    }
    const cil = new LineSegments(new BufferGeometry(), new LineBasicMaterial({ color: 0xfff0c0 }));
    cil.geometry.setAttribute('position', new Float32BufferAttribute(lines, 3)); smG.add(cil);
    const r = rng(5);
    for (let i = 0; i < 12; i++) { const m = ball(0.0013, M.odor, smG, 8); m.renderOrder = 6; SM.mol.push({ m, off: r(), z0: (r() - 0.5) * 0.056, cell: Math.floor(r() * 6) }); }
    P.smell = o.clone().add(V(0, -0.004, 0));
    P.sBulb = o.clone().add(V(0, 0.04, 0)); P.sBone = o.clone().add(V(0, 0.012, -0.04)); P.sCells = o.clone().add(V(0, -0.002, 0.04));
    P.sMuc = o.clone().add(V(0, -0.022, -0.042)); P.sMol = o.clone().add(V(0, -0.04, 0.02)); P.sTitle = o.clone().add(V(0, -0.052, 0));
    const arr = P.leadBud.slice();
    for (const c of [V(0, -0.03, -0.034), V(0, 0.02, -0.034)]) { const w = c.clone().add(o); arr.push(P.patch.x, P.patch.y, P.patch.z, w.x, w.y, w.z); }
    leadLines = new LineSegments(new BufferGeometry(), new LineBasicMaterial({ color: 0xffd36e, transparent: true, opacity: 0.45 }));
    leadLines.geometry.setAttribute('position', new Float32BufferAttribute(arr, 3));
    scene.add(leadLines);
  }

  // ---------------- 一口食物 ----------------
  function assignFood() {
    const f = FOODS[state.food]; if (!f) return;
    const w = [...f.taste, f.pain], sum = w.reduce((a, b) => a + b, 0) || 1;
    const kinds = [];
    w.forEach((x, k) => { const n = Math.round((x / sum) * tast.length); for (let i = 0; i < n; i++) kinds.push(k); });
    const top = w.indexOf(Math.max(...w));
    tast.forEach((t, i) => { t.kind = kinds[i] === undefined ? top : kinds[i]; t.mat.color.setHex(t.kind === 5 ? PAIN : TCOL[t.kind]); });
    BUD.mol.forEach((m, i) => { m.kind = tast[(i * 3) % tast.length].kind; m.mat.color.setHex(m.kind === 5 ? PAIN : TCOL[m.kind]); });
    if (bolus) bolus.material.color.setHex({ gummy: 0xff5f8f, lemon: 0xf5e04a, chips: 0xc98a4a, choco: 0x5a3320, broth: 0xb9a15a, chili: 0xd9261c }[f.key] || 0xff6f91);
  }
  function bite() { state.tb = 0; for (const o of odor) o.u = 0; for (const b of buds) b.lit = 0; }
  function setFood(i) {
    if (typeof i === 'string') i = FOODS.findIndex((f) => f.key === i);
    if (i < 0 || !FOODS[i]) return;
    state.food = i;
    R.foods.forEach((b, k) => b.setAttribute('aria-pressed', k === i ? 'true' : 'false'));
    assignFood(); bite();
  }
  function setPinch(on) {
    state.pinched = !!on; R.pinch.setAttribute('aria-pressed', on ? 'true' : 'false');
    if (!on && state.tb < SWALLOW) state.tb = Math.min(state.tb, 5);      // 放開鼻子：留足夠的時間讓氣味飄上去
  }

  const tp = V(0, 0, 0), tc = new Color();
  function sim(dt) {
    state.clock += dt; state.tb += dt;
    if (state.auto && state.tb > NEXT) bite();
    const tb = state.tb, f = FOODS[state.food], fade = MathUtils.clamp(1 - (tb - SWALLOW) / 1.5, 0, 1);
    // 食物：從嘴唇進來，放在舌頭上，越嚼越小
    const inK = MathUtils.clamp(tb / 0.8, 0, 1);
    bolus.position.lerpVectors(P.lips, P.bolus, MathUtils.smootherstep(inK, 0, 1));
    bolus.scale.setScalar(Math.max(0.001, (1 - 0.6 * MathUtils.clamp((tb - 0.8) / 8, 0, 1)) * fade));
    // 味道分子：溶進口水，漂到遍布舌頭的味蕾
    let arrived = 0;
    for (const b of buds) b.lit = 0;
    for (const t of tast) {
      const e = MathUtils.clamp((tb - t.delay) / 1.6, 0, 1), b = buds[t.bud];
      t.m.visible = tb > t.delay && fade > 0.02;
      if (!t.m.visible) continue;
      t.m.position.lerpVectors(P.bolus, b.p, e); t.m.position.y += Math.sin(Math.PI * e) * 0.0035 + 0.0012;
      t.m.scale.setScalar(fade * (t.kind === 5 && e >= 1 ? 1 + 0.6 * Math.sin(state.clock * 22 + t.delay * 9) : 1));
      if (e >= 1) { arrived++; b.lit = 1; b.col.setHex(t.kind === 5 ? PAIN : TCOL[t.kind]); }
    }
    for (const b of buds) { b.mat.color.copy(b.lit ? b.col : tc.setHex(0xffd2d6)); b.m.scale.setScalar(b.lit ? 1.7 * (0.4 + 0.6 * fade) + 0.2 * Math.sin(state.clock * 6 + b.p.z * 900) : 1); }
    state.tasteLv = (arrived / tast.length) * fade;
    // 氣味分子：走後門；捏住鼻子就卡在喉嚨
    let smelled = 0;
    for (const o of odor) {
      if (tb > o.delay && fade > 0) { const cap = state.pinched ? P.gate : 1; if (o.u < cap) o.u = Math.min(cap, o.u + dt * o.sp); else if (o.u > cap && cap < 1) o.u = Math.max(cap, o.u - dt * 0.5); }
      o.m.visible = tb > o.delay && fade > 0.02;
      if (!o.m.visible) continue;
      retro.getPointAt(o.u, tp);
      const stuck = state.pinched && o.u >= P.gate - 0.001, wob = stuck ? 1.6 : 1;
      o.m.position.set(tp.x + o.jit.x * 0.4, tp.y + o.jit.y * wob + (stuck ? Math.sin(state.clock * 3 + o.delay * 7) * 0.0015 : 0), tp.z + o.jit.z * wob);
      o.m.scale.setScalar(fade);
      if (o.u >= 0.97) smelled++;
    }
    state.smellLv = Math.min(1, smelled / 8) * fade;
    // 神經訊號
    const lvT = Math.max(...f.taste) * state.tasteLv, lvP = f.pain * state.tasteLv, lvS = state.smellLv;
    for (const p of pulses) {
      const lv = p.kind === 't' ? lvT : p.kind === 'p' ? lvP : lvS;
      p.m.visible = lv > 0.15;
      if (p.m.visible) p.curve.getPointAt((state.clock * 0.55 + p.off) % 1, p.m.position);
    }
    M.glow.opacity = 0.75 * Math.max(lvT, lvP, lvS) * (0.8 + 0.2 * Math.sin(state.clock * 5));
    M.glow.color.setHex(lvS > 0.3 && lvT > 0.15 ? 0xfff2b0 : lvP > lvT ? 0xff8a7a : 0xffd0e0);
    P.glow.scale.setScalar(lvS > 0.3 ? 1.5 : 1);
    // 手指
    fingers.visible = state.pinched || fingers.userData.k > 0.01;
    fingers.userData.k = MathUtils.damp(fingers.userData.k || 0, state.pinched ? 1 : 0, 9, dt);
    for (const fg of fingers.children) fg.position.x = fg.userData.s * MathUtils.lerp(0.024, 0.0095, fingers.userData.k);
    // 放大的味蕾
    f.taste.forEach((x, k) => { const c = BUD.cells[k], v = x * state.tasteLv; c.mat.color.copy(c.base).lerp(c.full, Math.min(1, v * 1.4)); c.mat.emissiveIntensity = v * 0.9; });
    BUD.painMat.opacity = Math.min(0.9, lvP * (0.7 + 0.3 * Math.sin(state.clock * 14)));
    BUD.painTip.scale.setScalar(1 + lvP * 0.5);
    for (const m of BUD.mol) {
      const s = (state.clock * 0.28 + m.off) % 1;
      m.m.visible = tb > 1 && fade > 0.02;
      if (m.kind === 5) m.m.position.set(0.004, MathUtils.lerp(0.036, 0.019, s), MathUtils.lerp(m.z0 * 0.5 + 0.02, 0.026, s));
      else m.m.position.set(0.003, s < 0.6 ? 0.03 + Math.sin(s * 30 + m.off * 9) * 0.0015 : MathUtils.lerp(0.03, 0.012, (s - 0.6) / 0.4), s < 0.6 ? MathUtils.lerp(m.z0, 0, s / 0.6) : 0);
      m.m.scale.setScalar(fade);
    }
    BUD.pulse.forEach((m, i) => { m.visible = lvT > 0.15; if (m.visible) BUD.nerve.getPointAt((state.clock * 0.7 + i / 3) % 1, m.position); });
    BUD.ppulse.forEach((m, i) => { m.visible = lvP > 0.15; if (m.visible) BUD.pn.getPointAt((state.clock * 0.7 + i / 2) % 1, m.position); });
    // 放大的嗅覺區
    const chord = CHORD[state.food % CHORD.length];
    const coming = odor.some((o) => o.m.visible && o.u > 0.8);
    SM.cells.forEach((c, i) => { const on = (chord >> i) & 1 ? lvS : 0; c.mat.color.copy(c.base).lerp(c.full, on); c.mat.emissiveIntensity = on * 0.9; const pm = SM.pulse[i]; pm.visible = on > 0.15; if (pm.visible) pm.position.set(0.002, MathUtils.lerp(-0.002, 0.022, (state.clock * 0.9 + i * 0.17) % 1), c.z); });
    for (const m of SM.mol) {
      const s = (state.clock * 0.25 + m.off) % 1, hitCell = (chord >> m.cell) & 1, zc = SM.cells[m.cell].z;
      m.m.visible = coming && fade > 0.02;
      m.m.position.set(0.003, MathUtils.lerp(-0.05, hitCell ? -0.0215 : -0.03, Math.min(1, s / 0.7)), MathUtils.lerp(m.z0, hitCell ? zc : m.z0 + 0.01, Math.min(1, s / 0.7)));
      m.m.scale.setScalar(fade * (hitCell || s < 0.7 ? 1 : Math.max(0, 1 - (s - 0.7) / 0.3)));
    }
    // 右欄
    R.bars.forEach((el, k) => { el.style.width = `${Math.round(f.taste[k] * state.tasteLv * 100)}%`; });
    R.painBar.style.width = `${Math.round(lvP * 100)}%`;
    R.painRow.classList.toggle('ts-on', f.pain > 0);
    let nose, ncls = '';
    if (lvS > 0.3) { nose = `👃 <b>${esc(f.smell_en)}</b><span class="zh">${esc(f.smell_zh)}</span>`; ncls = 'ts-on'; }
    else if (state.pinched) { nose = '🚫 Nothing. No air is moving through the nose.<span class="zh">什麼都沒有：鼻子裡的空氣流不動。</span>'; ncls = 'ts-off'; }
    else nose = '… nothing yet<span class="zh">還沒聞到</span>';
    if (R.nose.innerHTML !== nose) { R.nose.innerHTML = nose; R.nose.className = `ts-nose ${ncls}`; }
    let en, zh, cls = '';
    if (lvS > 0.3) { en = f.open_en; zh = f.open_zh; cls = 'ey-ok'; }
    else if (state.tasteLv > 0.3 && state.pinched) { en = f.pinch_en; zh = f.pinch_zh; cls = 'ey-bad'; }
    else if (state.tasteLv > 0.3) { en = 'The tongue reports first. The smell is still on its way up the back door…'; zh = '舌頭先回報了；氣味還在從後門往上飄……'; }
    else if (tb > SWALLOW) { en = 'Swallowed. Pick a food, or take another bite.'; zh = '吞下去了。選一種食物，或是再吃一口。'; }
    else { en = 'Chewing… Saliva is dissolving the food.'; zh = '咀嚼中……口水正在把食物溶開。'; }
    const h = `${esc(en)}<span class="zh">${esc(zh)}</span>`;
    if (R.status.innerHTML !== h) { R.status.innerHTML = h; R.status.className = `ey-status ts-status ${cls}`; }
  }

  // ---------------- 操作 ----------------
  R.foods.forEach((b, i) => b.addEventListener('click', () => setFood(i)));
  R.pinch.addEventListener('click', () => setPinch(!state.pinched));
  R.bite.addEventListener('click', () => bite());
  function setZoom(z) {
    state.zoom = z;
    R.zb.setAttribute('aria-pressed', z === 'bud' ? 'true' : 'false'); R.zs.setAttribute('aria-pressed', z === 'smell' ? 'true' : 'false');
    if (!state.ready) return;
    if (z === 'bud') flyTo(P.bud.clone().add(V(0.3, 0.01, 0).multiplyScalar(fit())), P.bud);
    else if (z === 'smell') flyTo(P.smell.clone().add(V(0.3, 0.01, 0).multiplyScalar(fit())), P.smell);
    else flyTo(homePos(), P.target);
  }
  R.zb.addEventListener('click', () => setZoom(state.zoom === 'bud' ? null : 'bud'));
  R.zs.addEventListener('click', () => setZoom(state.zoom === 'smell' ? null : 'smell'));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="skull"]', (v) => { if (bones) for (const b of bones.values()) if ((b.info.region === 'skull' || /^c[1-4]$/.test(b.info.id)) && b.info.id !== 'vomer') b.mesh.visible = v; });
  bind('[data-t="face"]', (v) => { face.visible = v; });
  $('.al-home').addEventListener('click', () => { if (state.ready) setZoom(null); });
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t) { fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0; }

  // ---------------- 標籤 ----------------
  const Lb = {
    tongue: lab.add('ey-lb ey-lb-m', 'Tongue · 舌頭'), buds: lab.add('ey-lb', 'Taste buds, all over · 味蕾遍布整個舌頭'),
    soft: lab.add('ey-lb ey-lb-m', 'Soft palate · 軟顎'),
    back: lab.add('ey-lb ts-lb-o', 'The back door · 後門'), front: lab.add('ey-lb ts-lb-o', 'Nostril: the front door · 鼻孔：前門'),
    cav: lab.add('ey-lb', 'Inside the nose · 鼻腔'), patch: lab.add('ey-lb ey-lb-d', 'Smell patch · 嗅覺區'), brain: lab.add('ey-lb ey-lb-o', 'Brain: flavor · 大腦：風味'),
    bT: lab.add('ey-lb ey-lb-o', 'One taste bud, magnified · 放大的一個味蕾'), sT: lab.add('ey-lb ey-lb-o', 'The smell patch, magnified · 放大的嗅覺區'),
    bPore: lab.add('ey-lb ey-lb-d', 'Opening · 味孔'), bCells: lab.add('ey-lb', 'Taste cells: one color, one taste · 味覺細胞：一種顏色管一種味道'),
    bNerve: lab.add('ey-lb', 'Nerve to the brain · 通往大腦的神經'), bSal: lab.add('ey-lb ts-lb-o', 'Saliva with dissolved food · 溶著食物的口水'),
    bPain: lab.add('ey-lb ts-lb-p', 'Pain and heat nerve ending · 痛覺與溫度神經末梢'),
    sBulb: lab.add('ey-lb ey-lb-d', 'To the brain · 通往大腦'), sBone: lab.add('ey-lb', 'Bone with tiny holes · 有小洞的骨頭'),
    sCells: lab.add('ey-lb', 'Smell cells: about 400 kinds · 嗅覺細胞：大約 400 種'), sMuc: lab.add('ey-lb', 'Mucus · 黏液'), sMol: lab.add('ey-lb ts-lb-o', 'Smell molecules · 氣味分子'),
  };
  let autoLabels = true;
  const tgL = $('[data-t="labels"]');
  if (tgL) tgL.addEventListener('change', () => { autoLabels = false; });
  function updateLabels() {
    const on = state.ready && state.labels;
    for (const el of Object.values(Lb)) el.hidden = !on;
    if (!on) return;
    const show = (el, v, p, dy = 0) => { el.hidden = !v; if (v) lab.place(el, p, dy); };
    const z = state.zoom, o = !z;
    show(Lb.tongue, o, P.tongue.clone().add(V(0.02, -0.018, -0.004)));
    show(Lb.buds, o, P.budsLb.clone().add(V(0, 0.004, 0.012)), -12);
    show(Lb.soft, o, P.softLb.clone().add(V(0, -0.012, -0.012)));
    show(Lb.back, o, P.backLb.clone().add(V(0, 0.004, -0.026)));
    show(Lb.front, o, P.nostril.clone().add(V(0, 0.004, 0.055)));
    show(Lb.cav, o, P.cavLb); show(Lb.patch, o, P.patch.clone().add(V(0, 0.004, 0.02)), -8);
    show(Lb.brain, o, P.brainLb);
    show(Lb.bT, o, P.bTitle, -6); show(Lb.sT, o, P.sTitle, 6);
    const b = z === 'bud', s = z === 'smell';
    show(Lb.bPore, b, P.bPore, -4); show(Lb.bCells, b, P.bCells); show(Lb.bNerve, b, P.bNerve); show(Lb.bSal, b, P.bSal, -12); show(Lb.bPain, b, P.bPain);
    show(Lb.sBulb, s, P.sBulb, -6); show(Lb.sBone, s, P.sBone); show(Lb.sCells, s, P.sCells); show(Lb.sMuc, s, P.sMuc); show(Lb.sMol, s, P.sMol, 8);
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
    step(state.hold ? 0 : dt);
    controls.update();
    updateLabels();
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  // 除錯用：$('[data-taste-lab]').__lab；背景分頁 rAF 很慢時用 run(秒)／render()；state.hold = true 讓畫面停在那一刻（截圖用）
  root.__lab = {
    camera, controls, state, P, setFood, setPinch, setZoom, bite, buds, score,
    run: (sec) => { for (let x = 0; x < sec; x += 1 / 30) step(1 / 30); if (fly.t < 1) { camera.position.copy(fly.p1); controls.target.copy(fly.t1); fly.t = 1; } },
    render: () => { step(0); controls.update(); updateLabels(); renderer.render(scene, camera); },
  };
  return { ready: () => state.ready, test: () => score && score.scrollTo(), food: (k) => setFood(k) };
}

lazyBoot('[data-taste-lab]', initLab, { test: (lab) => lab.test() });
