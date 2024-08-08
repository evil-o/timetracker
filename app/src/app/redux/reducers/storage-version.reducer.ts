import { createReducer, on } from '@ngrx/store';
import { produceOn } from '../../utils/ngrx';
import { storageVersionActions } from '../actions/storage-version.actions';
import { StorageVersion } from '../states/storage-version';

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
      'ActivityLogState',
      'ActivityTypesState',
      'StorageVersion'
    ];
  }),

  produceOn(storageVersionActions.incrementalMigration, (draft, { currentVersion }) => {
    switch (currentVersion) {
      case 3: {
        if ((draft as any).storageIsUpdating) {
          delete (draft as any).storageIsUpdating;
        }
        if ((draft as any).updateComplete) {
          delete (draft as any).updateComplete;
        }
        return;
      }

      default:
        console.log('Unknown or unhandled version ("' + currentVersion + '") in incremental update of activity log.');
        return;
    }
  }),

  produceOn(storageVersionActions.incrementalMigrationSuccess, (draft, { updatedState }) => {
    const index = draft.pendingIncrementalBackups.indexOf(updatedState);
    if (index >= 0) {
      draft.pendingIncrementalBackups.splice(index, 1);
    }
  }),

  produceOn(storageVersionActions.storageVersionMigrated, (draft, { newVersion }) => {
    draft.version = newVersion;
  }),

  produceOn(storageVersionActions.storageUpgradeFinished, (draft) => {
    draft.upgradeComplete = true;
  }),
);
