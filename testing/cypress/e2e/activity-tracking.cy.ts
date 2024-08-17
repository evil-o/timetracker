import { ActivitiesPage } from "../pages/activities.page";
import { GlobalPage } from "../pages/global.page";
import { TodayPage } from "../pages/today.page.cy";

type HourString = `${number | ""}${number}`;
type MinuteString = `${number}${number}`;

describe("Activity tracking", () => {
    let today: TodayPage;
    let activities: ActivitiesPage;
    let globalPage: GlobalPage;

    const defaultActivityType = "e2e test activity";
    const defaultDescription = "e2e test activity description";
    const defaultHours: HourString = "3";
    const defaultMinutes: MinuteString = "45";

    function enterLogEntry(
        activityType: string = defaultActivityType,
        description: string = defaultDescription,
        hours: HourString = defaultHours,
        minutes: MinuteString = defaultMinutes
    ): void {
        cy.log("create log entry");
        today.addActivity.activityInput.type(activityType);
        today.addActivity.activityDescription.type(description);
        today.addActivity.activityDudation.type(`${hours}:${minutes}`);
        today.addActivity.logActivityButton.click();
    }

    function expandLogEntry(activityType: string = defaultActivityType): void {
        cy.log("expand log entry");
        today.actvityLogList.entries.contains(activityType).click();
    }

    function expectEntryTime(
        hours: HourString = defaultHours,
        minutes: MinuteString = defaultMinutes
    ): void {
        today.actvityLogList.entryDurationBadges
            .first()
            .should("contain.text", `${hours}h ${minutes}m`);
    }

    beforeEach(() => {
        today = new TodayPage();
        globalPage = new GlobalPage();
        activities = new ActivitiesPage();
        today.navigateFromHome();
    });

    it("tracks activities", () => {
        const hours = "2";
        const minutes = "34";

        enterLogEntry(defaultActivityType, defaultDescription, hours, minutes);

        today.actvityLogList.entries.should(
            "contain.text",
            defaultActivityType
        );
        today.actvityLogList.entries.should(
            "contain.text",
            `${hours}h ${minutes}m`
        );
    });

    it("changes the description of a log entry", () => {
        const activityTypeDescriptionBefore = "e2e test activity before";
        const activityTypeDescriptionAfter = "e2e test activity after";

        enterLogEntry(defaultActivityType, activityTypeDescriptionBefore);

        expandLogEntry();

        const enterNewDescription = () => {
            today.actvityLogList.entryDescriptions
                .contains(activityTypeDescriptionBefore)
                .dblclick();
            today.actvityLogList.logEntryDescriptionInput
                .clear()
                .type(activityTypeDescriptionAfter);
        };

        cy.log("cancel and expect no change");
        enterNewDescription();
        today.actvityLogList.cancelDescriptionChange.click();

        cy.log("confirm and expect change");
        enterNewDescription();
        today.actvityLogList.confirmDescriptionChange.click();

        today.actvityLogList.entryDescriptions
            .contains(activityTypeDescriptionAfter)
            .should("exist");
    });

    it("changes the time of a log entry", () => {
        const newHours = "1";
        const newMinutes = "23";

        const enterNewHours = () => {
            today.actvityLogList.entryDurations.first().dblclick();
            today.actvityLogList.logEntryDurationInput
                .clear()
                .type(`${newHours}:${newMinutes}`);
        };

        enterLogEntry(defaultActivityType);

        expandLogEntry();

        cy.log("change duration and cancel");
        enterNewHours();
        today.actvityLogList.cancelDurationChange.click();

        cy.log("change duration and confirm");
        enterNewHours();
        today.actvityLogList.confirmDurationChange.click();

        expectEntryTime(newHours, newMinutes);
    });

    it("deletes log entries", () => {
        enterLogEntry();
        expectEntryTime();

        cy.log("cancel delete");
        expandLogEntry();
        today.actvityLogList.deleteLogEntryButton.click();
        today.actvityLogList.cancelDeleteLogEntryButton.click();
        expectEntryTime();

        cy.log("confirm delete");
        today.actvityLogList.deleteLogEntryButton.click();
        today.actvityLogList.confirmDeleteLogEntryButton.click();
        today.actvityLogList.noEntriesIndicator.should("exist");
    });
});
