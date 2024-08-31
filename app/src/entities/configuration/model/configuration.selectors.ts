import { createSelector } from "@ngrx/store";
import { ApplicationState } from "../../application";

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
