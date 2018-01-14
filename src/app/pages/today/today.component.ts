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

  constructor(private store: Store<ApplicationState>) {
    this.activityTypes$ = this.store.select(fromStore.activityTypes);
    this.activityLogEntries$ = this.store.select(fromStore.activityLogEntries);
    this.activityLogEntries$.subscribe((values) => 'new log entries received: ' + JSON.stringify(values, null, 2));
  }

  ngOnInit() {
    this.activities$ = this.activityTypes$.map(types => types.activities);
  }

  logHours(activityName: string, hours: number) {
    hours = Number(hours);
    if (Number.isNaN(hours)) {
      // TODO show error
      return;
    }
    this.store.dispatch(new FetchOrCreateIdAndLogTimeAction(activityName, hours));
  }

}
