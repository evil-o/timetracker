import { Action } from '@ngrx/store';

import { AttendanceAction, SET_START_TIME, SET_END_TIME } from '../actions/attendanceActions';
import { IAttendanceState, AttendanceState, IAttendanceEntry, AttendanceEntry } from '../states/attendanceState';
import { DELETE_ENTRY } from '../actions/activityLogActions';

function findEntry(forDate: Date, entries: IAttendanceEntry[]): IAttendanceEntry | undefined {
  return entries.find(e => AttendanceEntry.equalsDate(e, forDate));
}

function findEntryIndex(forDate: Date, entries: IAttendanceEntry[]): number {
  return entries.findIndex(e => AttendanceEntry.equalsDate(e, forDate));
}

export function attendanceStateReducer(state: IAttendanceState = new AttendanceState, action: AttendanceAction) {
  switch (action.type) {
    case SET_START_TIME:
    case SET_END_TIME: {
      const newState = { ...state, entries: [...state.entries] };

      let entry = findEntry(action.date, newState.entries);
      if (!entry) {
        entry = new AttendanceEntry(action.date);
        newState.entries.push(entry);
      }
      if (action.type === SET_START_TIME) {
        entry.start = action.start;
      } else if (action.type === SET_END_TIME) {
        entry.end = action.end;
      }

      return newState;
    }

    case DELETE_ENTRY: {
      const newState = {...state};
      const idx = findEntryIndex(action.date, newState.entries);
      if (idx >= 0) {
        newState.entries.splice(idx, 1);
      }
      return newState;
    }

    default:
      return state;
  }
}
