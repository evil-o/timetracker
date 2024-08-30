import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAttendanceState } from "./attendance.state";

const getState = createFeatureSelector<IAttendanceState>("attendanceState");

const getEntries = createSelector(getState, (state) => state?.entries);

export const fromAttendance = {
    getState,
    getEntries,
};
