import { IActivityLogEntry } from "../../../entities/activity-log";

export interface ITagTally {
    totalHoursForThisTag: number;

    logs: IActivityLogEntry[];
}

export type TagTallies = Record<string, ITagTally>;
