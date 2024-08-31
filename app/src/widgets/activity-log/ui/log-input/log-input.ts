import { Component, ElementRef, input, output, ViewChild } from "@angular/core";
import {
    ActivityPickerComponent,
    IActivityType,
} from "../../../../entities/activity-type";
import { stringToDuration } from "../../../../shared/lib";

export interface ILogHoursOutput {
    hours: number;
    activityName: string;
    description?: string;
}

@Component({
    selector: "app-log-input",
    templateUrl: "./log-input.html",
})
export class LogInputComponent {
    public activities = input.required<IActivityType[] | undefined>();

    public logHours = output<ILogHoursOutput>();

    @ViewChild("activityToLog")
    private activityToLog!: ActivityPickerComponent;

    @ViewChild("hoursToLog")
    private hoursToLog!: ElementRef;

    @ViewChild("descriptionToLog")
    private logDescription!: ElementRef;

    @ViewChild("logHoursButton")
    private logHoursButton!: ElementRef;

    public clear(): void {
        this.hoursToLog.nativeElement.value = "";
        this.logDescription.nativeElement.value = "";
    }

    protected refocusOnEnter() {
        const activity = this.normalizeString(this.activityToLog.name);
        const hours = this.normalizeString(this.hoursToLog.nativeElement.value);
        if (activity && hours) {
            this.logHoursButton.nativeElement.click();
            this.hoursToLog.nativeElement.focus();
        } else if (activity) {
            this.hoursToLog.nativeElement.focus();
        } else if (hours) {
            this.activityToLog.focus();
        }
    }

    protected emitHoursToLog(
        activityName: string,
        hours: string,
        description?: string
    ) {
        const numHours = stringToDuration(this.normalizeString(hours));
        if (!numHours || Number.isNaN(numHours)) {
            // TODO show error
            return;
        }

        this.logHours.emit({
            hours: numHours,
            activityName: this.normalizeString(activityName),
            description: description ? this.normalizeString(description) : "",
        });
    }

    private normalizeString(str: string): string {
        return str.trim();
    }
}
