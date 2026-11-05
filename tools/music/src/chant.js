/*
 * 音樂 Music · 第十六課「梵唄是什麼？」的純函式：長音、呼吸與穩定的拍。
 * 沒有 DOM、沒有聲音，node 就能測：test/chant.test.mjs。
 *
 * 約定（出處見 CLAUDE.md「音樂」一節第十六課）：
 *   - **只講聲音與節奏**：沒有經文、沒有曲調、沒有任何道場或法師的錄音，不解釋教義；
 *   - 聲音是我們自己合成的模型：一個拉長的音（兩個音高：D4、C4，自己選的），每個樂句 8 拍，唱 6 拍、換氣 2 拍；
 *   - 木魚式的敲擊（短促、衰減快的聲音）每一拍一下，速度穩定；
 *   - 「一起換氣」：所有聲部同時換氣，聲音會有空隙；「輪流換氣」：每個聲部在不同的時間換氣，至少有一個聲部在唱，聲音不中斷；
 *   - 混音：n 個聲部每個乘 1/√n（第十一課）。
 */
export const BPM_MIN = 48;
export const BPM_MAX = 96;
export const BPM = 72;
export const PHRASE_BEATS = 8;
export const SING_BEATS = 6;
export const GAP_BEATS = PHRASE_BEATS - SING_BEATS;
export const PHRASES = [62, 62, 60];              // 每個樂句的音高（MIDI）
export const TOTAL_BEATS = PHRASE_BEATS * PHRASES.length;
export const MAX_VOICES = 4;
export const clampBpm = (b) => Math.min(BPM_MAX, Math.max(BPM_MIN, Math.round(b)));
export const beatSeconds = (bpm = BPM) => 60 / bpm;
export const voiceGain = (n) => 1 / Math.sqrt(n);
const DETUNE = [0, 6, -5, 3];

/** 聲部 v（共 n 個）在一個樂句（8 拍）裡「沒有在唱」的區間 [起點拍, 終點拍]（可能繞過樂句邊界） */
export function gapOf(mode, v, n) {
  if (mode === 'together') return [SING_BEATS, PHRASE_BEATS];
  const start = (v * PHRASE_BEATS) / n;
  return [start, start + GAP_BEATS];
}

/** 一個聲部在 0–TOTAL_BEATS 的「唱」的區間：[{ start, end, midi }]，在樂句邊界切開（換音高要重新開口） */
export function singSegments(mode, v, n) {
  const out = [];
  PHRASES.forEach((midi, p) => {
    const base = p * PHRASE_BEATS;
    const [g0, g1] = gapOf(mode, v, n);
    // 這個樂句裡，除了 [g0, g1)（取模 8）以外都在唱
    const cuts = [];
    if (g1 <= PHRASE_BEATS) cuts.push([g0, g1]); else { cuts.push([g0, PHRASE_BEATS]); cuts.push([0, g1 - PHRASE_BEATS]); }
    cuts.sort((a, b) => a[0] - b[0]);
    let cur = 0;
    cuts.forEach(([a, b]) => { if (a > cur) out.push({ start: base + cur, end: base + a, midi }); cur = Math.max(cur, b); });
    if (cur < PHRASE_BEATS) out.push({ start: base + cur, end: base + PHRASE_BEATS, midi });
  });
  return out;
}

/** 事件：{ part:'voice'|'knock', voice, midi, time, dur, gain, cents, beat } */
export function renderChant({ bpm = BPM, n = 1, mode = 'together', knock = true } = {}) {
  const bs = beatSeconds(bpm), g = voiceGain(n), ev = [];
  for (let v = 0; v < n; v++) {
    singSegments(mode, v, n).forEach((s) => ev.push({ part: 'voice', voice: v, midi: s.midi, beat: s.start, time: s.start * bs, dur: (s.end - s.start) * bs, gain: g, cents: DETUNE[v] }));
  }
  if (knock) for (let b = 0; b < TOTAL_BEATS; b++) ev.push({ part: 'knock', voice: -1, midi: 0, beat: b, time: b * bs, dur: 0.18, gain: 1, cents: 0 });
  return ev.sort((a, b) => a.time - b.time || (a.part < b.part ? -1 : 1));
}
export const totalSeconds = (bpm = BPM) => TOTAL_BEATS * beatSeconds(bpm);

/** 全曲有多少比例的時間，至少有一個聲部在唱（0–1） */
export function coverage(mode, n) {
  let covered = 0; const step = 0.01, total = TOTAL_BEATS;
  const segs = []; for (let v = 0; v < n; v++) singSegments(mode, v, n).forEach((s) => segs.push(s));
  for (let t = step / 2; t < total; t += step) if (segs.some((s) => t >= s.start && t < s.end)) covered += step;
  return covered / total;
}
/** 全曲最長的「完全沒有人在唱」的空隙有幾拍 */
export function longestSilence(mode, n) {
  const segs = []; for (let v = 0; v < n; v++) singSegments(mode, v, n).forEach((s) => segs.push(s));
  let best = 0, run = 0; const step = 0.01;
  for (let t = step / 2; t < TOTAL_BEATS; t += step) { if (segs.some((s) => t >= s.start && t < s.end)) run = 0; else { run += step; best = Math.max(best, run); } }
  return best;
}

/** 一口氣最長唱幾秒（頁面的「按住」小工具），以及相當於幾拍 */
export const BREATH_MAX = 6;
export const breathBeats = (seconds, bpm = BPM) => seconds / beatSeconds(bpm);

/** 穩定與晃動的敲擊時間（秒）：count 下，間隔 60/bpm；wobbleMs 是每一下的隨機偏移（±）。 */
export function knockTimes(bpm, count, wobbleMs, rng) {
  const bs = beatSeconds(bpm), out = [];
  for (let i = 0; i < count; i++) out.push(i * bs + (wobbleMs ? (rng() * 2 - 1) * wobbleMs / 1000 : 0));
  out[0] = 0;
  return out;
}
export function intervalsSd(times) {
  const iv = times.slice(1).map((t, i) => (t - times[i]) * 1000), m = iv.reduce((a, b) => a + b, 0) / iv.length;
  return Math.sqrt(iv.reduce((a, b) => a + (b - m) ** 2, 0) / iv.length);
}
/** 「哪一個比較穩？」六題：每題有 bpm、晃動的毫秒數、穩的是第幾個（0 或 1） */
export function makeSteadyRounds(rng, n = 6) {
  const out = [];
  for (let i = 0; i < n; i++) out.push({ bpm: [60, 72, 84][Math.floor(rng() * 3)], wobble: [45, 60, 80][Math.floor(rng() * 3)], steady: i % 3 === 0 ? (rng() < 0.5 ? 0 : 1) : (rng() < 0.5 ? 0 : 1), seed: Math.floor(rng() * 1e9) });
  if (out.every((r) => r.steady === 0) || out.every((r) => r.steady === 1)) out[0].steady = 1 - out[0].steady;
  return out;
}
