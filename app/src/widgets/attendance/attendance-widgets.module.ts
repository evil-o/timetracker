import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { SharedModule } from "../../shared/shared.module";
import { DayAttendanceComponent } from "./ui/day-attendance/day-attendance.component";

const components = [DayAttendanceComponent];

@NgModule({
    declarations: [...components],
    exports: [...components],
    imports: [AccordionModule, CommonModule, SharedModule],
})
export class AttendanceWidgetsModule {}
