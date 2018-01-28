import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TallyComponent } from './tally.component';
import { NoActivityLogEntryPresentComponent } from '../no-activity-log-entry-present/no-activity-log-entry-present.component';
import { LogEntryTallyPipe } from '../../pipes/log-entry-tally.pipe';
import { ActivityLogEntryComponent } from '../activity-log-entry/activity-log-entry.component';
import { ActivityTypeIdToNamePipe } from '../../pipes/activity-type-id-to-name.pipe';
import { HourBadgeComponent } from '../hour-badge/hour-badge.component';
import { EditableLogEntryHoursComponent } from '../editable-log-entry-hours/editable-log-entry-hours.component';
import { EditableLogEntryDescriptionComponent } from '../editable-log-entry-description/editable-log-entry-description.component';
import { AccordionModule } from 'ngx-bootstrap';
import { StoreModule } from '@ngrx/store';

import { reducers } from '../../redux/reducers/index';
import { metaReducers } from '../../redux/metaReducers';

describe('TallyComponent', () => {
  let component: TallyComponent;
  let fixture: ComponentFixture<TallyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ActivityLogEntryComponent,
        ActivityTypeIdToNamePipe,
        EditableLogEntryDescriptionComponent,
        EditableLogEntryHoursComponent,
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
