import { Action, ActionReducer, MetaReducer } from "@ngrx/store";
import { localStorageSync } from "ngrx-store-localstorage";
import { ApplicationState } from "./application.model";

export const rehydratedStorageKeys = [
    "activityTypes",
    "activityLog",
    "attendanceState",
    "storageVersion",
    "configuration",
    "stopWatch",
] as (keyof ApplicationState)[];

export function localStorageSyncReducer(
    reducer: ActionReducer<ApplicationState>
): ActionReducer<ApplicationState> {
    return localStorageSync({ keys: rehydratedStorageKeys, rehydrate: true })(
        reducer
    );
}
export const metaReducers: MetaReducer<ApplicationState, Action<string>>[] = [
    localStorageSyncReducer,
];
