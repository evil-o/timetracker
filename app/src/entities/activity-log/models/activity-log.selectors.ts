import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IActivityLog, IActivityLogEntry } from "./activity-log.types";

const allActivities = createFeatureSelector<IActivityLog>("activityLog");
const activityLogEntries = createSelector(
    allActivities,
    (state) => state?.entries
);
const activityLogEntriesByDay = createSelector(
    activityLogEntries,
    (entries) => {
        const byDay: Record<
            number,
            Record<number, Record<number, IActivityLogEntry[]>>
        > = {};
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
    }
);

export const fromActivityLog = {
    allActivities,
    activityLogEntries,
    activityLogEntriesByDay,
};
