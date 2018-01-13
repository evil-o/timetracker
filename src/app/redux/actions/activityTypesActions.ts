import { Action } from '@ngrx/store';

import { CREATE } from '../reducers/activityTypes';

export class CreateActivityTypeAction implements Action {
  constructor(public name: string, public type = CREATE) { }
}

export type ActivityTypesActions =
  | CreateActivityTypeAction
  ;
