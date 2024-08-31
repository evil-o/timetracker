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
