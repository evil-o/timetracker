import { ApplicationState } from "../../application/models/application.model";

const getState = (state: ApplicationState) => state.storageVersion;

export const fromStorageVersion = {
    getState,
};
