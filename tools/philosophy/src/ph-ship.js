/*
 * 哲學 A9 · 特修斯之船（普魯塔克《特修斯傳》23；霍布斯《論物體》II.11.7 的加碼版）
 *
 * 一艘船由 PARTS 個零件組成（船殼列板、甲板、槳、桅、帆桁、帆）。拉桿決定換掉幾個：
 * 被換下的舊零件飛到岸上堆起來，原位換上新木。全部換完之後，可以把舊零件在岸上重新組成第二艘。
 * 每個舊零件有一個 0–2 的進度值：0＝在水上的船 A、1＝岸上的料堆、2＝岸上重組的船 B。
 *
 * 除錯：document.querySelector('[data-ph-ship]').__lab（setReplaced(n)、assemble(true)、state()）；網址加 #ship=35 或 #ship=allb。
 */
import {
  Scene, PerspectiveCamera, WebGLRenderer, Color, Vector3, Quaternion, Matrix4, Group, Mesh, HemisphereLight, DirectionalLight,
  MeshStandardMaterial, MeshBasicMaterial, BoxGeometry, CylinderGeometry, PlaneGeometry, CircleGeometry, DoubleSide, MathUtils,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const L = 7, W = 2.0, D = 2.3;                 // 半長、半寬、船深
const B_OFFSET = new Vector3(13, 1.3, 10.5); // 船 B（岸上船台）相對於船 A 的位移
const OLD = 0x7b6a57, NEW = 0xe0b869;

const sheer = (x) => 1.5 * Math.pow(Math.abs(x) / L, 2.2);
const beam = (x) => W * Math.pow(Math.max(0, 1 - (x / L) ** 2), 0.55);
// 船殼表面上的一點：x 沿船長，phi 從龍骨（0）到舷緣（π/2），side ±1
function hull(x, phi, side) {
  return new Vector3(x, D * (1 - Math.cos(phi)) + sheer(x) * Math.sin(phi), side * beam(x) * Math.sin(phi));
}

function buildParts() {
  const parts = [];
  const add = (geo, pos, quat, kind) => parts.push({ geo, pos, quat: quat || new Quaternion(), kind });
  // 船殼：左右各 4 道列板 × 6 段
  const SEG = 5, STR = 5, X0 = -L * 0.95, X1 = L * 0.95;
  for (const side of [1, -1]) for (let j = 0; j < STR; j++) for (let i = 0; i < SEG; i++) {
    const xa = MathUtils.lerp(X0, X1, i / SEG), xb = MathUtils.lerp(X0, X1, (i + 1) / SEG), xm = (xa + xb) / 2;
    const pa = (j / STR) * Math.PI / 2, pb = ((j + 1) / STR) * Math.PI / 2, pm = (pa + pb) / 2;
    const a = hull(xa, pm, side), b = hull(xb, pm, side), lo = hull(xm, pa, side), hi = hull(xm, pb, side);
    const X = b.clone().sub(a), len = X.length(); X.normalize();
    const T = hi.clone().sub(lo), wid = T.length(); T.normalize();
    // 右手座標基底：X 沿船長、Tn 沿列板寬度（順著船殼往上）、N＝Tn × X 是板面的法線
    const Tn = T.clone().addScaledVector(X, -T.dot(X)).normalize();
    const N = new Vector3().crossVectors(Tn, X).normalize();
    const q = new Quaternion().setFromRotationMatrix(new Matrix4().makeBasis(X, N, Tn));
    add(new BoxGeometry(len * 1.05, 0.13, wid * 1.16), hull(xm, pm, side), q, 'plank');
  }
  // 甲板橫板
  for (let i = 0; i < 5; i++) {
    const x = MathUtils.lerp(-L * 0.6, L * 0.6, i / 4);
    add(new BoxGeometry(2.0, 0.09, beam(x) * 1.86), new Vector3(x, D + sheer(x) - 0.05, 0), null, 'deck');
  }
  // 槳：每側 6 支（示意「三十槳」）
  // 船首柱與船尾柱（向上翹起）
  add(new CylinderGeometry(0.1, 0.16, 3.0, 8), new Vector3(L * 0.97, D + 2.4, 0), new Quaternion().setFromAxisAngle(new Vector3(0, 0, 1), -0.42), 'post');
  add(new CylinderGeometry(0.1, 0.16, 3.4, 8), new Vector3(-L * 0.98, D + 2.6, 0), new Quaternion().setFromAxisAngle(new Vector3(0, 0, 1), 0.5), 'post');
  for (const side of [1, -1]) for (let i = 0; i < 5; i++) {
    const x = MathUtils.lerp(-L * 0.5, L * 0.5, i / 4);
    const q = new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), side * 1.02);
    add(new CylinderGeometry(0.05, 0.065, 4.6, 6), new Vector3(x, D * 0.62, side * (beam(x) + 1.3)), q, 'oar');
  }
  add(new CylinderGeometry(0.12, 0.15, 6.2, 8), new Vector3(0.3, D + 3.0, 0), null, 'mast');
  add(new CylinderGeometry(0.07, 0.07, 5.4, 6), new Vector3(0.3, D + 5.3, 0), new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), Math.PI / 2), 'yard');
  add(new BoxGeometry(0.05, 3.3, 4.8), new Vector3(0.36, D + 3.55, 0), null, 'sail');
  return parts;
}

// 固定的更換順序（決定性的洗牌，重整頁面也一樣）：先船殼與甲板交錯，帆最後
function order(n) {
  const idx = [...Array(n).keys()]; let s = 7;
  for (let i = n - 1; i > 0; i--) { s = (s * 1103515245 + 12345) & 0x7fffffff; const j = s % (i + 1); [idx[i], idx[j]] = [idx[j], idx[i]]; }
  return idx;
}

function init(root) {
  const canvas = root.querySelector('canvas'), labelBox = root.querySelector('[data-ship-labels]');
  let renderer;
  try { renderer = new WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true }); }
  catch (e) { root.classList.add('ph-cave-nogl'); return null; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const scene = new Scene(); scene.background = new Color(0xbfe3f2);
  const camera = new PerspectiveCamera(46, 16 / 9, 0.1, 300);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true; controls.enablePan = false; controls.minDistance = 8; controls.maxDistance = 60; controls.maxPolarAngle = Math.PI * 0.49;
  const HOME = { pos: new Vector3(9, 10, 29), look: new Vector3(5, 2.4, 5) };
  camera.position.copy(HOME.pos); controls.target.copy(HOME.look);

  scene.add(new HemisphereLight(0xffffff, 0x6f8fa8, 1.25));
  const sun = new DirectionalLight(0xfff2d6, 1.5); sun.position.set(10, 18, 8); scene.add(sun);

  // 海、岸、船台
  const sea = new Mesh(new PlaneGeometry(240, 240), new MeshStandardMaterial({ color: 0x3f8fb5, roughness: 0.55, metalness: 0.1 })); sea.rotation.x = -Math.PI / 2; sea.position.y = 0.5; scene.add(sea);
  const shore = new Mesh(new BoxGeometry(90, 1.6, 30), new MeshStandardMaterial({ color: 0xd9c9a3, roughness: 1 })); shore.position.set(0, 0.3, 22.2); scene.add(shore);
  const slip = new Mesh(new BoxGeometry(15.5, 0.3, 4.6), new MeshStandardMaterial({ color: 0x9a8a72, roughness: 1 })); slip.position.set(B_OFFSET.x, 1.25, B_OFFSET.z); scene.add(slip);
  for (const dx of [-4.5, 0, 4.5]) for (const dz of [-2.1, 2.1]) { const p = new Mesh(new BoxGeometry(0.28, 1.6, 0.28), slip.material); p.position.set(B_OFFSET.x + dx, 2.0, B_OFFSET.z + dz); scene.add(p); }

  const defs = buildParts(), N = defs.length, seq = order(N);
  const shipA = new Group(); scene.add(shipA);
  const sailMat = (c) => new MeshStandardMaterial({ color: c, roughness: 0.9, side: DoubleSide });
  const parts = defs.map((d, k) => {
    const oldMat = d.kind === 'sail' ? sailMat(0xb9ad98) : new MeshStandardMaterial({ color: OLD, roughness: 0.95 });
    const newMat = d.kind === 'sail' ? sailMat(0xfaf3df) : new MeshStandardMaterial({ color: NEW, roughness: 0.8 });
    const oldM = new Mesh(d.geo, oldMat), newM = new Mesh(d.geo, newMat);
    oldM.position.copy(d.pos); oldM.quaternion.copy(d.quat); newM.position.copy(d.pos); newM.quaternion.copy(d.quat); newM.visible = false;
    scene.add(oldM); shipA.add(newM);
    return { ...d, oldM, newM, rank: 0, p: 0, target: 0, pile: new Vector3(), pileQ: new Quaternion() };
  });
  seq.forEach((k, r) => { parts[k].rank = r; });
  // 帆永遠最後換（視覺上最醒目，留給「最後一塊」）
  const sail = parts.find((x) => x.kind === 'sail'); const lastK = seq[N - 1];
  if (sail.rank !== N - 1) { const other = parts[lastK]; other.rank = sail.rank; sail.rank = N - 1; }
  // 岸上的料堆：照更換順序排成幾排
  parts.forEach((x) => {
    const r = x.rank, col = r % 12, row = Math.floor(r / 12);
    x.pile.set(-13.5 + col * 1.2, 1.2 + (x.kind === 'sail' ? 0.1 : 0.12) + (row % 2) * 0.02, 8.2 + row * 1.5 + (x.kind === 'mast' || x.kind === 'oar' ? 0 : 0));
    x.pileQ.setFromAxisAngle(new Vector3(0, 0, 1), x.kind === 'mast' || x.kind === 'oar' || x.kind === 'yard' || x.kind === 'post' ? Math.PI / 2 : 0);
    if (x.kind === 'sail') x.pileQ.setFromAxisAngle(new Vector3(0, 0, 1), Math.PI / 2);
  });

  // 標籤
  const mk = (en, zh) => { const s = document.createElement('span'); s.className = 'ph-cave-lab'; s.style.opacity = 0; s.innerHTML = `${en}<i lang="zh-Hant">${zh}</i>`; labelBox.appendChild(s); return s; };
  const labA = mk('Ship A · repaired in the water', '船 A · 在水上修補的'), labB = mk('Ship B · rebuilt from the old planks', '船 B · 用舊木板重組的'), labP = mk('Old planks', '換下來的舊木板');
  const proj = new Vector3();
  function place(s, v, on) {
    proj.copy(v).project(camera); const w = canvas.clientWidth, h = canvas.clientHeight;
    s.style.opacity = on && proj.z < 1 ? 1 : 0;
    s.style.transform = `translate(${(proj.x * 0.5 + 0.5) * w}px, ${(-proj.y * 0.5 + 0.5) * h}px) translate(-50%, -50%)`;
  }

  let replaced = 0, assembled = false, auto = null, mark = null;
  const ui = {
    range: root.querySelector('[data-ship-range]'), count: root.querySelector('[data-ship-count]'), orig: root.querySelector('[data-ship-orig]'),
    one: root.querySelector('[data-ship-one]'), years: root.querySelector('[data-ship-years]'), stop: root.querySelector('[data-ship-mark]'),
    build: root.querySelector('[data-ship-build]'), reset: root.querySelector('[data-ship-reset]'), note: root.querySelector('[data-ship-note]'), markOut: root.querySelector('[data-ship-markout]'),
  };
  ui.range.max = N;
  function note(en, zh) { ui.note.textContent = en; const z = document.createElement('span'); z.lang = 'zh-Hant'; z.textContent = zh; ui.note.appendChild(z); }
  function refresh() {
    parts.forEach((x) => { x.target = x.rank < replaced ? (assembled ? 2 : 1) : 0; x.newM.visible = x.rank < replaced; });
    const left = N - replaced, pct = Math.round(left / N * 100);
    ui.range.value = replaced; ui.count.textContent = `${replaced} / ${N}`; ui.orig.textContent = `${pct}%`;
    ui.build.disabled = replaced < N; ui.build.textContent = assembled ? 'Take ship B apart · 把船 B 拆掉' : 'Rebuild from the old planks · 用舊木板重組';
    ui.one.disabled = replaced >= N; ui.years.disabled = replaced >= N;
    root.setAttribute('data-replaced', replaced); root.setAttribute('data-assembled', assembled ? '1' : '0');
    if (assembled) note('Now there are two ships. One has the original form, place, and history of use. The other has every one of the original planks.', '現在有兩艘船。一艘有原來的形狀、位置與使用的歷史；另一艘有每一塊原來的木板。');
    else if (replaced === 0) note('Theseus’s ship, as it returned from Crete. Every plank is original.', '特修斯的船，剛從克里特回來的樣子。每一塊木板都是原來的。');
    else if (replaced < N) note(`${replaced} of ${N} parts are new. ${pct}% of the original material remains in the ship.`, `${N} 個零件裡有 ${replaced} 個是新的。船上還留著 ${pct}% 的原始材料。`);
    else note('Nothing of the original material is left in the ship. The old planks are stacked on the shore.', '船上已經沒有任何原始材料。舊木板堆在岸上。');
    root.dispatchEvent(new CustomEvent('ship:change', { detail: { replaced, total: N, assembled, mark } }));
  }
  function setReplaced(n) { replaced = Math.max(0, Math.min(N, Math.round(n))); if (replaced < N) assembled = false; refresh(); }
  function assemble(v) { if (replaced < N) return; assembled = v; refresh(); }
  function stopAuto() { if (auto) { clearInterval(auto); auto = null; ui.years.textContent = 'Let the years pass · 讓歲月過去'; } }
  ui.range.addEventListener('input', () => { stopAuto(); setReplaced(+ui.range.value); });
  ui.one.addEventListener('click', () => { stopAuto(); setReplaced(replaced + 1); });
  ui.years.addEventListener('click', () => {
    if (auto) { stopAuto(); return; }
    ui.years.textContent = 'Pause · 暫停';
    auto = setInterval(() => { if (replaced >= N) { stopAuto(); return; } setReplaced(replaced + 1); }, 260);
  });
  ui.stop.addEventListener('click', () => {
    mark = replaced; const pct = Math.round((N - replaced) / N * 100);
    ui.markOut.hidden = false; ui.markOut.textContent = `You said it stopped being Theseus’s ship with ${replaced} of ${N} parts replaced (${pct}% original). Why there, and not one plank earlier? · 你說它在換了 ${replaced}／${N} 個零件時（原件剩 ${pct}%）不再是特修斯的船。為什麼是這裡，而不是早一塊木板？`;
    root.dispatchEvent(new CustomEvent('ship:change', { detail: { replaced, total: N, assembled, mark } }));
  });
  ui.build.addEventListener('click', () => { stopAuto(); assemble(!assembled); });
  ui.reset.addEventListener('click', () => { stopAuto(); mark = null; ui.markOut.hidden = true; assembled = false; setReplaced(0); camera.position.copy(HOME.pos); controls.target.copy(HOME.look); });

  function resize() { const w = canvas.clientWidth, h = canvas.clientHeight; if (!w || !h) return; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); }
  window.addEventListener('resize', resize);

  const tmpA = new Vector3(), tmpB = new Vector3(), arc = new Vector3(), q = new Quaternion();
  let last = performance.now(), clock = 0;
  function frame(now) {
    const dt = Math.min(0.1, (now - last) / 1000); last = now; clock += dt;
    controls.update();
    const bob = Math.sin(clock * 0.9) * 0.06, roll = Math.sin(clock * 0.7) * 0.012;
    shipA.position.y = bob; shipA.rotation.x = roll;
    parts.forEach((x) => {
      const speed = 1.6;                                   // 每秒走過的進度
      if (x.p < x.target) x.p = Math.min(x.target, x.p + dt * speed); else if (x.p > x.target) x.p = Math.max(x.target, x.p - dt * speed);
      const m = x.oldM;
      if (x.p <= 1) {                                      // 船 A ↔ 料堆
        const k = x.p * x.p * (3 - 2 * x.p);
        tmpA.copy(x.pos); tmpA.y += bob; m.position.lerpVectors(tmpA, x.pile, k); m.position.y += Math.sin(k * Math.PI) * 4.5;
        m.quaternion.slerpQuaternions(x.quat, x.pileQ, k);
      } else {                                             // 料堆 ↔ 船 B
        const u = x.p - 1, k = u * u * (3 - 2 * u);
        tmpB.copy(x.pos).add(B_OFFSET); m.position.lerpVectors(x.pile, tmpB, k); m.position.y += Math.sin(k * Math.PI) * 3.2;
        m.quaternion.slerpQuaternions(x.pileQ, x.quat, k);
      }
    });
    renderer.render(scene, camera);
    place(labA, arc.set(0, D + 7.4, 0), true);
    place(labB, arc.set(B_OFFSET.x, D + 8.6, B_OFFSET.z), assembled);
    place(labP, arc.set(-7, 2.8, 10), replaced > 0 && !assembled);
  }
  let lastRaf = 0;
  const loop = (now) => { lastRaf = now; frame(now); requestAnimationFrame(loop); };
  requestAnimationFrame(loop);
  setInterval(() => { const now = performance.now(); if (now - lastRaf > 300) frame(now); }, 120);   // 背景分頁的後備

  resize();
  const h = /ship=(all|\d+)(b?)/.exec(location.hash);
  if (h) { replaced = h[1] === 'all' ? N : Math.min(N, +h[1]); assembled = !!h[2] && replaced === N; parts.forEach((x) => { x.p = x.rank < replaced ? (assembled ? 2 : 1) : 0; }); }
  refresh();
  root.classList.add('ph-cave-ready');
  return { setReplaced, assemble, state: () => ({ replaced, total: N, assembled, mark, moving: parts.filter((x) => x.p !== x.target).length }) };
}

function boot() {
  const root = document.querySelector('[data-ph-ship]');
  if (!root) return;
  let started = false;
  const start = () => { if (started) return; started = true; root.__lab = init(root); };
  if (/ship=/.test(location.hash) || !('IntersectionObserver' in window)) { start(); return; }
  const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { io.disconnect(); start(); } }, { rootMargin: '600px' });
  io.observe(root);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
