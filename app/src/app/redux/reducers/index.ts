import { ActionReducerMap } from "@ngrx/store";
import { activityLogReducer } from "../../../entities/activity-log/activity-log.reducer";
import { activityTypesReducer } from "../../../entities/activity-types/activity-types.reducer";
import { ApplicationState } from "../../../entities/application/application.model";
import { attendanceReducer } from "../../../entities/attendance/attendance.reducer";
import { configurationReducer } from "../../../entities/configuration/configuration.reducer";
import { stopWatchReducer } from "../../../entities/stop-watch/stop-watch.reducer";
import { storageVersionReducer } from "../../../entities/storage-version/storage-version.reducer";

// TODO: move to a module in entities
export const reducers: ActionReducerMap<ApplicationState> = {
    activityTypes: activityTypesReducer,
    activityLog: activityLogReducer,
    attendanceState: attendanceReducer,
    storageVersion: storageVersionReducer,
    configuration: configurationReducer,
    stopWatch: stopWatchReducer,
};
