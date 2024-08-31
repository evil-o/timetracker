import { ApplicationState } from "../../application";

const getState = (state: ApplicationState) => state.activityTypes;

export const fromActivityTypes = {
    getState,
};
