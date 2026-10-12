/*
 * 音樂 Music · 第十課「鋼琴裡面發生了什麼？」的純函式：88 鍵、擊弦機的一次動作、力度、泛音的亮度、鋼琴弦的不諧波與八度拉寬。
 * 沒有 DOM、沒有聲音，node 就能測：test/piano.test.mjs。
 *
 * 約定（出處見 CLAUDE.md「音樂」一節第十課）：
 *   - 88 鍵＝52 白鍵＋36 黑鍵，A0（MIDI 21）到 C8（108）（Wikipedia “Piano”）。
 *   - 一次擊弦的階段（KTH 的 Askenfelt & Jansson 用 rest、acceleration、let-off、check）：琴鍵下壓、擊弦機加速槌子；
 *     在槌子碰到弦之前，傳動桿（jack）被「脫離」（let-off），槌子自由飛向弦；碰弦幾毫秒後彈回，被止音塊（back check）接住；
 *     放開琴鍵，制音器落回弦上（沒踩踏板時）。畫面是放慢的示意，零件與動作是簡化的。
 *   - 力度：從 pp 到 ff，槌子速度大約差一百倍（Wikipedia “Piano”）；碰弦的時間從 pp 的 4 毫秒縮短到 ff 的不到 2 毫秒；
 *     碰得越短，高頻泛音越多（KTH “Striking contact”）——所以彈得用力，不只大聲，也比較亮。
 *   - 不諧波：f_n ＝ n·f0·√(1 + B·n²)（B 是不諧波係數，由弦的長度、直徑、張力與材料決定；Hinrichsen 論文，Wikipedia “Piano acoustics” 引用）。
 *     調音師把八度拉寬：上面的音對準下面的音的第二個泛音。
 */
import { midiToFreq } from './pitch.js';

export const LOW = 21, HIGH = 108;
const BLACK_PC = [1, 3, 6, 8, 10];
export const isBlackKey = (m) => BLACK_PC.includes(((m % 12) + 12) % 12);
export const KEYS = Array.from({ length: HIGH - LOW + 1 }, (_, i) => LOW + i);
export const keyCounts = () => ({ total: KEYS.length, white: KEYS.filter((m) => !isBlackKey(m)).length, black: KEYS.filter(isBlackKey).length });
export const keyFreq = (m) => midiToFreq(m);

// ── 力度 ────────────────────────────────────────────────────────────────
/** 按鍵力度 v（0＝pp、1＝ff）→ 槌子速度（相對 ff＝1；pp 約是 ff 的 1/100） */
export const hammerSpeed = (v) => 100 ** (clamp01(v) - 1);
/** 槌子碰弦的時間（毫秒）：pp 約 4、ff 不到 2 */
export const contactMs = (v) => 4 - 2.2 * clamp01(v);
export const clamp01 = (x) => Math.max(0, Math.min(1, x));
/** 第 k 泛音的相對振幅：弦被敲的位置 d（占弦長的比例）會讓節點在敲擊處的泛音變小；力度越大，高泛音衰減越慢（越亮） */
export function toneAmps(v, n = 10, d = 1 / 8) {
  const p = 2.2 - 1.4 * clamp01(v);       // 泛音振幅 ∝ k^(−p)
  const raw = Array.from({ length: n }, (_, i) => { const k = i + 1; return Math.abs(Math.sin(k * Math.PI * d)) * k ** -p; });
  const max = Math.max(...raw);
  return raw.map((a) => a / max);
}
/** 「亮度」：第 3 到第 8 泛音的振幅總和 ÷ 基音振幅 */
export const brightness = (v, d = 1 / 8) => { const a = toneAmps(v, 10, d); return a.slice(2, 8).reduce((s, x) => s + x, 0) / a[0]; };

// ── 不諧波與八度拉寬 ─────────────────────────────────────────────────────
export const partialFreq = (f0, n, B) => n * f0 * Math.sqrt(1 + B * n * n);
export const partialRatios = (B, n = 8) => Array.from({ length: n }, (_, i) => partialFreq(1, i + 1, B));
/** 第 n 泛音比「n 倍基頻」高幾音分 */
export const sharpCents = (n, B) => 1200 * Math.log2(Math.sqrt(1 + B * n * n));
/** 八度要拉寬幾音分：上面的音對準下面的音的第二個泛音 */
export const octaveStretchCents = (B) => sharpCents(2, B);

// ── 一次擊弦的動作（放慢的示意）──────────────────────────────────────────
const ease = (x) => { const t = clamp01(x); return t * t * (3 - 2 * t); };
export const STAGES = ['rest', 'acceleration', 'free flight', 'contact', 'rebound', 'check', 'release'];
/** 琴鍵下壓所花的時間（秒，放慢後）：力度越大越快 */
export const keyTime = (v) => 0.5 - 0.36 * clamp01(v);
const HAMMER_LET_OFF = 0.88;      // 脫離時槌子走完全程的比例
const HAMMER_CHECK = 0.4;         // 被止音塊接住的位置
/**
 * 在時間 t（秒，從按下去算）、力度 v、放開琴鍵的時間 tRel（秒；Infinity＝一直按著）、踏板 pedal 的狀態：
 *   { key（0 放開–1 到底）, hammer（0 靜止–1 在弦上）, damper（0 落在弦上–1 抬起）, jackFree（傳動桿是否已脫離）, contact（槌子在弦上）, stage }
 */
export function actionPose(t, v, tRel = Infinity, pedal = false) {
  const Tk = keyTime(v), Tflight = 0.07 + 0.2 * (1 - clamp01(v));          // 脫離到碰弦
  const tLet = Tk * 0.78, tContact = tLet + Tflight, tContactEnd = tContact + 0.05, tReb = tContactEnd + 0.18;
  let key, hammer, jackFree = false, contact = false, stage;
  if (t < 0) { return { key: 0, hammer: 0, damper: 0, jackFree: false, contact: false, stage: 'rest', times: { tLet, tContact } }; }
  // 琴鍵
  const down = ease(t / Tk);
  const up = Number.isFinite(tRel) && t > tRel ? ease((t - tRel) / 0.25) : 0;
  key = Math.max(0, down - up);
  // 槌子
  const hLet = HAMMER_LET_OFF;
  if (t < tLet) { hammer = (t / tLet) ** 1.6 * hLet; stage = 'acceleration'; }
  else if (t < tContact) { jackFree = true; hammer = hLet + (1 - hLet) * ((t - tLet) / Tflight); stage = 'free flight'; }
  else if (t < tContactEnd) { jackFree = true; hammer = 1; contact = true; stage = 'contact'; }
  else if (t < tReb) { jackFree = true; hammer = 1 - (1 - HAMMER_CHECK) * ease((t - tContactEnd) / (tReb - tContactEnd)); stage = 'rebound'; }
  else { jackFree = true; hammer = HAMMER_CHECK; stage = 'check'; }
  if (Number.isFinite(tRel) && t > tRel) {                                  // 放開琴鍵：槌子回到靜止，傳動桿復位
    const r = ease((t - tRel) / 0.3);
    hammer = Math.min(hammer, HAMMER_CHECK * (1 - r) + 0 * r);
    if (r >= 1) { jackFree = false; stage = 'release'; }
  }
  // 制音器：按下去不久就抬起（比槌子早）；放開後落回弦（踏板踩著就不落）
  let damper = Math.min(1, ease(t / (Tk * 0.5)));
  if (Number.isFinite(tRel) && t > tRel && !pedal) damper = Math.min(damper, 1 - ease((t - tRel) / 0.12));
  return { key, hammer, damper, jackFree, contact, stage, times: { tLet, tContact } };
}
/** 聲音停下來的時間：沒踩踏板時是放開琴鍵、制音器落回弦的那一刻 */
export const silenceTime = (tRel, pedal) => (pedal ? Infinity : tRel + 0.12);

// ── 「這個零件做什麼？」───────────────────────────────────────────────────
export const PARTS = [
  { key: 'key', en: 'Key', zh: '琴鍵', fn_en: 'The lever you press with your finger.', fn_zh: '用手指按下去的槓桿。' },
  { key: 'hammer', en: 'Hammer', zh: '琴槌', fn_en: 'A felt-covered head that strikes the string.', fn_zh: '包著毛氈的槌頭，去敲弦。' },
  { key: 'damper', en: 'Damper', zh: '制音器', fn_en: 'A felt block that rests on the string and stops it from vibrating.', fn_zh: '一塊毛氈，平常壓在弦上，讓弦不能振動。' },
  { key: 'string', en: 'String', zh: '弦', fn_en: 'The steel wire that vibrates when the hammer hits it.', fn_zh: '被槌子敲到就會振動的鋼絲。' },
  { key: 'soundboard', en: 'Soundboard', zh: '共鳴板', fn_en: 'A large wooden board that moves a lot of air, so the sound can be heard.', fn_zh: '一大塊木板，推動很多空氣，聲音才聽得見。' },
];
export const partOf = (k) => PARTS.find((p) => p.key === k);
export function makePartRounds(rng, n = 6) {
  const keys = PARTS.map((p) => p.key), out = keys.slice();
  while (out.length < n) out.push(keys[Math.floor(rng() * keys.length)]);
  for (let i = out.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [out[i], out[j]] = [out[j], out[i]]; }
  for (let i = 1; i < out.length; i++) if (out[i] === out[i - 1]) { const j = out.findIndex((k, x) => x > i && k !== out[i] && out[x - 1] !== k); if (j > 0) [out[i], out[j]] = [out[j], out[i]]; }
  return out.slice(0, n);
}
