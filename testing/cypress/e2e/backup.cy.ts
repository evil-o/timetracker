import { ActivitiesPage } from "../pages/activities.page";
import { GlobalPage } from "../pages/global.page";
import { TodayPage } from "../pages/today.page.cy";

describe("The Time Tracker's import and export", () => {
    let today: TodayPage;
    let activities: ActivitiesPage;
    let globalPage: GlobalPage;

    before(() => {
        cy.deleteDownloadsFolder();
    })

    beforeEach(() => {
        today = new TodayPage();
        globalPage = new GlobalPage();
        activities = new ActivitiesPage();
        today.navigateFromHome();
    })

    it("exports and re-imports data", () => {
        cy.log("Input some data");
        const expectedStorageKeys = [
            'activityTypes',
            'activityLog',
            'attendanceState',
            'storageVersion',
            'configuration',
            'stopWatch',
        ];
        const activityType = "e2e break";
        const hours = "3";
        const minutes = "45";

        today.startTimeInput.type("08:00");
        today.endTimeInput.type("12:00");
        today.submitAttendance.click();

        today.addActivity.activityInput.type(activityType);
        today.addActivity.activityDudation.type(`${hours}:${minutes}`);
        today.addActivity.logActivityButton.click();

        globalPage.expectOvertime("4", "00");

        cy.log("Export data");

        globalPage.settingsToggle.click();
        globalPage.exportData.click();

        cy.getLastDownloadFilePath().then(path => {
            return cy.readFile(path)
        }).should("have.keys", ...expectedStorageKeys);

        cy.log("Clear data");
        cy.clearLocalStorage();
        cy.reload();
        globalPage.overtimeBadge.should("not.exist");

        cy.log("Re-Import data");

        globalPage.settingsToggle.click();
        cy.getLastDownloadFilePath().then(path => {
            // forced, hidden input element
            cy.byTestId("import-data-input").selectFile(path, { force: true, action: "select" })
        });
        today.navigateFromHome();

        globalPage.expectOvertime("4", "00");
        today.actvityLogList.entries.should("contain.text", activityType)
        today.actvityLogList.entries.should("contain.text", `${hours}h ${minutes}m`)
    })
});