import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { ApplicationState } from '../../redux/states/applicationState';
import { IActivityTypes } from '../../redux/states/activityTypes';
import { IActivityType } from '../../models/interfaces';
import { FetchOrCreateIdAndLogTimeAction } from '../../redux/actions/activityLogActions';
import { IActivityLogEntry } from '../../redux/states/activityLog';

import * as fromStore from '../../redux/selectors';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {
  public activityTypes$: Observable<IActivityTypes>;
  public activities$: Observable<IActivityType[]>;
  public activityLogEntries$: Observable<IActivityLogEntry[]>;

  private today = new Date();

  constructor(private store: Store<ApplicationState>) {
    this.activityTypes$ = this.store.select(fromStore.activityTypes);
    this.activityLogEntries$ = this.store.select(fromStore.activityLogEntries)
      .map((entries) =>
        entries.filter((entry) =>
          entry.year === this.today.getFullYear()
          && entry.month === this.today.getMonth()
          && entry.day === this.today.getDate()
        )
      );
  }

  ngOnInit() {
    this.activities$ = this.activityTypes$.map(types => types.activities);
  }

  logHours(activityName: string, hours: string) {
    const numHours = Number(hours.replace(',', '.')); // ',' -> '.' fixes locale problems for now
    if (Number.isNaN(numHours)) {
      // TODO show error
      return;
    }
    this.store.dispatch(new FetchOrCreateIdAndLogTimeAction(activityName, numHours));
  }

}
