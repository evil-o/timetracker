export type StateType =
   | 'ActivityLogState'
   | 'ActivityTypesState'
   | 'StorageVersion'
   ;

export interface IStorageVersion {
  version?: number;

  upgradeComplete: boolean;

  previousStateBackup?: any;

  pendingIncrementalBackups: StateType[];
}

export class StorageVersion implements IStorageVersion {
  public static CURRENT_VERSION = 4;

  public version = undefined;

  public upgradeComplete = false;

  public previousStateBackup = null;

  public pendingIncrementalBackups: StateType[] = [];
}
