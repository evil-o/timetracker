import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { of } from 'rxjs';
import { ActivityTypeIdToNamePipe } from '../../pipes/activity-type-id-to-name.pipe';
import { FormatHoursPipe } from '../../pipes/format-hours.pipe';
import { ActivityLogEntryComponent } from '../activity-log-entry/activity-log-entry.component';
import { EditableLogEntryDescriptionComponent } from '../editable-log-entry-description/editable-log-entry-description.component';
import { EditableLogEntryHoursComponent } from '../editable-log-entry-hours/editable-log-entry-hours.component';
import { HourBadgeComponent } from '../hour-badge/hour-badge.component';
import { NoActivityLogEntryPresentComponent } from '../no-activity-log-entry-present/no-activity-log-entry-present.component';
import { ActivityLogListComponent } from './actvity-log-list.component';

describe('ActvityLogListComponent', () => {
  let component: ActivityLogListComponent;
  let fixture: ComponentFixture<ActivityLogListComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [
        ActivityLogEntryComponent,
        ActivityLogListComponent,
        ActivityTypeIdToNamePipe,
        FormatHoursPipe,
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
    component.activityTypes$ = of({ activities: [] });
    component.groups$ = of([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
