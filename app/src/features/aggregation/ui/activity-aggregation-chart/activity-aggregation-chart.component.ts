import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { ChartData, ChartOptions } from "chart.js";
import { BaseChartDirective } from "ng2-charts";
import { combineLatest, map, Observable } from "rxjs";
import {
    IActivityLog,
    IActivityLogEntry,
} from "../../../../entities/activity-log";
import {
    activityColors,
    IActivityTypes,
    IColorSpec,
} from "../../../../entities/activity-type";

export interface IAggregationData {
    hours: number;
    color: IColorSpec;
    colorId: string;
}

class Aggregation {
    private aggregate: Record<string, IAggregationData> = {};

    public add(key: string, hours: number, color: IColorSpec, colorId: string) {
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
                colors.push(
                    `rgba(${val.color.r},${val.color.g},${val.color.b},1.0)`
                );
                colorIds.push(val.colorId);
            }
        }

        const sortBasis = colorIds.map((value, index) => ({ value, index }));
        const sortedIndices = sortBasis
            .sort((a, b) => a.value.localeCompare(b.value))
            .map((sorted) => sorted.index);
        const sortedNames = sortedIndices.map((index) => names[index]);
        const sortedValues = sortedIndices.map((index) => values[index]);
        const sortedColors = sortedIndices.map((index) => colors[index]);
        return {
            names: sortedNames,
            values: sortedValues,
            colors: sortedColors,
        };
    }
}

@Component({
    selector: "app-activity-aggregation-chart",
    templateUrl: "./activity-aggregation-chart.component.html",
    imports: [BaseChartDirective, CommonModule],
    standalone: true,
})
export class ActivityAggregationChartComponent implements OnInit {
    @Input()
    public startDate$?: Observable<Date>;

    @Input()
    public endDate$?: Observable<Date>;

    @Input()
    public allActivities$?: Observable<IActivityLog>;

    @Input()
    public types$?: Observable<IActivityTypes>;

    public chartOptions: ChartOptions<"doughnut"> = {
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    public filteredChartColors: IColorSpec[] = [];

    protected chartData?: ChartData<"doughnut">;

    protected doughnutChartType = "doughnut" as const;

    @Input()
    public set legend(display: boolean) {
        if (!this.chartOptions.plugins?.legend) {
            return;
        }
        this.chartOptions.plugins.legend.display = display;
        // this.chartOptions.plugins.legend.labels.display = display;
    }

    public ngOnInit() {
        if (!this.allActivities$) {
            return;
        }
        let activitiesInRage$: Observable<IActivityLogEntry[]>;
        if (this.startDate$ && this.endDate$) {
            activitiesInRage$ = combineLatest([
                this.allActivities$,
                this.startDate$,
                this.endDate$,
            ]).pipe(
                map(([activities, sliceStart, sliceEnd]) =>
                    activities.entries.filter((entry) => {
                        const date = new Date(
                            entry.year,
                            entry.month,
                            entry.day
                        );
                        return date >= sliceStart && date < sliceEnd;
                    })
                )
            );
        } else {
            activitiesInRage$ = this.allActivities$.pipe(map((a) => a.entries));
        }

        const aggregation$ = combineLatest([
            activitiesInRage$,
            this.types$!,
        ]).pipe(
            map(([activities, types]) => {
                return activities.reduce((prev, current) => {
                    const type = types.activities.find(
                        (a) => a.id === current.actvitiyId
                    );
                    const color = activityColors.find(
                        (c) => c.id === type!.colorId
                    ) || {
                        color: { r: 0xe0, g: 0xe0, b: 0xe0 },
                    };
                    prev.add(
                        type ? type.name : current.actvitiyId,
                        current.hours,
                        color.color!,
                        type!.colorId || ""
                    );
                    return prev;
                }, new Aggregation());
            }),
            map((aggregate) => aggregate.toLists())
        );

        aggregation$.subscribe((aggregation) => {
            const hours = aggregation.values.map(
                (h) => Math.round(h * 10) / 10
            );
            setTimeout(() => {
                this.chartData = {
                    datasets: [
                        {
                            data: hours,
                            backgroundColor: (context) =>
                                aggregation.colors[context.dataIndex],
                        },
                    ],
                    labels: aggregation.names,
                };
            }, 0);
        });
    }
}
