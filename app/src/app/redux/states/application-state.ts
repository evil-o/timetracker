import { IActivityLog } from "../../../entities/activity-log/activity-log.types";
import { IActivityTypes } from "../../../entities/activity-types/activity-types.types";
import { IAttendanceState } from "../../../entities/attendance/attendance.state";
import { IConfigurationState } from "../../../entities/configuration/configuration.state";
import { IStopWatch } from "../../../entities/stop-watch/stop-watch.state";
import { IStorageVersion } from "../../../entities/storage-version/storage-version.state";

export interface ApplicationState {
    activityTypes: IActivityTypes;

    activityLog: IActivityLog;

    attendanceState: IAttendanceState;

    storageVersion: IStorageVersion;

    configuration: IConfigurationState;

    stopWatch: IStopWatch;
}
