import { Component, Input } from "@angular/core";
import { IActivityLogEntry } from "../../redux/states/activity-log";
import { IActivityTypes } from "../../redux/states/activity-types";

@Component({
    selector: "app-tally",
    templateUrl: "./tally.component.html",
    styleUrls: ["./tally.component.css"],
})
export class TallyComponent {
    @Input()
    public entries?: IActivityLogEntry[];

    @Input()
    public activityTypes?: IActivityTypes;
}
