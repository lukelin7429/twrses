// 第十課：CPU 和 AI 晶片（GPU）的差別。全部是示例數字：重點是「少數幾個快的」對「很多個慢的」。
export const SIDE = 24, TILES = SIDE * SIDE, CHAIN = 48;
// cores＝運算單元的數目；rate＝一個單元每秒做幾格（示例）
export const CHIPS = { cpu: { cores: 4, rate: 12 }, gpu: { cores: TILES, rate: 1 } };
export const JOBS = ['paint', 'chain'];
export const total = (job) => (job === 'paint' ? TILES : CHAIN);
// 畫圖：每一格互不相干，所有單元可以同時做；一串步驟：每一步要等上一步，一次只能一個單元做
export const busy = (job, chip) => (job === 'paint' ? CHIPS[chip].cores : 1);
export const throughput = (job, chip) => busy(job, chip) * CHIPS[chip].rate;
export const finishTime = (job, chip) => total(job) / throughput(job, chip);
export const done = (job, chip, t) => Math.min(total(job), Math.max(0, throughput(job, chip) * t));
// 阿姆達爾定律：工作裡有 p 的比例可以分給 n 個人同時做，整體快幾倍
export const amdahl = (p, n) => 1 / ((1 - p) + p / n);
export const amdahlMax = (p) => (p >= 1 ? Infinity : 1 / (1 - p));
