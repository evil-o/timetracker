import { faker } from "@faker-js/faker";
import { IActivityLogEntry } from "./activity-log.types";

export function createActivityLogEntry(): IActivityLogEntry {
    const date = faker.date.anytime();
    return {
        actvitiyId: faker.word.verb(),
        id: faker.string.uuid(),
        day: date.getDay(),
        month: date.getMonth(),
        year: date.getFullYear(),
        hours: faker.number.float({ min: 0 }),
    };
}
