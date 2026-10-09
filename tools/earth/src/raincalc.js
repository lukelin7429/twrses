// 第六課：為什麼會下雨？
// 空氣上升會變冷：平均每升高 1 公里約降 6.5°C（中央氣象署 氣象常識「大氣之垂直溫度變化」）；
// 翻過山、往下降時被壓縮增溫：每下降 100 公尺約升 1°C（氣象常識「焚風」）。
export const LAPSE_UP = 6.5, LAPSE_DOWN = 10;
// 露點（空氣要降到幾度才飽和）：簡易估算，相對溼度每少 5%，露點比氣溫低 1°C（維基百科 Dew point；相對溼度 50% 以上才準）
export const dewPoint = (T, rh) => T - (100 - rh) / 5;
// 雲底高度（公尺）：氣溫和露點每差 1°C，雲底約高 125 公尺（維基百科 Cloud base）
export const cloudBase = (T, rh) => 125 * (T - dewPoint(T, rh));
export const tempAt = (T0, km) => T0 - LAPSE_UP * km;
// 翻過高度 H 公里的山之後，落到背風面平地的氣溫（照氣象署「焚風」的簡化說法）
export const leeTemp = (T0, H) => T0 - LAPSE_UP * H + LAPSE_DOWN * H;
// 同樣體積的空氣，溫度每增加 11°C，能容納的水氣約多一倍（氣象常識「大氣中之水氣」）
export const holds = (T, Tref = 20) => 2 ** ((T - Tref) / 11);
// 山有多高（示例）、會不會在迎風面成雲降雨
export const MOUNTAIN_KM = 2.5;
export const rains = (T, rh, H = MOUNTAIN_KM) => cloudBase(T, rh) < H * 1000;
// 雨量：1 毫米的雨落在 1 平方公尺上＝1 公升
export const liters = (mm, m2) => mm * m2;
// 中央氣象署的雨量分級（24 小時累積雨量，毫米）
export const CLASSES = [{ key: 'none', min: 0 }, { key: 'heavy', min: 80 }, { key: 'extreme', min: 200 }, { key: 'torrential', min: 350 }, { key: 'super', min: 500 }];
export const rainClass = (mm) => [...CLASSES].reverse().find((c) => mm >= c.min).key;
