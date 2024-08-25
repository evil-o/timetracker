import { ActivityTypesEffects } from "../activity-type/models/activity-types.effects";
import { ImportStorageEffects } from "../storage-version/models/import.effects";
import { StorageVersionEffects } from "../storage-version/models/storage-version.effects";

// TODO: get rid of this central place for everything
export const entityEffects = [
    ActivityTypesEffects,
    ImportStorageEffects,
    StorageVersionEffects,
];
