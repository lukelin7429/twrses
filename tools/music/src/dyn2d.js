/*
 * 音樂 Music · 第四課的兩個小遊戲。HTML 由 build.py 產生，這裡綁行為。
 *   initSigns(el)   [data-mu-sign]    這是哪一個記號？：先聽一個參考音（mf），再聽旋律；選 piano／forte／crescendo／diminuendo（六題）
 *   initTempoQ(el)  [data-mu-tempoq]  哪一個是 allegro？：同一段旋律以兩種速度各播一次；選第一個或第二個（五題）
 *   沒有聲音時改用文字描述。除錯：el.__sign（round()、answer(key)）、el.__tempo（round()、answer('first'|'second')）
 */
import { getSynth, watchOffscreen } from './engine.js';
import { MELODY, SIGNS, TEMPOS, dynOf, makeSignRounds, makeTempoRounds, melodySeconds, planMelody, tempoOf } from './dynamics.js';
import { mulberry32, midiToFreq } from './pitch.js';

const seed = () => (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;
const REF = { midi: 60, gain: 0.45, dur: 0.7 };      // 參考音：C4，mf

function playPlan(synth, ev, startAt) {
  ev.forEach((e) => synth.tone(e.freq, { type: 'triangle', at: startAt + e.time, dur: Math.max(0.12, e.dur * 0.92), gain: e.gain }));
}
const audioOn = (synth) => synth.state.unlocked && synth.running && synth.running();

export function initSigns(root) {
  const synth = getSynth();
  const R = { k: root.querySelector('.mu-sg-k'), score: root.querySelector('.mu-sg-score'), msg: root.querySelector('.mu-sg-msg'), play: root.querySelector('.mu-sg-play'),
    opts: [...root.querySelectorAll('[data-pick]')], next: root.querySelector('.mu-sg-next'), desc: root.querySelector('.mu-sg-desc'), nosound: root.querySelector('.mu-sg-nosound') };
  let rounds = makeSignRounds(mulberry32(seed()), 6), q = 0, first = 0, tried = false, done = false;
  const sign = () => SIGNS.find((s) => s.key === rounds[q]);
  function play() {
    if (!synth.state.supported) return;
    if (!synth.state.unlocked && !synth.unlock()) return;
    synth.stopAll();
    if (!audioOn(synth)) return;
    const s = sign(), t0 = synth.clock() + 0.1;
    synth.tone(midiToFreq(REF.midi), { type: 'triangle', at: t0, dur: REF.dur, gain: REF.gain });
    playPlan(synth, planMelody({ bpm: 100, dyn: s.dyn, shape: s.shape }), t0 + REF.dur + 0.5);
  }
  function ask() {
    tried = false; done = false;
    R.k.innerHTML = `Question ${q + 1} of ${rounds.length} · 第 ${q + 1} 題（共 ${rounds.length} 題）`;
    R.opts.forEach((b) => { b.className = 'mu-sg-opt'; b.disabled = false; });
    R.next.hidden = true;
    const s = sign(), ns = !synth.state.supported;
    R.nosound.hidden = !ns; R.desc.hidden = !ns;
    R.desc.innerHTML = `Compared with the first (reference) note, the melody is ${s.shape === 'cresc' ? 'getting louder' : s.shape === 'dim' ? 'getting softer' : s.dyn === 'p' ? 'softer' : 'louder'}.<span class="zh">和第一個（參考）音比，旋律${s.shape === 'cresc' ? '越來越大聲' : s.shape === 'dim' ? '越來越小聲' : s.dyn === 'p' ? '比較小聲' : '比較大聲'}。</span>`;
    R.msg.innerHTML = 'Press play. You hear one reference note, and then the melody. Is the melody softer, louder, getting louder, or getting softer?<span class="zh">按播放。你會先聽到一個參考音，再聽旋律。旋律是比較小聲、比較大聲、越來越大聲，還是越來越小聲？</span>';
  }
  function answer(k) {
    if (done) return;
    const b = R.opts.find((x) => x.getAttribute('data-pick') === k);
    if (k === rounds[q]) {
      done = true; if (!tried) first++;
      b.classList.add('is-right'); R.opts.forEach((x) => { x.disabled = true; });
      const s = sign();
      R.msg.innerHTML = `Yes: ${s.it}, ${s.en}.<span class="zh">答對了：${s.it}，${s.zh}。</span>`;
      R.score.textContent = `${first} / ${q + 1}`;
      R.next.hidden = false; R.next.textContent = q + 1 < rounds.length ? 'Next question · 下一題' : 'See my score · 看成績';
    } else {
      tried = true; b.classList.add('is-wrong'); b.disabled = true;
      R.msg.innerHTML = 'Not that one. Play it again and listen to how the melody changes.<span class="zh">不是這個。再播一次，聽旋律怎麼變。</span>';
    }
  }
  R.opts.forEach((b) => b.addEventListener('click', () => answer(b.getAttribute('data-pick'))));
  R.play.addEventListener('click', play);
  R.next.addEventListener('click', () => {
    if (R.next.dataset.again) { delete R.next.dataset.again; rounds = makeSignRounds(mulberry32(seed()), 6); q = 0; first = 0; R.score.textContent = '0 / 0'; ask(); play(); return; }
    q++;
    if (q >= rounds.length) {
      R.k.innerHTML = 'Finished · 完成';
      R.msg.innerHTML = `You got ${first} of ${rounds.length} right on the first try.<span class="zh">你第一次就答對 ${first} 題（共 ${rounds.length} 題）。</span>`;
      R.opts.forEach((x) => { x.disabled = true; });
      R.next.textContent = 'Play again · 再玩一次'; R.next.dataset.again = '1';
      return;
    }
    ask(); play();
  });
  synth.subscribe(() => { const ns = !synth.state.supported; R.nosound.hidden = !ns; R.desc.hidden = !ns || done; });
  watchOffscreen(root);
  ask();
  root.__sign = { round: () => rounds[q], answer, score: () => ({ first, q }), play };
}

export function initTempoQ(root) {
  const synth = getSynth();
  const R = { k: root.querySelector('.mu-tq-k'), score: root.querySelector('.mu-tq-score'), msg: root.querySelector('.mu-tq-msg'), ask: root.querySelector('.mu-tq-ask'),
    play: root.querySelector('.mu-tq-play'), opts: [...root.querySelectorAll('[data-pick]')], next: root.querySelector('.mu-tq-next'),
    desc: root.querySelector('.mu-tq-desc'), nosound: root.querySelector('.mu-tq-nosound'), ladder: root.querySelector('.mu-tq-ladder') };
  const rng0 = mulberry32(seed());
  let rounds = makeTempoRounds(rng0, 5), terms = rounds.map(() => (rng0() < 0.5 ? 'faster' : 'slower')), q = 0, first = 0, tried = false, done = false;
  const SHORT = MELODY.slice(0, 4);
  const cur = () => rounds[q];
  // 題目問的詞：被問的那一個是 first 或 second
  const target = () => (terms[q] === 'faster' ? cur()[cur().faster] : cur()[cur().faster === 'first' ? 'second' : 'first']);
  const answerSide = () => (terms[q] === 'faster' ? cur().faster : cur().faster === 'first' ? 'second' : 'first');
  function play() {
    if (!synth.state.supported) return;
    if (!synth.state.unlocked && !synth.unlock()) return;
    synth.stopAll();
    if (!audioOn(synth)) return;
    const a = tempoOf(cur().first), b = tempoOf(cur().second), t0 = synth.clock() + 0.1;
    const da = melodySeconds(a.bpm, SHORT);
    playPlan(synth, planMelody({ bpm: a.bpm, dyn: 'mf', melody: SHORT }), t0);
    playPlan(synth, planMelody({ bpm: b.bpm, dyn: 'mf', melody: SHORT }), t0 + da + 0.9);
  }
  function ask() {
    tried = false; done = false;
    const t = tempoOf(target());
    R.k.innerHTML = `Question ${q + 1} of ${rounds.length} · 第 ${q + 1} 題（共 ${rounds.length} 題）`;
    R.ask.innerHTML = `Which one is <b>${t.it}</b>? <span class="zh">哪一個是 ${t.it}（${t.zh}）？</span>`;
    R.opts.forEach((b) => { b.className = 'mu-tq-opt'; b.disabled = false; });
    R.next.hidden = true;
    const ns = !synth.state.supported;
    R.nosound.hidden = !ns; R.desc.hidden = !ns;
    const da = melodySeconds(tempoOf(cur().first).bpm, SHORT), db = melodySeconds(tempoOf(cur().second).bpm, SHORT);
    R.desc.innerHTML = `The first version lasts ${da.toFixed(1)} seconds, and the second lasts ${db.toFixed(1)} seconds.<span class="zh">第一個版本長 ${da.toFixed(1)} 秒，第二個長 ${db.toFixed(1)} 秒。</span>`;
    R.msg.innerHTML = 'Press play. You hear the same four notes twice, first one version and then the other. Use the speed ladder if you need it.<span class="zh">按播放。你會聽到同樣四個音兩次，先一個版本、再另一個版本。需要的話看一下速度階梯。</span>';
  }
  function answer(side) {
    if (done) return;
    const b = R.opts.find((x) => x.getAttribute('data-pick') === side);
    if (side === answerSide()) {
      done = true; if (!tried) first++;
      b.classList.add('is-right'); R.opts.forEach((x) => { x.disabled = true; });
      const a = tempoOf(cur().first), c = tempoOf(cur().second);
      R.msg.innerHTML = `Yes. The first version was ${a.it} (${a.en}) and the second was ${c.it} (${c.en}).<span class="zh">答對了。第一個是 ${a.it}（${a.zh}），第二個是 ${c.it}（${c.zh}）。</span>`;
      R.score.textContent = `${first} / ${q + 1}`;
      R.next.hidden = false; R.next.textContent = q + 1 < rounds.length ? 'Next question · 下一題' : 'See my score · 看成績';
    } else {
      tried = true; b.classList.add('is-wrong'); b.disabled = true;
      R.msg.innerHTML = 'Not that one. Play it again, and think about which version is faster.<span class="zh">不是這個。再播一次，想一想哪一個版本比較快。</span>';
    }
  }
  R.opts.forEach((b) => b.addEventListener('click', () => answer(b.getAttribute('data-pick'))));
  R.play.addEventListener('click', play);
  R.next.addEventListener('click', () => {
    if (R.next.dataset.again) { delete R.next.dataset.again; const r = mulberry32(seed()); rounds = makeTempoRounds(r, 5); terms = rounds.map(() => (r() < 0.5 ? 'faster' : 'slower')); q = 0; first = 0; R.score.textContent = '0 / 0'; ask(); play(); return; }
    q++;
    if (q >= rounds.length) {
      R.k.innerHTML = 'Finished · 完成';
      R.msg.innerHTML = `You got ${first} of ${rounds.length} right on the first try.<span class="zh">你第一次就答對 ${first} 題（共 ${rounds.length} 題）。</span>`;
      R.opts.forEach((x) => { x.disabled = true; });
      R.next.textContent = 'Play again · 再玩一次'; R.next.dataset.again = '1';
      return;
    }
    ask(); play();
  });
  if (R.ladder) R.ladder.innerHTML = TEMPOS.map((t, i) => `<li><b>${t.it}</b><span>${t.zh}</span></li>`).join('');
  synth.subscribe(() => { const ns = !synth.state.supported; R.nosound.hidden = !ns; R.desc.hidden = !ns || done; });
  watchOffscreen(root);
  ask();
  root.__tempo = { round: () => ({ ...cur(), asks: target(), answer: answerSide() }), answer, score: () => ({ first, q }), play };
}
