import { Pipe, PipeTransform } from "@angular/core";
import { ActivityTypes } from "../../../app/redux/states/activity-types";
import { IActivityTypes } from "../../../entities/activity-types/activity-types.types";

@Pipe({
    name: "activityTypeIdToName",
})
export class ActivityTypeIdToNamePipe implements PipeTransform {
    public ActivityTypes = ActivityTypes;

    transform(activityId: string, activityTypes: IActivityTypes): string {
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
