import { activityLogReducer } from './activityLog.legacy';
import { activityTypesReducer } from './activityTypes.legacy';
import { attendanceStateReducer } from './attendanceReducer.legacy';
import { configurationReducer } from './configurationReducer.legacy';
import { stopWatchReducer } from './stop-watch.reducer';
import { storageVersionReducer } from './storageVersion.legacy';

export const reducers = {
  activityTypes: activityTypesReducer,
  activityLog: activityLogReducer,
  attendanceState: attendanceStateReducer,
  storageVersion: storageVersionReducer,
  configuration: configurationReducer,
  stopWatch: stopWatchReducer
};
