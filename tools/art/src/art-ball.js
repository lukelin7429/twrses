/*
 * 美術 Art · 第三課〈明暗怎麼把圓形變成球？〉：桌面上一顆球，一盞可以拖動的燈。
 *
 * 一個機制：亮面、暗面、反光、影子，全部跟著光源走。同一個圓，加上從亮到暗的變化，看起來就是一顆球。
 *
 * 顏色要對：球和桌面都用自己的著色器，直接輸出 shade.js 的公式算出來的灰（不經過場景燈光、色調映射或色彩空間轉換）。
 * 三種看法：ball（連續的明暗）、steps（分成 3／5／7 階，像鉛筆素描）、flat（沒有明暗，只是一個平面的圓）。
 * 燈當成很遠的平行光（只看方向）；畫面上的燈只是標出光從哪裡來。
 *
 * 除錯：document.querySelector('[data-artball-lab]').__lab
 *   state、setLight(az, el)、setMode('ball'|'steps'|'flat')、setSteps(3|5|7)、valueAt(n)＝公式算的 0–255、
 *   pixelAt(n)＝畫面上球面那一點實際的像素、tableAt(x, z)／tablePixel(x, z)、landmarks()、demo('flat'|'around'|'low'|'steps')、
 *   run(秒)、render()、goCam()
 */
import {
  BufferGeometry, CircleGeometry, Color, ConeGeometry, CylinderGeometry, DoubleSide, Float32BufferAttribute, Group, Line, LineDashedMaterial,
  MathUtils, Mesh, MeshBasicMaterial, PerspectiveCamera, Raycaster, Scene, ShaderMaterial, Sphere, SphereGeometry, Vector2, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import {
  AMBIENT, BALL_R, BOUNCE, DIFFUSE, SHINE, SPEC, TABLE, VIEW, ballValue, castShadow, describeLight, landmarks, lightDir, lightness, quantize,
  tableValue, zoneOf,
} from './shade.js';
import { initLamp, initSort } from './shade2d.js';

const V = (x, y, z) => new Vector3(x, y, z);
const C = V(0, BALL_R, 0);                // 球心
const LAMP_D = 3.1;                       // 畫面上的燈離球心多遠（只是標示）
const FLAT_BALL = 0.62, FLAT_TABLE = 0.34;
const fx = (v, n = 3) => v.toFixed(n);

const VERT = `
varying vec3 vN; varying vec3 vW;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vW = w.xyz; vN = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * w;
}`;
const COMMON = `
precision highp float;
varying vec3 vN; varying vec3 vW;
uniform vec3 uL; uniform float uSteps; uniform float uFlat;
float steps(float v) {
  if (uSteps < 1.5) return v;
  float k = min(uSteps - 1.0, floor(clamp(v, 0.0, 1.0) * uSteps));
  return k / (uSteps - 1.0);
}`;
const BALL_FRAG = `${COMMON}
void main() {
  vec3 n = normalize(vN);
  float ndl = dot(n, uL);
  float v = ${fx(AMBIENT)} + ${fx(DIFFUSE)} * max(0.0, ndl);
  v += ${fx(BOUNCE)} * max(0.0, -n.y) * (1.0 - smoothstep(-0.35, 0.15, ndl)) * max(0.0, uL.y);
  if (ndl > 0.0) {
    vec3 h = normalize(uL + normalize(cameraPosition - vW));
    v += ${fx(SPEC)} * pow(max(0.0, dot(n, h)), ${fx(SHINE, 1)});
  }
  v = steps(clamp(v, 0.0, 1.0));
  v = mix(v, ${fx(FLAT_BALL)}, uFlat);
  gl_FragColor = vec4(vec3(v), 1.0);
}`;
const TABLE_FRAG = `${COMMON}
void main() {
  float lit = ${fx(AMBIENT)} + ${fx(TABLE)} * max(0.0, uL.y);
  vec3 pc = vec3(-vW.x, ${fx(BALL_R)}, -vW.z);
  float t = dot(pc, uL);
  float v = lit;
  if (t > 0.0) {
    float d = length(pc - uL * t);
    float open = smoothstep(${fx(BALL_R - 0.07)}, ${fx(BALL_R + 0.07)}, d);
    v = ${fx(AMBIENT + 0.03)} + (lit - ${fx(AMBIENT + 0.03)}) * open;
  }
  v = steps(clamp(v, 0.0, 1.0));
  v = mix(v, ${fx(FLAT_TABLE)}, uFlat);
  gl_FragColor = vec4(vec3(v), 1.0);
}`;

const ZONES = {
  highlight: ['Highlight', '亮點'],
  light: ['Light side', '亮面'],
  halftone: ['Halftone', '半色調'],
  core: ['Core shadow', '最暗的一圈'],
  reflected: ['Reflected light', '反光'],
  shadow: ['Shadow side', '暗面'],
  cast: ['Cast shadow', '投影'],
};
const SIDE = { left: ['the left', '左邊'], right: ['the right', '右邊'], front: ['the front', '前面'], behind: ['behind the ball', '球的後面'] };
const HEIGHT = { low: ['low', '很低'], middle: ['at middle height', '中等高度'], high: ['high', '很高'] };

function initLab(root) {
  const $ = (s) => root.querySelector(s), $$ = (s) => Array.from(root.querySelectorAll(s));
  const cv = $('.al-space-cv'), spaceWrap = $('.al-space');
  const state = { az: -55, el: 50, mode: 'ball', steps: 5, probe: null };
  const R = { az: $('[data-s="az"]'), el: $('[data-s="el"]'), azv: $('.ar-bl-azv'), elv: $('.ar-bl-elv'), from: $('.ar-bl-from'), range: $('.ar-bl-range'), probe: $('.ar-probe'), msg: $('.ar-msg'), stepsRow: $('.ar-bl-steps') };
  const bi = (en, zh) => `${en}<span class="zh">${zh}</span>`;
  const say = (en, zh) => { R.msg.innerHTML = bi(en, zh); };
  const L = () => lightDir(state.az, state.el);
  const shown = (v, flat) => (state.mode === 'flat' ? flat : state.mode === 'steps' ? quantize(v, state.steps)[1] : v);

  let dirty = true, view = null, timers = [], glide = null;
  const touch = () => { dirty = true; };
  const stopAuto = () => { timers.forEach(clearTimeout); timers = []; glide = null; };
  const play = (list) => { timers.forEach(clearTimeout); timers = list.map((s) => setTimeout(s.fn, s.at * 1000)); };

  function refresh() {
    const l = L(), d = describeLight(state.az, state.el), s = SIDE[d.side], h = HEIGHT[d.height];
    root.setAttribute('data-mode', state.mode);
    $$('[data-mode-pick]').forEach((b) => b.setAttribute('aria-pressed', String(b.getAttribute('data-mode-pick') === state.mode)));
    $$('[data-steps]').forEach((b) => b.setAttribute('aria-pressed', String(Number(b.getAttribute('data-steps')) === state.steps)));
    R.stepsRow.hidden = state.mode !== 'steps';
    R.az.value = Math.round(state.az); R.el.value = Math.round(state.el);
    R.azv.textContent = `${Math.round(state.az)}°`; R.elv.textContent = `${Math.round(state.el)}°`;
    R.from.innerHTML = bi(`The light comes from ${s[0]}, ${h[0]}.`, `光從${s[1]}來，位置${h[1]}。`);
    const m = landmarks(l), hi = shown(ballValue(m.highlight, l), FLAT_BALL), lo = shown(ballValue(m.core, l), FLAT_BALL), sh = castShadow(l);
    R.range.innerHTML = state.mode === 'flat'
      ? bi(`Every point of the circle is the same gray, L* ${lightness(FLAT_BALL).toFixed(0)}. Nothing tells your eye that it is round.`, `圓上每一點都是同一個灰，L* ${lightness(FLAT_BALL).toFixed(0)}。沒有任何線索告訴眼睛它是圓鼓鼓的。`)
      : bi(`Lightest point on the ball: L* ${lightness(hi).toFixed(0)}. Darkest band: L* ${lightness(lo).toFixed(0)}. The shadow on the table is ${sh.major.toFixed(1)} times as long as the ball is wide.`, `球上最亮的地方 L* ${lightness(hi).toFixed(0)}，最暗的一圈 L* ${lightness(lo).toFixed(0)}。桌上的影子長度是球寬的 ${sh.major.toFixed(1)} 倍。`);
    showProbe();
    if (view) view.sync();
    touch();
  }
  function showProbe() {
    const l = L();
    const n = state.probe || landmarks(l, view ? view.viewDir() : VIEW).halftone;
    const z = state.mode === 'flat' ? null : zoneOf(n, l, view ? view.viewDir() : VIEW);
    const v = shown(ballValue(n, l, view ? view.viewDir() : VIEW), FLAT_BALL), g = Math.round(v * 255);
    R.probe.querySelector('.ar-sw').style.background = `rgb(${g}, ${g}, ${g})`;
    R.probe.querySelector('.ar-pr-n').innerHTML = z ? `${ZONES[z][0]} <span class="zh">${ZONES[z][1]}</span>` : 'Flat gray <span class="zh">平塗的灰</span>';
    R.probe.querySelector('.ar-pr-v').textContent = `Gray ${g} of 255 · L* ${lightness(v).toFixed(0)}`;
  }
  function setLight(az, el, quiet) {
    state.az = ((az + 540) % 360) - 180; state.el = MathUtils.clamp(el, 8, 88);
    if (!quiet) state.probe = null;
    refresh();
  }
  function setMode(m, quiet) {
    if (!['ball', 'steps', 'flat'].includes(m)) return;
    state.mode = m; refresh();
    if (quiet) return;
    if (m === 'flat') say('This is the same ball with every bit of shading taken away. It is now a flat gray circle, and the shadow is gone too. An outline alone cannot tell you whether a thing is flat or round.', '這是同一顆球，只是把所有的明暗都拿掉。它變成一個平面的灰色圓，影子也不見了。光有輪廓，看不出一樣東西是平的還是圓的。');
    else if (m === 'steps') say(`The same light, sorted into ${state.steps} steps of gray, the way you might shade with a pencil. The ball still looks round with only a few steps.`, `同樣的光，把灰分成 ${state.steps} 階，就像用鉛筆一層一層塗。只有幾階，球看起來還是圓的。`);
    else say('The shading is back. The side that faces the lamp is lightest, and the gray gets darker as the surface turns away. Drag the lamp, and everything follows it.', '明暗回來了。朝向燈的那一面最亮，表面越轉離燈，灰就越深。拖動那盞燈，一切都跟著它變。');
  }
  function setSteps(n) { state.steps = n; refresh(); if (state.mode === 'steps') say(`${n} steps of gray. With fewer steps the edges between them are easier to see.`, `分成 ${n} 階的灰。階數越少，階與階之間的邊界越明顯。`); }
  function step(dt) {
    if (!glide) return;
    glide.t = Math.min(glide.dur, glide.t + dt);
    const k = MathUtils.smootherstep(glide.t / glide.dur, 0, 1);
    setLight(glide.a0 + (glide.a1 - glide.a0) * k, glide.e0 + (glide.e1 - glide.e0) * k, true);
    if (glide.t >= glide.dur) { const done = glide.done; glide = null; if (done) done(); }
  }
  const glideTo = (az, el, dur, done) => { glide = { t: 0, dur, a0: state.az, a1: az, e0: state.el, e1: el, done }; touch(); };

  // ── 3D ───────────────────────────────────────────────────────────────
  function make3D() {
    let renderer;
    try { renderer = new WebGLRenderer({ canvas: cv, antialias: true }); } catch (e) { return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const scene = new Scene();
    scene.background = new Color(0x0c0e13);
    const camera = new PerspectiveCamera(36, 1, 0.1, 200);
    const controls = new OrbitControls(camera, cv);
    controls.enableDamping = true; controls.dampingFactor = 0.08; controls.enablePan = false;
    controls.minDistance = 5; controls.maxDistance = 22;
    controls.minPolarAngle = 0.7; controls.maxPolarAngle = 1.45;
    controls.minAzimuthAngle = -1.0; controls.maxAzimuthAngle = 1.0;
    const TARGET = V(0, 1.45, 0);
    const homePos = () => {
      const t = Math.tan(MathUtils.degToRad(camera.fov / 2));
      const d = Math.max(3.5 / (t * camera.aspect), 2.7 / t);
      return V(VIEW[0], VIEW[1], VIEW[2]).normalize().multiplyScalar(d).add(TARGET);
    };
    const U = { uL: { value: V(0, 1, 0) }, uSteps: { value: 1 }, uFlat: { value: 0 } };
    const ball = new Mesh(new SphereGeometry(BALL_R, 96, 64), new ShaderMaterial({ uniforms: U, vertexShader: VERT, fragmentShader: BALL_FRAG }));
    ball.position.copy(C); scene.add(ball);
    const table = new Mesh(new CircleGeometry(11, 96), new ShaderMaterial({ uniforms: U, vertexShader: VERT, fragmentShader: TABLE_FRAG }));
    table.rotation.x = -Math.PI / 2; scene.add(table);
    // 平面的圓：加一圈輪廓線（只在 flat 模式顯示）
    const ring = new Mesh(new SphereGeometry(BALL_R * 1.035, 64, 40), new MeshBasicMaterial({ color: 0x0a0b0e, side: 1 }));
    ring.position.copy(C); ring.visible = false; scene.add(ring);

    // 燈（只是標出光的方向）：燈泡、燈罩、指向球心的虛線
    const lamp = new Group();
    const bulb = new Mesh(new SphereGeometry(0.13, 24, 16), new MeshBasicMaterial({ color: 0xfff3c4 }));
    const shadeMesh = new Mesh(new ConeGeometry(0.3, 0.36, 28, 1, true), new MeshBasicMaterial({ color: 0x3a4055, side: DoubleSide }));
    shadeMesh.geometry.translate(0, 0.12, 0).rotateX(-Math.PI / 2);
    const grip = new Mesh(new SphereGeometry(0.6, 12, 8), new MeshBasicMaterial({ visible: false }));
    lamp.add(bulb, shadeMesh, grip); scene.add(lamp);
    const rayGeo = new BufferGeometry(); rayGeo.setAttribute('position', new Float32BufferAttribute([0, 0, 0, 0, 0, 0], 3));
    const rayLine = new Line(rayGeo, new LineDashedMaterial({ color: 0xffd36e, dashSize: 0.16, gapSize: 0.12 }));
    scene.add(rayLine);
    const pole = new Mesh(new CylinderGeometry(0.02, 0.02, 1, 6), new MeshBasicMaterial({ color: 0x2a2f3d }));
    scene.add(pole);
    const probe = new Mesh(new SphereGeometry(0.035, 12, 8), new MeshBasicMaterial({ color: 0xffd36e }));
    scene.add(probe);

    const lab = labeler($('.al-labels'), cv, camera);
    const labs = {};
    ['highlight', 'light', 'halftone', 'core', 'reflected', 'cast'].forEach((k, n) => { labs[k] = lab.add('ar-lb ar-lb-zone', `<i class="ar-lb-num">${n + 1}</i><span class="ar-lb-nm"> ${ZONES[k][0]} <span class="zh">${ZONES[k][1]}</span></span>`); });
    const lampLab = lab.add('ar-lb ar-lb-lamp', 'Lamp <span class="zh">燈</span>');
    let showLabels = true;
    const vd = V(0, 0, 1), p3 = V(0, 0, 0);
    const viewDir = () => { vd.copy(camera.position).sub(C).normalize(); return [vd.x, vd.y, vd.z]; };

    function sync() {
      const l = L(), flat = state.mode === 'flat';
      U.uL.value.set(l[0], l[1], l[2]);
      U.uSteps.value = state.mode === 'steps' ? state.steps : 1;
      U.uFlat.value = flat ? 1 : 0;
      ring.visible = flat;
      lamp.position.set(C.x + l[0] * LAMP_D, C.y + l[1] * LAMP_D, C.z + l[2] * LAMP_D);
      lamp.lookAt(C);
      const a = rayGeo.attributes.position;
      a.setXYZ(0, lamp.position.x, lamp.position.y, lamp.position.z); a.setXYZ(1, C.x + l[0] * 1.06, C.y + l[1] * 1.06, C.z + l[2] * 1.06); a.needsUpdate = true;
      rayLine.computeLineDistances();
      pole.scale.y = lamp.position.y; pole.position.set(lamp.position.x, lamp.position.y / 2, lamp.position.z);
      lamp.visible = rayLine.visible = pole.visible = !flat;
    }
    function render() {
      controls.update();
      renderer.render(scene, camera);
      const l = L(), v = viewDir(), m = landmarks(l, v), flat = state.mode === 'flat';
      // 先決定每張標籤的位置，再把互相重疊的往下推開
      const todo = [];
      for (const k of ['highlight', 'light', 'halftone', 'core', 'reflected', 'cast']) {
        const el = labs[k];
        if (k === 'cast') { el.hidden = !showLabels || flat; if (!el.hidden) todo.push([el, V(m.cast[0], 0, m.cast[2])]); continue; }
        const n = m[k], facing = n[0] * v[0] + n[1] * v[1] + n[2] * v[2];
        el.hidden = !showLabels || flat || facing < 0.2;
        if (!el.hidden) todo.push([el, V(C.x + n[0], C.y + n[1], C.z + n[2])]);
      }
      lampLab.hidden = !showLabels || flat;
      if (!lampLab.hidden) todo.push([lampLab, lamp.position.clone().add(V(0, 0.45, 0))]);
      const boxes = [];
      for (const [el, p] of todo) {
        let dy = 0, box = null;
        for (let tries = 0; tries < 6; tries++) {
          lab.place(el, p, dy);
          const r = el.getBoundingClientRect();
          box = { l: r.left - 3, r: r.right + 3, t: r.top - 2, b: r.bottom + 2 };
          if (!boxes.some((o) => box.l < o.r && box.r > o.l && box.t < o.b && box.b > o.t)) break;
          dy += Math.max(12, (r.bottom - r.top) * 0.8);
        }
        boxes.push(box);
      }
      const pn = state.probe;
      probe.visible = !!pn;
      if (pn) probe.position.set(C.x + pn[0] * 1.01, C.y + pn[1] * 1.01, C.z + pn[2] * 1.01);
    }

    let fly = null;
    function goHome(instant) {
      const p1 = homePos();
      if (instant) { camera.position.copy(p1); controls.target.copy(TARGET); fly = null; touch(); return; }
      fly = { t: 0, p0: camera.position.clone(), p1, t0: controls.target.clone(), t1: TARGET.clone() };
    }
    function tick(dt) {
      if (!fly) return false;
      fly.t = Math.min(1, fly.t + dt / 0.8);
      const k = MathUtils.smootherstep(fly.t, 0, 1);
      camera.position.lerpVectors(fly.p0, fly.p1, k); controls.target.lerpVectors(fly.t0, fly.t1, k);
      if (fly.t >= 1) fly = null;
      return true;
    }
    controls.addEventListener('change', () => { touch(); });

    // 拖動燈：射線打到以球心為中心、半徑 LAMP_D 的大球面上，取方向
    const ray = new Raycaster(), ndc = new Vector2(), hit = V(0, 0, 0);
    const big = new Sphere(C.clone(), LAMP_D);
    const setRay = (e) => { const r = cv.getBoundingClientRect(); ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1); ray.setFromCamera(ndc, camera); };
    const onLamp = (e) => { setRay(e); return lamp.visible && ray.intersectObject(grip, false).length > 0; };
    const onBall = (e) => { setRay(e); const h = ray.intersectObject(ball, false)[0]; return h ? h.point.clone().sub(C).normalize() : null; };
    function dragTo(e) {
      setRay(e);
      if (!ray.ray.intersectSphere(big, hit)) ray.ray.closestPointToPoint(C, hit);
      const d = hit.sub(C).normalize();
      const el = MathUtils.radToDeg(Math.asin(MathUtils.clamp(d.y, -1, 1))), az = MathUtils.radToDeg(Math.atan2(d.x, d.z));
      setLight(az, el);
    }
    let dragId = null;
    cv.addEventListener('pointerdown', (e) => {
      stopAuto(); root.classList.remove('al-fresh');
      if (!onLamp(e)) return;
      dragId = e.pointerId;
      try { cv.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      controls.enabled = false; cv.style.cursor = 'grabbing';
    }, true);
    cv.addEventListener('pointermove', (e) => {
      if (dragId !== null && e.pointerId === dragId) { dragTo(e); return; }
      if (e.pointerType !== 'mouse') return;
      cv.style.cursor = onLamp(e) ? 'grab' : '';
      const n = onBall(e);
      if (n) { state.probe = [n.x, n.y, n.z]; showProbe(); touch(); }
    });
    const end = (e) => {
      if (dragId === null || (e && e.pointerId !== dragId)) {
        if (e && e.type === 'pointerup' && e.pointerType !== 'mouse') { const n = onBall(e); if (n) { state.probe = [n.x, n.y, n.z]; showProbe(); touch(); } }
        return;
      }
      dragId = null; controls.enabled = true; cv.style.cursor = '';
    };
    cv.addEventListener('pointerup', end);
    cv.addEventListener('pointercancel', end);
    $('.al-home').addEventListener('click', () => { goHome(false); touch(); });

    let aspect0 = 0;
    function resize() {
      const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
      root.classList.toggle('ar-narrow', w < 520);
      if (Math.abs(camera.aspect - aspect0) > 0.04) { aspect0 = camera.aspect; goHome(true); }
      touch();
    }
    new ResizeObserver(resize).observe(spaceWrap);
    resize();

    const px = new Uint8Array(4);
    function readAt(p) {
      const keep = [probe.visible, lamp.visible, rayLine.visible, pole.visible];
      probe.visible = lamp.visible = rayLine.visible = pole.visible = false;
      controls.update(); renderer.render(scene, camera);
      p3.copy(p).project(camera);
      const gl = renderer.getContext();
      gl.readPixels(Math.round((p3.x * 0.5 + 0.5) * cv.width), Math.round((p3.y * 0.5 + 0.5) * cv.height), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
      [probe.visible, lamp.visible, rayLine.visible, pole.visible] = keep; touch();
      return [px[0], px[1], px[2]];
    }
    return {
      camera, controls, sync, render, tick, goHome, viewDir,
      pixelAt: (n) => readAt(V(C.x + n[0], C.y + n[1], C.z + n[2])),
      tablePixel: (x, z) => readAt(V(x, 0, z)),
      setLabels: (v) => { showLabels = v; touch(); },
    };
  }
  view = make3D();
  if (!view) root.classList.add('al-nogl');

  // ── 右邊的按鈕與滑桿 ──────────────────────────────────────────────────
  R.az.addEventListener('input', () => { stopAuto(); setLight(Number(R.az.value), state.el); });
  R.el.addEventListener('input', () => { stopAuto(); setLight(state.az, Number(R.el.value)); });
  $$('[data-mode-pick]').forEach((b) => b.addEventListener('click', () => { stopAuto(); setMode(b.getAttribute('data-mode-pick')); }));
  $$('[data-steps]').forEach((b) => b.addEventListener('click', () => { stopAuto(); setSteps(Number(b.getAttribute('data-steps'))); }));
  const tgL = $('[data-t="labels"]');
  if (tgL) tgL.addEventListener('change', () => view && view.setLabels(tgL.checked));

  const DEMO = {
    flat() {
      stopAuto(); setLight(-55, 50, true); setMode('flat');
      play([{ at: 4.5, fn: () => setMode('ball') }]);
    },
    around() {
      stopAuto(); setMode('ball', true); setLight(-100, 45, true);
      say('The lamp travels around the ball at the same height. Watch the light side, the dark side, and the shadow on the table swing around with it.', '燈在同樣的高度繞著球走。看亮面、暗面和桌上的影子跟著它一起轉。');
      glideTo(100, 45, 9, () => say('The lamp is now on the right, so the light side is on the right and the shadow falls to the left.', '燈現在在右邊，所以亮面在右邊，影子落在左邊。'));
    },
    low() {
      stopAuto(); setMode('ball', true); setLight(-60, 75, true);
      say('A high lamp gives a short shadow close under the ball. Now the lamp comes down.', '燈很高的時候，影子很短，就在球的正下方附近。現在燈要降下來。');
      play([{ at: 2.5, fn: () => glideTo(-60, 14, 6, () => say('A low lamp gives a long shadow, and more of the ball is in shade. The same thing happens to your own shadow late in the afternoon.', '燈很低的時候，影子拉得很長，球上暗的部分也變多。傍晚時你自己的影子也是這樣。')) }]);
    },
    steps() {
      stopAuto(); setLight(-55, 50, true); state.steps = 7; setMode('steps');
      play([{ at: 4, fn: () => setSteps(5) }, { at: 8, fn: () => setSteps(3) }]);
    },
  };

  let raf = 0, last = 0, visible = false;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    step(dt);
    if (view) { if (view.tick(dt)) dirty = true; if (dirty) { dirty = false; view.render(); } }
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; dirty = true; raf = requestAnimationFrame(frame); }
    if (!visible) stopAuto();
  }, { rootMargin: '120px' }).observe(root);

  refresh();
  say('A ball on a table, and one lamp. Drag the lamp, or use the two sliders, and watch the light, the shade, and the shadow follow it. Point at the ball to read how light that spot is.', '桌上一顆球，一盞燈。拖動那盞燈，或用兩根滑桿，看亮面、暗面和影子跟著它變。指著球上的一點，就能讀出那裡有多亮。');
  root.classList.add('al-ready', 'al-fresh');

  const g255 = (v) => Math.round(v * 255);
  root.__lab = {
    state, view, setLight, setMode, setSteps,
    valueAt: (n) => g255(shown(ballValue(n, L(), view ? view.viewDir() : VIEW), FLAT_BALL)),
    pixelAt: (n) => (view ? view.pixelAt(n) : null),
    tableAt: (x, z) => g255(shown(tableValue(x, z, L()), FLAT_TABLE)),
    tablePixel: (x, z) => (view ? view.tablePixel(x, z) : null),
    landmarks: () => landmarks(L(), view ? view.viewDir() : VIEW),
    shadow: () => castShadow(L()),
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => view && view.goHome(true),
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { if (view) view.render(); },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() {
  const a = document.querySelector('[data-ar-lamp]'); if (a) initLamp(a);
  const b = document.querySelector('[data-ar-sort]'); if (b) initSort(b);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-artball-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
