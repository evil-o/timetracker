import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { GroupActivityLogEntriesByIdPipe } from "./lib/group-activity-log-entries-by-id.pipe";
import { LogEntryTallyPipe } from "./lib/log-entry-tally.pipe";
import { EditableLogEntryDescriptionComponent } from "./ui/editable-log-entry-description/editable-log-entry-description.component";
import { EditableLogEntryHoursComponent } from "./ui/editable-log-entry-hours/editable-log-entry-hours.component";
import { NoActivityLogEntryPresentComponent } from "./ui/no-activity-log-entry-present/no-activity-log-entry-present.component";

const components = [
    EditableLogEntryDescriptionComponent,
    EditableLogEntryHoursComponent,
    NoActivityLogEntryPresentComponent,
];

const pipes = [GroupActivityLogEntriesByIdPipe, LogEntryTallyPipe];

@NgModule({
    declarations: [...components, ...pipes],
    exports: [...components, ...pipes],
    imports: [CommonModule, SharedModule],
})
export class ActivityLogEntitiesModule {}
