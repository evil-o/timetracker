import { GroupActivityLogEntriesByIdPipe } from "./group-activity-log-entries-by-id.pipe";

describe("GroupActivityLogEntriesByIdPipe", () => {
    it("create an instance", () => {
        const pipe = new GroupActivityLogEntriesByIdPipe();
        expect(pipe).toBeTruthy();
    });
});
