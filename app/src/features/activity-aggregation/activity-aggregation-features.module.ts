import { NgModule } from "@angular/core";
import { ActivityAggregationChartComponent } from "./ui/activity-aggregation-chart/activity-aggregation-chart.component";

const standaloneComponents = [ActivityAggregationChartComponent];

@NgModule({
    imports: [...standaloneComponents],
    exports: [...standaloneComponents],
})
export class ActivityAggregationFeaturesModule {}
