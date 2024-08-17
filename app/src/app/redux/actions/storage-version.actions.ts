import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { StateType } from "../states/storage-version";

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
        importStorageFile: props<{ fileContent: string }>(),
        importStorageSuccess: emptyProps(),
    },
});