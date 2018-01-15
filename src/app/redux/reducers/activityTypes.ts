import { Action } from '@ngrx/store';

import { IActivityType } from '../../models/interfaces';
import { ActivityTypes, IActivityTypes } from '../states/activityTypes';
import { ApplicationState } from '../states/applicationState';
import { ActivityTypesActions, CreateActivityTypeAction } from '../actions/activityTypesActions';
import * as uuid from 'uuid';
import { IncrementalMigrationAction, INCREMENTAL_MIGRATION } from '../actions/storageVersionActions';

export const CREATE = 'CREATE';

export function activityTypesReducer(
  state: IActivityTypes = new ActivityTypes(), action: ActivityTypesActions | IncrementalMigrationAction
) {
  switch (action.type) {
    case CREATE:
      return {
        ...state,
        activities: [...state.activities, { name: action.name, id: uuid.v4() }]
      };

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
