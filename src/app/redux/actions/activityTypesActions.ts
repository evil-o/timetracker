import { Action } from '@ngrx/store';

import { CREATE } from '../reducers/activityTypes';

export class CreateActivityTypeAction implements Action {
  public readonly type = CREATE;

  constructor(public name: string) { }
}

export type ActivityTypesActions =
  | CreateActivityTypeAction
  ;
