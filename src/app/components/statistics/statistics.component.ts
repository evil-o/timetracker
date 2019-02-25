import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ApplicationState } from '../../redux/states/applicationState';
import { Store } from '@ngrx/store';
import { activityLog, activityTypes } from '../../redux/selectors';
import { Observable } from 'rxjs/Observable';
import { IActivityLog } from '../../redux/states/activityLog';
import { IActivityTypes } from '../../redux/states/activityTypes';
import { activityColors } from '../../models/activityColors';

class Aggregation {
  private aggregate = {};

  public add(key: string, hours: number, color: any) {
    if (!(key in this.aggregate)) {
      this.aggregate[key] = { hours: 0, color };
    }

    this.aggregate[key].hours += hours;
  }

  public toLists() {
    const names: string[] = [];
    const values: number[] = [];
    const colors: string[] = [];
    for (const key in this.aggregate) {
      if (key) {
        names.push(key);
        const val = this.aggregate[key];
        values.push(val.hours);
        colors.push(`rgba(${val.color.r},${val.color.g},${val.color.b},1.0)`);
      }
    }
    return { names, values, colors };
  }
}

interface IChartColor {
  backgroundColor: string;
}

interface IDataset {
  names: string[];
  hours: number[];
  colors: any;
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  public filteredActivityNames: string[];
  public filteredActivityHours: number[];

  private startDate$ = new Subject<Date>();
  private endDate$ = new Subject<Date>();

  private _filteredChartColors: Array<any> = [];

  private createDataset(allActivities$: Observable<IActivityLog>, types$: Observable<IActivityTypes>): Observable<IDataset> {
    const activitiesInRage$ = Observable.combineLatest(allActivities$, this.startDate$, this.endDate$)
      .map(([activities, sliceStart, sliceEnd]) => activities.entries.filter((entry) => {
        const date = new Date(entry.year, entry.month, entry.day);
        return date >= sliceStart && date < sliceEnd;
      }));

    const aggregation$ = Observable.combineLatest(activitiesInRage$, types$)
      .map(([activities, types]) => {
        return activities.reduce((prev, current) => {
          const type = types.activities.find((a) => a.id === current.actvitiyId);
          const color = activityColors.find((c) => c.id === type.colorId) || { color: { r: 0xe0, g: 0xe0, b: 0xe0 } };
          prev.add(type ? type.name : current.actvitiyId, current.hours, color.color);
          return prev;
        }, new Aggregation());
      })
      .map((aggregate) => aggregate.toLists());

    return aggregation$.map((aggregation) => ({
      names: aggregation.names,
      hours: aggregation.values.map((h) => Math.round(h * 10) / 10),
      colors: [aggregation.colors.reduce((prev, cur) => {
        prev.backgroundColor.push(cur);
        return prev;
      }, { backgroundColor: [] })]
    }));
  }

  constructor(store: Store<ApplicationState>) {
    const activities$ = store.select(activityLog);
    const types$ = store.select(activityTypes);

    const filteredActivities$ = this.createDataset(activities$, types$);
    filteredActivities$.subscribe((data) => {
      this.filteredActivityNames = data.names;
      this.filteredActivityHours = data.hours;
      this._filteredChartColors = data.colors;
      // console.log("col:", this.filteredChartColors);
    });

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

  public filteredChartColors() {
    return this._filteredChartColors;
  }

}
