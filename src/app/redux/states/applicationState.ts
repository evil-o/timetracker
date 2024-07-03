import { IActivityTypes } from './activityTypes';
import { IActivityLog } from './activityLog';
import { IStorageVersion } from './storageVersion';
import { IAttendanceState } from './attendanceState';
import { IConfigurationState } from './configuration';
import { IStopWatch } from './stopwatchState';

export interface ApplicationState {
  activityTypes: IActivityTypes;

  activityLog: IActivityLog;

  attendanceState: IAttendanceState;

  storageVersion: IStorageVersion;

  configuration: IConfigurationState;

  stopWatch: IStopWatch;
}
