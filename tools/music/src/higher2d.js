/*
 * 音樂 Music · 「哪一個比較高？」（不需要 WebGL）。
 *
 *   initHigher(el)  [data-mu-higher]：連續播兩個音，選高的那一個。八題，越後面兩個音越接近（700 → 25 音分）。
 *                   記「第一次就答對」的題數。沒有聲音時（靜音、不支援）勾「顯示頻率」，用數字也能玩。
 *   除錯：el.__higher.round()（目前這題 { a, b, gap, higher }）、.answer('a'|'b')、.score()
 */
import { getSynth, watchOffscreen } from './engine.js';
import { HIGHER_GAPS, makeHigherRound, mulberry32 } from './pitch.js';

const seed = () => (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;
const NOTE = 0.6, GAP = 0.3;   // 每個音的長度、兩個音之間的空白（秒）

export function initHigher(root) {
  const synth = getSynth();
  const R = { k: root.querySelector('.mu-hg-k'), score: root.querySelector('.mu-hg-score'), msg: root.querySelector('.mu-hg-msg'),
    play: root.querySelector('.mu-hg-play'), a: root.querySelector('[data-pick="a"]'), b: root.querySelector('[data-pick="b"]'),
    next: root.querySelector('.mu-hg-next'), show: root.querySelector('[data-t="hz"]'), steps: root.querySelector('.mu-hg-steps'),
    nosound: root.querySelector('.mu-hg-nosound') };
  let rng = mulberry32(seed()), q = 0, round = null, first = 0, tried = false, done = false, timers = [];

  const wantNumbers = () => R.show.checked || !synth.state.supported;
  const fmt = (f) => `${f.toFixed(1)} Hz`;

  function render() {
    const nums = wantNumbers();
    root.classList.toggle('mu-hg-nums', nums);
    R.a.querySelector('.mu-hg-hz').textContent = nums ? fmt(round.a) : '';
    R.b.querySelector('.mu-hg-hz').textContent = nums ? fmt(round.b) : '';
  }
  function steps() {
    R.steps.innerHTML = HIGHER_GAPS.map((g, i) => `<i class="${i < q ? 'is-past' : i === q ? 'is-now' : ''}"></i>`).join('');
  }
  function stopTimers() { timers.forEach(clearTimeout); timers = []; synth.stopAll(); }
  function playBoth() {
    stopTimers();
    if (!synth.state.supported) return;
    if (!synth.state.unlocked && !synth.unlock()) return;
    root.classList.add('mu-hg-playing');
    synth.tone(round.a, { type: 'sine', dur: NOTE, sustain: true, gain: 0.8 });
    timers.push(setTimeout(() => synth.tone(round.b, { type: 'sine', dur: NOTE, sustain: true, gain: 0.8 }), (NOTE + GAP) * 1000));
    timers.push(setTimeout(() => root.classList.remove('mu-hg-playing'), (NOTE * 2 + GAP) * 1000));
  }
  function ask(autoplay) {
    round = makeHigherRound(rng, q);
    tried = false; done = false;
    R.k.innerHTML = `Question ${q + 1} of ${HIGHER_GAPS.length} · 第 ${q + 1} 題（共 ${HIGHER_GAPS.length} 題）`;
    R.msg.innerHTML = 'Listen to both notes, then pick the higher one.<span class="zh">聽兩個音，選出比較高的那一個。</span>';
    R.a.className = 'mu-hg-opt'; R.b.className = 'mu-hg-opt';
    R.a.disabled = false; R.b.disabled = false;
    R.next.hidden = true;
    R.nosound.hidden = synth.state.supported;
    render(); steps();
    if (autoplay && synth.state.unlocked && !synth.state.muted) playBoth();
  }
  function gapText(g) {
    const keys = g / 100;
    const en = keys >= 1 ? `${keys} piano keys apart` : `${Math.round(g)} cents apart (less than one piano key)`;
    const zh = keys >= 1 ? `相差 ${keys} 個鋼琴鍵` : `相差 ${Math.round(g)} 音分（不到一個鋼琴鍵）`;
    return [en, zh];
  }
  function answer(side) {
    if (done) return;
    const btn = side === 'a' ? R.a : R.b;
    if (side === round.higher) {
      done = true; if (!tried) first++;
      btn.classList.add('is-right');
      R.a.disabled = true; R.b.disabled = true;
      const [en, zh] = gapText(round.gap);
      R.msg.innerHTML = `Yes: the ${side === 'a' ? 'first' : 'second'} note is higher (${fmt(round.higher === 'a' ? round.a : round.b)} against ${fmt(round.higher === 'a' ? round.b : round.a)}). The two notes were ${en}.` +
        `<span class="zh">答對了：${side === 'a' ? '第一個' : '第二個'}音比較高。兩個音${zh}。</span>`;
      R.score.textContent = `${first} / ${q + 1}`;
      R.next.hidden = false;
      R.next.textContent = q + 1 < HIGHER_GAPS.length ? 'Next question · 下一題' : 'See my score · 看成績';
      render();
      R.a.querySelector('.mu-hg-hz').textContent = fmt(round.a);
      R.b.querySelector('.mu-hg-hz').textContent = fmt(round.b);
    } else {
      tried = true;
      btn.classList.add('is-wrong'); btn.disabled = true;
      R.msg.innerHTML = 'Not that one. Listen again and try the other.<span class="zh">不是這個。再聽一次，換另一個試試。</span>';
    }
  }
  function finish() {
    const n = HIGHER_GAPS.length;
    const en = first === n ? 'Perfect! Your ears caught even the tiny gaps.' : first >= n - 2 ? 'Very good. The last questions are hard for everyone.' : first >= n / 2 ? 'Good work. The closer the two notes, the harder it gets. Try again!' : 'The notes that are close together are hard to tell apart. Try again!';
    const zh = first === n ? '全對！連很小的差距你的耳朵都聽得出來。' : first >= n - 2 ? '很好。最後幾題對大家都很難。' : first >= n / 2 ? '不錯。兩個音越接近，越難分辨。再玩一次吧！' : '兩個音靠得很近時，很難分辨。再試一次吧！';
    R.msg.innerHTML = `You got ${first} of ${n} right on the first try. ${en}<span class="zh">你第一次就答對 ${first} 題（共 ${n} 題）。${zh}</span>`;
    R.k.innerHTML = 'Finished · 完成';
    R.a.disabled = true; R.b.disabled = true;
    R.next.hidden = false; R.next.textContent = 'Play again · 再玩一次';
    R.next.dataset.again = '1';
  }
  R.next.addEventListener('click', () => {
    stopTimers();
    if (R.next.dataset.again) { delete R.next.dataset.again; q = 0; first = 0; rng = mulberry32(seed()); R.score.textContent = '0 / 0'; ask(true); return; }
    q++;
    if (q >= HIGHER_GAPS.length) { finish(); return; }
    ask(true);
  });
  R.play.addEventListener('click', playBoth);
  R.a.addEventListener('click', () => answer('a'));
  R.b.addEventListener('click', () => answer('b'));
  R.show.addEventListener('change', render);
  synth.subscribe(() => { R.nosound.hidden = synth.state.supported; if (round) render(); });

  watchOffscreen(root);
  ask(false);
  root.__higher = { round: () => round, answer, score: () => ({ first, q }), play: playBoth };
}
