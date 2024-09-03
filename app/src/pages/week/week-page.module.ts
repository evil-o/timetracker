import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TabsModule } from "ngx-bootstrap/tabs";
import { ActivityLogEntitiesModule } from "../../entities/activity-log";
import { AggregationFeaturesModule } from "../../features/aggregation";
import { WeekFeaturesModule } from "../../features/week/week-features.module";
import { SharedModule } from "../../shared/shared.module";
import { ActivityLogWidgetsModule } from "../../widgets/activity-log";
import { AttendanceWidgetsModule } from "../../widgets/attendance/attendance-widgets.module";
import { WeekComponent } from "./ui/week.component";

@NgModule({
    declarations: [WeekComponent],
    exports: [WeekComponent],
    imports: [
        AttendanceWidgetsModule,
        AggregationFeaturesModule,
        ActivityLogWidgetsModule,
        ActivityLogEntitiesModule,
        CommonModule,
        RouterModule,
        SharedModule,
        TabsModule,
        WeekFeaturesModule,
    ],
})
export class WeekPageModule {}
