/*
 * 人體探索 · 第十二課「身體怎麼對抗病菌？」的 3D 傷口。
 *
 * 真實的：骨架（skeleton.glb，BodyParts3D），右手比較清楚，標出食指指尖的傷口。
 * 自繪示意：指尖一道紙割傷，放大約 2,000 倍（微米座標 1 單位＝1 µm，germG 縮放 S）：
 *   表皮（中間割開一道縫）、真皮、一條微血管與紅血球、白血球（嗜中性球，分葉的核）、細菌（綠色小棒，畫得比真實大）、
 *   抗體（金色 Y）、警報訊號。
 *
 * 時間軸（非線性，滑桿 u 0–1）：0–0.3＝0–3 小時、0.3–0.55＝3–24 小時、0.55–1＝1–10 天。
 * 全部由時間 h（小時）和「第一次／第二次」決定，沒有累積狀態，所以來回拖曳都一樣：
 *   細菌數 bact(h)：前 3 小時每 20 分鐘多一倍（6 隻起、畫面上最多 70 隻）；
 *     第一次：先天免疫壓住（3–24 h）→ 拉鋸（1–5 天，可能發燒）→ 5–9 天抗體到、清光；
 *     第二次：記憶細胞一兩天內做出抗體，約兩天清光。
 *   白血球 2 小時後一隻隻從微血管鑽出來；抗體 Y 第一次 5 天後、第二次 6 小時後出現，黏在細菌上。
 *   右欄的圖畫兩場仗的細菌數（典型的初次 vs 二次免疫反應，示意）。
 * 病菌計算機與洗手計時器（initStrip）是 2D，不需要 WebGL。
 *
 * 產物：cd tools/body && npm run build → assets/js/germs.js
 */
import {
  AdditiveBlending, AmbientLight, BoxGeometry, BufferGeometry, CanvasTexture, CapsuleGeometry, Color, CylinderGeometry,
  DirectionalLight, DoubleSide, EdgesGeometry, Float32BufferAttribute, Group, HemisphereLight, LineBasicMaterial,
  LineSegments, MathUtils, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, Scene, SphereGeometry,
  Sprite, SpriteMaterial, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot, loadBones } from './common.js';

const V = (x, y, z) => new Vector3(x, y, z);
const S = 0.002;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const ss = MathUtils.smoothstep;
const MAXB = 70;

// ---------------- 時間軸與數量（兩個 2D 小工具也用） ----------------
const hOf = (u) => (u <= 0.3 ? 3 * (u / 0.3) : u <= 0.55 ? 3 + 21 * ((u - 0.3) / 0.25) : 24 + 216 * ((u - 0.55) / 0.45));
const uOf = (h) => (h <= 3 ? (h / 3) * 0.3 : h <= 24 ? 0.3 + ((h - 3) / 21) * 0.25 : 0.55 + ((h - 24) / 216) * 0.45);
function bact(h, second) {
  const grow = Math.min(MAXB, 6 * Math.pow(2, 3 * h));
  if (h < 3) return grow;
  if (second) return h < 24 ? MathUtils.lerp(MAXB, 15, (h - 3) / 21) : h < 48 ? MathUtils.lerp(15, 0, (h - 24) / 24) : 0;
  if (h < 24) return MathUtils.lerp(MAXB, 45, (h - 3) / 21);
  if (h < 120) return MathUtils.lerp(45, 52, (h - 24) / 96);
  return 52 * (1 - ss(h, 120, 216));
}
const wbc = (h, second) => {
  const done = second ? 48 : 216;
  return Math.round(7 * ss(h, 2, 8) * (1 - 0.85 * ss(h, done, done + 24)));
};
const abs = (h, second) => Math.round(second ? 50 * ss(h, 6, 24) * (1 - 0.6 * ss(h, 72, 240)) : 50 * ss(h, 120, 168) * (1 - 0.6 * ss(h, 216, 240)));
const red = (h, second) => (second ? 0.6 * ss(h, 0.5, 3) * (1 - ss(h, 24, 48)) : ss(h, 0.5, 3) * (1 - ss(h, 150, 216)));
function fmtTime(h) {
  if (h < 1) { const m = Math.round(h * 60); return [`${m} min`, `${m} 分鐘`]; }
  if (h < 24) { const x = Math.round(h * 2) / 2; return [`${x} hour${x === 1 ? '' : 's'}`, `${x} 小時`]; }
  const d = Math.round((h / 24) * 2) / 2; return [`${d} day${d === 1 ? '' : 's'}`, `${d} 天`];
}

// ---------------- 病菌計算機與洗手計時器（2D） ----------------
const zhNum = (n) => (n >= 1e8 ? `${(n / 1e8).toFixed(n >= 1e9 ? 0 : 1)} 億` : n >= 1e4 ? `${Math.round(n / 1e4).toLocaleString('en-US')} 萬` : n.toLocaleString('en-US'));
const COMPARE = [
  [30, 'a class of students', '一班學生'], [1000, 'all the students in a big school', '一所大學校的全部學生'],
  [1.2e6, 'everyone in Changhua County (about 1.2 million)', '彰化縣全部的人（約 120 萬）'],
  [2.34e7, 'everyone in Taiwan (about 23 million)', '台灣全部的人（約 2,300 萬）'],
];
function initStrip(root) {
  const box = root.querySelector('.gm-strip');
  if (!box || box.dataset.ready) return null;
  box.dataset.ready = '1';
  const q = (s) => box.querySelector(s);
  const hin = q('.gm-h-in'), cnt = q('.gm-count'), hh = q('.gm-h'), hz = q('.gm-h-zh'), cmp = q('.gm-compare');
  function calc() {
    const n = +hin.value, c = Math.pow(2, n), h = n / 3;
    hin.style.setProperty('--p', `${(n / 30) * 100}%`);
    const hs = Number.isInteger(h) ? `${h}` : h.toFixed(1).replace('.3', '⅓').replace('.7', '⅔');
    hh.textContent = `${hs} hour${h === 1 ? '' : 's'}`; hz.textContent = `${hs} 小時`;
    cnt.innerHTML = `${c.toLocaleString('en-US')}<small>${zhNum(c)} 隻</small>`;
    const beat = COMPARE.filter(([v]) => c > v).pop();
    cmp.innerHTML = beat
      ? `That is more than ${beat[1]}! In real life, germs run out of food and space, and your body fights back, so they cannot keep doubling forever.<span class="zh">比${beat[2]}還多！現實中病菌會用完食物和空間，身體也會反擊，所以不會一直加倍下去。</span>`
      : 'Slide to the right and watch the number explode.<span class="zh">往右拉，看數字怎麼爆炸。</span>';
  }
  hin.addEventListener('input', calc); calc();
  // 洗手：濕、搓（20 秒）、沖、捧、擦
  const steps = [...box.querySelectorAll('.gm-wash-steps li')], go = q('.gm-wash-go'), next = q('.gm-wash-next');
  const sec = q('.gm-sec'), ring = q('.gm-ring-p'), msg = q('.gm-wash-msg');
  const C = 2 * Math.PI * 19;
  ring.style.strokeDasharray = `${C}`; ring.style.strokeDashoffset = '0';
  let i = -1, timer = 0;
  function show() {
    steps.forEach((li, k) => { li.classList.toggle('on', k === i); li.classList.toggle('done', k < i); });
    next.hidden = i < 0 || i === 1 || i >= steps.length;
    go.hidden = i >= 0 && i < steps.length;
  }
  function scrub() {
    let left = 20;
    sec.textContent = left; ring.style.strokeDashoffset = '0';
    clearInterval(timer);
    timer = setInterval(() => {
      left--; sec.textContent = Math.max(0, left);
      ring.style.strokeDashoffset = `${C * (1 - left / 20)}`;
      if (left <= 0) { clearInterval(timer); i = 2; show(); }
    }, 1000);
  }
  go.addEventListener('click', () => {
    i = 0; sec.textContent = '20'; ring.style.strokeDashoffset = '0'; show();
    msg.innerHTML = 'Wet your hands, wrists too.<span class="zh">把手和手腕都淋濕。</span>';
  });
  next.addEventListener('click', () => {
    i++;
    if (i === 1) { scrub(); msg.innerHTML = 'Soap on, and scrub: palms, backs, between fingers, fingertips, thumbs, wrists.<span class="zh">抹上肥皂開始搓：內、外、夾、弓、大、立、完。</span>'; }
    if (i === 3) msg.innerHTML = 'Scoop water to rinse the tap, or turn it off with a paper towel.<span class="zh">捧水把水龍頭沖乾淨，或用擦手紙關水龍頭。</span>';
    if (i === 4) msg.innerHTML = 'Dry with a paper towel. Done!<span class="zh">用擦手紙擦乾，完成！</span>';
    if (i >= steps.length) { i = steps.length; msg.innerHTML = 'Great job! Do this before every meal and after the toilet.<span class="zh">做得好！每次吃飯前、上完廁所後都要這樣洗。</span>'; go.innerHTML = '&#8634; Wash again<small>再洗一次</small>'; }
    show();
  });
  show();
  return { scrollTo: () => box.scrollIntoView({ behavior: 'smooth', block: 'center' }) };
}

// ---------------- 右欄：兩場仗的細菌數 ----------------
function drawChart(cv, u, second) {
  const g = cv.getContext('2d'), W = cv.width, H = cv.height, L = 30, R = 8, T = 10, B = 26, pw = W - L - R, ph = H - T - B;
  g.clearRect(0, 0, W, H);
  g.fillStyle = '#0a1224'; g.fillRect(0, 0, W, H);
  g.strokeStyle = 'rgba(255,255,255,.12)'; g.lineWidth = 1;
  g.fillStyle = '#9fb0cf'; g.font = '10px sans-serif'; g.textAlign = 'center';
  for (const [h, lab] of [[0, '0'], [3, '3 h'], [24, '1 day'], [120, '5 days'], [240, '10 days']]) {
    const x = L + uOf(h) * pw; g.beginPath(); g.moveTo(x, T); g.lineTo(x, T + ph); g.stroke(); g.fillText(lab, Math.min(W - 20, Math.max(L + 6, x)), H - 9);
  }
  const yOf = (b) => T + ph - (b / MAXB) * ph;
  for (const [sec, col] of [[false, '#ffb066'], [true, '#7ddc9a']]) {
    g.beginPath();
    for (let i = 0; i <= 200; i++) { const uu = i / 200, x = L + uu * pw, y = yOf(bact(hOf(uu), sec)); if (i) g.lineTo(x, y); else g.moveTo(x, y); }
    g.strokeStyle = col; g.lineWidth = sec === second ? 3 : 1.5; g.globalAlpha = sec === second ? 1 : 0.55; g.stroke(); g.globalAlpha = 1;
  }
  g.textAlign = 'left'; g.font = '700 10px sans-serif';
  g.fillStyle = '#ffb066'; g.fillText('1st · 第一次', L + 4, T + 10);
  g.fillStyle = '#7ddc9a'; g.fillText('2nd · 第二次', L + 4, T + 22);
  const x = L + u * pw;
  g.strokeStyle = '#fff'; g.lineWidth = 1.5; g.setLineDash([3, 3]); g.beginPath(); g.moveTo(x, T); g.lineTo(x, T + ph); g.stroke(); g.setLineDash([]);
  g.fillStyle = '#fff'; g.beginPath(); g.arc(x, yOf(bact(hOf(u), second)), 4, 0, 7); g.fill();
}

function glowTex(inner, outer) {
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const g = c.getContext('2d');
  const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.3, inner); gr.addColorStop(1, outer);
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  return new CanvasTexture(c);
}
// 固定亂數（每次載入都一樣）
function rng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

function initLab(root) {
  const $ = (sel) => root.querySelector(sel);
  const strip = initStrip(root);
  const spaceWrap = $('.al-space');
  const cv = $('.al-space-cv');
  const R = {
    loading: $('.sk-loading'), bar: $('.sk-bar i'), t: $('.gm-t'), tz: $('.gm-t-zh'), nb: $('.gm-nb'), nw: $('.gm-nw'), na: $('.gm-na'),
    status: $('.gm-status'), chart: $('.gm-chart'), modes: [...root.querySelectorAll('[data-mode]')], tin: $('.gm-time-in'),
    play: $('.al-play'), playT: $('.al-play-t'),
  };
  const state = { ready: false, labels: true, bonesOn: true, second: false, u: 0, playing: false, clock: 0 };
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas: cv, antialias: true });
  } catch (e) {
    root.classList.add('al-nogl');
    return { ready: () => true, test: () => strip && strip.scrollTo() };
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const scene = new Scene();
  scene.background = new Color(0x0a1224);
  const camera = new PerspectiveCamera(32, 1, 0.005, 20);
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 0.05; controls.maxDistance = 3;
  scene.add(new HemisphereLight(0xdfe8ff, 0x2a1a20, 1.1));
  scene.add(new AmbientLight(0xffffff, 0.3));
  const key = new DirectionalLight(0xfff3e0, 1.8); key.position.set(-1.5, 2.5, 3); scene.add(key);
  const rim = new DirectionalLight(0x9fc4ff, 0.7); rim.position.set(2, 1, -2.5); scene.add(rim);
  const lab = labeler($('.al-labels'), cv, camera);
  const gG = new Group(); gG.scale.setScalar(S); gG.visible = false; scene.add(gG);   // 載入完、放好位置才顯示
  const W = (p) => gG.localToWorld(p.clone());
  const P = {};

  // ---------- 組織：表皮（中間一道割開的縫）、真皮、微血管 ----------
  const lay = (c, op) => new MeshStandardMaterial({ color: c, roughness: 0.7, transparent: true, opacity: op, side: DoubleSide, depthWrite: false });
  const M = {
    epi: lay(0xe8c39e, 0.5), derm: lay(0xf2a7a0, 0.14), vessel: lay(0xd94040, 0.22),
    rbc: new MeshStandardMaterial({ color: 0xd23a3a, roughness: 0.45 }),
    wbc: new MeshStandardMaterial({ color: 0xeae6ff, roughness: 0.4, transparent: true, opacity: 0.78 }),
    nuc: new MeshStandardMaterial({ color: 0x7b4fc0, roughness: 0.5 }),
    germ: new MeshStandardMaterial({ color: 0x6fd36f, roughness: 0.45, emissive: 0x0b2a0b }),
    ab: new MeshStandardMaterial({ color: 0xffc857, roughness: 0.35, emissive: 0x4a3200 }),
  };
  const DERM_BASE = new Color(0xf2a7a0), DERM_RED = new Color(0xff5a4a);
  const box = (x0, x1, y0, y1, mat) => {
    const m = new Mesh(new BoxGeometry(x1 - x0, y0 - y1, 20), mat);
    m.position.set((x0 + x1) / 2, (y0 + y1) / 2, 0); m.renderOrder = 1; gG.add(m);
    const e = new LineSegments(new EdgesGeometry(m.geometry), new LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.2 }));
    e.position.copy(m.position); gG.add(e);
    return m;
  };
  box(-25, -6.5, 0, -9, M.epi); box(-1, 25, 0, -9, M.epi); box(-25, 25, -9, -40, M.derm);
  P.cut = V(-3.75, 0, 0);
  const vessel = new Mesh(new CylinderGeometry(5, 5, 50, 28, 1, true).rotateZ(Math.PI / 2), M.vessel);
  vessel.position.set(0, -30, 0); vessel.renderOrder = 2; gG.add(vessel);
  const rbcs = [];
  for (let i = 0; i < 9; i++) {
    const r = new Mesh(new CylinderGeometry(3.3, 3.3, 1.1, 22).rotateZ(Math.PI / 2), M.rbc);
    r.rotation.y = (i % 3) * 0.4; gG.add(r); rbcs.push(r);
  }
  // ---------- 白血球：2 隻在血管裡滾，7 隻會鑽出來 ----------
  const wbcs = [];
  const rw = rng(7);
  for (let i = 0; i < 9; i++) {
    const g = new Group();
    g.add(new Mesh(new SphereGeometry(5.2, 24, 18), M.wbc));
    for (const [a, b, c] of [[-1.4, 0.6, 0], [0.6, 1.1, 0.4], [1.2, -0.9, -0.3]]) { const n = new Mesh(new SphereGeometry(1.6, 14, 10), M.nuc); n.position.set(a, b, c); g.add(n); }
    gG.add(g);
    const exit = V(-14 + i * 4.5, -26, (rw() - 0.5) * 6);
    const target = V(-3.75 + (i - 5.5) * 5.5 + (rw() - 0.5) * 3, -13 - rw() * 12, (rw() - 0.5) * 12);
    wbcs.push({ g, exit, target, arrive: 2 + i * 0.9, phase: rw() * 6 });
  }
  // ---------- 細菌（固定亂數的位置，數量隨時間） ----------
  const germs = [];
  const rb = rng(42);
  const capGeo = new CapsuleGeometry(0.8, 2.2, 4, 10);
  for (let i = 0; i < MAXB; i++) {
    const m = new Mesh(capGeo, M.germ);
    m.rotation.set(rb() * 6, rb() * 6, rb() * 6);
    const dir = V(rb() - 0.5, -rb() * 0.9 - 0.1, rb() - 0.5).normalize();
    germs.push({ m, dir, r: 0.3 + rb() * 0.7, ph: rb() * 6 });
    m.visible = false; gG.add(m);
  }
  // ---------- 抗體（金色 Y） ----------
  const abGeo = new CylinderGeometry(0.22, 0.22, 1.6, 6);
  const abl = [];
  const ra = rng(99);
  for (let i = 0; i < 50; i++) {
    const y = new Group();
    const stem = new Mesh(abGeo, M.ab); stem.position.y = -0.8; y.add(stem);
    for (const s of [-1, 1]) { const arm = new Mesh(abGeo, M.ab); arm.position.set(s * 0.5, 0.6, 0); arm.rotation.z = -s * 0.6; y.add(arm); }
    y.rotation.set(ra() * 6, ra() * 6, ra() * 6); y.visible = false; gG.add(y);
    abl.push({ y, off: V(ra() - 0.5, ra() - 0.5, ra() - 0.5).normalize().multiplyScalar(1.8), free: V(-20 + ra() * 40, -12 - ra() * 22, (ra() - 0.5) * 16) });
  }
  // 警報訊號
  const alarmTex = glowTex('rgba(255,170,120,.8)', 'rgba(255,120,80,0)');
  const alarms = [];
  for (let i = 0; i < 6; i++) { const s = new Sprite(new SpriteMaterial({ map: alarmTex, blending: AdditiveBlending, depthWrite: false, transparent: true, opacity: 0 })); s.scale.set(6, 6, 1); gG.add(s); alarms.push(s); }

  // ---------- 骨架：右手食指指尖 ----------
  let bones = null;
  const zoomLines = new LineSegments(new BufferGeometry(), new LineBasicMaterial({ color: 0xffd36e, transparent: true, opacity: 0.6 }));
  scene.add(zoomLines);
  const mark = new Mesh(new SphereGeometry(0.0025, 12, 8), new MeshBasicMaterial({ color: 0xffd36e }));
  scene.add(mark);
  loadBones(root.getAttribute('data-model'), (p) => { R.bar.style.width = `${Math.round(p * 100)}%`; }).then(({ model, bones: bs }) => {
    bones = bs;
    scene.add(model);
    for (const b of bones.values()) {
      const hand = (b.info.region === 'hand' || ['r-radius', 'r-ulna'].includes(b.info.id)) && b.info.id.startsWith('r-');
      b.mat.opacity = hand ? 0.35 : 0.06; b.mat.depthWrite = false; b.mesh.renderOrder = 1;
    }
    const tip = bones.get('r-f2-d').box;
    const spot = V(tip.getCenter(V(0, 0, 0)).x, tip.min.y + 0.004, tip.max.z + 0.006);   // 指尖的指腹
    mark.position.copy(spot);
    gG.position.copy(spot).add(V(-0.06, 0.1, 0.14));
    gG.updateMatrixWorld(true);
    const corners = [[-25, -10], [25, -10], [25, 10], [-25, 10]].map(([x, z]) => W(V(x, 0, z)));
    const arr = [];
    for (const c of corners) arr.push(spot.x, spot.y, spot.z, c.x, c.y, c.z);
    zoomLines.geometry.setAttribute('position', new Float32BufferAttribute(arr, 3));
    P.spot = spot;
    P.target = W(V(4, -18, 0)).lerp(spot, 0.06);
    P.home = V(0.04, 0.08, 0.22);
    camera.position.copy(homePos());
    controls.target.copy(P.target);
    state.ready = true;
    gG.visible = true;
    R.loading.hidden = true;
    root.classList.add('al-ready');
    apply();
  }).catch((e) => {
    console.error(e);
    R.loading.innerHTML = 'The model could not be loaded. Please reload the page.<br><span class="zh">模型載入失敗，請重新整理頁面。</span>';
  });
  const fit = () => MathUtils.clamp(1 + (1.35 - camera.aspect) * 0.9, 1, 1.6);
  function homePos() { return P.target.clone().add(P.home.clone().multiplyScalar(fit())); }

  // ---------------- 依時間擺好一切 ----------------
  const wound = V(-3.75, -10, 0);
  function apply() {
    const h = hOf(state.u), sec = state.second, clk = state.clock;
    const nb = Math.round(bact(h, sec)), nw = wbc(h, sec), na = abs(h, sec), rd = red(h, sec);
    const spread = 1.5 + 17 * Math.min(1, h / 5);
    germs.forEach((G, i) => {
      G.m.visible = i < nb;
      if (!G.m.visible) return;
      G.m.position.copy(wound).addScaledVector(G.dir, spread * G.r).add(V(Math.sin(clk * 1.3 + G.ph) * 0.3, Math.cos(clk + G.ph) * 0.3, 0));
      G.m.position.y = Math.min(G.m.position.y, -1.5);
    });
    wbcs.forEach((C, i) => {
      if (i < 2) {                                      // 血管裡滾的兩隻
        const x = ((clk * 2.2 + i * 25) % 56) - 28;
        C.g.position.set(x, -30 - 1.5 + i * 3, 0); C.g.visible = true; return;
      }
      const j = i - 2;
      if (j >= nw || h < C.arrive) {                    // 還沒出動：前三隻在血管裡待命，其餘不畫
        C.g.visible = j < 3 && h < C.arrive;
        C.g.position.copy(C.exit).setY(-30 + (i % 2 ? 1 : -1)); C.g.scale.setScalar(1);
        return;
      }
      C.g.visible = true;
      const k = ss(h, C.arrive, C.arrive + 3);
      C.g.position.lerpVectors(C.exit, C.target, k).add(V(Math.sin(clk * 0.8 + C.phase) * 0.6, Math.cos(clk * 0.7 + C.phase) * 0.5, 0));
      const squeeze = k < 0.2 ? 1 - 2 * (0.2 - Math.abs(k - 0.1)) : 1;
      C.g.scale.set(1 / Math.max(0.7, squeeze), Math.max(0.7, squeeze), 1);
    });
    abl.forEach((A, i) => {
      A.y.visible = i < na;
      if (!A.y.visible) return;
      const g = germs[i % Math.max(1, nb)];
      if (nb > 0 && g.m.visible) A.y.position.copy(g.m.position).add(A.off);
      else A.y.position.copy(A.free).add(V(Math.sin(clk + i) * 0.5, 0, 0));
    });
    rbcs.forEach((r, i) => { r.position.set(((clk * 6 + i * 6.2) % 54) - 27, -30 + Math.sin(i * 1.7) * 1.5, Math.cos(i * 2.1) * 1.5); });
    vessel.scale.set(1, 1 + 0.25 * rd, 1 + 0.25 * rd);
    M.derm.color.copy(DERM_BASE).lerp(DERM_RED, rd * 0.6);
    M.derm.opacity = 0.14 + 0.12 * rd;
    alarms.forEach((a, i) => {
      const on = ss(h, 0.4, 1) * (1 - ss(h, 6, 12));
      const f = (clk * 0.5 + i / alarms.length) % 1;
      a.position.copy(wound).add(V(Math.cos(i * 1.05) * f * 14, -f * 14, Math.sin(i * 1.05) * f * 6));
      a.material.opacity = on * (1 - f) * 0.8;
    });
    // 文字與數字
    const [te, tz] = fmtTime(h);
    R.t.textContent = te; R.tz.textContent = `割傷之後 ${tz}`;
    R.nb.textContent = nb; R.nw.textContent = nw + 2; R.na.textContent = na;
    let S2;
    if (h < 0.25) S2 = ['Ouch! A paper cut. A few bacteria from the paper slip in through the break in the skin.', '好痛！被紙割到了。紙上的幾隻細菌從皮膚的破口溜了進去。'];
    else if (h < 1.5) S2 = ['The bacteria double every 20 minutes: 6, 12, 24, 48…', '細菌每 20 分鐘多一倍：6、12、24、48……'];
    else if (h < 3) S2 = ['Alarm! Damaged cells call for help. The blood vessel widens and leaks fluid: red, warm, swollen, and sore.', '警報！受傷的細胞求救，血管變寬、滲出液體：紅、熱、腫、痛。'];
    else if (sec) S2 = h < 48 ? ['Memory cells recognized this germ right away. Antibodies are already here, and the bacteria are being cleared fast.', '記憶細胞馬上認出這種病菌。抗體已經到了，細菌很快就被清光。']
      : ['Done in about two days, often before you even feel sick. This memory is how vaccines protect you.', '大約兩天就打完了，常常在你覺得不舒服之前。疫苗就是靠這份記憶保護你。'];
    else if (h < 24) S2 = ['White blood cells squeeze out of the blood vessel and swallow bacteria one by one.', '白血球從血管裡擠出來，把細菌一隻隻吞下去。'];
    else if (h < 120) S2 = ['The battle goes on. Special white blood cells are still learning to make the right antibodies. You may feel sick or get a fever.', '戰爭持續中。特別的白血球還在學著做出對的抗體，你可能會覺得不舒服或發燒。'];
    else if (h < 216) S2 = ['Antibodies arrive! They tag the bacteria, and the white blood cells clean up fast.', '抗體到了！它們把細菌標記起來，白血球很快就清理乾淨。'];
    else S2 = ['Victory, after more than a week. Memory cells now remember this germ for next time.', '打了一個多星期終於贏了。記憶細胞已經記住這種病菌，下次就快了。'];
    const html = `${esc(S2[0])}<span class="zh">${esc(S2[1])}</span>`;
    if (R.status.innerHTML !== html) R.status.innerHTML = html;
    R.status.className = `ey-status gm-status ${nb === 0 && h > 3 ? 'ey-ok' : h >= 0.5 ? 'ey-bad' : ''}`;
    R.tin.value = Math.round(state.u * 1000); R.tin.style.setProperty('--p', `${state.u * 100}%`);
    drawChart(R.chart, state.u, sec);
  }

  // ---------------- 操作 ----------------
  function setMode(second) {
    state.second = second;
    R.modes.forEach((b) => b.setAttribute('aria-pressed', (b.dataset.mode === 'second') === second ? 'true' : 'false'));
    apply();
  }
  function stopPlay() { state.playing = false; R.play.setAttribute('aria-pressed', 'false'); R.playT.textContent = 'Play · 播放'; root.classList.remove('is-playing'); }
  R.modes.forEach((b) => b.addEventListener('click', () => setMode(b.dataset.mode === 'second')));
  R.tin.addEventListener('input', () => { stopPlay(); state.u = +R.tin.value / 1000; apply(); });
  R.play.addEventListener('click', () => {
    if (state.playing) { stopPlay(); return; }
    if (state.u >= 0.999) state.u = 0;
    state.playing = true; R.play.setAttribute('aria-pressed', 'true'); R.playT.textContent = 'Pause · 暫停'; root.classList.add('is-playing');
  });
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="bones"]', (v) => { state.bonesOn = v; if (bones) for (const b of bones.values()) b.mesh.visible = v; zoomLines.visible = v; mark.visible = v; });
  $('.al-home').addEventListener('click', () => { if (state.ready) flyTo(homePos(), P.target); });
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t) { fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0; }

  // ---------------- 標籤 ----------------
  const Lb = {
    skin: lab.add('ey-lb', 'Skin · 皮膚'), cut: lab.add('ey-lb ey-lb-d', 'Paper cut · 紙割傷'), germ: lab.add('ey-lb gm-lb-g', 'Bacteria · 細菌'),
    wbc: lab.add('ey-lb', 'White blood cell · 白血球'), vessel: lab.add('ey-lb sn-lb-v', 'Blood vessel · 微血管'),
    rbc: lab.add('ey-lb sn-lb-v', 'Red blood cell · 紅血球'), ab: lab.add('ey-lb ea-lb-a', 'Antibodies · 抗體'),
    tip: lab.add('ey-lb ey-lb-o', 'Your fingertip · 你的指尖'),
  };
  let autoLabels = true;
  const tgL = $('[data-t="labels"]');
  if (tgL) tgL.addEventListener('change', () => { autoLabels = false; });
  function updateLabels() {
    const on = state.ready && state.labels;
    for (const el of Object.values(Lb)) el.hidden = !on;
    if (!on) return;
    const show = (el, v, p, dy = 0) => { el.hidden = !v; if (v) lab.place(el, p, dy); };
    show(Lb.skin, true, W(V(18, -4, 10)), 0);
    show(Lb.cut, true, W(V(-3.75, 2.5, 0)), -6);
    const g = germs.find((x) => x.m.visible);
    show(Lb.germ, !!g, g ? W(g.m.position).add(V(0, 0.012, 0)) : P.spot, 0);
    const w = wbcs.slice(2).find((x) => x.g.visible) || wbcs[0];
    show(Lb.wbc, true, W(w.g.position).add(V(0, 0.016, 0)), 0);
    show(Lb.vessel, true, W(V(20, -24, 6)), 0);
    show(Lb.rbc, true, W(rbcs[0].position).add(V(0, -0.012, 0)), 0);
    const a = abl.find((x) => x.y.visible);
    show(Lb.ab, !!a, a ? W(a.y.position).add(V(0, -0.01, 0)) : P.spot, 0);
    show(Lb.tip, state.bonesOn && !!P.spot, P.spot || V(0, 0, 0), 16);
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
    state.clock += dt;
    if (state.playing) { state.u = Math.min(1, state.u + dt / 30); if (state.u >= 1) stopPlay(); }
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
  drawChart(R.chart, 0, false);

  // 除錯用：$('[data-germs-lab]').__lab；背景分頁 rAF 很慢時用 setHours(h)／run(秒)／render()
  root.__lab = {
    camera, controls, state, setMode, setHours: (h) => { state.u = uOf(h); apply(); },
    run: (sec) => { for (let x = 0; x < sec; x += 1 / 30) step(1 / 30); fly.t = 1; },
    render: () => { step(0); controls.update(); updateLabels(); renderer.render(scene, camera); },
  };
  return { ready: () => state.ready, test: () => strip && strip.scrollTo() };
}

lazyBoot('[data-germs-lab]', initLab, { test: (lab) => lab.test() });
