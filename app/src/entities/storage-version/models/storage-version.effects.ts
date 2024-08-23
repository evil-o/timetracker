import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";

import { filter, map, withLatestFrom } from "rxjs";
import { downloadDataAsFile } from "../../../shared/lib";
import { rehydratedStorageKeys } from "../../application/meta-reducers";
import { ApplicationState } from "../../application/models/application.model";
import { makeTimestampedFileName } from "../lib/file-name";
import { storageVersionActions } from "./storage-version.actions";
import { StorageVersion } from "./storage-version.state";

@Injectable()
export class StorageVersionEffects {
    storageVersionCheck$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                storageVersionActions.checkStorageVersion,
                storageVersionActions.storageVersionMigrated
            ),
            withLatestFrom(this.store$),
            map(([_action, state]) => {
                if (
                    !state.storageVersion.version ||
                    state.storageVersion.version <
                        StorageVersion.CURRENT_VERSION
                ) {
                    return storageVersionActions.preMigrationBackup();
                } else {
                    return storageVersionActions.storageUpgradeFinished();
                }
            })
        )
    );

    incrementalMigrationComplete$ = createEffect(() =>
        this.actions$.pipe(
            ofType(storageVersionActions.incrementalMigration),
            map(() =>
                storageVersionActions.incrementalMigrationSuccess({
                    updatedState: "StorageVersion",
                })
            )
        )
    );

    preMigrationBackupComplete$ = createEffect(() =>
        this.actions$.pipe(
            ofType(storageVersionActions.preMigrationBackup),
            map(() => storageVersionActions.prepareIncrementalMigration())
        )
    );

    incrementalMigrationPrepared$ = createEffect(() =>
        this.actions$.pipe(
            ofType(storageVersionActions.prepareIncrementalMigration),
            withLatestFrom(this.store$),
            map(([_action, state]) => {
                return storageVersionActions.incrementalMigration({
                    currentVersion: state.storageVersion.version!,
                });
            })
        )
    );

    checkMigrationComplete$ = createEffect(() =>
        this.actions$.pipe(
            ofType(storageVersionActions.incrementalMigrationSuccess),
            withLatestFrom(this.store$),
            filter(
                ([_action, state]) =>
                    state.storageVersion.pendingIncrementalBackups.length <= 0
            ),
            map(([_action, state]) => {
                return storageVersionActions.storageVersionMigrated({
                    newVersion: (state.storageVersion.version ?? 0)! + 1,
                });
            })
        )
    );

    exportStorage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(storageVersionActions.exportStorage),
            withLatestFrom(this.store$),
            map(([_action, state]) => {
                const downloadName = makeTimestampedFileName(
                    "TimeTracker-Export",
                    "json"
                );
                const exportObject: Partial<
                    Record<
                        keyof ApplicationState,
                        ApplicationState[keyof ApplicationState]
                    >
                > = {};
                for (const key of Object.values(
                    rehydratedStorageKeys
                ) as (keyof ApplicationState)[]) {
                    if (key in state) {
                        exportObject[key] = state[key];
                    }
                }

                downloadDataAsFile(exportObject, downloadName);
                return storageVersionActions.exportStorageSuccess();
            })
        )
    );

    constructor(
        private actions$: Actions,
        private store$: Store<ApplicationState>
    ) {}
}
