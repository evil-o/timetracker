import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";

import { ActivityTypeEntitiesModule } from "../entities/activity-type/activity-type-entities.module";
import { DayAttendanceComponent } from "./legacy/day-attendance/day-attendance.component";
import { HourBadgeComponent } from "./legacy/hour-badge/hour-badge.component";
import { NoActivityLogEntryPresentComponent } from "./legacy/no-activity-log-entry-present/no-activity-log-entry-present.component";
import { OvertimeBadgeComponent } from "./legacy/overtime-badge/overtime-badge.component";
import { StopwatchComponent } from "./legacy/stopwatch/stopwatch.component";
import { TimeBadgeComponent } from "./legacy/time-badge/time-badge.component";
import { SharedModule } from "./shared.module";

const legacyDeclarations = [
    // components
    DayAttendanceComponent,
    StopwatchComponent,
    TimeBadgeComponent,
    HourBadgeComponent,
    NoActivityLogEntryPresentComponent,
    OvertimeBadgeComponent,
];

// all things not yet ported to FSD, for import in the various modules, to ease the transition
@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        AccordionModule,
        TypeaheadModule,
        SharedModule,

        // temporary workarounds:
        ActivityTypeEntitiesModule,
    ],
    declarations: [...legacyDeclarations],
    exports: [...legacyDeclarations],
})
export class LegacyModule {}
