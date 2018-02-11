import { Action } from '@ngrx/store';

export const FETCH_OR_CREATE_ID_AND_LOG_TIME = 'FETCH_OR_CREATE_ID_AND_LOG_TIME';
export const LOG_TIME = 'LOG_TIME';
export const SET_DESCRIPTION = 'SET_DESCRIPTION';
export const SET_HOURS = 'SET_HOURS';
export const DELETE_ENTRY = 'DELETE_ENTRY';

export class FetchOrCreateIdAndLogTimeAction implements Action {
  public readonly type = FETCH_OR_CREATE_ID_AND_LOG_TIME;

  constructor(public name: string, public hoursToLog: number, public date: Date, public description?: string) { }
}

export class LogTimeAction implements Action {
  public readonly type = LOG_TIME;

  constructor(public id: string, public hoursToLog: number, public date: Date, public description?: string) { }
}

export class SetDescriptionAction implements Action {
  public readonly type = SET_DESCRIPTION;

  constructor(public entryId: string, public description: string) { }
}

export class SetHoursAction implements Action {
  public readonly type = SET_HOURS;

  constructor(public entryId: string, public hours: number) { }
}

export class DeleteEntryAction implements Action {
  public readonly type = DELETE_ENTRY;

  constructor(public entryId: string) { }
}

export type ActivityLogAction =
  | FetchOrCreateIdAndLogTimeAction
  | LogTimeAction
  | SetDescriptionAction
  | SetHoursAction
  | DeleteEntryAction
  ;
