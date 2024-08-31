import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { provideMockStore } from "@ngrx/store/testing";
import { Subject } from "rxjs";
import { DayAttendanceComponent } from "./day-attendance.component";

describe(DayAttendanceComponent.name, () => {
    const create = createComponentFactory({
        component: DayAttendanceComponent,
        shallow: true,
        providers: [provideMockStore()],
    });
    let spectator: Spectator<DayAttendanceComponent>;

    beforeEach(() => {
        spectator = create({ props: { date$: new Subject<Date>() } });
    });

    it("should create", () => {
        expect(spectator.component).toBeTruthy();
    });
});
