import { Action } from '@ngrx/store';

import { FETCH_OR_CREATE_ID_AND_LOG_TIME } from '../reducers/activityTypes';

export class FetchOrCreateIdAndLogTimeAction implements Action {
  constructor(public name: string, hoursToLog: number, public type = FETCH_OR_CREATE_ID_AND_LOG_TIME) { }
}
