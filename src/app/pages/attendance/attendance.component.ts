import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { AttendanceState, IAttendanceEntry, AttendanceEntry, IAttendanceCorrection } from '../../redux/states/attendanceState';
import { Store } from '@ngrx/store';
import { SetStartTimeAction, SetEndTimeAction, CreateCorrectionAction, DeleteCorrectionAction, UpdateCorrectionAction } from '../../redux/actions/attendanceActions';
import { Observable } from 'rxjs/Observable';

import * as get from '../../redux/selectors';
import { ApplicationState } from '../../redux/states/applicationState';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  public date$ = new BehaviorSubject<Date>(new Date());

  public timeValues$ = new Subject<{ start: string, end: string }>();

  public start$: Observable<string>;
  public end$: Observable<string>;

  private entries$: Observable<IAttendanceEntry[]>;

  private entry$: Observable<IAttendanceEntry | null>;

  public corrections$: Observable<IAttendanceCorrection[]>;

  public correctionCreation$ = new Subject<void>();

  public correctionsToUpdate$ = new Subject<IAttendanceCorrection>();

  public correctionsToDelete$ = new Subject<IAttendanceCorrection>();

  // TODO these and start/endDatePicking are copies from DayComponent; introduce common header component
  public pickingDate = false;
  @ViewChild('datePickerInput')
  private datePickerInput: ElementRef;
  @ViewChild('datePicker')
  private datePicker: ElementRef;

  private static zeroPad(numberToPad: number, zeroes: number = 2) {
    const str = '' + numberToPad;
    if (str.length >= zeroes) {
      return str;
    } else {
      return '0'.repeat(zeroes - str.length) + str;
    }
  }
  private static toTimeValue(date: Date) {
    return `${AttendanceComponent.zeroPad(date.getHours())}:${AttendanceComponent.zeroPad(date.getMinutes())}`;
  }

  constructor(public store: Store<ApplicationState>) {
    Observable.combineLatest(this.timeValues$, this.date$)
      .subscribe(([values, date]) => {
        const start = this.valueToTime(values.start);
        const end = this.valueToTime(values.end);
        if (start) {
          this.store.dispatch(new SetStartTimeAction(date, start));
        }
        if (end) {
          this.store.dispatch(new SetEndTimeAction(date, end));
        }
      });

    this.entries$ = this.store.select(get.attendanceEntries);
    this.entry$ = Observable.combineLatest(this.entries$, this.date$)
      .map(([v, date]) => v.find(e => AttendanceEntry.equalsDate(e, date)));

    this.corrections$ = this.entry$.map(e => e.corrections || []);

    this.start$ = this.entry$.map(e => e ? AttendanceComponent.toTimeValue(e.start) : '');
    this.end$ = this.entry$.map(e => e ? AttendanceComponent.toTimeValue(e.end) : '');

    Observable.combineLatest(this.date$, this.correctionCreation$)
      .subscribe(([date]) => {
        this.store.dispatch(new CreateCorrectionAction(date.getFullYear(), date.getMonth(), date.getDate()));
      });

    Observable.combineLatest(this.date$, this.correctionsToUpdate$)
      .subscribe(([date, update]) => {
        this.store.dispatch(
          new UpdateCorrectionAction(date.getFullYear(), date.getMonth(), date.getDate(), update.id, update.hours, update.description)
        );
      });

    Observable.combineLatest(this.date$, this.correctionsToDelete$)
      .subscribe(([date, toDelete]) => {
        this.store.dispatch(new DeleteCorrectionAction(date.getFullYear(), date.getMonth(), date.getDate(), toDelete.id));
      });
  }

  ngOnInit() {
  }

  private valueToTime(value: string | undefined): Date | undefined {
    value = value.trim();
    if (!value) {
      return undefined;
    } else {
      const split = value.split(':');
      if (split.length !== 2) {
        return undefined;
      }
      const hours = Number(split[0]);
      const minutes = Number(split[1]);
      if (Number.isNaN(hours) || Number.isNaN(minutes)) {
        return undefined;
      }

      const date = new Date();
      date.setHours(hours);
      date.setMinutes(minutes);
      date.setSeconds(0);
      return date;
    }
  }

  startDatePicking() {
    this.pickingDate = true;
    this.datePickerInput.nativeElement.focus();
    (this.datePicker as any).show();
  }

  endDatePicking() {
    const date = new Date(this.datePickerInput.nativeElement.value);
    this.pickingDate = false;
    this.date$.next(date);
  }
}
