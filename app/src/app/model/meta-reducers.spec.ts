import { rehydratedStorageKeys } from "../../shared/config";
import { reducers } from "./reducers";

describe("meta reducers", () => {
    it("rehydrates only keys that are part of the application state", () => {
        for (const key of rehydratedStorageKeys) {
            expect(Object.keys(reducers)).toContain(key);
        }
    });
});
