import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AcivityColorFeaturesModule } from "../features/activity-color/activity-color-features.module";
import { LegacyModule } from "../shared/legacy.module";
import { ActivityTypeListComponent } from "./activity-types-list/ui/activity-type-list/activity-type-list.component";
import { NavbarComponent } from "./ui/navbar/navbar.component";

const declarations = [NavbarComponent, ActivityTypeListComponent];

@NgModule({
    declarations: [...declarations],
    exports: [...declarations],
    imports: [
        LegacyModule,
        CommonModule,
        RouterModule,
        AcivityColorFeaturesModule,
    ],
})
export class WidgetsModule {}
