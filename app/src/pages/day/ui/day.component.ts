import { Component, ViewChild } from "@angular/core";

import { Store } from "@ngrx/store";

import { ApplicationState } from "../../../entities/application";

import {
    BehaviorSubject,
    combineLatest,
    map,
    Observable,
    Subject,
    timer,
    withLatestFrom,
} from "rxjs";
import {
    activityLogActions,
    fromActivityLog,
    IActivityLog,
    IActivityLogEntry,
} from "../../../entities/activity-log";
import {
    fromActivityTypes,
    IActivityType,
    IActivityTypes,
} from "../../../entities/activity-type";
import { fromAttendance } from "../../../entities/attendance";
import {
    ILogHoursOutput,
    LogInputComponent,
} from "../../../widgets/activity-log";

@Component({
    selector: "app-day",
    templateUrl: "./day.component.html",
})
export class DayComponent {
    @ViewChild(LogInputComponent)
    private logInput!: LogInputComponent;

    public startTime$: Observable<Date>;

    protected activityLog$: Observable<IActivityLog>;

    protected activityTypes$: Observable<IActivityTypes>;

    protected activities$: Observable<IActivityType[]>;

    protected activityLogEntries$: Observable<IActivityLogEntry[]>;

    protected totalHours$: Observable<number>;

    protected date$ = new BehaviorSubject<Date>(new Date());

    protected dateDayStart$: Observable<Date>;

    protected dateDayEnd$: Observable<Date>;

    protected hoursLeftToLog$ = new Observable<number | undefined>();

    private singInTime$: Observable<Date | undefined>;

    private dateDayRange$: Observable<[Date, Date]>;

    private hourLog$ = new Subject<ILogHoursOutput>();

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
                this.logInput.clear();
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
                console.log("Setting start time to", start);
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
                if (diff < 0) {
                    return 0;
                } else {
                    return diff;
                }
            })
        );
    }

    protected changeEntryDescription(params: {
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

    protected logHours(log: ILogHoursOutput) {
        this.hourLog$.next(log);
    }

    protected dayPicked(day: Date): void {
        this.date$.next(day);
    }
}
