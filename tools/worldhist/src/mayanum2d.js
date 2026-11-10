/*
 * 世界歷史 第十四課 ·「讀一讀、寫一寫馬雅的數字」（不需要 WebGL）。
 *
 *   <div class="wh-sort wh-mn" data-wh-mayanum><script type="application/json">{ items: [{ mode: 'read'|'write', n, note_en, note_zh }], end_en, end_zh }</script>…</div>
 *
 * read：畫出一個馬雅數字，從四個數字裡選出它是多少。write：給一個數字，用「點」「橫」「零」在兩個位上寫出來。
 * 不計時；可以一直試到對；只記第一次就對的題數。選項用固定規則產生（readOptions），每次載入都一樣。
 * 除錯：root.__mayanum（state、pick(v)、add(level, kind)、clear(level)、levels()、check()、next()、reset()）。
 */
import { each, bi, readJson } from './common.js';
import { toMaya, mayaSvg, readOptions, check as checkLevels } from './mayanum.js';

const BAD = {
  empty: ['Nothing written yet. Add dots, bars, or a zero sign.', '還沒有寫東西。加上點、橫或零的符號。'],
  'need-zero': ['A place is empty. When a place has nothing in it, the Maya wrote a zero sign there.', '有一個位是空的。某一位沒有數量時，馬雅人會在那裡寫零的符號。'],
  'too-many-dots': ['Too many dots in one place. Five dots become one bar.', '同一位的點太多了。五個點要換成一橫。'],
  'too-many-bars': ['Too many bars in one place. Four bars make 20, which moves up to the next place.', '同一位的橫太多了。四橫就是 20，要進到上面一位。'],
  wrong: ['Not yet. Count the twenties on top and the ones below, then try again.', '還不對。數一數上面有幾個二十、下面有幾個一，再試一次。'],
};

export function initMayanum(root) {
  const data = readJson(root), items = data.items, n = items.length;
  const $ = (s) => root.querySelector(s);
  const kEl = $('.wh-mn-k'), qEl = $('.wh-mn-q'), body = $('.wh-mn-body'), msg = $('.wh-mn-msg'), nextBtn = $('.wh-mn-next'), sc = $('.wh-mn-score');
  const state = { i: 0, first: 0, tried: false, done: false, solved: false, lv: null };
  const empty = () => [{ zero: false, bars: 0, dots: 0 }, { zero: false, bars: 0, dots: 0 }];

  function drawBuild() {
    const box = body.querySelector('.wh-mn-pic');
    if (box) box.innerHTML = mayaSvg(state.lv, { label: 'Your Maya number · 你寫的馬雅數字' });
  }
  function draw() {
    if (state.done) {
      kEl.innerHTML = bi('All done', '全部完成'); qEl.innerHTML = bi(data.end_en, data.end_zh); body.innerHTML = '';
      msg.className = 'wh-mn-msg is-ok'; msg.innerHTML = bi(`You got ${state.first} of ${n} right on the first try.`, `${n} 題裡，你有 ${state.first} 題第一次就對。`);
      nextBtn.hidden = false; nextBtn.dataset.act = 'reset'; nextBtn.innerHTML = 'Play again · 再玩一次'; return;
    }
    const it = items[state.i];
    Object.assign(state, { tried: false, solved: false });
    kEl.innerHTML = bi(`Number ${state.i + 1} of ${n}`, `第 ${state.i + 1} 題（共 ${n} 題）`);
    msg.innerHTML = ''; msg.className = 'wh-mn-msg'; nextBtn.hidden = true; nextBtn.dataset.act = 'next'; nextBtn.innerHTML = 'Next · 下一題';
    if (it.mode === 'read') {
      qEl.innerHTML = bi('What number is this?', '這是多少？');
      body.innerHTML = `<div class="wh-mn-pic">${mayaSvg(toMaya(it.n), { label: 'A Maya number · 一個馬雅數字' })}</div>`
        + `<div class="wh-mn-opts">${readOptions(it.n).map((v) => `<button type="button" class="wh-mn-opt" data-val="${v}">${v}</button>`).join('')}</div>`;
    } else {
      state.lv = empty();
      qEl.innerHTML = `<b class="wh-mn-n">${it.n}</b>` + bi('Write this number in Maya numbers.', '用馬雅數字寫出這個數。');
      const tools = (lv, en, zh) => `<div class="wh-mn-row" data-lv="${lv}"><span class="wh-mn-place">${bi(en, zh)}</span>`
        + `<button type="button" data-add="dot" aria-label="Add a dot (1) · 加一點（1）"><i class="wh-mn-dot"></i>+1</button>`
        + `<button type="button" data-add="bar" aria-label="Add a bar (5) · 加一橫（5）"><i class="wh-mn-bar"></i>+5</button>`
        + `<button type="button" data-add="zero" aria-label="Zero sign · 零的符號"><i class="wh-mn-shell"></i>0</button>`
        + `<button type="button" data-add="clear" class="wh-mn-clear">Clear · 清掉</button></div>`;
      body.innerHTML = `<div class="wh-mn-write"><div class="wh-mn-pic"></div><div class="wh-mn-tools">`
        + tools(0, 'Top place: twenties', '上面一位：幾個二十') + tools(1, 'Bottom place: ones', '下面一位：幾個一')
        + `<button type="button" class="wh-btn wh-btn-gold" data-act="check">Check · 檢查</button></div></div>`;
      drawBuild();
    }
  }
  function right(it) {
    if (!state.tried) state.first += 1;
    state.solved = true;
    msg.className = 'wh-mn-msg is-ok'; msg.innerHTML = bi(it.note_en, it.note_zh);
    sc.textContent = `${state.first} / ${state.i + 1}`;
    body.querySelectorAll('button').forEach((b) => { b.disabled = true; });
    nextBtn.hidden = false; nextBtn.focus();
  }
  function pick(v) {
    const it = items[state.i];
    if (state.done || it.mode !== 'read' || state.solved) return null;
    const b = body.querySelector(`[data-val="${v}"]`), ok = v === it.n;
    if (ok) { b?.classList.add('is-right'); right(it); }
    else {
      state.tried = true; if (b) { b.classList.add('is-wrong'); b.disabled = true; }
      msg.className = 'wh-mn-msg is-bad'; msg.innerHTML = bi('Not this one. A dot is 1, a bar is 5; the top place counts twenties.', '不是這個。一點是 1、一橫是 5；上面那一位數的是幾個二十。');
    }
    return ok;
  }
  function add(level, kind) {
    const it = items[state.i];
    if (state.done || it.mode !== 'write' || state.solved) return;
    const lv = state.lv[level];
    if (kind === 'clear') Object.assign(lv, { zero: false, bars: 0, dots: 0 });
    else if (kind === 'zero') Object.assign(lv, { zero: true, bars: 0, dots: 0 });
    else { lv.zero = false; lv[kind === 'dot' ? 'dots' : 'bars'] += 1; }
    msg.innerHTML = ''; msg.className = 'wh-mn-msg';
    drawBuild();
  }
  function check() {
    const it = items[state.i];
    if (state.done || it.mode !== 'write' || state.solved) return null;
    const r = checkLevels(state.lv, it.n);
    if (r === 'ok') right(it);
    else { if (r !== 'empty') state.tried = true; msg.className = 'wh-mn-msg is-bad'; msg.innerHTML = bi(...BAD[r]); }
    return r;
  }
  function next() { state.i += 1; if (state.i >= n) state.done = true; draw(); }
  function reset() { Object.assign(state, { i: 0, first: 0, done: false }); sc.textContent = '0 / 0'; draw(); }
  root.addEventListener('click', (ev) => {
    const b = ev.target.closest('button'); if (!b || b.disabled) return;
    if (b.dataset.val != null) pick(+b.dataset.val);
    else if (b.dataset.add) add(+b.closest('[data-lv]').dataset.lv, b.dataset.add);
    else if (b.dataset.act === 'check') check();
    else if (b.dataset.act === 'next') next();
    else if (b.dataset.act === 'reset') reset();
  });
  draw();
  root.__mayanum = { state, pick, add, clear: (l) => add(l, 'clear'), levels: () => state.lv, check, next, reset };
  return root.__mayanum;
}

each('[data-wh-mayanum]', initMayanum);
