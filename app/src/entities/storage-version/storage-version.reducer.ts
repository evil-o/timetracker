import { createReducer, on } from "@ngrx/store";
import { produceOn } from "../../app/utils/ngrx";
import { storageVersionActions } from "./storage-version.actions";
import { StorageVersion } from "./storage-version.state";

interface IV3Storage {
    storageIsUpdating?: boolean;
    updateComplete?: boolean;
}

export const storageVersionReducer = createReducer(
    new StorageVersion(),

    on(storageVersionActions.preMigrationBackup, (state) => {
        return {
            ...state,
            previousStateBackup: { ...state },
        };
    }),

    produceOn(storageVersionActions.prepareIncrementalMigration, (draft) => {
        draft.upgradeComplete = false;
        draft.pendingIncrementalBackups = [
            "ActivityLogState",
            "ActivityTypesState",
            "StorageVersion",
        ];
    }),

    produceOn(
        storageVersionActions.incrementalMigration,
        (draft, { currentVersion }) => {
            switch (currentVersion) {
                case 3: {
                    const v3data = draft as unknown as IV3Storage;
                    if (v3data.storageIsUpdating) {
                        delete v3data.storageIsUpdating;
                    }
                    if (v3data.updateComplete) {
                        delete v3data.updateComplete;
                    }
                    return;
                }

                default:
                    console.log(
                        'Unknown or unhandled version ("' +
                            currentVersion +
                            '") in incremental update of activity log.'
                    );
                    return;
            }
        }
    ),

    produceOn(
        storageVersionActions.incrementalMigrationSuccess,
        (draft, { updatedState }) => {
            const index = draft.pendingIncrementalBackups.indexOf(updatedState);
            if (index >= 0) {
                draft.pendingIncrementalBackups.splice(index, 1);
            }
        }
    ),

    produceOn(
        storageVersionActions.storageVersionMigrated,
        (draft, { newVersion }) => {
            draft.version = newVersion;
        }
    ),

    produceOn(storageVersionActions.storageUpgradeFinished, (draft) => {
        draft.upgradeComplete = true;
    })
);
