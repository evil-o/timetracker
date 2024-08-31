export class GlobalPage {
    public get overtimeBadge(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.byTestId("total-overtime");
    }

    public expectOvertime(hours: string, minutes: string): void {
        this.overtimeBadge.should("contain.text", `${hours}h ${minutes}m`);
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

    public stopwatch = {
        get elapsedTime(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy.byTestId("time-elapsed");
        },

        get start(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy.byTestId("start-stopwatch");
        },

        get pause(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy.byTestId("pause-stopwatch");
        },

        get reset(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy.byTestId("reset-stopwatch");
        },

        get activityPicker(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy.byTestId("pick-stopwatch-activity");
        },

        get logTime(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy.byTestId("stopwatch-log");
        },
    };
}
