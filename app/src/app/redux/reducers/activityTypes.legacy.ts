
import { INCREMENTAL_MIGRATION, IncrementalMigrationAction } from '../actions/storageVersionActions.legacy';
import { ActivityTypes, IActivityTypes } from '../states/activityTypes';
import { activityTypesReducer as activityTypesReducerNew } from "./activity-types.reducer";

export function activityTypesReducer(
  state: IActivityTypes = new ActivityTypes(), action: IncrementalMigrationAction
): IActivityTypes {
  switch (action.type) {
    case INCREMENTAL_MIGRATION:
      switch (action.currentVersion) {
        default:
          console.log('Unknown or unhandled version ("' + action.currentVersion + '") in incremental update of activity log.');
          return state;
      }

    default:
      return activityTypesReducerNew(state, action);
  }
}
