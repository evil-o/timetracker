import { Action } from '@ngrx/store';

import { IActivityType } from '../../models/interfaces';
import { CreateActivityTypeAction } from '../actions/activityTypesActions';

import { LOG_TIME, ActivityLogAction } from '../actions/activityLogActions';
import { IActivityLog, IActivityLogEntry, ActivityLog, ActivityLogEntry } from '../states/activityLog';

export function activityLogReducer(state: IActivityLog = new ActivityLog, action: ActivityLogAction) {
  switch (action.type) {
    case LOG_TIME:
      return {
        ...state,
        entries: [...state.entries, ActivityLogEntry.createForToday(action.id, action.hoursToLog)],
      };

    default:
      return state;
  }
}
