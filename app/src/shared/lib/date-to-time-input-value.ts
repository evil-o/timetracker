import { padNumber } from "./pad-number";

export function dateToTimeInputValue(date: Date) {
    return `${padNumber(date.getHours())}:${padNumber(date.getMinutes())}`;
}
