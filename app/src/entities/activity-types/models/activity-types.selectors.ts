import { ApplicationState } from "../../application/models/application.model";

const getState = (state: ApplicationState) => state.activityTypes;

export const fromActivityTypes = {
    getState,
};
