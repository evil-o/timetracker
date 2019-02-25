import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { activityColors } from '../../models/activityColors';
import { IActivityLog, IActivityLogEntry } from '../../redux/states/activityLog';
import { IActivityTypes } from '../../redux/states/activityTypes';

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

@Component({
  selector: 'app-activity-aggregation-chart',
  templateUrl: './activity-aggregation-chart.component.html',
  styleUrls: ['./activity-aggregation-chart.component.css']
})
export class ActivityAggregationChartComponent implements OnInit {
  public filteredActivityNames: string[];
  public filteredActivityHours: number[];

  @Input()
  public startDate$?: Observable<Date>;

  @Input()
  public endDate$?: Observable<Date>;

  @Input()
  public allActivities$?: Observable<IActivityLog>;

  @Input()
  public types$?: Observable<IActivityTypes>;

  public filteredChartColors: Array<any> = [];

  ngOnInit() {
    let activitiesInRage$: Observable<IActivityLogEntry[]>;
    if (this.startDate$ && this.endDate$) {
      activitiesInRage$ = Observable.combineLatest(
        this.allActivities$,
        this.startDate$,
        this.endDate$
      )
        .map(([activities, sliceStart, sliceEnd]) => activities.entries.filter((entry) => {
          const date = new Date(entry.year, entry.month, entry.day);
          return date >= sliceStart && date < sliceEnd;
        }));
    } else {
      activitiesInRage$ = this.allActivities$.map((a) => a.entries);
    }

    const aggregation$ = Observable.combineLatest(activitiesInRage$, this.types$)
      .map(([activities, types]) => {
        return activities.reduce((prev, current) => {
          const type = types.activities.find((a) => a.id === current.actvitiyId);
          const color = activityColors.find((c) => c.id === type.colorId) || { color: { r: 0xe0, g: 0xe0, b: 0xe0 } };
          prev.add(type ? type.name : current.actvitiyId, current.hours, color.color);
          return prev;
        }, new Aggregation());
      })
      .map((aggregate) => aggregate.toLists());

    const filteredActivities$ = aggregation$.map((aggregation) => ({
      names: aggregation.names,
      hours: aggregation.values.map((h) => Math.round(h * 10) / 10),
      colors: [aggregation.colors.reduce((prev, cur) => {
        prev.backgroundColor.push(cur);
        return prev;
      }, { backgroundColor: [] })]
    }));

    filteredActivities$.subscribe((data) => {
      this.filteredActivityNames = data.names;
      this.filteredActivityHours = data.hours;
      this.filteredChartColors = data.colors;
    });
  }

}
