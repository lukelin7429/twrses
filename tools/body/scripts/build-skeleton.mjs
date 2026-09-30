/*
 * 從 BodyParts3D 產生第一課的骨架模型 assets/models/skeleton.glb。
 *
 * 資料來源：BodyParts3D 4.0（part-of 版、多邊形精簡版 obj_99）
 *   https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html
 *   授權：CC BY 4.0（2025-02-27 起；OBJ 檔頭還寫著舊的 CC BY-SA 2.1 JP，以官網授權頁為準）
 *   標示："BodyParts3D, © The Database Center for Life Science licensed under CC Attribution 4.0 International"
 *
 * 原始資料 62 MB，不進 repo。重做模型時：
 *   1. 到上面的網址下載 partof_BP3D_4.0_obj_99.zip 與 partof_element_parts.txt
 *   2. 解壓到 ~/Documents/twrses-bp3d/obj/（或用 BP3D=<資料夾> 指定）
 *   3. cd tools/body && npm run model
 *
 * 做了什麼：挑出 bones.js 列的 199 塊骨頭 → 轉成 three.js 座標（公尺、Y 朝上、臉朝 +Z）
 * → 每塊骨頭用 meshoptimizer 減面 → glTF，一塊骨頭一個節點（名稱 = bones.js 的 id）
 * → meshopt 壓縮。法線不存，瀏覽器載入後再算。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Document, NodeIO } from '@gltf-transform/core';
import { EXTMeshoptCompression, KHRMeshQuantization } from '@gltf-transform/extensions';
import { meshopt } from '@gltf-transform/functions';
import { MeshoptEncoder, MeshoptSimplifier } from 'meshoptimizer';
import { buildBones } from '../src/bones.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, '../../..');
const SRC = process.env.BP3D || path.resolve(REPO, '../twrses-bp3d');
const OBJ_DIR = path.join(SRC, 'obj/partof_BP3D_4.0_obj_99');
const OUT = path.join(REPO, 'assets/models/skeleton.glb');

// 減面：保留約 RATIO 的三角形，但小骨頭至少 MIN_TRIS 個，免得指骨變成一顆豆子
const RATIO = 0.3, MIN_TRIS = 220, MAX_ERR = 0.004;

const elements = new Map();       // concept 名稱 → [FJ 檔名]
for (const line of fs.readFileSync(path.join(SRC, 'partof_element_parts.txt'), 'utf8').split('\n').slice(1)) {
  const [, name, fj] = line.trim().split('\t');
  if (!fj) continue;
  if (!elements.has(name)) elements.set(name, []);
  elements.get(name).push(fj);
}

function readObj(fj, pos, idx) {
  const base = pos.length / 3;
  const vs = [];
  for (const line of fs.readFileSync(path.join(OBJ_DIR, `${fj}.obj`), 'utf8').split('\n')) {
    if (line.startsWith('v ')) {
      const [, x, y, z] = line.trim().split(/\s+/).map(Number);
      // BodyParts3D：mm、Z 朝上、左側 x>0、背側 y>0 → three.js：m、Y 朝上、臉朝 +Z（這是旋轉，不會翻面）
      vs.push(x / 1000, z / 1000, -y / 1000);
    } else if (line.startsWith('f ')) {
      const f = line.trim().split(/\s+/).slice(1).map((t) => parseInt(t, 10) - 1);
      for (let k = 1; k + 1 < f.length; k++) idx.push(base + f[0], base + f[k], base + f[k + 1]);
    }
  }
  pos.push(...vs);
}

await MeshoptSimplifier.ready;
await MeshoptEncoder.ready;

const bones = buildBones();
const missing = [];
const meshes = [];
let minY = Infinity, before = 0, after = 0;
for (const b of bones) {
  const pos = [], idx = [];
  for (const src of b.src) {
    const fjs = elements.get(src);
    if (!fjs) { missing.push(`${b.id} (${src})`); continue; }
    for (const fj of fjs) readObj(fj, pos, idx);
  }
  if (!idx.length) continue;
  const P = new Float32Array(pos);
  const I = new Uint32Array(idx);
  const target = Math.max(MIN_TRIS * 3, Math.floor(I.length * RATIO / 3) * 3);
  const [S] = target < I.length ? MeshoptSimplifier.simplify(I, P, 3, target, MAX_ERR) : [I];
  before += I.length / 3; after += S.length / 3;
  // 只留下用到的頂點
  const remap = new Map(), outP = [], outI = new Uint32Array(S.length);
  for (let k = 0; k < S.length; k++) {
    let n = remap.get(S[k]);
    if (n === undefined) {
      n = remap.size; remap.set(S[k], n);
      outP.push(P[S[k] * 3], P[S[k] * 3 + 1], P[S[k] * 3 + 2]);
      minY = Math.min(minY, P[S[k] * 3 + 1]);
    }
    outI[k] = n;
  }
  meshes.push({ id: b.id, P: new Float32Array(outP), I: outI });
}

// 腳底貼齊 y = 0
for (const m of meshes) for (let k = 1; k < m.P.length; k += 3) m.P[k] -= minY;

const doc = new Document();
const buf = doc.createBuffer();
const scene = doc.createScene('skeleton');
const mat = doc.createMaterial('bone').setBaseColorFactor([0.93, 0.89, 0.8, 1]).setRoughnessFactor(0.7);
for (const m of meshes) {
  const prim = doc.createPrimitive()
    .setAttribute('POSITION', doc.createAccessor().setType('VEC3').setArray(m.P).setBuffer(buf))
    .setIndices(doc.createAccessor().setType('SCALAR').setArray(m.P.length / 3 > 65535 ? m.I : new Uint16Array(m.I)).setBuffer(buf))
    .setMaterial(mat);
  scene.addChild(doc.createNode(m.id).setMesh(doc.createMesh(m.id).addPrimitive(prim)));
}
doc.getRoot().getAsset().copyright =
  'BodyParts3D, © The Database Center for Life Science licensed under CC Attribution 4.0 International. Bones selected, simplified, and re-oriented by MCC (twrses.org).';

await doc.transform(meshopt({ encoder: MeshoptEncoder, level: 'medium' }));
const io = new NodeIO().registerExtensions([EXTMeshoptCompression, KHRMeshQuantization]).registerDependencies({ 'meshopt.encoder': MeshoptEncoder });
fs.mkdirSync(path.dirname(OUT), { recursive: true });
await io.write(OUT, doc);

console.log(`bones: ${meshes.length} / ${bones.length}`);
if (missing.length) console.log('missing:', missing.join(', '));
console.log(`triangles: ${before} → ${after}`);
console.log(`${path.relative(REPO, OUT)}: ${(fs.statSync(OUT).size / 1024).toFixed(0)} KB`);
