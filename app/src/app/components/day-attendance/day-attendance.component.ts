import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, Subject, withLatestFrom } from 'rxjs';
import { dateToTimeInputValue, stringToDuration, valueToTime } from '../../helpers';
import { attendanceActions } from '../../redux/actions/attendance.actions';
import * as get from '../../redux/selectors';
import { ApplicationState } from '../../redux/states/applicationState';
import { AttendanceEntry, IAttendanceCorrection, IAttendanceEntry } from '../../redux/states/attendanceState';

@Component({
  selector: 'app-day-attendance',
  templateUrl: './day-attendance.component.html',
  styleUrls: ['./day-attendance.component.css']
})
export class DayAttendanceComponent implements OnInit {
  @Input()
  public date$!: Observable<Date>;

  @ViewChild('dayStart')
  public startInput!: ElementRef;

  @ViewChild('dayEnd')
  public endInput!: ElementRef;

  public timeValues$ = new Subject<{ start: string, end: string }>();

  public timeInputsChaged$ = new Subject<void>();

  public start$!: Observable<string>;
  public end$!: Observable<string>;

  public startValid$!: Observable<boolean>;
  public endValid$!: Observable<boolean>;

  private entries$!: Observable<IAttendanceEntry[]>;

  private entry$!: Observable<IAttendanceEntry | undefined>;

  public corrections$!: Observable<IAttendanceCorrection[]>;

  public correctionCreation$ = new Subject<void>();

  public correctionsToUpdate$ = new Subject<IAttendanceCorrection>();

  public correctionsToDelete$ = new Subject<IAttendanceCorrection>();

  constructor(public store: Store<ApplicationState>) {
  }

  ngOnInit() {
    this.timeValues$.pipe(withLatestFrom(this.date$))
      .subscribe(([values, date]) => {
        const start = valueToTime(values.start);
        const end = valueToTime(values.end);
        this.store.dispatch(attendanceActions.setStartAndEndTime({ date, start, end }));
      });

    this.entries$ = this.store.select(get.attendanceEntries);
    this.entry$ = combineLatest([this.entries$, this.date$]).pipe(map(([v, date]) => v.find(e => AttendanceEntry.equalsDate(e, date))));

    this.corrections$ = this.entry$.pipe(map(e => (e ? e.corrections : undefined) || []));

    this.start$ = this.entry$.pipe(map(e => e && e.start ? dateToTimeInputValue(e.start) : ''));
    this.end$ = this.entry$.pipe(map(e => e && e.end ? dateToTimeInputValue(e.end) : ''));

    this.correctionCreation$.pipe(withLatestFrom(this.date$))
      .subscribe(([_, date]) => {
        if (date) {
          this.store.dispatch(attendanceActions.createCorrection({ year: date.getFullYear(), month: date.getMonth(), day: date.getDate() }));
        }
      });

    this.correctionsToUpdate$.pipe(withLatestFrom(this.date$))
      .subscribe(([update, date]) => {
        if (date) {
          this.store.dispatch(
            attendanceActions.updateCorrection({ year: date.getFullYear(), month: date.getMonth(), day: date.getDate(), id: update.id, newHours: update.hours, newDescription: update.description })
          );
        }
      });

    this.correctionsToDelete$.pipe(withLatestFrom(this.date$))
      .subscribe(([toDelete, date]) => {
        if (date) {
          this.store.dispatch(attendanceActions.deleteCorrection({ year: date.getFullYear(), month: date.getMonth(), day: date.getDate(), id: toDelete.id }));
        }
      });

    this.startValid$ = combineLatest([this.start$, this.timeValues$, this.timeInputsChaged$]).pipe(
      map(([start]) => this.startInput.nativeElement.value === start)
    );

    this.endValid$ = combineLatest([this.end$, this.timeValues$, this.timeInputsChaged$]).pipe(
      map(([end]) => this.endInput.nativeElement.value === end)
    );
  }

  public updateCorrection(correctionId: string, newDescription: string, newHoursAsString: string): void {
    const newHours = stringToDuration(newHoursAsString);
    if (!newHours || Number.isNaN(newHours)) {
      // TODO show error
      return;
    }
    this.correctionsToUpdate$.next({ id: correctionId, description: newDescription, hours: newHours });
  }

  public setTimeToNowPlusMinutes(element: HTMLInputElement, minutesDelta: number) {
    const date = new Date();
    date.setMinutes(date.getMinutes() + minutesDelta);
    element.value = dateToTimeInputValue(date);
  }
}
