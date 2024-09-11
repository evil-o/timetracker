export class TodayPage {
    public navigateFromHome(): void {
        cy.visit("");
        this.visitViaNav();
    }

    public visitViaNav(): void {
        cy.byTestId("today").click();
    }

    public expandLogEntryByType(activityType: string): void {
        cy.log("expand log entry");
        this.actvityLogList.entries.contains(activityType).click();
    }

    public get startTimeInput(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.byTestId("day-start");
    }

    public get endTimeInput(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.byTestId("day-end");
    }

    public get submitAttendance(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.byTestId("submit-attendance");
    }

    public get dayOvertime(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.byTestId("day-overtime");
    }

    public expectDayOvertime(hours: string, minutes: string): void {
        this.dayOvertime.should("contain.text", `${hours}h ${minutes}m`);
    }

    public extraBookings = {
        get accordion(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy.byTestId("extra-bookings");
        },

        get add(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy.byTestId("add-extra-booking");
        },

        get descriptions(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy.byTestId("extra-booking-description");
        },

        get hours(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy.byTestId("extra-booking-hours");
        },

        get confirms(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy.byTestId("confirm-update-correction");
        },

        get deletes(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy.byTestId("cancel-update-correction");
        },
    };

    public addActivity = {
        get activityInput(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy.get("app-day").findByTestId("activity-input");
        },

        get activityDescription(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy.get("app-day").findByTestId("activity-description");
        },

        get activityDudation(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy.get("app-day").findByTestId("duration");
        },

        get logActivityButton(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy.get("app-day").findByTestId("log-activity-btn");
        },
    };

    public actvityLogList = {
        get entries(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy.get("app-actvity-log-list").get("app-activity-log-entry");
        },

        get noEntriesIndicator(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy.get("app-no-activity-log-entry-present");
        },

        get entryDurationBadges(): Cypress.Chainable<JQuery<HTMLElement>> {
            return this.entries.find("app-hour-badge");
        },

        get entryDescriptions(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy
                .get("app-actvity-log-list")
                .byTestId("activity-log-descriptions");
        },

        get logEntryDescriptionInput(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy
                .get("app-editable-log-entry-description")
                .findByTestId("item-input");
        },

        get confirmDescriptionChange(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy
                .get("app-editable-log-entry-description")
                .findByTestId("confirm-item-change");
        },

        get cancelDescriptionChange(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy
                .get("app-editable-log-entry-description")
                .findByTestId("cancel-item-change");
        },

        get entryDurations(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy
                .get("app-actvity-log-list")
                .get("app-editable-log-entry-hours");
        },

        get logEntryDurationInput(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy
                .get("app-editable-log-entry-hours")
                .findByTestId("item-input");
        },

        get confirmDurationChange(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy
                .get("app-editable-log-entry-hours")
                .findByTestId("confirm-item-change");
        },

        get cancelDurationChange(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy
                .get("app-editable-log-entry-hours")
                .findByTestId("cancel-item-change");
        },

        get deleteLogEntryButton(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy.byTestId("delete-activity-log-entry");
        },

        get confirmDeleteLogEntryButton(): Cypress.Chainable<
            JQuery<HTMLElement>
        > {
            return cy.byTestId("delete-activity-log-entry-confirm");
        },

        get cancelDeleteLogEntryButton(): Cypress.Chainable<
            JQuery<HTMLElement>
        > {
            return cy.byTestId("delete-activity-log-entry-cancel");
        },
    };
}
