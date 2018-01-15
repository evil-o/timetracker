import { Action } from '@ngrx/store';
import { StateType } from '../states/storageVersion';

export const CHECK_STORAGE_VERSION = 'CHECK_STORAGE_VERSION';
export const PRE_MIGRATION_BACKUP = 'PRE_MIGRATION_BACKUP';
export const PREPARE_INCREMENTAL_MIGRATION = 'PREPARE_INCREMENTAL_MIGRATION';
export const INCREMENTAL_MIGRATION = 'INCREMENTAL_MIGRATION';
export const INCREMENTAL_MIGRATION_SUCCESS = 'INCREMENTAL_MIGRATION_SUCCESS';
export const STORAGE_VERSION_MIGRATED = 'STORAGE_VERSION_MIGRATED';
export const STORAGE_UPGRADE_FINISHED = 'STORAGE_UPGRADE_FINISHED';

export class CheckStorageVersionAction implements Action {
  public readonly type = CHECK_STORAGE_VERSION;

  constructor() { }
}

export class PreMigrationBackupAction implements Action {
  public readonly type = PRE_MIGRATION_BACKUP;

  constructor() { }
}

export class PrepareIncrementalMigrationAction implements Action {
  public readonly type = PREPARE_INCREMENTAL_MIGRATION;

  constructor() { }
}

export class IncrementalMigrationAction implements Action {
  public readonly type = INCREMENTAL_MIGRATION;

  constructor(public currentVersion: number) { }
}

export class IncrementalMigrationSuccessAction implements Action {
  public readonly type = INCREMENTAL_MIGRATION_SUCCESS;

  constructor(public updatedState: StateType) { }
}

export class StorageVersionMigratedAction implements Action {
  public readonly type = STORAGE_VERSION_MIGRATED;

  constructor(public newVersion: number) { }
}

export class StorageUpgradeFinishedAction implements Action {
  public readonly type = STORAGE_UPGRADE_FINISHED;

  constructor() { }
}


export type StorageVersionAction =
  | CheckStorageVersionAction
  | PreMigrationBackupAction
  | PrepareIncrementalMigrationAction
  | IncrementalMigrationAction
  | IncrementalMigrationSuccessAction
  | StorageVersionMigratedAction
  | StorageUpgradeFinishedAction
  ;