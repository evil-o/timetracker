import { createFeatureSelector } from "@ngrx/store";
import { IActivityTypes } from "./activity-types.types";

const getState = createFeatureSelector<IActivityTypes>("activityTypes");

export const fromActivityTypes = {
    getState,
};
