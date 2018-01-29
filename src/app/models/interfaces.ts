export interface IActivityType {
  name: string;

  id: string;

  isNonWorking: boolean;
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
