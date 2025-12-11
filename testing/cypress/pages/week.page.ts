export class WeekPage {
    public visitViaNav(): void {
        cy.byTestId("week").click();
    }

    public visitWeek(year: number, week: number): void {
        cy.visit(`week?year=${year}&week=${week}`);
    }
    public get activityLogEntries(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get("app-activity-log-entry");
    }

    public get totalHours(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.byTestId("total-week-hours");
    }

    public expectEntry(
        entryText: string,
        hours: string,
        minutes: string
    ): void {
        this.activityLogEntries
            .contains(entryText)
            .should("exist")
            .should("contain.text", `${hours}h ${minutes}m`);
    }

    public attendance = {
        get tabHeader(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy.get(".nav-item").contains("Attendance");
        },

        get sumTotalOvertimeBadge(): Cypress.Chainable<JQuery<HTMLElement>> {
            return cy.byTestId("sum-total-overtime");
        },
    };
}
