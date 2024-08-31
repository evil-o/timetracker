import { ApplicationState } from "../../application";

const getState = (state: ApplicationState) => state.stopWatch;

export const fromStopWatch = {
    getState,
};
