/*
 * 電腦概論 · 第五課不需要 WebGL 的小互動（HTML 由 build.py 產生，這裡只綁行為）。
 *
 *   initJobs(el)   [data-cp-jobs]   這個工作是誰做的？八題，選零件，記第一次就答對的題數
 *   initFits(el)   [data-cp-fits]   裝得下多少？選一顆固態硬碟的大小和一種東西，看位元組、位元和裝得下幾個
 */
import { GB, ITEMS, TB, asBinaryUnits, fits, fmtInt } from './parts.js';

export function initJobs(root) {
  const TASKS = JSON.parse(root.getAttribute('data-tasks')), NAMES = JSON.parse(root.getAttribute('data-names'));
  const $ = (s) => root.querySelector(s);
  const R = { k: $('.cp-gs-k'), score: $('.cp-gs-score'), q: $('.cp-jb-q'), opts: $('.cp-gs-opts'), msg: $('.cp-gs-msg'), next: $('.cp-gs-next') };
  const keys = Object.keys(NAMES);
  let order, i, first, tried, done;
  function ask() {
    const t = TASKS[order[i]]; tried = false; done = false;
    R.k.innerHTML = `Question ${i + 1} of ${TASKS.length} · 第 ${i + 1} 題（共 ${TASKS.length} 題）`;
    R.q.innerHTML = `${t.en}<small>${t.zh}</small>`;
    R.opts.innerHTML = '';
    for (const k of keys) {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'cp-gs-opt cp-jb-opt';
      b.innerHTML = `${NAMES[k].en}<small>${NAMES[k].zh}</small>`;
      b.addEventListener('click', () => pick(b, k)); R.opts.appendChild(b);
    }
    R.msg.innerHTML = 'Which part does this job?<span class="zh">這件事是哪個零件做的？</span>';
    R.next.hidden = true;
  }
  function pick(b, k) {
    if (done) return;
    const t = TASKS[order[i]];
    if (k === t.answer) {
      done = true; if (!tried) first++;
      b.classList.add('is-right'); R.opts.querySelectorAll('button').forEach((x) => { x.disabled = true; });
      R.msg.innerHTML = `Right. ${t.why_en}<span class="zh">答對了。${t.why_zh}</span>`;
      R.score.textContent = `${first} / ${i + 1}`;
      R.next.hidden = false; R.next.textContent = i + 1 < TASKS.length ? 'Next · 下一題' : 'See my score · 看成績';
    } else {
      tried = true; b.classList.add('is-wrong'); b.disabled = true;
      R.msg.innerHTML = `Not the ${NAMES[k].en.toLowerCase()}. Think about what each part is for, and try again.<span class="zh">不是${NAMES[k].zh}。想想每個零件是做什麼的，再試一次。</span>`;
    }
  }
  function finish() {
    R.q.innerHTML = ''; R.opts.innerHTML = ''; R.k.innerHTML = 'Finished · 完成';
    R.msg.innerHTML = `You got ${first} of ${TASKS.length} right on the first try.${first === TASKS.length ? ' You know your way around a computer!' : ' Play again to try for all of them.'}<span class="zh">你第一次就答對 ${first} 題（共 ${TASKS.length} 題）。${first === TASKS.length ? '你對電腦裡面很熟了！' : '再玩一次，看能不能全對。'}</span>`;
    R.next.hidden = false; R.next.textContent = 'Play again · 再玩一次';
  }
  function start(shuffle = true) {
    order = TASKS.map((_, k) => k);
    if (shuffle) for (let a = order.length - 1; a > 0; a--) { const b = Math.floor(Math.random() * (a + 1)); [order[a], order[b]] = [order[b], order[a]]; }
    i = 0; first = 0; R.score.textContent = '0 / 0'; ask();
  }
  R.next.addEventListener('click', () => { if (i >= TASKS.length) { start(); return; } i++; if (i >= TASKS.length) finish(); else ask(); });
  start();
  root.__jobs = { start, answer: () => { const want = TASKS[order[i]].answer; R.opts.querySelectorAll('button')[keys.indexOf(want)].click(); }, next: () => R.next.click(), state: () => ({ i, first }) };
}

const DRIVES = { 256: 256 * GB, 512: 512 * GB, 1000: TB, 2000: 2 * TB };

export function initFits(root) {
  const $ = (s) => root.querySelector(s);
  const TEXT = JSON.parse(root.getAttribute('data-items'));
  const R = { bytes: $('.cp-ft-bytes'), bits: $('.cp-ft-bits'), count: $('.cp-ft-count'), what: $('.cp-ft-what'), gib: root.querySelectorAll('.cp-ft-gib'), msg: $('.cp-ft-msg') };
  const st = { drive: '512', item: 'photo' };
  function show() {
    root.querySelectorAll('[data-drive]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-drive') === st.drive ? 'true' : 'false'));
    root.querySelectorAll('[data-item]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-item') === st.item ? 'true' : 'false'));
    const bytes = DRIVES[st.drive], n = fits(bytes, ITEMS[st.item]), t = TEXT[st.item];
    R.bytes.textContent = fmtInt(bytes); R.bits.textContent = fmtInt(bytes * 8);
    R.count.textContent = fmtInt(n);
    R.what.innerHTML = `${t.en}<small>${t.zh}</small>`;
    R.gib.forEach((e) => { e.textContent = asBinaryUnits(bytes).toFixed(1); });
    R.msg.innerHTML = `${t.size_en}<span class="zh">${t.size_zh}</span>`;
  }
  root.querySelectorAll('[data-drive]').forEach((b) => b.addEventListener('click', () => { st.drive = b.getAttribute('data-drive'); show(); }));
  root.querySelectorAll('[data-item]').forEach((b) => b.addEventListener('click', () => { st.item = b.getAttribute('data-item'); show(); }));
  show();
  root.__fits = { set: (drive, item) => { st.drive = String(drive); st.item = item; show(); } };
}
