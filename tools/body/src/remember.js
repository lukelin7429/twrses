/*
 * 人體探索 · 第二十八課「你是怎麼記住東西的？」的 3D 模型：養一條記憶。
 *
 * 真實的：頭骨（skeleton.glb，淡淡的）、左右海馬迴、小腦、腦幹（organs.glb）。
 * 自繪示意：大腦的外形（一顆有凹凸的半透明橢球）、表面上的四個圓點（一條記憶的四個部分）、
 *   「樞紐 → 圓點」的細藍線（新的記憶，靠海馬迴或小腦維持）、「圓點 ↔ 圓點」的綠線（存到大腦外層的記憶）、線上移動的小點。
 *
 * 模型（示意，不是任何人大腦的測量）：每一種記憶（word 知識／skill 技能）各有
 *   s 強度 0–1、c 已存到大腦外層的比例 0–1、day 第幾天。
 *   learn  學起來：s 至少到 0.35 + 0.15 c（忘了再學比較快）
 *   again  再看一次：s + 0.12、c + 0.02（有一點幫助）
 *   recall 自己回想：s < 0.1 就想不起來；否則 s + 0.30、c + 0.10（比再看一次有效得多＝測驗效應）
 *   night  睡一晚、過一天：c + 0.22 s（睡眠固化），再 s ×（0.42 + 0.55 c）（遺忘；存得越牢忘得越慢）
 *   畫面：細藍線的亮度 = s (1 − 0.85 c)，綠線的亮度與粗細 = s c；右欄把 s 的歷史畫成鋸齒狀的曲線。
 *
 * 單字實驗（initExperiment）是 2D，不需要 WebGL：A 表一直讀、B 表蓋起來回想，隔一陣子兩張都考，只和自己比。不儲存。
 * 產物：cd tools/body && npm run build → assets/js/remember.js
 */
import {
  AmbientLight, CatmullRomCurve3, Color, CylinderGeometry, DirectionalLight, Group, HemisphereLight, MathUtils, Mesh,
  MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, Scene, SphereGeometry, TubeGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot, loadBones, loadOrgans } from './common.js';

const V = (x, y, z) => new Vector3(x, y, z);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const UP = V(0, 1, 0);
const clamp01 = (x) => MathUtils.clamp(x, 0, 1);

export function act(m, a) {                            // 回傳 note 的 key；直接改 m
  const push = (dx) => { m.x += dx; m.hist.push([m.x, m.s]); };
  if (a === 'learn' || (!m.learned && a !== 'night')) {
    m.s = Math.max(m.s, 0.35 + 0.15 * m.c); m.learned = true; push(0.12); return 'learn';
  }
  if (a === 'again') { m.s = clamp01(m.s + 0.12); m.c = clamp01(m.c + 0.02); push(0.12); return 'again'; }
  if (a === 'recall') {
    if (m.s < 0.1) { push(0.12); return 'recall_fail'; }
    m.s = clamp01(m.s + 0.3); m.c = clamp01(m.c + 0.1); push(0.12); return m.c > 0.75 && m.s > 0.7 ? 'strong' : 'recall';
  }
  if (a === 'night') {
    if (!m.learned) { m.day += 1; m.x = m.day - 1; return 'start'; }
    m.c = clamp01(m.c + 0.22 * m.s);
    m.s *= 0.42 + 0.55 * m.c;
    m.day += 1; m.x = m.day - 1; m.hist.push([m.x, m.s]);
    return m.s < 0.12 ? 'night_weak' : m.c > 0.75 && m.s > 0.7 ? 'strong' : 'night';
  }
  return 'start';
}
const fresh = () => ({ s: 0, c: 0, day: 1, x: 0, learned: false, hist: [[0, 0]] });

// ---------------- 單字實驗（2D） ----------------
function initExperiment(root) {
  const box = root.querySelector('.mr-strip');
  if (!box || box.dataset.ready) return null;
  box.dataset.ready = '1';
  const q = (s) => box.querySelector(s);
  const la = q('.mr-list-a'), lb = q('.mr-list-b'), sn = q('.mr-sn'), stx = q('.mr-st'), msg = q('.mr-msg'), bar = q('.mr-timer i'), next = q('.mr-next');
  const sa = q('.mr-sa'), sb = q('.mr-sb'), words = [...box.querySelectorAll('.mr-w')];
  const STEPS = [
    { t: ['Two lists, two ways', '兩張表，兩種方法'], m: ['You will learn List A by reading it again and again, and List B by covering it and recalling. Have a pencil and paper ready.', '你會用「一直讀」來學 A 表，用「蓋起來回想」來學 B 表。請準備好紙和筆。'], b: ['Start', '開始'], a: 0, bb: 0, sec: 0 },
    { t: ['List A: read it again and again', 'A 表：一直讀、反覆讀'], m: ['Keep reading the six words until the bar runs out.', '把這六個字一直讀，讀到橫條跑完。'], b: ['Skip ahead', '直接下一步'], a: 1, bb: 0, sec: 45 },
    { t: ['List B: read it once', 'B 表：只讀一次'], m: ['Read these six words once, carefully.', '把這六個字仔細讀一次。'], b: ['Skip ahead', '直接下一步'], a: 0, bb: 1, sec: 15 },
    { t: ['Hidden! Write them down', '藏起來了！寫下來'], m: ['Write every word from List B that you can pull out of your head.', '把 B 表裡你想得起來的字，全部寫下來。'], b: ['Skip ahead', '直接下一步'], a: 0, bb: 0, sec: 20 },
    { t: ['Check', '對答案'], m: ['Which ones did you miss? Look at those.', '漏了哪幾個？看一看它們。'], b: ['Skip ahead', '直接下一步'], a: 0, bb: 1, sec: 10 },
    { t: ['Hidden again: one more time', '再藏一次：再寫一遍'], m: ['Turn your paper over and write all six again.', '把紙翻過來，六個字再寫一次。'], b: ['Skip ahead', '直接下一步'], a: 0, bb: 0, sec: 20 },
    { t: ['Take a break', '休息一下'], m: ['Do something else for at least five minutes, or come back tomorrow. Then, on a clean sheet, write both lists from memory, and press the button.', '先去做別的事至少五分鐘，或是明天再回來。然後拿一張新的紙，憑記憶把兩張表都寫下來，再按按鈕。'], b: ['I have written them', '我寫好了'], a: 0, bb: 0, sec: 0 },
    { t: ['Count your words', '數一數'], m: ['Tap every word you wrote down correctly.', '把你寫對的字一個一個點起來。'], b: ['', ''], a: 1, bb: 1, sec: 0 },
  ];
  let step = 0, timer = 0, left = 0;
  function score() {
    const n = (l) => words.filter((w) => w.dataset.l === l && w.getAttribute('aria-pressed') === 'true').length;
    if (step < 7) { sa.textContent = '—'; sb.textContent = '—'; return; }
    const a = n('a'), b = n('b');
    sa.textContent = `${a} / 6`; sb.textContent = `${b} / 6`;
    const t = b > a ? ['This time you kept more from List B, the one you recalled. That is the usual pattern.', '這一次，你記得比較多的是 B 表——靠回想學的那一張。這是常見的結果。']
      : a > b ? ['This time List A did better. It happens: one try is only one try. Run it again another day.', '這一次 A 表比較好。這是會發生的：做一次只是一次。改天再做一遍看看。']
        : ['A tie this time. Try again tomorrow without looking first, and see which list lasts longer.', '這次平手。明天先不要看、再考一次，看哪一張表撐得比較久。'];
    msg.innerHTML = `${esc(STEPS[7].m[0])} ${esc(t[0])}<span class="zh">${esc(STEPS[7].m[1])}${esc(t[1])}</span>`;
  }
  function show() {
    clearInterval(timer);
    const S = STEPS[step];
    sn.textContent = String(step + 1); stx.innerHTML = `${esc(S.t[0])}<small>${esc(S.t[1])}</small>`;
    msg.innerHTML = `${esc(S.m[0])}<span class="zh">${esc(S.m[1])}</span>`;
    la.hidden = !S.a; lb.hidden = !S.bb;
    box.classList.toggle('mr-scoring', step === 7);
    next.hidden = step === 7; next.innerHTML = `${esc(S.b[0])}<small>${esc(S.b[1])}</small>`;
    bar.style.width = S.sec ? '100%' : '0%';
    if (S.sec) { left = S.sec; timer = setInterval(() => { left -= 0.25; bar.style.width = `${Math.max(0, (left / S.sec) * 100)}%`; if (left <= 0) go(step + 1); }, 250); }
    score();
  }
  function go(n) { step = MathUtils.clamp(n, 0, 7); if (step === 0) words.forEach((w) => w.setAttribute('aria-pressed', 'false')); show(); }
  next.addEventListener('click', () => go(step + 1));
  q('.mr-reset').addEventListener('click', () => go(0));
  words.forEach((w) => w.addEventListener('click', () => { if (step !== 7) return; w.setAttribute('aria-pressed', w.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'); score(); }));
  show();
  return { scrollTo: () => box.scrollIntoView({ behavior: 'smooth', block: 'center' }), go, step: () => step };
}

function initLab(root) {
  const $ = (sel) => root.querySelector(sel);
  const exp = initExperiment(root);
  const spaceWrap = $('.al-space');
  const cv = $('.al-space-cv');
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas: cv, antialias: true });
  } catch (e) {
    root.classList.add('al-nogl');
    return { ready: () => true, test: () => exp && exp.scrollTo() };
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const scene = new Scene();
  scene.background = new Color(0x0a1224);
  const camera = new PerspectiveCamera(32, 1, 0.01, 30);
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 0.15; controls.maxDistance = 4; controls.autoRotateSpeed = 0.7;
  scene.add(new HemisphereLight(0xdfe8ff, 0x2a1a20, 1.1));
  scene.add(new AmbientLight(0xffffff, 0.3));
  const key = new DirectionalLight(0xfff3e0, 1.7); key.position.set(1.5, 2.5, 3); scene.add(key);
  const rim = new DirectionalLight(0x9fc4ff, 0.8); rim.position.set(-2, 1.5, -2.5); scene.add(rim);

  let DATA = { kinds: [], notes: {} };
  try { DATA = JSON.parse(root.getAttribute('data-memory') || '{}'); } catch (e) { /* 留空 */ }
  const KIND = Object.fromEntries((DATA.kinds || []).map((k) => [k.key, k]));
  const R = {
    loading: $('.sk-loading'), bar: $('.sk-bar i'), dn: $('.mr-dn'), dz: $('.mr-dz'), s: $('.mr-bar-s i'), c: $('.mr-bar-c i'), chart: $('.mr-chart'),
    status: $('.mr-status'), kinds: [...root.querySelectorAll('[data-mkind]')], acts: [...root.querySelectorAll('.mr-act')],
  };
  const lab = labeler($('.al-labels'), cv, camera);
  const state = { ready: false, labels: true, kind: 'word', clock: 0, hold: false, note: 'start', spin: true };
  const mem = { word: fresh(), skill: fresh() };
  const G = {};                                       // 每種記憶的 3D 零件
  const P = {};
  let bones = null, hipMat = [], cerMat = null;
  const pulses = [];
  const body = new Group(); body.visible = false; scene.add(body);

  Promise.all([
    loadBones(root.getAttribute('data-model'), (p) => { R.bar.style.width = `${Math.round(p * 80)}%`; }),
    loadOrgans(root.getAttribute('data-organs')),
  ]).then(([sk, og]) => {
    bones = sk.bones; const parts = og.parts;
    scene.add(sk.model); scene.add(og.model);
    const USE = ['l-hippocampus', 'r-hippocampus', 'cerebellum', 'brainstem'];
    for (const [n, part] of parts) if (!USE.includes(n)) part.mesh.visible = false;          // 別課用的器官
    for (const b of bones.values()) { const sk2 = b.info.region === 'skull'; b.mat.opacity = sk2 ? 0.13 : 0.06; b.mat.depthWrite = false; b.mesh.renderOrder = 1; b.mesh.visible = sk2 || b.info.region === 'spine'; }
    const K = (n) => parts.get(n);
    for (const n of ['l-hippocampus', 'r-hippocampus']) { const h = K(n); h.mat.color.setHex(0xf2c14a); h.mat.roughness = 0.4; h.mesh.renderOrder = 5; hipMat.push(h.mat); }
    const cer = K('cerebellum'); cerMat = cer.mat; cer.mat.color.setHex(0xa98be0); cer.mat.roughness = 0.6; cer.mat.transparent = true; cer.mat.opacity = 0.9;
    const bs = K('brainstem'); bs.mat.color.setHex(0xd9c8a8); bs.mat.transparent = true; bs.mat.opacity = 0.85;
    const hl = K('l-hippocampus').center.clone(), hr = K('r-hippocampus').center.clone();
    // 自繪：大腦的外形
    const BC = V(0, hl.y + 0.05, hl.z - 0.008), RAD = V(0.066, 0.058, 0.086);
    const bg = new SphereGeometry(1, 56, 40), bp = bg.attributes.position;
    for (let i = 0; i < bp.count; i++) {
      const x = bp.getX(i), y = bp.getY(i), z = bp.getZ(i);
      const k = 1 + 0.035 * Math.sin(x * 13 + z * 5) * Math.sin(y * 11 + x * 3) + 0.02 * Math.sin(z * 17 + y * 7) - 0.07 * Math.exp(-(x * x) / 0.006) * (y > -0.2 ? 1 : 0);
      bp.setXYZ(i, x * k, (y < -0.55 ? -0.55 - (y + 0.55) * 0.35 : y) * k, z * k);
    }
    bg.computeVertexNormals();
    const brain = new Mesh(bg, new MeshStandardMaterial({ color: 0xf2b6c0, roughness: 0.7, transparent: true, opacity: 0.2, depthWrite: false }));
    brain.position.copy(BC); brain.scale.copy(RAD); brain.renderOrder = 3; body.add(brain);
    const onShell = (dx, dy, dz) => { const d = V(dx, dy, dz).normalize(); return V(BC.x + d.x * RAD.x * 0.98, BC.y + Math.max(-0.5, d.y) * RAD.y * 0.98, BC.z + d.z * RAD.z * 0.98); };
    const between = (a, b, r, mat, par) => { const d = b.clone().sub(a), m = new Mesh(new CylinderGeometry(r, r, d.length(), 8), mat); m.position.copy(a).add(b).multiplyScalar(0.5); m.quaternion.setFromUnitVectors(UP, d.normalize()); par.add(m); return m; };
    const mkKind = (key, hub, dirs) => {
      const g = new Group(); body.add(g);
      const nm = new MeshStandardMaterial({ color: 0x9fd8ff, roughness: 0.4, emissive: 0x000000 });
      const newMat = new MeshBasicMaterial({ color: 0x6fc3ff, transparent: true, opacity: 0, depthTest: false });
      const oldMat = new MeshBasicMaterial({ color: 0x7ddc9a, transparent: true, opacity: 0, depthTest: false });
      const nodes = dirs.map((d) => { const p = onShell(...d), m = new Mesh(new SphereGeometry(0.0052, 16, 12), nm); m.position.copy(p); m.renderOrder = 7; g.add(m); return p; });
      const spokes = nodes.map((p) => { const m = between(hub, p, 0.0011, newMat, g); m.renderOrder = 6; return m; });
      const arcs = [];
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
        const mid = nodes[i].clone().add(nodes[j]).multiplyScalar(0.5).sub(BC); mid.divide(RAD).normalize().multiply(RAD).multiplyScalar(1.04).add(BC);
        const curve = new CatmullRomCurve3([nodes[i], mid, nodes[j]]);
        const m = new Mesh(new TubeGeometry(curve, 24, 0.001, 6, false), oldMat); m.renderOrder = 6; g.add(m); arcs.push({ m, curve });
      }
      G[key] = { g, hub, nodes, nm, newMat, oldMat, spokes, arcs };
    };
    mkKind('word', hl, [[0.3, 0.1, -0.95], [0.97, -0.2, 0.05], [0.78, 0.1, 0.6], [0.62, 0.6, -0.42]]);
    mkKind('skill', K('cerebellum').center.clone().add(V(0.02, 0.005, 0)), [[-0.3, 0.1, -0.95], [0.5, -0.45, -0.72], [0.22, 0.97, 0.06], [0.72, 0.68, 0.14]]);
    for (let i = 0; i < 14; i++) { const m = new Mesh(new SphereGeometry(0.0034, 10, 8), new MeshBasicMaterial({ color: 0xffffff, depthTest: false, transparent: true })); m.visible = false; m.renderOrder = 9; body.add(m); pulses.push({ m, t: 1, d: 1 }); }

    P.hip = hl.clone(); P.cer = K('cerebellum').center.clone(); P.stem = bs.center.clone(); P.BC = BC.clone();
    P.target = V(0, BC.y - 0.012, BC.z - 0.01);
    P.home = V(0.5, 0.1, 0.34);
    camera.position.copy(homePos()); controls.target.copy(P.target);
    body.visible = true;
    state.ready = true;
    R.loading.hidden = true;
    root.classList.add('al-ready');
    setKind('word'); apply();
  }).catch((e) => {
    console.error(e);
    R.loading.innerHTML = 'The model could not be loaded. Please reload the page.<br><span class="zh">模型載入失敗，請重新整理頁面。</span>';
  });
  const fit = () => MathUtils.clamp(1 + (0.95 - camera.aspect) * 0.9, 1, 1.5);
  function homePos() { return P.target.clone().add(P.home.clone().multiplyScalar(fit())); }

  // ---------------- 小點 ----------------
  function pulse(a, b, delay = 0, d = 1.1, curve = null) { const p = pulses.find((x) => x.t >= 1); if (!p) return; p.a = a; p.b = b; p.curve = curve; p.t = -delay / d; p.d = d; }
  function fire(a, note) {
    const k = G[state.kind]; if (!k) return;
    for (const p of pulses) p.t = 1;
    if (note === 'learn') k.nodes.forEach((n, i) => pulse(n, k.hub, i * 0.12));
    else if (note === 'again') pulse(k.nodes[0], k.hub, 0, 1.3);
    else if (note === 'recall' || note === 'strong') { k.nodes.forEach((n, i) => pulse(k.hub, n, i * 0.08, 0.8)); k.arcs.forEach((arc, i) => pulse(null, null, 0.7 + i * 0.06, 0.9, arc.curve)); }
    else if (note === 'recall_fail') pulse(k.hub, k.nodes[0], 0, 0.5);
    else if (note.startsWith('night')) { k.nodes.forEach((n, i) => { pulse(k.hub, n, i * 0.1, 0.7); pulse(n, k.hub, 0.9 + i * 0.1, 0.7); }); k.arcs.slice(0, 4).forEach((arc, i) => pulse(null, null, 1.7 + i * 0.08, 0.8, arc.curve)); }
  }

  // ---------------- 套用 ----------------
  function apply() {
    const m = mem[state.kind];
    if (state.ready) {
      for (const [key, k] of Object.entries(G)) {
        k.g.visible = key === state.kind;
        if (!k.g.visible) continue;
        k.newMat.opacity = clamp01(m.s * (1 - 0.85 * m.c) * 1.15);
        k.oldMat.opacity = clamp01(m.s * (0.1 + 0.9 * m.c));
        const w = 1 + 2 * m.c * m.s;
        k.arcs.forEach((arc) => { arc.m.scale.setScalar(1); arc.m.material = k.oldMat; });
        if (k.w !== w) { k.w = w; k.arcs.forEach((arc) => { arc.m.geometry.dispose(); arc.m.geometry = new TubeGeometry(arc.curve, 24, 0.001 * w, 6, false); }); }
        k.nm.emissive.setRGB(0.25 * m.s, 0.5 * m.s, 0.7 * m.s);
      }
      const hubGlow = m.s * (1 - 0.8 * m.c) * (0.75 + 0.25 * Math.sin(state.clock * 3));
      for (const mt of hipMat) mt.emissive.setRGB(state.kind === 'word' ? 0.8 * hubGlow : 0, state.kind === 'word' ? 0.5 * hubGlow : 0, 0);
      cerMat.emissive.setRGB(state.kind === 'skill' ? 0.5 * hubGlow : 0, state.kind === 'skill' ? 0.3 * hubGlow : 0, state.kind === 'skill' ? 0.8 * hubGlow : 0);
    }
    R.dn.textContent = `Day ${m.day}`; R.dz.textContent = `第 ${m.day} 天`;
    R.s.style.width = `${Math.round(m.s * 100)}%`; R.c.style.width = `${Math.round(m.c * 100)}%`;
    const nk = state.note === 'learn' ? `learn_${state.kind}` : state.note, N = DATA.notes[nk] || DATA.notes.start;
    if (N && R.status.dataset.k !== `${nk}:${m.hist.length}`) {
      R.status.dataset.k = `${nk}:${m.hist.length}`;
      R.status.innerHTML = `${esc(N.en)}<span class="zh">${esc(N.zh)}</span>`;
      R.status.className = `ey-status mr-status ${['recall_fail', 'night_weak'].includes(nk) ? 'ey-bad' : 'ey-ok'}`;
    }
    drawChart();
  }
  function drawChart() {
    const c = R.chart; if (!c) return;
    const m = mem[state.kind], r = c.getBoundingClientRect(), d = Math.min(window.devicePixelRatio || 1, 2), w = Math.round(r.width * d), h = Math.round(r.height * d);
    if (!w || !h) return;
    if (c.width !== w || c.height !== h) { c.width = w; c.height = h; }
    const g = c.getContext('2d'); g.clearRect(0, 0, w, h);
    const pl = 8 * d, pr = 8 * d, pt = 8 * d, pb = 16 * d, xmax = Math.max(4, Math.ceil(m.x + 0.6));
    const X = (x) => pl + (x / xmax) * (w - pl - pr), Y = (v) => pt + (1 - v) * (h - pt - pb);
    g.font = `${10 * d}px sans-serif`; g.fillStyle = 'rgba(255,255,255,.45)'; g.textAlign = 'center'; g.strokeStyle = 'rgba(255,255,255,.08)'; g.lineWidth = 1;
    const stepX = xmax > 10 ? 2 : 1;
    for (let x = 0; x <= xmax; x += stepX) { g.beginPath(); g.moveTo(X(x), pt); g.lineTo(X(x), h - pb); g.stroke(); if (x < xmax) g.fillText(`${x + 1}`, X(x + 0.5 * (stepX === 1 ? 1 : 0)), h - 3 * d); }
    g.strokeStyle = '#ffd36e'; g.lineWidth = 2.4 * d; g.lineJoin = 'round'; g.beginPath();
    m.hist.forEach(([x, v], i) => { if (i === 0) g.moveTo(X(x), Y(v)); else g.lineTo(X(x), Y(v)); });
    g.stroke();
    const [lx, lv] = m.hist[m.hist.length - 1];
    g.fillStyle = '#fff'; g.beginPath(); g.arc(X(lx), Y(lv), 4 * d, 0, Math.PI * 2); g.fill();
  }

  // ---------------- 操作 ----------------
  function setKind(k) {
    if (!KIND[k]) return;
    state.kind = k; state.note = mem[k].note || 'start';
    R.kinds.forEach((b) => b.setAttribute('aria-pressed', b.dataset.mkind === k ? 'true' : 'false'));
    for (const b of R.acts) { const t = KIND[k][b.dataset.act]; if (t) { b.querySelector('b').textContent = t.en; b.querySelector('small').textContent = t.zh; } }
    Lb.nodes.forEach((el, i) => { const n = KIND[k].nodes[i]; el.textContent = `${n.en} · ${n.zh}`; });
    R.status.dataset.k = '';
    apply();
  }
  function doAct(a) { const m = mem[state.kind]; state.note = m.note = act(m, a); fire(a, state.note); apply(); }
  R.kinds.forEach((b) => b.addEventListener('click', () => setKind(b.dataset.mkind)));
  R.acts.forEach((b) => b.addEventListener('click', () => doAct(b.dataset.act)));
  $('.mr-clear').addEventListener('click', () => { mem[state.kind] = fresh(); state.note = 'start'; R.status.dataset.k = ''; apply(); });
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="skull"]', (v) => { if (bones) for (const b of bones.values()) b.mesh.visible = v && (b.info.region === 'skull' || b.info.region === 'spine'); });
  bind('[data-t="spin"]', (v) => { state.spin = v; });
  $('.al-home').addEventListener('click', () => { if (state.ready) { camera.position.copy(homePos()); controls.target.copy(P.target); } });
  cv.addEventListener('pointerdown', () => { state.spin = false; const el = $('[data-t="spin"]'); if (el) el.checked = false; });

  // ---------------- 標籤 ----------------
  const Lb = {
    hip: lab.add('ey-lb ey-lb-o', 'Hippocampus · 海馬迴'), cer: lab.add('ey-lb mr-lb-c', 'Cerebellum · 小腦'), stem: lab.add('ey-lb', 'Brainstem · 腦幹'),
    nodes: [0, 1, 2, 3].map(() => lab.add('ey-lb tm-lb-w', '')),
  };
  for (const el of [Lb.hip, Lb.cer, Lb.stem, ...Lb.nodes]) el.hidden = true;
  let autoLabels = true;
  const tgL = $('[data-t="labels"]');
  if (tgL) tgL.addEventListener('change', () => { autoLabels = false; });
  function updateLabels() {
    const on = state.ready && state.labels;
    for (const el of [Lb.hip, Lb.cer, Lb.stem, ...Lb.nodes]) el.hidden = !on;
    if (!on) return;
    lab.place(Lb.hip, P.hip, -16); lab.place(Lb.cer, P.cer.clone().add(V(0, -0.012, -0.02)), 18); lab.place(Lb.stem, P.stem.clone().add(V(0, -0.035, 0.01)), 14);
    const k = G[state.kind], show = mem[state.kind].learned;
    Lb.nodes.forEach((el, i) => { el.hidden = !show; if (show) lab.place(el, k.nodes[i], -14); });
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
    for (const p of pulses) {
      if (p.t >= 1) { p.m.visible = false; continue; }
      p.t += dt / p.d;
      const u = clamp01(p.t);
      p.m.visible = p.t > 0 && p.t < 1;
      if (p.m.visible) { if (p.curve) p.curve.getPointAt(u, p.m.position); else p.m.position.lerpVectors(p.a, p.b, u); }
    }
    controls.autoRotate = state.spin && !state.hold;
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

  // 除錯用：$('[data-remember-lab]').__lab；背景分頁 rAF 很慢時用 run(秒)／render()
  root.__lab = {
    camera, controls, state, mem, P, G, setKind, doAct, act, exp,
    run: (sec) => { for (let x = 0; x < sec; x += 1 / 30) step(1 / 30); },
    render: () => { step(0); controls.update(); updateLabels(); renderer.render(scene, camera); },
  };
  return { ready: () => state.ready, test: () => exp && exp.scrollTo() };
}

lazyBoot('[data-remember-lab]', initLab, { test: (lab) => lab.test() });
