import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ActivityAggregationFeaturesModule } from "../../features/activity-aggregation";
import { AcivityColorFeaturesModule } from "../../features/activity-color";
import { ActivityLogWidgetsModule } from "../activity-log";
import { NavbarComponent } from "./ui/navbar/navbar.component";

const declarations = [NavbarComponent];

@NgModule({
    declarations: [...declarations],
    exports: [...declarations],
    imports: [
        ActivityAggregationFeaturesModule,
        ActivityLogWidgetsModule,
        AcivityColorFeaturesModule,

        BsDropdownModule,
        CommonModule,
        RouterModule,
    ],
})
export class NavigationWidgetsModule {}
