import { activityLogReducer as activityLogReducerLegacy } from './activityLog.legacy';
import { activityTypesReducer as activityTypesReducerLegacy } from './activityTypes.legacy';
import { attendanceStateReducer } from './attendanceReducer.legacy';
import { configurationReducer } from './configurationReducer.legacy';
import { stopWatchReducer } from './stop-watch.reducer';
import { storageVersionReducer } from './storageVersion.legacy';

export const reducers = {
  activityTypes: activityTypesReducerLegacy,
  activityLog: activityLogReducerLegacy,
  attendanceState: attendanceStateReducer,
  storageVersion: storageVersionReducer,
  configuration: configurationReducer,
  stopWatch: stopWatchReducer
};
