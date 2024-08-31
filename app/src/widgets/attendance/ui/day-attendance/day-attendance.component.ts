import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import { combineLatest, map, Observable, Subject, withLatestFrom } from "rxjs";
import { ApplicationState } from "../../../../entities/application";
import {
    attendanceActions,
    AttendanceEntry,
    fromAttendance,
    IAttendanceCorrection,
    IAttendanceEntry,
} from "../../../../entities/attendance";
import {
    dateToTimeInputValue,
    stringToDuration,
    valueToTime,
} from "../../../../shared/lib";

@Component({
    selector: "app-day-attendance",
    templateUrl: "./day-attendance.component.html",
})
export class DayAttendanceComponent implements OnInit {
    @Input()
    public date$!: Observable<Date>;

    @ViewChild("dayStart")
    public startInput!: ElementRef;

    @ViewChild("dayEnd")
    public endInput!: ElementRef;

    protected timeValues$ = new Subject<{ start: string; end: string }>();

    protected timeInputsChaged$ = new Subject<void>();

    protected start$!: Observable<string>;

    protected end$!: Observable<string>;

    protected startValid$!: Observable<boolean>;

    protected endValid$!: Observable<boolean>;

    protected corrections$!: Observable<IAttendanceCorrection[]>;

    protected correctionCreation$ = new Subject<void>();

    protected correctionsToUpdate$ = new Subject<IAttendanceCorrection>();

    protected correctionsToDelete$ = new Subject<IAttendanceCorrection>();

    private entries$!: Observable<IAttendanceEntry[]>;

    private entry$!: Observable<IAttendanceEntry | undefined>;

    constructor(public store: Store<ApplicationState>) {}

    public ngOnInit() {
        this.timeValues$
            .pipe(withLatestFrom(this.date$))
            .subscribe(([values, date]) => {
                const start = valueToTime(values.start);
                const end = valueToTime(values.end);
                this.store.dispatch(
                    attendanceActions.setStartAndEndTime({ date, start, end })
                );
            });

        this.entries$ = this.store.select(fromAttendance.getEntries);
        this.entry$ = combineLatest([this.entries$, this.date$]).pipe(
            map(([v, date]) =>
                v.find((e) => AttendanceEntry.equalsDate(e, date))
            )
        );

        this.corrections$ = this.entry$.pipe(
            map((e) => (e ? e.corrections : undefined) || [])
        );

        this.start$ = this.entry$.pipe(
            map((e) => (e && e.start ? dateToTimeInputValue(e.start) : ""))
        );
        this.end$ = this.entry$.pipe(
            map((e) => (e && e.end ? dateToTimeInputValue(e.end) : ""))
        );

        this.correctionCreation$
            .pipe(withLatestFrom(this.date$))
            .subscribe(([_, date]) => {
                if (date) {
                    this.store.dispatch(
                        attendanceActions.createCorrection({
                            year: date.getFullYear(),
                            month: date.getMonth(),
                            day: date.getDate(),
                        })
                    );
                }
            });

        this.correctionsToUpdate$
            .pipe(withLatestFrom(this.date$))
            .subscribe(([update, date]) => {
                if (date) {
                    this.store.dispatch(
                        attendanceActions.updateCorrection({
                            year: date.getFullYear(),
                            month: date.getMonth(),
                            day: date.getDate(),
                            id: update.id,
                            newHours: update.hours,
                            newDescription: update.description,
                        })
                    );
                }
            });

        this.correctionsToDelete$
            .pipe(withLatestFrom(this.date$))
            .subscribe(([toDelete, date]) => {
                if (date) {
                    this.store.dispatch(
                        attendanceActions.deleteCorrection({
                            year: date.getFullYear(),
                            month: date.getMonth(),
                            day: date.getDate(),
                            id: toDelete.id,
                        })
                    );
                }
            });

        this.startValid$ = combineLatest([
            this.start$,
            this.timeValues$,
            this.timeInputsChaged$,
        ]).pipe(
            map(([start]) => this.startInput.nativeElement.value === start)
        );

        this.endValid$ = combineLatest([
            this.end$,
            this.timeValues$,
            this.timeInputsChaged$,
        ]).pipe(map(([end]) => this.endInput.nativeElement.value === end));
    }

    public updateCorrection(
        correctionId: string,
        newDescription: string,
        newHoursAsString: string
    ): void {
        const newHours = stringToDuration(newHoursAsString);
        if (!newHours || Number.isNaN(newHours)) {
            // TODO show error
            return;
        }
        this.correctionsToUpdate$.next({
            id: correctionId,
            description: newDescription,
            hours: newHours,
        });
    }

    public setTimeToNowPlusMinutes(
        element: HTMLInputElement,
        minutesDelta: number
    ) {
        const date = new Date();
        date.setMinutes(date.getMinutes() + minutesDelta);
        element.value = dateToTimeInputValue(date);
    }
}
