import { IActivityType } from "../../models/interfaces";

export interface IActivityTypes {
    activities: IActivityType[];
}

export class ActivityTypes implements IActivityTypes {
    public activities: IActivityType[] = [];
}
