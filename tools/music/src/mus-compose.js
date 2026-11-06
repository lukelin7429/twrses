/*
 * 音樂 Music · 第二十課「誰寫了台灣人到現在還在唱的歌？」的互動（2D＋聲音；沒有 3D）。
 *
 * 一個機制：五聲音階（只有五個音）寫出來的旋律不容易「走音」——這五個音疊在一起、接在一起，沒有半音也沒有三全音。
 * 頁面讓你在 8 格 × 5 個音的格子上寫自己的旋律；也可以打開另外兩個音（F、B），看會發生什麼。
 * 所有現成的旋律都是我們自己寫的；頁面不放任何作曲家的旋律或歌詞。回饋只列出旋律「做了什麼」，不打分數。
 *   .mu-cp-cell 格子（點一下放音、再點取消）  [data-cp-starter] 現成的  .mu-cp-more 顯示 F 與 B  .mu-cp-play 播放  .mu-cp-clear 清空
 * 2D（不需要 WebGL）：「哪一個音不在五聲音階裡？」（[data-mu-oddq]，六題）。
 *
 * 產物：cd tools/music && npm run build → assets/js/mus-compose.js
 * 除錯：document.querySelector('[data-muscompose-lab]').__lab
 *   state（steps、more、playing）、set(step, midi)、setSteps([...])、play()、stop()、analyze()、events()、hz()、nowPlaying()、render()
 *   [data-mu-oddq].__oddq：round()、answer(midi)、score()、listen()
 */
import { getSynth, initSoundbar, watchOffscreen } from './engine.js';
import { BPM, MISSING, NAMES, PENTA, ROWS, STARTERS, STEPS, analyze, beatSeconds, emptySteps, isPenta, makeOddRounds, pcInterval, renderCompose, totalSeconds, whyOdd } from './compose.js';
import { midiToFreq, mulberry32 } from './pitch.js';
import { lazyBoot } from './common.js';

const seed = () => (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;
const audioOn = (s) => s.state.unlocked && !s.state.muted && s.running && s.running();
const LEAD = 0.15;
const AMPS = [1, 0.45, 0.2, 0.1];
const note = (synth, midi, at = 0, dur = 0.6) => synth.toneComplex(midiToFreq(midi), AMPS, { at, env: { attack: 0.01, decay: 0.5, sustain: 0 }, dur, gain: 0.5 });

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const synth = getSynth();
  const grid = $('.mu-cp-grid'), msg = $('.mu-msg');
  const state = { steps: STARTERS[0].steps.slice(), more: false, playing: false };
  let timers = [], endTimer = 0, active = -1;
  const say = (en, zh) => { msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  function build() {
    const rows = ROWS.filter((m) => state.more || isPenta(m));
    grid.style.setProperty('--cols', String(STEPS));
    grid.innerHTML = rows.map((m) => `<div class="mu-cp-row${isPenta(m) ? '' : ' is-out'}"><span class="mu-cp-name">${NAMES[m]}${m === 72 ? '′' : ''}</span>` +
      Array.from({ length: STEPS }, (_, c) => `<button type="button" class="mu-cp-cell${state.steps[c] === m ? ' is-on' : ''}${active === c ? ' is-now' : ''}" data-m="${m}" data-c="${c}" aria-label="Step ${c + 1}, note ${NAMES[m]}" aria-pressed="${state.steps[c] === m}"></button>`).join('') + '</div>').join('');
    grid.querySelectorAll('.mu-cp-cell').forEach((b) => b.addEventListener('click', () => set(+b.getAttribute('data-c'), +b.getAttribute('data-m'), true)));
  }
  function feedback() {
    const a = analyze(state.steps);
    const li = [];
    li.push(a.count ? [`You placed ${a.count} note${a.count > 1 ? 's' : ''}, ${a.distinct} different.`, `你放了 ${a.count} 個音，${a.distinct} 種不同的音。`] : ['No notes yet. Click the grid to place one.', '還沒有音。點格子放一個。']);
    if (a.count) {
      li.push(a.inScale ? ['Every note is from the five-note scale. None of them are a half step apart.', '每個音都是五聲音階的音，沒有任何兩個相差半音。'] : [`${a.outside.map((m) => NAMES[m]).join(' and ')} ${a.outside.length > 1 ? 'are' : 'is'} not in the five-note scale.${a.semitones ? ' Some notes in a row are only a half step apart.' : ''}`, `${a.outside.map((m) => NAMES[m]).join('、')} 不在五聲音階裡。${a.semitones ? ' 有些相連的音只相差半音。' : ''}`]);
      li.push(a.endsHome ? ['It ends on C, the home note.', '結束在 C，主音。'] : ['It does not end on C. Many tunes end on the home note, but not all.', '沒有結束在 C。很多旋律結束在主音，但不是全部。']);
      li.push(a.repeat ? ['A small pattern comes back: that is repetition.', '有一個小圖樣回來了：這是重複。'] : ['No small pattern repeats yet. Try bringing back a pattern you already used.', '還沒有小圖樣重複。試試把用過的圖樣再放一次。']);
    }
    $('.mu-cp-fb').innerHTML = li.map((x) => `<li>${x[0]}<span class="zh">${x[1]}</span></li>`).join('');
  }
  function show() { build(); feedback(); $('.mu-cp-more').setAttribute('aria-pressed', state.more ? 'true' : 'false'); $$('[data-cp-starter]').forEach((b) => b.setAttribute('aria-pressed', JSON.stringify(STARTERS.find((s) => s.key === b.getAttribute('data-cp-starter')).steps) === JSON.stringify(state.steps) ? 'true' : 'false')); }
  function stop() {
    timers.forEach(clearTimeout); timers = []; clearTimeout(endTimer);
    if (state.playing) synth.stopAll();
    state.playing = false; active = -1; $('.mu-cp-play').innerHTML = '&#9654; Play · 播放'; build();
  }
  function set(c, m, preview = false) {
    if (state.playing) stop();
    state.steps[c] = state.steps[c] === m ? null : m;
    if (preview && state.steps[c] != null) { synth.unlock(); if (audioOn(synth)) note(synth, m); }
    show();
  }
  function setSteps(arr) { stop(); state.steps = arr.slice(0, STEPS); while (state.steps.length < STEPS) state.steps.push(null); if (state.steps.some((m) => m != null && !isPenta(m))) state.more = true; show(); }
  function play() {
    stop(); synth.unlock();
    const base = (audioOn(synth) ? synth.clock() : 0) + LEAD, bs = beatSeconds();
    if (audioOn(synth)) renderCompose(state.steps).forEach((e) => note(synth, e.midi, base + e.time, bs * 1.1));
    state.playing = true; $('.mu-cp-play').innerHTML = 'Stop · 停止';
    for (let c = 0; c < STEPS; c++) timers.push(setTimeout(() => { active = c; build(); }, (LEAD + c * bs) * 1000));
    endTimer = setTimeout(() => { state.playing = false; active = -1; $('.mu-cp-play').innerHTML = '&#9654; Play · 播放'; build(); }, (totalSeconds() + LEAD) * 1000 + 100);
    say('Playing your tune. Listen for where it feels finished, and where a pattern comes back.', '播放你的旋律。聽聽哪裡有「結束」的感覺，哪裡有圖樣回來。');
  }
  $$('[data-cp-starter]').forEach((b) => b.addEventListener('click', () => { setSteps(STARTERS.find((s) => s.key === b.getAttribute('data-cp-starter')).steps); play(); }));
  $('.mu-cp-more').addEventListener('click', () => { state.more = !state.more; if (!state.more) state.steps = state.steps.map((m) => (m != null && !isPenta(m) ? null : m)); show(); say(state.more ? 'F and B are now in the grid. Place one next to its neighbor, and listen for the half step.' : 'Back to the five notes.', state.more ? '格子裡多了 F 和 B。把其中一個放在鄰近的音旁邊，聽聽那個半音。' : '回到五個音。'); });
  $('.mu-cp-play').addEventListener('click', () => (state.playing ? stop() : play()));
  $('.mu-cp-clear').addEventListener('click', () => { stop(); state.steps = emptySteps(); show(); });
  new IntersectionObserver((e) => { if (!e[0].isIntersecting && state.playing) stop(); }, { threshold: 0.05 }).observe(root);
  watchOffscreen(root);
  show();
  say('Click a square to place a note, click it again to remove it. Press play to hear your tune. These five notes are C, D, E, G, and A.', '點一個方格放音，再點一次取消。按播放聽你的旋律。這五個音是 C、D、E、G、A。');
  root.classList.add('al-ready');
  root.__lab = { state, set, setSteps, play, stop, analyze: () => analyze(state.steps), events: () => renderCompose(state.steps), hz: () => synth.hz(), nowPlaying: () => synth.nowPlaying(), render: show };
  return { ready: () => true, demo: (v) => { const s = STARTERS.find((x) => x.key === v); if (s) setSteps(s.steps); else if (v === 'more') { state.more = true; setSteps([64, 65, 64, 60, 71, 72, 71, 67]); } play(); } };
}

function initOddQ(root) {
  const synth = getSynth();
  const R = { k: root.querySelector('.mu-od-k'), score: root.querySelector('.mu-od-score'), msg: root.querySelector('.mu-q-msg'), box: root.querySelector('.mu-od-opts'),
    next: root.querySelector('.mu-od-next'), listen: root.querySelector('.mu-od-listen'), hint: root.querySelector('.mu-od-hint') };
  let qs = makeOddRounds(mulberry32(seed()), 6), q = 0, first = 0, tried = false, done = false, opts = [];
  function listen() {
    synth.unlock(); synth.stopAll();
    if (audioOn(synth)) { const base = synth.clock() + LEAD, bs = 0.6; [...qs[q].notes].sort((a, b) => a - b).forEach((m, i) => note(synth, m, base + i * bs, bs * 1.2)); }
    else { R.hint.hidden = false; R.hint.innerHTML = 'No sound yet. Turn the sound on in the bar above. You can still answer by looking at the names.<span class="zh">還沒有聲音。請在上方的聲音列開啟聲音。你也可以只看音名來回答。</span>'; }
  }
  function ask() {
    tried = false; done = false;
    R.k.innerHTML = `Question ${q + 1} of ${qs.length} · 第 ${q + 1} 題（共 ${qs.length} 題）`;
    const sorted = [...qs[q].notes].sort((a, b) => a - b);
    R.box.innerHTML = sorted.map((m) => `<button type="button" class="mu-eq-opt mu-od-opt" data-pick="${m}"><b>${NAMES[m]}</b></button>`).join('');
    opts = [...R.box.querySelectorAll('[data-pick]')];
    opts.forEach((b) => b.addEventListener('click', () => answer(+b.getAttribute('data-pick'))));
    R.next.hidden = true; R.hint.hidden = true; R.hint.textContent = '';
    R.msg.innerHTML = 'Four of these five notes are from the five-note scale C, D, E, G, A. Which one is not?<span class="zh">這五個音裡，有四個是五聲音階 C、D、E、G、A 的音。哪一個不是？</span>';
  }
  function answer(m) {
    if (done) return;
    const btn = opts.find((x) => +x.getAttribute('data-pick') === m);
    if (m === qs[q].odd) {
      done = true; if (!tried) first++;
      btn.classList.add('is-right'); opts.forEach((x) => { x.disabled = true; });
      const w = whyOdd(qs[q].notes, m);
      R.msg.innerHTML = `Yes: ${NAMES[m]} is not in the five-note scale.${w ? ` It is only a half step from ${NAMES[w]}.` : ''}<span class="zh">答對了：${NAMES[m]} 不在五聲音階裡。${w ? `它和 ${NAMES[w]} 只相差半音。` : ''}</span>`;
      R.score.textContent = `${first} / ${q + 1}`;
      R.next.hidden = false; R.next.textContent = q + 1 < qs.length ? 'Next question · 下一題' : 'See my score · 看成績';
    } else {
      tried = true; btn.classList.add('is-wrong'); btn.disabled = true;
      R.msg.innerHTML = `Not that one. The five notes are C, D, E, G, and A. Which note on the list is not one of them?<span class="zh">不是這個。五個音是 C、D、E、G、A。清單裡哪一個不是它們之一？</span>`;
    }
  }
  R.listen.addEventListener('click', listen);
  R.next.addEventListener('click', () => {
    if (R.next.dataset.again) { delete R.next.dataset.again; qs = makeOddRounds(mulberry32(seed()), 6); q = 0; first = 0; R.score.textContent = '0 / 0'; ask(); return; }
    q++;
    if (q >= qs.length) {
      R.k.innerHTML = 'Finished · 完成';
      R.msg.innerHTML = `You got ${first} of ${qs.length} right on the first try.<span class="zh">你第一次就答對 ${first} 題（共 ${qs.length} 題）。</span>`;
      opts.forEach((x) => { x.disabled = true; });
      R.next.textContent = 'Play again · 再玩一次'; R.next.dataset.again = '1';
      return;
    }
    ask();
  });
  watchOffscreen(root);
  ask();
  root.__oddq = { round: () => qs[q], answer, score: () => ({ first, q }), listen };
}

function init2D() {
  const bar = document.querySelector('[data-mu-soundbar]'); if (bar) initSoundbar(bar);
  const q = document.querySelector('[data-mu-oddq]'); if (q) initOddQ(q);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-muscompose-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
void BPM; void MISSING; void PENTA; void pcInterval;
