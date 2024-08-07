import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import {
  CHECK_STORAGE_VERSION,
  CheckStorageVersionAction,
  EXPORT_STORAGE,
  ExportStorageAction,
  ExportStorageSuccessAction,
  INCREMENTAL_MIGRATION,
  INCREMENTAL_MIGRATION_SUCCESS,
  IncrementalMigrationAction,
  IncrementalMigrationSuccessAction,
  PRE_MIGRATION_BACKUP,
  PreMigrationBackupAction,
  PREPARE_INCREMENTAL_MIGRATION,
  PrepareIncrementalMigrationAction,
  STORAGE_VERSION_MIGRATED,
  StorageUpgradeFinishedAction,
  StorageVersionMigratedAction
} from '../actions/storageVersionActions';
import { ApplicationState } from '../states/applicationState';
import { StorageVersion } from '../states/storageVersion';

import { filter, map, withLatestFrom } from 'rxjs';
import { rehydratedStorageKeys } from '../../redux/metaReducers';
import { downloadDataAsFile } from '../../utils/download-data-as-file';
import { makeTimestampedFileName } from '../../utils/file-name';

@Injectable()
export class StorageVersionEffects {
  storageVersionCheck$ = createEffect(() => this.actions$.pipe(
    ofType(CHECK_STORAGE_VERSION, STORAGE_VERSION_MIGRATED),
    map(action => action as CheckStorageVersionAction),
    withLatestFrom(this.store$),
    map(([_action, state]) => {
      if (!state.storageVersion.version || state.storageVersion.version < StorageVersion.CURRENT_VERSION) {
        return new PreMigrationBackupAction();
      } else {
        return new StorageUpgradeFinishedAction();
      }
    }
    ))
  );

  incrementalMigrationComplete$ = createEffect(() => this.actions$.pipe(
    ofType(INCREMENTAL_MIGRATION),
    map(() => new IncrementalMigrationSuccessAction('StorageVersion'))
  ));

  preMigrationBackupComplete$ = createEffect(() => this.actions$.pipe(
    ofType(PRE_MIGRATION_BACKUP),
    map(() => new PrepareIncrementalMigrationAction())
  ));

  incrementalMigrationPrepared$ = createEffect(() => this.actions$.pipe(
    ofType(PREPARE_INCREMENTAL_MIGRATION),
    map(action => action as PrepareIncrementalMigrationAction),
    withLatestFrom(this.store$),
    map(([_action, state]) => {
      return new IncrementalMigrationAction(state.storageVersion.version!);
    })
  ));

  checkMigrationComplete$ = createEffect(() => this.actions$.pipe(
    ofType(INCREMENTAL_MIGRATION_SUCCESS),
    map(action => action as IncrementalMigrationSuccessAction),
    withLatestFrom(this.store$),
    filter(([_action, state]) => state.storageVersion.pendingIncrementalBackups.length <= 0),
    map(([_action, state]) => {
      return new StorageVersionMigratedAction(state.storageVersion.version! + 1 || 1);
    })
  ));

  exportStorage$ = createEffect(() => this.actions$.pipe(
    ofType(EXPORT_STORAGE),
    map(action => action as ExportStorageAction),
    withLatestFrom(this.store$),
    map(([_action, state]) => {
      const downloadName = makeTimestampedFileName("TimeTracker-Export", "json");
      const exportObject: Record<any, any> = {};
      for (const key of Object.values(rehydratedStorageKeys) as (keyof ApplicationState)[]) {
        if (key in state) {
          exportObject[key] = state[key];
        }
      }

      downloadDataAsFile(exportObject, downloadName);
      return new ExportStorageSuccessAction();
    })));

  constructor(
    private actions$: Actions,
    private store$: Store<ApplicationState>
  ) { }
}
