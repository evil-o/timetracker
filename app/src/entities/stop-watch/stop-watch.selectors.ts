import { ApplicationState } from "../application/application.model";

const getState = (state: ApplicationState) => state.stopWatch;

export const fromStopWatch = {
    getState,
};
