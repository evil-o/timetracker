import { createSelector } from "@ngrx/store";
import { activityTypes, attendanceEntries } from "../../app/redux/selectors";
import { fromActivityLog } from "../activity-log/activity-log.selectors";
import { IActivityLogEntry } from "../activity-log/activity-log.types";
import { IAttendanceEntry } from "../attendance/attendance.state";
import { fromConfiguration } from "../configuration/configuration.selectors";

// TODO: move to models?
export interface IAttendanceWithTimes extends IAttendanceEntry {
    hours?: number;

    nonWorkingHours?: number;

    overtime?: number;
}

const attendanceEntriesWithOvertime = createSelector(
    attendanceEntries,
    fromActivityLog.activityLogEntriesByDay,
    activityTypes,
    fromConfiguration.getState,
    (attendances, entries, types, configuration) => {
        const nonWorkingIds: string[] = [];
        for (const type of types.activities) {
            if (type.isNonWorking) {
                nonWorkingIds.push(type.id);
            }
        }

        const attendancesWithTime: IAttendanceWithTimes[] = [];
        const weeklyHours = configuration.workingHoursPerWeek || 40;
        const dailyHours =
            weeklyHours / (configuration.workingDaysPerWeek || 5);

        for (const attendance of attendances) {
            let hours = 0,
                nonWorkingHours = 0,
                overtime = 0;
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
                const milliseconds =
                    attendance.end.getTime() - attendance.start.getTime();
                hours += milliseconds / 1000 / 60 / 60;
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
    }
);

const overtimeSum = createSelector(attendanceEntriesWithOvertime, (times) => {
    return times
        .map((t) => t.overtime)
        .reduce((previous, current) => (previous ?? 0) + (current ?? 0), 0);
});

export const fromApplication = {
    attendanceEntriesWithOvertime,
    overtimeSum,
};
