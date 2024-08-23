import { ActivityLogEffects } from "../activity-log/models/activity-log.effects";
import { ActivityTypesEffects } from "../activity-types/models/activity-types.effects";
import { ImportStorageEffects } from "../storage-version/models/import.effects";
import { StorageVersionEffects } from "../storage-version/models/storage-version.effects";

// TODO: get rid of this central place for everything
export const effects = [
    ActivityLogEffects,
    ActivityTypesEffects,
    ImportStorageEffects,
    StorageVersionEffects,
];
