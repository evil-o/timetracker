import { TodayPage } from "../pages/today.page.cy";
import { DayPageWorkflows, HourString } from "../support/today.workflows";

describe("Activity tracking", () => {
    let today: TodayPage;
    let dayWorkflows: DayPageWorkflows;

    function expandLogEntry(
        activityType: string = DayPageWorkflows.defaultActivityType
    ): void {
        today.expandLogEntryByType(activityType);
    }

    beforeEach(() => {
        today = new TodayPage();
        dayWorkflows = new DayPageWorkflows(today);
        today.navigateFromHome();
    });

    it("tracks activities", () => {
        const hours = "2";
        const minutes = "34";

        dayWorkflows.enterLogEntry(
            DayPageWorkflows.defaultActivityType,
            DayPageWorkflows.defaultDescription,
            hours,
            minutes
        );

        today.actvityLogList.entries.should(
            "contain.text",
            DayPageWorkflows.defaultActivityType
        );
        today.actvityLogList.entries.should(
            "contain.text",
            `${hours}h ${minutes}m`
        );
    });

    it("changes the description of a log entry", () => {
        const activityTypeDescriptionBefore = "e2e test activity before";
        const activityTypeDescriptionAfter1 = "e2e test activity after 1";
        const activityTypeDescriptionAfter2 = "e2e test activity after 2";

        dayWorkflows.enterLogEntry(
            DayPageWorkflows.defaultActivityType,
            activityTypeDescriptionBefore
        );

        expandLogEntry();

        const enterNewDescription = (
            oldDescription: string,
            newDescription: string
        ) => {
            today.actvityLogList.entryDescriptions
                .contains(oldDescription)
                .dblclick();
            today.actvityLogList.logEntryDescriptionInput
                .clear()
                .type(newDescription);
        };

        cy.log("cancel and expect no change");
        enterNewDescription(
            activityTypeDescriptionBefore,
            activityTypeDescriptionAfter1
        );
        today.actvityLogList.cancelDescriptionChange.click();

        cy.log("confirm and expect change via button click");
        enterNewDescription(
            activityTypeDescriptionBefore,
            activityTypeDescriptionAfter1
        );
        today.actvityLogList.confirmDescriptionChange.click();

        today.actvityLogList.entryDescriptions
            .contains(activityTypeDescriptionAfter1)
            .should("exist");

        cy.log("confirm and expect change via keyboard (enter)");
        expandLogEntry();
        enterNewDescription(
            activityTypeDescriptionAfter1,
            activityTypeDescriptionAfter2
        );
        cy.focused().type("{enter}");

        today.actvityLogList.entryDescriptions
            .contains(activityTypeDescriptionAfter2)
            .should("exist");
    });

    it("changes the time of a log entry", () => {
        const newHours = "1";
        const newMinutesMouse = "23";
        const newMinutesKeyboard = "34";

        const enterNewHours = (newMinutes: HourString) => {
            today.actvityLogList.entryDurations.first().dblclick();
            today.actvityLogList.logEntryDurationInput
                .clear()
                .type(`${newHours}:${newMinutes}`);
        };

        dayWorkflows.enterLogEntry(DayPageWorkflows.defaultActivityType);

        expandLogEntry();

        cy.log("change duration and cancel");
        enterNewHours(newMinutesMouse);
        today.actvityLogList.cancelDurationChange.click();

        cy.log("change duration and confirm via mouse");
        enterNewHours(newMinutesMouse);
        today.actvityLogList.confirmDurationChange.click();

        dayWorkflows.expectEntryTime(
            DayPageWorkflows.defaultActivityType,
            newHours,
            newMinutesMouse
        );

        cy.log("change duration and confirm via keyboard");
        expandLogEntry();

        enterNewHours(newMinutesKeyboard);
        cy.focused().type("{enter}");

        dayWorkflows.expectEntryTime(
            DayPageWorkflows.defaultActivityType,
            newHours,
            newMinutesKeyboard
        );
    });

    it("deletes log entries", () => {
        dayWorkflows.enterLogEntry();
        dayWorkflows.expectEntryTime();

        cy.log("cancel delete");
        expandLogEntry();
        today.actvityLogList.deleteLogEntryButton.click();
        today.actvityLogList.cancelDeleteLogEntryButton.click();
        dayWorkflows.expectEntryTime();

        cy.log("confirm delete");
        today.actvityLogList.deleteLogEntryButton.click();
        today.actvityLogList.confirmDeleteLogEntryButton.click();
        today.actvityLogList.noEntriesIndicator.should("exist");
    });

    it("can be used via keyboard", () => {
        const hours = "3";
        const minutes = "45";
        const activityType = "keyboard";
        const activityDesc = "keyboard control test";

        cy.log("add base activity");
        dayWorkflows.enterLogEntry(activityType, activityDesc, hours, "00");

        cy.log(
            "enter first characters of activity type, select autocomplete with enter"
        );
        today.addActivity.activityInput.click();
        today.addActivity.activityInput.should("be.focused");
        cy.focused().clear().type(activityType.slice(0, 1));

        cy.log("enter -> expect to be in minutes input");
        cy.focused().type("{enter}");
        today.addActivity.activityDudation.should("be.focused");
        cy.focused().type(`:${minutes}`);

        cy.log("enter -> expect submit");
        cy.focused().type("{enter}");

        expandLogEntry(activityType);
        dayWorkflows.expectEntryTime(activityType, hours, minutes);
    });
});
