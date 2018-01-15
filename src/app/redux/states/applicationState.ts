import { IActivityTypes } from './activityTypes';
import { IActivityLog } from './activityLog';
import { IStorageVersion } from './storageVersion';

export class ApplicationState {
  public activityTypes: IActivityTypes;

  public activityLog: IActivityLog;

  public storageVersion: IStorageVersion;
}
