/*
 * 地理 Geography · 第十一課「台灣的人住在哪裡？」。
 *
 * 一個想法：台灣的人大多住在西部的平原與盆地，高山幾乎沒有人；地形決定了城市在哪裡。
 * 3D：第九課的立體台灣（taiwan3d.js）＋人口柱子：每 3 × 3 公里一根，高度＝住在那一塊的人數（twpop.js，GHS-POP 2025 推估），
 * 顏色＝那一塊的平均海拔屬於哪一個海拔帶。選一個海拔帶：那一帶的柱子亮起來、其他變灰，旁邊讀出「住了幾成的人、占幾成的土地」。
 * 點地形：方圓 5 公里內大約住了多少人、每平方公里幾人、海拔與地形（第九課的 landform）。
 * 不畫縣市界；標的是城市名（Natural Earth 的位置）與玉山。
 * 2D（不需要 WebGL）：twhundred2d.js「一百個台灣人住在哪裡？」、city2d.js「這裡適合蓋城市嗎？」。
 *
 * 產物：cd tools/geo && npm run build → assets/js/geo-twpeople.js
 * 除錯：document.querySelector('[data-geotp-lab]').__lab
 *   state（band、pick）、setBand(null|'low'|'mid'|'high')、pickAt(e, n 公里)、view(k)、demo('all'|'low'|'high'|'taipei')、info()、render()、goHome()
 */
import { BoxGeometry, BufferAttribute, BufferGeometry, Color, InstancedMesh, Line, LineBasicMaterial, MeshLambertMaterial, Object3D, Vector3 } from 'three';
import { lazyBoot } from './common.js';
import { getTaiwan, heightAt, landform } from './taiwan.js';
import { makeTaiwan3D } from './taiwan3d.js';
import { BANDS, bandOf, bandStats, blocks, getTwPop, near } from './twpop.js';
import { initTwHundred } from './twhundred2d.js';
import { initCity } from './city2d.js';

export const BLOCK = 3;               // 每根柱子 3 × 3 公里
export const PER_UNIT = 40000;        // 柱子高一個世界單位（＝畫面上 10 公里）代表 4 萬人
export const RADIUS = 5;              // 點地形時算方圓幾公里
const CITY_LABELS = ['taipei', 'kaohsiung', 'taichung', 'tainan', 'taoyuan', 'hualien', 'taitung', 'hsinchu', 'chiayi', 'yilan', 'keelung', 'changhua'];
const FORM = { plain: ['on a plain', '平原'], basin: ['in a basin', '盆地'], tableland: ['on a tableland', '台地'], valley: ['in a long valley', '縱谷'], mountain: ['in the high mountains', '高山'] };

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const cv = $('.al-space-cv'), spaceWrap = $('.al-space');
  const T = getTaiwan(), P = getTwPop(), B = bandStats(T, P);
  const state = { band: null, pick: null };
  const fmt = (x) => Math.round(x).toLocaleString('en-US');
  const pct = (x) => (x < 0.005 ? '<1' : String(Math.round(x * 100)));

  function readout() {
    const out = $('.gg-tp-out');
    let html = '';
    if (state.band) {
      const b = B[state.band], d = BANDS.find((x) => x.key === state.band);
      html += `<p class="gg-tp-band" style="--c:${d.color}"><b>${d.en}</b><span class="zh">${d.zh}</span></p>
        <dl class="gg-sb-nums"><div><dt>People<span class="zh">住了幾成的人</span></dt><dd>${pct(b.pShare)} <small>%</small></dd></div>
        <div><dt>Land<span class="zh">占幾成的土地</span></dt><dd>${pct(b.aShare)} <small>%</small></dd></div>
        <div class="gg-sb-wide"><dt>People per km²<span class="zh">每平方公里幾人</span></dt><dd>${fmt(b.people / b.km2)}</dd></div></dl>`;
    }
    if (state.pick) {
      const [e, n] = state.pick, r = near(T, P, e, n, RADIUS), z = heightAt(T, e, n), f = FORM[landform(T, e, n)], den = r.density >= 1000 ? Math.round(r.density / 100) * 100 : r.density;
      const few = r.people < 100, pe = few ? 'fewer than <b>100</b>' : `about <b>${fmt(Math.round(r.people / 100) * 100)}</b>`, pz = few ? '不到 <b>100</b>' : `大約 <b>${fmt(Math.round(r.people / 100) * 100)}</b>`;
      html += `<p class="gg-rn-where">Within ${RADIUS} km of this point: ${pe} people, <b>${fmt(den)}</b> per km². The land here is ${fmt(z)} m high${f ? `, ${f[0]}` : ''}.<span class="zh">這一點方圓 ${RADIUS} 公里內住了${pz} 人，每平方公里 <b>${fmt(den)}</b> 人。這裡海拔 ${fmt(z)} 公尺${f ? `，是${f[1]}` : ''}。</span></p>`;
    }
    if (!html) html = `<p class="gg-rn-where">Pick a height band, or tap the land to count the people nearby.<span class="zh">選一個海拔帶，或點地形，數數附近住了多少人。</span></p>`;
    out.innerHTML = html;
    root.querySelectorAll('[data-band]').forEach((b) => b.setAttribute('aria-pressed', String((b.dataset.band || null) === state.band || (!b.dataset.band && !state.band))));
    return api.info();
  }

  let view = null;
  try { view = init3D(); } catch (e) { view = null; }
  if (!view) root.classList.add('al-nogl');

  function init3D() {
    const places = { ...T.places }; for (const [k, c] of Object.entries(P.cities)) places[k] = c;
    const labels = CITY_LABELS.map((k) => [k, P.cities[k].en, P.cities[k].zh]); labels.splice(3, 0, ['yushan', 'Yushan', '玉山']);   // 玉山排第四：空空的高山也是重點
    let tw;
    try { tw = makeTaiwan3D({ cv, wrap: spaceWrap, labelsEl: $('.al-labels'), T: { ...T, places }, labels, onPick: (e, n) => api.pickAt(e, n) }); } catch (e) { return null; }
    // 柱子最高約 10 個世界單位：從南邊看時相機抬高、看向半空，臺北的柱子才不會被切掉
    tw.addView('south', [new Vector3(6, 30, 46), new Vector3(0, 3.5, -1)]);
    tw.addView('west', [new Vector3(-26, 14, 8), new Vector3(0, 2.5, -1)]);
    tw.addView('east', [new Vector3(26, 13, 8), new Vector3(0, 2.5, -1)]);
    tw.look('south');
    // 人口柱子：一個 InstancedMesh，柱底在地表、往上長
    const bl = blocks(T, P, BLOCK).filter((b) => b.people >= 50);
    const geo = new BoxGeometry(1, 1, 1); geo.translate(0, 0.5, 0);
    const mesh = new InstancedMesh(geo, new MeshLambertMaterial({ color: 0xffffff }), bl.length);
    const o = new Object3D(), w = (BLOCK / 10) * 0.78;
    bl.forEach((b, i) => {
      const s = tw.surface(b.e, b.n, 0);
      o.position.copy(s); o.scale.set(w, Math.max(0.004, b.people / PER_UNIT), w); o.updateMatrix(); mesh.setMatrixAt(i, o.matrix);
    });
    mesh.frustumCulled = false; tw.scene.add(mesh);
    const C = new Color(), GRAY = new Color(0x4a5672);
    function paint() {
      bl.forEach((b, i) => { const k = bandOf(b.z); C.set(BANDS.find((x) => x.key === k).color); if (state.band && state.band !== k) C.copy(GRAY); mesh.setColorAt(i, C); });
      mesh.instanceColor.needsUpdate = true;
    }
    paint();
    // 點的地方：方圓 RADIUS 公里的金色圈
    const ringG = new BufferGeometry(); ringG.setAttribute('position', new BufferAttribute(new Float32Array(3 * 65), 3));
    const ring = new Line(ringG, new LineBasicMaterial({ color: 0xffd36e })); ring.visible = false; ring.frustumCulled = false; tw.scene.add(ring);
    function setRing() {
      if (!state.pick) { ring.visible = false; return; }
      const a = ringG.getAttribute('position'), [e, n] = state.pick;
      for (let i = 0; i <= 64; i++) { const t = (i / 64) * Math.PI * 2, v = tw.surface(e + RADIUS * Math.cos(t), n + RADIUS * Math.sin(t), 0.06); a.setXYZ(i, v.x, v.y, v.z); }
      a.needsUpdate = true; ring.visible = true;
    }
    new ResizeObserver(() => { tw.resize(); tw.render(); }).observe(spaceWrap);
    return { tw, controls: tw.controls, render: tw.render, look: tw.look, paint, setRing, mesh, count: bl.length };
  }

  const api = {
    state, ready: () => true,
    setBand(k) { state.band = k || null; if (view) view.paint(); readout(); kick(); return state.band && B[state.band]; },
    pickAt(e, n) { if (Number.isNaN(heightAt(T, e, n))) return null; state.pick = [e, n]; if (view) view.setRing(); readout(); kick(); return near(T, P, e, n, RADIUS); },
    view(k) { if (view) { view.look(k); kick(); } },
    demo(k) {
      if (k === 'all') { api.setBand(null); api.view('south'); }
      else if (k === 'low' || k === 'high') { api.setBand(k); api.view(k === 'high' ? 'east' : 'west'); }
      else if (k === 'taipei') { const c = P.cities.taipei; api.pickAt(c.e, c.n); api.view('south'); }
      kick();
    },
    info() { const r = state.pick && near(T, P, ...state.pick, RADIUS); return { band: state.band, bandStats: state.band && B[state.band], pick: state.pick, near: r, columns: view && view.count }; },
    goHome() { api.view('south'); },
    render() { if (view) view.render(); },
  };
  root.querySelectorAll('[data-band]').forEach((b) => b.addEventListener('click', () => api.setBand(b.dataset.band || null)));
  root.querySelectorAll('[data-view]').forEach((b) => b.addEventListener('click', () => api.view(b.dataset.view)));
  root.querySelectorAll('[data-t]').forEach((c) => c.addEventListener('change', () => {
    const k = c.dataset.t;
    if (k === 'labels' && view) view.tw.showLabels(c.checked);
    else if (k === 'columns' && view) view.mesh.visible = c.checked;
    else if (k === 'sea' && view) view.tw.terrain.show('water', c.checked);
    kick();
  }));
  if (view) $('.al-home').addEventListener('click', () => api.goHome());

  let raf = 0, visible = true, idle = 0;
  function frame() {
    raf = 0;
    const moving = view ? view.controls.update() : false;
    if (view) view.render();
    idle = moving ? 0 : idle + 1;
    if (visible && idle < 60) raf = requestAnimationFrame(frame);
  }
  function kick() { idle = 0; if (!raf && visible) raf = requestAnimationFrame(frame); }
  if (view) { view.controls.addEventListener('start', kick); view.controls.addEventListener('change', kick); }
  new IntersectionObserver((ents) => { visible = ents[0].isIntersecting; if (visible) kick(); }).observe(root);
  readout(); kick();
  root.__lab = api;
  return api;
}

function init2D() {
  document.querySelectorAll('[data-gg-twhundred]').forEach((el) => initTwHundred(el));
  document.querySelectorAll('[data-gg-city]').forEach((el) => initCity(el));
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D); else init2D();

lazyBoot('[data-geotp-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
