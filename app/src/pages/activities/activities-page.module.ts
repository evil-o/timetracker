import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ActivityTypeEntitiesModule } from "../../entities/activity-type";
import { ActivityTypesListWidgetsModule } from "../../widgets/activity-types-list";
import { ActivitiesComponent } from "./ui/activities.component";

@NgModule({
    declarations: [ActivitiesComponent],
    exports: [ActivitiesComponent],
    imports: [
        CommonModule,
        ActivityTypesListWidgetsModule,
        ActivityTypeEntitiesModule,
    ],
})
export class ActivitiesPageModule {}
