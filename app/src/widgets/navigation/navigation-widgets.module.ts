import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { AggregationFeaturesModule } from "../../features/aggregation";
import { ColorFeaturesModule } from "../../features/color";
import { ActivityLogWidgetsModule } from "../activity-log";
import { NavbarComponent } from "./ui/navbar/navbar.component";

const declarations = [NavbarComponent];

@NgModule({
    declarations: [...declarations],
    exports: [...declarations],
    imports: [
        AggregationFeaturesModule,
        ActivityLogWidgetsModule,
        ColorFeaturesModule,

        BsDropdownModule,
        CommonModule,
        RouterModule,
    ],
})
export class NavigationWidgetsModule {}
