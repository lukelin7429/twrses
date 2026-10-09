// 第十六課：溫室效應是什麼？
// 真的數字（Wikipedia “Greenhouse effect”）：沒有溫室效應，地表平均約 −18°C；實際約 15°C；相差 33°C。金星表面約 464°C（Wikipedia “Venus”）。
export const T_NONE = -18, T_TODAY = 15, T_VENUS = 464;
export const WARMING = T_TODAY - T_NONE;
// 模型裡的三種大氣：溫室氣體的多寡（倍數只是示意，用來讓畫面看得出差別）
export const GAS = { none: 0, today: 1, more: 3 };
// 太陽光大約三分之一被反射回太空（中央氣象署 氣候百問 3）
export const REFLECT = 1 / 3;
// 一顆往上走的紅外線小點，穿過大氣層的時候被攔下來的機會（示意）：氣體越多越容易被攔
export const CATCH = 0.5;                                     // today：每穿過一次大約一半被攔
export const catchChance = (mode) => 1 - (1 - CATCH) ** GAS[mode];
// 被攔下來的熱，一半往上、一半往下。所以每一顆從地面出發的熱，最後回到地面的機會是：
export const returnChance = (mode) => catchChance(mode) / 2;
// 一顆熱平均要從地面出發幾次才逃得出去（示意）：1 / (1 − 回到地面的機會)
export const tries = (mode) => 1 / (1 - returnChance(mode));
