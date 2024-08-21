import { ApplicationState } from "../application/application.model";

const getState = (state: ApplicationState) => state.storageVersion;

export const fromStorageVersion = {
    getState,
};
