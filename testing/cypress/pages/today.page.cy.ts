export class TodayPage {
    public navigateFromHome(): void {
        cy.visit('')
        cy.byTestId('today').click()
    }

    public get startTimeInput(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.byTestId('day-start');
    }

    public get endTimeInput(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.byTestId('day-end');
    }

    public get submitAttendance(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.byTestId('submit-attendance');
    }

    public extraBookings = {
        get accordion(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy.byTestId('extra-bookings');
        },

        get add(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy.byTestId('add-extra-booking');
        },

        get descriptions(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy.byTestId('extra-booking-description');
        },

        get hours(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy.byTestId('extra-booking-hours');
        },

        get confirms(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy.byTestId('confirm-update-correction');
        },

        get deletes(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy.byTestId('cancel-update-correction');
        },
    }

    public addActivity = {
        get activityInput(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy.get("app-day").findByTestId('activity-input');
        },

        get activityDescription(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy.get("app-day").findByTestId('activity-description');
        },

        get activityDudation(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy.get("app-day").findByTestId('duration');
        },

        get logActivityButton(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy.get("app-day").findByTestId('log-activity-btn');
        },
    }

    public actvityLogList = {
        get entries() {
            return cy.get("app-actvity-log-list").get("app-activity-log-entry");
        }
    }
}