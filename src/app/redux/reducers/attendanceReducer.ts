import { v4 as uuid } from 'uuid';

import { produce } from 'immer';
import {
  AttendanceAction,
  CREATE_CORRECTION,
  DELETE_ATTENDANCE_ENTRY,
  DELETE_CORRECTION,
  IMPORT_ATTENDANCE,
  SET_END_TIME,
  SET_START_AND_END_TIME,
  SET_START_TIME,
  UPDATE_CORRECTION
} from '../actions/attendanceActions';
import { AttendanceEntry, AttendanceState, IAttendanceEntry, IAttendanceState } from '../states/attendanceState';

function findEntry(forDate: Date, entries: IAttendanceEntry[]): IAttendanceEntry | undefined {
  return entries.find(e => AttendanceEntry.equalsDate(e, forDate));
}

function findEntryIndex(forDate: Date, entries: IAttendanceEntry[]): number {
  return entries.findIndex(e => AttendanceEntry.equalsDate(e, forDate));
}

export function attendanceStateReducer(state: IAttendanceState = new AttendanceState, action: AttendanceAction): IAttendanceState {
  switch (action.type) {
    case SET_START_AND_END_TIME: {
      return produce(state, (draft) => {
        let entry = findEntry(action.date, draft.entries);
        if (!entry) {
          entry = new AttendanceEntry(action.date);
          draft.entries.push(entry);
        }
        entry.start = action.start;
        entry.end = action.end;
      });
    }

    case SET_START_TIME:
      case SET_END_TIME: {
      return produce(state, (draft) => {
        let entry = findEntry(action.date, draft.entries);
        if (!entry) {
          entry = new AttendanceEntry(action.date);
          draft.entries.push(entry);
        }
        if (action.type === SET_START_TIME) {
          entry.start = action.start;
        } else if (action.type === SET_END_TIME) {
          entry.end = action.end;
        }
      });
    }

    case DELETE_ATTENDANCE_ENTRY: {
      const newState = { ...state };
      const idx = findEntryIndex(action.date, newState.entries);
      if (idx >= 0) {
        newState.entries.splice(idx, 1);
      }
      return newState;
    }

    case CREATE_CORRECTION: {
      const newState = { ...state, entries: [...state.entries.map(v => ({ ...v }))] };
      let entry = newState.entries.find(
        v => v.date.getFullYear() === action.year && v.date.getMonth() === action.month && v.date.getDate() === action.day
      );
      if (!entry) {
        entry = {
          date: new Date(action.year, action.month, action.day),
          corrections: [],
        };
        newState.entries.push(entry);
      }
      if (!entry.corrections) {
        entry.corrections = [];
      } else {
        entry.corrections = [...entry.corrections];
      }
      entry.corrections.push({
        id: uuid(),
        description: '',
        hours: 0,
      });
      return newState;
    }

    case UPDATE_CORRECTION: {
      const newState = { ...state, entries: [...state.entries.map(v => ({ ...v }))] };
      const entry = newState.entries.find(
        v => v.date.getFullYear() === action.year && v.date.getMonth() === action.month && v.date.getDate() === action.day
      );
      if (!entry) {
        console.log(`Could not update correction ${action.id}: no entry found for provided date.`);
        return state;
      }

      entry.corrections = [...(entry.corrections ?? []).map(c => ({ ...c }))];
      const correction = entry.corrections.find(c => c.id === action.id);
      if (!correction) {
        console.log(`Could not update correction ${action.id}: id not found.`);
        return state;
      }

      correction.hours = Number(action.newHours);
      correction.description = action.newDescription;

      return newState;
    }

    case DELETE_CORRECTION: {
      const newState = { ...state, entries: [...state.entries] };
      const entry = newState.entries.find(
        v => v.date.getFullYear() === action.year && v.date.getMonth() === action.month && v.date.getDate() === action.day
      );
      if (!entry) {
        console.log(`Could not delete correction ${action.id}: no entry found for provided date.`);
        return state;
      }

      entry.corrections = [...(entry.corrections ?? [])];
      const correctionIndex = entry.corrections.findIndex(c => c.id === action.id);
      if (correctionIndex < 0) {
        console.log(`Could not delete correction ${action.id}: id not found.`);
        return state;
      }

      entry.corrections.splice(correctionIndex, 1);

      return newState;
    }

    case IMPORT_ATTENDANCE: {
      const newEntries = [...state.entries];

      // merge imported attendances into new ones
      for (const entry of action.data.entries) {
        const matchingEntry = findEntry(new Date(entry.date), newEntries);
        if (matchingEntry !== undefined) {
          console.warn('OVERWRITING attendance entry for', matchingEntry.date.toLocaleDateString());
          // overwrite if there is already an entry
          matchingEntry.start = entry.start;
          matchingEntry.end = entry.end;
          matchingEntry.corrections = entry.corrections;
        } else {
          // add a new entry
          // tslint:disable-next-line: no-console
          console.info('Adding attendance entry for', entry.date.toLocaleDateString());
          newEntries.push({ ...entry });
        }
      }

      return { ...state, entries: newEntries };
    }

    default:
      return state;
  }
}
