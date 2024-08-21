import { ActionReducerMap } from "@ngrx/store";
import { activityLogReducer } from "../../../entities/activity-log/activity-log.reducer";
import { activityTypesReducer } from "../../../entities/activity-types/activity-types.reducer";
import { attendanceReducer } from "../../../entities/attendance/attendance.reducer";
import { ApplicationState } from "../states/application-state";
import { configurationReducer } from "./configuration.reducer";
import { stopWatchReducer } from "./stop-watch.reducer";
import { storageVersionReducer } from "./storage-version.reducer";

// TODO: move to a module in entities
export const reducers: ActionReducerMap<ApplicationState> = {
    activityTypes: activityTypesReducer,
    activityLog: activityLogReducer,
    attendanceState: attendanceReducer,
    storageVersion: storageVersionReducer,
    configuration: configurationReducer,
    stopWatch: stopWatchReducer,
};
