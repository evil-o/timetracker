import { IActivityType } from '../../models/interfaces';

export interface IActivityTypes {
  activities: IActivityType[];
}

export class ActivityTypes implements IActivityTypes {
  public activities: IActivityType[] = [{name: 'premade test', id: 'premade1'}];
}
