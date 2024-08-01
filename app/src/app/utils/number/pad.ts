/**
 * Pads a number to a string with a fixed width
 */
export function padNumber(n: number, width = 2, fill = '0'): string {
    let n_str = `${n}`;
    if (n_str.length < width) {
        n_str = fill.repeat(width - n_str.length) + n_str;
    }
    return n_str;
}