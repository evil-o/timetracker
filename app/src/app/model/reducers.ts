import { ActionReducerMap } from "@ngrx/store";
import { activityLogReducer } from "../../entities/activity-log";
import { activityTypesReducer } from "../../entities/activity-type";
import { ApplicationState } from "../../entities/application";
import { attendanceReducer } from "../../entities/attendance";
import { configurationReducer } from "../../entities/configuration";
import { stopWatchReducer } from "../../entities/stop-watch";
import { storageVersionReducer } from "../../entities/storage-version";

// TODO: get rid of this central place for all reducers
export const reducers: ActionReducerMap<ApplicationState> = {
    activityTypes: activityTypesReducer,
    activityLog: activityLogReducer,
    attendanceState: attendanceReducer,
    storageVersion: storageVersionReducer,
    configuration: configurationReducer,
    stopWatch: stopWatchReducer,
};
