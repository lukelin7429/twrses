/*
 * 人體探索 · 第十九課「身體怎麼修好自己？」的 3D 模型：兩種修補，同一套計畫。
 *
 * 真實的：右前臂（橈骨、尺骨）與右手骨頭（skeleton.glb），照原本的座標（手臂垂著）。
 * 骨折：橈骨中段用 clippingPlanes 切成兩段——近端是原本的 mesh（只留 y > 斷面），遠端是它的複製品（只留 y < 斷面），
 *   遠端和手骨掛在 fragG 上：一開始歪一點、錯開一點，「醫生對齊」之後回正。斷面是平的（真正的骨折不規則，頁面有註明）。
 * 自繪示意：血塊（暗紅）、白血球（白點）、骨痂（有起伏的橢球：先粉紅柔軟、再變象牙色變硬、最後被修小）、石膏；
 *   左邊浮著一小塊放大的皮膚：割開的縫、血塊與痂、白血球、從底下長上來的新組織、合起來的表皮、最後淡掉的疤。
 *
 * 進度 u（0–4）：四個步驟各佔 1——止血、清理、搭補丁、重建。骨頭和皮膚走同一個 u，但各有自己的時鐘
 *   （boneClock／skinClock：骨頭是小時→天→週→月／年，皮膚是分鐘→小時／天→天→週／月），全部是 u 的函數，可以來回拖。
 *
 * 癒合日記（initDiary：瘀青顏色格與指甲生長）是 2D，不需要 WebGL。
 * 產物：cd tools/body && npm run build → assets/js/healing.js
 */
import {
  AmbientLight, BoxGeometry, BufferGeometry, Color, CylinderGeometry, DirectionalLight, DoubleSide, Float32BufferAttribute, Group, HemisphereLight,
  LineBasicMaterial, LineSegments, MathUtils, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, Plane, Scene, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { handOrder } from './bones.js';
import { IVORY, average, labeler, lazyBoot, loadBones, worldVerts } from './common.js';

const V = (x, y, z) => new Vector3(x, y, z);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const ss = (x, a, b) => MathUtils.smoothstep(x, a, b);
const UMAX = 4;
const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;
// 兩個時鐘：同一個進度 u，換成各自的時間
function boneClock(u) {
  if (u < 1) { const h = Math.max(1, Math.round(u * 24)); return [plural(h, 'hour'), `${h} 小時`]; }
  if (u < 2) { const d = Math.round(1 + (u - 1) * 6); return [`day ${d}`, `第 ${d} 天`]; }
  if (u < 3) { const w = Math.round(1 + (u - 2) * 7); return [`week ${w}`, `第 ${w} 週`]; }
  const m = 2 + (u - 3) * 34; return m < 12 ? [`month ${Math.round(m)}`, `第 ${Math.round(m)} 個月`] : [plural(Math.round(m / 12), 'year'), `${Math.round(m / 12)} 年`];
}
function skinClock(u) {
  if (u < 1) { const m = Math.max(1, Math.round(u * 30)); return [plural(m, 'minute'), `${m} 分鐘`]; }
  if (u < 2) { const h = 1 + (u - 1) * 71; return h < 24 ? [plural(Math.round(h), 'hour'), `${Math.round(h)} 小時`] : [`day ${Math.round(h / 24)}`, `第 ${Math.round(h / 24)} 天`]; }
  if (u < 3) { const d = Math.round(3 + (u - 2) * 11); return [`day ${d}`, `第 ${d} 天`]; }
  const w = 2 + (u - 3) * 50; return w < 9 ? [`week ${Math.round(w)}`, `第 ${Math.round(w)} 週`] : [`month ${Math.round(w / 4.35)}`, `第 ${Math.round(w / 4.35)} 個月`];
}

// ---------------- 癒合日記（2D） ----------------
function initDiary(root) {
  const box = root.querySelector('.hl-strip');
  if (!box || box.dataset.ready) return null;
  box.dataset.ready = '1';
  const KEY = 'twrses-bruise-diary';
  const COL = [null, ['#b0305a', 'Red or purple', '紅色或紫色', 'Fresh blood under the skin. The red comes from hemoglobin, the stuff that carries oxygen.', '皮膚底下剛流出來的血。紅色來自血紅素，就是負責帶氧氣的那種東西。'],
    ['#3d3a78', 'Blue or dark purple', '藍色或深紫色', 'The blood has lost its oxygen and looks darker through the skin.', '血裡的氧氣用完了，隔著皮膚看起來比較暗。'],
    ['#6f9a4a', 'Green', '綠色', 'Your body is breaking the hemoglobin down. The first thing it turns into is green.', '身體正在分解血紅素，它變成的第一種東西是綠色的。'],
    ['#d2aa3c', 'Yellow or brown', '黃色或褐色', 'The green has been changed into a yellow chemical, and it is being carried away. Almost done.', '綠色的東西又被變成黃色的，正被運走。快好了。'],
    ['#f1d9c2', 'Gone', '消失了', 'The old blood has been cleared away. Repair complete!', '舊的血都被清走了，修補完成！']];
  const q = (s) => box.querySelector(s);
  const cells = [...box.querySelectorAll('.hl-day')], msg = q('.hl-bmsg');
  let days = new Array(cells.length).fill(0);
  try { const s = JSON.parse(localStorage.getItem(KEY)); if (Array.isArray(s) && s.length === days.length) days = s.map((x) => (x >= 0 && x <= 5 ? x | 0 : 0)); } catch (e) { /* 沒有 localStorage 也能用 */ }
  function draw(last) {
    cells.forEach((c, i) => { const v = COL[days[i]]; c.style.setProperty('--c', v ? v[0] : 'transparent'); c.classList.toggle('hl-set', !!v); c.setAttribute('aria-label', `Day ${i + 1}${v ? `: ${v[1]}` : ''} · 第 ${i + 1} 天${v ? `：${v[2]}` : ''}`); });
    let i = last; if (i === undefined || !days[i]) { i = -1; days.forEach((v, k) => { if (v) i = k; }); }
    if (i < 0) msg.innerHTML = 'Tap a day once for red, and again for the next color. Fill in one box each day.<span class="zh">點一下某一天是紅色，再點換下一種顏色。每天填一格。</span>';
    else { const v = COL[days[i]]; msg.innerHTML = `<b>Day ${i + 1}: ${esc(v[1])}.</b> ${esc(v[3])}<span class="zh">第 ${i + 1} 天：${esc(v[2])}。${esc(v[4])}</span>`; }
    try { localStorage.setItem(KEY, JSON.stringify(days)); } catch (e) { /* ignore */ }
  }
  cells.forEach((c, i) => c.addEventListener('click', () => { days[i] = (days[i] + 1) % COL.length; draw(i); }));
  q('.hl-bclear').addEventListener('click', () => { days = days.map(() => 0); draw(); });
  // 指甲
  const a = q('.hl-n1'), b = q('.hl-n2'), dd = q('.hl-nd'), out = q('.hl-nout'), nmsg = q('.hl-nmsg');
  function nail() {
    const x = parseFloat(a.value), y = parseFloat(b.value), n = parseFloat(dd.value);
    if (!(x >= 0) || !(y >= 0) || !(n > 0)) { out.textContent = '—'; nmsg.innerHTML = 'Enter the two distances in millimeters and the number of days between them.<span class="zh">輸入兩次量到的距離（公釐），以及中間隔了幾天。</span>'; return; }
    const sp = ((y - x) / n) * 30;
    out.textContent = `${sp.toFixed(1)} mm`;
    nmsg.innerHTML = sp <= 0 ? 'The dot did not move forward. Check the two numbers.<span class="zh">那個點沒有往前移，再檢查一下兩個數字。</span>'
      : sp > 8 ? 'That is very fast for a nail. Measure once more, to the nearest half millimeter.<span class="zh">以指甲來說這太快了，再量一次，量到 0.5 公釐。</span>'
      : `Your nail is growing about ${sp.toFixed(1)} mm a month. The usual speed for a fingernail is about 3.5 mm a month, so a whole new nail takes three to six months.<span class="zh">你的指甲每個月大約長 ${sp.toFixed(1)} 公釐。手指甲一般每個月大約長 3.5 公釐，所以整片換新要三到六個月。</span>`;
  }
  for (const el of [a, b, dd]) el.addEventListener('input', nail);
  draw(); nail();
  return { scrollTo: () => box.scrollIntoView({ behavior: 'smooth', block: 'center' }), days: () => days };
}

function initLab(root) {
  const $ = (sel) => root.querySelector(sel);
  const diary = initDiary(root);
  const spaceWrap = $('.al-space');
  const cv = $('.al-space-cv');
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas: cv, antialias: true });
  } catch (e) {
    root.classList.add('al-nogl');
    return { ready: () => true, test: () => diary && diary.scrollTo() };
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.localClippingEnabled = true;
  const scene = new Scene();
  scene.background = new Color(0x0a1224);
  const camera = new PerspectiveCamera(32, 1, 0.01, 30);
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 0.1; controls.maxDistance = 3;
  scene.add(new HemisphereLight(0xdfe8ff, 0x2a1a20, 1.1));
  scene.add(new AmbientLight(0xffffff, 0.3));
  const key = new DirectionalLight(0xfff3e0, 1.8); key.position.set(1.5, 2.5, 3); scene.add(key);
  const rim = new DirectionalLight(0x9fc4ff, 0.8); rim.position.set(-2, 1.5, -2.5); scene.add(rim);

  const STAGES = JSON.parse(root.getAttribute('data-stages') || '[]');
  const R = {
    loading: $('.sk-loading'), bar: $('.sk-bar i'), step: $('.hl-step'), name: $('.hl-name'), bc: $('.hl-bc'), sc: $('.hl-sc'), bt: $('.hl-bt'), st: $('.hl-st'),
    slider: $('.hl-slider'), play: $('.al-play'), playT: $('.al-play-t'), jumps: [...root.querySelectorAll('[data-stage]')],
  };
  const lab = labeler($('.al-labels'), cv, camera);
  const state = { ready: false, labels: true, u: 0, playing: false, clock: 0, cast: true, stage: -1 };
  let bones = null;
  const P = {};
  const armG = new Group(), fragG = new Group(), skinG = new Group();
  armG.visible = false; skinG.visible = false;       // 載入完、放好位置才顯示
  scene.add(armG, skinG);
  const up = new Plane(V(0, 1, 0), 0), down = new Plane(V(0, -1, 0), 0);
  const M = {
    clot: new MeshStandardMaterial({ color: 0x7a1420, roughness: 0.5, transparent: true, opacity: 0, depthWrite: false }),
    callus: new MeshStandardMaterial({ color: 0xf0a0a8, roughness: 0.7, transparent: true, opacity: 0 }),
    wbc: new MeshBasicMaterial({ color: 0xffffff }),
    cast: new MeshStandardMaterial({ color: 0xf4f6fa, roughness: 0.9, transparent: true, opacity: 0, side: DoubleSide, depthWrite: false }),
    epi: new MeshStandardMaterial({ color: 0xe9b89a, roughness: 0.8 }), derm: new MeshStandardMaterial({ color: 0xd98a86, roughness: 0.85 }),
    cut: new MeshBasicMaterial({ color: 0x2a0a10 }), sclot: new MeshStandardMaterial({ color: 0x8a1622, roughness: 0.6 }),
    scab: new MeshStandardMaterial({ color: 0x5a2a1c, roughness: 0.95 }), gran: new MeshStandardMaterial({ color: 0xff9db0, roughness: 0.7 }),
    scar: new MeshStandardMaterial({ color: 0xf6d9cc, roughness: 0.8 }),
  };
  const wbcs = [], swbcs = [];
  let callus = null, clot = null, cast = null, distalMat = null, proxMat = null;
  const S = {};                                       // 皮膚的零件

  loadBones(root.getAttribute('data-model'), (p) => { R.bar.style.width = `${Math.round(p * 100)}%`; }).then(({ model, bones: bs }) => {
    bones = bs;
    scene.add(model); model.updateMatrixWorld(true);
    for (const b of bones.values()) b.mesh.visible = false;
    const rad = bones.get('r-radius'), uln = bones.get('r-ulna');
    const yb = rad.center.y + 0.005;
    // 簡化過的骨幹頂點很稀疏：取上下 3.5 公分內的頂點估中心與粗細
    const near = worldVerts(rad.mesh, (v) => Math.abs(v.y - yb) < 0.035);
    const c = average(near); c.y = yb;
    let rr = 0; for (const v of near) rr += Math.hypot(v.x - c.x, v.z - c.z);
    rr = Math.max(0.0065, rr / Math.max(1, near.length));
    P.c = c.clone(); P.yb = yb; P.rr = rr;
    armG.add(fragG); fragG.position.copy(c);
    // 近端：原本的橈骨，只留斷面以上；遠端：複製品，只留斷面以下，和手骨一起掛在 fragG 上
    rad.mesh.visible = true; rad.mat.transparent = false; rad.mat.opacity = 1; rad.mat.side = DoubleSide; rad.mat.clippingPlanes = [up]; proxMat = rad.mat;
    armG.attach(rad.mesh);
    const dist = rad.mesh.clone(); distalMat = new MeshStandardMaterial({ color: IVORY.clone(), roughness: 0.62, side: DoubleSide, clippingPlanes: [down] }); dist.material = distalMat;
    armG.add(dist); dist.position.copy(rad.mesh.position); dist.quaternion.copy(rad.mesh.quaternion); dist.scale.copy(rad.mesh.scale); fragG.attach(dist);
    uln.mesh.visible = true; uln.mat.transparent = false; uln.mat.opacity = 1; armG.attach(uln.mesh);
    for (const id of handOrder('r')) { const b = bones.get(id); b.mesh.visible = true; b.mat.opacity = 0.55; fragG.attach(b.mesh); P.hand = P.hand || []; P.hand.push(b); }
    // 血塊、骨痂、白血球
    clot = new Mesh(new SphereGeometry(1, 24, 18), M.clot); clot.position.copy(c); clot.renderOrder = 3; armG.add(clot);
    const g = new SphereGeometry(1, 40, 28), pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) { const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i), k = 1 + 0.13 * Math.sin(x * 7 + y * 5) * Math.cos(z * 6 + y * 3); pos.setXYZ(i, x * k, y, z * k); }
    g.computeVertexNormals();
    callus = new Mesh(g, M.callus); callus.position.copy(c); armG.add(callus);
    let sd = 9; const rnd = () => { sd = (sd * 1664525 + 1013904223) % 4294967296; return sd / 4294967296; };
    for (let i = 0; i < 16; i++) { const m = new Mesh(new SphereGeometry(0.0016, 8, 6), M.wbc); m.renderOrder = 5; armG.add(m); wbcs.push({ m, a: rnd() * 6.28, b: (rnd() - 0.5) * 2, sp: 0.4 + rnd() * 0.8, r: 0.9 + rnd() * 0.5 }); }
    // 石膏：包住前臂的半透明圓筒
    const mid = rad.center.clone().add(uln.center).multiplyScalar(0.5), len = rad.box.max.y - rad.box.min.y;
    cast = new Mesh(new CylinderGeometry(0.036, 0.031, len * 0.86, 28, 1, true), M.cast); cast.position.copy(mid).add(V(0, -0.012, 0)); cast.renderOrder = 6; armG.add(cast);
    P.castLb = mid.clone().add(V(0.05, -len * 0.3, 0));
    buildSkin(c);
    P.target = c.clone().add(V(-0.085, 0, 0)); P.home = V(0.02, 0.04, 0.72);
    apply();
    camera.position.copy(homePos());
    controls.target.copy(P.target);
    armG.visible = true; skinG.visible = true;
    state.ready = true;
    R.loading.hidden = true;
    root.classList.add('al-ready');
  }).catch((e) => {
    console.error(e);
    R.loading.innerHTML = 'The model could not be loaded. Please reload the page.<br><span class="zh">模型載入失敗，請重新整理頁面。</span>';
  });
  const fit = () => MathUtils.clamp(1 + (1.15 - camera.aspect) * 0.55, 1, 1.5);
  function homePos() { return P.target.clone().add(P.home.clone().multiplyScalar(fit())); }

  // ---------------- 放大的皮膚塊（浮在手臂左邊） ----------------
  function buildSkin(c) {
    const o = c.clone().add(V(-0.185, 0.005, 0.03));
    skinG.position.copy(o);
    const box = (w, h, d, mat, x, y, z = 0) => { const m = new Mesh(new BoxGeometry(w, h, d), mat); m.position.set(x, y, z); skinG.add(m); return m; };
    S.derm = box(0.11, 0.05, 0.05, M.derm, 0, -0.012);
    S.epiL = box(0.05, 0.009, 0.05, M.epi, -0.03, 0.0175); S.epiR = box(0.05, 0.009, 0.05, M.epi, 0.03, 0.0175);
    S.cut = box(0.012, 0.03, 0.0502, M.cut, 0, 0.007, 0.0002);
    S.clot = box(0.012, 0.03, 0.0504, M.sclot, 0, 0.007, 0.0004);
    S.gran = box(0.012, 0.03, 0.0506, M.gran, 0, 0.007, 0.0006);
    S.scar = box(0.004, 0.0092, 0.0508, M.scar, 0, 0.0175, 0.0008);
    S.scab = box(0.03, 0.005, 0.052, M.scab, 0, 0.0245);
    let sd = 4; const rnd = () => { sd = (sd * 1664525 + 1013904223) % 4294967296; return sd / 4294967296; };
    for (let i = 0; i < 12; i++) { const m = new Mesh(new SphereGeometry(0.0017, 8, 6), M.wbc); m.renderOrder = 5; skinG.add(m); swbcs.push({ m, x0: (rnd() < 0.5 ? -1 : 1) * (0.03 + rnd() * 0.02), y0: -0.028 + rnd() * 0.035, ph: rnd() * 6.28 }); }
    const lines = new LineSegments(new BufferGeometry(), new LineBasicMaterial({ color: 0xffd36e, transparent: true, opacity: 0.4 }));
    const from = V(c.x - 0.03, c.y + 0.05, c.z + 0.02), arr = [];
    for (const k of [V(0.055, 0.022, 0.025), V(0.055, -0.037, 0.025)]) { const w = k.clone().add(o); arr.push(from.x, from.y, from.z, w.x, w.y, w.z); }
    lines.geometry.setAttribute('position', new Float32BufferAttribute(arr, 3)); scene.add(lines); S.lines = lines;
    P.skinT = o.clone().add(V(0, 0.045, 0)); P.scabLb = o.clone().add(V(0, 0.03, 0.03)); P.skinFrom = from;
  }

  // ---------------- 依進度更新（全部是 u 的函數） ----------------
  const cA = new Color(0xf0a0a8), cB = new Color(0xeee4cf), tc = new Color();
  function apply() {
    const u = state.u, t = state.clock, c = P.c, rr = P.rr;
    // 對齊：醫生把骨頭拉回原位
    const set = ss(u, 0.45, 0.85);
    fragG.rotation.z = 0.14 * (1 - set); fragG.position.set(c.x + 0.006 * (1 - set), c.y, c.z + 0.003 * (1 - set));
    const gap = 0.0022 * (1 - ss(u, 2.7, 3.3));
    up.constant = -(P.yb + gap); down.constant = P.yb - gap;
    // 血塊
    const cl = ss(u, 0.05, 0.5) * (1 - ss(u, 1.7, 2.4));
    M.clot.opacity = 0.78 * cl; clot.visible = cl > 0.01; clot.scale.set(rr * 2.1 * (0.6 + 0.4 * cl), 0.02 * (0.5 + 0.5 * cl), rr * 2.1 * (0.6 + 0.4 * cl));
    // 白血球
    const w = ss(u, 0.8, 1.15) * (1 - ss(u, 1.9, 2.4));
    for (const k of wbcs) { k.m.visible = w > 0.02; if (!k.m.visible) continue; const a = k.a + t * k.sp, R2 = rr * 2.4 * k.r; k.m.position.set(c.x + Math.cos(a) * R2, c.y + k.b * 0.018 + Math.sin(t * 2 + k.a) * 0.002, c.z + Math.sin(a) * R2); k.m.scale.setScalar(w); }
    // 骨痂：變大（軟）→ 變色變硬 → 慢慢被修小
    const grow = ss(u, 1.9, 2.55), hard = ss(u, 2.45, 3.0), trim = ss(u, 3.05, 4.0);
    const kr = MathUtils.lerp(MathUtils.lerp(1.0, 2.3, grow), 1.04, trim), kh = MathUtils.lerp(MathUtils.lerp(0.008, 0.026, grow), 0.016, trim);
    callus.visible = grow > 0.01; callus.scale.set(rr * kr, kh, rr * kr);
    M.callus.color.copy(cA).lerp(cB, hard); M.callus.opacity = Math.min(1, grow * 1.4) * (1 - 0.0 * trim); M.callus.roughness = MathUtils.lerp(0.75, 0.62, hard);
    // 石膏：對齊之後打上，硬骨痂長好之後拆掉
    const co = state.cast ? ss(u, 0.6, 0.9) * (1 - ss(u, 2.95, 3.1)) : 0;
    M.cast.opacity = 0.34 * co; cast.visible = co > 0.01;
    // 皮膚
    const gw = MathUtils.lerp(0.012, 0, ss(u, 2.15, 3.0));
    S.epiL.scale.x = S.epiR.scale.x = (0.055 - gw / 2) / 0.05; S.epiL.position.x = -(gw / 2 + (0.055 - gw / 2) / 2); S.epiR.position.x = -S.epiL.position.x;
    const sc = ss(u, 0.08, 0.6);
    S.clot.visible = sc > 0.01 && u < 2.9; S.clot.scale.set(1, sc, 1); S.clot.position.y = 0.022 - 0.015 * sc;
    const gr = ss(u, 1.9, 2.8);
    S.gran.visible = gr > 0.01; S.gran.scale.set(1, gr, 1); S.gran.position.y = -0.008 + 0.015 * gr;
    M.gran.color.setHex(0xff9db0).lerp(tc.setHex(0xd98a86), ss(u, 3.0, 4.0));
    S.cut.visible = u < 2.9;
    const sb = ss(u, 0.35, 0.9) * (1 - ss(u, 2.85, 3.0));
    S.scab.visible = sb > 0.01; S.scab.scale.set(1, Math.max(0.05, sb), 1); S.scab.position.y = 0.0245 + ss(u, 2.85, 3.0) * 0.012;
    const scar = ss(u, 2.7, 3.0);
    S.scar.visible = scar > 0.01; M.scar.color.setHex(0xf6d9cc).lerp(M.epi.color, 0.85 * ss(u, 3.1, 4.0));
    const sw = ss(u, 0.85, 1.15) * (1 - ss(u, 1.9, 2.4));
    for (const k of swbcs) { k.m.visible = sw > 0.02; if (!k.m.visible) continue; const pull = 0.5 + 0.5 * Math.sin(t * 0.8 + k.ph); k.m.position.set(MathUtils.lerp(k.x0, Math.sign(k.x0) * 0.009, pull * sw), k.y0 + Math.sin(t * 1.7 + k.ph) * 0.002, 0.027); k.m.scale.setScalar(sw); }
    // 文字
    const i = Math.min(3, Math.floor(u)), s = STAGES[i] || {};
    if (i !== state.stage) {
      state.stage = i;
      R.step.textContent = String(i + 1); R.name.innerHTML = `${esc(s.en || '')}<small>${esc(s.zh || '')}</small>`;
      R.bt.innerHTML = `${esc(s.bone_en || '')}<span class="zh">${esc(s.bone_zh || '')}</span>`; R.st.innerHTML = `${esc(s.skin_en || '')}<span class="zh">${esc(s.skin_zh || '')}</span>`;
      R.jumps.forEach((b, k) => b.setAttribute('aria-pressed', k === i ? 'true' : 'false'));
    }
    const b = boneClock(u), k2 = skinClock(u);
    R.bc.innerHTML = `${b[0]}<small>${b[1]}</small>`; R.sc.innerHTML = `${k2[0]}<small>${k2[1]}</small>`;
    state.callus = grow; state.hard = hard; state.clot = cl; state.castOn = co;
  }
  function sim(dt) {
    state.clock += dt;
    if (state.playing) { state.u = Math.min(UMAX, state.u + dt / 6); R.slider.value = Math.round(state.u * 100); fillSlider(); if (state.u >= UMAX) setPlaying(false); }
    apply();
  }

  // ---------------- 操作 ----------------
  const fillSlider = () => R.slider.style.setProperty('--p', `${(R.slider.value / 400) * 100}%`);
  function setPlaying(on) { state.playing = on; R.play.setAttribute('aria-pressed', on ? 'true' : 'false'); root.classList.toggle('is-playing', on); R.playT.textContent = on ? 'Pause · 暫停' : 'Play · 播放'; }
  function setU(u, pause = true) { state.u = MathUtils.clamp(u, 0, UMAX); R.slider.value = Math.round(state.u * 100); fillSlider(); if (pause) setPlaying(false); if (state.ready) apply(); }
  R.slider.addEventListener('input', () => setU(R.slider.value / 100));
  R.play.addEventListener('click', () => { if (!state.playing && state.u >= UMAX - 0.01) setU(0, false); setPlaying(!state.playing); });
  R.jumps.forEach((b, i) => b.addEventListener('click', () => setU(i + 0.55)));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="cast"]', (v) => { state.cast = v; if (state.ready) apply(); });
  bind('[data-t="hand"]', (v) => { if (P.hand) for (const b of P.hand) b.mesh.visible = v; });
  $('.al-home').addEventListener('click', () => { if (state.ready) flyTo(homePos(), P.target); });
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t) { fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0; }
  fillSlider();

  // ---------------- 標籤 ----------------
  const Lb = {
    bone: lab.add('ey-lb ey-lb-d', ''), cast: lab.add('ey-lb', 'Cast · 石膏'), wbc: lab.add('ey-lb', 'White blood cells · 白血球'),
    skin: lab.add('ey-lb ey-lb-o', 'A cut in the skin, magnified · 放大的皮膚割傷'), scab: lab.add('ey-lb hl-lb-s', ''),
    rad: lab.add('ey-lb', 'Radius · 橈骨'), uln: lab.add('ey-lb', 'Ulna · 尺骨'),
  };
  for (const el of Object.values(Lb)) el.hidden = true;      // 模型載入前先藏起來
  let autoLabels = true, lbKey = '';
  const tgL = $('[data-t="labels"]');
  if (tgL) tgL.addEventListener('change', () => { autoLabels = false; });
  function updateLabels() {
    const on = state.ready && state.labels;
    for (const el of Object.values(Lb)) el.hidden = !on;
    if (!on) return;
    const u = state.u, key2 = u < 0.45 ? 'a' : u < 1.9 ? 'b' : u < 2.5 ? 'c' : u < 3.05 ? 'd' : 'e';
    if (lbKey !== key2) {
      lbKey = key2;
      Lb.bone.innerHTML = { a: 'The break · 斷掉的地方', b: 'Blood clot · 血塊', c: 'Soft bridge · 柔軟的橋', d: 'Hard lump of new bone · 硬硬的新骨頭', e: 'Being trimmed smooth · 正在修平' }[key2];
      Lb.scab.innerHTML = { a: 'Clot · 血塊', b: 'Scab · 痂', c: 'New tissue under the scab · 痂底下的新組織', d: 'New skin · 新的皮膚', e: 'Scar, slowly fading · 慢慢淡掉的疤' }[key2];
    }
    const show = (el, v, p, dy = 0) => { el.hidden = !v; if (v) lab.place(el, p, dy); };
    show(Lb.bone, true, P.c.clone().add(V(0.1, -0.012, 0)));
    show(Lb.cast, state.castOn > 0.5, P.castLb);
    show(Lb.wbc, u > 0.95 && u < 2.1, P.c.clone().add(V(0.065, 0.03, 0)));
    show(Lb.skin, true, P.skinT, -10); show(Lb.scab, true, P.scabLb, -6);
    show(Lb.rad, true, P.c.clone().add(V(-0.012, 0.085, 0.02)), -4); show(Lb.uln, true, P.c.clone().add(V(0.06, 0.085, 0)), -4);
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

  // 除錯用：$('[data-healing-lab]').__lab；背景分頁 rAF 很慢時用 run(秒)／render()；state.hold = true 讓畫面停住
  root.__lab = {
    camera, controls, state, P, setU, setPlaying, boneClock, skinClock, diary,
    run: (sec) => { for (let x = 0; x < sec; x += 1 / 30) step(1 / 30); if (fly.t < 1) { camera.position.copy(fly.p1); controls.target.copy(fly.t1); fly.t = 1; } },
    render: () => { step(0); controls.update(); updateLabels(); renderer.render(scene, camera); },
  };
  return { ready: () => state.ready, test: () => diary && diary.scrollTo() };
}

lazyBoot('[data-healing-lab]', initLab, { test: (lab) => lab.test() });
