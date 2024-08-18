export interface IColorSpec {
    r: number;
    g: number;
    b: number;
}

export interface IActivityTypeColor {
    id: string;

    styleClass: string;

    color?: IColorSpec;
}

export interface IUndefinedActivityTypeColor {
    id: undefined;
    styleClass: undefined;
}

export interface IActivityType {
    name: string;

    id: string;

    isNonWorking: boolean;

    isArchived: boolean;

    colorId?: string;
}

export interface IEntry {
    activityTypeId: string;
    accumulatedSeconds: number;
}

export interface IWeek {
    calendarWeekNumber: number;

    year: number;

    entries: IEntry[];
}
