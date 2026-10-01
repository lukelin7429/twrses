// 晶片與半導體第三課：wafercalc.js 的檢查（node test/wafer.test.mjs）
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { WAFER_D, approxDies, countDies } from '../src/wafercalc.js';

// 近似公式本身：300 mm、100 mm² → 約 640 顆
const a100 = approxDies(300, 100);
assert.ok(a100 > 635 && a100 < 645, `公式 10×10：${a100}`);

// 實際排方格，和公式差不到一成（中等大小的晶片）
for (const s of [5, 8, 10, 15, 20]) {
  const r = countDies(s);
  assert.ok(Math.abs(r.full / r.approx - 1) < 0.1, `${s} mm：排出 ${r.full}，公式 ${r.approx.toFixed(0)}`);
}
// 晶片越大，顆數越少、邊緣浪費的比例越高
const sizes = [5, 10, 20, 30];   // 2 mm 太小時切割道本身就吃掉一成，所以從 5 mm 比
const rs = sizes.map((s) => countDies(s));
for (let i = 1; i < rs.length; i++) {
  assert.ok(rs[i].full < rs[i - 1].full, '越大越少');
  assert.ok(rs[i].used < rs[i - 1].used, `越大浪費越多（${sizes[i]} mm 用掉 ${(rs[i].used * 100).toFixed(1)}%）`);
}
// 完整晶片都在可用圓內，碰到晶圓的都列出來
const r10 = countDies(10);
for (const d of r10.dies) {
  const far = Math.max(d.x ** 2, (d.x + 10) ** 2) + Math.max(d.y ** 2, (d.y + 10) ** 2);
  if (d.full) assert.ok(far <= 147 ** 2 + 1e-9, '完整晶片在可用範圍內');
}
assert.equal(r10.dies.filter((d) => d.full).length, r10.full);
assert.ok(r10.partial > 0, '邊緣一定有不完整的');
// 最大曝光範圍 26 × 33 mm 的大晶片：一片只剩幾十顆
const big = countDies(26, 33);
assert.ok(big.full >= 50 && big.full <= 70, `26×33：${big.full}`);
// 小感測器晶片 2 mm：上萬顆
assert.ok(countDies(2).full > 15000, '2 mm：超過一萬五千顆');
assert.equal(WAFER_D, 300);

// 頁面資料：預設的晶片大小都要能算
const data = JSON.parse(readFileSync(new URL('../../../data/semiconductors.json', import.meta.url), 'utf8'));
const lesson = data.units[1].lessons.find((l) => l.n === 3);
for (const p of lesson.dies.presets) {
  const r = countDies(p.w, p.h);
  assert.ok(r.full > 0, `${p.key}`);
}
console.log('wafer.test.mjs ✓ 全部通過', Object.fromEntries([2, 5, 10, 20].map((s) => [s, countDies(s).full])), { big: big.full, a100: a100.toFixed(0) });
