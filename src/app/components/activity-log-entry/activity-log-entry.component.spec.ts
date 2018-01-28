import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityLogEntryComponent } from './activity-log-entry.component';
import { ActivityTypeIdToNamePipe } from '../../pipes/activity-type-id-to-name.pipe';
import { HourBadgeComponent } from '../hour-badge/hour-badge.component';
import { EditableLogEntryDescriptionComponent } from '../editable-log-entry-description/editable-log-entry-description.component';
import { EditableLogEntryHoursComponent } from '../editable-log-entry-hours/editable-log-entry-hours.component';
import { AccordionModule } from 'ngx-bootstrap';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../redux/reducers/index';
import { metaReducers } from '../../redux/metaReducers';

describe('ActivityLogEntryComponent', () => {
  let component: ActivityLogEntryComponent;
  let fixture: ComponentFixture<ActivityLogEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ActivityLogEntryComponent,
        ActivityTypeIdToNamePipe,
        HourBadgeComponent,
        EditableLogEntryDescriptionComponent,
        EditableLogEntryHoursComponent,
      ],
      imports: [
        AccordionModule.forRoot(),
        StoreModule.forRoot(reducers, { metaReducers }),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityLogEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
