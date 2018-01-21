import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/withLatestFrom';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import {
  CHECK_STORAGE_VERSION,
  CheckStorageVersionAction,
  StorageVersionMigratedAction,
  PreMigrationBackupAction,
  PRE_MIGRATION_BACKUP,
  IncrementalMigrationAction,
  PREPARE_INCREMENTAL_MIGRATION,
  PrepareIncrementalMigrationAction,
  INCREMENTAL_MIGRATION,
  INCREMENTAL_MIGRATION_SUCCESS,
  IncrementalMigrationSuccessAction,
  StorageUpgradeFinishedAction,
  STORAGE_VERSION_MIGRATED,
  EXPORT_STORAGE,
  ExportStorageAction,
  ExportStorageSuccessAction
} from '../actions/storageVersionActions';
import { ApplicationState } from '../states/applicationState';
import { StorageVersion } from '../states/storageVersion';

import { rehydratedStorageKeys } from '../../redux/metaReducers';

@Injectable()
export class StorageVersionEffects {

  @Effect() storageVersionCheck$: Observable<Action> = this.actions$
    .ofType(CHECK_STORAGE_VERSION, STORAGE_VERSION_MIGRATED)
    .map(action => action as CheckStorageVersionAction)
    .withLatestFrom(this.store$)
    .map(([action, state]) => {
      if (!state.storageVersion.version || state.storageVersion.version < StorageVersion.CURRENT_VERSION) {
        return new PreMigrationBackupAction();
      } else {
        return new StorageUpgradeFinishedAction();
      }
    });

  @Effect() incrementalMigrationComplete$: Observable<Action> = this.actions$
    .ofType(INCREMENTAL_MIGRATION)
    .map(() => new IncrementalMigrationSuccessAction('StorageVersion'));

  @Effect() preMigrationBackupComplete$: Observable<Action> = this.actions$
    .ofType(PRE_MIGRATION_BACKUP)
    .map(() => new PrepareIncrementalMigrationAction());

  @Effect() incrementalMigrationPrepared$: Observable<Action> = this.actions$
    .ofType(PREPARE_INCREMENTAL_MIGRATION)
    .map(action => action as PrepareIncrementalMigrationAction)
    .withLatestFrom(this.store$)
    .map(([action, state]) => {
      return new IncrementalMigrationAction(state.storageVersion.version);
    });

  @Effect() checkMigrationComplete$: Observable<Action> = this.actions$
    .ofType(INCREMENTAL_MIGRATION_SUCCESS)
    .map(action => action as IncrementalMigrationSuccessAction)
    .withLatestFrom(this.store$)
    .filter(([action, state]) => state.storageVersion.pendingIncrementalBackups.length <= 0)
    .map(([action, state]) => {
      return new StorageVersionMigratedAction(state.storageVersion.version + 1 || 1);
    });

  @Effect() exportStorage$: Observable<Action> = this.actions$
    .ofType(EXPORT_STORAGE)
    .map(action => action as ExportStorageAction)
    .withLatestFrom(this.store$)
    .map(([action, state]) => {
      const pad = (n: number, width = 2, fill = '0') => {
        let n_str = `${n}`;
        if (n_str.length < width) {
          n_str = fill.repeat(width - n_str.length) + n_str;
        }
        return n_str;
      };

      const now = new Date();
      const downloadName = `TimeTracker-Export-${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
        + `--${pad(now.getHours())}.${pad(now.getMinutes())}.${pad(now.getSeconds())}`;
      const exportObject = {};
      for (const key of rehydratedStorageKeys) {
        if (key in state) {
          exportObject[key] = state[key];
        }
      }

      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObject));
      const a = action.blindDownloadAnchor;
      a.setAttribute('href', dataStr);
      a.setAttribute('download', downloadName + '.json');
      a.click();
      return new ExportStorageSuccessAction();
    });

  constructor(
    private actions$: Actions,
    private store$: Store<ApplicationState>
  ) { }
}
