import { Action } from '@ngrx/store';

import { IActivityType } from '../../models/interfaces';
import { ActivityTypes, IActivityTypes } from '../states/activityTypes';
import { ApplicationState } from '../states/applicationState';
import {
  ActivityTypesActions,
  CreateActivityTypeAction,
  CREATE_ACTIVITY_TYPE_AND_LOG_TIME,
  CREATE,
  SET_ACTIVITY_TYPE_IS_NON_WORKING
} from '../actions/activityTypesActions';
import * as uuid from 'uuid';
import { IncrementalMigrationAction, INCREMENTAL_MIGRATION } from '../actions/storageVersionActions';

export function activityTypesReducer(
  state: IActivityTypes = new ActivityTypes(), action: ActivityTypesActions | IncrementalMigrationAction
) {
  switch (action.type) {
    case CREATE:
    case CREATE_ACTIVITY_TYPE_AND_LOG_TIME:
      return {
        ...state,
        activities: [...state.activities, { name: action.name, id: uuid.v4() }]
      };

    case SET_ACTIVITY_TYPE_IS_NON_WORKING: {
      const newState = {
        ...state,
        activities: state.activities.map(v => ({ ...v })),
      };

      const entry = newState.activities.find(e => e.id === action.id);
      if (entry) {
        entry.isNonWorking = action.isNonWorking;
      } else {
        console.log(`Activity type ${action.id} not found.`);
      }

      return newState;
    }

    case INCREMENTAL_MIGRATION:
      switch (action.currentVersion) {
        default:
          console.log('Unknown or unhandled version ("' + action.currentVersion + '") in incremental update of activity log.');
          return state;
      }

    default:
      return state;
  }
}
