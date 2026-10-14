/*
 * 音樂 Music · 第十一課「交響樂團怎麼坐？」的純函式：四個組、座位的示意圖、各組的聲音配方、一組一組加進來的音量。
 * 沒有 DOM、沒有聲音，node 就能測：test/orchestra.test.mjs。
 *
 * 約定（出處見 CLAUDE.md「音樂」一節第十一課）：
 *   - 管弦樂團通常分四組：弦樂、木管、銅管、打擊（Wikipedia “Orchestra”）；這和第九課 Hornbostel–Sachs 的四個家族**不同**：
 *     木管與銅管都是氣鳴樂器、打擊分屬體鳴與膜鳴、鋼琴是弦鳴樂器。
 *   - 座位：弦樂在最前面、半圓形圍著指揮台；木管在弦樂後面；再後面是銅管；打擊在最後（柏林愛樂官網：依音量排，
 *     「softer strings at the front, then more powerful woodwinds, then louder brass, finally percussion at the back」，並說這是傳統、
 *     不是規定）。「美式」弦樂排法：第一小提琴、第二小提琴、中提琴、大提琴（由觀眾的左到右）；「德式」：第一小提琴與第二小提琴相對，
 *     大提琴與中提琴在中間。低音提琴在大提琴後面，可左可右。
 *   - **座位是示意圖，各樂團、各場音樂會、各指揮不同；點的數量不是真的人數。**
 */
export const SECTIONS = [
  { key: 'strings', en: 'Strings', zh: '弦樂', hs: 'chordophones', row: 0, color: 0xffd36e, ex_en: 'violin, viola, cello, double bass', ex_zh: '小提琴、中提琴、大提琴、低音提琴' },
  { key: 'woodwinds', en: 'Woodwinds', zh: '木管', hs: 'aerophones', row: 1, color: 0x7ef0e3, ex_en: 'flute, oboe, clarinet, bassoon', ex_zh: '長笛、雙簧管、單簧管、低音管' },
  { key: 'brass', en: 'Brass', zh: '銅管', hs: 'aerophones', row: 2, color: 0xff9f7a, ex_en: 'horn, trumpet, trombone, tuba', ex_zh: '法國號、小號、長號、低音號' },
  { key: 'percussion', en: 'Percussion', zh: '打擊', hs: 'membranophones and idiophones', row: 3, color: 0xb79cff, ex_en: 'timpani, snare drum, cymbals, triangle', ex_zh: '定音鼓、小鼓、鈸、三角鐵' },
];
export const sectionOf = (k) => SECTIONS.find((s) => s.key === k);
export const ROW_NAMES = [
  { en: 'at the front', zh: '在最前面' }, { en: 'behind the strings', zh: '在弦樂後面' }, { en: 'behind the woodwinds', zh: '在木管後面' }, { en: 'at the very back', zh: '在最後面' },
];

/** 弦樂的小組（觀眾看舞台，由左到右）：美式與德式 */
export const STRING_LAYOUTS = {
  american: ['violin1', 'violin2', 'viola', 'cello'],
  german: ['violin1', 'cello', 'viola', 'violin2'],
};
export const STRING_NAMES = {
  violin1: { en: 'First violins', zh: '第一小提琴' }, violin2: { en: 'Second violins', zh: '第二小提琴' }, viola: { en: 'Violas', zh: '中提琴' },
  cello: { en: 'Cellos', zh: '大提琴' }, bass: { en: 'Double basses', zh: '低音提琴' },
};
/** 半圓形座位（示意）：指揮在原點；觀眾在 +z；回傳 [{ section, sub, x, z, r, angle }]，角度由觀眾的左（負 x）到右（正 x） */
export function seatPlan(layout = 'american', dots = 4) {
  const out = [];
  const arc = (section, sub, r, a0, a1, n) => {
    for (let i = 0; i < n; i++) {
      const a = n === 1 ? (a0 + a1) / 2 : a0 + ((a1 - a0) * i) / (n - 1);
      const rad = (a * Math.PI) / 180;
      out.push({ section, sub, r, angle: a, x: r * Math.sin(rad), z: -r * Math.cos(rad) });
    }
  };
  const order = STRING_LAYOUTS[layout];
  // 弦樂：扇形，四個小組各占一段；低音提琴在大提琴後面
  const span = 150, start = -75, each = span / order.length;
  order.forEach((sub, i) => arc('strings', sub, 3.2, start + i * each + 4, start + (i + 1) * each - 4, dots));
  const ci = order.indexOf('cello');
  arc('strings', 'bass', 4.4, start + ci * each + 8, start + (ci + 1) * each - 8, Math.max(2, dots - 1));
  arc('woodwinds', 'woodwinds', 5.8, -38, 38, dots * 2);
  arc('brass', 'brass', 7.4, -42, 42, dots * 2);
  arc('percussion', 'percussion', 9.0, -34, 34, dots + 1);
  return out;
}
export const rowRadius = (section) => ({ strings: 3.2, woodwinds: 5.8, brass: 7.4, percussion: 9.0 }[section]);

// ── 聲音配方（我們自己的簡化）──────────────────────────────────────────────
/**
 * 每組同時響的音（和弦：C 大三和弦展開）。回傳 [{ kind:'complex'|'inharmonic'|'noise', freq, amps?, ratios?, env?, dur, gain, ... }]。
 * 每組最多 2 個聲音，四組同時最多 8 個（合成器的 MAX_VOICES）。
 */
export function sectionVoices(section) {
  if (section === 'strings') {
    const amps = [1, 0.5, 0.33, 0.25, 0.2, 0.16, 0.14, 0.12];
    return [{ kind: 'complex', freq: 130.81, amps, env: { attack: 0.18, decay: 1.2, sustain: 0.8 }, dur: 3.2, gain: 0.34 },
            { kind: 'complex', freq: 196.0, amps, env: { attack: 0.2, decay: 1.2, sustain: 0.8 }, dur: 3.2, gain: 0.3 }];
  }
  if (section === 'woodwinds') {
    const amps = [1, 0, 0.4, 0, 0.2, 0, 0.1];
    return [{ kind: 'complex', freq: 329.63, amps, env: { attack: 0.1, decay: 0.8, sustain: 0.85 }, dur: 3.0, gain: 0.3 },
            { kind: 'complex', freq: 392.0, amps, env: { attack: 0.12, decay: 0.8, sustain: 0.85 }, dur: 3.0, gain: 0.26 }];
  }
  if (section === 'brass') {
    // 嘴唇振動、有很多諧波、起音稍慢（我們的簡化：不是出處說的「很多諧波」）
    const amps = [1, 0.85, 0.7, 0.55, 0.42, 0.32, 0.24, 0.17, 0.12];
    return [{ kind: 'complex', freq: 196.0, amps, env: { attack: 0.12, decay: 0.9, sustain: 0.8 }, dur: 3.0, gain: 0.3 },
            { kind: 'complex', freq: 261.63, amps, env: { attack: 0.14, decay: 0.9, sustain: 0.8 }, dur: 3.0, gain: 0.26 }];
  }
  // 打擊：定音鼓（不諧波，調到 C2）＋一下鈸（噪音）
  return [{ kind: 'inharmonic', freq: 65.41, ratios: [1, 1.593, 2.135, 2.295, 2.917], amps: [1, 0.7, 0.5, 0.4, 0.3], dur: 2.0, damp: 0.7, gain: 0.55 },
          { kind: 'noise', freq: 6000, q: 0.6, type: 'highpass', dur: 1.2, gain: 0.12 }];
}
export const voiceCount = (sections) => sections.reduce((n, s) => n + sectionVoices(s).length, 0);
/** 幾組同時響時，每組的增益倍率：總量不隨組數線性增加（1/√n），並保證不超過 1 */
export const mixScale = (n) => (n <= 0 ? 0 : Math.min(1, 1 / Math.sqrt(n)));

// ── 題目：「這一組坐在第幾排？」───────────────────────────────────────────
export function makeSeatRounds(rng, n = 6) {
  const keys = SECTIONS.map((s) => s.key), out = keys.slice();
  while (out.length < n) out.push(keys[Math.floor(rng() * keys.length)]);
  for (let i = out.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [out[i], out[j]] = [out[j], out[i]]; }
  for (let i = 1; i < out.length; i++) if (out[i] === out[i - 1]) { const j = out.findIndex((k, x) => x > i && k !== out[i] && out[x - 1] !== k); if (j > 0) [out[i], out[j]] = [out[j], out[i]]; }
  return out.slice(0, n);
}
