import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";

import { filter, map, withLatestFrom } from "rxjs";
import { rehydratedStorageKeys } from "../../../shared/config";
import { downloadDataAsFile } from "../../../shared/lib";
import { makeTimestampedFileName } from "../lib/file-name";
import { storageVersionActions } from "./storage-version.actions";
import {
    IStorageVersionStateSlice,
    StorageVersion,
} from "./storage-version.state";

type StoreModel = IStorageVersionStateSlice & Record<string, unknown>;

@Injectable()
export class StorageVersionEffects {
    public storageVersionCheck$ = createEffect(() =>
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

    public incrementalMigrationComplete$ = createEffect(() =>
        this.actions$.pipe(
            ofType(storageVersionActions.incrementalMigration),
            map(() =>
                storageVersionActions.incrementalMigrationSuccess({
                    updatedState: "StorageVersion",
                })
            )
        )
    );

    public preMigrationBackupComplete$ = createEffect(() =>
        this.actions$.pipe(
            ofType(storageVersionActions.preMigrationBackup),
            map(() => storageVersionActions.prepareIncrementalMigration())
        )
    );

    public incrementalMigrationPrepared$ = createEffect(() =>
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

    public checkMigrationComplete$ = createEffect(() =>
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

    public exportStorage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(storageVersionActions.exportStorage),
            withLatestFrom(this.store$),
            map(([_action, state]) => {
                const downloadName = makeTimestampedFileName(
                    "TimeTracker-Export",
                    "json"
                );
                const exportObject: Partial<Record<string, unknown>> = {};
                for (const key of Object.values(rehydratedStorageKeys)) {
                    if (key in state) {
                        exportObject[key] = state[key];
                    }
                }

                downloadDataAsFile(exportObject, downloadName);
                return storageVersionActions.exportStorageSuccess();
            })
        )
    );

    public constructor(
        private actions$: Actions,
        private store$: Store<StoreModel>
    ) {}
}
