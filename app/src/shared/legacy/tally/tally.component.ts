import { Component, Input } from "@angular/core";
import { IActivityTypes } from "../../../app/redux/states/activity-types";
import { IActivityLogEntry } from "../../../entities/activity-log/activity-log.types";

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
