/*
 * 書法 · 第十課的純函式與 2D 互動（不需要 WebGL）。
 *
 *   HOURS                         展廳一天開幾小時燈（8，照故宮規定裡的例子）
 *   LIMIT / daysToLimit(lux)      故宮限展書畫一年的累積照度上限（16,000 lux·小時）；這個亮度幾天用完
 *   exposure(lux, days)           累積曝光量（lux·小時）＝照度 × 每天小時 × 天數
 *   fadeOf(E, E0)                 示意的褪色程度 0–1：1 − e^(−E/E0)；E0 越大越耐光。不是任何一件文物的實測
 *   luxFromSlider(v) / sliderFromLux(lux)   滑桿 0–100 ↔ 50–5000 lux（對數刻度）
 *   initMatch(root)               root＝[data-cal-match]：「這是哪一件？」看一塊局部，選是哪一件作品。
 *                                 data-items：[{ key, img }]；data-works：{ key: { en, zh, who_en, who_zh, hint_en, hint_zh } }
 *
 * 除錯：root.__match（answer(key)、next()、state）
 */
export const HOURS = 8;
/** 故宮〈文物展覽保存維護要點〉：限展書畫之年累積照度不高於 16,000 lux·h/year（例如 50 lux、每天 8 小時，可展 40 天） */
export const LIMIT = 16000;
export const daysToLimit = (lux) => LIMIT / (lux * HOURS);
export const exposure = (lux, days) => lux * HOURS * days;
export const fadeOf = (E, E0 = 1.5e6) => 1 - Math.exp(-Math.max(0, E) / E0);
export const luxFromSlider = (v) => 50 * 100 ** (Math.min(100, Math.max(0, v)) / 100);
export const sliderFromLux = (lux) => (Math.log10(Math.min(5000, Math.max(50, lux)) / 50) / 2) * 100;

export function initMatch(root) {
  const items = JSON.parse(root.getAttribute('data-items') || '[]');
  const W = JSON.parse(root.getAttribute('data-works') || '{}');
  const keys = Object.keys(W);
  const target = root.querySelector('.cg-match-target');
  const opts = root.querySelector('.cg-match-opts');
  const msg = root.querySelector('.cg-match-msg');
  const q = root.querySelector('.cg-match-q');
  const scoreEl = root.querySelector('.cg-match-score');
  let seed = (Date.now() % 2147483646) + 1;
  const rand = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const shuffle = (a) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const state = { order: shuffle(items), i: 0, right: 0, answered: false, firstTry: true };
  const N = () => state.order.length;
  function showScore() { if (scoreEl) scoreEl.textContent = `${state.right} / ${N()}`; }
  function round() {
    const it = state.order[state.i];
    state.answered = false; state.firstTry = true;
    target.style.backgroundImage = `url(${it.img})`;
    opts.innerHTML = keys.map((k) => `<button type="button" data-ans="${k}"><b>${W[k].zh}</b><span>${W[k].who_zh} · ${W[k].who_en}</span></button>`).join('');
    opts.querySelectorAll('[data-ans]').forEach((b) => b.addEventListener('click', () => answer(b.getAttribute('data-ans'))));
    if (q) q.innerHTML = `Question ${state.i + 1} of ${N()}: which work is this piece from?<span class="zh">第 ${state.i + 1} 題（共 ${N()} 題）：這一塊出自哪一件作品？</span>`;
    if (msg) msg.innerHTML = 'Look at the script first: are the characters separate, joined, or one wild line?<span class="zh">先看字體：一個字一個字分開、有點相連，還是整行連成一氣？</span>';
  }
  function answer(a) {
    if (state.answered) return null;
    const it = state.order[state.i], btn = opts.querySelector(`[data-ans="${a}"]`);
    if (a === it.key) {
      if (state.firstTry) state.right++;
      state.answered = true;
      if (btn) btn.classList.add('ok');
      opts.querySelectorAll('button').forEach((b) => { b.disabled = true; });
      const w = W[a], last = state.i === N() - 1;
      if (msg) msg.innerHTML = `Yes! ${w.en}, by ${w.who_en}. ${w.hint_en}${last ? ` You got ${state.right} of ${N()} on the first try.` : ''}<span class="zh">答對了！${w.who_zh}〈${w.zh}〉。${w.hint_zh}${last ? `你一次就答對 ${state.right} 題（共 ${N()} 題）。` : ''}</span>`;
    } else {
      state.firstTry = false;
      if (btn) { btn.classList.add('no'); btn.disabled = true; }
      const w = W[a];
      if (msg) msg.innerHTML = `Not ${w.en}. ${w.hint_en}<span class="zh">不是〈${w.zh}〉。${w.hint_zh}</span>`;
    }
    showScore();
    return a === it.key;
  }
  function next() {
    if (state.i >= N() - 1) { state.order = shuffle(items); state.i = 0; state.right = 0; } else state.i++;
    showScore(); round();
  }
  root.querySelectorAll('[data-match="next"]').forEach((b) => b.addEventListener('click', next));
  root.querySelectorAll('[data-match="again"]').forEach((b) => b.addEventListener('click', () => { state.order = shuffle(items); state.i = 0; state.right = 0; showScore(); round(); }));
  round(); showScore();
  root.__match = { state, answer, next };
  return root.__match;
}
