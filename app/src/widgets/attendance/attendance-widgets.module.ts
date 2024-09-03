import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { AggregationFeaturesModule } from "../../features/aggregation";
import { SharedModule } from "../../shared/shared.module";
import { AttendanceListComponent } from "./ui/attendance-list/attendance-list.component";
import { DayAttendanceComponent } from "./ui/day-attendance/day-attendance.component";

const components = [AttendanceListComponent, DayAttendanceComponent];

@NgModule({
    declarations: [...components],
    exports: [...components],
    imports: [
        AccordionModule,
        CommonModule,
        AggregationFeaturesModule,
        SharedModule,
    ],
})
export class AttendanceWidgetsModule {}
