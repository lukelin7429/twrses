/*
 * 體育 Sports and Movement · 「哪一個姿勢最穩？」的題目與計分（純函式；test/body.test.mjs 檢查每一題的答案都夠明確）。
 *
 *   QUESTIONS            八題：{ poses: [姿勢 key…], dir: 'any'｜'side'｜'front', view: 'front'｜'side' }
 *   stabilityFor(k, dir) 這個姿勢往 dir 歪幾度會倒（any＝最弱的方向；side＝左右取小的；front＝前後取小的）
 *   answer(q)            { best: key, scores: { key: 度 } }
 */
import { analyze, pose } from './body.js';
import { tipAny } from './balance.js';

export const QUESTIONS = [
  { poses: ['together', 'apart'], dir: 'side', view: 'front',
    why_en: 'Moving the feet apart makes the base of support wider from side to side, so the center of gravity has farther to go before it passes the edge.',
    why_zh: '把腳張開，支撐底面往左右變寬，重心要移動更遠才會越過邊緣。' },
  { poses: ['apart', 'oneLeg', 'tiptoe'], dir: 'any', view: 'front',
    why_en: 'Two flat feet make a much bigger base than one foot, or than the front part of two feet.',
    why_zh: '兩隻腳平踩在地上，支撐底面比單腳、或只剩前腳掌都大得多。' },
  { poses: ['wide', 'horse'], dir: 'any', view: 'front',
    why_en: 'The feet are in the same places, so the base is almost the same. Bending the knees lowers the center of gravity, and a lower body has to lean farther before it tips.',
    why_zh: '兩個姿勢腳的位置一樣，所以支撐底面幾乎一樣大。彎膝蓋讓重心降低，身體要歪更多才會倒。' },
  { poses: ['apart', 'stride'], dir: 'front', view: 'side',
    why_en: 'A base is only long in the direction the feet are spread. With one foot in front, the base is long from front to back.',
    why_zh: '腳往哪個方向張開，支撐底面就往哪個方向變長。一腳在前、一腳在後，底面前後就變長了。' },
  { poses: ['stride', 'apart', 'tandem'], dir: 'side', view: 'front',
    why_en: 'Seen from the front, the two poses with one foot in front of the other have a base only about as wide as one foot.',
    why_zh: '從正面看，一腳在前、一腳在後的兩個姿勢，支撐底面大約只有一隻腳那麼寬。' },
  { poses: ['oneLegArms', 'together'], dir: 'any', view: 'front',
    why_en: 'Holding the arms out does not make the base any bigger. It helps in a different way: you can move your arms to shift your center of gravity back over your foot.',
    why_zh: '張開雙臂並不會讓支撐底面變大。它的幫助是另一種：你可以動手臂，把重心移回腳的上方。' },
  { poses: ['together', 'ready', 'tiptoe'], dir: 'any', view: 'front',
    why_en: 'Feet apart and knees bent: a wide base and a low center of gravity together. Many sports start from a stance like this.',
    why_zh: '腳張開、膝蓋彎：寬的底面加上低的重心。很多運動的預備姿勢都長這樣。' },
  { poses: ['apart', 'horse', 'crouch'], dir: 'front', view: 'side',
    why_en: 'From front to back, all three bases are about one foot long. The lowest center of gravity wins.',
    why_zh: '這三個姿勢的支撐底面，前後都大約是一隻腳的長度。重心最低的那一個最穩。' },
];

const memo = {};
export function stabilityFor(key, dir) {
  const id = `${key}|${dir}`;
  if (memo[id] === undefined) {
    const A = analyze(pose(key));
    memo[id] = dir === 'side' ? Math.min(A.tips.left, A.tips.right)
      : dir === 'front' ? Math.min(A.tips.front, A.tips.back)
      : tipAny(A.base, A.com).deg;
  }
  return memo[id];
}

export function answer(q) {
  const scores = {};
  let best = q.poses[0];
  for (const k of q.poses) { scores[k] = stabilityFor(k, q.dir); if (scores[k] > scores[best]) best = k; }
  return { best, scores };
}
