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
}