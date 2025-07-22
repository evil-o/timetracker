export function getWeek(date: Date): number {
    const yearStart = new Date(date.getFullYear(), 0, 1);
    const daysPassedSinceJan1st = Math.floor(
        (date.getTime() - yearStart.getTime()) / 86400000
    );
    const sw = yearStart.getDay();
    const so = sw === 0 ? 6 : sw - 1; // Adjust Sunday (0) to 6 (ISO starts Monday)
    const wn = Math.floor((daysPassedSinceJan1st + so) / 7) + 1;
    return wn;
}
