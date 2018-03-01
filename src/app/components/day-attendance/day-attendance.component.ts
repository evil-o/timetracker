import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { IAttendanceEntry, IAttendanceCorrection, AttendanceEntry } from '../../redux/states/attendanceState';
import { padNumber, valueToTime, dateToTimeInputValue } from '../../helpers';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../../redux/states/applicationState';
import {
  SetStartTimeAction,
  SetEndTimeAction,
  CreateCorrectionAction,
  UpdateCorrectionAction,
  DeleteCorrectionAction,
} from '../../redux/actions/attendanceActions';
import * as get from '../../redux/selectors';

@Component({
  selector: 'app-day-attendance',
  templateUrl: './day-attendance.component.html',
  styleUrls: ['./day-attendance.component.css']
})
export class DayAttendanceComponent implements OnInit {
  @Input()
  public date$;

  @ViewChild('dayStart')
  public startInput: ElementRef;

  @ViewChild('dayEnd')
  public endInput: ElementRef;

  public timeValues$ = new Subject<{ start: string, end: string }>();

  public timeInputsChaged$ = new Subject<void>();

  public start$: Observable<string>;
  public end$: Observable<string>;

  public startValid$: Observable<boolean>;
  public endValid$: Observable<boolean>;

  private entries$: Observable<IAttendanceEntry[]>;

  private entry$: Observable<IAttendanceEntry | null>;

  public corrections$: Observable<IAttendanceCorrection[]>;

  public correctionCreation$ = new Subject<void>();

  public correctionsToUpdate$ = new Subject<IAttendanceCorrection>();

  public correctionsToDelete$ = new Subject<IAttendanceCorrection>();

  constructor(public store: Store<ApplicationState>) {
  }

  ngOnInit() {
    this.timeValues$.withLatestFrom(this.date$)
      .subscribe(([values, date]) => {
        const start = valueToTime(values.start);
        const end = valueToTime(values.end);
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

    this.corrections$ = this.entry$.map(e => (e ? e.corrections : undefined) || []);

    this.start$ = this.entry$.map(e => e && e.start ? dateToTimeInputValue(e.start) : '');
    this.end$ = this.entry$.map(e => e && e.end ? dateToTimeInputValue(e.end) : '');

    this.correctionCreation$.withLatestFrom(this.date$)
      .subscribe(([unused, date]) => {
        if (date) {
          this.store.dispatch(new CreateCorrectionAction(date.getFullYear(), date.getMonth(), date.getDate()));
        }
      });

    this.correctionsToUpdate$.withLatestFrom(this.date$)
      .subscribe(([update, date]) => {
        if (date) {
          this.store.dispatch(
            new UpdateCorrectionAction(date.getFullYear(), date.getMonth(), date.getDate(), update.id, update.hours, update.description)
          );
        }
      });

    this.correctionsToDelete$.withLatestFrom(this.date$)
      .subscribe(([toDelete, date]) => {
        if (date) {
          this.store.dispatch(new DeleteCorrectionAction(date.getFullYear(), date.getMonth(), date.getDate(), toDelete.id));
        }
      });

    this.startValid$ = Observable.combineLatest(this.start$, this.timeValues$, this.timeInputsChaged$)
      .map(([start, timeValues]) => this.startInput.nativeElement.value === start);

    this.endValid$ = Observable.combineLatest(this.end$, this.timeValues$, this.timeInputsChaged$)
      .map(([end, timeValues]) => this.endInput.nativeElement.value === end);
  }

  public setTimeToNowPlusMinutes(element: HTMLInputElement, minutesDelta: number) {
    const date = new Date();
    date.setMinutes(date.getMinutes() + minutesDelta);
    element.value = dateToTimeInputValue(date);
  }
}
