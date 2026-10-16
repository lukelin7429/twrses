/*
 * 音樂 Music · 第十五課「台灣這塊土地上有哪些音樂？」的純函式：同一段旋律，聲部可以用不同的方式「疊」在一起。
 * 沒有 DOM、沒有聲音，node 就能測：test/layers.test.mjs。
 *
 * 約定（出處見 CLAUDE.md「音樂」一節第十五課）：
 *   - 旋律是我們自己寫的（16 拍、C 大調五聲音階的音，終於 E），**不是任何族群、任何樂種的曲調**；
 *   - 四種疊法只是「怎麼疊」的示範，不代表任何一個族群或樂種；頁面的文化卡只寫有出處的描述，不放真實的曲調。
 *   - unison 齊唱＝所有聲部同一個音（加上微小的音準與時間差，像真人）；round 輪唱＝同一條旋律，每個聲部晚 4 拍進來；
 *     drone 持續音＝旋律底下一個一直拉長的音（C）；parts 分部＝其他聲部跟著旋律平行移動（音階裡的三度、五度、八度以下）。
 *   - 混音：n 個聲部，每個聲部音量乘 1/√n（第十一課），所以總能量不隨聲部數增加。
 */
export const MELODY_MIDI = [60, 64, 69, 69, 72, 69, 64, 69, 67, 64, 69, 72, 67, 72, 69, 64];   // 每個音一拍
export const BEATS = 16;
export const BPM = 96;
export const beatSeconds = (bpm = BPM) => 60 / bpm;
export const MAX_VOICES = 4;
export const MODES = [
  { key: 'unison', en: 'Unison', zh: '齊唱' },
  { key: 'round', en: 'Round', zh: '輪唱' },
  { key: 'drone', en: 'Drone', zh: '持續音' },
  { key: 'parts', en: 'Parts', zh: '分部' },
];
export const modeOf = (k) => MODES.find((m) => m.key === k);
export const voiceGain = (n) => 1 / Math.sqrt(n);
export const ROUND_OFFSET = 4;                       // 拍
const DEGREES = [60, 62, 64, 65, 67, 69, 71, 72];    // C 大調的音（C4–C5）
/** 旋律的音往下數 k 個音階音（在 C 大調裡平行移動） */
export function scaleStepDown(midi, k) {
  const all = []; for (let o = -2; o <= 1; o++) DEGREES.slice(0, 7).forEach((m) => all.push(m + 12 * o));
  all.sort((a, b) => a - b);
  const i = all.indexOf(midi);
  return all[i - k];
}
const DETUNE = [0, 7, -6, 3];          // 音分
const JITTER = [0, 0.012, 0.006, 0.018]; // 秒

/** 把相鄰且音高相同的音併成一個長音：[midi, 起點拍, 長度拍] */
export function melodyNotes() {
  const out = [];
  MELODY_MIDI.forEach((m, i) => {
    const last = out[out.length - 1];
    if (last && last[0] === m && last[1] + last[2] === i) last[2]++; else out.push([m, i, 1]);
  });
  return out;
}

/** 一個疊法與聲部數 → 事件：{ voice, midi, time, dur, gain, cents, beat } 時間為秒 */
export function renderLayers(mode, n = 1, { bpm = BPM, passes = 1 } = {}) {
  const bs = beatSeconds(bpm), g = voiceGain(n), ev = [];
  const push = (voice, midi, beat, len, cents = 0, jitter = 0) => ev.push({ voice, midi, beat, time: beat * bs + jitter, dur: len * bs, gain: g, cents });
  const nl = melodyNotes();
  for (let v = 0; v < n; v++) {
    const reps = mode === 'round' ? 2 : passes;
    const start = mode === 'round' ? v * ROUND_OFFSET : 0;
    for (let p = 0; p < reps; p++) {
      nl.forEach(([m, b, l]) => {
        let midi = m;
        if (mode === 'parts') midi = v === 0 ? m : v === 1 ? scaleStepDown(m, 2) : v === 2 ? scaleStepDown(m, 4) : m - 12;
        if (mode === 'drone' && v > 0) return;
        push(v, midi, start + p * BEATS + b, l, mode === 'unison' ? DETUNE[v] : 0, mode === 'unison' ? JITTER[v] : 0);
      });
    }
    void v;
  }
  if (mode === 'drone') {
    // 持續音：第 1 個聲部唱旋律；其餘的聲部（最多 n−1 個）拉長音 C：C3、G…只用 C（八度）
    const tones = [48, 36, 48].slice(0, Math.max(0, n - 1));
    tones.forEach((m, i) => ev.push({ voice: i + 1, midi: m, beat: 0, time: 0, dur: BEATS * bs, gain: g * 0.9, cents: 0, drone: true }));
  }
  return ev.sort((a, b) => a.time - b.time || a.voice - b.voice);
}
export const totalBeats = (mode, n) => (mode === 'round' ? ROUND_OFFSET * (n - 1) + 2 * BEATS : BEATS);
export const totalSeconds = (mode, n, bpm = BPM) => totalBeats(mode, n) * beatSeconds(bpm);

/** 同一個時刻同時在響的聲部，音高相差幾個半音（pitch class），用來檢查疊起來不會很刺耳 */
export function simultaneousIntervals(mode, n) {
  const ev = renderLayers(mode, n).filter((e) => !e.drone), out = [];
  const bs = beatSeconds();
  for (let b = 0; b < totalBeats(mode, n); b += 1) {
    const t = b * bs + 0.001;
    const now = ev.filter((e) => e.time - 0.05 <= t && t < e.time + e.dur - 0.05);
    for (let i = 0; i < now.length; i++) for (let j = i + 1; j < now.length; j++) out.push(((now[i].midi - now[j].midi) % 12 + 12) % 12);
  }
  return out;
}

/** 題目：每題一個疊法與聲部數（至少 2，才聽得出疊法） */
export function makeLayerRounds(rng, n = 6) {
  const keys = MODES.map((m) => m.key), out = keys.map((k) => ({ mode: k, n: 2 + Math.floor(rng() * 3) }));
  while (out.length < n) out.push({ mode: keys[Math.floor(rng() * keys.length)], n: 2 + Math.floor(rng() * 3) });
  for (let i = out.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [out[i], out[j]] = [out[j], out[i]]; }
  for (let i = 1; i < out.length; i++) if (out[i].mode === out[i - 1].mode) { const j = out.findIndex((q, x) => x > i && q.mode !== out[i].mode && out[x - 1].mode !== q.mode); if (j > 0) [out[i], out[j]] = [out[j], out[i]]; }
  return out.slice(0, n);
}
