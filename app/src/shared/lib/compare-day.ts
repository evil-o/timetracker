export interface IDayReference {
    year: number;
    month: number;
    day: number;
}

/**
 * Returns true if both date and date reference refer to the same day.
 */
export function compareDatesWithDayReference(
    date: Date,
    dayReference: IDayReference
): boolean {
    return (
        date.getFullYear() === dayReference.year &&
        date.getMonth() === dayReference.month &&
        date.getDate() === dayReference.day
    );
}

/**
 * Returns true if both dates refer to the same day.
 */
export function compareDateDays(date1: Date, date2: Date): boolean {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}
