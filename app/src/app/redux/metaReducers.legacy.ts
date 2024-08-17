import { ActionReducer, MetaReducer } from "@ngrx/store";
import { localStorageSync } from "ngrx-store-localstorage";
import { ApplicationState } from "./states/application-state";

export const rehydratedStorageKeys = [
    "activityTypes",
    "activityLog",
    "attendanceState",
    "storageVersion",
    "configuration",
    "stopWatch",
] as (keyof ApplicationState)[];

export function localStorageSyncReducer(
    reducer: ActionReducer<any>
): ActionReducer<any> {
    return localStorageSync({ keys: rehydratedStorageKeys, rehydrate: true })(
        reducer
    );
}
export const metaReducers: Array<MetaReducer<any, any>> = [
    localStorageSyncReducer,
];
