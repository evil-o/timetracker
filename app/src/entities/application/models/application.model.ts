import { IActivityLog } from "../../activity-log/models/activity-log.types";
import { IActivityTypes } from "../../activity-type/models/activity-types.types";
import { IAttendanceState } from "../../attendance/model/attendance.state";
import { IConfigurationState } from "../../configuration/models/configuration.state";
import { IStopWatch } from "../../stop-watch/models/stop-watch.state";
import { IStorageVersion } from "../../storage-version/models/storage-version.state";

export interface ApplicationState {
    activityTypes: IActivityTypes;

    activityLog: IActivityLog;

    attendanceState: IAttendanceState;

    storageVersion: IStorageVersion;

    configuration: IConfigurationState;

    stopWatch: IStopWatch;
}
