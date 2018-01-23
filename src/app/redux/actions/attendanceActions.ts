import { Action } from '@ngrx/store';

export const SET_START_TIME = 'SET_START_TIME';
export const SET_END_TIME = 'SET_END_TIME';
export const DELETE_ENTRY = 'DELETE_ENTRY';

export class SetStartTimeAction implements Action {
  public readonly type = SET_START_TIME;

  // start is a combination of the date for which to set the time, and the time to set
  constructor(public date: Date, public start: Date) { }
}

export class SetEndTimeAction implements Action {
  public readonly type = SET_END_TIME;

  // end is a combination of the date for which to set the time, and the time to set
  constructor(public date: Date, public end: Date) { }
}

export class DeleteEntryAction implements Action {
  public readonly type = DELETE_ENTRY;

  // date identifies the netry; only year, month and day (date) are used
  constructor(public date: Date) { }
}

export type AttendanceAction =
  | SetStartTimeAction
  | SetEndTimeAction
  | DeleteEntryAction
  ;
