import { activityLogReducer as activityLogReducerLegacy } from './activityLog.legacy';
import { activityTypesReducer as activityTypesReducerLegacy } from './activityTypes.legacy';
import { attendanceReducer } from './attendance.reducer';
import { configurationReducer } from './configuration.reducer';
import { stopWatchReducer } from './stop-watch.reducer';
import { storageVersionReducer } from './storageVersion.legacy';

export const reducers = {
  activityTypes: activityTypesReducerLegacy,
  activityLog: activityLogReducerLegacy,
  attendanceState: attendanceReducer,
  storageVersion: storageVersionReducer,
  configuration: configurationReducer,
  stopWatch: stopWatchReducer
};
