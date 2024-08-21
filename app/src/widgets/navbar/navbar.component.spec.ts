import { ComponentFixture, TestBed } from "@angular/core/testing";

import { APP_BASE_HREF } from "@angular/common";

import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NavbarComponent } from "./navbar.component";

import { Store, StoreModule } from "@ngrx/store";

import { NO_ERRORS_SCHEMA } from "@angular/core";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { TabsModule } from "ngx-bootstrap/tabs";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { appRoutes } from "../../app/app.routes";
import { configurationActions } from "../../app/redux/actions/configuration.actions";
import { ApplicationState } from "../../app/redux/states/application-state";
import { attendanceActions } from "../../entities/attendance/attendance.actions";
import { WeekComponent } from "../../pages/week/week.component";
import { WelcomeComponent } from "../../pages/welcome/welcome.component";
import { ActivityColorPickerComponent } from "../../shared/legacy/activity-color-picker/activity-color-picker.component";
import { ActivityLogEntryComponent } from "../../shared/legacy/activity-log-entry/activity-log-entry.component";
import { ActivityPickerComponent } from "../../shared/legacy/activity-picker/activity-picker.component";
import { ActivityTypeListComponent } from "../../shared/legacy/activity-type-list/activity-type-list.component";
import { ActivityLogListComponent } from "../../shared/legacy/actvity-log-list/actvity-log-list.component";
import { DayAttendanceComponent } from "../../shared/legacy/day-attendance/day-attendance.component";
import { EditableLogEntryDescriptionComponent } from "../../shared/legacy/editable-log-entry-description/editable-log-entry-description.component";
import { EditableLogEntryHoursComponent } from "../../shared/legacy/editable-log-entry-hours/editable-log-entry-hours.component";
import { valueToTime } from "../../shared/legacy/helpers";
import { HourBadgeComponent } from "../../shared/legacy/hour-badge/hour-badge.component";
import { NoActivityLogEntryPresentComponent } from "../../shared/legacy/no-activity-log-entry-present/no-activity-log-entry-present.component";
import { OvertimeBadgeComponent } from "../../shared/legacy/overtime-badge/overtime-badge.component";
import { FormatHoursPipe } from "../../shared/legacy/pipes/format-hours.pipe";
import { GroupActivityLogEntriesByIdPipe } from "../../shared/legacy/pipes/group-activity-log-entries-by-id.pipe";
import { LogEntryTallyPipe } from "../../shared/legacy/pipes/log-entry-tally.pipe";
import { PadNumberPipe } from "../../shared/legacy/pipes/pad-number.pipe";
import { PrecisionPipe } from "../../shared/legacy/pipes/precision.pipe";
import { TallyComponent } from "../../shared/legacy/tally/tally.component";
import { TimeBadgeComponent } from "../../shared/legacy/time-badge/time-badge.component";

xdescribe("NavbarComponent", () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;
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
                ActivityColorPickerComponent,
                ActivityTypeListComponent,
                ActivityLogEntryComponent,
                ActivityLogListComponent,
                ActivityPickerComponent,
                DayAttendanceComponent,
                EditableLogEntryDescriptionComponent,
                EditableLogEntryHoursComponent,
                FormatHoursPipe,
                GroupActivityLogEntriesByIdPipe,
                HourBadgeComponent,
                LogEntryTallyPipe,
                NavbarComponent,
                NoActivityLogEntryPresentComponent,
                OvertimeBadgeComponent,
                PadNumberPipe,
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
                StoreModule.forRoot(),
                TabsModule.forRoot(),
                TypeaheadModule.forRoot(),
                RouterModule.forRoot(appRoutes),
            ],
            providers: [{ provide: APP_BASE_HREF, useValue: "/" }],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        store = TestBed.get(Store);
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should correctly display overall overtime for 40h work week", () => {
        store.dispatch(
            configurationActions.setWeeklyWorkHours({ newWeeklyHours: 40 })
        );

        // -4
        setAttendance("8:30", "12:30", new Date(2018, 0, 1));
        // +2
        setAttendance("8:30", "18:30", new Date(2018, 0, 2));
        // +4
        setAttendance("8:30", "20:30", new Date(2018, 0, 3));
        // +3
        setAttendance("8:30", "19:30", new Date(2018, 0, 4));
        // 0
        setAttendance("8:30", "16:30", new Date(2018, 0, 5));

        component.overallAttendanceSum$.subscribe((sum) => {
            expect(sum).toBe(5);
        });
    });

    it("should correctly display overall overtime for 16h work week", () => {
        store.dispatch(
            configurationActions.setWeeklyWorkHours({ newWeeklyHours: 16 })
        );
        store.dispatch(
            configurationActions.setWeeklyWorkDays({ newWeeklyWorkDays: 2 })
        );

        // -4
        setAttendance("8:30", "12:30", new Date(2018, 0, 1));
        // +2
        setAttendance("8:30", "18:30", new Date(2018, 0, 2));

        component.overallAttendanceSum$.subscribe((sum) => {
            expect(sum).toBe(-2);
        });
    });
});
