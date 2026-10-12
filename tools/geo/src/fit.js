/*
 * 地理 Geography ·「哪一張地圖適合？」的計分（純函式，test/fit.test.mjs）。
 * 不計時；每一題可以一直選到對為止，只記「第一次就答對」的題數。
 */
export function makeFitGame(questions) {
  const st = { i: 0, tries: 0, first: 0, done: false, solved: false, log: [] };
  return {
    state: st,
    total: questions.length,
    question: () => questions[st.i],
    /** 選一個答案：回傳 { correct, first }；答對後要呼叫 next() 才換題 */
    answer(key) {
      if (st.done || st.solved) return null;
      const q = questions[st.i];
      st.tries++;
      const correct = key === q.answer;
      if (correct) {
        st.solved = true;
        const first = st.tries === 1;
        if (first) st.first++;
        st.log.push({ q: st.i, tries: st.tries, first });
        return { correct, first };
      }
      return { correct, first: false };
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
