import { Action } from '@ngrx/store';

import { IActivityType } from '../../models/interfaces';
import { ActivityTypes, IActivityTypes } from '../states/activityTypes';
import { ApplicationState } from '../states/applicationState';
import { ActivityTypesActions, CreateActivityTypeAction } from '../actions/activityTypesActions';
import * as uuid from 'uuid';

export const CREATE = 'CREATE';

export function activityTypesReducer(state: IActivityTypes = new ActivityTypes(), action: ActivityTypesActions) {
  switch (action.type) {
    case CREATE:
      return {
        ...state,
        activities: [...state.activities, { name: action.name, id: uuid.v4() }]
      };

    default:
      return state;
  }
}
