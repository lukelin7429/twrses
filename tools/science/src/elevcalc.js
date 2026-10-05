/*
 * 萬物原理 · 第十五課「電梯怎麼舉起那麼重的東西？」的平衡錘計算（純函式，test/elevator.test.mjs 會跑）。
 *
 * 曳引式電梯：鋼索繞過頂樓的曳引輪，一頭掛車廂、一頭掛平衡錘。
 *   平衡錘 ＝ 車廂重 ＋ 額定載重的 40–50%（Wikipedia「Elevator」），這裡取 45%。
 *   馬達要撐住的只是「兩邊的重量差」：|車廂 ＋ 乘客 − 平衡錘|；沒有平衡錘就得撐住整個車廂加乘客。
 * 模型的數字（示意，不是任何一台真電梯）：車廂 1,000 kg、額定載重 1,000 kg、每位乘客算 70 kg、5 條鋼索。
 * 安全：調速器發現車廂掉得太快，就觸發安全裝置夾住導軌。模型裡速度超過 2 m/s 觸發、以 0.6 g 煞停。
 */
export const G = 9.81;
export const CAR = 1000, CAPACITY = 1000, PERSON = 70, MAX_PEOPLE = 12, ROPES = 5;
export const CW_SHARE = 0.45;
export const COUNTERWEIGHT = CAR + CW_SHARE * CAPACITY;      // 1,450 kg
export const TRIP_SPEED = 2.0, BRAKE_G = 0.6;

export const carMass = (people) => CAR + people * PERSON;
// 馬達要撐住的重量（公斤）；正值＝車廂那邊比較重，負值＝平衡錘那邊比較重
export const imbalance = (people) => carMass(people) - COUNTERWEIGHT;
export const motorLoad = (people, withCounterweight = true) => (withCounterweight ? Math.abs(imbalance(people)) : carMass(people));
export const balancedPeople = () => (COUNTERWEIGHT - CAR) / PERSON;
export const newtons = (kg) => kg * G;
// 每條鋼索自己就撐得住額定載重再加 25%（Wikipedia）
export const ropeCanHold = () => CAPACITY * 1.25;

// 鋼索全斷：自由落下到觸發速度的距離，加上安全裝置煞停的距離（公尺）
export function fallDistance() {
  const free = TRIP_SPEED ** 2 / (2 * G);
  const brake = TRIP_SPEED ** 2 / (2 * BRAKE_G * G);
  return { free, brake, total: free + brake, time: TRIP_SPEED / G + TRIP_SPEED / (BRAKE_G * G) };
}
