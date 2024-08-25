import { ApplicationState } from "../../application/models/application.model";

const getState = (state: ApplicationState) => state.stopWatch;

export const fromStopWatch = {
    getState,
};
