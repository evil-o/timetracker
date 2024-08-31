import { ActivityTypesEffects } from "../../entities/activity-type";
import { StorageVersionEffects } from "../../entities/storage-version";
import { ImportStorageEffects } from "../../entities/storage-version/models/import.effects";

// TODO: get rid of this central place for everything
export const entityEffects = [
    ActivityTypesEffects,
    ImportStorageEffects,
    StorageVersionEffects,
];
