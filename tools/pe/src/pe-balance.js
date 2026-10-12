/*
 * 體育 Sports and Movement · 第一課〈How Do You Keep Your Balance? 怎麼站得穩？〉
 *
 * 一個機制：重心（的投影）落在支撐底面裡就不會倒；腳張開（底面變大）、蹲低（重心變低）就更穩。
 *
 * 畫面：3D 人偶站在一塊有格線的墊子上（一格 20 公分）。地上的綠色區域＝支撐底面（著地的腳圍出來的範圍），
 * 金色的球＝重心，往下的虛線落在地上的金點＝重心的投影。拖動人偶（或按右邊的方向鍵）讓它歪，
 * 金點一跑出綠色區域，人偶就倒下去；再按「站起來」。
 *
 * 人偶、重心、支撐底面都來自 body.js／balance.js（純函式，有 node 測試）；動作來自 sim.js。
 * 沒有 WebGL 的瀏覽器改用 figure2d.js 畫同一個人偶（正面、側面、正上方），右邊的按鈕與讀數照樣能用。
 *
 * 除錯：document.querySelector('[data-pebalance-lab]').__lab
 *   .sim（createSim 的 S）、.setPose(key, 立即?)、.lean(x, z)、.standUp()、.setView('front'|'side'|'top', 立即?)、
 *   .setSpeed(1|0.5|0.25)、.demo('wide'|'low'|'one'|'lean')、.run(秒)、.render()、.flat（是不是 2D 後備畫面）
 */
import {
  AmbientLight, Color, DirectionalLight, HemisphereLight, PCFShadowMap, PerspectiveCamera, Raycaster, Scene, Vector2, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { HEIGHT, POSES } from './body.js';
import { createSim } from './sim.js';
import { makeFigure, makeFloor, makeMarks } from './figure3d.js';
import { drawFigure, drawGround, drawTop, fitCanvas } from './figure2d.js';
import { initStable } from './stable2d.js';
import { initPush } from './push2d.js';

const DIR = { front: ['forward', '往前'], back: ['backward', '往後'], left: ['to its left', '往它的左邊'], right: ['to its right', '往它的右邊'] };
const VIEWS = {
  front: { pos: [0, 1.55, 3.7], tgt: [0, 0.6, 0] },
  side: { pos: [-3.7, 1.55, 0], tgt: [0, 0.6, 0] },
  top: { pos: [0, 3.3, 0.02], tgt: [0, 0, 0.0] },
};

function initLab(root) {
  const $ = (s) => root.querySelector(s), $$ = (s) => Array.from(root.querySelectorAll(s));
  const cv = $('.al-space-cv'), spaceWrap = $('.al-space');
  const R = { area: $('.pe-area'), cog: $('.pe-cog'), room: $('.pe-room'), meter: $('.pe-meter i'), msg: $('.pe-msg'), fell: $('.pe-fell'),
    tips: { front: $('.pe-tip-front'), back: $('.pe-tip-back'), left: $('.pe-tip-left'), right: $('.pe-tip-right') } };
  const S = createSim('together');
  const state = { view: 'front', labels: true, marks: true, masses: false, drag: false };
  let timers = [], lastTxt = '';

  const say = (en, zh) => { R.msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  const stopAuto = () => { timers.forEach(clearTimeout); timers = []; };
  const later = (sec, fn) => timers.push(setTimeout(fn, (sec * 1000) / S.speed));

  function poseSay(k) {
    const A = S.A, t = A.tips;
    const lo = Math.min(t.front, t.back, t.left, t.right);
    say(`${POSES[k].en}: the base of support is about ${Math.round(A.area * 1e4)} cm², and the center of gravity is ${Math.round(A.com[1] * 100)} cm above the floor. It can lean about ${lo.toFixed(0)}° ${DIR[t.minDir][0]} before it tips.`,
        `${POSES[k].zh}：支撐底面大約 ${Math.round(A.area * 1e4)} 平方公分，重心離地 ${Math.round(A.com[1] * 100)} 公分。${DIR[t.minDir][1]}大約歪 ${lo.toFixed(0)}° 就會倒。`);
  }
  function setPose(k, instant, quiet) {
    S.setPose(k, instant);
    $$('[data-pose]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.pose === k ? 'true' : 'false'));
    root.classList.remove('pe-is-fallen');
    if (!quiet) {
      if (instant) poseSay(k);
      else later(1.0, () => { if (S.key === k && !S.fall) poseSay(k); });
    }
  }
  function standUp() {
    S.standUp();
    root.classList.remove('pe-is-fallen');
  }
  S.onFall = (f) => {
    root.classList.add('pe-is-fallen');
    const d = Math.abs(f.dir[0]) > Math.abs(f.dir[1]) ? (f.dir[0] > 0 ? 'left' : 'right') : (f.dir[1] > 0 ? 'front' : 'back');
    say(`It tipped ${DIR[d][0]}. The gold dot, straight below the center of gravity, moved past the edge of the green base of support. Press Stand up to try again.`,
        `它${DIR[d][1]}倒了。重心正下方的金點，越過了綠色支撐底面的邊緣。按「站起來」再試一次。`);
  };

  // ── 讀數 ──────────────────────────────────────────────────────────────
  function readout() {
    const A = S.A, t = A.tips, down = !!S.fall;
    const cm = down ? 0 : Math.max(0, A.margin * 100);
    const lo = down ? 0 : Math.min(t.front, t.back, t.left, t.right);
    const txt = `${Math.round(A.area * 1e4)}|${Math.round(S.com[1] * 100)}|${cm.toFixed(1)}|${lo.toFixed(0)}|${down}|${t.front.toFixed(0)}${t.back.toFixed(0)}${t.left.toFixed(0)}${t.right.toFixed(0)}`;
    if (txt === lastTxt) return;
    lastTxt = txt;
    R.area.innerHTML = `${Math.round(A.area * 1e4)} <small>cm²</small>`;
    R.cog.innerHTML = `${Math.round(S.com[1] * 100)} <small>cm · ${Math.round((S.com[1] / HEIGHT) * 100)}% of its height</small>`;
    R.room.innerHTML = down ? '0 <small>cm · tipped over 倒了</small>' : `${cm.toFixed(1)} <small>cm to the edge · about ${lo.toFixed(0)}°</small>`;
    R.meter.style.width = `${Math.min(100, (cm / 11) * 100)}%`;
    R.meter.className = down || cm < 1.5 ? 'is-low' : cm < 4 ? 'is-mid' : '';
    for (const k of Object.keys(R.tips)) R.tips[k].textContent = down ? '0°' : `${t[k].toFixed(0)}°`;
  }

  // ── 3D ───────────────────────────────────────────────────────────────
  function make3D() {
    let renderer;
    try { renderer = new WebGLRenderer({ canvas: cv, antialias: true }); } catch (e) { return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = PCFShadowMap;
    const scene = new Scene();
    scene.background = new Color(0x0b1326);
    const camera = new PerspectiveCamera(30, 1, 0.05, 200);
    const controls = new OrbitControls(camera, cv);
    controls.enableDamping = true; controls.dampingFactor = 0.08; controls.enablePan = false;
    controls.minDistance = 2.2; controls.maxDistance = 9;
    controls.minPolarAngle = 0.01; controls.maxPolarAngle = Math.PI * 0.495;
    scene.add(new HemisphereLight(0xdfe8ff, 0x1a1410, 0.85));
    scene.add(new AmbientLight(0xffffff, 0.22));
    const sun = new DirectionalLight(0xfff1dc, 1.35);
    sun.position.set(2.5, 6, 4); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -2.6, right: 2.6, top: 2.6, bottom: -2.6, near: 0.5, far: 16 });
    sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.02;
    scene.add(sun);
    scene.add(makeFloor());
    const figure = makeFigure(); scene.add(figure.group);
    const marks = makeMarks(); scene.add(marks.group);
    const lab = labeler($('.al-labels'), cv, camera);
    const L = { cog: lab.add('pe-lb pe-lb-cog', 'Center of gravity<small>重心</small>'), base: lab.add('pe-lb pe-lb-base', 'Base of support<small>支撐底面</small>') };
    const v3 = new Vector3(), side = new Vector3(), right = new Vector3(), away = new Vector3(), up = new Vector3();

    // 鏡頭：三個固定的看法之間平順地移動
    let camAnim = null;
    function goView(name, instant) {
      const v = VIEWS[name], far = camera.aspect < 0.9 ? 1.5 : camera.aspect < 1.25 ? 1.2 : 1;
      const pos = new Vector3(v.pos[0] * far, v.pos[1] * (name === 'top' ? far : 1), v.pos[2] * far), tgt = new Vector3(...v.tgt);
      if (instant) { camera.position.copy(pos); controls.target.copy(tgt); controls.update(); camAnim = null; return; }
      camAnim = { p0: camera.position.clone(), t0: controls.target.clone(), p1: pos, t1: tgt, t: 0 };
    }
    function tick(dt) {
      if (camAnim) {
        camAnim.t = Math.min(1, camAnim.t + dt / 0.8);
        const e = camAnim.t < 0.5 ? 2 * camAnim.t * camAnim.t : 1 - Math.pow(-2 * camAnim.t + 2, 2) / 2;
        // 繞著人偶轉過去，不是直線穿過去
        const a = camAnim.p0.clone().sub(camAnim.t0), b = camAnim.p1.clone().sub(camAnim.t1);
        const r = a.length() + (b.length() - a.length()) * e;
        v3.copy(a).normalize().lerp(b.clone().normalize(), e);
        if (v3.lengthSq() < 1e-6) v3.set(0, 1, 0);
        v3.normalize().multiplyScalar(r);
        controls.target.lerpVectors(camAnim.t0, camAnim.t1, e);
        camera.position.copy(controls.target).add(v3);
        if (camAnim.t >= 1) camAnim = null;
      }
      controls.update();
    }
    function render() {
      figure.set(S.J);
      marks.group.visible = state.marks;
      marks.set(S.A, { ok: S.ok, com: S.com, parts: S.parts, masses: state.masses, camera, onTop: camera.position.y - controls.target.y > 0.9 * camera.position.distanceTo(controls.target) });
      const showL = state.labels && state.marks && !root.classList.contains('pe-narrow');
      L.cog.style.display = L.base.style.display = showL ? '' : 'none';
      if (showL) {
        // 重心的標籤放在人偶旁邊（往畫面右邊挪 38 公分），不要蓋住身體
        side.setFromMatrixColumn(camera.matrixWorld, 0);
        lab.place(L.cog, v3.set(S.com[0], S.com[1], S.com[2]).addScaledVector(side, 0.38), 0);
        let bx = 0, bz = 0; for (const p of S.A.base) { bx += p[0]; bz += p[1]; }
        const n = S.A.base.length || 1;
        lab.place(L.base, v3.set(bx / n, 0, bz / n + 0.12), 26);
      }
      renderer.render(scene, camera);
    }

    // 拖動人偶：往畫面的哪一邊拖，它就往那一邊歪（每個像素 0.11°）
    const ray = new Raycaster(), ptr = new Vector2();
    const hit = (e) => {
      const r = cv.getBoundingClientRect();
      ptr.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ptr, camera);
      return ray.intersectObjects(figure.meshes, false).length > 0;
    };
    let drag = null;
    cv.addEventListener('pointerdown', (e) => {
      if (S.fallen) { stopAuto(); standUp(); return; }
      if (S.fall || !hit(e)) return;
      stopAuto();
      controls.enabled = false; camAnim = null;
      right.setFromMatrixColumn(camera.matrixWorld, 0); right.y = 0; right.normalize();
      up.setFromMatrixColumn(camera.matrixWorld, 1); up.y = 0;
      away.setFromMatrixColumn(camera.matrixWorld, 2).multiplyScalar(-1); away.y = 0; away.add(up).normalize();
      drag = { x: e.clientX, y: e.clientY, sx: S.target.x, sz: S.target.z, id: e.pointerId };
      try { cv.setPointerCapture(e.pointerId); } catch (err) { /* 舊瀏覽器 */ }
      root.classList.add('pe-dragging'); root.classList.remove('al-fresh');
      e.preventDefault();
    }, true);
    cv.addEventListener('pointermove', (e) => {
      if (!drag) { cv.style.cursor = !S.fall && hit(e) ? 'grab' : ''; return; }
      const dx = (e.clientX - drag.x) * 0.11, dy = -(e.clientY - drag.y) * 0.11;
      S.lean(drag.sx + right.x * dx + away.x * dy, drag.sz + right.z * dx + away.z * dy);
    });
    const end = () => {
      if (!drag) return;
      drag = null; controls.enabled = true; root.classList.remove('pe-dragging');
      if (!S.fall) {
        S.lean(0, 0);
        say('You let go, and it swung back upright: the center of gravity never left the base of support. Drag it farther to find the tipping point.',
            '你一放手，它就站回來了：重心一直沒有離開支撐底面。再拖遠一點，找出會倒的那一刻。');
      }
    };
    cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);
    $('.al-home').addEventListener('click', () => { goView(state.view, false); });

    let band0 = null;
    function resize() {
      const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
      root.classList.toggle('pe-narrow', w < 420);
      const band = camera.aspect < 0.9 ? 0 : camera.aspect < 1.25 ? 1 : 2;
      if (band !== band0) { band0 = band; goView(state.view, true); }
    }
    new ResizeObserver(resize).observe(spaceWrap);
    resize();
    return { camera, controls, scene, render, tick, goView, figure, marks };
  }

  // ── 沒有 WebGL：用 2D 畫同一個人偶 ────────────────────────────────────
  function make2D() {
    const flat = document.createElement('canvas');
    flat.className = 'pe-flat';
    flat.setAttribute('aria-label', cv.getAttribute('aria-label') || '');
    spaceWrap.insertBefore(flat, cv);
    function render() {
      const { g, w, h } = fitCanvas(flat);
      g.clearRect(0, 0, w, h);
      if (state.view === 'top') {
        const A = S.fall ? { ...S.A, com: S.com, inside: false } : S.A;
        drawTop(g, S.A.J, A, { ox: w / 2, oy: h / 2, scale: Math.min(w, h) / 1.3 });
        return;
      }
      const scale = Math.min((h - 60) / 1.55, w / 3.2);
      const o = { view: state.view, ox: w / 2, oy: h - 36, scale };
      drawGround(g, { ...o, base: S.A.base, com: S.com, show: state.marks, w: w * 0.9 });
      drawFigure(g, S.J, o);
      if (state.marks) drawGround(g, { ...o, base: S.A.base, com: S.com, show: true, w: 0, line: 'rgba(0,0,0,0)' });
    }
    if (window.ResizeObserver) new ResizeObserver(render).observe(spaceWrap);
    return { render, tick() {}, goView() {} };
  }

  let view = make3D();
  const flat = !view;
  if (flat) { view = make2D(); root.classList.add('pe-flat-on'); }

  function setView(name, instant) {
    state.view = name;
    $$('[data-view]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.view === name ? 'true' : 'false'));
    view.goView(name, instant);
  }
  function setSpeed(v) {
    S.speed = v;
    $$('[data-speed]').forEach((b) => b.setAttribute('aria-pressed', +b.dataset.speed === v ? 'true' : 'false'));
  }

  // ── 右邊的按鈕 ────────────────────────────────────────────────────────
  $$('[data-pose]').forEach((b) => b.addEventListener('click', () => { stopAuto(); root.classList.remove('al-fresh'); setPose(b.dataset.pose); }));
  $$('[data-view]').forEach((b) => b.addEventListener('click', () => setView(b.dataset.view)));
  $$('[data-speed]').forEach((b) => b.addEventListener('click', () => setSpeed(+b.dataset.speed)));
  const STEP = { front: [0, 2], back: [0, -2], left: [2, 0], right: [-2, 0] };
  $$('[data-lean]').forEach((b) => b.addEventListener('click', () => {
    stopAuto(); root.classList.remove('al-fresh');
    if (S.fall) return;
    const d = STEP[b.dataset.lean];
    S.nudge(d[0], d[1]);
    later(0.5, () => {
      if (S.fall) return;
      const A = S.A;
      say(`Leaning ${DIR[b.dataset.lean][0]}. The gold dot is ${Math.max(0, A.margin * 100).toFixed(1)} cm from the edge of the base. Keep pressing, and watch the dot.`,
          `${DIR[b.dataset.lean][1]}歪。金點離支撐底面的邊緣還有 ${Math.max(0, A.margin * 100).toFixed(1)} 公分。繼續按，盯著金點看。`);
    });
  }));
  $('.pe-up').addEventListener('click', () => {
    stopAuto();
    const was = !!S.fall;
    standUp();
    if (was) later(1.2, () => poseSay(S.key)); else poseSay(S.key);
  });
  R.fell.addEventListener('click', () => { stopAuto(); standUp(); later(1.2, () => poseSay(S.key)); });
  const tg = (k) => root.querySelector(`[data-t="${k}"]`);
  for (const k of ['labels', 'marks', 'masses']) {
    const el = tg(k);
    if (el) { state[k] = el.checked; el.addEventListener('change', () => { state[k] = el.checked; }); }
  }

  // ── 卡片上的「在模型中看」 ────────────────────────────────────────────
  const DEMO = {
    wide() {
      stopAuto(); setView('top'); setPose('together', false, true);
      say('Feet together, seen from above. The green shape on the floor is the base of support: everything between and under the two feet.',
          '雙腳併攏，從正上方看。地上的綠色區域就是支撐底面：兩隻腳底下、加上兩腳之間的整片範圍。');
      later(3.2, () => { const a0 = Math.round(S.A.area * 1e4); setPose('apart', false, true);
        later(1.3, () => say(`Now the feet are apart. The base grew from about ${a0} cm² to about ${Math.round(S.A.area * 1e4)} cm², and the gold dot is far from the left and right edges.`,
          `現在把腳張開。支撐底面從大約 ${a0} 平方公分變成大約 ${Math.round(S.A.area * 1e4)} 平方公分，金點離左右兩邊的邊緣都很遠。`)); });
    },
    low() {
      stopAuto(); setView('front'); setPose('wide', false, true);
      say('Feet wide, legs straight. Watch the gold ball, the center of gravity, when the knees bend.',
          '雙腳大大張開、腿打直。注意金色的球，也就是重心；看膝蓋彎下去的時候它怎麼動。');
      later(3.2, () => { const h0 = Math.round(S.com[1] * 100); setPose('horse', false, true);
        later(1.3, () => say(`Horse stance: the feet did not move, but the center of gravity dropped from ${h0} cm to ${Math.round(S.com[1] * 100)} cm. A lower body has to lean farther before the dot reaches the edge.`,
          `馬步：腳沒有動，重心卻從 ${h0} 公分降到 ${Math.round(S.com[1] * 100)} 公分。身體越低，要歪得越多，金點才會到邊緣。`)); });
    },
    one() {
      stopAuto(); setView('front'); setPose('oneLeg', false, true);
      say('On one foot, the base of support is only as big as that one foot. Watch how the whole body shifts sideways to bring the gold dot over it.',
          '單腳站的時候，支撐底面只有那一隻腳那麼大。看整個身體怎麼往旁邊移，把金點帶到那隻腳的上方。');
      later(3.4, () => { say('Now a small lean to the side: only a few degrees.', '現在往旁邊歪一點點：只有幾度。');
        const go = () => { if (S.fall) return; S.nudge(-1, 0); later(0.45, go); }; go(); });
    },
    lean() {
      stopAuto(); setView('side'); setPose('apart', false, true);
      say('Seen from the side. The figure leans forward a little at a time. Watch the gold dot on the floor move toward the toes.',
          '從側面看。人偶一點一點往前歪。看地上的金點往腳尖移動。');
      later(2.2, () => { const go = () => { if (S.fall) return; S.nudge(0, 1); later(0.4, go); }; go(); });
    },
  };

  // ── 每一格 ────────────────────────────────────────────────────────────
  let raf = 0, last = 0, visible = false;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000); last = t;
    S.step(dt);
    readout();
    view.tick(dt); view.render();
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
    if (!visible) stopAuto();
  }, { rootMargin: '120px' }).observe(root);

  setSpeed(1); setView('front', true); setPose('together', true);
  say('The figure is standing with its feet together. Drag it, or press the lean buttons, and watch the gold dot on the floor. Then try another pose.',
      '人偶雙腳併攏站著。拖動它，或按「讓它歪」的按鈕，看地上的金點。再換一個姿勢試試。');
  readout(); view.render();
  root.classList.add('al-ready', 'al-fresh');

  root.__lab = {
    sim: S, state, view, flat,
    setPose, standUp, setView, setSpeed,
    lean: (x, z) => S.lean(x, z),
    demo: (v) => DEMO[v] && DEMO[v](),
    run: (sec) => { for (let t = 0; t < sec; t += 1 / 60) { S.step(1 / 60); view.tick(1 / 60); } readout(); },
    render: () => view.render(),
    stopAuto,
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() {
  const s = document.querySelector('[data-pe-stable]'); if (s) initStable(s);
  const p = document.querySelector('[data-pe-push]'); if (p) initPush(p);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-pebalance-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
