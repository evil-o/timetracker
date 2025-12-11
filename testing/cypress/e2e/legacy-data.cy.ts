import { ActivitiesPage } from "../pages/activities.page";
import { GlobalPage } from "../pages/global.page";
import { StatisticsPage } from "../pages/statistics.page";
import { TodayPage } from "../pages/today.page.cy";
import { WeekPage } from "../pages/week.page";

describe("Legacy data", () => {
    let today: TodayPage;
    let globalPage: GlobalPage;
    let weekPage: WeekPage;
    let activities: ActivitiesPage;
    let statistics: StatisticsPage;

    beforeEach(() => {
        today = new TodayPage();
        globalPage = new GlobalPage();
        weekPage = new WeekPage();
        activities = new ActivitiesPage();
        statistics = new StatisticsPage();
        cy.clearLocalStorage();
        today.navigateFromHome();
    });

    it("is imported correctly", () => {
        globalPage.settingsToggle.click();
        const path = Cypress.config("fixturesFolder") + "/legacy-data.json";
        cy.log(`Loading ${path}`);
        // forced, hidden input element
        cy.byTestId("import-data-input").selectFile(path, {
            force: true,
            action: "select",
        });

        globalPage.expectOvertime("-580", "04");

        weekPage.visitViaNav();
        weekPage.visitWeek(2025, 49);

        // not all of them, just a few examples
        weekPage.expectEntry("adjudge", "2", "07");
        weekPage.expectEntry("cease", "4", "42");
        weekPage.expectEntry("innovate", "2", "34");
        weekPage.expectEntry("jaywalk", "2", "08");
        weekPage.expectEntry("legitimize", "6", "28");

        activities.visitViaNav();
        activities.activityList.expectProps("adjudge", true, false);
        activities.activityList.expectProps("cease", true, true);
        activities.activityList.expectProps("innovate", false, true);

        statistics.visitViaNav();
        // uses canvas, cannot check
    });
});
