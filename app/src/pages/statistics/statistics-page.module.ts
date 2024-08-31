import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AggregationFeaturesModule } from "../../features/aggregation";
import { StatisticsComponent } from "./ui/statistics.component";

@NgModule({
    declarations: [StatisticsComponent],
    exports: [StatisticsComponent],
    imports: [AggregationFeaturesModule, CommonModule],
})
export class StatisticsPageModule {}
