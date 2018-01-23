import { IActivityTypes } from './activityTypes';
import { IActivityLog } from './activityLog';
import { IStorageVersion } from './storageVersion';
import { IAttendanceState } from './attendanceState';

export class ApplicationState {
  public activityTypes: IActivityTypes;

  public activityLog: IActivityLog;

  public attendanceState: IAttendanceState;

  public storageVersion: IStorageVersion;
}
