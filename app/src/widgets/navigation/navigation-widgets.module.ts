import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ActivityAggregationFeaturesModule } from "../../features/activity-aggregation/activity-aggregation-features.module";
import { AcivityColorFeaturesModule } from "../../features/activity-color/activity-color-features.module";
import { LegacyModule } from "../../shared/legacy.module";
import { ActivityLogWidgetsModule } from "../activity-log/activity-log-widgets.module";
import { NavbarComponent } from "./ui/navbar/navbar.component";

const declarations = [NavbarComponent];

@NgModule({
    declarations: [...declarations],
    exports: [...declarations],
    imports: [
        ActivityAggregationFeaturesModule,
        ActivityLogWidgetsModule,
        LegacyModule,
        CommonModule,
        RouterModule,
        AcivityColorFeaturesModule,
    ],
})
export class NavigationWidgetsModule {}
