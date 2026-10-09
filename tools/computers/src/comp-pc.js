/*
 * 電腦概論 · 第五課「打開電腦，裡面有什麼？」的 3D 模型（全部自繪示意，不是任何品牌的產品）。
 *
 * 一個機制：**每個零件各做一件事，靠主機板連在一起**。
 * 一台側板打開的桌上型主機（pc3d.js）＋旁邊一台螢幕：
 *   點任何零件（或右邊的零件按鈕 data-part）   它亮起來，右邊說明它做什麼、和比喻哪裡不一樣
 *   .cp-pc-explode（滑桿）                    把零件一個一個拉出來看
 *   .al-play                                  按下電源：四個步驟（供電 → 從儲存裝置載入記憶體 → 處理器工作 → 顯示卡畫出畫面），
 *                                             資料用光點表示，從一個零件流到另一個
 *   data-t="labels"                           標籤
 * 零件名稱與說明、四個步驟的文字都在 data/computers.json（lab.parts、lab.boot），由 build.py 放進 data-parts／data-boot。
 *
 * 控制器不靠 WebGL：沒有 WebGL 時 3D 不畫，右邊的零件按鈕、說明與四個步驟照樣能用。
 * 2D（不需要 WebGL）：這個工作是誰做的、裝得下多少——parts2d.js。
 *
 * 產物：cd tools/computers && npm run build → assets/js/comp-pc.js
 * 除錯：document.querySelector('[data-comppc-lab]').__lab
 *   select(key|null)、setExplode(0–1)、setPlaying(bool)、goStep(i)、demo('open'|'cpu'|'memory'|'boot')、
 *   run(秒)、goCam()、render()
 */
import {
  AdditiveBlending, AmbientLight, CircleGeometry, Color, DirectionalLight, HemisphereLight, MathUtils, Mesh, MeshStandardMaterial,
  PerspectiveCamera, Raycaster, Scene, Sprite, SpriteMaterial, Vector2, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { canvasTex, labeler, lazyBoot } from './common.js';
import { BOOT, PARTS } from './parts.js';
import { initFits, initJobs } from './parts2d.js';
import { makePC } from './pc3d.js';

const STEP = 3.6;   // 「按下電源」每一步幾秒
const V = (x, y, z) => new Vector3(x, y, z);

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const spaceWrap = $('.al-space'), cv = $('.al-space-cv');
  const TEXT = JSON.parse(root.getAttribute('data-parts')), BOOTT = JSON.parse(root.getAttribute('data-boot'));
  const R = { name: $('.cp-pc-name'), job: $('.cp-pc-job'), note: $('.cp-pc-note'), msg: $('.cp-msg'), play: $('.al-play'), slider: $('.cp-pc-explode'), steps: [...$$('.cp-pc-steps li')] };
  const state = { sel: null, explode: 0, playing: false, step: -1, t: 0, labels: true };
  let script = null, view = null;

  const say = (en, zh) => { R.msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  function show() {
    $$('[data-part]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-part') === state.sel ? 'true' : 'false'));
    const p = state.sel ? TEXT[state.sel] : null;
    R.name.innerHTML = p ? `${p.en}<span class="zh">${p.zh}</span>` : 'Tap a part<span class="zh">點一個零件</span>';
    R.job.innerHTML = p ? `${p.job_en}<span class="zh">${p.job_zh}</span>` : 'Seven parts, seven jobs. Tap one in the model or in the list.<span class="zh">七個零件，七件工作。在模型裡或清單上點一個。</span>';
    R.note.innerHTML = p ? `${p.note_en}<span class="zh">${p.note_zh}</span>` : '';
    R.note.hidden = !p;
    R.steps.forEach((li, i) => li.classList.toggle('is-cur', i === state.step));
    root.dataset.sel = state.sel || '';
    if (view) { view.pc.select(state.step >= 0 ? null : state.sel); view.pc.light(state.step >= 0 ? BOOT[state.step].on : []); }
  }
  function select(key) { state.sel = key; if (state.step >= 0) { state.step = -1; setPlaying(false); } show(); }
  function setExplode(k) { state.explode = Math.max(0, Math.min(1, k)); R.slider.value = String(Math.round(state.explode * 100)); if (view) view.pc.setExplode(state.explode); }
  function user() { script = null; root.classList.remove('al-fresh'); }
  function setPlaying(v) {
    state.playing = v;
    root.classList.toggle('is-playing', v);
    R.play.setAttribute('aria-pressed', v ? 'true' : 'false');
    R.play.querySelector('.al-play-t').textContent = v ? 'Pause · 暫停' : 'Press the power button · 按下電源';
    root.classList.remove('al-fresh');
  }
  function goStep(i) {
    state.step = i; state.t = 0;
    if (i >= 0 && i < BOOT.length) { const b = BOOTT[i]; say(`${i + 1}. ${b.en}`, `${i + 1}. ${b.zh}`); }
    show();
  }
  function power() { state.sel = null; setExplode(0); goStep(0); setPlaying(true); }

  $$('[data-part]').forEach((b) => b.addEventListener('click', () => { user(); const k = b.getAttribute('data-part'); select(state.sel === k ? null : k); if (state.sel && state.explode < 0.5) setExplode(1); }));
  R.slider.addEventListener('input', () => { user(); setExplode(Number(R.slider.value) / 100); });
  R.play.addEventListener('click', () => { script = null; if (state.playing) setPlaying(false); else if (state.step >= 0) setPlaying(true); else power(); });
  R.steps.forEach((li, i) => li.addEventListener('click', () => { user(); setPlaying(false); state.sel = null; setExplode(0); goStep(i); }));
  const tgL = $('[data-t="labels"]');
  if (tgL) tgL.addEventListener('change', () => { state.labels = tgL.checked; });

  // ── 3D ──────────────────────────────────────────────────────────────
  function make3D() {
    let renderer;
    try { renderer = new WebGLRenderer({ canvas: cv, antialias: true }); } catch (e) { return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const scene = new Scene();
    scene.background = new Color(0x0b1326);
    const camera = new PerspectiveCamera(34, 1, 0.05, 200);
    const controls = new OrbitControls(camera, cv);
    controls.enableDamping = true; controls.dampingFactor = 0.08;
    controls.minDistance = 3; controls.maxDistance = 50; controls.maxPolarAngle = Math.PI * 0.52;
    scene.add(new HemisphereLight(0xeaf0ff, 0x2a2420, 1.3));
    scene.add(new AmbientLight(0xffffff, 0.55));
    const sun = new DirectionalLight(0xfff1dc, 1.7); sun.position.set(-4, 8, 9); scene.add(sun);
    const floor = new Mesh(new CircleGeometry(90, 64), new MeshStandardMaterial({ color: 0x121c36, roughness: 0.95 }));
    floor.rotation.x = -Math.PI / 2; scene.add(floor);

    const pc = makePC();
    pc.group.position.x = -1.4;
    scene.add(pc.group);
    scene.updateMatrixWorld(true);

    const glow = canvasTex((g, w, h) => { const r = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2); r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(0.35, 'rgba(255,255,255,.45)'); r.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = r; g.fillRect(0, 0, w, h); }, 128, 128);
    const dots = Array.from({ length: 18 }, () => { const s = new Sprite(new SpriteMaterial({ map: glow, color: 0x7ef0e3, blending: AdditiveBlending, depthWrite: false, depthTest: false, transparent: true, opacity: 0 })); s.scale.setScalar(0.42); scene.add(s); return s; });

    const lab = labeler($('.al-labels'), cv, camera);
    const lbs = {}; for (const k of PARTS) lbs[k] = lab.add('cp-lb cp-lb-part', `${TEXT[k].short_en}<small>${TEXT[k].short_zh}</small>`);
    const lbScreen = lab.add('cp-lb cp-lb-end', 'screen<small>螢幕</small>');
    const a = V(0, 0, 0), b = V(0, 0, 0);

    function fit(w, h) {
      const vf = MathUtils.degToRad(camera.fov / 2), hf = Math.atan(Math.tan(vf) * camera.aspect);
      return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf));
    }
    const fly = { t: 1, p0: V(0, 0, 0), p1: V(0, 0, 0), t0: V(0, 0, 0), t1: V(0, 0, 0) };
    function goHome(instant) {
      const narrow = camera.aspect < 0.9;
      const t = V(0.85, 2.3, 0.9), p = V(-0.34, 0.24, 1).normalize().multiplyScalar(fit(13.4, 8.2)).add(t);
      if (instant) { camera.position.copy(p); controls.target.copy(t); fly.t = 1; return; }
      fly.p0.copy(camera.position); fly.t0.copy(controls.target); fly.p1.copy(p); fly.t1.copy(t); fly.t = 0;
    }
    function tick(dt) {
      pc.update(dt);
      let n = 0;
      if (state.step >= 0 && state.step < BOOT.length) {
        const flows = BOOT[state.step].flow, per = Math.floor(dots.length / flows.length / 1.5);
        flows.forEach(([from, to], fi) => {
          pc.anchor(from, a); pc.anchor(to, b);
          for (let k = 0; k < per; k++) {
            const u = ((state.t * 0.55 + k / per + fi * 0.13) % 1 + 1) % 1, d = dots[n++];
            d.position.lerpVectors(a, b, u); d.position.z += 0.5 + Math.sin(Math.PI * u) * 0.5; d.position.y += Math.sin(Math.PI * u) * 0.25;
            d.material.opacity = Math.min(1, u * 6) * Math.min(1, (1 - u) * 6);
            d.material.color.setHex(state.step === 0 ? 0xffd36e : 0x7ef0e3);
          }
        });
      }
      for (; n < dots.length; n++) dots[n].material.opacity = 0;
      if (fly.t < 1) {
        fly.t = Math.min(1, fly.t + dt / 1.0);
        const k = MathUtils.smootherstep(fly.t, 0, 1);
        camera.position.lerpVectors(fly.p0, fly.p1, k); controls.target.lerpVectors(fly.t0, fly.t1, k);
      }
    }
    function labels() {
      const on = state.labels, lit = state.step >= 0 ? BOOT[state.step].on : null;
      for (const k of PARTS) {
        const show = on && (lit ? lit.includes(k) : state.sel ? state.sel === k : pc.explode > 0.6);
        lbs[k].hidden = !show;
        if (show) { lab.place(lbs[k], pc.anchor(k, a), k === 'cpu' || k === 'ssd' ? 30 : -30); lbs[k].classList.toggle('is-on', state.sel === k || !!lit); }
      }
      lbScreen.hidden = !(on && lit && lit.includes('screen'));
      if (!lbScreen.hidden) { pc.anchor('screen', a); a.y += 1.2; lab.place(lbScreen, a, -8); }
    }
    function render() { controls.update(); labels(); renderer.render(scene, camera); }

    const ray = new Raycaster(), ndc = new Vector2();
    const hit = (e) => { const r = cv.getBoundingClientRect(); ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1); ray.setFromCamera(ndc, camera); return pc.hit(ray); };
    let down = null;
    cv.addEventListener('pointerdown', (e) => { down = { x: e.clientX, y: e.clientY }; });
    cv.addEventListener('pointerup', (e) => {
      if (!down) return;
      const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y); down = null;
      if (moved > 6) return;
      const k = hit(e); user(); select(k && k !== state.sel ? k : null);
    });
    cv.addEventListener('pointermove', (e) => { if (e.pointerType === 'mouse') cv.style.cursor = hit(e) ? 'pointer' : ''; });
    $('.al-home').addEventListener('click', () => goHome(false));

    let band0 = null;
    function resize() {
      const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.fov = camera.aspect < 1.1 ? 42 : 34; camera.updateProjectionMatrix();
      root.classList.toggle('cp-narrow', w < 520);
      const bnd = camera.aspect < 0.9 ? 0 : camera.aspect < 1.25 ? 1 : 2;
      if (bnd !== band0) { band0 = bnd; goHome(true); }
    }
    new ResizeObserver(resize).observe(spaceWrap);
    resize();
    return { pc, camera, controls, scene, tick, render, goHome };
  }
  view = make3D();
  if (!view) root.classList.add('al-nogl');

  // ── 卡片示範 ──────────────────────────────────────────────────────────
  const DEMO = {
    open() {
      setPlaying(false); state.step = -1; select(null); setExplode(0);
      say('Closed up, it is just a box. Watch the parts come out one layer at a time.', '裝好的時候，它只是一個箱子。看零件一層一層被拉出來。');
      script = { t: 0, list: [{ at: 1.4, fn: () => setExplode(1) }, { at: 4.2, fn: () => say('Seven parts. Everything is plugged into the big board at the back: the motherboard.', '七個零件。每一樣都插在後面那塊大板子上，它就是主機板。') }] };
    },
    cpu() {
      setPlaying(false); state.step = -1; setExplode(1); select('cooler');
      say('The big block of metal fins and the fan are not the processor. They are its cooler.', '那一大塊金屬鰭片和風扇不是處理器，是它的散熱器。');
      script = { t: 0, list: [{ at: 3.2, fn: () => { select('cpu'); say('The processor is this small square underneath. It does the work, and it gets hot.', '處理器是底下這一小片方形的東西。工作是它做的，它也會發熱。'); } }] };
    },
    memory() {
      setPlaying(false); state.step = -1; setExplode(1); select('ram');
      say('Memory: fast, and holds what the computer is working on right now. It is wiped when the power goes off.', '記憶體：很快，放的是電腦現在正在用的東西；一關機就清空。');
      script = { t: 0, list: [{ at: 3.6, fn: () => { select('ssd'); say('Storage: slower, but it keeps your files when the power is off.', '儲存裝置：比較慢，但關機以後檔案還在。'); } }] };
    },
    boot() { script = null; power(); },
  };

  function step(dt) {
    if (script) {
      script.t += dt;
      while (script && script.list.length && script.t >= script.list[0].at) script.list.shift().fn();
      if (script && !script.list.length) script = null;
    }
    if (state.step >= 0) {
      if (state.playing) state.t += dt;
      if (state.t >= STEP) {
        if (state.step + 1 < BOOT.length) goStep(state.step + 1);
        else { setPlaying(false); state.step = -1; show(); say('That is the whole trip: power, storage to memory, memory to processor and back, and out through the graphics card to the screen.', '這就是整趟路：供電、從儲存裝置到記憶體、在記憶體和處理器之間來回，再經過顯示卡送到螢幕。'); }
      }
    }
    if (view) view.tick(dt);
  }
  let raf = 0, last = 0, visible = false;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    step(dt);
    if (view) view.render();
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '120px' }).observe(root);

  setPlaying(false); setExplode(0); show();
  say('This is a desktop computer with its side panel off. Tap a part, or slide to pull the parts out.', '這是一台拿掉側板的桌上型電腦。點一個零件，或拉滑桿把零件拉出來。');
  root.classList.add('al-ready', 'al-fresh');

  root.__lab = {
    state, view, select, setExplode, setPlaying, goStep, power,
    demo: (v) => DEMO[v] && DEMO[v](),
    goCam: () => view && view.goHome(true),
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { step(0); if (view) view.render(); },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() {
  const j = document.querySelector('[data-cp-jobs]'); if (j) initJobs(j);
  const f = document.querySelector('[data-cp-fits]'); if (f) initFits(f);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-comppc-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
