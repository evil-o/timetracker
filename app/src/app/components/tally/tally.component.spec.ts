import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreModule } from '@ngrx/store';
import { ActivityTypeIdToNamePipe } from '../../pipes/activity-type-id-to-name.pipe';
import { LogEntryTallyPipe } from '../../pipes/log-entry-tally.pipe';
import { ActivityLogEntryComponent } from '../activity-log-entry/activity-log-entry.component';
import { EditableLogEntryDescriptionComponent } from '../editable-log-entry-description/editable-log-entry-description.component';
import { EditableLogEntryHoursComponent } from '../editable-log-entry-hours/editable-log-entry-hours.component';
import { HourBadgeComponent } from '../hour-badge/hour-badge.component';
import { NoActivityLogEntryPresentComponent } from '../no-activity-log-entry-present/no-activity-log-entry-present.component';
import { TallyComponent } from './tally.component';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { FormatHoursPipe } from '../../pipes/format-hours.pipe';
import { metaReducers } from '../../redux/metaReducers.legacy';
import { reducers } from '../../redux/reducers';

describe('TallyComponent', () => {
  let component: TallyComponent;
  let fixture: ComponentFixture<TallyComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [
        ActivityLogEntryComponent,
        ActivityTypeIdToNamePipe,
        EditableLogEntryDescriptionComponent,
        EditableLogEntryHoursComponent,
        FormatHoursPipe,
        HourBadgeComponent,
        TallyComponent,
        LogEntryTallyPipe,
        NoActivityLogEntryPresentComponent,
      ],
      imports: [
        AccordionModule.forRoot(),
        StoreModule.forRoot(reducers, { metaReducers }),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TallyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
