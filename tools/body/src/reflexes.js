/*
 * 人體探索 · 第二十六課「為什麼會打噴嚏、打嗝、打呵欠？」的 3D 模型：慢動作看三個反射。
 *
 * 真實的：骨架（skeleton.glb，淡淡的；下頷骨掛在一個 pivot 上可以張開）、
 *   橫膈膜、腦幹、氣管、胃（organs.glb；橫膈膜掛在底緣的 pivot 上，收縮＝把圓頂往下壓扁）。
 * 自繪示意：兩片肺（頂端固定、往下長）、喉嚨裡的門（聲門，兩片小板子）、
 *   感覺神經與運動神經的路線（直線化的示意）和上面移動的小點、進出的空氣、噴嚏噴出去的飛沫。
 *
 * 每個反射是一條 0–1 的時間軸 timeline(key, t)，回傳：dia 橫膈膜收縮、vol 肺裡的空氣、gate 門是否關上、
 *   jaw 下巴張開、burst 噴出、sIn／mOut 訊息在感覺／運動路線上的進度、stage 第幾個階段。
 *   打噴嚏：癢 → 深吸氣 → 門關上、胸部加壓 → 噴出。打嗝：胃撐大 → 橫膈膜一抽 → 門啪地關上（畫兩次）。
 *   打呵欠：開始 → 又長又慢地吸氣、下巴大張 → 伸展 → 很快呼氣。沒選的時候是平靜呼吸。
 * 時間是拉長的（真正的打嗝不到一秒），頁面有說明。
 *
 * 眨眼計數器與呵欠統計（initTools）是 2D，不需要 WebGL。
 * 產物：cd tools/body && npm run build → assets/js/reflexes.js
 */
import {
  AmbientLight, BoxGeometry, CatmullRomCurve3, Color, DirectionalLight, DoubleSide, Group, HemisphereLight, MathUtils, Mesh,
  MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, Scene, SphereGeometry, TubeGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot, loadBones, loadOrgans } from './common.js';

const V = (x, y, z) => new Vector3(x, y, z);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const cr = (pts) => new CatmullRomCurve3(pts, false, 'centripetal');
const sm = (a, b, x) => MathUtils.smoothstep(x, a, b);
const DUR = { sneeze: 7, hiccup: 7, yawn: 8 };

export function timeline(key, t) {
  if (key === 'sneeze') {
    const dia = sm(0.2, 0.55, t) * (1 - sm(0.66, 0.72, t));
    return {
      dia, vol: 0.3 + 0.7 * sm(0.2, 0.55, t) - 0.85 * sm(0.66, 0.76, t) + 0.15 * sm(0.85, 1, t), gate: t >= 0.55 && t < 0.66,
      jaw: 0.12 * sm(0.2, 0.5, t) + 0.2 * sm(0.64, 0.7, t) * (1 - sm(0.8, 0.95, t)) - 0.12 * sm(0.85, 1, t),
      burst: t > 0.66 && t < 0.97 ? (t - 0.66) / 0.31 : -1, sIn: t < 0.2 ? t / 0.18 : -1, mOut: t >= 0.17 && t < 0.3 ? (t - 0.17) / 0.12 : -1,
      stage: t < 0.2 ? 0 : t < 0.55 ? 1 : t < 0.66 ? 2 : 3, stem: Math.max(0, 1 - Math.abs(t - 0.2) / 0.12),
    };
  }
  if (key === 'hiccup') {
    let dia = 0, gate = false, mOut = -1, stem = 0;
    for (const t0 of [0.3, 0.68]) {
      dia += 0.8 * sm(t0, t0 + 0.03, t) * (1 - sm(t0 + 0.08, t0 + 0.2, t));
      if (t >= t0 + 0.035 && t < t0 + 0.13) gate = true;
      if (t >= t0 - 0.07 && t < t0) mOut = (t - (t0 - 0.07)) / 0.07;
      stem = Math.max(stem, 1 - Math.abs(t - (t0 - 0.06)) / 0.08);
    }
    return { dia, vol: 0.32 + 0.22 * dia, gate, jaw: 0.03 * dia, burst: -1, sIn: t < 0.24 ? t / 0.22 : -1, mOut, stage: t < 0.27 ? 0 : t < 0.335 ? 1 : t < 0.5 ? 2 : 3, stem: Math.max(0, stem) };
  }
  if (key === 'yawn') {
    const dia = sm(0.1, 0.6, t) * (1 - sm(0.72, 0.88, t));
    return {
      dia, vol: 0.3 + 0.7 * dia, gate: false, jaw: sm(0.1, 0.5, t) * (1 - sm(0.8, 0.96, t)), burst: -1, sIn: -1,
      mOut: t >= 0.04 && t < 0.16 ? (t - 0.04) / 0.12 : -1, stage: t < 0.1 ? 0 : t < 0.6 ? 1 : t < 0.72 ? 2 : 3, stem: Math.max(0, 1 - Math.abs(t - 0.06) / 0.1),
    };
  }
  const b = 0.5 - 0.5 * Math.cos(t * Math.PI * 2);    // 平靜呼吸
  return { dia: 0.22 * b, vol: 0.3 + 0.15 * b, gate: false, jaw: 0, burst: -1, sIn: -1, mOut: -1, stage: -1, stem: 0.25 * (1 - b) };
}

// ---------------- 眨眼計數器與呵欠統計（2D） ----------------
function initTools(root) {
  const box = root.querySelector('.rx-strip');
  if (!box || box.dataset.ready) return null;
  box.dataset.ready = '1';
  const q = (s) => box.querySelector(s);
  const rounds = [...box.querySelectorAll('.rx-round')], tap = q('.rx-tap'), bmsg = q('.rx-bmsg');
  const count = [null, null];
  let active = -1, left = 0, timer = 0;
  function msg() {
    let en, zh;
    if (active >= 0) { en = `Counting… ${left} seconds left.`; zh = `計數中……還剩 ${left} 秒。`; }
    else if (count[0] == null && count[1] == null) { en = 'Watch a partner. Start a round, and tap the big button every time they blink.'; zh = '看著你的同伴。開始一個回合，對方每眨一次眼，就點一下大按鈕。'; }
    else if (count[0] == null || count[1] == null) { en = 'One round done. Now try the other one.'; zh = '完成一個回合了。現在試試另一個。'; }
    else {
      const d = count[0] - count[1];
      const bl = (n) => `${n} ${n === 1 ? 'blink' : 'blinks'}`;
      en = `Chatting: ${bl(count[0])}. Reading or a screen: ${bl(count[1])}. ${d > 0 ? `That is ${d} fewer while reading.` : d < 0 ? `That is ${-d} more while reading.` : 'The same in both.'} Many people blink much less when they read or look at a screen. If your eyes feel dry, look far away for a moment and blink.`;
      zh = `聊天：眨了 ${count[0]} 次。閱讀或看螢幕：眨了 ${count[1]} 次。${d > 0 ? `閱讀時少了 ${d} 次。` : d < 0 ? `閱讀時多了 ${-d} 次。` : '兩次一樣多。'}很多人在閱讀或看螢幕的時候，眨眼會少很多。如果眼睛覺得乾，就看看遠方、眨眨眼。`;
    }
    bmsg.innerHTML = `${esc(en)}<span class="zh">${esc(zh)}</span>`;
  }
  function stop() { clearInterval(timer); if (active >= 0) rounds[active].classList.remove('rx-on'); active = -1; tap.disabled = true; rounds.forEach((r) => { r.querySelector('.rx-go').disabled = false; }); msg(); }
  rounds.forEach((r, i) => r.querySelector('.rx-go').addEventListener('click', () => {
    if (active >= 0) return;
    active = i; count[i] = 0; left = 60; r.querySelector('.rx-rn b').textContent = '0'; r.classList.add('rx-on');
    tap.disabled = false; rounds.forEach((x) => { x.querySelector('.rx-go').disabled = true; }); msg();
    timer = setInterval(() => { left -= 1; if (left <= 0) stop(); else msg(); }, 1000);
  }));
  tap.addEventListener('click', () => { if (active < 0) return; count[active] += 1; rounds[active].querySelector('.rx-rn b').textContent = String(count[active]); });
  msg();
  const all = q('.rx-all'), yn = q('.rx-yn'), dots = q('.rx-dots'), ymsg = q('.rx-ymsg');
  function yawn() {
    const n = Math.round(parseFloat(all.value)), y = Math.round(parseFloat(yn.value));
    let en, zh;
    if (!(n > 0) || !(y >= 0) || y > n) { dots.innerHTML = ''; en = 'After the yawning video, type in how many people watched and how many yawned.'; zh = '看完打呵欠的影片之後，輸入有幾個人看、其中幾個人打了呵欠。'; }
    else {
      dots.innerHTML = Array.from({ length: Math.min(n, 120) }, (_, i) => `<i${i < y ? ' class="rx-y"' : ''}></i>`).join('');
      const p = Math.round((y / n) * 100);
      en = `${y} of ${n} yawned: about ${p}%. Not everyone catches a yawn, and that is normal. Would the number change if you tried it just before lunch, or first thing in the morning?`;
      zh = `${n} 個人裡有 ${y} 個打了呵欠：大約 ${p}%。不是每個人都會被傳染，這很正常。如果改在午餐前、或是一大早做，數字會不會不一樣？`;
    }
    ymsg.innerHTML = `${esc(en)}<span class="zh">${esc(zh)}</span>`;
  }
  all.addEventListener('input', yawn); yn.addEventListener('input', yawn);
  yawn();
  return { scrollTo: () => box.scrollIntoView({ behavior: 'smooth', block: 'center' }), stop, count: () => count };
}

function initLab(root) {
  const $ = (sel) => root.querySelector(sel);
  const tools = initTools(root);
  const spaceWrap = $('.al-space');
  const cv = $('.al-space-cv');
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas: cv, antialias: true });
  } catch (e) {
    root.classList.add('al-nogl');
    return { ready: () => true, test: () => tools && tools.scrollTo() };
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const scene = new Scene();
  scene.background = new Color(0x0a1224);
  const camera = new PerspectiveCamera(32, 1, 0.01, 30);
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 0.2; controls.maxDistance = 6;
  scene.add(new HemisphereLight(0xdfe8ff, 0x2a1a20, 1.1));
  scene.add(new AmbientLight(0xffffff, 0.3));
  const key = new DirectionalLight(0xfff3e0, 1.8); key.position.set(1.5, 2.5, 3); scene.add(key);
  const rim = new DirectionalLight(0x9fc4ff, 0.8); rim.position.set(-2, 1.5, -2.5); scene.add(rim);

  let DATA = { reflexes: [], idle: null };
  try { DATA = JSON.parse(root.getAttribute('data-reflexes') || '{}'); } catch (e) { /* 留空 */ }
  const BY = Object.fromEntries((DATA.reflexes || []).map((r) => [r.key, r]));
  const R = {
    loading: $('.sk-loading'), bar: $('.sk-bar i'), step: $('.rx-step'), name: $('.rx-name'), dia: $('.rx-bar-dia i'), air: $('.rx-bar-air i'),
    gate: $('.rx-gate'), gateT: $('.rx-gate-t'), status: $('.rx-status'), slider: $('.rx-slider'), play: $('.al-play'), playT: $('.al-play-t'),
    btns: [...root.querySelectorAll('[data-reflex]')],
  };
  const lab = labeler($('.al-labels'), cv, camera);
  const state = { ready: false, labels: true, key: '', t: 0, playing: false, clock: 0, hold: false, note: '' };
  const P = {};
  let bones = null, diaPivot = null, diaMat = null, stemMat = null, jawPivot = null, gateL = null, gateR = null, sDot = null, mDot = null;
  const lungs = [], airDots = [], spray = [];
  const C = {};                                       // 路線
  const body = new Group(); body.visible = false; scene.add(body);

  Promise.all([
    loadBones(root.getAttribute('data-model'), (p) => { R.bar.style.width = `${Math.round(p * 80)}%`; }),
    loadOrgans(root.getAttribute('data-organs')),
  ]).then(([sk, og]) => {
    bones = sk.bones; const parts = og.parts;
    scene.add(sk.model); scene.add(og.model);
    sk.model.updateMatrixWorld(true); og.model.updateMatrixWorld(true);
    const USE = ['diaphragm', 'brainstem', 'trachea', 'stomach'];
    for (const [n, part] of parts) if (!USE.includes(n)) part.mesh.visible = false;          // 別課用的器官
    for (const b of bones.values()) { const r = b.info.region; b.mat.opacity = r === 'skull' ? 0.24 : r === 'chest' || r === 'spine' ? 0.2 : 0.08; b.mat.depthWrite = false; b.mesh.renderOrder = 1; }
    const K = (n) => parts.get(n);
    // 橫膈膜：pivot 在底緣，收縮時把圓頂往下壓扁
    const d = K('diaphragm'); diaMat = d.mat;
    d.mat.color.setHex(0xc8443c); d.mat.roughness = 0.5; d.mat.side = DoubleSide; d.mat.transparent = true; d.mat.opacity = 0.92;
    diaPivot = new Group(); diaPivot.position.set(d.center.x, d.box.min.y, d.center.z); scene.add(diaPivot); diaPivot.updateMatrixWorld(true); diaPivot.attach(d.mesh);
    const dTop = d.box.max.y, dH = d.box.max.y - d.box.min.y;
    // 腦幹
    const bs = K('brainstem'); stemMat = bs.mat;
    bs.mat.color.setHex(0xf2c458); bs.mat.roughness = 0.4; bs.mesh.renderOrder = 4;
    K('trachea').mat.color.setHex(0xcfe3ef); K('trachea').mat.transparent = true; K('trachea').mat.opacity = 0.8;
    const st = K('stomach'); st.mat.color.setHex(0xf0949a); st.mat.transparent = true; st.mat.opacity = 0.5; st.mat.depthWrite = false;
    // 肺：頂端固定，隨空氣量往下、往外長
    const tr = K('trachea'), lungTop = tr.box.min.y + 0.06;
    const lm = new MeshStandardMaterial({ color: 0xf2a3b3, roughness: 0.6, transparent: true, opacity: 0.4, depthWrite: false });
    for (const sx of [-1, 1]) {
      const m = new Mesh(new SphereGeometry(1, 28, 20), lm); m.renderOrder = 3; body.add(m);
      lungs.push({ m, x: sx * 0.07, top: lungTop, z: d.center.z + 0.005, ry: (lungTop - dTop) / 2 + 0.02 });
    }
    // 喉嚨裡的門：氣管頂端的兩片小板子
    const gt = V(tr.center.x, tr.box.max.y + 0.012, tr.center.z + 0.004);
    const gm = new MeshStandardMaterial({ color: 0xffe14a, roughness: 0.4, emissive: 0x4a3a00 });
    gateL = new Mesh(new BoxGeometry(0.012, 0.004, 0.02), gm); gateR = gateL.clone();
    for (const g of [gateL, gateR]) { g.position.copy(gt); g.renderOrder = 6; body.add(g); }
    P.gate = gt.clone();
    // 下頷骨的 pivot
    const man = bones.get('mandible');
    jawPivot = new Group(); jawPivot.position.set(0, man.box.max.y - 0.012, man.box.min.z + 0.014); scene.add(jawPivot); jawPivot.updateMatrixWorld(true); jawPivot.attach(man.mesh);
    man.mat.opacity = 0.45;
    // 路線
    const mx = bones.get('r-maxilla').box, nose = V(0, mx.max.y - 0.012, mx.max.z - 0.012), mouth = V(0, man.box.max.y - 0.045, man.box.max.z - 0.004);
    const bc = bs.center.clone();
    C.nose = cr([nose, V(0, nose.y + 0.012, (nose.z + bc.z) / 2), bc]);
    C.stom = cr([st.center.clone(), V(0.02, dTop + 0.06, bc.z + 0.02), V(0.012, bc.y - 0.12, bc.z + 0.006), bc]);
    C.motor = cr([bc, V(0.01, bc.y - 0.1, bc.z - 0.004), V(0.03, tr.box.max.y - 0.03, tr.center.z), V(0.05, lungTop - 0.05, d.center.z + 0.01), V(0.045, dTop - 0.01, d.center.z + 0.01)]);
    C.air = cr([nose.clone().add(V(0, -0.02, 0.22)), nose.clone().add(V(0, 0, 0.03)), V(0, nose.y - 0.01, nose.z - 0.05), V(0, gt.y + 0.03, gt.z + 0.008), gt, V(tr.center.x, tr.box.min.y + 0.01, tr.center.z)]);
    const nm = new MeshStandardMaterial({ color: 0x9fd8ff, roughness: 0.5, transparent: true, opacity: 0.35, depthWrite: false });
    for (const k of ['nose', 'stom']) { const t = new Mesh(new TubeGeometry(C[k], 50, 0.0022, 6, false), nm); t.renderOrder = 4; body.add(t); C[`${k}T`] = t; }
    const mm = new MeshStandardMaterial({ color: 0xf2c458, roughness: 0.5, transparent: true, opacity: 0.4, depthWrite: false });
    body.add(new Mesh(new TubeGeometry(C.motor, 50, 0.0022, 6, false), mm));
    sDot = new Mesh(new SphereGeometry(0.011, 14, 10), new MeshBasicMaterial({ color: 0x9fd8ff, depthTest: false, transparent: true }));
    mDot = new Mesh(new SphereGeometry(0.011, 14, 10), new MeshBasicMaterial({ color: 0xffd23a, depthTest: false, transparent: true }));
    for (const m of [sDot, mDot]) { m.renderOrder = 8; m.visible = false; body.add(m); }
    const am = new MeshBasicMaterial({ color: 0xdfefff, transparent: true, opacity: 0.75 });
    for (let i = 0; i < 9; i++) { const m = new Mesh(new SphereGeometry(0.006, 8, 6), am); m.renderOrder = 5; body.add(m); airDots.push(m); }
    const pm = new MeshBasicMaterial({ color: 0xcfeaff, transparent: true, opacity: 0.8 });
    for (let i = 0; i < 40; i++) {
      const m = new Mesh(new SphereGeometry(0.004, 6, 5), pm); m.visible = false; body.add(m);
      const a = (i * 2.399), r = 0.05 + 0.3 * ((i * 37) % 17) / 17;
      spray.push({ m, dir: V(Math.cos(a) * r, Math.sin(a) * r * 0.7 - 0.12, 1).normalize(), sp: 0.5 + ((i * 13) % 10) / 14, from: i % 3 ? mouth : nose });
    }
    P.nose = nose.clone(); P.mouth = mouth.clone(); P.stem = bc.clone(); P.dia = V(d.center.x + 0.09, dTop - dH * 0.3, d.center.z + 0.06); P.dH = dH;
    P.lung = V(-0.1, lungTop - 0.08, d.center.z + 0.05); P.stom = st.center.clone(); P.tr = tr.center.clone();
    P.target = V(0, (bc.y + d.box.min.y) / 2 + 0.03, 0.08);
    P.home = V(0.72, 0.1, 1.2);
    camera.position.copy(homePos()); controls.target.copy(P.target);
    body.visible = true;
    state.ready = true;
    R.loading.hidden = true;
    root.classList.add('al-ready');
    apply();
  }).catch((e) => {
    console.error(e);
    R.loading.innerHTML = 'The model could not be loaded. Please reload the page.<br><span class="zh">模型載入失敗，請重新整理頁面。</span>';
  });
  const fit = () => MathUtils.clamp(1 + (0.85 - camera.aspect) * 1.0, 1, 1.5);
  function homePos() { return P.target.clone().add(P.home.clone().multiplyScalar(fit())); }

  // ---------------- 套用時間軸 ----------------
  let cur = timeline('', 0);
  function apply() {
    const s = cur = state.key ? timeline(state.key, state.t) : timeline('', (state.clock / 4.5) % 1);
    if (state.ready) {
      diaPivot.scale.y = 1 - 0.42 * s.dia;
      diaMat.emissive.setRGB(0.5 * s.dia, 0.08 * s.dia, 0.04 * s.dia);
      stemMat.emissive.setRGB(0.9 * s.stem, 0.6 * s.stem, 0.1 * s.stem);
      for (const l of lungs) {
        const ry = l.ry * (1 + 0.38 * s.dia), k = 0.92 + 0.14 * s.vol;
        l.m.scale.set(0.052 * k, ry, 0.062 * k); l.m.position.set(l.x, l.top - ry, l.z);
      }
      const gap = s.gate ? 0.0015 : 0.0075;
      gateL.position.x = P.gate.x - gap - 0.006; gateR.position.x = P.gate.x + gap + 0.006;
      gateL.material.color.setHex(s.gate ? 0xff5a3a : 0xffe14a);
      jawPivot.rotation.x = Math.max(0, s.jaw) * 0.48;
      const sc = state.key === 'hiccup' ? C.stom : C.nose;
      C.noseT.visible = state.key !== 'hiccup'; C.stomT.visible = state.key === 'hiccup';
      sDot.visible = s.sIn >= 0 && s.sIn <= 1; if (sDot.visible) sc.getPointAt(s.sIn, sDot.position);
      mDot.visible = s.mOut >= 0 && s.mOut <= 1; if (mDot.visible) C.motor.getPointAt(s.mOut, mDot.position);
      // 空氣：位置跟著「肺裡的空氣量」走，所以吸氣往裡、呼氣往外
      airDots.forEach((m, i) => { const u = (((s.vol * 1.6 + i / airDots.length) % 1) + 1) % 1; C.air.getPointAt(u, m.position); m.visible = !s.gate && s.burst < 0; });
      for (const p of spray) {
        p.m.visible = s.burst >= 0;
        if (p.m.visible) { p.m.position.copy(p.from).addScaledVector(p.dir, s.burst * p.sp * 0.9); p.m.position.y -= s.burst * s.burst * 0.12; p.m.scale.setScalar(1.6 - s.burst); }
      }
    }
    R.dia.style.width = `${Math.round(Math.min(1, s.dia) * 100)}%`; R.air.style.width = `${Math.round(MathUtils.clamp(s.vol, 0, 1) * 100)}%`;
    R.gateT.textContent = s.gate ? 'SHUT · 關' : 'open · 開'; R.gate.classList.toggle('rx-shut', s.gate);
    const r = BY[state.key], nk = r ? `${state.key}:${s.stage}` : 'idle';
    if (nk !== state.note) {
      state.note = nk;
      const sg = r && r.stages[s.stage];
      R.step.textContent = sg ? String(s.stage + 1) : '·';
      R.name.innerHTML = sg ? `${esc(sg.en)}<small>${esc(sg.zh)}</small>` : 'Quiet breathing<small>平靜地呼吸</small>';
      const t = sg ? [sg.note_en, sg.note_zh] : DATA.idle ? [DATA.idle.en, DATA.idle.zh] : ['', ''];
      R.status.innerHTML = `${esc(t[0])}<span class="zh">${esc(t[1])}</span>`;
    }
  }

  // ---------------- 操作 ----------------
  const fillSlider = () => R.slider.style.setProperty('--p', `${R.slider.value}%`);
  function setPlaying(on) { state.playing = on; R.play.setAttribute('aria-pressed', on ? 'true' : 'false'); root.classList.toggle('is-playing', on); R.playT.textContent = on ? 'Pause · 暫停' : 'Play · 播放'; }
  function setT(t, pause = true) { state.t = MathUtils.clamp(t, 0, 1); R.slider.value = Math.round(state.t * 100); fillSlider(); if (pause) setPlaying(false); apply(); }
  function setReflex(k, play = true) {
    state.key = BY[k] ? k : '';
    R.btns.forEach((b) => b.setAttribute('aria-pressed', b.dataset.reflex === state.key ? 'true' : 'false'));
    setT(0, false); setPlaying(play && !!state.key);
  }
  R.btns.forEach((b) => b.addEventListener('click', () => setReflex(b.dataset.reflex)));
  R.slider.addEventListener('input', () => { if (!state.key) setReflex('sneeze', false); setT(R.slider.value / 100); });
  R.play.addEventListener('click', () => {
    if (!state.key) { setReflex('sneeze'); return; }
    if (!state.playing && state.t >= 0.995) setT(0, false);
    setPlaying(!state.playing);
  });
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="lungs"]', (v) => { for (const l of lungs) l.m.visible = v; });
  bind('[data-t="skel"]', (v) => { if (bones) for (const b of bones.values()) b.mesh.visible = v; });
  $('.al-home').addEventListener('click', () => { if (state.ready) { camera.position.copy(homePos()); controls.target.copy(P.target); } });
  fillSlider();

  // ---------------- 標籤 ----------------
  const Lb = {
    stem: lab.add('ey-lb ey-lb-o', 'Brainstem · 腦幹'), dia: lab.add('ey-lb rx-lb-d', 'Diaphragm · 橫膈膜'), lung: lab.add('ey-lb', 'Lungs · 肺'),
    gate: lab.add('ey-lb ey-lb-o', 'Gate in the throat · 喉嚨裡的門'), stom: lab.add('ey-lb', 'Stomach · 胃'),
    pop: lab.add('ey-lb rx-lb-pop', ''),
  };
  for (const el of Object.values(Lb)) el.hidden = true;
  let autoLabels = true;
  const tgL = $('[data-t="labels"]');
  if (tgL) tgL.addEventListener('change', () => { autoLabels = false; });
  function updateLabels() {
    const on = state.ready && state.labels;
    for (const el of Object.values(Lb)) el.hidden = !on;
    const pop = state.ready && (cur.burst >= 0 && cur.burst < 0.5 ? ['Achoo! · 哈啾！', P.mouth.clone().add(V(0, 0.03, 0.14))] : state.key === 'hiccup' && cur.gate ? ['Hic! · 嗝！', P.gate.clone().add(V(0.09, 0.03, 0.03))] : null);
    Lb.pop.hidden = !pop;
    if (pop) { if (Lb.pop.textContent !== pop[0]) Lb.pop.textContent = pop[0]; lab.place(Lb.pop, pop[1]); }
    if (!on) return;
    lab.place(Lb.stem, P.stem.clone().add(V(-0.14, 0.03, 0)));
    lab.place(Lb.dia, P.dia.clone().add(V(0.1, -0.02 - 0.4 * cur.dia * P.dH, 0)));
    lab.place(Lb.lung, P.lung.clone().add(V(-0.1, 0.02, 0)));
    lab.place(Lb.gate, P.gate.clone().add(V(-0.15, 0.0, 0.02)));
    Lb.stom.hidden = state.key !== 'hiccup'; if (!Lb.stom.hidden) lab.place(Lb.stom, P.stom.clone().add(V(0.16, -0.1, 0)));
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
    if (state.playing && state.key) {
      state.t = Math.min(1, state.t + dt / DUR[state.key]);
      R.slider.value = Math.round(state.t * 100); fillSlider();
      if (state.t >= 1) setPlaying(false);
    }
    apply();
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

  // 除錯用：$('[data-reflexes-lab]').__lab；背景分頁 rAF 很慢時用 run(秒)／render()
  root.__lab = {
    camera, controls, state, P, setT, setReflex, setPlaying, timeline, tools, cur: () => cur,
    run: (sec) => { for (let x = 0; x < sec; x += 1 / 30) step(1 / 30); },
    render: () => { step(0); controls.update(); updateLabels(); renderer.render(scene, camera); },
  };
  return { ready: () => state.ready, test: () => tools && tools.scrollTo() };
}

lazyBoot('[data-reflexes-lab]', initLab, { test: (lab) => lab.test() });
