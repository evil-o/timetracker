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

import { EffectsModule } from "@ngrx/effects";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { BsModalService } from "ngx-bootstrap/modal";
import { TabsModule } from "ngx-bootstrap/tabs";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { of } from "rxjs";
import { GroupActivityLogEntriesByIdPipe } from "../../entities/activity-log/lib/group-activity-log-entries-by-id.pipe";
import { activityLogActions } from "../../entities/activity-log/models/activity-log.actions";
import { EditableLogEntryDescriptionComponent } from "../../entities/activity-log/ui/editable-log-entry-description/editable-log-entry-description.component";
import { EditableLogEntryHoursComponent } from "../../entities/activity-log/ui/editable-log-entry-hours/editable-log-entry-hours.component";
import { NoActivityLogEntryPresentComponent } from "../../entities/activity-log/ui/no-activity-log-entry-present/no-activity-log-entry-present.component";
import { ActivityTypeIdToNamePipe } from "../../entities/activity-type/lib/activity-type-id-to-name.pipe";
import { ActivityPickerComponent } from "../../entities/activity-type/ui";
import { entityEffects } from "../../entities/application/effects";
import { ApplicationState } from "../../entities/application/models/application.model";
import { attendanceActions } from "../../entities/attendance/models/attendance.actions";
import { configurationActions } from "../../entities/configuration/models/configuration.actions";
import { OvertimeBadgeComponent } from "../../features/activity-aggregation/ui/overtime-badge/overtime-badge.component";
import { AcivityColorFeaturesModule } from "../../features/activity-color/activity-color-features.module";
import { ActivityLogEntryComponent } from "../../features/activity-log/ui/activity-log-entry/activity-log-entry.component";
import {
    FormatHoursPipe,
    getFirstDayOfCalendarWeek,
    valueToTime,
} from "../../shared/lib";
import { PrecisionPipe } from "../../shared/lib/precision.pipe";
import { HourBadgeComponent } from "../../shared/ui/hour-badge/hour-badge.component";
import { TimeBadgeComponent } from "../../shared/ui/time-badge/time-badge.component";
import { ActivityLogListComponent } from "../../widgets/activity-log/ui/activity-log-list/actvity-log-list.component";
import { TallyComponent } from "../../widgets/activity-log/ui/tally/tally.component";
import { DayAttendanceComponent } from "../../widgets/attendance/ui/day-attendance/day-attendance.component";
import { NavigationWidgetsModule } from "../../widgets/navigation/navigation-widgets.module";
import { ActivitiesComponent } from "../activities/ui/activities.component";
import { ConfigurationComponent } from "../configuration";
import { DayComponent } from "../day/ui/day.component";
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
                ActivityLogEntryComponent,
                ActivityLogListComponent,
                ActivityPickerComponent,
                ActivityTypeIdToNamePipe,
                ConfigurationComponent,
                DayComponent,
                DayAttendanceComponent,
                EditableLogEntryDescriptionComponent,
                EditableLogEntryHoursComponent,
                FormatHoursPipe,
                GroupActivityLogEntriesByIdPipe,
                HourBadgeComponent,
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
                RouterModule.forRoot([]),
                StoreModule.forRoot(),
                EffectsModule.forRoot(entityEffects),
                TabsModule.forRoot(),
                TypeaheadModule.forRoot(),
                AcivityColorFeaturesModule,
                NavigationWidgetsModule,
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
