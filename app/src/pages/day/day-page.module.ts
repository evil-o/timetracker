import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ActivityLogEntitiesModule } from "../../entities/activity-log";
import { AggregationFeaturesModule } from "../../features/aggregation";
import { SharedModule } from "../../shared/shared.module";
import { ActivityLogWidgetsModule } from "../../widgets/activity-log";
import { AttendanceWidgetsModule } from "../../widgets/attendance";
import { DayComponent } from "./ui/day.component";

@NgModule({
    declarations: [DayComponent],
    exports: [DayComponent],
    imports: [
        AggregationFeaturesModule,
        ActivityLogWidgetsModule,
        ActivityLogEntitiesModule,
        AttendanceWidgetsModule,
        CommonModule,
        SharedModule,
    ],
})
export class DayPageModule {}
