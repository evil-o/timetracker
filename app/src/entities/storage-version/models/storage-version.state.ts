export type StateType =
    | "ActivityLogState"
    | "ActivityTypesState"
    | "StorageVersion";

export interface IStorageVersion {
    version?: number;

    upgradeComplete: boolean;

    previousStateBackup?: unknown;

    pendingIncrementalBackups: StateType[];
}

export interface IStorageVersionStateSlice {
    storageVersion: IStorageVersion;
}

export class StorageVersion implements IStorageVersion {
    public static CURRENT_VERSION = 5;

    public version?: number = undefined;

    public upgradeComplete = false;

    public previousStateBackup?: unknown = null;

    public pendingIncrementalBackups: StateType[] = [];
}
