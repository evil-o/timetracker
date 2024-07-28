export class GlobalPage {
    public expectOvertime(hours: string, minutes: string): void {
        cy.get("app-overtime-badge").should("contain.text", `${hours}h ${minutes}m`);
    }
}