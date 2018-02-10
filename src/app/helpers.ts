export function padNumber(num: number, minLength: number = 2, padding = '0') {
  let numStr = `${num}`;
  const diff = minLength - numStr.length;
  if (diff > 0) {
    numStr = padding.repeat(diff) + numStr;
  }
  return numStr;
}

export function valueToTime(value: string | undefined): Date | undefined {
  value = value.trim();
  if (!value) {
    return undefined;
  } else {
    const split = value.split(':');
    if (split.length !== 2) {
      return undefined;
    }
    const hours = Number(split[0]);
    const minutes = Number(split[1]);
    if (Number.isNaN(hours) || Number.isNaN(minutes)) {
      return undefined;
    }

    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    return date;
  }
}

export function dateToTimeInputValue(date: Date) {
  return `${padNumber(date.getHours())}:${padNumber(date.getMinutes())}`;
}
