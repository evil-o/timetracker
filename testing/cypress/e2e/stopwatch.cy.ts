import { GlobalPage } from "../pages/global.page";
import { TodayPage } from "../pages/today.page.cy";

describe("The nav bar stopwatch", () => {
    let today: TodayPage;
    let global: GlobalPage;

    beforeEach(() => {
        today = new TodayPage();
        global = new GlobalPage();
    });

    it("logs time", () => {
        today.navigateFromHome();

        const stopwatchNoTimeString = "--:--";
        const activityType = "stopwatch test";

        const stopwatch = global.stopwatch;
        stopwatch.start.click();
        stopwatch.elapsedTime.should("not.contain.text", stopwatchNoTimeString);
        stopwatch.activityPicker.type(activityType);
        stopwatch.logTime.click();
        stopwatch.elapsedTime.should("contain.text", stopwatchNoTimeString);

        today.actvityLogList.entries.should("contain.text", activityType);
    });
});
