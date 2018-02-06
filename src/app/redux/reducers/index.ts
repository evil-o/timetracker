import { activityTypesReducer } from './activityTypes';
import { activityLogReducer } from './activityLog';
import { storageVersionReducer } from './storageVersion';
import { attendanceStateReducer } from './attendanceReducer';
import { configurationReducer } from './configurationReducer';

export const reducers = {
  activityTypes: activityTypesReducer,
  activityLog: activityLogReducer,
  attendanceState: attendanceStateReducer,
  storageVersion: storageVersionReducer,
  configuration: configurationReducer,
};
