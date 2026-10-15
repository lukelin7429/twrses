/*
 * 美術 Art · 第八課〈為什麼畫的臉常常怪怪的？〉：一顆可以轉的簡單頭像（3D），比例線、頭髮、眼睛的位置都可以切換。
 *
 * 頭的形狀與每一條線的高度都在 face.js（頭高＝1）；3D 的單位是 S 倍（下巴在 y = 0）。
 * 頭是黏土般的中性灰，不是任何人的臉、也不代表任何膚色。比例線是黃色的環繞線，每條有中英文標籤。
 * 色覺差異：線用名稱標示，不靠顏色區分；「太高」的眼睛另外有文字說明差多少。
 *
 * 除錯：document.querySelector('[data-artface-lab]').__lab
 *   state、setView('front'|'three'|'side')、setLines(bool)、setHair('none'|'short'|'bangs')、setEyes('true'|'high')、
 *   lineY(name)＝3D 裡那條線的高度、screenY(name)＝那條線在畫面上的位置（0 頂、1 底）、pixelAt(name)、demo('half'|'hair'|'high'|'side')
 * 小互動：[data-ar-eye].__eye（set(y)、check()、next()、state）、[data-ar-facepad].__pad（pad、setLines(bool)）
 */
import {
  AmbientLight, BufferGeometry, CatmullRomCurve3, Color, CylinderGeometry, DirectionalLight, DoubleSide, Float32BufferAttribute, Group, Line, LineBasicMaterial,
  LineLoop, MathUtils, Mesh, MeshStandardMaterial, PerspectiveCamera, Scene, SphereGeometry, TubeGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { createPad } from './pad.js';
import {
  EYE_ROUNDS, EYE_W, HAIR, HIGH_EYE, LINES, LINE_NAMES, LINE_ORDER, PAD_HEAD, gradeEye, halfDepth, halfWidth, outline, padY,
} from './face.js';

const S = 2.4;                                     // 3D 裡頭的高度
const V = (x, y, z) => new Vector3(x, y, z);
const bi = (en, zh) => `${en}<span class="zh">${zh}</span>`;
const LINE_COLOR = 0xffd36e;
const VIEWS = { front: [0, 0, 1], three: [0.75, 0.2, 0.85], side: [1, 0.12, 0.02] };

/** 單位球的頂點 → 頭的形狀（y 由下巴 0 到頭頂 1，x 依 halfWidth、z 依 halfDepth）。 */
function headGeometry() {
  const g = new SphereGeometry(1, 96, 72), p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i), r = Math.hypot(x, z) || 1, Y = 0.5 + 0.5 * y;
    p.setXYZ(i, (x / r) * halfWidth(Y) * S, Y * S, (z / r) * halfDepth(Y) * S);   // 下巴的底是平的（halfWidth(0) > 0）
  }
  g.computeVertexNormals();
  return g;
}
/** 頭髮：比頭大一點的殼。正面停在 front（髮際線），往兩側、後面越來越低（後面到 NAPE）；頭頂多出 puff 的厚度。 */
const NAPE = 0.42;
function hairGeometry(front, puff) {
  const k = 1 + puff * 1.4, g = new SphereGeometry(1, 96, 48, 0, Math.PI * 2, 0, Math.PI * 0.62), p = g.attributes.position;
  const sMax = Math.PI * 0.62;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i), r = Math.hypot(x, z);
    const a = Math.atan2(x, z), edge = front + (NAPE - front) * (1 - Math.cos(a)) / 2;   // 這個方向上，頭髮停在哪個高度
    const s = Math.acos(Math.max(-1, Math.min(1, y))) / sMax;                          // 0 頭頂 … 1 頭髮的邊
    const Y = 1 - s * (1 - edge), w = halfWidth(Math.min(0.999, Y)) * S * k, d = halfDepth(Math.min(0.999, Y)) * S * k;
    const ux = r > 1e-6 ? x / r : 0, uz = r > 1e-6 ? z / r : 0;
    p.setXYZ(i, ux * w, (Y + puff * (Y - edge) / (1 - edge)) * S, uz * d);
  }
  g.computeVertexNormals();
  return g;
}
/** 貼著臉的正面、在高度 y 從 x0 到 x1 的一條管子（眉毛、嘴巴）。 */
function surfaceTube(y, x0, x1, radius) {
  const pts = [];
  for (let i = 0; i <= 16; i++) {
    const x = x0 + (x1 - x0) * (i / 16), w = halfWidth(y) * S, d = halfDepth(y) * S;
    pts.push(V(x, y * S, d * Math.sqrt(Math.max(0, 1 - (x / w) ** 2)) + radius * 0.4));
  }
  return new TubeGeometry(new CatmullRomCurve3(pts), 24, radius, 8, false);
}
/** 在高度 y（頭高的倍數）繞頭一圈的線，略大一點浮在表面上。 */
function ringPoints(y, k = 1.02, n = 120) {
  const pts = [], w = halfWidth(y) * S * k, d = halfDepth(y) * S * k;
  for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2; pts.push(Math.sin(a) * w, y * S, Math.cos(a) * d); }
  return pts;
}
const frontZ = (y) => halfDepth(y) * S;

function initLab(root) {
  const $ = (s) => root.querySelector(s), $$ = (s) => Array.from(root.querySelectorAll(s));
  const cv = $('.al-space-cv'), wrap = $('.al-space');
  const state = { view: 'three', lines: true, hair: 'none', eyes: 'true', labels: true };
  const R = { msg: $('.ar-msg'), read: $('.ar-fc-read'), table: $('.ar-fc-table tbody') };
  const say = (en, zh) => { R.msg.innerHTML = bi(en, zh); };
  const eyeY = () => (state.eyes === 'high' ? HIGH_EYE : LINES.eye);
  let dirty = true, view = null, timers = [];
  const touch = () => { dirty = true; };
  const stopAuto = () => { timers.forEach(clearTimeout); timers = []; };
  const play = (list) => { stopAuto(); timers = list.map((s) => setTimeout(s.fn, s.at * 1000)); };

  function refresh() {
    $$('[data-view]').forEach((b) => b.setAttribute('aria-pressed', String(b.getAttribute('data-view') === state.view)));
    $$('[data-hair]').forEach((b) => b.setAttribute('aria-pressed', String(b.getAttribute('data-hair') === state.hair)));
    $$('[data-eyes]').forEach((b) => b.setAttribute('aria-pressed', String(b.getAttribute('data-eyes') === state.eyes)));
    const tl = $('[data-t="lines"]'); if (tl) tl.checked = state.lines;
    R.table.innerHTML = LINE_ORDER.map((k) => {
      const y = k === 'eye' ? eyeY() : LINES[k], down = Math.round((1 - y) * 100);
      return `<tr${k === 'eye' ? ' class="is-eye"' : ''}><td>${LINE_NAMES[k].en}<span class="zh">${LINE_NAMES[k].zh}</span></td><td>${down}%</td></tr>`;
    }).join('');
    R.read.innerHTML = state.eyes === 'high'
      ? bi(`▲ Eyes drawn too high: ${Math.round((1 - HIGH_EYE) * 100)}% of the way down instead of 50%. The top of the head looks cut off.`, `▲ 眼睛畫得太高：在從上往下 ${Math.round((1 - HIGH_EYE) * 100)}% 的地方，而不是 50%。頭頂看起來像被削掉一塊。`)
      : bi('● The eyes are halfway between the top of the head and the chin.', '● 眼睛在頭頂和下巴的正中間。');
    if (view) view.sync();
    touch();
  }
  function setView(v, quiet) { if (!VIEWS[v]) return; state.view = v; if (view) view.goView(v, quiet === 'instant'); refresh(); }
  function setLines(on) { state.lines = !!on; refresh(); }
  function setHair(h) { if (!HAIR[h]) return; state.hair = h; refresh(); }
  function setEyes(e) { state.eyes = e === 'high' ? 'high' : 'true'; refresh(); }

  // ── 3D ───────────────────────────────────────────────────────────────
  function make3D() {
    let renderer;
    try { renderer = new WebGLRenderer({ canvas: cv, antialias: true, preserveDrawingBuffer: true }); } catch (e) { return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const scene = new Scene(); scene.background = new Color(0x0c0e13);
    const camera = new PerspectiveCamera(30, 1, 0.1, 100);
    const controls = new OrbitControls(camera, cv);
    controls.enableDamping = true; controls.dampingFactor = 0.08; controls.enablePan = false;
    controls.minDistance = 4; controls.maxDistance = 14; controls.minPolarAngle = 0.6; controls.maxPolarAngle = 2.0;
    const TARGET = V(0, 0.5 * S, 0);
    scene.add(new AmbientLight(0xffffff, 0.55));
    const key = new DirectionalLight(0xffffff, 1.6); key.position.set(-3, 5, 6); scene.add(key);
    const rim = new DirectionalLight(0xffffff, 0.5); rim.position.set(4, 2, -4); scene.add(rim);

    const clay = new MeshStandardMaterial({ color: 0xb9b4ab, roughness: 0.85 });
    const dark = new MeshStandardMaterial({ color: 0x3a3d44, roughness: 0.6 });
    const head = new Mesh(headGeometry(), clay); scene.add(head);
    const neck = new Mesh(new CylinderGeometry(0.34, 0.42, 1.0, 40), clay); neck.position.set(0, -0.35, -0.22); scene.add(neck);
    const face = new Group(); scene.add(face);
    const eyes = [-1, 1].map((s) => { const m = new Mesh(new SphereGeometry(0.075, 24, 16), dark); face.add(m); return m; });
    let brows = [];
    const nose = new Mesh(new SphereGeometry(0.11, 24, 16), clay); nose.scale.set(0.9, 0.85, 1.2); scene.add(nose);
    // 嘴巴：嘴角對齊眼睛的中心（Evansville 的講義）
    const mouth = new Mesh(surfaceTube(LINES.mouth, -EYE_W * S, EYE_W * S, 0.028), dark); scene.add(mouth);
    const ears = [-1, 1].map((s) => {
      const m = new Mesh(new SphereGeometry(1, 24, 16), clay);
      const y0 = LINES.nose, y1 = LINES.brow, ym = (y0 + y1) / 2;
      m.scale.set(0.07, ((y1 - y0) / 2) * S, 0.16); m.position.set(s * halfWidth(ym) * S * 1.0, ym * S, -0.12); scene.add(m); return m;
    });
    const hairMat = new MeshStandardMaterial({ color: 0x2b2a2e, roughness: 0.9, side: DoubleSide });
    let hair = null;

    // 比例線
    const lineMat = new LineBasicMaterial({ color: LINE_COLOR });
    const lines = {}, lab = labeler($('.al-labels'), cv, camera), labs = {};
    for (const k of LINE_ORDER) {
      let obj;
      if (k === 'top' || k === 'chin') {
        const g = new BufferGeometry(), y = LINES[k] * S, z = k === 'top' ? 0 : frontZ(0.02) * 0.6;
        g.setAttribute('position', new Float32BufferAttribute([-0.9, y, z, 0.9, y, z], 3)); obj = new Line(g, lineMat);
      } else {
        const g = new BufferGeometry(); g.setAttribute('position', new Float32BufferAttribute(ringPoints(LINES[k]), 3)); obj = new LineLoop(g, lineMat);
      }
      scene.add(obj); lines[k] = obj;
      labs[k] = lab.add(`ar-lb ar-fc-lb${k === 'eye' ? ' is-eye' : ''}`, `${LINE_NAMES[k].en} <span class="zh">${LINE_NAMES[k].zh}</span>`);
    }
    // 中線：頭的正中間由頭頂繞到下巴
    const mid = []; for (let i = 0; i <= 80; i++) { const y = i / 80; mid.push(0, y * S, frontZ(y) * 1.02); }
    const midG = new BufferGeometry(); midG.setAttribute('position', new Float32BufferAttribute(mid, 3));
    const midLine = new Line(midG, new LineBasicMaterial({ color: LINE_COLOR, transparent: true, opacity: 0.7 })); scene.add(midLine);

    function placeFace() {
      const ye = eyeY(), lift = ye - LINES.eye;
      eyes.forEach((m, i) => { const x = (i ? 1 : -1) * EYE_W * S; m.position.set(x, ye * S, frontZ(ye) * Math.sqrt(Math.max(0, 1 - (x / (halfWidth(ye) * S)) ** 2)) - 0.03); });
      brows.forEach((m) => { face.remove(m); m.geometry.dispose(); });
      brows = [-1, 1].map((sg) => { const c = sg * EYE_W * S, m = new Mesh(surfaceTube(LINES.brow + lift, c - 0.15, c + 0.15, 0.03), dark); face.add(m); return m; });
      const yn = LINES.nose + 0.04; nose.position.set(0, yn * S, frontZ(yn) + 0.02);
      // 眼睛線跟著眼睛走
      const g = lines.eye.geometry; g.setAttribute('position', new Float32BufferAttribute(ringPoints(ye), 3)); g.attributes.position.needsUpdate = true;
    }
    function placeHair() {
      if (hair) { scene.remove(hair); hair.geometry.dispose(); hair = null; }
      if (state.hair === 'none') return;
      hair = new Mesh(hairGeometry(HAIR[state.hair].front, HAIR[state.hair].puff), hairMat); scene.add(hair);
    }
    function sync() {
      placeFace(); placeHair();
      for (const k of LINE_ORDER) lines[k].visible = state.lines;
      midLine.visible = state.lines;
    }
    const homePos = (v) => {
      const t = Math.tan(MathUtils.degToRad(camera.fov / 2)), d = Math.max(1.75 / (t * camera.aspect), 1.75 / t) * 1.05;
      return V(...VIEWS[v]).normalize().multiplyScalar(d).add(TARGET);
    };
    let fly = null;
    function goView(v, instant) {
      const p1 = homePos(v);
      if (instant) { camera.position.copy(p1); controls.target.copy(TARGET); fly = null; touch(); return; }
      fly = { t: 0, p0: camera.position.clone(), p1, t0: controls.target.clone() };
    }
    function tick(dt) {
      if (!fly) return false;
      fly.t = Math.min(1, fly.t + dt / 0.9);
      const k = MathUtils.smootherstep(fly.t, 0, 1);
      camera.position.lerpVectors(fly.p0, fly.p1, k); controls.target.lerpVectors(fly.t0, TARGET, k);
      if (fly.t >= 1) fly = null;
      return true;
    }
    controls.addEventListener('change', touch);
    const anchor = (k) => { const y = (k === 'eye' ? eyeY() : LINES[k]) * S; return V(Math.max(0.9, halfWidth(Math.max(0.02, Math.min(0.98, y / S))) * S * 1.05), y, 0); };
    function render() {
      controls.update(); renderer.render(scene, camera);
      const cam = camera.position.clone().sub(TARGET).normalize(), side = Math.sign(cam.z * 1 - cam.x * 0.0 || 1);
      const boxes = [];
      for (const k of LINE_ORDER) {
        const el = labs[k]; el.hidden = !state.lines || !state.labels;
        if (el.hidden) continue;
        // 標籤放在頭的右邊（從相機看），太擠就往下推
        const a = anchor(k), right = V(cam.z, 0, -cam.x).normalize();
        const p = V(0, a.y, 0).add(right.multiplyScalar(Math.max(1.05, a.x)));
        let dy = 0, box = null;
        for (let tries = 0; tries < 6; tries++) {
          lab.place(el, p, dy);
          const r = el.getBoundingClientRect(); box = { l: r.left, r: r.right, t: r.top - 1, b: r.bottom + 1 };
          if (!boxes.some((o) => box.l < o.r && box.r > o.l && box.t < o.b && box.b > o.t)) break;
          dy += (r.bottom - r.top) * 0.85;
        }
        boxes.push(box);
      }
      return side;
    }
    let aspect0 = 0;
    function resize() {
      const w = wrap.clientWidth, h = wrap.clientHeight; if (!w || !h) return;
      renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); root.classList.toggle('ar-narrow', w < 520);
      if (Math.abs(camera.aspect - aspect0) > 0.04) { aspect0 = camera.aspect; goView(state.view, true); }
      touch();
    }
    new ResizeObserver(resize).observe(wrap); resize();
    $('.al-home').addEventListener('click', () => { goView(state.view); touch(); });
    cv.addEventListener('pointerdown', () => { stopAuto(); root.classList.remove('al-fresh'); });

    const pv = V(0, 0, 0);
    // 線在頭的正中央那個平面（z = 0）上的高度投影到畫面：正面平視時，頭頂和下巴的中點應該剛好是眼睛線
    function screenY(k) { pv.set(0, (k === 'eye' ? eyeY() : LINES[k]) * S, 0); pv.project(camera); return 0.5 - pv.y * 0.5; }
    function pixelAt(k) {
      // 比例線上、臉的正面那一點的像素
      controls.update(); renderer.render(scene, camera);
      const y = k === 'eye' ? eyeY() : LINES[k], arr = ringPoints(y), i = 13;    // a = 39°：臉的正面，在眼睛和嘴角的外側，不會被擋住
      pv.set(arr[i * 3], arr[i * 3 + 1], arr[i * 3 + 2]).project(camera);
      // 線只有一個像素寬：在 7 × 7 的範圍裡找最「黃」的像素
      const gl = renderer.getContext(), x0 = Math.round((pv.x * 0.5 + 0.5) * cv.width) - 3, y0 = Math.round((pv.y * 0.5 + 0.5) * cv.height) - 3;
      const blk = new Uint8Array(7 * 7 * 4); gl.readPixels(x0, y0, 7, 7, gl.RGBA, gl.UNSIGNED_BYTE, blk);
      let best = -1e9, out = [0, 0, 0];
      for (let j = 0; j < 49; j++) { const r = blk[j * 4], g = blk[j * 4 + 1], b = blk[j * 4 + 2], yl = (r + g) / 2 - b; if (yl > best) { best = yl; out = [r, g, b]; } }
      return out;
    }
    return { sync, render, tick, goView, screenY, pixelAt, setLabels: (v) => { state.labels = v; touch(); } };
  }

  view = make3D();
  if (!view) root.classList.add('al-nogl');

  $$('[data-view]').forEach((b) => b.addEventListener('click', () => { stopAuto(); setView(b.getAttribute('data-view')); }));
  $$('[data-hair]').forEach((b) => b.addEventListener('click', () => {
    stopAuto(); setHair(b.getAttribute('data-hair'));
    if (state.hair === 'bangs') say('Bangs cover most of the forehead, so the face looks shorter on top. The eyes have not moved: they are still halfway down the head.', '瀏海蓋住大半個額頭，所以臉的上半部看起來比較短。眼睛並沒有移動，還是在頭的一半。');
    else if (state.hair === 'short') say('Hair sits on top of the head and adds to its height. Measure from the top of the skull, under the hair, and the eyes are still halfway.', '頭髮蓋在頭頂上，讓頭看起來更高。從頭髮底下的頭頂量起，眼睛還是在一半。');
    else say('With no hair you can see the whole forehead. There is a lot of head above the eyes.', '沒有頭髮，整個額頭都看得到。眼睛上面的頭，其實很大一塊。');
  }));
  $$('[data-eyes]').forEach((b) => b.addEventListener('click', () => {
    stopAuto(); setEyes(b.getAttribute('data-eyes'));
    say(...(state.eyes === 'high'
      ? ['This is a common beginner\'s face: the eyes sit too high, so the top of the head looks too small, as if part of it were missing.', '這是初學者常畫的臉：眼睛放得太高，頭頂就顯得太小，好像少了一塊。']
      : ['The eyes are back halfway down. Notice how much head there is above them.', '眼睛回到一半的高度。注意眼睛上面還有多大一塊頭。']));
  }));
  const tl = $('[data-t="lines"]'); if (tl) tl.addEventListener('change', () => { stopAuto(); setLines(tl.checked); });
  const tb = $('[data-t="labels"]'); if (tb) tb.addEventListener('change', () => view && view.setLabels(tb.checked));

  const DEMO = {
    half() { setEyes('true'); setHair('none'); setLines(true); setView('front'); say('From the front, the yellow eye line sits exactly halfway between the top of the head and the chin.', '從正面看，黃色的眼睛線剛好在頭頂和下巴的正中間。'); },
    hair() { setEyes('true'); setLines(true); setView('front'); setHair('none'); say('No hair first.', '先沒有頭髮。'); play([{ at: 2.2, fn: () => { setHair('short'); say('Now short hair. The head looks taller, and the forehead looks smaller.', '現在是短髮。頭看起來比較高，額頭看起來比較小。'); } }, { at: 4.6, fn: () => { setHair('bangs'); say('Now bangs. The forehead almost disappears, yet the eyes have not moved at all.', '現在是瀏海。額頭幾乎不見了，但眼睛一點也沒有移動。'); } }]); },
    high() { setHair('none'); setLines(true); setView('front'); setEyes('true'); say('Eyes in the right place.', '眼睛在對的位置。'); play([{ at: 2.2, fn: () => { setEyes('high'); say('Now the eyes are drawn too high. The face is not wrong in any one part, but the whole head looks squashed on top.', '現在眼睛畫得太高。每個部分單獨看都沒錯，整顆頭卻像頂部被壓扁了。'); } }, { at: 5.5, fn: () => setEyes('true') }]); },
    side() { setEyes('true'); setHair('none'); setLines(true); setView('side'); say('From the side, the ear sits between the eyebrow line and the bottom of the nose, behind the middle of the head.', '從側面看，耳朵在眉毛線和鼻子底線之間，位置在頭的中間偏後。'); },
  };

  let raf = 0, last = 0, visible = false;
  function frame(t) {
    raf = 0; if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000); last = t;
    if (view) { if (view.tick(dt)) dirty = true; if (dirty) { dirty = false; view.render(); } }
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; dirty = true; raf = requestAnimationFrame(frame); }
    if (!visible) stopAuto();
  }, { rootMargin: '120px' }).observe(root);

  refresh();
  if (view) view.goView(state.view, true);
  say('A simple head that you can turn. Drag it, or choose a view. The yellow lines show where the parts of the face usually sit.', '一顆可以轉的簡單頭像。拖動它，或選一個角度。黃色的線標出臉上各部分通常在的位置。');
  root.classList.add('al-ready', 'al-fresh');
  root.__lab = {
    state, setView: (v) => setView(v, 'instant'), setLines, setHair, setEyes,
    lineY: (k) => (k === 'eye' ? eyeY() : LINES[k]) * S,
    screenY: (k) => (view ? view.screenY(k) : null), pixelAt: (k) => (view ? view.pixelAt(k) : null),
    demo: (v) => DEMO[v] && DEMO[v](), render: () => { if (view) view.render(); },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

// ── 小互動一：眼睛該在哪裡？ ──────────────────────────────────────
const NS = 'http://www.w3.org/2000/svg';
const sv = (tag, attrs = {}, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };
const EYE_BOX = { cx: 200, baseY: 470, h: 400 };
const ex = (x) => EYE_BOX.cx + x * EYE_BOX.h, ey = (y) => EYE_BOX.baseY - y * EYE_BOX.h;
function headPath() {
  return `M${outline(90).map(([x, y]) => `${ex(x).toFixed(1)},${ey(y).toFixed(1)}`).join('L')}Z`;
}
function drawHead(g, hairKey, { reveal = false, guess = null, truthLines = false } = {}) {
  g.innerHTML = '';
  sv('path', { d: headPath(), fill: '#c9c4bb', stroke: '#1d2230', 'stroke-width': 3 }, g);
  const h = HAIR[hairKey];
  if (h.puff) {
    // 頭髮：從看得到的頭頂（多出 puff）蓋到正面的髮際線
    const k = 1 + h.puff * 1.6;
    const top = 1 + h.puff;
    const path = [`M${ex(-halfWidth(h.front) * k)},${ey(h.front)}`];
    // 左邊由髮際線往上到頭頂，再由頭頂沿右邊往下
    for (let i = 0; i <= 60; i++) { const y = h.front + (1 - h.front) * (i / 60); const yy = y + (y - h.front) / (1 - h.front) * h.puff; path.push(`L${ex(-halfWidth(y) * k).toFixed(1)},${ey(yy).toFixed(1)}`); }
    for (let i = 60; i >= 0; i--) { const y = h.front + (1 - h.front) * (i / 60); const yy = y + (y - h.front) / (1 - h.front) * h.puff; path.push(`L${ex(halfWidth(y) * k).toFixed(1)},${ey(yy).toFixed(1)}`); }
    path.push(`L${ex(halfWidth(h.front) * k)},${ey(h.front)}Z`);
    sv('path', { d: path.join(''), fill: '#2b2a2e', stroke: '#10131c', 'stroke-width': 3 }, g);
    if (reveal) sv('line', { x1: ex(-0.42), y1: ey(top), x2: ex(0.42), y2: ey(top), stroke: '#9fb0cf', 'stroke-width': 2, 'stroke-dasharray': '4 6' }, g);
  }
  // 頭頂與下巴的刻度
  for (const y of [0, 1]) sv('line', { x1: ex(-0.46), y1: ey(y), x2: ex(0.46), y2: ey(y), stroke: '#1d2230', 'stroke-width': 2, 'stroke-dasharray': '2 5', opacity: reveal ? 0.9 : 0 }, g);
  if (reveal) {
    sv('line', { x1: ex(-0.5), y1: ey(LINES.eye), x2: ex(0.5), y2: ey(LINES.eye), stroke: '#ffd36e', 'stroke-width': 5 }, g);
    sv('line', { x1: ex(-0.5), y1: ey(LINES.eye), x2: ex(0.5), y2: ey(LINES.eye), stroke: '#10131c', 'stroke-width': 1.5 }, g);
  }
  if (guess !== null) {
    sv('line', { x1: ex(-0.5), y1: ey(guess), x2: ex(0.5), y2: ey(guess), stroke: '#10131c', 'stroke-width': 4, 'stroke-dasharray': '12 7' }, g);
    eyeCentersAt(guess).forEach(([x, y]) => sv('ellipse', { cx: ex(x), cy: ey(y), rx: EYE_W * EYE_BOX.h / 2, ry: 10, fill: '#f6f3ec', stroke: '#10131c', 'stroke-width': 2.5 }, g));
  }
  if (truthLines) for (const k of ['top', 'eye', 'chin']) sv('text', { x: ex(0.5) + 4, y: ey(LINES[k]) + 6, 'font-size': 18, 'font-weight': 800, fill: '#e8ecf5' }, g).textContent = k === 'eye' ? '½' : k === 'top' ? 'top' : 'chin';
}
const eyeCentersAt = (y) => [[-EYE_W, y], [EYE_W, y]];

function initEye(root) {
  const $ = (s) => root.querySelector(s);
  const svg = $('.ar-ey-svg'), g = sv('g', {}, svg), sl = $('.ar-ey-sl input');
  const E = { k: $('.ar-ey-k'), msg: $('.ar-ey-msg'), check: $('.ar-ey-check'), next: $('.ar-ey-next'), score: $('.ar-ey-score'), steps: $('.ar-ey-steps') };
  const state = { i: 0, y: 0.72, solved: false, results: [] };
  E.steps.innerHTML = EYE_ROUNDS.map(() => '<i></i>').join('');
  const hairKey = () => EYE_ROUNDS[state.i];
  function draw() {
    drawHead(g, hairKey(), { reveal: state.solved, guess: state.y, truthLines: state.solved });
    sl.value = Math.round(state.y * 100);
    Array.from(E.steps.children).forEach((s, n) => { s.className = n < state.i ? 'is-past' : n === state.i ? 'is-now' : ''; });
  }
  function set(y) { if (state.solved) return; state.y = Math.min(0.95, Math.max(0.05, y)); draw(); }
  function check() {
    if (state.solved) return null;
    state.solved = true;
    const r = gradeEye(state.y), mk = { exact: '✓', close: '△', off: '✗' }[r.grade];
    state.results[state.i] = r;
    const dirEn = r.dir === 'high' ? `${r.pct}% of the head too high` : r.dir === 'low' ? `${r.pct}% of the head too low` : 'right on the halfway line';
    const dirZh = r.dir === 'high' ? `比一半高了頭高的 ${r.pct}%` : r.dir === 'low' ? `比一半低了頭高的 ${r.pct}%` : '剛好在一半的線上';
    const hairNote = HAIR[hairKey()].puff ? [' Hair makes the head look taller. Measure from the top of the skull under the hair, not from the top of the hair.', '頭髮讓頭看起來比較高；請從頭髮底下的頭頂量，不要從頭髮的頂端量。'] : ['', ''];
    E.msg.innerHTML = bi(`${mk} Your eyes are ${dirEn}. The yellow line marks halfway between the top of the head and the chin.${hairNote[0]}`, `${mk} 你畫的眼睛${dirZh}。黃線是頭頂和下巴的正中間。${hairNote[1]}`);
    E.check.hidden = true; E.next.hidden = false;
    E.next.textContent = state.i === EYE_ROUNDS.length - 1 ? 'Start again · 從頭再來' : 'Next head · 下一顆頭';
    const done = state.results.filter(Boolean), good = done.filter((x) => x.grade !== 'off').length;
    E.score.textContent = `${good} / ${done.length}`;
    draw();
    return r;
  }
  function go(i) {
    state.i = i; state.solved = false; state.y = 0.72;
    if (i === 0) state.results = [];
    const h = HAIR[hairKey()];
    E.k.textContent = `Head ${i + 1} of ${EYE_ROUNDS.length} · 第 ${i + 1} 顆頭（共 ${EYE_ROUNDS.length} 顆）：${h.en} · ${h.zh}`;
    E.msg.innerHTML = bi('Drag the dashed line, or use the slider, to where you think the eyes go. Then press Check.', '拖動虛線，或用滑桿，把它放到你覺得眼睛該在的高度，再按「對答案」。');
    E.check.hidden = false; E.next.hidden = true;
    draw();
  }
  // 拖曳
  const toY = (e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; const q = p.matrixTransform(svg.getScreenCTM().inverse()); return (EYE_BOX.baseY - q.y) / EYE_BOX.h; };
  let drag = false;
  svg.addEventListener('pointerdown', (e) => { if (state.solved) return; e.preventDefault(); drag = true; try { svg.setPointerCapture(e.pointerId); } catch (_) { /* 合成事件沒有真的指標 */ } set(toY(e)); });
  svg.addEventListener('pointermove', (e) => { if (drag) set(toY(e)); });
  const end = () => { drag = false; };
  svg.addEventListener('pointerup', end); svg.addEventListener('pointercancel', end);
  sl.addEventListener('input', () => set(sl.value / 100));
  E.check.addEventListener('click', check);
  E.next.addEventListener('click', () => go(state.i === EYE_ROUNDS.length - 1 ? 0 : state.i + 1));
  go(0);
  root.__eye = { state, set, check, next: () => go(Math.min(EYE_ROUNDS.length - 1, state.i + 1)) };
}

// ── 小互動二：畫板上畫一張臉，再打開比例線 ────────────────────────────
function initFacePad(root) {
  const $ = (s) => root.querySelector(s);
  const cv = $('.ar-fp-cv'), msg = $('.ar-fp-msg');
  let showLines = false;
  const P = PAD_HEAD, px = (x) => P.cx + x * P.h;
  function guide(ctx) {
    ctx.save();
    ctx.strokeStyle = '#b9b2a2'; ctx.lineWidth = 2.5; ctx.setLineDash([]);
    ctx.beginPath();
    outline(120).forEach(([x, y], i) => { const X = px(x), Y = P.baseY - y * P.h; if (i) ctx.lineTo(X, Y); else ctx.moveTo(X, Y); });
    ctx.closePath(); ctx.stroke();
    if (showLines) {
      ctx.setLineDash([10, 7]); ctx.lineWidth = 2; ctx.font = "700 19px system-ui, 'PingFang TC', sans-serif"; ctx.fillStyle = '#7a5a10';
      for (const k of LINE_ORDER) {
        const y = padY(k);
        ctx.strokeStyle = k === 'eye' ? '#c48a00' : '#c9a646';
        ctx.lineWidth = k === 'eye' ? 3 : 2;
        ctx.beginPath(); ctx.moveTo(P.cx - 200, y); ctx.lineTo(P.cx + 210, y); ctx.stroke();
        ctx.fillText(`${LINE_NAMES[k].en} · ${LINE_NAMES[k].zh}`, P.cx + 220, y + 6);
      }
      ctx.beginPath(); ctx.moveTo(P.cx, P.baseY - P.h); ctx.lineTo(P.cx, P.baseY); ctx.stroke();
      ctx.setLineDash([]); ctx.strokeStyle = '#c48a00'; ctx.lineWidth = 2;
      eyeCentersAt(LINES.eye).forEach(([x]) => { ctx.beginPath(); ctx.ellipse(px(x), padY('eye'), (EYE_W * P.h) / 2, 9, 0, 0, Math.PI * 2); ctx.stroke(); });
    }
    ctx.restore();
  }
  const pad = createPad(cv, { brush: 'pen', guide, onStroke: (s, n) => { msg.innerHTML = bi(`${n} stroke${n > 1 ? 's' : ''} so far. When you are done, switch on the proportion lines and compare.`, `目前畫了 ${n} 筆。畫好了就打開比例線比一比。`); } });
  const tg = $('[data-t="padlines"]');
  const setLines = (v) => { showLines = !!v; if (tg) tg.checked = showLines; pad.redraw(); if (showLines) msg.innerHTML = bi('The dashed lines show where the parts usually sit on an adult head. Are your eyes above the darker line, on it, or below it?', '虛線標出成人頭上各部分通常在的位置。你畫的眼睛在較深的那條線上面、線上，還是下面？'); };
  if (tg) tg.addEventListener('change', () => setLines(tg.checked));
  $('.ar-fp-undo').addEventListener('click', () => pad.undo());
  $('.ar-fp-clear').addEventListener('click', () => pad.clear());
  window.addEventListener('resize', () => pad.redraw());
  msg.innerHTML = bi('Draw a face inside the outline with a mouse, a finger, or a pen: eyes, nose, mouth, and ears. Do not look at the lines yet.', '用滑鼠、手指或觸控筆，在輪廓裡畫一張臉：眼睛、鼻子、嘴巴和耳朵。先不要看比例線。');
  root.__pad = { pad, setLines };
}

function init2D() {
  const a = document.querySelector('[data-ar-eye]'); if (a) initEye(a);
  const b = document.querySelector('[data-ar-facepad]'); if (b) initFacePad(b);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-artface-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
