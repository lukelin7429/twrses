// 檢查第十五課的純函式（src/pencil.js）：node test/pencil.test.mjs
// 課文說的事要成立：毛筆和鉛筆走同一條中心線（筆畫數、筆順、長度都一樣）；把粗細拿掉以後線寬處處相同；毛筆最粗的地方至少是最細的兩倍。
// 「哪一筆寫歪了？」的每一題都要看得出來（至少偏 80）、而且還在格子裡。
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { prepStroke, stamps } from '../src/brush.js';
import { KINDS, PENCIL_W, alter, candidates, centerline, deviation, lineLength, pathLength, slimStamps, widthRange } from '../src/pencil.js';

const load = (k) => JSON.parse(readFileSync(new URL(`../src/strokes/${k}.json`, import.meta.url)));
const LAB = ['yong', 'xin', 'chun'], GAME = ['yong', 'shan', 'shi', 'san', 'ren', 'xin', 'shui', 'chun', 'ri', 'yue', 'zhi', 'xiao'];
for (const k of LAB) {
  const c = load(k);
  assert.equal(c.strokes.length, c.count, `${k}：筆畫數和資料一致`);
  c.strokes.forEach((st, i) => {
    const line = centerline(st), s = prepStroke(st);
    assert.equal(line.length, s.length);
    assert.ok(line.every((q, j) => q.x === s[j].x && q.y === s[j].y), `${k} 第 ${i + 1} 筆：鉛筆走的就是毛筆的中心線`);
    assert.ok(Math.abs(lineLength(line) - s[s.length - 1].s) < 1e-6);
    const sts = stamps(s), r = widthRange(sts);
    assert.ok(r.max > r.min, `${k} 第 ${i + 1} 筆：毛筆有粗細`);
    const thin = slimStamps(sts, 0), full = slimStamps(sts, 1);
    assert.ok(thin.every((q) => q.hw === PENCIL_W / 2 && q.len === PENCIL_W / 2), '粗細拿掉以後處處一樣');
    assert.ok(thin.every((q, j) => q.x === sts[j].x && q.y === sts[j].y), '位置不動');
    assert.ok(full.every((q, j) => Math.abs(q.hw - sts[j].hw) < 1e-9));
    assert.equal(widthRange(thin).ratio, 1);
  });
  const all = c.strokes.flatMap((st) => stamps(prepStroke(st)));
  assert.ok(widthRange(all).ratio > 2, `${k}：毛筆最粗至少是最細的 2 倍（實際 ${widthRange(all).ratio.toFixed(1)}）`);
  console.log(k, c.strokes.length, '筆', Math.round(pathLength(c)), widthRange(all).min.toFixed(0), widthRange(all).max.toFixed(0), widthRange(all).ratio.toFixed(2));
  assert.ok(pathLength(c) > 800);
}
assert.deepEqual(KINDS, ['short', 'long', 'shift', 'tilt']);
const line = centerline(load('shi').strokes[0]);
assert.ok(lineLength(alter(line, 'short')) < lineLength(line) * 0.6);
assert.ok(lineLength(alter(line, 'long')) > lineLength(line) * 1.4);
assert.ok(Math.abs(lineLength(alter(line, 'tilt')) - lineLength(line)) < 1e-6, '斜掉：長度不變');
assert.ok(Math.abs(deviation(line, alter(line, 'shift')) - 95) < 1e-6, '平移 95');
let total = 0;
for (const k of GAME) {
  const c = load(k), cs = candidates(c);
  assert.ok(cs.length >= 2, `${k}：至少兩種出題法（實際 ${cs.length}）`);
  for (const q of cs) {
    const base = centerline(c.strokes[q.i]);
    assert.ok(deviation(base, q.pts) >= 80, `${k} 第 ${q.i + 1} 筆 ${q.kind}：看得出來`);
    assert.ok(q.pts.every((p) => p.x >= 50 && p.x <= 950 && p.y >= 50 && p.y <= 950), `${k} 第 ${q.i + 1} 筆 ${q.kind}：還在格子裡`);
  }
  total += cs.length;
}
assert.ok(total >= 60, `題庫夠大（${total}）`);
console.log(`pencil ok（題庫 ${total} 題）`);
