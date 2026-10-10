/*
 * 電腦概論 · 第九課「程式是什麼？」的純函式（不碰 DOM、不碰 three.js；test/robot.test.mjs）。
 *
 * 一台走格子的小機器人和它聽得懂的指令——**自己設計的教學用語言，不是任何真實的程式語言**。
 *   F 前進一格　L 左轉　R 右轉　REP n [ … ] 重複 n 次　IFWALL [ … ] 如果前面是牆，就做裡面的事
 * 機器人只照字面做：前面是牆還叫它前進，它就撞上去、整個程式停在那裡（result = 'bump'），不會自己繞路。
 * 走到旗子那一格就成功並停下（'goal'）；指令做完還沒到是 'end'；步數超過上限是 'limit'。
 *
 * 地圖：字串陣列，'#' 牆、'.' 地板、'F' 旗子、'^' '>' 'v' '<' 起點與面向。格子外面一律算牆。
 */
export const DIRS = [[0, -1], [1, 0], [0, 1], [-1, 0]];        // 北、東、南、西（y 往下）
export const DIR_KEYS = ['N', 'E', 'S', 'W'];
const START = { '^': 0, '>': 1, v: 2, '<': 3 };

export function parseLevel(rows) {
  const walls = new Set(); let start = null, flag = null;
  rows.forEach((r, y) => [...r].forEach((c, x) => {
    if (c === '#') walls.add(`${x},${y}`);
    else if (c === 'F') flag = { x, y };
    else if (c in START) start = { x, y, dir: START[c] };
  }));
  return { w: rows[0].length, h: rows.length, walls, start, flag, rows };
}
export const isWall = (lv, x, y) => x < 0 || y < 0 || x >= lv.w || y >= lv.h || lv.walls.has(`${x},${y}`);
export const wallAhead = (lv, s) => isWall(lv, s.x + DIRS[s.dir][0], s.y + DIRS[s.dir][1]);

// 簡寫：'FFRF' → 指令陣列；rep(4, 'FLFR')、ifWall('L')
export const seq = (str) => [...str].map((op) => ({ op }));
export const rep = (n, body) => ({ op: 'REP', n, body: typeof body === 'string' ? seq(body) : body });
export const ifWall = (body) => ({ op: 'IFWALL', body: typeof body === 'string' ? seq(body) : body });
// 小遊戲的積木：F、L、R、IFL（如果前面是牆就左轉）、IFR（如果前面是牆就右轉）
export const TOKEN = { F: () => ({ op: 'F' }), L: () => ({ op: 'L' }), R: () => ({ op: 'R' }), IFL: () => ifWall('L'), IFR: () => ifWall('R') };
export const build = (tokens, n = 1) => { const body = tokens.map((t) => TOKEN[t]()); return n > 1 ? [rep(n, body)] : body; };
// 寫了幾條指令（REP、IFWALL 自己各算一條，加上裡面的）
export const count = (prog) => prog.reduce((s, c) => s + 1 + (c.body ? count(c.body) : 0), 0);

// 執行：回傳每一個小步驟（機器人做完那一步之後的位置、正在執行的是哪一條 path、第幾輪 iter）
export function run(lv, prog, limit = 400) {
  const s = { ...lv.start }, steps = [];
  let result = null;
  const push = (path, iter, op, event) => steps.push({ x: s.x, y: s.y, dir: s.dir, path, iter, op, event });
  function exec(list, base, iter) {
    for (let i = 0; i < list.length && !result; i++) {
      const c = list[i], path = [...base, i];
      if (steps.length >= limit) { result = 'limit'; return; }
      if (c.op === 'F') {
        if (wallAhead(lv, s)) { push(path, iter, 'F', 'bump'); result = 'bump'; return; }
        s.x += DIRS[s.dir][0]; s.y += DIRS[s.dir][1];
        const goal = lv.flag && s.x === lv.flag.x && s.y === lv.flag.y;
        push(path, iter, 'F', goal ? 'goal' : 'move'); if (goal) { result = 'goal'; return; }
      } else if (c.op === 'L') { s.dir = (s.dir + 3) % 4; push(path, iter, 'L', 'turn'); }
      else if (c.op === 'R') { s.dir = (s.dir + 1) % 4; push(path, iter, 'R', 'turn'); }
      else if (c.op === 'REP') { for (let k = 0; k < c.n && !result; k++) exec(c.body, path, k + 1); }
      else if (c.op === 'IFWALL') { const yes = wallAhead(lv, s); push(path, iter, 'IFWALL', yes ? 'yes' : 'no'); if (yes) exec(c.body, path, iter); }
      else throw new Error(`unknown instruction ${c.op}`);
    }
  }
  exec(prog, [], 0);
  return { steps, result: result || 'end', final: { ...s } };
}

// ── 3D 模型的房間與程式 ─────────────────────────────────────────────
export const ROOMS = {
  stairs: parseLevel(['......', '....F.', '.....#', '....#.', '...#..', '>.#...']),
  roomA: parseLevel(['......', '......', 'F.....', '......', '......', '>.....']),
  roomB: parseLevel(['......', '......', '......', 'F..#..', '...#..', '>..#..']),
};
export const PROGS = {
  seq: { room: 'stairs', prog: seq('FLFRFLFRFLFRFLF') },
  loop: { room: 'stairs', prog: [rep(4, 'FLFR')] },
  bug: { room: 'stairs', prog: seq('FLFRFLFFLFRFLF') },          // 第八條的「右轉」漏掉了：照做到底，停在別的地方
  cond: { room: 'roomA', prog: [rep(20, [ifWall('L'), { op: 'F' }])] },
};

// ── 小遊戲三關（順序、重複、條件）──────────────────────────────────
export const LEVELS = [
  { key: 'seq', level: parseLevel(['.....', '.....', '..F..', '.##..', '^....']), tokens: ['F', 'L', 'R'], max: 8, rep: false, par: 5, solution: { tokens: ['F', 'F', 'R', 'F', 'F'], n: 1 } },
  { key: 'loop', level: parseLevel(['....F', '.....', '....#', '...#.', '>.#..']), tokens: ['F', 'L', 'R'], max: 4, rep: true, par: 5, solution: { tokens: ['F', 'L', 'F', 'R'], n: 4 } },
  { key: 'cond', level: parseLevel(['.....', '....#', 'F....', '.###.', '>....']), tokens: ['F', 'L', 'R', 'IFL', 'IFR'], max: 2, rep: true, par: 4, solution: { tokens: ['IFL', 'F'], n: 12 } },
];

// ── 「它最後面向哪一邊？」八題（不看地圖，只轉身）──────────────────
export const FACING = [
  { start: 0, prog: seq('R') }, { start: 0, prog: seq('LL') }, { start: 1, prog: seq('RL') }, { start: 0, prog: [rep(4, 'R')] },
  { start: 0, prog: [rep(3, 'L')] }, { start: 2, prog: seq('RRR') }, { start: 3, prog: [rep(2, 'LL')] }, { start: 1, prog: [rep(3, 'RR')] },
];
const OPEN = parseLevel(['.....', '.....', '..^..', '.....', '.....']);
export const facingAnswer = (q) => DIR_KEYS[run({ ...OPEN, start: { x: 2, y: 2, dir: q.start } }, q.prog).final.dir];
