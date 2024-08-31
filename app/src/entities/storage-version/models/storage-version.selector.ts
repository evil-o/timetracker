import { ApplicationState } from "../../application";

const getState = (state: ApplicationState) => state.storageVersion;

export const fromStorageVersion = {
    getState,
};
