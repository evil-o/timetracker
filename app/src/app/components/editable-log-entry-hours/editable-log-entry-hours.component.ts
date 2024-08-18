import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from "@angular/core";
import { stringToDuration } from "../../helpers";
import { ActivityLogEntry } from "../../redux/states/activity-log";

@Component({
    selector: "app-editable-log-entry-hours",
    templateUrl: "./editable-log-entry-hours.component.html",
    styleUrls: ["./editable-log-entry-hours.component.css"],
})
export class EditableLogEntryHoursComponent {
    @Input()
    public entry!: ActivityLogEntry;

    @Output()
    public changeEntryHours = new EventEmitter<{
        entryId: string;
        newHours: number;
    }>();

    @ViewChild("hoursInput")
    public hoursInput!: ElementRef;

    public editing = false;

    public setEditing(editing: boolean) {
        this.editing = editing;

        if (this.editing) {
            setTimeout(() => {
                this.hoursInput.nativeElement.focus();
                this.hoursInput.nativeElement.select();
            }, 0);
        }
    }

    public submit() {
        this.emitChangeHours(this.hoursInput.nativeElement.value);
        this.setEditing(false);
    }

    public cancel() {
        this.setEditing(false);
    }

    public emitChangeHours(newHoursStr: string) {
        const hoursNumber = stringToDuration(newHoursStr);

        if (hoursNumber) {
            this.changeEntryHours.emit({
                entryId: this.entry.id,
                newHours: hoursNumber,
            });
        }
    }
}
