import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { StateType } from "./storage-version.state";

export const storageVersionActions = createActionGroup({
    source: "Storage Version",
    events: {
        checkStorageVersion: emptyProps(),
        preMigrationBackup: emptyProps(),
        prepareIncrementalMigration: emptyProps(),
        incrementalMigration: props<{ currentVersion: number }>(),
        incrementalMigrationSuccess: props<{ updatedState: StateType }>(),
        storageVersionMigrated: props<{ newVersion: number }>(),
        storageUpgradeFinished: emptyProps(),
        exportStorage: emptyProps(),
        exportStorageSuccess: emptyProps(),
        importStorageSuccess: emptyProps(),
    },
});
