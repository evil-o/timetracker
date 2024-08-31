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
import {
    EditableLogEntryDescriptionComponent,
    EditableLogEntryHoursComponent,
    GroupActivityLogEntriesByIdPipe,
    NoActivityLogEntryPresentComponent,
} from "../../../../entities/activity-log";
import { ActivityPickerComponent } from "../../../../entities/activity-type";
import { ApplicationState } from "../../../../entities/application";
import { attendanceActions } from "../../../../entities/attendance";
import { configurationActions } from "../../../../entities/configuration";
import { OvertimeBadgeComponent } from "../../../../features/activity-aggregation";
import { AcivityColorFeaturesModule } from "../../../../features/activity-color";
import { ActivityLogEntryComponent } from "../../../../features/activity-log";
import { WeekComponent } from "../../../../pages/week";
import { WelcomeComponent } from "../../../../pages/welcome";
import {
    FormatHoursPipe,
    PadNumberPipe,
    PrecisionPipe,
    valueToTime,
} from "../../../../shared/lib";
import { HourBadgeComponent, TimeBadgeComponent } from "../../../../shared/ui";
import {
    ActivityLogListComponent,
    TallyComponent,
} from "../../../activity-log";
import { DayAttendanceComponent } from "../../../attendance";

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
                ActivityLogEntryComponent,
                ActivityLogListComponent,
                ActivityPickerComponent,
                DayAttendanceComponent,
                EditableLogEntryDescriptionComponent,
                EditableLogEntryHoursComponent,
                FormatHoursPipe,
                GroupActivityLogEntriesByIdPipe,
                HourBadgeComponent,
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
                RouterModule.forRoot([]),
                AcivityColorFeaturesModule,
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
