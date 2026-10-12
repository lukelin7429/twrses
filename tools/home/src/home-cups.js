/*
 * 家政 Life Skills at Home · 第一課「美國的食譜為什麼寫『幾杯』？」的 3D 模型（全部自繪示意）。
 *
 * 一個想法：**量東西有兩種方法——量體積（杯、匙）和量重量（公克）。同樣一杯，不同的東西不一樣重。**
 * 流理台上有一個量杯、一台電子秤、一排量匙，後面是五種食材（水、麵粉、糖、米、油；全是素的）。
 *   data-food            選食材：罐子過來倒進量杯 → 量杯放上秤 → 秤上的數字跳出來
 *   data-amount          1/4、1/3、1/2、3/4、1 杯
 *   data-pack            麵粉：鬆鬆地舀（loose）／壓實（packed）
 *   .hm-onoff            把量杯放上秤／拿下來（秤事先用空杯歸零，所以讀數只有裡面的東西）
 *   .hm-spoons           三茶匙倒進一湯匙
 * 「一杯大約幾公克」不寫在程式裡：全部讀 data-foods（build.py 從 data/home.json 的 lab.foods 放進來），
 * 所以模型上的數字一定和頁面上的出處一致（test/data.test.mjs 也檢查同一份資料）。
 *
 * 控制器不靠 WebGL：沒有 WebGL 時 3D 不畫，右邊的讀數、長條圖與按鈕照樣能用。
 * 2D（不需要 WebGL）：幫食譜換單位（convert2d.js）、放大縮小（scale2d.js）、誰的一杯（cups2d.js）。
 *
 * 產物：cd tools/home && npm run build → assets/js/home-cups.js
 * 除錯：document.querySelector('[data-homecups-lab]').__lab
 *   state（food、amount、packed、onScale、filled、shown）、reading()（秤上現在顯示的公克數）、target()（照資料算出來應該是幾公克）、
 *   ml()、setFood(key)、setAmount('3/4')、setPacked(bool)、setOnScale(bool)、spoons()、demo('same'|'pack'|'spoons'|'steps')、
 *   run(秒)（把動畫快轉）、render()、ready()、view（沒有 WebGL 是 null）
 */
import { Vector3 } from 'three';
import { lazyBoot } from './common.js';
import { createCounter, ease, lerp, makeTweens } from './counter.js';
import { makeBowl, makeJar, makeMeasuringCup, makeScale, makeSpoon, makeStream } from './props.js';
import { ML, G, cupsToGrams, fnum, formatAmount, parseAmount, toMl } from './units.js';
import { initConvert } from './convert2d.js';
import { initScale } from './scale2d.js';
import { initCups } from './cups2d.js';

const CUP_HOME = [-1.0, 0, 0.8];
const SCALE_AT = [2.15, 0, 0.45];
const JAR_X = [-4.9, -3.7, -2.5, -1.3, -0.15], JAR_Z = -1.35;
const SPOONS = [['tbsp', -4.95, '1 tbsp'], ['tsp', -4.15, '1 tsp'], ['half', -3.5, '1/2'], ['quarter', -2.95, '1/4']];
const SPOON_Z = 0.35;
const TILT = 1.85;

function init(root) {
  const $ = (s) => root.querySelector(s), $$ = (s) => Array.from(root.querySelectorAll(s));
  const FOODS = JSON.parse(root.getAttribute('data-foods'));
  const byKey = Object.fromEntries(FOODS.map((f) => [f.key, f]));
  const cv = $('.al-space-cv'), spaceWrap = $('.al-space');
  const R = {
    g: $('.hm-read-g'), what: $('.hm-read-what'), vol: $('.hm-vol'), wt: $('.hm-wt'), vs: $('.hm-vs'),
    msg: $('.hm-msg'), pack: $('.hm-pack'), onoff: $('.hm-onoff'), spoons: $('.hm-spoons'),
  };
  const state = { food: null, amount: parseAmount('1'), amountText: '1', packed: false, onScale: false, filled: 0, shown: 0, cupK: 0, labels: true };
  const tw = makeTweens();
  let script = null, view = null;

  const gPerCup = (f = state.food, packed = state.packed) => (f ? (packed && f.g_cup_packed ? f.g_cup_packed : f.g_cup) : 0);
  const target = () => (state.food ? cupsToGrams(fnum(state.amount), gPerCup()) : 0);
  const ml = () => toMl(fnum(state.amount), 'cup');
  const reading = () => Math.round(state.shown);
  const say = (en, zh) => { R.msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  const cupWord = () => formatAmount(state.amount, 'cup');
  const cupZh = () => `${state.amountText} 杯`;
  const how = (f = state.food) => (f.g_cup_packed ? (state.packed ? [', packed down', '（壓實）'] : [', spooned in loosely', '（鬆鬆地舀）']) : ['', '']);

  function paint() {
    const f = state.food;
    R.g.innerHTML = `${reading()} <small>g</small>`;
    $$('[data-food]').forEach((b) => b.setAttribute('aria-pressed', String(!!f && b.getAttribute('data-food') === f.key)));
    $$('[data-amount]').forEach((b) => b.setAttribute('aria-pressed', String(b.getAttribute('data-amount') === state.amountText)));
    $$('[data-pack]').forEach((b) => b.setAttribute('aria-pressed', String((b.getAttribute('data-pack') === 'packed') === state.packed)));
    R.pack.hidden = !(f && f.g_cup_packed);
    R.onoff.innerHTML = state.onScale ? 'Take the cup off the scale<span class="zh">把量杯從秤上拿下來</span>' : 'Put the cup on the scale<span class="zh">把量杯放上秤</span>';
    R.onoff.disabled = !f;
    R.vol.innerHTML = `${cupWord()} = ${Math.round(ml())} mL`;
    if (!f) {
      R.what.innerHTML = 'The cup is empty. Pick something to pour in.<span class="zh">量杯是空的。選一樣東西倒進去。</span>';
      R.wt.innerHTML = '&mdash;'; R.vs.innerHTML = '&mdash;';
    } else {
      const g = target(), h = how();
      R.what.innerHTML = `${cupWord()} of ${f.en.toLowerCase()}${h[0]}<span class="zh">${cupZh()}${f.zh}${h[1]}</span>`;
      R.wt.innerHTML = `about ${Math.round(g)} g<small>${(g / G.oz).toFixed(1)} oz · 約 ${Math.round(g)} 公克</small>`;
      const water = byKey.water ? gPerCup(byKey.water, false) : 0;
      R.vs.innerHTML = water ? `× ${(gPerCup() / water).toFixed(2)}` : '&mdash;';
    }
    // 長條圖：同樣的份量，五種食材各幾公克
    const cups = fnum(state.amount);
    const max = Math.max(...FOODS.map((x) => x.g_cup_packed || x.g_cup));
    FOODS.forEach((x) => {
      const row = $(`[data-bar="${x.key}"]`); if (!row) return;
      const pk = !!(f && x.key === f.key && state.packed);
      const g = cupsToGrams(cups, gPerCup(x, pk));
      row.classList.toggle('is-on', !!f && x.key === f.key);
      row.querySelector('i').style.width = `${(gPerCup(x, pk) / max * 100).toFixed(1)}%`;
      row.querySelector('b').textContent = `${Math.round(g)} g`;
    });
    const bk = $('.hm-bars-k b'); if (bk) bk.textContent = cupWord();
    const bz = $('.hm-bars-k .hm-bars-zh'); if (bz) bz.textContent = cupZh();
  }

  // ── 動作（都排進補間佇列；沒有 WebGL 時一樣跑，只是沒有畫面）──────────────
  const cupPos = new Vector3(...CUP_HOME);
  function placeCup(k) {                       // k：0 在檯面，1 在秤上
    state.cupK = k;
    const sy = view ? view.scale.userData.plateY : 0.34, sz = view ? view.scale.userData.plateZ : -0.28;
    const e = ease(k);
    cupPos.set(lerp(CUP_HOME[0], SCALE_AT[0], e), lerp(0, sy, e) + Math.sin(Math.PI * k) * 0.75, lerp(CUP_HOME[2], SCALE_AT[2] + sz, e));
  }
  function moveCup(on, dur = 0.55) {
    const from = state.cupK, to = on ? 1 : 0;
    if (from === to) { state.onScale = on; return; }
    if (!on) state.onScale = false;
    tw.add(dur, (k) => placeCup(lerp(from, to, k)), () => { state.onScale = on; paint(); });
  }
  function fillTo(cups, dur) {
    const from = state.filled;
    tw.add(dur, (k) => { state.filled = lerp(from, cups, ease(k)); }, () => { state.filled = cups; });
  }
  function pour(food, done) {
    const jar = view && view.jars[food.key];
    const cups = fnum(state.amount);
    if (!jar) { fillTo(cups, 0.5); tw.add(0, null, done); return; }
    const u = jar.userData, cup = view.cup.userData;
    const home = u.home.clone();
    const over = new Vector3(cupPos.x - u.H * Math.sin(TILT) - 0.12, cup.rimY + 0.95, cupPos.z);
    if (u.lid) u.lid.forEach((m) => { m.visible = false; });
    tw.add(0.4, (k) => { jar.position.lerpVectors(home, over, ease(k)); jar.position.y += Math.sin(Math.PI * k) * 0.5; u.inner.rotation.z = -ease(k) * TILT; });
    const from = state.filled;
    tw.add(0.85, (k) => {
      state.filled = lerp(from, cups, k);
      const lip = over.y + u.H * Math.cos(TILT);
      view.stream.userData.set(cupPos.x, lip, cupPos.y + cup.surfaceY(state.filled), cupPos.z, food.color, food.kind === 'liquid' ? 0.7 : 0.95);
    }, () => { state.filled = cups; view.stream.userData.hide(); });
    tw.add(0.4, (k) => { jar.position.lerpVectors(over, home, ease(k)); jar.position.y += Math.sin(Math.PI * k) * 0.5; u.inner.rotation.z = -(1 - ease(k)) * TILT; },
      () => { if (u.lid) u.lid.forEach((m) => { m.visible = true; }); if (done) done(); });
  }
  function resetJars() {
    if (!view) return;
    view.stream.userData.hide();
    Object.values(view.jars).forEach((j) => { j.position.copy(j.userData.home); j.userData.inner.rotation.z = 0; if (j.userData.lid) j.userData.lid.forEach((m) => { m.visible = true; }); });
  }
  function settle() { tw.clear(); resetJars(); placeCup(state.onScale ? 1 : 0); resetSpoons(); }

  function setFood(key, { quiet = false, weigh = true } = {}) {
    const f = byKey[key]; if (!f) return;
    settle();
    if (state.cupK > 0) moveCup(false, 0.4);
    tw.add(state.filled > 0 ? 0.25 : 0, (k) => { state.filled *= 1 - k; }, () => {
      state.filled = 0; state.food = f; if (!f.g_cup_packed) state.packed = false; paint();
    });
    tw.add(0, null, () => pour(f, () => { if (weigh) moveCup(true); tw.add(0, null, () => { if (!quiet) tell(); }); }));
    if (!quiet) say(`Pouring ${f.en.toLowerCase()} up to the ${state.amountText}-cup line, then onto the scale…`, `把${f.zh}倒到 ${state.amountText} 杯的刻度，再放上秤……`);
  }
  function setAmount(text, { quiet = false } = {}) {
    settle();
    state.amount = parseAmount(text); state.amountText = text;
    if (state.food) fillTo(fnum(state.amount), 0.45);
    paint(); if (!quiet) tell();
  }
  function setPacked(p, { quiet = false } = {}) {
    if (!state.food || !state.food.g_cup_packed) return;
    settle(); state.packed = !!p; paint(); if (!quiet) tell();
  }
  function setOnScale(on) { if (!state.food) return; settle(); moveCup(!!on); paint(); }
  function tell() {
    const f = state.food; if (!f) return;
    const g = Math.round(target()), h = how();
    const off = state.onScale || state.cupK ? ['', ''] : [' Put it on the scale to check.', '把它放上秤看看。'];
    say(`${cupWord()} of ${f.en.toLowerCase()}${h[0]}${h[0] ? ',' : ''} weighs about ${g} g. It still takes up ${Math.round(ml())} mL.${off[0]}`,
        `${cupZh()}${f.zh}${h[1]}大約 ${g} 公克；體積還是 ${Math.round(ml())} 毫升。${off[1]}`);
  }

  // ── 量匙：三茶匙 = 一湯匙 ────────────────────────────────────────────────
  const spoonState = { n: 0, tbsp: 0, tsp: 0, k: 0, tip: 0, on: false };
  function resetSpoons() { Object.assign(spoonState, { n: 0, tbsp: 0, tsp: 0, k: 0, tip: 0, on: false }); }
  function spoons() {
    stopAuto(); settle();
    spoonState.on = true;
    say('One teaspoon of water at a time into the tablespoon…', '一次一茶匙的水，倒進湯匙裡……');
    for (let i = 1; i <= 3; i++) {
      tw.add(0.25, null, () => { spoonState.tsp = 1; });
      tw.add(0.5, (k) => { spoonState.k = ease(k); });
      tw.add(0.35, (k) => { spoonState.tip = ease(k); spoonState.tsp = 1 - k; spoonState.tbsp = (i - 1 + k) / 3; }, () => {
        spoonState.n = i; spoonState.tsp = 0; spoonState.tbsp = i / 3;
        if (i < 3) say(`${i} teaspoon${i > 1 ? 's' : ''}: the tablespoon is ${i === 1 ? 'one third' : 'two thirds'} full.`, `${i} 茶匙：湯匙裝了三分之${i === 1 ? '一' : '二'}。`);
        else say(`3 teaspoons = 1 tablespoon. In milliliters: 3 × ${ML.tsp.toFixed(2)} = ${ML.tbsp.toFixed(2)} mL, which cooks round to 15 mL.`, `3 茶匙 = 1 湯匙。換成毫升：3 × ${ML.tsp.toFixed(2)} = ${ML.tbsp.toFixed(2)} 毫升，做菜時當作 15 毫升。`);
      });
      tw.add(0.45, (k) => { spoonState.tip = 1 - ease(k); spoonState.k = 1 - ease(k); });
    }
  }

  // ── 卡片示範 ──────────────────────────────────────────────────────────
  const stopAuto = () => { script = null; };
  const play = (list) => { script = { t: 0, list: list.slice() }; };
  const DEMO = {
    same() {
      stopAuto(); setAmount('1', { quiet: true });
      const line = (f) => () => { setFood(f.key, { quiet: true }); say(`One cup of ${f.en.toLowerCase()}…`, `一杯${f.zh}……`); };
      const after = (f) => () => say(`One cup of ${f.en.toLowerCase()}: about ${Math.round(f.g_cup)} g.`, `一杯${f.zh}：大約 ${Math.round(f.g_cup)} 公克。`);
      const list = [];
      FOODS.forEach((f, i) => { list.push({ at: i * 4.2, fn: line(f) }, { at: i * 4.2 + 2.6, fn: after(f) }); });
      const lo = FOODS.reduce((a, b) => (a.g_cup < b.g_cup ? a : b)), hi = FOODS.reduce((a, b) => (a.g_cup > b.g_cup ? a : b));
      list.push({ at: FOODS.length * 4.2, fn: () => say(`Same cup, five weights: from about ${lo.g_cup} g (${lo.en.toLowerCase()}) to about ${hi.g_cup} g (${hi.en.toLowerCase()}).`, `同樣一杯，五種重量：從大約 ${lo.g_cup} 公克（${lo.zh}）到大約 ${hi.g_cup} 公克（${hi.zh}）。`) });
      play(list);
    },
    pack() {
      stopAuto(); setAmount('1', { quiet: true }); state.packed = false;
      const f = byKey.flour; if (!f) return;
      setFood('flour', { quiet: true });
      say('One cup of flour, spooned in loosely…', '一杯麵粉，鬆鬆地舀……');
      play([
        { at: 2.6, fn: () => say(`Loose: about ${f.g_cup} g.`, `鬆鬆地舀：大約 ${f.g_cup} 公克。`) },
        { at: 4.6, fn: () => { setPacked(true, { quiet: true }); say(`Now pack it down. The cup is still one cup, but more flour fits: up to about ${f.g_cup_packed} g.`, `現在把它壓實。杯子還是一杯，卻塞進了更多麵粉：最多大約 ${f.g_cup_packed} 公克。`); } },
        { at: 8.2, fn: () => say(`That is about ${Math.round((f.g_cup_packed / f.g_cup - 1) * 100)}% more flour in the same cup. This is why many bakers weigh flour.`, `同一個杯子，麵粉多了大約 ${Math.round((f.g_cup_packed / f.g_cup - 1) * 100)}%。所以很多烘焙的人用秤量麵粉。`) },
      ]);
    },
    spoons() { spoons(); },
    steps() {
      stopAuto(); setAmount('1/4', { quiet: true }); setFood('water', { quiet: true });
      const w = byKey.water;
      const at = (text) => () => { setAmount(text, { quiet: true }); const c = fnum(parseAmount(text)); say(`${text} cup of water: ${Math.round(toMl(c, 'cup'))} mL, about ${Math.round(c * w.g_cup)} g. For water, 1 mL weighs about 1 g.`, `${text} 杯水：${Math.round(toMl(c, 'cup'))} 毫升，大約 ${Math.round(c * w.g_cup)} 公克。水的 1 毫升大約重 1 公克。`); };
      say('A quarter cup of water first…', '先倒四分之一杯的水……');
      play([{ at: 2.6, fn: at('1/4') }, { at: 5.0, fn: at('1/2') }, { at: 7.4, fn: at('3/4') }, { at: 9.8, fn: at('1') }]);
    },
  };

  // ── 3D ───────────────────────────────────────────────────────────────
  function make3D() {
    const c = createCounter({ canvas: cv, wrap: spaceWrap, labels: $('.al-labels') });
    if (!c) return null;
    const { scene, lab } = c;
    const cup = makeMeasuringCup(); scene.add(cup);
    const scale = makeScale(); scale.position.set(...SCALE_AT); scene.add(scale);
    const bowl = makeBowl(); bowl.position.set(4.75, 0, -0.9); scene.add(bowl);
    const stream = makeStream(); scene.add(stream);
    const jars = {};
    FOODS.forEach((f, i) => {
      const j = makeJar(f); j.position.set(JAR_X[i % JAR_X.length], 0, JAR_Z); j.userData.home = j.position.clone();
      scene.add(j); jars[f.key] = j;
    });
    const spoonMesh = {};
    SPOONS.forEach(([key, x]) => { const s = makeSpoon(key); s.position.set(x, 0, SPOON_Z); s.userData.home = s.position.clone(); scene.add(s); spoonMesh[key] = s; });

    const L = {
      cup: lab.add('hm-lb', 'Measuring cup<i>量杯</i>'), scale: lab.add('hm-lb', 'Digital scale<i>電子秤</i>'),
      spoons: lab.add('hm-lb', 'Measuring spoons<i>量匙</i>'), read: lab.add('hm-lb hm-lb-read', '0 g'),
      count: lab.add('hm-lb hm-lb-read', ''),
      jars: FOODS.map((f) => [f, lab.add('hm-lb hm-lb-jar', `${f.en}<i>${f.zh}</i>`)]),
      sp: SPOONS.map(([key, , text]) => [key, lab.add('hm-lb hm-lb-sp', text)]),
    };
    const v = new Vector3();
    let narrow = false;
    c.onBand((b, w) => { narrow = w < 620; root.classList.toggle('hm-narrow', narrow); });
    function tick(dt) {
      c.tick(dt);
      cup.position.copy(cupPos);
      cup.userData.setFill(state.filled, state.food, state.packed);
      scale.userData.setReading(`${reading()} g`);
      // 量匙
      const ts = spoonMesh.tsp, tb = spoonMesh.tbsp, h = ts.userData.home, to = tb.userData.home;
      const k = spoonState.k;
      ts.position.set(lerp(h.x, to.x + tb.userData.r + ts.userData.r * 0.6, k), Math.sin(Math.PI * Math.min(1, k)) * 0.5 + k * (tb.userData.r * 2 + 0.1), lerp(h.z, to.z, k));
      ts.rotation.z = spoonState.tip * 1.25;
      ts.userData.setFill(spoonState.tsp, 0x8fc4ff);
      tb.userData.setFill(spoonState.tbsp, 0x8fc4ff);
      // 標籤
      const show = state.labels;
      const put = (el, x, y, z, on = true, dy = 0) => { el.hidden = !(show && on); if (!el.hidden) lab.place(el, v.set(x, y, z), dy); };
      put(L.cup, cupPos.x, cupPos.y + cup.userData.rimY + 0.35, cupPos.z);
      put(L.scale, SCALE_AT[0] + 1.75, 0.05, SCALE_AT[2] + 1.35, !narrow, 10);
      put(L.spoons, -3.95, 0.02, SPOON_Z + 1.5, true, 16);
      L.read.hidden = false; L.read.textContent = `${reading()} g`;
      lab.place(L.read, v.set(SCALE_AT[0], 0.3, SCALE_AT[2] + 1.45), 24);
      L.count.hidden = !spoonState.on;
      if (spoonState.on) { L.count.textContent = spoonState.n === 3 ? '3 tsp = 1 tbsp' : `${spoonState.n} tsp`; lab.place(L.count, v.set(to.x, 1.25, to.z)); }
      L.jars.forEach(([f, el], i) => { const j = jars[f.key]; put(el, j.userData.home.x, j.userData.topY + 0.3, JAR_Z, !narrow || (state.food && state.food.key === f.key), i % 2 ? -16 : 0); });
      L.sp.forEach(([key, el]) => { const s = spoonMesh[key]; put(el, s.userData.home.x, s.userData.r * 2 + 0.1, SPOON_Z, !narrow && !spoonState.on, -12); });
    }
    $('.al-home').addEventListener('click', () => c.goHome(false));
    return { ...c, cup, scale, jars, stream, spoonMesh, tick };
  }
  view = make3D();
  if (!view) root.classList.add('al-nogl');

  // ── 右邊的按鈕 ────────────────────────────────────────────────────────
  $$('[data-food]').forEach((b) => b.addEventListener('click', () => { stopAuto(); setFood(b.getAttribute('data-food')); }));
  $$('[data-amount]').forEach((b) => b.addEventListener('click', () => { stopAuto(); setAmount(b.getAttribute('data-amount')); }));
  $$('[data-pack]').forEach((b) => b.addEventListener('click', () => { stopAuto(); setPacked(b.getAttribute('data-pack') === 'packed'); }));
  R.onoff.addEventListener('click', () => {
    stopAuto(); const on = !state.onScale; setOnScale(on);
    if (on) tell();
    else say('Off the scale, the display goes back to 0 g. The scale was set to zero with the empty cup on it, so it only counts what is inside.', '拿下來，秤就回到 0 公克。這台秤先放上空杯歸零過，所以只算杯子裡的東西。');
  });
  R.spoons.addEventListener('click', spoons);
  const tgL = $('[data-t="labels"]');
  if (tgL) tgL.addEventListener('change', () => { state.labels = tgL.checked; });

  function step(dt) {
    if (script) {
      script.t += dt;
      while (script && script.list.length && script.list[0].at <= script.t) { const it = script.list.shift(); it.fn(); }
      if (script && !script.list.length) script = null;
    }
    tw.tick(dt);
    const want = state.onScale && state.food ? gPerCup() * state.filled : 0;
    const before = reading();
    state.shown += (want - state.shown) * Math.min(1, dt * 9);
    if (Math.abs(want - state.shown) < 0.05) state.shown = want;
    if (reading() !== before) R.g.innerHTML = `${reading()} <small>g</small>`;
  }
  let raf = 0, last = 0, visible = false;
  function frame(t) {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    step(dt);
    if (view) { view.tick(dt); view.render(); }
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((ents) => {
    visible = ents[0].isIntersecting;
    if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
    if (!visible) stopAuto();
  }, { rootMargin: '120px' }).observe(root);

  placeCup(0);
  paint();
  say('Pick something to pour into the cup, then watch the scale. Same cup, different weights.', '選一樣東西倒進量杯，再看秤上的數字。同樣一杯，重量不一樣。');
  root.classList.add('al-ready', 'al-fresh');

  const api = {
    state, view, reading, target, ml, setFood, setAmount, setPacked, setOnScale, spoons, spoonState,
    foods: FOODS,
    demo: (k) => DEMO[k] && DEMO[k](),
    run(sec) { for (let t = 0; t < sec; t += 1 / 60) { step(1 / 60); if (view) view.tick(1 / 60); } if (view) view.render(); return reading(); },
    render: () => view && view.render(),
    ready: () => true,
  };
  root.__lab = api;
  return api;
}

lazyBoot('[data-homecups-lab]', init, { demo: (lab, v) => lab.demo(v) });

const boot2d = () => {
  document.querySelectorAll('[data-hm-convert]').forEach(initConvert);
  document.querySelectorAll('[data-hm-scale]').forEach(initScale);
  document.querySelectorAll('[data-hm-cups]').forEach(initCups);
};
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot2d);
else boot2d();
