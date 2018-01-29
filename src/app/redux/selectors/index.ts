import { createSelector } from '@ngrx/store';
import { ApplicationState } from '../states/applicationState';
import { IActivityLogEntry } from '../states/activityLog';
import { IAttendanceEntry } from '../states/attendanceState';

export const activityTypes = (state: ApplicationState) => state.activityTypes;

export const activityLog = (state: ApplicationState) => state.activityLog;
export const activityLogEntries = createSelector(activityLog, (state) => state.entries);
export const activityLogEntriesByDay = createSelector(activityLogEntries, (entries) => {
  const byDay = {};
  for (const entry of entries) {
    if (!(entry.year in byDay)) {
      byDay[entry.year] = {};
    }

    if (!(entry.month in byDay[entry.year])) {
      byDay[entry.year][entry.month] = {};
    }

    if (!(entry.day in byDay[entry.year][entry.month])) {
      byDay[entry.year][entry.month][entry.day] = [entry];
    } else {
      byDay[entry.year][entry.month][entry.day].push(entry);
    }
  }
  return byDay;
});

export const storageVersion = (state: ApplicationState) => state.storageVersion;

export const attendanceState = (state: ApplicationState) => state.attendanceState;
export const attendanceEntries = createSelector(attendanceState, (state) => state.entries);


export interface IAttendanceWithTimes extends IAttendanceEntry {
  hours?: number;

  nonWorkingHours?: number;

  overtime?: number;
}

export const attendanceEntriesWithOvertime = createSelector(
  attendanceEntries,
  activityLogEntriesByDay,
  activityTypes,
  (attendances, entries, types) => {
    const nonWorkingIds: string[] = [];
    for (const type of types.activities) {
      // TODO add a non-working flag instead.
      if (type.name === 'Pause') {
        nonWorkingIds.push(type.id);
      }
    }

    const attendancesWithTime: IAttendanceWithTimes[] = [];
    // TODO make configurable
    const weeklyHours = 40.0;
    const dailyHours = weeklyHours / 5.0;

    for (const attendance of attendances) {

      let hours: number, nonWorkingHours: number, overtime: number;
      if (attendance.start && attendance.end) {
        // calculate break time / non working hours
        const y = attendance.date.getFullYear();
        const m = attendance.date.getMonth();
        const d = attendance.date.getDate();
        nonWorkingHours = 0;
        if (y in entries && m in entries[y] && d in entries[y][m]) {
          for (const e of entries[y][m][d]) {
            const entry = e as IActivityLogEntry;
            if (nonWorkingIds.includes(entry.actvitiyId)) {
              nonWorkingHours += entry.hours;
            }
          }
        }

        // calculate working hours etc.
        const milliseconds = attendance.end.getTime() - attendance.start.getTime();
        hours = (((milliseconds / 1000) / 60) / 60);

        overtime = hours - nonWorkingHours - dailyHours;

        // round appropriately
        const precision = 100;
        hours = Math.round(hours * precision) / precision;
        overtime = Math.round(overtime * precision) / precision;
      }

      attendancesWithTime.push({
        ...attendance,
        hours,
        nonWorkingHours,
        overtime,
      });
    }
    return attendancesWithTime;
  });
