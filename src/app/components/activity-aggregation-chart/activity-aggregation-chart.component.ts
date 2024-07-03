import { Component, Input, OnInit } from '@angular/core';
import { activityColors } from '../../models/activityColors';
import { IActivityLog, IActivityLogEntry } from '../../redux/states/activityLog';
import { IActivityTypes } from '../../redux/states/activityTypes';
import { combineLatest, map, Observable } from 'rxjs';

class Aggregation {
  private aggregate: Record<any, any> = {};

  public add(key: string, hours: number, color: any, colorId: string) {
    if (!(key in this.aggregate)) {
      this.aggregate[key] = { hours: 0, color, colorId };
    }

    this.aggregate[key].hours += hours;
  }

  public toLists() {
    const names: string[] = [];
    const values: number[] = [];
    const colors: string[] = [];
    const colorIds: string[] = [];
    for (const key in this.aggregate) {
      if (key) {
        names.push(key);
        const val = this.aggregate[key];
        values.push(val.hours);
        colors.push(`rgba(${val.color.r},${val.color.g},${val.color.b},1.0)`);
        colorIds.push(val.colorId);
      }
    }

    const sortBasis = colorIds.map((value, index) => ({ value, index }));
    const sortedIndices = sortBasis.sort((a, b) => a.value.localeCompare(b.value)).map((sorted) => sorted.index);
    const sortedNames = sortedIndices.map((index) => names[index]);
    const sortedValues = sortedIndices.map((index) => values[index]);
    const sortedColors = sortedIndices.map((index) => colors[index]);
    return { names: sortedNames, values: sortedValues, colors: sortedColors };
  }
}

@Component({
  selector: 'app-activity-aggregation-chart',
  templateUrl: './activity-aggregation-chart.component.html',
  styleUrls: ['./activity-aggregation-chart.component.css']
})
export class ActivityAggregationChartComponent implements OnInit {
  public filteredActivityNames: string[] = [];
  public filteredActivityHours: number[] = [];

  public chartOptions = {
    legend: {
      display: false,
      labels: {
        display: false
      }
    }
  };

  @Input()
  public set legend(display: boolean) {
    this.chartOptions.legend.display = display;
    this.chartOptions.legend.labels.display = display;
  }

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
    if (!this.allActivities$) {
      return;
    }
    let activitiesInRage$: Observable<IActivityLogEntry[]>;
    if (this.startDate$ && this.endDate$) {
      activitiesInRage$ = combineLatest([
        this.allActivities$,
        this.startDate$,
        this.endDate$
      ]).pipe(
        map(([activities, sliceStart, sliceEnd]) => activities.entries.filter((entry) => {
          const date = new Date(entry.year, entry.month, entry.day);
          return date >= sliceStart && date < sliceEnd;
        })));
    } else {
      activitiesInRage$ = this.allActivities$.pipe(map((a) => a.entries));
    }

    const aggregation$ = combineLatest([activitiesInRage$, this.types$!]).pipe(
      map(([activities, types]) => {
        return activities.reduce((prev, current) => {
          const type = types.activities.find((a) => a.id === current.actvitiyId);
          const color = activityColors.find((c) => c.id === type!.colorId) || { color: { r: 0xe0, g: 0xe0, b: 0xe0 } };
          prev.add(type ? type.name : current.actvitiyId, current.hours, color.color, type!.colorId || '');
          return prev;
        }, new Aggregation());
      }),
      map((aggregate) => aggregate.toLists())
    );

    const filteredActivities$ = aggregation$.pipe(map((aggregation) => ({
      names: aggregation.names,
      hours: aggregation.values.map((h) => Math.round(h * 10) / 10),
      colors: [aggregation.colors.reduce((prev, cur) => {
        prev.backgroundColor.push(cur);
        return prev;
      }, { backgroundColor: [] as string[] })]
    })));

    filteredActivities$.subscribe((data) => {
      this.filteredActivityNames = [];
      this.filteredActivityHours = [];
      this.filteredChartColors = [];
      setTimeout(() => {
        this.filteredActivityNames = data.names;
        this.filteredActivityHours = data.hours;
        this.filteredChartColors = data.colors;
      }, 0);
    });
  }

}
