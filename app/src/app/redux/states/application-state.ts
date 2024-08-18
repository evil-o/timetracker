import { IActivityLog } from "../../../entities/activity-log/activity-log.types";
import { IActivityTypes } from "../../../entities/activity-types/activity-types.types";
import { IAttendanceState } from "./attendance-state";
import { IConfigurationState } from "./configuration";
import { IStopWatch } from "./stopwatch-state";
import { IStorageVersion } from "./storage-version";

export interface ApplicationState {
    activityTypes: IActivityTypes;

    activityLog: IActivityLog;

    attendanceState: IAttendanceState;

    storageVersion: IStorageVersion;

    configuration: IConfigurationState;

    stopWatch: IStopWatch;
}
