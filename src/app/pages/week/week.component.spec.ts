import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AccordionModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { BsModalService } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap';
import { TypeaheadModule } from 'ngx-bootstrap';

import { StoreModule } from '@ngrx/store';

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

describe('WeekComponent', () => {
  let component: WeekComponent;
  let fixture: ComponentFixture<WeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ActivityLogEntryComponent,
        ActivityLogListComponent,
        ActivityPickerComponent,
        ActivityTypeIdToNamePipe,
        DayComponent,
        EditableLogEntryDescriptionComponent,
        EditableLogEntryHoursComponent,
        GroupActivityLogEntriesByIdPipe,
        HourBadgeComponent,
        LogEntryTallyPipe,
        NoActivityLogEntryPresentComponent,
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
        StoreModule.forRoot(reducers, { metaReducers }),
        TabsModule.forRoot(),
        TypeaheadModule.forRoot(),
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: BsModalService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
