import { ActionReducer } from '@ngrx/store';
import { MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

export const rehydratedStorageKeys = [
  'activityTypes',
  'activityLog',
  'attendanceState',
  'storageVersion',
  'configuration',
  'stopWatch',
];

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: rehydratedStorageKeys, rehydrate: true })(reducer);
}
export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
