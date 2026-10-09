/*
 * 電腦概論 · 第七課不需要 WebGL 的小互動（HTML 由 build.py 產生，這裡只綁行為）。
 *
 *   initWhere(el)  [data-cp-where]  放桌上還是放書櫃？八題（記憶體／儲存裝置），記第一次就答對的題數
 *   initFull(el)   [data-cp-full]   記憶體滿了會怎樣：開關幾個 App，看 8 GB 的記憶體用了多少（**示意的數字**）
 */
import { APPS, usage } from './memory.js';

export function initWhere(root) {
  const TASKS = JSON.parse(root.getAttribute('data-tasks'));
  const $ = (s) => root.querySelector(s);
  const R = { k: $('.cp-gs-k'), score: $('.cp-gs-score'), q: $('.cp-jb-q'), opts: $('.cp-gs-opts'), msg: $('.cp-gs-msg'), next: $('.cp-gs-next') };
  const OPT = [['ram', 'Memory, the desk', '記憶體（桌面）'], ['ssd', 'Storage, the bookcase', '儲存裝置（書櫃）']];
  let i, first, tried, done;
  function ask() {
    const t = TASKS[i]; tried = false; done = false;
    R.k.innerHTML = `Question ${i + 1} of ${TASKS.length} · 第 ${i + 1} 題（共 ${TASKS.length} 題）`;
    R.q.innerHTML = `${t.en}<small>${t.zh}</small>`;
    R.opts.innerHTML = '';
    for (const [k, en, zh] of OPT) { const b = document.createElement('button'); b.type = 'button'; b.className = 'cp-gs-opt cp-jb-opt'; b.innerHTML = `${en}<small>${zh}</small>`; b.addEventListener('click', () => pick(b, k)); R.opts.appendChild(b); }
    R.msg.innerHTML = 'Where is it right now?<span class="zh">它現在在哪裡？</span>';
    R.next.hidden = true;
  }
  function pick(b, k) {
    if (done) return;
    const t = TASKS[i];
    if (k === t.answer) {
      done = true; if (!tried) first++;
      b.classList.add('is-right'); R.opts.querySelectorAll('button').forEach((x) => { x.disabled = true; });
      R.msg.innerHTML = `Right. ${t.why_en}<span class="zh">答對了。${t.why_zh}</span>`;
      R.score.textContent = `${first} / ${i + 1}`;
      R.next.hidden = false; R.next.textContent = i + 1 < TASKS.length ? 'Next · 下一題' : 'See my score · 看成績';
    } else {
      tried = true; b.classList.add('is-wrong'); b.disabled = true;
      R.msg.innerHTML = `Not quite. ${t.why_en}<span class="zh">再想想。${t.why_zh}</span>`;
    }
  }
  function finish() {
    R.q.innerHTML = ''; R.opts.innerHTML = ''; R.k.innerHTML = 'Finished · 完成';
    R.msg.innerHTML = `You got ${first} of ${TASKS.length} right on the first try.<span class="zh">你第一次就答對 ${first} 題（共 ${TASKS.length} 題）。</span>`;
    R.next.hidden = false; R.next.textContent = 'Play again · 再玩一次';
  }
  function start() { i = 0; first = 0; R.score.textContent = '0 / 0'; ask(); }
  R.next.addEventListener('click', () => { if (i >= TASKS.length) { start(); return; } i++; if (i >= TASKS.length) finish(); else ask(); });
  start();
  root.__where = { start, answer: () => { const k = TASKS[i].answer; R.opts.querySelectorAll('button')[k === 'ram' ? 0 : 1].click(); }, next: () => R.next.click(), state: () => ({ i, first }) };
}

const TOTAL = 8;

export function initFull(root) {
  const $ = (s) => root.querySelector(s);
  const btns = [...root.querySelectorAll('[data-app]')], bar = $('.cp-fl-bar'), over = $('.cp-fl-over'), num = $('.cp-fl-num'), msg = $('.cp-fl-msg');
  const open = new Set(['browser']);
  function show() {
    btns.forEach((b) => b.setAttribute('aria-pressed', open.has(b.getAttribute('data-app')) ? 'true' : 'false'));
    const u = usage(TOTAL, [...open]);
    bar.style.width = `${Math.min(100, (u.used / TOTAL) * 100)}%`;
    over.style.width = `${Math.min(100, (u.over / TOTAL) * 100)}%`; over.hidden = u.over === 0;
    num.textContent = `${u.used} GB / ${TOTAL} GB`;
    root.classList.toggle('is-over', u.over > 0); root.classList.toggle('is-full', u.full && !u.over);
    msg.innerHTML = u.over
      ? `These apps want ${u.used} GB, but there are only ${TOTAL}. The extra ${u.over} GB cannot stay in memory, so the computer keeps moving things to storage and back as you switch apps. Everything still works, but more slowly.<span class="zh">這些 App 一共要 ${u.used} GB，可是記憶體只有 ${TOTAL} GB。多出來的 ${u.over} GB 放不進記憶體，所以你一切換 App，電腦就得把東西搬到儲存裝置、再搬回來。東西都還能用，只是變慢了。</span>`
      : u.full ? `Memory is exactly full. Open one more app and something will have to move out.<span class="zh">記憶體剛好滿了。再開一個 App，就得有東西搬出去。</span>`
        : `${u.used} GB in use, ${u.free} GB free. Everything that is open fits in memory, so switching between apps is quick.<span class="zh">用了 ${u.used} GB，還剩 ${u.free} GB。開著的東西都放得進記憶體，所以切換 App 很快。</span>`;
  }
  btns.forEach((b) => { b.querySelector('i').textContent = `${APPS[b.getAttribute('data-app')]} GB`; b.addEventListener('click', () => { const k = b.getAttribute('data-app'); if (open.has(k)) open.delete(k); else open.add(k); show(); }); });
  show();
  root.__full = { set: (keys) => { open.clear(); keys.forEach((k) => open.add(k)); show(); } };
}
