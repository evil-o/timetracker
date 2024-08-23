import { Component, Input } from "@angular/core";
import { IActivityLogEntry } from "../../../entities/activity-log/models/activity-log.types";
import { IActivityTypes } from "../../../entities/activity-types/models/activity-types.types";

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
