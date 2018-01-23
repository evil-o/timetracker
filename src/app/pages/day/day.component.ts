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

  public date$ = new BehaviorSubject<Date>(new Date());

  public pickingDate = false;
  @ViewChild('datePickerInput')
  private datePickerInput: ElementRef;
  @ViewChild('datePicker')
  private datePicker: ElementRef;

  public hourLog$ = new Subject<{ hours: number, activityName: string }>();

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
      this.store.dispatch(new FetchOrCreateIdAndLogTimeAction(log.activityName, log.hours, date));
    });

    this.totalHours$ = this.activityLogEntries$.map(entries => entries.map(e => e.hours).reduce((total, current) => total + current));

    this.startTime$ = Observable.timer(0, 5)
      .withLatestFrom(this.totalHours$)
      .map(([timer, hoursFraction]) => {
        const start = new Date();
        const hours = Math.floor(hoursFraction);
        const minutes = (hoursFraction - hours) * 60.0;
        start.setHours(start.getHours() - hoursFraction);
        start.setMinutes(start.getMinutes() - minutes);
        return start;
      });
  }

  ngOnInit() {
    this.activities$ = this.activityTypes$.map(types => types.activities);
  }

  changeEntryDescription(params: { entryId: string, newDescription: string }) {
    this.store.dispatch(new SetDescriptionAction(params.entryId, params.newDescription));
  }

  logHours(activityName: string, hours: string) {
    const numHours = Number(hours.replace(',', '.')); // ',' -> '.' fixes locale problems for now
    if (Number.isNaN(numHours)) {
      // TODO show error
      return;
    }
    this.hourLog$.next({ hours: numHours, activityName });
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
