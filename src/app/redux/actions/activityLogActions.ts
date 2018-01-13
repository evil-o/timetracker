import { Action } from '@ngrx/store';

export const FETCH_OR_CREATE_ID_AND_LOG_TIME = 'FETCH_OR_CREATE_ID_AND_LOG_TIME';
export const LOG_TIME = 'LOG_TIME';

export class FetchOrCreateIdAndLogTimeAction implements Action {
  public readonly type = FETCH_OR_CREATE_ID_AND_LOG_TIME;

  constructor(public name: string, public hoursToLog: number) { }
}

export class LogTimeAction implements Action {
  public readonly type = LOG_TIME;

  constructor(public id: string, public hoursToLog: number) { }
}

export type ActivityLogAction =
  | FetchOrCreateIdAndLogTimeAction
  | LogTimeAction
  ;
