/*
 * 美術 Art · 小互動「調出這個顏色」（不需要 WebGL）。
 * 八題：前四題用紅、綠、藍三盞燈的亮度（光，加法），後四題用黃、洋紅、青三層顏料的厚度（顏料，減法的示意模型）。
 * 按「對答案」才顯示差多少（CIE76 色差）；每根滑桿用文字和箭頭提示多一點或少一點，不靠顏色分辨對錯。
 * 除錯：document.querySelector('[data-ar-match]').__match（round()、set([a, b, c])、check()、next()、state）
 */
import { LIGHTS, MATCH_AT, MATCH_ROUNDS, PIGMENTS, colorName, css, deltaE, inkOn, matchGrade, mixOf, pct, sliderHints, to255 } from './color.js';

export function initMatch(root) {
  const $ = (s) => root.querySelector(s), $$ = (s) => Array.from(root.querySelectorAll(s));
  const E = {
    k: $('.ar-mt-k'), score: $('.ar-mt-score'), steps: $('.ar-mt-steps'), mode: $('.ar-mt-mode'),
    tbox: $('.ar-mt-target .ar-mt-box'), tname: $('.ar-mt-tname'), tval: $('.ar-mt-tval'),
    mbox: $('.ar-mt-mine .ar-mt-box'), mname: $('.ar-mt-mname'), mval: $('.ar-mt-mval'),
    rows: $$('.ar-mt-sl'), msg: $('.ar-mt-msg'), check: $('.ar-mt-check'), next: $('.ar-mt-next'), again: $('.ar-mt-again'),
  };
  const state = { i: 0, mine: [0, 0, 0], matched: 0, done: 0, checks: 0, solved: false };
  const N = MATCH_ROUNDS.length;
  E.steps.innerHTML = MATCH_ROUNDS.map(() => '<i></i>').join('');
  const round = () => MATCH_ROUNDS[state.i];
  const src = () => (round().mode === 'light' ? LIGHTS : PIGMENTS);
  const rgbText = (c) => { const [r, g, b] = to255(c); return `R ${r} · G ${g} · B ${b}`; };
  const bi = (en, zh) => `${en}<span class="zh">${zh}</span>`;

  function draw() {
    const r = round(), S = src(), light = r.mode === 'light';
    const target = mixOf(r.mode, r.mix), mine = mixOf(r.mode, state.mine);
    E.k.textContent = `Question ${state.i + 1} of ${N} · 第 ${state.i + 1} 題（共 ${N} 題）`;
    E.score.textContent = `${state.matched} / ${state.done}`;
    Array.from(E.steps.children).forEach((el, n) => { el.className = n < state.i ? 'is-past' : n === state.i ? 'is-now' : ''; });
    root.setAttribute('data-mode', r.mode);
    E.mode.innerHTML = light
      ? bi('<b>Light.</b> The sliders set how bright the red, green, and blue lamps are. You start in the dark.', '<b>光。</b>三根滑桿是紅、綠、藍三盞燈的亮度。一開始是全暗的。')
      : bi('<b>Paint.</b> The sliders set how thick the yellow, magenta, and cyan layers are. You start with white paper.', '<b>顏料。</b>三根滑桿是黃、洋紅、青三層顏料的厚度。一開始是一張白紙。');
    const tn = colorName(target), mn = colorName(mine);
    E.tbox.style.background = css(target); E.mbox.style.background = css(mine);
    E.tname.innerHTML = `${tn.en} <span class="zh">${tn.zh}</span>`;
    E.tval.textContent = state.solved ? rgbText(target) : 'R ? · G ? · B ?';
    E.mname.innerHTML = `${mn.en} <span class="zh">${mn.zh}</span>`;
    E.mval.textContent = rgbText(mine);
    E.rows.forEach((row, n) => {
      const chip = row.querySelector('.ar-chip'), c = mixOf(r.mode, [0, 1, 2].map((j) => (j === n ? 1 : 0)));
      chip.textContent = S[n].letter; chip.style.background = css(c); chip.style.color = inkOn(c);
      row.querySelector('.ar-mt-sn').innerHTML = light ? `${S[n].en} light <span class="zh">${S[n].zh}光</span>` : `${S[n].en} paint <span class="zh">${S[n].zh}色顏料</span>`;
      const input = row.querySelector('input');
      input.value = Math.round(state.mine[n] * 100); input.disabled = state.solved;
      input.setAttribute('aria-label', light ? `Brightness of the ${S[n].en} lamp · ${S[n].zh}燈的亮度` : `Thickness of the ${S[n].en} layer · ${S[n].zh}色顏料的厚度`);
      row.querySelector('output').textContent = pct(state.mine[n]);
    });
    E.check.hidden = state.solved;
    E.next.hidden = !state.solved || state.i === N - 1;
    E.again.hidden = !(state.solved && state.i === N - 1);
  }
  const clearHints = () => E.rows.forEach((row) => { row.querySelector('.ar-mt-hint').textContent = ''; });

  function check() {
    if (state.solved) return null;
    const r = round(), S = src();
    const dE = deltaE(mixOf(r.mode, state.mine), mixOf(r.mode, r.mix)), g = matchGrade(dE);
    state.checks++;
    const hints = sliderHints(state.mine, r.mix);
    E.rows.forEach((row, n) => {
      row.querySelector('.ar-mt-hint').textContent = hints[n] > 0 ? '▲ more · 多一點' : hints[n] < 0 ? '▼ less · 少一點' : '✓ good · 可以了';
    });
    const d = dE.toFixed(1);
    if (g.key === 'match') {
      state.solved = true; state.matched++; state.done++;
      const recipe = S.map((x, n) => `${x.letter} ${pct(r.mix[n])}`).join(' + ');
      const last = state.i === N - 1;
      E.msg.innerHTML = bi(
        `${g.mark} A match. The difference is ${d} (${MATCH_AT} or less counts). The target was ${recipe}. ${last ? `You matched ${state.matched} of ${N}.` : ''}`,
        `${g.mark} 調出來了。色差是 ${d}（${MATCH_AT} 以內就算）。目標是 ${recipe}。${last ? `${N} 題裡你調出了 ${state.matched} 題。` : ''}`);
    } else {
      E.msg.innerHTML = bi(`${g.mark} ${g.en}. The difference is ${d}; get it down to ${MATCH_AT} or less. Read the hint beside each slider.`,
        `${g.mark} ${g.zh}。色差是 ${d}，要降到 ${MATCH_AT} 以內。看每根滑桿旁邊的提示。`);
    }
    draw();
    return { dE, grade: g.key, hints };
  }
  function go(i) {
    state.i = i; state.mine = [0, 0, 0]; state.solved = false; state.checks = 0;
    clearHints();
    E.msg.innerHTML = bi('Move the sliders until your color looks like the target, then press Check.', '調整滑桿，讓你的顏色看起來和目標一樣，再按「對答案」。');
    draw();
  }
  function skip() { if (!state.solved) state.done++; }

  E.rows.forEach((row, n) => row.querySelector('input').addEventListener('input', (e) => {
    state.mine[n] = Number(e.target.value) / 100; draw();
  }));
  E.check.addEventListener('click', check);
  E.next.addEventListener('click', () => go(state.i + 1));
  E.again.addEventListener('click', () => { state.matched = 0; state.done = 0; go(0); });
  const skipBtn = $('.ar-mt-skip');
  if (skipBtn) skipBtn.addEventListener('click', () => {
    if (state.solved) return;
    const r = round(), S = src();
    skip(); state.solved = true; state.mine = r.mix.slice();
    clearHints();
    E.msg.innerHTML = bi(`The target was ${S.map((x, n) => `${x.letter} ${pct(r.mix[n])}`).join(' + ')}. The sliders now show it.`, `目標是 ${S.map((x, n) => `${x.letter} ${pct(r.mix[n])}`).join(' + ')}。滑桿已經調到這個配方。`);
    draw();
  });
  go(0);
  root.__match = { state, round, check, next: () => go(Math.min(N - 1, state.i + 1)), go, set: (m) => { state.mine = m.slice(); draw(); } };
}
