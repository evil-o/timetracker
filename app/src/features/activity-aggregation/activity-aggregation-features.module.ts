import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { ActivityAggregationChartComponent } from "./ui/activity-aggregation-chart/activity-aggregation-chart.component";
import { OvertimeBadgeComponent } from "./ui/overtime-badge/overtime-badge.component";

const standaloneComponents = [ActivityAggregationChartComponent];
const components = [OvertimeBadgeComponent];

@NgModule({
    imports: [...standaloneComponents, SharedModule],
    declarations: [...components],
    exports: [...components, ...standaloneComponents],
})
export class ActivityAggregationFeaturesModule {}
