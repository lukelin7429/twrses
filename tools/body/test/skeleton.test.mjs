// 檢查 bones.js 與 assets/models/skeleton.glb 對得上：199 塊、id 不重複、數手骨的 27 塊都在模型裡。
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { buildBones, handOrder, REGIONS, JOBS } from '../src/bones.js';

const bones = buildBones();
const ids = new Set(bones.map((b) => b.id));
assert.equal(bones.length, 199, 'BodyParts3D 有 199 塊（206 減掉尾骨與六塊聽小骨）');
assert.equal(ids.size, bones.length, 'id 不可重複');
const count = (r) => bones.filter((b) => b.region === r).length;
assert.deepEqual(REGIONS.map((r) => count(r.key)), [23, 25, 25, 4, 6, 54, 2, 8, 52]);
assert.equal(handOrder('r').length, 27);
assert.equal(bones.filter((b) => b.region === 'hand' && b.id.startsWith('r-')).length, 27);
assert.equal(bones.filter((b) => b.region === 'foot' && b.id.startsWith('r-')).length, 26);
for (const id of handOrder('r')) assert.ok(ids.has(id), id);
for (const j of JOBS) for (const r of j.regions) assert.ok(REGIONS.some((x) => x.key === r), r);

const glb = fs.readFileSync(new URL('../../../assets/models/skeleton.glb', import.meta.url));
const len = glb.readUInt32LE(12);
const json = JSON.parse(glb.subarray(20, 20 + len).toString('utf8'));
const nodes = new Set(json.nodes.map((n) => n.name));
for (const id of ids) assert.ok(nodes.has(id), `模型缺 ${id}`);
assert.match(json.asset.copyright, /BodyParts3D.*CC Attribution 4\.0/);
console.log(`skeleton: ${bones.length} bones OK, glb ${(glb.length / 1024).toFixed(0)} KB`);

// organs.glb：真實器官（第十三課起），七個節點、同樣的授權標示
const og = fs.readFileSync(new URL('../../../assets/models/organs.glb', import.meta.url));
const ojson = JSON.parse(og.subarray(20, 20 + og.readUInt32LE(12)).toString('utf8'));
const onodes = new Set(ojson.nodes.map((n) => n.name));
for (const id of ['r-kidney', 'l-kidney', 'r-ureter', 'l-ureter', 'bladder', 'tongue', 'trachea', 'esophagus', 'stomach', 'duodenum', 'gallbladder', 'disc-01', 'disc-22', 'diaphragm', 'brainstem']) assert.ok(onodes.has(id), `organs.glb 缺 ${id}`);
assert.match(ojson.asset.copyright, /BodyParts3D.*CC Attribution 4\.0/);
console.log(`organs: ${onodes.size} nodes OK, glb ${(og.length / 1024).toFixed(0)} KB`);
