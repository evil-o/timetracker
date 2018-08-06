import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { ApplicationState } from '../../redux/states/applicationState';
import { IActivityTypes } from '../../redux/states/activityTypes';
import { IActivityType } from '../../models/interfaces';
import { FetchOrCreateIdAndLogTimeAction, SetDescriptionAction } from '../../redux/actions/activityLogActions';
import { IActivityLogEntry } from '../../redux/states/activityLog';

import * as fromStore from '../../redux/selectors';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { TimeBadgeComponent } from '../../components/time-badge/time-badge.component';
import { HourBadgeComponent } from '../../components/hour-badge/hour-badge.component';
import { ActivityPickerComponent } from '../../components/activity-picker/activity-picker.component';
import { stringToDuration } from '../../helpers';


@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  public activityTypes$: Observable<IActivityTypes>;
  public activities$: Observable<IActivityType[]>;
  public activityLogEntries$: Observable<IActivityLogEntry[]>;

  public totalHours$: Observable<number>;
  public startTime$: Observable<Date>;
  public singInTime$: Observable<Date | undefined>;

  public date$ = new BehaviorSubject<Date>(new Date());

  private dateDayDeltas$ = new Subject<number>();

  public pickingDate = false;
  @ViewChild('datePickerInput')
  private datePickerInput: ElementRef;
  @ViewChild('datePicker')
  private datePicker: ElementRef;

  @ViewChild('totalHoursDisplay')
  public totalHoursDisplay: HourBadgeComponent;

  @ViewChild('startTimeDisplay')
  public startTimeDisplay: TimeBadgeComponent;

  @ViewChild('activityToLog')
  public activityToLog: ActivityPickerComponent;

  @ViewChild('hoursToLog')
  public hoursToLog: ElementRef;

  @ViewChild('descriptionToLog')
  public logDescription: ElementRef;

  @ViewChild('logHoursButton')
  public logHoursButton: ElementRef;

  public hourLog$ = new Subject<{ hours: number, activityName: string, description?: string }>();

  public hoursLeftToLog$ = new Observable<number | undefined>();

  constructor(private store: Store<ApplicationState>) {
    this.activityTypes$ = this.store.select(fromStore.activityTypes);
    this.activityLogEntries$ =
      Observable.combineLatest(
        this.store.select(fromStore.activityLogEntries),
        this.date$,
      )
        .map(([entries, date]) =>
          entries.filter((entry) =>
            entry.year === date.getFullYear()
            && entry.month === date.getMonth()
            && entry.day === date.getDate()
          )
        );

    this.hourLog$.withLatestFrom(this.date$).subscribe(([log, date]) => {
      this.store.dispatch(new FetchOrCreateIdAndLogTimeAction(log.activityName, log.hours, date, log.description));
      this.hoursToLog.nativeElement.value = '';
      this.logDescription.nativeElement.value = '';
    });

    this.totalHours$ = this.activityLogEntries$.map(entries => entries.map(e => e.hours).reduce((total, current) => total + current, 0));

    this.singInTime$ = this.store
      .select(fromStore.attendanceEntries)
      .withLatestFrom(this.date$)
      .map(([entries, date]) => {
        const entry = entries.find(
          e => e.date.getDate() === date.getDate() &&
          e.date.getMonth() === date.getMonth() &&
          e.date.getFullYear() === date.getFullYear()
        );
        if (!entry) {
          return undefined;
        } else {
          return entry.start;
        }
      });

    this.startTime$ = Observable.timer(0, 5)
      .withLatestFrom(this.totalHours$)
      .map(([timer, hoursFraction]) => {
        const start = new Date();
        const hours = Math.floor(hoursFraction);
        const minutes = (hoursFraction - hours) * 60.0;
        start.setHours(start.getHours() - hours);
        start.setMinutes(start.getMinutes() - minutes);
        return start;
      });

    this.hoursLeftToLog$ = Observable
      .combineLatest(this.startTime$, this.singInTime$)
      .map(([startTime, singInTime]) => {
        let signin: number;
        if (singInTime) {
          signin = singInTime.getTime();
        } else {
          signin = (new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate())).getTime();
        }
        const diff = (startTime.getTime() - signin) / (1000 * 60 * 60);
        // console.log('signin: ' + signin + ', start: ' + startTime.getTime() + ', diff: ' + diff);
        if (diff < 0) {
          return 0;
        } else {
          return diff;
        }
      });
  }

  ngOnInit() {
    this.activities$ = this.activityTypes$.map(types => types.activities);
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

  changeEntryDescription(params: { entryId: string, newDescription: string }) {
    this.store.dispatch(new SetDescriptionAction(params.entryId, params.newDescription));
  }

  logHours(activityName: string, hours: string, description?: string) {
    const numHours = stringToDuration(hours);
    if (Number.isNaN(numHours)) {
      // TODO show error
      return;
    }
    this.hourLog$.next({ hours: numHours, activityName, description });
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
    this.date$.next(new Date(current.getFullYear(), current.getMonth(), current.getDate() + days));
  }
}
