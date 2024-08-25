import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { EditableLogEntryDescriptionComponent } from "./ui/editable-log-entry-description/editable-log-entry-description.component";
import { EditableLogEntryHoursComponent } from "./ui/editable-log-entry-hours/editable-log-entry-hours.component";

const components = [
    EditableLogEntryDescriptionComponent,
    EditableLogEntryHoursComponent,
];

@NgModule({
    declarations: [...components],
    exports: [...components],
    imports: [SharedModule],
})
export class ActivityLogEntitiesModule {}
