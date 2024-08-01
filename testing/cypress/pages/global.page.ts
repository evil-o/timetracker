export class GlobalPage {
    public expectOvertime(hours: string, minutes: string): void {
        cy.get("app-overtime-badge").should("contain.text", `${hours}h ${minutes}m`);
    }

    public get settingsToggle(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.byTestId("settings-toggle");
    }

    public get importData(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.byTestId("import-data");

    }
    public get exportData(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.byTestId("export-data");
    }
}