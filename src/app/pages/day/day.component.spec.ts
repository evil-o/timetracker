import { async, ComponentFixture, TestBed, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';

import { AccordionModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { TypeaheadModule } from 'ngx-bootstrap';

import { StoreModule } from '@ngrx/store';
import { reducers } from '../../redux/reducers/index';
import { metaReducers } from '../../redux/metaReducers';

import { DayComponent } from './day.component';
import { ActivityPickerComponent } from '../../components/activity-picker/activity-picker.component';
import { HourBadgeComponent } from '../../components/hour-badge/hour-badge.component';
import { TimeBadgeComponent } from '../../components/time-badge/time-badge.component';
import { GroupActivityLogEntriesByIdPipe } from '../../pipes/group-activity-log-entries-by-id.pipe';
import { ActivityLogListComponent } from '../../components/actvity-log-list/actvity-log-list.component';
import { ActivityLogEntryComponent } from '../../components/activity-log-entry/activity-log-entry.component';
import { ActivityTypeIdToNamePipe } from '../../pipes/activity-type-id-to-name.pipe';
import {
  EditableLogEntryDescriptionComponent
} from '../../components/editable-log-entry-description/editable-log-entry-description.component';
import { EditableLogEntryHoursComponent } from '../../components/editable-log-entry-hours/editable-log-entry-hours.component';
import { NoActivityLogEntryPresentComponent } from '../../components/no-activity-log-entry-present/no-activity-log-entry-present.component';
import { Subject } from 'rxjs/Subject';
import { ActivityLogEntry } from '../../redux/states/activityLog';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ApplicationState } from '../../redux/states/applicationState';
import { Store } from '@ngrx/store';
import { LogTimeAction } from '../../redux/actions/activityLogActions';

describe('DayComponent', () => {
  let component: DayComponent;
  let fixture: ComponentFixture<DayComponent>;

  const now = new Date();
  const testEntries: ActivityLogEntry[] = [
    {
      actvitiyId: 'testActivity',
      day: now.getDate(),
      month: now.getMonth(),
      year: now.getFullYear(),
      description: 'test description',
      hours: 6,
      id: 'testEntryId1',
    },
    {
      actvitiyId: 'testActivity',
      day: now.getDate(),
      month: now.getMonth(),
      year: now.getFullYear(),
      description: 'test description',
      hours: 0.25,
      id: 'testEntryId2',
    }];

  let store: Store<ApplicationState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ActivityLogEntryComponent,
        ActivityLogListComponent,
        ActivityTypeIdToNamePipe,
        ActivityPickerComponent,
        DayComponent,
        EditableLogEntryDescriptionComponent,
        EditableLogEntryHoursComponent,
        GroupActivityLogEntriesByIdPipe,
        HourBadgeComponent,
        NoActivityLogEntryPresentComponent,
        TimeBadgeComponent,
      ],
      imports: [
        AccordionModule.forRoot(),
        BsDatepickerModule.forRoot(),
        FormsModule,
        StoreModule.forRoot(reducers),
        TypeaheadModule.forRoot(),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(DayComponent);
    component = fixture.componentInstance;

    // populate store
    for (const entry of testEntries) {
      store.dispatch(new LogTimeAction(entry.actvitiyId, entry.hours, new Date(entry.year, entry.month, entry.day)));
    }

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should properly tally the overall time', fakeAsync(() => {
    expect(component.totalHoursDisplay).toBeDefined();
    expect(component.totalHoursDisplay.hours).toBe(6.25);

    discardPeriodicTasks();
  }));

  it('should properly display the start time', fakeAsync(() => {
    const n = new Date();

    component.startTime$.subscribe((value) => {
      expect(value.getHours()).toBe(n.getHours() - 6);
      expect(value.getMinutes()).toBe(Math.floor(n.getMinutes() - 15));
    });

    tick();

    discardPeriodicTasks();
  }));
});
