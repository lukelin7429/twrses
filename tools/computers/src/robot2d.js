/*
 * 電腦概論 · 第九課不需要 WebGL 的小互動（HTML 由 build.py 產生，這裡只綁行為）。
 *
 *   initMaze(el)  [data-cp-maze]  排指令走到旗子：三關（順序、重複、條件）。按積木把指令加進程式、點程式裡的指令可以拿掉，
 *                                 第二、三關外面包一層「重複 n 次」。按執行，機器人一條一條照做（撞牆就停）。
 *   「它最後面向哪一邊？」八題用 key2d.js 的 initChoice（通用選項題）。
 *
 * 共用的說明文字：OPS（每種指令的中英文）、lines(prog)（把程式攤成一行一行，給 3D 右邊的清單用）。
 */
import { LEVELS, build, count, run } from './robot.js';

export const OPS = {
  F: ['forward', '前進一格'], L: ['turn left', '左轉'], R: ['turn right', '右轉'],
  IFWALL: ['if there is a wall ahead:', '如果前面是牆：'], IFL: ['if wall ahead: turn left', '前面是牆就左轉'], IFR: ['if wall ahead: turn right', '前面是牆就右轉'],
};
export function lines(prog, base = [], depth = 0, out = []) {
  prog.forEach((c, i) => {
    const path = [...base, i];
    if (c.op === 'REP') { out.push({ path: path.join('.'), depth, en: `repeat ${c.n} times:`, zh: `重複 ${c.n} 次：`, rep: c.n }); lines(c.body, path, depth + 1, out); }
    else if (c.op === 'IFWALL') { out.push({ path: path.join('.'), depth, en: OPS.IFWALL[0], zh: OPS.IFWALL[1] }); lines(c.body, path, depth + 1, out); }
    else out.push({ path: path.join('.'), depth, en: OPS[c.op][0], zh: OPS[c.op][1] });
  });
  return out;
}

const ICON = { F: '↑', L: '↰', R: '↱', IFL: '▮↰', IFR: '▮↱' };

export function initMaze(root) {
  const INFO = JSON.parse(root.getAttribute('data-levels'));
  const $ = (s) => root.querySelector(s);
  const R = { tabs: [...root.querySelectorAll('[data-lv]')], grid: $('.cp-mz-grid'), hint: $('.cp-mz-hint'), rep: $('.cp-mz-rep'), n: $('.cp-mz-n'), prog: $('.cp-mz-prog'), tokens: $('.cp-mz-tokens'), run: $('.cp-mz-run'), clear: $('.cp-mz-clear'), msg: $('.cp-mz-msg'), count: $('.cp-mz-count') };
  const solved = new Set();
  let li = 0, tokens = [], n = 1, timer = 0, cells = [], bot = null;
  const L = () => LEVELS[li];
  const say = (en, zh) => { R.msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  function stop() { if (timer) { clearInterval(timer); timer = 0; } R.run.disabled = false; }
  function place(s, bump) { bot.style.transform = `translate(${s.x * 100}%, ${s.y * 100}%)`; bot.firstChild.style.transform = `rotate(${s.dir * 90}deg)`; bot.classList.toggle('is-bump', !!bump); }
  function drawGrid() {
    const lv = L().level; R.grid.innerHTML = ''; R.grid.style.setProperty('--n', lv.w); cells = [];
    for (let y = 0; y < lv.h; y++) for (let x = 0; x < lv.w; x++) { const d = document.createElement('i'); if (lv.walls.has(`${x},${y}`)) d.className = 'is-wall'; else if (lv.flag.x === x && lv.flag.y === y) { d.className = 'is-flag'; d.textContent = '⚑'; } R.grid.appendChild(d); cells.push(d); }
    bot = document.createElement('span'); bot.className = 'cp-mz-bot'; bot.innerHTML = '<b>▲</b>'; R.grid.appendChild(bot); place(lv.start);
  }
  function drawProg(active = -1) {
    R.prog.innerHTML = '';
    tokens.forEach((t, i) => { const li2 = document.createElement('li'); const b = document.createElement('button'); b.type = 'button'; b.innerHTML = `<i>${ICON[t]}</i>${OPS[t][0]}<small>${OPS[t][1]}</small>`; b.title = 'Remove · 拿掉'; if (i === active) b.classList.add('is-on'); b.addEventListener('click', () => { stop(); tokens.splice(i, 1); fresh(); }); li2.appendChild(b); R.prog.appendChild(li2); });
    if (!tokens.length) R.prog.innerHTML = '<li class="is-empty">Empty. Tap the blocks below to add instructions.<span class="zh">還是空的。點下面的積木，把指令加進來。</span></li>';
    R.n.textContent = String(n);
    R.count.textContent = String(tokens.length ? count(build(tokens, n)) : 0);
    root.querySelectorAll('.cp-mz-tokens button').forEach((b) => { b.disabled = tokens.length >= L().max; });
  }
  function fresh() { const lv = L().level; cells.forEach((c) => c.classList.remove('is-seen')); place(lv.start); drawProg(); }
  function setLevel(i) {
    stop(); li = i; tokens = []; n = L().rep ? 2 : 1;
    R.tabs.forEach((b, k) => { b.setAttribute('aria-pressed', k === i ? 'true' : 'false'); b.classList.toggle('is-done', solved.has(k)); });
    R.hint.innerHTML = `${INFO[i].hint_en}<span class="zh">${INFO[i].hint_zh}</span>`;
    R.rep.hidden = !L().rep;
    R.tokens.innerHTML = '';
    for (const t of L().tokens) { const b = document.createElement('button'); b.type = 'button'; b.setAttribute('data-tok', t); b.innerHTML = `<i>${ICON[t]}</i>${OPS[t][0]}<small>${OPS[t][1]}</small>`; b.addEventListener('click', () => { if (tokens.length >= L().max) return; stop(); tokens.push(t); fresh(); }); R.tokens.appendChild(b); }
    drawGrid(); drawProg();
    say(`This program can hold up to ${L().max} instructions${L().rep ? ' inside the repeat' : ''}. Build it, then press Run.`, `這個程式${L().rep ? '在「重複」裡面' : ''}最多放 ${L().max} 條指令。排好之後按「執行」。`);
  }
  function verdict(res) {
    const c = count(build(tokens, n));
    if (res.result === 'goal') {
      solved.add(li); R.tabs[li].classList.add('is-done');
      say(`The robot reached the flag with a program of ${c} instruction${c === 1 ? '' : 's'}.${c <= L().par ? ' That is as short as any we know.' : ` It can be done with ${L().par}.`}${li < 2 ? ' Try the next level.' : ''}`, `機器人走到旗子了，程式一共 ${c} 條指令。${c <= L().par ? '這是我們知道最短的寫法。' : `其實 ${L().par} 條就夠了。`}${li < 2 ? '試試下一關。' : ''}`);
    } else if (res.result === 'bump') say('The robot walked into a wall and the program stopped. It did not look for another way, because no instruction told it to. Which instruction sent it there?', '機器人撞到牆，程式停了。它不會自己找別條路，因為沒有哪一條指令叫它這樣做。是哪一條指令把它送到那裡的？');
    else if (res.result === 'limit') say('The robot is going around and around. The program never reaches the flag.', '機器人一直繞圈圈。這個程式永遠到不了旗子。');
    else say('The program is finished, but the robot is not at the flag. It did exactly what the program said, no more and no less. What is missing?', '程式做完了，可是機器人不在旗子那裡。它完完全全照程式做，不多也不少。少了什麼？');
  }
  function go(instant) {
    stop(); if (!tokens.length) { say('The program is empty, so the robot does nothing at all.', '程式是空的，所以機器人什麼都不做。'); return null; }
    const lv = L().level, res = run(lv, build(tokens, n), 300);
    fresh();
    if (instant) { const f = res.steps[res.steps.length - 1]; if (f) place(f, f.event === 'bump'); verdict(res); return res; }
    let k = 0; R.run.disabled = true;
    timer = setInterval(() => {
      const s = res.steps[k++];
      if (!s) { stop(); verdict(res); drawProg(); return; }
      place(s, s.event === 'bump'); cells[s.y * lv.w + s.x].classList.add('is-seen');
      drawProg(s.path[L().rep ? 1 : 0]);
    }, 330);
    return res;
  }
  R.tabs.forEach((b, i) => b.addEventListener('click', () => setLevel(i)));
  R.rep.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => { stop(); n = Math.max(2, Math.min(20, n + Number(b.getAttribute('data-d')))); fresh(); }));
  R.run.addEventListener('click', () => go(false));
  R.clear.addEventListener('click', () => { stop(); tokens = []; fresh(); });
  setLevel(0);
  root.__maze = { setLevel, set: (t, k = 1) => { tokens = [...t]; n = k; fresh(); }, runNow: () => { const r = go(true); return r && r.result; }, run: () => go(false), state: () => ({ li, tokens, n, solved: [...solved] }) };
}
