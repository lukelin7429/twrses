// 萬物原理第一課：電池狀態計算的檢查（cd tools/science && npm test）
import assert from 'node:assert/strict';
import { voltage, capacity, movable, split, percent, makeCell, SITES } from '../src/cell.js';

// 電壓：充滿 4.2 V、用到底 3.0 V、中段落在標稱 3.6–3.8 V，而且一路單調上升
assert.equal(voltage(1), 4.2);
assert.equal(voltage(0), 3.0);
assert.ok(voltage(0.5) > 3.6 && voltage(0.5) < 3.8, `mid ${voltage(0.5)}`);
for (let s = 0; s < 1; s += 0.01) assert.ok(voltage(s + 0.01) >= voltage(s), `monotonic at ${s}`);

// 容量：500 循環剩 80%（Apple 對 iPhone 14 以前機型的設計值），不會變負
assert.equal(capacity(0), 1);
assert.ok(Math.abs(capacity(500) - 0.8) < 1e-9);
assert.equal(movable(500), 56);
assert.ok(capacity(1e6) >= 0.5);

// 分配：兩邊加上困住的，永遠等於總數
for (const c of [0, 250, 500, 750]) for (const s of [0, 0.37, 1]) {
  const p = split(s, c);
  assert.equal(p.anode + p.cathode + p.trapped, SITES);
}
// 老電池充滿也顯示 100%，但能動的鋰比較少
assert.equal(percent(split(1, 500).anode, 500), 100);
assert.ok(split(1, 500).anode < split(1, 0).anode);

// 電荷守恆：放電到底再充滿，離子數＝電子數，困住的鋰不變
const cell = makeCell(0.85, 300);
const trapped = cell.st.trapped;
while (cell.step(+1));
assert.equal(cell.percent(), 0);
while (cell.step(-1));
assert.equal(cell.percent(), 100);
assert.equal(cell.st.ions, cell.st.electrons);
assert.equal(cell.st.trapped, trapped);

console.log('battery.test: all passed');
