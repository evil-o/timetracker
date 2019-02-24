import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ApplicationState } from '../../redux/states/applicationState';
import { Store } from '@ngrx/store';
import { activityLog, activityTypes } from '../../redux/selectors';
import { Observable } from 'rxjs/Observable';

class Aggregation {
  private aggregate = {};

  public add(key: string, hours: number) {
    if (!(key in this.aggregate)) {
      this.aggregate[key] = { hours: 0 };
    }

    this.aggregate[key].hours += hours;
  }

  public toLists() {
    const names = [];
    const values = [];
    for (const key in this.aggregate) {
      if (key) {
        names.push(key);
        values.push(this.aggregate[key].hours);
      }
    }
    return { names, values };
  }
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  public activityNames: string[];
  public activityHours: number[];

  private startDate$ = new Subject<Date>();
  private endDate$ = new Subject<Date>();

  constructor(store: Store<ApplicationState>) {
    const activities$ = store.select(activityLog);
    const types$ = store.select(activityTypes);

    const activitiesInRage$ = Observable.combineLatest(activities$, this.startDate$, this.endDate$)
      .map(([activities, sliceStart, sliceEnd]) => activities.entries.filter((entry) => {
        const date = new Date(entry.year, entry.month, entry.day);
        return date >= sliceStart && date < sliceEnd;
      }));

    const aggregation$ = Observable.combineLatest(activitiesInRage$, types$)
      .map(([activities, types]) => {
        return activities.reduce((prev, current) => {
          const type = types.activities.find((a) => a.id === current.actvitiyId);
          prev.add(type ? type.name : current.actvitiyId, current.hours);
          return prev;
        }, new Aggregation());
      })
      .map((aggregate) => aggregate.toLists());

    const activityNames$ = aggregation$.map((aggregation) => aggregation.names);
    const activityHours$ = aggregation$.map((aggregation) => aggregation.values);

    activityNames$.subscribe((names) => this.activityNames = names);
    activityHours$.subscribe((hours) => this.activityHours = hours);

    // initialize to display data from the current month
    const start = new Date();
    start.setDate(1);
    const end = new Date();
    end.setDate(1);
    end.setMonth(end.getMonth() + 1);
    this.startDate$.next(start);
    this.endDate$.next(end);
  }

  ngOnInit() {
  }

}
