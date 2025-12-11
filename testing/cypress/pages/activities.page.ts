export class ActivitiesPage {
    public visitViaNav(): void {
        cy.byTestId("activities").click();
    }

    public activityList = {
        /** Actually returns the label because bootstrap covers the checkbox with it, so use click! */
        get nonWorkingCheckBoxes(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy.byTestId("non-working-label");
        },

        get activityColorPickers(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy.get("app-activity-color-picker");
        },

        get mergeButtons(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy.byTestId("merge-activity");
        },

        getColorMenuItem(
            colorName: string
        ): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy.get(`li[role="menuitem"]`).contains(colorName);
        },

        expectProps(
            name: string,
            nonWorking: boolean,
            archived: boolean
        ): void {
            cy.get("app-activity-type-list")
                .find("tr")
                .contains(name)
                .parents("tr")
                .findByTestId("non-working-cb")
                .should(nonWorking ? "be.checked" : "not.be.checked")
                .parents("tr")
                .findByTestId("archived-cb")
                .should(archived ? "be.checked" : "not.be.checked");
        },
    };

    public mergeActivitiesModal = {
        get mergeActivityTargetInput(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy.byTestId("merge-activity-target");
        },

        get confirmMergeButton(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy.byTestId("confirm-merge");
        },

        get mergeTargetSuggestions(): Cypress.Chainable<
            JQuery<HTMLButtonElement>
        > {
            return cy.get("typeahead-container").find("button");
        },
    };
}
