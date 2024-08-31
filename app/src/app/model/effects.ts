import { ActivityTypesEffects } from "../../entities/activity-type";
import { ImportStorageEffects } from "../../entities/import/model/import.effects";
import { StorageVersionEffects } from "../../entities/storage-version";

// TODO: get rid of this central place for everything
export const entityEffects = [
    ActivityTypesEffects,
    ImportStorageEffects,
    StorageVersionEffects,
];
