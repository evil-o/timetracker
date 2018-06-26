export interface IActivityTypeColor {
  id: string;

  styleClass: string;
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
