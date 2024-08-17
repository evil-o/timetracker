import { padNumber } from "../helpers";

export function makeTimestampedFileName(
    baseFileName: string,
    extension: string
): string {
    const now = new Date();
    const paddedDate = `${now.getFullYear()}-${padNumber(now.getMonth() + 1)}-${padNumber(now.getDate())}`;
    const paddedTime = `${padNumber(now.getHours())}.${padNumber(now.getMinutes())}.${padNumber(now.getSeconds())}`;
    return `${baseFileName}-${paddedDate}--${paddedTime}.${extension}`;
}
