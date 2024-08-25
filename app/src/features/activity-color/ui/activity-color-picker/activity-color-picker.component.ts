import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
    activityColors,
    IActivityType,
    IActivityTypeColor,
    IUndefinedActivityTypeColor,
} from "../../../../entities/activity-type";

@Component({
    selector: "app-activity-color-picker",
    templateUrl: "./activity-color-picker.component.html",
    styleUrls: ["./activity-color-picker.component.css"],
})
export class ActivityColorPickerComponent {
    public colors: (IActivityTypeColor | IUndefinedActivityTypeColor)[] = [
        { id: undefined, styleClass: undefined },
        ...activityColors,
    ];

    @Input() public set activityType(value: IActivityType) {
        this.currentColor = value.colorId
            ? (this.colors.find((c) => c.id === value.colorId) as
                  | IActivityTypeColor
                  | undefined)
            : undefined;
    }

    public currentColor?: IActivityTypeColor;

    @Output() public colorPicked = new EventEmitter<{ colorId?: string }>();
}
