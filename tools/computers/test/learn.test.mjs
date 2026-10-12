import assert from 'node:assert/strict';
import { LIMIT, SETS, TEST, errors, init, makeSet, predict, segment, stepOnce, train } from '../src/learn.js';

const clean = makeSet('clean'), few = makeSet('few'), noisy = makeSet('noisy');
assert.equal(clean.length, 24); assert.equal(few.length, 4); assert.equal(noisy.length, 24); assert.equal(TEST.length, 12);
assert.equal(clean.filter((p) => p.label > 0).length, 12); assert.equal(noisy.filter((p) => p.flipped).length, 4);
for (const p of [...clean, ...TEST]) { assert.ok(p.x >= 1 && p.x <= 9 && p.y >= 1 && p.y <= 9); }
assert.deepEqual(makeSet('clean'), clean);                                   // 固定的：每次都一樣
// 一開始的線很差
assert.equal(errors(init(), clean), 17); assert.equal(errors(init(), TEST), 10);
// 看一個例子：分對了不動，分錯了才動
let m = init(); const r1 = stepOnce(m, clean); assert.equal(r1.model.seen, 1); assert.equal(r1.moved, r1.wrong);
if (!r1.wrong) { assert.equal(r1.model.a, m.a); assert.equal(r1.model.b, m.b); assert.equal(r1.model.c, m.c); }
// 乾淨的資料：看了 40 個例子、挪了 5 次，就全部分對；12 顆新水果也全對
const A = train(clean); assert.deepEqual([A.converged, A.model.seen, A.model.moves, errors(A.model, clean), errors(A.model, TEST)], [true, 40, 5, 0, 0]);
// 只有 4 個例子：很快就「學完」（14 個、4 次），四顆都對，可是新水果錯 2 顆、完整那 24 顆錯 3 顆
const B = train(few); assert.deepEqual([B.converged, B.model.seen, B.model.moves, errors(B.model, few), errors(B.model, TEST), errors(B.model, clean)], [true, 14, 4, 0, 2, 3]);
// 有 4 顆答案被標錯：到上限都定不下來，挪了 92 次，還錯 5 顆；而且再學多久都不會全對
const N = train(noisy); assert.equal(LIMIT, 240); assert.deepEqual([N.converged, N.model.seen, N.model.moves, errors(N.model, noisy)], [false, 240, 92, 5]);
assert.equal(train(noisy, 20000).converged, false);
let mm = init(); const hist = []; for (let i = 0; i < 240; i++) { mm = stepOnce(mm, noisy).model; if ((i + 1) % 24 === 0) hist.push(errors(mm, noisy)); }
assert.deepEqual(hist, [13, 7, 6, 7, 6, 6, 7, 5, 8, 5]); assert.ok(Math.min(...hist) >= 4);
// 畫線用的端點都在方框裡
for (const k of SETS) { const s = segment(train(makeSet(k)).model); assert.ok(s && s.length === 2); for (const [x, y] of s) assert.ok(x >= -1e-6 && x <= 10 + 1e-6 && y >= -1e-6 && y <= 10 + 1e-6); }
assert.equal(predict(A.model, { x: 3, y: 8 }), 1); assert.equal(predict(A.model, { x: 8, y: 2 }), -1);
console.log('learn.test.mjs ok');
