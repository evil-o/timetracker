import { IActivityType } from '../../models/interfaces';

export interface IActivityTypes {
  activities: IActivityType[];
}

export class ActivityTypes implements IActivityTypes {
  public activities: IActivityType[] = [];

  public static byId(activityTypes: IActivityTypes, id: string) {
    return activityTypes.activities.find((activity) => activity.id === id) || null;
  }
}
