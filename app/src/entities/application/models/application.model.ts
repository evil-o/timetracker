import { IActivityLogStateSlice } from "../../activity-log/models/activity-log.types";
import { IActivityTypesStateSlice } from "../../activity-type/models/activity-types.types";
import { IAttendanceStateSlice } from "../../attendance/model/attendance.state";
import { IConfigurationStateSlice } from "../../configuration/model/configuration.state";
import { IStopWatchStateSlice } from "../../stop-watch/model/stop-watch.state";
import { IStorageVersionStateSlice } from "../../storage-version/models/storage-version.state";

export type ApplicationState = IAttendanceStateSlice &
    IActivityLogStateSlice &
    IActivityTypesStateSlice &
    IStorageVersionStateSlice &
    IConfigurationStateSlice &
    IStopWatchStateSlice;
