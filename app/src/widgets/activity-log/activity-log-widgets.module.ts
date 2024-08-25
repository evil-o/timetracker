import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { ActivityLogEntitiesModule } from "../../entities/activity-log";
import { ActivityTypeEntitiesModule } from "../../entities/activity-type";
import { ActivityLogFeaturesModule } from "../../features/activity-log";
import { SharedModule } from "../../shared/shared.module";
import { ActivityLogListComponent } from "./ui/activity-log-list/actvity-log-list.component";
import { StopwatchComponent } from "./ui/stopwatch/stopwatch.component";
import { TallyComponent } from "./ui/tally/tally.component";

const declarations = [
    ActivityLogListComponent,
    StopwatchComponent,
    TallyComponent,
];

@NgModule({
    declarations: [...declarations],
    exports: [...declarations],
    imports: [
        ActivityTypeEntitiesModule,
        ActivityLogEntitiesModule,
        ActivityLogFeaturesModule,
        AccordionModule,
        CommonModule,
        SharedModule,
    ],
})
export class ActivityLogWidgetsModule {}
