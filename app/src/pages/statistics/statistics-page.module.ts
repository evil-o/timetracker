import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ActivityAggregationFeaturesModule } from "../../features/activity-aggregation";
import { StatisticsComponent } from "./ui/statistics.component";

@NgModule({
    declarations: [StatisticsComponent],
    exports: [StatisticsComponent],
    imports: [ActivityAggregationFeaturesModule, CommonModule],
})
export class StatisticsPageModule {}
