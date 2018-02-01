import { Action } from '@ngrx/store';

export const SET_START_TIME = 'SET_START_TIME';
export const SET_END_TIME = 'SET_END_TIME';
export const DELETE_ATTENDANCE_ENTRY = 'DELETE_ATTENDANCE_ENTRY';
export const CREATE_CORRECTION = 'ADD_CORRECTION';
export const UPDATE_CORRECTION = 'UPDATE_CORRECTION';
export const DELETE_CORRECTION = 'DELETE_CORRECTION';

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
  public readonly type = DELETE_ATTENDANCE_ENTRY;

  // date identifies the netry; only year, month and day (date) are used
  constructor(public date: Date) { }
}

export class CreateCorrectionAction implements Action {
  public readonly type = CREATE_CORRECTION;

  constructor(public year: number, public month: number, public day: number) { }
}

export class UpdateCorrectionAction implements Action {
  public readonly type = UPDATE_CORRECTION;

  constructor(
    public year: number,
    public month: number,
    public day: number,
    public id: string,
    public newHours: number,
    public newDescription: string,
  ) { }
}

export class DeleteCorrectionAction implements Action {
  public readonly type = DELETE_CORRECTION;

  constructor(
    public year: number,
    public month: number,
    public day: number,
    public id: string,
  ) { }
}

export type AttendanceAction =
  | SetStartTimeAction
  | SetEndTimeAction
  | DeleteEntryAction
  | CreateCorrectionAction
  | UpdateCorrectionAction
  | DeleteCorrectionAction
  ;
