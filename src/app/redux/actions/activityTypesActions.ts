import { Action } from '@ngrx/store';
import { IActivityTypes } from '../states/activityTypes';

export const CREATE = 'CREATE_ACTIVITY_TYPE_AND_LOG_TIME';
export const CREATE_ACTIVITY_TYPE_AND_LOG_TIME = 'CREATE_ACTIVITY_TYPE_AND_LOG_TIME';
export const SET_ACTIVITY_TYPE_IS_NON_WORKING = 'SET_ACTIVITY_TYPE_IS_NON_WORKING';
export const SET_ACTIVITY_TYPE_IS_COLOR_ID = 'SET_ACTIVITY_TYPE_IS_COLOR_ID';
export const SET_ARCHIVED = 'SET_ACTIVITY_TYPE_ARCHIVED';
export const IMPORT_ACTIVITY_TYPES = 'IMPORT_ACTIVITY_TYPES';

export class SetArchivedAction implements Action {
  public readonly type = SET_ARCHIVED;

  constructor(public id: string, public archived: boolean) { }
}

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

export class ImportActivityTypes implements Action {
  public readonly type = IMPORT_ACTIVITY_TYPES;

  constructor(public data: IActivityTypes) { }
}

export type ActivityTypesActions =
  | CreateActivityTypeAction
  | CreateActivityTypeAndLogTimeAction
  | SetActivityTypeIsNonWorkingAction
  | SetActivityTypeColorIdAction
  | SetArchivedAction
  | ImportActivityTypes
  ;
