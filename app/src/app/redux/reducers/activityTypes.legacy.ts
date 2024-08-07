
import { v4 as uuid } from 'uuid';
import { IActivityType } from '../../models/interfaces';
import {
  ActivityTypesActions,
  CREATE,
  CREATE_ACTIVITY_TYPE_AND_LOG_TIME,
  CreateActivityTypeAndLogTimeAction,
  IMPORT_ACTIVITY_TYPES,
  SET_ACTIVITY_TYPE_IS_COLOR_ID,
  SET_ACTIVITY_TYPE_IS_NON_WORKING,
  SET_ARCHIVED
} from '../actions/activityTypesActions.legacy';
import { INCREMENTAL_MIGRATION, IncrementalMigrationAction } from '../actions/storageVersionActions.legacy';
import { ActivityTypes, IActivityTypes } from '../states/activityTypes';
import { activityTypesReducer as activityTypesReducerNew } from "./activity-types.reducer";

function getStateAndEntryForEditing(state: IActivityTypes, activityTypeId: string): [IActivityTypes, IActivityType] {
  const newState = {
    ...state,
    activities: state.activities.map(v => ({ ...v })),
  };

  const entry = newState.activities.find(e => e.id === activityTypeId);
  if (!entry) {
    console.log(`Activity type ${activityTypeId} not found.`);
  }
  return [newState, entry!];
}

export function activityTypesReducer(
  state: IActivityTypes = new ActivityTypes(), action: ActivityTypesActions | IncrementalMigrationAction
): IActivityTypes {
  switch (action.type) {
    case CREATE:
    case CREATE_ACTIVITY_TYPE_AND_LOG_TIME:
      const names = state.activities.map(activity => activity.name);
      if (
        action.type === CREATE_ACTIVITY_TYPE_AND_LOG_TIME
        && !(action as CreateActivityTypeAndLogTimeAction).createIfExists
        && names.includes(action.name)) {
        return { ...state };
      } else {
        const newActivity: IActivityType = { name: action.name, id: uuid(), isNonWorking: false, isArchived: false };
        return {
          ...state,
          activities: [...state.activities, newActivity]
        };
      }

    case SET_ACTIVITY_TYPE_IS_NON_WORKING: {
      const [newState, entry] = getStateAndEntryForEditing(state, action.id);
      if (entry) {
        entry.isNonWorking = action.isNonWorking;
      }

      return newState;
    }

    case SET_ARCHIVED: {
      const [newState, entry] = getStateAndEntryForEditing(state, action.id);
      if (entry) {
        entry.isArchived = action.archived;
      }

      return newState;
    }

    case SET_ACTIVITY_TYPE_IS_COLOR_ID: {
      const [newState, entry] = getStateAndEntryForEditing(state, action.activityTypeId);
      if (entry) {
        if (action.colorId) {
          entry.colorId = action.colorId;
        } else {
          if (entry.colorId) {
            delete entry.colorId;
          }
        }
      }

      return newState;
    }

    case INCREMENTAL_MIGRATION:
      switch (action.currentVersion) {
        default:
          console.log('Unknown or unhandled version ("' + action.currentVersion + '") in incremental update of activity log.');
          return state;
      }

    case IMPORT_ACTIVITY_TYPES: {
      const newActivities = [...state.activities];
      if (action.data.activities) {
        for (const activity of action.data.activities) {
          const match = newActivities.find((a) => a.id === activity.id);
          if (match) {
            console.warn(`Skipping duplicate activity id: ${activity.name} = ${match.name} (${activity.id} = ${match.id})`);
            continue;
          }
          newActivities.push(activity);
        }
      }
      return {
        ...state,
        activities: newActivities
      } as IActivityTypes;
    }

    default:
      return activityTypesReducerNew(state, action);
  }
}
