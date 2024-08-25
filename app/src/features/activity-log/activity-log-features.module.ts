import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { ActivityLogEntitiesModule } from "../../entities/activity-log/activity-log-entities.module";
import { ActivityTypeEntitiesModule } from "../../entities/activity-type/activity-type-entities.module";
import { LegacyModule } from "../../shared/legacy.module";
import { ActivityLogEntryComponent } from "./ui/activity-log-entry/activity-log-entry.component";

const components = [ActivityLogEntryComponent];

@NgModule({
    declarations: [...components],
    exports: [...components],
    imports: [
        AccordionModule,
        ActivityLogEntitiesModule,
        ActivityTypeEntitiesModule,
        LegacyModule,
        CommonModule,
    ],
})
export class ActivityLogFeaturesModule {}
