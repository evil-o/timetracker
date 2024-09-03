import { Component, input } from "@angular/core";
import { IAttendanceWithTimes } from "../../../../entities/application";
import { IAttendanceEntry } from "../../../../entities/attendance";
import { dateHoursMinutesToString } from "../../../../shared/lib/time-string";
import { IWeekAttendanceStats } from "../../model/week-attendance-stats";

@Component({
    selector: "app-attendance-list",
    templateUrl: "./attendance-list.component.html",
})
export class AttendanceListComponent {
    public attendances = input.required<
        IAttendanceWithTimes[] | undefined | null
    >();

    public attendanceStats = input.required<
        IWeekAttendanceStats | undefined | null
    >();

    protected attendanceStartTimeStr(attendance: IAttendanceEntry) {
        return dateHoursMinutesToString(attendance.start);
    }

    protected attendanceEndTimeStr(attendance: IAttendanceEntry) {
        return dateHoursMinutesToString(attendance.end);
    }
}
