/*
 * 人體探索 · 第二十四課「你是什麼做成的？」的 3D 模型：再近十倍。
 *
 * 九個「站」，每一站比前一站放大十倍；每一站的內容大約 1–2 個單位大，下一站要看的東西放在原點：
 *   0  1 m      整副真實骨架（原點＝左手）
 *   1  10 cm    真實的左手骨頭（放大 10 倍）＋自繪的一層皮膚
 *   2  1 cm     皮膚表面：細紋、幾根毛
 *   3  1 mm     紋路變成山丘與山谷、汗腺開口、一根毛
 *   4  0.1 mm   一層細胞（像石板）
 *   5  10 µm    一個細胞（細胞膜、細胞核、粒線體）；可換成紅血球、神經細胞、肌肉細胞
 *   6  1 µm     細胞核裡纏在一起的染色質
 *   7  100 nm   DNA 纏在線軸（核小體）上，像一串珠子
 *   8  10 nm    DNA 雙螺旋（寬 2 nm＝0.2 單位、一圈 3.4 nm＝0.34 單位、每圈 10 階）
 * 放大量 u（0–8）：第 k 站的縮放＝10^(u−k)，快到時淡入、過頭後淡出，所以整數的 u 只看得到一站。
 * 畫面下方一條黃色橫條永遠是 1 個單位長，右欄顯示它代表的真實長度（10^−u 公尺）。
 * 骨架與手骨是真實形狀，其餘全部自繪示意（頁面有說明）。
 *
 * 數細胞與量紙（initTools）是 2D，不需要 WebGL。
 * 產物：cd tools/body && npm run build → assets/js/cells.js
 */
import {
  AmbientLight, BackSide, BoxGeometry, CapsuleGeometry, CatmullRomCurve3, Color, CylinderGeometry, DirectionalLight, Group,
  HemisphereLight, MathUtils, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, Scene, SphereGeometry,
  TorusGeometry, TubeGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot, loadBones } from './common.js';

const V = (x, y, z) => new Vector3(x, y, z);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const cr = (pts) => new CatmullRomCurve3(pts, false, 'centripetal');
const sm = (a, b, x) => MathUtils.smoothstep(x, a, b);
const UP = V(0, 1, 0);
const UMAX = 8;
const fmt = (n) => Math.round(n).toLocaleString('en-US');
function rng(seed) { let s = seed; return () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; }; }

export function widthText(u) {
  const mm = Math.pow(10, 3 - u);
  if (mm >= 999.5) return [`${+(mm / 1000).toPrecision(2)} m`, `${+(mm / 1000).toPrecision(2)} 公尺`];
  if (mm >= 9.995) return [`${+(mm / 10).toPrecision(2)} cm`, `${+(mm / 10).toPrecision(2)} 公分`];
  const dec = Math.max(0, Math.ceil(-Math.log10(mm) - 1e-9) + (Math.abs(u - Math.round(u)) < 0.005 ? 0 : 1));
  const t = mm.toFixed(Math.min(7, dec));
  return [`${t} mm`, `${t} 公釐`];
}

// ---------------- 數細胞與量紙（2D） ----------------
function initTools(root) {
  const box = root.querySelector('.ce-strip');
  if (!box || box.dataset.ready) return null;
  box.dataset.ready = '1';
  const q = (s) => box.querySelector(s);
  const sps = [...box.querySelectorAll('.ce-sp')], years = q('.ce-years'), cmsg = q('.ce-cmsg');
  function count(v) {
    sps.forEach((b) => b.setAttribute('aria-pressed', +b.dataset.v === v ? 'true' : 'false'));
    const y = 30e12 / (v * 31557600), r = Math.round(y / 1000) * 1000;
    years.textContent = fmt(r);
    cmsg.innerHTML = `Counting ${v} ${v === 1 ? 'cell' : 'cells'} every second, day and night, with no breaks. The first people to farm lived only about 12,000 years ago.<span class="zh">每秒數 ${v} 個，日夜不停、完全不休息。人類開始種田，也不過是大約一萬兩千年前的事。</span>`;
  }
  sps.forEach((b) => b.addEventListener('click', () => count(+b.dataset.v)));
  count(1);
  const t0 = Date.now(), r1 = q('.ce-rbc'), r2 = q('.ce-rbc2');
  const tick = () => { const n = fmt(((Date.now() - t0) / 1000) * 2.4e6); r1.textContent = n; r2.textContent = n; };
  tick(); setInterval(tick, 500);
  const nEl = q('.ce-n'), mm = q('.ce-mm'), one = q('.ce-one'), pmsg = q('.ce-pmsg');
  function paper() {
    const n = parseFloat(nEl.value), t = parseFloat(mm.value);
    let en, zh;
    if (!(n > 0) || !(t > 0)) { one.textContent = '—'; en = 'Measure a stack of paper and type in its thickness.'; zh = '量一疊紙有多厚，把數字填進來。'; }
    else {
      const x = t / n;
      one.textContent = x < 0.1 ? x.toFixed(3) : x.toFixed(2);
      if (x < 0.03 || x > 0.5) { en = 'Hmm. Most paper is about 0.1 mm thick. Count the sheets again and check the ruler.'; zh = '嗯，大部分的紙大約 0.1 公釐厚。再數一次張數，也再看一次尺。'; }
      else {
        const a = Math.max(1, Math.round(x / 0.03)), b = Math.max(a + 1, Math.round(x / 0.01));
        en = `You measured something thinner than a ruler can show! Many of your cells are 0.01 to 0.03 mm across, so about ${a} to ${b} of them would fit across the thickness of one sheet.`;
        zh = `你量到了尺上看不出來的厚度！你的許多細胞寬 0.01 到 0.03 公釐，所以一張紙的厚度大約可以並排放 ${a} 到 ${b} 個細胞。`;
      }
    }
    pmsg.innerHTML = `${esc(en)}<span class="zh">${esc(zh)}</span>`;
  }
  nEl.addEventListener('input', paper); mm.addEventListener('input', paper);
  paper();
  return { scrollTo: () => box.scrollIntoView({ behavior: 'smooth', block: 'center' }) };
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
  const camera = new PerspectiveCamera(32, 1, 0.01, 200);
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 1; controls.maxDistance = 9;
  scene.add(new HemisphereLight(0xdfe8ff, 0x2a1a20, 1.1));
  scene.add(new AmbientLight(0xffffff, 0.3));
  const key = new DirectionalLight(0xfff3e0, 1.7); key.position.set(1.5, 2.5, 3); scene.add(key);
  const rim = new DirectionalLight(0x9fc4ff, 0.7); rim.position.set(-2, 1.5, -2.5); scene.add(rim);

  let STOPS = [], TYPES = [];
  try { STOPS = JSON.parse(root.getAttribute('data-stops') || '[]'); TYPES = JSON.parse(root.getAttribute('data-types') || '[]'); } catch (e) { /* 留空 */ }
  const R = {
    loading: $('.sk-loading'), bar: $('.sk-bar i'), w: $('.ce-w'), wz: $('.ce-wz'), x: $('.ce-x'), x2: $('.ce-x2'), cmp: $('.ce-cmp-t'),
    status: $('.ce-status'), tnote: $('.ce-tnote'), slider: $('.ce-slider'), play: $('.al-play'), playT: $('.al-play-t'),
    jumps: [...root.querySelectorAll('[data-stop]')], types: [...root.querySelectorAll('[data-ctype]')],
  };
  const lab = labeler($('.al-labels'), cv, camera);
  const state = { ready: false, labels: true, u: 0, goal: null, playing: false, type: 'skin', spin: true, clock: 0, hold: false, stop: '' };
  const rootG = new Group(); rootG.visible = false; scene.add(rootG);
  const stages = [];                                  // { g, mats }
  const labels = [];                                  // { el, k, p, type }
  const typeG = {};
  function stage(build) {
    const g = new Group(); g.visible = false; rootG.add(g);
    const mats = [];
    const M = (o) => { const m = new MeshStandardMaterial({ roughness: 0.6, ...o, transparent: true }); m.userData.o = o.opacity ?? 1; mats.push(m); return m; };
    const add = (geo, mat, par = g) => { const m = new Mesh(geo, mat); par.add(m); return m; };
    const st = { g, mats };
    stages.push(st);
    build(g, M, add, st);
    return st;
  }
  const tubeOf = (pts, r, seg = 80) => new TubeGeometry(cr(pts), seg, r, 8, false);
  function between(a, b, r, mat, par, add) {
    const d = b.clone().sub(a), m = add(new CylinderGeometry(r, r, d.length(), 8), mat, par);
    m.position.copy(a).add(b).multiplyScalar(0.5); m.quaternion.setFromUnitVectors(UP, d.normalize()); return m;
  }
  const target = (g, M, add, r = 0.05) => { const t = add(new TorusGeometry(r, r * 0.12, 8, 40), M({ color: 0xffd23a, emissive: 0x6a5200, roughness: 0.4 })); t.position.z = 0.02; return t; };
  const L = (k, p, cls, html, type) => { const el = lab.add(cls, html); el.hidden = true; labels.push({ el, k, p, type }); };

  // 黃色橫條：永遠 1 個單位長
  const barMat = new MeshBasicMaterial({ color: 0xffd23a });
  const rule = new Group(); rule.visible = false; scene.add(rule);
  for (const [w, h, x] of [[1, 0.012, 0], [0.012, 0.06, -0.5], [0.012, 0.06, 0.5]]) { const m = new Mesh(new BoxGeometry(w, h, 0.012), barMat); m.position.set(x, 0, 0); rule.add(m); }

  loadBones(root.getAttribute('data-model'), (p) => { R.bar.style.width = `${Math.round(p * 80)}%`; }).then((sk) => {
    const bones = sk.bones;
    sk.model.updateMatrixWorld(true);
    const hand = [...bones.values()].filter((b) => b.info.region === 'hand' && b.info.id.startsWith('l-'));
    const hb = hand.reduce((bx, b) => (bx ? bx.union(b.box) : b.box.clone()), null);
    const hc = hb.getCenter(V(0, 0, 0)), hs = hb.getSize(V(0, 0, 0));
    const focus = hc.clone().add(V(0, 0.02, hs.z * 0.5 + 0.004));
    // 0：整副骨架
    stage((g, M, add, st) => {
      const inner = new Group(); inner.position.copy(focus).multiplyScalar(-1); g.add(inner); inner.add(sk.model);
      for (const b of bones.values()) { b.mat.transparent = true; b.mat.userData.o = 1; st.mats.push(b.mat); }
      target(g, M, add);
    });
    L(0, V(0.16, 0.02, 0), 'ey-lb ey-lb-o', 'Left hand · 左手');
    // 1：手（真實骨頭放大 10 倍）＋一層皮膚
    stage((g, M, add) => {
      const inner = new Group(); inner.scale.setScalar(10); g.add(inner);
      const off = new Group(); off.position.copy(focus).multiplyScalar(-1); inner.add(off);
      const bm = M({ color: 0xeee4cf, roughness: 0.6 });
      for (const b of hand) { const m = new Mesh(b.mesh.geometry, bm); m.applyMatrix4(b.mesh.matrixWorld); off.add(m); }
      const skin = add(new SphereGeometry(1, 28, 20), M({ color: 0xe8b08e, opacity: 0.3, depthWrite: false }));
      skin.position.copy(hc).sub(focus).multiplyScalar(10); skin.scale.set(hs.x * 5.6, hs.y * 5.4, hs.z * 5.4); skin.renderOrder = 3;
      target(g, M, add);
    });
    L(1, V(0.3, 0.12, 0), 'ey-lb ey-lb-o', 'A spot of skin · 一小塊皮膚');
    // 2：皮膚表面（1 公分）
    stage((g, M, add) => {
      add(new BoxGeometry(2.4, 2.4, 0.1), M({ color: 0xe6ad8a, roughness: 0.85 })).position.z = -0.05;
      const lm = M({ color: 0xc98f6e, roughness: 0.9 }), rd = rng(7);
      for (let i = 0; i < 15; i++) {
        const y = -1.12 + i * 0.16, ph = rd() * 6, pts = [];
        for (let x = -1.2; x <= 1.21; x += 0.2) pts.push(V(x, y + 0.03 * Math.sin(x * 4 + ph), 0.004));
        add(tubeOf(pts, 0.009, 60), lm);
      }
      for (let i = 0; i < 8; i++) { const x = -1 + i * 0.3 + rd() * 0.1, pts = []; for (let y = -1.2; y <= 1.21; y += 0.3) pts.push(V(x + 0.06 * Math.sin(y * 3 + i), y, 0.004)); add(tubeOf(pts, 0.006, 40), lm); }
      const hm = M({ color: 0x3a2a20 });
      for (let i = 0; i < 7; i++) { const a = V(-0.9 + rd() * 1.8, -0.9 + rd() * 1.8, 0); if (a.length() < 0.25) continue; between(a, a.clone().add(V(0.35, 0.12, 0.28)), 0.005, hm, g, add); }
      target(g, M, add);
    });
    // 3：1 公釐——山丘、山谷、汗腺開口、一根毛
    stage((g, M, add) => {
      add(new BoxGeometry(2.6, 2.6, 0.1), M({ color: 0xd9a07e, roughness: 0.9 })).position.z = -0.14;
      const hill = M({ color: 0xe8b292, roughness: 0.85 }), pore = M({ color: 0x5a3626, roughness: 1 });
      for (let i = -2; i <= 2; i++) {
        const h = add(new CylinderGeometry(0.27, 0.27, 2.6, 24, 1), hill); h.rotation.z = Math.PI / 2; h.position.set(0, i * 0.52, -0.2); h.scale.set(1, 1, 0.75);
        for (let x = -1; x <= 1.01; x += 0.5) { if (i === 0 && Math.abs(x) < 0.1) continue; const p = add(new SphereGeometry(0.035, 12, 8), pore); p.position.set(x + (i % 2) * 0.25, i * 0.52, 0.0); p.scale.z = 0.3; }
      }
      between(V(0.62, -0.26, -0.1), V(1.5, 0.2, 0.9), 0.05, M({ color: 0x3a2a20 }), g, add);
      target(g, M, add);
    });
    L(3, V(0.5, 0.52, 0.03), 'ey-lb', 'Sweat pore · 汗腺的開口');
    L(3, V(1.1, 0.0, 0.5), 'ey-lb', 'A hair · 一根毛');
    // 4：0.1 公釐——一層細胞
    stage((g, M, add) => {
      const ca = M({ color: 0xf0bfa6, roughness: 0.7 }), cb = M({ color: 0xe6a98e, roughness: 0.7 }), nm = M({ color: 0x7a4a6e }), rd = rng(11);
      const geo = new SphereGeometry(1, 18, 12), ng = new SphereGeometry(0.035, 10, 8);
      for (let qx = -4; qx <= 4; qx++) for (let ry = -4; ry <= 4; ry++) {
        const x = (qx + (ry % 2 ? 0.5 : 0)) * 0.3, y = ry * 0.26;
        if (Math.hypot(x, y) > 1.25) continue;
        const c = add(geo, (qx + ry) % 2 ? ca : cb); c.position.set(x, y, -0.05); c.scale.set(0.17 + rd() * 0.01, 0.15 + rd() * 0.01, 0.06);
        add(ng, nm).position.set(x + (rd() - 0.5) * 0.04, y + (rd() - 0.5) * 0.04, 0.0);
      }
      target(g, M, add, 0.06);
    });
    L(4, V(0, 0.2, 0.02), 'ey-lb ey-lb-o', 'One cell · 一個細胞');
    // 5：一個細胞（四種）
    stage((g, M, add) => {
      const rd = rng(23);
      const mk = (k) => { const t = new Group(); g.add(t); typeG[k] = t; t.visible = k === 'skin'; return t; };
      // 皮膚細胞
      let t = mk('skin');
      const mem = add(new SphereGeometry(0.78, 40, 28), M({ color: 0xffb6c8, opacity: 0.2, depthWrite: false, roughness: 0.3 }), t); mem.renderOrder = 4;
      add(new SphereGeometry(0.25, 28, 20), M({ color: 0x8a5ad0, roughness: 0.5 }), t);
      const mito = M({ color: 0xff9a3c, roughness: 0.5 }), ribo = M({ color: 0x8fd0ff });
      for (let i = 0; i < 11; i++) {
        const a = rd() * Math.PI * 2, b = (rd() - 0.5) * 2.2, r = 0.42 + rd() * 0.22;
        const m = add(new CapsuleGeometry(0.045, 0.13, 4, 10), mito, t); m.position.set(r * Math.cos(a) * Math.cos(b), r * Math.sin(b), r * Math.sin(a) * Math.cos(b)); m.rotation.set(rd() * 3, rd() * 3, rd() * 3);
        if (i === 0) m.position.set(0.5, 0.28, 0.2);
      }
      for (let i = 0; i < 60; i++) { const v = V(rd() - 0.5, rd() - 0.5, rd() - 0.5).normalize().multiplyScalar(0.32 + rd() * 0.4); add(new SphereGeometry(0.011, 6, 5), ribo, t).position.copy(v); }
      // 紅血球：兩面凹的圓盤，沒有細胞核
      t = mk('red');
      const rg = new SphereGeometry(1, 40, 28), rp = rg.attributes.position;
      for (let i = 0; i < rp.count; i++) { const x = rp.getX(i), y = rp.getY(i); rp.setZ(i, rp.getZ(i) * (0.3 + 0.7 * sm(0, 0.8, Math.hypot(x, y)))); }
      rg.computeVertexNormals();
      const rb = add(rg, M({ color: 0xd42a30, roughness: 0.45 }), t); rb.scale.set(0.38, 0.38, 0.13); rb.rotation.x = -0.9;
      // 神經細胞
      t = mk('nerve');
      const nc = M({ color: 0xf2d27a, roughness: 0.55 });
      add(new SphereGeometry(0.2, 28, 20), nc, t).position.set(-0.55, 0.1, 0);
      add(new SphereGeometry(0.085, 18, 12), M({ color: 0x8a5ad0 }), t).position.set(-0.55, 0.1, 0.14);
      for (let i = 0; i < 7; i++) {
        const a = 1.2 + i * 0.62, d = V(Math.cos(a), Math.sin(a), (rd() - 0.5) * 0.8).normalize(), o = V(-0.55, 0.1, 0);
        add(tubeOf([o.clone().add(d.clone().multiplyScalar(0.16)), o.clone().add(d.clone().multiplyScalar(0.36)).add(V(0, 0.04, 0)), o.clone().add(d.clone().multiplyScalar(0.55)).add(V(0.05, 0, 0.05))], 0.022, 20), nc, t);
        add(tubeOf([o.clone().add(d.clone().multiplyScalar(0.36)).add(V(0, 0.04, 0)), o.clone().add(d.clone().multiplyScalar(0.5)).add(V(-0.08, 0.1, -0.05))], 0.014, 10), nc, t);
      }
      add(tubeOf([V(-0.38, 0.05, 0), V(0, -0.05, 0.05), V(0.6, 0.02, 0), V(1.3, -0.1, -0.05), V(2.4, -0.02, 0)], 0.035, 60), nc, t);
      // 肌肉細胞
      t = mk('muscle');
      const mb = add(new CapsuleGeometry(0.22, 3.2, 8, 24), M({ color: 0xc8504a, roughness: 0.55 }), t); mb.rotation.z = Math.PI / 2;
      const sm2 = M({ color: 0x7a2420 }), nu = M({ color: 0x8a5ad0 });
      for (let x = -1.5; x <= 1.51; x += 0.1) { const r = add(new TorusGeometry(0.222, 0.007, 6, 36), sm2, t); r.rotation.y = Math.PI / 2; r.position.x = x; }
      for (const [x, a] of [[-0.9, 0.5], [-0.2, 2.2], [0.5, 1.0], [1.1, 2.8]]) { const n = add(new SphereGeometry(1, 14, 10), nu, t); n.scale.set(0.09, 0.04, 0.04); n.position.set(x, 0.21 * Math.sin(a), 0.21 * Math.cos(a)); }
    });
    L(5, V(0.42, 0.66, 0), 'ey-lb', 'Membrane · 細胞膜', 'skin');
    L(5, V(0, -0.02, 0.25), 'ey-lb ey-lb-o', 'Nucleus · 細胞核', 'skin');
    L(5, V(0.5, 0.28, 0.2), 'ey-lb', 'Mitochondria · 粒線體', 'skin');
    L(5, V(0, 0.3, 0), 'ey-lb', 'No nucleus · 沒有細胞核', 'red');
    L(5, V(0.9, 0.12, 0), 'ey-lb', 'The long wire · 長長的線', 'nerve');
    L(5, V(-0.2, 0.3, 0), 'ey-lb', 'Many nuclei · 很多個細胞核', 'muscle');
    // 6：細胞核裡的染色質
    stage((g, M, add) => {
      const wall = add(new SphereGeometry(3.2, 32, 20), M({ color: 0x5a3a9a, opacity: 0.35, side: BackSide, depthWrite: false })); wall.renderOrder = -1;
      const rd = rng(5), cols = [0xb48cff, 0x8fb0ff, 0xd28cf0, 0x9a8cff];
      for (let i = 0; i < 9; i++) {
        const pts = []; let p = i === 0 ? V(-1.3, -0.2, 0.1) : V((rd() - 0.5) * 2.2, (rd() - 0.5) * 2.2, (rd() - 0.5) * 1.4 - 0.2);
        for (let k = 0; k < 16; k++) { pts.push(p.clone()); p = p.clone().add(i === 0 ? V(0.18, (rd() - 0.5) * 0.3, (rd() - 0.5) * 0.25) : V((rd() - 0.5) * 0.7, (rd() - 0.5) * 0.7, (rd() - 0.5) * 0.6)); p.clampLength(0, 1.5); }
        if (i === 0) { const mid = pts[7].clone(); for (const q of pts) q.sub(mid); }
        add(tubeOf(pts, 0.016, 120), M({ color: cols[i % 4], roughness: 0.5 }));
      }
      target(g, M, add, 0.05);
    });
    L(6, V(0.35, 0.3, 0), 'ey-lb ey-lb-o', 'Folded DNA · 摺起來的 DNA');
    // 7：珠子串——DNA 纏在線軸上
    stage((g, M, add) => {
      const pts = []; for (let i = -9; i <= 9; i++) pts.push(V(i * 0.2, 0.16 * Math.sin(i * 0.9), 0.12 * Math.cos(i * 0.7)));
      const mid = cr(pts).getPointAt(0.5); for (const p of pts) p.sub(mid);
      const curve = cr(pts);
      const dna = M({ color: 0x4fd0c0, roughness: 0.4 }), sp = M({ color: 0xf2c14a, roughness: 0.45 });
      add(new TubeGeometry(curve, 160, 0.011, 8, false), dna);
      for (let i = 0; i < 16; i++) {
        const u = (i + 0.5) / 16; if (Math.abs(u - 0.5) < 0.02) continue;
        const p = curve.getPointAt(u), tg = curve.getTangentAt(u);
        const b = add(new SphereGeometry(0.055, 18, 12), sp); b.position.copy(p); b.scale.y = 0.6; b.quaternion.setFromUnitVectors(UP, tg);
        for (const dz of [-0.014, 0.014]) { const w = add(new TorusGeometry(0.058, 0.009, 6, 24), dna); w.position.copy(p).add(tg.clone().multiplyScalar(dz)); w.quaternion.setFromUnitVectors(V(0, 0, 1), tg); }
      }
      target(g, M, add, 0.05);
    });
    L(7, V(0.2, 0.22, 0), 'ey-lb', 'Spool · 線軸');
    // 8：DNA 雙螺旋
    stage((g, M, add) => {
      const A = [], B2 = [], N = 100, Rr = 0.1, pitch = 0.34;
      const pair = [[M({ color: 0xff6b6b }), M({ color: 0x7ddc9a })], [M({ color: 0xffd23a }), M({ color: 0x6fa8ff })]], rd = rng(3);
      for (let i = 0; i <= N; i++) {
        const x = -1.7 + (i / N) * 3.4, a = (x / pitch) * Math.PI * 2;
        const pa = V(x, Rr * Math.cos(a), Rr * Math.sin(a)), pb = V(x, Rr * Math.cos(a + 2.4), Rr * Math.sin(a + 2.4));
        A.push(pa); B2.push(pb);
        const mid = pa.clone().lerp(pb, 0.5), pr = pair[rd() < 0.5 ? 0 : 1], flip = rd() < 0.5;
        between(pa, mid, 0.008, pr[flip ? 1 : 0], g, add); between(mid, pb, 0.008, pr[flip ? 0 : 1], g, add);
      }
      add(new TubeGeometry(cr(A), 300, 0.017, 8, false), M({ color: 0x4fd0c0, roughness: 0.4 }));
      add(new TubeGeometry(cr(B2), 300, 0.017, 8, false), M({ color: 0x3a9ad0, roughness: 0.4 }));
    });
    L(8, V(0, 0.2, 0), 'ey-lb ey-lb-o', 'DNA: the rungs are the code · DNA：橫槓就是密碼');

    camera.position.copy(homePos());
    controls.target.set(0, 0, 0);
    rootG.visible = true; rule.visible = true;
    state.ready = true;
    R.loading.hidden = true;
    root.classList.add('al-ready');
    apply();
  }).catch((e) => {
    console.error(e);
    R.loading.innerHTML = 'The model could not be loaded. Please reload the page.<br><span class="zh">模型載入失敗，請重新整理頁面。</span>';
  });
  const fit = () => MathUtils.clamp(1 + (1.0 - camera.aspect) * 0.8, 1, 1.5);
  function homePos() { return V(0, 0, 3.7 * fit()); }

  // ---------------- 放大 ----------------
  function apply() {
    const u = state.u;
    if (state.ready) {
      stages.forEach((st, k) => {
        const d = u - k, a = d < 0 ? sm(-0.75, -0.25, d) : 1 - sm(0.3, 0.8, d);
        st.g.visible = a > 0.01;
        if (!st.g.visible) return;
        st.g.scale.setScalar(Math.pow(10, d));
        for (const m of st.mats) { m.opacity = m.userData.o * a; m.depthWrite = a > 0.7 && m.userData.o >= 0.99; }
      });
      if (u > 5.4 && state.type !== 'skin' && state.goal !== 5) setType('skin', false);   // 別種細胞沒有可以再放大的細胞核
      rule.position.set(0, -0.98 * fit(), 0);
      rootG.rotation.y = state.spin ? 0.45 * Math.sin(state.clock * 0.35) : 0;
      rootG.rotation.x = state.spin ? 0.12 * Math.sin(state.clock * 0.23) : 0;
    }
    const [we, wz] = widthText(u);
    R.w.textContent = we; R.wz.textContent = wz;
    const x = Math.pow(10, u), mag = fmt(+x.toPrecision(Math.abs(u - Math.round(u)) < 0.005 ? 1 : 2));
    R.x.textContent = mag; R.x2.textContent = mag;
    const k = MathUtils.clamp(Math.round(u), 0, UMAX);
    const showT = Math.abs(u - 5) < 0.5, ty = TYPES.find((t) => t.key === state.type);
    const other = showT && ty && ty.key !== 'skin', sk2 = `${k}:${other ? ty.key : ''}`;   // 換成別種細胞時，說明也換成那一種
    if (sk2 !== state.stop && STOPS[k]) {
      state.stop = sk2;
      R.cmp.innerHTML = `${esc(STOPS[k].cmp_en)}<small>${esc(STOPS[k].cmp_zh)}</small>`;
      const tx = other ? [ty.note_en, ty.note_zh] : [STOPS[k].en, STOPS[k].zh];
      R.status.innerHTML = `${esc(tx[0])}<span class="zh">${esc(tx[1])}</span>`;
      R.jumps.forEach((b) => b.setAttribute('aria-pressed', +b.dataset.stop === k ? 'true' : 'false'));
    }
    R.tnote.hidden = !showT;
    root.classList.toggle('ce-at-cell', showT);
  }

  // ---------------- 操作 ----------------
  const fillSlider = () => R.slider.style.setProperty('--p', `${(R.slider.value / 800) * 100}%`);
  function setPlaying(on) { state.playing = on; if (on) state.goal = null; R.play.setAttribute('aria-pressed', on ? 'true' : 'false'); root.classList.toggle('is-playing', on); R.playT.textContent = on ? 'Pause · 暫停' : 'Zoom in · 拉近'; }
  function setU(u, pause = true) { state.u = MathUtils.clamp(u, 0, UMAX); R.slider.value = Math.round(state.u * 100); fillSlider(); if (pause) { setPlaying(false); state.goal = null; } apply(); }
  function goTo(k) { setPlaying(false); state.goal = MathUtils.clamp(k, 0, UMAX); }
  function setType(k, jump = true) {
    if (!typeG[k]) return;
    state.type = k;
    for (const [n, g] of Object.entries(typeG)) g.visible = n === k;
    R.types.forEach((b) => b.setAttribute('aria-pressed', b.dataset.ctype === k ? 'true' : 'false'));
    if (jump) { if (Math.abs(state.u - 5) > 0.02) goTo(5); else apply(); }
  }
  R.slider.addEventListener('input', () => setU(R.slider.value / 100));
  R.play.addEventListener('click', () => { if (!state.playing && state.u >= UMAX - 0.01) setU(0, false); setPlaying(!state.playing); });
  R.jumps.forEach((b) => b.addEventListener('click', () => goTo(+b.dataset.stop)));
  R.types.forEach((b) => b.addEventListener('click', () => { if (state.ready) setType(b.dataset.ctype); }));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="spin"]', (v) => { state.spin = v; apply(); });
  $('.al-home').addEventListener('click', () => { if (state.ready) { camera.position.copy(homePos()); controls.target.set(0, 0, 0); } });
  fillSlider();

  // ---------------- 標籤 ----------------
  let autoLabels = true;
  const tgL = $('[data-t="labels"]');
  if (tgL) tgL.addEventListener('change', () => { autoLabels = false; });
  const wp = V(0, 0, 0);
  function updateLabels() {
    const on = state.ready && state.labels;
    for (const l of labels) {
      const d = state.u - l.k, show = on && Math.abs(d) < 0.2 && (!l.type || l.type === state.type);
      l.el.hidden = !show;
      if (show) { wp.copy(l.p).multiplyScalar(Math.pow(10, d)); rootG.localToWorld(wp); lab.place(l.el, wp, -14); }
    }
  }

  // ---------------- 尺寸、迴圈 ----------------
  function resize() {
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    if (state.ready) { camera.position.setLength(3.7 * fit()); }
    if (autoLabels) { state.labels = w >= 520; if (tgL) tgL.checked = state.labels; }
  }
  new ResizeObserver(resize).observe(spaceWrap);
  resize();

  function step(dt) {
    state.clock += dt;
    if (state.playing) {
      state.u = Math.min(UMAX, state.u + dt / 2.4);
      if (state.u >= UMAX) setPlaying(false);
    } else if (state.goal != null) {
      const d = state.goal - state.u, s = Math.sign(d) * Math.min(Math.abs(d), dt * 1.3);
      state.u += s;
      if (Math.abs(state.goal - state.u) < 1e-4) { state.u = state.goal; state.goal = null; }
    }
    R.slider.value = Math.round(state.u * 100); fillSlider();
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

  // 除錯用：$('[data-cells-lab]').__lab；背景分頁 rAF 很慢時用 run(秒)／render()
  root.__lab = {
    camera, controls, state, stages, setU, goTo, setType, setPlaying, widthText,
    run: (sec) => { for (let x = 0; x < sec; x += 1 / 30) step(1 / 30); },
    render: () => { step(0); controls.update(); updateLabels(); renderer.render(scene, camera); },
  };
  return { ready: () => state.ready, test: () => tools && tools.scrollTo() };
}

lazyBoot('[data-cells-lab]', initLab, { test: (lab) => lab.test() });
