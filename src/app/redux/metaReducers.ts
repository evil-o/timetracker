import { ActionReducerMap, ActionReducer } from '@ngrx/store';
import { MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

export const rehydratedStorageKeys = [
  'activityTypes',
  'activityLog',
  'storageVersion',
];

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: rehydratedStorageKeys, rehydrate: true })(reducer);
}
export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
