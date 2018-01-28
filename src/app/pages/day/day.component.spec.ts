import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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

describe('DayComponent', () => {
  let component: DayComponent;
  let fixture: ComponentFixture<DayComponent>;

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
        StoreModule.forRoot(reducers, { metaReducers }),
        TypeaheadModule.forRoot(),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
