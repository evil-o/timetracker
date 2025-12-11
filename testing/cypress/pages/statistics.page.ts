export class StatisticsPage {
    public visitViaNav(): void {
        cy.byTestId("statistics").click();
    }
}
