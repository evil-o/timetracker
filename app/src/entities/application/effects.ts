import { ActivityLogEffects } from "../activity-log/activity-log.effects";
import { ActivityTypesEffects } from "../activity-types/activity-types.effects";
import { ImportStorageEffects } from "../storage-version/import.effects";
import { StorageVersionEffects } from "../storage-version/storage-version.effects";

// TODO: get rid of this central place for everything
export const effects = [
    ActivityLogEffects,
    ActivityTypesEffects,
    ImportStorageEffects,
    StorageVersionEffects,
];
