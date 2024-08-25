export function valueToTime(value: string | undefined): Date | undefined {
    value = value?.trim();
    if (!value) {
        return undefined;
    } else {
        const split = value.split(":");
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
