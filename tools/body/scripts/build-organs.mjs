/*
 * 從 BodyParts3D 產生真實器官模型 assets/models/organs.glb（第十三課腎臟起使用）。
 *
 * 資料來源、授權、下載方法同 build-skeleton.mjs（BodyParts3D 4.0 part-of 版，CC BY 4.0）。
 *   cd tools/body && npm run model:organs
 *
 * 只挑「單一檔案、形狀完整」的器官（肝、心、腦在這份資料裡是幾十個碎片，不用）：
 *   r-kidney / l-kidney 腎臟、r-ureter / l-ureter 輸尿管、bladder 膀胱、tongue 舌頭（第十四課用）、trachea 氣管（第十七課用）、
 *   esophagus 食道、stomach 胃、duodenum 十二指腸、gallbladder 膽囊（第二十一課用）、disc-01…22 椎間盤（第二十三課用）、
 *   diaphragm 橫膈膜、brainstem 腦幹（第二十六課用）、
 *   l-hippocampus / r-hippocampus 海馬迴、cerebellum 小腦（第二十八課用）。
 * 座標與 skeleton.glb 完全對齊：同樣轉成公尺、Y 朝上、臉朝 +Z；
 * 骨架當初把腳底貼齊 y = 0，這裡拿 skeleton.glb 裡幾塊大骨頭的包圍盒和原始資料比，量出同一個位移再套用。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Document, NodeIO } from '@gltf-transform/core';
import { EXTMeshoptCompression, KHRMeshQuantization } from '@gltf-transform/extensions';
import { meshopt } from '@gltf-transform/functions';
import { MeshoptDecoder, MeshoptEncoder, MeshoptSimplifier } from 'meshoptimizer';
import { Box3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { buildBones } from '../src/bones.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, '../../..');
const SRC = process.env.BP3D || path.resolve(REPO, '../twrses-bp3d');
const OBJ_DIR = path.join(SRC, 'obj/partof_BP3D_4.0_obj_99');
const SKELETON = path.join(REPO, 'assets/models/skeleton.glb');
const OUT = path.join(REPO, 'assets/models/organs.glb');

export const ORGANS = [
  { id: 'r-kidney', src: 'right kidney' }, { id: 'l-kidney', src: 'left kidney' },
  { id: 'r-ureter', src: 'right ureter' }, { id: 'l-ureter', src: 'left ureter' },
  { id: 'bladder', src: 'urinary bladder' }, { id: 'tongue', src: 'tongue' },
  { id: 'trachea', src: 'trachea' },                               // 第十七課（說話）用
  // 第二十一課（能量）用
  { id: 'esophagus', src: 'esophagus' }, { id: 'stomach', src: 'stomach' }, { id: 'duodenum', src: 'duodenum' }, { id: 'gallbladder', src: 'gallbladder' },
  { id: 'diaphragm', src: 'diaphragm', tris: 5000 }, { id: 'brainstem', src: 'brainstem', tris: 3000 },   // 第二十六課（反射）用；原始形狀很細，用 tris 指定上限
  { id: 'l-hippocampus', src: 'left hippocampus', tris: 1500 }, { id: 'r-hippocampus', src: 'right hippocampus', tris: 1500 }, { id: 'cerebellum', src: 'cerebellum', tris: 4500 },   // 第二十八課（記憶）用
  // 第二十三課（背）用：22 個椎間盤（由上到下 disc-01 … disc-22；原始資料拼成 intervertebral disk）。
  // 「spinal cord」那個檔案只有頸部 3.6 公分的一小段，不能用，脊髓照第七課自繪。
  { id: 'disc-01', src: 'intervertebral disk of axis' },
  { id: 'disc-02', src: 'intervertebral disk of third cervical vertebra' },
  { id: 'disc-03', src: 'intervertebral disk of fourth cervical vertebra' },
  { id: 'disc-04', src: 'intervertebral disk of fifth cervical vertebra' },
  { id: 'disc-05', src: 'intervertebral disk of sixth cervical vertebra' },
  { id: 'disc-06', src: 'intervertebral disk of seventh cervical vertebra' },
  { id: 'disc-07', src: 'intervertebral disk of first thoracic vertebra' },
  { id: 'disc-08', src: 'intervertebral disk of second thoracic vertebra' },
  { id: 'disc-09', src: 'intervertebral disk of third thoracic vertebra' },
  { id: 'disc-10', src: 'intervertebral disk of fourth thoracic vertebra' },
  { id: 'disc-11', src: 'intervertebral disk of fifth thoracic vertebra' },
  { id: 'disc-12', src: 'intervertebral disk of sixth thoracic vertebra' },
  { id: 'disc-13', src: 'intervertebral disk of seventh thoracic vertebra' },
  { id: 'disc-14', src: 'intervertebral disk of eighth thoracic vertebra' },
  { id: 'disc-15', src: 'intervertebral disk of ninth thoracic vertebra' },
  { id: 'disc-16', src: 'intervertebral disk of tenth thoracic vertebra' },
  { id: 'disc-17', src: 'intervertebral disk of eleventh thoracic vertebra' },
  { id: 'disc-18', src: 'intervertebral disk of first lumbar vertebra' },
  { id: 'disc-19', src: 'intervertebral disk of second lumbar vertebra' },
  { id: 'disc-20', src: 'intervertebral disk of third lumbar vertebra' },
  { id: 'disc-21', src: 'intervertebral disk of fourth lumbar vertebra' },
  { id: 'disc-22', src: 'intervertebral disk of fifth lumbar vertebra' },
];
const RATIO = 0.5, MIN_TRIS = 500, MAX_ERR = 0.003;
const SMALL = /^disc-/;                              // 椎間盤很小，不用留到 500 個三角形

const elements = new Map();
for (const line of fs.readFileSync(path.join(SRC, 'partof_element_parts.txt'), 'utf8').split('\n').slice(1)) {
  const [, name, fj] = line.trim().split('\t');
  if (!fj) continue;
  if (!elements.has(name)) elements.set(name, []);
  elements.get(name).push(fj);
}
function readObj(fj, pos, idx) {
  const base = pos.length / 3;
  for (const line of fs.readFileSync(path.join(OBJ_DIR, `${fj}.obj`), 'utf8').split('\n')) {
    if (line.startsWith('v ')) {
      const [, x, y, z] = line.trim().split(/\s+/).map(Number);
      pos.push(x / 1000, z / 1000, -y / 1000);
    } else if (line.startsWith('f ')) {
      const f = line.trim().split(/\s+/).slice(1).map((t) => parseInt(t, 10) - 1);
      for (let k = 1; k + 1 < f.length; k++) idx.push(base + f[0], base + f[k], base + f[k + 1]);
    }
  }
}
function rawOf(names) {
  const pos = [], idx = [];
  for (const n of names) for (const fj of elements.get(n) || []) readObj(fj, pos, idx);
  return { pos, idx };
}

await MeshoptSimplifier.ready; await MeshoptEncoder.ready; await MeshoptDecoder.ready;

// ---- 量出骨架的 y 位移（腳底貼齊 0 的那個量） ----
const glb = fs.readFileSync(SKELETON);
const gltf = await new Promise((res, rej) => {
  const loader = new GLTFLoader(); loader.setMeshoptDecoder(MeshoptDecoder);
  loader.parse(glb.buffer.slice(glb.byteOffset, glb.byteOffset + glb.byteLength), '', res, rej);
});
gltf.scene.updateMatrixWorld(true);
const bones = new Map(buildBones().map((b) => [b.id, b]));
const shifts = [];
for (const id of ['sacrum', 'r-femur', 'l-femur', 't12', 'frontal']) {
  let node = null;
  gltf.scene.traverse((o) => { if (o.name === id && !node) node = o; });
  const box = new Box3().setFromObject(node);
  const { pos } = rawOf(bones.get(id).src);
  let lo = Infinity, hi = -Infinity;
  for (let k = 1; k < pos.length; k += 3) { lo = Math.min(lo, pos[k]); hi = Math.max(hi, pos[k]); }
  shifts.push(box.min.y - lo, box.max.y - hi);
}
const dy = shifts.reduce((a, b) => a + b, 0) / shifts.length;
const spread = Math.max(...shifts) - Math.min(...shifts);
if (spread > 0.002) throw new Error(`骨架位移量不一致（差 ${(spread * 1000).toFixed(2)} mm），先檢查 skeleton.glb`);

// ---- 器官 ----
const doc = new Document();
const buf = doc.createBuffer();
const scene = doc.createScene('organs');
const mat = doc.createMaterial('organ').setBaseColorFactor([0.72, 0.3, 0.26, 1]).setRoughnessFactor(0.6);
let before = 0, after = 0;
for (const o of ORGANS) {
  const { pos, idx } = rawOf([o.src]);
  if (!idx.length) throw new Error(`找不到 ${o.src}`);
  const P = new Float32Array(pos), I = new Uint32Array(idx);
  const target = o.tris ? o.tris * 3 : Math.max((SMALL.test(o.id) ? 140 : MIN_TRIS) * 3, Math.floor((I.length * (SMALL.test(o.id) ? 0.07 : RATIO)) / 3) * 3);
  const [Sx] = target < I.length ? MeshoptSimplifier.simplify(I, P, 3, target, o.tris ? 0.05 : SMALL.test(o.id) ? 0.25 : MAX_ERR) : [I];
  before += I.length / 3; after += Sx.length / 3;
  const remap = new Map(), outP = [], outI = new Uint32Array(Sx.length);
  for (let k = 0; k < Sx.length; k++) {
    let n = remap.get(Sx[k]);
    if (n === undefined) { n = remap.size; remap.set(Sx[k], n); outP.push(P[Sx[k] * 3], P[Sx[k] * 3 + 1] + dy, P[Sx[k] * 3 + 2]); }
    outI[k] = n;
  }
  const prim = doc.createPrimitive()
    .setAttribute('POSITION', doc.createAccessor().setType('VEC3').setArray(new Float32Array(outP)).setBuffer(buf))
    .setIndices(doc.createAccessor().setType('SCALAR').setArray(outP.length / 3 > 65535 ? outI : new Uint16Array(outI)).setBuffer(buf))
    .setMaterial(mat);
  scene.addChild(doc.createNode(o.id).setMesh(doc.createMesh(o.id).addPrimitive(prim)));
}
doc.getRoot().getAsset().copyright =
  'BodyParts3D, © The Database Center for Life Science licensed under CC Attribution 4.0 International. Organs selected, simplified, and re-oriented by MCC (twrses.org).';
await doc.transform(meshopt({ encoder: MeshoptEncoder, level: 'medium' }));
const io = new NodeIO().registerExtensions([EXTMeshoptCompression, KHRMeshQuantization]).registerDependencies({ 'meshopt.encoder': MeshoptEncoder });
await io.write(OUT, doc);

console.log(`skeleton y shift: ${(dy * 1000).toFixed(2)} mm (spread ${(spread * 1000).toFixed(2)} mm)`);
console.log(`organs: ${ORGANS.length}, triangles: ${before} → ${after}`);
console.log(`${path.relative(REPO, OUT)}: ${(fs.statSync(OUT).size / 1024).toFixed(0)} KB`);
