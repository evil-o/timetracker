import * as uuid from 'uuid';

export interface IActivityLogEntry {
  id: string;

  actvitiyId: string;

  hours: number;

  day: number;

  month: number;

  year: number;
}

export interface IActivityLog {
  entries: IActivityLogEntry[];
}

export class ActivityLogEntry implements IActivityLogEntry {
  public id: string;

  public actvitiyId: string;

  public hours: number;

  public day: number;

  public month: number;

  public year: number;

  public static createForToday(activityId: string, hours: number) {
    const now = new Date();
    return {
      id: uuid(),
      day: now.getDate(),
      month: now.getMonth(),
      year: now.getFullYear(),
      hours: hours,
      actvitiyId: activityId,
    };
  }
}

export class ActivityLog implements IActivityLog {
  public entries: IActivityLogEntry[] = [];
}
