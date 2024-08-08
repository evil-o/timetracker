import { ComponentFixture, TestBed } from '@angular/core/testing';

import { APP_BASE_HREF } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';


import { Store, StoreModule } from '@ngrx/store';


import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { appRoutes } from '../app.routes';
import { ActivityColorPickerComponent } from '../components/activity-color-picker/activity-color-picker.component';
import { ActivityLogEntryComponent } from '../components/activity-log-entry/activity-log-entry.component';
import { ActivityPickerComponent } from '../components/activity-picker/activity-picker.component';
import { ActivityTypeListComponent } from '../components/activity-type-list/activity-type-list.component';
import { ActivityLogListComponent } from '../components/actvity-log-list/actvity-log-list.component';
import { DayAttendanceComponent } from '../components/day-attendance/day-attendance.component';
import {
  EditableLogEntryDescriptionComponent
} from '../components/editable-log-entry-description/editable-log-entry-description.component';
import { EditableLogEntryHoursComponent } from '../components/editable-log-entry-hours/editable-log-entry-hours.component';
import { HourBadgeComponent } from '../components/hour-badge/hour-badge.component';
import { NoActivityLogEntryPresentComponent } from '../components/no-activity-log-entry-present/no-activity-log-entry-present.component';
import { OvertimeBadgeComponent } from '../components/overtime-badge/overtime-badge.component';
import { TallyComponent } from '../components/tally/tally.component';
import { TimeBadgeComponent } from '../components/time-badge/time-badge.component';
import { valueToTime } from '../helpers';
import { ActivitiesComponent } from '../pages/activities/activities.component';
import { AttendanceComponent } from '../pages/attendance/attendance.component';
import { ConfigurationComponent } from '../pages/configuration/configuration.component';
import { DayComponent } from '../pages/day/day.component';
import { WeekComponent } from '../pages/week/week.component';
import { WelcomeComponent } from '../pages/welcome/welcome.component';
import { ActivityTypeIdToNamePipe } from '../pipes/activity-type-id-to-name.pipe';
import { FormatHoursPipe } from '../pipes/format-hours.pipe';
import { GroupActivityLogEntriesByIdPipe } from '../pipes/group-activity-log-entries-by-id.pipe';
import { LogEntryTallyPipe } from '../pipes/log-entry-tally.pipe';
import { PadNumberPipe } from '../pipes/pad-number.pipe';
import { PrecisionPipe } from '../pipes/precision.pipe';
import { SetEndTimeAction, SetStartTimeAction } from '../redux/actions/attendance.actions';
import { SetWeeklyWorkDaysAction, SetWeeklyWorkHoursAction } from '../redux/actions/configuration.actions';
import { ApplicationState } from '../redux/states/applicationState';

xdescribe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let store: Store<ApplicationState>;

  function setAttendance(start: string, end: string, date: Date) {
    store.dispatch(new SetStartTimeAction(date, valueToTime(start)!));
    store.dispatch(new SetEndTimeAction(date, valueToTime(end)!));
  }

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [
        ActivitiesComponent,
        ActivityColorPickerComponent,
        ActivityTypeListComponent,
        ActivityLogEntryComponent,
        ActivityLogListComponent,
        ActivityPickerComponent,
        ActivityTypeIdToNamePipe,
        AttendanceComponent,
        ConfigurationComponent,
        DayComponent,
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
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly display overall overtime for 40h work week', () => {
    store.dispatch(new SetWeeklyWorkHoursAction(40));

    // -4
    setAttendance('8:30', '12:30', new Date(2018, 0, 1));
    // +2
    setAttendance('8:30', '18:30', new Date(2018, 0, 2));
    // +4
    setAttendance('8:30', '20:30', new Date(2018, 0, 3));
    // +3
    setAttendance('8:30', '19:30', new Date(2018, 0, 4));
    // 0
    setAttendance('8:30', '16:30', new Date(2018, 0, 5));

    component.overallAttendanceSum$.subscribe(sum => {
      expect(sum).toBe(5);
    });
  });

  it('should correctly display overall overtime for 16h work week', () => {
    store.dispatch(new SetWeeklyWorkHoursAction(16));
    store.dispatch(new SetWeeklyWorkDaysAction(2));

    // -4
    setAttendance('8:30', '12:30', new Date(2018, 0, 1));
    // +2
    setAttendance('8:30', '18:30', new Date(2018, 0, 2));

    component.overallAttendanceSum$.subscribe(sum => {
      expect(sum).toBe(-2);
    });
  });
});
