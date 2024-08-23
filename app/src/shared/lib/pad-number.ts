export function padNumber(num: number, minLength = 2, padding = "0") {
    let numStr = `${num}`;
    const diff = minLength - numStr.length;
    if (diff > 0) {
        numStr = padding.repeat(diff) + numStr;
    }
    return numStr;
}
