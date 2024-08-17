export class ActivitiesPage {
    public visitViaNav(): void {
        cy.byTestId("activities").click();
    }

    public activityList = {
        /** Actually returns the label because bootstrap covers the checkbox with it, so use click! */
        get nonWorkingCheckBoxes(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy.byTestId("non-working-label");
        },
    };
}
