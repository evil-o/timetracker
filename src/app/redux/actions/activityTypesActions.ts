import { Action } from '@ngrx/store';

export const CREATE = 'CREATE_ACTIVITY_TYPE_AND_LOG_TIME';
export const CREATE_ACTIVITY_TYPE_AND_LOG_TIME = 'CREATE_ACTIVITY_TYPE_AND_LOG_TIME';
export const SET_ACTIVITY_TYPE_IS_NON_WORKING = 'SET_ACTIVITY_TYPE_IS_NON_WORKING';
export const SET_ACTIVITY_TYPE_IS_COLOR_ID = 'SET_ACTIVITY_TYPE_IS_COLOR_ID';

export class CreateActivityTypeAction implements Action {
  public readonly type = CREATE;

  constructor(public name: string) { }
}

export class CreateActivityTypeAndLogTimeAction implements Action {
  public readonly type = CREATE_ACTIVITY_TYPE_AND_LOG_TIME;

  constructor(public name: string, public hours: number, public date: Date, public description?: string) { }
}

export class SetActivityTypeIsNonWorkingAction implements Action {
  public readonly type = SET_ACTIVITY_TYPE_IS_NON_WORKING;

  constructor(public id: string, public isNonWorking: boolean) { }
}

export class SetActivityTypeColorIdAction implements Action {
  public readonly type = SET_ACTIVITY_TYPE_IS_COLOR_ID;

  constructor(public activityTypeId: string, public colorId?: string) { }
}

export type ActivityTypesActions =
  | CreateActivityTypeAction
  | CreateActivityTypeAndLogTimeAction
  | SetActivityTypeIsNonWorkingAction
  | SetActivityTypeColorIdAction
  ;
