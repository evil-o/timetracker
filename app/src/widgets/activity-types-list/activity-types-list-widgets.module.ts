import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AcivityColorFeaturesModule } from "../../features/activity-color";
import { ActivityTypeListComponent } from "./ui/activity-type-list/activity-type-list.component";

const declarations = [ActivityTypeListComponent];

@NgModule({
    declarations: [...declarations],
    exports: [...declarations],
    imports: [CommonModule, AcivityColorFeaturesModule],
})
export class ActivityTypesListWidgetsModule {}
