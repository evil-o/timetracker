import { Action } from '@ngrx/store';

import { IActivityType } from '../../models/interfaces';
import { CreateActivityTypeAction } from '../actions/activityTypesActions';

import { LOG_TIME, ActivityLogAction } from '../actions/activityLogActions';
import { IActivityLog, IActivityLogEntry, ActivityLog, ActivityLogEntry } from '../states/activityLog';
import { INCREMENTAL_MIGRATION, IncrementalMigrationAction } from '../actions/storageVersionActions';

export function activityLogReducer(state: IActivityLog = new ActivityLog, action: ActivityLogAction | IncrementalMigrationAction) {
  switch (action.type) {
    case LOG_TIME:
      return {
        ...state,
        entries: [...state.entries, ActivityLogEntry.createForToday(action.id, action.hoursToLog)],
      };

    case INCREMENTAL_MIGRATION:
      switch (action.currentVersion) {
        default:
          console.log('Unknown or unhandled version ("' + action.currentVersion + '") in incremental update of activity log.');
          return state;
      }

    default:
      return state;
  }
}
