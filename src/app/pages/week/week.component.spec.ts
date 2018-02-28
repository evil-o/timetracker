import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';

import { AccordionModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { BsModalService } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap';
import { TypeaheadModule } from 'ngx-bootstrap';

import { StoreModule, Store } from '@ngrx/store';

import { reducers } from '../../redux/reducers/index';
import { metaReducers } from '../../redux/metaReducers';

import { appRoutes } from '../../app.routes';

import { WeekComponent } from './week.component';
import { TallyComponent } from '../../components/tally/tally.component';
import { NoActivityLogEntryPresentComponent } from '../../components/no-activity-log-entry-present/no-activity-log-entry-present.component';
import { LogEntryTallyPipe } from '../../pipes/log-entry-tally.pipe';
import { ActivityLogEntryComponent } from '../../components/activity-log-entry/activity-log-entry.component';
import { ActivityTypeIdToNamePipe } from '../../pipes/activity-type-id-to-name.pipe';
import { HourBadgeComponent } from '../../components/hour-badge/hour-badge.component';
import {
  EditableLogEntryDescriptionComponent
} from '../../components/editable-log-entry-description/editable-log-entry-description.component';
import { EditableLogEntryHoursComponent } from '../../components/editable-log-entry-hours/editable-log-entry-hours.component';
import { GroupActivityLogEntriesByIdPipe } from '../../pipes/group-activity-log-entries-by-id.pipe';
import { ActivityLogListComponent } from '../../components/actvity-log-list/actvity-log-list.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { DayComponent } from '../day/day.component';
import { ActivityPickerComponent } from '../../components/activity-picker/activity-picker.component';
import { TimeBadgeComponent } from '../../components/time-badge/time-badge.component';
import { AttendanceComponent } from '../attendance/attendance.component';
import { ActivitiesComponent } from '../activities/activities.component';
import { ActivityTypeListComponent } from '../../components/activity-type-list/activity-type-list.component';
import { OvertimeBadgeComponent } from '../../components/overtime-badge/overtime-badge.component';
import { PrecisionPipe } from '../../pipes/precision.pipe';
import { ApplicationState } from '../../redux/states/applicationState';
import { ActivityLog, ActivityLogEntry } from '../../redux/states/activityLog';
import { ConfigurationComponent } from '../configuration/configuration.component';
import { ActivityColorPickerComponent } from '../../components/activity-color-picker/activity-color-picker.component';
import { DayAttendanceComponent } from '../../components/day-attendance/day-attendance.component';
import { ConfigurationState } from '../../redux/states/configuration';
import { Observable } from 'rxjs/Observable';
import { ActivityTypes } from '../../redux/states/activityTypes';
import { IActivityType } from '../../models/interfaces';
import { CreateActivityTypeAction } from '../../redux/actions/activityTypesActions';
import { LogTimeAction, FetchOrCreateIdAndLogTimeAction } from '../../redux/actions/activityLogActions';
import { EffectsModule } from '@ngrx/effects';
import { effects } from '../../redux/effects';
import { SetWeeklyWorkHoursAction } from '../../redux/actions/configurationActions';
import { SetStartTimeAction, SetEndTimeAction } from '../../redux/actions/attendanceActions';
import { valueToTime } from '../../helpers';

describe('WeekComponent', () => {
  let component: WeekComponent;
  let fixture: ComponentFixture<WeekComponent>;
  let store: Store<ApplicationState>;

  function setAttendance(start: string, end: string, date: Date) {
    store.dispatch(new SetStartTimeAction(date, valueToTime(start)));
    store.dispatch(new SetEndTimeAction(date, valueToTime(end)));
  }

  const a1 = 'test activity 1';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ActivitiesComponent,
        ActivityColorPickerComponent,
        ActivityLogEntryComponent,
        ActivityLogListComponent,
        ActivityPickerComponent,
        ActivityTypeIdToNamePipe,
        ActivityTypeListComponent,
        AttendanceComponent,
        ConfigurationComponent,
        DayComponent,
        DayAttendanceComponent,
        EditableLogEntryDescriptionComponent,
        EditableLogEntryHoursComponent,
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
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot(effects),
        TabsModule.forRoot(),
        TypeaheadModule.forRoot(),
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: BsModalService },
        { provide: ActivatedRoute, useValue: { params: Observable.of({ year: 2018, week: 1 }) } },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be correct for normal part time weeks', fakeAsync(() => {
    expect(component.week.year).toBe(2018);
    expect(component.week.week).toBe(1);
    const start = new Date(component.week.year, 0, 1 + 7 * (component.week.week - 1));
    const weekDates = [];
    for (let d = 0; d < 7; ++d) {
      const date = new Date(start);
      date.setDate(date.getDate() + d);
      weekDates.push(date);
    }

    store.dispatch(new FetchOrCreateIdAndLogTimeAction(a1, 4, weekDates[0]));
    store.dispatch(new FetchOrCreateIdAndLogTimeAction(a1, 3, weekDates[1]));
    store.dispatch(new SetWeeklyWorkHoursAction(16));
    // 4 hours on day 1
    setAttendance('8:30', '12:30', weekDates[0]);
    // 3 hours on day 2
    setAttendance('9:30', '12:30', weekDates[1]);

    fixture.detectChanges();

    component.activityLogEntries$.subscribe(entries => {
      expect(entries.length).toBe(2);
    });

    component.loggedSum$.subscribe(sum => {
      expect(sum).toBe(7);
    });

    component.attendances$.subscribe(attendances => {
      expect(attendances.length).toBe(2);
      const expectedOvertimes = [-4, -5];
      for (let i = 0; i < attendances.length; ++i) {
        const attendance = attendances[i];
        const expected = expectedOvertimes[i];
        expect(attendance.overtime).toBe(expected);
      }
    });
  }));
});
