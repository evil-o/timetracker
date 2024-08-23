import { createReducer } from "@ngrx/store";
import { v4 as uuid } from "uuid";
import { produceOn } from "../../../app/utils/ngrx";
import { activityLogActions } from "../../activity-log/models/activity-log.actions";
import { storageVersionActions } from "../../storage-version/models/storage-version.actions";
import { activityTypeActions } from "./activity-types.actions";
import { ActivityTypes } from "./activity-types.state";
import { IActivityType, IActivityTypes } from "./activity-types.types";

function getStateAndEntryForEditing(
    state: IActivityTypes,
    activityTypeId: string
): IActivityType {
    const entry = state.activities.find((e) => e.id === activityTypeId);
    if (!entry) {
        throw new Error(`Activity type ${activityTypeId} not found.`);
    }
    return entry;
}

export const activityTypesReducer = createReducer(
    new ActivityTypes(),

    produceOn(activityTypeActions.create, (draft, { name }) => {
        const newActivity: IActivityType = {
            name: name,
            id: uuid(),
            isNonWorking: false,
            isArchived: false,
        };
        draft.activities.push(newActivity);
    }),

    produceOn(
        activityTypeActions.createAndLogTime,
        (draft, { name, createIfExists }) => {
            if (
                createIfExists ||
                !draft.activities.some((activity) => activity.name === name)
            ) {
                const newActivity: IActivityType = {
                    name,
                    id: uuid(),
                    isNonWorking: false,
                    isArchived: false,
                };
                draft.activities.push(newActivity);
            }
        }
    ),

    produceOn(
        activityTypeActions.setNonWorking,
        (draft, { id, isNonWorking }) => {
            const entry = getStateAndEntryForEditing(draft, id);
            entry.isNonWorking = isNonWorking;
        }
    ),

    produceOn(activityTypeActions.setArchived, (draft, { id, archived }) => {
        const entry = getStateAndEntryForEditing(draft, id);
        entry.isArchived = archived;
    }),

    produceOn(
        activityTypeActions.setColorId,
        (draft, { activityTypeId, colorId }) => {
            const entry = getStateAndEntryForEditing(draft, activityTypeId);
            if (colorId) {
                entry.colorId = colorId;
            } else if (entry.colorId) {
                delete entry.colorId;
            }
        }
    ),

    produceOn(activityTypeActions.import, (draft, { data }) => {
        if (data.activities) {
            for (const activity of data.activities) {
                const match = draft.activities.find(
                    (a) => a.id === activity.id
                );
                if (match) {
                    console.warn(
                        `Skipping duplicate activity id: ${activity.name} = ${match.name} (${activity.id} = ${match.id})`
                    );
                    continue;
                }
                draft.activities.push(activity);
            }
        }
    }),

    produceOn(
        activityLogActions.mergeActivities,
        (draft, { sourceActvityId }) => {
            const idx = draft.activities.findIndex(
                (v) => v.id === sourceActvityId
            );
            if (idx < 0) {
                return;
            }

            draft.activities.splice(idx, 1);
        }
    ),

    produceOn(
        storageVersionActions.incrementalMigration,
        (_draft, { currentVersion }) => {
            switch (currentVersion) {
                default:
                    console.log(
                        'Unknown or unhandled version ("' +
                            currentVersion +
                            '") in incremental update of activity types.'
                    );
                    return;
            }
        }
    )
);
