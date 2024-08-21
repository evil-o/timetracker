import { ActivityLogEffects } from "../../../entities/activity-log/activity-log.effects";
import { ActivityTypesEffects } from "../../../entities/activity-types/activity-types.effects";
import { ImportStorageEffects } from "./import.effects";
import { StorageVersionEffects } from "./storage-version.effects";

export const effects = [
    ActivityLogEffects,
    ActivityTypesEffects,
    ImportStorageEffects,
    StorageVersionEffects,
];
