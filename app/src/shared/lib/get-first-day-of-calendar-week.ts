export function getFirstDayOfCalendarWeek(
    year: number,
    calendarWeek: number
): Date {
    return new Date(year, 0, 1 + 7 * (calendarWeek - 1));
}
