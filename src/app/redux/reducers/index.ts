import { activityTypesReducer } from './activityTypes';
import { activityLogReducer } from './activityLog';
import { storageVersionReducer } from './storageVersion';
import { attendanceStateReducer } from './attendanceReducer';

export const reducers = {
  activityTypes: activityTypesReducer,
  activityLog: activityLogReducer,
  attendanceState: attendanceStateReducer,
  storageVersion: storageVersionReducer,
};
