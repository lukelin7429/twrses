// 萬物原理第十六課：冰箱模型的檢查
import assert from 'node:assert/strict';
import { simulate, heatFlows, roomNetHeat, refrigerantAt, spacing, STAGES, ON_ABOVE, OFF_BELOW } from '../src/fridgecalc.js';

// 插著電、門關著：從室溫降下來，之後在溫控範圍附近來回（冷藏 0–7°C）
const closed = simulate(28, { room: 28 }, 600);
assert.ok(closed.lo > 0 && closed.hi < 7, `closed ${closed.lo} ${closed.hi}`);
assert.ok(closed.hi > ON_ABOVE - 0.5 && closed.lo < OFF_BELOW + 0.5);
assert.ok(closed.duty > 0.15 && closed.duty < 0.6, `duty ${closed.duty}`);     // 壓縮機有時運轉、有時休息
// 廚房越熱，壓縮機運轉的時間越長
assert.ok(simulate(4, { room: 35 }, 600).duty > simulate(4, { room: 20 }, 600).duty);
// 拔掉插頭：慢慢回到室溫，壓縮機不動
const off = simulate(4, { room: 28, plugged: false }, 600);
assert.ok(off.T > 27 && off.duty === 0);
assert.ok(simulate(4, { room: 28, plugged: false }, 60).T < 16);                 // 門關著，一小時還撐得住一點
// 門開著：壓縮機一直轉也保不住低溫
const door = simulate(4, { room: 28, door: true }, 300);
assert.ok(door.T > 15 && door.duty > 0.95, `door ${door.T} ${door.duty}`);
// 能量守恆：送到廚房的熱 ＝ 從裡面搬走的 ＋ 電；門開著時廚房淨變熱
const h = heatFlows(true);
assert.equal(h.kitchen, h.inside + h.electric);
assert.ok(roomNetHeat() > 0);
assert.deepEqual(heatFlows(false), { inside: 0, electric: 0, kitchen: 0 });
// 冷媒一圈：壓縮後最熱、進蒸發器前最冷；散熱管裡由氣變液、蒸發器裡由液變氣
assert.ok(refrigerantAt(0.09).hot > 0.9 && refrigerantAt(0.61).hot < 0.1);
assert.ok(refrigerantAt(0.1).liquid < 0.1 && refrigerantAt(0.48).liquid > 0.9);
assert.ok(refrigerantAt(0.62).liquid > 0.5 && refrigerantAt(0.98).liquid === 0);
assert.ok(refrigerantAt(0.3).high && !refrigerantAt(0.8).high);
assert.ok(spacing(0.95) > spacing(0.45));
assert.equal(STAGES[STAGES.length - 1].to, 1);
console.log('fridge.test: all passed', closed.lo.toFixed(1), closed.hi.toFixed(1), closed.duty.toFixed(2), door.T.toFixed(1));
