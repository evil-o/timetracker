import { ActivityLogEffects } from './activityLogEffects';
import { ActivityTypesEffects } from './activityTypesEffects';
import { StorageVersionEffects } from './storageVersionEffects';
import { ImportStorageEffects } from './importEffects';

export const effects = [
  ActivityLogEffects,
  ActivityTypesEffects,
  ImportStorageEffects,
  StorageVersionEffects
];
