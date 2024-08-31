import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TabsModule } from "ngx-bootstrap/tabs";
import { ActivityLogEntitiesModule } from "../../entities/activity-log";
import { ActivityAggregationFeaturesModule } from "../../features/activity-aggregation";
import { SharedModule } from "../../shared/shared.module";
import { ActivityLogWidgetsModule } from "../../widgets/activity-log";
import { WeekComponent } from "./ui/week.component";

@NgModule({
    declarations: [WeekComponent],
    exports: [WeekComponent],
    imports: [
        CommonModule,
        ActivityAggregationFeaturesModule,
        ActivityLogWidgetsModule,
        ActivityLogEntitiesModule,
        SharedModule,
        TabsModule,
        RouterModule,
    ],
})
export class WeekPageModule {}
