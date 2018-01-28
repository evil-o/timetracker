import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityLogListComponent } from './actvity-log-list.component';
import { ActivityLogEntryComponent } from '../activity-log-entry/activity-log-entry.component';
import { ActivityTypeIdToNamePipe } from '../../pipes/activity-type-id-to-name.pipe';
import { HourBadgeComponent } from '../hour-badge/hour-badge.component';
import { EditableLogEntryDescriptionComponent } from '../editable-log-entry-description/editable-log-entry-description.component';
import { EditableLogEntryHoursComponent } from '../editable-log-entry-hours/editable-log-entry-hours.component';
import { AccordionModule } from 'ngx-bootstrap';
import { NoActivityLogEntryPresentComponent } from '../no-activity-log-entry-present/no-activity-log-entry-present.component';

describe('ActvityLogListComponent', () => {
  let component: ActivityLogListComponent;
  let fixture: ComponentFixture<ActivityLogListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ActivityLogEntryComponent,
        ActivityLogListComponent,
        ActivityTypeIdToNamePipe,
        HourBadgeComponent,
        EditableLogEntryDescriptionComponent,
        EditableLogEntryHoursComponent,
        NoActivityLogEntryPresentComponent,
      ],
      imports: [
        AccordionModule.forRoot(),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityLogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
