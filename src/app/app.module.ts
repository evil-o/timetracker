import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ActivityPickerComponent } from './components/activity-picker/activity-picker.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';

import { activityTypesReducer } from './redux/reducers/activityTypes';
import { DayComponent } from './pages/day/day.component';

import { reducers } from './redux/reducers/index';
import { effects } from './redux/effects/index';
import { metaReducers } from './redux/metaReducers';

import { ActivityLogEffects } from './redux/effects/activityLogEffects';
import { appRoutes } from './app.routes';
import { ActivityLogListComponent } from './components/actvity-log-list/actvity-log-list.component';
import { GroupActivityLogEntriesByIdPipe } from './pipes/group-activity-log-entries-by-id.pipe';
import { WeekComponent } from './pages/week/week.component';
import { TallyComponent } from './components/tally/tally.component';
import { LogEntryTallyPipe } from './pipes/log-entry-tally.pipe';
import { ActivityTypeIdToNamePipe } from './pipes/activity-type-id-to-name.pipe';
import { ActivityLogEntryComponent } from './components/activity-log-entry/activity-log-entry.component';
import { NoActivityLogEntryPresentComponent } from './components/no-activity-log-entry-present/no-activity-log-entry-present.component';
import { EditableLogEntryDescriptionComponent } from './components/editable-log-entry-description/editable-log-entry-description.component';
import { EditableLogEntryHoursComponent } from './components/editable-log-entry-hours/editable-log-entry-hours.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { HourBadgeComponent } from './components/hour-badge/hour-badge.component';
import { TimeBadgeComponent } from './components/time-badge/time-badge.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { OvertimeBadgeComponent } from './components/overtime-badge/overtime-badge.component';
import { PrecisionPipe } from './pipes/precision.pipe';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { ActivityTypeListComponent } from './components/activity-type-list/activity-type-list.component';
import { ActivityColorPickerComponent } from './components/activity-color-picker/activity-color-picker.component';
import { PadNumberPipe } from './pipes/pad-number.pipe';
import { ConfigurationComponent } from './pages/configuration/configuration.component';
import { DayAttendanceComponent } from './components/day-attendance/day-attendance.component';
import { FormatHoursPipe } from './pipes/format-hours.pipe';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { ActivityAggregationChartComponent } from './components/activity-aggregation-chart/activity-aggregation-chart.component';
import { StopwatchComponent } from './components/stopwatch/stopwatch.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ActivityPickerComponent,
    DayComponent,
    ActivityLogListComponent,
    GroupActivityLogEntriesByIdPipe,
    WeekComponent,
    TallyComponent,
    LogEntryTallyPipe,
    ActivityTypeIdToNamePipe,
    ActivityLogEntryComponent,
    NoActivityLogEntryPresentComponent,
    EditableLogEntryDescriptionComponent,
    EditableLogEntryHoursComponent,
    WelcomeComponent,
    HourBadgeComponent,
    TimeBadgeComponent,
    AttendanceComponent,
    OvertimeBadgeComponent,
    PrecisionPipe,
    ActivitiesComponent,
    ActivityTypeListComponent,
    ActivityColorPickerComponent,
    PadNumberPipe,
    ConfigurationComponent,
    DayAttendanceComponent,
    FormatHoursPipe,
    StatisticsComponent,
    ActivityAggregationChartComponent,
    StopwatchComponent,
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    FormsModule,
    AccordionModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    TypeaheadModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ?
      StoreDevtoolsModule.instrument({
        maxAge: 25 // Retains last 25 states
      })
      : [],
    EffectsModule.forRoot(effects),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
