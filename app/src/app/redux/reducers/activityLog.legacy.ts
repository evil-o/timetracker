
import { v4 as uuid } from 'uuid';

import { ActivityLogAction, DELETE_ENTRY, IMPORT_ACTIVITIES, LOG_TIME, MERGE_ACTIVITIES, SET_DESCRIPTION, SET_HOURS } from '../actions/activityLogActions.legacy';
import { INCREMENTAL_MIGRATION, IncrementalMigrationAction } from '../actions/storageVersionActions.legacy';
import { ActivityLog, ActivityLogEntry, IActivityLog } from '../states/activityLog';

export function activityLogReducer(state: IActivityLog = new ActivityLog, action: ActivityLogAction | IncrementalMigrationAction): IActivityLog {
  switch (action.type) {
    case LOG_TIME:
      const newEntry = ActivityLogEntry.createForDay(action.id, action.hoursToLog, action.date, action.description);
      return {
        ...state,
        entries: [...state.entries, newEntry],
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

    case IMPORT_ACTIVITIES: {
      const entries = [...state.entries];
      if (action.data.entries) {
        entries.push(...action.data.entries);
      }
      return { ...state, entries };
    }

    default:
      return state;
  }
}
