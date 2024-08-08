import { ActivitiesPage } from "../pages/activities.page";
import { GlobalPage } from "../pages/global.page";
import { TodayPage } from "../pages/today.page.cy";

describe('Activity tracking', () => {
    let today: TodayPage;
    let activities: ActivitiesPage;
    let globalPage: GlobalPage;

    beforeEach(() => {
        today = new TodayPage();
        globalPage = new GlobalPage();
        activities = new ActivitiesPage();
        today.navigateFromHome();
    });

    it("tracks activities", () => {
        const activityType = "e2e test activity";
        const hours = "2";
        const minutes = "34";
        today.addActivity.activityInput.type(activityType);
        today.addActivity.activityDescription.type("e2e test activity description");
        today.addActivity.activityDudation.type(`${hours}:${minutes}`);
        today.addActivity.logActivityButton.click();
        today.actvityLogList.entries.should("contain.text", activityType)
        today.actvityLogList.entries.should("contain.text", `${hours}h ${minutes}m`)
    });
})