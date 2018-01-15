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
  STORAGE_VERSION_MIGRATED
} from '../actions/storageVersionActions';
import { ApplicationState } from '../states/applicationState';
import { StorageVersion } from '../states/storageVersion';

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

  constructor(
    private actions$: Actions,
    private store$: Store<ApplicationState>
  ) { }
}
