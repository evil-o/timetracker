import { IActivityLogStateSlice } from "../../activity-log";
import { IActivityTypesStateSlice } from "../../activity-type";
import { IAttendanceStateSlice } from "../../attendance";
import { IConfigurationStateSlice } from "../../configuration";
import { IStopWatchStateSlice } from "../../stop-watch";
import { IStorageVersionStateSlice } from "../../storage-version";

export type ApplicationState = IAttendanceStateSlice &
    IActivityLogStateSlice &
    IActivityTypesStateSlice &
    IStorageVersionStateSlice &
    IConfigurationStateSlice &
    IStopWatchStateSlice;
