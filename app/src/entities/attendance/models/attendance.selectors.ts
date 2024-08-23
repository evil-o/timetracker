import { createSelector } from "@ngrx/store";
import { ApplicationState } from "../../application/models/application.model";

const getState = (state: ApplicationState) => state.attendanceState;

const getEntries = createSelector(getState, (state) => state?.entries);

export const fromAttendance = {
    getState,
    getEntries,
};
