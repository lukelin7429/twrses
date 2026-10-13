/*
 * 世界歷史 World History · 歷史地球儀（每一課共用）。
 *
 *   makeHGlobe({ land, texWidth }) → {
 *     group,                              加進場景的 Group（半徑 1 的球）
 *     setIceAge(0–1)                      疊上「冰河時期的海平面」那一層的不透明度
 *     loadIceAge(url) → Promise           讀 assets/img/world-history/iceage.png，畫出冰河時期的貼圖
 *     addRoute({ key, pts, color, dash }) pts 是 sphere.js 的 timedTrace() 再加上 sea（這一點在渡海的那一段上）
 *     setAgo(ago)                         時間：路線只畫到「距今 ago 年」已經走到的地方
 *     frontOf(key) / routes               路線前端的位置
 *     addDot({ key, at, color, r })       地表上的小圓點（發現地點）；setDot(key, { on, big })
 *     addArea({ key, at, r, color })      一塊柔和的光暈（「大約這一帶」，不是邊界）；setArea(key, 0–1)
 *     show('graticule', on)
 *     pos(lonlat, lift) → Vector3         地表上的世界座標（lift：浮起多少）
 *     facing(lonlat, camera) → bool       這一點現在是不是朝著鏡頭（標籤轉到背面就藏起來）
 *     pick(raycaster) → [lon, lat] | null 滑鼠點到地表的哪裡
 *   }
 *
 * 只畫陸地、海洋、經緯線與主題圖層。**不畫國界、不標國名**——歷史地圖不把今天的國界畫進去。
 * 陸地：Natural Earth 1:50m Land 5.1.2（公有領域）。
 * 冰河時期那一層（示意）：今天的海底地形（NOAA ETOPO1，公有領域）往下放水 120 公尺；
 * 冰層依 Batchelor et al. 2019（Nature Communications 10:3713）的末次冰盛期範圍簡化。見 scripts/build_iceage.py。
 *
 * 方向（sphere.js）：y 朝北極、經度 0 在 +z、東經在 +x。貼圖是等距圓柱，西經 180 在左、北在上。
 */
import {
  AdditiveBlending, BackSide, BufferAttribute, BufferGeometry, CanvasTexture, CircleGeometry, Color, DoubleSide, Group, LineBasicMaterial,
  LineSegments, Mesh, MeshBasicMaterial, RingGeometry, ShaderMaterial, SphereGeometry, SRGBColorSpace, Vector3,
} from 'three';
import { toVec, toLonLat } from './sphere.js';

const SEA = '#16406f', SEA_DEEP = '#0f3159', LAND = '#93bd7c', LAND_EDGE = '#6c9a5c', SHELF = '#cdbb8c', ICE = 'rgba(244,249,255,.93)';

function drawLand(ctx, W, H, land, fill, stroke) {
  const X = (lon) => (lon + 180) / 360 * W, Y = (lat) => (90 - lat) / 180 * H;
  ctx.fillStyle = fill;
  ctx.beginPath();
  for (const { rings } of land) for (const r of rings) {
    ctx.moveTo(X(r[0][0]), Y(r[0][1]));
    for (let i = 1; i < r.length; i++) ctx.lineTo(X(r[i][0]), Y(r[i][1]));
    ctx.closePath();
  }
  ctx.fill('evenodd');
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = Math.max(1, W / 2600); ctx.lineJoin = 'round'; ctx.stroke(); }
}
function drawSea(ctx, W, H) {
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, SEA_DEEP); g.addColorStop(0.5, SEA); g.addColorStop(1, SEA_DEEP);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
}
function texOf(canvas) {
  const t = new CanvasTexture(canvas);
  t.colorSpace = SRGBColorSpace; t.anisotropy = 4;
  return t;
}
/** 自己排的球面：u 往東、v 往北，和 sphere.js 的 toUV 一致（three 內建的 SphereGeometry 起點不同，不用它）。 */
function globeGeometry(radius, nLon = 96, nLat = 48) {
  const pos = [], uv = [], idx = [];
  for (let j = 0; j <= nLat; j++) for (let i = 0; i <= nLon; i++) {
    const lon = -180 + 360 * i / nLon, lat = -90 + 180 * j / nLat;
    pos.push(...toVec([lon, lat], radius)); uv.push(i / nLon, j / nLat);
  }
  for (let j = 0; j < nLat; j++) for (let i = 0; i < nLon; i++) {
    const a = j * (nLon + 1) + i, b = a + 1, c = a + nLon + 1, d = c + 1;
    idx.push(a, b, d, a, d, c);
  }
  const g = new BufferGeometry();
  g.setAttribute('position', new BufferAttribute(new Float32Array(pos), 3));
  g.setAttribute('uv', new BufferAttribute(new Float32Array(uv), 2));
  g.setIndex(idx);
  return g;
}

const ROUTE_VS = `
attribute float aAgo; attribute float aDist; attribute float aSide; attribute float aSea;
varying float vAgo; varying float vDist; varying float vSide; varying float vSea;
void main() { vAgo = aAgo; vDist = aDist; vSide = aSide; vSea = aSea;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
const ROUTE_FS = `
uniform float uAgo; uniform vec3 uColor; uniform vec3 uSea; uniform float uDash; uniform float uDim;
varying float vAgo; varying float vDist; varying float vSide; varying float vSea;
void main() {
  if (vAgo < uAgo) discard;
  float edge = 1.0 - smoothstep(0.55, 1.0, abs(vSide));
  float a = edge;
  vec3 col = uColor;
  if (vSea > 0.5) { col = uSea; if (fract(vDist * 0.9) > 0.55) discard; }
  else if (uDash > 0.5 && fract(vDist * 0.45) > 0.6) discard;
  gl_FragColor = vec4(col, a * uDim);
}`;

export function makeHGlobe({ land, texWidth = 4096 }) {
  const group = new Group();
  const W = texWidth, H = W / 2;

  // 現在的地球
  const cvNow = document.createElement('canvas'); cvNow.width = W; cvNow.height = H;
  { const c = cvNow.getContext('2d'); drawSea(c, W, H); drawLand(c, W, H, land, LAND, LAND_EDGE); }
  const base = new Mesh(globeGeometry(1), new MeshBasicMaterial({ map: texOf(cvNow) }));
  group.add(base);

  // 冰河時期：另一顆稍微大一點的球，貼圖讀進來之後才畫；用不透明度淡入淡出
  const iceMat = new MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false });
  const iceMesh = new Mesh(globeGeometry(1.0012), iceMat);
  iceMesh.visible = false; iceMesh.renderOrder = 1;
  group.add(iceMesh);
  let iceReady = null;
  function loadIceAge(url) {
    if (iceReady) return iceReady;
    iceReady = new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        // 索引色 PNG：1 露出的陸棚、2 冰、3 兩者都有 → 拆成兩張遮罩（陸棚畫在陸地下面、冰畫在陸地上面）
        const w = img.naturalWidth, h = img.naturalHeight;
        const src = document.createElement('canvas'); src.width = w; src.height = h;
        const sc = src.getContext('2d', { willReadFrequently: true }); sc.drawImage(img, 0, 0);
        const px = sc.getImageData(0, 0, w, h), d = px.data;
        const shelf = sc.createImageData(w, h), ice = sc.createImageData(w, h);
        for (let i = 0; i < d.length; i += 4) {
          if (d[i + 3] < 128) continue;
          const isIce = d[i] > 215, isShelf = d[i] < 235;          // 調色盤：陸棚 R=200、冰 R=240、兩者 R=225
          if (isShelf) { shelf.data[i] = 205; shelf.data[i + 1] = 187; shelf.data[i + 2] = 140; shelf.data[i + 3] = 255; }
          if (isIce) { ice.data[i] = 244; ice.data[i + 1] = 249; ice.data[i + 2] = 255; ice.data[i + 3] = 236; }
        }
        const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
        const c = cv.getContext('2d');
        drawSea(c, W, H);
        c.imageSmoothingEnabled = true; c.imageSmoothingQuality = 'high';
        sc.putImageData(shelf, 0, 0); c.drawImage(src, 0, 0, W, H);
        drawLand(c, W, H, land, LAND, LAND_EDGE);
        sc.putImageData(ice, 0, 0); c.drawImage(src, 0, 0, W, H);
        iceMat.map = texOf(cv); iceMat.needsUpdate = true;
        resolve(true);
      };
      img.onerror = () => { iceReady = null; reject(new Error('ice-age layer failed to load')); };
      img.src = url;
    });
    return iceReady;
  }
  function setIceAge(t) { iceMat.opacity = t; iceMesh.visible = t > 0.002 && !!iceMat.map; }

  // 光暈（大氣）
  group.add(new Mesh(new SphereGeometry(1.045, 48, 24), new MeshBasicMaterial({ color: 0x5b8fd6, transparent: true, opacity: 0.16, side: BackSide, depthWrite: false })));

  // 經緯線：每 30 度一條，赤道亮一點
  const grat = new Group();
  {
    const seg = [], eq = [];
    const line = (arr, a, b) => arr.push(...toVec(a, 1.003), ...toVec(b, 1.003));
    for (let lon = -180; lon < 180; lon += 30) for (let lat = -80; lat < 80; lat += 4) line(seg, [lon, lat], [lon, lat + 4]);
    for (let lat = -60; lat <= 60; lat += 30) for (let lon = -180; lon < 180; lon += 4) line(lat === 0 ? eq : seg, [lon, lat], [lon + 4, lat]);
    const mk = (arr, color, opacity) => {
      const g = new BufferGeometry(); g.setAttribute('position', new BufferAttribute(new Float32Array(arr), 3));
      return new LineSegments(g, new LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false }));
    };
    grat.add(mk(seg, 0xdfe8f7, 0.16), mk(eq, 0xffc9a8, 0.42));
    grat.renderOrder = 2;
  }
  group.add(grat);

  // 路線：貼著球面的帶子，用 shader 依年代截斷
  const routes = {};
  const uAgo = { value: 1e9 };
  function addRoute({ key, pts, color = '#ffd36e', sea = '#7fe3ff', dash = false, width = 0.011 }) {
    const n = pts.length, R = 1.0045;
    const pos = new Float32Array(n * 2 * 3), ago = new Float32Array(n * 2), dist = new Float32Array(n * 2), side = new Float32Array(n * 2), seaA = new Float32Array(n * 2);
    const P = new Vector3(), Q = new Vector3(), T = new Vector3(), S = new Vector3();
    for (let i = 0; i < n; i++) {
      P.fromArray(toVec(pts[i].p));
      Q.fromArray(toVec(pts[Math.min(n - 1, i + 1)].p)).sub(new Vector3().fromArray(toVec(pts[Math.max(0, i - 1)].p)));
      T.copy(Q).normalize(); S.crossVectors(P, T).normalize().multiplyScalar(width);
      for (let s = 0; s < 2; s++) {
        const k = i * 2 + s, sg = s ? 1 : -1;
        pos[k * 3] = (P.x + S.x * sg) * R; pos[k * 3 + 1] = (P.y + S.y * sg) * R; pos[k * 3 + 2] = (P.z + S.z * sg) * R;
        ago[k] = pts[i].ago; dist[k] = pts[i].d; side[k] = sg; seaA[k] = pts[i].sea ? 1 : 0;
      }
    }
    const idx = [];
    for (let i = 0; i < n - 1; i++) { const a = i * 2; idx.push(a, a + 1, a + 3, a, a + 3, a + 2); }
    const g = new BufferGeometry();
    g.setAttribute('position', new BufferAttribute(pos, 3));
    g.setAttribute('aAgo', new BufferAttribute(ago, 1));
    g.setAttribute('aDist', new BufferAttribute(dist, 1));
    g.setAttribute('aSide', new BufferAttribute(side, 1));
    g.setAttribute('aSea', new BufferAttribute(seaA, 1));
    g.setIndex(idx);
    const mat = new ShaderMaterial({
      vertexShader: ROUTE_VS, fragmentShader: ROUTE_FS, transparent: true, depthWrite: false, side: DoubleSide,
      uniforms: { uAgo, uColor: { value: new Color(color) }, uSea: { value: new Color(sea) }, uDash: { value: dash ? 1 : 0 }, uDim: { value: 1 } },
    });
    const mesh = new Mesh(g, mat); mesh.renderOrder = 4;
    group.add(mesh);
    // 路線前端的小亮點
    const head = new Mesh(new CircleGeometry(width * 1.9, 20), new MeshBasicMaterial({ color, transparent: true, opacity: 0.95, depthWrite: false }));
    head.renderOrder = 5; head.visible = false;
    group.add(head);
    routes[key] = { key, pts, mesh, mat, head, on: true };
    return routes[key];
  }
  function layFlat(mesh, lonlat, lift) {
    const v = new Vector3().fromArray(toVec(lonlat));
    mesh.position.copy(v).multiplyScalar(lift);
    mesh.lookAt(v.clone().multiplyScalar(3));
  }
  function setAgo(ago, fronts) {
    uAgo.value = ago;
    for (const r of Object.values(routes)) {
      const f = fronts ? fronts[r.key] : null;
      r.head.visible = r.on && !!f && !f.done;
      if (r.head.visible) layFlat(r.head, f.p, 1.006);
    }
  }
  function setRoute(key, on) { const r = routes[key]; if (r) { r.on = on; r.mesh.visible = on; if (!on) r.head.visible = false; } }

  // 發現地點的小圓點
  const dots = {};
  function addDot({ key, at, color = '#ffffff', r = 0.012 }) {
    const g = new Group();
    const core = new Mesh(new CircleGeometry(r, 24), new MeshBasicMaterial({ color, transparent: true, depthWrite: false }));
    const ring = new Mesh(new RingGeometry(r * 1.55, r * 2.05, 32), new MeshBasicMaterial({ color, transparent: true, opacity: 0.75, depthWrite: false, side: DoubleSide }));
    g.add(core, ring); g.renderOrder = 6; core.renderOrder = 6; ring.renderOrder = 6;
    layFlat(g, at, 1.0075);
    group.add(g);
    dots[key] = { key, at, g, core, ring };
    return dots[key];
  }
  function setDot(key, { on = true, big = false, dim = false, k = 1 } = {}) {
    const d = dots[key]; if (!d) return;
    d.g.visible = on; d.g.scale.setScalar((big ? 1.6 : 1) * k);
    d.core.material.opacity = dim ? 0.45 : 1; d.ring.material.opacity = dim ? 0.3 : big ? 1 : 0.75;
  }

  // 「大約這一帶」的光暈：沒有邊界線，往外淡掉
  const areas = {};
  function addArea({ key, at, r = 0.3, color = '#ffd36e' }) {
    const mat = new ShaderMaterial({
      transparent: true, depthWrite: false, blending: AdditiveBlending, side: DoubleSide,
      uniforms: { uColor: { value: new Color(color) }, uA: { value: 0 } },
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: 'uniform vec3 uColor; uniform float uA; varying vec2 vUv; void main(){ float d = distance(vUv, vec2(0.5)) * 2.0; float a = smoothstep(1.0, 0.15, d); gl_FragColor = vec4(uColor, a * uA); }',
    });
    const m = new Mesh(new CircleGeometry(r, 48), mat); m.renderOrder = 3;
    layFlat(m, at, 1.02 + r * r * 0.5);                      // 平的圓片要浮高一點才不會切進球面
    group.add(m);
    areas[key] = { key, mat, m };
    return areas[key];
  }
  function setArea(key, a) { const x = areas[key]; if (x) { x.mat.uniforms.uA.value = a; x.m.visible = a > 0.003; } }

  const tmp = new Vector3(), cam = new Vector3();
  return {
    group, routes, dots, loadIceAge, setIceAge, addRoute, setRoute, setAgo, addDot, setDot, addArea, setArea,
    hasIceAge: () => !!iceMat.map,
    show(key, on) { if (key === 'graticule') grat.visible = on; },
    pos(lonlat, lift = 1.01) { return new Vector3().fromArray(toVec(lonlat, lift)).applyMatrix4(group.matrixWorld); },
    facing(lonlat, camera, min = 0.12) {
      tmp.fromArray(toVec(lonlat)).applyMatrix4(group.matrixWorld);
      cam.copy(camera.position).sub(tmp).normalize();
      return tmp.normalize().dot(cam) > min;
    },
    pick(raycaster) {
      const hit = raycaster.intersectObject(base, false)[0];
      return hit ? toLonLat(group.worldToLocal(hit.point.clone()).toArray()) : null;
    },
  };
}
