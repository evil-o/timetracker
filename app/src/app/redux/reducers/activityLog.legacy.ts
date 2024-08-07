
import { v4 as uuid } from 'uuid';

import { INCREMENTAL_MIGRATION, IncrementalMigrationAction } from '../actions/storageVersionActions.legacy';
import { ActivityLog, IActivityLog } from '../states/activityLog';
import { activityLogReducer as activityLogReducerNew } from "./activity-log.reducer";

export function activityLogReducer(state: IActivityLog = new ActivityLog, action: IncrementalMigrationAction): IActivityLog {
  switch (action.type) {
    case INCREMENTAL_MIGRATION: {
      const newState = { ...state };

      // check that all log entries have an id
      if (action.currentVersion < 5) {
        for (const entry of newState.entries) {
          if (!entry.id) {
            entry.id = uuid();
          }
        }
      }
      return newState;
    }

    default:
      return activityLogReducerNew(state, action);
  }
}
