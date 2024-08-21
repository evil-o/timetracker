import { ActivityLogEffects } from "../../../entities/activity-log/activity-log.effects";
import { ActivityTypesEffects } from "../../../entities/activity-types/activity-types.effects";
import { StorageVersionEffects } from "../../../entities/storage-version/storage-version.effects";
import { ImportStorageEffects } from "./import.effects";

export const effects = [
    ActivityLogEffects,
    ActivityTypesEffects,
    ImportStorageEffects,
    StorageVersionEffects,
];
