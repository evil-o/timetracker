import { Component, EventEmitter, Input, Output } from "@angular/core";
import { activityColors } from "../../models/activityColors";
import { IActivityType, IActivityTypeColor } from "../../models/interfaces";

@Component({
    selector: "app-activity-color-picker",
    templateUrl: "./activity-color-picker.component.html",
    styleUrls: ["./activity-color-picker.component.css"],
})
export class ActivityColorPickerComponent {
    public colors: IActivityTypeColor[] = [
        { id: undefined, styleClass: undefined } as any as IActivityTypeColor,
        ...activityColors,
    ];

    @Input() public set activityType(value: IActivityType) {
        this.currentColor = value.colorId
            ? this.colors.find((c) => c.id === value.colorId)
            : undefined;
    }

    public currentColor?: IActivityTypeColor;

    @Output() public colorPicked = new EventEmitter<{ colorId?: string }>();
}
