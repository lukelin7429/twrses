/*
 * 人體探索 · 第二十三課「背為什麼需要照顧？」的 3D 模型：幫脊柱加上重量。
 *
 * 真實的：整副骨架（skeleton.glb；脊柱清楚、其餘淡淡的）、22 片椎間盤（organs.glb 的 disc-01 … disc-22，由上到下：
 *   C2–C3 … C7–T1 是 01–06，T1–T2 … T11–T12 是 07–17，L1–L2 … L5–S1 是 18–22）。
 * 自繪示意：原始資料缺的那一片椎間盤（T12–L1）、脊髓（穿過每節椎骨的黃色管子，到 L1–L2 為止）、書包與肩帶。
 *
 * 會動的結構：trunk（pivot 在 L5–S1 椎間盤）掛著骨盆以上的所有骨頭、椎間盤、脊髓和書包；
 *   頸部是六層巢狀 pivot（C7–T1、C6–C7 … C2–C3 的椎間盤中心），每層轉「低頭角度 ÷ 6」，頭骨掛在最上層。
 * 模擬（示意，不是測量）：L = 書包占體重的比例 ÷ 25%；背法的倍數 two 1／one 1.15／low 1.3。
 *   身體前傾 = L ×（9°，背太低 16°）；只背一邊再往旁邊歪 L × 8°。
 *   每片椎間盤的「壓力」p = 0.12 + 0.25 f + L × 倍數 × 0.7 ×（0.35 + 0.65 f），f = 由上到下 0–1；頸部再加低頭的份。
 *   顏色：淺藍 → 橘 → 紅。
 *
 * 書包檢查與靠牆站（initBag）是 2D，不需要 WebGL；只算書包占體重的比例，數字不儲存。
 * 產物：cd tools/body && npm run build → assets/js/back.js
 */
import {
  AmbientLight, BoxGeometry, CatmullRomCurve3, Color, DirectionalLight, Group, HemisphereLight, MathUtils, Mesh,
  MeshStandardMaterial, Object3D, PerspectiveCamera, Scene, SphereGeometry, TorusGeometry, TubeGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot, loadBones, loadOrgans } from './common.js';

const V = (x, y, z) => new Vector3(x, y, z);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const clamp01 = (x) => MathUtils.clamp(x, 0, 1);
const RAD = Math.PI / 180;
const MULT = { two: 1, one: 1.15, low: 1.3 };
const CALM = new Color(0x9fd8ff), WARN = new Color(0xffb84a), HARD = new Color(0xff3a2e);
const pad = (n) => String(n).padStart(2, '0');

export function pressure(idx, n, L, style, tilt) {
  const f = (idx - 1) / (n - 1);
  let p = 0.12 + 0.25 * f + L * MULT[style] * 0.7 * (0.35 + 0.65 * f);
  if (idx <= 6) p += (tilt / 60) * 0.75 * (0.5 + 0.5 * (idx / 6));
  return clamp01(p);
}

// ---------------- 書包檢查與靠牆站（2D） ----------------
function initBag(root) {
  const box = root.querySelector('.bp-strip');
  if (!box || box.dataset.ready) return null;
  box.dataset.ready = '1';
  const q = (s) => box.querySelector(s);
  const bag = q('.bp-bag'), kg = q('.bp-kg'), fill = q('.bp-gauge2 .bp-gauge-f'), msg = q('.bp-msg');
  function calc() {
    const b = parseFloat(bag.value), w = parseFloat(kg.value);
    let en, zh;
    if (!(b > 0) || !(w > 0)) {
      fill.style.width = '0%';
      en = 'Type the weight of your packed school bag and your own weight.'; zh = '輸入裝好的書包重量，還有你自己的體重。';
    } else {
      const pct = (b / w) * 100, line = (w / 8).toFixed(1), part = Math.max(1, Math.round(100 / pct));
      fill.style.width = `${Math.min(100, (pct / 25) * 100)}%`;
      fill.classList.toggle('bp-over', pct > 12.5);
      const p1 = pct.toFixed(pct < 10 ? 1 : 0);
      if (pct <= 12.5) {
        en = `Your bag is ${p1}% of your body weight, about 1/${part}. That is within the one-eighth guideline (up to ${line} kg for you).`;
        zh = `你的書包是體重的 ${p1}%，大約 ${part} 分之一，在八分之一的建議以內（對你來說是 ${line} 公斤以下）。`;
      } else {
        en = `Your bag is ${p1}% of your body weight. That is more than one eighth: the line for you is ${line} kg. What could stay at school or at home?`;
        zh = `你的書包是體重的 ${p1}%，超過八分之一了；對你來說，那條線是 ${line} 公斤。有什麼東西可以留在學校或家裡？`;
      }
    }
    msg.innerHTML = `${esc(en)}<span class="zh">${esc(zh)}</span>`;
  }
  bag.addEventListener('input', calc); kg.addEventListener('input', calc);
  const walls = [...box.querySelectorAll('.bp-wall')], wm = q('.bp-wmsg');
  function wall() {
    const n = walls.filter((b) => b.getAttribute('aria-pressed') === 'true').length;
    const m = n === 0 ? ['Tap the parts that touch the wall.', '碰得到牆的地方，就把它點起來。']
      : n === 4 ? ['All four touch. Feel the small gaps behind your neck and your lower back? Those are your curves.', '四個地方都碰到了。有沒有感覺到脖子後面和下背後面各有一個小小的空隙？那就是你的彎。']
        : [`${n} of 4 touch. Do not force anything: just notice what your body does, and try again another day.`, `4 個地方碰到了 ${n} 個。不要硬撐，只要留意身體的樣子就好，改天再試一次。`];
    wm.innerHTML = `${esc(m[0])}<span class="zh">${esc(m[1])}</span>`;
  }
  walls.forEach((b) => b.addEventListener('click', () => { b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'); wall(); }));
  calc(); wall();
  return { scrollTo: () => box.scrollIntoView({ behavior: 'smooth', block: 'center' }) };
}

function initLab(root) {
  const $ = (sel) => root.querySelector(sel);
  const bagTool = initBag(root);
  const spaceWrap = $('.al-space');
  const cv = $('.al-space-cv');
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas: cv, antialias: true });
  } catch (e) {
    root.classList.add('al-nogl');
    return { ready: () => true, test: () => bagTool && bagTool.scrollTo() };
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const scene = new Scene();
  scene.background = new Color(0x0a1224);
  const camera = new PerspectiveCamera(32, 1, 0.01, 30);
  const controls = new OrbitControls(camera, cv);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 0.2; controls.maxDistance = 7;
  scene.add(new HemisphereLight(0xdfe8ff, 0x2a1a20, 1.1));
  scene.add(new AmbientLight(0xffffff, 0.25));
  const key = new DirectionalLight(0xfff3e0, 1.8); key.position.set(3, 2.5, 1.5); scene.add(key);
  const rim = new DirectionalLight(0x9fc4ff, 0.8); rim.position.set(-2, 1.5, -2.5); scene.add(rim);

  let NOTES = {};
  try { NOTES = JSON.parse(root.getAttribute('data-notes') || '{}'); } catch (e) { /* 留空 */ }
  const R = {
    loading: $('.sk-loading'), bar: $('.sk-bar i'), pct: $('.bp-pct'), gauge: $('.bp-aside .bp-gauge-f'), status: $('.bp-status'),
    low: $('.bp-bar-low i'), neck: $('.bp-bar-neck i'), lean: $('.bp-bar-lean i'),
    load: $('.bp-load'), loadT: $('.bp-load-t'), tilt: $('.bp-tilt'), tiltT: $('.bp-tilt-t'), styles: [...root.querySelectorAll('[data-style]')],
  };
  const lab = labeler($('.al-labels'), cv, camera);
  const state = { ready: false, labels: true, pct: 0, style: 'two', tilt: 0, cord: false, skel: true, hold: false, note: '', lean: 0, side: 0, tiltNow: 0 };
  let bones = null;
  const P = {}, A = {};
  const trunk = new Group(), bag = new Group();
  trunk.visible = false;                              // 載入完、掛好才顯示
  const neck = [];                                    // 六層頸部 pivot（由下到上）
  const discs = [];                                   // { mat, idx }
  const spineIds = new Set();
  let cordMesh = null, cordAnch = [], strapL = null, strapR = null, bagBase = null;
  const cordMat = new MeshStandardMaterial({ color: 0xffe14a, roughness: 0.4, emissive: 0x4a3a00 });

  Promise.all([
    loadBones(root.getAttribute('data-model'), (p) => { R.bar.style.width = `${Math.round(p * 80)}%`; }),
    loadOrgans(root.getAttribute('data-organs')),
  ]).then(([sk, og]) => {
    bones = sk.bones; const parts = og.parts;
    scene.add(sk.model); scene.add(og.model);
    sk.model.updateMatrixWorld(true); og.model.updateMatrixWorld(true);
    for (const [n, part] of parts) if (!/^disc-/.test(n)) part.mesh.visible = false;          // 別課用的器官
    const B = (id) => bones.get(id), D = (i) => parts.get(`disc-${pad(i)}`);
    for (const b of bones.values()) {
      const sp = b.info.region === 'spine';
      if (sp) spineIds.add(b.info.id);
      b.mat.opacity = sp ? 1 : 0.14; b.mat.transparent = true; b.mat.depthWrite = sp; b.mesh.renderOrder = sp ? 0 : 1;
    }
    // trunk：pivot 在 L5–S1
    const pv = D(22).center.clone();
    trunk.position.copy(pv); scene.add(trunk); trunk.updateMatrixWorld(true);
    const UPPER = ['skull', 'chest', 'shoulder', 'arm', 'hand'];
    for (const b of bones.values()) {
      const id = b.info.id;
      if (UPPER.includes(b.info.region) || (b.info.region === 'spine' && id !== 'sacrum' && id !== 'coccyx')) trunk.attach(b.mesh);
    }
    for (let i = 1; i <= 22; i++) { const d = D(i); trunk.attach(d.mesh); d.mat.roughness = 0.5; discs.push({ mat: d.mat, order: i <= 17 ? i : i + 1 }); }
    // 缺的那一片（T12–L1）：照上下兩片的大小畫一個扁球
    const d17 = D(17), d18 = D(18), s17 = d17.box.getSize(V(0, 0, 0)), s18 = d18.box.getSize(V(0, 0, 0));
    const xm = new MeshStandardMaterial({ color: 0x9fd8ff, roughness: 0.5 });
    const extra = new Mesh(new SphereGeometry(1, 24, 14), xm);
    extra.position.copy(d17.center).lerp(d18.center, 0.5);
    extra.scale.set((s17.x + s18.x) / 4, Math.min(s17.y, s18.y) * 0.42, (s17.z + s18.z) / 4);
    scene.add(extra); extra.updateMatrixWorld(true); trunk.attach(extra);
    discs.push({ mat: xm, order: 18 });
    // 頸部六層 pivot
    let parent = trunk;
    const hold = [['c7', 5], ['c6', 4], ['c5', 3], ['c4', 2], ['c3', 1], ['c2', 0]];
    [6, 5, 4, 3, 2, 1].forEach((di, k) => {
      const g = new Group(); g.position.copy(D(di).center); scene.add(g); g.updateMatrixWorld(true); parent.attach(g);
      g.updateMatrixWorld(true);
      const [vid, dj] = hold[k];
      g.attach(B(vid).mesh); if (dj) g.attach(D(dj).mesh);
      neck.push(g); parent = g;
    });
    const top = neck[5];
    top.attach(B('c1').mesh);
    for (const b of bones.values()) if (b.info.region === 'skull') top.attach(b.mesh);
    // 錨點：標籤與脊髓跟著骨頭動
    const anchor = (world, par) => { const o = new Object3D(); o.position.copy(world); scene.add(o); o.updateMatrixWorld(true); par.attach(o); return o; };
    const parOf = (id) => B(id).mesh.parent;
    const canal = (id) => { const b = B(id); return V(b.center.x, b.center.y, MathUtils.lerp(b.box.min.z, b.box.max.z, 0.52)); };
    const ids = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', ...Array.from({ length: 12 }, (_, i) => `t${i + 1}`), 'l1'];
    cordAnch = [anchor(canal('c1').add(V(0, 0.03, 0.004)), parOf('c1')), ...ids.map((id) => anchor(canal(id), parOf(id))), anchor(canal('l2').add(V(0, 0.012, 0)), trunk)];
    const zFront = (id) => B(id).box.max.z, zBack = (id) => B(id).box.min.z;
    A.neck = anchor(V(0, B('c4').center.y, zFront('c4') + 0.02), parOf('c4'));
    A.upper = anchor(V(0, B('t6').center.y, zFront('t6') + 0.03), trunk);
    A.lower = anchor(V(0, B('l3').center.y, zFront('l3') + 0.02), trunk);
    A.disc = anchor(D(20).center.clone().add(V(0, 0, 0.02)), trunk);
    A.cord = anchor(canal('t10'), trunk);
    P.sac = B('sacrum').center.clone();
    // 書包
    const backZ = zBack('t6');
    const bm = new MeshStandardMaterial({ color: 0x3b82c4, roughness: 0.7 });
    const body = new Mesh(new BoxGeometry(0.25, 0.33, 0.11), bm); bag.add(body);
    const pocket = new Mesh(new BoxGeometry(0.2, 0.16, 0.04), new MeshStandardMaterial({ color: 0x2d6aa6, roughness: 0.7 })); pocket.position.set(0, -0.07, -0.08); bag.add(pocket);
    const sm = new MeshStandardMaterial({ color: 0x24507e, roughness: 0.8 });
    strapL = new Mesh(new TorusGeometry(0.085, 0.009, 8, 28, Math.PI * 1.1), sm); strapR = strapL.clone();
    for (const [s, x] of [[strapL, 0.085], [strapR, -0.085]]) { s.rotation.set(0, Math.PI / 2, 0); s.rotation.z = -0.3; s.position.set(x, 0.07, 0.1); bag.add(s); }
    bagBase = { hi: V(0, B('t7').center.y, backZ - 0.075), lo: V(0, B('l4').center.y - 0.01, backZ - 0.12) };
    bag.position.copy(bagBase.hi); scene.add(bag); bag.updateMatrixWorld(true); trunk.attach(bag);
    bagBase.hi = bag.position.clone(); bagBase.lo = trunk.worldToLocal(bagBase.lo.clone());
    A.bag = anchor(V(0, B('t7').center.y + 0.1, backZ - 0.2), trunk);

    const midY = (B('c1').center.y + P.sac.y) / 2 + 0.05;
    P.target = V(0, midY, B('t8').center.z);
    P.home = V(1.75, 0.1, 0.35);
    camera.position.copy(homePos());
    controls.target.copy(P.target);
    trunk.visible = true;
    state.ready = true;
    R.loading.hidden = true;
    root.classList.add('al-ready');
    apply(true);
  }).catch((e) => {
    console.error(e);
    R.loading.innerHTML = 'The model could not be loaded. Please reload the page.<br><span class="zh">模型載入失敗，請重新整理頁面。</span>';
  });
  const fit = () => MathUtils.clamp(1 + (0.8 - camera.aspect) * 0.9, 1, 1.4);
  function homePos() { return P.target.clone().add(P.home.clone().multiplyScalar(fit())); }

  function rebuildCord() {
    trunk.updateMatrixWorld(true);
    const pts = cordAnch.map((a) => trunk.worldToLocal(a.getWorldPosition(V(0, 0, 0))));
    const geo = new TubeGeometry(new CatmullRomCurve3(pts, false, 'centripetal'), 90, 0.0065, 10, false);
    if (cordMesh) { cordMesh.geometry.dispose(); cordMesh.geometry = geo; } else { cordMesh = new Mesh(geo, cordMat); cordMesh.renderOrder = 2; trunk.add(cordMesh); }
    cordMesh.visible = state.cord;
  }

  // ---------------- 模擬 ----------------
  const col = new Color();
  function targets() {
    const L = state.pct / 25, s = state.style;
    return { L, lean: L * (s === 'low' ? 16 : s === 'one' ? 6 : 9) * RAD, side: s === 'one' ? L * 8 * RAD : 0 };
  }
  function apply(force) {
    const t = targets(), L = t.L, s = state.style;
    if (state.ready) {
      trunk.rotation.set(state.lean, 0, state.side);
      const each = (state.tiltNow * RAD) / 6;
      let moved = force;
      for (const g of neck) { if (Math.abs(g.rotation.x - each) > 1e-5) { g.rotation.x = each; moved = true; } }
      if (moved) rebuildCord();
      for (const d of discs) {
        const p = pressure(d.order, 23, L, s, state.tilt);
        if (p < 0.5) col.copy(CALM).lerp(WARN, p / 0.5); else col.copy(WARN).lerp(HARD, (p - 0.5) / 0.5);
        d.mat.color.copy(col); d.mat.emissive.copy(col).multiplyScalar(0.25);
      }
      bag.visible = state.pct > 0;
      const k = 0.78 + 0.24 * L;
      bag.scale.set(k, k, 0.8 + 0.5 * L);
      bag.position.copy(s === 'low' ? bagBase.lo : bagBase.hi);
      if (s === 'one') bag.position.x += 0.035;
      bag.rotation.set(s === 'low' ? -0.22 : 0, 0, s === 'one' ? -0.16 : 0);
      strapR.visible = s !== 'one';
      const sk2 = s === 'low' ? 1.9 : 1;
      for (const st of [strapL, strapR]) { st.scale.setScalar(sk2); st.position.y = s === 'low' ? 0.2 : 0.07; st.position.z = s === 'low' ? 0.16 : 0.1; }
    }
    R.pct.textContent = `${state.pct % 1 ? state.pct.toFixed(1) : state.pct}%`;
    R.gauge.style.width = `${(state.pct / 25) * 100}%`;
    R.gauge.classList.toggle('bp-over', state.pct > 12.5);
    R.low.style.width = `${Math.round(clamp01(0.3 + 0.7 * L * MULT[s] / 1.3) * 100)}%`;
    R.neck.style.width = `${Math.round(clamp01(0.2 + 0.7 * (state.tilt / 60) + 0.1 * L) * 100)}%`;
    R.lean.style.width = `${Math.round(clamp01((t.lean + t.side) / (16 * RAD)) * 100)}%`;
    const nk = state.tilt > 25 ? 'phone' : state.pct <= 0 ? 'none' : s === 'one' ? 'one' : s === 'low' ? 'low' : state.pct > 12.5 ? 'heavy' : 'light';
    if (nk !== state.note && NOTES[nk]) {
      state.note = nk;
      R.status.innerHTML = `${esc(NOTES[nk].en)}<span class="zh">${esc(NOTES[nk].zh)}</span>`;
      R.status.className = `ey-status bp-status ${['none', 'light'].includes(nk) ? 'ey-ok' : 'ey-bad'}`;
    }
  }

  // ---------------- 操作 ----------------
  const fillS = (el, max) => el.style.setProperty('--p', `${(el.value / max) * 100}%`);
  function setLoad(v) { state.pct = MathUtils.clamp(+v, 0, 25); R.load.value = state.pct; fillS(R.load, 25); R.loadT.textContent = `${state.pct % 1 ? state.pct.toFixed(1) : state.pct}%`; apply(); }
  function setTilt(v) { state.tilt = MathUtils.clamp(+v, 0, 60); R.tilt.value = state.tilt; fillS(R.tilt, 60); R.tiltT.textContent = `${state.tilt}°`; apply(); }
  function setStyle(k) { if (!MULT[k]) return; state.style = k; R.styles.forEach((b) => b.setAttribute('aria-pressed', b.dataset.style === k ? 'true' : 'false')); if (state.pct === 0) setLoad(10); else apply(); }
  R.load.addEventListener('input', () => setLoad(R.load.value));
  R.tilt.addEventListener('input', () => setTilt(R.tilt.value));
  R.styles.forEach((b) => b.addEventListener('click', () => setStyle(b.dataset.style)));
  const bind = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('change', () => fn(el.checked)); };
  function setCord(v) {
    state.cord = v;
    if (!bones) return;
    for (const id of spineIds) { const b = bones.get(id); b.mat.opacity = v ? 0.32 : 1; b.mat.depthWrite = !v; b.mesh.renderOrder = v ? 3 : 0; }
    if (cordMesh) cordMesh.visible = v;
  }
  bind('[data-t="labels"]', (v) => { state.labels = v; });
  bind('[data-t="cord"]', setCord);
  bind('[data-t="skel"]', (v) => { state.skel = v; if (bones) for (const b of bones.values()) if (!spineIds.has(b.info.id)) b.mesh.visible = v; });
  $('.al-home').addEventListener('click', () => { if (state.ready) flyTo(homePos(), P.target); });
  const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
  function flyTo(p, t) { fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0; }
  fillS(R.load, 25); fillS(R.tilt, 60);

  // ---------------- 標籤 ----------------
  const Lb = {
    neck: lab.add('ey-lb', 'Neck: curves in · 頸椎：往前凹'), upper: lab.add('ey-lb', 'Upper back: curves out · 胸椎：往後凸'),
    lower: lab.add('ey-lb', 'Lower back: curves in · 腰椎：往前凹'), sac: lab.add('ey-lb', 'Sacrum · 薦骨'),
    disc: lab.add('ey-lb ey-lb-o', 'Disc · 椎間盤'), cord: lab.add('ey-lb ey-lb-o', 'Spinal cord · 脊髓'), bag: lab.add('ey-lb bp-lb-b', 'Backpack · 書包'),
  };
  for (const el of Object.values(Lb)) el.hidden = true;
  let autoLabels = true;
  const tgL = $('[data-t="labels"]');
  if (tgL) tgL.addEventListener('change', () => { autoLabels = false; });
  const wp = V(0, 0, 0);
  function updateLabels() {
    const on = state.ready && state.labels;
    for (const el of Object.values(Lb)) el.hidden = !on;
    if (!on) return;
    const at = (el, a, off, show = true) => { el.hidden = !show; if (show) lab.place(el, a.getWorldPosition(wp).add(off)); };
    at(Lb.neck, A.neck, V(0, 0.01, 0.12)); at(Lb.upper, A.upper, V(0, 0, 0.16)); at(Lb.lower, A.lower, V(0, 0.01, 0.15));
    lab.place(Lb.sac, P.sac.clone().add(V(0, -0.02, -0.14)));
    at(Lb.disc, A.disc, V(0, -0.035, 0.1)); at(Lb.cord, A.cord, V(0, 0, -0.12), state.cord && state.pct === 0);
    at(Lb.bag, A.bag, V(0, 0.1, -0.05), state.pct > 0);
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
    const t = targets(), k = Math.min(1, dt / 0.35);
    state.lean += (t.lean - state.lean) * k; state.side += (t.side - state.side) * k; state.tiltNow += (state.tilt - state.tiltNow) * k;
    apply();
    if (fly.t < 1) {
      fly.t = Math.min(1, fly.t + dt / 0.9);
      const kk = MathUtils.smootherstep(fly.t, 0, 1);
      camera.position.lerpVectors(fly.p0, fly.p1, kk);
      controls.target.lerpVectors(fly.t0, fly.t1, kk);
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

  // 除錯用：$('[data-back-lab]').__lab；背景分頁 rAF 很慢時用 run(秒)／render()
  root.__lab = {
    camera, controls, state, P, setLoad, setTilt, setStyle, setCord, pressure, discs,
    view: (x, y, z) => { camera.position.copy(P.target).add(V(x, y, z)); controls.target.copy(P.target); },
    run: (sec) => { for (let x = 0; x < sec; x += 1 / 30) step(1 / 30); fly.t = 1; },
    render: () => { step(0); controls.update(); updateLabels(); renderer.render(scene, camera); },
  };
  return { ready: () => state.ready, test: () => bagTool && bagTool.scrollTo() };
}

lazyBoot('[data-back-lab]', initLab, { test: (lab) => lab.test() });
