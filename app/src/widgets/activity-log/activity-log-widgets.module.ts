import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { ActivityLogEntitiesModule } from "../../entities/activity-log";
import { ActivityTypeEntitiesModule } from "../../entities/activity-type";
import { LogFeaturesModule } from "../../features/log";
import { SharedModule } from "../../shared/shared.module";
import { ActivityLogListComponent } from "./ui/activity-log-list/actvity-log-list.component";
import { LogInputComponent } from "./ui/log-input/log-input";
import { StopwatchComponent } from "./ui/stopwatch/stopwatch.component";
import { TagTallyComponent } from "./ui/tag-tally/tag-tally.component";
import { TallyComponent } from "./ui/tally/tally.component";

const declarations = [
    ActivityLogListComponent,
    LogInputComponent,
    StopwatchComponent,
    TagTallyComponent,
    TallyComponent,
];

@NgModule({
    declarations: [...declarations],
    exports: [...declarations],
    imports: [
        ActivityTypeEntitiesModule,
        ActivityLogEntitiesModule,
        LogFeaturesModule,
        AccordionModule,
        CommonModule,
        SharedModule,
    ],
})
export class ActivityLogWidgetsModule {}
