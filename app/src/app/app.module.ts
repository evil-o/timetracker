import { NgModule } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";

import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";

import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { environment } from "../environments/environment";

import { DayComponent } from "./pages/day/day.component";

import { effects } from "./redux/effects/index";
import { metaReducers } from "./redux/metaReducers.legacy";
import { reducers } from "./redux/reducers/index";

import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { provideCharts, withDefaultRegisterables } from "ng2-charts";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ModalModule } from "ngx-bootstrap/modal";
import { TabsModule } from "ngx-bootstrap/tabs";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";

import { appRoutes } from "./app.routes";
import { ActivityAggregationChartComponent } from "./components/activity-aggregation-chart/activity-aggregation-chart.component";
import { ActivityColorPickerComponent } from "./components/activity-color-picker/activity-color-picker.component";
import { ActivityLogEntryComponent } from "./components/activity-log-entry/activity-log-entry.component";
import { ActivityPickerComponent } from "./components/activity-picker/activity-picker.component";
import { ActivityTypeListComponent } from "./components/activity-type-list/activity-type-list.component";
import { ActivityLogListComponent } from "./components/actvity-log-list/actvity-log-list.component";
import { DayAttendanceComponent } from "./components/day-attendance/day-attendance.component";
import { EditableLogEntryDescriptionComponent } from "./components/editable-log-entry-description/editable-log-entry-description.component";
import { EditableLogEntryHoursComponent } from "./components/editable-log-entry-hours/editable-log-entry-hours.component";
import { HourBadgeComponent } from "./components/hour-badge/hour-badge.component";
import { NoActivityLogEntryPresentComponent } from "./components/no-activity-log-entry-present/no-activity-log-entry-present.component";
import { OvertimeBadgeComponent } from "./components/overtime-badge/overtime-badge.component";
import { StopwatchComponent } from "./components/stopwatch/stopwatch.component";
import { TallyComponent } from "./components/tally/tally.component";
import { TimeBadgeComponent } from "./components/time-badge/time-badge.component";
import { ActivitiesComponent } from "./pages/activities/activities.component";
import { ConfigurationComponent } from "./pages/configuration/configuration.component";
import { StatisticsComponent } from "./pages/statistics/statistics.component";
import { WeekComponent } from "./pages/week/week.component";
import { WelcomeComponent } from "./pages/welcome/welcome.component";
import { ActivityTypeIdToNamePipe } from "./pipes/activity-type-id-to-name.pipe";
import { FormatHoursPipe } from "./pipes/format-hours.pipe";
import { GroupActivityLogEntriesByIdPipe } from "./pipes/group-activity-log-entries-by-id.pipe";
import { LogEntryTallyPipe } from "./pipes/log-entry-tally.pipe";
import { PadNumberPipe } from "./pipes/pad-number.pipe";
import { PrecisionPipe } from "./pipes/precision.pipe";

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
        StopwatchComponent,
    ],
    imports: [
        ActivityAggregationChartComponent,
        BrowserModule,
        CommonModule,
        FormsModule,
        ModalModule.forRoot(),
        AccordionModule.forRoot(),
        BsDropdownModule.forRoot(),
        BsDatepickerModule.forRoot(),
        TabsModule.forRoot(),
        TypeaheadModule.forRoot(),
        StoreModule.forRoot(reducers, { metaReducers }),
        !environment.production
            ? StoreDevtoolsModule.instrument({
                  maxAge: 25, // Retains last 25 states
              })
            : [],
        EffectsModule.forRoot(effects),
        RouterModule.forRoot(appRoutes),
    ],
    providers: [provideCharts(withDefaultRegisterables()), provideAnimations()],
    bootstrap: [AppComponent],
})
export class AppModule {}
