import { Component, ElementRef, ViewChild } from "@angular/core";

import { Store } from "@ngrx/store";

import { ApplicationState } from "../../entities/application/models/application.model";

import { BsDatepickerDirective } from "ngx-bootstrap/datepicker";
import {
    BehaviorSubject,
    combineLatest,
    map,
    Observable,
    Subject,
    timer,
    withLatestFrom,
} from "rxjs";
import { activityLogActions } from "../../entities/activity-log/models/activity-log.actions";
import { fromActivityLog } from "../../entities/activity-log/models/activity-log.selectors";
import {
    IActivityLog,
    IActivityLogEntry,
} from "../../entities/activity-log/models/activity-log.types";
import { fromActivityTypes } from "../../entities/activity-type/models/activity-types.selectors";
import {
    IActivityType,
    IActivityTypes,
} from "../../entities/activity-type/models/activity-types.types";
import { ActivityPickerComponent } from "../../entities/activity-type/ui";
import { fromAttendance } from "../../entities/attendance/models/attendance.selectors";
import { stringToDuration } from "../../shared/legacy/helpers";
import { HourBadgeComponent } from "../../shared/ui/hour-badge/hour-badge.component";
import { TimeBadgeComponent } from "../../shared/ui/time-badge/time-badge.component";

@Component({
    selector: "app-day",
    templateUrl: "./day.component.html",
    styleUrls: ["./day.component.css"],
})
export class DayComponent {
    public activityLog$: Observable<IActivityLog>;
    public activityTypes$: Observable<IActivityTypes>;
    public activities$: Observable<IActivityType[]>;
    public activityLogEntries$: Observable<IActivityLogEntry[]>;

    public totalHours$: Observable<number>;
    public startTime$: Observable<Date>;
    public singInTime$: Observable<Date | undefined>;

    public date$ = new BehaviorSubject<Date>(new Date());
    public dateDayRange$: Observable<[Date, Date]>;
    public dateDayStart$: Observable<Date>;
    public dateDayEnd$: Observable<Date>;

    public pickingDate = false;
    @ViewChild("datePickerInput")
    private datePickerInput!: ElementRef;

    @ViewChild("datePicker")
    private datePicker!: BsDatepickerDirective;

    @ViewChild("totalHoursDisplay")
    public totalHoursDisplay!: HourBadgeComponent;

    @ViewChild("startTimeDisplay")
    public startTimeDisplay!: TimeBadgeComponent;

    @ViewChild("activityToLog")
    public activityToLog!: ActivityPickerComponent;

    @ViewChild("hoursToLog")
    public hoursToLog!: ElementRef;

    @ViewChild("descriptionToLog")
    public logDescription!: ElementRef;

    @ViewChild("logHoursButton")
    public logHoursButton!: ElementRef;

    public hourLog$ = new Subject<{
        hours: number;
        activityName: string;
        description?: string;
    }>();

    public hoursLeftToLog$ = new Observable<number | undefined>();

    constructor(private store: Store<ApplicationState>) {
        this.dateDayRange$ = this.date$.pipe(
            map((date) => {
                const dayStart = new Date(date);
                dayStart.setHours(0, 0, 0, 0);
                const dayEnd = new Date(date);
                dayEnd.setHours(23, 59, 59, 999);
                return [dayStart, dayEnd] as [Date, Date];
            })
        );
        this.dateDayStart$ = this.dateDayRange$.pipe(map((range) => range[0]));
        this.dateDayEnd$ = this.dateDayRange$.pipe(map((range) => range[1]));
        this.activityTypes$ = this.store.select(fromActivityTypes.getState);
        this.activities$ = this.activityTypes$.pipe(
            map((types) => types.activities)
        );
        this.activityLog$ = this.store.select(fromActivityLog.allActivities);
        this.activityLogEntries$ = combineLatest([
            this.activityLog$,
            this.date$,
        ]).pipe(
            map(([log, date]) =>
                log.entries.filter(
                    (entry) =>
                        entry.year === date.getFullYear() &&
                        entry.month === date.getMonth() &&
                        entry.day === date.getDate()
                )
            )
        );

        this.hourLog$
            .pipe(withLatestFrom(this.date$))
            .subscribe(([log, date]) => {
                this.store.dispatch(
                    activityLogActions.fetchOrCreateIdAndLogTime({
                        name: log.activityName,
                        hoursToLog: log.hours,
                        date,
                        description: log.description,
                    })
                );
                this.hoursToLog.nativeElement.value = "";
                this.logDescription.nativeElement.value = "";
            });

        this.totalHours$ = this.activityLogEntries$.pipe(
            map((entries) =>
                entries
                    .map((e) => e.hours)
                    .reduce((total, current) => total + current, 0)
            )
        );

        this.singInTime$ = this.store.select(fromAttendance.getEntries).pipe(
            withLatestFrom(this.date$),
            map(([entries, date]) => {
                const entry = entries.find(
                    (e) =>
                        e.date.getDate() === date.getDate() &&
                        e.date.getMonth() === date.getMonth() &&
                        e.date.getFullYear() === date.getFullYear()
                );
                if (!entry) {
                    return undefined;
                } else {
                    return entry.start;
                }
            })
        );

        this.startTime$ = timer(0, 5).pipe(
            withLatestFrom(this.totalHours$),
            map(([_timer, hoursFraction]) => {
                const start = new Date();
                const hours = Math.floor(hoursFraction);
                const minutes = (hoursFraction - hours) * 60.0;
                start.setHours(start.getHours() - hours);
                start.setMinutes(start.getMinutes() - minutes);
                return start;
            })
        );

        this.hoursLeftToLog$ = combineLatest([
            this.startTime$,
            this.singInTime$,
        ]).pipe(
            map(([startTime, singInTime]) => {
                let signin: number;
                if (singInTime) {
                    signin = singInTime.getTime();
                } else {
                    signin = new Date(
                        startTime.getFullYear(),
                        startTime.getMonth(),
                        startTime.getDate()
                    ).getTime();
                }
                const diff = (startTime.getTime() - signin) / (1000 * 60 * 60);
                // console.log('signin: ' + signin + ', start: ' + startTime.getTime() + ', diff: ' + diff);
                if (diff < 0) {
                    return 0;
                } else {
                    return diff;
                }
            })
        );
    }

    refocusOnEnter() {
        const activity = this.activityToLog.name.trim();
        const hours = this.hoursToLog.nativeElement.value.trim();
        if (activity && hours) {
            this.logHoursButton.nativeElement.click();
            this.hoursToLog.nativeElement.focus();
        } else if (activity) {
            this.hoursToLog.nativeElement.focus();
        } else if (hours) {
            this.activityToLog.focus();
        }
    }

    changeEntryDescription(params: {
        entryId: string;
        newDescription: string;
    }) {
        this.store.dispatch(
            activityLogActions.setDescription({
                entryId: params.entryId,
                description: params.newDescription,
            })
        );
    }

    logHours(activityName: string, hours: string, description?: string) {
        const numHours = stringToDuration(hours);
        if (!numHours || Number.isNaN(numHours)) {
            // TODO show error
            return;
        }
        this.hourLog$.next({ hours: numHours, activityName, description });
    }

    startDatePicking() {
        this.pickingDate = true;
        this.datePickerInput.nativeElement.focus();
        this.datePicker.show();
    }

    endDatePicking() {
        this.pickingDate = false;
    }

    pickToday() {
        this.date$.next(new Date());
    }

    pickNextDay() {
        this.skipDays(+1);
    }

    pickPreviousDay() {
        this.skipDays(-1);
    }

    skipDays(days: number) {
        const current = this.date$.value;
        this.date$.next(
            new Date(
                current.getFullYear(),
                current.getMonth(),
                current.getDate() + days
            )
        );
    }
}
