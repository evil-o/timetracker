export interface IActivityTypeColor {
  id: string;

  bootstrapClass: string;
}

export interface IActivityType {
  name: string;

  id: string;

  isNonWorking: boolean;

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
