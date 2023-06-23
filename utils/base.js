/** 精度处理 */
const precision = function (_value, _digits = 2) {
    // toFixed 会进行 四舍五入, 这里 +1 位 进行截断防止四舍五入
    return +(_value.toFixed(_digits + 1).slice(0, -1));
}
/**
 * 进度值 精度处理
 * note:
 * 1. _progress 进度值 [0,1]
 */
export const fixProgress = function (_progress) {
    let progress = precision(_progress, 4);
    progress = Math.max(progress, 0);
    progress = Math.min(progress, 1.00);
    return progress;
}