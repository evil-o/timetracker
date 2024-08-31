import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { ActivityLogEntitiesModule } from "../../entities/activity-log";
import { ActivityTypeEntitiesModule } from "../../entities/activity-type";
import { SharedModule } from "../../shared/shared.module";
import { LogEntryTallyPipe } from "./lib/log-entry-tally.pipe";
import { ActivityLogEntryComponent } from "./ui/activity-log-entry/activity-log-entry.component";

const components = [ActivityLogEntryComponent];
const pipes = [LogEntryTallyPipe];

@NgModule({
    declarations: [...components, ...pipes],
    exports: [...components, ...pipes],
    imports: [
        AccordionModule,
        ActivityLogEntitiesModule,
        ActivityTypeEntitiesModule,
        SharedModule,
        CommonModule,
    ],
})
export class LogFeaturesModule {}
