import { v4 as uuid } from "uuid";
import {
    IActivityLog,
    IActivityLogEntry,
} from "../../../entities/activity-log/activity-log.types";

export class ActivityLogEntry implements IActivityLogEntry {
    public id!: string;

    public description?: string;

    public actvitiyId!: string;

    public hours!: number;

    public day!: number;

    public month!: number;

    public year!: number;

    public static createForDay(
        activityId: string,
        hours: number,
        date: Date,
        description?: string
    ): IActivityLogEntry {
        // normalize empty string, null, ... to undefined
        if (!description) {
            description = undefined;
        }

        return {
            id: uuid(),
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
            hours: hours,
            actvitiyId: activityId,
            description: description,
        };
    }
}

export class ActivityLog implements IActivityLog {
    public entries: IActivityLogEntry[] = [];
}
