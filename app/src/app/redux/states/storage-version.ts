export type StateType =
    | "ActivityLogState"
    | "ActivityTypesState"
    | "StorageVersion";

export interface IStorageVersion {
    version?: number;

    upgradeComplete: boolean;

    previousStateBackup?: any;

    pendingIncrementalBackups: StateType[];
}

export class StorageVersion implements IStorageVersion {
    public static CURRENT_VERSION = 5;

    public version?: number = undefined;

    public upgradeComplete = false;

    public previousStateBackup: IStorageVersion | null = null;

    public pendingIncrementalBackups: StateType[] = [];
}
