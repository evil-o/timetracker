import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

import { appRoutes } from './app.routes';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { DayComponent } from './pages/day/day.component';
import { WeekComponent } from './pages/week/week.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ActivityPickerComponent } from './components/activity-picker/activity-picker.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';
import { HourBadgeComponent } from './components/hour-badge/hour-badge.component';
import { TimeBadgeComponent } from './components/time-badge/time-badge.component';
import { GroupActivityLogEntriesByIdPipe } from './pipes/group-activity-log-entries-by-id.pipe';
import { ActivityLogEntryComponent } from './components/activity-log-entry/activity-log-entry.component';
import { ActivityTypeIdToNamePipe } from './pipes/activity-type-id-to-name.pipe';
import { EditableLogEntryDescriptionComponent } from './components/editable-log-entry-description/editable-log-entry-description.component';
import { EditableLogEntryHoursComponent } from './components/editable-log-entry-hours/editable-log-entry-hours.component';
import { ActivityLogListComponent } from './components/actvity-log-list/actvity-log-list.component';
import { AccordionModule } from 'ngx-bootstrap/accordion/accordion.module';
import { NoActivityLogEntryPresentComponent } from './components/no-activity-log-entry-present/no-activity-log-entry-present.component';
import { TallyComponent } from './components/tally/tally.component';
import { LogEntryTallyPipe } from './pipes/log-entry-tally.pipe';
import { TabsModule } from 'ngx-bootstrap';
import { StoreModule } from '@ngrx/store';
import { reducers } from './redux/reducers/index';
import { metaReducers } from './redux/metaReducers';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { ActivityTypeListComponent } from './components/activity-type-list/activity-type-list.component';
import { OvertimeBadgeComponent } from './components/overtime-badge/overtime-badge.component';
import { PrecisionPipe } from './pipes/precision.pipe';
import { ActivityColorPickerComponent } from './components/activity-color-picker/activity-color-picker.component';
import { PadNumberPipe } from './pipes/pad-number.pipe';

describe('AppComponent', () => {
  beforeEach(async(() => {
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
        DayComponent,
        EditableLogEntryDescriptionComponent,
        EditableLogEntryHoursComponent,
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
  it('should create the app', async(() => {
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
