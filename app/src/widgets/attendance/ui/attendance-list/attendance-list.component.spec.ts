import { faker } from "@faker-js/faker";
import { byTestId, createComponentFactory, Spectator } from "@ngneat/spectator";
import { MockPipes } from "ng-mocks";
import { IAttendanceWithTimes } from "../../../../entities/application";
import { FormatHoursPipe } from "../../../../shared/lib";
import { IWeekAttendanceStats } from "../../model/week-attendance-stats";
import { AttendanceListComponent } from "./attendance-list.component";

function createAttendanceEntry(): IAttendanceWithTimes {
    return {
        date: faker.date.past(),
    };
}

function createWeekAttendanceStats(): IWeekAttendanceStats {
    return {
        totalHours: faker.number.float({ min: 0, max: 10 }),
        totalNonWorkingHours: faker.number.float({ min: 0, max: 10 }),
        totalOvertime: faker.number.float({ min: 0, max: 10 }),
    };
}

describe(AttendanceListComponent.name, () => {
    const create = createComponentFactory({
        component: AttendanceListComponent,
        shallow: true,
        declarations: [MockPipes(FormatHoursPipe)],
    });

    let spectator: Spectator<AttendanceListComponent>;

    let attendances: IAttendanceWithTimes[];
    let attendanceStats: IWeekAttendanceStats;

    let attendanceRows: HTMLElement[];
    let sumTotalOvertime: HTMLElement;

    beforeEach(() => {
        attendances = [];
        for (let i = 0; i < faker.number.int({ min: 0, max: 20 }); ++i) {
            attendances.push(createAttendanceEntry());
        }

        attendanceStats = createWeekAttendanceStats();

        spectator = create({ props: { attendances, attendanceStats } });

        attendanceRows = spectator.queryAll(
            byTestId("attendance-row")
        ) as HTMLElement[];
        sumTotalOvertime = spectator.query(
            byTestId("sum-total-overtime")
        ) as HTMLElement;
    });

    it("creates a row for each attendance entry", () => {
        expect(attendanceRows.length).toEqual(attendances.length);
    });

    it("shows a summary line", () => {
        expect(sumTotalOvertime).toHaveProperty(
            "hours",
            attendanceStats.totalOvertime as unknown as string
        );
    });
});
