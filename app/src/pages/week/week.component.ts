import { Component, TemplateRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Store } from "@ngrx/store";

import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

import { ApplicationState } from "../../entities/application/application.model";

import { HtmlTableGenerator } from "../../app/models/htmlTableGenerator";

import currentWeekNumber from "current-week-number";
import {
    BehaviorSubject,
    combineLatest,
    map,
    Observable,
    withLatestFrom,
} from "rxjs";
import { fromActivityLog } from "../../entities/activity-log/activity-log.selectors";
import { IActivityLogEntry } from "../../entities/activity-log/activity-log.types";
import { fromActivityTypes } from "../../entities/activity-types/activity-types.selectors";
import { IActivityTypes } from "../../entities/activity-types/activity-types.types";
import {
    fromApplication,
    IAttendanceWithTimes,
} from "../../entities/application/application.selectors";
import {
    IAttendanceCorrection,
    IAttendanceEntry,
} from "../../entities/attendance/attendance.state";
import { getFirstDayOfCalendarWeek } from "../../shared/legacy/helpers";
import { FormatHoursPipe } from "../../shared/legacy/pipes/format-hours.pipe";
import { IGroupEntry } from "../../shared/legacy/pipes/group-activity-log-entries-by-id.pipe";
import { PadNumberPipe } from "../../shared/legacy/pipes/pad-number.pipe";

interface IDayEntry {
    dayOfTheWeek: number;

    date: Date;

    name: string;

    entries$: BehaviorSubject<IActivityLogEntry[]>;
}

interface IWeekDate {
    year: number;
    week: number;
}

interface IWeekAttendanceStats {
    totalHours: number;

    totalNonWorkingHours: number;

    totalOvertime: number;
}

@Component({
    selector: "app-week",
    templateUrl: "./week.component.html",
})
export class WeekComponent {
    public activityLogEntries$: Observable<IActivityLogEntry[]>;
    public activityTypes$: Observable<IActivityTypes>;

    // log entries, filtered to only contain the ones that are in this week
    public filteredLogEntries$: Observable<IActivityLogEntry[]>;

    public nextWeek$: Observable<IWeekDate>;
    public nextWeek?: IWeekDate;

    public week$: Observable<IWeekDate>;
    public week?: IWeekDate;

    public previousWeek$: Observable<IWeekDate>;
    public previousWeek?: IWeekDate;

    public days$: Observable<IDayEntry[]>;

    public loggedSum$: Observable<number>;

    public modalRef!: BsModalRef;

    public printPreviewContents?: string;

    public attendances$: Observable<IAttendanceWithTimes[]>;
    public attendanceCorrections$: Observable<IAttendanceCorrection[]>;

    public attendanceStats$: Observable<IWeekAttendanceStats>;

    private attendances: IAttendanceWithTimes[] = [];
    private attendanceStats!: IWeekAttendanceStats;

    public selectedTab: "tally" | "daily" | "attendance" = "tally";

    public overallAttendanceSum$: Observable<number | undefined>;
    private overallAttendanceSum?: number;

    constructor(
        private store: Store<ApplicationState>,
        public activatedRoute: ActivatedRoute,
        private modalService: BsModalService
    ) {
        this.week$ = this.activatedRoute.params.pipe(
            map((parameters) => {
                let year = Number(parameters["year"]);
                let week = Number(parameters["week"]);
                if (Number.isNaN(year) || Number.isNaN(week)) {
                    const today = new Date();
                    year = today.getFullYear();
                    week = currentWeekNumber(today);
                }
                return { year, week };
            })
        );

        this.week$.subscribe((week) => (this.week = week));

        this.activityTypes$ = this.store.select(fromActivityTypes.getState);
        this.activityLogEntries$ = this.store.select(
            fromActivityLog.activityLogEntries
        );

        this.previousWeek$ = this.week$.pipe(
            map((week) => {
                let previousWeek = week.week - 1;
                let previousWeekYear = week.year;
                if (previousWeek < 1) {
                    previousWeek = 52;
                    previousWeekYear -= 1;
                }

                return { year: previousWeekYear, week: previousWeek };
            })
        );

        this.previousWeek$.subscribe((value) => {
            this.previousWeek = value;
        });

        this.nextWeek$ = this.week$.pipe(
            map((week) => {
                let nextWeek = week.week + 1;
                let nextWeekYear = week.year;
                if (nextWeek > 52) {
                    nextWeek = 1;
                    nextWeekYear += 1;
                }

                return { year: nextWeekYear, week: nextWeek };
            })
        );

        this.nextWeek$.subscribe((value) => {
            this.nextWeek = value;
        });

        this.filteredLogEntries$ = combineLatest([
            this.week$,
            this.activityLogEntries$,
        ]).pipe(
            map(([week, entries]) => {
                return entries.filter((entry) => {
                    const date = new Date(entry.year, entry.month, entry.day);
                    return (
                        entry.year === week.year &&
                        currentWeekNumber(date) === week.week
                    );
                });
            })
        );

        this.days$ = this.filteredLogEntries$.pipe(
            map((entries) => {
                const days: IDayEntry[] = [];
                const weekdayNames = [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                ];

                // calculate the start date of the week
                const startOfWeek = getFirstDayOfCalendarWeek(
                    this.week!.year,
                    this.week!.week
                );
                // - 1: javascript week starts on sunday
                startOfWeek.setDate(
                    startOfWeek.getDate() - ((startOfWeek.getDay() + 6) % 7)
                );

                weekdayNames.forEach((weekdayName, index) => {
                    const dayOfTheWeek = index;
                    const filteredEntries = entries.filter((entry) => {
                        const date = new Date(
                            entry.year,
                            entry.month,
                            entry.day
                        );
                        return date.getUTCDay() === dayOfTheWeek;
                    });

                    days.push({
                        name: weekdayName,
                        dayOfTheWeek,
                        date: new Date(
                            startOfWeek.getFullYear(),
                            startOfWeek.getMonth(),
                            startOfWeek.getDate() + index
                        ),
                        entries$: new BehaviorSubject(filteredEntries),
                    });
                });

                return days;
            })
        );

        this.loggedSum$ = this.filteredLogEntries$.pipe(
            map((v) => v.map((d) => d.hours)),
            map((v) => v.reduce((prev, curr) => prev + curr, 0))
        );

        this.overallAttendanceSum$ = this.store.select(
            fromApplication.overtimeSum
        );
        this.overallAttendanceSum$.subscribe(
            (sum) => (this.overallAttendanceSum = sum)
        );

        this.attendances$ = combineLatest([
            this.store.select(fromApplication.attendanceEntriesWithOvertime),
            this.week$,
        ]).pipe(
            map(([entries, week]) =>
                entries.filter((e) => {
                    const entryWeek = currentWeekNumber(e.date);
                    return (
                        e.date.getFullYear() === week.year &&
                        entryWeek === week.week
                    );
                })
            ),
            map((entries) =>
                entries.sort((a, b) => a.date.getTime() - b.date.getTime())
            )
        );

        this.attendanceCorrections$ = this.attendances$.pipe(
            map((attendances) => {
                return attendances
                    .map((v) => v.corrections ?? [])
                    .reduce(
                        (prev, curr) => (prev ?? []).concat(curr ?? []),
                        []
                    );
            })
        );

        this.attendanceStats$ = this.attendances$.pipe(
            map((attendances) => {
                let totalHours = 0;
                let totalNonWorkingHours = 0;
                let totalOvertime = 0;

                for (const attendance of attendances) {
                    totalHours += attendance.hours ?? 0;
                    totalNonWorkingHours += attendance.nonWorkingHours ?? 0;
                    totalOvertime += attendance.overtime ?? 0;
                }

                return { totalHours, totalNonWorkingHours, totalOvertime };
            })
        );

        combineLatest([
            this.attendances$,
            this.attendanceStats$,
            this.days$,
            this.attendanceCorrections$,
        ])
            .pipe(withLatestFrom(this.activityTypes$))
            .subscribe(([[attendances, stats, days, corrections], types]) => {
                this.attendances = attendances;
                this.attendanceStats = stats;
                this.refreshPrintPreviewContents(days, types, corrections);
            });
    }

    openModal(template: TemplateRef<unknown>) {
        this.modalRef = this.modalService.show(template);
    }

    openLargeModal(template: TemplateRef<unknown>) {
        this.modalRef = this.modalService.show(template, {
            class: "modal-lg",
        });
    }

    refreshPrintPreviewContents(
        days: IDayEntry[],
        types: IActivityTypes,
        corrections: IAttendanceCorrection[]
    ) {
        const root = document.createElement("div");
        const h = root.appendChild(document.createElement("h1"));
        h.innerText = `Week ${this.week!.week} / ${this.week!.year}`;

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
        const attendanceHeading = root.appendChild(
            document.createElement("h2")
        );
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
        for (const attendance of this.attendances) {
            const day = `${dayNames[attendance.date.getDay()]}`;
            const startTime = this.attendanceStartTimeStr(attendance);
            const endTime = this.attendanceEndTimeStr(attendance);
            const nonWorking = this.attendanceNonWorkingStr(attendance);
            const overtime = `${pmHours(attendance.overtime)}`;
            attendanceTable.body.appendRow(
                day,
                startTime,
                endTime,
                nonWorking,
                {
                    contents: overtime,
                    align: "right",
                }
            );
        }

        if (this.attendanceStats) {
            attendanceTable.body.appendRow(
                { contents: "Totals", colSpan: 3 },
                hrf(this.attendanceStats.totalNonWorkingHours, "{h}:{m}"),
                {
                    contents: pmHours(this.attendanceStats.totalOvertime),
                    align: "right",
                }
            );
        }

        if (corrections && corrections.length > 0) {
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

        if (this.overallAttendanceSum) {
            attendanceTable.body.appendRow(
                { contents: "Overall overtime", colSpan: 4 },
                { contents: pmHours(this.overallAttendanceSum), align: "right" }
            );
        }

        attendanceTable.appendTo(root);

        this.printPreviewContents = root.innerHTML;
    }

    private attendanceTimeStr(hours?: Date) {
        const padNumber = new PadNumberPipe();
        return hours
            ? hours.getHours() + ":" + padNumber.transform(hours.getMinutes())
            : "-";
    }

    attendanceStartTimeStr(attendance: IAttendanceEntry) {
        return this.attendanceTimeStr(attendance.start);
    }

    attendanceEndTimeStr(attendance: IAttendanceEntry) {
        return this.attendanceTimeStr(attendance.end);
    }

    attendanceNonWorkingStr(attendance: IAttendanceWithTimes): string {
        return attendance.nonWorkingHours !== undefined
            ? new FormatHoursPipe().transform(
                  attendance.nonWorkingHours,
                  "{h}:{m}"
              )
            : "-";
    }

    savePrint() {
        const a = document.getElementById("printDownload");
        if (!a) {
            throw new Error("#printDownload not found!");
        }
        // TODO pad is copied from storageVersion effects, put this somewhere and reuse it
        const pad = (n: number, width = 2, fill = "0") => {
            let n_str = `${n}`;
            if (n_str.length < width) {
                n_str = fill.repeat(width - n_str.length) + n_str;
            }
            return n_str;
        };

        const downloadName = `Timesheet-${this.week!.year}-${pad(this.week!.week)}`;

        const html = `<!DOCTYPE html><html><head><title>Timesheet</title><meta charset="utf-8"><body>${this.printPreviewContents}</body><html>`;

        const dataStr =
            "data:text/html;charset=utf-8," + encodeURIComponent(html);
        a.setAttribute("href", dataStr);
        a.setAttribute("download", downloadName + ".html");
        a.click();

        this.modalRef.hide();
    }
}
