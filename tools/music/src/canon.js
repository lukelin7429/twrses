/*
 * 音樂 Music · 第十八課「巴哈為什麼重要？」的純函式：一條旋律自己追自己（卡農／輪唱），與「同時唱同一條」「唱不同的旋律」的對比。
 * 沒有 DOM、沒有聲音，node 就能測：test/canon.test.mjs。
 *
 * 約定（出處見 CLAUDE.md「音樂」一節第十八課）：
 *   - **沒有任何巴哈或現成的旋律**。旋律是我們自己寫的 16 拍、C 大調：偶數拍都是 C、E、G，奇數拍都是 D、F、A；
 *     所以「錯開偶數拍」時，疊在一起的音永遠落在同一組和弦音裡，不會有半音、三全音或大七度。
 *     錯開奇數拍就不保證，所以滑桿只開放 2、4、6、8 拍。
 *   - mode：'canon' 每個聲部唱同一條旋律，晚 offset 拍進來（每個聲部唱兩遍）；'unison' 全部同時唱同一條；
 *     'different' 兩個聲部唱不同的旋律（第二條 OTHER 是另外搜尋出來、和第一條同時響也不刺耳的）。
 *   - 混音：n 個聲部每個乘 1/√n（第十一課）。
 */
export const MELODY = [60, 62, 64, 65, 67, 69, 67, 65, 64, 62, 64, 65, 67, 65, 64, 62];   // 每個音一拍
export const OTHER = [57, 55, 59, 57, 52, 50, 52, 57, 57, 59, 57, 60, 59, 60, 57, 59];     // 另一條旋律（和 MELODY 同時響、都是三度、四度、五度、六度）
export const BEATS = 16;
export const BPM = 88;
export const beatSeconds = (bpm = BPM) => 60 / bpm;
export const OFFSETS = [2, 4, 6, 8];
export const MAX_VOICES = 4;
export const voiceGain = (n) => 1 / Math.sqrt(n);
export const MODES = [
  { key: 'canon', en: 'Canon (chasing)', zh: '卡農（追趕）' },
  { key: 'unison', en: 'Together', zh: '一起唱同一條' },
  { key: 'different', en: 'Different tunes', zh: '各唱不同的旋律' },
];
export const modeOf = (k) => MODES.find((m) => m.key === k);
const OCT = [0, -12, 0, -12];

/** 事件：{ voice, midi, beat, time, dur, gain }。canon：n 個聲部、offset 拍；unison：n 個聲部；different：固定 2 個聲部 */
export function renderCanon(mode, n = 2, offset = 4, { bpm = BPM } = {}) {
  const bs = beatSeconds(bpm), ev = [];
  const count = mode === 'different' ? 2 : n, g = voiceGain(count);
  for (let v = 0; v < count; v++) {
    const tune = mode === 'different' && v === 1 ? OTHER : MELODY;
    const start = mode === 'canon' ? v * offset : 0, reps = mode === 'canon' ? 2 : 1;
    for (let p = 0; p < reps; p++) for (let i = 0; i < BEATS; i++) {
      const beat = start + p * BEATS + i;
      ev.push({ voice: v, midi: tune[i] + (mode === 'different' ? 0 : OCT[v]), beat, time: beat * bs, dur: bs * 0.95, gain: g });
    }
  }
  return ev.sort((a, b) => a.time - b.time || a.voice - b.voice);
}
export const totalBeats = (mode, n = 2, offset = 4) => (mode === 'canon' ? offset * (n - 1) + 2 * BEATS : BEATS);
export const totalSeconds = (mode, n, offset, bpm = BPM) => totalBeats(mode, n, offset) * beatSeconds(bpm);
/** 每個聲部第一次出聲的拍 */
export function entryBeats(mode, n, offset) {
  const ev = renderCanon(mode, n, offset), out = [];
  for (let v = 0; v < (mode === 'different' ? 2 : n); v++) out.push(Math.min(...ev.filter((e) => e.voice === v).map((e) => e.beat)));
  return out;
}
/** 同一個時刻同時在響的聲部，音高相差幾個半音（pitch class） */
export function simultaneousIntervals(mode, n, offset) {
  const ev = renderCanon(mode, n, offset), out = [], tb = totalBeats(mode, n, offset);
  for (let b = 0; b < tb; b++) {
    const now = ev.filter((e) => e.beat === b);
    for (let i = 0; i < now.length; i++) for (let j = i + 1; j < now.length; j++) out.push(((now[i].midi - now[j].midi) % 12 + 12) % 12);
  }
  return out;
}
/** 題目：三種各兩次，相鄰不同；canon 的聲部數與錯開拍數隨機（只用 OFFSETS） */
export function makeCanonRounds(rng, n = 6) {
  const keys = MODES.map((m) => m.key);
  for (let tries = 0; tries < 200; tries++) {
    const modes = keys.concat(keys);
    for (let i = modes.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [modes[i], modes[j]] = [modes[j], modes[i]]; }
    if (modes.every((k, i) => i === 0 || k !== modes[i - 1])) return modes.slice(0, n).map((mode) => ({ mode, n: 2 + Math.floor(rng() * 3), offset: OFFSETS[Math.floor(rng() * OFFSETS.length)] }));
  }
  return keys.concat(keys).slice(0, n).map((mode) => ({ mode, n: 2, offset: 4 }));
}
