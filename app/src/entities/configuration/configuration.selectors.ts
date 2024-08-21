import { createSelector } from "@ngrx/store";
import { ApplicationState } from "../application/application.model";

const getState = (state: ApplicationState) => state.configuration;
const weeklyWorkingHours = createSelector(
    getState,
    (state) => state.workingHoursPerWeek
);
const weeklyWorkingDays = createSelector(
    getState,
    (state) => state.workingDaysPerWeek
);

export const fromConfiguration = {
    getState,
    weeklyWorkingHours,
    weeklyWorkingDays,
};
