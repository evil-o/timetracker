import { discardPeriodicTasks, fakeAsync } from "@angular/core/testing";

import { Store } from "@ngrx/store";

import { ActivatedRoute } from "@angular/router";
import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { provideMockStore } from "@ngrx/store/testing";
import { MockPipes, MockProvider } from "ng-mocks";
import { BsModalService } from "ngx-bootstrap/modal";
import { of } from "rxjs";
import {
    ActivityLog,
    GroupActivityLogEntriesByIdPipe,
} from "../../entities/activity-log";
import { activityLogActions } from "../../entities/activity-log/models/activity-log.actions";
import { ActivityTypes } from "../../entities/activity-type";
import { ApplicationState } from "../../entities/application/models/application.model";
import { AttendanceState } from "../../entities/attendance";
import { attendanceActions } from "../../entities/attendance/models/attendance.actions";
import { ConfigurationState } from "../../entities/configuration";
import { configurationActions } from "../../entities/configuration/models/configuration.actions";
import {
    FormatHoursPipe,
    getFirstDayOfCalendarWeek,
    valueToTime,
} from "../../shared/lib";
import { WeekComponent } from "./week.component";

describe(WeekComponent.name, () => {
    const create = createComponentFactory({
        component: WeekComponent,
        shallow: true,
        providers: [
            {
                provide: ActivatedRoute,
                useValue: { params: of({ year: 2018, week: 1 }) },
            },
            MockProvider(BsModalService),
            ...provideMockStore<Partial<ApplicationState>>({
                initialState: {
                    activityTypes: new ActivityTypes(),
                    activityLog: new ActivityLog(),
                    attendanceState: new AttendanceState(),
                    configuration: new ConfigurationState(),
                },
            }),
        ],
        declarations: [
            MockPipes(FormatHoursPipe, GroupActivityLogEntriesByIdPipe),
        ],
    });
    let spectator: Spectator<WeekComponent>;
    let component: WeekComponent;
    let store: Store<ApplicationState>;

    function setAttendance(start: string, end: string, date: Date) {
        store.dispatch(
            attendanceActions.setStartTime({ date, start: valueToTime(start)! })
        );
        store.dispatch(
            attendanceActions.setEndTime({ date, end: valueToTime(end)! })
        );
    }

    beforeEach(() => {
        spectator = create();
        component = spectator.component;
        store = spectator.inject(Store);
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    xit("should be correct for normal part time weeks", fakeAsync(() => {
        expect(component.week!.year).toBe(2018);
        expect(component.week!.week).toBe(1);
        const start = getFirstDayOfCalendarWeek(
            component.week!.year,
            component.week!.week
        );
        const weekDates: Date[] = [];
        for (let d = 0; d < 7; ++d) {
            const date = new Date(start);
            date.setDate(date.getDate() + d);
            weekDates.push(date);
        }

        const a1 = "test activity 1";
        store.dispatch(
            activityLogActions.fetchOrCreateIdAndLogTime({
                name: a1,
                hoursToLog: 4,
                date: weekDates[0],
            })
        );
        store.dispatch(
            activityLogActions.fetchOrCreateIdAndLogTime({
                name: a1,
                hoursToLog: 3,
                date: weekDates[1],
            })
        );
        store.dispatch(
            configurationActions.setWeeklyWorkHours({ newWeeklyHours: 16 })
        );
        store.dispatch(
            configurationActions.setWeeklyWorkDays({ newWeeklyWorkDays: 2 })
        );

        // 4 hours on day 1
        setAttendance("8:30", "12:30", weekDates[0]);
        // 3 hours on day 2
        setAttendance("9:30", "12:30", weekDates[1]);

        spectator.detectChanges();

        component.activityLogEntries$.subscribe((entries) => {
            expect(entries.length).toBe(2);
        });

        component.loggedSum$.subscribe((sum) => {
            expect(sum).toBe(7);
        });

        component.attendances$.subscribe((attendances) => {
            expect(attendances.length).toBe(2);
            const expectedOvertimes = [-4, -5];
            for (const attendance of attendances) {
                const day_of_week =
                    (attendance.date.getTime() - weekDates[0].getTime()) /
                    (1000 * 60 * 60 * 24);
                const expected = expectedOvertimes[day_of_week];
                expect(attendance.overtime).toBe(expected);
            }
        });

        component.overallAttendanceSum$.subscribe((overtimeSum) => {
            expect(overtimeSum).toBe(-9);
        });

        discardPeriodicTasks();
    }));
});
