/*
 * 人體探索 · 第二十課「運動的時候，身體發生什麼事？」的 3D 模型：調整速度。
 *
 * 真實的：整副骨架（skeleton.glb）放進 bodyG；兩臂、兩腿掛在巢狀 pivot 上原地跑步
 *   （肩 ⊃ 肘、髖 ⊃ 膝；轉向約定同第五課：繞 X 負角＝往前，膝屈曲為正）。跑步動作是簡單的示意。
 * 自繪示意：心臟（照顯示的心跳跳動）、兩片肺（照顯示的呼吸起伏）、大腿與小腿的肌肉（越需要氧氣越亮）、
 *   從心臟沿主動脈到兩腿的紅色血點（越快表示每分鐘送出的血越多）。
 *
 * 模擬（示意，以大約十歲的孩子舉例）：四種速度 PACE 各有心跳、呼吸的目標值；
 *   實際值用一階延遲追上去（上升時間常數 3.5 秒、下降 9 秒）——所以「腿馬上變、心肺慢慢跟上，停下來還會喘一陣子」。
 *   真實身體的延遲更長，頁面有註明時間縮短了。右欄的折線是最近 60 秒的心跳與呼吸（2D canvas）。
 *
 * 脈搏卡（initPulse：15 秒計時＋三次脈搏）是 2D，不需要 WebGL。
 * 產物：cd tools/body && npm run build → assets/js/exercise.js
 */
import {
  AmbientLight, CatmullRomCurve3, Color, DirectionalLight, Group, HemisphereLight, MathUtils, Mesh, MeshBasicMaterial, MeshStandardMaterial,
  PerspectiveCamera, PlaneGeometry, Scene, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { average, labeler, lazyBoot, loadBones, worldVerts } from './common.js';

const V = (x, y, z) => new Vector3(x, y, z);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
// 速度：stride 擺動幅度、cad 每秒步數、hr 心跳、br 呼吸、need 肌肉的需氧程度
const PACE = {
  rest: { stride: 0, cad: 0, hr: 82, br: 18, need: 0.08 },
  walk: { stride: 0.32, cad: 1.8, hr: 108, br: 26, need: 0.35 },
  jog: { stride: 0.6, cad: 2.7, hr: 152, br: 40, need: 0.7 },
  sprint: { stride: 0.95, cad: 3.8, hr: 192, br: 56, need: 1 },
};

// ---------------- 脈搏卡（2D） ----------------
function initPulse(root) {
  const box = root.querySelector('.ex-strip');
  if (!box || box.dataset.ready) return null;
  box.dataset.ready = '1';
  const q = (s) => box.querySelector(s);
  const ins = [...box.querySelectorAll('.ex-in')], outs = [...box.querySelectorAll('.ex-bpm')], bars = [...box.querySelectorAll('.ex-bar i')], msg = q('.ex-msg'), go = q('.ex-timer'), tt = q('.ex-count');
  let timer = 0, t0 = 0;
  function draw() {
    const v = ins.map((el) => { const n = parseFloat(el.value); return n >= 5 && n <= 60 ? Math.round(n * 4) : null; });
    v.forEach((b, i) => { outs[i].textContent = b === null ? '—' : String(b); bars[i].style.height = `${b === null ? 0 : MathUtils.clamp((b / 220) * 100, 4, 100)}%`; });
    let en, zh;
    if (v[0] === null || v[1] === null) { en = 'Count your pulse for 15 seconds each time and enter the number of beats. The card multiplies by 4.'; zh = '每次數 15 秒的脈搏，輸入跳了幾下，卡片會幫你乘以 4。'; }
    else if (v[1] <= v[0]) { en = 'After exercise the pulse should be higher than at rest. Count again right after you stop, without waiting.'; zh = '運動完的脈搏應該比休息時高。一停下來就馬上數，不要等。'; }
    else if (v[2] === null) { en = `Your heart sped up by ${v[1] - v[0]} beats a minute to feed your muscles. Now rest for two minutes and count once more.`; zh = `為了供應肌肉，你的心跳每分鐘加快了 ${v[1] - v[0]} 下。現在休息兩分鐘，再數一次。`; }
    else { const p = Math.round(MathUtils.clamp(((v[1] - v[2]) / (v[1] - v[0])) * 100, -50, 150)); en = `Up by ${v[1] - v[0]} beats a minute, and after two minutes of rest, about ${Math.max(0, p)}% of that rise is gone. Your body is recovering. Everyone's numbers are different, so compare only with your own on another day.`; zh = `每分鐘加快了 ${v[1] - v[0]} 下；休息兩分鐘後，上升的部分大約降回了 ${Math.max(0, p)}%，身體正在恢復。每個人的數字都不一樣，只和自己改天的結果比就好。`; }
    msg.innerHTML = `${esc(en)}<span class="zh">${esc(zh)}</span>`;
  }
  ins.forEach((el) => el.addEventListener('input', draw));
  go.addEventListener('click', () => {
    if (timer) { clearInterval(timer); timer = 0; tt.textContent = '15'; go.setAttribute('aria-pressed', 'false'); go.querySelector('span').innerHTML = 'Start 15 seconds<small>開始計時 15 秒</small>'; return; }
    t0 = performance.now(); go.setAttribute('aria-pressed', 'true'); go.querySelector('span').innerHTML = 'Counting… tap to cancel<small>計時中……再點一次取消</small>';
    timer = setInterval(() => {
      const left = 15 - (performance.now() - t0) / 1000;
      if (left <= 0) { clearInterval(timer); timer = 0; tt.textContent = '0'; go.setAttribute('aria-pressed', 'false'); go.classList.add('ex-done'); go.querySelector('span').innerHTML = 'Stop! Enter your number<small>停！輸入你數到的數字</small>'; setTimeout(() => { go.classList.remove('ex-done'); tt.textContent = '15'; go.querySelector('span').innerHTML = 'Start 15 seconds<small>開始計時 15 秒</small>'; }, 4000); }
      else tt.textContent = String(Math.ceil(left));
    }, 100);
  });
  q('.ex-clear').addEventListener('click', () => { ins.forEach((el) => { el.value = ''; }); draw(); });
  draw();
  return { scrollTo: () => box.scrollIntoView({ behavior: 'smooth', block: 'center' }) };
}

function initLab(root) {
  const $ = (sel) => root.querySelector(sel);
  const card = initPulse(root);
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
  const camera = new PerspectiveCamera(32, 1, 0.02, 40);
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 0.5; controls.maxDistance = 9; controls.maxPolarAngle = Math.PI * 0.52;
  scene.add(new HemisphereLight(0xdfe8ff, 0x2a1a20, 1.1));
  scene.add(new AmbientLight(0xffffff, 0.3));
  const key = new DirectionalLight(0xfff3e0, 1.8); key.position.set(2, 3, 4); scene.add(key);
  const rim = new DirectionalLight(0x9fc4ff, 0.7); rim.position.set(-2, 1.5, -2.5); scene.add(rim);

  const PTXT = JSON.parse(root.getAttribute('data-paces') || '[]');
  const REC = [root.getAttribute('data-rec-en') || '', root.getAttribute('data-rec-zh') || ''];
  const R = {
    loading: $('.sk-loading'), bar: $('.sk-bar i'), hr: $('.ex-hr'), br: $('.ex-br'), status: $('.ex-status'), trace: $('.ex-trace'),
    paces: [...root.querySelectorAll('[data-pace]')], heat: $('.ex-heat i'),
  };
  const lab = labeler($('.al-labels'), cv, camera);
  const state = { ready: false, labels: true, pace: 'rest', clock: 0, phase: 0, stride: 0, hr: 82, br: 18, need: 0.08, heat: 0, beat: 0, breath: 0, flow: 0, lastText: '' };
  let bones = null;
  const P = {};
  const bodyG = new Group();
  bodyG.visible = false;                              // 載入完、放好位置才顯示
  scene.add(bodyG);
  const J = {};                                       // r/l → { sh, el, hip, kn }
  const M = {
    heart: new MeshStandardMaterial({ color: 0xd9363a, roughness: 0.45, emissive: 0x500808, emissiveIntensity: 0.4 }),
    lung: new MeshStandardMaterial({ color: 0xf2a3b3, roughness: 0.6, transparent: true, opacity: 0.6, depthWrite: false }),
    mus: new MeshStandardMaterial({ color: 0x8a3030, roughness: 0.55, emissive: 0xff4a20, emissiveIntensity: 0, transparent: true, opacity: 0.85 }),
    blood: new MeshBasicMaterial({ color: 0xff4b4b }),
  };
  const dots = [], muscles = new Group(), bloodG = new Group();
  let heart = null, lungs = [], history = [];

  loadBones(root.getAttribute('data-model'), (p) => { R.bar.style.width = `${Math.round(p * 100)}%`; }).then(({ model, bones: bs }) => {
    bones = bs;
    bodyG.add(model); model.updateMatrixWorld(true);
    const verts = (id) => worldVerts(bones.get(id).mesh);
    const C = (id) => bones.get(id).center.clone(), Bx = (id) => bones.get(id).box;
    for (const b of bones.values()) { b.mat.opacity = b.info.region === 'chest' ? 0.42 : 0.95; b.mat.depthWrite = b.info.region !== 'chest'; }
    const end = (id, dir) => { const vs = verts(id); let lo = Infinity, hi = -Infinity; for (const v of vs) { const d = v.dot(dir); lo = Math.min(lo, d); hi = Math.max(hi, d); } return average(vs.filter((v) => v.dot(dir) > hi - 0.12 * (hi - lo))); };
    const joint = (a, b) => { const dir = C(b).sub(C(a)).normalize(); return end(a, dir).add(end(b, dir.clone().negate())).multiplyScalar(0.5); };
    const pivot = (parent, p) => { const g = new Group(); g.position.copy(p); bodyG.add(g); bodyG.updateMatrixWorld(true); parent.attach(g); return g; };
    bodyG.add(muscles, bloodG);
    for (const s of ['r', 'l']) {
      const sgn = s === 'r' ? -1 : 1;
      const sh = pivot(bodyG, end(`${s}-humerus`, V(0, 1, 0))), el = pivot(sh, joint(`${s}-humerus`, `${s}-ulna`));
      // 股骨頭在內側上方：取最上面 5 公分、靠身體中線那一半的頂點
      const top = verts(`${s}-femur`).filter((v) => v.y > Bx(`${s}-femur`).max.y - 0.05), mx = average(top).x;
      const hip = pivot(bodyG, average(top.filter((v) => (sgn < 0 ? v.x > mx : v.x < mx)))), kn = pivot(hip, joint(`${s}-femur`, `${s}-tibia`));
      for (const b of bones.values()) {
        const id = b.info.id; if (!id.startsWith(`${s}-`)) continue;
        if (id === `${s}-humerus`) sh.attach(b.mesh);
        else if (id === `${s}-radius` || id === `${s}-ulna` || b.info.region === 'hand') el.attach(b.mesh);
        else if (id === `${s}-femur`) hip.attach(b.mesh);
        else if (b.info.region === 'foot' || [`${s}-tibia`, `${s}-fibula`, `${s}-patella`].includes(id)) kn.attach(b.mesh);
      }
      // 肌肉：大腿掛在髖、小腿掛在膝
      const blob = (parent, c, sx, sy, sz) => { const m = new Mesh(new SphereGeometry(1, 20, 14), M.mus); m.position.copy(c); m.scale.set(sx, sy, sz); muscles.add(m); bodyG.updateMatrixWorld(true); parent.attach(m); return m; };
      blob(hip, C(`${s}-femur`).add(V(sgn * 0.012, 0.02, 0.025)), 0.058, 0.19, 0.06);
      blob(kn, C(`${s}-tibia`).add(V(0, 0.06, -0.04)), 0.04, 0.13, 0.042);
      J[s] = { sh, el, hip, kn, sgn };
    }
    P.thigh = C('l-femur').add(V(0.12, 0.02, 0.05));
    // 心臟、肺
    const t6 = Bx('t6'), cy = C('t6').y;
    heart = new Mesh(new SphereGeometry(1, 24, 18), M.heart); heart.position.set(0.018, cy - 0.01, t6.max.z + 0.07); heart.scale.set(0.045, 0.055, 0.04); bodyG.add(heart);
    for (const sgn of [-1, 1]) { const l = new Mesh(new SphereGeometry(1, 24, 18), M.lung); l.position.set(sgn * 0.075, cy + 0.03, t6.max.z + 0.045); l.scale.set(0.055, 0.115, 0.06); l.userData.base = l.scale.clone(); l.renderOrder = 2; bodyG.add(l); lungs.push(l); }
    P.heart = heart.position.clone(); P.lung = lungs[1].position.clone().add(V(0.09, 0.07, 0));
    // 血：心臟 → 主動脈往下 → 骨盆 → 兩腿（畫在身體座標裡，不跟著腿擺）
    const h0 = heart.position.clone(), z1 = Bx('l3').max.z + 0.02;
    for (const s of ['r', 'l']) {
      const curve = new CatmullRomCurve3([h0, V(0.01, cy - 0.12, z1 + 0.02), V(0.008, C('l3').y, z1), V(0.006, C('l5').y, z1), J[s].hip.position.clone().add(V(0, -0.03, 0.03)), C(`${s}-femur`).add(V(0, -0.02, 0.03)), V(C(`${s}-femur`).x, Bx(`${s}-femur`).min.y + 0.04, C(`${s}-femur`).z + 0.03)], false, 'centripetal');
      for (let i = 0; i < 12; i++) { const m = new Mesh(new SphereGeometry(0.008, 10, 8), M.blood); m.renderOrder = 5; bloodG.add(m); dots.push({ m, curve, off: i / 12 + (s === 'l' ? 0.04 : 0) }); }
    }
    // 地面
    const floor = new Mesh(new PlaneGeometry(3.2, 1.6), new MeshStandardMaterial({ color: 0x1f2942, roughness: 1 })); floor.rotation.x = -Math.PI / 2; floor.position.y = -0.002; scene.add(floor);
    P.target = V(0, 0.9, 0); P.home = V(2.0, 0.2, 2.75);
    camera.position.copy(homePos());
    controls.target.copy(P.target);
    bodyG.visible = true;
    state.ready = true;
    R.loading.hidden = true;
    root.classList.add('al-ready');
  }).catch((e) => {
    console.error(e);
    R.loading.innerHTML = 'The model could not be loaded. Please reload the page.<br><span class="zh">模型載入失敗，請重新整理頁面。</span>';
  });
  const fit = () => MathUtils.clamp(1 + (1.1 - camera.aspect) * 0.45, 1, 1.45);
  function homePos() { return P.target.clone().add(P.home.clone().multiplyScalar(fit())); }

  // ---------------- 模擬 ----------------
  function sim(dt) {
    state.clock += dt;
    const T = PACE[state.pace];
    const lag = (cur, tgt, up, down) => cur + (tgt - cur) * (dt ? 1 - Math.exp(-dt / (tgt > cur ? up : down)) : 0);
    state.stride = lag(state.stride, T.stride, 0.35, 0.35);
    state.hr = lag(state.hr, T.hr, 3.5, 9); state.br = lag(state.br, T.br, 3.5, 9);
    state.need = lag(state.need, T.need, 0.8, 2.5);
    state.heat = lag(state.heat, Math.max(0, T.need - 0.25) / 0.75, 8, 14);
    state.phase += dt * (T.cad > 0 ? T.cad : 1.2) * Math.PI;      // 一個完整週期＝兩步
    const a = state.stride, ph = state.phase;
    // 跑步：同側手腳相反；膝在擺動期彎得多；手肘越跑彎得越多
    for (const s of ['r', 'l']) {
      const j = J[s], p = ph + (s === 'l' ? Math.PI : 0), sw = Math.sin(p);
      j.hip.rotation.x = -a * 0.75 * sw - a * 0.12;
      j.kn.rotation.x = a * (0.25 + 1.15 * Math.max(0, Math.sin(p - 1.1)));
      j.sh.rotation.x = a * 0.7 * sw;
      j.el.rotation.x = -Math.min(1.5, a * 2.2) - a * 0.25 * Math.max(0, -sw);
    }
    bodyG.position.y = 0.02 * a * Math.abs(Math.sin(ph)); bodyG.rotation.x = 0.13 * a;
    // 心臟、肺、肌肉、血
    state.beat = (state.beat + dt * state.hr / 60) % 1;
    const k = 1 + 0.16 * Math.exp(-state.beat * 7) * (0.7 + 0.5 * state.need);
    heart.scale.set(0.045 * k, 0.055 * k, 0.04 * k);
    state.breath = (state.breath + dt * state.br / 60) % 1;
    const inh = 0.5 - 0.5 * Math.cos(state.breath * Math.PI * 2), depth = 0.06 + 0.16 * MathUtils.clamp((state.br - 18) / 38, 0, 1);
    for (const l of lungs) l.scale.set(l.userData.base.x * (1 + depth * inh), l.userData.base.y * (1 + depth * 0.5 * inh), l.userData.base.z * (1 + depth * inh));
    M.mus.emissiveIntensity = state.need * 0.95; M.mus.color.setHex(0x8a3030).lerp(tc.setHex(0xff7a3c), state.need * 0.6);
    const out = (state.hr / 82) * (1 + 0.6 * state.need);        // 每分鐘送出的血（相對值，示意）
    state.flow = (state.flow + dt * 0.11 * out) % 1;
    for (const d of dots) { d.curve.getPointAt((state.flow + d.off) % 1, d.m.position); }
    // 文字
    const recovering = state.pace === 'rest' && state.hr > 95;
    const p = PTXT.find((x) => x.key === state.pace) || {};
    const text = recovering ? REC : [p.text_en || '', p.text_zh || ''];
    if (text[0] !== state.lastText) { state.lastText = text[0]; R.status.innerHTML = `${esc(text[0])}<span class="zh">${esc(text[1])}</span>`; R.status.className = `ey-status ex-status ${recovering ? 'ey-bad' : state.pace === 'rest' ? '' : 'ey-ok'}`; }
    R.hr.textContent = String(Math.round(state.hr)); R.br.textContent = String(Math.round(state.br));
    R.heat.style.width = `${Math.round(state.heat * 100)}%`;
    if (dt > 0) { state.acc = (state.acc || 0) + dt; if (state.acc >= 0.25) { state.acc = 0; history.push([state.hr, state.br]); if (history.length > 240) history.shift(); } }
    drawTrace();
  }
  const tc = new Color();
  // ---------------- 最近 60 秒的心跳與呼吸（2D） ----------------
  function drawTrace() {
    const c = R.trace; if (!c) return;
    const r = c.getBoundingClientRect(), d = Math.min(window.devicePixelRatio || 1, 2), w = Math.round(r.width * d), h = Math.round(r.height * d);
    if (!w || !h) return;
    if (c.width !== w || c.height !== h) { c.width = w; c.height = h; }
    const g = c.getContext('2d'); g.clearRect(0, 0, w, h);
    g.strokeStyle = 'rgba(255,255,255,.1)'; g.lineWidth = 1;
    for (const y of [0.25, 0.5, 0.75]) { g.beginPath(); g.moveTo(0, h * y); g.lineTo(w, h * y); g.stroke(); }
    const line = (idx, lo, hi, color) => {
      g.strokeStyle = color; g.lineWidth = 2 * d; g.lineJoin = 'round'; g.beginPath();
      history.forEach((v, i) => { const x = w - (history.length - 1 - i) * (w / 239), y = h - 4 * d - ((v[idx] - lo) / (hi - lo)) * (h - 8 * d); if (i === 0) g.moveTo(x, y); else g.lineTo(x, y); });
      g.stroke();
    };
    line(0, 60, 200, '#ff6b6b'); line(1, 10, 60, '#9fd8ff');
  }

  // ---------------- 操作 ----------------
  function setPace(k) { if (!PACE[k]) return; state.pace = k; R.paces.forEach((b) => b.setAttribute('aria-pressed', b.dataset.pace === k ? 'true' : 'false')); }
  R.paces.forEach((b) => b.addEventListener('click', () => setPace(b.dataset.pace)));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="muscles"]', (v) => { muscles.visible = v; for (const s of ['r', 'l']) if (J[s]) { J[s].hip.children.forEach((c) => { if (c.material === M.mus) c.visible = v; }); J[s].kn.children.forEach((c) => { if (c.material === M.mus) c.visible = v; }); } });
  bind('[data-t="blood"]', (v) => { bloodG.visible = v; });
  $('.al-home').addEventListener('click', () => { if (state.ready) flyTo(homePos(), P.target); });
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t) { fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0; }

  // ---------------- 標籤 ----------------
  const Lb = {
    heart: lab.add('ey-lb ey-lb-m', ''), lung: lab.add('ey-lb', ''), mus: lab.add('ey-lb ey-lb-d', ''), blood: lab.add('ey-lb ex-lb-b', 'Blood carrying oxygen · 帶著氧氣的血'),
  };
  for (const el of Object.values(Lb)) el.hidden = true;      // 模型載入前先藏起來
  let autoLabels = true, lbKey = '';
  const tgL = $('[data-t="labels"]');
  if (tgL) tgL.addEventListener('change', () => { autoLabels = false; });
  const W = (v) => bodyG.localToWorld(v.clone());
  function updateLabels() {
    const on = state.ready && state.labels;
    for (const el of Object.values(Lb)) el.hidden = !on;
    if (!on) return;
    const key2 = `${Math.round(state.hr / 4)}|${Math.round(state.br / 2)}|${state.need > 0.5 ? 2 : state.need > 0.2 ? 1 : 0}`;
    if (key2 !== lbKey) {
      lbKey = key2;
      Lb.heart.innerHTML = `Heart: ${Math.round(state.hr)} beats a minute · 心跳每分鐘 ${Math.round(state.hr)} 下`;
      Lb.lung.innerHTML = `Lungs: ${Math.round(state.br)} breaths a minute · 呼吸每分鐘 ${Math.round(state.br)} 次`;
      Lb.mus.innerHTML = state.need > 0.5 ? 'Leg muscles: “More oxygen!” · 腿部肌肉：「要更多氧氣！」' : state.need > 0.2 ? 'Leg muscles: working · 腿部肌肉：工作中' : 'Leg muscles: resting · 腿部肌肉：休息中';
    }
    const show = (el, v, p, dy = 0) => { el.hidden = !v; if (v) lab.place(el, p, dy); };
    show(Lb.heart, true, W(P.heart.clone().add(V(-0.3, 0.02, 0.1))));
    show(Lb.lung, true, W(P.lung.clone().add(V(0.22, 0.1, 0))));
    show(Lb.mus, muscles.visible, W(P.thigh.clone().add(V(0.26, 0, 0.1))));
    show(Lb.blood, bloodG.visible, W(V(-0.28, 1.02, 0.15)));
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

  // 除錯用：$('[data-exercise-lab]').__lab；背景分頁 rAF 很慢時用 run(秒)／render()；state.hold = true 讓畫面停住
  root.__lab = {
    camera, controls, state, P, J, setPace, card, PACE,
    run: (sec) => { for (let x = 0; x < sec; x += 1 / 30) step(1 / 30); if (fly.t < 1) { camera.position.copy(fly.p1); controls.target.copy(fly.t1); fly.t = 1; } },
    render: () => { step(0); controls.update(); updateLabels(); renderer.render(scene, camera); },
  };
  return { ready: () => state.ready, test: () => card && card.scrollTo() };
}

lazyBoot('[data-exercise-lab]', initLab, { test: (lab) => lab.test() });
