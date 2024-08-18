import {
    IActivityType,
    IActivityTypes,
} from "../../../entities/activity-types/activity-types.types";

export class ActivityTypes implements IActivityTypes {
    public activities: IActivityType[] = [];
}
