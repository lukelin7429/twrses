/*
 * 人體探索 · 第二十二課「身體為什麼總是暖暖的？」的 3D 模型：把天氣調冷、調熱。
 *
 * 真實的：整副骨架（skeleton.glb）。
 * 自繪示意：包在骨架外面、會變色的身體（軀幹、頭、四肢、手腳，各一個半透明的膠囊或橢球；顏色＝那個部位有多暖）、
 *   腦裡的恆溫器（黃色的點）、浮在身體旁邊的一塊放大皮膚（表皮、真皮、深處的血管與靠近表面的微血管圈、汗腺與汗滴、
 *   一根毛與豎毛肌、雞皮疙瘩）。
 *
 * 模擬（示意，不是測量）：輸入是氣溫 air（5–38 °C）、是否運動 ex、是否發燒 fever。
 *   恆溫器設定 set：平常 37.0，發燒 38.5（只是舉例）；核心溫度 core 用一階延遲追上 set（運動時再加 0.3）。
 *   err = core − set：發燒剛開始 err < 0 → 身體「覺得冷」→ 血管收縮、發抖；退燒時 err > 0 → 流汗、血管張開。
 *   hot／cold 兩個 0–1 的驅動量決定：皮膚血流、流汗、發抖、雞皮疙瘩、手腳的溫暖。氣溫再冷，core 也不變。
 *
 * 體溫日記（initDiary）是 2D，不需要 WebGL；只畫出一天的起伏，不判斷有沒有發燒。
 * 產物：cd tools/body && npm run build → assets/js/temperature.js
 */
import {
  AmbientLight, BoxGeometry, BufferGeometry, CapsuleGeometry, CatmullRomCurve3, Color, CylinderGeometry, DirectionalLight,
  Float32BufferAttribute, Group, HemisphereLight, LineBasicMaterial, LineSegments, MathUtils, Mesh, MeshBasicMaterial,
  MeshStandardMaterial, PerspectiveCamera, Scene, SphereGeometry, TubeGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { average, labeler, lazyBoot, loadBones, worldVerts } from './common.js';

const V = (x, y, z) => new Vector3(x, y, z);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const cr = (pts) => new CatmullRomCurve3(pts, false, 'centripetal');
const clamp01 = (x) => MathUtils.clamp(x, 0, 1);
const UP = V(0, 1, 0);
const COOL = new Color(0x3d7bff), MID = new Color(0xffa24a), HOT = new Color(0xff3a2e);
const DAYC = ['#ffd36e', '#7ddc9a', '#9fd8ff', '#ff9a9a', '#c9a8ff'];

export function drives(air, ex, err) {
  const hotAir = clamp01((air - 26) / 10), coldAir = clamp01((20 - air) / 13);
  const n = hotAir + (ex ? 0.8 : 0) + Math.max(0, err) * 1.2 - coldAir - Math.max(0, -err) * 1.2;
  const hot = clamp01(n), cold = clamp01(-n);
  return {
    hot, cold,
    flow: clamp01(0.45 + 0.55 * hot - 0.4 * cold), sweat: hot, shiver: clamp01((cold - 0.5) / 0.5),
    goose: clamp01(cold / 0.45), limb: clamp01(0.55 + 0.45 * hot - 0.55 * cold),
  };
}

// ---------------- 體溫日記（2D） ----------------
function initDiary(root) {
  const box = root.querySelector('.tm-strip');
  if (!box || box.dataset.ready) return null;
  box.dataset.ready = '1';
  const ins = [...box.querySelectorAll('.tm-in')], cv = box.querySelector('.tm-chart'), msg = box.querySelector('.tm-msg');
  const KEY = 'twrses-body-tempdiary';
  try { const s = JSON.parse(localStorage.getItem(KEY) || 'null'); if (Array.isArray(s)) ins.forEach((el, i) => { if (s[i] != null && s[i] !== '') el.value = s[i]; }); } catch (e) { /* 沒有也能用 */ }
  const val = (el) => { const v = parseFloat(el.value); return v >= 34 && v <= 42 ? v : null; };
  function draw() {
    const days = [0, 1, 2, 3, 4].map((d) => [0, 1, 2].map((m) => val(ins[d * 3 + m])));
    const all = days.flat().filter((v) => v != null);
    const r = cv.getBoundingClientRect(), dp = Math.min(window.devicePixelRatio || 1, 2), w = Math.round(r.width * dp), h = Math.round(r.height * dp);
    if (w && h) {
      if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
      const g = cv.getContext('2d'); g.clearRect(0, 0, w, h);
      const lo = Math.min(36, ...all.map((v) => v - 0.2)), hi = Math.max(37.6, ...all.map((v) => v + 0.2));
      const pl = 34 * dp, pr = 12 * dp, pt = 10 * dp, pb = 18 * dp;
      const X = (m) => pl + (m / 2) * (w - pl - pr), Y = (v) => pt + (1 - (v - lo) / (hi - lo)) * (h - pt - pb);
      g.font = `${10 * dp}px sans-serif`; g.fillStyle = 'rgba(255,255,255,.5)'; g.strokeStyle = 'rgba(255,255,255,.1)'; g.lineWidth = 1;
      g.textAlign = 'right';
      for (let v = Math.ceil(lo * 2) / 2; v <= hi; v += 0.5) { g.beginPath(); g.moveTo(pl, Y(v)); g.lineTo(w - pr, Y(v)); g.stroke(); g.fillText(v.toFixed(1), pl - 5 * dp, Y(v) + 3 * dp); }
      g.textAlign = 'center';
      ['AM', 'Noon', 'PM'].forEach((t, m) => g.fillText(t, Math.min(w - 14 * dp, Math.max(pl + 8 * dp, X(m))), h - 4 * dp));
      days.forEach((row, d) => {
        g.strokeStyle = DAYC[d]; g.fillStyle = DAYC[d]; g.lineWidth = 2 * dp; g.lineJoin = 'round'; g.beginPath();
        let started = false;
        row.forEach((v, m) => { if (v == null) return; if (!started) { g.moveTo(X(m), Y(v)); started = true; } else g.lineTo(X(m), Y(v)); });
        g.stroke();
        row.forEach((v, m) => { if (v == null) return; g.beginPath(); g.arc(X(m), Y(v), 3.5 * dp, 0, Math.PI * 2); g.fill(); });
      });
    }
    const both = days.filter((r2) => r2[0] != null && r2[2] != null);
    let en, zh;
    if (!all.length) { en = 'Type your temperatures in the boxes. Each day becomes one line.'; zh = '把量到的體溫填進格子裡，每一天會變成一條線。'; }
    else if (!both.length) { en = 'Good start. Add a morning and an evening number on the same day to see your daily wave.'; zh = '好的開始。同一天的早上和傍晚都填了，就看得到你一天的波浪。'; }
    else {
      const diff = both.reduce((a, r2) => a + (r2[2] - r2[0]), 0) / both.length, n = both.length, ab = Math.abs(diff).toFixed(1);
      const dEn = n === 1 ? '1 day' : `${n} days`;
      if (Math.abs(diff) < 0.05) { en = `Over ${dEn}, your evenings and mornings were about the same.`; zh = `在 ${n} 天裡，你的傍晚和早上差不多一樣。`; }
      else if (diff > 0) { en = `Over ${dEn}, your evenings were ${ab} degrees higher than your mornings on average. That is the daily wave.`; zh = `在 ${n} 天裡，你的傍晚平均比早上高 ${ab} 度。這就是每天的那道波浪。`; }
      else { en = `Over ${dEn}, your evenings were ${ab} degrees lower than your mornings on average. Keep measuring: did you sit quietly first each time?`; zh = `在 ${n} 天裡，你的傍晚平均比早上低 ${ab} 度。繼續量量看：每次量之前都有先安靜坐一下嗎？`; }
    }
    const tail = all.length ? ['This diary shows a pattern. It cannot tell you whether you are sick.', '這份日記畫的是起伏的樣子，不能告訴你有沒有生病。'] : ['', ''];
    msg.innerHTML = `${esc(en)} ${esc(tail[0])}<span class="zh">${esc(zh)}${esc(tail[1])}</span>`;
  }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(ins.map((el) => el.value))); } catch (e) { /* 沒有也能用 */ } };
  ins.forEach((el) => el.addEventListener('input', () => { save(); draw(); }));
  box.querySelector('.tm-clear').addEventListener('click', () => { ins.forEach((el) => { el.value = ''; }); save(); draw(); });
  new ResizeObserver(draw).observe(cv.parentElement);
  draw();
  return { scrollTo: () => box.scrollIntoView({ behavior: 'smooth', block: 'center' }), draw };
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
  const scene = new Scene();
  scene.background = new Color(0x0a1224);
  const camera = new PerspectiveCamera(32, 1, 0.01, 40);
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 0.3; controls.maxDistance = 9;
  scene.add(new HemisphereLight(0xdfe8ff, 0x2a1a20, 1.1));
  scene.add(new AmbientLight(0xffffff, 0.3));
  const key = new DirectionalLight(0xfff3e0, 1.6); key.position.set(1.5, 2.5, 3); scene.add(key);
  const rim = new DirectionalLight(0x9fc4ff, 0.7); rim.position.set(-2, 1.5, -2.5); scene.add(rim);

  let NOTES = {};
  try { NOTES = JSON.parse(root.getAttribute('data-notes') || '{}'); } catch (e) { /* 留空 */ }
  const R = {
    loading: $('.sk-loading'), bar: $('.sk-bar i'), core: $('.tm-core'), set: $('.tm-set'), status: $('.tm-status'),
    flow: $('.tm-bar-flow i'), sweat: $('.tm-bar-sweat i'), shiver: $('.tm-bar-shiver i'), limb: $('.tm-bar-limb i'),
    slider: $('.tm-slider'), airT: $('.tm-air-t'), ex: $('.tm-ex'), fever: $('.tm-fever'),
  };
  const lab = labeler($('.al-labels'), cv, camera);
  const state = { ready: false, labels: true, air: 24, ex: false, fever: false, set: 37, core: 37, clock: 0, hold: false, note: '' };
  let bones = null, skModel = null;
  const P = {};
  const body = new Group(), skin = new Group();
  body.visible = false; skin.visible = false;          // 載入完、放好位置才顯示
  scene.add(body, skin);
  const zones = [];                                    // { mat, k }：k = 0 核心 … 1 手腳
  const zmat = (k) => { const m = new MeshStandardMaterial({ color: 0xffa24a, roughness: 0.7, transparent: true, opacity: 0.4, depthWrite: false }); zones.push({ mat: m, k }); return m; };
  function seg(a, b, r, k) {
    const d = b.clone().sub(a), len = d.length();
    const m = new Mesh(new CapsuleGeometry(r, len, 6, 16), zmat(k));
    m.position.copy(a).add(b).multiplyScalar(0.5);
    m.quaternion.setFromUnitVectors(UP, d.normalize());
    m.renderOrder = 3; body.add(m); return m;
  }
  function blob(c, rx, ry, rz, k) {
    const m = new Mesh(new SphereGeometry(1, 28, 20), zmat(k));
    m.position.copy(c); m.scale.set(rx, ry, rz); m.renderOrder = 3; body.add(m); return m;
  }
  let stat = null, lines = null;
  const S = {};                                        // 皮膚塊裡的零件

  loadBones(root.getAttribute('data-model'), (p) => { R.bar.style.width = `${Math.round(p * 80)}%`; }).then((sk) => {
    bones = sk.bones; skModel = sk.model;
    scene.add(sk.model);
    for (const b of bones.values()) { b.mat.opacity = 0.5; b.mat.depthWrite = false; b.mesh.renderOrder = 1; }
    const regionBox = (reg, side) => [...bones.values()].filter((b) => b.info.region === reg && (!side || b.info.id.startsWith(`${side}-`)))
      .reduce((bx, b) => (bx ? bx.union(b.box) : b.box.clone()), null);
    const ends = (id) => {
      const b = bones.get(id), h = b.box.max.y - b.box.min.y;
      return [average(worldVerts(b.mesh, (v) => v.y > b.box.max.y - h * 0.08)), average(worldVerts(b.mesh, (v) => v.y < b.box.min.y + h * 0.08))];
    };
    const chest = regionBox('chest'), pelvis = regionBox('pelvis'), skull = regionBox('skull');
    const cc = chest.getCenter(V(0, 0, 0)), cs = chest.getSize(V(0, 0, 0)), pc = pelvis.getCenter(V(0, 0, 0)), ps = pelvis.getSize(V(0, 0, 0));
    const hc = skull.getCenter(V(0, 0, 0)), hs = skull.getSize(V(0, 0, 0));
    const top = chest.max.y, bot = pelvis.min.y + ps.y * 0.15;
    blob(V(0, (top + bot) / 2, (cc.z + pc.z) / 2), cs.x * 0.56, (top - bot) / 2 * 1.04, Math.max(cs.z, ps.z) * 0.6, 0);
    blob(hc, hs.x * 0.56, hs.y * 0.56, hs.z * 0.56, 0.05);
    seg(V(0, top - 0.02, cc.z - 0.02), V(0, skull.min.y + 0.03, hc.z - 0.02), 0.05, 0.05);
    for (const s of ['l', 'r']) {
      const [h0, h1] = ends(`${s}-humerus`), [r0, r1] = ends(`${s}-radius`), [f0, f1] = ends(`${s}-femur`), [t0, t1] = ends(`${s}-tibia`);
      seg(h0, h1, 0.05, 0.4); seg(r0, r1, 0.04, 0.75);
      seg(f0, f1, 0.078, 0.35); seg(t0.clone().add(V(0, 0, -0.01)), t1, 0.055, 0.75);
      const hb = regionBox('hand', s), hcn = hb.getCenter(V(0, 0, 0));
      seg(V(hcn.x, hb.max.y - 0.03, hcn.z), V(hcn.x, hb.min.y + 0.035, hcn.z), 0.042, 1);
      const fb = regionBox('foot', s), fcn = fb.getCenter(V(0, 0, 0));
      seg(V(fcn.x, fb.min.y + 0.05, fb.min.z + 0.05), V(fcn.x, fb.min.y + 0.04, fb.max.z - 0.04), 0.048, 1);
      if (s === 'l') { P.hand = hcn.clone(); P.foot = V(fcn.x, fb.min.y + 0.05, fb.max.z - 0.04); P.arm = r0.clone().lerp(r1, 0.5); }
    }
    stat = new Mesh(new SphereGeometry(0.016, 16, 12), new MeshBasicMaterial({ color: 0xffe14a, depthTest: false, transparent: true }));
    stat.position.copy(hc).add(V(0, -hs.y * 0.05, -0.005)); stat.renderOrder = 9; body.add(stat);
    P.stat = stat.position.clone(); P.core = V(0, (top + bot) / 2 + 0.05, cc.z + cs.z * 0.3); P.height = skull.max.y;

    buildSkin();
    P.target = V(0.5, P.height * 0.5, 0);
    P.home = V(0.4, 0.15, 4);
    camera.position.copy(homePos());
    controls.target.copy(P.target);
    body.visible = true; skin.visible = true;
    state.ready = true;
    R.loading.hidden = true;
    root.classList.add('al-ready');
    apply();
  }).catch((e) => {
    console.error(e);
    R.loading.innerHTML = 'The model could not be loaded. Please reload the page.<br><span class="zh">模型載入失敗，請重新整理頁面。</span>';
  });
  const fit = () => MathUtils.clamp(1 + (0.75 - camera.aspect) * 1.2, 1, 1.5);
  function homePos() { return P.target.clone().add(P.home.clone().multiplyScalar(fit())); }

  // ---------------- 放大的皮膚塊（浮在身體左手邊） ----------------
  function buildSkin() {
    const o = V(1.0, 1.3, 0.05), K = 3;
    skin.position.copy(o); skin.scale.setScalar(K);
    const add = (m) => { skin.add(m); return m; };
    add(new Mesh(new BoxGeometry(0.3, 0.16, 0.14), new MeshStandardMaterial({ color: 0xf2b8a0, roughness: 0.8, transparent: true, opacity: 0.28, depthWrite: false }))).position.set(0, -0.08, 0);
    S.epi = add(new Mesh(new BoxGeometry(0.3, 0.018, 0.14), new MeshStandardMaterial({ color: 0xe8a585, roughness: 0.8, transparent: true, opacity: 0.7, depthWrite: false })));
    S.epi.position.set(0, 0.009, 0);
    const red = new MeshStandardMaterial({ color: 0xc8343a, roughness: 0.5 });
    add(new Mesh(new TubeGeometry(cr([V(-0.15, -0.135, 0), V(-0.05, -0.13, 0.01), V(0.05, -0.136, -0.01), V(0.15, -0.13, 0)]), 30, 0.009, 10, false), red));
    S.loopMat = new MeshStandardMaterial({ color: 0xff4a4a, roughness: 0.5, transparent: true, opacity: 0.5, emissive: 0x300000 });
    S.loop = cr([V(-0.075, -0.13, 0.005), V(-0.07, -0.07, 0.02), V(-0.045, -0.022, 0.03), V(0, -0.016, 0.034), V(0.04, -0.022, 0.03), V(0.06, -0.07, 0.02), V(0.066, -0.13, 0)]);
    add(new Mesh(new TubeGeometry(S.loop, 60, 0.0045, 8, false), S.loopMat));
    S.dots = [];
    const dm = new MeshBasicMaterial({ color: 0xff6a5a });
    for (let i = 0; i < 12; i++) { const d = add(new Mesh(new SphereGeometry(0.0065, 10, 8), dm)); d.renderOrder = 6; S.dots.push(d); }
    // 汗腺：深處盤成一團，導管通到表面的毛孔
    const gl = [];
    for (let i = 0; i <= 14; i++) { const a = i * 1.1; gl.push(V(0.105 + Math.cos(a) * 0.016, -0.115 + Math.sin(a * 1.3) * 0.012 + i * 0.0012, -0.02 + Math.sin(a) * 0.016)); }
    gl.push(V(0.108, -0.07, -0.02), V(0.102, -0.03, -0.02), V(0.105, 0.016, -0.02));
    add(new Mesh(new TubeGeometry(cr(gl), 90, 0.0042, 8, false), new MeshStandardMaterial({ color: 0x8fc8ee, roughness: 0.5 })));
    const wm = new MeshStandardMaterial({ color: 0x9fdcff, roughness: 0.15, transparent: true, opacity: 0.85, emissive: 0x0a2a44 });
    S.pool = add(new Mesh(new SphereGeometry(1, 16, 12), wm)); S.pool.position.set(0.105, 0.02, -0.02);
    S.drops = [];
    for (let i = 0; i < 7; i++) { const d = add(new Mesh(new SphereGeometry(0.006, 10, 8), wm)); d.renderOrder = 6; S.drops.push(d); }
    // 毛、毛囊、豎毛肌、雞皮疙瘩
    S.hair = new Group(); S.hair.position.set(-0.125, -0.085, -0.02); skin.add(S.hair);
    const hm = new Mesh(new CylinderGeometry(0.0022, 0.0045, 0.26, 8), new MeshStandardMaterial({ color: 0x3a2a20, roughness: 0.6 }));
    hm.position.y = 0.13; S.hair.add(hm);
    const bulb = new Mesh(new SphereGeometry(0.009, 12, 10), new MeshStandardMaterial({ color: 0x8a5a48, roughness: 0.7 })); S.hair.add(bulb);
    S.musMat = new MeshStandardMaterial({ color: 0xb04040, roughness: 0.5, emissive: 0x000000 });
    S.mus = add(new Mesh(new CylinderGeometry(0.004, 0.004, 1, 8), S.musMat));
    S.bump = add(new Mesh(new SphereGeometry(0.014, 16, 12), new MeshStandardMaterial({ color: 0xe8a585, roughness: 0.8 })));
    // 引線：左前臂 → 皮膚塊的四個角
    const arr = [], from = P.arm.clone().add(V(0.04, 0, 0.02));
    for (const c of [V(-0.15, 0.02, 0), V(-0.15, -0.16, 0)]) { const w = c.clone().multiplyScalar(K).add(o); arr.push(from.x, from.y, from.z, w.x, w.y, w.z); }
    lines = new LineSegments(new BufferGeometry(), new LineBasicMaterial({ color: 0xffd36e, transparent: true, opacity: 0.5 }));
    lines.geometry.setAttribute('position', new Float32BufferAttribute(arr, 3));
    scene.add(lines);
    const L = (x, y, z) => V(x, y, z).multiplyScalar(K).add(o);
    P.skin = L(0, 0.2, 0); P.sweat = L(0.105, -0.17, -0.02); P.loop = L(0, -0.05, 0.03); P.hair = L(-0.09, -0.04, -0.02);
  }

  // ---------------- 模擬 ----------------
  const col = new Color(), tv = V(0, 0, 0), ta = V(0, 0, 0), tb = V(0, 0, 0);
  const ramp = (w, out) => (w < 0.5 ? out.copy(COOL).lerp(MID, w / 0.5) : out.copy(MID).lerp(HOT, (w - 0.5) / 0.5));
  let cur = drives(24, false, 0);
  function apply() {
    const err = state.core - state.set - (state.ex ? 0.3 : 0);
    const d = cur = drives(state.air, state.ex, err);
    if (state.ready) {
      const coreW = clamp01(0.74 + (state.core - 37) * 0.16);
      for (const z of zones) { ramp(MathUtils.lerp(coreW, d.limb, z.k), col); z.mat.color.copy(col); z.mat.emissive.copy(col).multiplyScalar(0.25); }
      const jit = d.shiver * 0.004 * Math.sin(state.clock * 42);
      body.position.x = jit; skModel.position.x = jit;
      stat.scale.setScalar(1 + 0.25 * Math.sin(state.clock * 3) + (state.fever ? 0.5 : 0));
      stat.material.color.setHex(state.fever ? 0xff8a3a : 0xffe14a);
      // 皮膚塊
      S.loopMat.opacity = 0.25 + 0.75 * d.flow; S.loopMat.emissive.setRGB(0.35 * d.flow, 0, 0);
      S.epi.material.color.setRGB(0.91, 0.65 - 0.2 * d.flow + 0.06 * d.cold, 0.52 - 0.12 * d.flow + 0.16 * d.cold);
      const n = Math.round(1 + d.flow * 11);
      S.dots.forEach((m, i) => { m.visible = i < n; if (m.visible) S.loop.getPointAt((state.clock * (0.12 + 0.2 * d.flow) + i / n) % 1, m.position); });
      S.pool.visible = d.sweat > 0.04; S.pool.scale.set(0.03 * d.sweat + 0.004, 0.008 * d.sweat + 0.002, 0.026 * d.sweat + 0.004);
      S.drops.forEach((m, i) => {
        const p = (state.clock * 0.45 + i / S.drops.length) % 1;
        m.visible = d.sweat > 0.08 && i < Math.round(d.sweat * 7);
        if (m.visible) { m.position.set(0.105 + Math.sin(i * 2.4) * 0.035 * p, 0.03 + p * 0.1, -0.02 + Math.cos(i * 1.7) * 0.03 * p); m.scale.setScalar((1 - p) * (0.6 + 0.8 * d.sweat)); }
      });
      S.hair.rotation.z = MathUtils.lerp(-0.85, -0.12, d.goose);
      S.hair.updateMatrix();
      ta.set(0, 0.07, 0).applyMatrix4(S.hair.matrix);              // 豎毛肌接在毛囊上的一點
      tb.set(-0.045, -0.004, -0.02);                               // 另一端接在表皮下
      tv.copy(tb).sub(ta);
      S.mus.position.copy(ta).add(tb).multiplyScalar(0.5); S.mus.scale.set(1 + d.goose, tv.length(), 1 + d.goose);
      S.mus.quaternion.setFromUnitVectors(UP, tv.normalize());
      S.musMat.emissive.setRGB(0.4 * d.goose, 0, 0);
      tv.set(0, 0.09, 0).applyMatrix4(S.hair.matrix); S.bump.position.set(tv.x, 0.012, -0.02); S.bump.scale.set(1, 0.25 + 0.9 * d.goose, 1);
    }
    R.core.textContent = state.core.toFixed(1); R.set.textContent = state.set.toFixed(1);
    R.flow.style.width = `${Math.round(d.flow * 100)}%`; R.sweat.style.width = `${Math.round(d.sweat * 100)}%`;
    R.shiver.style.width = `${Math.round(d.shiver * 100)}%`; R.limb.style.width = `${Math.round(d.limb * 100)}%`;
    const fe = state.core - state.set;
    const nk = state.fever ? (fe < -0.25 ? 'fever_up' : 'fever_hold') : fe > 0.25 ? 'fever_down'
      : state.ex ? 'exercise' : d.hot > 0.6 ? 'hot' : d.hot > 0.1 ? 'warm' : d.cold > 0.5 ? 'cold' : d.cold > 0.1 ? 'cool' : 'comfy';
    if (nk !== state.note && NOTES[nk]) {
      state.note = nk;
      R.status.innerHTML = `${esc(NOTES[nk].en)}<span class="zh">${esc(NOTES[nk].zh)}</span>`;
      R.status.className = `ey-status tm-status ${['hot', 'cold', 'fever_up', 'fever_hold', 'fever_down'].includes(nk) ? 'ey-bad' : 'ey-ok'}`;
    }
  }

  // ---------------- 操作 ----------------
  const fillSlider = () => { R.slider.style.setProperty('--p', `${((R.slider.value - 5) / 33) * 100}%`); R.airT.textContent = `${R.slider.value} °C`; };
  function setAir(t) { state.air = MathUtils.clamp(+t, 5, 38); R.slider.value = state.air; fillSlider(); apply(); }
  function setEx(on) { state.ex = on; R.ex.setAttribute('aria-pressed', on ? 'true' : 'false'); apply(); }
  function setFever(on) { state.fever = on; state.set = on ? 38.5 : 37; R.fever.setAttribute('aria-pressed', on ? 'true' : 'false'); apply(); }
  R.slider.addEventListener('input', () => setAir(R.slider.value));
  R.ex.addEventListener('click', () => setEx(!state.ex));
  R.fever.addEventListener('click', () => setFever(!state.fever));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="skel"]', (v) => { if (bones) for (const b of bones.values()) b.mesh.visible = v; });
  $('.al-home').addEventListener('click', () => { if (state.ready) flyTo(homePos(), P.target); });
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t) { fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0; }
  fillSlider();

  // ---------------- 標籤 ----------------
  const Lb = {
    stat: lab.add('ey-lb ey-lb-o', 'Thermostat · 恆溫器'), core: lab.add('ey-lb', 'Middle of the body · 身體的中間'),
    hand: lab.add('ey-lb', 'Hands · 手'), foot: lab.add('ey-lb', 'Feet · 腳'),
    skin: lab.add('ey-lb ey-lb-o', 'A piece of skin, magnified · 放大的一小塊皮膚'), sweat: lab.add('ey-lb tm-lb-w', 'Sweat gland · 汗腺'),
    loop: lab.add('ey-lb sn-lb-v', 'Blood near the surface · 靠近表面的血'), hair: lab.add('ey-lb', 'Hair muscle · 豎毛肌'),
  };
  for (const el of Object.values(Lb)) el.hidden = true;
  let autoLabels = true;
  const tgL = $('[data-t="labels"]');
  if (tgL) tgL.addEventListener('change', () => { autoLabels = false; });
  function updateLabels() {
    const on = state.ready && state.labels;
    for (const el of Object.values(Lb)) el.hidden = !on;
    if (!on) return;
    lab.place(Lb.stat, P.stat.clone().add(V(-0.2, 0.06, 0)));
    lab.place(Lb.core, P.core.clone().add(V(-0.34, 0, 0)));
    lab.place(Lb.hand, P.hand.clone().add(V(0.02, -0.16, 0)));
    lab.place(Lb.foot, P.foot.clone().add(V(0.2, 0, 0)));
    lab.place(Lb.skin, P.skin); lab.place(Lb.sweat, P.sweat, 16); lab.place(Lb.loop, P.loop, 14); lab.place(Lb.hair, P.hair, -14);
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
    state.clock += dt;
    const target = state.set + (state.ex ? 0.3 : 0);
    state.core += (target - state.core) * Math.min(1, dt / 4);       // 真實身體要好幾分鐘，這裡幾秒
    if (Math.abs(target - state.core) < 0.005) state.core = target;
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

  // 除錯用：$('[data-temperature-lab]').__lab；背景分頁 rAF 很慢時用 run(秒)／render()
  root.__lab = {
    camera, controls, state, P, setAir, setEx, setFever, drives, diary, cur: () => cur,
    zoomSkin: () => flyTo(P.skin.clone().add(V(0.15, -0.5, 1.9)), P.skin.clone().add(V(0, -0.75, 0))),
    run: (sec) => { for (let x = 0; x < sec; x += 1 / 30) step(1 / 30); fly.t = 1; },
    render: () => { step(0); controls.update(); updateLabels(); renderer.render(scene, camera); },
  };
  return { ready: () => state.ready, test: () => diary && diary.scrollTo() };
}

lazyBoot('[data-temperature-lab]', initLab, { test: (lab) => lab.test() });
