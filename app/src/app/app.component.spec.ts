import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { appRoutes } from './app.routes';
import { ActivityColorPickerComponent } from './components/activity-color-picker/activity-color-picker.component';
import { ActivityLogEntryComponent } from './components/activity-log-entry/activity-log-entry.component';
import { ActivityPickerComponent } from './components/activity-picker/activity-picker.component';
import { ActivityTypeListComponent } from './components/activity-type-list/activity-type-list.component';
import { ActivityLogListComponent } from './components/actvity-log-list/actvity-log-list.component';
import { DayAttendanceComponent } from './components/day-attendance/day-attendance.component';
import { EditableLogEntryDescriptionComponent } from './components/editable-log-entry-description/editable-log-entry-description.component';
import { EditableLogEntryHoursComponent } from './components/editable-log-entry-hours/editable-log-entry-hours.component';
import { HourBadgeComponent } from './components/hour-badge/hour-badge.component';
import { NoActivityLogEntryPresentComponent } from './components/no-activity-log-entry-present/no-activity-log-entry-present.component';
import { OvertimeBadgeComponent } from './components/overtime-badge/overtime-badge.component';
import { TallyComponent } from './components/tally/tally.component';
import { TimeBadgeComponent } from './components/time-badge/time-badge.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { ConfigurationComponent } from './pages/configuration/configuration.component';
import { DayComponent } from './pages/day/day.component';
import { WeekComponent } from './pages/week/week.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ActivityTypeIdToNamePipe } from './pipes/activity-type-id-to-name.pipe';
import { FormatHoursPipe } from './pipes/format-hours.pipe';
import { GroupActivityLogEntriesByIdPipe } from './pipes/group-activity-log-entries-by-id.pipe';
import { LogEntryTallyPipe } from './pipes/log-entry-tally.pipe';
import { PadNumberPipe } from './pipes/pad-number.pipe';
import { PrecisionPipe } from './pipes/precision.pipe';
import { metaReducers } from './redux/metaReducers';
import { reducers } from './redux/reducers/index';

describe('AppComponent', () => {
  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [
        ActivitiesComponent,
        ActivityColorPickerComponent,
        ActivityTypeIdToNamePipe,
        ActivityLogEntryComponent,
        ActivityLogListComponent,
        ActivityPickerComponent,
        ActivityTypeListComponent,
        AttendanceComponent,
        AppComponent,
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
        WelcomeComponent
      ],
      imports: [
        AccordionModule,
        BsDatepickerModule.forRoot(),
        FormsModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        TabsModule,
        TypeaheadModule.forRoot(),
        RouterTestingModule.withRoutes(appRoutes)
      ]
    }).compileComponents();
  }));
  it('should create the app', (() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  /*
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  }));
  */
});
