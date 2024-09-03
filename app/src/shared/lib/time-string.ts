import { padNumber } from "./pad-number";

/**
 * Converts the hours and minutes of a Date object to a presentable string.
 */
export function dateHoursMinutesToString(hours?: Date): string {
    return hours ? hours.getHours() + ":" + padNumber(hours.getMinutes()) : "-";
}
