import { TodayPage } from "../pages/today.page.cy";
import { WeekPage } from "../pages/week.page";
import { DayPageWorkflows } from "../support/today.workflows";

import { faker } from "@faker-js/faker";

describe("Week overview", () => {
    let today: TodayPage;
    let week: WeekPage;
    let dayWorkflows: DayPageWorkflows;

    const hoursToHMString = (hours: number, minutes: number) => {
        while (minutes >= 60) {
            minutes -= 60;
            hours += 1;
        }
        let paddedMinutes = `${minutes}`;
        if (paddedMinutes.length < 2) {
            paddedMinutes = `0${paddedMinutes}`;
        }
        return `${hours}h ${paddedMinutes}m`;
    };

    beforeEach(() => {
        today = new TodayPage();
        week = new WeekPage();
        dayWorkflows = new DayPageWorkflows(today);
    });

    it("shows entries that were logged today", () => {
        cy.log("Create entries on today page");

        today.navigateFromHome();

        const activityType1 = faker.word.verb();
        const activityType2 = faker.word.verb();

        const makeHours = () => faker.number.int({ min: 0, max: 5 });
        const makeMinutes = () => faker.number.int({ min: 0, max: 59 });

        const makeActivity = (activityType: string) => ({
            type: activityType,
            description: faker.word.verb(),
            hours: makeHours(),
            minutes: makeMinutes(),
        });
        const a1 = makeActivity(activityType1);
        const a2 = makeActivity(activityType1);
        const a3 = makeActivity(activityType2);
        const entries = [a1, a2, a3] as const;

        for (const { type, description, hours, minutes } of entries) {
            dayWorkflows.enterLogEntry(type, description, hours, minutes);
        }

        cy.log("Check entries on week page");
        week.visitViaNav();

        week.activityLogEntries
            .contains(activityType1)
            .find("app-hour-badge")
            .should(
                "contain.text",
                hoursToHMString(a1.hours + a2.hours, a1.minutes + a2.minutes)
            );
        week.activityLogEntries
            .contains(activityType2)
            .find("app-hour-badge")
            .should("contain.text", hoursToHMString(a3.hours, a3.minutes));

        week.totalHours.should(
            "contain.text",
            hoursToHMString(
                a1.hours + a2.hours + a3.hours,
                a1.minutes + a2.minutes + a3.minutes
            )
        );
    });

    it("shows today's attendance on the week overview", () => {
        cy.log("Create attendance on today page");

        today.navigateFromHome();

        today.startTimeInput.type("07:30");
        today.endTimeInput.type("16:15");
        today.submitAttendance.click();

        cy.log("Check attendance on week page");
        week.visitViaNav();

        week.attendance.tabHeader.click();
        week.attendance.sumTotalOvertimeBadge.should("contain.text", "+0h 45m");
    });
});
