import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { category, forceOf, kmh, step, organized, eyeRadius, windAt, V_LO, V_HI } from '../src/typhooncalc.js';

// 氣象署的強度劃分
assert.equal(category(17.1), 'td'); assert.equal(category(17.2), 'mild'); assert.equal(category(32.6), 'mild'); assert.equal(category(32.7), 'moderate');
assert.equal(category(50.9), 'moderate'); assert.equal(category(51), 'severe');
// 相當蒲福風級：輕度 8–11、中度 12–15、強烈 16 以上
assert.equal(forceOf(17.2), 8); assert.equal(forceOf(32.6), 11); assert.equal(forceOf(32.7), 12); assert.equal(forceOf(50.9), 15); assert.equal(forceOf(51), 16); assert.equal(forceOf(60), 17);
assert.ok(Math.abs(kmh(17.2) - 61.92) < 1e-9);
// 海上增強、陸上減弱，而且不會超出範圍
assert.ok(step(30, 'sea', 1) > 30); assert.ok(step(30, 'land', 1) < 30); assert.equal(step(V_HI, 'sea', 5), V_HI); assert.equal(step(V_LO, 'land', 5), V_LO);
assert.equal(organized(10), 0); assert.equal(organized(40), 1); assert.ok(eyeRadius(55) < eyeRadius(20));
// 眼裡平靜、眼牆最強、往外漸弱
const re = eyeRadius(40);
assert.ok(windAt(0, 40, re) < 5); assert.ok(Math.abs(windAt(re, 40, re) - 40) < 1e-9); assert.ok(windAt(re * 3, 40, re) < 40 && windAt(re * 3, 40, re) > windAt(re * 5, 40, re));
const p = new URL('../../../data/earth.json', import.meta.url);
const data = existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : null;
const lesson = data && data.units.flatMap((u) => u.lessons).find((l) => l.slug === 'how-typhoons-form');
if (lesson) { assert.deepEqual(Object.keys(lesson.lab.msgs), ['td', 'grow', 'severe', 'land']); assert.equal(lesson.eyepass.steps.length, 5); }
console.log('typhoon.test: all passed', forceOf(40), eyeRadius(40).toFixed(2), lesson ? 'data ok' : 'no data yet');
