import { IActivityLog } from "../activity-log/activity-log.types";
import { IActivityTypes } from "../activity-types/activity-types.types";
import { IAttendanceState } from "../attendance/attendance.state";
import { IConfigurationState } from "../configuration/configuration.state";
import { IStopWatch } from "../stop-watch/stop-watch.state";
import { IStorageVersion } from "../storage-version/storage-version.state";

export interface ApplicationState {
    activityTypes: IActivityTypes;

    activityLog: IActivityLog;

    attendanceState: IAttendanceState;

    storageVersion: IStorageVersion;

    configuration: IConfigurationState;

    stopWatch: IStopWatch;
}
