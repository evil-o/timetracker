import { Component, TemplateRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Store } from "@ngrx/store";

import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

import { ApplicationState } from "../../../entities/application";

import currentWeekNumber from "current-week-number";
import {
    BehaviorSubject,
    combineLatest,
    map,
    Observable,
    withLatestFrom,
} from "rxjs";
import {
    fromActivityLog,
    IActivityLogEntry,
} from "../../../entities/activity-log";
import {
    fromActivityTypes,
    IActivityTypes,
} from "../../../entities/activity-type";
import {
    fromApplication,
    IAttendanceWithTimes,
} from "../../../entities/application";
import { IAttendanceCorrection } from "../../../entities/attendance";
import { getFirstDayOfCalendarWeek } from "../../../shared/lib";
import { IWeekAttendanceStats } from "../../../widgets/attendance";
import { IDayEntry, IWeekDate, makeTimeSheet } from "../../../widgets/week";

@Component({
    selector: "app-week",
    templateUrl: "./week.component.html",
})
export class WeekComponent {
    protected activityLogEntries$: Observable<IActivityLogEntry[]>;

    protected activityTypes$: Observable<IActivityTypes>;

    // log entries, filtered to only contain the ones that are in this week
    protected filteredLogEntries$: Observable<IActivityLogEntry[]>;

    protected week$: Observable<IWeekDate>;

    protected week?: IWeekDate;

    protected days$: Observable<IDayEntry[]>;

    protected loggedSum$: Observable<number>;

    protected modalRef!: BsModalRef;

    protected printPreviewContents?: string;

    protected attendances$: Observable<IAttendanceWithTimes[]>;

    protected attendanceCorrections$: Observable<IAttendanceCorrection[]>;

    protected attendanceStats$: Observable<IWeekAttendanceStats>;

    protected selectedTab: "tally" | "daily" | "attendance" = "tally";

    private attendances: IAttendanceWithTimes[] = [];

    private overallAttendanceSum$: Observable<number | undefined>;

    public constructor(
        private store: Store<ApplicationState>,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private modalService: BsModalService
    ) {
        this.week$ = this.activatedRoute.queryParams.pipe(
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

        this.overallAttendanceSum$ = this.store.select(
            fromApplication.overtimeSum
        );

        combineLatest([
            this.attendances$,
            this.attendanceStats$,
            this.days$,
            this.attendanceCorrections$,
            this.overallAttendanceSum$,
        ])
            .pipe(withLatestFrom(this.activityTypes$))
            .subscribe(
                ([
                    [
                        attendances,
                        stats,
                        days,
                        corrections,
                        overallAttendanceSum,
                    ],
                    types,
                ]) => {
                    this.attendances = attendances;
                    this.refreshPrintPreviewContents(
                        days,
                        types,
                        corrections,
                        stats,
                        overallAttendanceSum
                    );
                }
            );
    }

    protected weekSelected(week: IWeekDate): void {
        this.router.navigate(["/week"], {
            queryParams: { year: week.year, week: week.week },
        });
    }

    protected openModal(template: TemplateRef<unknown>) {
        this.modalRef = this.modalService.show(template);
    }

    protected openLargeModal(template: TemplateRef<unknown>) {
        this.modalRef = this.modalService.show(template, {
            class: "modal-lg",
        });
    }

    protected refreshPrintPreviewContents(
        days: IDayEntry[],
        types: IActivityTypes,
        corrections: IAttendanceCorrection[],
        attendanceStats: IWeekAttendanceStats,
        overallAttendanceSum: number | undefined
    ) {
        const root = makeTimeSheet(
            this.week!,
            days,
            types,
            corrections,
            this.attendances,
            attendanceStats,
            overallAttendanceSum
        );

        this.printPreviewContents = root.innerHTML;
    }

    protected savePrint() {
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
