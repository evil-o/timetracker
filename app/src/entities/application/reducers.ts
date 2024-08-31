import { ActionReducerMap } from "@ngrx/store";
import { activityLogReducer } from "../activity-log/models/activity-log.reducer";
import { activityTypesReducer } from "../activity-type/models/activity-types.reducer";
import { attendanceReducer } from "../attendance/model/attendance.reducer";
import { configurationReducer } from "../configuration/model/configuration.reducer";
import { stopWatchReducer } from "../stop-watch/model/stop-watch.reducer";
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
