import { Action } from '@ngrx/store';

import { IActivityType } from '../../models/interfaces';
import { ActivityTypes, IActivityTypes } from '../states/activityTypes';
import { CreateActivityTypeAction } from '../actions/createActivityType';

export const CREATE = 'CREATE';
export const FETCH_OR_CREATE_ID_AND_LOG_TIME = 'FETCH_OR_CREATE_ID_AND_LOG_TIME';

export function activityTypesReducer(state: IActivityTypes = new ActivityTypes(), action: Action) {
  switch (action.type) {
    case CREATE:
      const createAction = action as CreateActivityTypeAction;
      const newState = Object.assign({}, state);
      newState.activities.push({name: createAction.name, id: 'test'});
      return newState;

    case FETCH_OR_CREATE_ID_AND_LOG_TIME:
      return state;

    default:
      return state;
  }
}
