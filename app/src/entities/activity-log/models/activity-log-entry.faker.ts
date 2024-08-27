import { faker } from "@faker-js/faker";
import { IActivityLogEntry } from "./activity-log.types";

interface ICreateActivityLogEntryArgs {
    date?: Date;
}

export function createActivityLogEntry({
    date,
}: ICreateActivityLogEntryArgs = {}): IActivityLogEntry {
    const entryDate = date ?? faker.date.anytime();
    return {
        actvitiyId: faker.word.verb(),
        id: faker.string.uuid(),
        day: entryDate.getDate(),
        month: entryDate.getMonth(),
        year: entryDate.getFullYear(),
        hours: faker.number.float({ min: 0, max: 24 }),
    };
}
