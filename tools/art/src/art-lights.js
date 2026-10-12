/*
 * 美術 Art · 第一課〈顏料和光，混色為什麼不一樣？〉：暗房裡的三盞聚光燈，和同一面牆上的三片顏料色片。
 *
 * 一個機制：光越加越亮（紅＋綠＋藍＝白），顏料越加越暗（黃＋洋紅＋青＝接近黑）。
 *
 * 顏色要對：牆面用自己的著色器，直接輸出 lights.js 的公式算出來的數字（不經過場景燈光、色調映射或色彩空間轉換），
 * 所以紅＋綠重疊的像素就是 (255, 255, 0)。房間裡其他東西都用 MeshBasicMaterial，不受光照影響。
 * 顏料的模式是示意模型（color.js 的 PIGMENTS）：螢幕只會發光，不會變成顏料。
 *
 * 除錯：document.querySelector('[data-artlights-lab]').__lab
 *   state、setMode('light'|'paint')、setK(i, 0–1)、setOn(i, bool)、setLayout('venn'|'together'|'apart'|'pair', 立刻?)、
 *   setObj(bool)、colorAt(x, y)＝公式算的顏色、pixelAt(x, y)＝畫面上實際讀到的像素、regions()、screenOf(x, y)、
 *   demo('add'|'dim'|'shadow'|'paint')、run(秒)、render()、goCam()
 */
import {
  AdditiveBlending, BoxGeometry, CircleGeometry, Color, ConeGeometry, CylinderGeometry, DoubleSide, Group, MathUtils, Mesh,
  MeshBasicMaterial, PerspectiveCamera, Plane, PlaneGeometry, Raycaster, RingGeometry, Scene, ShaderMaterial, SphereGeometry,
  Vector2, Vector3, Vector4, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { LIGHTS, PIGMENTS, colorName, css, inkOn, mixLight, mixPaint, pct, to255 } from './color.js';
import {
  LAMPS, LAYOUTS, OBJ, SOFT_LIGHT, SOFT_PAINT, SOFT_SHADOW, SPOT_R, WALL, clampSpot, regions, shadowOnWall, smoothstep, wallColor,
} from './lights.js';
import { initMatch } from './match2d.js';
import { initZoom } from './zoom2d.js';

const V = (x, y, z) => new Vector3(x, y, z);
const MIXES = [3, 6, 5, 7];                         // 右邊欄列出的四種重疊（bit：1＝第一個、2＝第二個、4＝第三個）
const bits = (k) => [0, 1, 2].filter((i) => k & (1 << i));

const WALL_VERT = `
varying vec2 vP;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vP = w.xy;
  gl_Position = projectionMatrix * viewMatrix * w;
}`;
const WALL_FRAG = `
precision highp float;
varying vec2 vP;
uniform float uMode, uR, uObjOn;
uniform vec2 uC[3];
uniform float uK[3];
uniform vec3 uCol[3];
uniform vec3 uAbs[3];
uniform vec3 uLamp[3];
uniform vec4 uObj;
float spot(vec2 c, float soft) { return 1.0 - smoothstep(uR - soft, uR, distance(vP, c)); }
float shadow(vec3 P, vec3 L) {
  vec3 d = L - P; float len = length(d); vec3 u = d / len;
  vec3 pc = uObj.xyz - P; float t = dot(pc, u);
  if (t <= 0.0 || t >= len) return 1.0;
  return smoothstep(uObj.w - ${SOFT_SHADOW.toFixed(3)}, uObj.w + ${SOFT_SHADOW.toFixed(3)}, length(pc - u * t));
}
void main() {
  vec3 P = vec3(vP, 0.0);
  vec3 col;
  if (uMode < 0.5) {
    col = vec3(0.0);
    for (int i = 0; i < 3; i++) {
      float m = spot(uC[i], ${SOFT_LIGHT.toFixed(3)}) * uK[i];
      if (uObjOn > 0.5) m *= shadow(P, uLamp[i]);
      col += uCol[i] * m;
    }
  } else {
    col = vec3(1.0);
    for (int i = 0; i < 3; i++) {
      float m = spot(uC[i], ${SOFT_PAINT.toFixed(3)}) * uK[i];
      col *= 1.0 - m * uAbs[i];
    }
  }
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`;
const BALL_VERT = `
varying vec3 vN; varying vec3 vW;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vW = w.xyz; vN = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * w;
}`;
const BALL_FRAG = `
precision highp float;
varying vec3 vN; varying vec3 vW;
uniform vec3 uLamp[3];
uniform vec3 uKc[3];
uniform float uFlat;
void main() {
  vec3 n = normalize(vN);
  vec3 col = vec3(0.035);
  for (int i = 0; i < 3; i++) col += uKc[i] * max(dot(n, normalize(uLamp[i] - vW)), 0.0);
  col = mix(col, vec3(0.62, 0.64, 0.68) * (0.55 + 0.45 * max(dot(n, normalize(vec3(0.3, 0.6, 1.0))), 0.0)), uFlat);
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`;

function initLab(root) {
  const $ = (s) => root.querySelector(s), $$ = (s) => Array.from(root.querySelectorAll(s));
  const cv = $('.al-space-cv'), spaceWrap = $('.al-space');
  const state = {
    mode: 'light', r: SPOT_R, lamps: LAMPS, obj: { ...OBJ },
    spots: LAYOUTS.venn.map(([x, y]) => ({ x, y, k: 1, on: true })),
    probe: null, layout: 'venn',
  };
  const src = () => (state.mode === 'paint' ? PIGMENTS : LIGHTS);
  const srcColor = (i, k = 1) => (state.mode === 'paint' ? mixPaint([{ absorb: PIGMENTS[i].absorb, k }]) : mixLight([{ rgb: LIGHTS[i].rgb, k }]));
  const kOf = (i) => (state.spots[i].on ? state.spots[i].k : 0);
  const mixAt = (k) => {
    const ix = bits(k);
    return state.mode === 'paint'
      ? mixPaint(ix.map((i) => ({ absorb: PIGMENTS[i].absorb, k: kOf(i) })))
      : mixLight(ix.map((i) => ({ rgb: LIGHTS[i].rgb, k: kOf(i) })));
  };
  const rgbText = (c) => { const [r, g, b] = to255(c); return `R ${r} · G ${g} · B ${b}`; };
  const bi = (en, zh) => `${en}<span class="zh">${zh}</span>`;

  const R = {
    rows: $$('.ar-src'), mixes: $$('.ar-mixes li'), msg: $('.ar-msg'), probe: $('.ar-probe'),
    srcK: $('.ar-k-src'), mixK: $('.ar-k-mix'), obj: $('[data-t="obj"]'), objRow: $('.ar-objrow'), rule: $('.ar-rule'),
  };
  const say = (en, zh) => { R.msg.innerHTML = bi(en, zh); };

  let dirty = true, glide = null, timers = [], view = null, regs = regions(state);
  const touch = () => { dirty = true; };
  const stopAuto = () => { timers.forEach(clearTimeout); timers = []; };
  const play = (steps) => { stopAuto(); steps.forEach((s) => timers.push(setTimeout(s.fn, s.at * 1000))); };

  // ── 右邊欄 ───────────────────────────────────────────────────────────
  function refresh() {
    regs = regions(state);
    const paint = state.mode === 'paint', S = src();
    root.setAttribute('data-mode', state.mode);
    $$('.ar-mode button').forEach((b) => b.setAttribute('aria-pressed', String(b.getAttribute('data-mode') === state.mode)));
    R.srcK.innerHTML = paint ? 'Three sheets of paint · 三片顏料' : 'Three lamps · 三盞燈';
    R.mixK.innerHTML = paint ? 'Where the sheets overlap · 色片重疊的地方' : 'Where the lights overlap · 光重疊的地方';
    R.rule.innerHTML = paint
      ? bi('Each sheet takes some light away. More layers, darker.', '每一片都拿走一些光。疊越多層，越暗。')
      : bi('Each lamp adds light. More lamps, brighter.', '每一盞燈都加上一些光。開越多盞，越亮。');
    R.rows.forEach((row, i) => {
      const s = state.spots[i], c = srcColor(i, 1);
      const chip = row.querySelector('.ar-chip');
      chip.textContent = S[i].letter; chip.style.background = css(c); chip.style.color = inkOn(c);
      row.querySelector('.ar-src-en').textContent = paint ? `${S[i].en} paint` : `${S[i].en} light`;
      row.querySelector('.ar-src-zh').textContent = paint ? `${S[i].zh}色顏料` : `${S[i].zh}光`;
      row.querySelector('[data-on]').checked = s.on;
      const sl = row.querySelector('[data-k]');
      sl.value = Math.round(s.k * 100); sl.disabled = !s.on;
      sl.setAttribute('aria-label', paint ? `How thick the ${S[i].en} layer is · ${S[i].zh}色顏料塗多厚` : `Brightness of the ${S[i].en} lamp · ${S[i].zh}燈的亮度`);
      row.querySelector('.ar-src-v').textContent = s.on ? pct(s.k) : (paint ? 'removed · 拿掉' : 'off · 關');
      row.classList.toggle('is-off', !s.on);
    });
    R.mixes.forEach((li, n) => {
      const k = MIXES[n], ix = bits(k), c = mixAt(k), nm = colorName(c);
      const sw = li.querySelector('.ar-sw');
      sw.style.background = css(c); sw.style.color = inkOn(c); sw.textContent = ix.map((i) => S[i].letter).join('+');
      li.querySelector('.ar-mx-n').innerHTML = `${nm.en} <span class="zh">${nm.zh}</span>`;
      li.querySelector('.ar-mx-v').textContent = rgbText(c);
      const there = regs[k].area > 0.25;
      li.classList.toggle('is-there', there);
      const st = li.querySelector('.ar-mx-s');
      st.textContent = there ? '●' : '○';
      st.title = there ? 'On the wall now · 牆上現在有' : 'Not overlapping now · 現在沒有重疊';
      st.setAttribute('aria-label', st.title);
    });
    R.objRow.hidden = paint;
    R.obj.checked = state.obj.on;
    showProbe();
    if (view) view.sync();
    touch();
  }
  function probePoint() {
    if (state.probe) return state.probe;
    for (const k of [7, 3, 6, 5, 1, 2, 4]) if (regs[k].area > 0.25) return [regs[k].x, regs[k].y];
    return [0, WALL.cy];
  }
  function showProbe() {
    const [x, y] = probePoint(), c = wallColor(x, y, state), nm = colorName(c);
    const sw = R.probe.querySelector('.ar-sw');
    sw.style.background = css(c);
    R.probe.querySelector('.ar-pr-n').innerHTML = `${nm.en} <span class="zh">${nm.zh}</span>`;
    R.probe.querySelector('.ar-pr-v').textContent = rgbText(c);
  }

  // ── 改變狀態 ─────────────────────────────────────────────────────────
  function setMode(m, quiet) {
    if (m !== 'light' && m !== 'paint') return;
    state.mode = m; state.probe = null;
    refresh();
    if (!quiet) {
      if (m === 'paint') say('Now the wall is lit by plain white light, and three thin sheets of paint lie on it. Each sheet takes some of the light away. Where sheets overlap, more light is taken away and the wall gets darker. This is a model: a screen cannot turn into paint.', '現在牆面照著普通的白光，上面貼著三片薄薄的顏料。每一片都吸掉一部分的光；重疊的地方被吸掉更多，所以更暗。這是示意的模型：螢幕沒辦法真的變成顏料。');
      else say('The room is dark again. Each lamp adds its own light to the wall. Where two spots overlap, the wall sends back both lights, so it looks brighter.', '房間又變暗了。每一盞燈各自把光加到牆上；兩個光斑重疊的地方，牆同時反射兩種光，所以看起來更亮。');
    }
  }
  function setK(i, k) { state.spots[i].k = MathUtils.clamp(k, 0, 1); refresh(); }
  function setOn(i, on) { state.spots[i].on = !!on; refresh(); }
  function setObj(on) { state.obj.on = !!on; refresh(); }
  function moveSpot(i, x, y) { const [cx, cy] = clampSpot(x, y); state.spots[i].x = cx; state.spots[i].y = cy; state.layout = ''; refresh(); }
  function setLayout(name, instant) {
    const L = LAYOUTS[name]; if (!L) return;
    state.layout = name; state.probe = null;
    if (instant) { glide = null; state.spots.forEach((s, i) => { s.x = L[i][0]; s.y = L[i][1]; }); refresh(); return; }
    glide = { t: 0, dur: 0.9, from: state.spots.map((s) => [s.x, s.y]), to: L };
    touch();
  }
  function step(dt) {
    if (!glide) return;
    glide.t = Math.min(glide.dur, glide.t + dt);
    const k = MathUtils.smootherstep(glide.t / glide.dur, 0, 1);
    state.spots.forEach((s, i) => { s.x = glide.from[i][0] + (glide.to[i][0] - glide.from[i][0]) * k; s.y = glide.from[i][1] + (glide.to[i][1] - glide.from[i][1]) * k; });
    if (glide.t >= glide.dur) glide = null;
    refresh();
  }
  const allOn = (ks = [1, 1, 1], ons = [true, true, true]) => state.spots.forEach((s, i) => { s.k = ks[i]; s.on = ons[i]; });

  // ── 3D ───────────────────────────────────────────────────────────────
  function make3D() {
    let renderer;
    try { renderer = new WebGLRenderer({ canvas: cv, antialias: true }); } catch (e) { return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const scene = new Scene();
    scene.background = new Color(0x04060b);
    const camera = new PerspectiveCamera(34, 1, 0.1, 200);
    const controls = new OrbitControls(camera, cv);
    controls.enableDamping = true; controls.dampingFactor = 0.08; controls.enablePan = false;
    controls.minDistance = 8; controls.maxDistance = 48;
    controls.minPolarAngle = 1.05; controls.maxPolarAngle = 1.62;
    controls.minAzimuthAngle = -0.75; controls.maxAzimuthAngle = 0.75;
    // 鏡頭退到整面牆（寬）和三盞燈（高）都看得到的距離
    const HOME_T = V(0, 3.0, 0);
    const homePos = () => {
      const t = Math.tan(MathUtils.degToRad(camera.fov / 2));
      return V(0, 4.6, Math.max((WALL.w / 2 + 0.45) / (t * camera.aspect), 5.7 / t));
    };

    // 房間：地板、牆的邊框、牆面
    const floor = new Mesh(new PlaneGeometry(60, 40), new MeshBasicMaterial({ color: 0x0a0e18 }));
    floor.rotation.x = -Math.PI / 2; floor.position.set(0, 0, 8); scene.add(floor);
    const frame = new Mesh(new PlaneGeometry(WALL.w + 0.3, WALL.h + 0.3), new MeshBasicMaterial({ color: 0x2a3247 }));
    frame.position.set(0, WALL.cy, -0.03); scene.add(frame);
    const back = new Mesh(new PlaneGeometry(60, 24), new MeshBasicMaterial({ color: 0x070a12 }));
    back.position.set(0, 10, -0.08); scene.add(back);
    const U = {
      uMode: { value: 0 }, uR: { value: SPOT_R }, uObjOn: { value: 0 },
      uC: { value: [new Vector2(), new Vector2(), new Vector2()] },
      uK: { value: [1, 1, 1] },
      uCol: { value: LIGHTS.map((l) => V(...l.rgb)) },
      uAbs: { value: PIGMENTS.map((p) => V(...p.absorb)) },
      uLamp: { value: LAMPS.map((l) => V(...l)) },
      uObj: { value: new Vector4(0, 0, 0, OBJ.rad) },
    };
    const wall = new Mesh(new PlaneGeometry(WALL.w, WALL.h), new ShaderMaterial({ uniforms: U, vertexShader: WALL_VERT, fragmentShader: WALL_FRAG }));
    wall.position.set(0, WALL.cy, 0); scene.add(wall);

    // 三盞燈：腳架＋燈頭（朝向自己的光斑），燈頭前面的圓片顯示亮度
    const dark = new MeshBasicMaterial({ color: 0x39425a }), darker = new MeshBasicMaterial({ color: 0x1c2233 });
    const lamps = LAMPS.map((L, i) => {
      const g = new Group();
      const pole = new Mesh(new CylinderGeometry(0.05, 0.05, L[1], 10), darker); pole.position.set(L[0], L[1] / 2, L[2]); g.add(pole);
      const base = new Mesh(new CylinderGeometry(0.42, 0.5, 0.08, 20), darker); base.position.set(L[0], 0.04, L[2]); g.add(base);
      const head = new Group(); head.position.set(...L);
      const can = new Mesh(new CylinderGeometry(0.34, 0.24, 0.7, 24, 1, true), dark); can.rotation.x = Math.PI / 2; can.material.side = DoubleSide; head.add(can);
      const rear = new Mesh(new CircleGeometry(0.24, 24), darker); rear.position.z = -0.35; rear.rotation.y = Math.PI; head.add(rear);
      const lens = new Mesh(new CircleGeometry(0.31, 24), new MeshBasicMaterial({ color: 0xffffff, side: DoubleSide })); lens.position.z = 0.3; head.add(lens);
      const ring = new Mesh(new RingGeometry(0.34, 0.4, 28), new MeshBasicMaterial({ color: 0xffffff, side: DoubleSide })); ring.position.z = 0.36; head.add(ring);
      g.add(head); scene.add(g);
      const beam = new Mesh(new ConeGeometry(SPOT_R, 1, 40, 1, true).translate(0, -0.5, 0).rotateX(-Math.PI / 2),
        new MeshBasicMaterial({ color: new Color(...LIGHTS[i].rgb), transparent: true, opacity: 0.07, blending: AdditiveBlending, depthWrite: false, side: DoubleSide }));
      beam.position.set(...L); beam.visible = false; scene.add(beam);
      return { g, head, lens, ring, beam };
    });

    // 擋光的球（有一根細桿撐著）
    const ballU = { uLamp: U.uLamp, uKc: { value: [V(0, 0, 0), V(0, 0, 0), V(0, 0, 0)] }, uFlat: { value: 0 } };
    const ball = new Mesh(new SphereGeometry(OBJ.rad, 40, 28), new ShaderMaterial({ uniforms: ballU, vertexShader: BALL_VERT, fragmentShader: BALL_FRAG }));
    const stick = new Mesh(new CylinderGeometry(0.035, 0.035, 1, 8), darker);
    const foot = new Mesh(new BoxGeometry(0.7, 0.06, 0.5), darker);
    scene.add(ball, stick, foot);

    // 指著牆面的小圈（黑白雙圈，在任何顏色上都看得見）
    const probe = new Group();
    probe.add(new Mesh(new RingGeometry(0.13, 0.17, 28), new MeshBasicMaterial({ color: 0xffffff })));
    probe.add(new Mesh(new RingGeometry(0.17, 0.2, 28), new MeshBasicMaterial({ color: 0x000000 })));
    probe.position.z = 0.02; scene.add(probe);

    // 標籤：每一個重疊區一張（顏色的名字），色覺差異的讀者不必只靠顏色
    const lab = labeler($('.al-labels'), cv, camera);
    const regLabs = [];
    for (let k = 1; k < 8; k++) regLabs[k] = lab.add('ar-lb', '');
    const lampLabs = LIGHTS.map((l) => lab.add('ar-lb ar-lb-lamp', `<b>${l.letter}</b><span class="ar-lb-nm"> ${l.en} lamp <span class="zh">${l.zh}燈</span></span>`));
    let showLabels = true, showBeams = false;

    function sync() {
      const paint = state.mode === 'paint';
      U.uMode.value = paint ? 1 : 0;
      U.uObjOn.value = !paint && state.obj.on ? 1 : 0;
      U.uObj.value.set(state.obj.x, state.obj.y, state.obj.z, state.obj.rad);
      state.spots.forEach((s, i) => {
        U.uC.value[i].set(s.x, s.y);
        U.uK.value[i] = s.on ? s.k : 0;
        const L = lamps[i], k = s.on ? s.k : 0;
        L.g.visible = !paint;
        L.head.lookAt(s.x, s.y, 0);
        const c = LIGHTS[i].rgb;
        L.lens.material.color.setRGB(0.1 + 0.9 * c[0] * k, 0.1 + 0.9 * c[1] * k, 0.1 + 0.9 * c[2] * k);
        L.ring.material.color.setRGB(0.25 + 0.75 * c[0], 0.25 + 0.75 * c[1], 0.25 + 0.75 * c[2]);
        L.beam.visible = showBeams && !paint && k > 0;
        if (L.beam.visible) {
          const d = Math.hypot(s.x - LAMPS[i][0], s.y - LAMPS[i][1], LAMPS[i][2]);
          L.beam.scale.set(1, 1, d); L.beam.lookAt(s.x, s.y, 0); L.beam.material.opacity = 0.07 * k;
        }
        // 球有沒有被這盞燈照到：從燈穿過球心打到牆上的點，在不在這盞燈的光斑裡
        const q = shadowOnWall(LAMPS[i], [state.obj.x, state.obj.y, state.obj.z], state.obj.rad);
        const inBeam = 1 - smoothstep(state.r - 0.4, state.r + 0.4, Math.hypot(q.x - s.x, q.y - s.y));
        ballU.uKc.value[i].set(c[0] * k * inBeam, c[1] * k * inBeam, c[2] * k * inBeam);
      });
      const objOn = !paint && state.obj.on;
      ball.visible = stick.visible = foot.visible = objOn;
      ball.position.set(state.obj.x, state.obj.y, state.obj.z);
      stick.scale.y = state.obj.y - state.obj.rad; stick.position.set(state.obj.x, (state.obj.y - state.obj.rad) / 2, state.obj.z);
      foot.position.set(state.obj.x, 0.03, state.obj.z);
      scene.background.set(paint ? 0x151923 : 0x04060b);
      floor.material.color.set(paint ? 0x2a2f3c : 0x0a0e18);
      back.material.color.set(paint ? 0x1d222e : 0x070a12);
      frame.material.color.set(paint ? 0x8d93a3 : 0x2a3247);
      const [px, py] = probePoint(); probe.position.set(px, py, 0.02);
      const S = src();
      lampLabs.forEach((el) => { el.hidden = paint || !showLabels; });
      for (let k = 1; k < 8; k++) {
        const el = regLabs[k], rg = regs[k];
        const on = showLabels && rg.area > 0.45;
        el.hidden = !on;
        if (!on) continue;
        const nm = colorName(mixAt(k)), ix = bits(k);   // 這幾個來源混出來的顏色（不看影子）
        el.classList.toggle('ar-lb-one', ix.length === 1);
        el.innerHTML = `<b>${ix.map((i) => S[i].letter).join('+')}</b><span class="ar-lb-nm"> ${nm.en} <span class="zh">${nm.zh}</span></span>`;
      }
    }
    const p3 = V(0, 0, 0);
    function render() {
      controls.update();
      renderer.render(scene, camera);
      for (let k = 1; k < 8; k++) if (!regLabs[k].hidden) lab.place(regLabs[k], p3.set(regs[k].x, regs[k].y, 0));
      lampLabs.forEach((el, i) => { if (!el.hidden) lab.place(el, p3.set(LAMPS[i][0], LAMPS[i][1] - 0.2, LAMPS[i][2]), 34); });
    }

    let fly = null;
    function goHome(instant) {
      const p1 = homePos();
      if (instant) { camera.position.copy(p1); controls.target.copy(HOME_T); fly = null; touch(); return; }
      fly = { t: 0, p0: camera.position.clone(), p1, t0: controls.target.clone(), t1: HOME_T.clone() };
    }
    function tick(dt) {
      if (!fly) return false;
      fly.t = Math.min(1, fly.t + dt / 0.8);
      const k = MathUtils.smootherstep(fly.t, 0, 1);
      camera.position.lerpVectors(fly.p0, fly.p1, k); controls.target.lerpVectors(fly.t0, fly.t1, k);
      if (fly.t >= 1) fly = null;
      return true;
    }
    controls.addEventListener('change', touch);

    // 拖動：光斑（色片）或球；其他地方交給 OrbitControls 轉鏡頭
    const ray = new Raycaster(), ndc = new Vector2(), hit = V(0, 0, 0);
    const wallPlane = new Plane(V(0, 0, 1), 0), objPlane = new Plane(V(0, 0, 1), 0);
    const setRay = (e) => { const r = cv.getBoundingClientRect(); ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1); ray.setFromCamera(ndc, camera); };
    const wallAt = (e) => {
      setRay(e);
      if (!ray.ray.intersectPlane(wallPlane, hit)) return null;
      if (Math.abs(hit.x) > WALL.w / 2 || Math.abs(hit.y - WALL.cy) > WALL.h / 2) return null;
      return [hit.x, hit.y];
    };
    const onBall = (e) => { setRay(e); return ball.visible && ray.intersectObject(ball, false).length > 0; };
    const spotAt = (p) => {
      let best = -1, bd = Infinity;
      state.spots.forEach((s, i) => { const d = Math.hypot(p[0] - s.x, p[1] - s.y); if (s.on && d < state.r && d < bd) { bd = d; best = i; } });
      return best;
    };
    let drag = null;
    cv.addEventListener('pointerdown', (e) => {
      stopAuto();
      root.classList.remove('al-fresh');
      if (onBall(e)) drag = { id: e.pointerId, kind: 'ball' };
      else {
        const p = wallAt(e); if (!p) return;
        const i = spotAt(p); if (i < 0) return;
        drag = { id: e.pointerId, kind: 'spot', i, dx: state.spots[i].x - p[0], dy: state.spots[i].y - p[1] };
      }
      glide = null;
      try { cv.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      controls.enabled = false;
      cv.style.cursor = 'grabbing';
    }, true);
    cv.addEventListener('pointermove', (e) => {
      if (drag && e.pointerId === drag.id) {
        setRay(e);
        if (drag.kind === 'ball') {
          objPlane.constant = -state.obj.z;
          if (ray.ray.intersectPlane(objPlane, hit)) {
            state.obj.x = MathUtils.clamp(hit.x, -4.5, 4.5); state.obj.y = MathUtils.clamp(hit.y, state.obj.rad + 0.4, 6.6);
            refresh();
          }
        } else if (ray.ray.intersectPlane(wallPlane, hit)) moveSpot(drag.i, hit.x + drag.dx, hit.y + drag.dy);
        return;
      }
      if (e.pointerType !== 'mouse') return;
      const p = wallAt(e);
      cv.style.cursor = onBall(e) || (p && spotAt(p) >= 0) ? 'grab' : '';
      if (p) { state.probe = p; showProbe(); probe.position.set(p[0], p[1], 0.02); touch(); }
    });
    const end = (e) => {
      if (!drag || (e && e.pointerId !== drag.id)) return;
      const p = e && drag.kind === 'spot' ? wallAt(e) : null;
      if (p) { state.probe = p; refresh(); }
      drag = null; controls.enabled = true; cv.style.cursor = '';
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
    function screenOf(x, y) {
      p3.set(x, y, 0).project(camera);
      return [(p3.x * 0.5 + 0.5) * cv.clientWidth, (-p3.y * 0.5 + 0.5) * cv.clientHeight];
    }
    function pixelAt(x, y) {
      probe.visible = false; render();
      const gl = renderer.getContext(), [sx, sy] = screenOf(x, y), s = cv.width / cv.clientWidth;
      gl.readPixels(Math.round(sx * s), Math.round(cv.height - sy * s), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
      probe.visible = true; touch();
      return [px[0], px[1], px[2]];
    }
    return {
      camera, controls, scene, sync, render, tick, goHome, screenOf, pixelAt, busy: () => !!fly,
      setLabels: (v) => { showLabels = v; sync(); touch(); },
      setBeams: (v) => { showBeams = v; sync(); touch(); },
    };
  }
  view = make3D();
  if (!view) root.classList.add('al-nogl');

  // ── 右邊的按鈕與滑桿 ──────────────────────────────────────────────────
  R.rows.forEach((row, i) => {
    row.querySelector('[data-on]').addEventListener('change', (e) => {
      stopAuto(); setOn(i, e.target.checked);
      const S = src()[i], paint = state.mode === 'paint';
      if (paint) say(e.target.checked ? `The ${S.en.toLowerCase()} sheet is back on the wall.` : `The ${S.en.toLowerCase()} sheet is gone. With one layer fewer, less light is taken away, so the overlaps get lighter.`, e.target.checked ? `${S.zh}色的色片放回牆上了。` : `${S.zh}色的色片拿掉了。少一層，被吸掉的光就比較少，重疊的地方變亮。`);
      else say(e.target.checked ? `The ${S.en.toLowerCase()} lamp is on.` : `The ${S.en.toLowerCase()} lamp is off. With one light fewer, the overlaps get darker.`, e.target.checked ? `${S.zh}燈打開了。` : `${S.zh}燈關掉了。少一種光，重疊的地方變暗。`);
    });
    row.querySelector('[data-k]').addEventListener('input', (e) => { stopAuto(); setK(i, Number(e.target.value) / 100); });
  });
  $$('.ar-mode button').forEach((b) => b.addEventListener('click', () => { stopAuto(); setMode(b.getAttribute('data-mode')); }));
  $$('[data-layout]').forEach((b) => b.addEventListener('click', () => { stopAuto(); setLayout(b.getAttribute('data-layout')); }));
  R.obj.addEventListener('change', () => {
    stopAuto(); setObj(R.obj.checked);
    if (R.obj.checked) say('A ball now stands between the lamps and the wall. Each lamp throws its own shadow. Inside a shadow, one light is missing, and you see the mix of the other two. Drag the ball, or put all three spots in the same place.', '現在燈和牆之間立著一顆球。每一盞燈各自投出一個影子；影子裡少了那一種光，看到的是另外兩種光混出來的顏色。可以拖動球，或把三個光斑疊在同一個地方。');
  });
  const tgL = $('[data-t="labels"]'), tgB = $('[data-t="beams"]');
  if (tgL) tgL.addEventListener('change', () => view && view.setLabels(tgL.checked));
  if (tgB) tgB.addEventListener('change', () => view && view.setBeams(tgB.checked));

  // ── 卡片上的示範 ──────────────────────────────────────────────────────
  const DEMO = {
    add() {
      setMode('light', true); setObj(false); allOn([1, 1, 1], [true, false, false]); setLayout('venn', true);
      say('One lamp: a red spot on a dark wall.', '一盞燈：暗暗的牆上一個紅色的光斑。');
      play([
        { at: 2.2, fn: () => { setOn(1, true); say('Add green. Where red and green overlap, the wall sends back both lights. It looks yellow, and it is brighter than either spot alone.', '加上綠光。紅和綠重疊的地方，牆同時反射兩種光：看起來是黃色，而且比單獨一個光斑都亮。'); } },
        { at: 6.2, fn: () => { setOn(2, true); say('Add blue. Now there are three new colors where two lights overlap: yellow, cyan, and magenta. In the middle, all three lights add up to white.', '再加上藍光。兩種光重疊的地方出現三種新的顏色：黃、青、洋紅；正中間三種光加在一起，變成白色。'); } },
      ]);
    },
    dim() {
      setMode('light', true); setObj(false); allOn([1, 1, 1], [true, true, false]); setLayout('pair', true);
      say('Red and green at full brightness make yellow. Watch the green lamp get dimmer.', '紅光和綠光都開到最亮，是黃色。看綠燈慢慢變暗。');
      const seq = [0.9, 0.8, 0.7, 0.6, 0.5];
      play([
        ...seq.map((k, n) => ({ at: 2 + n * 0.45, fn: () => setK(1, k) })),
        { at: 4.4, fn: () => say('Full red plus half green is orange. The amounts matter, not only which lamps are on. A screen makes its colors the same way.', '紅光全開、綠光開一半，是橙色。不只是開哪幾盞燈，各開多亮也有關係。螢幕就是這樣調出各種顏色的。') },
        { at: 8.5, fn: () => { setK(1, 0); say('With green all the way down, only red is left.', '綠光調到零，就只剩下紅色。'); } },
        { at: 11, fn: () => setK(1, 1) },
      ]);
    },
    shadow() {
      setMode('light', true); allOn(); setLayout('together', true); setObj(true);
      say('All three spots are in the same place, so the wall is white. A ball blocks each lamp from a different direction, so there are three shadows. Where only red is blocked, green and blue are left: cyan. Where two lamps are blocked, one pure light is left. Where all three are blocked, the shadow is black.', '三個光斑疊在同一個地方，所以牆是白色的。球從不同的方向擋住每一盞燈，所以有三個影子。只擋住紅光的地方，剩下綠和藍：青色。擋住兩盞燈的地方，只剩一種光；三盞都擋住的地方，影子是黑的。');
    },
    paint() {
      setObj(false); allOn([1, 1, 1], [true, false, false]); setLayout('venn', true); setMode('paint', true);
      say('A white wall and one sheet of yellow paint. Yellow paint takes away most of the blue light and sends back the rest.', '一面白牆，貼上一片黃色的顏料。黃色顏料吸掉大部分的藍光，把其餘的光反射回來。');
      play([
        { at: 3, fn: () => { setOn(1, true); say('Add magenta, which takes away most of the green light. Where the two sheets overlap, blue and green are both taken away. Red is left, and it is darker than either sheet alone.', '加上洋紅，它吸掉大部分的綠光。兩片重疊的地方，藍光和綠光都被吸掉，剩下紅色，而且比單獨一片都暗。'); } },
        { at: 7.5, fn: () => { setOn(2, true); say('Add cyan, which takes away most of the red light. In the middle, almost all the light is gone, and the wall is nearly black. With light, three made white. With paint, three make almost black.', '再加上青色，它吸掉大部分的紅光。正中間幾乎所有的光都被吸掉，牆面接近黑色。光是三種加起來變白，顏料是三種疊起來接近黑。'); } },
      ]);
    },
  };

  let raf = 0, last = 0, visible = false;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    step(dt);
    if (view) {
      if (view.tick(dt)) dirty = true;
      if (dirty) { dirty = false; view.render(); }
    }
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; dirty = true; raf = requestAnimationFrame(frame); }
    if (!visible) stopAuto();
  }, { rootMargin: '120px' }).observe(root);

  refresh();
  say('Three lamps shine on a white wall in a dark room. Drag a spot of light to move it. Turn a lamp off, or make it dimmer, and read the colors on the right.', '暗房裡，三盞燈照在一面白牆上。拖動光斑可以移動它；關掉一盞燈或把它調暗，再讀右邊的顏色。');
  root.classList.add('al-ready', 'al-fresh');

  root.__lab = {
    state, view, setMode, setK, setOn, setObj, setLayout, moveSpot,
    colorAt: (x, y) => to255(wallColor(x, y, state)),
    pixelAt: (x, y) => (view ? view.pixelAt(x, y) : null),
    screenOf: (x, y) => (view ? view.screenOf(x, y) : null),
    regions: () => regions(state),
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => view && view.goHome(true),
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { if (view) view.render(); },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() {
  const m = document.querySelector('[data-ar-match]'); if (m) initMatch(m);
  const z = document.querySelector('[data-ar-zoom]'); if (z) initZoom(z);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-artlights-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
