import { Action } from '@ngrx/store';

import * as uuid from 'uuid';

import { IActivityType } from '../../models/interfaces';
import { CreateActivityTypeAction } from '../actions/activityTypesActions';

import { LOG_TIME, ActivityLogAction, SET_DESCRIPTION, SET_HOURS } from '../actions/activityLogActions';
import { IActivityLog, IActivityLogEntry, ActivityLog, ActivityLogEntry } from '../states/activityLog';
import { INCREMENTAL_MIGRATION, IncrementalMigrationAction } from '../actions/storageVersionActions';

export function activityLogReducer(state: IActivityLog = new ActivityLog, action: ActivityLogAction | IncrementalMigrationAction) {
  switch (action.type) {
    case LOG_TIME:
      return {
        ...state,
        entries: [...state.entries, ActivityLogEntry.createForToday(action.id, action.hoursToLog)],
      };

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

    case SET_DESCRIPTION: {
      const entries = [...state.entries];
      const entry = entries.find((e) => e.id === action.entryId);
      if (entry) {
        entry.description = action.description;
      }
      return {
        ...state,
        entries,
      };
    }

    case SET_HOURS: {
      const entries = [...state.entries];
      const entry = entries.find((e) => e.id === action.entryId);
      if (entry) {
        entry.hours = action.hours;
      }
      return {
        ...state,
        entries,
      };
    }

    default:
      return state;
  }
}
