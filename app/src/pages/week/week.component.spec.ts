import {
    ComponentFixture,
    discardPeriodicTasks,
    fakeAsync,
    TestBed,
} from "@angular/core/testing";

import { APP_BASE_HREF } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, RouterModule } from "@angular/router";

import { Store, StoreModule } from "@ngrx/store";

import { appRoutes } from "../../app/app.routes";

import { EffectsModule } from "@ngrx/effects";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { BsModalService } from "ngx-bootstrap/modal";
import { TabsModule } from "ngx-bootstrap/tabs";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { of } from "rxjs";
import { ActivityColorPickerComponent } from "../../app/components/activity-color-picker/activity-color-picker.component";
import { ActivityLogEntryComponent } from "../../app/components/activity-log-entry/activity-log-entry.component";
import { ActivityPickerComponent } from "../../app/components/activity-picker/activity-picker.component";
import { ActivityTypeListComponent } from "../../app/components/activity-type-list/activity-type-list.component";
import { ActivityLogListComponent } from "../../app/components/actvity-log-list/actvity-log-list.component";
import { DayAttendanceComponent } from "../../app/components/day-attendance/day-attendance.component";
import { EditableLogEntryDescriptionComponent } from "../../app/components/editable-log-entry-description/editable-log-entry-description.component";
import { EditableLogEntryHoursComponent } from "../../app/components/editable-log-entry-hours/editable-log-entry-hours.component";
import { HourBadgeComponent } from "../../app/components/hour-badge/hour-badge.component";
import { NoActivityLogEntryPresentComponent } from "../../app/components/no-activity-log-entry-present/no-activity-log-entry-present.component";
import { OvertimeBadgeComponent } from "../../app/components/overtime-badge/overtime-badge.component";
import { TallyComponent } from "../../app/components/tally/tally.component";
import { TimeBadgeComponent } from "../../app/components/time-badge/time-badge.component";
import { getFirstDayOfCalendarWeek, valueToTime } from "../../app/helpers";
import { ActivityTypeIdToNamePipe } from "../../app/pipes/activity-type-id-to-name.pipe";
import { FormatHoursPipe } from "../../app/pipes/format-hours.pipe";
import { GroupActivityLogEntriesByIdPipe } from "../../app/pipes/group-activity-log-entries-by-id.pipe";
import { LogEntryTallyPipe } from "../../app/pipes/log-entry-tally.pipe";
import { PrecisionPipe } from "../../app/pipes/precision.pipe";
import { activityLogActions } from "../../app/redux/actions/activity-log.actions";
import { attendanceActions } from "../../app/redux/actions/attendance.actions";
import { configurationActions } from "../../app/redux/actions/configuration.actions";
import { effects } from "../../app/redux/effects";
import { ApplicationState } from "../../app/redux/states/application-state";
import { ActivitiesComponent } from "../activities/activities.component";
import { ConfigurationComponent } from "../configuration/configuration.component";
import { DayComponent } from "../day/day.component";
import { WelcomeComponent } from "../welcome/welcome.component";
import { WeekComponent } from "./week.component";

describe("WeekComponent", () => {
    let component: WeekComponent;
    let fixture: ComponentFixture<WeekComponent>;
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
        TestBed.configureTestingModule({
            declarations: [
                ActivitiesComponent,
                ActivityColorPickerComponent,
                ActivityLogEntryComponent,
                ActivityLogListComponent,
                ActivityPickerComponent,
                ActivityTypeIdToNamePipe,
                ActivityTypeListComponent,
                ConfigurationComponent,
                DayComponent,
                DayAttendanceComponent,
                EditableLogEntryDescriptionComponent,
                EditableLogEntryHoursComponent,
                FormatHoursPipe,
                GroupActivityLogEntriesByIdPipe,
                HourBadgeComponent,
                LogEntryTallyPipe,
                NoActivityLogEntryPresentComponent,
                OvertimeBadgeComponent,
                PrecisionPipe,
                TallyComponent,
                TimeBadgeComponent,
                WeekComponent,
                WelcomeComponent,
            ],
            imports: [
                AccordionModule.forRoot(),
                BsDatepickerModule.forRoot(),
                FormsModule,
                RouterModule.forRoot(appRoutes),
                StoreModule.forRoot(),
                EffectsModule.forRoot(effects),
                TabsModule.forRoot(),
                TypeaheadModule.forRoot(),
            ],
            providers: [
                { provide: APP_BASE_HREF, useValue: "/" },
                { provide: BsModalService },
                {
                    provide: ActivatedRoute,
                    useValue: { params: of({ year: 2018, week: 1 }) },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WeekComponent);
        component = fixture.componentInstance;
        store = TestBed.get(Store);
        fixture.detectChanges();
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

        fixture.detectChanges();

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
