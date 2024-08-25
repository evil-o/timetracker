import { ActivityTypeIdToNamePipe } from "../../../entities/activity-type/lib/activity-type-id-to-name.pipe";

describe("ActivityTypeIdToNamePipe", () => {
    it("create an instance", () => {
        const pipe = new ActivityTypeIdToNamePipe();
        expect(pipe).toBeTruthy();
    });
});
