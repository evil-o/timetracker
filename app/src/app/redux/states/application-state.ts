import { IActivityLog } from './activity-log';
import { IActivityTypes } from './activity-types';
import { IAttendanceState } from './attendance-state';
import { IConfigurationState } from './configuration';
import { IStopWatch } from './stopwatch-state';
import { IStorageVersion } from './storage-version';

export interface ApplicationState {
  activityTypes: IActivityTypes;

  activityLog: IActivityLog;

  attendanceState: IAttendanceState;

  storageVersion: IStorageVersion;

  configuration: IConfigurationState;

  stopWatch: IStopWatch;
}
