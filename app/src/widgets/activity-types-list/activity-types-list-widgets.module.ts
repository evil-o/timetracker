import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ColorFeaturesModule } from "../../features/color";
import { ActivityTypeListComponent } from "./ui/activity-type-list/activity-type-list.component";

const declarations = [ActivityTypeListComponent];

@NgModule({
    declarations: [...declarations],
    exports: [...declarations],
    imports: [CommonModule, ColorFeaturesModule],
})
export class ActivityTypesListWidgetsModule {}
