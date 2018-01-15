import { createSelector } from '@ngrx/store';
import { ApplicationState } from '../states/applicationState';

export const activityTypes = (state: ApplicationState) => state.activityTypes;

export const activityLog = (state: ApplicationState) => state.activityLog;
export const activityLogEntries = createSelector(activityLog, (state) => state.entries);

export const storageVersion = (state: ApplicationState) => state.storageVersion;
