import { ActionReducerMap } from "@ngrx/store";
import { activityLogReducer } from "../activity-log/activity-log.reducer";
import { activityTypesReducer } from "../activity-types/activity-types.reducer";
import { attendanceReducer } from "../attendance/attendance.reducer";
import { configurationReducer } from "../configuration/configuration.reducer";
import { stopWatchReducer } from "../stop-watch/stop-watch.reducer";
import { storageVersionReducer } from "../storage-version/storage-version.reducer";
import { ApplicationState } from "./application.model";

// TODO: get rid of this central place for all reducers
export const reducers: ActionReducerMap<ApplicationState> = {
    activityTypes: activityTypesReducer,
    activityLog: activityLogReducer,
    attendanceState: attendanceReducer,
    storageVersion: storageVersionReducer,
    configuration: configurationReducer,
    stopWatch: stopWatchReducer,
};
