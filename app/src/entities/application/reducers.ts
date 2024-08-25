import { ActionReducerMap } from "@ngrx/store";
import { activityLogReducer } from "../activity-log/models/activity-log.reducer";
import { activityTypesReducer } from "../activity-types/models/activity-types.reducer";
import { attendanceReducer } from "../attendance/models/attendance.reducer";
import { configurationReducer } from "../configuration/models/configuration.reducer";
import { stopWatchReducer } from "../stop-watch/models/stop-watch.reducer";
import { storageVersionReducer } from "../storage-version/models/storage-version.reducer";
import { ApplicationState } from "./models/application.model";

// TODO: get rid of this central place for all reducers
export const reducers: ActionReducerMap<ApplicationState> = {
    activityTypes: activityTypesReducer,
    activityLog: activityLogReducer,
    attendanceState: attendanceReducer,
    storageVersion: storageVersionReducer,
    configuration: configurationReducer,
    stopWatch: stopWatchReducer,
};