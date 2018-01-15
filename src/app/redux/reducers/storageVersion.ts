import { Action } from '@ngrx/store';

import { CreateActivityTypeAction } from '../actions/activityTypesActions';

import {
  CHECK_STORAGE_VERSION,
  StorageVersionAction,
  PRE_MIGRATION_BACKUP,
  INCREMENTAL_MIGRATION,
  PREPARE_INCREMENTAL_MIGRATION,
  INCREMENTAL_MIGRATION_SUCCESS,
  STORAGE_VERSION_MIGRATED,
  STORAGE_UPGRADE_FINISHED,
} from '../actions/storageVersionActions';
import { IStorageVersion, StorageVersion } from '../states/storageVersion';

export function storageVersionReducer(state: IStorageVersion = new StorageVersion(), action: StorageVersionAction): IStorageVersion {
  switch (action.type) {

    case PRE_MIGRATION_BACKUP:
      return {
        ...state,
        previousStateBackup: { ...state },
      };

    case PREPARE_INCREMENTAL_MIGRATION:
      return {
        ...state,
        upgradeComplete: false,
        pendingIncrementalBackups: [
          'ActivityLogState',
          'ActivityTypesState',
          'StorageVersion'
        ],
      };

    case INCREMENTAL_MIGRATION:
      switch (action.currentVersion) {
        case 3: {
          const newState = { ...state } as any;

          if (newState.storageIsUpdating) {
            delete newState.storageIsUpdating;
          }
          if (newState.updateComplete) {
            delete newState.updateComplete;
          }

          return newState;
        }

        default:
          console.log('Unknown or unhandled version ("' + action.currentVersion + '") in incremental update of activity log.');
          return state;
      }

    case INCREMENTAL_MIGRATION_SUCCESS:
      const newPending = [...state.pendingIncrementalBackups];
      const index = newPending.indexOf(action.updatedState);
      if (index >= 0) {
        newPending.splice(index, 1);
      }
      return {
        ...state,
        pendingIncrementalBackups: newPending
      };

    case STORAGE_VERSION_MIGRATED:
      return {
        ...state,
        version: action.newVersion,
      };

    case STORAGE_UPGRADE_FINISHED:
      return {
        ...state,
        upgradeComplete: true,
      };

    default:
      return state;
  }
}
