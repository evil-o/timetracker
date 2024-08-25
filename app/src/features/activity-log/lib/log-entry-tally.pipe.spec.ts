import { LogEntryTallyPipe } from "./log-entry-tally.pipe";

describe("LogEntryTallyPipe", () => {
    it("create an instance", () => {
        const pipe = new LogEntryTallyPipe();
        expect(pipe).toBeTruthy();
    });
});
