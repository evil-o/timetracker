import { ActionReducerMap } from "@ngrx/store";
import { activityLogReducer } from "../../entities/activity-log/models/activity-log.reducer";
import { activityTypesReducer } from "../../entities/activity-type/models/activity-types.reducer";
import { ApplicationState } from "../../entities/application/models/application.model";
import { attendanceReducer } from "../../entities/attendance/model/attendance.reducer";
import { configurationReducer } from "../../entities/configuration/model/configuration.reducer";
import { stopWatchReducer } from "../../entities/stop-watch/model/stop-watch.reducer";
import { storageVersionReducer } from "../../entities/storage-version/models/storage-version.reducer";

// TODO: get rid of this central place for all reducers
export const reducers: ActionReducerMap<ApplicationState> = {
    activityTypes: activityTypesReducer,
    activityLog: activityLogReducer,
    attendanceState: attendanceReducer,
    storageVersion: storageVersionReducer,
    configuration: configurationReducer,
    stopWatch: stopWatchReducer,
};
