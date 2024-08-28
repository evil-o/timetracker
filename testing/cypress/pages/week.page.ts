export class WeekPage {
    public visitViaNav(): void {
        cy.byTestId("week").click();
    }

    public get activityLogEntries(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get("app-activity-log-entry");
    }

    public get totalHours(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.byTestId("total-week-hours");
    }
}
