import { IGroupEntry } from "../../../entities/activity-log";
import { IActivityTypes } from "../../../entities/activity-type";
import { IAttendanceWithTimes } from "../../../entities/application";
import { IAttendanceCorrection } from "../../../entities/attendance";
import { FormatHoursPipe } from "../../../shared/lib";
import { dateHoursMinutesToString } from "../../../shared/lib/time-string";
import { HtmlTableGenerator } from "../../../shared/models";
import { IWeekAttendanceStats } from "../../attendance";
import { IDayEntry } from "../model/day-entries";
import { IWeekDate } from "../model/week-date";

function attendanceNonWorkingStr(attendance: IAttendanceWithTimes): string {
    return attendance.nonWorkingHours !== undefined
        ? new FormatHoursPipe().transform(attendance.nonWorkingHours, "{h}:{m}")
        : "-";
}

export function makeTimeSheet(
    week: IWeekDate,
    days: IDayEntry[],
    types: IActivityTypes,
    corrections: IAttendanceCorrection[],
    attendances: IAttendanceWithTimes[],
    attendanceStats?: IWeekAttendanceStats,
    overallAttendanceSum?: number
): HTMLElement {
    const root = document.createElement("div");
    const h = root.appendChild(document.createElement("h1"));
    h.innerText = `Week ${week.week} / ${week.year}`;

    const hrPipe = new FormatHoursPipe();
    const hrf = (hrs: number, format = "{h}:{m}") =>
        hrPipe.transform(hrs, format);

    //
    // Activity time sheet
    //
    const activityHeading = root.appendChild(document.createElement("h2"));
    activityHeading.innerText = `Activities`;

    const activityTable = new HtmlTableGenerator();
    activityTable.border = "1pt";
    activityTable.header.appendHeadingRow("Activity", "Hours");

    const activityName = (id: string) =>
        types.activities.find((t) => t.id === id)!.name;
    for (const day of days) {
        const hs1 = activityTable.body.appendHeadingSpan(
            `${day.name}, ${day.date.getMonth() + 1} / ${day.date.getDate()}`,
            2
        );
        hs1.bgColor = "#D0D0D0";

        if (day.entries$.value.length <= 0) {
            activityTable.body.appendSpan(`<i>No entries.</i>`, 2);
            continue;
        }

        const byId: IGroupEntry[] = [];
        for (const entry of day.entries$.value) {
            const id = entry.actvitiyId;
            const idEntry = byId.find((item) => item.activityId === id);
            if (idEntry) {
                idEntry.cumulativeHours += entry.hours;
                idEntry.entries.push(entry);
            } else {
                byId.push({
                    activityId: id,
                    cumulativeHours: entry.hours,
                    entries: [entry],
                });
            }
        }

        for (const group of byId) {
            activityTable.body.appendHeadingRow(
                activityName(group.activityId),
                `&sum; ${hrf(group.cumulativeHours)}`
            );

            for (const subentry of group.entries) {
                activityTable.body.appendRow(
                    subentry.description || "&mdash;",
                    hrf(subentry.hours)
                );
            }
        }
    }

    activityTable.appendTo(root);

    //
    // Attendance sheet
    //
    const attendanceHeading = root.appendChild(document.createElement("h2"));
    attendanceHeading.innerText = `Attendance`;

    const attendanceTable = new HtmlTableGenerator();
    attendanceTable.border = "1pt";
    attendanceTable.header.appendHeadingRow(
        "Day",
        "Start",
        "End",
        "Non-working hours",
        "Overtime"
    );

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const pmHours = (hours: number | undefined) =>
        hrPipe.transform(hours, "{+h}:{m}");
    for (const attendance of attendances) {
        const day = `${dayNames[attendance.date.getDay()]}`;
        const startTime = dateHoursMinutesToString(attendance.start);
        const endTime = dateHoursMinutesToString(attendance.end);
        const nonWorking = attendanceNonWorkingStr(attendance);
        const overtime = `${pmHours(attendance.overtime)}`;
        attendanceTable.body.appendRow(day, startTime, endTime, nonWorking, {
            contents: overtime,
            align: "right",
        });
    }

    if (attendanceStats) {
        attendanceTable.body.appendRow(
            { contents: "Totals", colSpan: 3 },
            hrf(attendanceStats.totalNonWorkingHours, "{h}:{m}"),
            {
                contents: pmHours(attendanceStats.totalOvertime),
                align: "right",
            }
        );
    }

    if (corrections?.length > 0) {
        attendanceTable.body.appendHeadingSpan("Extra bookings:", 5);
        for (const correction of corrections) {
            const row = attendanceTable.body.createRow();
            const d = row.appendCell();
            d.colSpan = 4;
            d.contents = correction.description;
            const t = row.appendCell();
            t.align = "right";
            t.contents = pmHours(correction.hours);
        }
    }

    if (overallAttendanceSum !== undefined) {
        attendanceTable.body.appendRow(
            { contents: "Overall overtime", colSpan: 4 },
            { contents: pmHours(overallAttendanceSum), align: "right" }
        );
    }

    attendanceTable.appendTo(root);
    return root;
}
