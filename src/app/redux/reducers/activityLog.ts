import { Action } from '@ngrx/store';

import * as uuid from 'uuid';

import { IActivityType } from '../../models/interfaces';
import { CreateActivityTypeAction } from '../actions/activityTypesActions';

import { LOG_TIME, ActivityLogAction, SET_DESCRIPTION, SET_HOURS, DELETE_ENTRY, MERGE_ACTIVITIES } from '../actions/activityLogActions';
import { IActivityLog, IActivityLogEntry, ActivityLog, ActivityLogEntry } from '../states/activityLog';
import { INCREMENTAL_MIGRATION, IncrementalMigrationAction } from '../actions/storageVersionActions';

export function activityLogReducer(state: IActivityLog = new ActivityLog, action: ActivityLogAction | IncrementalMigrationAction) {
  switch (action.type) {
    case LOG_TIME:
      return {
        ...state,
        entries: [...state.entries, ActivityLogEntry.createForDay(action.id, action.hoursToLog, action.date, action.description)],
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
      const entries = state.entries.splice(0);
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
      const entries = state.entries.splice(0);
      const entry = entries.find((e) => e.id === action.entryId);
      if (entry) {
        entry.hours = action.hours;
      }
      return {
        ...state,
        entries,
      };
    }

    case DELETE_ENTRY: {
      const entries = [...state.entries];
      const idx = entries.findIndex(e => e.id === action.entryId);
      if (idx >= 0) {
        entries.splice(idx, 1);
      }

      return {
        ...state,
        entries,
      };
    }

    case MERGE_ACTIVITIES: {
      const entries = [
        ...state.entries.map(v => v.actvitiyId === action.sourceActvityId ? { ...v, actvitiyId: action.targetActivityId } : v),
      ];
      return { ...state, entries };
    }

    default:
      return state;
  }
}
