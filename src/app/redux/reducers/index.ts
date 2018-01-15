import { activityTypesReducer } from './activityTypes';
import { activityLogReducer } from './activityLog';
import { storageVersionReducer } from './storageVersion';

export const reducers = {
  activityTypes: activityTypesReducer,
  activityLog: activityLogReducer,
  storageVersion: storageVersionReducer,
};
