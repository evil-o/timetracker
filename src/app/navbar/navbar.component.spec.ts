import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { APP_BASE_HREF } from '@angular/common';

import { NavbarComponent } from './navbar.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AccordionModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap';
import { TypeaheadModule } from 'ngx-bootstrap';

import { StoreModule } from '@ngrx/store';

import { reducers } from '../redux/reducers/index';
import { effects } from '../redux/effects/index';
import { metaReducers } from '../redux/metaReducers';

import { appRoutes } from '../app.routes';
import { WelcomeComponent } from '../pages/welcome/welcome.component';
import { DayComponent } from '../pages/day/day.component';
import { WeekComponent } from '../pages/week/week.component';
import { ActivityPickerComponent } from '../components/activity-picker/activity-picker.component';
import { HourBadgeComponent } from '../components/hour-badge/hour-badge.component';
import { TimeBadgeComponent } from '../components/time-badge/time-badge.component';
import { GroupActivityLogEntriesByIdPipe } from '../pipes/group-activity-log-entries-by-id.pipe';
import { ActivityLogListComponent } from '../components/actvity-log-list/actvity-log-list.component';
import { ActivityLogEntryComponent } from '../components/activity-log-entry/activity-log-entry.component';
import { ActivityTypeIdToNamePipe } from '../pipes/activity-type-id-to-name.pipe';
import {
  EditableLogEntryDescriptionComponent
} from '../components/editable-log-entry-description/editable-log-entry-description.component';
import { EditableLogEntryHoursComponent } from '../components/editable-log-entry-hours/editable-log-entry-hours.component';
import { NoActivityLogEntryPresentComponent } from '../components/no-activity-log-entry-present/no-activity-log-entry-present.component';
import { TallyComponent } from '../components/tally/tally.component';
import { LogEntryTallyPipe } from '../pipes/log-entry-tally.pipe';
import { AttendanceComponent } from '../pages/attendance/attendance.component';
import { ActivitiesComponent } from '../pages/activities/activities.component';
import { ActivityTypeListComponent } from '../components/activity-type-list/activity-type-list.component';
import { OvertimeBadgeComponent } from '../components/overtime-badge/overtime-badge.component';
import { PrecisionPipe } from '../pipes/precision.pipe';
import { ActivityColorPickerComponent } from '../components/activity-color-picker/activity-color-picker.component';
import { PadNumberPipe } from '../pipes/pad-number.pipe';
import { ConfigurationComponent } from '../pages/configuration/configuration.component';
import { DayAttendanceComponent } from '../components/day-attendance/day-attendance.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
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
        StoreModule.forRoot(reducers, { metaReducers }),
        TabsModule.forRoot(),
        TypeaheadModule.forRoot(),
        RouterModule.forRoot(appRoutes),
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
