import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FeaturesModule } from "../features/features.module";
import { LegacyModule } from "../shared/legacy.module";
import { ActivityTypeListComponent } from "./activity-types-list/ui/activity-type-list/activity-type-list.component";
import { NavbarComponent } from "./ui/navbar/navbar.component";

const declarations = [NavbarComponent, ActivityTypeListComponent];

@NgModule({
    declarations: [...declarations],
    exports: [...declarations],
    imports: [LegacyModule, CommonModule, RouterModule, FeaturesModule],
})
export class WidgetsModule {}
