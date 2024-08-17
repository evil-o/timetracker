import * as uuid from 'uuid';

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

export class AttendanceEntry implements IAttendanceEntry {
  public start?: Date;
  public end?: Date;
  public corrections?: IAttendanceCorrection[];

  constructor(public date: Date) { }

  public static equals(a: IAttendanceEntry, b: IAttendanceEntry): boolean {
    return AttendanceEntry.equalsDate(a, b.date);
  }

  public static equalsDate(a: IAttendanceEntry, date: Date): boolean {
    return a.date.getFullYear() === date.getFullYear()
      && a.date.getMonth() === date.getMonth()
      && a.date.getDate() === date.getDate();
  }
}

export class AttendanceState implements IAttendanceState {
  public entries: IAttendanceEntry[] = [];
}
