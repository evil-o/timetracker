import { createSelector } from "@ngrx/store";
import { ApplicationState } from "../../../entities/application/application.model";

export const activityTypes = (state: ApplicationState) => state.activityTypes;

export const storageVersion = (state: ApplicationState) => state.storageVersion;

export const attendanceState = (state: ApplicationState) =>
    state.attendanceState;
export const attendanceEntries = createSelector(
    attendanceState,
    (state) => state?.entries
);

export const configurationState = (state: ApplicationState) =>
    state.configuration;
export const weeklyWorkingHours = createSelector(
    configurationState,
    (state) => state.workingHoursPerWeek
);
export const weeklyWorkingDays = createSelector(
    configurationState,
    (state) => state.workingDaysPerWeek
);

export const stopWatchState = (state: ApplicationState) => state.stopWatch;
