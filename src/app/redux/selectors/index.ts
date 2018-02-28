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

export const configurationState = (state: ApplicationState) => state.configuration;
export const weeklyWorkingHours = createSelector(configurationState, (state) => state.workingHoursPerWeek);


export interface IAttendanceWithTimes extends IAttendanceEntry {
  hours?: number;

  nonWorkingHours?: number;

  overtime?: number;
}

export const attendanceEntriesWithOvertime = createSelector(
  attendanceEntries,
  activityLogEntriesByDay,
  activityTypes,
  configurationState,
  (attendances, entries, types, configuration) => {
    const nonWorkingIds: string[] = [];
    for (const type of types.activities) {
      if (type.isNonWorking) {
        nonWorkingIds.push(type.id);
      }
    }

    const attendancesWithTime: IAttendanceWithTimes[] = [];
    const weeklyHours = configuration.workingHoursPerWeek;
    const dailyHours = weeklyHours / configuration.workingDaysPerWeek;

    for (const attendance of attendances) {

      let hours = 0, nonWorkingHours = 0, overtime = 0;
      if (attendance.start && attendance.end) {
        // calculate break time / non working hours
        const y = attendance.date.getFullYear();
        const m = attendance.date.getMonth();
        const d = attendance.date.getDate();

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
        hours += (((milliseconds / 1000) / 60) / 60);
      }

      let correctionSum = 0;
      if (attendance.corrections) {
        for (const correction of attendance.corrections) {
          if (correction.hours) {
            correctionSum += Number(correction.hours);
          }
        }
      }

      overtime = hours - nonWorkingHours - dailyHours + correctionSum;

      // round appropriately
      const precision = 100;
      hours = Math.round(hours * precision) / precision;
      overtime = Math.round(overtime * precision) / precision;

      attendancesWithTime.push({
        ...attendance,
        hours,
        nonWorkingHours,
        overtime,
      });
    }
    return attendancesWithTime;
  });

export const overtimeSum = createSelector(attendanceEntriesWithOvertime, (times) => {
  return times.map(t => t.overtime).reduce((previous, current) => previous + current, 0);
});
