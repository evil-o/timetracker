import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { ApplicationState } from '../../redux/states/applicationState';
import { IActivityTypes } from '../../redux/states/activityTypes';
import { IActivityType } from '../../models/interfaces';
import { FetchOrCreateIdAndLogTimeAction } from '../../redux/actions/fetchOrCreateIdAndLogTime';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {
  private activityTypes$: Observable<IActivityTypes>;
  public activities$: Observable<IActivityType[]>;

  constructor(private store: Store<ApplicationState>) {
    this.activityTypes$ = this.store.select('activityTypes');
  }

  ngOnInit() {
    this.activities$ = this.activityTypes$.map(types => types.activities);
  }

  logHours(activityName: string, hours: number) {
    if (Number.isNaN(Number(hours))) {
      // TODO show error
      return;
    }
    this.store.dispatch(new FetchOrCreateIdAndLogTimeAction(activityName, hours));
  }

}
