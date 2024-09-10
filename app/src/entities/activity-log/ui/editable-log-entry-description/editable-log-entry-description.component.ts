import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from "@angular/core";
import { ActivityLogEntry } from "../../models/activity-log.state";

@Component({
    selector: "app-editable-log-entry-description",
    templateUrl: "./editable-log-entry-description.component.html",
})
export class EditableLogEntryDescriptionComponent {
    @Input({ required: true })
    public entry!: ActivityLogEntry;

    @Output()
    public changeEntryDescription = new EventEmitter<{
        entryId: string;
        newDescription: string;
    }>();

    @ViewChild("descriptionInput")
    public descriptionInput!: ElementRef;

    public editing = false;

    public setEditing(editing: boolean) {
        this.editing = editing;

        if (this.editing) {
            setTimeout(() => this.descriptionInput.nativeElement.focus(), 0);
        }
    }

    protected submitDescription(newDescription: string): void {
        this.emitChangeDescription(newDescription);
        this.setEditing(false);
    }

    private emitChangeDescription(newDescription: string) {
        this.changeEntryDescription.emit({
            entryId: this.entry.id,
            newDescription: newDescription,
        });
    }
}
