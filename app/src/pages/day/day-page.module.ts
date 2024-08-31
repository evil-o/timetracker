import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ActivityLogEntitiesModule } from "../../entities/activity-log";
import { ActivityAggregationFeaturesModule } from "../../features/activity-aggregation";
import { SharedModule } from "../../shared/shared.module";
import { ActivityLogWidgetsModule } from "../../widgets/activity-log";
import { AttendanceWidgetsModule } from "../../widgets/attendance";
import { DayComponent } from "./ui/day.component";

@NgModule({
    declarations: [DayComponent],
    exports: [DayComponent],
    imports: [
        ActivityAggregationFeaturesModule,
        ActivityLogWidgetsModule,
        ActivityLogEntitiesModule,
        AttendanceWidgetsModule,
        CommonModule,
        SharedModule,
    ],
})
export class DayPageModule {}
