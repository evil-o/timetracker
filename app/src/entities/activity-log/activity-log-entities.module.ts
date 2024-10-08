import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { GroupActivityLogEntriesByIdPipe } from "./lib/group-activity-log-entries-by-id.pipe";
import { EditableLogEntryDescriptionComponent } from "./ui/editable-log-entry-description/editable-log-entry-description.component";
import { EditableLogEntryHoursComponent } from "./ui/editable-log-entry-hours/editable-log-entry-hours.component";
import { EntryDescriptionComponent } from "./ui/entry-description/entry-description.component";
import { NoActivityLogEntryPresentComponent } from "./ui/no-activity-log-entry-present/no-activity-log-entry-present.component";

const components = [
    EditableLogEntryDescriptionComponent,
    EditableLogEntryHoursComponent,
    EntryDescriptionComponent,
    NoActivityLogEntryPresentComponent,
];

const pipes = [GroupActivityLogEntriesByIdPipe];

@NgModule({
    declarations: [...components, ...pipes],
    exports: [...components, ...pipes],
    imports: [CommonModule, SharedModule],
})
export class ActivityLogEntitiesModule {}
