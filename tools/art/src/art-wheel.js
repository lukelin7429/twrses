/*
 * 美術 Art · 第二課〈顏色怎麼搭配？〉：一個可以點的色相環，和一張跟著換配色的圖（沒有 3D；畫在 SVG 上，不需要 WebGL，也不載 three.js）。
 *
 * 一個機制：一個顏色看起來怎麼樣，要看它旁邊是什麼顏色。色相環上旁邊的顏色放在一起很接近，對面的顏色放在一起差最多。
 * 色相環有兩個可以切換（wheel.js）：畫家的（紅黃藍）和螢幕的（紅綠藍）；對面的顏色在兩個環上不一樣。
 * 色覺差異：每一格有編號、右邊列出名稱與 RGB；主色用 ★、其他用各配色自己的記號；暖色是實線、冷色是虛線。
 *
 * 除錯：document.querySelector('[data-artwheel-lab]').__lab
 *   state、setWheel('ryb'|'rgb')、setScheme('analogous'|'complementary'|'triad')、setMain(0–11)、turn(±1)、
 *   colors()＝目前配色的 [{ en, zh, rgb255 }]、picture()＝圖上各區塊的顏色、demo('neighbors'|'opposites'|'wheels'|'warm')
 * 小互動：[data-ar-gray].__gray（set(pair)、join(bool)、bare(bool)、read()）、[data-ar-pick].__pick（round()、answer(i)、next()）
 */
import { css, inkOn, to255 } from './color.js';
import { N, PICK_ROUNDS, SCHEMES, WHEELS, mainDelta, pickAnswer, pictureColors, schemeColors, schemeIdx, warmth } from './wheel.js';

const NS = 'http://www.w3.org/2000/svg';
const el = (tag, attrs = {}, parent) => {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
};
const bi = (en, zh) => `${en}<span class="zh">${zh}</span>`;
const rgbText = (c) => { const [r, g, b] = to255(c); return `R ${r} · G ${g} · B ${b}`; };
const polar = (r, deg) => { const a = (deg - 90) * Math.PI / 180; return [r * Math.cos(a), r * Math.sin(a)]; };
const f = (v) => v.toFixed(2);
function wedge(r0, r1, a0, a1) {
  const [x0, y0] = polar(r1, a0), [x1, y1] = polar(r1, a1), [x2, y2] = polar(r0, a1), [x3, y3] = polar(r0, a0);
  return `M${f(x0)} ${f(y0)}A${r1} ${r1} 0 0 1 ${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}A${r0} ${r0} 0 0 0 ${f(x3)} ${f(y3)}Z`;
}
function arc(r, a0, a1) {
  const [x0, y0] = polar(r, a0), [x1, y1] = polar(r, a1);
  return `M${f(x0)} ${f(y0)}A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${f(x1)} ${f(y1)}`;
}

function initLab(root) {
  const $ = (s) => root.querySelector(s), $$ = (s) => Array.from(root.querySelectorAll(s));
  const state = { wheel: 'ryb', scheme: 'analogous', main: 0, warm: true };
  const R = { wheel: $('.ar-wh-svg'), pic: $('.ar-wh-pic'), chips: $('.ar-wh-chips'), diff: $('.ar-wh-diff'), msg: $('.ar-msg'), list: $('.ar-wh-list'), note: $('.ar-wh-wnote') };
  const say = (en, zh) => { R.msg.innerHTML = bi(en, zh); };
  let timers = [];
  const stopAuto = () => { timers.forEach(clearTimeout); timers = []; };
  const play = (steps) => { stopAuto(); steps.forEach((s) => timers.push(setTimeout(s.fn, s.at * 1000))); };

  // ── 色相環（SVG；每一格是一個按鈕）──────────────────────────────────
  R.wheel.setAttribute('viewBox', '-142 -142 284 284');
  const gW = el('g', {}, R.wheel), gArc = el('g', { class: 'ar-wh-arcs' }, R.wheel), gLink = el('g', {}, R.wheel), gMark = el('g', {}, R.wheel);
  const wedges = [], nums = [];
  for (let i = 0; i < N; i++) {
    const p = el('path', { d: wedge(48, 100, i * 30 - 15, i * 30 + 15), class: 'ar-wh-w', tabindex: '0', role: 'button', 'data-i': i }, gW);
    const [x, y] = polar(86, i * 30);
    nums.push(el('text', { x: f(x), y: f(y), class: 'ar-wh-n', 'text-anchor': 'middle', 'dominant-baseline': 'central' }, gW));
    p.addEventListener('click', () => { stopAuto(); setMain(i); });
    p.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); stopAuto(); setMain(i); } });
    wedges.push(p);
  }
  const hub = el('text', { x: 0, y: 0, class: 'ar-wh-hub', 'text-anchor': 'middle', 'dominant-baseline': 'central' }, R.wheel);

  // ── 同一張圖（自己畫的：天空、太陽、遠山、近山、一間小屋）──────────────
  R.pic.setAttribute('viewBox', '0 0 400 300');
  const P = {
    sky: el('rect', { x: 0, y: 0, width: 400, height: 300 }, R.pic),
    sun: el('circle', { cx: 316, cy: 66, r: 30 }, R.pic),
    far: el('path', { d: 'M0 190Q70 110 150 160T300 130T400 170V300H0Z' }, R.pic),
    near: el('path', { d: 'M0 236Q110 180 220 226T400 214V300H0Z' }, R.pic),
    wall: el('rect', { x: 96, y: 168, width: 104, height: 78 }, R.pic),
    roof: el('path', { d: 'M82 172L148 116L214 172Z' }, R.pic),
    door: el('rect', { x: 136, y: 204, width: 24, height: 42 }, R.pic),
    window: el('rect', { x: 170, y: 186, width: 20, height: 20 }, R.pic),
  };
  R.pic.querySelectorAll('rect,circle,path').forEach((s) => { s.setAttribute('stroke', '#10131c'); s.setAttribute('stroke-width', '2'); s.setAttribute('stroke-linejoin', 'round'); });
  P.sky.setAttribute('stroke', 'none');

  const hues = () => WHEELS[state.wheel].hues;
  const colors = () => schemeColors(state.wheel, state.scheme, state.main);

  function draw() {
    const H = hues(), idx = schemeIdx(state.scheme, state.main), sc = SCHEMES[state.scheme], cols = colors();
    root.setAttribute('data-wheel', state.wheel);
    wedges.forEach((p, i) => {
      p.setAttribute('fill', css(H[i].rgb));
      p.setAttribute('aria-label', `${H[i].n} ${H[i].en} · ${H[i].zh}`);
      p.setAttribute('aria-pressed', String(i === state.main));
      p.classList.toggle('is-in', idx.includes(i));
      nums[i].textContent = H[i].n; nums[i].setAttribute('fill', inkOn(H[i].rgb));
    });
    hub.textContent = state.wheel === 'ryb' ? 'R · Y · B' : 'R · G · B';
    // 暖色（實線）與冷色（虛線）
    gArc.innerHTML = '';
    gArc.style.display = state.warm ? '' : 'none';
    const runs = [];
    for (let i = 0; i < N; i++) {
      const w = warmth(state.wheel, i), prev = runs[runs.length - 1];
      if (prev && prev.w === w && prev.end === i - 1) prev.end = i; else runs.push({ w, start: i, end: i });
    }
    if (runs.length > 1 && runs[0].w === runs[runs.length - 1].w) { runs[0].start = runs[runs.length - 1].start - N; runs.pop(); }
    runs.filter((r) => r.w !== 'between').forEach((r) => {
      el('path', { d: arc(108, r.start * 30 - 13, r.end * 30 + 13), class: `ar-wh-arc ar-wh-${r.w}` }, gArc);
      const [x, y] = polar(127, (r.start + r.end) * 15);
      const t = el('text', { x: f(x), y: f(y), class: 'ar-wh-arct', 'text-anchor': 'middle', 'dominant-baseline': 'central' }, gArc);
      t.textContent = r.w === 'warm' ? 'WARM 暖' : 'COOL 冷';
    });
    // 配色的連線與記號
    gLink.innerHTML = ''; gMark.innerHTML = '';
    const pts = idx.map((i) => polar(66, i * 30));
    if (state.scheme === 'analogous') el('path', { d: arc(66, (state.main - 1) * 30, (state.main + 1) * 30), class: 'ar-wh-link' }, gLink);
    else el('path', { d: `M${pts.map((p) => `${f(p[0])} ${f(p[1])}`).join('L')}${pts.length > 2 ? 'Z' : ''}`, class: 'ar-wh-link' }, gLink);
    idx.forEach((i, n) => {
      const [x, y] = pts[n];
      el('circle', { cx: f(x), cy: f(y), r: 9, class: 'ar-wh-dot' }, gMark);
      const t = el('text', { x: f(x), y: f(y), class: 'ar-wh-mk', 'text-anchor': 'middle', 'dominant-baseline': 'central' }, gMark);
      t.textContent = n === 0 ? '★' : sc.mark;
    });
    // 圖
    const pc = pictureColors(cols.map((h) => h.rgb));
    for (const k in P) P[k].setAttribute('fill', css(pc[k]));
    // 右邊：這個配色的顏色
    R.chips.innerHTML = cols.map((h, n) => {
      const role = n === 0 ? ['★ Main color', '主色'] : [`${sc.mark} ${state.scheme === 'analogous' ? 'Neighbor' : state.scheme === 'complementary' ? 'Opposite' : 'One third around'}`, state.scheme === 'analogous' ? '類似色' : state.scheme === 'complementary' ? '對面的顏色' : '隔三分之一圈'];
      const w = warmth(state.wheel, h.i), wt = w === 'warm' ? 'warm · 暖色' : w === 'cool' ? 'cool · 冷色' : 'counted either way · 兩邊都有人算';
      return `<li><span class="ar-sw" style="background:${css(h.rgb)};color:${inkOn(h.rgb)}">${h.n}</span><span class="ar-mx-b"><span class="ar-wh-role">${role[0]} · ${role[1]}</span>`
        + `<b class="ar-mx-n">${h.en} <span class="zh">${h.zh}</span></b><span class="ar-mx-v">${rgbText(h.rgb)} · ${wt}</span></span></li>`;
    }).join('');
    const d = mainDelta(cols.map((h) => h.rgb));
    R.diff.querySelector('i').style.width = `${Math.min(100, d / 2.4)}%`;
    R.diff.querySelector('b').textContent = d.toFixed(0);
    R.list.innerHTML = H.map((h) => `<li><span style="background:${css(h.rgb)};color:${inkOn(h.rgb)}">${h.n}</span>${h.en} <i class="zh">${h.zh}</i></li>`).join('');
    R.note.innerHTML = state.wheel === 'ryb'
      ? bi('Red, yellow, and blue sit one third of the way around from each other. The twelve swatches are screen colors chosen to stand for the names.', '紅、黃、藍各隔三分之一圈。十二個色塊是為了代表這些名稱而選的螢幕顏色。')
      : bi('Red, green, and blue sit one third of the way around from each other, and the hue changes by 30 degrees at each step.', '紅、綠、藍各隔三分之一圈，每一格的色相相差 30 度。');
    $$('[data-wheel-pick]').forEach((b) => b.setAttribute('aria-pressed', String(b.getAttribute('data-wheel-pick') === state.wheel)));
    $$('[data-scheme]').forEach((b) => b.setAttribute('aria-pressed', String(b.getAttribute('data-scheme') === state.scheme)));
  }
  function explain() {
    const c = colors(), a = c[0], b = c[1];
    if (state.scheme === 'analogous') say(`${a.en} with its two neighbors, ${b.en} and ${c[2].en}. Neighbors on the wheel are close to each other, so the whole picture looks like one family of color.`, `${a.zh}，和它兩邊的鄰居：${b.zh}、${c[2].zh}。色相環上相鄰的顏色彼此很接近，所以整張圖看起來像同一家的顏色。`);
    else if (state.scheme === 'complementary') say(`${a.en} with ${b.en}, the color straight across this wheel. Opposite colors give a strong contrast, so the house stands out sharply from the hills.`, `${a.zh}，配上這個色相環正對面的${b.zh}。對面的顏色放在一起，對比很強，所以小屋和山丘分得很清楚。`);
    else say(`${a.en}, ${b.en}, and ${c[2].en} are spaced evenly, one third of the way around from each other. Compare the number on the right with the other two schemes.`, `${a.zh}、${b.zh}、${c[2].zh} 平均分開，各隔三分之一圈。把右邊的數字和另外兩種配色比一比。`);
  }
  function setMain(i, quiet) { state.main = ((i % N) + N) % N; draw(); if (!quiet) explain(); }
  function setScheme(k, quiet) { if (!SCHEMES[k]) return; state.scheme = k; draw(); if (!quiet) explain(); }
  function setWheel(k, quiet) {
    if (!WHEELS[k]) return;
    state.wheel = k; draw();
    if (!quiet) {
      const a = colors()[0], o = hues()[(state.main + 6) % N];
      say(`This is the ${WHEELS[k].en.toLowerCase()}. On this wheel the color straight across from ${a.en.toLowerCase()} is ${o.en.toLowerCase()}. The other wheel gives a different answer, because the two wheels are built from different sets of primary colors.`, `這是${WHEELS[k].zh}。在這個環上，${a.zh}正對面是${o.zh}。換成另一個色相環，答案會不一樣，因為兩個環用的三原色不同。`);
    }
  }
  const turn = (d) => setMain(state.main + d);

  $$('[data-wheel-pick]').forEach((b) => b.addEventListener('click', () => { stopAuto(); setWheel(b.getAttribute('data-wheel-pick')); }));
  $$('[data-scheme]').forEach((b) => b.addEventListener('click', () => { stopAuto(); setScheme(b.getAttribute('data-scheme')); }));
  $$('[data-turn]').forEach((b) => b.addEventListener('click', () => { stopAuto(); turn(Number(b.getAttribute('data-turn'))); }));
  const tgW = $('[data-t="warm"]');
  if (tgW) tgW.addEventListener('change', () => { state.warm = tgW.checked; draw(); });

  const DEMO = {
    neighbors() {
      state.wheel = 'ryb'; setScheme('analogous', true); setMain(2);
      play([4, 6, 8, 10].map((i, n) => ({ at: 3 + n * 3, fn: () => setMain(i) })));
    },
    opposites() {
      state.wheel = 'ryb'; setScheme('complementary', true); setMain(8);
      play([{ at: 4, fn: () => setMain(0) }, { at: 8, fn: () => setMain(4) }]);
    },
    wheels() {
      state.wheel = 'ryb'; state.scheme = 'complementary'; state.main = 0; draw();
      say("On the painter's wheel, the color across from red is green.", '在畫家的色相環上，紅色對面是綠色。');
      play([{ at: 3.5, fn: () => setWheel('rgb') }, { at: 9, fn: () => setWheel('ryb') }]);
    },
    warm() {
      state.wheel = 'ryb'; state.warm = true; if (tgW) tgW.checked = true; setScheme('analogous', true); setMain(2, true);
      say('The solid arc marks the hues people usually call warm: red through yellow. Here are three of them together.', '實線的弧標出一般說的暖色：從紅到黃。這是其中三個放在一起。');
      play([{ at: 4.5, fn: () => { setMain(8, true); say('The dashed arc marks the hues usually called cool: blue-green through blue-purple. Warm and cool are names people agreed on. Green and purple, between the two arcs, are counted either way.', '虛線的弧標出一般說的冷色（也叫寒色）：從藍綠到藍紫。「暖」和「冷」是大家約定的說法；兩段弧之間的綠和紫，算哪一邊都有人說。'); } }]);
    },
  };

  draw(); explain();
  root.classList.add('al-ready');
  root.__lab = {
    state, setWheel, setScheme, setMain, turn,
    colors: () => colors().map((h) => ({ n: h.n, en: h.en, zh: h.zh, rgb255: to255(h.rgb) })),
    picture: () => { const pc = pictureColors(colors().map((h) => h.rgb)); const o = {}; for (const k in pc) o[k] = to255(pc[k]); return o; },
    delta: () => mainDelta(colors().map((h) => h.rgb)),
    demo: (v) => DEMO[v] && DEMO[v](),
  };
  document.querySelectorAll('[data-lab-demo]').forEach((b) => b.addEventListener('click', (e) => {
    e.preventDefault();
    root.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const v = b.getAttribute('data-lab-demo'); if (DEMO[v]) DEMO[v]();
  }));
}

// ── 小互動一：哪一塊灰比較深？（兩塊一模一樣的灰，放在不同的底色上）────────
const GRAY_PAIRS = {
  bw: { a: [0.06, 0.06, 0.06], b: [0.96, 0.96, 0.96], an: ['Black', '黑'], bn: ['White', '白'] },
  yb: { a: [1, 0.9, 0.1], b: [0.1, 0.25, 0.85], an: ['Yellow', '黃'], bn: ['Blue', '藍'] },
  rg: { a: [0.85, 0.12, 0.12], b: [0.1, 0.6, 0.2], an: ['Red', '紅'], bn: ['Green', '綠'] },
};
function initGray(root) {
  const $ = (s) => root.querySelector(s), $$ = (s) => Array.from(root.querySelectorAll(s));
  const E = { a: $('.ar-gy-a'), b: $('.ar-gy-b'), sa: $('.ar-gy-a .ar-gy-sq'), sb: $('.ar-gy-b .ar-gy-sq'), read: $('.ar-gy-read'), msg: $('.ar-gy-msg'), level: $('.ar-gy-level'), lv: $('.ar-gy-lv'), an: $('.ar-gy-an'), bn: $('.ar-gy-bn') };
  const state = { pair: 'bw', gray: 0.5, join: false, bare: false };
  function draw() {
    const p = GRAY_PAIRS[state.pair], g = [state.gray, state.gray, state.gray];
    const neutral = [0.5, 0.5, 0.5].map(() => 0.78);
    E.a.style.background = css(state.bare ? neutral : p.a); E.b.style.background = css(state.bare ? neutral : p.b);
    E.sa.style.background = css(g); E.sb.style.background = css(g);
    root.classList.toggle('is-join', state.join); root.classList.toggle('is-bare', state.bare);
    E.an.innerHTML = state.bare ? 'Plain gray <span class="zh">一樣的淺灰</span>' : `${p.an[0]} <span class="zh">${p.an[1]}</span>`;
    E.bn.innerHTML = state.bare ? 'Plain gray <span class="zh">一樣的淺灰</span>' : `${p.bn[0]} <span class="zh">${p.bn[1]}</span>`;
    E.lv.textContent = `${Math.round(state.gray * 100)}%`;
    const t = rgbText(g);
    E.read.innerHTML = `<span><b>Left square · 左邊的方塊</b>${t}</span><span><b>Right square · 右邊的方塊</b>${t}</span><span class="ar-gy-eq">= The two squares are the same gray. · 兩塊是同一個灰色。</span>`;
    $$('[data-pair]').forEach((b) => b.setAttribute('aria-pressed', String(b.getAttribute('data-pair') === state.pair)));
    $('.ar-gy-join').setAttribute('aria-pressed', String(state.join));
    $('.ar-gy-bare').setAttribute('aria-pressed', String(state.bare));
    E.msg.innerHTML = state.bare
      ? bi('With the same background behind both, the two squares look the same. Nothing about the squares changed.', '兩邊換成一樣的底色，兩塊方塊看起來就一樣了。方塊本身什麼都沒有改變。')
      : state.join
        ? bi('The squares now touch in the middle. Look at the line where they meet: there is no edge, because they are the same gray.', '兩塊方塊在中間碰在一起了。看它們相接的地方：沒有邊界，因為它們是同一個灰色。')
        : state.pair === 'bw'
          ? bi('Which square looks darker? Many people say the one on the white side. Check it with the two buttons below.', '哪一塊看起來比較深？很多人會說白色那一邊的。用下面兩個按鈕驗證看看。')
          : bi('Do the two grays look a little different now, perhaps with a faint tint? Chevreul wrote that a color seems to shift toward the opposite of its neighbor. Check with the buttons below whether the squares really differ.', '兩塊灰色現在看起來有一點不一樣嗎？也許還帶一點點顏色？謝弗勒寫過：一個顏色看起來會偏向旁邊那個顏色的對面。用下面的按鈕驗證兩塊是不是真的不同。');
  }
  $$('[data-pair]').forEach((b) => b.addEventListener('click', () => { state.pair = b.getAttribute('data-pair'); state.bare = false; draw(); }));
  $('.ar-gy-join').addEventListener('click', () => { state.join = !state.join; draw(); });
  $('.ar-gy-bare').addEventListener('click', () => { state.bare = !state.bare; draw(); });
  E.level.addEventListener('input', () => { state.gray = Number(E.level.value) / 100; draw(); });
  draw();
  root.__gray = {
    state, set: (p) => { state.pair = p; draw(); }, join: (v) => { state.join = v; draw(); }, bare: (v) => { state.bare = v; draw(); },
    read: () => [getComputedStyle(E.sa).backgroundColor, getComputedStyle(E.sb).backgroundColor],
    rects: () => [E.sa.getBoundingClientRect().toJSON(), E.sb.getBoundingClientRect().toJSON()],
  };
}

// ── 小互動二：這是哪一個？（六題；選項有色塊也有名稱）─────────────────────
function initPick(root) {
  const $ = (s) => root.querySelector(s);
  const E = { k: $('.ar-pk-k'), score: $('.ar-pk-score'), ask: $('.ar-pk-ask'), opts: $('.ar-pk-opts'), msg: $('.ar-pk-msg'), next: $('.ar-pk-next'), steps: $('.ar-pk-steps') };
  const state = { i: 0, right: 0, done: 0, tried: false, solved: false };
  const NQ = PICK_ROUNDS.length;
  E.steps.innerHTML = PICK_ROUNDS.map(() => '<i></i>').join('');
  const round = () => PICK_ROUNDS[state.i];
  function ask() {
    const r = round(), W = WHEELS[r.wheel], H = W.hues;
    const wn = [`the ${W.en.toLowerCase()}`, W.zh];
    if (r.kind === 'opposite') return [`On ${wn[0]}, which color is straight across from ${H[r.of].en.toLowerCase()}?`, `在${wn[1]}上，${H[r.of].zh}色的正對面是哪一個顏色？`];
    if (r.kind === 'neighbor') return [`On ${wn[0]}, which of these is a neighbor of ${H[r.of].en.toLowerCase()}?`, `在${wn[1]}上，下面哪一個是${H[r.of].zh}色的鄰居？`];
    return [`Which of these is usually called a ${r.kind} color?`, `下面哪一個通常叫做${r.kind === 'cool' ? '冷' : '暖'}色？`];
  }
  function draw() {
    const r = round(), H = WHEELS[r.wheel].hues, q = ask();
    E.k.textContent = `Question ${state.i + 1} of ${NQ} · 第 ${state.i + 1} 題（共 ${NQ} 題）`;
    E.score.textContent = `${state.right} / ${state.done}`;
    Array.from(E.steps.children).forEach((s, n) => { s.className = n < state.i ? 'is-past' : n === state.i ? 'is-now' : ''; });
    E.ask.innerHTML = bi(q[0], q[1]);
    E.opts.innerHTML = r.options.map((o) => `<button type="button" class="ar-pk-opt" data-o="${o}"><i style="background:${css(H[o].rgb)}"></i><b>${H[o].en}</b><span class="zh">${H[o].zh}</span><span class="ar-pk-mk"></span></button>`).join('');
    E.opts.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => answer(Number(b.getAttribute('data-o')))));
    E.next.hidden = true;
    E.msg.innerHTML = '';
  }
  function answer(o) {
    if (state.solved) return null;
    const r = round(), H = WHEELS[r.wheel].hues, ans = pickAnswer(r), b = E.opts.querySelector(`[data-o="${o}"]`);
    if (o === ans) {
      state.solved = true; state.done++; if (!state.tried) state.right++;
      b.classList.add('is-right'); b.querySelector('.ar-pk-mk').textContent = '✓ right · 答對了';
      E.opts.querySelectorAll('button').forEach((x) => { x.disabled = true; });
      const why = r.kind === 'opposite'
        ? [`${H[r.of].en} is number ${H[r.of].n} and ${H[ans].en} is number ${H[ans].n}: six steps apart, half of the way around.`, `${H[r.of].zh}是第 ${H[r.of].n} 格，${H[ans].zh}是第 ${H[ans].n} 格：相隔六格，剛好半圈。`]
        : r.kind === 'neighbor'
          ? [`${H[ans].en} is number ${H[ans].n}, right beside ${H[r.of].en.toLowerCase()}, number ${H[r.of].n}.`, `${H[ans].zh}是第 ${H[ans].n} 格，就在${H[r.of].zh}（第 ${H[r.of].n} 格）旁邊。`]
          : [`${H[ans].en} is on the ${r.kind} side of the wheel. The others here are on the other side.`, `${H[ans].zh}在色相環${r.kind === 'cool' ? '冷' : '暖'}色的那一側；其他三個在另一側。`];
      const last = state.i === NQ - 1;
      E.msg.innerHTML = bi(`✓ ${why[0]}${last ? ` You got ${state.right} of ${NQ} right on the first try.` : ''}`, `✓ ${why[1]}${last ? `${NQ} 題裡有 ${state.right} 題第一次就答對。` : ''}`);
      E.next.hidden = false;
      E.next.textContent = last ? 'Play again · 再玩一次' : 'Next question · 下一題';
      E.score.textContent = `${state.right} / ${state.done}`;
    } else {
      state.tried = true; b.disabled = true; b.classList.add('is-wrong'); b.querySelector('.ar-pk-mk').textContent = '✗ not this one · 不是這個';
      E.msg.innerHTML = bi('✗ Not that one. Look at the wheel at the top of the page and count the steps.', '✗ 不是這一個。看看頁面上方的色相環，數一數隔了幾格。');
    }
    return o === ans;
  }
  function go(i) { state.i = i; state.tried = false; state.solved = false; draw(); }
  E.next.addEventListener('click', () => { if (state.i === NQ - 1) { state.right = 0; state.done = 0; go(0); } else go(state.i + 1); });
  go(0);
  root.__pick = { state, round, answer, next: () => go(Math.min(NQ - 1, state.i + 1)), correct: () => pickAnswer(round()) };
}

function boot() {
  const lab = document.querySelector('[data-artwheel-lab]'); if (lab) initLab(lab);
  const g = document.querySelector('[data-ar-gray]'); if (g) initGray(g);
  const p = document.querySelector('[data-ar-pick]'); if (p) initPick(p);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
