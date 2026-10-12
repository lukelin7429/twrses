/*
 * 家政 Life Skills at Home · 流理台上的道具（全部自繪的示意，沒有品牌、商標與包裝）。
 * 每個 make*() 回傳一個 Group，原點在底面中心，直接放到檯面（y = 0）上；會動的部分掛在 group.userData。
 *
 *   makeMeasuringCup()  玻璃量杯（一杯，刻度 1/4、1/2、3/4、1 cup）  userData.setFill(幾杯 0…1, food, packed)、.rimY、.radius
 *   makeScale()         電子秤                                      userData.setReading('120 g')、.plateY
 *   makeSpoon(key)      一支量匙（tbsp、tsp、half、quarter）          userData.setFill(0…1, 顏色)、.r
 *   makeBowl()          一個碗
 *   makeJar(food)       裝食材的罐子（水是水壺、油是瓶子）            userData.topY
 *   makeStream()        倒東西時的那一道                            userData.set(x, y1, y0, z, 顏色)、.hide()
 */
import {
  BoxGeometry, CanvasTexture, CircleGeometry, Color, CylinderGeometry, DoubleSide, Group, LatheGeometry, Mesh,
  MeshStandardMaterial, RepeatWrapping, SphereGeometry, SRGBColorSpace, TorusGeometry, Vector2,
} from 'three';
import { canvasTex } from './common.js';

const shadow = (m, cast = true, recv = true) => { m.castShadow = cast; m.receiveShadow = recv; return m; };
const glassMat = () => new MeshStandardMaterial({ color: 0xcfe6ff, transparent: true, opacity: 0.2, roughness: 0.08, metalness: 0.1, side: DoubleSide, depthWrite: false });
const steel = () => new MeshStandardMaterial({ color: 0xc9d0da, roughness: 0.32, metalness: 0.85 });

/** 粉和穀粒的表面：底色上撒小點；壓實（dense）就撒得密、顏色深一點 */
function grainTex(food, dense) {
  const t = canvasTex((g, w, h) => {
    g.fillStyle = dense ? food.color_dense || food.color : food.color; g.fillRect(0, 0, w, h);
    const n = food.kind === 'grain' ? 700 : dense ? 2600 : 900;
    for (let i = 0; i < n; i++) {
      const x = Math.random() * w, y = Math.random() * h;
      if (food.kind === 'grain') {
        g.save(); g.translate(x, y); g.rotate(Math.random() * Math.PI);
        g.fillStyle = Math.random() < 0.5 ? 'rgba(255,255,255,.75)' : 'rgba(150,130,95,.35)';
        g.beginPath(); g.ellipse(0, 0, 5.5, 2.2, 0, 0, Math.PI * 2); g.fill(); g.restore();
      } else {
        g.fillStyle = Math.random() < (dense ? 0.75 : 0.45) ? 'rgba(110,95,70,.22)' : 'rgba(255,255,255,.6)';
        g.fillRect(x, y, dense ? 1.6 : 2.4, dense ? 1.6 : 2.4);
      }
    }
  }, 256, 256);
  t.wrapS = t.wrapT = RepeatWrapping; t.repeat.set(3, 1);
  return t;
}

export function makeMeasuringCup() {
  const R = 0.66, H = 1.42, FULL = 1.12, BASE = 0.07;      // FULL：一杯的高度
  const grp = new Group();
  const body = new Mesh(new CylinderGeometry(R, R * 0.94, H, 48, 1, true), glassMat());
  body.position.y = BASE + H / 2; body.renderOrder = 3; grp.add(body);
  const base = shadow(new Mesh(new CylinderGeometry(R * 0.94, R * 0.94, BASE, 48), new MeshStandardMaterial({ color: 0xbfd8f2, transparent: true, opacity: 0.55, roughness: 0.1 })));
  base.position.y = BASE / 2; grp.add(base);
  const rim = new Mesh(new TorusGeometry(R, 0.022, 8, 48), new MeshStandardMaterial({ color: 0xe8f3ff, roughness: 0.1, transparent: true, opacity: 0.8 }));
  rim.rotation.x = Math.PI / 2; rim.position.y = BASE + H; grp.add(rim);
  const handle = new Mesh(new TorusGeometry(0.42, 0.065, 10, 28, Math.PI), new MeshStandardMaterial({ color: 0xd7e9ff, transparent: true, opacity: 0.5, roughness: 0.1 }));
  handle.rotation.z = -Math.PI / 2; handle.position.set(R + 0.02, BASE + H * 0.52, 0); handle.renderOrder = 3; grp.add(handle);
  // 刻度：紅色的線和字，貼在玻璃外面（正面朝 +z）
  const marks = canvasTex((g, w, h) => {
    g.clearRect(0, 0, w, h);
    g.fillStyle = '#d8402f'; g.strokeStyle = '#d8402f'; g.textBaseline = 'middle';
    const y = (cups) => h - (cups * FULL / H) * h;
    [[1, '1 CUP'], [0.75, '3/4'], [0.5, '1/2'], [0.25, '1/4']].forEach(([c, t]) => {
      g.fillRect(w * 0.30, y(c) - 3, w * 0.30, 6);
      g.font = `800 ${c === 1 ? 44 : 40}px system-ui, sans-serif`; g.textAlign = 'left';
      g.fillText(t, w * 0.62, y(c) + 2);
    });
    [0.125, 0.375, 0.625, 0.875].forEach((c) => g.fillRect(w * 0.30, y(c) - 2, w * 0.14, 4));
    g.font = '800 30px system-ui, sans-serif'; g.textAlign = 'right';
    [[50, '50'], [100, '100'], [150, '150'], [200, '200 mL']].forEach(([ml, t]) => {
      const yy = y(ml / 236.5882365);
      g.fillRect(w * 0.20, yy - 2, w * 0.08, 4);
      g.fillText(t, w * 0.19, yy + 2);
    });
  }, 512, 512);
  const band = new Mesh(new CylinderGeometry(R + 0.006, R * 0.94 + 0.006, H, 48, 1, true, -Math.PI * 0.42, Math.PI * 0.84),
    new MeshStandardMaterial({ map: marks, transparent: true, roughness: 0.4, depthWrite: false }));
  band.position.y = BASE + H / 2; band.renderOrder = 4; grp.add(band);

  const fillMat = new MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 });
  const fill = new Mesh(new CylinderGeometry(R * 0.955, R * 0.9, 1, 40), fillMat);
  fill.visible = false; fill.renderOrder = 1; grp.add(fill);
  const cache = new Map();
  grp.userData = {
    radius: R, rimY: BASE + H, fullH: FULL, baseY: BASE,
    surfaceY: (cups) => BASE + Math.max(0, cups) * FULL,
    setFill(cups, food, packed = false) {
      if (!food || cups <= 0.002) { fill.visible = false; return; }
      const key = `${food.key}:${packed ? 1 : 0}`;
      if (fill.userData.key !== key) {
        fill.userData.key = key;
        if (food.kind === 'liquid') {
          fillMat.map = null; fillMat.color = new Color(food.color); fillMat.transparent = true; fillMat.opacity = food.opacity || 0.72; fillMat.roughness = 0.15;
        } else {
          if (!cache.has(key)) cache.set(key, grainTex(food, packed));
          fillMat.map = cache.get(key); fillMat.color = new Color(0xffffff); fillMat.transparent = false; fillMat.opacity = 1; fillMat.roughness = 0.9;
        }
        fillMat.needsUpdate = true;
      }
      const hh = cups * FULL;
      fill.visible = true; fill.scale.y = hh; fill.position.y = BASE + hh / 2 + 0.002;
    },
  };
  return grp;
}

export function makeScale() {
  const W = 2.5, D = 2.9, H = 0.26;
  const grp = new Group();
  const body = shadow(new Mesh(new BoxGeometry(W, H, D), new MeshStandardMaterial({ color: 0xf1f3f6, roughness: 0.5 })));
  body.position.y = H / 2; grp.add(body);
  const plate = shadow(new Mesh(new CylinderGeometry(1.12, 1.12, 0.06, 56), steel()));
  plate.position.set(0, H + 0.05, -0.28); grp.add(plate);
  const neck = new Mesh(new CylinderGeometry(0.5, 0.5, 0.04, 32), new MeshStandardMaterial({ color: 0x8f98a6, roughness: 0.6 }));
  neck.position.set(0, H + 0.02, -0.28); grp.add(neck);
  const cvs = document.createElement('canvas'); cvs.width = 384; cvs.height = 128;
  const tex = new CanvasTexture(cvs); tex.colorSpace = SRGBColorSpace;
  const lcd = new Mesh(new BoxGeometry(1.5, 0.02, 0.5), [
    ...Array(2).fill(new MeshStandardMaterial({ color: 0x2b3340 })), new MeshStandardMaterial({ map: tex, roughness: 0.35, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.55 }),
    ...Array(3).fill(new MeshStandardMaterial({ color: 0x2b3340 })),
  ]);
  lcd.position.set(0, H + 0.011, D / 2 - 0.36); grp.add(lcd);
  [-1, 1].forEach((s) => {
    const b = new Mesh(new CylinderGeometry(0.11, 0.11, 0.03, 20), new MeshStandardMaterial({ color: 0x9aa4b4, roughness: 0.5 }));
    b.position.set(s * 1.0, H + 0.015, D / 2 - 0.36); grp.add(b);
  });
  grp.userData = {
    plateY: H + 0.08, plateZ: -0.28,
    setReading(text) {
      if (grp.userData.text === text) return;
      grp.userData.text = text;
      const g = cvs.getContext('2d');
      g.fillStyle = '#c7d9c2'; g.fillRect(0, 0, 384, 128);
      g.fillStyle = '#18251c'; g.textAlign = 'right'; g.textBaseline = 'middle';
      g.font = '700 92px ui-monospace, Menlo, Consolas, monospace';
      g.fillText(text, 364, 70);
      tex.needsUpdate = true;
    },
  };
  grp.userData.setReading('0 g');
  return grp;
}

/** 量匙：碗的大小照容量的立方根縮放（1 湯匙 = 3 茶匙） */
export const SPOON_TSP = { tbsp: 3, tsp: 1, half: 0.5, quarter: 0.25 };
export function makeSpoon(key) {
  const r = 0.34 * Math.cbrt(SPOON_TSP[key] / 3);
  const grp = new Group();
  const m = steel(); m.side = DoubleSide;
  const bowl = shadow(new Mesh(new SphereGeometry(r, 28, 14, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), m));
  bowl.position.y = r; grp.add(bowl);
  const rim = new Mesh(new TorusGeometry(r, 0.014, 6, 32), steel());
  rim.rotation.x = Math.PI / 2; rim.position.y = r; grp.add(rim);
  const len = 1.35;
  const handle = shadow(new Mesh(new BoxGeometry(0.15, 0.03, len), steel()));
  handle.position.set(0, r, r + len / 2 - 0.02); grp.add(handle);
  const disc = new Mesh(new CircleGeometry(1, 28), new MeshStandardMaterial({ color: 0x8fc4ff, transparent: true, opacity: 0.85, roughness: 0.15 }));
  disc.rotation.x = -Math.PI / 2; disc.visible = false; grp.add(disc);
  grp.userData = {
    r, key,
    setFill(k, color) {
      if (k <= 0.01) { disc.visible = false; return; }
      const h = Math.pow(Math.min(1, k), 0.62) * 0.94;         // 半球：體積和高度不是正比，這裡只求看起來對
      disc.visible = true; if (color) disc.material.color.set(color);
      disc.position.y = r * h + 0.004;
      disc.scale.setScalar(r * Math.sqrt(Math.max(0.01, 1 - (1 - h) * (1 - h))) * 0.985);
    },
  };
  return grp;
}

export function makeBowl() {
  const pts = [[0, 0], [0.5, 0], [0.56, 0.04], [0.82, 0.3], [1.0, 0.62], [1.04, 0.66], [0.98, 0.66], [0.78, 0.33], [0.5, 0.09], [0, 0.07]].map(([x, y]) => new Vector2(x, y));
  const grp = new Group();
  grp.add(shadow(new Mesh(new LatheGeometry(pts, 48), new MeshStandardMaterial({ color: 0xf4efe6, roughness: 0.45, side: DoubleSide }))));
  const stripe = new Mesh(new TorusGeometry(1.035, 0.018, 6, 48), new MeshStandardMaterial({ color: 0x3f6fb0, roughness: 0.5 }));
  stripe.rotation.x = Math.PI / 2; stripe.position.y = 0.6; grp.add(stripe);
  return grp;
}

export function makeJar(food) {
  const grp = new Group();
  const shape = food.jar || 'jar';
  const R = shape === 'bottle' ? 0.36 : 0.52, H = shape === 'bottle' ? 1.75 : shape === 'pitcher' ? 1.6 : 1.3;
  const inner = new Group(); grp.add(inner);                    // 倒的時候整個傾斜
  const glass = new Mesh(new CylinderGeometry(R, R, H, 36, 1, true), glassMat());
  glass.position.y = H / 2; glass.renderOrder = 3; inner.add(glass);
  const bottom = shadow(new Mesh(new CylinderGeometry(R, R, 0.05, 36), new MeshStandardMaterial({ color: 0xbfd8f2, transparent: true, opacity: 0.5 })));
  bottom.position.y = 0.025; inner.add(bottom);
  const level = H * 0.78;
  const stuffMat = food.kind === 'liquid'
    ? new MeshStandardMaterial({ color: food.color, transparent: true, opacity: food.opacity || 0.72, roughness: 0.15 })
    : new MeshStandardMaterial({ map: grainTex(food, false), roughness: 0.9 });
  const stuff = new Mesh(new CylinderGeometry(R * 0.94, R * 0.94, level, 32), stuffMat);
  stuff.position.y = 0.05 + level / 2; stuff.renderOrder = 1; inner.add(stuff);
  if (shape === 'bottle') {
    const sh = new Mesh(new CylinderGeometry(0.13, R, 0.34, 28, 1, true), glassMat()); sh.position.y = H + 0.17; sh.renderOrder = 3; inner.add(sh);
    const nk = new Mesh(new CylinderGeometry(0.13, 0.13, 0.3, 20, 1, true), glassMat()); nk.position.y = H + 0.49; nk.renderOrder = 3; inner.add(nk);
    const cap = shadow(new Mesh(new CylinderGeometry(0.15, 0.15, 0.12, 20), new MeshStandardMaterial({ color: 0x3b2a1a, roughness: 0.6 }))); cap.position.y = H + 0.68; inner.add(cap);
  } else if (shape === 'pitcher') {
    const hd = new Mesh(new TorusGeometry(0.44, 0.06, 8, 24, Math.PI), new MeshStandardMaterial({ color: 0xd7e9ff, transparent: true, opacity: 0.5 }));
    hd.rotation.z = Math.PI / 2; hd.position.set(-R - 0.02, H * 0.55, 0); hd.renderOrder = 3; inner.add(hd);
  } else {
    const lid = shadow(new Mesh(new CylinderGeometry(R + 0.04, R + 0.04, 0.12, 36), new MeshStandardMaterial({ color: food.lid || 0xb07a3c, roughness: 0.6 })));
    lid.position.y = H + 0.06; inner.add(lid);
    const knob = new Mesh(new SphereGeometry(0.1, 16, 10), lid.material); knob.position.y = H + 0.17; inner.add(knob);
    grp.userData.lid = [lid, knob];
  }
  Object.assign(grp.userData, { topY: H + (shape === 'bottle' ? 0.74 : 0.2), H, R, inner, food });
  return grp;
}

export function makeStream() {
  const mat = new MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.85, roughness: 0.4 });
  const m = new Mesh(new CylinderGeometry(0.07, 0.05, 1, 12), mat);
  m.visible = false; m.renderOrder = 2;
  m.userData = {
    set(x, yTop, yBottom, z, color, opacity = 0.85) {
      const len = Math.max(0.02, yTop - yBottom);
      m.visible = true; m.scale.y = len; m.position.set(x, yBottom + len / 2, z);
      mat.color.set(color); mat.opacity = opacity;
    },
    hide() { m.visible = false; },
  };
  return m;
}
