import { TodayPage } from "../pages/today.page.cy";

describe("(to)day page", () => {
    let today: TodayPage;

    beforeEach(() => {
        cy.clearAllLocalStorage();
        today = new TodayPage();
        today.navigateFromHome();
    });

    it("selects the day with the date picker", () => {
        for (const day of [1, 2, 3]) {
            cy.byTestId("pick-day-button").click();
            cy.get("[bsdatepickerdaydecorator]")
                .contains(new RegExp(`^${day}$`))
                .first()
                .click();
            const date = new Date();
            date.setDate(day);
            cy.byTestId("day-heading").should(
                "contain.text",
                date.toLocaleDateString()
            );
        }
    });
});
