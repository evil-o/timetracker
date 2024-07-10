import { GlobalPage } from "./pages/global.page";
import { TodayPage } from "./pages/today.page.cy"

describe('The time tracker', () => {
  let page: TodayPage;
  let globalPage: GlobalPage;

  beforeEach(() => {
    page = new TodayPage();
    globalPage = new GlobalPage();
  })

  it('tracks attendance for a day', () => {
    page.navigateFromHome();

    page.startTimeInput.type("08:00");
    page.endTimeInput.type("12:00");
    page.submitAttendance.click();
    page.startTimeInput.should("have.class", "is-valid");
    page.endTimeInput.should("have.class", "is-valid");
    globalPage.expectOvertime("-4:00");
  })
})