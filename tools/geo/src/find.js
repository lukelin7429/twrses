/*
 * 地理 Geography ·「找出這個地方」的判定與計分（純函式，test/find.test.mjs）。
 * 給一組經緯度，在地圖上點出來；離目標 tol 度以內就算找到。不計時，可以一直點到找到，只記第一次就找到的題數。
 * 沒找到時告訴你該往哪邊移（north／south／east／west）——順便練方向。
 */
import { angleBetween, whichWay } from './geo.js';

export function makeFindGame(questions, tol = 9) {
  const st = { i: 0, tries: 0, first: 0, done: false, solved: false, log: [] };
  return {
    state: st, total: questions.length, tol,
    question: () => questions[st.i],
    /** 點了一個地方：回傳 { correct, first, off（差幾度）, ns, ew } */
    answer(lon, lat) {
      if (st.done || st.solved) return null;
      const q = questions[st.i];
      st.tries++;
      const off = angleBetween(lon, lat, q.lon, q.lat);
      const way = whichWay([lon, lat], [q.lon, q.lat], 3);
      if (off <= tol) {
        st.solved = true;
        const first = st.tries === 1;
        if (first) st.first++;
        st.log.push({ q: st.i, tries: st.tries, first });
        return { correct: true, first, off, ns: way.ns, ew: way.ew };
      }
      return { correct: false, first: false, off, ns: way.ns, ew: way.ew };
    },
    next() {
      if (!st.solved) return false;
      st.solved = false; st.tries = 0;
      if (st.i >= questions.length - 1) { st.done = true; return false; }
      st.i++;
      return true;
    },
    reset() { st.i = 0; st.tries = 0; st.first = 0; st.done = false; st.solved = false; st.log = []; },
  };
}
