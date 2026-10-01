// 晶片與半導體第一課：chipcalc.js 的檢查（node test/doping.test.mjs）
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  RHO, SI_ATOMS, atomsPerFreeCarrier, carriers, dopantsFromRatio, fmtBig, homeChips, ladderPos, ledLevel,
  mobility, oneInFromSlider, siConductivity, siResistivity, timesBetter,
} from '../src/chipcalc.js';

const near = (got, want, tol, msg) => assert.ok(Math.abs(got / want - 1) <= tol, `${msg}: ${got} vs ${want}`);

// 純矽：Ioffe 表列本質電阻率 3.2 × 10⁵ Ω·cm、遷移率上限 1400／450
near(siResistivity('pure'), 3.2e5, 0.1, '純矽電阻率');
const mu0 = mobility(0);
assert.ok(mu0.n > 1350 && mu0.n < 1450 && mu0.p > 440 && mu0.p < 480, '純矽遷移率');
assert.ok(mobility(1e18).n < mobility(1e15).n, '摻越多，遷移率越低');

// 摻雜 10¹⁶ cm⁻³：Irvin／NIST 曲線約 N 型 0.5、P 型 1.4 Ω·cm
near(siResistivity('n', 1e16), 0.5, 0.15, 'N 型 1e16');
near(siResistivity('p', 1e16), 1.4, 0.15, 'P 型 1e16');
near(siResistivity('n', 1e15), 4.5, 0.15, 'N 型 1e15');

// 電中性與 n·p = ni²
const c = carriers('n', 1e16);
near(c.n, 1e16, 1e-6, 'N 型多數載子＝摻雜量'); near(c.n * c.p, 1e20, 1e-6, 'n·p = ni²');
const cp = carriers('p', 1e16);
near(cp.p, 1e16, 1e-6, 'P 型多數載子＝摻雜量');

// 課文：每 100 萬個矽原子換 1 個磷，導電好 100 萬倍以上
const N6 = dopantsFromRatio(1e6);
near(N6, 5e16, 1e-9, '1/1,000,000 → 5e16');
assert.ok(timesBetter('n', N6) > 1e6, `一百萬分之一的磷 → 超過一百萬倍（${timesBetter('n', N6)}）`);
assert.ok(timesBetter('p', N6) > 5e5, '一百萬分之一的硼也好幾十萬倍');
assert.ok(timesBetter('n', N6) > timesBetter('p', N6), '同樣的量，N 型比 P 型好（電子跑得比電洞快）');

// 課文：銅的導電比純矽好一千億倍以上（Wikipedia 表：1.68e-8 vs 2.3e3 Ω·m → 1.4e11；Ioffe 3.2e3 → 1.9e11）
assert.ok(2.3e3 / 1.68e-8 > 1e11 && siResistivity('pure') / RHO.copper > 1e11, '銅 vs 純矽 > 1,000 億倍');
// 順序：銅 > 摻雜矽 > 純矽 > 玻璃
const order = [1 / RHO.copper, siConductivity('n', N6), siConductivity('pure'), 1 / RHO.glass];
for (let i = 0; i < 3; i++) assert.ok(order[i] > order[i + 1], `導電順序 ${i}`);
assert.ok(ladderPos(order[0]) > ladderPos(order[1]) && ladderPos(order[2]) > ladderPos(order[3]), '刻度位置同順序');
assert.ok(ladderPos(1 / RHO.glass) >= 0 && ladderPos(1 / RHO.copper) <= 1, '刻度範圍包住玻璃與銅');

// 導電測試器：銅、摻雜矽亮；純矽、玻璃不亮
assert.equal(ledLevel(RHO.copper), 1);
assert.ok(ledLevel(siResistivity('n', N6)) > 0.95, '一百萬分之一的磷：LED 亮');
assert.equal(ledLevel(siResistivity('pure')), 0, '純矽：LED 不亮');
assert.equal(ledLevel(RHO.glass), 0, '玻璃：LED 不亮');
const dim = ledLevel(siResistivity('n', dopantsFromRatio(1e10)));
assert.ok(dim > 0.02 && dim < 0.3, `百億分之一：微亮（${dim}）`);

// 滑桿：0 → 1/10¹¹、50 → 1/10⁶、70 → 1/10⁴
near(oneInFromSlider(0), 1e11, 1e-9, '滑桿 0'); near(oneInFromSlider(50), 1e6, 1e-9, '滑桿 50'); near(oneInFromSlider(70), 1e4, 1e-9, '滑桿 70');
// 每幾個原子一個自由電子：純矽 5 兆、摻雜時＝摻雜比例
near(atomsPerFreeCarrier('pure'), 5e12, 1e-9, '純矽：每 5 兆個原子 1 個自由電子');
near(atomsPerFreeCarrier('n', N6), 1e6, 1e-6, 'N 型＝1/1,000,000');

// 格式
assert.deepEqual(fmtBig(2.35e6), { en: '2.4 million', zh: '240 萬' });
assert.deepEqual(fmtBig(2.5e12), { en: '2.5 trillion', zh: '2.5 兆' });
assert.deepEqual(fmtBig(1e6), { en: '1 million', zh: '100 萬' });
assert.deepEqual(fmtBig(3700), { en: '3,700', zh: '3,700' });
for (let v = 0; v <= 70; v++) { const f = fmtBig(oneInFromSlider(v)); assert.ok(!/^1000 |^10,000 million/.test(f.en) && !/^10,000 萬/.test(f.zh), `滑桿 ${v}：${f.en} / ${f.zh}`); }
assert.equal(fmtBig(oneInFromSlider(20)).en, '1 billion');

// 家裡的晶片：頁面資料（data/semiconductors.json）
const data = JSON.parse(readFileSync(new URL('../../../data/semiconductors.json', import.meta.url), 'utf8'));
const lesson = data.units[0].lessons[0];
const home = lesson.home;
const keys = new Set();
for (const it of home.items) {
  assert.ok(!keys.has(it.key), `重複的 key ${it.key}`); keys.add(it.key);
  assert.ok(Number.isInteger(it.n) && it.n >= 1, `${it.key} 的數量`);
  assert.ok(it.est === 'source' || it.est === 'guess' || it.est === 'min', `${it.key} 要標明估計方式`);
}
assert.equal(home.items.find((i) => i.key === 'phone').n, 30, '手機 30（iFixit 2025 認出 38 顆，取保守值）');
assert.equal(home.items.find((i) => i.key === 'car').n, 1000, '汽車約 1,000（美國商務部 2021）');
const def = Object.fromEntries(home.items.map((i) => [i.key, i.qty || 0]));
const r = homeChips(home.items, def);
assert.ok(r.total >= 20 && r.total < 200, `範例家庭是「幾十顆」（${r.total}）`);
assert.equal(homeChips(home.items, {}).total, 0);
assert.equal(homeChips([{ key: 'a', n: 30 }], { a: 2.7 }).total, 60, '數量取整數');
assert.equal(homeChips([{ key: 'a', n: 30 }], { a: -1 }).total, 0, '負數當 0');

console.log('doping.test.mjs ✓ 全部通過', { pure: siResistivity('pure').toExponential(2), n1e6: timesBetter('n', N6).toExponential(2), sample: r.total });
