export function stringToDuration(durationStr: string): number | undefined {
    let hoursNumber: number | undefined;

    const newHours = Number(durationStr.replace(",", "."));
    if (!Number.isNaN(newHours)) {
        hoursNumber = newHours;
    } else if (durationStr.includes(":")) {
        const split = durationStr.split(":");
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
