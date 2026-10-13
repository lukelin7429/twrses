/*
 * 台灣歷史 Taiwan's Story · 第一課「很久以前的事，我們怎麼知道？」的 3D 模型：考古探坑的剖面。
 * **通用的示意，不是任何一個真實遺址的實際剖面。**
 *
 * 一個想法：我們靠證據知道過去；沒有文字的時代靠考古——沒有被擾動的地層，越下面越古老。
 *   .twh-dig-range      往下挖（0 ＝ 還沒挖 … n ＝ 第 n 層挖開了；可以停在一層的中間）
 *   .twh-down / .twh-up 往下挖一層／回填一層；.twh-refill 全部回填
 *   data-t="labels"     地層的標籤；data-t="later"  顯示「後來挖的坑」（擾動：年輕的東西出現在比較深的地方）
 *   .twh-find[data-find] 右邊的出土物清單（挖到才解鎖）；模型裡每樣出土物上面也有一顆可以點的圓鈕
 *
 * 右邊直的時間軸（timeline2d.js，現在在上、越下面越古老）跟著坑底往回走：
 *   游標＝坑底大約是多久以前（strata.js 的 agoAtDepth）；亮起來的那一段＝正在挖的那一層的年代範圍。
 *
 * 控制器不靠 WebGL：沒有 WebGL 時 3D 不畫，滑桿、時間軸、出土物清單與小卡照樣能用。
 * 2D（不需要 WebGL）：這是哪一種證據、兩個人說的不一樣（evidence2d.js）、整個系列的時間軸（timeline2d.js）。
 *
 * 產物：cd tools/twhist && npm run build → assets/js/twh-dig.js
 * 除錯：document.querySelector('[data-twhdig-lab]').__lab
 *   setLevel(v, instant)、level()、depth()（公尺）、floorAgo()、layer()、found()、select(key)、setLater(bool)、demo(...)、
 *   run(秒)、render()、tl（時間軸 api）、pit（3D；沒有 WebGL 時是 null）、
 *   check()＝游標的年代＝坑底的年代，而且畫面上看得到的出土物＝已經挖開的那幾層的出土物
 */
import {
  AmbientLight, Color, DirectionalLight, HemisphereLight, MathUtils, PCFShadowMap, PerspectiveCamera, Scene, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { initEvidence } from './evidence2d.js';
import { DIM, makePit } from './pit3d.js';
import { agoAtDepth, depthAt, foundSoFar, totalDepth } from './strata.js';
import { formatAgoEn, formatAgoZh, groupThousands, zhCount } from './timeline.js';
import { initTimelines, mountTimeline } from './timeline2d.js';

const V = (x, y, z) => new Vector3(x, y, z);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const bi = (en, zh) => `${esc(en)}<span class="zh">${esc(zh)}</span>`;
const SPEED = 0.55;       // 每秒挖幾層

export function rangeText(l) {
  const a = l.toAgo <= 1 ? 'today' : groupThousands(l.toAgo), az = l.toAgo <= 1 ? '現在' : zhCount(l.toAgo);
  return { en: l.toAgo <= 1 ? `today back to about ${groupThousands(l.fromAgo)} years ago` : `about ${a} to ${groupThousands(l.fromAgo)} years ago`,
           zh: l.toAgo <= 1 ? `現在到約 ${zhCount(l.fromAgo)}${zhCount(l.fromAgo).endsWith('萬') ? '' : ' '}年前` : `約 ${az} 到 ${zhCount(l.fromAgo)}${zhCount(l.fromAgo).endsWith('萬') ? '' : ' '}年前` };
}

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const cfg = JSON.parse($('script.twh-lab-data').textContent);
  const layers = cfg.layers, n = layers.length;
  const later = cfg.later || null;
  const allFinds = layers.flatMap((l, i) => l.finds.map((f) => ({ ...f, layer: i })));
  if (later) allFinds.push({ ...later.find, layer: later.into, intrusive: true });
  const findOf = Object.fromEntries(allFinds.map((f) => [f.key, f]));
  const spaceWrap = $('.al-space'), cv = $('.al-space-cv');
  const R = { age: $('.twh-age'), depth: $('.twh-depth'), lname: $('.twh-lname'), finds: $('.twh-finds'), card: $('.twh-card'), msg: $('.twh-msg'), range: $('.twh-dig-range'), down: $('.twh-down'), up: $('.twh-up'), refill: $('.twh-refill') };
  const state = { level: 0, target: 0, labels: true, later: false, sel: null };
  let script = null, view = null;

  const say = (en, zh) => { R.msg.innerHTML = bi(en, zh); };
  const depth = () => depthAt(layers, state.level);
  const NEAR = cfg.nearest || 1;
  const floorAgo = () => agoAtDepth(layers, depth(), NEAR);
  const layerIdx = () => (state.level <= 1e-6 ? -1 : Math.min(n - 1, Math.ceil(state.level - 1e-6) - 1));
  const found = () => {
    const list = foundSoFar(layers, state.level).map((f) => f.key);
    if (later && state.later && depth() >= laterDepth()) list.push(later.find.key);
    return list;
  };
  /** 後來挖的坑裡那樣東西躺在多深（公尺）：into 那一層裡面 62% 的地方再往上一點 */
  function laterDepth() {
    let top = 0; for (let i = 0; i < later.into; i++) top += layers[i].thick;
    return top + layers[later.into].thick * 0.62 - 0.5 / DIM.scale;
  }

  // ── 右邊：直的時間軸 ────────────────────────────────────────────────
  const tl = mountTimeline($('.twh-vtl'), {
    older: cfg.older, nearest: NEAR, kind: 'log', vertical: true, controls: false, list: false,
    spans: layers.map((l, i) => ({ fromAgo: l.fromAgo, toAgo: Math.max(NEAR, l.toAgo), cls: `layer twh-tl-l${i + 1}`, en: String(i + 1), zh: '' })),
  });
  layers.forEach((l, i) => root.style.setProperty(`--twh-l${i + 1}`, l.color));

  // ── 出土物清單與小卡 ────────────────────────────────────────────────
  allFinds.forEach((f) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'twh-find'; b.setAttribute('data-find', f.key);
    b.innerHTML = `<i aria-hidden="true">${f.icon}</i><span>${bi(f.en, f.zh)}</span>`;
    b.addEventListener('click', () => { if (!b.disabled) select(f.key); });
    R.finds.append(b);
  });
  function select(key) {
    state.sel = key;
    const f = findOf[key];
    if (!f) { R.card.innerHTML = ''; show(); return; }
    const l = layers[f.layer];
    const where = f.intrusive
      ? ['In a later pit that cuts down into layer ' + (f.layer + 1), `在一個後來挖的坑裡，坑往下切進第 ${f.layer + 1} 層`]
      : [`Layer ${f.layer + 1}: ${l.en}`, `第 ${f.layer + 1} 層：${l.zh}`];
    R.card.innerHTML =
      `<p class="twh-card-h"><i aria-hidden="true">${f.icon}</i><b>${bi(f.en, f.zh)}</b></p>`
      + `<dl><dt>What it is · 是什麼</dt><dd>${bi(f.what_en, f.what_zh)}</dd>`
      + `<dt>Found in · 在哪一層</dt><dd>${bi(where[0], where[1])}</dd>`
      + `<dt>About how old · 大約多久以前</dt><dd>${bi(formatAgoEn(f.ago), formatAgoZh(f.ago))}</dd>`
      + `<dt>How we know the date · 怎麼知道年代</dt><dd>${bi(f.date_en, f.date_zh)}</dd></dl>`;
    show();
  }

  function show() {
    const d = depth(), i = layerIdx(), ago = floorAgo(), got = found();
    R.depth.innerHTML = bi(`Dug down ${d.toFixed(1)} m of ${totalDepth(layers).toFixed(1)} m`, `已經往下挖 ${d.toFixed(1)} 公尺（共 ${totalDepth(layers).toFixed(1)} 公尺）`);
    if (i < 0) {
      R.age.innerHTML = bi('today', '現在');
      R.lname.innerHTML = bi('The surface: nothing dug yet.', '地表：還沒開始挖。');
      tl.setBand(null); tl.setCursor(NEAR, { en: 'today', zh: '現在' });
    } else {
      const l = layers[i], rt = rangeText(l);
      R.age.innerHTML = bi(formatAgoEn(ago), formatAgoZh(ago));
      R.lname.innerHTML = `<b>${bi(`Layer ${i + 1}: ${l.en}`, `第 ${i + 1} 層：${l.zh}`)}</b>${bi(rt.en, rt.zh)}`;
      tl.setBand(l.fromAgo, Math.max(NEAR, l.toAgo));
      tl.setCursor(Math.max(NEAR, ago), { en: formatAgoEn(ago).replace('about ', '≈ '), zh: formatAgoZh(ago).replace('約 ', '≈ ') });
    }
    R.finds.querySelectorAll('.twh-find').forEach((b) => {
      const key = b.getAttribute('data-find'), f = findOf[key], ok = got.includes(key);
      b.hidden = !!f.intrusive && !state.later;
      b.disabled = !ok;
      b.classList.toggle('is-on', key === state.sel);
      b.setAttribute('aria-pressed', String(key === state.sel));
    });
    if (R.range && document.activeElement !== R.range) R.range.value = String(state.level);
    if (R.range) R.range.style.setProperty('--p', `${(state.level / n) * 100}%`);
    R.down.disabled = state.target >= n; R.up.disabled = state.target <= 0; R.refill.disabled = state.target <= 0 && state.level <= 0;
    root.setAttribute('data-level', String(Math.floor(state.level + 1e-6)));
  }

  let lastLayer = -1;
  function announce() {
    const i = layerIdx();
    if (i === lastLayer) return;
    lastLayer = i;
    if (i < 0) { say('The ground before anyone digs. Press Dig down.', '還沒有人挖過的地面。按「往下挖」。'); return; }
    const l = layers[i], rt = rangeText(l);
    say(`Layer ${i + 1}, ${l.en}: ${rt.en}. ${l.note_en}`, `第 ${i + 1} 層，${l.zh}：${rt.zh}。${l.note_zh}`);
  }
  function setLevel(v, instant) {
    state.target = Math.min(n, Math.max(0, v));
    if (instant) { state.level = state.target; apply(); }
  }
  function apply() {
    if (view) view.pit.setLevel(state.level);
    if (state.sel && !found().includes(state.sel)) { state.sel = null; R.card.innerHTML = ''; }
    show(); announce();
  }
  function step(dt) {
    if (script) {
      script.t += dt;
      while (script && script.list.length && script.t >= script.list[0].at) script.list.shift().fn();
      if (script && !script.list.length) script = null;
    }
    if (state.level !== state.target) {
      const d = SPEED * dt, diff = state.target - state.level;
      state.level = Math.abs(diff) <= d ? state.target : state.level + Math.sign(diff) * d;
      apply();
    }
  }
  function setLater(on) {
    state.later = !!on;
    const tg = $('[data-t="later"]'); if (tg) tg.checked = state.later;
    if (view) view.pit.setIntrusion(state.later);
    apply();
  }

  // ── 3D ──────────────────────────────────────────────────────────────
  function make3D() {
    let renderer;
    try { renderer = new WebGLRenderer({ canvas: cv, antialias: true }); } catch (e) { return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = PCFShadowMap;
    const scene = new Scene();
    scene.background = new Color(0x0b1326);
    const camera = new PerspectiveCamera(34, 1, 0.05, 200);
    const controls = new OrbitControls(camera, cv);
    controls.enableDamping = true; controls.dampingFactor = 0.08;
    controls.minDistance = 3; controls.maxDistance = 30;
    controls.minPolarAngle = Math.PI * 0.12; controls.maxPolarAngle = Math.PI * 0.52;
    controls.minAzimuthAngle = -Math.PI * 0.42; controls.maxAzimuthAngle = Math.PI * 0.42;
    scene.add(new HemisphereLight(0xe6edff, 0x2a2018, 1.0));
    scene.add(new AmbientLight(0xffffff, 0.35));
    const sun = new DirectionalLight(0xfff1dc, 1.5);
    sun.position.set(-3.5, 9, 9); sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -7, right: 7, top: 7, bottom: -7, near: 1, far: 30 });
    sun.shadow.bias = -0.0005; sun.shadow.normalBias = 0.03;
    scene.add(sun);

    const pit = makePit(layers, { pit: later ? { from: later.from, into: later.into, find: later.find } : null });
    scene.add(pit.group);
    const lab = labeler($('.al-labels'), cv, camera);
    const layerLabs = layers.map((l, i) => {
      const rt = rangeText(l);
      return lab.add('twh-lb', `<b>${i + 1}</b><span>${esc(l.en)}<span class="zh">${esc(l.zh)}</span><small>${esc(rt.en)}</small></span>`);
    });
    const pins = allFinds.map((f) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'al-lab twh-pin'; b.tabIndex = -1;
      b.innerHTML = `<i aria-hidden="true">${f.icon}</i>`;
      b.title = `${f.en} · ${f.zh}`;
      b.addEventListener('click', () => select(f.key));
      $('.al-labels').append(b);
      return { key: f.key, el: b };
    });
    const laterLab = later ? lab.add('twh-lb twh-lb-later', bi('A later pit', '後來挖的坑')) : null;

    const H = pit.height + 0.55;
    const center = V(0, -H * 0.46, 0.25);
    const DIR = V(0.42, 0.62, 1).normalize();
    const fit = (w, h) => {
      const vf = MathUtils.degToRad(camera.fov / 2), hf = Math.atan(Math.tan(vf) * camera.aspect);
      return Math.max(h / 2 / Math.tan(vf), w / 2 / Math.tan(hf));
    };
    function goHome() {
      const narrow = camera.aspect < 0.95;
      const dist = fit(DIM.W + (narrow ? 0.5 : 1.6), H + DIM.D * 0.62 + 0.9) + DIM.D * 0.4;
      camera.position.copy(DIR).multiplyScalar(dist).add(center);
      controls.target.copy(center); controls.update();
    }
    const tmp = V(0, 0, 0);
    function labels() {
      layerLabs.forEach((l, i) => { l.hidden = !state.labels; if (!l.hidden) lab.place(l, pit.layerAnchor(i, tmp)); });
      pins.forEach((p) => {
        const vis = pit.isFindVisible(p.key);
        p.el.hidden = !vis;
        if (vis) { lab.place(p.el, pit.findAnchor(p.key, tmp)); p.el.classList.toggle('is-on', p.key === state.sel); }
      });
      if (laterLab) { laterLab.hidden = !state.later; if (state.later) lab.place(laterLab, pit.intrusionAnchor(tmp), -4); }
    }
    function render() { controls.update(); labels(); renderer.render(scene, camera); }
    let band0 = -1;
    function resize() {
      const w = spaceWrap.clientWidth, h = spaceWrap.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.fov = camera.aspect < 1.1 ? 40 : 34;
      camera.updateProjectionMatrix();
      root.classList.toggle('twh-narrow', w < 560);
      // 只在版面大幅改變（直的↔橫的）時重設鏡頭；右欄多一列、少一列不動使用者轉好的視角
      const band = camera.aspect < 0.95 ? 0 : camera.aspect < 1.5 ? 1 : 2;
      if (band !== band0) { band0 = band; goHome(); }
    }
    $('.al-home').addEventListener('click', goHome);
    new ResizeObserver(resize).observe(spaceWrap);
    resize(); goHome();
    return { pit, camera, controls, scene, render, goHome };
  }
  view = make3D();
  if (!view) root.classList.add('al-nogl');

  // ── 控制 ────────────────────────────────────────────────────────────
  const stop = () => { script = null; };
  R.range.max = String(n);
  R.range.addEventListener('input', () => { stop(); setLevel(Number(R.range.value), true); });
  R.down.addEventListener('click', () => { stop(); setLevel(Math.floor(state.target + 1e-6) + 1); root.classList.remove('al-fresh'); });
  R.up.addEventListener('click', () => { stop(); setLevel(Math.ceil(state.target - 1e-6) - 1); });
  R.refill.addEventListener('click', () => { stop(); setLevel(0); });
  const tgL = $('[data-t="labels"]'), tgP = $('[data-t="later"]');
  if (tgL) tgL.addEventListener('change', () => { state.labels = tgL.checked; });
  if (tgP) tgP.addEventListener('change', () => {
    stop(); setLater(tgP.checked);
    if (tgP.checked) say(later.note_en, later.note_zh);
  });

  // ── 卡片示範 ────────────────────────────────────────────────────────
  const play = (list) => { script = { t: 0, list }; };
  const DEMO = {
    top() {
      stop(); setLater(false); setLevel(0, true); setLevel(1);
      play([{ at: 2.4, fn: () => select(layers[0].finds[0].key) }]);
    },
    deeper() {
      stop(); setLater(false); setLevel(0, true); select(null);
      say('Watch the marker on the timeline: every layer down is a step further back in time.', '看時間軸上的標記：每往下一層，就往回走一段時間。');
      play([{ at: 1.0, fn: () => setLevel(n) }]);
    },
    date() {
      stop(); setLater(false);
      const f = allFinds.find((x) => x.key === cfg.demo_date);
      setLevel(f.layer + 1);
      play([{ at: Math.abs(f.layer + 1 - state.level) / SPEED + 0.5, fn: () => select(f.key) }]);
    },
    later() {
      stop(); setLater(true);
      setLevel(Math.max(state.target, later.into + 1));
      say(later.note_en, later.note_zh);
      play([{ at: Math.abs(later.into + 1 - state.level) / SPEED + 0.6, fn: () => select(later.find.key) }]);
    },
  };

  let raf = 0, last = 0, visible = false;
  function frameLoop(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    step(dt);
    if (view) view.render();
    raf = requestAnimationFrame(frameLoop);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frameLoop); }
  }, { rootMargin: '120px' }).observe(root);

  setLevel(0, true);
  root.classList.add('al-ready', 'al-fresh');
  const near = (a, b) => Math.abs(a - b) <= 1e-6 * Math.max(1, Math.abs(b));
  root.__lab = {
    state, tl, pit: view && view.pit, view, setLevel, select, setLater, layers,
    level: () => state.level, depth, floorAgo, layer: layerIdx, found,
    demo: (v) => DEMO[v] && DEMO[v](),
    run: (sec) => { for (let t = 0; t < sec; t += 0.02) step(0.02); },
    render: () => { step(0); if (view) view.render(); },
    goCam: () => view && view.goHome(),
    /** 時間軸的游標＝坑底的年代；3D 裡看得到的出土物＝清單裡解鎖的出土物 */
    check: () => {
      const s = tl.state(), want = layerIdx() < 0 ? NEAR : Math.max(NEAR, floorAgo());
      const unlocked = [...R.finds.querySelectorAll('.twh-find:not([disabled]):not([hidden])')].map((b) => b.getAttribute('data-find')).sort();
      const seen = view ? allFinds.filter((f) => view.pit.isFindVisible(f.key)).map((f) => f.key).sort() : unlocked;
      return near(s.cursor, want) && JSON.stringify(unlocked) === JSON.stringify(found().sort()) && JSON.stringify(seen) === JSON.stringify(unlocked);
    },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() { initTimelines(); initEvidence(); }
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-twhdig-lab]', initLab, {
  demo: (lab, v) => lab.demo(v),
});
