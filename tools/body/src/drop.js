/*
 * 人體探索 · 第二十七課「一滴血裡有什麼？」的 3D 模型：潛進一滴血。
 *
 * 沿用第二十四課的「每一站放大十倍」：五個站，每站的內容約 1–2 單位大，下一站要看的東西放在原點。
 *   0  10 cm    真實的左手骨頭（放大 10 倍）＋一片載玻片，上面一滴血
 *   1  1 cm     那滴血：一顆發亮的紅珠子
 *   2  1 mm     表面下方：只有紅色（眼睛的極限）
 *   3  0.1 mm   一大群紅血球漂在血漿裡，一個白血球、幾片血小板
 *   4  10 µm    三種血球擺在一起；可切換三件「工作」的動畫：
 *               oxygen 紅血球接氧氣（暗紅 ↔ 鮮紅）、germ 白血球吞掉一隻細菌、leak 血小板堵住血管上的洞再長出纖維絲
 * 放大量 u（0–4）：第 k 站縮放＝10^(u−k)，快到時淡入、過頭淡出。黃色橫條永遠 1 單位長（代表 10^(−1−u) 公尺）。
 * 大小（示意但比例大致正確）：紅血球直徑約 7 µm、白血球約 12–15 µm、血小板 2–3 µm、細菌約 2 µm。
 * 只有手骨是真實形狀，其餘全部自繪；畫面不出現傷口或針。
 *
 * 血量與血球數工具（initTools）是 2D，不需要 WebGL；體重不儲存。
 * 產物：cd tools/body && npm run build → assets/js/drop.js
 */
import {
  AmbientLight, BackSide, BoxGeometry, CapsuleGeometry, Color, CylinderGeometry, DirectionalLight, Group, HemisphereLight,
  InstancedMesh, MathUtils, Mesh, MeshBasicMaterial, MeshStandardMaterial, Object3D, PerspectiveCamera, RingGeometry, Scene,
  SphereGeometry, TorusGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot, loadBones } from './common.js';

const V = (x, y, z) => new Vector3(x, y, z);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const sm = (a, b, x) => MathUtils.smoothstep(x, a, b);
const UP = V(0, 1, 0);
const UMAX = 4;
const fmt = (n) => Math.round(n).toLocaleString('en-US');
function rng(seed) { let s = seed; return () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; }; }
const PER_UL = { r: 5e6, w: 7000, p: 3e5 };           // 每微升：紅血球、白血球、血小板（取常見範圍的中間值）

export function widthText(u) {
  const mm = Math.pow(10, 2 - u);
  if (mm >= 9.995) return [`${+(mm / 10).toPrecision(2)} cm`, `${+(mm / 10).toPrecision(2)} 公分`];
  const dec = Math.max(0, Math.ceil(-Math.log10(mm) - 1e-9) + (Math.abs(u - Math.round(u)) < 0.005 ? 0 : 1));
  const t = mm.toFixed(Math.min(6, dec));
  return [`${t} mm`, `${t} 公釐`];
}
function big(n) {                                      // 大數字：英文、中文各一種說法
  if (n >= 1e9) return [`${+(n / 1e9).toPrecision(2)} billion`, `${+(n / 1e8).toPrecision(2)} 億`];
  if (n >= 1e6) return [`${+(n / 1e6).toPrecision(2)} million`, n >= 1e8 ? `${+(n / 1e8).toPrecision(2)} 億` : `${fmt(+(n / 1e4).toPrecision(2))} 萬`];
  if (n >= 1e4) return [fmt(+n.toPrecision(2)), `${+(n / 1e4).toPrecision(2)} 萬`];
  return [fmt(+n.toPrecision(2)), fmt(+n.toPrecision(2))];
}

// ---------------- 血量與血球數（2D） ----------------
function initTools(root) {
  const box = root.querySelector('.bd-strip');
  if (!box || box.dataset.ready) return null;
  box.dataset.ready = '1';
  const q = (s) => box.querySelector(s);
  const kg = q('.bd-kg'), lit = q('.bd-l'), bottles = q('.bd-bottles'), vmsg = q('.bd-vmsg');
  function vol() {
    const w = parseFloat(kg.value);
    let L0, en, zh;
    if (w >= 5 && w <= 150) {
      const lo = (w * 70) / 1000, hi = (w * 75) / 1000; L0 = (lo + hi) / 2;
      lit.textContent = `${lo.toFixed(1)}–${hi.toFixed(1)}`;
      en = `About 70 to 75 milliliters for every kilogram: that fills about ${(L0 / 0.6).toFixed(1)} drink bottles of 600 mL. A grown-up has about 5 liters.`;
      zh = `每公斤體重大約 70 到 75 毫升：差不多可以裝滿 ${(L0 / 0.6).toFixed(1)} 瓶 600 毫升的寶特瓶。一個大人大約有 5 公升。`;
    } else {
      L0 = 5; lit.textContent = '5';
      en = 'A grown-up has about 5 liters of blood: a little more than 8 drink bottles of 600 mL. Children have less, in step with their size. Type a weight to estimate.';
      zh = '一個大人大約有 5 公升的血：比 8 瓶 600 毫升的寶特瓶再多一點。小朋友比較少，和身體的大小成比例。輸入體重就可以估算。';
    }
    const n = L0 / 0.6, full = Math.floor(n), part = n - full;
    bottles.innerHTML = Array.from({ length: full }, () => '<i><b style="height:100%"></b></i>').join('') + (part > 0.03 ? `<i><b style="height:${Math.round(part * 100)}%"></b></i>` : '');
    vmsg.innerHTML = `${esc(en)}<span class="zh">${esc(zh)}</span>`;
  }
  kg.addEventListener('input', vol);
  const amts = [...box.querySelectorAll('.bd-amt')], cmsg = q('.bd-cmsg');
  function count(ul) {
    amts.forEach((b) => b.setAttribute('aria-pressed', +b.dataset.ul === ul ? 'true' : 'false'));
    for (const k of ['r', 'w', 'p']) { const [e, z] = big(PER_UL[k] * ul); q(`.bd-cnt-${k} b`).innerHTML = e === z ? esc(e) : `${esc(e)}<small>${esc(z)}</small>`; }
    cmsg.innerHTML = 'These are typical numbers for healthy blood, rounded. A drop here means about a twentieth of a milliliter.<span class="zh">這些是健康血液的常見數字，取了整數。這裡的「一滴」大約是二十分之一毫升。</span>';
  }
  amts.forEach((b) => b.addEventListener('click', () => count(+b.dataset.ul)));
  vol(); count(50);
  return { scrollTo: () => box.scrollIntoView({ behavior: 'smooth', block: 'center' }) };
}

function discGeo(seg = 36) {                           // 兩面凹的圓盤（紅血球），半徑 1、厚約 0.3
  const g = new SphereGeometry(1, seg, Math.round(seg * 0.7)), p = g.attributes.position;
  for (let i = 0; i < p.count; i++) p.setZ(i, p.getZ(i) * 0.34 * (0.3 + 0.7 * sm(0, 0.8, Math.hypot(p.getX(i), p.getY(i)))));
  g.computeVertexNormals(); return g;
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
  scene.add(new AmbientLight(0xffffff, 0.35));
  const key = new DirectionalLight(0xfff3e0, 1.7); key.position.set(1.5, 2.5, 3); scene.add(key);
  const rim = new DirectionalLight(0x9fc4ff, 0.7); rim.position.set(-2, 1.5, -2.5); scene.add(rim);

  let STOPS = [], MODES = [];
  try { STOPS = JSON.parse(root.getAttribute('data-stops') || '[]'); MODES = JSON.parse(root.getAttribute('data-modes') || '[]'); } catch (e) { /* 留空 */ }
  const R = {
    loading: $('.sk-loading'), bar: $('.sk-bar i'), w: $('.bd-w'), wz: $('.bd-wz'), x: $('.bd-x'), x2: $('.bd-x2'), cmp: $('.bd-cmp-t'),
    status: $('.bd-status'), slider: $('.bd-slider'), play: $('.al-play'), playT: $('.al-play-t'),
    jumps: [...root.querySelectorAll('[data-stop]')], modes: [...root.querySelectorAll('[data-mode]')],
  };
  const lab = labeler($('.al-labels'), cv, camera);
  const state = { ready: false, labels: true, u: 0, goal: null, playing: false, mode: 'all', spin: true, clock: 0, hold: false, stop: '' };
  const rootG = new Group(); rootG.visible = false; scene.add(rootG);
  const stages = [], labels = [], modeG = {};
  const anim = {};                                    // 第 4 站會動的東西
  function stage(build) {
    const g = new Group(); g.visible = false; rootG.add(g);
    const mats = [];
    const M = (o) => { const m = new MeshStandardMaterial({ roughness: 0.55, ...o, transparent: true }); m.userData.o = o.opacity ?? 1; mats.push(m); return m; };
    const add = (geo, mat, par = g) => { const m = new Mesh(geo, mat); par.add(m); return m; };
    stages.push({ g, mats });
    build(g, M, add);
  }
  const target = (g, M, add, r = 0.05) => { const t = add(new TorusGeometry(r, r * 0.12, 8, 40), M({ color: 0xffd23a, emissive: 0x6a5200, roughness: 0.4 })); t.position.z = 0.03; return t; };
  const L = (k, p, cls, html, mode, obj) => { const el = lab.add(cls, html); el.hidden = true; labels.push({ el, k, p, mode, obj }); };

  const rule = new Group(); rule.visible = false; scene.add(rule);
  const barMat = new MeshBasicMaterial({ color: 0xffd23a });
  for (const [w, h, x] of [[1, 0.012, 0], [0.012, 0.06, -0.5], [0.012, 0.06, 0.5]]) { const m = new Mesh(new BoxGeometry(w, h, 0.012), barMat); m.position.set(x, 0, 0); rule.add(m); }

  loadBones(root.getAttribute('data-model'), (p) => { R.bar.style.width = `${Math.round(p * 80)}%`; }).then((sk) => {
    const bones = sk.bones;
    sk.model.updateMatrixWorld(true);
    const hand = [...bones.values()].filter((b) => b.info.region === 'hand' && b.info.id.startsWith('l-'));
    const hb = hand.reduce((bx, b) => (bx ? bx.union(b.box) : b.box.clone()), null);
    const hc = hb.getCenter(V(0, 0, 0)), hs = hb.getSize(V(0, 0, 0));
    const DG = discGeo();
    // 0：手＋載玻片＋一滴血（10 公分）
    stage((g, M, add) => {
      const inner = new Group(); inner.scale.setScalar(10); inner.position.set(-0.78, 0.15, -0.12); g.add(inner);
      const off = new Group(); off.position.copy(hc).multiplyScalar(-1); inner.add(off);
      const bm = M({ color: 0xeee4cf, roughness: 0.6 });
      for (const b of hand) { const m = new Mesh(b.mesh.geometry, bm); m.applyMatrix4(b.mesh.matrixWorld); off.add(m); }
      const skin = add(new SphereGeometry(1, 28, 20), M({ color: 0xe8b08e, opacity: 0.3, depthWrite: false }));
      skin.position.copy(inner.position); skin.scale.set(hs.x * 5.6, hs.y * 5.4, hs.z * 5.4); skin.renderOrder = 3;
      const slide = add(new BoxGeometry(0.25, 0.75, 0.012), M({ color: 0xcfe8ff, opacity: 0.45, roughness: 0.1, depthWrite: false })); slide.position.set(0, -0.12, -0.008);
      const dr = add(new SphereGeometry(0.024, 20, 14), M({ color: 0xc81e28, roughness: 0.2 })); dr.scale.z = 0.5;
      target(g, M, add, 0.05);
    });
    L(0, V(0.14, -0.4, 0), 'ey-lb', 'Glass slide · 載玻片');
    L(0, V(0.1, 0.07, 0), 'ey-lb ey-lb-o', 'One drop of blood · 一滴血');
    // 1：那滴血（1 公分）
    stage((g, M, add) => {
      add(new BoxGeometry(2.5, 3.2, 0.12), M({ color: 0xcfe8ff, opacity: 0.3, roughness: 0.1, depthWrite: false })).position.z = -0.07;
      const dr = add(new SphereGeometry(0.24, 40, 28), M({ color: 0xc81e28, roughness: 0.15, emissive: 0x2a0406 })); dr.scale.z = 0.55;
      const hi = add(new SphereGeometry(0.035, 12, 10), M({ color: 0xffffff, opacity: 0.55, roughness: 0.1 })); hi.position.set(-0.08, 0.09, 0.11); hi.scale.set(1.4, 0.8, 0.4);
      target(g, M, add, 0.05).position.z = 0.14;
    });
    // 2：表面下方（1 公釐）——只有紅色
    stage((g, M, add) => {
      add(new SphereGeometry(3.4, 32, 20), M({ color: 0xb01a24, side: BackSide, roughness: 0.9, emissive: 0x4a0810 }));
      const rd = rng(3), sp = M({ color: 0xd02a34, opacity: 0.5, depthWrite: false });
      for (let i = 0; i < 40; i++) { const m = add(new SphereGeometry(0.25 + rd() * 0.3, 10, 8), sp); m.position.set((rd() - 0.5) * 4, (rd() - 0.5) * 4, -0.6 - rd() * 1.6); }
      target(g, M, add, 0.05);
    });
    // 3：一大群（0.1 公釐）
    stage((g, M, add) => {
      const wall = add(new SphereGeometry(3.2, 32, 20), M({ color: 0xd9c27a, side: BackSide, opacity: 0.55, roughness: 0.9, emissive: 0x3a3010 })); wall.renderOrder = -1;
      const rd = rng(17), N = 280, im = new InstancedMesh(DG, M({ color: 0xd42a30, roughness: 0.45 }), N), o = new Object3D();
      for (let i = 0; i < N; i++) {
        o.position.set((rd() - 0.5) * 2.9, (rd() - 0.5) * 2.5, (rd() - 0.5) * 1.5 - 0.2);
        if (o.position.length() < 0.18) o.position.x += 0.3;
        o.rotation.set(rd() * 3, rd() * 3, rd() * 3); o.scale.setScalar(0.036 + rd() * 0.004); o.updateMatrix(); im.setMatrixAt(i, o.matrix);
      }
      g.add(im);
      const wc = add(new SphereGeometry(0.065, 20, 14), M({ color: 0xe8ecf8, roughness: 0.6 })); wc.position.set(0.42, 0.26, 0.3);
      const pm = M({ color: 0xf2c14a, roughness: 0.5 });
      for (let i = 0; i < 14; i++) { const p = add(new SphereGeometry(0.013, 8, 6), pm); p.position.set((rd() - 0.5) * 2.4, (rd() - 0.5) * 2, (rd() - 0.5) * 0.9 + 0.2); p.scale.z = 0.5; if (i === 0) p.position.set(-0.5, -0.32, 0.35); }
      target(g, M, add, 0.045);
    });
    L(3, V(0.42, 0.26, 0.3), 'ey-lb', 'White blood cell · 白血球');
    L(3, V(-0.5, -0.32, 0.35), 'ey-lb', 'Platelet · 血小板');
    // 4：三種血球與三件工作（10 微米）
    stage((g, M, add) => {
      const rd = rng(29);
      const mk = (k) => { const t = new Group(); g.add(t); modeG[k] = t; t.visible = k === 'all'; return t; };
      const redMat = () => M({ color: 0xd42a30, roughness: 0.45 });
      const white = (par, mat) => {                   // 白血球：凹凸不平的球＋分葉的細胞核
        const wg = new Group(); par.add(wg);
        const geo = new SphereGeometry(1, 32, 22), p = geo.attributes.position;
        for (let i = 0; i < p.count; i++) { const x = p.getX(i), y = p.getY(i), z = p.getZ(i), k = 1 + 0.06 * Math.sin(x * 7 + y * 5) + 0.05 * Math.sin(z * 9 + x * 3); p.setXYZ(i, x * k, y * k, z * k); }
        geo.computeVertexNormals();
        const body = add(geo, mat, wg); body.scale.setScalar(0.62); body.renderOrder = 4;
        const nm = M({ color: 0x8a5ad0, roughness: 0.5 });
        for (const [x, y, s] of [[-0.14, 0.08, 0.2], [0.1, 0.14, 0.18], [0.12, -0.12, 0.19]]) add(new SphereGeometry(s, 16, 12), nm, wg).position.set(x, y, 0.05);
        return wg;
      };
      const plate = (par, mat, s = 0.13) => { const m = add(new SphereGeometry(1, 12, 10), mat, par); m.scale.set(s, s * 0.8, s * 0.4); return m; };
      const pm = M({ color: 0xf2c14a, roughness: 0.5 });
      // 三種擺在一起
      let t = mk('all');
      const r0 = add(DG, redMat(), t); r0.scale.setScalar(0.37); r0.position.set(-0.72, 0.36, 0); r0.rotation.set(-0.9, 0.3, 0); anim.r0 = r0;
      const w0 = white(t, M({ color: 0xe8ecf8, opacity: 0.6, roughness: 0.6, depthWrite: false })); w0.position.set(0.48, -0.02, 0); anim.w0 = w0;
      anim.p0 = [];
      for (const [x, y] of [[-1.02, -0.42], [-0.72, -0.55], [-0.46, -0.38], [-0.82, -0.26], [-0.5, -0.66]]) { const p = plate(t, pm); p.position.set(x, y, 0); p.rotation.set(rd() * 3, rd() * 3, 0); anim.p0.push(p); }
      // 載氧氣
      t = mk('oxygen');
      anim.oMat = redMat(); anim.oCell = add(DG, anim.oMat, t); anim.oCell.scale.setScalar(0.5);
      const om = M({ color: 0x9fd8ff, roughness: 0.3, emissive: 0x103050 });
      anim.o2 = [];
      for (let i = 0; i < 16; i++) { const m = add(new SphereGeometry(0.04, 12, 8), om, t); const a = rd() * Math.PI * 2, rr = 0.12 + rd() * 0.33; anim.o2.push({ m, on: V(Math.cos(a) * rr, Math.sin(a) * rr, (i % 2 ? 1 : -1) * 0.1), y: (rd() - 0.5) * 1.2, d: rd() * 0.12 }); }
      // 抓細菌
      t = mk('germ');
      anim.gCell = white(t, M({ color: 0xe8ecf8, opacity: 0.55, roughness: 0.6, depthWrite: false }));
      anim.germ = add(new CapsuleGeometry(0.07, 0.2, 6, 12), M({ color: 0x5fd06a, roughness: 0.5 }), t); anim.germ.rotation.z = 0.9;
      // 堵住漏洞
      t = mk('leak');
      const wall = add(new BoxGeometry(2.8, 1.9, 0.06), M({ color: 0xe89aa0, roughness: 0.7 }), t); wall.position.z = -0.12;
      const hole = add(new RingGeometry(0, 0.26, 32), new MeshBasicMaterial({ color: 0x1a0a14, transparent: true }), t); hole.material.userData.o = 1; stages[stages.length - 1].mats.push(hole.material); hole.position.z = -0.085;
      anim.pl = [];
      for (let i = 0; i < 16; i++) { const p = plate(t, pm, 0.1); const a = i * 2.4, rr = 0.05 + 0.055 * Math.sqrt(i) * 1.1; anim.pl.push({ m: p, to: V(Math.cos(a) * rr, Math.sin(a) * rr, -0.04 + (i % 3) * 0.035), from: V(-1.5 - rd() * 0.6, (rd() - 0.5) * 1.4, 0.3), rot: rd() * 3 }); }
      const fm = M({ color: 0xfff0b0, roughness: 0.6 });
      anim.fib = [];
      for (let i = 0; i < 7; i++) { const f = add(new CylinderGeometry(0.008, 0.008, 0.95, 6), fm, t); f.rotation.z = i * 0.47 + 0.2; f.position.z = 0.09; anim.fib.push(f); }
      anim.stuck = [];
      for (const [x, y] of [[-0.36, 0.16], [0.38, -0.14]]) { const m = add(DG, redMat(), t); m.scale.setScalar(0.3); m.position.set(x, y, 0.13); m.rotation.set(-0.4, 0.5, 0); anim.stuck.push(m); }
    });
    L(4, V(-0.72, 0.82, 0), 'ey-lb', 'Red blood cell · 紅血球', 'all');
    L(4, V(0.48, 0.74, 0), 'ey-lb', 'White blood cell · 白血球', 'all');
    L(4, V(-0.74, -0.84, 0), 'ey-lb', 'Platelets · 血小板', 'all');
    L(4, V(0, 0.62, 0), 'ey-lb tm-lb-w', 'Oxygen · 氧氣', 'oxygen');
    L(4, V(0, 0.3, 0), 'ey-lb', 'Germ · 細菌', 'germ', () => anim.germ);
    L(4, V(0.5, 0.42, 0), 'ey-lb ey-lb-o', 'A hole in a blood vessel · 血管上的洞', 'leak');

    camera.position.copy(homePos()); controls.target.set(0, 0, 0);
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

  // ---------------- 第 4 站的動畫 ----------------
  const DARK = new Color(0x8e1c22), BRIGHT = new Color(0xf02a30);
  function animate() {
    const c = state.clock;
    if (state.mode === 'all') {
      anim.r0.rotation.z = c * 0.3; anim.w0.rotation.z = Math.sin(c * 0.4) * 0.3; anim.w0.scale.set(1 + 0.04 * Math.sin(c * 1.3), 1 - 0.04 * Math.sin(c * 1.3), 1);
      anim.p0.forEach((p, i) => { p.rotation.z = c * 0.2 + i; });
    } else if (state.mode === 'oxygen') {
      const p = (c / 7) % 1, load = sm(0.1, 0.4, p) * (1 - sm(0.62, 0.92, p));
      anim.oMat.color.copy(DARK).lerp(BRIGHT, load); anim.oMat.emissive.setRGB(0.25 * load, 0, 0);
      anim.oCell.rotation.set(-0.7 + 0.15 * Math.sin(c * 0.5), c * 0.25, 0);
      for (const o of anim.o2) {
        const a = sm(0.05 + o.d, 0.35 + o.d, p), b = sm(0.6 + o.d, 0.9 + o.d, p);
        const on = o.on.clone().applyEuler(anim.oCell.rotation);
        if (b <= 0) o.m.position.set(-1.7, o.y, 0).lerp(on, a); else o.m.position.copy(on).lerp(V(1.7, o.y * 0.8, 0), b);
        o.m.scale.setScalar(b >= 1 || a <= 0 ? 0.001 : 1);
      }
    } else if (state.mode === 'germ') {
      const p = (c / 8) % 1, go = sm(0.08, 0.5, p), eat = sm(0.5, 0.74, p), back = sm(0.86, 1, p);
      const x = MathUtils.lerp(-0.6, 0.2, go) - 0.8 * back;
      anim.gCell.position.set(x, 0.05 * Math.sin(c * 2), 0);
      anim.gCell.scale.set(1 + 0.22 * Math.sin(Math.PI * go) + 0.1 * eat * (1 - back), 1 - 0.12 * Math.sin(Math.PI * go), 1);
      anim.germ.position.set(MathUtils.lerp(0.85, x + 0.1, eat), 0.1 * (1 - eat), 0.02);
      anim.germ.scale.setScalar(Math.max(0.001, (1 - 0.85 * eat) * (p < 0.06 ? p / 0.06 : 1) * (1 - sm(0.76, 0.84, p))));
      anim.germ.rotation.z = 0.9 + c * (1 - eat) * 0.6;
    } else if (state.mode === 'leak') {
      const p = (c / 10) % 1, n = anim.pl.length;
      anim.pl.forEach((q, i) => { const a = sm((i / n) * 0.5, (i / n) * 0.5 + 0.14, p); q.m.position.copy(q.from).lerp(q.to, a); q.m.position.y += 0.25 * Math.sin(Math.PI * a) * (i % 2 ? 1 : -1); q.m.rotation.z = q.rot + (1 - a) * c * 2; });
      const f = sm(0.62, 0.8, p);
      anim.fib.forEach((m) => { m.scale.set(1, Math.max(0.001, f), 1); });
      anim.stuck.forEach((m, i) => { const a = sm(0.74 + i * 0.05, 0.9 + i * 0.05, p); m.position.x = MathUtils.lerp(-1.8, i ? 0.38 : -0.36, a); m.scale.setScalar(a > 0 ? 0.3 : 0.001); });
    }
  }

  // ---------------- 放大 ----------------
  const wp = V(0, 0, 0);
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
      if (u > 3.3) animate();
      rule.position.set(0, -0.98 * fit(), 0);
      rootG.rotation.y = state.spin ? 0.4 * Math.sin(state.clock * 0.35) : 0;
      rootG.rotation.x = state.spin ? 0.1 * Math.sin(state.clock * 0.23) : 0;
    }
    const [we, wz] = widthText(u);
    R.w.textContent = we; R.wz.textContent = wz;
    const mag = fmt(+Math.pow(10, u).toPrecision(Math.abs(u - Math.round(u)) < 0.005 ? 1 : 2));
    R.x.textContent = mag; R.x2.textContent = mag;
    const k = MathUtils.clamp(Math.round(u), 0, UMAX), md = MODES.find((m) => m.key === state.mode);
    const atEnd = k === UMAX && md, sk2 = `${k}:${atEnd && md.key !== 'all' ? md.key : ''}`;
    if (sk2 !== state.stop && STOPS[k]) {
      state.stop = sk2;
      R.cmp.innerHTML = `${esc(STOPS[k].cmp_en)}<small>${esc(STOPS[k].cmp_zh)}</small>`;
      const tx = atEnd && md.key !== 'all' ? [md.note_en, md.note_zh] : atEnd ? [`${STOPS[k].en} ${md.note_en}`, `${STOPS[k].zh}${md.note_zh}`] : [STOPS[k].en, STOPS[k].zh];
      R.status.innerHTML = `${esc(tx[0])}<span class="zh">${esc(tx[1])}</span>`;
      R.jumps.forEach((b) => b.setAttribute('aria-pressed', +b.dataset.stop === k ? 'true' : 'false'));
    }
    root.classList.toggle('bd-at-cells', Math.abs(u - UMAX) < 0.5);
  }

  // ---------------- 操作 ----------------
  const fillSlider = () => R.slider.style.setProperty('--p', `${(R.slider.value / 400) * 100}%`);
  function setPlaying(on) { state.playing = on; if (on) state.goal = null; R.play.setAttribute('aria-pressed', on ? 'true' : 'false'); root.classList.toggle('is-playing', on); R.playT.textContent = on ? 'Pause · 暫停' : 'Zoom in · 拉近'; }
  function setU(u, pause = true) { state.u = MathUtils.clamp(u, 0, UMAX); R.slider.value = Math.round(state.u * 100); fillSlider(); if (pause) { setPlaying(false); state.goal = null; } apply(); }
  function goTo(k) { setPlaying(false); state.goal = MathUtils.clamp(k, 0, UMAX); }
  function setMode(k, jump = true) {
    if (!modeG[k]) return;
    state.mode = k; state.clock = 0;
    for (const [n, g] of Object.entries(modeG)) g.visible = n === k;
    R.modes.forEach((b) => b.setAttribute('aria-pressed', b.dataset.mode === k ? 'true' : 'false'));
    if (jump && Math.abs(state.u - UMAX) > 0.02) goTo(UMAX); else apply();
  }
  R.slider.addEventListener('input', () => setU(R.slider.value / 100));
  R.play.addEventListener('click', () => { if (!state.playing && state.u >= UMAX - 0.01) setU(0, false); setPlaying(!state.playing); });
  R.jumps.forEach((b) => b.addEventListener('click', () => goTo(+b.dataset.stop)));
  R.modes.forEach((b) => b.addEventListener('click', () => { if (state.ready) setMode(b.dataset.mode); }));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="spin"]', (v) => { state.spin = v; apply(); });
  $('.al-home').addEventListener('click', () => { if (state.ready) { camera.position.copy(homePos()); controls.target.set(0, 0, 0); } });
  fillSlider();

  // ---------------- 標籤 ----------------
  let autoLabels = true;
  const tgL = $('[data-t="labels"]');
  if (tgL) tgL.addEventListener('change', () => { autoLabels = false; });
  function updateLabels() {
    const on = state.ready && state.labels;
    for (const l of labels) {
      const d = state.u - l.k, show = on && Math.abs(d) < 0.2 && (!l.mode || l.mode === state.mode);
      l.el.hidden = !show;
      if (!show) continue;
      if (l.obj) { const o = l.obj(); wp.copy(o.position).add(V(0, 0.22, 0)); l.el.style.visibility = o.scale.x < 0.3 ? 'hidden' : ''; } else wp.copy(l.p);
      wp.multiplyScalar(Math.pow(10, d)); rootG.localToWorld(wp); lab.place(l.el, wp, -14);
    }
  }

  // ---------------- 尺寸、迴圈 ----------------
  function resize() {
    const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    if (state.ready) camera.position.setLength(3.7 * fit());
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
      const d = state.goal - state.u;
      state.u += Math.sign(d) * Math.min(Math.abs(d), dt * 1.3);
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

  // 除錯用：$('[data-drop-lab]').__lab；背景分頁 rAF 很慢時用 run(秒)／render()
  root.__lab = {
    camera, controls, state, stages, setU, goTo, setMode, setPlaying, widthText, anim,
    run: (sec) => { for (let x = 0; x < sec; x += 1 / 30) step(1 / 30); },
    render: () => { step(0); controls.update(); updateLabels(); renderer.render(scene, camera); },
  };
  return { ready: () => state.ready, test: () => tools && tools.scrollTo() };
}

lazyBoot('[data-drop-lab]', initLab, { test: (lab) => lab.test() });
