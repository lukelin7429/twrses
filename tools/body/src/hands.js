/*
 * 人體探索 · 第十八課「手為什麼這麼靈巧？」的 3D 模型：拉拉看這些線。
 *
 * 真實的：右前臂（橈骨、尺骨）與右手 27 塊骨頭（skeleton.glb）。骨頭先照原本的座標放進 armG、做好關節，
 *   再把 armG 放進 flip（把 A／L／N 三軸轉到 +X／+Y／+Z、手腕在原點）：手舉起來、手指朝上、手掌朝鏡頭（+Z），大拇指在畫面右邊。
 * 關節：每根手指三個巢狀 pivot（掌指、近端指間、遠端指間），大拇指是腕掌（鞍狀：對掌＋彎曲）、掌指、指間。
 *   關節中心＝相鄰兩塊骨頭端點的中點（頂點沿手指方向取最末 15% 的平均）。
 *   手的座標軸從骨頭算：L＝手指方向（頭狀骨 → 中指末節）、A＝往大拇指那一側（第五掌骨 → 第二掌骨，對 L 正交化）、N＝A×L＝手掌朝的方向。
 *   四指彎曲＝繞 A 轉正角；大拇指彎曲＝繞 N 轉正角、對掌＝繞 −L 轉正角。真正的關節軸沒有這麼單純（頁面有註明）。
 * 自繪示意：每根手指一條屈肌腱（橘，手掌側）、一條伸肌腱（藍，手背側），從前臂的肌肉經過手腕到指尖；
 *   肌腱是「掛在各節骨頭上的錨點」連成的管子，手指一動就重建。前臂掌側／背側各一塊肌肉、拇指根部一塊小肌肉，用力時變亮。
 *
 * 拇指挑戰計時卡（initThumb）是 2D，不需要 WebGL。
 * 產物：cd tools/body && npm run build → assets/js/hands.js
 */
import {
  AmbientLight, CatmullRomCurve3, Color, DirectionalLight, Group, HemisphereLight, MathUtils, Matrix4, Mesh, MeshStandardMaterial, Object3D,
  PerspectiveCamera, Quaternion, Scene, SphereGeometry, TubeGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { handOrder } from './bones.js';
import { IVORY, average, labeler, lazyBoot, loadBones, worldVerts } from './common.js';

const V = (x, y, z) => new Vector3(x, y, z);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const FK = ['f1', 'f2', 'f3', 'f4', 'f5'];
const CURL = [1.3, 1.5, 0.9], THUMB_IN = [0.95, 0.2, 0.35, 0.6];
// 手勢：四指各 [掌指, 近端, 遠端]；大拇指 [對掌, 腕掌彎曲, 掌指, 指間]（弧度）
const POSES = {
  open: { f1: [0, 0, 0, 0], f2: [0, 0, 0], f3: [0, 0, 0], f4: [0, 0, 0], f5: [0, 0, 0] },
  fist: { f1: [1.0, 0.25, 0.35, 0.7], f2: [1.4, 1.6, 1.0], f3: [1.45, 1.6, 1.0], f4: [1.45, 1.6, 1.0], f5: [1.4, 1.55, 1.0] },
  pinch: { f1: [0.97, -0.2, 0, 0.5], f2: [0.75, 0.65, 0.35], f3: [0.2, 0.25, 0.12], f4: [0.25, 0.3, 0.15], f5: [0.3, 0.35, 0.18] },
  point: { f1: [1.0, 0.25, 0.35, 0.7], f2: [0, 0, 0], f3: [1.45, 1.6, 1.0], f4: [1.45, 1.6, 1.0], f5: [1.4, 1.55, 1.0] },
  thumb: { f1: [0, -0.32, -0.05, -0.05], f2: [1.4, 1.6, 1.0], f3: [1.45, 1.6, 1.0], f4: [1.45, 1.6, 1.0], f5: [1.4, 1.55, 1.0] },
};
const GROUP_COL = { wrist: 0xffd36e, palm: 0x7ddc9a, fingers: 0x8fc4ff };

// ---------------- 拇指挑戰計時卡（2D） ----------------
function initThumb(root) {
  const box = root.querySelector('.hd-strip');
  if (!box || box.dataset.ready) return null;
  box.dataset.ready = '1';
  const cells = [...box.querySelectorAll('.hd-cell')], msg = box.querySelector('.hd-msg');
  const data = {};      // task → { with, without }
  let active = null, t0 = 0, timer = 0;
  const fmt = (s) => `${s.toFixed(1)} s`;
  function draw() {
    let worst = null;
    for (const row of box.querySelectorAll('.hd-task')) {
      const k = row.dataset.task, d = data[k] || {}, out = row.querySelector('.hd-x');
      if (d.with > 0 && d.without > 0) { const r = d.without / d.with; out.textContent = `×${r.toFixed(1)}`; if (!worst || r > worst.r) worst = { r, name: row.dataset.name, zh: row.dataset.zh }; } else out.textContent = '—';
    }
    msg.innerHTML = worst
      ? (worst.r >= 1.15 ? `Without your thumb, “${esc(worst.name)}” took <b>${worst.r.toFixed(1)} times</b> as long. That is what one saddle joint and a few small muscles are worth.<span class="zh">少了大拇指，「${esc(worst.zh)}」花了 ${worst.r.toFixed(1)} 倍的時間——這就是一個鞍狀關節和幾條小肌肉的價值。</span>`
        : 'Almost no difference? Check that the thumb is really taped down and not helping in secret.<span class="zh">幾乎沒有差別？檢查一下大拇指是不是真的貼好了，沒有偷偷幫忙。</span>')
      : 'Tap a box to start the timer, do the job, and tap it again to stop. Do every job twice: with your thumb, and with your thumb taped down.<span class="zh">點一個格子開始計時，做完那件事，再點一次停止。每件事做兩次：用大拇指，以及把大拇指貼起來。</span>';
  }
  function stop(save) {
    if (!active) return;
    clearInterval(timer); timer = 0;
    const s = (performance.now() - t0) / 1000, c = active; active = null;
    c.setAttribute('aria-pressed', 'false');
    if (save && s >= 0.3) { (data[c.dataset.task] = data[c.dataset.task] || {})[c.dataset.cond] = s; c.querySelector('b').textContent = fmt(s); c.classList.add('hd-done'); }
    else c.querySelector('b').textContent = (data[c.dataset.task] || {})[c.dataset.cond] ? fmt(data[c.dataset.task][c.dataset.cond]) : '—';
    draw();
  }
  cells.forEach((c) => c.addEventListener('click', () => {
    if (active === c) { stop(true); return; }
    stop(false);
    active = c; t0 = performance.now(); c.setAttribute('aria-pressed', 'true');
    timer = setInterval(() => { c.querySelector('b').textContent = fmt((performance.now() - t0) / 1000); }, 100);
  }));
  box.querySelector('.hd-clear').addEventListener('click', () => { stop(false); for (const k of Object.keys(data)) delete data[k]; cells.forEach((c) => { c.querySelector('b').textContent = '—'; c.classList.remove('hd-done'); }); draw(); });
  draw();
  return { scrollTo: () => box.scrollIntoView({ behavior: 'smooth', block: 'center' }), data };
}

function initLab(root) {
  const $ = (sel) => root.querySelector(sel);
  const card = initThumb(root);
  const spaceWrap = $('.al-space');
  const cv = $('.al-space-cv');
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas: cv, antialias: true });
  } catch (e) {
    root.classList.add('al-nogl');
    return { ready: () => true, test: () => card && card.scrollTo() };
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const scene = new Scene();
  scene.background = new Color(0x0a1224);
  const camera = new PerspectiveCamera(32, 1, 0.01, 30);
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 0.12; controls.maxDistance = 4;
  scene.add(new HemisphereLight(0xdfe8ff, 0x2a1a20, 1.1));
  scene.add(new AmbientLight(0xffffff, 0.3));
  const key = new DirectionalLight(0xfff3e0, 1.8); key.position.set(1.5, 2.5, 3); scene.add(key);
  const rim = new DirectionalLight(0x9fc4ff, 0.8); rim.position.set(-2, 1.5, -2.5); scene.add(rim);

  const POSE_TXT = JSON.parse(root.getAttribute('data-poses') || '[]');
  const R = {
    loading: $('.sk-loading'), bar: $('.sk-bar i'), status: $('.hd-status'), poses: [...root.querySelectorAll('[data-pose]')], fingers: [...root.querySelectorAll('[data-finger]')],
    groups: [...root.querySelectorAll('[data-group]')], turn: $('.hd-turn'), mF: $('.hd-m-flex i'), mE: $('.hd-m-ext i'),
  };
  const lab = labeler($('.al-labels'), cv, camera);
  const state = { ready: false, labels: true, pose: 'open', pulled: {}, group: null, back: false, clock: 0, fAct: 0, eAct: 0 };
  let bones = null;
  const P = {};
  const flip = new Group(), armG = new Group();
  flip.visible = false;                                // 載入完、放好位置才顯示
  flip.add(armG); scene.add(flip);
  const F = {};                                        // f1…f5 → { piv[], cur[], tgt[], fa[], ea[], flexT, extT }
  const M = {
    flex: new MeshStandardMaterial({ color: 0xff9a3c, roughness: 0.45, emissive: 0x4a2000, emissiveIntensity: 0.5 }),
    ext: new MeshStandardMaterial({ color: 0x7fb6ff, roughness: 0.45, emissive: 0x0a2040, emissiveIntensity: 0.5 }),
    mF: new MeshStandardMaterial({ color: 0xb8342c, roughness: 0.55, emissive: 0xff3020, emissiveIntensity: 0, transparent: true, opacity: 0.92 }),
    mE: new MeshStandardMaterial({ color: 0xa3423a, roughness: 0.55, emissive: 0xff3020, emissiveIntensity: 0, transparent: true, opacity: 0.92 }),
    mT: new MeshStandardMaterial({ color: 0xb8342c, roughness: 0.55, emissive: 0xff3020, emissiveIntensity: 0, transparent: true, opacity: 0.9 }),
  };
  const tendons = new Group(), muscles = new Group();
  armG.add(tendons, muscles);
  const AX = { L: V(0, -1, 0), A: V(-1, 0, 0), N: V(0, 0, 1) };
  const groupOf = {};

  loadBones(root.getAttribute('data-model'), (p) => { R.bar.style.width = `${Math.round(p * 100)}%`; }).then(({ model, bones: bs }) => {
    bones = bs;
    scene.add(model); model.updateMatrixWorld(true);
    const ids = ['r-radius', 'r-ulna', ...handOrder('r')];
    for (const b of bones.values()) b.mesh.visible = false;
    const B = (id) => bones.get(`r-${id}`), C = (id) => B(id).center.clone();
    const verts = {};
    for (const id of ids) { const b = bones.get(id); verts[id] = worldVerts(b.mesh); b.mesh.visible = true; b.mat.opacity = 1; b.mat.transparent = false; armG.attach(b.mesh); }
    handOrder('r').forEach((id, i) => { groupOf[id] = i < 8 ? 'wrist' : i < 13 ? 'palm' : 'fingers'; });
    // 手的座標軸
    AX.L = C('f3-d').sub(C('capitate')).normalize();
    AX.A = C('mc2').sub(C('mc5')); AX.A.addScaledVector(AX.L, -AX.A.dot(AX.L)).normalize();
    AX.N = AX.A.clone().cross(AX.L).normalize();
    const { L, A, N } = AX;
    // 骨頭沿某方向最末端 15% 頂點的平均
    const end = (id, dir) => { const vs = verts[`r-${id}`]; let lo = Infinity, hi = -Infinity; for (const v of vs) { const d = v.dot(dir); lo = Math.min(lo, d); hi = Math.max(hi, d); } return average(vs.filter((v) => v.dot(dir) > hi - 0.15 * (hi - lo))); };
    const joint = (a, b) => { const dir = C(b).sub(C(a)).normalize(); return end(a, dir).add(end(b, dir.clone().negate())).multiplyScalar(0.5); };
    const anchor = (parent, p) => { const o = new Object3D(); o.position.copy(p); armG.add(o); armG.updateMatrixWorld(true); parent.attach(o); return o; };
    const pivot = (parent, p) => { const g = new Group(); g.position.copy(p); armG.add(g); armG.updateMatrixWorld(true); parent.attach(g); return g; };
    const wrist = C('capitate');
    const foreTop = C('radius').add(C('ulna')).multiplyScalar(0.5).addScaledVector(L, -0.07);      // 靠近手肘那一段
    P.wrist = wrist.clone();
    // 前臂的肌肉：掌側（屈肌）、背側（伸肌）；拇指根部的小肌肉
    const belly = (mat, c, sx, sy, sz) => { const m = new Mesh(new SphereGeometry(1, 24, 16), mat); m.position.copy(c); m.scale.set(sx, sy, sz); muscles.add(m); return m; };
    const fC = foreTop.clone().addScaledVector(N, 0.024), eC = foreTop.clone().addScaledVector(N, -0.022);
    P.bF = belly(M.mF, fC, 0.026, 0.075, 0.014); P.bE = belly(M.mE, eC, 0.024, 0.07, 0.012);
    for (const m of [P.bF, P.bE]) m.quaternion.setFromUnitVectors(V(0, 1, 0), L);
    const tC = C('mc1').addScaledVector(N, 0.012).addScaledVector(A, -0.008);
    P.bT = belly(M.mT, tC, 0.011, 0.02, 0.008); P.bT.quaternion.setFromUnitVectors(V(0, 1, 0), C('f1-p').sub(C('trapezium')).normalize());
    // 每根手指：關節 pivot、肌腱錨點
    FK.forEach((fk, k) => {
      const thumb = k === 0, mc = `mc${k + 1}`;
      const segs = thumb ? ['f1-p', 'f1-d'] : [`${fk}-p`, `${fk}-m`, `${fk}-d`];
      const chain = thumb ? ['trapezium', mc, ...segs] : [mc, ...segs];
      const piv = []; let parent = armG;
      for (let i = 0; i + 1 < chain.length; i++) {
        const g = pivot(parent, joint(chain[i], chain[i + 1]));
        g.attach(B(chain[i + 1]).mesh);
        piv.push(g); parent = g;
      }
      const n = thumb ? N.clone().multiplyScalar(0.6).addScaledVector(A, -0.8).normalize() : N;      // 這根手指「指腹」朝的方向
      const spread = (k - 2) * 0.004;
      const fa = [anchor(armG, fC.clone().addScaledVector(L, 0.06).addScaledVector(A, -spread)), anchor(armG, wrist.clone().addScaledVector(N, 0.013).addScaledVector(A, -spread * 1.5))];
      const ea = [anchor(armG, eC.clone().addScaledVector(L, 0.06).addScaledVector(A, -spread)), anchor(armG, wrist.clone().addScaledVector(N, -0.012).addScaledVector(A, -spread * 1.5))];
      // 掌骨（大拇指的掌骨會動，掛在它的 pivot 上）
      const mcParent = thumb ? piv[0] : armG;
      fa.push(anchor(mcParent, C(mc).addScaledVector(n, 0.009))); ea.push(anchor(mcParent, C(mc).addScaledVector(n, -0.008)));
      const first = thumb ? 1 : 0;
      segs.forEach((s, i) => {
        const pv = piv[first + i], jp = joint(i === 0 ? mc : segs[i - 1], s);
        fa.push(anchor(pv.parent, jp.clone().addScaledVector(n, 0.0085)), anchor(pv, C(s).addScaledVector(n, 0.0062)));
        ea.push(anchor(pv.parent, jp.clone().addScaledVector(n, -0.0075)), anchor(pv, C(s).addScaledVector(n, -0.0055)));
      });
      const last = segs[segs.length - 1], dir = C(last).sub(C(segs[segs.length - 2])).normalize(), tip = end(last, dir);
      fa.push(anchor(piv[piv.length - 1], tip.clone().addScaledVector(n, 0.003))); ea.push(anchor(piv[piv.length - 1], tip.clone().addScaledVector(n, -0.003)));
      const nj = thumb ? 4 : 3;
      F[fk] = { piv, thumb, cur: new Array(nj).fill(0), tgt: new Array(nj).fill(0), fa, ea, flexT: null, extT: null, tip: anchor(piv[piv.length - 1], tip) };
    });
    // 轉成手舉起來：手腕在原點、手指朝上
    armG.position.copy(wrist).multiplyScalar(-1);
    flip.quaternion.setFromRotationMatrix(new Matrix4().makeBasis(A, L, N).transpose());      // A → +X（畫面右）、L → +Y（上）、N → +Z（朝鏡頭）
    flip.updateMatrixWorld(true);
    P.target = V(0, -0.015, 0); P.home = V(0.08, 0.03, 0.74);
    P.fore = foreTop.clone();
    P.count = { wrist: wrist.clone(), palm: C('mc3'), fingers: C('f3-m') };
    rebuildTendons();
    camera.position.copy(homePos());
    controls.target.copy(P.target);
    flip.visible = true;
    state.ready = true;
    R.loading.hidden = true;
    root.classList.add('al-ready');
    applyPose();
  }).catch((e) => {
    console.error(e);
    R.loading.innerHTML = 'The model could not be loaded. Please reload the page.<br><span class="zh">模型載入失敗，請重新整理頁面。</span>';
  });
  const fit = () => MathUtils.clamp(1 + (1.1 - camera.aspect) * 0.6, 1, 1.5);
  function homePos() { const h = P.home.clone().multiplyScalar(fit()); if (state.back) h.z = -h.z; return P.target.clone().add(h); }
  const W = (v) => armG.localToWorld(v.clone());

  // ---------------- 肌腱：錨點連成的管子 ----------------
  const tv = V(0, 0, 0);
  function rebuildTendons() {
    flip.updateMatrixWorld(true);
    for (const fk of FK) {
      const f = F[fk];
      for (const [key, list, mat] of [['flexT', f.fa, M.flex], ['extT', f.ea, M.ext]]) {
        const pts = list.map((o) => armG.worldToLocal(o.getWorldPosition(tv)).clone());
        const geo = new TubeGeometry(new CatmullRomCurve3(pts, false, 'centripetal', 0.5), 56, 0.0013, 6, false);
        if (f[key]) { f[key].geometry.dispose(); f[key].geometry = geo; } else { f[key] = new Mesh(geo, mat); tendons.add(f[key]); }
      }
    }
  }
  const q1 = new Quaternion(), q2 = new Quaternion(), negL = V(0, 0, 0);
  function setJoints() {
    const { L, A, N } = AX; negL.copy(L).negate();
    for (const fk of FK) {
      const f = F[fk], c = f.cur;
      if (f.thumb) {
        f.piv[0].quaternion.copy(q1.setFromAxisAngle(negL, c[0])).multiply(q2.setFromAxisAngle(N, c[1]));
        f.piv[1].quaternion.setFromAxisAngle(N, c[2]); f.piv[2].quaternion.setFromAxisAngle(N, c[3]);
      } else for (let i = 0; i < 3; i++) f.piv[i].quaternion.setFromAxisAngle(A, c[i]);
    }
  }

  // ---------------- 姿勢 ----------------
  function applyPose() {
    const base = POSES[state.pose] || POSES.open;
    for (const fk of FK) {
      const f = F[fk]; if (!f) continue;
      const t = state.pulled[fk] ? (f.thumb ? THUMB_IN : CURL) : base[fk];
      for (let i = 0; i < f.tgt.length; i++) f.tgt[i] = t[i];
    }
    R.poses.forEach((b) => b.setAttribute('aria-pressed', b.dataset.pose === state.pose && !Object.values(state.pulled).some(Boolean) ? 'true' : 'false'));
    R.fingers.forEach((b) => b.setAttribute('aria-pressed', state.pulled[b.dataset.finger] ? 'true' : 'false'));
    const pulled = FK.filter((k) => state.pulled[k]);
    let en, zh;
    if (pulled.length) {
      const names = pulled.map((k) => R.fingers.find((b) => b.dataset.finger === k)).filter(Boolean);
      en = `Pulling ${pulled.length === 1 ? 'one tendon' : `${pulled.length} tendons`}: ${names.map((b) => b.dataset.en).join(', ')}. A muscle in the forearm gets shorter, the orange string slides through the wrist, and the finger curls. Nothing inside the finger is pulling.`;
      zh = `正在拉 ${pulled.length} 條肌腱：${names.map((b) => b.dataset.zh).join('、')}。前臂的一條肌肉縮短，橘色的線滑過手腕，手指就彎起來了——手指裡面並沒有東西在拉。`;
    } else { const p = POSE_TXT.find((x) => x.key === state.pose) || {}; en = p.text_en || ''; zh = p.text_zh || ''; }
    R.status.innerHTML = `${esc(en)}<span class="zh">${esc(zh)}</span>`;
  }
  function setPose(k) { if (!POSES[k]) return; state.pose = k; state.pulled = {}; applyPose(); }
  function pull(fk, on) { state.pulled[fk] = on === undefined ? !state.pulled[fk] : !!on; if (state.pose !== 'open') state.pose = 'open'; applyPose(); }
  function setGroup(g) {
    state.group = state.group === g ? null : g;
    R.groups.forEach((b) => b.setAttribute('aria-pressed', b.dataset.group === state.group ? 'true' : 'false'));
    for (const id of handOrder('r')) { const b = bones.get(id); b.mat.color.copy(IVORY); if (state.group && groupOf[id] === state.group) b.mat.color.setHex(GROUP_COL[state.group]); }
  }
  function setBack(on) { state.back = !!on; R.turn.setAttribute('aria-pressed', on ? 'true' : 'false'); if (state.ready) flyTo(homePos(), P.target); }

  function sim(dt) {
    state.clock += dt;
    const k = dt ? 1 - Math.exp(-dt * 7) : 1;
    let moved = false, dSum = 0, level = 0, n = 0;
    for (const fk of FK) {
      const f = F[fk];
      for (let i = 0; i < f.cur.length; i++) {
        const d = f.tgt[i] - f.cur[i];
        if (Math.abs(d) > 1e-4) { f.cur[i] += d * k; dSum += d * k; moved = true; }
        level += Math.max(0, f.cur[i]); n++;
      }
    }
    if (moved || dt === 0) { setJoints(); rebuildTendons(); }
    level /= n * 1.2;
    const vel = dt ? dSum / dt : 0;
    state.fAct += (MathUtils.clamp(0.55 * level + Math.max(0, vel) * 0.06, 0, 1) - state.fAct) * k;
    state.eAct += (MathUtils.clamp(0.12 + Math.max(0, -vel) * 0.08, 0, 1) - state.eAct) * k;
    M.mF.emissiveIntensity = state.fAct * 0.9; M.mE.emissiveIntensity = state.eAct * 0.9;
    M.mT.emissiveIntensity = MathUtils.clamp(F.f1.cur[0] * 0.8, 0, 0.9);
    P.bF.scale.x = 0.026 * (1 + 0.22 * state.fAct); P.bF.scale.z = 0.014 * (1 + 0.3 * state.fAct);
    P.bE.scale.x = 0.024 * (1 + 0.22 * state.eAct); P.bE.scale.z = 0.012 * (1 + 0.3 * state.eAct);
    R.mF.style.width = `${Math.round(state.fAct * 100)}%`; R.mE.style.width = `${Math.round(state.eAct * 100)}%`;
  }

  // ---------------- 操作 ----------------
  R.poses.forEach((b) => b.addEventListener('click', () => setPose(b.dataset.pose)));
  R.fingers.forEach((b) => b.addEventListener('click', () => pull(b.dataset.finger)));
  R.groups.forEach((b) => b.addEventListener('click', () => { if (state.ready) setGroup(b.dataset.group); }));
  R.turn.addEventListener('click', () => setBack(!state.back));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="tendons"]', (v) => { tendons.visible = v; });
  bind('[data-t="muscles"]', (v) => { muscles.visible = v; });
  $('.al-home').addEventListener('click', () => { if (state.ready) setBack(false); });
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t) { fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0; }

  // ---------------- 標籤 ----------------
  const Lb = {
    mF: lab.add('ey-lb ey-lb-m', 'Muscles that bend the fingers · 彎手指的肌肉'), mE: lab.add('ey-lb ey-lb-m', 'Muscles that straighten them · 伸直手指的肌肉'),
    none: lab.add('ey-lb ey-lb-d', 'No muscles in here! · 這裡面沒有肌肉！'), ten: lab.add('ey-lb hd-lb-t', 'Tendons · 肌腱'), th: lab.add('ey-lb ey-lb-m', 'Thumb muscles · 拇指的肌肉'),
    w: lab.add('ey-lb', 'Wrist: 8 bones · 手腕 8 塊'), p: lab.add('ey-lb', 'Palm: 5 bones · 手掌 5 塊'), f: lab.add('ey-lb', 'Fingers: 14 bones · 手指 14 塊'),
    thumb: lab.add('ey-lb ey-lb-o', 'Thumb · 大拇指'),
  };
  for (const el of Object.values(Lb)) el.hidden = true;      // 模型載入前先藏起來
  let autoLabels = true;
  const tgL = $('[data-t="labels"]');
  if (tgL) tgL.addEventListener('change', () => { autoLabels = false; });
  const camDir = V(0, 0, 0);
  function updateLabels() {
    const on = state.ready && state.labels;
    for (const el of Object.values(Lb)) el.hidden = !on;
    if (!on) return;
    const front = camera.getWorldDirection(camDir).z < 0;      // 鏡頭看的是手掌那一面
    const show = (el, v, p, dy = 0) => { el.hidden = !v; if (v) lab.place(el, p, dy); };
    const side = front ? -1 : 1;
    show(Lb.mF, front && muscles.visible, W(P.fore).add(V(side * 0.075, 0, 0)));
    show(Lb.mE, !front && muscles.visible, W(P.fore).add(V(side * 0.075, 0, 0)));
    show(Lb.ten, tendons.visible, W(P.wrist).add(V(side * 0.075, -0.075, 0)));
    show(Lb.none, true, F.f3.tip.getWorldPosition(tv).clone().add(V(0, 0.022, 0)));
    show(Lb.th, front && muscles.visible, W(P.count.wrist).add(V(-side * 0.11, 0.012, 0)));
    const flat = state.fAct < 0.12;                              // 手張開時才標骨頭數，握起來標籤會飄在半空
    show(Lb.w, flat, W(P.count.wrist).add(V(side * 0.09, -0.008, 0)));
    show(Lb.p, flat, W(P.count.palm).add(V(side * 0.085, 0, 0)));
    show(Lb.f, flat, W(P.count.fingers).add(V(side * 0.1, 0.02, 0)));
    show(Lb.thumb, true, F.f1.tip.getWorldPosition(tv).clone().add(V(-side * 0.045, 0.012, 0)));
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
      // 翻面時鏡頭繞著手轉，不要直直穿過去
      const a0 = Math.atan2(fly.p0.x - fly.t0.x, fly.p0.z - fly.t0.z), a1 = Math.atan2(fly.p1.x - fly.t1.x, fly.p1.z - fly.t1.z);
      const r0 = Math.hypot(fly.p0.x - fly.t0.x, fly.p0.z - fly.t0.z), r1 = Math.hypot(fly.p1.x - fly.t1.x, fly.p1.z - fly.t1.z);
      const a = a0 + (a1 - a0) * k, r = r0 + (r1 - r0) * k;
      controls.target.lerpVectors(fly.t0, fly.t1, k);
      camera.position.set(controls.target.x + Math.sin(a) * r, MathUtils.lerp(fly.p0.y, fly.p1.y, k), controls.target.z + Math.cos(a) * r);
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

  // 除錯用：$('[data-hands-lab]').__lab；背景分頁 rAF 很慢時用 run(秒)／render()；state.hold = true 讓畫面停住
  root.__lab = {
    camera, controls, state, P, F, AX, setPose, pull, setGroup, setBack, card,
    run: (sec) => { for (let x = 0; x < sec; x += 1 / 30) step(1 / 30); if (fly.t < 1) { camera.position.copy(fly.p1); controls.target.copy(fly.t1); fly.t = 1; } },
    render: () => { step(0); controls.update(); updateLabels(); renderer.render(scene, camera); },
  };
  return { ready: () => state.ready, test: () => card && card.scrollTo() };
}

lazyBoot('[data-hands-lab]', initLab, { test: (lab) => lab.test() });
