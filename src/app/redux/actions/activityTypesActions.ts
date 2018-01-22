import { Action } from '@ngrx/store';

export const CREATE = 'CREATE_ACTIVITY_TYPE_AND_LOG_TIME';
export const CREATE_ACTIVITY_TYPE_AND_LOG_TIME = 'CREATE_ACTIVITY_TYPE_AND_LOG_TIME';

export class CreateActivityTypeAction implements Action {
  public readonly type = CREATE;

  constructor(public name: string) { }
}

export class CreateActivityTypeAndLogTimeAction implements Action {
  public readonly type = CREATE_ACTIVITY_TYPE_AND_LOG_TIME;

  constructor(public name: string, public hours: number, public date: Date) { }
}

export type ActivityTypesActions =
  | CreateActivityTypeAction
  | CreateActivityTypeAndLogTimeAction
  ;
