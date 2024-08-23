import { createReducer } from "@ngrx/store";
import { v4 as uuid } from "uuid";
import { produceOn } from "../../../app/utils/ngrx";
import { storageVersionActions } from "../../storage-version/models/storage-version.actions";
import { activityLogActions } from "./activity-log.actions";
import { ActivityLog, ActivityLogEntry } from "./activity-log.state";

export const activityLogReducer = createReducer(
    new ActivityLog(),

    produceOn(
        activityLogActions.logTime,
        (draft, { id, hoursToLog, date, description }) => {
            const newEntry = ActivityLogEntry.createForDay(
                id,
                hoursToLog,
                date,
                description
            );
            draft.entries.push(newEntry);
        }
    ),

    produceOn(
        activityLogActions.setDescription,
        (draft, { entryId, description }) => {
            const entry = draft.entries.find((e) => e.id === entryId);
            if (entry) {
                entry.description = description;
            }
        }
    ),

    produceOn(activityLogActions.setHours, (draft, { entryId, hours }) => {
        const entry = draft.entries.find((e) => e.id === entryId);
        if (entry) {
            entry.hours = hours;
        }
    }),

    produceOn(activityLogActions.deleteEntry, (draft, { entryId }) => {
        const idx = draft.entries.findIndex((e) => e.id === entryId);
        if (idx >= 0) {
            draft.entries.splice(idx, 1);
        }
    }),

    produceOn(
        activityLogActions.mergeActivities,
        (draft, { sourceActvityId, targetActivityId }) => {
            draft.entries = [
                ...draft.entries.map((v) =>
                    v.actvitiyId === sourceActvityId
                        ? { ...v, actvitiyId: targetActivityId }
                        : v
                ),
            ];
        }
    ),

    produceOn(activityLogActions.importActivities, (draft, { data }) => {
        if (data.entries) {
            draft.entries.push(...data.entries);
        }
    }),

    produceOn(
        storageVersionActions.incrementalMigration,
        (draft, { currentVersion }) => {
            // check that all log entries have an id
            if (currentVersion < 5) {
                for (const entry of draft.entries) {
                    if (!entry.id) {
                        entry.id = uuid();
                    }
                }
            }
        }
    )
);
