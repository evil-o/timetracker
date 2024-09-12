import { getFirstDayOfCalendarWeek } from "./get-first-day-of-calendar-week";

export function getLastDayOfCalendarWeek(
    year: number,
    calendarWeek: number
): Date {
    const date = getFirstDayOfCalendarWeek(year, calendarWeek);
    date.setDate(date.getDate() + 6);
    return date;
}
