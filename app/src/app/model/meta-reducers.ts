import { Action, ActionReducer, MetaReducer } from "@ngrx/store";
import { localStorageSync } from "ngrx-store-localstorage";
import { ApplicationState } from "../../entities/application";
import { rehydratedStorageKeys } from "../../shared/config";

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
