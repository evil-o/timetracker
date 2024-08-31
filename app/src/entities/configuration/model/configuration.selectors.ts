import { createSelector } from "@ngrx/store";
import { ApplicationState } from "../../application/models/application.model";

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
