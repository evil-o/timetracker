import { ApplicationState } from "../application/application.model";

const getState = (state: ApplicationState) => state.activityTypes;

export const fromActivityTypes = {
    getState,
};
