import { BehaviorSubject } from "rxjs";
import { IActivityLogEntry } from "../../../entities/activity-log";

export interface IDayEntry {
    dayOfTheWeek: number;

    date: Date;

    name: string;

    // TODO: should not be a subject
    entries$: BehaviorSubject<IActivityLogEntry[]>;
}
