import { ActivityLogEffects } from "./activity-log.effects";
import { ActivityTypesEffects } from "./activity-types.effects";
import { ImportStorageEffects } from "./import.effects";
import { StorageVersionEffects } from "./storage-version.effects";

export const effects = [
    ActivityLogEffects,
    ActivityTypesEffects,
    ImportStorageEffects,
    StorageVersionEffects,
];
