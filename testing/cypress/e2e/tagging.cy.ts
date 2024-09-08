import { TodayPage } from "../pages/today.page.cy";
import { DayPageWorkflows } from "../support/today.workflows";

describe("tagging", () => {
    let today: TodayPage;
    let dayWorkflows: DayPageWorkflows;

    beforeEach(() => {
        today = new TodayPage();
        dayWorkflows = new DayPageWorkflows(today);
        today.navigateFromHome();
    });

    it("allows adding tags to accitivities", () => {
        const hours = "3";
        const minutes = "45";
        const activityType = "tag test";
        const tag = "SomeTag";
        const activityDesc = `Tag #${tag} description`;

        cy.log("add base activity");
        dayWorkflows.enterLogEntry(activityType, activityDesc, hours, minutes);

        today.expandLogEntryByType(activityType);

        cy.byTestId("tag-token").contains(tag).should("exist");
    });
});
