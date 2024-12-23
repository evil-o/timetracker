import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ActivityLogEntry } from "../../models/activity-log.state";

@Component({
    selector: "app-editable-log-entry-description",
    templateUrl: "./editable-log-entry-description.component.html",
    standalone: false,
})
export class EditableLogEntryDescriptionComponent {
    @Input({ required: true })
    public entry!: ActivityLogEntry;

    @Output()
    public changeEntryDescription = new EventEmitter<{
        entryId: string;
        newDescription: string;
    }>();

    protected submitDescription(newDescription: string): void {
        this.emitChangeDescription(newDescription);
    }

    private emitChangeDescription(newDescription: string) {
        this.changeEntryDescription.emit({
            entryId: this.entry.id,
            newDescription: newDescription,
        });
    }
}
