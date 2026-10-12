/*
 * 音樂 Music · 第八課「為什麼有些音放在一起很好聽？」的互動（2D＋聲音；沒有 3D）。
 *
 * 一個機制：兩個音同時響，頻率比越簡單，合成的波形越快重複、聽起來越融在一起；比值越複雜，重複得越慢、越容易有拍音（起伏）。
 * 三個音疊在一起是和弦；大三和弦與小三和弦只差中間那個音一個半音。
 *   [data-iv]  音程   .mu-hm-mis  把上面的音調歪（音分）   .mu-hm-both / .mu-hm-seq / .mu-hm-stop
 * 2D（不需要 WebGL）：自己按三個鍵組和弦（[data-mu-chord]）、「大三和弦還是小三和弦？」（[data-mu-chordq]，六題）。
 *
 * 產物：cd tools/music && npm run build → assets/js/mus-harmony.js
 * 除錯：document.querySelector('[data-musharmony-lab]').__lab
 *   state（iv、cents）、info()（頻率、比值、重複頻率、拍音頻率）、play()、hz()、nowPlaying()、setInterval(key)、setCents(c)、demo(name)
 *   [data-mu-chord].__chord：press(midi)、state、classify()、play()；[data-mu-chordq].__chordq：round()、answer(kind)、score()
 */
import { getSynth, initSoundbar, watchOffscreen } from './engine.js';
import { BASE_HZ, CHORDS, INTERVALS, beatHz, buildChord, centsDiff, classify, intervalOf, makeChordRounds, ratioOf, repeatHz, sumWave, upperHz } from './harmony.js';
import { LETTERS, midiToFreq, mulberry32 } from './pitch.js';
import { lazyBoot } from './common.js';

const seed = () => (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;
const audioOn = (s) => s.state.unlocked && !s.state.muted && s.running && s.running();
const AMPS = [1, 0.5, 0.33, 0.25, 0.2, 0.16];     // 有很多諧波的聲音（拍音聽得出來）
const f1 = (n) => (n >= 1000 ? n.toFixed(0) : Math.abs(n - Math.round(n)) < 0.005 ? String(Math.round(n)) : n.toFixed(1));
const midiName = (m) => `${LETTERS[m % 12]}${Math.floor(m / 12) - 1}`;
const WIN = 0.07;   // 秒：波形視窗

function sizeCanvas(cv) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2), w = cv.clientWidth || 600, h = cv.clientHeight || 200;
  if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); }
  const c = cv.getContext('2d'); c.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { c, w, h };
}
/** 兩個音與它們的和（三條波形），標出和的重複週期 */
function drawWaves(cv, fa, fb, period) {
  const { c, w, h } = sizeCanvas(cv);
  c.fillStyle = '#fffdf6'; c.fillRect(0, 0, w, h);
  const rows = [{ y: h * 0.17, f: [fa], color: '#2f6bd0' }, { y: h * 0.45, f: [fb], color: '#c4571d' }, { y: h * 0.8, f: [fa, fb], color: '#0d6b5c' }];
  const amp = h * 0.11;
  c.lineWidth = 1.8; c.lineJoin = 'round';
  rows.forEach((r, k) => {
    c.strokeStyle = '#e4dfcc'; c.lineWidth = 1; c.beginPath(); c.moveTo(0, r.y); c.lineTo(w, r.y); c.stroke();
    c.strokeStyle = r.color; c.lineWidth = 2; c.beginPath();
    const a = k === 2 ? amp * 1.6 / 2 : amp;
    for (let x = 0; x <= w; x++) {
      const t = (x / w) * WIN;
      const v = r.f.length === 1 ? Math.sin(2 * Math.PI * r.f[0] * t) : sumWave(r.f[0], r.f[1], t);
      const y = r.y - v * a;
      if (x === 0) c.moveTo(x, y); else c.lineTo(x, y);
    }
    c.stroke();
  });
  if (period && period < WIN) {
    c.strokeStyle = 'rgba(13,107,92,.55)'; c.setLineDash([4, 4]); c.lineWidth = 1.4;
    for (let t = period; t < WIN; t += period) { const x = (t / WIN) * w; c.beginPath(); c.moveTo(x, h * 0.62); c.lineTo(x, h); c.stroke(); }
    c.setLineDash([]);
  }
  c.fillStyle = '#6b6450'; c.font = '600 11px "PingFang TC", -apple-system, sans-serif';
  c.fillText('lower note · 低音', 8, 13); c.fillText('upper note · 高音', 8, h * 0.45 - amp - 5); c.fillText('both together · 合起來', 8, h * 0.62 + 4);
  c.textAlign = 'right'; c.fillText(`${Math.round(WIN * 1000)} ms`, w - 8, h - 6);
}
/** 音量一起一伏：1 秒內的起伏，起伏頻率 = 拍音頻率 */
function drawBeats(cv, rate) {
  const { c, w, h } = sizeCanvas(cv);
  c.fillStyle = '#fffdf6'; c.fillRect(0, 0, w, h);
  c.strokeStyle = '#e4dfcc'; c.lineWidth = 1; c.beginPath(); c.moveTo(0, h / 2); c.lineTo(w, h / 2); c.stroke();
  if (rate > 0.05) {
    c.strokeStyle = '#7a3fb3'; c.lineWidth = 2; c.beginPath();
    for (let x = 0; x <= w; x++) { const v = Math.abs(Math.cos(Math.PI * rate * (x / w))); if (x === 0) c.moveTo(x, h / 2 - v * h * 0.4); else c.lineTo(x, h / 2 - v * h * 0.4); }
    c.stroke();
    c.beginPath();
    for (let x = 0; x <= w; x++) { const v = Math.abs(Math.cos(Math.PI * rate * (x / w))); if (x === 0) c.moveTo(x, h / 2 + v * h * 0.4); else c.lineTo(x, h / 2 + v * h * 0.4); }
    c.stroke();
  } else {
    c.strokeStyle = '#7a3fb3'; c.lineWidth = 2; c.beginPath(); c.moveTo(0, h / 2 - h * 0.4); c.lineTo(w, h / 2 - h * 0.4); c.moveTo(0, h / 2 + h * 0.4); c.lineTo(w, h / 2 + h * 0.4); c.stroke();
  }
  c.fillStyle = '#6b6450'; c.font = '600 11px "PingFang TC", -apple-system, sans-serif'; c.textAlign = 'left';
  c.fillText('loudness over 1 second · 1 秒內的音量', 8, 13);
}

function buildKeyboard(kb, lo = 60, hi = 84) {
  const BLACK = [1, 3, 6, 8, 10];
  const whites = []; for (let m = lo; m <= hi; m++) if (!BLACK.includes(m % 12)) whites.push(m);
  kb.innerHTML = '';
  const el = {};
  for (let m = lo; m <= hi; m++) {
    const black = BLACK.includes(m % 12), b = document.createElement('button');
    b.type = 'button'; b.dataset.midi = String(m);
    b.className = `mu-sc-key ${black ? 'is-black' : 'is-white'}`;
    const wi = black ? whites.filter((x) => x < m).length : whites.indexOf(m), w = 100 / whites.length;
    if (black) { b.style.left = `${wi * w - w * 0.3}%`; b.style.width = `${w * 0.6}%`; } else { b.style.left = `${wi * w}%`; b.style.width = `${w}%`; }
    b.setAttribute('aria-label', `${midiName(m)}, ${midiToFreq(m).toFixed(1)} Hz`);
    kb.appendChild(b); el[m] = b;
  }
  return el;
}

function initLab(root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s) => root.querySelectorAll(s);
  const synth = getSynth();
  const cv = $('.mu-hm-cv'), cvb = $('.mu-hm-cvb'), msg = $('.mu-msg'), mis = $('.mu-hm-mis');
  const state = { iv: 'fifth', cents: 0, seqTimer: 0 };
  const say = (en, zh) => { msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  const cur = () => intervalOf(state.iv);
  function info() {
    const iv = cur(), a = BASE_HZ, b = upperHz(a, iv, state.cents);
    return { iv: iv.key, f1: a, f2: b, ratio: `${iv.num}:${iv.den}`, repeat: repeatHz(a, iv), beat: beatHz(a, b, iv), justVsEqual: centsDiff(iv), cents: state.cents };
  }
  function show() {
    const iv = cur(), i = info();
    $$('[data-iv]').forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-iv') === state.iv ? 'true' : 'false'));
    $('.mu-hm-ratio').innerHTML = `${iv.num} : ${iv.den}<small>${iv.en} · ${iv.zh}</small>`;
    $('.mu-hm-hz').innerHTML = `${f1(i.f1)} + ${f1(i.f2)} <small>Hz</small>`;
    $('.mu-hm-rep').innerHTML = `${f1(i.repeat)} <small>times per second · 次／秒</small>`;
    const eq = i.justVsEqual;
    $('.mu-hm-eq').innerHTML = iv.semis === 0 ? '—' : `${eq >= 0 ? '+' : '−'}${Math.abs(eq).toFixed(1)} <small>cents above (+) or below (−) the piano · 音分，高於（+）或低於（−）鋼琴</small>`;
    $('.mu-hm-mis-v').textContent = `${state.cents > 0 ? '+' : ''}${state.cents} cents · 音分`;
    $('.mu-hm-beat').innerHTML = `${i.beat < 0.05 ? '0' : f1(+i.beat.toFixed(1))} <small>beats per second · 拍音（次／秒）</small>`;
    drawWaves(cv, i.f1, i.f2, state.cents === 0 ? 1 / i.repeat : 0);
    drawBeats(cvb, i.beat);
  }
  function stop() { clearTimeout(state.seqTimer); synth.stopAll(); }
  function both() {
    stop(); synth.unlock();
    const i = info();
    if (!audioOn(synth) && !(synth.state.unlocked && !synth.state.muted)) return;
    synth.toneComplex(i.f1, AMPS, { dur: 3, gain: 0.42, env: { attack: 0.03, decay: 0.5, sustain: 0.85 } });
    synth.toneComplex(i.f2, AMPS, { dur: 3, gain: 0.42, env: { attack: 0.03, decay: 0.5, sustain: 0.85 } });
    explain(true);
  }
  function seq() {
    stop(); synth.unlock();
    const i = info();
    synth.toneComplex(i.f1, AMPS, { dur: 1, gain: 0.45, env: { attack: 0.02, decay: 0.5, sustain: 0.6 } });
    state.seqTimer = setTimeout(() => synth.toneComplex(i.f2, AMPS, { dur: 1, gain: 0.45, env: { attack: 0.02, decay: 0.5, sustain: 0.6 } }), 1000);
    explain(false);
  }
  function explain(together) {
    const iv = cur(), i = info();
    if (state.cents !== 0) say(`The upper note is ${Math.abs(state.cents)} cents ${state.cents > 0 ? 'too high' : 'too low'}. Two nearly matching frequencies make the sound swell and fade about ${f1(+i.beat.toFixed(1))} ${+i.beat.toFixed(1) === 1 ? 'time' : 'times'} per second: those are beats.`,
      `上面的音${state.cents > 0 ? '高' : '低'}了 ${Math.abs(state.cents)} 音分。兩個幾乎相同的頻率疊在一起，聲音大約每秒 ${f1(+i.beat.toFixed(1))} 次一起一伏：這就是拍音。`);
    else if (together) say(`${iv.en}: ${iv.num} : ${iv.den}. The two waves line up again ${f1(i.repeat)} times per second. The smaller the numbers, the sooner the pattern repeats.`,
      `${iv.zh}：${iv.num} 比 ${iv.den}。兩個波每秒重新對齊 ${f1(i.repeat)} 次。數字越小，圖樣越快重複。`);
    else say(`${iv.en}: first the lower note, then the upper note. Now press “Together” and compare.`, `${iv.zh}：先低音、再高音。再按「一起響」比較看看。`);
  }
  function setInterval_(k) { stop(); state.iv = k; show(); say(`${cur().en}: a ratio of ${cur().num} : ${cur().den}. Press “Together” to hear it.`, `${cur().zh}：頻率比 ${cur().num} 比 ${cur().den}。按「一起響」聽聽看。`); }
  function setCents(c) { state.cents = Math.max(-50, Math.min(50, Math.round(c))); mis.value = String(state.cents); show(); }

  $$('[data-iv]').forEach((b) => b.addEventListener('click', () => { setInterval_(b.getAttribute('data-iv')); both(); }));
  mis.addEventListener('input', () => setCents(Number(mis.value)));
  $('.mu-hm-both').addEventListener('click', both);
  $('.mu-hm-seq').addEventListener('click', seq);
  $('.mu-hm-stop').addEventListener('click', stop);
  window.addEventListener('resize', show);
  watchOffscreen(root);

  const DEMO = {
    octave() { setCents(0); setInterval_('octave'); both(); },
    fifth() { setCents(0); setInterval_('fifth'); both(); },
    second() { setCents(0); setInterval_('minsecond'); both(); },
    beats() { setInterval_('unison'); setCents(8); both(); },
  };
  setInterval_('fifth');
  say('Choose an interval, then press “Together” to hear two notes at once. The waves below show why the simple ratios line up so quickly.', '選一個音程，再按「一起響」聽兩個音同時響。下面的波形讓你看見，簡單的比為什麼很快就對齊。');
  root.classList.add('al-ready');
  void INTERVALS;
  root.__lab = { state, info, play: both, stop, hz: () => synth.hz(), nowPlaying: () => synth.nowPlaying(), setInterval: setInterval_, setCents, demo: (v) => DEMO[v] && DEMO[v](), render: show };
  return { ready: () => true, demo: (v) => DEMO[v] && DEMO[v]() };
}

function initChord(root) {
  const synth = getSynth();
  const kb = root.querySelector('.mu-ch-kb'), out = root.querySelector('.mu-ch-name'), msg = root.querySelector('.mu-ch-msg');
  const keys = buildKeyboard(kb, 60, 84);
  const state = { sel: [] };
  const say = (en, zh) => { msg.innerHTML = `${en}<span class="zh">${zh}</span>`; };
  function show() {
    Object.entries(keys).forEach(([m, el]) => el.classList.toggle('is-on', state.sel.includes(Number(m))));
    const sel = [...state.sel].sort((a, b) => a - b);
    root.querySelector('.mu-ch-play').disabled = sel.length === 0;
    if (sel.length === 3) {
      const c = classify(sel);
      if (c.kind === 'other') out.innerHTML = 'Another chord · 別的和弦<small>' + sel.map(midiName).join(' ') + '</small>';
      else out.innerHTML = `${c.root} ${CHORDS[c.kind].en.toLowerCase()} · ${c.root} ${CHORDS[c.kind].zh}<small>${sel.map(midiName).join(' ')}: ${sel.slice(1).map((m) => `+${m - sel[0]}`).join(' ')} semitones · 半音</small>`;
    } else out.innerHTML = `${sel.length} of 3 keys · 已選 ${sel.length} 個鍵<small>${sel.map(midiName).join(' ') || 'Press three keys · 按三個鍵'}</small>`;
  }
  function playSel() {
    synth.unlock(); synth.stopAll();
    const sel = [...state.sel].sort((a, b) => a - b);
    sel.forEach((m) => synth.toneComplex(midiToFreq(m), AMPS, { dur: 2.4, gain: 0.3, env: { attack: 0.02, decay: 0.6, sustain: 0.7 } }));
  }
  function press(m) {
    synth.unlock();
    const i = state.sel.indexOf(m);
    if (i >= 0) state.sel.splice(i, 1); else { state.sel.push(m); if (state.sel.length > 3) state.sel.shift(); }
    show();
    if (synth.state.unlocked && !synth.state.muted) { synth.stopAll(); synth.toneComplex(midiToFreq(m), AMPS, { dur: 0.9, gain: 0.4, env: { attack: 0.01, decay: 0.5, sustain: 0.3 } }); }
    const sel = [...state.sel].sort((a, b) => a - b);
    if (sel.length === 3) {
      const c = classify(sel);
      if (c.kind === 'major') say('A major triad: a major third (4 semitones) and a perfect fifth (7) above the root. Press “Play the chord”.', '大三和弦：根音上面有大三度（4 個半音）和純五度（7 個半音）。按「播放和弦」。');
      else if (c.kind === 'minor') say('A minor triad: the middle note is one half step lower than in a major triad. (The page writes black keys with sharps, so the black key between D and E shows as D♯. It is also called E♭.) Press “Play the chord”.', '小三和弦：中間那個音比大三和弦低一個半音。（本頁黑鍵用升記號標示，所以 D 和 E 之間的黑鍵寫成 D♯，它也叫 E♭。）按「播放和弦」。');
      else say('That is not a major or minor triad. Press “Play the chord” and compare it with one.', '這不是大三和弦或小三和弦。按「播放和弦」，再和它們比較。');
    } else say('Press up to three keys. A chord is three or more notes sounding together.', '最多按三個鍵。和弦是三個或更多的音同時響。');
  }
  Object.entries(keys).forEach(([m, el]) => el.addEventListener('click', () => press(Number(m))));
  root.querySelector('.mu-ch-play').addEventListener('click', playSel);
  root.querySelector('.mu-ch-clear').addEventListener('click', () => { state.sel = []; show(); synth.stopAll(); });
  root.querySelectorAll('[data-chord]').forEach((b) => b.addEventListener('click', () => {
    const k = b.getAttribute('data-chord'); state.sel = buildChord(60, k); show(); playSel(); say(`${CHORDS[k].en} on C: ${state.sel.map(midiName).join(' ')}.`, `C 上的${CHORDS[k].zh}：${state.sel.map(midiName).join(' ')}。`);
  }));
  watchOffscreen(root);
  show();
  say('Press up to three keys. A chord is three or more notes sounding together.', '最多按三個鍵。和弦是三個或更多的音同時響。');
  root.__chord = { state, press, play: playSel, classify: () => classify(state.sel), render: show };
}

function initChordQ(root) {
  const synth = getSynth();
  const R = { k: root.querySelector('.mu-cq-k'), score: root.querySelector('.mu-cq-score'), msg: root.querySelector('.mu-q-msg'), opts: [...root.querySelectorAll('[data-pick]')],
    next: root.querySelector('.mu-cq-next'), listen: root.querySelector('.mu-cq-listen'), show: root.querySelector('.mu-cq-show'), pat: root.querySelector('.mu-cq-pat') };
  let qs = makeChordRounds(mulberry32(seed()), 6), q = 0, first = 0, tried = false, done = false;
  const names = { major: ['Major', '大三和弦'], minor: ['Minor', '小三和弦'] };
  function listen() {
    synth.unlock(); synth.stopAll();
    const r = qs[q];
    buildChord(r.root, r.kind).forEach((m) => synth.toneComplex(midiToFreq(m), AMPS, { dur: 1.8, gain: 0.3, env: { attack: 0.02, decay: 0.6, sustain: 0.7 } }));
    if (!(synth.state.unlocked && !synth.state.muted)) R.msg.innerHTML = 'No sound yet. Turn the sound on in the bar above, or press “Show the notes” instead.<span class="zh">還沒有聲音。請在上方的聲音列開啟聲音，或改按「看音」。</span>';
  }
  function showNotes() {
    const r = qs[q], ch = buildChord(r.root, r.kind);
    R.pat.hidden = false;
    R.pat.innerHTML = `<span class="mu-st-k">Steps above the lowest note · 比最低音高幾個半音</span> ${ch.map((m) => `<span class="mu-sc-pg g2">+${m - ch[0]}</span>`).join('')}`;
  }
  function ask() {
    tried = false; done = false;
    R.k.innerHTML = `Question ${q + 1} of ${qs.length} · 第 ${q + 1} 題（共 ${qs.length} 題）`;
    R.opts.forEach((b) => { b.className = 'mu-cq-opt'; b.disabled = false; });
    R.next.hidden = true; R.pat.hidden = true; R.pat.textContent = '';
    R.msg.innerHTML = 'Listen to the three notes together. Is it a major triad or a minor triad?<span class="zh">聽這三個音一起響。是大三和弦還是小三和弦？</span>';
  }
  function answer(key) {
    if (done) return;
    const r = qs[q], btn = R.opts.find((x) => x.getAttribute('data-pick') === key);
    if (key === r.kind) {
      done = true; if (!tried) first++;
      btn.classList.add('is-right'); R.opts.forEach((x) => { x.disabled = true; });
      showNotes();
      const nm = buildChord(r.root, r.kind).map(midiName).join(' ');
      R.msg.innerHTML = `Yes: ${nm} is a ${names[r.kind][0].toLowerCase()} triad. The middle note is ${r.kind === 'major' ? '4' : '3'} semitones above the lowest.<span class="zh">答對了：${nm} 是${names[r.kind][1]}。中間的音比最低音高 ${r.kind === 'major' ? 4 : 3} 個半音。</span>`;
      R.score.textContent = `${first} / ${q + 1}`;
      R.next.hidden = false; R.next.textContent = q + 1 < qs.length ? 'Next question · 下一題' : 'See my score · 看成績';
    } else {
      tried = true; btn.classList.add('is-wrong'); btn.disabled = true;
      R.msg.innerHTML = 'Not that one. Listen again, or press “Show the notes”: the middle note is 4 semitones up in a major triad and 3 in a minor triad.<span class="zh">不是這個。再聽一次，或按「看音」：大三和弦的中間音高 4 個半音，小三和弦高 3 個。</span>';
    }
  }
  R.opts.forEach((b) => b.addEventListener('click', () => answer(b.getAttribute('data-pick'))));
  R.listen.addEventListener('click', listen);
  R.show.addEventListener('click', showNotes);
  R.next.addEventListener('click', () => {
    if (R.next.dataset.again) { delete R.next.dataset.again; qs = makeChordRounds(mulberry32(seed()), 6); q = 0; first = 0; R.score.textContent = '0 / 0'; ask(); return; }
    q++;
    if (q >= qs.length) {
      R.k.innerHTML = 'Finished · 完成';
      R.msg.innerHTML = `You got ${first} of ${qs.length} right on the first try.<span class="zh">你第一次就答對 ${first} 題（共 ${qs.length} 題）。</span>`;
      R.opts.forEach((x) => { x.disabled = true; });
      R.next.textContent = 'Play again · 再玩一次'; R.next.dataset.again = '1';
      return;
    }
    ask();
  });
  watchOffscreen(root);
  ask();
  root.__chordq = { round: () => ({ ...qs[q], notes: buildChord(qs[q].root, qs[q].kind) }), answer, score: () => ({ first, q }), listen };
}

function init2D() {
  const bar = document.querySelector('[data-mu-soundbar]'); if (bar) initSoundbar(bar);
  const c = document.querySelector('[data-mu-chord]'); if (c) initChord(c);
  const q = document.querySelector('[data-mu-chordq]'); if (q) initChordQ(q);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init2D);
else init2D();

lazyBoot('[data-musharmony-lab]', initLab, { demo: (lab, v) => lab.demo(v) });
