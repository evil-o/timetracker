import { byTestId, createComponentFactory, Spectator } from "@ngneat/spectator";
import { MockModule } from "ng-mocks";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { QuickDayPickerComponent } from "./quick-day-picker";

describe(QuickDayPickerComponent.name, () => {
    const create = createComponentFactory({
        component: QuickDayPickerComponent,
        shallow: true,
        imports: [MockModule(BsDatepickerModule)],
    });
    let spectator: Spectator<QuickDayPickerComponent>;

    let date: Date;

    let today: HTMLElement;
    let previousDay: HTMLElement;
    let nextDay: HTMLElement;

    beforeEach(() => {
        date = new Date();
        spectator = create({ props: { date } });

        spyOn(spectator.component.datePicked, "emit");

        today = spectator.query(byTestId("today")) as HTMLElement;
        previousDay = spectator.query(byTestId("previous-day")) as HTMLElement;
        nextDay = spectator.query(byTestId("next-day")) as HTMLElement;
    });

    it("picks today with a single button click", () => {
        spectator.click(today);
        expect(spectator.component.datePicked.emit).toHaveBeenCalled();
    });

    it("picks the previous day", () => {
        spectator.click(previousDay);
        const prevouosDayDate = new Date(date);
        prevouosDayDate.setDate(prevouosDayDate.getDate() - 1);
        expect(spectator.component.datePicked.emit).toHaveBeenCalledOnceWith(
            prevouosDayDate
        );
    });

    it("picks the next day", () => {
        spectator.click(nextDay);
        const nextDayDate = new Date(date);
        nextDayDate.setDate(nextDayDate.getDate() + 1);
        expect(spectator.component.datePicked.emit).toHaveBeenCalledOnceWith(
            nextDayDate
        );
    });
});
