import { ActionReducerMap } from "@ngrx/store";
import { ApplicationState } from "../states/application-state";
import { activityLogReducer } from "./activity-log.reducer";
import { activityTypesReducer } from "./activity-types.reducer";
import { attendanceReducer } from "./attendance.reducer";
import { configurationReducer } from "./configuration.reducer";
import { stopWatchReducer } from "./stop-watch.reducer";
import { storageVersionReducer } from "./storage-version.reducer";

export const reducers: ActionReducerMap<ApplicationState> = {
    activityTypes: activityTypesReducer,
    activityLog: activityLogReducer,
    attendanceState: attendanceReducer,
    storageVersion: storageVersionReducer,
    configuration: configurationReducer,
    stopWatch: stopWatchReducer,
};
