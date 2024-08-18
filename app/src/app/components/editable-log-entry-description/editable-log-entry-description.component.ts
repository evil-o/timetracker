import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from "@angular/core";
import { ActivityLogEntry } from "../../redux/states/activity-log";

@Component({
    selector: "app-editable-log-entry-description",
    templateUrl: "./editable-log-entry-description.component.html",
    styleUrls: ["./editable-log-entry-description.component.css"],
})
export class EditableLogEntryDescriptionComponent {
    @Input()
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

    public emitChangeDescription(newDescription: string) {
        this.changeEntryDescription.emit({
            entryId: this.entry.id,
            newDescription: newDescription,
        });
    }
}
