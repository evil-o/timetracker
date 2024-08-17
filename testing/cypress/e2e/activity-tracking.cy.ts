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

    it("changes the description of a log entry", () => {
        const activityType = "e2e test activity";
        const activityTypeDescriptionBefore = "e2e test activity before";
        const activityTypeDescriptionAfter = "e2e test activity after";
        const hours = "3";
        const minutes = "45";

        cy.log("add initial log entry");
        today.addActivity.activityInput.type(activityType);
        today.addActivity.activityDescription.type(activityTypeDescriptionBefore);
        today.addActivity.activityDudation.type(`${hours}:${minutes}`);
        today.addActivity.logActivityButton.click();

        cy.log("change duration");
        today.actvityLogList.entries.contains(activityType).click();

        cy.log("cancel and expect no change");
        today.actvityLogList.entryDescriptions.contains(activityTypeDescriptionBefore).dblclick();
        today.actvityLogList.logEntryDescriptionInput.clear().type(activityTypeDescriptionAfter);
        today.actvityLogList.cancelDescriptionChange.click();

        cy.log("confirm and expect change");
        today.actvityLogList.entryDescriptions.contains(activityTypeDescriptionBefore).dblclick();
        today.actvityLogList.logEntryDescriptionInput.clear().type(activityTypeDescriptionAfter);
        today.actvityLogList.confirmDescriptionChange.click();

        today.actvityLogList.entryDescriptions.contains(activityTypeDescriptionAfter).should("exist");
    })
})