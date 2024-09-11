import { Component, EventEmitter, Input, Output } from "@angular/core";
import { stringToDuration } from "../../../../shared/lib";
import { ActivityLogEntry } from "../../models/activity-log.state";

@Component({
    selector: "app-editable-log-entry-hours",
    templateUrl: "./editable-log-entry-hours.component.html",
})
export class EditableLogEntryHoursComponent {
    @Input()
    public entry!: ActivityLogEntry;

    @Output()
    public changeEntryHours = new EventEmitter<{
        entryId: string;
        newHours: number;
    }>();

    protected emitChangeHours(newHoursStr: string) {
        const hoursNumber = stringToDuration(newHoursStr);

        if (hoursNumber) {
            this.changeEntryHours.emit({
                entryId: this.entry.id,
                newHours: hoursNumber,
            });
        }
    }
}
