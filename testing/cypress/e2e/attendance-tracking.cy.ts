import { ActivitiesPage } from "../pages/activities.page";
import { GlobalPage } from "../pages/global.page";
import { TodayPage } from "../pages/today.page.cy";

describe("The time tracker", () => {
    let today: TodayPage;
    let activities: ActivitiesPage;
    let globalPage: GlobalPage;

    beforeEach(() => {
        today = new TodayPage();
        globalPage = new GlobalPage();
        activities = new ActivitiesPage();
        today.navigateFromHome();
    });

    it("track start and end time", () => {
        today.startTimeInput.type("08:00");
        today.endTimeInput.type("12:00");
        today.submitAttendance.click();
        today.startTimeInput.should("have.class", "is-valid");
        today.endTimeInput.should("have.class", "is-valid");
        globalPage.expectOvertime("-4", "00");
    });

    it("tracks extra bookings", () => {
        today.startTimeInput.type("08:00");
        today.endTimeInput.type("12:00");
        today.submitAttendance.click();

        today.extraBookings.accordion.click();
        today.extraBookings.add.click();
        today.extraBookings.descriptions.first().type("e2e extra booking");
        today.extraBookings.hours.first().clear().type("1:23");
        today.extraBookings.confirms.first().click();
        globalPage.expectOvertime("-2", "37");
    });

    it("tracks breaks", () => {
        today.startTimeInput.type("08:00");
        today.endTimeInput.type("12:00");
        today.submitAttendance.click();

        globalPage.expectOvertime("-4", "00");

        const activityType = "e2e break";
        const hours = "3";
        const minutes = "45";

        today.addActivity.activityInput.type(activityType);
        today.addActivity.activityDudation.type(`${hours}:${minutes}`);
        today.addActivity.logActivityButton.click();

        activities.visitViaNav();

        activities.activityList.nonWorkingCheckBoxes.first().click();

        globalPage.expectOvertime("-7", "45");
    });
});
