import { IActivityLog } from "../../../entities/activity-log/activity-log.types";
import { IActivityTypes } from "../../../entities/activity-types/activity-types.types";
import { IAttendanceState } from "../../../entities/attendance/attendance.state";
import { IStorageVersion } from "../../../entities/storage-version/storage-version.state";
import { IConfigurationState } from "./configuration";
import { IStopWatch } from "./stopwatch-state";

export interface ApplicationState {
    activityTypes: IActivityTypes;

    activityLog: IActivityLog;

    attendanceState: IAttendanceState;

    storageVersion: IStorageVersion;

    configuration: IConfigurationState;

    stopWatch: IStopWatch;
}
