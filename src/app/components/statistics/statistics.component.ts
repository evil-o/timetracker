import { Component } from '@angular/core';
import { ApplicationState } from '../../redux/states/applicationState';
import { Store } from '@ngrx/store';
import { activityLog, activityTypes } from '../../redux/selectors';
import { Observable, } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IActivityTypes } from '../../redux/states/activityTypes';
import { IActivityLog } from '../../redux/states/activityLog';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
  public startDate$: BehaviorSubject<Date>;
  public endDate$: BehaviorSubject<Date>;

  public allActivities$: Observable<IActivityLog>;

  public types$: Observable<IActivityTypes>;

  constructor(store: Store<ApplicationState>) {
    this.allActivities$ = store.select(activityLog);
    this.types$ = store.select(activityTypes);

    // initialize to display data from the current month
    const start = new Date();
    start.setDate(1);
    const end = new Date();
    end.setDate(1);
    end.setMonth(end.getMonth() + 1);
    this.startDate$ = new BehaviorSubject(start);
    this.endDate$ = new BehaviorSubject(end);
  }
}
