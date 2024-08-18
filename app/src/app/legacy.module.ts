import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
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
import { TallyComponent } from "./components/tally/tally.component";
import { TimeBadgeComponent } from "./components/time-badge/time-badge.component";
import { ActivityTypeIdToNamePipe } from "./pipes/activity-type-id-to-name.pipe";
import { FormatHoursPipe } from "./pipes/format-hours.pipe";
import { GroupActivityLogEntriesByIdPipe } from "./pipes/group-activity-log-entries-by-id.pipe";
import { LogEntryTallyPipe } from "./pipes/log-entry-tally.pipe";
import { PadNumberPipe } from "./pipes/pad-number.pipe";
import { PrecisionPipe } from "./pipes/precision.pipe";

const legacyDeclarations = [
    // components
    ActivityColorPickerComponent,
    ActivityLogEntryComponent,
    ActivityLogListComponent,
    ActivityTypeListComponent,
    ActivityPickerComponent,
    DayAttendanceComponent,
    EditableLogEntryDescriptionComponent,
    EditableLogEntryHoursComponent,
    TallyComponent,
    TimeBadgeComponent,
    HourBadgeComponent,
    NoActivityLogEntryPresentComponent,
    OvertimeBadgeComponent,

    // pipes
    ActivityTypeIdToNamePipe,
    PrecisionPipe,
    PadNumberPipe,
    LogEntryTallyPipe,
    FormatHoursPipe,
    GroupActivityLogEntriesByIdPipe,
];

const standaloneImports = [ActivityAggregationChartComponent];

// all things not yet ported to FSD, for import in the various modules, to ease the transition
@NgModule({
    imports: [
        ...standaloneImports,
        CommonModule,
        BrowserModule,
        FormsModule,
        AccordionModule,
        TypeaheadModule,
    ],
    declarations: [...legacyDeclarations],
    exports: [...legacyDeclarations, standaloneImports],
})
export class LegacyModule {}
