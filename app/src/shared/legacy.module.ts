import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";

import { ActivityAggregationChartComponent } from "./legacy/activity-aggregation-chart/activity-aggregation-chart.component";
import { ActivityColorPickerComponent } from "./legacy/activity-color-picker/activity-color-picker.component";
import { ActivityLogEntryComponent } from "./legacy/activity-log-entry/activity-log-entry.component";
import { ActivityPickerComponent } from "./legacy/activity-picker/activity-picker.component";
import { ActivityTypeListComponent } from "./legacy/activity-type-list/activity-type-list.component";
import { ActivityLogListComponent } from "./legacy/actvity-log-list/actvity-log-list.component";
import { DayAttendanceComponent } from "./legacy/day-attendance/day-attendance.component";
import { EditableLogEntryDescriptionComponent } from "./legacy/editable-log-entry-description/editable-log-entry-description.component";
import { EditableLogEntryHoursComponent } from "./legacy/editable-log-entry-hours/editable-log-entry-hours.component";
import { HourBadgeComponent } from "./legacy/hour-badge/hour-badge.component";
import { NoActivityLogEntryPresentComponent } from "./legacy/no-activity-log-entry-present/no-activity-log-entry-present.component";
import { OvertimeBadgeComponent } from "./legacy/overtime-badge/overtime-badge.component";
import { ActivityTypeIdToNamePipe } from "./legacy/pipes/activity-type-id-to-name.pipe";
import { FormatHoursPipe } from "./legacy/pipes/format-hours.pipe";
import { GroupActivityLogEntriesByIdPipe } from "./legacy/pipes/group-activity-log-entries-by-id.pipe";
import { LogEntryTallyPipe } from "./legacy/pipes/log-entry-tally.pipe";
import { PadNumberPipe } from "./legacy/pipes/pad-number.pipe";
import { PrecisionPipe } from "./legacy/pipes/precision.pipe";
import { TallyComponent } from "./legacy/tally/tally.component";
import { TimeBadgeComponent } from "./legacy/time-badge/time-badge.component";

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
