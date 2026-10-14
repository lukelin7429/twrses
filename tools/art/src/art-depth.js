/*
 * 美術 Art · 第六課〈畫家怎麼畫出遠和近？〉：五棵一模一樣的樹，四種可以開關的線索。
 *
 * 左邊是「畫」（2D canvas，depth2d.js 的 drawPicture）：畫家用了哪幾種線索，畫面就照那幾種畫。
 * 右邊是「世界」（3D）：五棵樹立在平地上，離眼睛 5、8、12、18、27 公尺；可以從側面、從上面、從眼睛的位置看。
 * 世界不會因為開關而改變——只有「空氣」同時影響兩邊的顏色（因為空氣是世界裡真的有的東西）。
 * 顏色都用 MeshBasicMaterial／canvas 直接填 depth.js 算的數字，不經過場景燈光。
 *
 * 除錯：document.querySelector('[data-artdepth-lab]').__lab
 *   state、setCue(name, bool)、setAll(bool)、setView('side'|'top'|'eye')、items()＝目前畫面上的五棵樹、
 *   picPixel(n)＝畫面上第 n 棵樹的像素、worldPixel(n)＝3D 裡第 n 棵樹的像素、color(n)＝公式算的 0–255、
 *   demo('flat'|'air'|'side'|'eye')、render()
 */
import {
  BufferGeometry, Color, DoubleSide, Float32BufferAttribute, Group, Line, LineBasicMaterial, LineSegments, Mesh, MeshBasicMaterial,
  PerspectiveCamera, PlaneGeometry, Scene, Shape, ShapeGeometry, SphereGeometry, Vector3, WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { labeler, lazyBoot } from './common.js';
import { to255 } from './color.js';
import {
  ALL_ON, BASE, CUES, CUE_NAMES, DIST, EYE, GROUND, HAZE, HILL, PIC, aerial, compose, cueCount, describeColor, hillOutline, worldX, worldZ,
} from './depth.js';
import { frustum } from './persp.js';
import { drawPicture, initArrange, initFar, pixelAt } from './depth2d.js';

const V = (x, y, z) => new Vector3(x, y, z);

function initLab(root) {
  const $ = (s) => root.querySelector(s), $$ = (s) => Array.from(root.querySelectorAll(s));
  const pic = $('.ar-dp-pic'), cv = $('.ar-dp-cv'), wrap = $('.ar-dp-3d');
  const state = { cues: { ...ALL_ON }, view: 'side' };
  const R = { table: $('.ar-dp-table tbody'), count: $('.ar-dp-count'), msg: $('.ar-msg') };
  const bi = (en, zh) => `${en}<span class="zh">${zh}</span>`;
  const say = (en, zh) => { R.msg.innerHTML = bi(en, zh); };
  const hillColor = (i) => (state.cues.air ? aerial(BASE, DIST[i]) : BASE);
  let dirty = true, view = null, timers = [];
  const touch = () => { dirty = true; };
  const stopAuto = () => { timers.forEach(clearTimeout); timers = []; };
  const play = (list) => { stopAuto(); timers = list.map((s) => setTimeout(s.fn, s.at * 1000)); };

  function refresh() {
    const items = compose(state.cues), n = cueCount(state.cues);
    drawPicture(pic, items);
    $$('[data-cue]').forEach((c) => { c.checked = state.cues[c.getAttribute('data-cue')]; });
    $$('[data-view]').forEach((b) => b.setAttribute('aria-pressed', String(b.getAttribute('data-view') === state.view)));
    R.count.innerHTML = n === 0
      ? bi('No cues: five trees in a row. Nothing in the picture says which is far.', '一種線索都沒用：五棵樹排成一排，畫面上看不出哪一棵遠。')
      : bi(`${n} of 4 cues in use: ${CUES.filter((c) => state.cues[c]).map((c) => CUE_NAMES[c].en.toLowerCase()).join(', ')}.`, `用了 4 種線索裡的 ${n} 種：${CUES.filter((c) => state.cues[c]).map((c) => CUE_NAMES[c].zh).join('、')}。`);
    R.table.innerHTML = DIST.map((d, i) => {
      const it = items.find((q) => q.i === i), c = describeColor(it.color), [r, g, b] = to255(it.color);
      return `<tr><th scope="row"><span class="ar-dp-n">${i + 1}</span></th><td>${d} m</td><td>${Math.round(it.scale / items.find((q) => q.i === 0).scale * 100)}%</td>`
        + `<td><i class="ar-dp-sw" style="background:rgb(${r}, ${g}, ${b})"></i>L* ${c.L.toFixed(0)}</td></tr>`;
    }).join('');
    if (view) view.sync();
    touch();
  }
  function setCue(name, on, quiet) {
    if (!CUES.includes(name)) return;
    state.cues[name] = !!on; refresh();
    if (quiet) return;
    const T = {
      overlap: [['Overlap is on. A nearer tree covers part of the one behind it. You read the covered one as farther away.', '打開了「重疊」。近的樹蓋住後面那棵的一部分；被蓋住的，你會覺得比較遠。'], ['Overlap is off. The trees stand side by side and none hides another.', '關掉了「重疊」。五棵樹左右排開，誰也不擋誰。']],
      size: [['Size is on. The trees are really the same size, so the smaller a tree is drawn, the farther away it looks.', '打開了「大小」。五棵樹實際上一樣大，所以畫得越小的，看起來越遠。'], ['Size is off. All five trees are drawn the same size.', '關掉了「大小」。五棵樹畫得一樣大。']],
      position: [['Position is on. The foot of a far tree sits higher on the picture, closer to the horizon.', '打開了「位置」。遠的樹，底邊畫在畫面上比較高的地方，比較靠近地平線。'], ['Position is off. All five trees stand on one line.', '關掉了「位置」。五棵樹的底邊排在同一條線上。']],
      air: [['Air is on. Far trees turn paler and bluer, toward the color of the sky near the horizon. The 3D world on the right changes too, because the air is really there.', '打開了「空氣」。遠的樹變淡、變藍，往地平線附近天空的顏色靠過去。右邊的 3D 世界也跟著變，因為空氣是真的在那裡的。'], ['Air is off. Every tree is the same dark green.', '關掉了「空氣」。每棵樹都是同一個深綠色。']],
    }[name][on ? 0 : 1];
    say(T[0], T[1]);
  }
  function setAll(on, quiet) { CUES.forEach((c) => { state.cues[c] = !!on; }); refresh(); if (!quiet) say(on ? 'All four cues are on.' : 'All four cues are off. The five trees are still at five different distances in the world on the right, but the picture no longer shows it.', on ? '四種線索全部打開了。' : '四種線索全部關掉了。在右邊的世界裡，五棵樹還是在五個不同的距離；只是畫面不再表現出來。'); }

  // ── 3D：世界 ─────────────────────────────────────────────────────────
  function make3D() {
    let renderer;
    try { renderer = new WebGLRenderer({ canvas: cv, antialias: true }); } catch (e) { return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const scene = new Scene(); scene.background = new Color(0x0c0e13);
    const camera = new PerspectiveCamera(40, 4 / 3, 0.1, 300);
    const controls = new OrbitControls(camera, cv);
    controls.enableDamping = true; controls.dampingFactor = 0.08; controls.enablePan = false;
    controls.minDistance = 6; controls.maxDistance = 80; controls.maxPolarAngle = 1.52;
    const TARGET = V(0.5, 0.8, -9);
    const ground = new Mesh(new PlaneGeometry(40, 44), new MeshBasicMaterial({ color: new Color(...GROUND).multiplyScalar(0.55), side: DoubleSide }));
    ground.rotation.x = -Math.PI / 2; ground.position.set(0, -0.01, -12); scene.add(ground);
    // 五棵樹：同一個輪廓、同樣大小
    const shape = new Shape(); hillOutline().forEach(([x, y], k) => (k ? shape.lineTo(x, y) : shape.moveTo(x, y)));
    const geo = new ShapeGeometry(shape);
    const trees = DIST.map((d, i) => { const m = new Mesh(geo, new MeshBasicMaterial({ color: 0xffffff, side: DoubleSide })); m.position.set(worldX(i), 0, worldZ(i)); scene.add(m); return m; });
    // 畫面（窗戶的框）、眼睛、從眼睛到每棵樹頂的視線
    const fp = [-PIC.w / 2, 0, 0, PIC.w / 2, 0, 0, PIC.w / 2, 0, 0, PIC.w / 2, PIC.h, 0, PIC.w / 2, PIC.h, 0, -PIC.w / 2, PIC.h, 0, -PIC.w / 2, PIC.h, 0, -PIC.w / 2, 0, 0];
    const fg = new BufferGeometry(); fg.setAttribute('position', new Float32BufferAttribute(fp, 3));
    const frame = new LineSegments(fg, new LineBasicMaterial({ color: 0xffd36e })); scene.add(frame);
    const eye = new Mesh(new SphereGeometry(0.16, 20, 14), new MeshBasicMaterial({ color: 0xffffff })); eye.position.set(EYE.x, EYE.y, EYE.d); scene.add(eye);
    const sight = new Group(); scene.add(sight);
    DIST.forEach((d, i) => {
      const g = new BufferGeometry(); g.setAttribute('position', new Float32BufferAttribute([EYE.x, EYE.y, EYE.d, worldX(i), 1.0, worldZ(i)], 3));
      sight.add(new Line(g, new LineBasicMaterial({ color: 0x8b98b8 })));
    });
    const lab = labeler($('.al-labels'), cv, camera);
    const hl = DIST.map((d, i) => lab.add('ar-lb ar-lb-zone', `<i class="ar-lb-num">${i + 1}</i><span class="ar-lb-nm"> ${d} m</span>`));
    const eyeLab = lab.add('ar-lb ar-lb-lamp', 'Eye <span class="zh">眼睛</span>'), picLab = lab.add('ar-lb ar-lb-lamp', 'Picture <span class="zh">畫面</span>');
    const p3 = V(0, 0, 0);
    let mode = 'orbit';
    function setView(v) {
      state.view = v; mode = v === 'eye' ? 'eye' : 'orbit';
      controls.enabled = mode === 'orbit';
      if (v === 'side') { camera.position.set(21, 9, 13); controls.target.copy(TARGET); }
      else if (v === 'top') { camera.position.set(0.5, 44, -8.9); controls.target.copy(TARGET); }
      sync();
    }
    function sync() {
      trees.forEach((m, i) => m.material.color.setRGB(...hillColor(i), 'srgb'));
      const isEye = mode === 'eye';
      frame.visible = eye.visible = sight.visible = !isEye;
      ground.material.color.setRGB(...(isEye ? GROUND : GROUND.map((v) => v * 0.55)), 'srgb');
      scene.background.setRGB(...(isEye ? HAZE : [0.047, 0.055, 0.075]), 'srgb');
      if (isEye) {
        const f = frustum(EYE, 0.1);
        camera.position.set(EYE.x, EYE.y, EYE.d); camera.rotation.set(0, 0, 0); camera.updateMatrixWorld(true);
        camera.projectionMatrix.makePerspective(f.left, f.right, f.top, f.bottom, f.near, 300);
        camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
      } else { camera.fov = 40; camera.aspect = 4 / 3; camera.updateProjectionMatrix(); }
    }
    function render() {
      if (mode === 'orbit') controls.update();
      renderer.render(scene, camera);
      const isEye = mode === 'eye';
      hl.forEach((el, i) => { lab.place(el, p3.set(worldX(i), HILL.h + 0.35, worldZ(i))); });
      eyeLab.hidden = picLab.hidden = isEye;
      if (!isEye) { lab.place(eyeLab, p3.set(EYE.x, EYE.y + 0.5, EYE.d)); lab.place(picLab, p3.set(-PIC.w / 2, PIC.h + 0.3, 0)); }
    }
    controls.addEventListener('change', touch);
    function resize() { const w = wrap.clientWidth, h = wrap.clientHeight; if (!w || !h) return; renderer.setSize(w, h, false); root.classList.toggle('ar-narrow', w < 420); touch(); }
    new ResizeObserver(resize).observe(wrap); resize();
    const px = new Uint8Array(4);
    function pixelOf(i) {
      sync(); if (mode === 'orbit') controls.update(); renderer.render(scene, camera);
      p3.set(worldX(i) - 0.3, 0.45, worldZ(i)).project(camera);
      const gl = renderer.getContext();
      gl.readPixels(Math.round((p3.x * 0.5 + 0.5) * cv.width), Math.round((p3.y * 0.5 + 0.5) * cv.height), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
      touch(); return [px[0], px[1], px[2]];
    }
    setView('side');
    return { sync, render, setView, pixelOf };
  }
  view = make3D();
  if (!view) root.classList.add('al-nogl');

  $$('[data-cue]').forEach((c) => c.addEventListener('change', () => { stopAuto(); setCue(c.getAttribute('data-cue'), c.checked); }));
  $$('[data-all]').forEach((b) => b.addEventListener('click', () => { stopAuto(); setAll(b.getAttribute('data-all') === 'on'); }));
  const setView = (v) => { if (view) { view.setView(v); refresh(); } };
  $$('[data-view]').forEach((b) => b.addEventListener('click', () => {
    stopAuto(); const v = b.getAttribute('data-view'); setView(v);
    if (v === 'eye') say('This is the world seen from the eye, through the picture frame. Overlap, size, and position are already there. A painter who copies this view gets them for free.', '這是從眼睛的位置、透過畫框看到的世界。重疊、大小和位置已經都在裡面了；畫家照著這個畫面畫，這三樣自然就有了。');
    else if (v === 'top') say('From above you can see the real distances: 5, 8, 12, 18, and 27 m from the eye. The gray lines are lines of sight.', '從上面可以看到真正的距離：離眼睛 5、8、12、18、27 公尺。灰色的線是視線。');
    else say('From the side the trees turn into thin slices, like the layers of a paper theater. They are all the same size.', '從側面看，五棵樹變成薄薄的幾片，像紙劇場的一層一層。它們其實一樣大。');
  }));
  window.addEventListener('resize', () => drawPicture(pic, compose(state.cues)));

  const DEMO = {
    flat() {
      setAll(false);
      play([{ at: 3.5, fn: () => setCue('overlap', true) }, { at: 7, fn: () => setCue('size', true) }, { at: 10.5, fn: () => setCue('position', true) }, { at: 14, fn: () => setCue('air', true) }]);
    },
    air() { setAll(false, true); setCue('air', true); play([{ at: 5, fn: () => setAll(true) }]); },
    side() { setAll(true, true); setView('side'); say('From the side the trees turn into thin slices, like the layers of a paper theater. They are all the same size.', '從側面看，五棵樹變成薄薄的幾片，像紙劇場的一層一層。它們其實一樣大。'); play([{ at: 5, fn: () => $$('[data-view="top"]')[0].click() }]); },
    eye() { setAll(true, true); $$('[data-view="eye"]')[0].click(); },
  };

  let raf = 0, visible = false;
  function frame() { raf = 0; if (!visible) return; if (view && dirty) { dirty = false; view.render(); } raf = requestAnimationFrame(frame); }
  new IntersectionObserver((ents) => { visible = ents[0].isIntersecting; if (visible && !raf) { dirty = true; raf = requestAnimationFrame(frame); } if (!visible) stopAuto(); }, { rootMargin: '120px' }).observe(root);

  refresh();
  say('Five trees, all the same size and the same dark green, stand at five distances. On the left is a picture of them. Switch the four cues on and off and see what each one does.', '五棵一樣大、一樣深綠的樹，立在五個不同的距離。左邊是把它們畫下來的一張畫。把四種線索開開關關，看每一種各做了什麼。');
  root.classList.add('al-ready');
  root.__lab = {
    state, setCue, setAll, setView,
    items: () => compose(state.cues),
    color: (n) => to255(hillColor(n - 1)),
    picPixel: (n) => { const it = compose(state.cues).find((q) => q.n === n); return pixelAt(pic, it.x - 0.3 * it.scale, it.baseY + 0.45 * it.scale); },
    worldPixel: (n) => (view ? view.pixelOf(n - 1) : null),
    demo: (v) => DEMO[v] && DEMO[v](),
    render: () => { if (view) { view.sync(); view.render(); } },
  };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function init2D() {
  const a = document.querySelector('[data-ar-far]'); if (a) initFar(a);
  const b = document.querySelector('[data-ar-arrange]'); if (b) initArrange(b);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-artdepth-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
