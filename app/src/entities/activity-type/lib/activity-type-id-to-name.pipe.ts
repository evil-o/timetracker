import { Pipe, PipeTransform } from "@angular/core";
import { ActivityTypes } from "../models/activity-types.state";
import { IActivityTypes } from "../models/activity-types.types";

@Pipe({
    name: "activityTypeIdToName",
})
export class ActivityTypeIdToNamePipe implements PipeTransform {
    public ActivityTypes = ActivityTypes;

    public transform(
        activityId: string,
        activityTypes: IActivityTypes
    ): string {
        const type = activityTypes.activities.find(
            (activity) => activity.id === activityId
        );
        if (type) {
            return type.name;
        } else {
            return `Unknown (id: ${activityId})`;
        }
    }
}
