import { faker } from "@faker-js/faker";
import { writeFileSync } from "node:fs";

export interface IAttendanceCorrection {
    id: string;
    hours: number;
    description: string;
}

export interface IAttendanceEntry {
    // only year, month, day (date) are taken into account; identifies the entry
    date: Date;

    // only hour, minute are taken into account
    start?: Date;
    end?: Date;

    corrections?: IAttendanceCorrection[];
}

export interface IAttendanceState {
    entries: IAttendanceEntry[];
}

export interface IAttendanceStateSlice {
    attendanceState: IAttendanceState;
}

export interface IActivityType {
    name: string;
    id: string;
    isNonWorking: boolean;
    isArchived: boolean;
    colorId?: string;
}

export interface IActivityTypes {
    activities: IActivityType[];
}

export interface IActivityTypesStateSlice {
    activityTypes: IActivityTypes;
}

export interface IActivityLogEntry {
    id: string;
    description?: string;
    actvitiyId: string;
    hours: number;
    day: number;
    month: number;
    year: number;
}

export interface IActivityLog {
    entries: IActivityLogEntry[];
}

export interface IActivityLogStateSlice {
    activityLog: IActivityLog;
}

type Data = IAttendanceStateSlice &
    IActivityTypesStateSlice &
    IActivityLogStateSlice;

function generateEntry(): IAttendanceEntry {
    const date = faker.date.anytime();
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);
    nextDay.setHours(0, 0, 0);
    const start = faker.date.between({ from: date, to: nextDay });
    const end = faker.date.between({ from: start, to: nextDay });
    return {
        date,
        start,
        end,
    };
}

function generateActivityType(): IActivityType {
    return {
        id: faker.string.uuid(),
        isArchived: faker.datatype.boolean(),
        isNonWorking: faker.datatype.boolean(),
        name: faker.word.verb(),
    };
}

function generateActivityLogEntry(
    activities: IActivityType[]
): IActivityLogEntry {
    const date = faker.date.anytime();
    const activity = faker.helpers.arrayElement(activities);
    return {
        actvitiyId: activity.id,
        day: date.getDay(),
        month: date.getMonth(),
        year: date.getFullYear(),
        hours: faker.number.float({ min: 0.1, max: 3 }),
        id: faker.string.uuid(),
        description: faker.lorem.sentence(),
    };
}

function main(): void {
    let data: Data = {
        attendanceState: {
            entries: faker.helpers.multiple(generateEntry, { count: 100 }),
        },
        activityTypes: {
            activities: faker.helpers.multiple(generateActivityType, {
                count: 20,
            }),
        },
        activityLog: {
            entries: [],
        },
    };

    data.activityLog.entries = faker.helpers.multiple(
        () => generateActivityLogEntry(data.activityTypes.activities),
        { count: 500 }
    );
    writeFileSync("data.json", JSON.stringify(data, undefined, 4));
}

main();
