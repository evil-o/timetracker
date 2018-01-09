import { Action } from '@ngrx/store';

import { IActivityType } from '../../models/interfaces';
import { ActivityTypes, IActivityTypes } from '../states/activityTypes';
import { CreateActivityTypeAction } from '../actions/createActivityType';

export const LOG_BY_NAME = 'LOG_BY_NAME';

export function activityLogReducer(state: IActivityTypes = new ActivityTypes(), action: Action) {
  switch (action.type) {
    default:
      return state;
  }
}
