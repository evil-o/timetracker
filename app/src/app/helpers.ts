export function padNumber(num: number, minLength: number = 2, padding = '0') {
  let numStr = `${num}`;
  const diff = minLength - numStr.length;
  if (diff > 0) {
    numStr = padding.repeat(diff) + numStr;
  }
  return numStr;
}

export function valueToTime(value: string | undefined): Date | undefined {
  value = value?.trim();
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

export function stringToDuration(durationStr: string): number | undefined {
  let hoursNumber: number | undefined;

  const newHours = Number(durationStr.replace(',', '.'));
  if (!Number.isNaN(newHours)) {
    hoursNumber = newHours;
  } else if (durationStr.includes(':')) {
    const split = durationStr.split(':');
    if (split.length === 2) {
      const hours = Number(split[0]);
      const minutes = Number(split[1]);
      if (!Number.isNaN(hours) && !Number.isNaN(minutes)) {
        hoursNumber = hours + minutes / 60;
      }
    }
  }

  return hoursNumber;
}

export function getFirstDayOfCalendarWeek(year: number, calendarWeek: number): Date {
  return new Date(year, 0, 1 + 7 * (calendarWeek - 1));
}
