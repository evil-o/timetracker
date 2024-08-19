import { ActivitiesPage } from "../pages/activities.page";
import { GlobalPage } from "../pages/global.page";
import { TodayPage } from "../pages/today.page.cy";
import { DayPageWorkflows } from "../support/today.workflows";

describe("Activity management", () => {
    let today: TodayPage;
    let activities: ActivitiesPage;
    let globalPage: GlobalPage;
    let dayWorkflows: DayPageWorkflows;

    beforeEach(() => {
        today = new TodayPage();
        globalPage = new GlobalPage();
        activities = new ActivitiesPage();
        dayWorkflows = new DayPageWorkflows(today);
    });

    it("allows users to change activity colors", () => {
        const activityType = "chameleon";
        const newColor = "blue";

        today.navigateFromHome();
        dayWorkflows.enterLogEntry(activityType);
        today.actvityLogList.entries
            .find(".panel")
            .should("not.have.class", `activity-${newColor}`);

        activities.visitViaNav();
        activities.activityList.activityColorPickers.click();
        activities.activityList.getColorMenuItem(newColor).click();

        today.visitViaNav();
        today.actvityLogList.entries
            .find(".panel")
            .should("have.class", `activity-${newColor}`);
    });

    it("merges activities", () => {
        const minutes = "00";

        const activityType1 = "andromeda";
        const description1 = "desc1";
        const hours1 = "1";

        const activityType2 = "milky way";
        const description2 = "desc2";
        const hours2 = "2";

        const mergeTarget = activityType2;

        today.navigateFromHome();
        dayWorkflows.enterLogEntry(
            activityType1,
            description1,
            hours1,
            minutes
        );
        dayWorkflows.enterLogEntry(
            activityType2,
            description2,
            hours2,
            minutes
        );

        activities.visitViaNav();
        activities.activityList.mergeButtons.first().click();

        activities.mergeActivitiesModal.mergeActivityTargetInput.type(
            mergeTarget
        );
        activities.mergeActivitiesModal.mergeTargetSuggestions.first().click();
        activities.mergeActivitiesModal.confirmMergeButton.click();

        today.visitViaNav();
        dayWorkflows.expectEntryTime(mergeTarget, "3", "00");
    });
});
