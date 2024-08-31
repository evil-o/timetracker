import { IActivityLogStateSlice } from "../../activity-log/models/activity-log.types";
import { IActivityTypesStateSlice } from "../../activity-type/models/activity-types.types";
import { IAttendanceStateSlice } from "../../attendance/model/attendance.state";
import { IConfigurationState } from "../../configuration/model/configuration.state";
import { IStopWatch } from "../../stop-watch/model/stop-watch.state";
import { IStorageVersion } from "../../storage-version/models/storage-version.state";

type Slices = IAttendanceStateSlice &
    IActivityLogStateSlice &
    IActivityTypesStateSlice;

export interface ApplicationState extends Slices {
    storageVersion: IStorageVersion;

    configuration: IConfigurationState;

    stopWatch: IStopWatch;
}
